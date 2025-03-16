"use server"

import { sendEmail } from "./send-email"

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return { success: false, error: "Email is required" }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address" }
  }

  const htmlContent = `
    <h2>New Newsletter Subscription</h2>
    <p>A new user has subscribed to the newsletter:</p>
    <p><strong>Email:</strong> ${email}</p>
  `

  try {
    const result = await sendEmail({
      to: process.env.EMAIL_RECIPIENT || "",
      subject: "New Newsletter Subscription",
      html: htmlContent,
    })

    return result
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return { success: false, error: (error as Error).message }
  }
}
