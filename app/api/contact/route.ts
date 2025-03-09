// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the request data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email
    const emailResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || "company@example.com",
      subject: `Contact Form: ${data.subject}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone || "Not provided"}
        Subject: ${data.subject}
        Message: ${data.message}
      `,
    });

    if (!emailResult.success) {
      throw new Error("Failed to send email");
    }

    return NextResponse.json(
      { success: true, message: "Message received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}