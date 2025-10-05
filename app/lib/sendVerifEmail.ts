import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // atau bisa pakai SMTP host/port
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

/**
 * Kirim email verifikasi
 */
export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-user?token=${token}`;

  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your account",
    html: `
      <h2>Welcome 👋</h2>
      <p>Thanks for registering. Please verify your account by clicking the link below:</p>
      <p><a href="${verifyUrl}" style="color: #2563eb; font-weight: bold;">Verify Account</a></p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  });
}
