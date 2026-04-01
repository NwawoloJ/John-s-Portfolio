import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Nebula Dashboard',
    description: 'A comprehensive analytics platform for cryptocurrency traders. Features real-time data visualization, portfolio tracking, and advanced charting capabilities.',
    image: '/project-1.jpg',
    tech: ['React', 'D3.js', 'WebSocket', 'Tailwind CSS'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 2,
    title: 'Cyber Store',
    description: 'Next-generation e-commerce experience with immersive product showcases, seamless checkout flow, and AI-powered recommendations.',
    image: '/project-2.jpg',
    tech: ['Next.js', 'Stripe', 'Framer Motion', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 3,
    title: 'Flux AI',
    description: 'An intelligent chat interface powered by advanced language models. Features context-aware conversations and customizable AI personalities.',
    image: '/project-3.jpg',
    tech: ['TypeScript', 'OpenAI', 'Node.js', 'Redis'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 4,
    title: 'TaskFlow Pro',
    description: 'Collaborative project management tool with Kanban boards, real-time updates, and team productivity analytics.',
    image: '/project-4.jpg',
    tech: ['React', 'Firebase', 'Material-UI', 'Chart.js'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 5,
    title: 'SoundWave',
    description: 'Music streaming application with immersive audio visualizations, personalized playlists, and social sharing features.',
    image: '/project-5.jpg',
    tech: ['Vue.js', 'Web Audio API', 'Spotify API', 'Sass'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 6,
    title: 'Luxe Estates',
    description: 'Premium real estate platform featuring virtual tours, interactive maps, and advanced property filtering.',
    image: '/project-6.jpg',
    tech: ['Next.js', 'Mapbox', 'Three.js', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
];

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      gsap.fromTo(
        '.project-card',
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-cyan-400 text-sm uppercase tracking-widest font-medium">
              Portfolio
            </span>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A selection of my recent work, showcasing my expertise in building 
            modern, responsive, and interactive web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={carouselRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative perspective-container"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-60" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 flex-1 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/70 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};
