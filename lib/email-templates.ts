export function createProductInquiryEmail(data: {
  productName: string
  productId: string
  name: string
  email: string
  phone: string
  message: string
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Product Inquiry</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #d32f2f;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .product-info {
          background-color: white;
          padding: 15px;
          margin-bottom: 20px;
          border-left: 4px solid #d32f2f;
        }
        .customer-info {
          background-color: white;
          padding: 15px;
          margin-bottom: 20px;
        }
        .message-box {
          background-color: white;
          padding: 15px;
          border-left: 4px solid #d32f2f;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #777;
        }
        h2 {
          color: #d32f2f;
          margin-top: 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        td {
          padding: 8px;
        }
        .label {
          font-weight: bold;
          width: 30%;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Product Inquiry</h1>
        </div>
        <div class="content">
          <div class="product-info">
            <h2>Product Information</h2>
            <table>
              <tr>
                <td class="label">Product:</td>
                <td>${data.productName}</td>
              </tr>
              <tr>
                <td class="label">Product ID:</td>
                <td>${data.productId}</td>
              </tr>
            </table>
          </div>
          
          <div class="customer-info">
            <h2>Customer Information</h2>
            <table>
              <tr>
                <td class="label">Name:</td>
                <td>${data.name}</td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td>${data.email}</td>
              </tr>
              <tr>
                <td class="label">Phone:</td>
                <td>${data.phone || "Not provided"}</td>
              </tr>
            </table>
          </div>
          
          <div class="message-box">
            <h2>Message</h2>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the Top Modern website product inquiry form.</p>
          <p>&copy; ${new Date().getFullYear()} Top Modern. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function createContactFormEmail(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #d32f2f;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .customer-info {
          background-color: white;
          padding: 15px;
          margin-bottom: 20px;
          border-left: 4px solid #d32f2f;
        }
        .message-box {
          background-color: white;
          padding: 15px;
          border-left: 4px solid #d32f2f;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #777;
        }
        h2 {
          color: #d32f2f;
          margin-top: 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        td {
          padding: 8px;
        }
        .label {
          font-weight: bold;
          width: 30%;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="customer-info">
            <h2>Customer Information</h2>
            <table>
              <tr>
                <td class="label">Name:</td>
                <td>${data.name}</td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td>${data.email}</td>
              </tr>
              <tr>
                <td class="label">Phone:</td>
                <td>${data.phone || "Not provided"}</td>
              </tr>
              <tr>
                <td class="label">Subject:</td>
                <td>${data.subject}</td>
              </tr>
            </table>
          </div>
          
          <div class="message-box">
            <h2>Message</h2>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the Top Modern website contact form.</p>
          <p>&copy; ${new Date().getFullYear()} Top Modern. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
