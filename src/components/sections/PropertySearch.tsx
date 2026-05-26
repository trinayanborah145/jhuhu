import { useState } from "react";
import { Building2, MapPin, HardHat, BedDouble, MessageCircle } from "lucide-react";

const tabs = ["Filter Out Your Needs"];

const assamDistricts = [
  "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo",
  "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao",
  "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat",
  "Kamrup Metropolitan", "Kamrup", "Karbi Anglong", "Karimganj",
  "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari",
  "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia",
  "Udalguri", "West Karbi Anglong",
];

const WHATSAPP_NUMBER = "919101002790";

// Helper function to convert slider value to budget string
function formatBudget(sliderValue: number): string {
  if (sliderValue < 1) {
    const lakhs = Math.round(sliderValue * 100);
    return `₹${lakhs.toLocaleString('en-IN')} Lakh`;
  } else {
    return `₹${sliderValue} Cr`;
  }
}

function buildWhatsAppUrl(
  propertyType: string,
  location: string,
  status: string,
  bedrooms: string,
  budget: number
) {
  const lines = [
    "🏠 *Property Enquiry — Sukrit Infrastructure Pvt Ltd*",
    "",
    `📌 *Property Type:* ${propertyType}`,
    `📍 *District:*       ${location}`,
    `🛏️ *Bedrooms:*      ${bedrooms}`,
    `🏗️ *Status:*         ${status}`,
    `💰 *Budget:*         ${formatBudget(budget)}`,
    "",
    "Please share available properties matching the above criteria.",
  ];
  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ─── Controlled Selector ─── */
function Selector({
  icon,
  label,
  options,
  value,
  onChange,
}: {
  icon?: React.ReactNode;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border-b border-[var(--divider)] pb-3 relative">
      <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-2">
        {label}
      </div>
      <div className="flex items-center gap-3 text-[var(--text-soft)] text-[14px]">
        {icon && <span className="text-[var(--gold)]">{icon}</span>}
        <select
          className="w-full bg-transparent outline-none appearance-none cursor-pointer"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-black">
              {opt}
            </option>
          ))}
        </select>
        <span className="absolute right-0 bottom-3 text-[var(--text-muted)] pointer-events-none">
          ▾
        </span>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export function PropertySearch() {
  const [tab, setTab] = useState(0);
  const [budget, setBudget] = useState(0.5);

  // Controlled filter state
  const [propertyType, setPropertyType] = useState("Residential");
  const [location, setLocation] = useState("Kamrup Metropolitan");
  const [status, setStatus] = useState("6-1 year");
  const [bedrooms, setBedrooms] = useState("3bhk");

  // Sync tab with propertyType
  const handleTabChange = (i: number) => {
    setTab(i);
    setPropertyType(tabs[i]);
  };

  const whatsappUrl = buildWhatsAppUrl(propertyType, location, status, bedrooms, budget);

  return (
    <section className="py-[120px] px-6 lg:px-12 bg-[var(--ivory)] overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-x-hidden">
        {/* Left text */}
        <div className="lg:col-span-5 reveal">
          <span className="eyebrow eyebrow-line">Discover</span>
          <h2 className="font-display text-[32px] lg:text-[44px] mt-6 leading-[1.15]">
            Find the most{" "}
            <span className="italic text-[var(--gold)]">reliable</span> &{" "}
            <span className="italic text-[var(--gold)]">appreciating</span>{" "}
            Real Estate Properties
          </h2>
        </div>

        {/* Right filter card */}
        <div className="lg:col-span-7 reveal">
          <div className="bg-white border border-[var(--divider)] p-8 lg:p-10 property-filter-card">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-[var(--divider)] property-tabs-row overflow-x-auto overflow-y-hidden -webkit-overflow-scrolling: touch scrollbar-hide">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => handleTabChange(i)}
                  className={`relative pb-4 text-[12px] uppercase tracking-[0.25em] font-medium transition-colors flex-shrink-0 whitespace-nowrap ${
                    tab === i
                      ? "text-[var(--text-soft)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {t}
                  {tab === i && (
                    <span className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[var(--gold)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Filters row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 property-filters-grid">
              <Selector
                icon={<Building2 size={16} />}
                label="Project Type"
                options={["Residential", "Commercial", "Resi Commercial", "Assam Type"]}
                value={propertyType}
                onChange={setPropertyType}
              />
              <Selector
                icon={<MapPin size={16} />}
                label="District"
                options={assamDistricts}
                value={location}
                onChange={setLocation}
              />
              <Selector
                icon={<HardHat size={16} />}
                label="Status"
                options={["6 months – 1 year", "1 – 2 years", "1.5 – 2.5 years"]}
                value={status}
                onChange={setStatus}
              />
            </div>

            {/* Filters row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 property-filters-grid">
              <Selector
                icon={<BedDouble size={16} />}
                label="Bedrooms"
                options={["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Shop / Commercial"]}
                value={bedrooms}
                onChange={setBedrooms}
              />
              <div className="w-full">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-3">
                  Budget · {formatBudget(budget)}
                </div>
                <input
                  type="range"
                  min={0.01}
                  max={10}
                  step={0.01}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-[var(--gold)]"
                />
                <div className="flex justify-between text-[11px] text-[var(--text-muted)] mt-2">
                  <span>₹1 Lakh</span>
                  <span>₹10 Cr</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              id="property-search-whatsapp-cta"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--charcoal)] text-white text-[12px] uppercase tracking-[0.25em] hover:bg-[#25D366] transition-colors duration-300 group property-whatsapp-btn"
            >
              <MessageCircle
                size={16}
                className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
              />
              <span className="text-center flex-1">Enquire on WhatsApp</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0">→</span>
            </a>

            {/* Subtle note */}
            <p className="mt-3 text-[11px] text-[var(--text-muted)]" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Your selected filters will be sent directly in the message to our team.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .property-filter-card {
            padding: 16px !important;
            max-width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }

          .property-tabs-row {
            gap: 12px !important;
            scrollbar-width: none;
            -ms-overflow-style: none;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            scroll-snap-type: x mandatory !important;
            padding-bottom: 4px !important;
          }

          .property-tabs-row::-webkit-scrollbar {
            display: none;
          }

          .property-tabs-row button {
            padding: 8px 14px !important;
            font-size: 9px !important;
            letter-spacing: 0.12em !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
            min-width: fit-content !important;
          }

          .property-filters-grid {
            gap: 12px !important;
          }

          .property-whatsapp-btn {
            padding: 12px 16px !important;
            font-size: 10px !important;
            white-space: nowrap !important;
            word-break: normal !important;
            width: 100% !important;
            max-width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 8px !important;
            height: auto !important;
            min-height: 56px !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }

          input[type="range"] {
            width: 100% !important;
            max-width: 100% !important;
            height: 4px !important;
            padding: 0 !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }

          .property-filters-grid > div:last-child {
            width: 100% !important;
            box-sizing: border-box !important;
          }

          input[type="range"]::-webkit-slider-thumb {
            width: 16px !important;
            height: 16px !important;
          }

          input[type="range"]::-moz-range-thumb {
            width: 16px !important;
            height: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .property-filter-card {
            padding: 12px !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }

          .property-tabs-row {
            gap: 8px !important;
          }

          .property-tabs-row button {
            padding: 6px 10px !important;
            font-size: 8px !important;
            letter-spacing: 0.1em !important;
          }

          .property-filters-grid {
            gap: 10px !important;
          }

          .property-whatsapp-btn {
            padding: 10px 12px !important;
            font-size: 9px !important;
            letter-spacing: 0.08em !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 6px !important;
            height: auto !important;
            min-height: 52px !important;
            white-space: nowrap !important;
            word-break: normal !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }

          input[type="range"] {
            height: 3px !important;
            box-sizing: border-box !important;
          }

          .property-filters-grid > div:last-child {
            width: 100% !important;
            box-sizing: border-box !important;
          }

          input[type="range"]::-webkit-slider-thumb {
            width: 14px !important;
            height: 14px !important;
          }

          input[type="range"]::-moz-range-thumb {
            width: 14px !important;
            height: 14px !important;
          }
        }

        @media (max-width: 390px) {
          .property-filter-card {
            padding: 10px !important;
            box-sizing: border-box !important;
          }

          .property-tabs-row button {
            padding: 5px 8px !important;
            font-size: 7px !important;
            letter-spacing: 0.08em !important;
          }

          .property-filters-grid {
            gap: 8px !important;
          }

          .property-whatsapp-btn {
            padding: 8px 10px !important;
            font-size: 8px !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 5px !important;
            height: auto !important;
            min-height: 48px !important;
            white-space: nowrap !important;
            word-break: normal !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }

          input[type="range"] {
            height: 3px !important;
            box-sizing: border-box !important;
          }

          .property-filters-grid > div:last-child {
            width: 100% !important;
            box-sizing: border-box !important;
          }

          input[type="range"]::-webkit-slider-thumb {
            width: 12px !important;
            height: 12px !important;
          }

          input[type="range"]::-moz-range-thumb {
            width: 12px !important;
            height: 12px !important;
          }
        }

        @media (max-width: 414px) {
          .property-filter-card {
            padding: 9px !important;
            box-sizing: border-box !important;
          }

          .property-tabs-row button {
            padding: 5px 8px !important;
            font-size: 7px !important;
            letter-spacing: 0.07em !important;
          }

          .property-filters-grid {
            gap: 7px !important;
          }

          .property-whatsapp-btn {
            padding: 7px 9px !important;
            font-size: 7px !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 4px !important;
            height: auto !important;
            min-height: 46px !important;
            white-space: nowrap !important;
            word-break: normal !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }

          input[type="range"] {
            height: 2px !important;
            box-sizing: border-box !important;
          }

          .property-filters-grid > div:last-child {
            width: 100% !important;
            box-sizing: border-box !important;
          }

          input[type="range"]::-webkit-slider-thumb {
            width: 11px !important;
            height: 11px !important;
          }

          input[type="range"]::-moz-range-thumb {
            width: 11px !important;
            height: 11px !important;
          }
        }

        @media (max-width: 360px) {
          .property-filter-card {
            padding: 8px !important;
            box-sizing: border-box !important;
          }

          .property-tabs-row button {
            padding: 4px 6px !important;
            font-size: 7px !important;
            letter-spacing: 0.06em !important;
          }

          .property-filters-grid {
            gap: 6px !important;
          }

          .property-whatsapp-btn {
            padding: 6px 8px !important;
            font-size: 7px !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 4px !important;
            height: auto !important;
            min-height: 44px !important;
            white-space: nowrap !important;
            word-break: normal !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }

          input[type="range"] {
            height: 2px !important;
            box-sizing: border-box !important;
          }

          .property-filters-grid > div:last-child {
            width: 100% !important;
            box-sizing: border-box !important;
          }

          input[type="range"]::-webkit-slider-thumb {
            width: 10px !important;
            height: 10px !important;
          }

          input[type="range"]::-moz-range-thumb {
            width: 10px !important;
            height: 10px !important;
          }
        }

        @media (max-width: 320px) {
          .property-filter-card {
            padding: 6px !important;
            box-sizing: border-box !important;
          }

          .property-tabs-row button {
            padding: 3px 5px !important;
            font-size: 6px !important;
            letter-spacing: 0.05em !important;
          }

          .property-filters-grid {
            gap: 4px !important;
          }

          .property-whatsapp-btn {
            padding: 5px 6px !important;
            font-size: 6px !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 3px !important;
            height: auto !important;
            min-height: 40px !important;
            white-space: nowrap !important;
            word-break: normal !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }

          input[type="range"] {
            height: 2px !important;
            box-sizing: border-box !important;
          }

          .property-filters-grid > div:last-child {
            width: 100% !important;
            box-sizing: border-box !important;
          }

          input[type="range"]::-webkit-slider-thumb {
            width: 8px !important;
            height: 8px !important;
          }

          input[type="range"]::-moz-range-thumb {
            width: 8px !important;
            height: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
