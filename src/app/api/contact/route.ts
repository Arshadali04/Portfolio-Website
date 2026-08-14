import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────
    // To connect a real email provider, replace the block below.
    //
    // Option A — Resend:
    //   import { Resend } from 'resend';
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: 'Portfolio <onboarding@resend.dev>',
    //     to: 'arshadalia2703@gmail.com',
    //     subject: `Portfolio contact from ${name}`,
    //     text: `From: ${name} <${email}>\n\n${message}`,
    //   });
    //
    // Option B — Nodemailer (add: npm install nodemailer):
    //   import nodemailer from 'nodemailer';
    //   const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    //   });
    //   await transporter.sendMail({ ... });
    // ─────────────────────────────────────────────────────────────────

    console.log("[Contact form submission]", { name, email, message });

    return NextResponse.json(
      { success: true, message: "Message received! I'll get back to you soon." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
