import { Heart, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-white mb-1">
              John <span className="gradient-text">Nwawolo</span>
            </h3>
            <p className="text-white/50 text-sm">Frontend Developer</p>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-purple-500 fill-purple-500" />
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
