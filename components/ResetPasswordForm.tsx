"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"

interface ResetPasswordFormProps {
  onViewChange: (view: "login" | "signup" | "forgot-password" | "reset-password") => void
}

export function ResetPasswordForm({ onViewChange }: ResetPasswordFormProps) {
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")

  useEffect(() => {
    const storedEmail = localStorage.getItem("reset_email")
    const storedToken = localStorage.getItem("reset_token")
    if (storedEmail && storedToken) {
      setEmail(storedEmail)
      setToken(storedToken)
    } else {
      onViewChange("forgot-password")
    }
  }, [onViewChange])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!otp || !newPassword) {
      setError("OTP and new password are required")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("https://71e1-2401-4900-67aa-bf5e-2d49-e8df-91fa-c206.ngrok-free.app/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          otp,
          new_password: newPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.detail || "Reset failed")

      setIsSuccess(true)
      localStorage.removeItem("reset_email")
      localStorage.removeItem("reset_token")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold">Password Reset Successful</h3>
        <p className="text-gray-500">You can now log in with your new password.</p>
        <Button className="w-full" onClick={() => onViewChange("login")}>
          Back to Login
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="otp">OTP</Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>

      <Button
        variant="link"
        className="w-full"
        type="button"
        onClick={() => onViewChange("forgot-password")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to forgot password
      </Button>
    </form>
  )
}
