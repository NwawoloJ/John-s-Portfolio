import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Code2, Palette, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image 3D rotation animation
      gsap.fromTo(
        imageRef.current,
        { rotateY: 45, opacity: 0, x: 100 },
        {
          rotateY: 0,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadCV = () => {
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'John_Nwawolo_CV.pdf';
    link.click();
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section min-h-screen flex items-center py-20 relative"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div
            ref={imageRef}
            className="relative perspective-container order-2 lg:order-1"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Glow Effect Behind Image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-2xl blur-2xl opacity-60" />
              
              {/* Image Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="/portrait.jpg"
                  alt="John Nwawolo"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 pulse-glow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Code2 size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">5+</p>
                    <p className="text-sm text-white/60">Years Exp.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="order-1 lg:order-2">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500" />
              <span className="text-cyan-400 text-sm uppercase tracking-widest font-medium">
                About Me
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Crafting Digital
              <br />
              <span className="gradient-text">Experiences</span>
            </h2>

            {/* Bio */}
            <div className="space-y-4 text-white/70 text-lg leading-relaxed mb-8">
              <p>
                I'm John Nwawolo, a passionate Frontend Developer based in Lagos, Nigeria. 
                With over 1 years of experience in web development, I specialize in creating 
                immersive, interactive, and visually stunning web applications.
              </p>
              <p>
                My approach combines clean code with pixel-perfect design, ensuring that every 
                project I work on not only functions flawlessly but also delivers an exceptional 
                user experience. I'm constantly exploring new technologies and pushing the boundaries 
                of what's possible on the web.
              </p>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['React', 'TypeScript', 'Next.js', 'Three.js', 'Tailwind CSS', 'Node.js'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full glass text-sm text-white/80 border border-white/10 hover:border-purple-500/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Download CV Button */}
            <button
              onClick={handleDownloadCV}
              className="btn-primary flex items-center gap-2 group mb-12"
            >
              <Download size={18} />
              Download CV
            </button>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              {[
                { icon: Code2, value: '50+', label: 'Projects' },
                { icon: Palette, value: '30+', label: 'Clients' },
                { icon: Zap, value: '100%', label: 'Satisfaction' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-purple-400" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</p>
                  <p className="text-sm text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
