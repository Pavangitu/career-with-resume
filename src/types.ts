export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
  gpa: string;
}

export interface Project {
  id: string;
  title: string;
  techStack: string;
  link: string;
  bullets: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  languages: string[];
  certifications: string[];
}

export interface ATSCheckResult {
  score: number;
  keywordsFound: string[];
  keywordsMissing: string[];
  improvementSuggestions: string[];
  matchingSummary: string;
}

export interface OptimizedBulletResult {
  optimizedBullet: string;
  keyImpact: string;
  dynamicMetrics: string[];
}

export interface CoverLetterResult {
  subjectLine: string;
  salutation: string;
  bodyParagraphs: string[];
  signOff: string;
}
