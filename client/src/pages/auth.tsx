import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const authSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email").optional(),
  role: z.enum(["worker", "employer"], {
    required_error: "Please select a role",
  }),
});

type AuthForm = z.infer<typeof authSchema>;

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      role: "worker",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: AuthForm) => {
      const response = await apiRequest("POST", "/api/auth/register", data);
      return response.json();
    },
    onSuccess: (user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast({
        title: "Account created successfully!",
        description: "Welcome to HerWork",
      });
      
      if (user.role === "worker") {
        setLocation("/worker-dashboard");
      } else {
        setLocation("/home");
      }
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AuthForm) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/">
          <button className="p-2 hover:bg-secondary rounded-lg" data-testid="button-back">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Welcome</h1>
        <div className="w-10"></div>
      </div>

      {/* Auth Form */}
      <div className="p-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Create your account</h2>
          <p className="text-muted-foreground text-sm">Join thousands of women building their careers</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...form.register("name")}
              data-testid="input-name"
            />
            {form.formState.errors.name && (
              <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              {...form.register("phone")}
              data-testid="input-phone"
            />
            {form.formState.errors.phone && (
              <p className="text-destructive text-sm mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...form.register("email")}
              data-testid="input-email"
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label>I am a...</Label>
            <Select 
              value={form.watch("role")} 
              onValueChange={(value) => form.setValue("role", value as "worker" | "employer")}
            >
              <SelectTrigger data-testid="select-role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="worker">Worker / Service Provider</SelectItem>
                <SelectItem value="employer">Employer / Household</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.role && (
              <p className="text-destructive text-sm mt-1">{form.formState.errors.role.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full py-3 mt-6"
            disabled={registerMutation.isPending}
            data-testid="button-continue"
          >
            {registerMutation.isPending ? "Creating Account..." : "Continue"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link href="/auth">
              <button className="text-primary font-medium hover:underline" data-testid="button-signin">
                Sign in
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
