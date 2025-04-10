"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface SignupFormProps {
  onViewChange: (view: "login" | "signup" | "forgot-password" | "reset-password") => void
}

export function SignupForm({ onViewChange }: SignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [designation, setDesignation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; designation?: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    let hasErrors = false
    const newErrors: { name?: string; email?: string; password?: string; designation?: string } = {}

    if (!name) {
      newErrors.name = "Name is required"
      hasErrors = true
    }

    if (!email) {
      newErrors.email = "Email is required"
      hasErrors = true
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email"
      hasErrors = true
    }

    if (!password) {
      newErrors.password = "Password is required"
      hasErrors = true
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      hasErrors = true
    }

    if (!designation) {
      newErrors.designation = "Designation is required"
      hasErrors = true
    }

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("https://71e1-2401-4900-67aa-bf5e-2d49-e8df-91fa-c206.ngrok-free.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
          designation: designation,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Signup failed")
      }

      alert("Account created successfully!")
      onViewChange("login")

    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>

      {/* Designation Field */}
      <div className="space-y-2">
        <Label htmlFor="designation">Designation</Label>
        <Select onValueChange={(value) => setDesignation(value)}>
          <SelectTrigger id="designation" className={errors.designation ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a designation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
        {errors.designation && <p className="text-sm text-red-500">{errors.designation}</p>}
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="text-sm font-normal">
          I agree to the{" "}
          <Button variant="link" className="px-0 font-normal text-sm h-auto" type="button">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="px-0 font-normal text-sm h-auto" type="button">
            Privacy Policy
          </Button>
        </Label>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>

      {/* Switch to login */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Button variant="link" className="px-0 font-normal" onClick={() => onViewChange("login")} type="button">
          Sign in
        </Button>
      </div>
    </form>
  )
}
