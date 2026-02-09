/**
 * Secure Encryption Utility using Web Crypto API
 * Uses AES-256-GCM for authenticated encryption
 */

/**
 * Generate a cryptographic key for encryption
 */
export async function generateEncryptionKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256, // 256-bit key for AES-256
    },
    true, // extractable
    ['encrypt', 'decrypt']
  )
}

/**
 * Export key to string format for storage
 */
export async function exportKey(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey('raw', key)
  const exportedAsString = String.fromCharCode.apply(null, Array.from(new Uint8Array(exported)))
  return btoa(exportedAsString)
}

/**
 * Import key from string format
 */
export async function importKey(keyString: string): Promise<CryptoKey> {
  const binaryString = atob(keyString)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return await crypto.subtle.importKey(
    'raw',
    bytes,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypt data using AES-256-GCM
 * Returns base64 encoded string containing IV + encrypted data
 */
export async function encryptData(
  data: string,
  key: CryptoKey
): Promise<string> {
  // Generate random IV (Initialization Vector)
  const iv = crypto.getRandomValues(new Uint8Array(12)) // 96-bit IV for GCM

  // Encode the data
  const encoder = new TextEncoder()
  const encodedData = encoder.encode(data)

  // Encrypt
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encodedData
  )

  // Combine IV + encrypted data
  const combined = new Uint8Array(iv.length + encryptedData.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(encryptedData), iv.length)

  // Convert to base64 for easy storage/transmission
  const binaryString = String.fromCharCode.apply(null, Array.from(combined))
  return btoa(binaryString)
}

/**
 * Decrypt data using AES-256-GCM
 */
export async function decryptData(
  encryptedString: string,
  key: CryptoKey
): Promise<string> {
  // Decode from base64
  const binaryString = atob(encryptedString)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  // Extract IV and encrypted data
  const iv = bytes.slice(0, 12) // First 12 bytes are IV
  const encryptedData = bytes.slice(12) // Rest is encrypted data

  // Decrypt
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encryptedData
  )

  // Decode the decrypted data
  const decoder = new TextDecoder()
  return decoder.decode(decryptedData)
}

/**
 * Get or create a master encryption key (stored in localStorage)
 * In production, this should be derived from user password or stored securely
 */
export async function getMasterKey(): Promise<CryptoKey> {
  const keyString = localStorage.getItem('vericred_master_key')

  if (keyString) {
    return await importKey(keyString)
  }

  // Generate new key
  const newKey = await generateEncryptionKey()
  const exported = await exportKey(newKey)
  localStorage.setItem('vericred_master_key', exported)

  return newKey
}

/**
 * Create a hash of data for integrity verification
 */
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const encodedData = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Secure credential object with encryption
 */
export interface EncryptedCredential {
  id: string
  title: string // Not encrypted for display
  encryptedDescription: string
  encryptedMetadata: string
  credentialType: string
  hash: string // For integrity verification
  createdAt: string
  updatedAt: string
}

/**
 * Encrypt a credential object
 */
export async function encryptCredential(
  credential: {
    id: string
    title: string
    description: string
    credentialType: string
    metadata?: Record<string, any>
  }
): Promise<EncryptedCredential> {
  const key = await getMasterKey()

  const encryptedDescription = await encryptData(credential.description, key)
  const metadataJson = JSON.stringify(credential.metadata || {})
  const encryptedMetadata = await encryptData(metadataJson, key)

  // Create hash for integrity
  const dataToHash = `${credential.id}${credential.title}${encryptedDescription}`
  const hash = await hashData(dataToHash)

  return {
    id: credential.id,
    title: credential.title,
    encryptedDescription,
    encryptedMetadata,
    credentialType: credential.credentialType,
    hash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Decrypt a credential object
 */
export async function decryptCredential(
  encrypted: EncryptedCredential
): Promise<{
  id: string
  title: string
  description: string
  credentialType: string
  metadata: Record<string, any>
}> {
  const key = await getMasterKey()

  const description = await decryptData(encrypted.encryptedDescription, key)
  const metadataJson = await decryptData(encrypted.encryptedMetadata, key)
  const metadata = JSON.parse(metadataJson)

  // Verify integrity
  const dataToHash = `${encrypted.id}${encrypted.title}${encrypted.encryptedDescription}`
  const computedHash = await hashData(dataToHash)

  if (computedHash !== encrypted.hash) {
    throw new Error('Credential integrity check failed - data may have been tampered with')
  }

  return {
    id: encrypted.id,
    title: encrypted.title,
    description,
    credentialType: encrypted.credentialType,
    metadata,
  }
}
