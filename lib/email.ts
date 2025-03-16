// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodemailer from "nodemailer"

// Create a transporter with Gmail configuration
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Gmail address
    pass: process.env.EMAIL_PASSWORD, // App password
  },
})

// Function to send product inquiry emails
export async function sendProductInquiryEmail(data: {
  name: string
  email: string
  phone?: string
  message: string
  productId: string
  productName: string
  productCategory: string
}) {
  const { name, email, phone, message, productId, productName, productCategory } = data

  const mailOptions = {
    from: `"Marble Company" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECIPIENT,
    subject: `Product Inquiry: ${productName} (${productCategory})`,
    text: `
      Product Inquiry Details:
      
      Product: ${productName} (${productCategory})
      Product ID: ${productId}
      
      Customer Information:
      Name: ${name}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      
      Message:
      ${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b45309;">New Product Inquiry</h2>
        
        <div style="background-color: #f5f5f4; padding: 15px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #44403c;">Product Information</h3>
          <p><strong>Product:</strong> ${productName} (${productCategory})</p>
          <p><strong>Product ID:</strong> ${productId}</p>
        </div>
        
        <div style="background-color: #f5f5f4; padding: 15px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #44403c;">Customer Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        </div>
        
        <div style="background-color: #f5f5f4; padding: 15px;">
          <h3 style="margin-top: 0; color: #44403c;">Message</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
        
        <p style="color: #78716c; font-size: 12px; margin-top: 30px;">
          This email was sent from the product inquiry form on your website.
        </p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

// Function to send contact form emails
export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const { name, email, phone, subject, message } = data

  const mailOptions = {
    from: `"Marble Company" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECIPIENT,
    subject: `Contact Form: ${subject}`,
    text: `
      Contact Form Submission:
      
      Subject: ${subject}
      
      Customer Information:
      Name: ${name}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      
      Message:
      ${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b45309;">New Contact Form Submission</h2>
        
        <div style="background-color: #f5f5f4; padding: 15px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #44403c;">Subject</h3>
          <p>${subject}</p>
        </div>
        
        <div style="background-color: #f5f5f4; padding: 15px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #44403c;">Customer Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        </div>
        
        <div style="background-color: #f5f5f4; padding: 15px;">
          <h3 style="margin-top: 0; color: #44403c;">Message</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
        
        <p style="color: #78716c; font-size: 12px; margin-top: 30px;">
          This email was sent from the contact form on your website.
        </p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}
