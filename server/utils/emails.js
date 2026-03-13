const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Use a verified domain or Resend's default testing domain (onboarding@resend.dev)
const SENDER_EMAIL = 'onboarding@resend.dev'; 

exports.sendBookingConfirmation = async ({ booker_name, booker_email, title, start_time, duration, host_email }) => {
  const date = new Date(start_time).toLocaleString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // Email to booker
  await resend.emails.send({
    from: SENDER_EMAIL,
    to: booker_email,
    subject: `Booking Confirmed: ${title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #ebebeb; border-radius: 12px;">
        <h2 style="color: #111; margin-bottom: 8px;">Your booking is confirmed ✓</h2>
        <p style="color: #666; margin-bottom: 24px;">Here are your booking details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Event</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${title}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Date & Time</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${date}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Duration</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${duration} minutes</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Name</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${booker_name}</td></tr>
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #aaa;">Powered by Schedl</p>
      </div>
    `
  });

  // Email to host
  await resend.emails.send({
    from: SENDER_EMAIL,
    to: host_email,
    subject: `New Booking: ${title} with ${booker_name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #ebebeb; border-radius: 12px;">
        <h2 style="color: #111; margin-bottom: 8px;">New booking received!</h2>
        <p style="color: #666; margin-bottom: 24px;">${booker_name} has booked a ${title} with you.</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Event</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${title}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Date & Time</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${date}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Booker</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${booker_name} (${booker_email})</td></tr>
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #aaa;">Powered by Schedl</p>
      </div>
    `
  });
};

exports.sendCancellationEmail = async ({ booker_name, booker_email, title, start_time }) => {
  const date = new Date(start_time).toLocaleString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  await resend.emails.send({
    from: SENDER_EMAIL,
    to: booker_email,
    subject: `Booking Cancelled: ${title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #ebebeb; border-radius: 12px;">
        <h2 style="color: #111; margin-bottom: 8px;">Booking Cancelled</h2>
        <p style="color: #666; margin-bottom: 24px;">Your booking has been cancelled:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Event</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${title}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Date & Time</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${date}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Name</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${booker_name}</td></tr>
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #aaa;">Powered by Schedl</p>
      </div>
    `
  });
};
