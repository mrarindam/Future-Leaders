export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  bgTint: string;
  borderTint: string;
  iconBg: string;
  iconColor: string;
  stats?: string;
  features?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bgGradient: string;
  borderColor: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    discord?: string;
    telegram?: string;
  };
}

export interface TrustPartner {
  name: string;
  symbol: string;
}

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Contact Us", href: "#contact" },
];

export const TRUST_PARTNERS: TrustPartner[] = [
  { name: "polygon", symbol: "polygon" },
  { name: "BINANCE", symbol: "binance" },
  { name: "AVALANCHE", symbol: "avalanche" },
  { name: "LayerZero.", symbol: "layerzero" },
  { name: "OpenSea", symbol: "opensea" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "kol-marketing",
    title: "KOL Marketing",
    description: "Connect with our private network of 500+ KOLs across different regions, countries, and Web3 niches to reach the right audience.",
    accentColor: "#7c3aed",
    bgTint: "bg-purple-50/50 hover:bg-purple-50/80",
    borderTint: "border-purple-100 hover:border-purple-300",
    iconBg: "bg-purple-100/90 text-purple-600",
    iconColor: "text-purple-600",
    stats: "500+ KOL Network",
    features: [
      "Vetted tier-1 Web3 creators and crypto alphas",
      "Campaign strategy, tracking & attribution",
      "Organic co-marketing & Spaces hosting",
      "Cross-platform viral distribution (X, Telegram, YouTube)"
    ]
  },
  {
    id: "community-management",
    title: "Community Management",
    description: "Build and grow an active Web3 community with experienced community managers focused on engagement, growth, and long-term support.",
    accentColor: "#16a34a",
    bgTint: "bg-emerald-50/50 hover:bg-emerald-50/80",
    borderTint: "border-emerald-100 hover:border-emerald-300",
    iconBg: "bg-emerald-100/90 text-emerald-600",
    iconColor: "text-emerald-600",
    stats: "24/7 Global Moderation",
    features: [
      "24/7 bilingual moderator coverage",
      "High-engagement games, quizzes & AMAs",
      "Ambassador program structure & incentives",
      "Sentiment monitoring and FUD mitigation"
    ]
  },
  {
    id: "discord-management",
    title: "Discord Management",
    description: "Complete Discord management, including setup, moderation, engagement, and day-to-day community support.",
    accentColor: "#2563eb",
    bgTint: "bg-blue-50/50 hover:bg-blue-50/80",
    borderTint: "border-blue-100 hover:border-blue-300",
    iconBg: "bg-blue-100/90 text-blue-600",
    iconColor: "text-blue-600",
    stats: "99.9% Spam Protection",
    features: [
      "Server architecture, permissions & role gating",
      "Anti-phishing security & automated raid defense",
      "Custom verification bots and token-gating",
      "Active voice stages & structured announcement channels"
    ]
  },
  {
    id: "social-growth-marketing",
    title: "Social & Growth Marketing",
    description: "Drive visibility through posts, likes, comments, reposts, paid campaigns, engagement, and targeted growth strategies.",
    accentColor: "#d97706",
    bgTint: "bg-amber-50/50 hover:bg-amber-50/80",
    borderTint: "border-amber-100 hover:border-amber-300",
    iconBg: "bg-amber-100/90 text-amber-600",
    iconColor: "text-amber-600",
    stats: "Multi-Platform Growth",
    features: [
      "Targeted paid campaigns & viral impressions",
      "High-impact engagement: likes, comments & reposts",
      "Social media growth & content strategy",
      "Audience acquisition across X, Telegram & TikTok"
    ]
  },
  {
    id: "collaboration-management",
    title: "Collaboration Management",
    description: "Connect with relevant projects, communities, creators, and partners through our network of experienced collaboration managers.",
    accentColor: "#db2777",
    bgTint: "bg-pink-50/50 hover:bg-pink-50/80",
    borderTint: "border-pink-100 hover:border-pink-300",
    iconBg: "bg-pink-100/90 text-pink-600",
    iconColor: "text-pink-600",
    stats: "200+ Cross-Collabs Done",
    features: [
      "Ecosystem partner outreach & relationship management",
      "Co-branded questing campaigns & airdrops",
      "NFT/Allowlist giveaways with high-repute DAOs",
      "Synergistic liquidity & protocol integrations"
    ]
  },
  {
    id: "technical-services",
    title: "Technical Services",
    description: "Access Web3 developers and technical support for bots, smart contracts, integrations, and other project requirements.",
    accentColor: "#0891b2",
    bgTint: "bg-cyan-50/50 hover:bg-cyan-50/80",
    borderTint: "border-cyan-100 hover:border-cyan-300",
    iconBg: "bg-cyan-100/90 text-cyan-600",
    iconColor: "text-cyan-600",
    stats: "Audited & Battle-Tested",
    features: [
      "Custom Telegram & Discord community bots",
      "Smart contract deployment & testnet faucets",
      "Whitelisting dApp portals & mint pages",
      "Analytics dashboards & on-chain data tracking"
    ]
  }
];

export const ABOUT_FEATURES = [
  {
    title: "Web3-Native Network",
    description: "A strong network of 500+ KOLs, creators, and Web3 professionals across different markets and regions.",
    icon: "layers",
    color: "purple",
    badgeBg: "bg-purple-100 text-purple-600",
  },
  {
    title: "Global Reach",
    description: "Connect with audiences, creators, and communities from different countries and Web3 ecosystems.",
    icon: "globe",
    color: "blue",
    badgeBg: "bg-blue-100 text-blue-600",
  },
  {
    title: "Community-First Approach",
    description: "An active Web3 community built around real people, engagement, collaboration, and long-term relationships.",
    icon: "users",
    color: "gold",
    badgeBg: "bg-amber-100 text-amber-600",
  },
  {
    title: "All-in-One Growth Support",
    description: "KOL marketing, social campaigns, community management, Discord moderation, collaborations, developers, and technical support all through one network.",
    icon: "trendingUp",
    color: "green",
    badgeBg: "bg-emerald-100 text-emerald-600",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Sakuna",
    role: "Founder & Strategic Lead",
    image: "/images/team/sakuna.webp",
    bgGradient: "bg-gradient-to-b from-[#1a1c2e] to-[#0f111d]",
    borderColor: "border-purple-500/40",
    socials: {
      twitter: "https://x.com/0Sakuna",
      telegram: "https://t.me/SAKUNA17",
      discord: "https://discord.com/users/1330573065234546749",
    },
  },
  {
    name: "Toji",
    role: "Co-Founder & Head of Growth",
    image: "/images/team/toji.webp",
    bgGradient: "bg-gradient-to-b from-[#112240] to-[#0a1526]",
    borderColor: "border-cyan-500/40",
    socials: {
      twitter: "https://x.com/Tojizeninhc",
      telegram: "https://t.me/Tojizeninhc",
      discord: "https://discord.com/users/1223692374790901932",
    },
  },
  {
    name: "Viking",
    role: "Community & Marketing Lead",
    image: "/images/team/viking.webp",
    bgGradient: "bg-gradient-to-b from-[#1a2e1d] to-[#0d1a10]",
    borderColor: "border-emerald-500/40",
    socials: {
      twitter: "https://x.com/badviking1995",
      telegram: "https://t.me/badviking1995",
      discord: "https://discord.com/users/518837405600448513",
    },
  },
  {
    name: "Anas",
    role: "Partnerships & Operations Lead",
    image: "/images/team/anas.jpg",
    bgGradient: "bg-gradient-to-b from-[#2e1d24] to-[#1a0f14]",
    borderColor: "border-pink-500/40",
    socials: {
      twitter: "https://x.com/Anas1BTC",
      telegram: "https://t.me/Anas1btc",
      discord: "https://discord.com/users/767831622837338163",
    },
  },
  {
    name: "Arindam",
    role: "Technical Director & Web3 Dev",
    image: "/images/team/arindam.webp",
    bgGradient: "bg-gradient-to-b from-[#1d273a] to-[#0e1420]",
    borderColor: "border-blue-500/40",
    socials: {
      twitter: "https://x.com/ExeArindam",
      telegram: "https://t.me/MrxArindam",
      discord: "https://discord.com/users/1056180691987091467",
    },
  },
];

export const SOCIAL_LINKS = {
  twitter: "https://x.com/0Futureleaders",
  discord: "https://discord.gg/Tbd96eh4Tq",
  telegram: "https://t.me/Futureleaderss0",
};

export const CALENDAR_LINK = "https://cal.com/futureleader/30min";

