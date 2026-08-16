export interface StatItem {
  label: string;
  value: string;
}

export interface PersonalBio {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  avatarUrl: string;
  status: string;
  shortBio: string;
  fullBio: string[];
  stats: StatItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyFullName: string;
  location: string;
  period: string;
  duration: string;
  type: 'work' | 'bootcamp';
  summary: string;
  accomplishments: string[];
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  architectureHighlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string[];
  techStack: string[];
  demoType: 'kilid-auth' | 'dama-analytics';
  highlights: string[];
  architectureDetails: {
    pattern: string;
    structure: string[];
    security: string[];
    performance: string[];
  };
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  experience: string;
  highlight?: boolean;
  tags: string[];
  iconName?: string;
  category: 'core' | 'frameworks' | 'tools' | 'architecture';
}

export interface SkillCategory {
  id: 'all' | 'core' | 'frameworks' | 'tools' | 'architecture';
  name: string;
  description: string;
  count: number;
}

export interface CodeSnippet {
  id: string;
  title: string;
  filename: string;
  language: string;
  description: string;
  code: string;
}

export interface InteractiveExtra {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  actionText: string;
  actionType: 'terminal' | 'pdf' | 'theme' | 'contact';
}
