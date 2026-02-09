'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Upload as UploadIcon, CheckCircle } from 'lucide-react'
import { encryptCredential } from '@/lib/encryption'

export default function UploadCredentialPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        setFile(null)
      } else {
        setFile(selectedFile)
        setError(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const credentialId = `cred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Encrypt the credential
      const encryptedCredential = await encryptCredential({
        id: credentialId,
        title,
        description,
        credentialType: file?.type?.includes('pdf') ? 'pdf' : 'document',
        metadata: {
          fileName: file?.name,
          fileSize: file?.size,
          fileType: file?.type,
          uploadedAt: new Date().toISOString(),
        },
      })

      // Store encrypted credential in localStorage
      const storedCredentials = JSON.parse(
        localStorage.getItem('vericred_credentials') || '[]'
      )
      storedCredentials.push(encryptedCredential)
      localStorage.setItem('vericred_credentials', JSON.stringify(storedCredentials))

      // Show success
      setSuccess(true)
      setTitle('')
      setDescription('')
      setFile(null)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/credentials')
      }, 2000)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload credential')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
      <nav className="bg-white border-b-2 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/credentials">
            <Button variant="ghost" className="text-[hsl(var(--primary))]">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">Upload Credential</h1>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {success && (
          <Card className="mb-6 border-2 border-green-500 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-700">Credential uploaded successfully!</p>
                  <p className="text-sm text-green-600">Your credential has been encrypted and secured.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-2 border-[hsl(var(--primary))]">
          <CardHeader>
            <CardTitle>Upload New Credential</CardTitle>
            <CardDescription>Add a document, certificate, or credential to your secure vault</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold">
                  Credential Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., AWS Solutions Architect Certificate"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={loading}
                  className="border-2 border-[hsl(var(--primary))] rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Add details about this credential..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  className="border-2 border-[hsl(var(--primary))] rounded-lg"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file" className="font-semibold">
                  Document File
                </Label>
                <div className="border-2 border-dashed border-[hsl(var(--primary))] rounded-lg p-6 text-center">
                  <UploadIcon className="w-12 h-12 text-[hsl(var(--primary))] mx-auto mb-3 opacity-50" />
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    required
                    disabled={loading}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.png,.txt"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <p className="text-sm text-muted-foreground">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC, JPG, PNG or TXT (max 10MB)</p>
                  </label>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !title || !file || success}
                className="w-full h-12 bg-[hsl(var(--primary))] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Encrypting & Uploading...' : 'Upload Credential'}
              </Button>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>🔒 Security:</strong> Your credentials are encrypted using AES-256-GCM encryption with integrity verification.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

