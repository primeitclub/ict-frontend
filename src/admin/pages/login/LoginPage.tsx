import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../shared/design-components";
import Logo2 from "../../../client/layouts/headers/Logo/Logo2";
import { useLoginMutation } from "./useLoginMutation";
import type { LoginPayload } from "./useLoginMutation";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmit = (data: LoginPayload) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        // Store the auth token for subsequent API calls
        localStorage.setItem("auth_token", response.data.token);

        // Navigate to admin dashboard
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-admin-primary overflow-hidden relative">
      <div className="w-full max-w-[400px] px-6 py-12 ">
        <div className="flex flex-col items-center mb-10">
          <div className="mb-6">
            <Logo2 />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-white/50 text-center">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-container p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden "
        >
          <div className="space-y-6">
            <Input
              label="Email"
              type=""
              placeholder="Enter your email"
              leftIcon={<User size={18} />}
              error={errors.email?.message}
              {...register("email", {
                required: "email is required",
                minLength: {
                  value: 3,
                  message: "email must be at least 3 characters",
                },
              })}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                leftIcon={<Lock size={18} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="filled"
                fullWidth
                isLoading={loginMutation.isPending}
                label="Sign In"
                className="rounded-xl h-12"
                rightIcon={!loginMutation.isPending && true}
              />
            </div>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-white/30 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} ICT Meetup. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
