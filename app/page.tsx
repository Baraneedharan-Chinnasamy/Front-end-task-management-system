import { AuthUI } from "@/components/auth-ui"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <AuthUI />
    </main>
  )
}
