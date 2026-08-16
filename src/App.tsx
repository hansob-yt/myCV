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
import type { ProjectItem } from './types/cv';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('bio');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [selectedSkillTag, setSelectedSkillTag] = useState<string | undefined>(undefined);

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

  const handleSelectSkillFromExperience = (skill: string) => {
    setSelectedSkillTag(skill);
    const skillsElement = document.getElementById('skills');
    if (skillsElement) {
      skillsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-300">
        
        {/* Interactive Smooth Parallax Particles Background */}
        <InteractiveBackground activeSection={activeSection} />

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

        {/* Main Content Sections (In the exact specified sequence) */}
        <main className="relative z-10 no-print">
          {/* 1. Bio & Headline */}
          <Hero 
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onPrintResume={handlePrintResume}
          />

          {/* 2. Experiences Timeline */}
          <ExperienceTimeline 
            onSelectSkill={handleSelectSkillFromExperience}
          />

          {/* 3. Highlight Projects */}
          <ProjectsGrid 
            onOpenProjectModal={(proj) => setSelectedProject(proj)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />

          {/* 4. Technical Skills */}
          <SkillsSection 
            selectedSkillTag={selectedSkillTag}
          />

          {/* 5. Extras Hub */}
          <InteractiveExtras 
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onPrintResume={handlePrintResume}
            onScrollToContact={handleScrollToContact}
          />

          {/* 6. Contact & Footer */}
          <ContactSection />
        </main>

        {/* Interactive Modals */}
        {/* A. Enterprise Project Modal (Kilid Auth / Dama Recharts) */}
        <ProjectModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenTerminal={() => {
            setSelectedProject(null);
            setIsTerminalOpen(true);
          }}
        />

        {/* B. VS-Code Style FSD Architecture Code Explorer */}
        <TerminalModal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />

        {/* C. Printable Resume Format (Visible only on print/PDF generation) */}
        <PrintResume />

      </div>
    </ThemeProvider>
  );
};

export default App;
