import { NextResponse } from "next/server"
import { sendProductInquiryEmail } from "@/lib/products"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the request data
    if (!data.name || !data.email || !data.message || !data.productId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email
    await sendProductInquiryEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      productId: data.productId,
      productName: data.productName || "Unknown Product",
      productCategory: data.productCategory || "Unknown Category",
    })

    return NextResponse.json({ success: true, message: "Inquiry received" }, { status: 200 })
  } catch (error) {
    console.error("Error processing product inquiry:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
