import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Palette, 
  Database, 
  Terminal
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: 'Frontend',
    icon: Code2,
    items: [
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
    ],
  },
  {
    category: 'Styling',
    icon: Palette,
    items: [
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Sass/SCSS', level: 85 },
      { name: 'Styled Components', level: 80 },
      { name: 'Framer Motion', level: 82 },
    ],
  },
  {
    category: 'Backend',
    icon: Database,
    items: [
      { name: 'Node.js', level: 78 },
      { name: 'Express.js', level: 75 },
      { name: 'MongoDB', level: 70 },
      { name: 'PostgreSQL', level: 68 },
    ],
  },
  {
    category: 'Tools',
    icon: Terminal,
    items: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Webpack/Vite', level: 80 },
      { name: 'Docker', level: 65 },
      { name: 'Figma', level: 85 },
    ],
  },
];

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Tailwind', icon: '🌊' },
  { name: 'Git', icon: '🌿' },
  { name: 'Three.js', icon: '🔺' },
  { name: 'GSAP', icon: '🎬' },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill cards animation
      gsap.fromTo(
        '.skill-card',
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Progress bars animation
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach((bar) => {
        const level = bar.getAttribute('data-level');
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Tech badges animation
      gsap.fromTo(
        '.tech-badge',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: techRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section min-h-screen py-20 relative"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-cyan-400 text-sm uppercase tracking-widest font-medium">
              Expertise
            </span>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and skills I've mastered 
            to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 mb-16">
          {skills.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="skill-card glass-card rounded-2xl p-6 perspective-container"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <skillGroup.icon size={24} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {skillGroup.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80 text-sm">{skill.name}</span>
                      <span className="text-purple-400 text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="progress-bar h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        data-level={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Cloud */}
        <div ref={techRef} className="text-center">
          <h3 className="text-2xl font-display font-bold text-white mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="tech-badge glass px-6 py-3 rounded-full flex items-center gap-3 hover:border-purple-500/50 transition-colors cursor-default"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-white/80 font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
