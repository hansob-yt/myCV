import React, { useState, useEffect } from 'react';
import type { ProjectItem } from '../../../entities/project';
import type { ExperienceItem } from '../../../entities/experience';

// Widgets
import { Navbar } from '../../../widgets/navbar';
import { Hero } from '../../../widgets/hero';
import { ExperienceTimeline } from '../../../widgets/experience-timeline';
import { ProjectsGrid } from '../../../widgets/projects-grid';
import { SkillsSection } from '../../../widgets/skills-toolkit';
import { InteractiveExtras } from '../../../widgets/interactive-extras';
import { ContactSection } from '../../../widgets/contact-section';
import { TerminalModal } from '../../../widgets/fsd-code-explorer';
import { BioModal } from '../../../widgets/bio-modal';
import { ExperienceModal } from '../../../widgets/experience-modal';
import { ProjectModal } from '../../../widgets/project-modal';
import { PrintResume } from '../../../widgets/print-resume';

// Features & Shared Canvas
import { InteractiveScrollControls } from '../../../features/scroll-nav-dock';
import { InteractiveBackground } from '../../../shared/canvas';

export const CvPage: React.FC = () => {
  // Modal states
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('bio');

  // Intersection Observer to track active section for navbar highlight
  useEffect(() => {
    const sectionIds = ['bio', 'experience', 'projects', 'skills', 'extras', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrintResume = () => {
    window.print();
  };

  const handleScrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-500">
      
      {/* Interactive Smooth Parallax Particles Canvas */}
      <InteractiveBackground />

      {/* Scroll Progress & Quick Jump Floating Dock */}
      <InteractiveScrollControls 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Top Glassmorphic Navigation Bar */}
      <Navbar 
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onPrintResume={handlePrintResume}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main className="relative z-10 no-print">
        {/* Section 1: Hero & Profile Overview */}
        <Hero 
          onOpenBio={() => setIsBioModalOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onPrintResume={handlePrintResume}
        />

        {/* Section 2: Experience & Traineeship Timeline */}
        <ExperienceTimeline 
          onOpenExperienceModal={(exp) => setSelectedExperience(exp)}
        />

        {/* Section 3: Enterprise Projects Grid */}
        <ProjectsGrid 
          onOpenProjectModal={(proj) => setSelectedProject(proj)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Section 4: Skills & Architecture Toolkit */}
        <SkillsSection />

        {/* Section 5: Interactive Extras & Tools */}
        <InteractiveExtras 
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onPrintResume={handlePrintResume}
          onScrollToContact={handleScrollToContact}
        />

        {/* Section 6: Contact & Direct Message */}
        <ContactSection />
      </main>

      {/* Detail Modals (Orchestrated by Page View) */}
      <BioModal 
        isOpen={isBioModalOpen} 
        onClose={() => setIsBioModalOpen(false)} 
      />

      <ExperienceModal 
        experience={selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)}
        onOpenTerminal={() => {
          setSelectedProject(null);
          setIsTerminalOpen(true);
        }}
      />

      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      {/* Print-Only Document */}
      <PrintResume />

    </div>
  );
};
