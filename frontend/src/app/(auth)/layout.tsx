import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground">AssignGuard</span>
        </Link>
      </div>

      {/* Auth Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
