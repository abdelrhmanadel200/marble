import { NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/products"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the request data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email
    await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject || "General Inquiry",
      message: data.message,
    })

    return NextResponse.json({ success: true, message: "Message received" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
