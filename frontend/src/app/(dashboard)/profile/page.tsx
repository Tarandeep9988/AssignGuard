'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Shield } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    // Mock save
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Profile</h1>

      <div className="max-w-2xl">
        <Card className="p-8 border-border">
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {user?.avatar || user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-1">{user?.name}</h2>
                <p className="text-muted-foreground capitalize flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {user?.role}
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6 space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground font-semibold">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-border"
                  />
                ) : (
                  <p className="text-foreground">{user?.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground font-semibold">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <p className="text-foreground">{user?.email}</p>
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground font-semibold">
                  <Shield className="w-4 h-4" />
                  Account Type
                </Label>
                <p className="text-foreground capitalize">{user?.role}</p>
              </div>

              <div className="border-t border-border pt-6 flex gap-3">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setName(user?.name || '');
                        setIsEditing(false);
                      }}
                      className="border-border text-foreground hover:bg-muted"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="border-border text-foreground hover:bg-muted"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Account Info */}
        <Card className="p-8 border-border mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span className="text-foreground font-mono">{user?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Created</span>
              <span className="text-foreground">Today</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
