"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { signUpSchema, SignUpFormData } from "@/lib/validations/auth";
import { africanCountries } from "@/lib/data/countries";
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: "mentee",
    },
  });

  const password = watch("password");

  // Password strength indicators
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "", color: "" };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (pwd.length >= 12) score++;

    if (score <= 2) return { score, label: "Weak", color: "text-red-500" };
    if (score === 3) return { score, label: "Fair", color: "text-yellow-500" };
    if (score === 4) return { score, label: "Good", color: "text-blue-500" };
    return { score, label: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(password || "");

  const onSubmit = async (data: SignUpFormData) => {
    try {
      if (!agreeToTerms) {
        setError("Please agree to the terms and conditions");
        return;
      }

      setIsLoading(true);
      setError(null);

      // Create user account with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId));

      const result = await response.json();

      if (!response.ok) {
        if (result.error?.includes('ETIMEOUT') || result.error?.includes('timeout')) {
          setError("Unable to connect to database. Please check your internet connection and try again.");
        } else {
          setError(result.error || "Failed to create account");
        }
        return;
      }

      // Auto sign in after successful registration
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        // Account created but signin failed, redirect to signin page
        router.push("/signin?message=Account created successfully. Please sign in.");
        return;
      }

      // Redirect to onboarding
      router.push("/onboarding/role");
      router.refresh();
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError("Request timed out. The database might be unavailable. Please try again.");
      } else if (err.message?.includes('fetch')) {
        setError("Network error. Please check your internet connection and try again.");
      } else {
        setError(err.message || "An error occurred during sign up");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4 group">
            <div className="w-10 h-10 bg-primary rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg" />
            <span className="text-2xl font-bold text-foreground">AfriLead</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Get Started</h1>
          <p className="text-sm text-muted-foreground">
            Create your account and start your mentorship journey
          </p>
        </div>

        <Card className="shadow-xl border border-border">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Create Account</CardTitle>
            <CardDescription>
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                label="Full Name"
                error={errors.name?.message}
                required
                htmlFor="name"
              >
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="transition-all duration-300"
                  disabled={isLoading}
                />
              </FormField>

              <FormField
                label="Email"
                error={errors.email?.message}
                required
                htmlFor="email"
              >
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your.email@example.com"
                  className="transition-all duration-300"
                  disabled={isLoading}
                />
              </FormField>

              <FormField
                label="Country"
                error={errors.country?.message}
                required
                htmlFor="country"
              >
                <Select
                  onValueChange={(value) => setValue("country", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {africanCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="I want to"
                error={errors.role?.message}
                required
                htmlFor="role"
              >
                <Select
                  defaultValue="mentee"
                  onValueChange={(value) => setValue("role", value as any)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentee">Find a Mentor</SelectItem>
                    <SelectItem value="mentor">Become a Mentor</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Password"
                error={errors.password?.message}
                required
                htmlFor="password"
              >
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Create a strong password"
                  className="transition-all duration-300"
                  disabled={isLoading}
                />
                {password && password.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength.score <= 2
                              ? "bg-red-500"
                              : passwordStrength.score === 3
                              ? "bg-yellow-500"
                              : passwordStrength.score === 4
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${passwordStrength.color}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <PasswordRequirement met={password.length >= 8} text="At least 8 characters" />
                      <PasswordRequirement met={/[A-Z]/.test(password)} text="One uppercase letter" />
                      <PasswordRequirement met={/[a-z]/.test(password)} text="One lowercase letter" />
                      <PasswordRequirement met={/[0-9]/.test(password)} text="One number" />
                    </div>
                  </div>
                )}
              </FormField>

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
                size="lg"
                disabled={isLoading || !agreeToTerms}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full hover:bg-muted transition-all duration-300"
              size="lg"
              onClick={() => signIn("google", { callbackUrl: "/onboarding/role" })}
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center pb-6 pt-2">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary font-semibold hover:underline transition-colors">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <div className="h-3.5 w-3.5 rounded-full border-2 border-muted-foreground/30" />
      )}
      <span className={`text-xs ${met ? "text-green-600" : "text-muted-foreground"}`}>
        {text}
      </span>
    </div>
  );
}
