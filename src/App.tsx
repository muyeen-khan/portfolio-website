import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ArrowDown } from 'lucide-react';
import { ScrollAnimation, StaggerAnimation } from './components/scroll-animations';
import { EnhancedBackgroundEffects } from './components/enhanced-background-effects';
import { ThemeProvider } from './components/theme-provider';
import { ThemeToggle } from './components/theme-toggle';
import { BlogSection } from './components/blog-section';
import { FloatingCard, MagneticButton, GlowEffect, TiltCard } from './components/hover-animations';
import { CursorParticles } from './components/cursor-particles';
import { PageTransition, SmoothScroll, SectionDivider } from './components/page-transitions';

function PortfolioContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();

  // Parallax effects for hero section
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.offsetTop - 80;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(Math.abs(distance) / 2, 1000);
      let start: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
    setIsMenuOpen(false);
  };

  const skills = [
    'React', 'TypeScript', 'Node.js', 'JavaScript',
    'Tailwind CSS', 'MongoDB', 'Git', 'Express.js', 'Firebase'
  ];

  const skills2 = [
    'Next.js', 'redux', 'DBMS', 'SQL', 'PostgreSQL', 'Prisma', 'Docker', 'AWS', 'Vitest', 'Jest', 'GraphQL'
  ];

  const projects = [
    {
      title: 'Modern Web Dashboard',
      description: 'A comprehensive analytics dashboard built with React and TypeScript, featuring real-time data visualization and responsive design.',
      image: 'https://images.unsplash.com/photo-1677214467820-ab069619bbb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzU3OTE4NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Mobile-First E-commerce App',
      description: 'A responsive e-commerce platform with modern UI/UX, payment integration, and inventory management system.',
      image: 'https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtb2NrdXB8ZW58MXx8fHwxNzU3OTc3MzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['Next.js', 'Stripe', 'MongoDB', 'Node.js'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Data Analytics Platform',
      description: 'Advanced data visualization platform with machine learning insights, custom reporting, and real-time analytics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTc5NzAyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['Python', 'React', 'D3.js', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Enhanced Background Effects */}
      <EnhancedBackgroundEffects />

      {/* Cursor Particles */}
      <CursorParticles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h2 className="font-semibold">Muyeen Khan</h2>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'skills', 'projects', 'blog', 'contact'].map((item) => (
                <MagneticButton key={item} strength={10}>
                  <SmoothScroll targetId={item}>
                    <button
                      className={`capitalize transition-colors hover:text-primary ${activeSection === item ? 'text-primary' : 'text-muted-foreground'
                        }`}
                    >
                      {item}
                    </button>
                  </SmoothScroll>
                </MagneticButton>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'about', 'skills', 'projects', 'blog', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="capitalize block px-3 py-2 text-left w-full hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <PageTransition id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="mb-8">
            <motion.div
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center cursor-pointer relative overflow-hidden"
              initial={{ scale: 1, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
            >
              <span className="text-3xl text-primary-foreground font-semibold relative z-10"><img src="https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-1/514408811_1253246786525839_7245999349090812419_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeG9PZRRMGDVl1aJi0AO1JOlHc7Y6Ggee84dztjoaB57ztQpqzR4nZ3DiqMI6LoiOwgBA-J7y9FeJRsVzti3wlcw&_nc_ohc=taq1DNXnq_cQ7kNvwGN6XYL&_nc_oc=Adm_1d4c4Gwb1VR3xi8rff1EKVTSKTo2MEhRebicXT8PD4sFlccEIIEypHfJYu8FjC8&_nc_zt=24&_nc_ht=scontent.fdac41-1.fna&_nc_gid=klOXhk_A079IzGb26lmvnA&oh=00_Afaj_fA-Mx9dD_lzDGTrmmDeZTl6XhDAgh4MmE-Xx6dTPQ&oe=68CF2236" alt="" /></span>
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Hi, I'm <span className="text-primary">Muyeen Khan</span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Front-End Developer growing into Full-Stack
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <MagneticButton strength={15}>
                <SmoothScroll targetId="projects">
                  <Button size="lg" className="group">
                    View My Work
                    <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </Button>
                </SmoothScroll>
              </MagneticButton>
              <MagneticButton strength={15}>
                <SmoothScroll targetId="contact">
                  <Button variant="outline" size="lg">
                    Get In Touch
                  </Button>
                </SmoothScroll>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div >
      </PageTransition >

      <SectionDivider />

      {/* About Section */}
      <PageTransition id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation className="text-center mb-16">
            <h2 className="mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate about creating innovative solutions and bringing ideas to life through code
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left" delay={0.2}>
              <TiltCard className="overflow-hidden rounded-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU4MDE1MzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Developer workspace"
                  className="w-full h-64 object-cover"
                />
              </TiltCard>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.4}>
              <div>
                <p className="mb-6">
                  I’m Muyeen Khan, a web developer passionate about creating sleek, interactive frontends and building robust backend APIs. I’ve completed several REST API projects, strengthening my skills in designing full-stack applications that are both functional and user-friendly. I enjoy turning ideas into practical solutions that deliver real value.
                </p>
                <p className="mb-6">
                  I’m always pushing my boundaries, learning advanced backend technologies, and experimenting with new tools. I aim to craft applications that are efficient, scalable, and elegantly designed, bridging the gap between frontend and backend seamlessly, while continuously improving and solving challenges along the way.
                </p>
                <div className="flex gap-4">
                  <MagneticButton>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      muyeenkhan80@gmail.com
                    </Button>
                  </MagneticButton>
                  <MagneticButton>
                    <Button variant="outline" size="sm">
                      Download CV
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </PageTransition>

      <SectionDivider />

      {/* Skills Section */}
      <PageTransition id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation className="text-center mb-16">
            <h2 className="mb-4">Skills & Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A diverse toolkit for building modern web applications and solving complex problems
            </p>
          </ScrollAnimation>

          <div className="grid gap-8">
            <ScrollAnimation delay={0.2}>
              <h3 className="mb-6 text-center">Technologies I Work With</h3>
              <StaggerAnimation className="flex flex-wrap gap-3 justify-center">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm hover:scale-105 transition-transform cursor-default">
                    {skill}
                  </Badge>
                ))}
              </StaggerAnimation>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <h3 className="mb-6 text-center">Currently Learning</h3>
              <StaggerAnimation className="flex flex-wrap gap-3 justify-center">
                {skills2.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm hover:scale-105 transition-transform cursor-default">
                    {skill}
                  </Badge>
                ))}
              </StaggerAnimation>
            </ScrollAnimation>

            <StaggerAnimation className="grid md:grid-cols-2 gap-6 mt-12" staggerDelay={0.15}>
              <FloatingCard intensity="medium">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-center">Frontend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Creating engaging user interfaces with modern frameworks and responsive design principles.
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard intensity="medium">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-center">Backend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Building robust APIs and server-side applications with scalable architecture.
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>


            </StaggerAnimation>
          </div>
        </div>
      </PageTransition>

      <SectionDivider />

      {/* Projects Section */}
      <PageTransition id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation className="text-center mb-16">
            <h2 className="mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work, demonstrating various skills and technologies
            </p>
          </ScrollAnimation>

          <StaggerAnimation className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.2}>
            {projects.map((project, index) => (
              <FloatingCard key={index} intensity="high">
                <Card className="overflow-hidden group h-full">
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <MagneticButton>
                        <Button size="sm" variant="outline" className="flex-1">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Live Demo
                        </Button>
                      </MagneticButton>
                      <MagneticButton>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Github className="mr-2 h-3 w-3" />
                          Code
                        </Button>
                      </MagneticButton>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            ))}
          </StaggerAnimation>

          <ScrollAnimation className="text-center mt-12" delay={0.6}>
            <MagneticButton>
              <Button variant="outline">
                View All Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </MagneticButton>
          </ScrollAnimation>
        </div>
      </PageTransition>

      <SectionDivider />

      {/* Blog Section */}
      <BlogSection />

      <SectionDivider />

      {/* Contact Section */}
      <PageTransition id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation className="mb-16">
            <h2 className="mb-4">Let's Work Together</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to chat about technology?
              I'd love to hear from you and discuss how we can bring your ideas to life.
            </p>
          </ScrollAnimation>

          <StaggerAnimation className="grid md:grid-cols-3 gap-8 mb-12" staggerDelay={0.15}>
            <GlowEffect glowColor="rgba(34, 197, 94, 0.3)">
              <FloatingCard intensity="medium">
                <Card className="h-full">
                  <CardHeader>
                    <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <CardTitle>Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">alex.johnson@example.com</p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </GlowEffect>

            <GlowEffect glowColor="rgba(59, 130, 246, 0.3)">
              <FloatingCard intensity="medium">
                <Card className="h-full">
                  <CardHeader>
                    <Linkedin className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <CardTitle>LinkedIn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">linkedin.com/in/alexjohnson</p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </GlowEffect>

            <GlowEffect glowColor="rgba(147, 51, 234, 0.3)">
              <FloatingCard intensity="medium">
                <Card className="h-full">
                  <CardHeader>
                    <Github className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <CardTitle>GitHub</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">github.com/alexjohnson</p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </GlowEffect>
          </StaggerAnimation>

          <ScrollAnimation delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton strength={15}>
                <Button size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </MagneticButton>
              <MagneticButton strength={15}>
                <Button variant="outline" size="lg">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </Button>
              </MagneticButton>
            </div>
          </ScrollAnimation>
        </div>
      </PageTransition>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">
                © 2024 Alex Johnson. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div >
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <PortfolioContent />
    </ThemeProvider>
  );
}