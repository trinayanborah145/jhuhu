import { useEffect, useRef, useState } from "react";

export function LoanPartners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="loan-partners"
      ref={sectionRef}
      className="relative py-[100px]"
      style={{ backgroundColor: "#F8F5F0" }}
    >
      <div className="max-w-[1100px] mx-auto px-6 lg:px-[8%]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-[48px]">
          {/* Left Column */}
          <div
            className="w-full md:w-[55%]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.85s ease",
            }}
          >
            <div
              className="text-[11px] uppercase font-medium mb-[14px]"
              style={{
                fontFamily: "DM Sans, sans-serif",
                letterSpacing: "0.28em",
                color: "#B8963E",
              }}
            >
              FINANCING PARTNERS
            </div>
            <h2
              className="font-normal m-0 loan-partners-heading"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#1C1C1C",
                lineHeight: 1.15,
              }}
            >
              We Help You Finance <br />
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#B8963E",
                  textDecorationThickness: "1.5px",
                  textUnderlineOffset: "6px",
                }}
              >
                Your Dream Home.
              </span>
            </h2>
          </div>

          {/* Right Column */}
          <div
            className="w-full md:w-[45%]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.85s ease 0.15s",
            }}
          >
            <p
              className="text-[14px] font-normal mb-[20px]"
              style={{
                fontFamily: "DM Sans, sans-serif",
                color: "#888888",
                lineHeight: 1.7,
                margin: "0 0 20px 0",
              }}
            >
              Our trusted banking partners offer exclusive home loan assistance with competitive interest rates and simplified documentation — so you can focus on choosing your home, not the paperwork.
            </p>
            <a
              id="loan-advisor-whatsapp-cta"
              href={`https://wa.me/919395297074?text=${encodeURIComponent(
                "Hello,\n\nI am interested in purchasing a property with Sukrit Infrastructure Pvt Ltd and would like to enquire about home loan options.\n\nCould you please guide me on:\n• Eligible loan amount & interest rates\n• Required documents\n• EMI & repayment options\n• Bank tie-ups (LIC)\n\nLooking forward to your assistance.\n\nThank you 🙏"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="loan-cta-btn w-full md:w-auto inline-flex items-center justify-center gap-2 group"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #1C1C1C",
                color: "#1C1C1C",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 500,
                padding: "12px 26px",
                borderRadius: "0",
                transition: "all 0.35s ease",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#25D366";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#25D366";
                (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1C1C1C";
                (e.currentTarget as HTMLAnchorElement).style.color = "#1C1C1C";
              }}
            >
              {/* WhatsApp icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              TALK TO OUR LOAN ADVISOR →
            </a>
          </div>
        </div>

        {/* Full Width Divider */}
        <div
          className="mt-[36px]"
          style={{
            borderTop: "1px solid #E2DDD8",
            transformOrigin: "left",
            transform: isVisible ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.9s ease 0.3s",
          }}
        />

        {/* Bank Cards */}
        <div className="flex justify-center bank-cards-container max-w-sm mx-auto">
          {/* Card 1 */}
          <div
            className="bank-card w-full"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s, background 0.35s ease, color 0.35s ease, border-color 0.35s ease",
            }}
          >
            <div className="card-number">01</div>
            <div className="card-bank-name" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src="/lic-logo.png" alt="LIC Logo" style={{ height: "42px", objectFit: "contain" }} />
              <span>LIC</span>
            </div>
            <div className="card-bank-type">Home Loans</div>
            <div className="card-separator">
              <div className="card-approved">Approved Lending Partner</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mx-auto mt-[28px]" style={{ maxWidth: "560px" }}>
          <p
            className="text-[11px] italic m-0"
            style={{ fontFamily: "DM Sans, sans-serif", color: "#AAAAAA" }}
          >
            * Home loan approval is subject to respective bank eligibility criteria and documentation. Sukrit Infrastructure Pvt Ltd facilitates this process as a referral partner.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        .loan-partners-heading {
          font-size: 42px;
        }

        .bank-cards-container {
          gap: 0;
          margin-top: 0;
        }

        .bank-card {
          background-color: #FFFFFF;
          border: 1px solid #E2DDD8;
          border-radius: 0;
          padding: 36px 32px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        /* Border sharing rules desktop */
        @media (min-width: 768px) {
          .bank-card:not(:last-child) {
            border-right: none;
          }
        }

        /* Border sharing rules mobile */
        @media (max-width: 767px) {
          .loan-partners-heading {
            font-size: 34px !important;
          }
          .bank-card {
            width: 100%;
            border-top: 1px solid #E2DDD8;
          }
          .bank-card:not(:last-child) {
            border-bottom: none;
          }
        }

        .card-number {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #D0CBC4;
          letter-spacing: 0.1em;
          margin-bottom: 18px;
          transition: color 0.35s ease;
        }

        .card-bank-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 400;
          line-height: 1;
          color: #1C1C1C;
          transition: color 0.35s ease;
        }

        .card-bank-type {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #B8963E;
          margin-bottom: 24px;
        }

        .card-separator {
          border-top: 1px solid #E2DDD8;
          margin-top: auto;
          padding-top: 16px;
          transition: border-color 0.35s ease;
        }

        .card-approved {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #B8963E;
        }

        /* Hover States */
        .bank-card:hover {
          background-color: #1C1C1C !important;
        }
        
        .bank-card:hover .card-number {
          color: #555555;
        }

        .bank-card:hover .card-bank-name {
          color: #FFFFFF;
        }

        .bank-card:hover .card-separator {
          border-color: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </section>
  );
}
