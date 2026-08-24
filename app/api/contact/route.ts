import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  subject: z.string().min(1),
  message: z.string().optional(),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const body = await req.json();
    const data = schema.parse(body);

    await resend.emails.send({
      from: "Njoroge Kiriro & Company Advocates <enquiries@njorogekiriroadvocates.com>",
      to: "nkiriro@proton.me",
      replyTo: data.email,
      subject: `New Enquiry: ${data.subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a4d35;">New Client Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #1c1c1e; font-weight: 600;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Email</td>
              <td style="padding: 8px 0; color: #1c1c1e;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Phone</td>
              <td style="padding: 8px 0; color: #1c1c1e;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Practice Area</td>
              <td style="padding: 8px 0; color: #1c1c1e;">${data.subject}</td>
            </tr>
            ${data.message ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; color: #1c1c1e;">${data.message}</td>
            </tr>
            ` : ""}
          </table>
          <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">Sent from the Njoroge Kiriro & Company Advocates website contact form.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}