"use client"

import { useState, useTransition, type FormEvent } from "react"
import { motion } from "framer-motion"
import { joinWaitlist } from "@/app/actions"

export function WaitlistForm() {
  const [state, setState] = useState<{ success: boolean; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = String(formData.get("email") ?? "")

    startTransition(async () => {
      const result = await joinWaitlist(email)
      setState(result)
      if (result.success) {
        // Optionally reset the form on success
        e.currentTarget.reset()
      }
    })
  }

  return (
    <motion.div
      className="flex flex-col gap-4 mt-4 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          name="email"
          placeholder="hi@example.com"
          required
          disabled={isPending}
          className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Joining…" : "Join Waitlist"}
        </button>
      </form>

      {state && (
        <motion.div
          key={state.message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center text-sm p-3 rounded-lg backdrop-blur-sm ${
            state.success
              ? "bg-green-500/20 border border-green-500/30 text-green-200"
              : "bg-red-500/20 border border-red-500/30 text-red-200"
          }`}
        >
          {state.message}
        </motion.div>
      )}
    </motion.div>
  )
}
