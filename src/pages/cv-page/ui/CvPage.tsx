import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { projects, type ProjectItem } from '../../../entities/project';
import { experiences, type ExperienceItem } from '../../../entities/experience';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, expId } = useParams<{ projectId?: string; expId?: string }>();

  const [activeSection, setActiveSection] = useState('bio');

  // Derive active modals from current React Router URL path & params
  const isBioModalOpen = location.pathname === '/bio';
  const isTerminalOpen = location.pathname === '/terminal' || location.pathname === '/fsd-explorer';

  const selectedProject = useMemo<ProjectItem | null>(() => {
    if (projectId) {
      return projects.find((p) => p.id === projectId) || null;
    }
    return null;
  }, [projectId]);

  const selectedExperience = useMemo<ExperienceItem | null>(() => {
    if (expId) {
      return experiences.find((e) => e.id === expId) || null;
    }
    return null;
  }, [expId]);

  // Modal navigation handlers (syncing URL with React Router)
  const handleOpenBio = () => navigate('/bio');
  const handleOpenTerminal = () => navigate('/terminal');
  const handleOpenProject = (proj: ProjectItem) => navigate(`/projects/${proj.id}`);
  const handleOpenExperience = (exp: ExperienceItem) => navigate(`/experience/${exp.id}`);
  const handleCloseModal = () => navigate('/');

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
        onOpenTerminal={handleOpenTerminal}
        onPrintResume={handlePrintResume}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main className="relative z-10 no-print">
        {/* Section 1: Hero & Profile Overview */}
        <Hero 
          onOpenBio={handleOpenBio}
          onOpenTerminal={handleOpenTerminal}
          onPrintResume={handlePrintResume}
        />

        {/* Section 2: Experience & Traineeship Timeline */}
        <ExperienceTimeline 
          onOpenExperienceModal={handleOpenExperience}
        />

        {/* Section 3: Enterprise Projects Grid */}
        <ProjectsGrid 
          onOpenProjectModal={handleOpenProject}
          onOpenTerminal={handleOpenTerminal}
        />

        {/* Section 4: Skills & Architecture Toolkit */}
        <SkillsSection />

        {/* Section 5: Interactive Extras & Tools */}
        <InteractiveExtras 
          onOpenTerminal={handleOpenTerminal}
          onPrintResume={handlePrintResume}
          onScrollToContact={handleScrollToContact}
        />

        {/* Section 6: Contact & Direct Message */}
        <ContactSection />
      </main>

      {/* Detail Modals (URL-driven via React Router) */}
      <BioModal 
        isOpen={isBioModalOpen} 
        onClose={handleCloseModal} 
      />

      <ExperienceModal 
        experience={selectedExperience} 
        onClose={handleCloseModal} 
      />

      <ProjectModal 
        project={selectedProject} 
        onClose={handleCloseModal}
        onOpenTerminal={() => navigate('/terminal')}
      />

      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={handleCloseModal} 
      />

      {/* Print-Only Document */}
      <PrintResume />

    </div>
  );
};
