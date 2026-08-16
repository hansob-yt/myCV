import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProjectModal } from './components/ProjectModal';
import { SkillsSection } from './components/SkillsSection';
import { InteractiveExtras } from './components/InteractiveExtras';
import { TerminalModal } from './components/TerminalModal';
import { ContactSection } from './components/ContactSection';
import { InteractiveScrollControls } from './components/InteractiveScrollControls';
import { InteractiveBackground } from './components/InteractiveBackground';
import { PrintResume } from './components/PrintResume';
import { BioModal } from './components/BioModal';
import { ExperienceModal } from './components/ExperienceModal';
import type { ProjectItem, ExperienceItem } from './types/cv';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('bio');
  const [isBioModalOpen, setIsBioModalOpen] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['bio', 'experience', 'projects', 'skills', 'extras', 'contact'];
    
    const handleScrollObserver = () => {
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  const handlePrintResume = () => {
    window.print();
  };

  const handleScrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-500">
        
        {/* Interactive Smooth Parallax Particles Background */}
        <InteractiveBackground />

        {/* Scroll Progress & Quick Jump Floating Dock */}
        <InteractiveScrollControls 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Top Glassmorphic Navigation Bar */}
        <Navbar 
          activeSection={activeSection}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onPrintResume={handlePrintResume}
        />

        {/* Main Content Sections (Minimalist, punchy, high-impact flow) */}
        <main className="relative z-10 no-print">
          {/* 1. Bio & Headline */}
          <Hero 
            onOpenBio={() => setIsBioModalOpen(true)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onPrintResume={handlePrintResume}
          />

          {/* 2. Experiences Timeline */}
          <ExperienceTimeline 
            onOpenExperienceModal={(exp) => setSelectedExperience(exp)}
          />

          {/* 3. Highlight Projects */}
          <ProjectsGrid 
            onOpenProjectModal={(proj) => setSelectedProject(proj)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />

          {/* 4. Technical Skills */}
          <SkillsSection />

          {/* 5. Extras Hub */}
          <InteractiveExtras 
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onPrintResume={handlePrintResume}
            onScrollToContact={handleScrollToContact}
          />

          {/* 6. Contact & Footer */}
          <ContactSection />
        </main>

        {/* --- Interactive Detail Modals ("Read More" Engine) --- */}
        
        {/* 1. Bio & Background Story Modal */}
        <BioModal 
          isOpen={isBioModalOpen}
          onClose={() => setIsBioModalOpen(false)}
          onOpenTerminal={() => {
            setIsBioModalOpen(false);
            setIsTerminalOpen(true);
          }}
        />

        {/* 2. Experience Detail & Accomplishments Modal */}
        <ExperienceModal 
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />

        {/* 3. Enterprise Project Modal (Kilid Auth / Dama Recharts) */}
        <ProjectModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenTerminal={() => {
            setSelectedProject(null);
            setIsTerminalOpen(true);
          }}
        />

        {/* 4. VS-Code Style FSD Architecture Code Explorer */}
        <TerminalModal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />

        {/* 5. Printable Resume Format (Visible only on print/PDF generation) */}
        <PrintResume />

      </div>
    </ThemeProvider>
  );
};

export default App;
