'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mail, User, GraduationCap, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm text-muted-foreground">Full Name</Label>
              <div className="mt-2 flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={user?.name || ''}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Email Address</Label>
              <div className="mt-2 flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Role</Label>
              <div className="mt-2 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-muted-foreground" />
                <Badge className="capitalize bg-primary text-primary-foreground">
                  {user?.role}
                </Badge>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Account Created</div>
              <div className="text-lg font-semibold mt-2">
                {new Date().toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Account Status</div>
              <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Role Type</div>
              <div className="text-lg font-semibold mt-2 capitalize">
                {user?.role === 'teacher' ? 'Educator' : 'Student'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
