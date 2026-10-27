import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

function generateotp(){
    return Math.floor(1000000 +Math.random()*9000000).toString()
}
async function sendemail(req, res) {
    const {name,email}=req.body
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sdhar3700@gmail.com",
                pass: process.env.PASSWORD,
            }
        })

        const mail = {
            from: "codingc816@gmail.com",
            to:email,
            subject: `Checking`,
            html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

    <table align="center" width="100%" cellpadding="0" cellspacing="0"
      style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">

      <!-- Header -->
      <tr>
        <td style="background:green; padding:20px; text-align:center; color:white;">
          <h2 style="margin:0;">Cheking email</h2>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:20px; color:#333333;">
          <p>Hello ${name},</p>
          <h3>To update your password.</h3>

          <p style="margin-top:20px;">Here is your otp:</p>

          <div style="text-align:center; margin:30px 0;">
            <h2 style="background:black; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:5px; display:inline-block;">
              ${generateotp()}
            </h2>
          </div>

          <p>You can reset your password.</p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f4f4f4; text-align:center; padding:15px; font-size:12px; color:#777;">
          © 2026 Sanju Dhar | All rights reserved
        </td>
      </tr>

    </table>

  </body>
  </html>
  `,
        }
        await transporter.sendMail(mail)
        res.status(200).send("Email sent")
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}

export default sendemail