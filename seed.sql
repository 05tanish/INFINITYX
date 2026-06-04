-- ============================================================
-- Northern Star — Complete Supabase Seeder
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- STEP 1: Confirm your email so login works
UPDATE auth.users 
SET email_confirmed_at = NOW(), updated_at = NOW()
WHERE email = 'tanishjain626@gmail.com';

-- STEP 2: Create admin profile row (only real columns: id, email, role, status)
INSERT INTO profiles (id, email, role, status)
SELECT id, email, 'admin', 'active'
FROM auth.users 
WHERE email = 'tanishjain626@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin', status = 'active';

-- ============================================================
-- STEP 3: Seed Services
-- ============================================================
DELETE FROM services;

INSERT INTO services (name, icon, description, features, tags, display_order)
VALUES 
('Web Development', 'Code2', 'Full-stack web applications built with modern frameworks — React, Next.js, Node.js, and more.', ARRAY['Custom React / Next.js Applications', 'REST & GraphQL API Development', 'CMS Integration', 'Performance Optimization'], ARRAY['React', 'Next.js', 'Node.js'], 1),
('Mobile Applications', 'Smartphone', 'Cross-platform mobile apps with native performance using React Native and Expo.', ARRAY['iOS & Android App Development', 'React Native / Expo', 'App Store Deployment'], ARRAY['React Native', 'iOS', 'Android'], 2),
('SaaS Platforms', 'Server', 'End-to-end SaaS product development — from architecture to deployment and scaling.', ARRAY['Multi-tenant Architecture', 'Subscription Billing', 'Admin Dashboards'], ARRAY['AWS', 'Docker', 'PostgreSQL'], 3),
('Cybersecurity', 'Shield', 'Security-first solutions — penetration testing, audits, and protection systems.', ARRAY['Penetration Testing', 'Vulnerability Assessment', 'SSL Hardening'], ARRAY['OWASP', 'VAPT', 'ISO 27001'], 4);

-- ============================================================
-- STEP 4: Seed Portfolio
-- ============================================================
DELETE FROM portfolio;

INSERT INTO portfolio (title, category, thumbnail, tech, description, result, display_order)
VALUES
('HealthTrack SaaS Platform', 'saas', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', ARRAY['Next.js', 'PostgreSQL', 'Stripe', 'AWS'], 'Multi-tenant health management SaaS with subscription billing, role-based access, and real-time dashboards.', '3× MRR growth in 4 months', 1),
('LegalDocs E-commerce', 'web-app', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', ARRAY['React', 'Node.js', 'Razorpay'], 'Document automation platform with e-signing, payment processing, and lawyer marketplace.', '2,000+ documents processed', 2),
('FinTrack Mobile App', 'mobile', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop', ARRAY['React Native', 'Expo', 'Firebase'], 'Personal finance tracker with AI-driven insights, budget alerts, and bank sync.', '4.8★ App Store rating', 3);

-- ============================================================
-- STEP 5: Seed Pricing
-- ============================================================
DELETE FROM pricing;

INSERT INTO pricing (name, price_range, description, features, cta_label, featured, badge, display_order)
VALUES
('Starter', '₹15,000 – ₹40,000', 'Best for small businesses needing a professional web presence.', ARRAY['Custom 5-page website', 'Mobile responsive design', 'Basic SEO setup', 'Contact form integration'], 'Start Project', false, '', 1),
('Growth', '₹50,000 – ₹1,50,000', 'Ideal for growing teams that need a full-featured web application.', ARRAY['Custom web application', 'User authentication', 'Admin dashboard', '3 months free support'], 'Get Started', true, 'Popular', 2),
('Scale', '₹2,00,000 – ₹5,00,000', 'Full SaaS platform or enterprise-grade application from scratch.', ARRAY['Multi-tenant architecture', 'Payment integration', 'Cloud infrastructure setup', 'Security audit included'], 'Talk to Us', false, '', 3),
('Custom', 'Custom Pricing', 'Tailored scope for complex requirements, ongoing retainers, or long-term partnerships.', ARRAY['Dedicated project team', 'Full product lifecycle ownership', 'Priority support', 'Flexible scope'], 'Get Custom Quote', false, 'Enterprise', 4);

-- ============================================================
-- STEP 6: Seed Stats
-- ============================================================
DELETE FROM stats;

INSERT INTO stats (value, suffix, label, display_order)
VALUES
('50', '+', 'Brands helped', 1),
('10', '+', 'Industries we work', 2),
('100', '%', 'Focused on results', 3);

-- ============================================================
-- STEP 7: Seed Reviews
-- ============================================================
DELETE FROM reviews;

INSERT INTO reviews (author, role, content, rating, status)
VALUES
('Rajesh Kumar', 'Founder & CEO, HealthTrack', 'Northern Star built our entire SaaS platform from scratch. The team understood our complex requirements and delivered a production-ready system in 3 months.', 5, 'approved'),
('Priya Sharma', 'CTO, LegalDocs', 'The development quality and code standards are exceptional. They implemented a secure payment system that processes thousands of transactions daily.', 5, 'approved'),
('Amit Patel', 'Operations Director, SwiftLogix', 'The automation system eliminated 40+ hours of manual work every week. The integration and automated invoicing have completely transformed how we handle orders.', 5, 'approved');

-- ============================================================
-- Done! Log in at /admin/login
-- Email:    tanishjain626@gmail.com
-- Password: AdminPassword123!
-- ============================================================
