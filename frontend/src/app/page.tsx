'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Shield, Zap, BarChart3 } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // fetch call to health
    fetch('/api/v1/health')      
      .then(data => {
        console.log('Health check:', data);
      })
      .catch(err => {
        console.error('Health check failed:', err);
      });
  }, []);

  return (
    <main className="flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <span className="text-lg md:text-xl font-bold text-foreground">AssignGuard</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-muted text-xs md:text-sm">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm">
              Get started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground text-balance leading-tight">
            Detect plagiarism instantly, manage assignments effortlessly
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            AssignGuard helps educators maintain academic integrity with advanced plagiarism detection powered by intelligent similarity analysis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/register">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start free trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
              View demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 md:px-6 py-12 md:py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8 md:mb-16">
            Powerful features for educators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 md:p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 md:gap-4">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Advanced Plagiarism Detection
                  </h3>
                  <p className="text-muted-foreground">
                    Our intelligent algorithms analyze submissions in real-time and provide precise similarity percentages to identify potential academic dishonesty.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Instant Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Get comprehensive plagiarism reports in seconds. No waiting, no complexity - just clear results you can act on immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <BarChart3 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Comprehensive Reporting
                  </h3>
                  <p className="text-muted-foreground">
                    Detailed similarity reports show exactly where matches occur, helping you make informed grading decisions and provide constructive feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Easy Assignment Management
                  </h3>
                  <p className="text-muted-foreground">
                    Create assignments, set deadlines, and track submissions all in one intuitive interface. Streamline your entire workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">
            Why educators choose AssignGuard
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Accuracy in plagiarism detection</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{"<"}2s</div>
              <p className="text-muted-foreground">Average analysis time per submission</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Educational institutions trust us</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to protect academic integrity?</h2>
          <p className="text-lg opacity-90">
            Join thousands of educators using AssignGuard to maintain standards and provide better feedback.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Get started for free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">AssignGuard</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 AssignGuard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
