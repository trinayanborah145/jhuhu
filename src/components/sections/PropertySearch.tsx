import { useState } from "react";
import { Building2, MapPin, HardHat, BedDouble, MessageCircle } from "lucide-react";

const tabs = ["Residential", "Commercial", "Resi Commercial", "Assam Type"];

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
    <section className="py-[120px] px-6 lg:px-12 bg-[var(--ivory)]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
          <div className="bg-white border border-[var(--divider)] p-8 lg:p-10">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-[var(--divider)]">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => handleTabChange(i)}
                  className={`relative pb-4 text-[12px] uppercase tracking-[0.25em] font-medium transition-colors ${
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <Selector
                icon={<BedDouble size={16} />}
                label="Bedrooms"
                options={["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Shop / Commercial"]}
                value={bedrooms}
                onChange={setBedrooms}
              />
              <div>
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
              className="mt-10 w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--charcoal)] text-white text-[12px] uppercase tracking-[0.25em] hover:bg-[#25D366] transition-colors duration-300 group"
            >
              <MessageCircle
                size={16}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              24 Projects Found — Enquire on WhatsApp
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>

            {/* Subtle note */}
            <p className="mt-3 text-[11px] text-[var(--text-muted)]" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Your selected filters will be sent directly in the message to our team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
