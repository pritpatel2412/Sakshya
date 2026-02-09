import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sakshya - Secure Digital Credential Vault',
  description: 'Store, verify, and share your digital credentials securely with blockchain-backed authentication.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{children}</body>
    </html>
  );
}
