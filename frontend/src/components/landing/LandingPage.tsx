import React from 'react';
import Link from 'next/link';
import { ShieldCheck, BookOpen, UserCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Background blobs for premium feel */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
          <ShieldCheck className="w-4 h-4" />
          <span>The standard in academic integrity</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 px-2">
          Secure, Plagiarism-Free <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Assignment Management</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed px-4">
          PlagShield empowers educators to enforce academic integrity effortlessly, while providing students with a seamless and transparent submission experience.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="h-14 w-full px-8 text-lg gap-2 cursor-pointer">
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="h-14 w-full px-8 text-lg bg-background/50 backdrop-blur-sm cursor-pointer">
              Sign In to Dashboard
            </Button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Automated Detection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Instantly cross-check every submission against your entire classroom database to identify potential overlaps and collusion.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                <UserCheck className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Role-Based Workflows</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dedicated interfaces for both students and teachers. Create assignments, submit work, and review reports seamlessly.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clear Reporting</h3>
              <p className="text-muted-foreground leading-relaxed">
                View simple, easy-to-understand similarity metrics directly within the dashboard without switching to external tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
