import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get input element values
    const nameVal = (document.getElementById("name") as HTMLInputElement)?.value || "";
    const phoneVal = (document.getElementById("phone") as HTMLInputElement)?.value || "";
    const emailVal = (document.getElementById("email") as HTMLInputElement)?.value || "";
    const cityVal = (document.getElementById("city") as HTMLInputElement)?.value || "";
    const messageVal = (document.getElementById("message") as HTMLTextAreaElement)?.value || "";

    setSending(true);

    const messageLines = [
      "📞 *New Contact Enquiry — Sukrit Infrastructure Pvt Ltd*",
      "",
      `👤 *Name:* ${nameVal}`,
      `📱 *Phone:* ${phoneVal}`,
      `✉️ *Email:* ${emailVal}`,
      `🏙️ *City:* ${cityVal}`,
      `💬 *Message:* ${messageVal}`,
    ];

    const text = messageLines.join("\n");
    const whatsappUrl = `https://wa.me/919101002790?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.location.href = whatsappUrl;
    }, 1200);
  };

  return (
    <section id="contact" className="py-[120px] px-6 lg:px-12 bg-[var(--ivory)]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="reveal">
          <span className="eyebrow eyebrow-line">Get in Touch</span>
          <h2 className="font-display text-[36px] lg:text-[48px] mt-6 leading-[1.15]">
            Begin Your Journey Home.
          </h2>
          <p className="mt-8 text-[var(--text-muted)] text-[16px] leading-[1.8] max-w-[420px]">
            Visit our experience centre or write to us. Our team will respond personally within one business day.
          </p>

          <div className="mt-12 space-y-6">
            <Item icon={<MapPin size={16} />} label="Address" value="Ward No-01, Rajamaidam, New Colony, Jorhat, Assam 785001" />
            <Item icon={<Phone size={16} />} label="Phone" value="+91 91010 02790" />
            <Item icon={<Mail size={16} />} label="Email" value="hello@sukritinfrastructure.in" />
          </div>

          <div className="mt-12 border border-[var(--divider)] aspect-[16/9] overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.8!2d94.2114948!3d26.7693947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3746c32bf5f9818f%3A0xb2f07978cbf13faa!2sSUKRIT%20INFRASTRUCTURE%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1716000000000"
              className="w-full h-full"
              loading="lazy"
              title="Sukrit Infrastructure Pvt Ltd — Jorhat Office"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* "Get Directions" overlay button */}
            <a
              href="https://www.google.com/maps/dir//SUKRIT+INFRASTRUCTURE+PRIVATE+LIMITED,+Ward+no-01,+Rajamaidam,+New+Colony,+Jorhat,+Dulia+Gaon,+Assam+785001/@26.7693947,94.2114948,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 text-white text-[11px] uppercase tracking-[0.15em] font-medium rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{
                fontFamily: "DM Sans, sans-serif",
                backgroundColor: "#B8963E",
                textDecoration: "none",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              Get Directions
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="reveal space-y-8">
          <Field id="name" label="Full Name" />
          <Field id="phone" label="Phone Number" type="tel" />
          <Field id="email" label="Email Address" type="email" />
          <Field id="city" label="City of Interest" />
          <div className="floating-field">
            <textarea id="message" rows={3} placeholder=" " required />
            <label htmlFor="message">Message</label>
          </div>

          <button
            type="submit"
            disabled={sending || sent}
            className="w-full inline-flex items-center justify-center gap-3 bg-[var(--gold)] text-white py-5 text-[12px] uppercase tracking-[0.3em] font-medium hover:bg-[#9a7d2f] transition-colors disabled:opacity-70"
          >
            {sending ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : sent ? (
              "Thank You — We'll Be In Touch"
            ) : (
              <>Send Enquiry <span>→</span></>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function Item({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-5">
      <div className="text-[var(--gold)] mt-1">{icon}</div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] mb-1">{label}</div>
        <div className="text-[var(--text-soft)] text-[15px]">{value}</div>
      </div>
    </div>
  );
}

function Field({ id, label, type = "text", required = true }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div className="floating-field">
      <input id={id} type={type} placeholder=" " required={required} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
