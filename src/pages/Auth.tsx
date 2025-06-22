import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Github, Mail, Shield, Zap, Users, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const { signUp, signIn, signInWithGoogle, signInWithGithub } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signUp(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName
      );
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Google sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleGithubAuth = async () => {
    try {
      const { error } = await signInWithGithub();
      if (error) {
        toast({
          title: "GitHub sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const benefits = [
    { icon: Zap, text: "Instant access to 50+ AI tools" },
    { icon: Shield, text: "Enterprise-grade security" },
    { icon: Users, text: "Join 10,000+ satisfied users" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding & Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-12 flex-col justify-center">
          <div className="max-w-md">
            <Link to="/" className="inline-block mb-8">
              <h1 className="text-4xl font-bold text-white">SubSplit</h1>
            </Link>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Access Premium AI Tools at Fraction of the Cost
            </h2>
            
            <p className="text-purple-100 text-lg mb-8">
              Join thousands of users who are saving up to 85% on AI subscriptions while accessing the tools they need, when they need them.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between text-white text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-purple-200">AI Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-purple-200">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-purple-200">Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            {/* Mobile Logo */}
            <div className="text-center lg:hidden">
              <Link to="/" className="inline-block">
                <h2 className="text-3xl font-bold text-purple-800">SubSplit</h2>
              </Link>
              <p className="mt-2 text-gray-600">Welcome to the future of AI access</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login" className="text-sm">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm">Create Account</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Sign in to access your SubSplit dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Social Login */}
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full h-12 text-sm font-medium border-2 hover:bg-gray-50"
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Continue with Google
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full h-12 text-sm font-medium border-2 hover:bg-gray-50"
                        onClick={handleGithubAuth}
                        disabled={isLoading}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Continue with GitHub
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
                      </div>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="Enter your email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                          className="mt-1 h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <div className="relative mt-1">
                          <Input 
                            id="password" 
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password" 
                            value={formData.password}
                            onChange={handleInputChange}
                            required 
                            className="pr-10 h-12"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <Link to="/forgot-password" className="text-purple-600 hover:text-purple-800 font-medium">
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Signing in...
                          </>
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup">
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">Create Your Account</CardTitle>
                    <CardDescription>Join SubSplit and start saving on AI tools today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Social Login */}
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full h-12 text-sm font-medium border-2 hover:bg-gray-50"
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Continue with Google
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full h-12 text-sm font-medium border-2 hover:bg-gray-50"
                        onClick={handleGithubAuth}
                        disabled={isLoading}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Continue with GitHub
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">Or create with email</span>
                      </div>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                          <Input 
                            id="firstName" 
                            name="firstName"
                            type="text" 
                            placeholder="John" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required 
                            className="mt-1 h-12"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                          <Input 
                            id="lastName" 
                            name="lastName"
                            type="text" 
                            placeholder="Doe" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required 
                            className="mt-1 h-12"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="signup-email" className="text-sm font-medium">Email Address</Label>
                        <Input 
                          id="signup-email" 
                          name="email"
                          type="email" 
                          placeholder="Enter your email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                          className="mt-1 h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                        <div className="relative mt-1">
                          <Input 
                            id="signup-password" 
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password" 
                            value={formData.password}
                            onChange={handleInputChange}
                            required 
                            className="pr-10 h-12"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                        <Input 
                          id="confirmPassword" 
                          name="confirmPassword"
                          type="password" 
                          placeholder="Confirm your password" 
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required 
                          className="mt-1 h-12"
                        />
                      </div>

                      {/* Benefits Preview */}
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h4 className="font-semibold text-purple-900 mb-2 text-sm">What you'll get:</h4>
                        <div className="space-y-1">
                          {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-purple-600" />
                              <span className="text-purple-700 text-xs">{benefit.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating Account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                By continuing, you agree to our{' '}
                <Link to="/terms" className="text-purple-600 hover:text-purple-800 font-medium">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">Privacy Policy</Link>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 pt-4">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                SOC 2 Compliant
              </Badge>
              <Badge variant="outline" className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                GDPR Ready
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;