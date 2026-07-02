import { useState, useEffect } from "react";
import { IconX, IconChevronDown, IconDownload, IconLoader2, IconLock } from "@tabler/icons-react";

export function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    budget: "",
  });

  const [propertyType, setPropertyType] = useState("Residential");

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    district: false,
    budget: false,
  });

  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success">("idle");
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // 1. Session storage check
    const hasShown = sessionStorage.getItem("popupShown");
    if (hasShown === "true") {
      return;
    }

    // 2. Trigger 1.5s delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("popupShown", "true");
      // Let React render first, then apply entering animation class
      requestAnimationFrame(() => {
        setIsAnimatingIn(true);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setIsAnimatingIn(false);
    sessionStorage.setItem("popupShown", "true");
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimatingOut(false);
    }, 300); // matches 300ms close animation
  };

  const handleDownload = async () => {
    window.open("https://drive.google.com/file/d/1fwnuj0Qw8CppqZ7GrGpMGLSVcVTGPKLS/view?usp=sharing", "_blank");
  };

  const triggerMailto = () => {
    window.location.href =
      "mailto:info@sukritinfras.com?subject=Request for Sukrit Infrastructure Property Catalogue&body=Hello,%0D%0A%0D%0AI would like to request the latest Sukrit Infrastructure Property Catalogue for 2025.%0D%0A%0D%0AThank you!";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim(),
      district: !formData.district.trim(),
      budget: !formData.budget,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err);

    if (hasErrors) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setSubmitStatus("sending");

    setTimeout(() => {
      setSubmitStatus("success");
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        /* Shake animation */
        @keyframes popup-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .popup-shake-btn {
          animation: popup-shake 0.4s ease-in-out;
        }

        /* Spinner rotation */
        @keyframes popup-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .popup-spinner {
          animation: popup-spin 1s linear infinite;
        }

        /* Float styling */
        .popup-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 8, 6, 0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 99998;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .popup-backdrop.animate-in {
          opacity: 1;
        }
        .popup-backdrop.animate-out {
          opacity: 0;
          transition: opacity 0.3s ease-in;
        }

        .popup-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.94);
          opacity: 0;
          z-index: 99999;
          width: 560px;
          max-width: 92vw;
          border-radius: 4px;
          background: #F8F5F0;
          padding: 52px 52px 44px 52px;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.35);
          max-height: 92vh;
          overflow-y: auto;
          transition: opacity 0.55s cubic-bezier(0.34, 1.20, 0.64, 1), transform 0.55s cubic-bezier(0.34, 1.20, 0.64, 1);
        }
        .popup-container.animate-in {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .popup-container.animate-out {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.96);
          transition: opacity 0.3s ease-in, transform 0.3s ease-in;
        }

        /* Field designs */
        .popup-field {
          position: relative;
          padding-top: 18px;
          width: 100%;
        }

        .popup-field input,
        .popup-field select {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #D0CBC4;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1C1C1C;
          padding: 12px 0 10px 0;
          border-radius: 0;
          transition: border-color 0.3s ease;
          appearance: none;
          -webkit-appearance: none;
        }

        .popup-field input::placeholder {
          color: transparent;
          transition: color 0.25s ease;
        }
        .popup-field input:focus::placeholder {
          color: #AAAAAA;
        }

        .popup-field label {
          position: absolute;
          left: 0;
          top: 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #AAAAAA;
          pointer-events: none;
          transition: all 0.25s ease;
        }

        /* Focus & Filled Logic */
        .popup-field input:focus + label,
        .popup-field input.is-filled + label,
        .popup-field select:focus + label,
        .popup-field select.is-filled + label {
          top: 0px;
          font-size: 10px;
          color: #B8963E;
        }

        .popup-field input:focus,
        .popup-field select:focus {
          border-bottom-color: #B8963E;
        }

        .popup-field input.is-filled,
        .popup-field select.is-filled {
          border-bottom-color: #1C1C1C;
        }

        .popup-field input.is-error,
        .popup-field select.is-error {
          border-bottom-color: #E53935 !important;
        }

        .popup-field input.is-error + label,
        .popup-field select.is-error + label {
          color: #E53935 !important;
        }

        /* Layout Grid */
        .popup-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 20px;
        }

        .popup-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          outline: none;
        }
        .popup-close-btn:hover {
          background: #1C1C1C;
          border-color: #1C1C1C;
        }
        .popup-close-btn:hover svg {
          color: #FFFFFF !important;
        }

        /* Pill toggles */
        .pill-toggle {
          background: transparent;
          border: 1px solid #D0CBC4;
          color: #888888;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 9px 20px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
        }
        .pill-toggle.is-active {
          background: #1C1C1C;
          border-color: #1C1C1C;
          color: #FFFFFF;
        }

        /* Download button styling */
        .popup-download-btn {
          border: 1px solid #B8963E;
          color: #B8963E;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 8px 18px;
          border-radius: 50px;
          cursor: pointer;
          transition: 0.3s ease;
          outline: none;
        }
        .popup-download-btn:hover {
          background: #B8963E;
          color: #FFFFFF;
        }

        /* Responsive */
        @media (max-width: 767px) {
          .popup-container {
            padding: 36px 28px 32px;
          }
          .popup-row {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 16px;
          }
          .pill-row {
            flex-wrap: wrap;
          }
          .catalogue-row {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .popup-download-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`popup-backdrop ${isAnimatingIn ? "animate-in" : ""} ${
          isAnimatingOut ? "animate-out" : ""
        }`}
        onClick={handleClose}
      />

      {/* Main Container */}
      <div
        className={`popup-container ${isAnimatingIn ? "animate-in" : ""} ${
          isAnimatingOut ? "animate-out" : ""
        }`}
      >
        {/* Close Button */}
        <button className="popup-close-btn" onClick={handleClose} aria-label="Close popup">
          <IconX size={16} color="#888888" style={{ transition: "color 0.25s ease" }} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#B8963E",
              marginBottom: "8px",
            }}
          >
            EXCLUSIVE ENQUIRY
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "48px",
              fontWeight: 400,
              color: "#1C1C1C",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: "0",
            }}
          >
            FIND YOUR <br />
            <span style={{ fontStyle: "italic", color: "#B8963E" }}>DREAM</span> PROPERTY.
          </h2>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#B8963E",
              margin: "16px auto 6px",
            }}
          />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "#888888",
              fontWeight: 400,
              lineHeight: 1.65,
              maxWidth: "380px",
              margin: "12px auto 0 auto",
            }}
          >
            Share your details and our team will reach out with the perfect property options for you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: "32px" }} noValidate>
          {/* Row 1 */}
          <div className="popup-row">
            <div className="popup-field">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: false });
                }}
                placeholder="Your Full Name"
                className={`${formData.name ? "is-filled" : ""} ${errors.name ? "is-error" : ""}`}
              />
              <label>Full Name</label>
            </div>

            <div className="popup-field">
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: false });
                }}
                placeholder="+91 XXXXX XXXXX"
                className={`${formData.phone ? "is-filled" : ""} ${errors.phone ? "is-error" : ""}`}
              />
              <label>Phone Number</label>
            </div>
          </div>

          {/* Row 2 */}
          <div className="popup-row">
            <div>
              <div className="popup-field">
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => {
                    setFormData({ ...formData, district: e.target.value });
                    if (errors.district) setErrors({ ...errors, district: false });
                  }}
                  placeholder="Your District"
                  className={`${formData.district ? "is-filled" : ""} ${
                    errors.district ? "is-error" : ""
                  }`}
                />
                <label>District</label>
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  color: "#AAAAAA",
                  marginTop: "6px",
                }}
              >
                e.g. Guwahati, Jorhat, Dibrugarh
              </div>
            </div>

            <div className="popup-field" style={{ position: "relative" }}>
              <select
                required
                value={formData.budget}
                onChange={(e) => {
                  setFormData({ ...formData, budget: e.target.value });
                  if (errors.budget) setErrors({ ...errors, budget: false });
                }}
                className={`${formData.budget ? "is-filled" : ""} ${errors.budget ? "is-error" : ""}`}
              >
                <option value="" disabled hidden></option>
                <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                <option value="₹25L – ₹50L">₹25L – ₹50L</option>
                <option value="₹50L – ₹1 Crore">₹50L – ₹1 Crore</option>
                <option value="₹1Cr – ₹2 Crore">₹1Cr – ₹2 Crore</option>
                <option value="₹2Cr – ₹5 Crore">₹2Cr – ₹5 Crore</option>
                <option value="Above ₹5 Crore">Above ₹5 Crore</option>
              </select>
              <label>SELECT BUDGET</label>
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  bottom: "14px",
                  pointerEvents: "none",
                }}
              >
                <IconChevronDown size={14} color="#B8963E" />
              </div>
            </div>
          </div>

          {/* Row 3 - Property Type */}
          <div style={{ marginTop: "24px" }}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#888888",
                marginBottom: "12px",
              }}
            >
              PROPERTY TYPE
            </div>
            <div className="pill-row" style={{ display: "flex", gap: "10px" }}>
              {["Residential", "Commercial", "Resi Commercial", "Assam Type"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPropertyType(type)}
                  className={`pill-toggle ${propertyType === type ? "is-active" : ""}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Row 4 - Divider */}
          <div
            style={{
              borderTop: "1px solid #E2DDD8",
              margin: "24px 0",
            }}
          />

          {/* Catalogue Download Option */}
          <div
            className="catalogue-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              padding: "4px 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <IconDownload size={20} color="#B8963E" style={{ flexShrink: 0 }} />
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#1C1C1C",
                    fontWeight: 500,
                  }}
                >
                  Download our Property Catalogue
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: "#AAAAAA",
                    marginTop: "2px",
                  }}
                >
                  PDF • 2.4 MB • Latest Projects 2025
                </div>
              </div>
            </div>
            <button type="button" onClick={handleDownload} className="popup-download-btn">
              DOWNLOAD
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitStatus !== "idle"}
            className={`popup-submit-btn ${isShaking ? "popup-shake-btn" : ""}`}
            style={{
              marginTop: "28px",
              backgroundColor:
                submitStatus === "success"
                  ? "#2E7D32"
                  : submitStatus === "sending"
                    ? "#1C1C1C"
                    : "#1C1C1C",
              color: "#FFFFFF",
              border: "none",
              width: "100%",
              padding: "16px",
              borderRadius: "0",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontWeight: 500,
              cursor: submitStatus === "idle" ? "pointer" : "default",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              if (submitStatus === "idle") {
                e.currentTarget.style.backgroundColor = "#B8963E";
              }
            }}
            onMouseLeave={(e) => {
              if (submitStatus === "idle") {
                e.currentTarget.style.backgroundColor = "#1C1C1C";
              }
            }}
          >
            {submitStatus === "sending" ? (
              <>
                SENDING...
                <IconLoader2 size={14} className="popup-spinner" color="#FFFFFF" />
              </>
            ) : submitStatus === "success" ? (
              "✓ ENQUIRY SENT SUCCESSFULLY"
            ) : (
              "SEND MY ENQUIRY →"
            )}
          </button>

          {/* Bottom Privacy Note */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginTop: "16px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "#AAAAAA",
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            <IconLock size={12} color="#AAAAAA" style={{ flexShrink: 0 }} />
            <span>Your information is 100% private and will never be shared with third parties.</span>
          </div>
        </form>
      </div>
    </>
  );
}
