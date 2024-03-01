"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/dist/server/api-utils";

export function AuthForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn("email", { email: data.email, redirect: false });
      toast({
        title: "Link enviado",
        description: "Cheque sua caixa de email",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro, tente novamente.",
      });
    }
  });

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email below to login to your account
        </p>
      </div>
      <div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              {...form.register("email")}
            />
          </div>
          <Button
            className="w-full"
            onClick={() => {
              // Verifica se o campo de email está vazio
              if (!form.getValues("email")) {
                toast({
                  title: "Erro",
                  description: "Por favor, preencha o campo de email.",
                });
                return;
              }
              handleSubmit();
            }}
          >
            Send Magic Link
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          A magic link will be sent to your email for authentication
        </div>
      </div>
    </div>
  );
}
