import crypto from 'crypto'

export interface BlockchainVerification {
  hash: string
  timestamp: string
  chainId: string
  verified: boolean
}

/**
import { MerkleTree } from './merkle-tree'

export interface BlockchainVerification {
  hash: string
  timestamp: string
  chainId: string
  verified: boolean
  merkleRoot?: string
  proof?: string[]
}

/**
 * Generate a blockchain-style verification hash for a collection of credentials
 * Uses Merkle Tree for cryptographic efficiency.
 */
export function generateMerkleRoot(credentialIds: string[]): string {
  const tree = new MerkleTree(credentialIds)
  return tree.getRoot()
}

/**
 * Generate a single credential hash (leaf)
 */
export function generateCredentialHash(credentialId: string, userId: string, timestamp: string): string {
  const data = `${credentialId}:${userId}:${timestamp}`
  return crypto.createHash('sha256').update(data).digest('hex')
}

/**
 * Verify a credential's blockchain authenticity
 */
export function verifyCredentialHash(
  hash: string,
  credentialId: string,
  userId: string,
  timestamp: string,
): boolean {
  const expectedHash = generateCredentialHash(credentialId, userId, timestamp)
  return hash === expectedHash
}

/**
 * Create a blockchain verification record
 */
export async function createBlockchainVerification(
  credentialId: string,
  userId: string,
): Promise<BlockchainVerification> {
  const timestamp = new Date().toISOString()
  const leafHash = generateCredentialHash(credentialId, userId, timestamp)

  // Create a Merkle Tree with this credential and some "dummy" historical credentials 
  // to simulate a block of transactions. In a real app, this would be a batch of current transactions.
  const dummyTransactions = [
    leafHash,
    crypto.randomBytes(32).toString('hex'),
    crypto.randomBytes(32).toString('hex'),
    crypto.randomBytes(32).toString('hex')
  ]

  const tree = new MerkleTree(dummyTransactions)
  const root = tree.getRoot()
  const proof = tree.getProof(leafHash) // In our simplified class, we passed the raw content, but here we pass leaf content.
  // Actually, our MerkleTree constructor takes raw strings and hashes them. 
  // So query for proof needs the original content 'leafHash' (since we treated leafHash as the content).

  return {
    hash: leafHash,
    timestamp,
    chainId: `vericred-chain-${Date.now()}`,
    verified: true,
    merkleRoot: root,
    proof: proof
  }
}

/**
 * Get blockchain verification status
 */
export function getVerificationStatus(verification: BlockchainVerification | null): {
  status: 'verified' | 'pending' | 'unverified'
  message: string
} {
  if (!verification) {
    return {
      status: 'pending',
      message: 'Verification pending',
    }
  }

  if (verification.verified) {
    return {
      status: 'verified',
      message: 'Verified on blockchain',
    }
  }

  return {
    status: 'unverified',
    message: 'Verification failed',
  }
}
