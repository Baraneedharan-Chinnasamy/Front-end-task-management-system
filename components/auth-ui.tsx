"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { ForgotPasswordForm } from "@/components/forgot-password-form"
import { ResetPasswordForm } from "@/components/ResetPasswordForm"

type AuthView = "login" | "signup" | "forgot-password" | "reset-password"

export function AuthUI() {
  const [view, setView] = useState<AuthView>("login")

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {view === "login" ? "Welcome back" : view === "signup" ? "Create an account" : "Reset your password"}
        </h1>
        <p className="text-gray-500 mt-2 text-center">
          {view === "login"
            ? "Enter your credentials to access your account"
            : view === "signup"
              ? "Fill in the form below to create your account"
              : "We'll send you a link to reset your password"}
        </p>
      </div>

      {view === "login" && <LoginForm onViewChange={setView} />}
      {view === "signup" && <SignupForm onViewChange={setView} />}
      {view === "forgot-password" && <ForgotPasswordForm onViewChange={setView} />}
      {view === "reset-password" && <ResetPasswordForm onViewChange={setView} />}
    </div>
  )
}
