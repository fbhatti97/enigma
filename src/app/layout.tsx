// app/layout.tsx
import AmplifyClient from '@/amplify-client';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AmplifyClient>{children}</AmplifyClient>
      </body>
    </html>
  );
}