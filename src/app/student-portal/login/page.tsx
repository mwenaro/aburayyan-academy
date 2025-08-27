"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, GraduationCap, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function StudentLoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState<"regno" | "kas">("regno");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/student-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password: password.trim(),
          loginMethod,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Login Successful",
          description: data.message,
        });

        // Check if password reset is required
        if (data.requiresPasswordReset) {
          router.push("/student-portal/reset-password");
        } else {
          router.push("/student-portal/dashboard");
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Student Portal</CardTitle>
          <CardDescription>
            Access your academic records and profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="loginMethod">Login Method</Label>
              <Select value={loginMethod} onValueChange={(value: "regno" | "kas") => setLoginMethod(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select login method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regno">Registration Number</SelectItem>
                  <SelectItem value="kas">KAS Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="identifier">
                {loginMethod === "regno" ? "Registration Number" : "KAS Number"}
              </Label>
              <Input
                id="identifier"
                type="text"
                placeholder={
                  loginMethod === "regno" 
                    ? "Enter your registration number (e.g., abu/s/2024/001)" 
                    : "Enter your KAS number"
                }
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password (default: 2025)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <div className="mb-2">
              <strong>First time login?</strong>
            </div>
            <div className="space-y-1 text-xs">
              <p>• Use your Registration Number or KAS</p>
              <p>• Default password: <span className="font-mono bg-gray-100 px-1 rounded">2025</span></p>
              <p>• You&apos;ll be asked to change your password</p>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            Need help? Contact your class teacher or school administration.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
