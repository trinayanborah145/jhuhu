import { useEffect, useState, useMemo } from "react";
import { X, Search } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Sukrit Heights",
    location: "Guwahati",
    type: "Residential",
    status: "Ongoing",
    price: "₹85L - ₹2.5Cr",
    bedrooms: ["2BHK", "3BHK", "4BHK"],
    possession: "2024",
    rera: "RERA/AGU/2023/001",
    description: "Premium residential towers with panoramic city views and world-class amenities in the heart of Guwahati.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    amenities: ["Swimming Pool", "Gym", "Clubhouse", "Landscaped Gardens"],
    progress: 75,
    budget: 2500000,
  },
  {
    id: 2,
    name: "Sukrit Greens",
    location: "Jorhat",
    type: "Residential",
    status: "Ready to Move",
    price: "₹45L - ₹1.2Cr",
    bedrooms: ["2BHK", "3BHK"],
    possession: "2023",
    rera: "RERA/JOR/2022/003",
    description: "Serene living amidst nature with modern conveniences in Jorhat's most sought-after neighborhood.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    amenities: ["Park", "Community Hall", "Security", "Power Backup"],
    progress: 100,
    budget: 1200000,
  },
  {
    id: 3,
    name: "Sukrit Elite",
    location: "Dibrugarh",
    type: "Villas",
    status: "Ongoing",
    price: "₹1.5Cr - ₹3.5Cr",
    bedrooms: ["4BHK", "Penthouse"],
    possession: "2025",
    rera: "RERA/DIB/2024/002",
    description: "Ultra-luxury villas with private gardens and exclusive clubhouse facilities in Dibrugarh.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    amenities: ["Private Garden", "Spa", "Concierge", "Smart Home"],
    progress: 45,
    budget: 3500000,
  },
  {
    id: 4,
    name: "Sukrit Serene",
    location: "Tezpur",
    type: "Residential",
    status: "Upcoming",
    price: "₹55L - ₹1.8Cr",
    bedrooms: ["2BHK", "3BHK", "4BHK"],
    possession: "2026",
    rera: "RERA/TEZ/2025/001",
    description: "Peaceful riverside living with contemporary architecture and premium finishes.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    amenities: ["River View", "Jogging Track", "Meditation Zone", "Yoga Deck"],
    progress: 15,
    budget: 1800000,
  },
  {
    id: 5,
    name: "Sukrit Meadows",
    location: "Silchar",
    type: "Residential",
    status: "Planning",
    price: "₹40L - ₹1.1Cr",
    bedrooms: ["2BHK", "3BHK"],
    possession: "2027",
    rera: "RERA/SIL/2026/001",
    description: "Affordable luxury with thoughtful design for growing families in Silchar.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    amenities: ["Children's Play Area", "Senior Citizen Zone", "Multipurpose Hall"],
    progress: 5,
    budget: 1100000,
  },
  {
    id: 6,
    name: "Sukrit Business Park",
    location: "Guwahati",
    type: "Commercial",
    status: "Completed",
    price: "₹2Cr - ₹8Cr",
    bedrooms: ["Office Space", "Retail"],
    possession: "2022",
    rera: "RERA/AGU/2021/005",
    description: "Grade A commercial complex with modern office spaces and premium retail outlets.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    amenities: ["Central AC", "Parking", "Cafeteria", "Conference Rooms"],
    progress: 100,
    budget: 8000000,
  },
  {
    id: 7,
    name: "Sukrit Township",
    location: "Guwahati",
    type: "Residential",
    status: "Ongoing",
    price: "₹60L - ₹2Cr",
    bedrooms: ["3BHK", "4BHK"],
    possession: "2025",
    rera: "RERA/AGU/2024/004",
    description: "Integrated township with schools, hospitals, and shopping within the community.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    amenities: ["School", "Hospital", "Shopping Mall", "Temple"],
    progress: 60,
    budget: 2000000,
  },
];

export function ProjectsDiscovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [location, setLocation] = useState("all");
  const [status, setStatus] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [possessionYear, setPossessionYear] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [budgetRange, setBudgetRange] = useState([0, 10000000]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = propertyType === "all" || project.type === propertyType;
      const matchesLocation = location === "all" || project.location === location;
      const matchesStatus = status === "all" || project.status === status;
      const matchesBedrooms =
        bedrooms === "all" || project.bedrooms.includes(bedrooms);
      const matchesPossession =
        possessionYear === "all" || project.possession === possessionYear;
      const matchesBudget =
        project.budget >= budgetRange[0] && project.budget <= budgetRange[1];

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation &&
        matchesStatus &&
        matchesBedrooms &&
        matchesPossession &&
        matchesBudget
      );
    });

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => parseInt(b.possession) - parseInt(a.possession));
        break;
      case "premium":
        filtered.sort((a, b) => b.budget - a.budget);
        break;
      case "price-low":
        filtered.sort((a, b) => a.budget - b.budget);
        break;
      case "price-high":
        filtered.sort((a, b) => b.budget - a.budget);
        break;
      default:
        break;
    }

    return filtered;
  }, [
    searchQuery,
    propertyType,
    location,
    status,
    bedrooms,
    possessionYear,
    sortBy,
    budgetRange,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setPropertyType("all");
    setLocation("all");
    setStatus("all");
    setBedrooms("all");
    setPossessionYear("all");
    setSortBy("newest");
    setBudgetRange([0, 10000000]);
  };

  return (
    <section
      className="min-h-screen"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Header */}
      <div
        className="relative pt-[108px] pb-24 px-6 lg:px-[8%]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,1)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="max-w-[1400px] mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease",
          }}
        >
          <span
            className="block text-[11px] tracking-[0.3em] uppercase font-medium mb-4"
            style={{ fontFamily: "DM Sans, sans-serif", color: "#B8963E" }}
          >
            PROJECTS DISCOVERY
          </span>
          <h1
            className="text-[56px] lg:text-[72px] font-normal leading-tight mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#FFFFFF" }}
          >
            World-Class Spaces Built for Legacy
          </h1>
          <p
            className="text-[16px] lg:text-[18px] max-w-[680px] mx-auto leading-relaxed"
            style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
          >
            Discover our portfolio of landmark developments across Assam — each
            project crafted with uncompromising quality, architectural excellence,
            and a commitment to creating spaces that stand the test of time.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{
          backgroundColor: "rgba(10,10,10,0.95)",
          borderColor: "rgba(184,150,62,0.2)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-[8%] py-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[280px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search project name or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 text-sm rounded-lg border transition-all duration-300 focus:outline-none"
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "#FFFFFF",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B8963E";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#888888" }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                    style={{ color: "#888888" }}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Property Type */}
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="px-4 py-3 text-sm rounded-lg border transition-all duration-300 focus:outline-none cursor-pointer"
              style={{
                fontFamily: "DM Sans, sans-serif",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor:
                  propertyType !== "all"
                    ? "#B8963E"
                    : "rgba(255,255,255,0.1)",
                color: propertyType !== "all" ? "#B8963E" : "#FFFFFF",
              }}
            >
              <option value="all">Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Villas">Villas</option>
              <option value="Industrial">Industrial</option>
            </select>

            {/* Location */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-3 text-sm rounded-lg border transition-all duration-300 focus:outline-none cursor-pointer"
              style={{
                fontFamily: "DM Sans, sans-serif",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor:
                  location !== "all" ? "#B8963E" : "rgba(255,255,255,0.1)",
                color: location !== "all" ? "#B8963E" : "#FFFFFF",
              }}
            >
              <option value="all">Location</option>
              <option value="Guwahati">Guwahati</option>
              <option value="Jorhat">Jorhat</option>
              <option value="Dibrugarh">Dibrugarh</option>
              <option value="Silchar">Silchar</option>
              <option value="Tezpur">Tezpur</option>
            </select>

            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-3 text-sm rounded-lg border transition-all duration-300 focus:outline-none cursor-pointer"
              style={{
                fontFamily: "DM Sans, sans-serif",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor:
                  status !== "all" ? "#B8963E" : "rgba(255,255,255,0.1)",
                color: status !== "all" ? "#B8963E" : "#FFFFFF",
              }}
            >
              <option value="all">Status</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Planning">Planning</option>
            </select>

            {/* Bedrooms */}
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="px-4 py-3 text-sm rounded-lg border transition-all duration-300 focus:outline-none cursor-pointer"
              style={{
                fontFamily: "DM Sans, sans-serif",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor:
                  bedrooms !== "all" ? "#B8963E" : "rgba(255,255,255,0.1)",
                color: bedrooms !== "all" ? "#B8963E" : "#FFFFFF",
              }}
            >
              <option value="all">Bedrooms</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="4BHK">4BHK</option>
              <option value="Penthouse">Penthouse</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 text-sm rounded-lg border transition-all duration-300 focus:outline-none cursor-pointer"
              style={{
                fontFamily: "DM Sans, sans-serif",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
                color: "#FFFFFF",
              }}
            >
              <option value="newest">Newest</option>
              <option value="premium">Premium</option>
              <option value="price-low">Price Low to High</option>
              <option value="price-high">Price High to Low</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="px-4 py-3 text-sm rounded-lg border transition-all duration-300 hover:bg-white/10 focus:outline-none"
              style={{
                fontFamily: "DM Sans, sans-serif",
                backgroundColor: "transparent",
                borderColor: "rgba(255,255,255,0.1)",
                color: "#888888",
              }}
            >
              Clear
            </button>
          </div>

          {/* Budget Slider */}
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span
                className="text-xs"
                style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
              >
                Budget Range
              </span>
              <span
                className="text-xs"
                style={{ fontFamily: "DM Sans, sans-serif", color: "#B8963E" }}
              >
                ₹{(budgetRange[0] / 100000).toFixed(0)}L - ₹
                {(budgetRange[1] / 100000).toFixed(0)}L
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={budgetRange[1]}
              onChange={(e) => setBudgetRange([0, parseInt(e.target.value)])}
              className="w-full h-1 rounded-lg appearance-none cursor-pointer"
              style={{
                background: "linear-gradient(to right, #B8963E 0%, #B8963E 100%)",
                accentColor: "#B8963E",
              }}
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[8%] py-16">
        <div className="flex justify-between items-center mb-8">
          <p
            className="text-sm"
            style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
          >
            {filteredProjects.length} Project{filteredProjects.length !== 1 ? "s" : ""}{" "}
            Found
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div
            className="text-center py-24"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <div
              className="text-6xl mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#B8963E" }}
            >
              No Results
            </div>
            <p
              className="text-lg mb-4"
              style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
            >
              No matching projects found.
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: "DM Sans, sans-serif", color: "#666666" }}
            >
              Try adjusting your filters or search terms to find what you're looking
              for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="relative group rounded-2xl overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  transitionDelay: `${index * 0.05}s`,
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1.5 text-xs font-medium rounded-full"
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        backgroundColor: "#B8963E",
                        color: "#FFFFFF",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {project.progress < 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1">
                      <div
                        className="h-full transition-all duration-1000"
                        style={{
                          width: `${project.progress}%`,
                          backgroundColor: "#B8963E",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3
                        className="text-xl font-semibold mb-1"
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          color: "#FFFFFF",
                        }}
                      >
                        {project.name}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
                      >
                        {project.location}
                      </p>
                    </div>
                    <div
                      className="text-right"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      <div
                        className="text-lg font-semibold"
                        style={{ color: "#B8963E" }}
                      >
                        {project.price}
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      color: "#CCCCCC",
                      lineHeight: 1.6,
                    }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.bedrooms.map((bed) => (
                      <span
                        key={bed}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          backgroundColor: "rgba(184,150,62,0.1)",
                          color: "#B8963E",
                          border: "1px solid rgba(184,150,62,0.3)",
                        }}
                      >
                        {bed}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs mb-4">
                    <span
                      style={{ fontFamily: "DM Sans, sans-serif", color: "#666666" }}
                    >
                      Possession: {project.possession}
                    </span>
                    <span
                      style={{ fontFamily: "DM Sans, sans-serif", color: "#666666" }}
                    >
                      {project.rera}
                    </span>
                  </div>

                  {/* Quick View */}
                  {hoveredProject === project.id && (
                    <div
                      className="absolute inset-0 bg-black/95 p-6 flex flex-col justify-center transition-all duration-300"
                      style={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                    >
                      <h4
                        className="text-sm font-semibold mb-3"
                        style={{ fontFamily: "DM Sans, sans-serif", color: "#B8963E" }}
                      >
                        Amenities
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {project.amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-2 text-xs"
                            style={{ fontFamily: "DM Sans, sans-serif", color: "#CCCCCC" }}
                          >
                            <span style={{ color: "#B8963E" }}>✓</span> {amenity}
                          </div>
                        ))}
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span
                            style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
                          >
                            Construction Progress
                          </span>
                          <span
                            style={{ fontFamily: "DM Sans, sans-serif", color: "#B8963E" }}
                          >
                            {project.progress}%
                          </span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${project.progress}%`,
                              backgroundColor: "#B8963E",
                            }}
                          />
                        </div>
                      </div>
                      <button
                        className="w-full py-3 text-sm font-medium rounded-lg transition-all duration-300"
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          backgroundColor: "#B8963E",
                          color: "#FFFFFF",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#9A8035";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#B8963E";
                        }}
                      >
                        View Project Details
                      </button>
                    </div>
                  )}

                  {!hoveredProject && (
                    <button
                      className="w-full py-3 text-sm font-medium rounded-lg border transition-all duration-300"
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        backgroundColor: "transparent",
                        borderColor: "#B8963E",
                        color: "#B8963E",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#B8963E";
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#B8963E";
                      }}
                    >
                      View Project
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        select option {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          section h1 {
            font-size: 42px !important;
          }
        }
      `}</style>
    </section>
  );
}
