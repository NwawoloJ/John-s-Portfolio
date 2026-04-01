import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate 3D cube
      tl.fromTo(
        cubeRef.current,
        { scale: 0, rotateX: 180, rotateY: 180, opacity: 0 },
        { scale: 1, rotateX: 0, rotateY: 0, opacity: 1, duration: 1.5 },
        0
      );

      // Animate title with character split effect
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2 },
        0.3
      );

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.6
      );

      // Animate CTA buttons
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.9
      );

      // Continuous cube rotation
      gsap.to(cubeRef.current, {
        rotateX: 360,
        rotateY: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="section min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(160, 32, 240, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(160, 32, 240, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* 3D Cube */}
      <div
        ref={cubeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 perspective-container"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {/* Cube Faces */}
          {[
            { transform: 'translateZ(60px) md:translateZ(96px)', bg: 'from-purple-500/30 to-purple-600/30' },
            { transform: 'translateZ(-60px) md:translateZ(-96px) rotateY(180deg)', bg: 'from-cyan-500/30 to-cyan-600/30' },
            { transform: 'translateX(-60px) md:translateX(-96px) rotateY(-90deg)', bg: 'from-purple-600/30 to-cyan-500/30' },
            { transform: 'translateX(60px) md:translateX(96px) rotateY(90deg)', bg: 'from-cyan-600/30 to-purple-500/30' },
            { transform: 'translateY(-60px) md:translateY(-96px) rotateX(90deg)', bg: 'from-purple-500/20 to-cyan-500/20' },
            { transform: 'translateY(60px) md:translateY(96px) rotateX(-90deg)', bg: 'from-cyan-500/20 to-purple-500/20' },
          ].map((face, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-gradient-to-br ${face.bg} border border-white/10 backdrop-blur-sm`}
              style={{
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Name */}
        <h1
          ref={titleRef}
          className="hero-title text-[10vw] md:text-[8vw] font-display font-black leading-none tracking-tighter mb-4"
          style={{ perspective: '1000px' }}
        >
          <span className="text-white">JOHN</span>
          <span className="gradient-text ml-2 md:ml-4">NWAWOLO</span>
        </h1>

        {/* Title */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl text-white/70 font-light mb-2"
        >
          Frontend Developer
        </p>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto">
          Building clean, interactive, and immersive web experiences
          <br className="hidden md:block" />
          that merge art with technology
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={scrollToProjects}
            className="btn-primary flex items-center justify-center gap-2 group"
          >
            View Projects
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
          <button
            onClick={scrollToContact}
            className="btn-outline"
          >
            Contact Me
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          {[
            { icon: Github, href: 'https://github.com', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-purple-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
