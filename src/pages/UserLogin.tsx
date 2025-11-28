import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Get admin credentials from environment variables
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || '';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '';

    // Simulate API call delay
    setTimeout(() => {
      if (
        adminEmail &&
        adminPassword &&
        email === adminEmail &&
        password === adminPassword
      ) {
        const adminUser = {
          id: 'admin-001',
          name: 'Admin',
          email: email,
          role: 'admin' as const,
        };

        login(adminUser);
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Please check your credentials.',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 500);
  };

  // Show loading state while checking authentication
  if (isAuthenticated && isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent-green/5 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent-green/5 p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome to TruAssets
            </CardTitle>
            <CardDescription>
              Sign in to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Login'}
              </Button>
            </form>

            <div className="text-xs text-center text-muted-foreground mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            New to real estate investing?{' '}
            <a 
              href="#how-it-works" 
              className="text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname !== '/') {
                  navigate('/', { state: { scrollTo: 'how-it-works' } });
                } else {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Learn how it works
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
