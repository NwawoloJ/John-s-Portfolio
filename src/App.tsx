import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  // Loading animation
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Initialize scroll animations
  useEffect(() => {
    if (isLoading) return;

    // Refresh ScrollTrigger after content loads
    ScrollTrigger.refresh();

    // Set up section observers for active section tracking
    const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isLoading]);

  // Smooth scroll behavior
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-void flex items-center justify-center z-50">
        <div className="relative">
          {/* Loading Animation */}
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm uppercase tracking-widest">Loading</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-void min-h-screen text-white overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
