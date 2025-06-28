"use server"

interface WaitlistState {
  success: boolean
  message: string
}

/**
 * Server Action – Stores an e-mail on the wait-list.
 * It can be imported and called directly from a Client Component.
 */
export async function joinWaitlist(email: string): Promise<WaitlistState> {
  // Basic email validation
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!isValidEmail) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  // Simulate a 1-second DB/API round-trip
  await new Promise((r) => setTimeout(r, 1_000))
  // Persist `email` to your database here
  console.log("New wait-list signup:", email)

  return {
    success: true,
    message: "Welcome to the wait-list! We’ll notify you when ACULESS Studios launches.",
  }
}
