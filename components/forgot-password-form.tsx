"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft } from "lucide-react"

interface ForgotPasswordFormProps {
  onViewChange: (view: "login" | "signup" | "forgot-password" | "reset-password") => void
}

const BASE_URL = "https://71e1-2401-4900-67aa-bf5e-2d49-e8df-91fa-c206.ngrok-free.app"

export function ForgotPasswordForm({ onViewChange }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError("Email is required")
      return
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.detail || "Failed to send OTP")

      localStorage.setItem("reset_token", data.token)
      localStorage.setItem("reset_email", email)

      onViewChange("reset-password")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send reset link"
        )}
      </Button>

      <Button variant="link" className="w-full" onClick={() => onViewChange("login")} type="button">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to login
      </Button>
    </form>
  )
}
