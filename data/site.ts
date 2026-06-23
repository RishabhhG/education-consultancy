// ============================================================
// SITE DATA — Central content repository
// ============================================================

import {
  Rocket, School, Users, ArrowRight, CheckCircle2,
  ChevronDown, Sparkles, Monitor, Globe, Code2,
  Brain, Shield, TrendingUp, Palette, Calculator,
  BarChart3, BookOpen, Cpu, Wifi, Video, Star,
  Clock, Award, Building2, Zap,
} from "lucide-react";

export const SITE_CONFIG = {
  name: "Open Mind Learning",
  tagline: "Empowering Students Across NCR Since 2019",
  description:
    "A dynamic education consultancy offering admission counselling, high-end technical training, international certifications, foreign languages, and guaranteed placement assistance across Delhi NCR.",
  url: "https://www.openmindlearning.in",
  phone: "+91 7838500561",
  whatsapp: "917838500561",
  email: "info@openmindlearning.in",
  address: "237, First Floor, Gaur City Centre, Noida Extension West, Gautam Budh Nagar, UP 201301",
  foundedYear: 2019,
  socialLinks: {
    instagram: "https://www.instagram.com/openmindlearning.in?igsh=bXFuMmt5bHBqdjU4",
    linkedin: "https://www.linkedin.com/company/open-mind-learning-india/?originalSubdomain=in",
    youtube: "https://youtube.com/@openmindlearning?si=YLv6ZcMIfMtrtDKL",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  { label: "Associates", href: "/associates" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { value: 35, suffix: "+", label: "Associated Institutions", icon: "Building2" },
  { value: 4, suffix: "", label: "Cities — Delhi, Noida, Meerut & Gr. Noida", icon: "GraduationCap" },
  { value: 12, suffix: "+", label: "Industrial Organisations", icon: "Briefcase" },
  { value: 2019, suffix: "", label: "Established", icon: "Star" },
];

export const SERVICES = [
  {
    id: "admission-counselling",
    title: "Admission Counselling",
    shortTitle: "Admissions",
    slug: "admission-counselling",
    description:
      "Expert guidance to help you choose the right college or university — including CSR-backed programs where you can pursue B.Tech, MBA, BBA, BCA, and MCA without paying tuition fees.",
    icon: "GraduationCap",
    color: "from-blue-500 to-cyan-500",
    badge: "Most Popular",
    features: ["College & University Selection", "CSR Scholarship Support", "Application & Admission Process", "B.Tech / MBA / BBA / BCA / MCA"],
  },
  {
    id: "technical-training",
    title: "High-End Technical Trainings",
    shortTitle: "Tech Training",
    slug: "technical-training",
    description:
      "Industry-designed training modules covering the latest technologies — from AR/VR and Blockchain to Data Science and Full-Stack Development — available in both online and offline modes.",
    icon: "Code2",
    color: "from-violet-500 to-purple-600",
    badge: "High Demand",
    features: ["AR / VR / Mixed Reality", "Data Science & Machine Learning", "Full Stack Web Development", "Cyber Security & Digital Forensics", "IoT & Blockchain / dApps"],
  },
  {
    id: "management-training",
    title: "Corporate Management Trainings",
    shortTitle: "Management",
    slug: "management-training",
    description:
      "Equip future business leaders with certifications and frameworks used in modern enterprises — covering quality management, analytics, compliance, and leadership.",
    icon: "Building2",
    color: "from-emerald-500 to-teal-600",
    badge: null,
    features: ["ZED Certification", "Lean Six Sigma", "Total Quality Management", "Tableau & PowerBI Dashboards", "Intellectual Property Rights"],
  },
  {
    id: "international-certifications",
    title: "International Certifications",
    shortTitle: "Certifications",
    slug: "international-certifications",
    description:
      "Stand out in the global job market with certifications from Microsoft, Google, Amazon, Cisco, Adobe, IBM, SAP, and more — with full preparation and exam support.",
    icon: "Award",
    color: "from-amber-500 to-orange-500",
    badge: "Global Edge",
    features: ["Microsoft / Google / AWS", "Cisco & EC-Council", "Adobe Certified Associate", "SAP & IBM", "CASQ / CSQA / CMSQ"],
  },
  {
    id: "foreign-languages",
    title: "Foreign Languages",
    shortTitle: "Languages",
    slug: "foreign-languages",
    description:
      "Build global fluency with structured foreign language programs that go beyond grammar — opening doors to international careers, diplomacy, and cultural exchange.",
    icon: "Globe",
    color: "from-pink-500 to-rose-500",
    badge: null,
    features: ["French & German", "Spanish & Japanese", "Mandarin Chinese", "Cultural Fluency Training", "International Communication Skills"],
  },
  {
    id: "skill-development",
    title: "Skill Development Programs",
    shortTitle: "Skills",
    slug: "skill-development",
    description:
      "Future-proof students with practical skills the classroom rarely teaches — digital marketing, graphic design, financial literacy, and UPSC preparation.",
    icon: "Sparkles",
    color: "from-indigo-500 to-violet-500",
    badge: "New",
    features: ["Digital Marketing & Promotion", "Graphic Design (Adobe Suite)", "Financial Markets & Personal Finance", "UPSC Civil Services Preparation"],
  },
  {
    id: "placement-assistance",
    title: "Placement Assistance",
    shortTitle: "Placements",
    slug: "placement-assistance",
    description:
      "Three-tier placement engine connecting candidates, colleges, and employers — with written guarantees, resume building, interview prep, and direct industry referrals.",
    icon: "Briefcase",
    color: "from-teal-500 to-green-500",
    badge: "Guaranteed",
    features: ["Immediate Placement for Ready Candidates", "Guaranteed Program (6–8 Months)", "Comprehensive Program for First-Year Students", "Resume Building & Interview Prep"],
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Expert Counsellors & Educators",
    description:
      "Our team of experienced educators, counsellors, and industry professionals are dedicated to helping students identify the right academic and career path — not just any path.",
    icon: "Users",
  },
  {
    title: "Holistic Development Focus",
    description:
      "We go beyond academics — building personality, communication skills, technical expertise, and international certifications in parallel, because employers hire the whole person.",
    icon: "Target",
  },
  {
    title: "Industry-Relevant Programs",
    description:
      "Every training module is developed by industry experts and built around what employers are actually hiring for right now — from AR/VR and Blockchain to Data Science and RPA.",
    icon: "Building2",
  },
  {
    title: "Global Certifications Access",
    description:
      "We facilitate certifications from Microsoft, Google, Amazon, Cisco, Adobe, IBM, SAP, and more — giving students credentials that are recognised in markets well beyond India.",
    icon: "Award",
  },
  {
    title: "Written Placement Guarantees",
    description:
      "Our Comprehensive Placement Program comes with a signed agreement declaring your guaranteed package and timeline — not a promise, a commitment backed in writing.",
    icon: "Map",
  },
  {
    title: "End-to-End Student Support",
    description:
      "From admission counselling and skill training to resume building, interview prep, and job placement — we cover every milestone so students never have to navigate alone.",
    icon: "LifeBuoy",
  },
];

export const FAQS = [
  {
    question: "What services does Open Mind Learning offer?",
    answer:
      "We offer a comprehensive range of services including admission counselling, high-end technical training (AR/VR, Data Science, Cyber Security, Full Stack Development, and more), corporate management training, international certifications from Microsoft, Google, AWS, Cisco and others, foreign language programs, skill development, and placement assistance — all available in online and offline modes.",
  },
  {
    question: "Where are your offices located?",
    answer:
      "Our headquarters is at 237, First Floor, Gaur City Centre, Noida Extension West, Gautam Budh Nagar, UP 201301. We also have branches in Delhi, Noida, and Meerut — strategically placed to serve students across the NCR region.",
  },
  {
    question: "Can students get admission without paying tuition fees?",
    answer:
      "Yes. Through our Corporate Social Responsibility (CSR) initiatives, we support eligible students in pursuing B.Tech, MBA, BBA, BCA, and MCA programs without paying tuition fees. Our counsellors assess eligibility and guide students through the entire process.",
  },
  {
    question: "What is your Guaranteed Placement Program?",
    answer:
      "We offer three placement tiers. For ready candidates, we charge only a registration fee upfront and 15 days' salary after successful placement. For final-year or 6–8 month candidates, we provide skill upgradation and domain-specific placement. For first-year students, our Comprehensive Program covers personality development, technical skills, and international certifications — with a written agreement guaranteeing your job package at 30% of the assured salary, inclusive of all training and certification costs.",
  },
  {
    question: "Which international certifications do you facilitate?",
    answer:
      "We facilitate certifications from Microsoft (Office Specialist, Technology Associate, Certified Educator), Google, Amazon (AWS), Cisco, Adobe (Certified Associate), Autodesk, EC-Council, IBM, SAP, PMP, and BTA, among others. We also support quality certifications like CASQ, CSQA, and CMSQ.",
  },
  {
    question: "Do you offer online training programs?",
    answer:
      "Yes. All our technical training, management training, language programs, and skill development courses are available in both online and offline modes. You can choose the format that suits your schedule and location.",
  },
  {
    question: "How do I get started or enrol?",
    answer:
      "The easiest way is to call us at +91 7838500561 or email info@openmindlearning.in. You can also visit our office in Greater Noida or reach out via WhatsApp. Our counsellors will understand your background and goals, and recommend the right program — at no charge for the initial consultation.",
  },
];

export const PARTNERS = [
  // Educational Institutions
  { name: "Monard University", category: "University" },
  { name: "Sunrise University", category: "University" },
  { name: "Sanskriti University", category: "University" },
  { name: "IIMT University", category: "University" },
  { name: "ABES Engineering College", category: "Engineering" },
  { name: "JP Institute of Engg & Tech", category: "Engineering" },
  { name: "GNIOT Greater Noida", category: "Engineering" },
  { name: "Accurate Institute of Technology", category: "Engineering" },
  { name: "Lloyd Institute", category: "Engineering" },
  { name: "ITS Engineering College", category: "Engineering" },
  { name: "DIT Dehradoon", category: "Engineering" },
  { name: "Asia Pacific Institute of Management", category: "Management" },
  { name: "JP Institute of Management", category: "Management" },
  { name: "IAMR Ghaziabad", category: "Management" },
  { name: "Deewan Group of Colleges", category: "College" },
  // Industrial & Social Organisations
  { name: "Indian Industries Association", category: "Industry" },
  { name: "Bhartiya Majdoor Sangh", category: "Industry" },
  { name: "Noida Entrepreneur Association", category: "Industry" },
  { name: "Greater Noida Industries Association", category: "Industry" },
  { name: "MSME Industrial Association", category: "Industry" },
  { name: "Bharat Vikas Parishad", category: "Social" },
  { name: "Pragati Care Foundation", category: "Social" },
  { name: "Prakahar Foundation", category: "Social" },
];

export const PROGRAMS_FEATURED = [
  {
    title: "Full Stack Web Development",
    duration: "4 Months",
    mode: "Online / Offline",
    level: "Beginner to Advanced",
    price: "Contact Us",
    badge: "High Demand",
    color: "from-violet-500 to-purple-600",
    outcomes: [
      "HTML, CSS, JavaScript & React",
      "Node.js, Express & Databases",
      "Live Project + Placement Support",
    ],
  },
  {
    title: "Data Science & Machine Learning",
    duration: "4–5 Months",
    mode: "Online / Offline",
    level: "Beginner to Advanced",
    price: "Contact Us",
    badge: "Future-Proof",
    color: "from-blue-500 to-cyan-500",
    outcomes: [
      "Python, Pandas & Scikit-learn",
      "Business Analytics & Dashboards",
      "Industry Project + Certification",
    ],
  },
  {
    title: "International Certification Prep",
    duration: "6–8 Weeks",
    mode: "Online / Offline",
    level: "Intermediate",
    price: "Contact Us",
    badge: "Global Edge",
    color: "from-amber-500 to-orange-500",
    outcomes: [
      "Microsoft / Google / AWS / Cisco",
      "Adobe & IBM Certifications",
      "Exam Registration Support",
    ],
  },
  {
    title: "Guaranteed Placement Program",
    duration: "6–8 Months",
    mode: "Online / Offline",
    level: "Final Year / Graduates",
    price: "Contact Us",
    badge: "Written Guarantee",
    color: "from-teal-500 to-green-500",
    outcomes: [
      "Skill Upgradation & Certifications",
      "Resume Building & Interview Prep",
      "Placement in Right Domain — Guaranteed",
    ],
  },
];

export const PROJECTS = [
  {
    id: "project-999",
    number: "01",
    tag: "Free Registration Program",
    title: "Project 999",
    subtitle: "Empowering students with free, live online training across 35+ programs",
    color: {
      from: "#f59e0b",
      to: "#ef4444",
      light: "from-amber-500 to-red-500",
      glow: "rgba(245,158,11,0.15)",
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      icon: "bg-gradient-to-br from-amber-500 to-red-500",
      accent: "text-amber-600 dark:text-amber-400",
      bar: "from-amber-500 to-red-500",
    },
    Icon: Rocket,
    stats: [
      { value: "35+", label: "Programs Available" },
      { value: "FREE", label: "Training Cost" },
      { value: "Cl. 5–12", label: "Target Students" },
      { value: "Live", label: "Online Mode" },
    ],
    highlights: [
      "Registration based FREE Training Program",
      "Training delivered in LIVE online mode",
      "One Registration covers One Program",
      "No hidden charges — Tax included in registration",
      "Assessment & Certification after completion",
      "Specially designed for Class 5th to Class 12th",
    ],
    programs: [
      { Icon: Monitor, label: "MS Office Fundamentals" },
      { Icon: Code2, label: "Python, Java, JavaScript, C/C++" },
      { Icon: Globe, label: "German & French Languages" },
      { Icon: Brain, label: "AI, Blockchain & Robotics" },
      { Icon: Shield, label: "Cyber Security" },
      { Icon: TrendingUp, label: "Digital Marketing" },
      { Icon: Palette, label: "Computer Graphics & Design" },
      { Icon: Calculator, label: "Accounting Software" },
      { Icon: BarChart3, label: "Stock Market Trading Skills" },
      { Icon: BookOpen, label: "Doubt Sessions — Class 10 & 12" },
      { Icon: Star, label: "UPSC Preparation" },
    ],
    cta: "Register for Project 999",
    note: "35+ programs available. One registration, one program. Absolutely free.",
  },
  {
    id: "it-incubation",
    number: "02",
    tag: "School Partnership Program",
    title: "IT Incubation Cell",
    subtitle: "Complete computer lab setup and curriculum delivery for Class 5–12 on school premises",
    color: {
      from: "#6d28d9",
      to: "#2563eb",
      light: "from-violet-600 to-blue-600",
      glow: "rgba(109,40,217,0.15)",
      badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
      icon: "bg-gradient-to-br from-violet-600 to-blue-600",
      accent: "text-violet-600 dark:text-violet-400",
      bar: "from-violet-600 to-blue-600",
    },
    Icon: School,
    stats: [
      { value: "30", label: "Days Setup Time" },
      { value: "5 Yrs", label: "Minimum Partnership" },
      { value: "10", label: "Systems Per Lab" },
      { value: "₹0", label: "School Expense" },
    ],
    highlights: [
      "Complete lab setup within 30 days of agreement",
      "10 systems + projector + printer provided by OML",
      "Minimum 5-year partnership program",
      "Highly qualified full-time faculty at school premises",
      "All operational expenses borne by OML — faculty, material, conveyance",
      "OML assists school in promoting the scheme",
    ],
    programs: [
      { Icon: Brain, label: "Python with AI" },
      { Icon: BarChart3, label: "Data Science & Analytics" },
      { Icon: Cpu, label: "AI & Machine Learning" },
      { Icon: Shield, label: "Cyber Security & Cloud Computing" },
      { Icon: Shield, label: "Digital Forensics" },
      { Icon: TrendingUp, label: "Digital Marketing & Content" },
      { Icon: Code2, label: "Java & Full Stack Development" },
      { Icon: Wifi, label: "IoT & Embedded Systems" },
      { Icon: Cpu, label: "Industrial Automation & VLSI" },
    ],
    cta: "Partner Your School",
    note: "Zero cost to the school. We handle setup, faculty, material and operations.",
  },
  {
    id: "workshops",
    number: "03",
    tag: "Campus Programs",
    title: "Training Workshops & Seminars",
    subtitle: "High-demand technical and digital skills delivered on campus for Class 6–12 students",
    color: {
      from: "#059669",
      to: "#0891b2",
      light: "from-emerald-600 to-cyan-600",
      glow: "rgba(5,150,105,0.15)",
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      icon: "bg-gradient-to-br from-emerald-600 to-cyan-600",
      accent: "text-emerald-600 dark:text-emerald-400",
      bar: "from-emerald-600 to-cyan-600",
    },
    Icon: Users,
    stats: [
      { value: "Cl. 6–12", label: "Target Students" },
      { value: "On-Site", label: "Delivery Mode" },
      { value: "Latest", label: "Tech Curriculum" },
      { value: "Cert.", label: "On Completion" },
    ],
    highlights: [
      "Curriculum on latest technologies delivered on school campus",
      "Seminars and workshops format — flexible scheduling",
      "Designed for Class 6th to 12th students",
      "Industry-aligned content updated regularly",
      "Hands-on sessions with real projects",
      "Certificate issued on successful completion",
    ],
    programs: [
      { Icon: Brain, label: "Artificial Intelligence" },
      { Icon: BarChart3, label: "Data Science" },
      { Icon: Shield, label: "Cyber Security" },
      { Icon: Code2, label: "Python Programming" },
      { Icon: Globe, label: "Digital Marketing" },
      { Icon: Video, label: "Content Creation" },
      { Icon: Cpu, label: "Robotics" },
      { Icon: Wifi, label: "IoT Systems" },
      { Icon: TrendingUp, label: "Stock Market Basics" },
    ],
    cta: "Book a Workshop",
    note: "Flexible formats. Half-day to multi-day. Scheduled around your timetable.",
  },
];
