import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================

const TECH_BADGES = [
  { name: 'React', icon: 'ti-brand-react', top: '15%', left: '10%', anim: 'float-1' },
  { name: 'Node.js', icon: 'ti-brand-nodejs', top: '25%', left: '80%', anim: 'float-2' },
  { name: 'Next.js', icon: 'ti-brand-nextjs', top: '70%', left: '12%', anim: 'float-3' },
  { name: 'MongoDB', icon: 'ti-database', top: '65%', left: '82%', anim: 'float-4' },
  { name: 'Docker', icon: 'ti-brand-docker', top: '80%', left: '25%', anim: 'float-1' },
  { name: 'AWS', icon: 'ti-brand-aws', top: '15%', left: '70%', anim: 'float-3' },
  { name: 'GraphQL', icon: 'ti-graphql', top: '82%', left: '70%', anim: 'float-2' },
  { name: 'TypeScript', icon: 'ti-brand-typescript', top: '45%', left: '88%', anim: 'float-4' }
];

const SKILLS_DATA = {
  Frontend: [
    { name: 'React', level: 95, icon: 'ti-brand-react', desc: 'Expert in Hooks, Context, Fiber, and Performance Tuning' },
    { name: 'Next.js', level: 90, icon: 'ti-brand-nextjs', desc: 'SSR, SSG, ISR, App Router, and Server Actions' },
    { name: 'TypeScript', level: 85, icon: 'ti-brand-typescript', desc: 'Strong typing, Generics, and strict mode integration' },
    { name: 'Redux', level: 80, icon: 'ti-settings', desc: 'Redux Toolkit, RTK Query, state management architecture' },
    { name: 'Tailwind CSS', level: 92, icon: 'ti-brand-tailwind', desc: 'Utility-first styling and custom design system building' }
  ],
  Backend: [
    { name: 'Node.js', level: 92, icon: 'ti-brand-nodejs', desc: 'Event-driven, asynchronous server architecture' },
    { name: 'Express', level: 90, icon: 'ti-brand-javascript', desc: 'REST API design, routing, and middleware development' },
    { name: 'REST APIs', level: 95, icon: 'ti-api', desc: 'Secure, self-documenting, clean RESTful endpoints' },
    { name: 'GraphQL', level: 80, icon: 'ti-graphql', desc: 'Schema design, resolvers, and Apollo Client/Server' },
    { name: 'JWT/OAuth', level: 85, icon: 'ti-lock', desc: 'Role-based access control, session validation, OAuth2' }
  ],
  Database: [
    { name: 'MongoDB', level: 88, icon: 'ti-database', desc: 'Document schemas, aggregation pipelines, optimization' },
    { name: 'PostgreSQL', level: 82, icon: 'ti-database', desc: 'Relational schemas, indexing, and complex joins' },
    { name: 'MySQL', level: 80, icon: 'ti-database', desc: 'Structured databases, transactions, and store procedures' },
    { name: 'Firebase', level: 78, icon: 'ti-brand-firebase', desc: 'Real-time database, Authentication, and Cloud Functions' }
  ],
  DevOps: [
    { name: 'Docker', level: 75, icon: 'ti-brand-docker', desc: 'Containerization, multi-stage builds, Docker Compose' },
    { name: 'AWS', level: 70, icon: 'ti-brand-aws', desc: 'EC2, S3, RDS, IAM, Lambda, CloudFront deployments' },
    { name: 'Google Cloud', level: 68, icon: 'ti-brand-google', desc: 'Cloud Run, App Engine, and Firebase hosting services' },
    { name: 'CI/CD', level: 72, icon: 'ti-git-branch', desc: 'GitHub Actions, automated testing, and build pipelines' },
    { name: 'Nginx', level: 70, icon: 'ti-server', desc: 'Reverse proxy, load balancing, SSL configuration' }
  ]
};

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'ShopFlow',
    subtitle: 'E-Commerce Platform',
    category: 'SaaS',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    problem: 'Full-featured e-commerce with real-time inventory and payments.',
    arch: 'Microservices backend, SSR product pages, Stripe webhook integration.',
    color: '#6366f1'
  },
  {
    id: 2,
    title: 'AnalyticsIQ',
    subtitle: 'SaaS Dashboard',
    category: 'SaaS',
    stack: ['React', 'Express', 'PostgreSQL', 'Chart.js', 'JWT'],
    problem: 'Multi-tenant analytics platform with role-based access control.',
    arch: 'JWT auth, PostgreSQL multi-tenant schema, real-time WebSocket updates.',
    color: '#8b5cf6'
  },
  {
    id: 3,
    title: 'ChatSphere',
    subtitle: 'Real-Time Chat App',
    category: 'Backend',
    stack: ['Node.js', 'Socket.io', 'MongoDB', 'React'],
    problem: 'Low-latency group chat with message history and file sharing.',
    arch: 'WebSocket rooms, Redis pub/sub, GridFS file storage.',
    color: '#06b6d4'
  },
  {
    id: 4,
    title: 'ContentOS',
    subtitle: 'Blog CMS',
    category: 'Frontend',
    stack: ['Next.js', 'MDX', 'PostgreSQL', 'Vercel'],
    problem: 'Headless CMS with SEO-optimized blog and markdown editor.',
    arch: 'Static generation, ISR, custom MDX components, tag taxonomy.',
    color: '#10b981'
  },
  {
    id: 5,
    title: 'SecureAPI',
    subtitle: 'API Gateway',
    category: 'Backend',
    stack: ['Node.js', 'Express', 'JWT', 'OAuth2', 'Redis'],
    problem: 'Production API gateway with rate limiting, OAuth, and logging.',
    arch: 'JWT + refresh tokens, Redis rate limit, API key management.',
    color: '#f59e0b'
  },
  {
    id: 6,
    title: 'LocalBiz',
    subtitle: 'Freelance Client Project',
    category: 'Freelance',
    stack: ['React', 'Firebase', 'Tailwind', 'Razorpay'],
    problem: 'Local business booking system with payment integration.',
    arch: 'Firebase auth, Firestore real-time DB, Razorpay checkout.',
    color: '#ef4444'
  }
];

const EXPERIENCE_DATA = [
  {
    year: '2024–Present',
    role: 'Senior Freelance Full Stack Developer',
    desc: 'Built 10+ production apps. Handled requirements, deadlines, and direct clients globally.',
    badges: ['Production Deployments', 'Client Management', 'SaaS Builder']
  },
  {
    year: '2023',
    role: 'Full Stack Developer (Independent)',
    desc: 'Specialized in backend architecture, authentication systems, and API design.',
    badges: ['API Expert', 'Auth Systems', 'GraphQL']
  },
  {
    year: '2022',
    role: 'Frontend Developer',
    desc: 'Built modern React/Next.js apps, mastered SSR/SSG and frontend performance tuning.',
    badges: ['React Expert', 'Performance', 'TypeScript']
  },
  {
    year: '2021',
    role: 'Junior Developer',
    desc: 'Started with JavaScript fundamentals, built first full-stack projects from scratch.',
    badges: ['JS Fundamentals', 'First Projects']
  }
];

const SERVICES_DATA = [
  { title: 'Full Stack Web Development', desc: 'End-to-end building of robust and secure web applications.', icon: 'ti-code' },
  { title: 'SaaS Application Development', desc: 'Multi-tenant applications with billing, subscriptions, and RBAC.', icon: 'ti-layout-dashboard' },
  { title: 'REST & GraphQL API Development', desc: 'Highly scalable, structured, and fast APIs built with Node.js.', icon: 'ti-api' },
  { title: 'Website Performance & Optimization', desc: 'Enhance SEO, load speed, Core Web Vitals, and Lighthouse scores.', icon: 'ti-bolt' },
  { title: 'Cloud Deployment & DevOps', desc: 'Dockerizing apps, writing pipelines, and configuring cloud providers.', icon: 'ti-cloud-upload' },
  { title: 'Mobile-First UI Development', desc: 'Fully responsive, pixel-perfect, and modern layouts.', icon: 'ti-device-mobile' }
];

const TESTIMONIALS_DATA = [
  {
    quote: 'Fasalu delivered our e-commerce platform ahead of schedule. Clean code, great communication, and awesome technical insight.',
    name: 'Rahul M.',
    role: 'Startup Founder',
    rating: 5
  },
  {
    quote: "Best API developer I've worked with. Scalable, well-documented, and production-ready code out of the box.",
    name: 'Sarah K.',
    role: 'Product Manager',
    rating: 5
  },
  {
    quote: 'Transformed our outdated website into a modern SaaS dashboard. Highly recommended for full-stack projects!',
    name: 'Anil T.',
    role: 'Business Owner',
    rating: 5
  }
];

const BLOG_PREVIEW_DATA = [
  {
    title: 'Building Scalable APIs with Node.js and Express',
    category: 'Backend',
    readTime: '5 min read',
    desc: 'Learn the architectural patterns for microservices, rate-limiting, and error handling.'
  },
  {
    title: 'Next.js App Router: Complete Guide for 2024',
    category: 'Frontend',
    readTime: '8 min read',
    desc: 'Deep dive into server components, static rendering, caching strategies, and SEO.'
  },
  {
    title: 'Dockerizing Your Full Stack App: Step by Step',
    category: 'DevOps',
    readTime: '6 min read',
    desc: 'Create secure multi-stage Docker builds, compose containers, and deploy to AWS.'
  }
];

// ==========================================
// UTILITY SUB-COMPONENTS
// ==========================================

// Scroll Reveal Wrapper (Intersection Observer)
const ScrollReveal = ({ children, style = {}, delay = 0 }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

// Count-Up Animation Component
const StatCounter = ({ endValue, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const end = parseInt(endValue);
    if (isNaN(end)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime = null;
          const duration = 1500;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            setCount(Math.floor(percentage * end));

            if (progress < duration) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [endValue]);

  const suffix = endValue.replace(/[0-9]/g, '');

  return (
    <div ref={ref} style={{ flex: 1, padding: '12px', minWidth: '100px' }}>
      <div
        style={{
          fontSize: '32px',
          fontWeight: '700',
          background: 'var(--gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '4px'
        }}
      >
        {count}
        {suffix}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>{label}</div>
    </div>
  );
};

// Canvas Dot Grid Background
const DotGridCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 40;
      ctx.fillStyle = 'rgba(99, 102, 241, 0.12)';
      for (let x = 20; x < canvas.width; x += spacing) {
        for (let y = 20; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

// ==========================================
// CORE APP COMPONENT
// ==========================================

export default function App() {
  // Theme state: dark = true, light = false
  const [darkTheme, setDarkTheme] = useState(() => {
    const saved = localStorage.getItem('fr-theme');
    return saved !== 'light'; // defaults to true
  });

  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [showCmdPalette, setShowCmdPalette] = useState(false);

  // Setup Analytics
  useEffect(() => {
    /* 
      Google Analytics / Plausible tracking snippet goes here.
      Example:
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    */
    console.log('[Analytics] Page view tracked');
  }, []);

  // Append Tabler Icons & Inter Google Fonts
  useEffect(() => {
    const fontsLink = document.createElement('link');
    fontsLink.rel = 'stylesheet';
    fontsLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(fontsLink);

    const iconsLink = document.createElement('link');
    iconsLink.rel = 'stylesheet';
    iconsLink.href = 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css';
    document.head.appendChild(iconsLink);

    return () => {
      document.head.removeChild(fontsLink);
      document.head.removeChild(iconsLink);
    };
  }, []);

  // Theme effect
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('fr-theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('fr-theme', 'light');
    }
  }, [darkTheme]);

  // Page Load Timeout & Scroll lock
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = '';
      }, 1500); // 1.2s overlay fade starts, 1.5s completely removes it
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Scroll events: track active section + floated CTA trigger
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolledPastHero(scrollPos > 300);

      // Simple section tracker
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'services', 'testimonials', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Command Palette Ctrl+K Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCmdPalette((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  }, []);

  // ==========================================
  // SECTIONS & SUB-COMPONENTS RENDERERS
  // ==========================================

  // 1. Loading Overlay
  const LoadingOverlay = () => {
    if (!loading) return null;
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#0a0a0f',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'opacity 0.4s ease',
          opacity: 1
        }}
      >
        <div
          style={{
            animation: 'scale-up-fade 1.2s ease-in-out infinite alternate',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.05em',
              marginBottom: '12px'
            }}
          >
            FR
          </div>
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            Fasalu Rahman
          </div>
        </div>
      </div>
    );
  };

  // 2. Navigation Bar
  const Navbar = () => {
    const navItems = [
      { label: 'About', id: 'about' },
      { label: 'Skills', id: 'skills' },
      { label: 'Projects', id: 'projects' },
      { label: 'Experience', id: 'experience' },
      { label: 'Services', id: 'services' },
      { label: 'Contact', id: 'contact' }
    ];

    return (
      <header
        className="glass-card"
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '1100px',
          height: '64px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          zIndex: 1000,
          borderRadius: '16px',
          border: '1px solid var(--border)'
        }}
      >
        {/* Logo */}
        <div
          onClick={() => scrollTo('hero')}
          style={{
            fontSize: '22px',
            fontWeight: '800',
            background: 'var(--gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
            letterSpacing: '-0.04em'
          }}
        >
          FR
        </div>

        {/* Links */}
        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="hide-on-mobile">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Keyboard hint */}
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }} className="hide-on-mobile">
            <kbd style={{ padding: '2px 4px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-secondary)', fontSize: '10px' }}>Ctrl</kbd> + 
            <kbd style={{ padding: '2px 4px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-secondary)', fontSize: '10px' }}>K</kbd>
          </span>

          {/* Theme Switcher */}
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontSize: '20px',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            className="hover-lift"
          >
            <i className={`ti ${darkTheme ? 'ti-sun' : 'ti-moon'}`}></i>
          </button>

          {/* CTA */}
          <button
            onClick={() => scrollTo('contact')}
            style={{
              background: 'var(--gradient)',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: darkTheme ? '0 0 16px rgba(99, 102, 241, 0.3)' : 'none'
            }}
            className="hover-lift"
          >
            Hire Me
          </button>
        </div>
      </header>
    );
  };

  // 3. Hero Section
  const HeroSection = () => {
    return (
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '120px 24px 60px 24px',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Canvas Background Dot Grid */}
        <DotGridCanvas />

        {/* Floating background gradient blobs */}
        <div className="blob" style={{ top: '10%', left: '5%', width: '300px', height: '300px', animation: 'blob-drift-1 20s infinite alternate' }}></div>
        <div className="blob" style={{ top: '35%', right: '5%', width: '350px', height: '350px', animation: 'blob-drift-2 24s infinite alternate' }}></div>
        <div className="blob" style={{ bottom: '10%', left: '15%', width: '280px', height: '280px', animation: 'blob-drift-3 18s infinite alternate' }}></div>

        {/* Scattered Tech Pill Badges */}
        {TECH_BADGES.map((badge, idx) => (
          <div
            key={idx}
            className="glass-card hide-on-mobile"
            style={{
              position: 'absolute',
              top: badge.top,
              left: badge.left,
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '500',
              animation: `${badge.anim} ${6 + idx}s ease-in-out infinite alternate`,
              pointerEvents: 'none',
              zIndex: 2,
              boxShadow: 'var(--card-glow)'
            }}
          >
            <i className={`ti ${badge.icon}`} style={{ color: 'var(--accent)', fontSize: '14px' }}></i>
            {badge.name}
          </div>
        ))}

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 5, maxWidth: '800px' }}>
          {/* Availability badge */}
          <ScrollReveal delay={100}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(99,102,241,0.4)',
                background: 'rgba(99,102,241,0.08)',
                color: '#a5b4fc',
                fontSize: '13px',
                fontWeight: '500',
                padding: '6px 14px',
                borderRadius: '99px',
                marginBottom: '24px'
              }}
            >
              <span style={{ color: '#4ade80' }}>🟢</span> Open to Work · Available for Freelance
            </div>
          </ScrollReveal>

          {/* Heading */}
          <ScrollReveal delay={200}>
            <h1
              className="hero-title"
              style={{
                fontSize: '56px',
                fontWeight: '800',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                marginBottom: '8px'
              }}
            >
              Hi, I'm Fasalu Rahman
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <h2
              className="hero-title"
              style={{
                fontSize: '56px',
                fontWeight: '800',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #6366f1 20%, #8b5cf6 50%, #06b6d4 80%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'text-gradient-shift 8s linear infinite',
                marginBottom: '24px'
              }}
            >
              Full Stack Developer
            </h2>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={400}>
            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                maxWidth: '580px',
                margin: '0 auto 36px auto',
                fontWeight: '400'
              }}
            >
              I build scalable, high-performance web & mobile applications using modern JavaScript ecosystems with 3 years of production experience.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={500}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => scrollTo('projects')}
                style={{
                  background: 'var(--gradient)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: darkTheme ? '0 0 24px rgba(99, 102, 241, 0.4)' : 'none'
                }}
                className="hover-lift"
              >
                View Projects <i className="ti ti-arrow-right"></i>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                style={{
                  background: 'none',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer'
                }}
                className="hover-lift"
              >
                Hire Me
              </button>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('[Resume Download] Resume file placeholder clicked.');
                }}
                style={{
                  background: 'none',
                  color: 'var(--text-muted)',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
                className="hover-lift"
              >
                <i className="ti ti-download"></i> Download Resume
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <div
          onClick={() => scrollTo('about')}
          style={{
            position: 'absolute',
            bottom: '32px',
            cursor: 'pointer',
            fontSize: '24px',
            color: 'var(--text-muted)',
            animation: 'chevron-bounce 2s infinite',
            zIndex: 5
          }}
        >
          <i className="ti ti-chevron-down"></i>
        </div>
      </section>
    );
  };

  // 4. About Section
  const AboutSection = () => {
    return (
      <section id="about" className="section-padding" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: '700' }}>About Me</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>Who I Am & What I Do</h2>
          </div>
        </ScrollReveal>

        <div className="grid-2col">
          {/* Bio card */}
          <ScrollReveal delay={100}>
            <div className="glass-card" style={{ padding: '36px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--gradient)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontSize: '28px',
                    fontWeight: '800'
                  }}
                >
                  FR
                </div>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)' }}>Fasalu Rahman</h3>
                  <div style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: '500' }}>Full Stack Developer</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <i className="ti ti-map-pin" style={{ marginRight: '4px' }}></i> Malappuram, Kerala, India
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <i className="ti ti-school" style={{ marginRight: '4px' }}></i> Jawaharlal College of Engineering and Technology
                  </div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '15px', marginBottom: '32px' }}>
                Passionate full-stack developer with 3 years of experience building scalable web applications and SaaS products. I combine clean architecture with modern DevOps practices to ship production-grade software. Currently open to full-time roles and exciting freelance projects.
              </p>

              {/* Stats Grid */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '24px', flexWrap: 'wrap' }}>
                <StatCounter endValue="3+" label="Years Exp" />
                <StatCounter endValue="15+" label="Projects" />
                <StatCounter endValue="10+" label="Clients" />
                <StatCounter endValue="5★" label="Rating" />
              </div>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <ScrollReveal delay={200}>
            <div style={{ paddingLeft: '8px', position: 'relative' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '24px' }}>Journey Highlights</h3>
              {/* Timeline Container */}
              <div style={{ position: 'relative', borderLeft: '2px solid var(--border)', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '-2px', width: '2px', background: 'var(--gradient)' }}></div>
                
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-30px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--gradient)', border: '2px solid var(--bg-primary)' }}></div>
                  <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600' }}>2024–Present</span>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', margin: '4px 0' }}>Freelance Full Stack Developer</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Building production web apps and SaaS products for clients globally, managing scope, databases, and deployment.</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-30px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--gradient)', border: '2px solid var(--bg-primary)' }}></div>
                  <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600' }}>2023</span>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', margin: '4px 0' }}>Backend Specialization</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Deepened expertise in Node.js, REST APIs, GraphQL, JWT authentication, and database schemas.</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-30px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--gradient)', border: '2px solid var(--bg-primary)' }}></div>
                  <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600' }}>2022</span>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', margin: '4px 0' }}>Frontend Mastery</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Mastered React ecosystem, Next.js, Redux toolkit, TypeScript, and loading performance optimizations.</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-30px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--gradient)', border: '2px solid var(--bg-primary)' }}></div>
                  <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600' }}>2021</span>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', margin: '4px 0' }}>Started Development</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Began with JavaScript fundamentals, built first full-stack projects using node modules, html & css.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  };

  // 5. Skills Section
  const SkillsSection = () => {
    const tabs = ['Frontend', 'Backend', 'Database', 'DevOps'];
    const [activeTab, setActiveTab] = useState('Frontend');
    const [hoveredSkill, setHoveredSkill] = useState(null);

    // Progress Bar Animation Ref trigger
    const [animateProgress, setAnimateProgress] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setAnimateProgress(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      return () => {
        if (sectionRef.current) observer.unobserve(sectionRef.current);
      };
    }, []);

    return (
      <section ref={sectionRef} id="skills" className="section-padding" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: '700' }}>Skills & Technologies</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>My Tech Stack</h2>
          </div>
        </ScrollReveal>

        {/* Tab switcher */}
        <ScrollReveal delay={100}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '10px 20px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: activeTab === tab ? 'var(--accent)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'color 0.2s, border-bottom 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Active tab content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Icon Cards Grid */}
          <ScrollReveal delay={200}>
            <div className="grid-4col" style={{ display: 'grid', gap: '16px' }}>
              {SKILLS_DATA[activeTab].map((skill, idx) => (
                <div
                  key={idx}
                  className="glass-card hover-lift"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <i className={`ti ${skill.icon}`} style={{ fontSize: '32px', color: 'var(--accent)', marginBottom: '12px' }}></i>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>{skill.name}</span>
                  
                  {/* Tooltip */}
                  {hoveredSkill === skill.name && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '105%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '200px',
                        background: '#0a0a0f',
                        color: '#ffffff',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        zIndex: 100,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        pointerEvents: 'none'
                      }}
                    >
                      {skill.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Progress Bars */}
          <ScrollReveal delay={300}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
              {SKILLS_DATA[activeTab].map((skill, idx) => (
                <div key={idx} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{skill.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        background: 'var(--gradient)',
                        borderRadius: '99px',
                        width: animateProgress ? `${skill.level}%` : '0%',
                        transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  };

  // 6. Projects Section
  const ProjectsSection = () => {
    const filters = ['All', 'Frontend', 'Backend', 'SaaS', 'Freelance'];
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [expandedProject, setExpandedProject] = useState(null);

    const filteredProjects = useMemo(() => {
      if (activeFilter === 'All') return PROJECTS_DATA;
      return PROJECTS_DATA.filter((p) => p.category === activeFilter);
    }, [activeFilter]);

    // Handle Escape Key for Modal
    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const toggleArch = (e, id) => {
      e.stopPropagation(); // prevent modal trigger
      setExpandedProject((prev) => (prev === id ? null : id));
    };

    return (
      <section id="projects" className="section-padding" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: '700' }}>Projects</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>My Work & Solutions</h2>
          </div>
        </ScrollReveal>

        {/* Filter Pills */}
        <ScrollReveal delay={100}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  background: activeFilter === filter ? 'var(--gradient)' : 'var(--bg-card)',
                  color: activeFilter === filter ? '#ffffff' : 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  transition: 'background 0.2s, color 0.2s'
                }}
                className="hover-lift"
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Cards Grid */}
        <div className="grid-3col" style={{ display: 'grid' }}>
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 80}>
              <div
                className="glass-card hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Accent Top Border Line */}
                <div style={{ height: '3px', background: project.color, width: '100%' }} />

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>{project.subtitle}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid var(--border)',
                        fontWeight: '600'
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>{project.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>{project.problem}</p>

                  {/* Tech stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {project.stack.map((tech) => (
                      <span key={tech} style={{ fontSize: '11px', background: 'var(--bg-card)', color: 'var(--text-muted)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Collapsible Architecture Row */}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                    <button
                      onClick={(e) => toggleArch(e, project.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent)',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {expandedProject === project.id ? 'Hide Architecture' : 'View Architecture'}{' '}
                      <i className={`ti ${expandedProject === project.id ? 'ti-chevron-up' : 'ti-chevron-down'}`}></i>
                    </button>

                    <div
                      style={{
                        maxHeight: expandedProject === project.id ? '100px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease',
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        lineHeight: '1.5',
                        marginTop: expandedProject === project.id ? '8px' : '0'
                      }}
                    >
                      {project.arch}
                    </div>
                  </div>

                  {/* Card Action footer */}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        alert(`[Demo] Loading live demo of ${project.title}`);
                      }}
                      style={{ fontSize: '13px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                      className="hover-lift"
                    >
                      Live Demo <i className="ti ti-arrow-up-right"></i>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        alert(`[GitHub] Opening repository of ${project.title}`);
                      }}
                      style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                      className="hover-lift"
                    >
                      GitHub <i className="ti ti-brand-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Project Detailed Modal */}
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '600px',
                padding: '32px',
                position: 'relative',
                animation: 'scale-up-fade 0.2s ease-out'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '22px',
                  cursor: 'pointer'
                }}
              >
                <i className="ti ti-x"></i>
              </button>

              <div style={{ height: '4px', background: selectedProject.color, width: '60px', borderRadius: '2px', marginBottom: '16px' }} />

              <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '600', textTransform: 'uppercase' }}>
                {selectedProject.category} · {selectedProject.subtitle}
              </span>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '4px', marginBottom: '16px' }}>{selectedProject.title}</h3>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>Core Objective / Problem Statement</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedProject.problem}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>Technical Architecture</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedProject.arch}</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Technologies Used</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedProject.stack.map((tech) => (
                    <span key={tech} style={{ fontSize: '12px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <button
                  onClick={() => alert(`[Live Demo] Navigating to ${selectedProject.title}`)}
                  style={{
                    flex: 1,
                    background: 'var(--gradient)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                  className="hover-lift"
                >
                  Launch App <i className="ti ti-arrow-up-right"></i>
                </button>
                <button
                  onClick={() => alert(`[GitHub] Opening source files for ${selectedProject.title}`)}
                  style={{
                    flex: 1,
                    background: 'none',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                  className="hover-lift"
                >
                  View Source <i className="ti ti-brand-github"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  };

  // 7. Experience Section
  const ExperienceSection = () => {
    return (
      <section id="experience" className="section-padding" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: '700' }}>History</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>Professional Experience</h2>
          </div>
        </ScrollReveal>

        {/* Experience Centered Timeline */}
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical Center Line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'var(--border)',
              transform: 'translateX(-50%)'
            }}
            className="hide-on-mobile"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {EXPERIENCE_DATA.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <ScrollReveal key={idx} delay={idx * 100}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: isEven ? 'flex-start' : 'flex-end',
                      width: '100%',
                      position: 'relative'
                    }}
                    className="timeline-item"
                  >
                    {/* Centered dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '24px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: 'var(--gradient)',
                        border: '3px solid var(--bg-primary)',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                        boxShadow: '0 0 10px var(--accent)'
                      }}
                      className="hide-on-mobile"
                    />

                    {/* Timeline card */}
                    <div
                      className="glass-card hover-lift"
                      style={{
                        width: '45%',
                        padding: '24px',
                        position: 'relative'
                      }}
                    >
                      <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600' }}>{exp.year}</span>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', margin: '4px 0' }}>{exp.role}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>{exp.desc}</p>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {exp.badges.map((badge) => (
                          <span
                            key={badge}
                            style={{
                              fontSize: '11px',
                              background: 'var(--bg-secondary)',
                              color: 'var(--text-primary)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: '1px solid var(--border)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <i className="ti ti-award" style={{ color: 'var(--accent)' }}></i>
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // 8. Services & Pricing Section
  const ServicesSection = () => {
    return (
      <section id="services" className="section-padding" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: '700' }}>Offerings</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>Services & Pricing Plans</h2>
          </div>
        </ScrollReveal>

        {/* Services grid */}
        <div className="grid-3col" style={{ display: 'grid', gap: '20px', marginBottom: '64px' }}>
          {SERVICES_DATA.map((service, idx) => (
            <ScrollReveal key={idx} delay={idx * 50}>
              <div className="glass-card hover-lift" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <i className={`ti ${service.icon}`} style={{ fontSize: '28px', color: 'var(--accent)', marginBottom: '16px' }}></i>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>{service.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{service.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pricing plans */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>Pricing Models</h3>
        </div>

        <div className="grid-3col" style={{ display: 'grid', gap: '24px', alignItems: 'stretch' }}>
          {/* Plan 1: Basic */}
          <ScrollReveal delay={100}>
            <div className="glass-card hover-lift" style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Basic Plan</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '16px 0 24px 0' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }}>₹15,000</span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.5' }}>
                Perfect for static portfolios, landing pages, and single-product campaigns.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> 5 Pages UI Design</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Mobile Responsive Layout</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Basic SEO Integration</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> 1 Revision Iteration</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> 1 Week Delivery Time</div>
              </div>

              <button
                onClick={() => scrollTo('contact')}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}
                className="hover-lift"
              >
                Get Started
              </button>
            </div>
          </ScrollReveal>

          {/* Plan 2: Standard (Most Popular) */}
          <ScrollReveal delay={200}>
            <div
              className="glass-card hover-lift"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                border: '2px solid var(--accent)',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '24px',
                  background: 'var(--gradient)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Most Popular
              </div>

              <span style={{ fontSize: '13px', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: '700' }}>Standard Plan</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '16px 0 24px 0' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }}>₹40,000</span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.5' }}>
                Ideal for full-stack apps, authentication portals, and transactional applications.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Full Stack Web Application</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Secure JWT Auth Systems</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Relational / NoSQL Database</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Third-Party API Integration</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> 3 Complete Revisions</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> 3 Weeks Delivery Time</div>
              </div>

              <button
                onClick={() => scrollTo('contact')}
                style={{ width: '100%', padding: '12px', border: 'none', background: 'var(--gradient)', color: '#ffffff', fontWeight: '700', borderRadius: '8px', cursor: 'pointer' }}
                className="hover-lift"
              >
                Choose Standard
              </button>
            </div>
          </ScrollReveal>

          {/* Plan 3: Premium */}
          <ScrollReveal delay={300}>
            <div className="glass-card hover-lift" style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Premium Plan</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '16px 0 24px 0' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }}>₹1,00,000+</span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.5' }}>
                For complex SaaS platforms, cloud infrastructure migrations, and enterprise systems.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Custom SaaS Architecture</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Cloud Infrastructure Deployment</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Automated CI/CD Pipelines</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Ongoing Post-Launch Support</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> Dev Revisions Included</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><i className="ti ti-check" style={{ color: 'var(--accent)' }}></i> 6–8 Weeks Scale Delivery</div>
              </div>

              <button
                onClick={() => scrollTo('contact')}
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}
                className="hover-lift"
              >
                Contact Me
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  };

  // 9. Testimonials Section
  const TestimonialsSection = () => {
    return (
      <section id="testimonials" className="section-padding" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: '700' }}>Endorsements</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>What Clients Say</h2>
          </div>
        </ScrollReveal>

        <div className="grid-3col" style={{ display: 'grid', gap: '20px' }}>
          {TESTIMONIALS_DATA.map((t, idx) => (
            <ScrollReveal key={idx} delay={idx * 80}>
              <div className="glass-card hover-lift" style={{ padding: '32px', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Large quote mark */}
                <i className="ti ti-quote" style={{ fontSize: '48px', position: 'absolute', top: '16px', left: '16px', color: 'rgba(99, 102, 241, 0.08)', pointerEvents: 'none' }}></i>
                
                {/* Rating */}
                <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', fontSize: '14px', marginBottom: '16px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <i key={i} className="ti ti-star-filled"></i>
                  ))}
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', flex: 1, fontStyle: 'italic', marginBottom: '24px' }}>
                  "{t.quote}"
                </p>

                {/* Client Avatar / Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: '700',
                      fontSize: '14px',
                      color: 'var(--accent)'
                    }}
                  >
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{t.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    );
  };

  // 10. Contact Section
  const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: 'Job Opportunity', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success
    const [errorMsg, setErrorMsg] = useState('');

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrorMsg('');

      // Validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setErrorMsg('All fields are required.');
        return;
      }
      if (!validateEmail(formData.email)) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }

      setStatus('sending');

      // Mimic send delay
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'Job Opportunity', message: '' });

        // Reset status back to idle after 3s
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      }, 1200);
    };

    return (
      <section id="contact" className="section-padding" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: '700' }}>Inquiries</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>Let's Build Something Great</h2>
          </div>
        </ScrollReveal>

        <div className="grid-2col">
          {/* Contact Details Card */}
          <ScrollReveal delay={100}>
            <div className="glass-card" style={{ padding: '36px', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>Contact Information</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
                I am actively seeking full-time roles, freelance initiatives, and startup partnerships. Reach out to collaborate!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--accent)', fontSize: '18px' }}>
                    <i className="ti ti-mail"></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email Me</div>
                    <a href="mailto:fasalurahman655@gmail.com" style={{ fontSize: '14px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>fasalurahman655@gmail.com</a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--accent)', fontSize: '18px' }}>
                    <i className="ti ti-map-pin"></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>My Location</div>
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>Malappuram, Kerala, India</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--accent)', fontSize: '18px' }}>
                    <i className="ti ti-clock"></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Availability</div>
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>Open to Work / Freelance</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--accent)', fontSize: '18px' }}>
                    <i className="ti ti-phone"></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Call / WhatsApp</div>
                    <a href="tel:+919656204843" style={{ fontSize: '14px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>+91 96562 04843</a>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct chat button */}
              <div style={{ marginTop: '32px' }}>
                <a
                  href="https://wa.me/919656204843"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#25d366',
                    color: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                  }}
                  className="hover-lift"
                >
                  <i className="ti ti-brand-whatsapp" style={{ fontSize: '18px' }}></i> Message on WhatsApp
                </a>
              </div>

              {/* Social icons row */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <a href="https://github.com/fasalurahman" target="_blank" rel="noreferrer" className="hover-lift" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  <i className="ti ti-brand-github"></i>
                </a>
                <a href="https://linkedin.com/in/fasalurahman" target="_blank" rel="noreferrer" className="hover-lift" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  <i className="ti ti-brand-linkedin"></i>
                </a>
                <a href="#" className="hover-lift" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  <i className="ti ti-brand-x"></i>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form Card */}
          <ScrollReveal delay={200}>
            <div className="glass-card" style={{ padding: '36px', position: 'relative' }}>
              {status === 'success' ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0', textAlign: 'center' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(74, 222, 128, 0.1)',
                      color: '#4ade80',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '32px',
                      marginBottom: '16px',
                      border: '1px solid rgba(74, 222, 128, 0.3)',
                      animation: 'scale-up-fade 0.3s ease-out'
                    }}
                  >
                    <i className="ti ti-circle-check"></i>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Thank you for reaching out, Fasalu will reply shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {errorMsg && (
                    <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', color: '#f87171', fontSize: '13px' }}>
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontFamily: 'inherit'
                      }}
                      className="form-input"
                      placeholder="e.g. Rahul M."
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontFamily: 'inherit'
                      }}
                      className="form-input"
                      placeholder="e.g. rahul@startup.com"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontFamily: 'inherit'
                      }}
                      className="form-input"
                    >
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="Freelance">Freelance Inquiry</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'none'
                      }}
                      className="form-input"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      background: 'var(--gradient)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                      opacity: status === 'sending' ? 0.7 : 1
                    }}
                    className="hover-lift"
                  >
                    {status === 'sending' ? (
                      'Sending Message...'
                    ) : (
                      <>
                        Send Message <i className="ti ti-arrow-right"></i>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  };

  // 11. Blog Preview Section
  const BlogPreviewSection = () => {
    return (
      <section id="blog" className="section-padding" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: '700' }}>Articles</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>From My Blog</h2>
          </div>
        </ScrollReveal>

        <div className="grid-3col" style={{ display: 'grid', gap: '20px' }}>
          {BLOG_PREVIEW_DATA.map((article, idx) => (
            <ScrollReveal key={idx} delay={idx * 80}>
              <div
                className="glass-card hover-lift"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Coming Soon Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(10, 10, 15, 0.85)',
                    backdropFilter: 'blur(3px)',
                    WebkitBackdropFilter: 'blur(3px)',
                    zIndex: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <span
                    style={{
                      border: '1px solid var(--border)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Coming Soon
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '600', textTransform: 'uppercase' }}>{article.category}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{article.readTime}</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: '1.4' }}>{article.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', flex: 1 }}>{article.desc}</p>
                
                <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Read More <i className="ti ti-arrow-right"></i>
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    );
  };

  // 12. Footer
  const Footer = () => {
    return (
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          padding: '64px 24px 32px 24px',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            {/* Logo + Tagline */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.04em' }}>FR</div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', maxWidth: '300px' }}>
                Building high-performance, responsive full-stack applications with clean architectures.
              </p>
            </div>

            {/* Links row */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}>Home</button>
              <button onClick={() => scrollTo('about')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}>About</button>
              <button onClick={() => scrollTo('skills')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}>Skills</button>
              <button onClick={() => scrollTo('projects')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}>Projects</button>
              <button onClick={() => scrollTo('experience')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}>Experience</button>
              <button onClick={() => scrollTo('services')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}>Services</button>
              <button onClick={() => scrollTo('contact')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}>Contact</button>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://github.com/fasalurahman" target="_blank" rel="noreferrer" className="hover-lift" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-primary)', textDecoration: 'none' }}>
                <i className="ti ti-brand-github"></i>
              </a>
              <a href="https://linkedin.com/in/fasalurahman" target="_blank" rel="noreferrer" className="hover-lift" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-primary)', textDecoration: 'none' }}>
                <i className="ti ti-brand-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Bottom row copyright info */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <div>
              © 2024 Fasalu Rahman · Built with React & passion ☕
            </div>
            <div>
              Tech Stack: React · Node.js · MongoDB · Vercel
            </div>
          </div>

        </div>
      </footer>
    );
  };

  // 13. Command Palette Modal
  const CommandPalette = () => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    const items = useMemo(() => {
      const all = [
        { label: 'Go to Home / Hero', shortcut: 'G H', action: () => scrollTo('hero'), icon: 'ti-home' },
        { label: 'Go to About Section', shortcut: 'G A', action: () => scrollTo('about'), icon: 'ti-user' },
        { label: 'Go to Skills Section', shortcut: 'G S', action: () => scrollTo('skills'), icon: 'ti-bolt' },
        { label: 'Go to Projects Section', shortcut: 'G P', action: () => scrollTo('projects'), icon: 'ti-folder' },
        { label: 'Go to Contact Section', shortcut: 'G C', action: () => scrollTo('contact'), icon: 'ti-mail' },
        { label: 'Toggle Light/Dark Theme', shortcut: 'T T', action: () => setDarkTheme((d) => !d), icon: 'ti-adjustments' },
        { label: 'Open GitHub Profile', shortcut: 'O G', action: () => window.open('https://github.com/fasalurahman', '_blank'), icon: 'ti-brand-github' },
        { label: 'Open LinkedIn Profile', shortcut: 'O L', action: () => window.open('https://linkedin.com/in/fasalurahman', '_blank'), icon: 'ti-brand-linkedin' },
        { label: 'Download Resume PDF', shortcut: 'D R', action: () => alert('[Download] Resume file download clicked.'), icon: 'ti-download' }
      ];

      if (!query) return all;
      return all.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
    }, [query]);

    // Focus input on mount
    useEffect(() => {
      if (inputRef.current) inputRef.current.focus();
    }, []);

    // Navigate with Keyboard
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (items[selectedIndex]) {
          items[selectedIndex].action();
          setShowCmdPalette(false);
        }
      } else if (e.key === 'Escape') {
        setShowCmdPalette(false);
      }
    };

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 3000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '100px',
          paddingLeft: '16px',
          paddingRight: '16px'
        }}
        onClick={() => setShowCmdPalette(false)}
      >
        <div
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: '480px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            animation: 'scale-up-fade 0.15s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Input */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--border)' }}>
            <i className="ti ti-search" style={{ fontSize: '18px', color: 'var(--text-muted)', marginRight: '12px' }}></i>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search shortcuts..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                color: 'var(--text-primary)',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <kbd style={{ fontSize: '11px', color: 'var(--text-muted)', padding: '2px 6px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-primary)' }}>ESC</kbd>
          </div>

          {/* List items */}
          <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '8px' }}>
            {items.length === 0 ? (
              <div style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center' }}>
                No results found for "{query}"
              </div>
            ) : (
              items.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      item.action();
                      setShowCmdPalette(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: isSelected ? 'var(--bg-card)' : 'transparent',
                      transition: 'background 0.1s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className={`ti ${item.icon}`} style={{ fontSize: '16px', color: isSelected ? 'var(--accent)' : 'var(--text-muted)' }}></i>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{item.label}</span>
                    </div>
                    <kbd style={{ fontSize: '11px', color: 'var(--text-muted)', padding: '2px 4px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-primary)' }}>
                      {item.shortcut}
                    </kbd>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  };

  // 14. Floating CTA
  const FloatingCTA = () => {
    if (!scrolledPastHero) return null;
    return (
      <button
        onClick={() => scrollTo('contact')}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--gradient)',
          color: '#ffffff',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '99px',
          fontWeight: '700',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'pulse-ring 2s infinite'
        }}
        className="hover-lift"
      >
        <i className="ti ti-mail"></i> Hire Me
      </button>
    );
  };

  return (
    <>
      {/* Styles Injected dynamically in document body/head context */}
      <style>{`
        /* Global CSS declarations */
        :root {
          --bg-primary: #0a0a0f;
          --bg-secondary: #111118;
          --bg-card: rgba(255, 255, 255, 0.04);
          --border: rgba(255, 255, 255, 0.08);
          --text-primary: #ffffff;
          --text-muted: rgba(255, 255, 255, 0.45);
          --accent: #6366f1;
          --accent-2: #8b5cf6;
          --accent-3: #06b6d4;
          --gradient: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
          --shadow-glow: 0 0 24px rgba(99, 102, 241, 0.4);
          --card-glow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }

        .light-theme {
          --bg-primary: #ffffff;
          --bg-secondary: #f8f9ff;
          --bg-card: rgba(0, 0, 0, 0.03);
          --border: rgba(0, 0, 0, 0.08);
          --text-primary: #0a0a0f;
          --text-muted: rgba(0, 0, 0, 0.45);
          --accent: #6366f1;
          --accent-2: #8b5cf6;
          --accent-3: #06b6d4;
          --gradient: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
          --shadow-glow: 0 0 24px rgba(99, 102, 241, 0.15);
          --card-glow: 0 4px 30px rgba(0, 0, 0, 0.04);
        }

        body {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          transition: background-color 0.3s, color 0.3s;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          scroll-behavior: smooth;
        }

        /* Scrollbar styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: var(--bg-primary);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }

        /* Helper responsive grids */
        .grid-2col {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
        }
        .grid-3col {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
        }
        .grid-4col {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        /* Hover lift effect & input border glows */
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-2px);
        }
        .hover-lift:active {
          transform: scale(0.97);
        }

        .form-input {
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        /* Glassmorphism card default styles */
        .glass-card {
          background: var(--bg-card);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--card-glow);
          transition: border-color 0.2s ease;
        }
        .glass-card:hover {
          border-color: rgba(99, 102, 241, 0.25);
        }

        /* Navbar active indicator and underlines */
        .nav-link {
          position: relative;
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 14px;
          transition: color 0.2s;
          padding: 8px 12px;
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--gradient);
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }
        .nav-link.active {
          color: var(--text-primary);
        }
        .nav-link.active::after {
          transform: scaleX(1);
        }

        /* Hero blobs background styling */
        .blob {
          position: absolute;
          border-radius: 50%;
          background: var(--gradient);
          filter: blur(80px);
          opacity: 0.05;
          pointer-events: none;
          z-index: 1;
        }

        /* Keyframes animations */
        @keyframes scale-up-fade {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float-1 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-2 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-1.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-3 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-4 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes blob-drift-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 40px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blob-drift-2 {
          0% { transform: translate(0px, 0px) scale(1.1); }
          50% { transform: translate(-60px, 50px) scale(0.85); }
          100% { transform: translate(0px, 0px) scale(1.1); }
        }
        @keyframes blob-drift-3 {
          0% { transform: translate(0px, 0px) scale(0.9); }
          50% { transform: translate(50px, -50px) scale(1.1); }
          100% { transform: translate(0px, 0px) scale(0.9); }
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }

        @keyframes chevron-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          60% { transform: translateY(-3px); }
        }

        @keyframes text-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Mobile adaptation styles */
        @media (max-width: 900px) {
          .grid-4col {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .grid-2col, .grid-3col {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .grid-4col {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-title {
            font-size: 38px !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
          .timeline-item {
            justify-content: flex-start !important;
            width: 100% !important;
          }
          .timeline-item .glass-card {
            width: 100% !important;
            margin-left: 0 !important;
          }
        }
      `}</style>

      {/* Main Container Wrapper */}
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        
        {/* Loading Overlay */}
        <LoadingOverlay />

        {/* Global Navbar */}
        <Navbar />

        {/* Sections */}
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <BlogPreviewSection />

        {/* Footer */}
        <Footer />

        {/* Command Palette */}
        {showCmdPalette && <CommandPalette />}

        {/* Floating CTA */}
        <FloatingCTA />

      </div>
    </>
  );
}

