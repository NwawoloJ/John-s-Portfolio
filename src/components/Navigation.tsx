import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 hidden md:block ${
          isScrolled
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="glass rounded-full px-2 py-2 flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 ml-2"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="glass p-3 rounded-full text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-void/95 backdrop-blur-xl transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-3xl font-display font-bold transition-all duration-300 hover-underline ${
                activeSection === link.id ? 'gradient-text' : 'text-white/70'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === link.id
                ? 'bg-purple-500 h-8'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </>
  );
};
