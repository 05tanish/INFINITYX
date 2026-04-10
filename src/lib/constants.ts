export interface Service {
  id: string;
  name: 'Growth' | 'Build' | 'Secure';
  icon: string;
  description: string;
  features: string[];
  color: string;
}

export const services: Service[] = [
  {
    id: 'growth',
    name: 'Growth',
    icon: 'TrendingUp',
    description: 'Scale your brand with content that converts',
    features: [
      'Social media management',
      'Video editing',
      'Graphic design',
      'Content strategy',
    ],
    color: '#007BFF',
  },
  {
    id: 'build',
    name: 'Build',
    icon: 'Code',
    description: 'Custom digital solutions for your business',
    features: [
      'Website development',
      'Web apps',
      'Automation systems',
    ],
    color: '#007BFF',
  },
  {
    id: 'secure',
    name: 'Secure',
    icon: 'Shield',
    description: 'Protect your digital assets and data',
    features: [
      'Cybersecurity audits',
      'Vulnerability testing',
      'Protection systems',
    ],
    color: '#007BFF',
  },
];

export interface PricingTier {
  id: string;
  name: string;
  priceRange: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  customStyling?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'launch',
    name: 'Launch Plan',
    priceRange: '₹10,000 – ₹15,000/month',
    features: [
      '1 platform',
      '8-10 reels/month',
      '10-12 graphic posts',
      'Captions with hashtags',
      'Basic content planning',
    ],
    ctaLabel: 'Get Started',
    featured: false,
    customStyling: false,
  },
  {
    id: 'scale',
    name: 'Scale Plan',
    priceRange: '₹20,000 – ₹30,000/month',
    features: [
      '2 platforms',
      '15-20 reels',
      '20+ posts',
      'Content strategy',
      'Monthly analytics report',
    ],
    ctaLabel: 'Get Started',
    featured: true,
    customStyling: false,
  },
  {
    id: 'dominate',
    name: 'Dominate Plan',
    priceRange: '₹40,000 – ₹80,000+',
    features: [
      'All Scale Plan features',
      'Branding support',
      'Landing page or website',
      'Automation setup',
      'Basic cybersecurity check',
    ],
    ctaLabel: 'Get Started',
    featured: false,
    customStyling: false,
  },
  {
    id: 'custom',
    name: 'Custom Plan',
    priceRange: 'Starting ₹50,000 – ₹5,00,000+',
    features: [
      'Full website/app development',
      'SaaS systems',
      'Advanced automation',
      'Cybersecurity audits',
      'Data analytics',
    ],
    ctaLabel: 'Get Custom Quote',
    featured: false,
    customStyling: true,
  },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'video' | 'social-media' | 'website';
  thumbnail: string;
  previewUrl?: string;
  description: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'Brand Launch Campaign',
    category: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
    previewUrl: '#',
    description: 'High-impact video content for product launch',
  },
  {
    id: 'portfolio-2',
    title: 'Social Media Growth',
    category: 'social-media',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    previewUrl: '#',
    description: 'Instagram content strategy that drove 300% engagement',
  },
  {
    id: 'portfolio-3',
    title: 'E-commerce Platform',
    category: 'website',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    previewUrl: '#',
    description: 'Custom-built online store with payment integration',
  },
  {
    id: 'portfolio-4',
    title: 'Promotional Reel Series',
    category: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
    previewUrl: '#',
    description: 'Engaging short-form video content for social platforms',
  },
  {
    id: 'portfolio-5',
    title: 'Brand Identity Design',
    category: 'social-media',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    previewUrl: '#',
    description: 'Complete visual identity and social media templates',
  },
  {
    id: 'portfolio-6',
    title: 'SaaS Dashboard',
    category: 'website',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    previewUrl: '#',
    description: 'Modern web application with real-time analytics',
  },
];

export interface Testimonial {
  id: string;
  clientName: string;
  businessType: string;
  review: string;
  rating?: number;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    clientName: 'Rajesh Kumar',
    businessType: 'E-commerce Founder',
    review: 'Infinityx transformed our online presence. Their team delivered a stunning website and social media strategy that increased our sales by 250% in just 3 months. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    id: 'testimonial-2',
    clientName: 'Priya Sharma',
    businessType: 'Tech Startup CEO',
    review: 'Working with Infinityx was a game-changer. They built our SaaS platform from scratch and implemented robust security measures. Their expertise in both development and cybersecurity is unmatched.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
  {
    id: 'testimonial-3',
    clientName: 'Amit Patel',
    businessType: 'Digital Marketing Agency',
    review: 'The content and video editing services from Infinityx helped us scale our client campaigns significantly. Their creative team understands what works on social media and delivers consistently.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  },
];
