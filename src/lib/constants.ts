export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  tags: string[];
}

export const services: Service[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    icon: 'Code2',
    description: 'Full-stack web applications built with modern frameworks — React, Next.js, Node.js, and more.',
    features: [
      'Custom React / Next.js Applications',
      'REST & GraphQL API Development',
      'CMS Integration (Sanity, Strapi)',
      'Performance Optimization & Core Web Vitals',
      'E-commerce & Payment Systems',
      'Progressive Web Apps (PWA)',
    ],
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
  },
  {
    id: 'mobile-apps',
    name: 'Mobile Applications',
    icon: 'Smartphone',
    description: 'Cross-platform mobile apps with native performance using React Native and Expo.',
    features: [
      'iOS & Android App Development',
      'React Native / Expo',
      'App Store & Play Store Deployment',
      'Push Notifications & Offline Support',
      'API & Backend Integration',
      'UI/UX Prototyping',
    ],
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
  },
  {
    id: 'saas-platforms',
    name: 'SaaS Platforms',
    icon: 'Server',
    description: 'End-to-end SaaS product development — from architecture to deployment, scaling, and monetisation.',
    features: [
      'Multi-tenant Architecture',
      'Subscription Billing (Stripe / Razorpay)',
      'Admin & Analytics Dashboards',
      'Role-based Access Control',
      'Cloud Infrastructure (AWS / GCP)',
      'CI/CD Pipelines & DevOps',
    ],
    tags: ['AWS', 'Docker', 'PostgreSQL', 'Stripe'],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: 'Shield',
    description: 'Security-first solutions — penetration testing, audits, and protection systems for your digital assets.',
    features: [
      'Web Application Penetration Testing',
      'Vulnerability Assessment & Reporting',
      'SSL / TLS & HTTPS Hardening',
      'Data Encryption & GDPR Compliance',
      'Security Code Reviews',
      'Ongoing Monitoring & Alerts',
    ],
    tags: ['OWASP', 'VAPT', 'GDPR', 'ISO 27001'],
  },
  {
    id: 'automation',
    name: 'Automation & AI',
    icon: 'Cpu',
    description: 'Workflow automation and AI integrations that eliminate manual work and accelerate business processes.',
    features: [
      'Business Process Automation',
      'LLM & AI API Integrations (OpenAI, Gemini)',
      'Zapier / Make Workflow Builds',
      'Web Scraping & Data Pipelines',
      'Chatbot & AI Assistant Development',
      'Email & CRM Automation',
    ],
    tags: ['OpenAI', 'Python', 'Zapier', 'LangChain'],
  },
  {
    id: 'ui-ux-design',
    name: 'UI / UX Design',
    icon: 'Layers',
    description: 'Research-driven design that turns complex products into intuitive, elegant experiences.',
    features: [
      'User Research & Journey Mapping',
      'Wireframes & Interactive Prototypes',
      'Figma Design Systems',
      'Usability Testing',
      'Responsive Web & Mobile Design',
      'Design-to-Code Handoff',
    ],
    tags: ['Figma', 'Framer', 'Design Systems', 'UX'],
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    icon: 'Video',
    description: 'High-quality video editing and post-production for commercials, social media, and corporate presentations.',
    features: [
      'Commercials & Ad Editing',
      'YouTube & Social Media Reels',
      'Motion Graphics & Animations',
      'Color Grading & Audio Mixing',
      'Corporate & Event Videos',
      'Podcast Editing',
    ],
    tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut'],
  },
];

export interface PricingTier {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  badge?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceRange: '₹15,000 – ₹40,000',
    description: 'Best for small businesses needing a professional web presence.',
    features: [
      'Custom 5-page website',
      'Mobile responsive design',
      'Basic SEO setup',
      'Contact form integration',
      '1 month free support',
      'Google Analytics setup',
    ],
    ctaLabel: 'Start Project',
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    priceRange: '₹50,000 – ₹1,50,000',
    description: 'Ideal for growing teams that need a full-featured web application.',
    features: [
      'Custom web application',
      'User authentication & roles',
      'Database & API development',
      'Admin dashboard',
      '3 months free support',
      'Performance audit included',
      'Staging + production deployment',
    ],
    ctaLabel: 'Get Started',
    featured: true,
    badge: 'Most Popular',
  },
  {
    id: 'scale',
    name: 'Scale',
    priceRange: '₹2,00,000 – ₹5,00,000',
    description: 'Full SaaS platform or enterprise-grade application from scratch.',
    features: [
      'Full SaaS / enterprise build',
      'Multi-tenant architecture',
      'Payment & billing integration',
      'Cloud infrastructure setup',
      'CI/CD pipeline & DevOps',
      '6 months support & maintenance',
      'Security audit included',
    ],
    ctaLabel: 'Talk to Us',
    featured: false,
  },
  {
    id: 'custom',
    name: 'Custom',
    priceRange: 'Custom Pricing',
    description: 'Tailored scope for complex requirements, ongoing retainers, or long-term partnerships.',
    features: [
      'Dedicated project team',
      'Full product lifecycle ownership',
      'Weekly sprint reviews',
      'Priority support & SLAs',
      'Advanced security & compliance',
      'Flexible scope & retainer',
    ],
    ctaLabel: 'Get Custom Quote',
    featured: false,
    badge: 'Enterprise',
  },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'web-app' | 'mobile' | 'saas' | 'automation';
  thumbnail: string;
  tech: string[];
  description: string;
  result?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'HealthTrack SaaS Platform',
    category: 'saas',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tech: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS'],
    description: 'Multi-tenant health management SaaS with subscription billing, role-based access, and real-time dashboards.',
    result: '3× MRR growth in 4 months',
  },
  {
    id: 'portfolio-2',
    title: 'LegalDocs E-commerce',
    category: 'web-app',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tech: ['React', 'Node.js', 'Razorpay', 'MongoDB'],
    description: 'Document automation platform with e-signing, payment processing, and lawyer marketplace.',
    result: '2,000+ documents processed',
  },
  {
    id: 'portfolio-3',
    title: 'FinTrack Mobile App',
    category: 'mobile',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    tech: ['React Native', 'Expo', 'Firebase'],
    description: 'Personal finance tracker with AI-driven insights, budget alerts, and bank sync via Plaid API.',
    result: '4.8★ App Store rating',
  },
  {
    id: 'portfolio-4',
    title: 'Logistics Automation System',
    category: 'automation',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    tech: ['Python', 'Make.com', 'Airtable', 'WhatsApp API'],
    description: 'Automated order intake, dispatch notifications, and invoice generation saving 40+ hours/week.',
    result: '40 hrs/week saved',
  },
  {
    id: 'portfolio-5',
    title: 'EdTech Learning Platform',
    category: 'web-app',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    tech: ['Next.js', 'Supabase', 'Stripe', 'WebRTC'],
    description: 'Online course platform with live video, quizzes, certificates, and affiliate tracking.',
    result: '5,000+ active students',
  },
  {
    id: 'portfolio-6',
    title: 'Real Estate CRM',
    category: 'saas',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    tech: ['React', 'Django', 'PostgreSQL', 'Twilio'],
    description: 'End-to-end CRM for real estate agents with lead tracking, automated follow-ups, and property listings.',
    result: '60% faster lead response',
  },
];

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  avatar?: string;
  projectType?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    clientName: 'Rajesh Kumar',
    role: 'Founder & CEO',
    company: 'HealthTrack',
    review: 'Infinityx built our entire SaaS platform from scratch. The team understood our complex requirements and delivered a production-ready system in 3 months. The architecture they chose has scaled flawlessly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    projectType: 'SaaS Platform',
  },
  {
    id: 'testimonial-2',
    clientName: 'Priya Sharma',
    role: 'CTO',
    company: 'LegalDocs',
    review: 'The development quality and code standards are exceptional. They implemented a secure payment system with Razorpay and document e-signing that processes thousands of transactions daily without a single issue.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    projectType: 'Web Application',
  },
  {
    id: 'testimonial-3',
    clientName: 'Amit Patel',
    role: 'Operations Director',
    company: 'SwiftLogix',
    review: 'The automation system Infinityx built eliminated 40+ hours of manual work every week. The WhatsApp integration and automated invoicing have completely transformed how we handle orders.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    projectType: 'Automation',
  },
];

export const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker',
  'React Native', 'GraphQL', 'Stripe', 'Supabase', 'Prisma',
  'Tailwind CSS', 'Figma', 'OpenAI API', 'GitHub Actions', 'Vercel',
];

export const AGENCY_NAME = 'NorthernStar';
export const CONTACT_EMAIL = 'hello@northernstar.com';

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We understand your requirements, goals, timeline, and budget in a free 30-minute strategy call.',
    duration: 'Day 1',
  },
  {
    step: 2,
    title: 'Proposal & Scope',
    description: 'You receive a detailed proposal with technical approach, milestones, and fixed or time-and-materials pricing.',
    duration: 'Day 2–3',
  },
  {
    step: 3,
    title: 'Design & Architecture',
    description: 'Our team creates UI/UX wireframes and the technical architecture before a single line of code is written.',
    duration: 'Week 1',
  },
  {
    step: 4,
    title: 'Development Sprints',
    description: 'Agile two-week sprints with regular demos, feedback rounds, and transparent progress tracking.',
    duration: 'Weeks 2–N',
  },
  {
    step: 5,
    title: 'QA & Security Review',
    description: 'Comprehensive testing, security review, and performance audit before any deployment.',
    duration: 'Final Week',
  },
  {
    step: 6,
    title: 'Launch & Support',
    description: 'We handle deployment, monitor the live system, and provide post-launch support per your plan.',
    duration: 'Ongoing',
  },
];
