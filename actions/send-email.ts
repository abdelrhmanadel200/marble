"use server"

import nodemailer from "nodemailer"
import { createProductInquiryEmail, createContactFormEmail } from "@/lib/email-templates"

type EmailData = {
  to: string
  subject: string
  html: string
}

export async function sendEmail(data: EmailData) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.to,
      subject: data.subject,
      html: data.html,
    }

    const info = await transporter.sendMail(mailOptions)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function sendProductInquiry(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string
  const productName = formData.get("productName") as string
  const productId = formData.get("productId") as string

  if (!name || !email || !message || !productName) {
    return { success: false, error: "Missing required fields" }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address" }
  }

  try {
    const htmlContent = createProductInquiryEmail({
      productName,
      productId,
      name,
      email,
      phone,
      message,
    })

    return await sendEmail({
      to: process.env.EMAIL_RECIPIENT || "",
      subject: `Product Inquiry: ${productName}`,
      html: htmlContent,
    })
  } catch (error: any) {
    console.error("Error sending product inquiry:", error)
    return { success: false, error: error.message || "Failed to send inquiry" }
  }
}

export async function sendContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!name || !email || !subject || !message) {
    return { success: false, error: "Missing required fields" }
  }

  const htmlContent = createContactFormEmail({
    name,
    email,
    phone,
    subject,
    message,
  })

  return await sendEmail({
    to: process.env.EMAIL_RECIPIENT || "",
    subject: `Contact Form: ${subject}`,
    html: htmlContent,
  })
}
