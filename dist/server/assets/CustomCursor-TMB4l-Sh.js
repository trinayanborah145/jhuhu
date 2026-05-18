import { r as reactExports, V as jsxRuntimeExports } from "./server-Cm967Dt7.js";
import { L as Link } from "./router-CiaHUQ-j.js";
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$6 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$6);
const __iconNode$5 = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
];
const Linkedin = createLucideIcon("linkedin", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
];
const Youtube = createLucideIcon("youtube", __iconNode);
const links = [
  { label: "Our Legacy", to: "/", hash: "legacy" },
  { label: "Projects", to: "/projects" },
  { label: "Vision", to: "/", hash: "vision" },
  { label: "Contact", to: "/", hash: "contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = reactExports.useState(false);
  const [menuAnimationState, setMenuAnimationState] = reactExports.useState("closed");
  const [mobileProjectsOpen, setMobileProjectsOpen] = reactExports.useState(false);
  const [navHeight, setNavHeight] = reactExports.useState(84);
  const menuTimeoutRef = reactExports.useRef(null);
  const headerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    if (headerRef.current) {
      setNavHeight(headerRef.current.offsetHeight);
    }
  }, []);
  const openProjectsMenu = () => {
    setIsProjectsMenuOpen(true);
    setMenuAnimationState("entering");
    setTimeout(() => setMenuAnimationState("visible"), 50);
  };
  const closeProjectsMenu = () => {
    setMenuAnimationState("exiting");
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setIsProjectsMenuOpen(false);
      setMenuAnimationState("closed");
    }, 300);
  };
  reactExports.useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        ref: headerRef,
        className: `fixed top-0 left-0 right-0 transition-all duration-500 ${isProjectsMenuOpen ? "menu-open" : scrolled ? "bg-[rgba(248,245,240,0.92)] backdrop-blur-md border-b border-[var(--divider)]" : "bg-transparent border-b border-transparent"}`,
        style: {
          animation: "fadeDown 0.8s ease 0.3s both",
          zIndex: 1e4
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
          @keyframes fadeDown {
            from { opacity:0; transform:translateY(-20px);}
            to {opacity:1; transform:translateY(0);}
          }
          @keyframes underlineSlide {
            from { transform: scaleX(0); transform-origin: left; }
            to { transform: scaleX(1); transform-origin: left; }
          }
          .menu-open {
            background: rgba(15, 13, 11, 0.98) !important;
            backdrop-filter: blur(0px) !important;
          }
        ` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-12 h-[84px] flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/",
                className: `font-display uppercase text-[14px] sm:text-[16px] lg:text-[18px] font-medium transition-colors ${isProjectsMenuOpen ? "text-white" : scrolled ? "text-[var(--text-soft)]" : "text-white"}`,
                style: { letterSpacing: "0.16em", flexShrink: 1, minWidth: 0 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sukrit Infrastructure Pvt Ltd" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Sukrit Pvt Ltd" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-sans font-normal tracking-[0.1em] opacity-60 mt-0.5", style: { textTransform: "none" }, children: [
                    "CIN U41001AS2026PTC029861 ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 opacity-50", children: "|" }),
                    " UNIT OF AB GROUP"
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden lg:flex items-center gap-10", children: [
              links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: l.label === "Projects" ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/projects",
                  onMouseEnter: openProjectsMenu,
                  className: `text-[12px] font-medium uppercase transition-colors hover:text-[var(--gold)] relative ${isProjectsMenuOpen ? "text-white/90" : scrolled ? "text-[var(--text-soft)]" : "text-white/90"}`,
                  style: { letterSpacing: "0.18em" },
                  children: [
                    l.label,
                    isProjectsMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute bottom-0 left-0 right-0 h-px bg-white",
                        style: {
                          animation: "underlineSlide 0.25s ease forwards"
                        }
                      }
                    )
                  ]
                }
              ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: l.to,
                  hash: l.hash,
                  className: `text-[12px] font-medium uppercase transition-colors hover:text-[var(--gold)] relative group ${isProjectsMenuOpen ? "text-white/90" : scrolled ? "text-[var(--text-soft)]" : "text-white/90"}`,
                  style: { letterSpacing: "0.18em" },
                  children: [
                    l.label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute bottom-0 left-0 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left",
                        style: { width: "100%" }
                      }
                    )
                  ]
                }
              ) }, l.label)),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://wa.me/919101002790?text=${encodeURIComponent(
                    "Hello Sukrit Infrastructure,\n\nI would like to enquire about your residential construction projects and services.\n\nCould you please guide me on your ongoing projects, available locations, and how we can get started?\n\nThank you!"
                  )}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: `btn-gold !py-3 !px-6 ${scrolled ? "" : "!text-white !border-white/70"}`,
                  children: "Enquire Now"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen(true),
                className: `p-2 -mr-2 flex items-center justify-center transition-all ${scrolled ? "text-[var(--text-soft)]" : "text-white"}`,
                "aria-label": "Open menu",
                style: { zIndex: 10001 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 30, strokeWidth: 1.5 })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `fixed inset-0 bg-[var(--charcoal)] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${open ? "translate-x-0" : "translate-x-full"}`,
        style: { zIndex: 1e5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-6 h-[84px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-white uppercase text-[16px]", style: { letterSpacing: "0.16em" }, children: "Sukrit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "text-white", "aria-label": "Close menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-8 px-8 pt-16", children: links.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: l.label === "Projects" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/projects",
                  onClick: () => setOpen(false),
                  className: "font-display text-white text-4xl",
                  style: {
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s ease ${i * 0.1 + 0.2}s`
                  },
                  children: l.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setMobileProjectsOpen(!mobileProjectsOpen),
                  className: "font-display text-white text-4xl",
                  style: {
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s ease ${i * 0.1 + 0.2}s`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `transform transition-transform duration-300 ${mobileProjectsOpen ? "rotate-180" : ""}`, children: "▾" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "overflow-hidden transition-all duration-350 ease",
                style: {
                  maxHeight: mobileProjectsOpen ? "1000px" : "0"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 pb-2 px-4 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/20 pb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white text-lg font-serif mb-3", style: { fontFamily: "Playfair Display, Cormorant Garamond, serif" }, children: "Residential" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["Sukrit Heights", "Sukrit Greens", "Sukrit Elite", "Sukrit Serene", "Sukrit Meadows"].map((project) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", onClick: () => setOpen(false), className: "block text-white/80 hover:text-[#B8963E] transition-colors text-sm", style: { fontFamily: "DM Sans, sans-serif" }, children: project }, project)) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/20 pb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white text-lg font-serif mb-3", style: { fontFamily: "Playfair Display, Cormorant Garamond, serif" }, children: "Commercial" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["Offices", "Retail", "Warehousing", "Industrial Plots"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", onClick: () => setOpen(false), className: "block text-white/80 hover:text-[#B8963E] transition-colors text-sm", style: { fontFamily: "DM Sans, sans-serif" }, children: item }, item)) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white text-lg font-serif mb-3", style: { fontFamily: "Playfair Display, Cormorant Garamond, serif" }, children: "Ongoing & Upcoming" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["Sukrit Heights Phase II", "Sukrit Business Park", "Sukrit Township"].map((project) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", onClick: () => setOpen(false), className: "block text-white/80 hover:text-[#B8963E] transition-colors text-sm", style: { fontFamily: "DM Sans, sans-serif" }, children: project }, project)) })
                  ] })
                ] })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.to,
              hash: l.hash,
              onClick: () => setOpen(false),
              className: "font-display text-white text-4xl",
              style: {
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${i * 0.1 + 0.2}s`
              },
              children: l.label
            }
          ) }, l.label)) })
        ]
      }
    ),
    isProjectsMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed left-0 right-0 bottom-0 z-[9998]",
          style: {
            top: `${navHeight}px`,
            backgroundColor: "rgba(20, 18, 16, 0.96)",
            backdropFilter: "blur(4px)",
            opacity: menuAnimationState === "closed" ? 0 : menuAnimationState === "entering" ? 0 : menuAnimationState === "exiting" ? 0 : 1,
            transition: "opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)"
          },
          onClick: closeProjectsMenu
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed left-0 right-0 z-[9999]",
          onMouseLeave: closeProjectsMenu,
          style: {
            top: `${navHeight}px`,
            opacity: menuAnimationState === "closed" ? 0 : menuAnimationState === "entering" ? 0 : menuAnimationState === "exiting" ? 0 : 1,
            transform: menuAnimationState === "entering" ? "translateY(-12px)" : menuAnimationState === "exiting" ? "translateY(-8px)" : "translateY(0)",
            transition: "opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "px-[8%] py-12 pb-14",
              style: {
                opacity: menuAnimationState === "closed" ? 0 : 1
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-12 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: closeProjectsMenu,
                    className: "absolute -top-4 right-[8%] w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all",
                    style: { width: "36px", height: "36px" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, className: "text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      opacity: menuAnimationState === "visible" ? 1 : 0,
                      transform: menuAnimationState === "visible" ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.08s, transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.08s"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-serif text-[22px] font-normal text-white mb-6",
                          style: { fontFamily: "Playfair Display, Cormorant Garamond, serif" },
                          children: "Residential"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-5", children: [
                        { name: "Sukrit Heights", city: "Guwahati" },
                        { name: "Sukrit Greens", city: "Jorhat" },
                        { name: "Sukrit Elite", city: "Dibrugarh" },
                        { name: "Sukrit Serene", city: "Tezpur" },
                        { name: "Sukrit Meadows", city: "Silchar" }
                      ].map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/projects",
                          onClick: closeProjectsMenu,
                          className: "group",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px] font-normal text-white group-hover:text-[#B8963E] transition-colors duration-200", style: { fontFamily: "DM Sans, sans-serif" }, children: project.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-normal text-[#888888] mt-1", style: { fontFamily: "DM Sans, sans-serif" }, children: project.city })
                          ]
                        },
                        project.name
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", onClick: closeProjectsMenu, className: "inline-block mt-6 text-[13px] text-[#888888] underline hover:text-[#B8963E] transition-colors", style: { fontFamily: "DM Sans, sans-serif" }, children: "View all →" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      opacity: menuAnimationState === "visible" ? 1 : 0,
                      transform: menuAnimationState === "visible" ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.16s, transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.16s"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-serif text-[22px] font-normal text-white mb-6",
                          style: { fontFamily: "Playfair Display, Cormorant Garamond, serif" },
                          children: "Commercial"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-5", children: ["Offices", "Retail", "Warehousing", "Industrial Plots"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/projects",
                          onClick: closeProjectsMenu,
                          className: "text-[16px] font-normal text-white hover:text-[#B8963E] transition-colors duration-200",
                          style: { fontFamily: "DM Sans, sans-serif" },
                          children: item
                        },
                        item
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", onClick: closeProjectsMenu, className: "inline-block mt-6 text-[13px] text-[#888888] underline hover:text-[#B8963E] transition-colors", style: { fontFamily: "DM Sans, sans-serif" }, children: "View all →" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      opacity: menuAnimationState === "visible" ? 1 : 0,
                      transform: menuAnimationState === "visible" ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.24s, transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.24s"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-serif text-[22px] font-normal text-white mb-6",
                          style: { fontFamily: "Playfair Display, Cormorant Garamond, serif" },
                          children: "Ongoing & Upcoming"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-5", children: [
                        { name: "Sukrit Heights Phase II", sub: "Guwahati | Possession 2026" },
                        { name: "Sukrit Business Park", sub: "Guwahati | Commercial" },
                        { name: "Sukrit Township", sub: "Jorhat | New Launch" }
                      ].map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/projects",
                          onClick: closeProjectsMenu,
                          className: "group",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px] font-normal text-white group-hover:text-[#B8963E] transition-colors duration-200", style: { fontFamily: "DM Sans, sans-serif" }, children: project.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-normal text-[#888888] mt-1", style: { fontFamily: "DM Sans, sans-serif" }, children: project.sub })
                          ]
                        },
                        project.name
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-serif text-[22px] font-normal text-white mb-4 mt-8",
                          style: { fontFamily: "Playfair Display, Cormorant Garamond, serif" },
                          children: "Completed Projects"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", onClick: closeProjectsMenu, className: "text-[13px] text-[#888888] underline hover:text-[#B8963E] transition-colors", style: { fontFamily: "DM Sans, sans-serif" }, children: "View All Completed →" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      opacity: menuAnimationState === "visible" ? 1 : 0,
                      transform: menuAnimationState === "visible" ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.32s, transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.32s"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: "Search a project name or location",
                          className: "w-full py-3.5 px-5 rounded-full text-[14px] text-white placeholder-white/50 outline-none transition-colors",
                          style: {
                            fontFamily: "DM Sans, sans-serif",
                            backgroundColor: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.2)"
                          },
                          onFocus: (e) => {
                            e.target.style.borderColor = "rgba(184,150,62,0.6)";
                          },
                          onBlur: (e) => {
                            e.target.style.borderColor = "rgba(255,255,255,0.2)";
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, className: "absolute right-5 top-1/2 -translate-y-1/2 text-white/60" })
                    ] })
                  }
                )
              ] })
            }
          )
        }
      )
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-[var(--charcoal-deep)] text-white/80 relative grain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10 border-b border-[var(--gold)]/30 reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display uppercase text-white text-[28px] lg:text-[40px]", style: { letterSpacing: "0.12em" }, children: "Sukrit Infrastructure Pvt Ltd" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:items-center mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "/Sukrit%20Infrastructure%20-%20(Residential%20Construcion)%20-%20OneXmedia%20_20251222_191544_0000.pdf",
            download: "Sukrit_Infrastructure_Catalogue.pdf",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] hover:text-[#d4b870] transition-colors mb-2 font-medium flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "7 10 12 15 17 10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
              ] }),
              "Download Our Catalogue"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] uppercase tracking-[0.2em] text-white/40", children: [
          "CIN U41001AS2026PTC029861 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 opacity-50", children: "|" }),
          " UNIT OF AB GROUP"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/50 text-[12px] uppercase tracking-[0.3em]", children: "Building Assam's Tomorrow, Today." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-12 mt-16 reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--gold)] text-[10px] uppercase tracking-[0.3em] mb-6", children: "Connect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] leading-[1.8] text-white/60 max-w-[240px]", children: "A real estate house from Assam, building landmark homes since 2005." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-6 text-white/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.instagram.com/sukrit.infrastructure/", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", className: "hover:text-[var(--gold)] transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "LinkedIn", className: "hover:text-[var(--gold)] transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "YouTube", className: "hover:text-[var(--gold)] transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { size: 18 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Quick Links", items: ["Home", "Projects", "About", "Contact"] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Locations", items: ["Guwahati", "Jorhat", "Dibrugarh", "Tezpur"] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--gold)] text-[10px] uppercase tracking-[0.3em] mb-6", children: "Reach Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] leading-[1.9] text-white/60", children: [
          "+91 91010 02790",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "hello@sukritinfrastructure.in",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Jorhat · Assam"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://wa.me/919101002790?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Sukrit%20Infrastructure%20projects.",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "mt-6 inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.25em] hover:opacity-90 transition-opacity",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 14 }),
              " WhatsApp"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-white/40 reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "© 2025 Sukrit Infrastructure Pvt Ltd. All Rights Reserved." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-[var(--gold)] transition-colors", children: "Privacy Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-[var(--gold)] transition-colors", children: "Terms" })
      ] })
    ] })
  ] }) });
}
function FooterCol({ title, items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--gold)] text-[10px] uppercase tracking-[0.3em] mb-6", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-[13px] text-white/60", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "story-link !text-white/70 !text-[13px] !tracking-[0.05em] !normal-case", children: i }) }, i)) })
  ] });
}
function CustomCursor() {
  const dotRef = reactExports.useRef(null);
  const ringRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    const over = (e) => {
      const t = e.target;
      if (t.closest("a, button, .btn-gold, .btn-light, .story-link, [data-cursor-hover]")) {
        ring.classList.add("hovered");
      } else {
        ring.classList.remove("hovered");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: dotRef, className: "cursor-dot" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: ringRef, className: "cursor-ring" })
  ] });
}
export {
  CustomCursor as C,
  Footer as F,
  MessageCircle as M,
  Navbar as N,
  createLucideIcon as c
};
