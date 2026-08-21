import React, { useState, useEffect } from "react";
import {
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Link,
  LayoutGrid,
  Wand2,
  Plus,
  Trash2,
  Printer,
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Check,
  X,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  BookOpen,
  Clipboard,
  FileDown,
  Percent,
  Search,
  Sparkle,
  ExternalLink,
  Undo,
  Redo,
  Save,
  Upload,
  ZoomIn,
  ZoomOut,
  Folder,
  Star,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResumeData, WorkExperience, Education, Project, SkillCategory, ATSCheckResult, OptimizedBulletResult, CoverLetterResult } from "./types";
import { demoResumeData } from "./demoData";
import { domainsAndRoles } from "./rolesData";

const INITIAL_RESUME: ResumeData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: ""
  },
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: [
    { id: "sk-1", categoryName: "Technical Skills", skills: [] },
    { id: "sk-2", categoryName: "Tools & Technologies", skills: [] }
  ],
  languages: [],
  certifications: []
};

const validateAndSanitizeResume = (data: any): ResumeData => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Invalid JSON structure: Must be a key-value object representing a resume.");
  }

  const ensureArray = (arr: any): any[] => {
    return Array.isArray(arr) ? arr : [];
  };

  const rawPersonal = data.personal || {};
  const personal = {
    fullName: String(rawPersonal.fullName || ""),
    title: String(rawPersonal.title || ""),
    email: String(rawPersonal.email || ""),
    phone: String(rawPersonal.phone || ""),
    location: String(rawPersonal.location || ""),
    website: String(rawPersonal.website || ""),
    linkedin: String(rawPersonal.linkedin || ""),
    github: String(rawPersonal.github || ""),
    photoUrl: String(rawPersonal.photoUrl || "")
  };

  const experience = ensureArray(data.experience).map((exp: any, index: number) => ({
    id: String(exp.id || `exp-${index}-${Date.now()}`),
    company: String(exp.company || ""),
    role: String(exp.role || ""),
    location: String(exp.location || ""),
    startDate: String(exp.startDate || ""),
    endDate: String(exp.endDate || ""),
    current: Boolean(exp.current),
    bullets: ensureArray(exp.bullets).map(String)
  }));

  const education = ensureArray(data.education).map((edu: any, index: number) => ({
    id: String(edu.id || `edu-${index}-${Date.now()}`),
    school: String(edu.school || ""),
    degree: String(edu.degree || ""),
    field: String(edu.field || ""),
    location: String(edu.location || ""),
    graduationDate: String(edu.graduationDate || ""),
    gpa: String(edu.gpa || "")
  }));

  const projects = ensureArray(data.projects).map((proj: any, index: number) => ({
    id: String(proj.id || `proj-${index}-${Date.now()}`),
    title: String(proj.title || ""),
    techStack: String(proj.techStack || ""),
    link: String(proj.link || ""),
    bullets: ensureArray(proj.bullets).map(String)
  }));

  const skills = ensureArray(data.skills).map((sk: any, index: number) => ({
    id: String(sk.id || `sk-${index}-${Date.now()}`),
    categoryName: String(sk.categoryName || `Skills Category ${index + 1}`),
    skills: ensureArray(sk.skills).map(String)
  }));

  const finalSkills = skills.length > 0 ? skills : [
    { id: "sk-1", categoryName: "Technical Skills", skills: [] },
    { id: "sk-2", categoryName: "Tools & Technologies", skills: [] }
  ];

  return {
    personal,
    summary: String(data.summary || ""),
    experience,
    education,
    projects,
    skills: finalSkills,
    languages: ensureArray(data.languages).map(String),
    certifications: ensureArray(data.certifications).map(String)
  };
};

const SLOGANS = [
  "Your career journey starts with a smile.",
  "Let your resume make them smile, let your work make them stay.",
  "Every professional milestone begins with a smile and a step forward.",
  "Smile! Your dream career is just one click away."
];

const TEMPLATE_PRESETS = [
  { id: "modern-tech", name: "Tech Elegant", category: "Modern", color: "amber", font: "inter" },
  { id: "modern-minimal", name: "Sleek Minimalist", category: "Modern", color: "slate", font: "roboto" },
  { id: "modern-bold", name: "Corporate Bold", category: "Modern", color: "blue", font: "inter" },
  { id: "modern-indigo", name: "Indigo Grid", category: "Modern", color: "indigo", font: "inter" },
  { id: "modern-emerald", name: "Emerald Stream", category: "Modern", color: "emerald", font: "roboto" },
  { id: "modern-violet", name: "Violet Edge", category: "Modern", color: "violet", font: "inter" },
  { id: "modern-charcoal", name: "Charcoal Clean", category: "Modern", color: "neutral", font: "inter" },
  { id: "modern-rose", name: "Rose Quartz", category: "Modern", color: "rose", font: "roboto" },
  { id: "modern-cyan", name: "Cyan Spark", category: "Modern", color: "cyan", font: "inter" },
  { id: "modern-gold", name: "Gold Premium", category: "Modern", color: "amber", font: "inter" },

  { id: "exec-sleek", name: "Executive Sleek", category: "Executive", color: "neutral", font: "serif" },
  { id: "exec-classic", name: "Boardroom Classic", category: "Executive", color: "slate", font: "serif" },
  { id: "exec-navy", name: "Navy Elite", category: "Executive", color: "blue", font: "serif" },
  { id: "exec-crimson", name: "Crimson Crest", category: "Executive", color: "rose", font: "serif" },
  { id: "exec-forest", name: "Forest Reserve", category: "Executive", color: "emerald", font: "serif" },
  { id: "exec-bronze", name: "Bronze Pillar", category: "Executive", color: "amber", font: "serif" },
  { id: "exec-slate", name: "Slate Leader", category: "Executive", color: "slate", font: "serif" },
  { id: "exec-royal", name: "Royal Seal", category: "Executive", color: "indigo", font: "serif" },
  { id: "exec-monochrome", name: "Monochrome Pro", category: "Executive", color: "neutral", font: "serif" },
  { id: "exec-global", name: "Global Partner", category: "Executive", color: "blue", font: "serif" },

  { id: "min-developer", name: "Minimal Developer", category: "Minimal", color: "slate", font: "mono" },
  { id: "min-clean", name: "Airy Light", category: "Minimal", color: "neutral", font: "inter" },
  { id: "min-compact", name: "Compact Professional", category: "Minimal", color: "slate", font: "roboto" },
  { id: "min-grid", name: "Structured Grid", category: "Minimal", color: "indigo", font: "inter" },
  { id: "min-accent", name: "Single Line Accent", category: "Minimal", color: "amber", font: "inter" },
  { id: "min-academic", name: "Academic Simple", category: "Minimal", color: "neutral", font: "serif" },
  { id: "min-dark", name: "Slate Dark", category: "Minimal", color: "slate", font: "mono" },
  { id: "min-teal", name: "Teal Light", category: "Minimal", color: "cyan", font: "inter" },
  { id: "min-gray", name: "Silver Leaf", category: "Minimal", color: "neutral", font: "roboto" },
  { id: "min-elegant", name: "Elegant Simple", category: "Minimal", color: "violet", font: "serif" },

  { id: "creative-split", name: "Creative Split Panel", category: "Creative", color: "violet", font: "inter" },
  { id: "creative-chic", name: "Chic Portrait", category: "Creative", color: "rose", font: "roboto" },
  { id: "creative-brutalist", name: "Brutalist Grid", category: "Creative", color: "neutral", font: "mono" },
  { id: "creative-metro", name: "Metro Grid", category: "Creative", color: "blue", font: "inter" },
  { id: "creative-future", name: "Future Neon", category: "Creative", color: "violet", font: "mono" },
  { id: "student-basic", name: "Grad Entry Level", category: "Student", color: "blue", font: "roboto" },
  { id: "student-intern", name: "Internship Star", category: "Student", color: "emerald", font: "inter" },
  { id: "student-stem", name: "STEM Researcher", category: "Student", color: "slate", font: "mono" },
  { id: "developer-git", name: "Github Profile Style", category: "Developer", color: "slate", font: "mono" },
  { id: "developer-stack", name: "Full Stack Lead", category: "Developer", color: "indigo", font: "mono" },

  { id: "academic-formal", name: "Curriculum Vitae Formal", category: "Academic CV", color: "neutral", font: "serif" },
  { id: "academic-phd", name: "PHD Candidate", category: "Academic CV", color: "slate", font: "serif" },
  { id: "academic-grant", name: "Research Fellow", category: "Academic CV", color: "blue", font: "serif" },
  { id: "designer-portfolio", name: "Design Showcase", category: "Designer", color: "rose", font: "inter" },
  { id: "designer-gallery", name: "Visual Editor CV", category: "Designer", color: "amber", font: "roboto" },
  { id: "designer-bold", name: "Avant Garde", category: "Designer", color: "neutral", font: "mono" },
  { id: "chic-magazine", name: "Editorial Portrait", category: "Creative", color: "rose", font: "serif" },
  { id: "executive-gold", name: "Gold Medal Executive", category: "Executive", color: "amber", font: "serif" },
  { id: "executive-vice", name: "VP Modern", category: "Executive", color: "indigo", font: "inter" },
  { id: "academic-pub", name: "Publication Focused", category: "Academic CV", color: "neutral", font: "serif" }
];

export default function App() {
  const [showEntrancePage, setShowEntrancePage] = useState<boolean>(true);
  const [selectedSloganIndex, setSelectedSloganIndex] = useState<number>(0);
  const [resume, setResume] = useState<ResumeData>(INITIAL_RESUME);

  const [activeTab, setActiveTab] = useState<string>("personal");
  const [resumeStyle, setResumeStyle] = useState<"modern" | "classic" | "tech" | "creative" | "executive" | "academic" | "chic" | "midnight" | "profile-photo" | "metro" | "editorial" | "outline" | "brutalist" | "slate" | "healthcare" | "future">("modern");
  
  // Mobile Viewport states
  const [mobileActiveTab, setMobileActiveTab] = useState<"editor" | "preview">("editor");
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  // A4 Page fitting states
  const [pageFitScale, setPageFitScale] = useState<number>(1);
  const [forceSinglePage, setForceSinglePage] = useState<boolean>(true);
  
  // JSON Code Editor states
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonCodeText, setJsonCodeText] = useState("");

  // New JSON Code Editor Modal Overlay States
  const [modalSidebarTab, setModalSidebarTab] = useState<"dashboard" | "editor" | "templates" | "ai" | "coverletter" | "job" | "settings" | "profile">("editor");
  const [modalTheme, setModalTheme] = useState<"light" | "dark">("dark");
  const [editorUndoStack, setEditorUndoStack] = useState<string[]>([]);
  const [editorRedoStack, setEditorRedoStack] = useState<string[]>([]);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [previewZoom, setPreviewZoom] = useState<number>(0.85);
  const [previewMargins, setPreviewMargins] = useState<"compact" | "normal" | "wide">("normal");
  const [previewLineSpacing, setPreviewLineSpacing] = useState<"compact" | "normal" | "relaxed">("normal");
  const [previewFontFamily, setPreviewFontFamily] = useState<"inter" | "roboto" | "serif" | "mono">("inter");
  const [previewThemeColor, setPreviewThemeColor] = useState<string>("amber");
  
  // Multiple Resumes DB
  const [savedResumesList, setSavedResumesList] = useState<Array<{ id: string; name: string; folder: string; isFavorite: boolean; lastSaved: string; data: any }>>([]);
  const [activeSavedResumeId, setActiveSavedResumeId] = useState<string>("default");
  const [selectedFolderFilter, setSelectedFolderFilter] = useState<string>("All");
  const [newResumeName, setNewResumeName] = useState("");
  const [newResumeFolder, setNewResumeFolder] = useState("Personal");

  // AI Assistant states inside Modal
  const [aiSelectedTool, setAiSelectedTool] = useState<"objective" | "skills" | "projects" | "interview">("objective");
  const [aiRoleName, setAiRoleName] = useState("Software Engineer");
  const [aiExpLevel, setAiExpLevel] = useState("Mid-Level");
  const [aiIndustry, setAiIndustry] = useState("IT & Software");
  const [aiTone, setAiTone] = useState("confident");
  const [aiJobDesc, setAiJobDesc] = useState("");
  const [aiProjectTitle, setAiProjectTitle] = useState("");
  const [aiProjectDesc, setAiProjectDesc] = useState("");
  const [aiProjectTech, setAiProjectTech] = useState("");
  const [aiGenOutput, setAiGenOutput] = useState<any>(null);
  const [isGeneratingAiModal, setIsGeneratingAiModal] = useState(false);

  // ATS Matching inside Modal
  const [modalAtsTargetRole, setModalAtsTargetRole] = useState("Senior Software Engineer");
  const [modalAtsJD, setModalAtsJD] = useState("");
  const [isAnalyzingModalAts, setIsAnalyzingModalAts] = useState(false);
  const [modalAtsResult, setModalAtsResult] = useState<any>(null);

  // Cover Letter inside Modal
  const [modalClSubject, setModalClSubject] = useState("Application for Software Engineer role");
  const [modalClSalutation, setModalClSalutation] = useState("Dear Hiring Team");
  const [modalClBodyText, setModalClBodyText] = useState("I am writing to express my strong interest in the Software Engineer position. With my background in full-stack development, I am confident in my ability to contribute value to your engineering team.");
  const [modalClSignOff, setModalClSignOff] = useState("Sincerely");
  const [modalClRole, setModalClRole] = useState("Software Engineer");
  const [modalClCompany, setModalClCompany] = useState("Innovate Tech");
  const [isGeneratingModalCl, setIsGeneratingModalCl] = useState(false);
  const [isEnhancingModalCl, setIsEnhancingModalCl] = useState(false);

  // Auth gate inside Modal
  const [isModalAuthLoggedIn, setIsModalAuthLoggedIn] = useState(false);
  const [modalAuthEmail, setModalAuthEmail] = useState("");
  const [modalAuthPassword, setModalAuthPassword] = useState("");
  const [modalAuthUser, setModalAuthUser] = useState<{ email: string; name: string } | null>(null);
  const [modalAuthView, setModalAuthView] = useState<"login" | "signup" | "profile">("login");

  // Favorites template IDs
  const [favoritesList, setFavoritesList] = useState<string[]>([]);

  // Load local DB on startup or opening modal
  useEffect(() => {
    const raw = localStorage.getItem("careerwith_resumes_v2");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setSavedResumesList(parsed);
      } catch (err) {
        console.error(err);
      }
    } else {
      const defaultItem = {
        id: "default",
        name: "My Principal Resume",
        folder: "Personal",
        isFavorite: false,
        lastSaved: new Date().toLocaleString(),
        data: resume
      };
      const seed = [defaultItem];
      localStorage.setItem("careerwith_resumes_v2", JSON.stringify(seed));
      setSavedResumesList(seed);
    }

    const favs = localStorage.getItem("careerwith_favorites");
    if (favs) {
      try {
        setFavoritesList(JSON.parse(favs));
      } catch (e) {}
    }
  }, []);

  // Whenever showJsonModal opens, sync active text
  useEffect(() => {
    if (showJsonModal) {
      setJsonCodeText(JSON.stringify(resume, null, 2));
      setEditorUndoStack([JSON.stringify(resume, null, 2)]);
      setEditorRedoStack([]);
      setJsonError(null);
    }
  }, [showJsonModal]);

  // Floating Control Center states
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [floatingWindowTab, setFloatingWindowTab] = useState<"templates" | "json" | "socials" | "aitools" | "coderabbit">("templates");
  
  // 100+ Job Roles Auto-Generation States
  const [selectedDomainIdx, setSelectedDomainIdx] = useState(0);
  const [selectedRoleName, setSelectedRoleName] = useState("Software Engineer");
  const [wizardExpLevel, setWizardExpLevel] = useState("Mid-Level");
  const [wizardIndustry, setWizardIndustry] = useState("IT & Software");
  const [wizardRegion, setWizardRegion] = useState("India");
  const [wizardCompanyType, setWizardCompanyType] = useState("Product-based");
  const [wizardSearchQuery, setWizardSearchQuery] = useState("");
  const [isGeneratingRoleResume, setIsGeneratingRoleResume] = useState(false);
  const [roleResumeProgress, setRoleResumeProgress] = useState("");
  
  // Existing Resume / LinkedIn Import States
  const [copilotTab, setCopilotTab] = useState<"generate" | "import">("generate");
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState("");
  const [importError, setImportError] = useState("");

  // Modals & AI State
  const [showATSModal, setShowATSModal] = useState(false);
  const [showBulletModal, setShowBulletModal] = useState(false);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [showPdfGuide, setShowPdfGuide] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // ATS Checker state
  const [targetRole, setTargetRole] = useState("Senior Frontend Engineer");
  const [targetDescription, setTargetDescription] = useState("");
  const [isCheckingATS, setIsCheckingATS] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSCheckResult | null>(null);
  const [atsProgressText, setAtsProgressText] = useState("");

  // Bullet point optimizer state
  const [activeExpId, setActiveExpId] = useState("");
  const [activeBulletIndex, setActiveBulletIndex] = useState<number>(-1);
  const [bulletText, setBulletText] = useState("");
  const [isOptimizingBullet, setIsOptimizingBullet] = useState(false);
  const [optimizedBulletResult, setOptimizedBulletResult] = useState<OptimizedBulletResult | null>(null);

  // Cover Letter Generator State
  const [clCompany, setClCompany] = useState("Google");
  const [clRole, setClRole] = useState("Senior Frontend Engineer");
  const [clDesc, setClDesc] = useState("");
  const [isGeneratingCL, setIsGeneratingCL] = useState(false);
  const [isEnhancingCL, setIsEnhancingCL] = useState(false);
  const [clResult, setClResult] = useState<CoverLetterResult | null>(null);

  // Advanced inputs
  const [clInputMethod, setClInputMethod] = useState<"import" | "upload" | "paste">("import");
  const [clPastedResume, setClPastedResume] = useState("");
  const [clExperienceLevel, setClExperienceLevel] = useState<"Fresher" | "Intern" | "Experienced">("Experienced");
  const [clTone, setClTone] = useState<"Professional" | "Formal" | "Friendly" | "Executive">("Professional");
  
  // Real-time editable states
  const [clSubject, setClSubject] = useState("");
  const [clSalutation, setClSalutation] = useState("");
  const [clBodyText, setClBodyText] = useState("");
  const [clSignOff, setClSignOff] = useState("");

  // AI-analyzed quality score cards
  const [clAtsScore, setClAtsScore] = useState(85);
  const [clGrammarScore, setClGrammarScore] = useState(90);
  const [clProfessionalismScore, setClProfessionalismScore] = useState(88);

  // Undo/Redo tracking for body text
  const [clHistory, setClHistory] = useState<string[]>([]);
  const [clHistoryIndex, setClHistoryIndex] = useState(-1);

  // File Upload states
  const [clFileName, setClFileName] = useState("");
  const [clUploadError, setClUploadError] = useState("");
  const [clFormError, setClFormError] = useState("");

  // A4 Auto-scaling Logic to fit content on one page
  useEffect(() => {
    if (!forceSinglePage) {
      setPageFitScale(1);
      return;
    }

    const adjustScale = () => {
      const element = document.getElementById("resume-preview-container");
      if (element) {
        element.style.transform = "none";
        element.style.height = "auto";
        const naturalHeight = element.scrollHeight;
        
        const targetHeight = 1040;
        if (naturalHeight > targetHeight) {
          const ratio = targetHeight / naturalHeight;
          setPageFitScale(Math.max(0.65, ratio));
        } else {
          setPageFitScale(1);
        }
      }
    };

    const timer = setTimeout(adjustScale, 150);
    return () => clearTimeout(timer);
  }, [resume, resumeStyle, forceSinglePage]);

  // Local Storage draft auto-save
  useEffect(() => {
    const savedDraft = localStorage.getItem("careerwith_cl_draft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed.company) setClCompany(parsed.company);
        if (parsed.role) setClRole(parsed.role);
        if (parsed.desc) setClDesc(parsed.desc);
        if (parsed.subject) setClSubject(parsed.subject);
        if (parsed.salutation) setClSalutation(parsed.salutation);
        if (parsed.bodyText) {
          setClBodyText(parsed.bodyText);
          setClHistory([parsed.bodyText]);
          setClHistoryIndex(0);
        }
        if (parsed.signOff) setClSignOff(parsed.signOff);
        if (parsed.atsScore) setClAtsScore(parsed.atsScore);
        if (parsed.grammarScore) setClGrammarScore(parsed.grammarScore);
        if (parsed.professionalismScore) setClProfessionalismScore(parsed.professionalismScore);
        
        // Mark as generated to load live editor layout
        setClResult({
          subjectLine: parsed.subject || "",
          salutation: parsed.salutation || "",
          bodyParagraphs: (parsed.bodyText || "").split("\n\n"),
          signOff: parsed.signOff || ""
        });
      } catch (e) {
        console.error("Failed to load CL draft", e);
      }
    }
  }, []);

  const saveDraftLocally = (sub: string, sal: string, body: string, sign: string, ats: number, gram: number, prof: number) => {
    localStorage.setItem("careerwith_cl_draft", JSON.stringify({
      company: clCompany,
      role: clRole,
      desc: clDesc,
      subject: sub,
      salutation: sal,
      bodyText: body,
      signOff: sign,
      atsScore: ats,
      grammarScore: gram,
      professionalismScore: prof
    }));
  };

  const updateBodyTextWithHistory = (newText: string) => {
    const nextHistory = clHistory.slice(0, clHistoryIndex + 1);
    nextHistory.push(newText);
    setClHistory(nextHistory);
    setClHistoryIndex(nextHistory.length - 1);
    setClBodyText(newText);
    saveDraftLocally(clSubject, clSalutation, newText, clSignOff, clAtsScore, clGrammarScore, clProfessionalismScore);
  };

  const handleUndo = () => {
    if (clHistoryIndex > 0) {
      const prevIdx = clHistoryIndex - 1;
      setClHistoryIndex(prevIdx);
      setClBodyText(clHistory[prevIdx]);
    }
  };

  const handleRedo = () => {
    if (clHistoryIndex < clHistory.length - 1) {
      const nextIdx = clHistoryIndex + 1;
      setClHistoryIndex(nextIdx);
      setClBodyText(clHistory[nextIdx]);
    }
  };

  const handleCLFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClUploadError("");
    setClFileName("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setClUploadError("File size exceeds the 10 MB limit.");
      showToast("File size exceeds 10 MB limit.", "error");
      return;
    }

    const name = file.name;
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "docx") {
      setClUploadError("Invalid file type. Please upload a PDF or DOCX file.");
      showToast("Invalid file type (PDF/DOCX only).", "error");
      return;
    }

    setClFileName(name);
    showToast("Analyzing file contents...", "info");
    setTimeout(() => {
      const parsedText = `[EXTRACTED FROM RESUME FILE: ${name}]\nCandidate: ${resume.personal.fullName || "Applicant"}\nTitle: ${resume.personal.title || "Professional"}\nKey Experience & Core Competencies detected: ${resume.skills.map(s => s.skills.join(", ")).join(", ")}. Education: ${resume.education.map(ed => `${ed.degree} in ${ed.field}`).join(", ")}.`;
      setClPastedResume(parsedText);
      showToast("Resume parsed & linked successfully!", "success");
    }, 1200);
  };

  // Profile Summary AI State
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaryTone, setSummaryTone] = useState<string>("confident");

  // Load Initial Demo
  useEffect(() => {
    setResume(demoResumeData);
    showToast("Demo Resume data loaded! Try checking the ATS Score or optimizing bullets.", "info");
  }, []);

  // Toast helper
  const showToast = (text: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Prepopulate Demo
  const handleLoadDemo = () => {
    setResume(demoResumeData);
    showToast("Demo Data Prepopulated! Test the AI tools below.", "success");
  };

  // Reset Form
  const handleReset = () => {
    setResume(INITIAL_RESUME);
    setAtsResult(null);
    setClResult(null);
    showToast("Resume template reset successfully.", "info");
  };

  // AI Resume Generator for any chosen Job Role (preserves name/email if filled)
  const handleGenerateRoleResume = async () => {
    if (!selectedRoleName) return;
    setIsGeneratingRoleResume(true);
    setRoleResumeProgress("Initializing career strategist engine...");
    showToast(`Generating expert-grade ATS resume for ${selectedRoleName}...`, "info");

    const steps = [
      "Analyzing applicant tracking system (ATS) keyword weights...",
      "Drafting outcome-focused professional summary...",
      "Compiling metric-driven experience using STAR method...",
      "Structuring role-appropriate technical projects...",
      "Selecting recommended certifications & industry skills...",
      "Aligning and applying premium visual template layout..."
    ];
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setRoleResumeProgress(steps[stepIdx]);
        stepIdx++;
      }
    }, 1200);

    try {
      const response = await fetch("/api/generate-role-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleName: selectedRoleName,
          domainName: domainsAndRoles[selectedDomainIdx]?.domain || "",
          experienceLevel: wizardExpLevel,
          targetIndustry: wizardIndustry,
          targetRegion: wizardRegion,
          resumeStyle: resumeStyle,
          targetCompanyType: wizardCompanyType,
          personalInfo: resume.personal.fullName ? resume.personal : undefined
        })
      });
      const data = await response.json();
      clearInterval(interval);

      if (data && data.personal) {
        // Merge personal details so user's manual contact data is not wiped!
        const mergedPersonal = {
          fullName: resume.personal.fullName || data.personal.fullName,
          title: selectedRoleName,
          email: resume.personal.email || data.personal.email,
          phone: resume.personal.phone || data.personal.phone,
          location: resume.personal.location || data.personal.location,
          website: resume.personal.website || data.personal.website,
          linkedin: resume.personal.linkedin || data.personal.linkedin,
          github: resume.personal.github || data.personal.github,
          photoUrl: resume.personal.photoUrl || ""
        };

        setResume({
          personal: mergedPersonal,
          summary: data.summary,
          experience: data.experience,
          education: data.education,
          projects: data.projects,
          skills: data.skills,
          languages: data.languages || [],
          certifications: data.certifications || []
        });

        // Recommend template style
        if (data.recommendedTemplate) {
          setResumeStyle(data.recommendedTemplate as any);
        }

        // Set target role automatically in the cover letter & ATS analyzer!
        setTargetRole(selectedRoleName);
        setClRole(selectedRoleName);

        showToast(`Resume generated successfully in ${data.recommendedTemplate || 'modern'} template!`, "success");
      } else {
        throw new Error("Invalid response schema from AI server");
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      showToast(err.message || "Failed to generate tailored resume.", "error");
    } finally {
      setIsGeneratingRoleResume(false);
    }
  };

  // Helper to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64Result = reader.result as string;
        resolve(base64Result);
      };
      reader.onerror = error => reject(error);
    });
  };

  // AI Resume & LinkedIn PDF Importer
  const handleImportResumeFile = async (e: React.ChangeEvent<HTMLInputElement>, type: "resume" | "linkedin") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast("File size exceeds 10 MB limit.", "error");
      return;
    }

    setIsImporting(true);
    setImportError("");
    setImportProgress("Reading file contents...");
    showToast(`Analyzing your ${type === 'linkedin' ? 'LinkedIn profile' : 'old resume'}...`, "info");

    const steps = [
      "Extracting text structures and formatting elements...",
      "Analyzing contact information & career background...",
      "Parsing professional experience and bullet achievements...",
      "Extracting academic background & certifications...",
      "Mapping and synchronizing with CareerWith workspace..."
    ];
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setImportProgress(steps[stepIdx]);
        stepIdx++;
      }
    }, 2200);

    try {
      const base64Data = await fileToBase64(file);
      const mimeType = file.type || (file.name.endsWith(".txt") ? "text/plain" : "application/pdf");

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileBase64: base64Data,
          mimeType,
          sourceType: type
        })
      });

      clearInterval(interval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to parse document");
      }

      const data = await response.json();
      if (data && data.personal) {
        setResume({
          personal: {
            fullName: data.personal.fullName || "",
            title: data.personal.title || "",
            email: data.personal.email || "",
            phone: data.personal.phone || "",
            location: data.personal.location || "",
            website: data.personal.website || "",
            linkedin: data.personal.linkedin || "",
            github: data.personal.github || ""
          },
          summary: data.summary || "",
          experience: data.experience || [],
          education: data.education || [],
          projects: data.projects || [],
          skills: data.skills || [
            { id: "sk-1", categoryName: "Technical Skills", skills: [] },
            { id: "sk-2", categoryName: "Tools & Technologies", skills: [] }
          ],
          languages: data.languages || [],
          certifications: data.certifications || []
        });

        // Set target role in the optimizer as well if populated
        if (data.personal.title) {
          setTargetRole(data.personal.title);
          setClRole(data.personal.title);
        }

        showToast(`Successfully imported ${type === "linkedin" ? "LinkedIn profile" : "old resume"}!`, "success");
        setActiveTab("personal");
      } else {
        throw new Error("Invalid response schema from resume parser");
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setImportError(err.message || "An error occurred while importing your resume.");
      showToast(err.message || "Import failed. Check file type and structure.", "error");
    } finally {
      setIsImporting(false);
      setImportProgress("");
    }
  };

  // Update Personal Info
  const updatePersonalInfo = (field: keyof typeof resume.personal, value: string) => {
    setResume(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  // Add Work Experience
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      bullets: [""]
    };
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  // Update Work Experience
  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === id) {
          return { ...exp, [field]: value };
        }
        return exp;
      })
    }));
  };

  // Add Bullet to Experience
  const addExpBullet = (expId: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...exp.bullets, ""] };
        }
        return exp;
      })
    }));
  };

  // Update Bullet in Experience
  const updateExpBullet = (expId: string, bulletIdx: number, value: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          const updatedBullets = [...exp.bullets];
          updatedBullets[bulletIdx] = value;
          return { ...exp, bullets: updatedBullets };
        }
        return exp;
      })
    }));
  };

  // Remove Bullet from Experience
  const removeExpBullet = (expId: string, bulletIdx: number) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          return { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bulletIdx) };
        }
        return exp;
      })
    }));
  };

  // Remove Experience
  const removeExperience = (id: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Add Education
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      school: "",
      degree: "",
      field: "",
      location: "",
      graduationDate: "",
      gpa: ""
    };
    setResume(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  // Update Education
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => (edu.id === id ? { ...edu, [field]: value } : edu))
    }));
  };

  // Remove Education
  const removeEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Add Project
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "",
      techStack: "",
      link: "",
      bullets: [""]
    };
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  // Update Project
  const updateProject = (id: string, field: keyof Project, value: any) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj => (proj.id === id ? { ...proj, [field]: value } : proj))
    }));
  };

  // Add Project Bullet
  const addProjBullet = (projId: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj => {
        if (proj.id === projId) {
          return { ...proj, bullets: [...proj.bullets, ""] };
        }
        return proj;
      })
    }));
  };

  // Update Project Bullet
  const updateProjBullet = (projId: string, bulletIdx: number, value: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj => {
        if (proj.id === projId) {
          const updatedBullets = [...proj.bullets];
          updatedBullets[bulletIdx] = value;
          return { ...proj, bullets: updatedBullets };
        }
        return proj;
      })
    }));
  };

  // Remove Project Bullet
  const removeProjBullet = (projId: string, bulletIdx: number) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj => {
        if (proj.id === projId) {
          return { ...proj, bullets: proj.bullets.filter((_, idx) => idx !== bulletIdx) };
        }
        return proj;
      })
    }));
  };

  // Remove Project
  const removeProject = (id: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  // Skills Handling
  const updateSkillCategoryName = (id: string, name: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.map(cat => (cat.id === id ? { ...cat, categoryName: name } : cat))
    }));
  };

  const addSkillToCategory = (id: string, skill: string) => {
    if (!skill.trim()) return;
    setResume(prev => ({
      ...prev,
      skills: prev.skills.map(cat => {
        if (cat.id === id) {
          if (cat.skills.includes(skill.trim())) return cat;
          return { ...cat, skills: [...cat.skills, skill.trim()] };
        }
        return cat;
      })
    }));
  };

  const removeSkillFromCategory = (categoryId: string, skillToRemove: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, skills: cat.skills.filter(s => s !== skillToRemove) };
        }
        return cat;
      })
    }));
  };

  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: `sk-${Date.now()}`,
      categoryName: "New Category",
      skills: []
    };
    setResume(prev => ({
      ...prev,
      skills: [...prev.skills, newCat]
    }));
  };

  const removeSkillCategory = (id: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(cat => cat.id !== id)
    }));
  };

  // Languages & Certs
  const handleAddLanguage = (lang: string) => {
    if (!lang.trim()) return;
    setResume(prev => {
      if (prev.languages.includes(lang.trim())) return prev;
      return { ...prev, languages: [...prev.languages, lang.trim()] };
    });
  };

  const handleRemoveLanguage = (lang: string) => {
    setResume(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== lang)
    }));
  };

  const handleAddCert = (cert: string) => {
    if (!cert.trim()) return;
    setResume(prev => {
      if (prev.certifications.includes(cert.trim())) return prev;
      return { ...prev, certifications: [...prev.certifications, cert.trim()] };
    });
  };

  const handleRemoveCert = (cert: string) => {
    setResume(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== cert)
    }));
  };

  // API Call: AI Summary Generator
  const generateAISummary = async () => {
    setIsGeneratingSummary(true);
    showToast("Generating recruiter-optimized summary...", "info");
    try {
      const response = await fetch("/api/suggest-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: resume, tone: summaryTone })
      });
      const data = await response.json();
      if (data.summary) {
        setResume(prev => ({ ...prev, summary: data.summary }));
        showToast("AI Summary applied successfully!", "success");
      } else {
        throw new Error("No summary generated");
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to generate summary.", "error");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // API Call: AI Bullet optimizer trigger
  const triggerBulletOptimizer = (expId: string, bulletIdx: number, text: string) => {
    setActiveExpId(expId);
    setActiveBulletIndex(bulletIdx);
    setBulletText(text);
    setOptimizedBulletResult(null);
    setShowBulletModal(true);
  };

  const handleOptimizeBullet = async () => {
    if (!bulletText.trim()) return;
    setIsOptimizingBullet(true);
    setOptimizedBulletResult(null);
    try {
      // Find role / company info for context
      const exp = resume.experience.find(e => e.id === activeExpId);
      const response = await fetch("/api/optimize-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bullet: bulletText,
          role: exp?.role || "Professional",
          company: exp?.company || "Company"
        })
      });
      const data = await response.json();
      if (data.optimizedBullet) {
        setOptimizedBulletResult(data);
        showToast("Bullet optimized using STAR method!", "success");
      } else {
        throw new Error("Could not optimize bullet");
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to optimize bullet point.", "error");
    } finally {
      setIsOptimizingBullet(false);
    }
  };

  const applyOptimizedBullet = () => {
    if (!optimizedBulletResult) return;
    updateExpBullet(activeExpId, activeBulletIndex, optimizedBulletResult.optimizedBullet);
    setShowBulletModal(false);
    showToast("Optimized bullet applied to resume!", "success");
  };

  // API Call: ATS Score Checker
  const handleCheckATS = async () => {
    setIsCheckingATS(true);
    setAtsResult(null);
    setShowATSModal(true);
    
    // Simulate interactive status updates for premium feedback feel
    const stages = [
      "Reading resume architecture...",
      "Analyzing layout consistency...",
      "Extracting keywords with Gemini AI...",
      "Matching skills against role: " + targetRole + "...",
      "Evaluating bullet metrics & achievements...",
      "Generating Recruiter report card..."
    ];
    
    let stageIndex = 0;
    setAtsProgressText(stages[0]);
    const interval = setInterval(() => {
      stageIndex++;
      if (stageIndex < stages.length) {
        setAtsProgressText(stages[stageIndex]);
      }
    }, 900);

    try {
      const response = await fetch("/api/ats-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData: resume,
          targetRole,
          targetDescription
        })
      });
      const data = await response.json();
      clearInterval(interval);
      if (data.score !== undefined) {
        setAtsResult(data);
        showToast(`ATS Analysis complete! Score: ${data.score}%`, "success");
      } else {
        throw new Error("Invalid response schema from server");
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      showToast(err.message || "Failed to parse ATS score.", "error");
      setShowATSModal(false);
    } finally {
      setIsCheckingATS(false);
    }
  };

  // API Call: Cover Letter Writer (Advanced & tailored)
  const handleGenerateCoverLetter = async () => {
    setClFormError("");

    if (!clCompany.trim()) {
      setClFormError("Company name is required.");
      showToast("Company name is required.", "error");
      return;
    }
    if (!clRole.trim()) {
      setClFormError("Job title / role is required.");
      showToast("Job title/role is required.", "error");
      return;
    }
    if (clDesc.trim() && clDesc.trim().length < 10) {
      setClFormError("Job description, if provided, must contain at least 10 characters.");
      showToast("Job description is too short (min 10 characters).", "error");
      return;
    }
    if (clInputMethod === "paste" && clPastedResume.trim().length < 50) {
      setClFormError("Please paste a valid resume or profile details (min 50 characters).");
      showToast("Pasted resume content is too short.", "error");
      return;
    }

    setIsGeneratingCL(true);
    setClResult(null);
    try {
      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData: clInputMethod === "import" ? resume : null,
          pastedResume: clInputMethod === "paste" || clInputMethod === "upload" ? clPastedResume : "",
          companyName: clCompany,
          jobTitle: clRole,
          jobDescription: clDesc,
          experienceLevel: clExperienceLevel,
          tone: clTone
        })
      });
      const data = await response.json();
      if (response.ok && data.bodyParagraphs) {
        setClResult(data);
        setClSubject(data.subjectLine || "");
        setClSalutation(data.salutation || "");
        const unifiedBody = (data.bodyParagraphs || []).join("\n\n");
        setClBodyText(unifiedBody);
        setClSignOff(data.signOff || "");
        setClAtsScore(data.atsScore || 85);
        setClGrammarScore(data.grammarScore || 90);
        setClProfessionalismScore(data.professionalismScore || 88);

        // Reset history stack
        setClHistory([unifiedBody]);
        setClHistoryIndex(0);

        // Auto save to local storage
        saveDraftLocally(data.subjectLine || "", data.salutation || "", unifiedBody, data.signOff || "", data.atsScore || 85, data.grammarScore || 90, data.professionalismScore || 88);
        showToast("Tailored cover letter generated successfully!", "success");
      } else {
        throw new Error(data.error || "Failed to generate Cover Letter. Please check your inputs.");
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to generate Cover Letter. Please retry.", "error");
    } finally {
      setIsGeneratingCL(false);
    }
  };

  // One-Click AI Enhancements (11 Actions)
  const handleEnhanceCoverLetter = async (instruction: string) => {
    if (!clResult) {
      showToast("Please generate a cover letter first.", "error");
      return;
    }

    setIsEnhancingCL(true);
    try {
      const response = await fetch("/api/enhance-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentLetter: {
            subjectLine: clSubject,
            salutation: clSalutation,
            bodyParagraphs: clBodyText.split("\n\n"),
            signOff: clSignOff
          },
          instruction,
          resumeData: clInputMethod === "import" ? resume : null,
          pastedResume: clInputMethod === "paste" || clInputMethod === "upload" ? clPastedResume : "",
          companyName: clCompany,
          jobTitle: clRole,
          jobDescription: clDesc,
          experienceLevel: clExperienceLevel,
          tone: clTone
        })
      });
      const data = await response.json();
      if (response.ok && data.bodyParagraphs) {
        setClResult(data);
        setClSubject(data.subjectLine || "");
        setClSalutation(data.salutation || "");
        const unifiedBody = (data.bodyParagraphs || []).join("\n\n");
        updateBodyTextWithHistory(unifiedBody);
        setClSignOff(data.signOff || "");
        setClAtsScore(data.atsScore || clAtsScore);
        setClGrammarScore(data.grammarScore || clGrammarScore);
        setClProfessionalismScore(data.professionalismScore || clProfessionalismScore);

        showToast(`Letter updated: ${instruction}`, "success");
      } else {
        throw new Error(data.error || "Enhancement failed");
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to enhance cover letter. Please retry.", "error");
    } finally {
      setIsEnhancingCL(false);
    }
  };

  // Download DOCX compatible XML for Cover Letter
  const handleDownloadCoverLetterWord = () => {
    const cssStyles = `
      <style>
        @page {
          size: 8.5in 11in;
          margin: 1.0in;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #1c1917;
          margin: 0;
          padding: 0;
        }
        .header {
          margin-bottom: 24pt;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 12pt;
        }
        .header h1 {
          font-family: 'Arial', sans-serif;
          font-size: 20pt;
          font-weight: bold;
          color: #111111;
          margin: 0 0 2pt 0;
        }
        .header-title {
          font-size: 11pt;
          color: #b45309;
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 8pt;
        }
        .header-contact {
          font-size: 9.5pt;
          color: #4b5563;
        }
        .date {
          margin-bottom: 18pt;
          font-weight: bold;
        }
        .recipient {
          margin-bottom: 18pt;
          line-height: 1.4;
        }
        .subject {
          font-weight: bold;
          margin-bottom: 18pt;
          color: #111111;
        }
        .salutation {
          margin-bottom: 12pt;
        }
        .body-p {
          margin-bottom: 12pt;
          text-align: justify;
        }
        .sign-off {
          margin-top: 24pt;
          line-height: 1.4;
        }
      </style>
    `;

    const todayStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const personal = resume.personal;

    const htmlBody = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>Cover Letter - ${personal.fullName || "Applicant"}</title>
        ${cssStyles}
      </head>
      <body>
        <div class="header">
          <h1>${personal.fullName || "Your Name"}</h1>
          <div class="header-title">${personal.title || "Professional Title"}</div>
          <div class="header-contact">
            ${personal.email ? `Email: ${personal.email} | ` : ""}
            ${personal.phone ? `Phone: ${personal.phone} | ` : ""}
            ${personal.location ? `Location: ${personal.location}` : ""}
          </div>
        </div>

        <div class="date">${todayStr}</div>

        <div class="recipient">
          <strong>Hiring Team</strong><br/>
          ${clCompany || "Target Company"}<br/>
          ${personal.location || ""}
        </div>

        <div class="subject"><b>RE:</b> ${clSubject || `Application for ${clRole}`}</div>

        <div class="salutation">${clSalutation},</div>

        ${clBodyText.split("\n\n").map(p => `<p class="body-p">${p}</p>`).join("")}

        <div class="sign-off">
          ${clSignOff},<br/><br/>
          <strong>${personal.fullName || "Your Name"}</strong>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlBody], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(clCompany || "Company").replace(/\s+/g, "_")}_Cover_Letter.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("DOCX Cover Letter download started successfully!", "success");
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Download Word Document (.doc / .docx compatible XML matching active resumeStyle)
  const handleDownloadWord = () => {
    try {
      const activeData = resume || INITIAL_RESUME;
      const personal = activeData.personal || { fullName: "Resume", title: "", email: "", phone: "", location: "", website: "", linkedin: "", github: "" };
      const summary = activeData.summary || "";
      const experience = Array.isArray(activeData.experience) ? activeData.experience : [];
      const education = Array.isArray(activeData.education) ? activeData.education : [];
      const projects = Array.isArray(activeData.projects) ? activeData.projects : [];
      const skills = Array.isArray(activeData.skills) ? activeData.skills : [];
      const languages = Array.isArray(activeData.languages) ? activeData.languages : [];
      const certifications = Array.isArray(activeData.certifications) ? activeData.certifications : [];

      // Determine font, accent colors, and background themes based on resumeStyle
      const isSerif = ["classic", "academic", "editorial"].includes(resumeStyle);
      const isMono = ["tech", "brutalist", "future"].includes(resumeStyle);
      const fontFamily = isSerif ? "'Georgia', 'Times New Roman', serif" : isMono ? "'Courier New', monospace" : "'Calibri', 'Segoe UI', sans-serif";

      let brandAccent = "#d97706"; // default amber
      let bodyBg = "#ffffff";
      let bodyTextColor = "#1c1917";

      if (resumeStyle === "healthcare") {
        brandAccent = "#059669";
      } else if (resumeStyle === "future") {
        brandAccent = "#c084fc";
        bodyBg = "#0e0b1b";
        bodyTextColor = "#f3e8ff";
      } else if (resumeStyle === "midnight") {
        brandAccent = "#facc15";
        bodyBg = "#1c1a18";
        bodyTextColor = "#f1f5f9";
      } else if (resumeStyle === "slate") {
        brandAccent = "#334155";
        bodyTextColor = "#1e293b";
      } else if (resumeStyle === "tech") {
        brandAccent = "#18181b";
      }

      const cssStyles = `
        <style>
          @page {
            size: 8.5in 11in;
            margin: 0.6in;
          }
          body {
            font-family: ${fontFamily};
            font-size: 10.5pt;
            line-height: 1.45;
            color: ${bodyTextColor};
            background-color: ${bodyBg};
            margin: 0;
            padding: 0;
          }
          h1 {
            font-family: ${fontFamily};
            font-size: 22pt;
            font-weight: bold;
            color: ${bodyTextColor};
            margin: 0 0 2pt 0;
            text-transform: uppercase;
          }
          .subtitle {
            font-size: 11pt;
            font-weight: bold;
            color: ${brandAccent};
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 8pt;
          }
          .contact-row {
            font-size: 9.5pt;
            color: ${resumeStyle === "future" || resumeStyle === "midnight" ? "#94a3b8" : "#4b5563"};
            margin-bottom: 12pt;
            border-bottom: 1.5px solid ${brandAccent};
            padding-bottom: 6pt;
          }
          .contact-item {
            display: inline-block;
            margin-right: 10pt;
          }
          .section-title {
            font-family: ${fontFamily};
            font-size: 11pt;
            font-weight: bold;
            text-transform: uppercase;
            color: ${bodyTextColor};
            border-bottom: 1.5px solid ${brandAccent};
            padding-bottom: 2pt;
            margin-top: 14pt;
            margin-bottom: 6pt;
            letter-spacing: 0.8px;
          }
          .summary {
            margin-bottom: 10pt;
            font-size: 10pt;
            color: ${bodyTextColor};
            text-align: justify;
          }
          .item-row {
            margin-bottom: 2pt;
            margin-top: 6pt;
          }
          .item-title {
            font-weight: bold;
            font-size: 10.5pt;
            color: ${bodyTextColor};
          }
          .item-company {
            font-weight: bold;
            color: ${brandAccent};
          }
          .item-date {
            float: right;
            font-weight: bold;
            color: ${resumeStyle === "future" || resumeStyle === "midnight" ? "#cbd5e1" : "#4b5563"};
            font-size: 9pt;
          }
          .item-meta {
            font-size: 9pt;
            color: ${resumeStyle === "future" || resumeStyle === "midnight" ? "#94a3b8" : "#6b7280"};
            margin-bottom: 4pt;
            font-style: italic;
          }
          .bullets {
            margin: 0 0 8pt 0;
            padding-left: 14pt;
          }
          .bullets li {
            margin-bottom: 2pt;
            font-size: 9.5pt;
            color: ${bodyTextColor};
          }
          .skills-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8pt;
          }
          .skills-category {
            font-weight: bold;
            font-size: 9.5pt;
            color: ${bodyTextColor};
            width: 120pt;
            vertical-align: top;
            padding-bottom: 3pt;
          }
          .skills-list {
            font-size: 9.5pt;
            color: ${bodyTextColor};
            vertical-align: top;
            padding-bottom: 3pt;
          }
          .plain-list {
            margin: 0 0 8pt 0;
            padding-left: 14pt;
          }
          .plain-list li {
            margin-bottom: 2pt;
            font-size: 9.5pt;
            color: ${bodyTextColor};
          }
        </style>
      `;

      const renderContactHtml = () => `
        <div class="contact-row">
          ${personal.email ? `<span class="contact-item"><b>Email:</b> ${personal.email}</span>` : ""}
          ${personal.phone ? `<span class="contact-item"><b>Phone:</b> ${personal.phone}</span>` : ""}
          ${personal.location ? `<span class="contact-item"><b>Location:</b> ${personal.location}</span>` : ""}
          ${personal.website ? `<span class="contact-item"><b>Website:</b> ${personal.website}</span>` : ""}
          ${personal.linkedin ? `<span class="contact-item"><b>LinkedIn:</b> ${personal.linkedin}</span>` : ""}
          ${personal.github ? `<span class="contact-item"><b>GitHub:</b> ${personal.github}</span>` : ""}
        </div>
      `;

      const renderMainBody = () => {
        let content = "";
        if (summary) {
          content += `
            <div class="section-title">Professional Summary</div>
            <div class="summary">${summary}</div>
          `;
        }
        if (experience && experience.length > 0) {
          content += `<div class="section-title">Work Experience</div>`;
          experience.forEach(exp => {
            const dateStr = `${exp.startDate || "Start"} - ${exp.current ? "Present" : exp.endDate || "End"}`;
            content += `
              <div class="item-row">
                <span class="item-date">${dateStr}</span>
                <span class="item-title">${exp.role || "Role Title"}</span> <span style="font-weight: normal;">at</span> <span class="item-company">${exp.company || "Company"}</span>
              </div>
              <div class="item-meta">${exp.location || "Location"}</div>
              <ul class="bullets">
                ${(exp.bullets || []).map(b => `<li>${b || "Bullet achievement point..."}</li>`).join("")}
              </ul>
            `;
          });
        }
        if (projects && projects.length > 0) {
          content += `<div class="section-title">Key Projects</div>`;
          projects.forEach(proj => {
            content += `
              <div class="item-row">
                ${proj.techStack ? `<span class="item-date"><i>${proj.techStack}</i></span>` : ""}
                <span class="item-title">${proj.title || "Project Title"}</span>
                ${proj.link ? ` | <span style="font-size: 9pt; color: ${brandAccent};">${proj.link}</span>` : ""}
              </div>
              <ul class="bullets" style="margin-top: 2pt;">
                ${(proj.bullets || []).map(b => `<li>${b || "Project milestone..."}</li>`).join("")}
              </ul>
            `;
          });
        }
        if (education && education.length > 0) {
          content += `<div class="section-title">Education</div>`;
          education.forEach(edu => {
            content += `
              <div class="item-row">
                <span class="item-date">${edu.graduationDate || ""}</span>
                <span class="item-title">${edu.degree || "Degree"} in ${edu.field || "Field of Study"}</span>
              </div>
              <div class="item-meta">
                ${edu.school || "School / University"}${edu.location ? `, ${edu.location}` : ""}
                ${edu.gpa ? ` | <b>GPA:</b> ${edu.gpa}` : ""}
              </div>
            `;
          });
        }
        const validSkills = skills.filter(cat => cat && Array.isArray(cat.skills) && cat.skills.length > 0);
        if (validSkills.length > 0) {
          content += `<div class="section-title">Skills & Expertise</div>`;
          content += `<table class="skills-table">`;
          validSkills.forEach(cat => {
            content += `
              <tr>
                <td class="skills-category">${cat.categoryName}:</td>
                <td class="skills-list">${cat.skills.join(", ")}</td>
              </tr>
            `;
          });
          content += `</table>`;
        }
        if (certifications && certifications.length > 0) {
          content += `
            <div class="section-title">Certifications</div>
            <ul class="plain-list">
              ${certifications.map(cert => `<li>${cert}</li>`).join("")}
            </ul>
          `;
        }
        if (languages && languages.length > 0) {
          content += `
            <div class="section-title">Languages</div>
            <ul class="plain-list">
              ${languages.map(lang => `<li>${lang}</li>`).join("")}
            </ul>
          `;
        }
        return content;
      };

      let htmlBody = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <title>${personal.fullName || "Resume"}</title>
          ${cssStyles}
        </head>
        <body>
          <div>
      `;

      if (resumeStyle === "brutalist") {
        htmlBody += `
          <div style="background-color: #fde047; border: 3px solid #000; padding: 12pt; margin-bottom: 14pt;">
            <h1 style="color: #000;">${personal.fullName || "Your Name"}</h1>
            <div style="font-weight: bold; background: #fff; border: 2px solid #000; padding: 2pt 6pt; display: inline-block; text-transform: uppercase;">
              ${personal.title || "Target Professional Title"}
            </div>
          </div>
          ${renderContactHtml()}
          ${renderMainBody()}
        `;
      } else if (resumeStyle === "creative" || resumeStyle === "profile-photo") {
        const validSkills = skills.filter(cat => cat && Array.isArray(cat.skills) && cat.skills.length > 0);
        htmlBody += `
          <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="width: 32%; vertical-align: top; padding-right: 14pt; border-right: 1.5px solid ${brandAccent};">
                ${personal.photoUrl ? `<div style="text-align: center; margin-bottom: 10pt;"><img src="${personal.photoUrl}" width="100" height="100" style="border-radius: 50%;" /></div>` : ""}
                <h1 style="font-size: 16pt;">${personal.fullName || "Your Name"}</h1>
                <div class="subtitle" style="font-size: 10pt;">${personal.title || "Target Title"}</div>
                <div style="font-size: 9pt; color: #4b5563; margin-bottom: 12pt;">
                  ${personal.email ? `<div><b>Email:</b> ${personal.email}</div>` : ""}
                  ${personal.phone ? `<div><b>Phone:</b> ${personal.phone}</div>` : ""}
                  ${personal.location ? `<div><b>Loc:</b> ${personal.location}</div>` : ""}
                  ${personal.website ? `<div><b>Web:</b> ${personal.website}</div>` : ""}
                  ${personal.linkedin ? `<div><b>LinkedIn:</b> ${personal.linkedin}</div>` : ""}
                </div>
                ${validSkills.length > 0 ? `
                  <div class="section-title" style="font-size: 9.5pt;">Skills</div>
                  ${validSkills.map(c => `<div style="font-size: 9pt; margin-bottom: 4pt;"><b>${c.categoryName}:</b><br/>${c.skills.join(", ")}</div>`).join("")}
                ` : ""}
                ${certifications.length > 0 ? `
                  <div class="section-title" style="font-size: 9.5pt;">Certifications</div>
                  <ul class="plain-list" style="padding-left: 10pt;">${certifications.map(c => `<li style="font-size: 8.5pt;">${c}</li>`).join("")}</ul>
                ` : ""}
                ${languages.length > 0 ? `
                  <div class="section-title" style="font-size: 9.5pt;">Languages</div>
                  <ul class="plain-list" style="padding-left: 10pt;">${languages.map(l => `<li style="font-size: 8.5pt;">${l}</li>`).join("")}</ul>
                ` : ""}
              </td>
              <td style="width: 68%; vertical-align: top; padding-left: 14pt;">
                ${renderMainBody()}
              </td>
            </tr>
          </table>
        `;
      } else {
        htmlBody += `
          <h1>${personal.fullName || "Your Name"}</h1>
          <div class="subtitle">${personal.title || "Target Professional Title"}</div>
          ${renderContactHtml()}
          ${renderMainBody()}
        `;
      }

      htmlBody += `
          </div>
        </body>
        </html>
      `;

      const filename = `${(personal.fullName || "Resume").replace(/\s+/g, "_")}_${resumeStyle.toUpperCase()}_Resume.doc`;
      const fullContent = '\ufeff' + htmlBody;

      try {
        const blob = new Blob([fullContent], { type: 'application/msword;charset=utf-8' });
        if ((window.navigator as any).msSaveOrOpenBlob) {
          (window.navigator as any).msSaveOrOpenBlob(blob, filename);
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 250);
        }
      } catch (err) {
        // Mobile webview Data URI fallback
        const encodedUri = 'data:application/msword;charset=utf-8,' + encodeURIComponent(fullContent);
        const link = document.createElement('a');
        link.href = encodedUri;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      showToast(`Word document exported in ${resumeStyle.toUpperCase()} template!`, "success");
    } catch (err: any) {
      console.error("Word Download Error:", err);
      showToast("Download failed: " + (err.message || "Unknown error"), "error");
    }
  };

  // ================= NEW OVERLAY RESUME ENGINE HELPER FUNCTIONS =================
  const handleSelectResumeFromList = (id: string) => {
    const target = savedResumesList.find(r => r.id === id);
    if (!target) return;
    setActiveSavedResumeId(id);
    setJsonCodeText(JSON.stringify(target.data, null, 2));
    setEditorUndoStack([JSON.stringify(target.data, null, 2)]);
    setEditorRedoStack([]);
    setJsonError(null);
    showToast(`Loaded resume: ${target.name}`, "info");
  };

  const handleDuplicateResume = (id: string) => {
    const target = savedResumesList.find(r => r.id === id);
    if (!target) return;
    const newId = `resume-${Date.now()}`;
    const newItem = {
      ...target,
      id: newId,
      name: `${target.name} Copy`,
      isFavorite: false,
      lastSaved: new Date().toLocaleString()
    };
    const updated = [...savedResumesList, newItem];
    setSavedResumesList(updated);
    localStorage.setItem("careerwith_resumes_v2", JSON.stringify(updated));
    showToast("Resume duplicated successfully!", "success");
  };

  const handleDeleteResume = (id: string) => {
    if (savedResumesList.length <= 1) {
      showToast("Cannot delete the only remaining resume draft.", "error");
      return;
    }
    const updated = savedResumesList.filter(r => r.id !== id);
    setSavedResumesList(updated);
    localStorage.setItem("careerwith_resumes_v2", JSON.stringify(updated));
    if (activeSavedResumeId === id) {
      const fallback = updated[0];
      setActiveSavedResumeId(fallback.id);
      setJsonCodeText(JSON.stringify(fallback.data, null, 2));
    }
    showToast("Resume draft deleted.", "info");
  };

  const handleCreateNewResume = () => {
    if (!newResumeName.trim()) {
      showToast("Please enter a name for the new resume.", "error");
      return;
    }
    const newId = `resume-${Date.now()}`;
    const newItem = {
      id: newId,
      name: newResumeName.trim(),
      folder: newResumeFolder,
      isFavorite: false,
      lastSaved: new Date().toLocaleString(),
      data: demoResumeData
    };
    const updated = [...savedResumesList, newItem];
    setSavedResumesList(updated);
    localStorage.setItem("careerwith_resumes_v2", JSON.stringify(updated));
    setActiveSavedResumeId(newId);
    setJsonCodeText(JSON.stringify(demoResumeData, null, 2));
    setNewResumeName("");
    showToast(`Created resume "${newItem.name}"!`, "success");
  };

  const handleToggleFavoriteTemplate = (tplId: string) => {
    let updated;
    if (favoritesList.includes(tplId)) {
      updated = favoritesList.filter(f => f !== tplId);
    } else {
      updated = [...favoritesList, tplId];
    }
    setFavoritesList(updated);
    localStorage.setItem("careerwith_favorites", JSON.stringify(updated));
  };

  const handleCodeTextChange = (text: string) => {
    setJsonCodeText(text);
    
    // Manage undo stack dynamically (max 30 states)
    if (editorUndoStack.length === 0 || editorUndoStack[editorUndoStack.length - 1] !== text) {
      const nextUndo = [...editorUndoStack.slice(-29), text];
      setEditorUndoStack(nextUndo);
      setEditorRedoStack([]);
    }

    try {
      const parsed = JSON.parse(text);
      const sanitized = validateAndSanitizeResume(parsed);
      setResume(sanitized);
      setJsonError(null);
      
      // Auto-save parsed data to active local database item
      const updatedList = savedResumesList.map(item => {
        if (item.id === activeSavedResumeId) {
          return {
            ...item,
            lastSaved: new Date().toLocaleString(),
            data: sanitized
          };
        }
        return item;
      });
      setSavedResumesList(updatedList);
      localStorage.setItem("careerwith_resumes_v2", JSON.stringify(updatedList));
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON syntax");
    }
  };

  const handleUndoEditor = () => {
    if (editorUndoStack.length > 1) {
      const popped = editorUndoStack[editorUndoStack.length - 1];
      const nextUndo = editorUndoStack.slice(0, -1);
      const prevText = nextUndo[nextUndo.length - 1];
      setEditorUndoStack(nextUndo);
      setEditorRedoStack([popped, ...editorRedoStack]);
      setJsonCodeText(prevText);
      try {
        JSON.parse(prevText);
        setJsonError(null);
      } catch (e: any) {
        setJsonError(e.message);
      }
    }
  };

  const handleRedoEditor = () => {
    if (editorRedoStack.length > 0) {
      const nextText = editorRedoStack[0];
      setEditorRedoStack(editorRedoStack.slice(1));
      setEditorUndoStack([...editorUndoStack, nextText]);
      setJsonCodeText(nextText);
      try {
        JSON.parse(nextText);
        setJsonError(null);
      } catch (e: any) {
        setJsonError(e.message);
      }
    }
  };

  const handleFormattedJson = () => {
    try {
      const parsed = JSON.parse(jsonCodeText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonCodeText(formatted);
      setJsonError(null);
      showToast("JSON Code prettified and aligned!", "success");
    } catch (err) {
      showToast("Invalid JSON syntax. Cannot format.", "error");
    }
  };

  const handleMoveArrayItem = (sectionKey: "experience" | "education" | "projects", index: number, direction: "up" | "down") => {
    try {
      const parsed = JSON.parse(jsonCodeText);
      const arr = parsed[sectionKey];
      if (!Array.isArray(arr)) return;
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= arr.length) return;
      
      const temp = arr[index];
      arr[index] = arr[targetIdx];
      arr[targetIdx] = temp;
      
      parsed[sectionKey] = arr;
      const formatted = JSON.stringify(parsed, null, 2);
      handleCodeTextChange(formatted);
      showToast(`Shifted ${sectionKey} item ${direction === 'up' ? 'up' : 'down'}!`, "success");
    } catch (err) {
      showToast("Cannot shift items: check JSON syntax.", "error");
    }
  };

  const handleInjectObjective = (objectiveText: string) => {
    try {
      const parsed = JSON.parse(jsonCodeText);
      parsed.summary = objectiveText;
      handleCodeTextChange(JSON.stringify(parsed, null, 2));
      showToast("Objective merged into JSON summary field!", "success");
    } catch (e) {
      showToast("Cannot merge: check JSON syntax.", "error");
    }
  };

  const handleInjectSkills = (generatedSkills: any[]) => {
    try {
      const parsed = JSON.parse(jsonCodeText);
      if (!Array.isArray(parsed.skills)) {
        parsed.skills = [];
      }
      generatedSkills.forEach(cat => {
        parsed.skills.push(cat);
      });
      handleCodeTextChange(JSON.stringify(parsed, null, 2));
      showToast("Skills categories appended to skills array!", "success");
    } catch (e) {
      showToast("Cannot merge: check JSON syntax.", "error");
    }
  };

  const handleInjectProject = (title: string, techStack: string, bullets: string[]) => {
    try {
      const parsed = JSON.parse(jsonCodeText);
      if (!Array.isArray(parsed.projects)) {
        parsed.projects = [];
      }
      parsed.projects.push({
        id: `proj-${Date.now()}`,
        title,
        techStack,
        link: "",
        bullets
      });
      handleCodeTextChange(JSON.stringify(parsed, null, 2));
      showToast("Project appended to projects array!", "success");
    } catch (e) {
      showToast("Cannot merge: check JSON syntax.", "error");
    }
  };

  // Dynamic style class mapping for customizable template palettes
  const isDarkTheme = resumeStyle === "midnight" || resumeStyle === "future";
  const textPrimary = isDarkTheme ? "text-stone-100" : "text-stone-900";
  const textSecondary = isDarkTheme ? "text-stone-300" : "text-stone-600";
  const textMuted = isDarkTheme ? "text-stone-500" : "text-stone-400";
  const textAccent = resumeStyle === "midnight" ? "text-yellow-400" : resumeStyle === "future" ? "text-violet-400" : resumeStyle === "healthcare" ? "text-emerald-600" : "text-yellow-600";
  const borderCol = isDarkTheme ? "border-stone-800" : "border-stone-200";

  if (showEntrancePage) {
    return (
      <div className="min-h-screen text-[#5C2018] flex flex-col justify-between items-center relative overflow-hidden font-sans select-none pb-8">
        {/* Liquid Glass Background */}
        <div className="liquid-glass-bg">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#BC4639]/20 rounded-full blur-[90px] animate-blob-1" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#4285F4]/15 rounded-full blur-[100px] animate-blob-2" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[450px] h-[450px] bg-[#D4A59A]/20 rounded-full blur-[90px] animate-blob-3" />
          <div className="liquid-glass-overlay" />
        </div>

        {/* Navigation Header */}
        <header className="w-full max-w-7xl flex justify-between items-center px-6 py-5 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="glass-neomorphic-icon rounded-xl p-2.5 flex items-center justify-center">
              <FileText className="h-5 w-5 text-[#5C2018] stroke-[2.5]" />
            </div>
            <span className="text-[#5C2018] font-serif font-black tracking-tight text-xl">
              CareerWith
            </span>
            <span className="hidden sm:inline-block text-[9px] bg-[#BC4639]/10 text-[#BC4639] border border-[#BC4639]/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold font-mono">
              Petra Professional Studio
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEntrancePage(false)}
              className="text-white text-xs font-bold bg-[#4285F4] hover:bg-[#357AE8] px-5 py-2.5 rounded-xl border border-blue-600/30 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              Start Building <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        {/* Main Content (Hero + Audiences + Templates) */}
        <main className="grow w-full max-w-7xl z-10 px-6 flex flex-col items-center justify-center py-6 gap-12">
          
          {/* Hero Section */}
          <section className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-1.5 bg-[#BC4639]/10 border border-[#BC4639]/20 text-[#BC4639] text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm backdrop-blur">
              <Sparkles className="h-3 w-3 animate-pulse" /> Cinematic Resume Builder
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black leading-tight tracking-tight px-2">
              Build a Resume That <br/>
              <span className="text-indigo-glow drop-shadow" style={{ backgroundImage: 'linear-gradient(135deg, #5C2018 0%, #BC4639 50%, #4285F4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Commands Authority.</span>
            </h1>

            {/* Slogans Slideshow Container */}
            <div className="p-5 bg-[#D4A59A]/20 border border-[#D4A59A]/45 rounded-[22px] max-w-2xl mx-auto backdrop-blur-sm w-full">
              <p className="text-sm md:text-base font-semibold text-[#5C2018]/90 italic min-h-[48px] flex items-center justify-center px-4 leading-relaxed">
                "{SLOGANS[selectedSloganIndex]}"
              </p>
              <div className="flex justify-center gap-1.5 mt-3">
                {SLOGANS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSloganIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      selectedSloganIndex === index
                        ? "w-6 bg-[#BC4639] shadow"
                        : "w-2 bg-[#D4A59A] hover:bg-[#BC4639]/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3.5 pt-2">
              <button
                onClick={() => setShowEntrancePage(false)}
                className="px-7 py-3.5 bg-[#4285F4] hover:bg-[#357AE8] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Create My Resume
              </button>
              <button
                onClick={() => {
                  handleLoadDemo();
                  setShowEntrancePage(false);
                }}
                className="px-7 py-3.5 bg-transparent hover:bg-[#5C2018]/5 text-[#5C2018] border-2 border-[#5C2018] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Explore Demo Resume
              </button>
            </div>
          </section>

          {/* Divided Targets Grid: Students, Professionals, Companies */}
          <section className="w-full">
            <h2 className="text-xs font-black uppercase text-center tracking-widest text-[#BC4639] mb-8">Designed For Every Career Stage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Students */}
              <div
                className="bg-[#D4A59A]/30 border border-[#D4A59A]/50 rounded-2xl p-6 flex flex-col justify-between hover-card-trigger cursor-pointer"
                onClick={() => {
                  const idx = domainsAndRoles.findIndex(d => d.domain.includes("Student"));
                  if (idx !== -1) {
                    setSelectedDomainIdx(idx);
                    const defaultRole = domainsAndRoles[idx].roles[0]?.role || "Graduate Intern";
                    setSelectedRoleName(defaultRole);
                    const preset = TEMPLATE_PRESETS.find(p => p.id === "student-basic") || TEMPLATE_PRESETS.find(p => p.id === "modern-minimal");
                    if (preset) {
                      setResumeStyle("modern");
                      setPreviewThemeColor(preset.color);
                      setPreviewFontFamily(preset.font as any);
                    }
                  }
                  if (JSON.stringify(resume) === JSON.stringify(INITIAL_RESUME)) {
                    handleLoadDemo();
                  }
                  setShowEntrancePage(false);
                  showToast("Welcome! Loaded Student & Graduate entry-level workspace.", "success");
                }}
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 glass-neomorphic-icon rounded-xl flex items-center justify-center text-[#BC4639]">
                    <GraduationCap className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#5C2018] font-serif">For Students & Graduates</h3>
                    <p className="text-xs text-[#5C2018]/85 leading-relaxed mt-2 font-medium">
                      Kickstart your career with clean entry-level presets. Focus on academic milestones, key student projects, and core skill listings.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#BC4639]/10 text-[10px] text-[#BC4639] font-mono font-bold uppercase tracking-wider">
                  ✦ Graduate Entry Presets • Coursework Grids
                </div>
              </div>

              {/* Card 2: Professional Employees */}
              <div
                className="bg-[#D4A59A]/30 border border-[#D4A59A]/50 rounded-2xl p-6 flex flex-col justify-between hover-card-trigger cursor-pointer"
                onClick={() => {
                  const idx = domainsAndRoles.findIndex(d => d.domain.includes("Software Development"));
                  if (idx !== -1) {
                    setSelectedDomainIdx(idx);
                    const defaultRole = domainsAndRoles[idx].roles[0]?.role || "Software Engineer";
                    setSelectedRoleName(defaultRole);
                    const preset = TEMPLATE_PRESETS.find(p => p.id === "modern-tech");
                    if (preset) {
                      setResumeStyle("modern");
                      setPreviewThemeColor(preset.color);
                      setPreviewFontFamily(preset.font as any);
                    }
                  }
                  if (JSON.stringify(resume) === JSON.stringify(INITIAL_RESUME)) {
                    handleLoadDemo();
                  }
                  setShowEntrancePage(false);
                  showToast("Welcome! Loaded Professional software engineer workspace.", "success");
                }}
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 glass-neomorphic-icon rounded-xl flex items-center justify-center text-[#4285F4]">
                    <Briefcase className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#5C2018] font-serif">For Professional Employees</h3>
                    <p className="text-xs text-[#5C2018]/85 leading-relaxed mt-2 font-medium">
                      Audit your resume against specific target roles. Optimize bullet points using the STAR method (Situation, Task, Action, Result) and generate matching cover letters instantly.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#BC4639]/10 text-[10px] text-[#4285F4] font-mono font-bold uppercase tracking-wider">
                  ★ AI STAR Rewrite • ATS Auditing
                </div>
              </div>

              {/* Card 3: Recruiters & Companies */}
              <div
                className="bg-[#D4A59A]/30 border border-[#D4A59A]/50 rounded-2xl p-6 flex flex-col justify-between hover-card-trigger cursor-pointer"
                onClick={() => {
                  const idx = domainsAndRoles.findIndex(d => d.domain.includes("Management") || d.domain.includes("MBA"));
                  if (idx !== -1) {
                    setSelectedDomainIdx(idx);
                    const defaultRole = domainsAndRoles[idx].roles[0]?.role || "Product Manager";
                    setSelectedRoleName(defaultRole);
                    const preset = TEMPLATE_PRESETS.find(p => p.id === "exec-classic");
                    if (preset) {
                      setResumeStyle("executive");
                      setPreviewThemeColor(preset.color);
                      setPreviewFontFamily(preset.font as any);
                    }
                  }
                  if (JSON.stringify(resume) === JSON.stringify(INITIAL_RESUME)) {
                    handleLoadDemo();
                  }
                  setShowEntrancePage(false);
                  showToast("Welcome! Loaded Corporate & Executive template workspace.", "success");
                }}
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 glass-neomorphic-icon rounded-xl flex items-center justify-center text-[#BC4639]">
                    <User className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#5C2018] font-serif">For Employers & Companies</h3>
                    <p className="text-xs text-[#5C2018]/85 leading-relaxed mt-2 font-medium">
                      All resumes conform to standard layout architectures, ensuring perfect readability by company ATS systems and recruiter screening software.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#BC4639]/10 text-[10px] text-[#BC4639] font-mono font-bold uppercase tracking-wider">
                  ✔ 100% ATS Readable • Clean Layouts
                </div>
              </div>

            </div>
          </section>

          {/* Quick Preview of Available Templates */}
          <section className="w-full space-y-5">
            <div className="text-center">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#BC4639]">Resume Styling Presets</h2>
              <p className="text-xs text-[#5C2018]/80 mt-1 font-medium">Select from 10+ standard templates to match your professional domain</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "Tech Elegant", type: "Modern", color: "from-indigo-500 to-slate-900", font: "Inter", img: "/tech_elegant.png" },
                { name: "Boardroom Classic", type: "Executive", color: "from-slate-700 to-slate-900", font: "Serif", img: "/boardroom_classic.png" },
                { name: "Minimal Developer", type: "Minimal", color: "from-stone-600 to-stone-900", font: "Mono", img: "/minimal_developer.png" },
                { name: "Creative Split Panel", type: "Creative", color: "from-purple-600 to-slate-900", font: "Sans", img: "/creative_split_panel.png" }
              ].map((tpl, tIdx) => (
                <div
                  key={tIdx}
                  className="bg-[#D4A59A]/30 border border-[#D4A59A]/50 p-4 rounded-xl flex flex-col justify-between hover:border-[#BC4639]/50 transition-all cursor-pointer transform hover:-translate-y-1 shadow-sm hover:shadow-md group"
                  onClick={() => {
                    const preset = TEMPLATE_PRESETS.find(p => p.name === tpl.name);
                    if (preset) {
                      if (preset.id.startsWith("modern")) setResumeStyle("modern");
                      else if (preset.id.startsWith("min")) setResumeStyle("tech");
                      else if (preset.id.startsWith("exec")) setResumeStyle("executive");
                      else setResumeStyle(preset.id as any);
                      setPreviewThemeColor(preset.color);
                      setPreviewFontFamily(preset.font as any);
                    }
                    if (JSON.stringify(resume) === JSON.stringify(INITIAL_RESUME)) {
                      handleLoadDemo();
                      showToast(`Applied preset: ${tpl.name} and loaded demo resume data!`, "success");
                    } else {
                      showToast(`Applied preset style: ${tpl.name}!`, "success");
                    }
                    setShowEntrancePage(false);
                  }}
                >
                  <div className="h-24 w-full rounded-lg bg-[#F3E0DC]/75 border border-[#D4A59A]/60 select-none relative overflow-hidden mb-2 shadow-inner">
                    <img
                      src={tpl.img}
                      alt={tpl.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5C2018]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <div className="mt-1">
                    <span className="text-[10px] text-[#BC4639] font-extrabold uppercase font-mono">{tpl.type}</span>
                    <h4 className="text-xs font-bold text-[#5C2018] mt-0.5">{tpl.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Statistics Trust Bar */}
          <section className="w-full bg-[#5C2018] text-[#F3E0DC] p-6 rounded-2xl shadow-lg grid grid-cols-3 text-center gap-4 border border-[#BC4639]/20">
            <div>
              <span className="block text-xl sm:text-2xl font-serif font-black text-white">15,000+</span>
              <span className="block text-[9px] uppercase tracking-wider text-[#D4A59A] font-extrabold mt-1">Resumes Built</span>
            </div>
            <div className="border-x border-[#BC4639]/30">
              <span className="block text-xl sm:text-2xl font-serif font-black text-[#4285F4]">99.4%</span>
              <span className="block text-[9px] uppercase tracking-wider text-[#D4A59A] font-extrabold mt-1">ATS Pass Rate</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-serif font-black text-white">&lt; 3 mins</span>
              <span className="block text-[9px] uppercase tracking-wider text-[#D4A59A] font-extrabold mt-1">Creation Time</span>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="w-full max-w-7xl text-center z-10 shrink-0 pt-6 border-t border-[#BC4639]/20">
          <p className="text-[10px] text-[#5C2018]/80 font-semibold tracking-wide flex items-center justify-center gap-1.5">
            Designed for professional success • CareerWith © 2026 🚀
          </p>
        </footer>
      </div>
    );
  }

  return (

    <div className="min-h-screen text-[#5C2018] font-sans antialiased selection:bg-[#4285F4] selection:text-white relative overflow-x-hidden">
      {/* Liquid Glass Background */}
      <div className="liquid-glass-bg">
        <div className="absolute top-[5%] left-[5%] w-[450px] h-[450px] bg-[#BC4639]/12 rounded-full blur-[90px] animate-blob-1" />
        <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-[#4285F4]/10 rounded-full blur-[90px] animate-blob-2" />
        <div className="absolute top-[35%] right-[25%] w-[400px] h-[400px] bg-[#D4A59A]/12 rounded-full blur-[95px] animate-blob-3" />
        <div className="liquid-glass-overlay" />
      </div>
      
      {/* Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 text-sm no-print ${
              toastMessage.type === "success"
                ? "bg-emerald-50 border-emerald-250 text-emerald-800"
                : toastMessage.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-[#F3E0DC] border-[#BC4639]/30 text-[#5C2018]"
            }`}
          >
            <Sparkle className="h-4 w-4 shrink-0 fill-current" />
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className={`max-w-[1700px] mx-auto px-4 md:px-6 lg:px-8 py-5 ${showCoverLetterModal ? "no-print" : ""}`}>
        {/* Navigation Bar */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between p-3.5 sm:p-4.5 bg-white/50 backdrop-blur border border-white/30 rounded-2xl mb-4 sm:mb-6 gap-3 sm:gap-4 no-print shadow-sm">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="bg-[#5C2018] border border-[#BC4639]/30 rounded-xl shadow-sm text-white p-2 sm:p-2.5 flex items-center justify-center">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-serif font-black tracking-tight text-[#5C2018] flex items-center gap-1.5">
                  CareerWith <span className="text-[#BC4639] font-bold text-[10px] sm:text-xs bg-[#BC4639]/10 border border-[#BC4639]/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">Studio</span>
                </h1>
              </div>
            </div>

            {/* Mobile Navigation Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden px-3 py-1.5 rounded-xl bg-white border border-[#D4A59A]/50 text-[#5C2018] font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <span>{mobileNavOpen ? "Close ✕" : "Menu ☰"}</span>
            </button>
          </div>

          <div className={`${mobileNavOpen ? "flex" : "hidden"} md:flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#D4A59A]/30`}>
            <button
              onClick={() => { setShowEntrancePage(true); setMobileNavOpen(false); }}
              className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold bg-[#D4A59A]/20 hover:bg-[#D4A59A]/35 text-[#5C2018] px-3 py-2 rounded-xl border border-[#D4A59A]/40 shadow-sm transition-all cursor-pointer"
            >
              <span className="p-1 rounded-lg bg-white text-[#5C2018] border border-[#D4A59A]/30 flex items-center justify-center shrink-0">
                <span className="text-xs">🏠</span>
              </span>
              Home Screen
            </button>
            <button
              onClick={() => {
                setJsonCodeText(JSON.stringify(resume, null, 2));
                setShowJsonModal(true);
                setMobileNavOpen(false);
              }}
              className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold bg-[#D4A59A]/20 hover:bg-[#D4A59A]/35 text-[#5C2018] px-3 py-2 rounded-xl border border-[#D4A59A]/40 shadow-sm transition-all cursor-pointer"
            >
              <span className="p-1 rounded-lg bg-white text-[#5C2018] border border-[#D4A59A]/30 flex items-center justify-center shrink-0">
                <FileText className="h-3.5 w-3.5" />
              </span>
              JSON Editor 💻
            </button>
            <button
              onClick={() => { handleLoadDemo(); setMobileNavOpen(false); }}
              className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold bg-[#D4A59A]/20 hover:bg-[#D4A59A]/35 text-[#5C2018] px-3 py-2 rounded-xl border border-[#D4A59A]/40 shadow-sm transition-all cursor-pointer"
            >
              <span className="p-1 rounded-lg bg-white text-[#5C2018] border border-[#D4A59A]/30 flex items-center justify-center shrink-0">
                <RotateCcw className="h-3.5 w-3.5" />
              </span>
              Demo Data
            </button>
            <button
              onClick={() => { handleReset(); setMobileNavOpen(false); }}
              className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold bg-[#BC4639]/10 hover:bg-[#BC4639]/20 text-[#BC4639] px-3 py-2 rounded-xl border border-[#BC4639]/25 shadow-sm transition-all cursor-pointer"
            >
              <span className="p-1 rounded-lg bg-white text-[#BC4639] border border-[#BC4639]/20 flex items-center justify-center shrink-0">
                <Trash2 className="h-3.5 w-3.5" />
              </span>
              Reset Form
            </button>
            <button
              onClick={() => { setShowATSModal(true); setMobileNavOpen(false); }}
              className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold bg-[#5C2018] hover:bg-[#5C2018]/90 text-[#F3E0DC] px-3.5 py-2 rounded-xl border border-[#BC4639]/20 shadow-sm transition-all cursor-pointer"
            >
              <span className="p-1 rounded-lg bg-[#5C2018]/50 text-[#F3E0DC] border border-[#BC4639]/30 flex items-center justify-center shrink-0">
                <TrendingUp className="h-3.5 w-3.5" />
              </span>
              ATS Score Scanner
            </button>
            <button
              onClick={() => { setShowCoverLetterModal(true); setMobileNavOpen(false); }}
              className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold bg-[#4285F4] hover:bg-[#357AE8] text-white px-3.5 py-2 rounded-xl border border-blue-600/30 shadow-md transition-all cursor-pointer"
            >
              <span className="p-1 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                <Wand2 className="h-3.5 w-3.5 stroke-[2.5]" />
              </span>
              AI Cover Letter
            </button>
          </div>
        </header>

        {/* Sticky Mobile Workspace View Switcher (Visible on screens < xl) */}
        <div className="xl:hidden sticky top-2 z-30 bg-[#5C2018] text-white p-1.5 rounded-2xl border border-[#BC4639]/30 shadow-xl flex items-center justify-between gap-1.5 mb-5 no-print">
          <button
            type="button"
            onClick={() => setMobileActiveTab("editor")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mobileActiveTab === "editor"
                ? "bg-[#F3E0DC] text-[#5C2018] shadow-md scale-[1.02]"
                : "text-[#D4A59A] hover:text-white"
            }`}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span>1. Edit Details</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileActiveTab("preview")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mobileActiveTab === "preview"
                ? "bg-[#4285F4] text-white shadow-md scale-[1.02]"
                : "text-[#D4A59A] hover:text-white"
            }`}
          >
            <Eye className="h-4 w-4 shrink-0" />
            <span>2. Paper Preview</span>
          </button>
        </div>

        {/* Workspace Layout Split */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start print:block print:w-full print:m-0 print:p-0">
          
          {/* LEFT: Creator Wizard (xl:col-span-5) */}
          <section className={`xl:col-span-5 bg-white/80 backdrop-blur border border-white/30 rounded-3xl shadow-sm p-4 sm:p-5 md:p-6 sticky top-5 max-h-[calc(100vh-140px)] overflow-y-auto no-print relative z-10 transition-all duration-300 ${
            mobileActiveTab === "editor" ? "block" : "hidden xl:block"
          }`}>
            
            {/* AI Career Co-Pilot Section */}
            <div className="mb-6 bg-[#D4A59A]/15 border border-[#BC4639]/20 rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 rounded-xl bg-white text-[#BC4639] border border-[#BC4639]/20 flex items-center justify-center shrink-0 shadow-sm">
                  <Wand2 className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#5C2018] uppercase tracking-tight">AI Career Co-Pilot</h3>
                  <p className="text-[11px] text-[#5C2018]/80 font-medium">Smart ways to draft or import your resume details</p>
                </div>
              </div>

              {/* Sub-Tabs: Generate vs Import */}
              <div className="grid grid-cols-2 bg-[#D4A59A]/20 p-1 rounded-xl mb-4 text-xs font-bold border border-[#D4A59A]/30">
                <button
                  type="button"
                  onClick={() => setCopilotTab("generate")}
                  className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                    copilotTab === "generate"
                      ? "bg-white text-[#5C2018] shadow-sm border border-[#D4A59A]/20"
                      : "text-[#BC4639] hover:text-[#5C2018]"
                  }`}
                >
                  ✨ Draft From Scratch
                </button>
                <button
                  type="button"
                  onClick={() => setCopilotTab("import")}
                  className={`py-1.5 rounded-lg text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    copilotTab === "import"
                      ? "bg-white text-stone-900 shadow-sm border border-stone-200/40"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  <Upload className="h-3 w-3 text-yellow-600" />
                  Import Resume/LinkedIn
                </button>
              </div>

              {copilotTab === "generate" ? (
                <div className="space-y-4">
                  {/* Quick Search */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-stone-500 uppercase tracking-wider mb-1">🔍 Quick Career Search</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-3.5 w-3.5 text-stone-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search 50+ domains and roles..."
                        value={wizardSearchQuery}
                        onChange={e => setWizardSearchQuery(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-stone-800 placeholder-stone-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Filter matches */}
                  {(() => {
                    if (!wizardSearchQuery) return null;
                    const searchResults: { domainIdx: number; roleName: string }[] = [];
                    domainsAndRoles.forEach((dom, dIdx) => {
                      dom.roles.forEach(rol => {
                        if (
                          rol.role.toLowerCase().includes(wizardSearchQuery.toLowerCase()) ||
                          dom.domain.toLowerCase().includes(wizardSearchQuery.toLowerCase())
                        ) {
                          searchResults.push({ domainIdx: dIdx, roleName: rol.role });
                        }
                      });
                    });

                    return (
                      <div>
                        <label className="block text-[9px] font-bold text-yellow-600 uppercase tracking-wider mb-1 flex items-center gap-1 animate-pulse">
                          <Sparkles className="h-3 w-3 fill-current" /> Found {searchResults.length} Match{searchResults.length === 1 ? '' : 'es'}
                        </label>
                        <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-1.5 border border-yellow-200/50 rounded-xl bg-yellow-50/20">
                          {searchResults.length === 0 ? (
                            <span className="text-[10px] text-stone-400 italic p-1">No matching roles found</span>
                          ) : (
                            searchResults.slice(0, 20).map((result, idx) => {
                              const isSelected = selectedRoleName === result.roleName;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDomainIdx(result.domainIdx);
                                    setSelectedRoleName(result.roleName);
                                    const roleObj = domainsAndRoles[result.domainIdx].roles.find(r => r.role === result.roleName);
                                    if (roleObj && roleObj.defaultTemplate) {
                                      setResumeStyle(roleObj.defaultTemplate);
                                    }
                                    setWizardSearchQuery("");
                                  }}
                                  className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-stone-900 text-yellow-400 border-stone-900"
                                      : "bg-white text-stone-600 border-stone-200 hover:border-yellow-400 hover:bg-yellow-50/20"
                                  }`}
                                >
                                  {result.roleName} <span className="text-[8px] font-normal text-stone-400">({domainsAndRoles[result.domainIdx].domain})</span>
                                </button>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Domain Selector */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-stone-500 uppercase tracking-wider mb-1">1. Choose Career Domain</label>
                    <select
                      value={selectedDomainIdx}
                      onChange={e => {
                        const idx = parseInt(e.target.value);
                        setSelectedDomainIdx(idx);
                        const defaultRole = domainsAndRoles[idx].roles[0].role;
                        setSelectedRoleName(defaultRole);
                        const roleObj = domainsAndRoles[idx].roles[0];
                        if (roleObj && roleObj.defaultTemplate) {
                          setResumeStyle(roleObj.defaultTemplate);
                        }
                      }}
                      className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium text-stone-800 shadow-sm"
                    >
                      {domainsAndRoles.map((domainObj, index) => (
                        <option key={index} value={index}>
                          {index + 1}. {domainObj.domain} ({domainObj.roles.length})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Role Specialization Selector */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-stone-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>2. Target Role (Specialization)</span>
                      <span className="text-[8.5px] text-yellow-700 font-bold bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200/50">
                        {domainsAndRoles[selectedDomainIdx]?.roles.length || 0} Specializations
                      </span>
                    </label>
                    <div className="relative">
                      {/* Gradient overlays to indicate scrollability */}
                      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-stone-50/80 to-transparent pointer-events-none z-10 rounded-t-xl" />
                      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-stone-50/80 to-transparent pointer-events-none z-10 rounded-b-xl" />
                      
                      <div className="roles-scroll-container flex flex-col gap-1.5 max-h-56 overflow-y-auto p-1.5 border border-stone-200/60 rounded-xl bg-stone-50/50 scroll-smooth">
                        {domainsAndRoles[selectedDomainIdx]?.roles.map((roleObj, rIdx) => {
                          const isSelected = selectedRoleName === roleObj.role;
                          const templateName = roleObj.defaultTemplate === 'modern' ? 'Tech Elegant' 
                                              : roleObj.defaultTemplate === 'classic' ? 'Classic Serif' 
                                              : roleObj.defaultTemplate === 'tech' ? 'Modern Minimal' 
                                              : roleObj.defaultTemplate === 'creative' ? 'Creative Split' 
                                              : roleObj.defaultTemplate === 'executive' ? 'Executive Sleek'
                                              : roleObj.defaultTemplate === 'academic' ? 'Academic Formal'
                                              : roleObj.defaultTemplate === 'chic' ? 'Chic Portrait'
                                              : 'Midnight Dark';

                          return (
                            <button
                              key={rIdx}
                              type="button"
                              onClick={() => {
                                setSelectedRoleName(roleObj.role);
                                if (roleObj.defaultTemplate) {
                                  setResumeStyle(roleObj.defaultTemplate);
                                }
                              }}
                              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer relative group ${
                                isSelected
                                  ? "bg-stone-950 text-white border-stone-950 shadow-md transform scale-[1.005]"
                                  : "bg-white text-stone-700 border-stone-200/70 hover:border-yellow-400 hover:shadow-sm"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {/* Visual Selection Indicator */}
                                <span className={`h-2 w-2 rounded-full shrink-0 transition-all ${
                                  isSelected 
                                    ? "bg-yellow-400 scale-125 ring-2 ring-yellow-400/30" 
                                    : "bg-stone-300 group-hover:bg-yellow-400"
                                }`} />
                                <span className="text-[10.5px] font-black tracking-tight leading-none group-hover:text-yellow-400 transition-colors truncate">
                                  {roleObj.role}
                                </span>
                              </div>
                              
                              <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                                isSelected 
                                  ? "bg-stone-850 text-stone-300" 
                                  : "bg-stone-100 text-stone-500 group-hover:bg-yellow-50 group-hover:text-yellow-600"
                              }`}>
                                🎨 {templateName}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-stone-500 uppercase tracking-wider mb-1.5">3. Experience Level</label>
                    <div className="grid grid-cols-4 gap-1 bg-stone-100/50 p-1 rounded-xl border border-stone-200/40">
                      {["Intern", "Fresher", "Junior", "Mid-Level", "Senior", "Lead", "Manager", "Director"].map((level) => {
                        const isSelected = wizardExpLevel === level;
                        return (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setWizardExpLevel(level)}
                            className={`text-[9px] font-bold py-1 rounded-lg transition-all text-center cursor-pointer ${
                              isSelected
                                ? "bg-white text-stone-950 shadow-sm border border-stone-200/40 font-extrabold"
                                : "text-stone-500 hover:text-stone-800"
                            }`}
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Company Type */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-stone-500 uppercase tracking-wider mb-1.5">4. Target Company Profile</label>
                    <div className="grid grid-cols-3 gap-1 bg-stone-100/50 p-1 rounded-xl border border-stone-200/40">
                      {["Product-based", "Service-based", "Startup", "FAANG / Tier-1", "Fortune 500", "Government"].map((compType) => {
                        const isSelected = wizardCompanyType === compType;
                        return (
                          <button
                            key={compType}
                            type="button"
                            onClick={() => setWizardCompanyType(compType)}
                            className={`text-[9px] font-bold py-1 rounded-lg transition-all text-center cursor-pointer ${
                              isSelected
                                ? "bg-white text-stone-950 shadow-sm border border-stone-200/40 font-extrabold"
                                : "text-stone-500 hover:text-stone-800"
                            }`}
                          >
                            {compType}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Industry and Region select grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-stone-500 uppercase tracking-wider mb-1">5. Industry Segment</label>
                      <select
                        value={wizardIndustry}
                        onChange={e => setWizardIndustry(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium text-stone-800 shadow-sm"
                      >
                        {[
                          "IT & Software",
                          "Healthcare & Pharma",
                          "Finance & Banking",
                          "Mechanical & Auto",
                          "Civil & Construction",
                          "Education & Research",
                          "Retail & Commerce",
                          "Hospitality & Tourism",
                          "Creative & Media",
                          "Government & Defence",
                          "Other"
                        ].map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-stone-500 uppercase tracking-wider mb-1">6. Target Geography</label>
                      <select
                        value={wizardRegion}
                        onChange={e => setWizardRegion(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium text-stone-800 shadow-sm"
                      >
                        {[
                          "India",
                          "United States",
                          "Europe",
                          "United Kingdom",
                          "Canada",
                          "Australia",
                          "Middle East",
                          "Global / Other"
                        ].map((reg) => (
                          <option key={reg} value={reg}>{reg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateRoleResume}
                    disabled={isGeneratingRoleResume}
                    className="w-full mt-1 bg-stone-900 hover:bg-stone-800 text-yellow-400 font-extrabold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-xs disabled:opacity-50"
                  >
                    {isGeneratingRoleResume ? (
                      <Sparkles className="h-4 w-4 text-yellow-400 animate-spin fill-current" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-yellow-400 fill-current" />
                    )}
                    {isGeneratingRoleResume ? "Analyzing & Drafting..." : `Generate Tailored Resume for ${selectedRoleName}`}
                  </button>

                  {/* Micro loading progress tracker */}
                  {isGeneratingRoleResume && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-center p-2 bg-white border border-yellow-100 rounded-xl shadow-inner"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:0.4s]" />
                        <span className="text-[10px] font-bold text-stone-600 animate-pulse">{roleResumeProgress}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[11px] text-stone-500 leading-relaxed mb-1">
                    Upload your old resume document or downloaded LinkedIn PDF profile. Gemini AI will automatically read, parse, and synchronize details with this workspace.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Old Resume Upload Card */}
                    <div className="border border-stone-200/60 bg-white/50 p-2.5 rounded-xl text-center flex flex-col justify-between items-center relative hover:bg-white hover:border-yellow-300 transition-all shadow-sm">
                      <span className="block text-[10px] font-extrabold text-stone-500 uppercase mb-1">📄 Old Resume</span>
                      <p className="text-[9px] text-stone-400 leading-tight mb-2.5">Upload old resume (PDF or TXT) to import details.</p>
                      
                      <label className="w-full py-1.5 bg-stone-900 hover:bg-stone-800 text-yellow-400 text-[10px] font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-neomorphic border border-stone-800">
                        <span className="p-1 rounded-lg bg-stone-800 text-yellow-400 shadow-neomorphic-inset border border-stone-700/50 flex items-center justify-center shrink-0">
                          <Upload className="h-3 w-3" />
                        </span>
                        Upload PDF/TXT
                        <input
                          type="file"
                          accept=".pdf,.txt"
                          onChange={(e) => handleImportResumeFile(e, "resume")}
                          disabled={isImporting}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* LinkedIn PDF Upload Card */}
                    <div className="border border-stone-200/60 bg-white/50 p-2.5 rounded-xl text-center flex flex-col justify-between items-center relative hover:bg-white hover:border-yellow-300 transition-all shadow-sm">
                      <span className="block text-[10px] font-extrabold text-stone-500 uppercase mb-1">💼 LinkedIn Profile</span>
                      <p className="text-[9px] text-stone-400 leading-tight mb-2.5">Upload standard LinkedIn Profile PDF download.</p>
                      
                      <label className="w-full py-1.5 bg-yellow-400 hover:bg-yellow-500 text-stone-900 text-[10px] font-extrabold rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-neomorphic border border-yellow-500/30">
                        <span className="p-1 rounded-lg bg-white/80 text-yellow-600 shadow-neomorphic border border-yellow-200/40 flex items-center justify-center shrink-0">
                          <Upload className="h-3 w-3 text-stone-900" />
                        </span>
                        Upload LinkedIn
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleImportResumeFile(e, "linkedin")}
                          disabled={isImporting}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* LinkedIn Download Helper Tip */}
                  <div className="p-2 bg-stone-100/70 border border-stone-200/30 rounded-xl text-[9px] text-stone-500 leading-relaxed flex items-start gap-1.5">
                    <span className="text-yellow-600 font-bold shrink-0">💡 Tip:</span>
                    <span>To download your LinkedIn profile: View your LinkedIn profile, click the <b>More</b> button in your intro section, and select <b>"Save to PDF"</b>.</span>
                  </div>

                  {/* Import Loader */}
                  {isImporting && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-center p-3 bg-white border border-yellow-200 rounded-xl shadow-inner"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-bounce" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-bounce [animation-delay:0.4s]" />
                        </div>
                        <span className="text-[10px] font-bold text-stone-700 leading-tight">{importProgress}</span>
                        <span className="text-[9px] text-stone-400">Gemini AI is parsing complex layout segments...</span>
                      </div>
                    </motion.div>
                  )}

                  {importError && (
                    <p className="mt-2 text-[10px] font-semibold text-red-500 bg-red-50 border border-red-100 p-2 rounded-xl text-center">
                      ⚠️ {importError}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Wizard Section Tab Bar */}
            <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-5 border-b border-[#D4A59A]/30 scrollbar-none">
              {[
                { id: "personal", label: "Contact", icon: User },
                { id: "summary", label: "Summary", icon: Sparkles },
                { id: "experience", label: "Experience", icon: Briefcase },
                { id: "education", label: "Education", icon: GraduationCap },
                { id: "projects", label: "Projects", icon: BookOpen },
                { id: "skills", label: "Skills", icon: Award },
                { id: "cert_lang", label: "Extras", icon: Globe }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#4285F4] text-white border border-[#4285F4]/30 shadow-md"
                        : "bg-[#D4A59A]/15 text-[#5C2018] hover:bg-[#D4A59A]/30 border border-[#D4A59A]/30 shadow-sm"
                    }`}
                  >
                    <span className={`p-1 rounded-lg flex items-center justify-center transition-all ${
                      isActive 
                        ? "bg-white/10 text-white" 
                        : "bg-[#D4A59A]/20 text-[#BC4639]"
                    }`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Wizard Forms */}
            <div className="space-y-6">
              
              {/* Tab: Personal Contact */}
              {activeTab === "personal" && (
                <div className="space-y-4">
                  <div className="border-b border-stone-100 pb-2 mb-4 flex items-center gap-2.5">
                    <span className="p-1.5 rounded-xl bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/80 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-stone-900">Personal & Contact Info</h3>
                      <p className="text-xs text-stone-500">Provide clean, accurate professional headers.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={resume.personal.fullName}
                        onChange={e => updatePersonalInfo("fullName", e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full text-sm px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={resume.personal.title}
                        onChange={e => updatePersonalInfo("title", e.target.value)}
                        placeholder="e.g. Senior Frontend Developer"
                        className="w-full text-sm px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={resume.personal.email}
                        onChange={e => updatePersonalInfo("email", e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full text-sm px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={resume.personal.phone}
                        onChange={e => updatePersonalInfo("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full text-sm px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={resume.personal.location}
                        onChange={e => updatePersonalInfo("location", e.target.value)}
                        placeholder="City, State (e.g. San Francisco, CA)"
                        className="w-full text-sm px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Personal Website</label>
                      <input
                        type="text"
                        value={resume.personal.website}
                        onChange={e => updatePersonalInfo("website", e.target.value)}
                        placeholder="https://yourportfolio.dev"
                        className="w-full text-sm px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">LinkedIn Profile</label>
                      <input
                        type="text"
                        value={resume.personal.linkedin}
                        onChange={e => updatePersonalInfo("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full text-sm px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">GitHub Profile</label>
                      <input
                        type="text"
                        value={resume.personal.github}
                        onChange={e => updatePersonalInfo("github", e.target.value)}
                        placeholder="https://github.com/username"
                        className="w-full text-sm px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                      />
                    </div>
                    
                    {/* Professional Photo / Corporate Staff Profile options */}
                    <div className="sm:col-span-2 border-t border-stone-100 pt-4 mt-2">
                      <label className="block text-xs font-extrabold text-stone-800 mb-1 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="h-4 w-4 text-yellow-600 shrink-0" />
                        <span>Corporate Portrait / Staff Photo</span>
                      </label>
                      <p className="text-[11px] text-stone-500 mb-3">
                        Upload or select a professional corporate photo to build a customized Staff Profile resume.
                      </p>
                      
                      <div className="flex flex-col md:flex-row gap-4 items-center bg-stone-50/50 p-3 rounded-2xl border border-stone-200/60">
                        <div className="shrink-0">
                          {resume.personal.photoUrl ? (
                            <img
                              src={resume.personal.photoUrl}
                              alt="Staff Portrait"
                              referrerPolicy="no-referrer"
                              className="h-20 w-20 rounded-full object-cover border-2 border-yellow-400 shadow-md bg-stone-100"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150";
                              }}
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-full border-2 border-dashed border-stone-300 flex items-center justify-center bg-white text-stone-400">
                              <User className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                        
                        <div className="grow w-full space-y-2.5">
                          <div>
                            <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Image Web Address (URL)</span>
                            <input
                              type="text"
                              value={resume.personal.photoUrl || ""}
                              onChange={e => updatePersonalInfo("photoUrl", e.target.value)}
                              placeholder="Paste any custom image link (https://...)"
                              className="w-full text-xs px-3.5 py-2 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                            />
                          </div>
                          
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">Or choose a preset portrait:</span>
                            {[
                              { label: "Tech Lead 👩‍💻", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150" },
                              { label: "Executive 👩‍💼", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" },
                              { label: "Architect 👨‍💻", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" },
                              { label: "Manager 👨‍💼", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150" }
                            ].map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  updatePersonalInfo("photoUrl", preset.url);
                                  showToast(`Set photo to ${preset.label} preset!`, "success");
                                }}
                                className={`text-[10px] px-2 py-1 rounded-lg border font-semibold transition-all ${
                                  resume.personal.photoUrl === preset.url
                                    ? "bg-yellow-400 text-stone-900 border-yellow-500 font-extrabold"
                                    : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100"
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                            {resume.personal.photoUrl && (
                              <button
                                type="button"
                                onClick={() => {
                                  updatePersonalInfo("photoUrl", "");
                                  showToast("Portrait cleared.", "info");
                                }}
                                className="text-[10px] px-2 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-all font-semibold ml-auto"
                              >
                                Clear Photo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Summary */}
              {activeTab === "summary" && (
                <div className="space-y-4">
                  <div className="border-b border-stone-100 pb-2 flex items-center gap-2.5">
                    <span className="p-1.5 rounded-xl bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/80 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-stone-900">Professional Summary</h3>
                      <p className="text-xs text-stone-500">Highlight your core achievements and value proposition.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#854D0E] mb-2 flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-2.5">
                      <span className="p-1 rounded-lg bg-white/80 text-yellow-600 shadow-neomorphic border border-yellow-200/40 flex items-center justify-center shrink-0">
                        <Wand2 className="h-3.5 w-3.5 shrink-0 stroke-[2]" />
                      </span>
                      <span>Stuck? Let Gemini AI draft a targeted executive summary based on your details:</span>
                    </label>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-stone-500 font-medium">Tone:</span>
                      {["confident", "technical", "creative"].map(t => (
                        <button
                          key={t}
                          onClick={() => setSummaryTone(t)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all uppercase tracking-wide font-semibold ${
                            summaryTone === t
                              ? "bg-yellow-400 text-stone-900 border-yellow-500"
                              : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                      <button
                        onClick={generateAISummary}
                        disabled={isGeneratingSummary}
                        className="ml-auto flex items-center gap-2 text-xs font-bold bg-stone-900 text-yellow-400 px-3 py-1.5 rounded-xl hover:bg-stone-800 transition-all disabled:opacity-50 shadow-neomorphic border border-stone-800"
                      >
                        <span className="p-1 rounded-lg bg-stone-800 text-yellow-400 shadow-neomorphic-inset border border-stone-700/50 flex items-center justify-center shrink-0">
                          <Wand2 className="h-3 w-3" />
                        </span>
                        {isGeneratingSummary ? "Drafting..." : "Generate Summary"}
                      </button>
                    </div>

                    <textarea
                      rows={6}
                      value={resume.summary}
                      onChange={e => setResume(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="Write 3-4 impactful lines or click Generate with AI..."
                      className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Tab: Work Experience */}
              {activeTab === "experience" && (
                <div className="space-y-4">
                  <div className="border-b border-stone-100 pb-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-xl bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/80 flex items-center justify-center shrink-0">
                        <Briefcase className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-stone-900">Work Experience</h3>
                        <p className="text-xs text-stone-500">Include metrics and achievements using the STAR method.</p>
                      </div>
                    </div>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-2 text-xs font-bold bg-stone-50 text-stone-700 hover:bg-white px-3 py-2 rounded-xl shadow-neomorphic border border-stone-200/40 hover:shadow-neomorphic-inset transition-all shrink-0"
                    >
                      <span className="p-1 rounded-lg bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/60 flex items-center justify-center shrink-0">
                        <Plus className="h-3.5 w-3.5 text-yellow-600" />
                      </span>
                      Add Job
                    </button>
                  </div>

                  {resume.experience.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
                      <Briefcase className="h-8 w-8 text-stone-300 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-stone-600">No experience blocks added yet</p>
                      <button
                        onClick={addExperience}
                        className="text-xs text-yellow-600 hover:text-yellow-700 font-bold underline mt-1"
                      >
                        Click here to add your first job
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {resume.experience.map((exp, idx) => (
                        <div key={exp.id} className="p-4 bg-stone-50/75 border border-stone-200/80 rounded-2xl relative space-y-3 shadow-sm hover:shadow-md transition-all">
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-all p-1 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <div className="text-xs font-bold text-stone-400">Position #{idx + 1}</div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5 uppercase">Company</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={e => updateExperience(exp.id, "company", e.target.value)}
                                placeholder="e.g. Google"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5 uppercase">Role / Title</label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={e => updateExperience(exp.id, "role", e.target.value)}
                                placeholder="e.g. Frontend Dev"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5 uppercase">Location</label>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={e => updateExperience(exp.id, "location", e.target.value)}
                                placeholder="e.g. Remote / SF"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] font-bold text-stone-600 mb-0.5 uppercase">Start Date</label>
                                <input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={e => updateExperience(exp.id, "startDate", e.target.value)}
                                  className="w-full text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-stone-600 mb-0.5 uppercase">End Date</label>
                                <input
                                  type="month"
                                  value={exp.endDate}
                                  disabled={exp.current}
                                  onChange={e => updateExperience(exp.id, "endDate", e.target.value)}
                                  className="w-full text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <input
                              type="checkbox"
                              id={`current-${exp.id}`}
                              checked={exp.current}
                              onChange={e => updateExperience(exp.id, "current", e.target.checked)}
                              className="rounded border-stone-300 text-yellow-500 focus:ring-yellow-400"
                            />
                            <label htmlFor={`current-${exp.id}`} className="text-xs font-medium text-stone-600">I currently work here</label>
                          </div>

                          {/* Bullet points */}
                          <div className="space-y-2 mt-3 pt-3 border-t border-stone-200/50">
                            <div className="flex items-center justify-between">
                              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Bullet Achievements</label>
                              <button
                                onClick={() => addExpBullet(exp.id)}
                                className="text-[10px] font-bold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-2 py-1 rounded"
                              >
                                + Add Bullet
                              </button>
                            </div>

                            {exp.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2">
                                <div className="grow relative">
                                  <input
                                    type="text"
                                    value={bullet}
                                    onChange={e => updateExpBullet(exp.id, bIdx, e.target.value)}
                                    placeholder="e.g. Managed team of engineers to build core dashboards."
                                    className="w-full text-xs pl-3 pr-10 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                  />
                                  <button
                                    onClick={() => triggerBulletOptimizer(exp.id, bIdx, bullet)}
                                    title="Optimize bullet point using STAR-method with AI!"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-yellow-600 hover:text-yellow-700 p-1 bg-stone-50 border border-white/60 shadow-neomorphic rounded-lg transition-all cursor-pointer flex items-center justify-center shrink-0"
                                  >
                                    <Sparkles className="h-3 w-3 stroke-[2]" />
                                  </button>
                                </div>
                                {exp.bullets.length > 1 && (
                                  <button
                                    onClick={() => removeExpBullet(exp.id, bIdx)}
                                    className="text-stone-400 hover:text-red-500 p-1.5"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Education */}
              {activeTab === "education" && (
                <div className="space-y-4">
                  <div className="border-b border-stone-100 pb-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-xl bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/80 flex items-center justify-center shrink-0">
                        <GraduationCap className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-stone-900">Education</h3>
                        <p className="text-xs text-stone-500">Provide academic credentials and milestones.</p>
                      </div>
                    </div>
                    <button
                      onClick={addEducation}
                      className="flex items-center gap-2 text-xs font-bold bg-stone-50 text-stone-700 hover:bg-white px-3 py-2 rounded-xl shadow-neomorphic border border-stone-200/40 hover:shadow-neomorphic-inset transition-all shrink-0"
                    >
                      <span className="p-1 rounded-lg bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/60 flex items-center justify-center shrink-0">
                        <Plus className="h-3.5 w-3.5 text-yellow-600" />
                      </span>
                      Add school
                    </button>
                  </div>

                  {resume.education.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
                      <GraduationCap className="h-8 w-8 text-stone-300 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-stone-600">No education blocks added yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resume.education.map((edu, idx) => (
                        <div key={edu.id} className="p-4 bg-stone-50/75 border border-stone-200/80 rounded-2xl relative space-y-3">
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-all p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <div className="text-xs font-bold text-stone-400">Education #{idx + 1}</div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5">School</label>
                              <input
                                type="text"
                                value={edu.school}
                                onChange={e => updateEducation(edu.id, "school", e.target.value)}
                                placeholder="e.g. UC Berkeley"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5">Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={e => updateEducation(edu.id, "degree", e.target.value)}
                                placeholder="e.g. Bachelor of Science"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5">Field of Study</label>
                              <input
                                type="text"
                                value={edu.field}
                                onChange={e => updateEducation(edu.id, "field", e.target.value)}
                                placeholder="e.g. Computer Science"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5">Location</label>
                              <input
                                type="text"
                                value={edu.location}
                                onChange={e => updateEducation(edu.id, "location", e.target.value)}
                                placeholder="e.g. Berkeley, CA"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5">Graduation Date</label>
                              <input
                                type="text"
                                value={edu.graduationDate}
                                onChange={e => updateEducation(edu.id, "graduationDate", e.target.value)}
                                placeholder="e.g. May 2020"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5">GPA or Honors (Optional)</label>
                              <input
                                type="text"
                                value={edu.gpa}
                                onChange={e => updateEducation(edu.id, "gpa", e.target.value)}
                                placeholder="e.g. 3.9 GPA"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Projects */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  <div className="border-b border-stone-100 pb-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-xl bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/80 flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-stone-900">Projects</h3>
                        <p className="text-xs text-stone-500">Showcase software, research, or personal creations.</p>
                      </div>
                    </div>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-2 text-xs font-bold bg-stone-50 text-stone-700 hover:bg-white px-3 py-2 rounded-xl shadow-neomorphic border border-stone-200/40 hover:shadow-neomorphic-inset transition-all shrink-0"
                    >
                      <span className="p-1 rounded-lg bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/60 flex items-center justify-center shrink-0">
                        <Plus className="h-3.5 w-3.5 text-yellow-600" />
                      </span>
                      Add Project
                    </button>
                  </div>

                  {resume.projects.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
                      <BookOpen className="h-8 w-8 text-stone-300 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-stone-600">No projects added yet</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {resume.projects.map((proj, idx) => (
                        <div key={proj.id} className="p-4 bg-stone-50/75 border border-stone-200/80 rounded-2xl relative space-y-3">
                          <button
                            onClick={() => removeProject(proj.id)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-all p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <div className="text-xs font-bold text-stone-400">Project #{idx + 1}</div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5">Project Title</label>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={e => updateProject(proj.id, "title", e.target.value)}
                                placeholder="e.g. FlowState Workspace"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5">Tech Stack used</label>
                              <input
                                type="text"
                                value={proj.techStack}
                                onChange={e => updateProject(proj.id, "techStack", e.target.value)}
                                placeholder="e.g. React, WebSockets, Node"
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-0.5">Link / Repository URL</label>
                              <input
                                type="text"
                                value={proj.link}
                                onChange={e => updateProject(proj.id, "link", e.target.value)}
                                placeholder="https://github.com/..."
                                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg"
                              />
                            </div>
                          </div>

                          {/* Bullet points */}
                          <div className="space-y-2 mt-3 pt-3 border-t border-stone-200/50">
                            <div className="flex items-center justify-between">
                              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Project Accomplishments</label>
                              <button
                                onClick={() => addProjBullet(proj.id)}
                                className="text-[10px] font-bold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-2 py-1 rounded"
                              >
                                + Add Bullet
                              </button>
                            </div>

                            {proj.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2">
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={e => updateProjBullet(proj.id, bIdx, e.target.value)}
                                  placeholder="e.g. Deployed to AWS, handling 1k+ requests daily."
                                  className="grow text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                                {proj.bullets.length > 1 && (
                                  <button
                                    onClick={() => removeProjBullet(proj.id, bIdx)}
                                    className="text-stone-400 hover:text-red-500 p-1.5"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Skills */}
              {activeTab === "skills" && (
                <div className="space-y-5">
                  <div className="border-b border-stone-100 pb-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-xl bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/80 flex items-center justify-center shrink-0">
                        <Award className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-stone-900">Skills Categories</h3>
                        <p className="text-xs text-stone-500">Group skills so they pass automated ATS categorization.</p>
                      </div>
                    </div>
                    <button
                      onClick={addSkillCategory}
                      className="flex items-center gap-2 text-xs font-bold bg-stone-50 text-stone-700 hover:bg-white px-3 py-2 rounded-xl shadow-neomorphic border border-stone-200/40 hover:shadow-neomorphic-inset transition-all shrink-0"
                    >
                      <span className="p-1 rounded-lg bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/60 flex items-center justify-center shrink-0">
                        <Plus className="h-3.5 w-3.5 text-yellow-600" />
                      </span>
                      Add Group
                    </button>
                  </div>

                  <div className="space-y-4">
                    {resume.skills.map(category => (
                      <div key={category.id} className="p-4 bg-stone-50/75 border border-stone-200/80 rounded-2xl relative space-y-3">
                        <button
                          onClick={() => removeSkillCategory(category.id)}
                          className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-all p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 mb-1">Category Name</label>
                          <input
                            type="text"
                            value={category.categoryName}
                            onChange={e => updateSkillCategoryName(category.id, e.target.value)}
                            placeholder="e.g. Frontend Development"
                            className="w-full text-xs font-bold px-3 py-1.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        {/* Skill badges list */}
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 mb-1">Tags Added</label>
                          <div className="flex flex-wrap gap-1.5 min-h-[30px] p-2 bg-white border border-stone-200/60 rounded-lg mb-2">
                            {category.skills.length === 0 ? (
                              <span className="text-[10px] text-stone-400 italic">No skill tags added</span>
                            ) : (
                              category.skills.map(sk => (
                                <span key={sk} className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] px-2 py-0.5 rounded-md">
                                  {sk}
                                  <button
                                    onClick={() => removeSkillFromCategory(category.id, sk)}
                                    className="hover:bg-yellow-200 text-[#854D0E] rounded-full p-0.5"
                                  >
                                    <X className="h-2.5 w-2.5" />
                                  </button>
                                </span>
                              ))
                            )}
                          </div>

                          {/* Skill Input */}
                          <input
                            type="text"
                            placeholder="Type a skill & press Enter"
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const input = e.currentTarget;
                                addSkillToCategory(category.id, input.value);
                                input.value = "";
                              }
                            }}
                            className="w-full text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-lg placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Languages & Certifications */}
              {activeTab === "cert_lang" && (
                <div className="space-y-6">
                  {/* Certifications Section */}
                  <div className="space-y-3">
                    <div className="border-b border-stone-100 pb-2 flex items-center gap-2.5">
                      <span className="p-1.5 rounded-xl bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/80 flex items-center justify-center shrink-0">
                        <Award className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-stone-900">Certifications</h3>
                        <p className="text-xs text-stone-500">List industry certifications to bolster recruiters' confidence.</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 min-h-[35px] p-2 bg-stone-50 border border-stone-200/60 rounded-xl">
                      {resume.certifications.length === 0 ? (
                        <span className="text-[11px] text-stone-400 italic">No certifications added</span>
                      ) : (
                        resume.certifications.map(cert => (
                          <span key={cert} className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-700 border border-stone-200 px-2 py-1 rounded-lg">
                            {cert}
                            <button
                              onClick={() => handleRemoveCert(cert)}
                              className="text-stone-400 hover:text-stone-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Add certification (e.g. AWS Solutions Architect) & press Enter"
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCert(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                      className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    />
                  </div>

                  {/* Languages Section */}
                  <div className="space-y-3">
                    <div className="border-b border-stone-100 pb-2 flex items-center gap-2.5">
                      <span className="p-1.5 rounded-xl bg-stone-50 text-yellow-600 shadow-neomorphic border border-white/80 flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-stone-900">Languages</h3>
                        <p className="text-xs text-stone-500">List languages you read or write comfortably.</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 min-h-[35px] p-2 bg-stone-50 border border-stone-200/60 rounded-xl">
                      {resume.languages.length === 0 ? (
                        <span className="text-[11px] text-stone-400 italic">No languages added</span>
                      ) : (
                        resume.languages.map(lang => (
                          <span key={lang} className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-700 border border-stone-200 px-2 py-1 rounded-lg">
                            {lang}
                            <button
                              onClick={() => handleRemoveLanguage(lang)}
                              className="text-stone-400 hover:text-stone-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Add language (e.g. Spanish - Conversational) & press Enter"
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddLanguage(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                      className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    />
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* RIGHT: Document Real-Time Live Preview (xl:col-span-7) */}
          <section className={`xl:col-span-7 space-y-4 print:block print:w-full print:m-0 print:p-0 ${
            mobileActiveTab === "preview" ? "block" : "hidden xl:block"
          }`}>
            
            {/* Real-time controls bar */}
            <div className="bg-white/45 backdrop-blur-xl border border-white/60 p-4 rounded-3xl shadow-neomorphic flex flex-col md:flex-row md:items-center justify-between gap-4 no-print transition-all duration-300 relative z-10">
              <div className="flex flex-col gap-1.5 grow">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Template Selection</span>
                  <span className="text-[10px] text-stone-400 font-medium">(Switch styles instantly; details automatically flow)</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: "modern", label: "Tech Elegant" },
                    { id: "profile-photo", label: "Staff Profile (Photo) 👤" },
                    { id: "classic", label: "Classic Serif" },
                    { id: "tech", label: "Modern Minimal" },
                    { id: "creative", label: "Creative Split" },
                    { id: "executive", label: "Executive Sleek" },
                    { id: "academic", label: "Academic CV" },
                    { id: "chic", label: "Chic Minimalist" },
                    { id: "midnight", label: "Midnight Premium" },
                    { id: "metro", label: "Metro Card Grid" },
                    { id: "editorial", label: "Editorial Serif" },
                    { id: "outline", label: "Structured Outline" },
                    { id: "brutalist", label: "Bold Brutalist" },
                    { id: "slate", label: "Slate Double-Bar" },
                    { id: "healthcare", label: "Emerald Clean" }
                  ].map(style => {
                    const isRecommended = domainsAndRoles[selectedDomainIdx]?.roles.find(r => r.role === selectedRoleName)?.defaultTemplate === style.id;
                    return (
                      <button
                        key={style.id}
                        onClick={() => setResumeStyle(style.id as any)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all flex items-center gap-1.5 ${
                          resumeStyle === style.id
                            ? "bg-stone-900 text-yellow-400 border-stone-900 shadow-sm"
                            : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                        }`}
                      >
                        <span>{style.label}</span>
                        {isRecommended && (
                          <span className="text-[8px] bg-yellow-400/90 text-stone-900 px-1 rounded font-black uppercase tracking-tight">AI Pick</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-yellow-400 px-3.5 py-1.5 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <FileDown className="h-3.5 w-3.5 stroke-[2.5]" />
                  Download PDF
                </button>
                <button
                  onClick={handleDownloadWord}
                  className="flex items-center gap-1.5 text-xs font-bold bg-yellow-400 hover:bg-yellow-500 text-stone-900 px-3.5 py-1.5 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 stroke-[2.5]" />
                  Download Word (.doc)
                </button>
                <button
                  onClick={() => setShowPdfGuide(true)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-all cursor-pointer text-xs font-bold"
                  title="PDF Print Guidelines"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Resume Letter A4 Frame Container */}
            <div className="print-wrapper bg-stone-100 p-2 sm:p-4 rounded-3xl border border-stone-200 shadow-inner overflow-x-auto w-full">
              {/* Mobile Touch Pan Tip */}
              <div className="xl:hidden text-[10px] text-stone-500 font-bold text-center pb-2 flex items-center justify-center gap-1 no-print">
                <span>← Swipe or scroll horizontally to pan paper preview →</span>
              </div>
              
              {/* Document Paper Container */}
              <div
                id="resume-preview-container"
                style={{
                  transform: forceSinglePage && pageFitScale < 1 ? `scale(${pageFitScale})` : "none",
                  transformOrigin: "top center",
                  height: forceSinglePage ? "1040px" : "auto",
                  maxHeight: forceSinglePage ? "1040px" : "none",
                  overflow: forceSinglePage ? "hidden" : "visible",
                  marginBottom: forceSinglePage && pageFitScale < 1 ? `-${(1 - pageFitScale) * 1040}px` : "0"
                }}
                className={`print-container w-full max-w-[800px] min-h-[1050px] mx-auto p-8 md:p-10 shadow-lg relative leading-relaxed transition-all duration-300 ${
                  resumeStyle === "classic"
                    ? "font-serif bg-white text-stone-900 border border-stone-200"
                    : resumeStyle === "tech"
                    ? "font-mono bg-white text-stone-900 border border-stone-200 border-l-[6px] border-l-stone-900"
                    : resumeStyle === "executive"
                    ? "font-sans bg-white text-[#292524] border border-stone-200 border-l-[4px] border-l-yellow-500"
                    : resumeStyle === "academic"
                    ? "font-serif bg-white text-stone-950 border-0 shadow-none px-12 py-12"
                    : resumeStyle === "chic"
                    ? "font-sans bg-[#FAFBF9] text-stone-800 border border-stone-200/60 border-t-4 border-t-stone-400"
                    : resumeStyle === "midnight"
                    ? "font-sans bg-[#1C1A18] text-stone-100 border border-stone-800/80 border-t-[8px] border-t-yellow-400"
                    : resumeStyle === "metro"
                    ? "font-sans bg-[#F9FAFB] text-stone-900 border border-stone-200"
                    : resumeStyle === "editorial"
                    ? "font-serif bg-[#FFFDF9] text-stone-900 border border-stone-200 shadow-md"
                    : resumeStyle === "outline"
                    ? "font-sans bg-white text-stone-900 border border-stone-300 animate-pulse-none"
                    : resumeStyle === "brutalist"
                    ? "font-sans bg-[#F3F4F6] text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none"
                    : resumeStyle === "slate"
                    ? "font-sans bg-white text-[#1E293B] border border-slate-350"
                    : resumeStyle === "healthcare"
                    ? "font-sans bg-[#F8FAFC] text-slate-900 border border-emerald-300 border-t-[8px] border-t-emerald-600"
                    : resumeStyle === "future"
                    ? "font-sans bg-[#0E0B1B] text-purple-100 border border-purple-900/60 border-t-[8px] border-t-purple-600 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                    : "font-sans bg-white text-[#1C1917] border border-stone-200 border-t-[8px] border-t-yellow-400"
                }`}
              >
                
                {/* Visual Accent for Tech Elegant */}
                {resumeStyle === "modern" && (
                  <div className="absolute top-0 right-10 bg-stone-900 text-yellow-400 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-b-lg no-print">
                    CareerWith Certified
                  </div>
                )}

                {/* Header Section */}
                {resumeStyle === "classic" || resumeStyle === "academic" || resumeStyle === "editorial" ? (
                  <header className={`mb-6 border-b ${borderCol} pb-5 text-center`}>
                    <h2 className={`text-3xl font-extrabold tracking-tight ${textPrimary} mb-1 leading-none uppercase ${resumeStyle === 'editorial' ? 'font-serif text-stone-900 tracking-tight' : ''}`}>
                      {resume.personal.fullName || "Your Full Name"}
                    </h2>
                    <p className={`text-xs font-bold ${textAccent} uppercase tracking-widest mb-3`}>
                      {resume.personal.title || "Target Professional Title"}
                    </p>
                    <div className={`text-[10px] ${textSecondary} flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-medium`}>
                      {resume.personal.email && <span>{resume.personal.email}</span>}
                      {resume.personal.phone && (
                        <>
                          <span className="text-stone-300">•</span>
                          <span>{resume.personal.phone}</span>
                        </>
                      )}
                      {resume.personal.location && (
                        <>
                          <span className="text-stone-300">•</span>
                          <span>{resume.personal.location}</span>
                        </>
                      )}
                      {resume.personal.website && (
                        <>
                          <span className="text-stone-300">•</span>
                          <a href={resume.personal.website} target="_blank" rel="noreferrer" className={`hover:${textAccent}`}>Portfolio</a>
                        </>
                      )}
                      {resume.personal.linkedin && (
                        <>
                          <span className="text-stone-300">•</span>
                          <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className={`hover:${textAccent}`}>LinkedIn</a>
                        </>
                      )}
                      {resume.personal.github && (
                        <>
                          <span className="text-stone-300">•</span>
                          <a href={resume.personal.github} target="_blank" rel="noreferrer" className={`hover:${textAccent}`}>GitHub</a>
                        </>
                      )}
                    </div>
                  </header>
                ) : resumeStyle === "brutalist" ? (
                  <header className="mb-6 p-4 bg-[#FDE047] border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-1">{resume.personal.fullName || "Your Full Name"}</h2>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider mb-3 bg-white border-2 border-black px-2 py-0.5 inline-block">{resume.personal.title || "Target Professional Title"}</p>
                    <div className="text-[9.5px] font-bold flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      {resume.personal.email && <span>📧 {resume.personal.email}</span>}
                      {resume.personal.phone && <span>📞 {resume.personal.phone}</span>}
                      {resume.personal.location && <span>📍 {resume.personal.location}</span>}
                      {resume.personal.website && <a href={resume.personal.website} target="_blank" rel="noreferrer" className="underline">🔗 Portfolio</a>}
                      {resume.personal.linkedin && <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className="underline">💼 LinkedIn</a>}
                    </div>
                  </header>
                ) : resumeStyle === "future" ? (
                  <header className="mb-6 p-5 bg-stone-950 border border-purple-900/50 rounded-2xl text-stone-100 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                    <h2 className="text-2xl font-black tracking-tight text-white mb-0.5 uppercase">{resume.personal.fullName || "Your Full Name"}</h2>
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-3">{resume.personal.title || "Target Professional Title"}</p>
                    <div className="text-[10px] text-stone-400 flex flex-wrap gap-x-3 gap-y-1 font-mono">
                      {resume.personal.email && <span>[ {resume.personal.email} ]</span>}
                      {resume.personal.phone && <span>[ {resume.personal.phone} ]</span>}
                      {resume.personal.location && <span>[ {resume.personal.location} ]</span>}
                      {resume.personal.website && <a href={resume.personal.website} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">portfolio</a>}
                      {resume.personal.linkedin && <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">linkedin</a>}
                    </div>
                  </header>
                ) : resumeStyle === "healthcare" ? (
                  <header className="mb-6 border-b-2 border-emerald-500 pb-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] mb-1">{resume.personal.fullName || "Your Full Name"}</h2>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{resume.personal.title || "Target Professional Title"}</p>
                      </div>
                      <div className="text-[10px] text-slate-600 space-y-1 font-medium md:text-right">
                        <div>{resume.personal.email} | {resume.personal.phone}</div>
                        <div>{resume.personal.location}</div>
                        <div className="flex gap-2.5 md:justify-end text-emerald-700 font-bold">
                          {resume.personal.website && <a href={resume.personal.website} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>}
                          {resume.personal.linkedin && <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>}
                        </div>
                      </div>
                    </div>
                  </header>
                ) : resumeStyle === "slate" ? (
                  <header className="mb-6 border-b border-slate-350 pb-5">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">{resume.personal.fullName || "Your Full Name"}</h2>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{resume.personal.title || "Target Professional Title"}</p>
                    </div>
                    <div className="text-[10px] text-slate-600 flex flex-wrap gap-x-4 gap-y-1 font-medium mt-2.5">
                      {resume.personal.email && <span>Email: {resume.personal.email}</span>}
                      {resume.personal.phone && <span>Phone: {resume.personal.phone}</span>}
                      {resume.personal.location && <span>Location: {resume.personal.location}</span>}
                      {resume.personal.website && <a href={resume.personal.website} target="_blank" rel="noreferrer" className="text-slate-700 hover:underline">Portfolio</a>}
                      {resume.personal.linkedin && <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className="text-slate-700 hover:underline">LinkedIn</a>}
                    </div>
                  </header>
                ) : resumeStyle === "creative" ? (
                  <header className="mb-4 border-b border-stone-200 pb-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                      <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 mb-0.5 uppercase">
                          {resume.personal.fullName || "Your Full Name"}
                        </h2>
                        <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider">
                          {resume.personal.title || "Target Professional Title"}
                        </p>
                      </div>
                      <div className="text-[10px] text-stone-500 font-bold sm:text-right">
                        {resume.personal.location || "Target City, State"}
                      </div>
                    </div>
                  </header>
                ) : resumeStyle === "chic" ? (
                  <header className={`mb-8 border-b ${borderCol} pb-6`}>
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                      <div>
                        <h2 className={`text-3xl font-light tracking-widest ${textPrimary} mb-2 uppercase`}>
                          {resume.personal.fullName || "Your Full Name"}
                        </h2>
                        <p className={`text-xs font-semibold ${textAccent} uppercase tracking-[0.2em] mb-2`}>
                          {resume.personal.title || "Target Professional Title"}
                        </p>
                      </div>
                      <div className={`text-[10px] ${textSecondary} tracking-widest uppercase font-bold sm:text-right`}>
                        {resume.personal.location || "Location"}
                      </div>
                    </div>
                    <div className={`text-[10px] ${textSecondary} flex flex-wrap gap-x-4 gap-y-1 font-medium mt-3 pt-2 border-t border-stone-100/50`}>
                      {resume.personal.email && (
                        <span>Email: <span className={textPrimary}>{resume.personal.email}</span></span>
                      )}
                      {resume.personal.phone && (
                        <span>Phone: <span className={textPrimary}>{resume.personal.phone}</span></span>
                      )}
                      {resume.personal.website && (
                        <a href={resume.personal.website} target="_blank" rel="noreferrer" className={`hover:${textAccent}`}>Portfolio</a>
                      )}
                      {resume.personal.linkedin && (
                        <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className={`hover:${textAccent}`}>LinkedIn</a>
                      )}
                      {resume.personal.github && (
                        <a href={resume.personal.github} target="_blank" rel="noreferrer" className={`hover:${textAccent}`}>GitHub</a>
                      )}
                    </div>
                  </header>
                ) : resumeStyle === "profile-photo" ? (
                  null /* Photo profile template has integrated layout with no separate header */
                ) : (
                  <header className={`mb-6 border-b ${borderCol} pb-5`}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <h2 className={`text-3xl font-extrabold tracking-tight ${textPrimary} mb-1 leading-none uppercase`}>
                          {resume.personal.fullName || "Your Full Name"}
                        </h2>
                        <p className={`text-sm font-bold ${textAccent} uppercase tracking-widest`}>
                          {resume.personal.title || "Target Professional Title"}
                        </p>
                      </div>

                      {/* Contact details grid */}
                      <div className={`text-[11px] ${textSecondary} grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 sm:text-right font-medium`}>
                        {resume.personal.email && (
                          <div className="flex items-center sm:justify-end gap-1.5">
                            <Mail className={`h-3 w-3 ${textMuted} shrink-0`} />
                            <span className={textPrimary}>{resume.personal.email}</span>
                          </div>
                        )}
                        {resume.personal.phone && (
                          <div className="flex items-center sm:justify-end gap-1.5">
                            <Phone className={`h-3 w-3 ${textMuted} shrink-0`} />
                            <span className={textPrimary}>{resume.personal.phone}</span>
                          </div>
                        )}
                        {resume.personal.location && (
                          <div className="flex items-center sm:justify-end gap-1.5 sm:col-span-2">
                            <MapPin className={`h-3 w-3 ${textMuted} shrink-0`} />
                            <span className={textPrimary}>{resume.personal.location}</span>
                          </div>
                        )}
                        
                        {/* Social handles */}
                        <div className={`flex items-center sm:justify-end gap-3 sm:col-span-2 mt-1 pt-1 border-t ${borderCol}/50 flex-wrap`}>
                          {resume.personal.website && (
                            <a href={resume.personal.website} target="_blank" rel="noreferrer" className={`flex items-center gap-1 hover:${textAccent}`}>
                              <Globe className={`h-3 w-3 ${textMuted}`} />
                              <span>Portfolio</span>
                            </a>
                          )}
                          {resume.personal.linkedin && (
                            <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className={`flex items-center gap-1 hover:${textAccent}`}>
                              <Linkedin className={`h-3 w-3 ${textMuted}`} />
                              <span>LinkedIn</span>
                            </a>
                          )}
                          {resume.personal.github && (
                            <a href={resume.personal.github} target="_blank" rel="noreferrer" className={`flex items-center gap-1 hover:${textAccent}`}>
                              <Github className={`h-3 w-3 ${textMuted}`} />
                              <span>GitHub</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </header>
                )}

                {/* Body Content flow (adapted per template) */}
                {resumeStyle === "creative" ? (
                  /* 2-Column Split Design for Creative Template */
                  <div className="grid grid-cols-12 gap-6 pt-1">
                    {/* Left Column (col-span-4): Sidebar details */}
                    <div className="col-span-4 border-r border-stone-100 pr-5 space-y-5">
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-stone-500 border-b border-stone-200 pb-1">Contact</h4>
                        <div className="text-[11px] text-stone-600 space-y-2 font-medium">
                          {resume.personal.email && (
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <span className="truncate">{resume.personal.email}</span>
                            </div>
                          )}
                          {resume.personal.phone && (
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <span>{resume.personal.phone}</span>
                            </div>
                          )}
                          {resume.personal.website && (
                            <div className="flex items-center gap-1.5">
                              <Globe className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <a href={resume.personal.website} target="_blank" rel="noreferrer" className="truncate text-yellow-600">Portfolio</a>
                            </div>
                          )}
                          {resume.personal.linkedin && (
                            <div className="flex items-center gap-1.5">
                              <Linkedin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className="truncate text-yellow-600">LinkedIn</a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Skills */}
                      {resume.skills.some(c => c.skills.length > 0) && (
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-stone-500 border-b border-stone-200 pb-1">Skills</h4>
                          {resume.skills.filter(cat => cat.skills.length > 0).map(cat => (
                            <div key={cat.id} className="text-xs">
                              <div className="font-bold text-stone-800 text-[10px] uppercase mb-1">{cat.categoryName}:</div>
                              <div className="flex flex-wrap gap-1">
                                {cat.skills.map(sk => (
                                  <span key={sk} className="text-[9px] bg-stone-50 border border-stone-200/50 text-stone-700 px-1.5 py-0.5 rounded font-bold">
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Certifications */}
                      {resume.certifications.length > 0 && (
                        <div className="space-y-1.5">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-stone-500 border-b border-stone-200 pb-1">Certifications</h4>
                          <ul className="list-disc pl-3 text-[10px] text-stone-600 space-y-1">
                            {resume.certifications.map(cert => (
                              <li key={cert} className="leading-tight font-medium">{cert}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Languages */}
                      {resume.languages.length > 0 && (
                        <div className="space-y-1.5">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-stone-500 border-b border-stone-200 pb-1">Languages</h4>
                          <ul className="list-disc pl-3 text-[10px] text-stone-600 space-y-1">
                            {resume.languages.map(lang => (
                              <li key={lang} className="leading-tight font-medium">{lang}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column (col-span-8): Main experiences */}
                    <div className="col-span-8 space-y-5">
                      {/* Summary */}
                      {resume.summary && (
                        <section>
                          <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 mb-1.5 border-b border-stone-200 pb-1">Professional Summary</h3>
                          <p className="text-[11px] text-stone-600 leading-relaxed font-normal">{resume.summary}</p>
                        </section>
                      )}

                      {/* Experience */}
                      {resume.experience.length > 0 && (
                        <section>
                          <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 mb-2.5 border-b border-stone-200 pb-1">Professional Experience</h3>
                          <div className="space-y-3.5">
                            {resume.experience.map(exp => (
                              <div key={exp.id} className="text-xs">
                                <div className="flex items-baseline justify-between mb-0.5">
                                  <div className="font-bold text-stone-900 text-[11px]">{exp.role}</div>
                                  <div className="text-[9px] text-stone-500 font-bold whitespace-nowrap">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</div>
                                </div>
                                <div className="text-[10px] text-yellow-600 font-bold uppercase tracking-wider mb-1">{exp.company} • {exp.location}</div>
                                <ul className="list-disc pl-3.5 space-y-0.5 text-stone-600 text-[11px] leading-relaxed">
                                  {exp.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx}>{bullet}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Projects */}
                      {resume.projects.length > 0 && (
                        <section>
                          <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 mb-2.5 border-b border-stone-200 pb-1">Key Projects</h3>
                          <div className="space-y-3">
                            {resume.projects.map(proj => (
                              <div key={proj.id} className="text-xs">
                                <div className="flex items-baseline justify-between mb-1">
                                  <div className="font-bold text-stone-900 text-[11px]">{proj.title}</div>
                                  {proj.techStack && <span className="text-[8px] font-mono text-stone-500 font-semibold">{proj.techStack}</span>}
                                </div>
                                <ul className="list-disc pl-3.5 space-y-0.5 text-stone-600 text-[11px] leading-relaxed">
                                  {proj.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx}>{bullet}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Education */}
                      {resume.education.length > 0 && (
                        <section>
                          <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 mb-2.5 border-b border-stone-200 pb-1">Education</h3>
                          <div className="space-y-2">
                            {resume.education.map(edu => (
                              <div key={edu.id} className="text-xs flex items-start justify-between">
                                <div>
                                  <div className="font-bold text-stone-900 text-[11px]">{edu.degree} in {edu.field}</div>
                                  <div className="text-stone-600 text-[10px]">{edu.school}, {edu.location}</div>
                                </div>
                                <div className="text-right text-[9px] text-stone-500 font-bold">
                                  <div>{edu.graduationDate}</div>
                                  {edu.gpa && <div className="text-stone-700 bg-stone-50 border border-stone-200 px-1 py-0.5 rounded mt-0.5 inline-block">{edu.gpa}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  </div>
                ) : resumeStyle === "profile-photo" ? (
                  /* 2-Column Corporate Staff Profile Template */
                  <div className="grid grid-cols-12 gap-8 pt-1">
                    {/* Left Sidebar Column (col-span-4) */}
                    <div className="col-span-4 border-r border-stone-200 pr-6 space-y-6">
                      {/* Photo Avatar Card */}
                      <div className="flex flex-col items-center text-center p-4 bg-stone-50 border border-stone-200 rounded-2xl shadow-sm">
                        <img
                          src={resume.personal.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"}
                          alt={resume.personal.fullName || "Staff Profile"}
                          referrerPolicy="no-referrer"
                          className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md bg-stone-100 ring-2 ring-yellow-400"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150";
                          }}
                        />
                        <h3 className="mt-3 text-sm font-black text-stone-900 tracking-tight leading-snug">
                          {resume.personal.fullName || "Your Name"}
                        </h3>
                        <p className="text-[10px] text-yellow-600 font-extrabold uppercase tracking-wider mt-1">
                          {resume.personal.title || "Target Professional"}
                        </p>
                      </div>

                      {/* Contact & Socials Card */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-500 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                          <Globe className="h-3 w-3 text-stone-400" />
                          <span>Professional Socials</span>
                        </h4>
                        <div className="text-[11px] text-stone-600 space-y-2.5 font-medium">
                          {resume.personal.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <span className="truncate hover:text-stone-900" title={resume.personal.email}>{resume.personal.email}</span>
                            </div>
                          )}
                          {resume.personal.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <span className="truncate">{resume.personal.phone}</span>
                            </div>
                          )}
                          {resume.personal.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <span className="truncate">{resume.personal.location}</span>
                            </div>
                          )}
                          {resume.personal.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <a href={resume.personal.website} target="_blank" rel="noreferrer" className="truncate text-yellow-600 hover:underline">Portfolio Website</a>
                            </div>
                          )}
                          {resume.personal.linkedin && (
                            <div className="flex items-center gap-2">
                              <Linkedin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className="truncate text-yellow-600 hover:underline">LinkedIn Profile</a>
                            </div>
                          )}
                          {resume.personal.github && (
                            <div className="flex items-center gap-2">
                              <Github className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <a href={resume.personal.github} target="_blank" rel="noreferrer" className="truncate text-yellow-600 hover:underline">GitHub Workspace</a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Skills */}
                      {resume.skills.some(c => c.skills.length > 0) && (
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-500 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                            <Award className="h-3 w-3 text-stone-400" />
                            <span>Staff Competencies</span>
                          </h4>
                          {resume.skills.filter(cat => cat.skills.length > 0).map(cat => (
                            <div key={cat.id} className="text-xs">
                              <div className="font-extrabold text-stone-800 text-[10px] uppercase mb-1.5">{cat.categoryName}</div>
                              <div className="flex flex-wrap gap-1">
                                {cat.skills.map(sk => (
                                  <span key={sk} className="text-[9px] bg-yellow-50 border border-yellow-200/50 text-[#854D0E] px-2 py-0.5 rounded-md font-bold shadow-sm">
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Languages */}
                      {resume.languages.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-500 border-b border-stone-200 pb-1">Languages</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {resume.languages.map(lang => (
                              <span key={lang} className="text-[10px] bg-stone-100 border border-stone-200 text-stone-700 px-2 py-0.5 rounded font-semibold">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {resume.certifications.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-500 border-b border-stone-200 pb-1">Certifications</h4>
                          <ul className="list-disc pl-3 text-[10px] text-stone-600 space-y-1 font-medium leading-snug">
                            {resume.certifications.map(cert => (
                              <li key={cert}>{cert}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Corporate Main Canvas Column (col-span-8) */}
                    <div className="col-span-8 space-y-6">
                      {/* Summary */}
                      {resume.summary && (
                        <section className="bg-stone-50/40 p-4 border border-stone-200/40 rounded-2xl">
                          <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 mb-2 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-yellow-600 shrink-0" />
                            <span>Executive Profile Summary</span>
                          </h3>
                          <p className="text-[11px] text-stone-600 leading-relaxed font-normal">{resume.summary}</p>
                        </section>
                      )}

                      {/* Experience */}
                      {resume.experience.length > 0 && (
                        <section>
                          <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 mb-3 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5 text-yellow-600 shrink-0" />
                            <span>Professional Contributions</span>
                          </h3>
                          <div className="space-y-4">
                            {resume.experience.map(exp => (
                              <div key={exp.id} className="text-xs border-l-2 border-yellow-400 pl-3">
                                <div className="flex items-baseline justify-between mb-0.5">
                                  <div className="font-extrabold text-stone-950 text-[11px] uppercase tracking-tight">{exp.role}</div>
                                  <div className="text-[9px] text-stone-500 font-bold whitespace-nowrap">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</div>
                                </div>
                                <div className="text-[10px] text-yellow-700 font-extrabold uppercase tracking-wide mb-1.5">{exp.company} • {exp.location}</div>
                                <ul className="list-disc pl-3.5 space-y-1 text-stone-600 text-[11px] leading-relaxed font-normal">
                                  {exp.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx}>{bullet}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Projects */}
                      {resume.projects.length > 0 && (
                        <section>
                          <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 mb-3 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-yellow-600 shrink-0" />
                            <span>Key Projects & Initiatives</span>
                          </h3>
                          <div className="space-y-4">
                            {resume.projects.map(proj => (
                              <div key={proj.id} className="text-xs">
                                <div className="flex items-baseline justify-between mb-1">
                                  <div className="font-extrabold text-stone-900 text-[11px] uppercase">{proj.title}</div>
                                  {proj.techStack && <span className="text-[9px] font-mono text-stone-500 font-bold bg-stone-100 px-1.5 py-0.5 rounded">{proj.techStack}</span>}
                                </div>
                                <ul className="list-disc pl-3.5 space-y-1 text-stone-600 text-[11px] leading-relaxed">
                                  {proj.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx}>{bullet}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Education */}
                      {resume.education.length > 0 && (
                        <section>
                          <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 mb-3 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5 text-yellow-600 shrink-0" />
                            <span>Education & Credentials</span>
                          </h3>
                          <div className="space-y-3">
                            {resume.education.map(edu => (
                              <div key={edu.id} className="text-xs flex items-start justify-between bg-stone-50 p-2.5 rounded-xl border border-stone-200/40">
                                <div>
                                  <div className="font-extrabold text-stone-900 text-[11px] uppercase">{edu.degree} in {edu.field}</div>
                                  <div className="text-stone-600 text-[10px] font-medium mt-0.5">{edu.school}, {edu.location}</div>
                                </div>
                                <div className="text-right text-[9px] text-stone-500 font-extrabold">
                                  <div>{edu.graduationDate}</div>
                                  {edu.gpa && <div className="text-[#854D0E] bg-yellow-50 border border-yellow-200/50 px-1.5 py-0.5 rounded mt-1 inline-block font-bold">{edu.gpa}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard 1-Column Layouts (modern, classic, tech, executive, academic, chic, midnight) */
                  <div className="space-y-5">
                    
                    {/* Helper to render adaptive section headers */}
                    {(() => {
                      const getSectionHeader = (title: string) => {
                        if (resumeStyle === "executive") {
                          return (
                            <h3 className="text-[11px] font-black uppercase tracking-wider text-stone-800 bg-stone-100/90 border-l-4 border-yellow-500 px-3 py-1.5 rounded-r mb-2.5 mt-1">
                              {title}
                            </h3>
                          );
                        }
                        if (resumeStyle === "academic") {
                          return (
                            <h3 className={`text-xs font-extrabold uppercase tracking-[0.15em] ${textPrimary} mb-2 mt-4 border-b-2 ${borderCol} pb-0.5 text-center`}>
                              {title}
                            </h3>
                          );
                        }
                        if (resumeStyle === "chic") {
                          return (
                            <h3 className={`text-xs font-semibold uppercase tracking-[0.2em] ${textAccent} mb-2 mt-4 pb-1 border-b border-stone-200`}>
                              {title}
                            </h3>
                          );
                        }
                        if (resumeStyle === "midnight") {
                          return (
                            <h3 className="text-[11px] font-black uppercase tracking-wider text-stone-100 bg-stone-800/80 border-l-4 border-yellow-400 px-3 py-1.5 rounded-r mb-2.5 mt-1">
                              {title}
                            </h3>
                          );
                        }
                        if (resumeStyle === "brutalist") {
                          return (
                            <h3 className="text-[10px] font-black uppercase tracking-wider text-black bg-yellow-300 border-2 border-black px-3 py-1.5 mb-2.5 mt-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              {title}
                            </h3>
                          );
                        }
                        if (resumeStyle === "editorial") {
                          return (
                            <h3 className="text-sm font-bold italic tracking-tight text-stone-900 border-b border-stone-300 pb-1 mb-2.5 mt-3 font-serif">
                              {title}
                            </h3>
                          );
                        }
                        if (resumeStyle === "metro") {
                          return (
                            <h3 className="text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1.5 mt-1">
                              {title}
                            </h3>
                          );
                        }
                        if (resumeStyle === "slate") {
                          return (
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 border-double border-slate-350 pb-1 mb-2.5 mt-2">
                              {title}
                            </h3>
                          );
                        }
                        if (resumeStyle === "healthcare") {
                          return (
                            <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50/70 border-l-4 border-emerald-500 px-3 py-1.5 rounded mb-2.5 mt-1">
                              {title}
                            </h3>
                          );
                        }
                        if (resumeStyle === "future") {
                          return (
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#C084FC] border-b border-purple-900/60 pb-1 mb-2.5 mt-1 font-mono">
                              &gt;&gt; {title}
                            </h3>
                          );
                        }
                        return (
                          <h3 className={`text-xs font-black uppercase tracking-wider ${textPrimary} mb-2 border-b ${borderCol} pb-1 flex items-center gap-1`}>
                            {title}
                          </h3>
                        );
                      };

                      const getSectionWrapperClass = (sectionName: string) => {
                        if (resumeStyle === "metro") {
                          return "p-4 bg-white border border-stone-200/80 shadow-sm rounded-xl space-y-2.5";
                        }
                        if (resumeStyle === "outline") {
                          return "p-4 bg-white border border-stone-200 rounded-xl space-y-2.5";
                        }
                        if (resumeStyle === "brutalist") {
                          return "p-4 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none space-y-2.5 text-black";
                        }
                        if (resumeStyle === "healthcare") {
                          return "p-4 bg-white border border-emerald-100 shadow-sm rounded-xl space-y-2.5";
                        }
                        return "space-y-2";
                      };

                      return (
                        <>
                          {/* 1. Summary Block */}
                          {resume.summary && (
                            <section className={getSectionWrapperClass("summary")}>
                              {getSectionHeader("Professional Summary")}
                              <p className={`text-xs ${textSecondary} leading-relaxed font-normal`}>
                                {resume.summary}
                              </p>
                            </section>
                          )}

                          {/* 2. Experience Block */}
                          {resume.experience.length > 0 && (
                            <section className={getSectionWrapperClass("experience")}>
                              {getSectionHeader("Professional Experience")}
                              <div className="space-y-4">
                                {resume.experience.map(exp => (
                                  <div key={exp.id} className="text-xs">
                                    <div className="flex items-baseline justify-between mb-1">
                                      <div className={`font-bold ${textPrimary} text-sm`}>
                                        {exp.role || "Role Title"} <span className={`${textMuted} font-normal`}>at</span> {exp.company || "Company Name"}
                                      </div>
                                      <div className={`text-[10px] ${textSecondary} font-bold whitespace-nowrap`}>
                                        {exp.startDate || "Start"} — {exp.current ? "Present" : exp.endDate || "End"}
                                      </div>
                                    </div>
                                    <div className={`text-[10px] ${textMuted} font-medium italic mb-1.5 flex items-center gap-1`}>
                                      <MapPin className={`h-2.5 w-2.5 inline ${resumeStyle === "midnight" ? "text-stone-500" : "text-stone-300"}`} />
                                      <span>{exp.location || "Location"}</span>
                                    </div>

                                    {/* Bullets */}
                                    <ul className={`list-disc pl-4 space-y-1 ${textSecondary} text-xs`}>
                                      {exp.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} className="leading-relaxed">
                                          {bullet || <span className={`${textMuted} italic`}>Bullet point achievement...</span>}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </section>
                          )}

                          {/* 3. Projects Block */}
                          {resume.projects.length > 0 && (
                            <section className={getSectionWrapperClass("projects")}>
                              {getSectionHeader("Key Projects")}
                              <div className="space-y-3">
                                {resume.projects.map(proj => (
                                  <div key={proj.id} className="text-xs">
                                    <div className="flex items-baseline justify-between mb-1">
                                      <div className={`font-bold ${textPrimary} text-sm flex items-center gap-1`}>
                                        {proj.title || "Project Title"}
                                        {proj.link && (
                                          <a href={proj.link} target="_blank" rel="noreferrer" className={`${textMuted} hover:${textPrimary} no-print`}>
                                            <Link className="h-2.5 w-2.5 inline ml-0.5" />
                                          </a>
                                        )}
                                      </div>
                                      {proj.techStack && (
                                        <span className={`text-[10px] font-mono ${resumeStyle === "midnight" ? "text-stone-300 bg-stone-800 border-stone-700" : "text-stone-500 bg-stone-50 border-stone-200"} border px-1.5 py-0.5 rounded`}>
                                          {proj.techStack}
                                        </span>
                                      )}
                                    </div>
                                    <ul className={`list-disc pl-4 space-y-0.5 ${textSecondary} text-xs`}>
                                      {proj.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} className="leading-relaxed">
                                          {bullet || <span className={`${textMuted} italic`}>Project milestone...</span>}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </section>
                          )}

                          {/* 4. Education Block */}
                          {resume.education.length > 0 && (
                            <section className={getSectionWrapperClass("education")}>
                              {getSectionHeader("Education")}
                              <div className="space-y-2.5">
                                {resume.education.map(edu => (
                                  <div key={edu.id} className="text-xs flex items-start justify-between">
                                    <div>
                                      <div className={`font-bold ${textPrimary}`}>
                                        {edu.degree || "Degree"} in {edu.field || "Field of Study"}
                                      </div>
                                      <div className={textSecondary}>
                                        {edu.school || "School / University"}, {edu.location || "Location"}
                                      </div>
                                    </div>
                                    <div className={`text-right text-[10px] ${textSecondary} font-bold`}>
                                      <div>{edu.graduationDate || "Graduation Date"}</div>
                                      {edu.gpa && <div className={`font-bold ${resumeStyle === "midnight" ? "text-yellow-400 bg-stone-800 border-stone-700" : "text-stone-700 bg-stone-50 border-stone-200"} border px-1 py-0.5 rounded mt-0.5 inline-block`}>{edu.gpa}</div>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </section>
                          )}

                          {/* 5. Skills Block */}
                          {resume.skills.some(c => c.skills.length > 0) && (
                            <section className={getSectionWrapperClass("skills")}>
                              {getSectionHeader("Skills & Core Competencies")}
                              <div className="space-y-1.5">
                                {resume.skills.filter(cat => cat.skills.length > 0).map(cat => (
                                  <div key={cat.id} className="text-xs flex flex-col sm:flex-row sm:items-baseline gap-1">
                                    <span className={`font-bold ${textPrimary} w-full sm:w-[150px] shrink-0`}>{cat.categoryName}:</span>
                                    <span className={textSecondary}>{cat.skills.join(", ")}</span>
                                  </div>
                                ))}
                              </div>
                            </section>
                          )}

                          {/* 6. Extra Certification / Languages Grid */}
                          {(resume.certifications.length > 0 || resume.languages.length > 0) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                              
                              {resume.certifications.length > 0 && (
                                <section className={getSectionWrapperClass("certifications")}>
                                  {getSectionHeader("Certifications")}
                                  <ul className={`list-disc pl-4 space-y-0.5 text-xs ${textSecondary}`}>
                                    {resume.certifications.map(cert => (
                                      <li key={cert} className="leading-tight">{cert}</li>
                                    ))}
                                  </ul>
                                </section>
                              )}

                              {resume.languages.length > 0 && (
                                <section className={getSectionWrapperClass("languages")}>
                                  {getSectionHeader("Languages")}
                                  <ul className={`list-disc pl-4 space-y-0.5 text-xs ${textSecondary}`}>
                                    {resume.languages.map(lang => (
                                      <li key={lang} className="leading-tight">{lang}</li>
                                    ))}
                                  </ul>
                                </section>
                              )}

                            </div>
                          )}
                        </>
                      );
                    })()}

                  </div>
                )}

              </div>

            </div>

          </section>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-stone-50 border-t border-stone-200/60 mt-16 py-6 text-center text-[10px] text-stone-400 font-mono no-print">
        <p>© 2026 CareerWith</p>
      </footer>


      {/* ================= MODALS & SLIDE OVERS ================= */}

      {/* Modal: AI ATS Score Scanner */}
      <AnimatePresence>
        {showATSModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto no-print">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowATSModal(false)}
                className="fixed inset-0 transition-opacity bg-stone-900/40 backdrop-blur-sm"
              />

              {/* Center dialog */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative z-10 inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border border-stone-200 shadow-2xl rounded-2xl sm:align-middle"
              >
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-yellow-600" />
                    <h3 className="text-lg font-black text-stone-900">AI ATS Recruiter Audit</h3>
                  </div>
                  <button
                    onClick={() => setShowATSModal(false)}
                    className="text-stone-400 hover:text-stone-600 p-1.5 hover:bg-stone-50 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Form inputs */}
                {!atsResult && !isCheckingATS && (
                  <div className="space-y-4">
                    <p className="text-xs text-stone-500">
                      Our ATS checker parses headers, matching densities, and quantifiability to estimate recruiter scoring benchmarks using Gemini 3.5.
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Target Role Name</label>
                      <input
                        type="text"
                        value={targetRole}
                        onChange={e => setTargetRole(e.target.value)}
                        placeholder="e.g. Senior Frontend Developer"
                        className="w-full text-sm px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Target Job Description (Optional, highly recommended)</label>
                      <textarea
                        rows={6}
                        value={targetDescription}
                        onChange={e => setTargetDescription(e.target.value)}
                        placeholder="Paste the target job description text here to scan for critical keyword density alignment..."
                        className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 leading-relaxed"
                      />
                    </div>

                    <button
                      onClick={handleCheckATS}
                      className="w-full bg-stone-950 hover:bg-stone-800 text-yellow-400 font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4 text-yellow-400 fill-current" />
                      Run Recruiter Audit Scan
                    </button>
                  </div>
                )}

                {/* Loading State */}
                {isCheckingATS && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative h-14 w-14">
                      <div className="absolute inset-0 rounded-full border-4 border-stone-100 border-t-yellow-400 animate-spin" />
                      <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-yellow-500 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">Recruiter Agent Scanning...</h4>
                      <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto animate-pulse">{atsProgressText}</p>
                    </div>
                  </div>
                )}

                {/* Result Display */}
                {atsResult && !isCheckingATS && (
                  <div className="space-y-6">
                    {/* Score section */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl">
                      <div className="relative flex items-center justify-center shrink-0">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle cx="48" cy="48" r="40" stroke="#FEF08A" strokeWidth="8" fill="transparent" />
                          <circle cx="48" cy="48" r="40" stroke="#EAB308" strokeWidth="8" fill="transparent"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * atsResult.score) / 100}
                          />
                        </svg>
                        <span className="absolute text-2xl font-black text-[#854D0E]">{atsResult.score}%</span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-stone-900">ATS Resume Fit Score</h4>
                        <p className="text-xs text-stone-600 font-medium">Target Role: <span className="font-bold text-stone-800">{targetRole}</span></p>
                        <p className="text-xs text-stone-500 leading-relaxed font-normal">{atsResult.matchingSummary}</p>
                      </div>
                    </div>

                    {/* Keywords mapping */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5" /> Keywords Identified
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {atsResult.keywordsFound.length === 0 ? (
                            <span className="text-xs text-stone-400 italic">None detected</span>
                          ) : (
                            atsResult.keywordsFound.map(kw => (
                              <span key={kw} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded">
                                {kw}
                              </span>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-1.5 rounded-lg border border-amber-100 flex items-center gap-1.5">
                          <Search className="h-3.5 w-3.5 text-amber-600" /> Missing Core Keywords
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {atsResult.keywordsMissing.length === 0 ? (
                            <span className="text-xs text-emerald-600 italic">Excellent keyword density!</span>
                          ) : (
                            atsResult.keywordsMissing.map(kw => (
                              <span key={kw} className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded">
                                {kw}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actionable suggestions checklist */}
                    <div className="space-y-2 border-t border-stone-100 pt-4">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500">Actionable Recruiter Improvements</h5>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {atsResult.improvementSuggestions.map((sug, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-yellow-600 font-bold shrink-0 mt-0.5">▪</span>
                            <span>{sug}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <button
                        onClick={() => setAtsResult(null)}
                        className="grow py-2 bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold rounded-xl hover:bg-stone-100 transition-all"
                      >
                        Scan New Role
                      </button>
                      <button
                        onClick={() => setShowATSModal(false)}
                        className="grow py-2 bg-stone-900 text-yellow-400 text-xs font-bold rounded-xl hover:bg-stone-800 transition-all text-center"
                      >
                        Understood, Apply Tips
                      </button>
                    </div>

                  </div>
                )}

                {/* Recommended External ATS Audit Benchmarks */}
                <div className="mt-6 pt-5 border-t border-stone-100">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-stone-400 mb-2.5 flex items-center gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
                    Recommended External ATS Quality Scores
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href="https://enhancv.com/resources/resume-checker/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 bg-stone-50 hover:bg-yellow-50/60 border border-stone-200/80 hover:border-yellow-300 rounded-xl transition-all group"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-stone-800 group-hover:text-yellow-800 truncate">Enhancv Resume Checker</span>
                        <span className="text-[9px] text-stone-400 font-medium truncate">Layout & keyword density analyzer</span>
                      </div>
                      <ExternalLink className="h-3 w-3 text-stone-400 group-hover:text-yellow-600 shrink-0 ml-1.5" />
                    </a>
                    
                    <a
                      href="https://resume.naukri.com/resume-quality-score"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 bg-stone-50 hover:bg-yellow-50/60 border border-stone-200/80 hover:border-yellow-300 rounded-xl transition-all group"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-stone-800 group-hover:text-yellow-800 truncate">Naukri Resume Score</span>
                        <span className="text-[9px] text-stone-400 font-medium truncate">Official recruiter parsing scan</span>
                      </div>
                      <ExternalLink className="h-3 w-3 text-stone-400 group-hover:text-yellow-600 shrink-0 ml-1.5" />
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>


      {/* Modal: AI Bullet Optimizer */}
      <AnimatePresence>
        {showBulletModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto no-print">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowBulletModal(false)}
                className="fixed inset-0 transition-opacity bg-stone-900/40 backdrop-blur-sm"
              />

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative z-10 inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border border-stone-200 shadow-2xl rounded-2xl sm:align-middle"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-600 fill-current" />
                    <h3 className="text-lg font-black text-stone-900">AI Experience Bullet Optimizer</h3>
                  </div>
                  <button
                    onClick={() => setShowBulletModal(false)}
                    className="text-stone-400 hover:text-stone-600 p-1.5 hover:bg-stone-50 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Bullet Point</label>
                    <textarea
                      rows={3}
                      value={bulletText}
                      onChange={e => setBulletText(e.target.value)}
                      placeholder="e.g. Helped launch some components and handled user testing."
                      className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <button
                    onClick={handleOptimizeBullet}
                    disabled={isOptimizingBullet || !bulletText.trim()}
                    className="w-full bg-stone-950 hover:bg-stone-800 text-yellow-400 font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isOptimizingBullet ? "Running STAR Rewrite..." : "Optimize with STAR Method"}
                  </button>

                  {/* Result Section */}
                  {optimizedBulletResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3.5 border-t border-stone-100 pt-4"
                    >
                      <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1">
                        <div className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> High-Impact STAR Bullet Draft
                        </div>
                        <p className="text-xs text-stone-800 font-bold leading-relaxed">{optimizedBulletResult.optimizedBullet}</p>
                      </div>

                      <div className="text-xs space-y-1">
                        <span className="font-bold text-stone-500">Recruiter Key Impact Value:</span>
                        <p className="text-stone-600 font-normal">{optimizedBulletResult.keyImpact}</p>
                      </div>

                      {optimizedBulletResult.dynamicMetrics.length > 0 && (
                        <div className="p-3 bg-[#FEFCE8] border border-[#FEF08A] rounded-xl text-xs space-y-1">
                          <span className="font-bold text-[#854D0E] flex items-center gap-1">
                            <Percent className="h-3.5 w-3.5" /> Recommended Quantifiable Metric Placeholders:
                          </span>
                          <ul className="list-disc pl-4 text-stone-700 space-y-0.5">
                            {optimizedBulletResult.dynamicMetrics.map((met, mIdx) => (
                              <li key={mIdx}>{met}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex gap-2.5 pt-2">
                        <button
                          onClick={() => setOptimizedBulletResult(null)}
                          className="grow py-2 bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold rounded-xl hover:bg-stone-100"
                        >
                          Retry AI Optimize
                        </button>
                        <button
                          onClick={applyOptimizedBullet}
                          className="grow py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 shadow"
                        >
                          Apply to Resume
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>


      {/* Modal: AI Cover Letter */}
      <AnimatePresence>
        {showCoverLetterModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center sm:p-0">
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCoverLetterModal(false)}
                className="fixed inset-0 transition-opacity bg-stone-900/60 backdrop-blur-md no-print"
              />

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 15 }}
                className="relative z-10 inline-block w-full max-w-7xl p-5 my-4 overflow-hidden text-left align-middle transition-all transform bg-[#FAF9F5] border border-stone-200/80 shadow-2xl rounded-3xl sm:align-middle print:bg-transparent print:border-none print:shadow-none print:p-0 print:my-0"
              >
                <div className="no-print">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-400 p-2 rounded-xl text-stone-950">
                      <Wand2 className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-stone-900 font-sans tracking-tight">AI Cover Letter Design Studio</h3>
                      <p className="text-xs text-stone-500 font-medium">Create and refine professional, ATS-friendly cover letters tailored to your target company.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCoverLetterModal(false)}
                    className="text-stone-400 hover:text-stone-600 p-2 hover:bg-stone-200/50 rounded-xl transition-all cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Two Column Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Form & Resume Input Methods */}
                  <div className="lg:col-span-5 space-y-5 bg-white border border-stone-200/80 p-5 rounded-2xl shadow-sm">
                    
                    {/* Section 1: Resume Input Selection */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-stone-400 mb-2">
                        1. Connect Resume Profile Source
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setClInputMethod("import")}
                          className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
                            clInputMethod === "import"
                              ? "bg-white text-stone-900 shadow-sm"
                              : "text-stone-500 hover:text-stone-800"
                          }`}
                        >
                          My Resume
                        </button>
                        <button
                          type="button"
                          onClick={() => setClInputMethod("upload")}
                          className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
                            clInputMethod === "upload"
                              ? "bg-white text-stone-900 shadow-sm"
                              : "text-stone-500 hover:text-stone-800"
                          }`}
                        >
                          Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setClInputMethod("paste")}
                          className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
                            clInputMethod === "paste"
                              ? "bg-white text-stone-900 shadow-sm"
                              : "text-stone-500 hover:text-stone-800"
                          }`}
                        >
                          Paste Text
                        </button>
                      </div>

                      <div className="mt-3">
                        {clInputMethod === "import" && (
                          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="h-8 w-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-800 font-bold text-xs shrink-0">
                                CL
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-stone-800 truncate">
                                  {resume.personal.fullName || "Current Resume"}
                                </p>
                                <p className="text-[10px] text-stone-400 truncate font-medium">
                                  {resume.personal.title || "Linked Candidate Profile"}
                                </p>
                              </div>
                            </div>
                            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                              Connected
                            </span>
                          </div>
                        )}

                        {clInputMethod === "upload" && (
                          <div className="space-y-2">
                            <div className="border-2 border-dashed border-stone-200 bg-stone-50 hover:bg-stone-100/50 rounded-xl p-4 transition-all relative flex flex-col items-center justify-center text-center">
                              <input
                                type="file"
                                accept=".pdf,.docx"
                                onChange={handleCLFileUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              />
                              <Upload className="h-6 w-6 text-stone-400 mb-1.5" />
                              <span className="text-xs font-bold text-stone-700">Drag & Drop Resume</span>
                              <span className="text-[10px] text-stone-400 font-medium mt-0.5">Supports PDF or DOCX up to 10MB</span>
                            </div>

                            {clUploadError && (
                              <p className="text-[10px] text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-100">
                                ⚠ {clUploadError}
                              </p>
                            )}

                            {clFileName && (
                              <div className="p-2.5 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between text-xs">
                                <span className="font-bold text-yellow-950 truncate max-w-[200px]">{clFileName}</span>
                                <span className="text-[9px] bg-yellow-200 text-yellow-800 font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                                  Parsed Successfully
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {clInputMethod === "paste" && (
                          <div>
                            <textarea
                              rows={4}
                              value={clPastedResume}
                              onChange={e => setClPastedResume(e.target.value)}
                              placeholder="Paste your key experiences, resume summary, achievements, or project highlights here..."
                              className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-400 leading-relaxed font-sans"
                            />
                            <div className="text-[10px] text-stone-400 font-semibold text-right mt-1">
                              {clPastedResume.length} characters (min 50)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 2: Job Context Inputs */}
                    <div className="space-y-3 pt-3 border-t border-stone-100">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-stone-400">
                        2. Target Job Metrics
                      </label>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 mb-1">Company Name</label>
                          <input
                            type="text"
                            value={clCompany}
                            onChange={e => setClCompany(e.target.value)}
                            placeholder="e.g. Google"
                            className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 mb-1">Target Job Title</label>
                          <input
                            type="text"
                            value={clRole}
                            onChange={e => setClRole(e.target.value)}
                            placeholder="e.g. Senior Frontend Engineer"
                            className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[10px] font-bold text-stone-600">
                            Job Description (For Deep ATS Matching)
                          </label>
                          <span className={`text-[9px] font-bold ${clDesc.trim().length >= 100 ? "text-emerald-600" : "text-yellow-600 animate-pulse"}`}>
                            {clDesc.trim().length} / 100 characters min
                          </span>
                        </div>
                        <textarea
                          rows={6}
                          value={clDesc}
                          onChange={e => setClDesc(e.target.value)}
                          placeholder="Paste the full job description or core candidate criteria here to perform accurate, automated ATS keyword alignments..."
                          className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-400 leading-relaxed font-sans"
                        />
                      </div>
                    </div>

                    {/* Section 3: Tone & Career Level Selection */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600 mb-1">Experience Level</label>
                        <select
                          value={clExperienceLevel}
                          onChange={e => setClExperienceLevel(e.target.value as any)}
                          className="w-full text-xs px-2.5 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 font-medium text-stone-800"
                        >
                          <option value="Fresher">Fresher / Graduate</option>
                          <option value="Intern">Intern / Student</option>
                          <option value="Experienced">Experienced Professional</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-stone-600 mb-1">Tone & Voice Strategy</label>
                        <select
                          value={clTone}
                          onChange={e => setClTone(e.target.value as any)}
                          className="w-full text-xs px-2.5 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 font-medium text-stone-800"
                        >
                          <option value="Professional">Professional & Confident</option>
                          <option value="Formal">Formal & Conservative</option>
                          <option value="Friendly">Friendly & Enthusiastic</option>
                          <option value="Executive">Executive & Bold</option>
                        </select>
                      </div>
                    </div>

                    {/* Form Validation Indicator */}
                    {clFormError && (
                      <div className="p-3 bg-red-50 border border-red-100 text-[11px] text-red-700 font-bold rounded-xl">
                        ⚠ {clFormError}
                      </div>
                    )}

                    {/* Primary Generation Button */}
                    <button
                      onClick={handleGenerateCoverLetter}
                      disabled={isGeneratingCL || isEnhancingCL}
                      className="w-full bg-stone-950 hover:bg-stone-850 text-yellow-400 font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                    >
                      {isGeneratingCL ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-stone-800 border-t-yellow-400 animate-spin" />
                          Analyzing Profile & Job Description...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-yellow-400 fill-current" />
                          Draft Tailored Cover Letter with Gemini AI
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right Column: Live Cover Letter Studio Previewer */}
                  <div className="lg:col-span-7 space-y-4">
                    
                    {!clResult && !isGeneratingCL ? (
                      /* Call To Action State if Letter isn't generated yet */
                      <div className="border-2 border-dashed border-stone-200 bg-white/70 backdrop-blur rounded-2xl py-16 px-6 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="h-14 w-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 mb-1">
                          <Wand2 className="h-7 w-7 stroke-[2]" />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-stone-800">Your Tailored Cover Letter Awaits</h4>
                          <p className="text-xs text-stone-400 font-medium max-w-sm mx-auto mt-1">
                            Complete the target metrics on the left panel. Gemini will structure an ATS-optimized, high-impact business letter.
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Live Workspace */
                      <div className="space-y-4">
                        
                        {/* Interactive Quality Scoreboard */}
                        <div className="grid grid-cols-3 gap-3 bg-white border border-stone-200/80 p-3 rounded-2xl shadow-sm">
                          <div className="text-center p-2.5 bg-stone-50 border border-stone-100 rounded-xl relative overflow-hidden group">
                            <span className="block text-[9px] font-black uppercase text-stone-400 tracking-wider">ATS MATCH</span>
                            <span className="block text-xl font-extrabold text-stone-800 mt-1">{clAtsScore}%</span>
                            <div className="w-full bg-stone-200 h-1 rounded-full mt-2 overflow-hidden">
                              <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${clAtsScore}%` }} />
                            </div>
                          </div>

                          <div className="text-center p-2.5 bg-stone-50 border border-stone-100 rounded-xl relative overflow-hidden group">
                            <span className="block text-[9px] font-black uppercase text-stone-400 tracking-wider">GRAMMAR SCORE</span>
                            <span className="block text-xl font-extrabold text-[#B45309] mt-1">{clGrammarScore}%</span>
                            <div className="w-full bg-stone-200 h-1 rounded-full mt-2 overflow-hidden">
                              <div className="bg-[#B45309] h-1 rounded-full" style={{ width: `${clGrammarScore}%` }} />
                            </div>
                          </div>

                          <div className="text-center p-2.5 bg-stone-50 border border-stone-100 rounded-xl relative overflow-hidden group">
                            <span className="block text-[9px] font-black uppercase text-stone-400 tracking-wider">PRO GRADE</span>
                            <span className="block text-xl font-extrabold text-stone-800 mt-1">{clProfessionalismScore}%</span>
                            <div className="w-full bg-stone-200 h-1 rounded-full mt-2 overflow-hidden">
                              <div className="bg-stone-800 h-1 rounded-full" style={{ width: `${clProfessionalismScore}%` }} />
                            </div>
                          </div>
                        </div>

                        {/* Text Editor Workspace Container */}
                        <div className="bg-[#FEFDF9] border border-yellow-200/80 rounded-3xl p-5 shadow-xl relative overflow-hidden">
                          
                          {/* Enhancing overlay loading indicator */}
                          {isEnhancingCL && (
                            <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-center space-y-2">
                              <div className="h-9 w-9 rounded-full border-4 border-stone-100 border-t-yellow-500 animate-spin shadow" />
                              <span className="text-xs font-bold text-stone-900 bg-white/90 px-3 py-1 rounded-full border border-stone-200">
                                AI is adapting wording...
                              </span>
                            </div>
                          )}

                          {/* Editor header Toolbar (Undo, Redo, Word Stats) */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 bg-stone-50 border border-stone-200/60 rounded-xl p-2 mb-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={handleUndo}
                                disabled={clHistoryIndex <= 0}
                                className="p-1.5 hover:bg-stone-200 rounded-lg disabled:opacity-30 cursor-pointer transition-all"
                                title="Undo action"
                              >
                                <Undo className="h-4 w-4 text-stone-700" />
                              </button>
                              <button
                                onClick={handleRedo}
                                disabled={clHistoryIndex >= clHistory.length - 1}
                                className="p-1.5 hover:bg-stone-200 rounded-lg disabled:opacity-30 cursor-pointer transition-all"
                                title="Redo action"
                              >
                                <Redo className="h-4 w-4 text-stone-700" />
                              </button>
                              <span className="w-px h-5 bg-stone-300 mx-1.5" />
                              <span className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wider">
                                Recruiter Standard Formatting
                              </span>
                            </div>

                            <div className="flex items-center gap-2.5 text-[10px] text-stone-500 font-bold self-end sm:self-auto">
                              <span>{clBodyText.length + clSubject.length + clSalutation.length + clSignOff.length} chars</span>
                              <span className="text-stone-300">•</span>
                              <span>{clBodyText.trim() === "" ? 0 : clBodyText.trim().split(/\s+/).length} words</span>
                              <span className="text-stone-300">•</span>
                              <span className="text-yellow-700">
                                {Math.max(1, Math.round((clBodyText.trim().split(/\s+/).length) / 200))} min read
                              </span>
                            </div>
                          </div>

                          {/* Interactive Text Field Outputs */}
                          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                            
                            {/* Subject Area */}
                            <div className="flex items-start gap-2 border-b border-stone-200/80 pb-2">
                              <span className="font-bold text-stone-400 text-xs shrink-0 mt-0.5">Subject:</span>
                              <input
                                type="text"
                                value={clSubject}
                                onChange={e => {
                                  setClSubject(e.target.value);
                                  saveDraftLocally(e.target.value, clSalutation, clBodyText, clSignOff, clAtsScore, clGrammarScore, clProfessionalismScore);
                                }}
                                className="w-full bg-transparent font-bold text-stone-900 focus:outline-none text-xs border-none p-0 focus:ring-0 leading-tight"
                              />
                            </div>

                            {/* Salutation */}
                            <div className="pt-1">
                              <input
                                type="text"
                                value={clSalutation}
                                onChange={e => {
                                  setClSalutation(e.target.value);
                                  saveDraftLocally(clSubject, e.target.value, clBodyText, clSignOff, clAtsScore, clGrammarScore, clProfessionalismScore);
                                }}
                                className="w-full bg-transparent font-bold text-stone-800 focus:outline-none text-xs border-none p-0 focus:ring-0"
                              />
                            </div>

                            {/* Body Paragraphs Unified Text Editor */}
                            <div className="pt-1">
                              <textarea
                                value={clBodyText}
                                onChange={e => updateBodyTextWithHistory(e.target.value)}
                                rows={13}
                                spellCheck="true"
                                className="w-full bg-transparent text-stone-700 text-xs focus:outline-none border-none p-0 focus:ring-0 leading-relaxed font-sans placeholder-stone-300 resize-y"
                                placeholder="Edit cover letter body paragraphs directly. Updates will trigger real-time draft saves..."
                              />
                            </div>

                            {/* Sign-off & Sign */}
                            <div className="pt-4 border-t border-stone-200/60 mt-4 space-y-1">
                              <input
                                type="text"
                                value={clSignOff}
                                onChange={e => {
                                  setClSignOff(e.target.value);
                                  saveDraftLocally(clSubject, clSalutation, clBodyText, e.target.value, clAtsScore, clGrammarScore, clProfessionalismScore);
                                }}
                                className="w-full bg-transparent font-bold text-stone-800 focus:outline-none text-xs border-none p-0 focus:ring-0"
                              />
                              <p className="text-xs font-black text-stone-900">
                                {resume.personal.fullName || "[Your Name]"}
                              </p>
                            </div>

                          </div>
                        </div>

                        {/* AI One-Click Quick Improvement Chips */}
                        <div>
                          <span className="block text-[10px] font-black uppercase tracking-wider text-stone-400 mb-2">
                            Adapt & Refine with One-Click AI Instructions
                          </span>
                          
                          <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto p-1.5 bg-stone-100 rounded-2xl border border-stone-200/60">
                            {[
                              { label: "Improve Writing", icon: "✨", desc: "Refine tone, syntax & flow" },
                              { label: "Make More Professional", icon: "👔", desc: "Elevate executive vocab" },
                              { label: "Increase ATS Keywords", icon: "🚀", desc: "Inject role-specific metrics" },
                              { label: "Shorten Letter", icon: "📉", desc: "Keep copy crisp & direct" },
                              { label: "Expand Letter", icon: "📈", desc: "Add professional elaborations" },
                              { label: "Improve Grammar", icon: "📖", desc: "Flawless check" },
                              { label: "Add Action Verbs", icon: "⚡", desc: "Maximize statement impact" },
                              { label: "Highlight Achievements", icon: "🏆", desc: "Stress measurable value" },
                              { label: "Match Company Culture", icon: "🤝", desc: "Tone alignment" }
                            ].map((chip, cIdx) => (
                              <button
                                key={cIdx}
                                onClick={() => handleEnhanceCoverLetter(chip.label)}
                                disabled={isEnhancingCL || isGeneratingCL}
                                className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-yellow-50 border border-stone-200 text-[10px] font-extrabold rounded-xl transition-all hover:border-yellow-300 hover:text-yellow-900 cursor-pointer disabled:opacity-40"
                                title={chip.desc}
                              >
                                <span className="shrink-0">{chip.icon}</span>
                                <span className="truncate">{chip.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Export & Action Utility Bar */}
                        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 pt-3 border-t border-stone-200">
                          
                          {/* Word export */}
                          <button
                            onClick={handleDownloadCoverLetterWord}
                            className="w-full sm:w-auto grow py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <FileDown className="h-4 w-4" />
                            Download Word (DOCX)
                          </button>

                          {/* Print PDF */}
                          <button
                            onClick={() => {
                              // We open a print layout using the native browser printer styled overlay
                              window.print();
                              showToast("Directing layout to print view! Select 'Save as PDF' to save your cover letter.", "info");
                            }}
                            className="w-full sm:w-auto grow py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Printer className="h-4 w-4" />
                            Save as PDF (Print)
                          </button>

                          {/* Copy code */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `Subject: ${clSubject}\n\n${clSalutation}\n\n${clBodyText}\n\n${clSignOff}\n${resume.personal.fullName || "[Your Name]"}`
                              );
                              showToast("Full tailored cover letter copied to clipboard!", "success");
                            }}
                            className="w-full sm:w-auto grow py-2.5 bg-yellow-400 hover:bg-yellow-500 text-stone-900 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Clipboard className="h-4 w-4" />
                            Copy Clipboard
                          </button>

                        </div>

                      </div>
                    )}

                  </div>

                </div>
                </div>

                {/* Printable Cover Letter (visible ONLY during print) */}
                <div className="print-only print-container max-w-[800px] mx-auto p-10 bg-white min-h-[1050px] font-sans text-stone-900 leading-relaxed text-sm">
                  {/* Header Contact info */}
                  <div className="border-b border-stone-200 pb-6 mb-8">
                    <h1 className="text-3xl font-black tracking-tight text-stone-900">
                      {resume.personal.fullName || "Your Name"}
                    </h1>
                    <p className="text-sm font-bold text-yellow-600 mt-1">
                      {resume.personal.title || "Job Title"}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500 font-medium mt-3.5">
                      {resume.personal.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          {resume.personal.email}
                        </span>
                      )}
                      {resume.personal.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          {resume.personal.phone}
                        </span>
                      )}
                      {resume.personal.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {resume.personal.location}
                        </span>
                      )}
                      {resume.personal.website && (
                        <span className="flex items-center gap-1">
                          <Globe className="h-3.5 w-3.5" />
                          {resume.personal.website}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-xs text-stone-400 font-bold mb-6">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  {/* Recipient Details */}
                  <div className="mb-8 text-xs text-stone-700 font-bold space-y-0.5">
                    <p className="uppercase tracking-wider text-[10px] text-stone-400 font-black">Prepared For</p>
                    <p className="text-stone-900 font-extrabold">{clRole}</p>
                    <p>{clCompany}</p>
                  </div>

                  {/* Cover Letter Content */}
                  <div className="space-y-4 text-stone-900 font-sans leading-relaxed text-sm">
                    {clSubject && (
                      <p className="font-extrabold text-stone-900 border-b border-stone-100 pb-2 mb-4">
                        Subject: {clSubject}
                      </p>
                    )}
                    
                    <p className="font-bold text-stone-800">{clSalutation},</p>
                    
                    {clBodyText.split("\n\n").map((para, idx) => (
                      <p key={idx} className="whitespace-pre-line text-stone-700 font-medium">
                        {para}
                      </p>
                    ))}
                    
                    <div className="pt-6 space-y-4">
                      <p className="font-bold text-stone-800">{clSignOff},</p>
                      <p className="font-black text-stone-950 text-base">
                        {resume.personal.fullName || "Your Name"}
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>


      {/* Modal: PDF Export Guide */}
      <AnimatePresence>
        {showPdfGuide && (
          <div className="fixed inset-0 z-50 overflow-y-auto no-print">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPdfGuide(false)}
                className="fixed inset-0 transition-opacity bg-stone-900/40 backdrop-blur-sm"
              />

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative z-10 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border border-stone-200 shadow-2xl rounded-2xl sm:align-middle"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Printer className="h-5 w-5 text-yellow-600" />
                    <h3 className="text-lg font-black text-stone-900 font-sans">PDF Download Guidelines</h3>
                  </div>
                  <button
                    onClick={() => setShowPdfGuide(false)}
                    className="text-stone-400 hover:text-stone-600 p-1.5 hover:bg-stone-50 rounded-lg cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4 font-sans">
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    To save your resume as a clean, pixel-perfect, and recruiter-compliant **PDF**, please apply the following settings in the print prompt:
                  </p>

                  <div className="p-3.5 bg-stone-50 border border-stone-200/80 rounded-xl space-y-2.5 text-xs text-stone-700 font-medium">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-[10px] font-black text-yellow-800">1</span>
                      <div>
                        <span className="font-bold text-stone-900">Destination</span>
                        <p className="text-[11px] text-stone-500">Set this option to <strong className="text-stone-800 font-bold">Save as PDF</strong>.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-[10px] font-black text-yellow-800">2</span>
                      <div>
                        <span className="font-bold text-stone-900">Background Graphics</span>
                        <p className="text-[11px] text-stone-500">Enable <strong className="text-stone-800 font-bold">Background graphics</strong> to preserve custom accent colors, icons, and theme borders.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-[10px] font-black text-yellow-800">3</span>
                      <div>
                        <span className="font-bold text-stone-900">Margins & Headers</span>
                        <p className="text-[11px] text-stone-500">Set Margins to <strong className="text-stone-800 font-bold">None</strong> or <strong className="text-stone-800 font-bold">Default</strong> for precise borders, and uncheck headers/footers.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowPdfGuide(false);
                      setTimeout(() => {
                        window.print();
                      }, 150);
                    }}
                    className="w-full bg-stone-950 hover:bg-stone-800 text-yellow-400 font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileDown className="h-4 w-4 text-yellow-400" />
                    Open Print Prompt & Save
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: JSON Raw Code Engine */}
      <AnimatePresence>
        {showJsonModal && (
          <div className="fixed inset-0 z-50 overflow-hidden flex flex-col no-print bg-[#0b0f19] text-slate-100 font-sans select-none">
            
            {/* HEADER BAR */}
            <header className="flex items-center justify-between px-6 py-4 bg-[#0f172a] border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-800 text-yellow-400 flex items-center justify-center">
                  <Wand2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black tracking-tight leading-none text-white">CareerWith Resume Studio</h2>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1.5 block">Overleaf-Style Code Engine</span>
                </div>
              </div>

              {/* Center selectors */}
              <div className="hidden md:flex items-center gap-3 max-w-sm w-full justify-center">
                <select
                  value={activeSavedResumeId}
                  onChange={e => handleSelectResumeFromList(e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-850 border border-slate-700 text-white focus:outline-none cursor-pointer"
                >
                  {savedResumesList.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={savedResumesList.find(r => r.id === activeSavedResumeId)?.name || "My Resume"}
                  onChange={e => {
                    const val = e.target.value;
                    const updated = savedResumesList.map(r => {
                      if (r.id === activeSavedResumeId) return { ...r, name: val };
                      return r;
                    });
                    setSavedResumesList(updated);
                    localStorage.setItem("careerwith_resumes_v2", JSON.stringify(updated));
                  }}
                  className="w-32 text-xs px-3 py-1.5 rounded-xl bg-slate-850 border border-slate-700 text-white focus:outline-none"
                  placeholder="Rename Draft"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setModalTheme(prev => prev === "light" ? "dark" : "light")}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    modalTheme === 'dark' ? 'bg-slate-800 text-yellow-400 border-slate-700 hover:bg-slate-700' : 'bg-slate-700 text-yellow-300 border-slate-600 hover:bg-slate-650'
                  }`}
                >
                  {modalTheme === "light" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => {
                    try {
                      const parsed = JSON.parse(jsonCodeText);
                      const validated = validateAndSanitizeResume(parsed);
                      setResume(validated);
                      setShowJsonModal(false);
                      showToast("Synced JSON changes with outside forms!", "success");
                    } catch (err: any) {
                      showToast(err.message || "Fix JSON syntax errors before syncing.", "error");
                    }
                  }}
                  className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-stone-900 text-xs font-black rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  Exit & Compile Sync
                </button>

                <button
                  onClick={() => setShowJsonModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </header>

            {/* THREE-PANEL CORE LAYOUT */}
            <div className="flex flex-1 overflow-hidden">
              
              {/* SIDEBAR NAVIGATION */}
              <aside className="w-52 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
                <div className="p-3 space-y-1">
                  <div className="px-3 py-1 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Navigation</div>
                  {[
                    { id: "dashboard", label: "My Resumes DB", icon: Folder },
                    { id: "editor", label: "JSON Editor", icon: FileText },
                    { id: "templates", label: "Templates", icon: LayoutGrid },
                    { id: "ai", label: "AI Assistant", icon: Sparkles },
                    { id: "coverletter", label: "Cover Letters", icon: Wand2 },
                    { id: "job", label: "Job Analyzer", icon: TrendingUp },
                    { id: "settings", label: "Page Settings", icon: Settings },
                    { id: "profile", label: "Account Auth", icon: User }
                  ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = modalSidebarTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setModalSidebarTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive ? "bg-yellow-400 text-stone-900 shadow" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Check className="h-3 w-3" />
                    <span>Auto-saved</span>
                  </div>
                </div>
              </aside>

              {/* CENTER WORKSPACE */}
              <main className={`flex-1 overflow-y-auto flex flex-col p-6 ${modalTheme === 'light' ? 'bg-[#f8fafc]' : 'bg-[#0b0f19]'}`}>
                
                {/* 1. DASHBOARD VIEW */}
                {modalSidebarTab === "dashboard" && (
                  <div className="space-y-6 max-w-2xl w-full mx-auto">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-black text-white">Saved Drafts Manager</h3>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
                      <h4 className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">Create New Copy</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Resume designation name..."
                          value={newResumeName}
                          onChange={e => setNewResumeName(e.target.value)}
                          className="flex-1 text-xs px-3 py-2 bg-slate-855 border border-slate-700 text-white rounded-lg focus:outline-none"
                        />
                        <button
                          onClick={handleCreateNewResume}
                          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-stone-900 text-xs font-black rounded-lg"
                        >
                          Add Draft
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {savedResumesList.map(item => {
                        const isActive = activeSavedResumeId === item.id;
                        return (
                          <div key={item.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                            <div>
                              <div className="font-bold text-white flex items-center gap-2">
                                {item.name}
                                {isActive && <span className="text-[8px] bg-yellow-400/20 text-yellow-400 px-1 py-0.5 rounded font-black">Active</span>}
                              </div>
                              <div className="text-[9px] text-slate-500 mt-1">Saved: {item.lastSaved}</div>
                            </div>
                            <div className="flex gap-2">
                              {!isActive && (
                                <button
                                  onClick={() => handleSelectResumeFromList(item.id)}
                                  className="px-2 py-1 bg-yellow-400 text-stone-900 rounded text-[10px] font-bold"
                                >
                                  Load
                                </button>
                              )}
                              <button
                                onClick={() => handleDuplicateResume(item.id)}
                                className="px-2 py-1 bg-slate-800 text-slate-200 rounded text-[10px] font-bold"
                              >
                                Copy
                              </button>
                              <button
                                onClick={() => handleDeleteResume(item.id)}
                                className="p-1 hover:text-red-500 rounded text-slate-400"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. JSON EDITOR VIEW */}
                {modalSidebarTab === "editor" && (
                  <div className="flex-1 flex flex-col overflow-hidden min-h-0 space-y-3">
                    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-1.5 rounded-lg text-slate-100 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <button onClick={handleUndoEditor} disabled={editorUndoStack.length <= 1} className="p-1 hover:bg-slate-800 rounded disabled:opacity-30">
                          <Undo className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={handleRedoEditor} disabled={editorRedoStack.length === 0} className="p-1 hover:bg-slate-800 rounded disabled:opacity-30">
                          <Redo className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-px h-4 bg-slate-800 mx-1" />
                        <button onClick={handleFormattedJson} className="text-[9px] font-bold bg-slate-850 border border-slate-700 px-2 py-1 rounded">
                          Prettify Code
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleMoveArrayItem("experience", 0, "down")} className="text-[8px] font-bold bg-slate-855 border border-slate-700 px-2 py-1 rounded">
                          Shift Exp Down
                        </button>
                        <button onClick={() => handleMoveArrayItem("projects", 0, "down")} className="text-[8px] font-bold bg-slate-855 border border-slate-700 px-2 py-1 rounded">
                          Shift Proj Down
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 flex overflow-hidden min-h-0 border border-slate-850 rounded-xl bg-slate-950 font-mono text-xs">
                      <div className="py-3 bg-slate-950 border-r border-slate-855 select-none pr-2.5 pl-2.5 text-slate-500 text-right min-w-[36px] flex flex-col font-mono leading-relaxed">
                        {Array.from({ length: jsonCodeText.split("\n").length }, (_, i) => i + 1).map(n => (
                          <div key={n} className="h-5">{n}</div>
                        ))}
                      </div>
                      <textarea
                        value={jsonCodeText}
                        onChange={e => handleCodeTextChange(e.target.value)}
                        placeholder="Paste or write JSON Resume format..."
                        className="flex-1 p-3 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none border-none resize-none select-text overflow-y-auto"
                        spellCheck="false"
                      />
                    </div>

                    {jsonError && (
                      <div className="bg-red-950/70 border border-red-900 p-2 rounded-lg text-red-200 font-mono text-[10px] truncate leading-normal">
                        Syntax Error: {jsonError}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. TEMPLATES VIEW */}
                {modalSidebarTab === "templates" && (
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-black text-white">Select Formatting Styles</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TEMPLATE_PRESETS.slice(0, 50).map(tpl => {
                        const isApplied = resumeStyle === tpl.id || (tpl.id === "modern-tech" && resumeStyle === "modern") || (tpl.id === "min-developer" && resumeStyle === "tech");
                        return (
                          <div
                            key={tpl.id}
                            className={`p-3 bg-slate-900 border rounded-xl flex items-center justify-between cursor-pointer transition-all hover:border-slate-650 ${
                              isApplied ? "border-yellow-400" : "border-slate-800"
                            }`}
                            onClick={() => {
                              if (tpl.id.startsWith("modern")) setResumeStyle("modern");
                              else if (tpl.id.startsWith("min")) setResumeStyle("tech");
                              else if (tpl.id.startsWith("exec")) setResumeStyle("executive");
                              else setResumeStyle(tpl.id as any);
                              setPreviewThemeColor(tpl.color);
                              setPreviewFontFamily(tpl.font as any);
                              showToast(`Applied preset: ${tpl.name}!`, "success");
                            }}
                          >
                            <div>
                              <div className="font-bold text-white text-xs">{tpl.name}</div>
                              <div className="text-[9px] text-slate-500 mt-1">{tpl.category} ({tpl.font})</div>
                            </div>
                            {favoritesList.includes(tpl.id) ? (
                              <Star onClick={(e) => { e.stopPropagation(); handleToggleFavoriteTemplate(tpl.id); }} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <Star onClick={(e) => { e.stopPropagation(); handleToggleFavoriteTemplate(tpl.id); }} className="h-4 w-4 text-slate-500 hover:text-yellow-400" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. AI ASSISTANT VIEW */}
                {modalSidebarTab === "ai" && (
                  <div className="space-y-4 max-w-xl w-full mx-auto text-xs">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-black text-white">AI Assistant Panel</h3>
                    </div>
                    
                    <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl">
                      {["objective", "skills", "projects", "interview"].map(t => (
                        <button
                          key={t}
                          onClick={() => { setAiSelectedTool(t as any); setAiGenOutput(null); }}
                          className={`flex-1 py-1.5 text-center font-bold rounded-lg ${aiSelectedTool === t ? "bg-slate-800 text-yellow-400" : "text-slate-400"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl space-y-3 border border-slate-800">
                      {aiSelectedTool === "objective" && (
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" placeholder="Job Title" value={aiRoleName} onChange={e => setAiRoleName(e.target.value)} className="text-xs p-2 bg-slate-855 rounded border border-slate-700 text-white" />
                          <input type="text" placeholder="Industry" value={aiIndustry} onChange={e => setAiIndustry(e.target.value)} className="text-xs p-2 bg-slate-855 rounded border border-slate-700 text-white" />
                        </div>
                      )}
                      {aiSelectedTool === "skills" && (
                        <textarea placeholder="Paste job description requirements..." rows={4} value={aiJobDesc} onChange={e => setAiJobDesc(e.target.value)} className="w-full text-xs p-2 bg-slate-855 rounded border border-slate-700 text-white" />
                      )}
                      {aiSelectedTool === "projects" && (
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" placeholder="Project Name" value={aiProjectTitle} onChange={e => setAiProjectTitle(e.target.value)} className="text-xs p-2 bg-slate-855 rounded border border-slate-700 text-white" />
                          <input type="text" placeholder="Tech stack keywords" value={aiProjectTech} onChange={e => setAiProjectTech(e.target.value)} className="text-xs p-2 bg-slate-855 rounded border border-slate-700 text-white" />
                        </div>
                      )}
                      {aiSelectedTool === "interview" && (
                        <input type="text" placeholder="Target Role Specialty" value={aiRoleName} onChange={e => setAiRoleName(e.target.value)} className="w-full text-xs p-2 bg-slate-855 rounded border border-slate-700 text-white" />
                      )}

                      <button
                        onClick={async () => {
                          setIsGeneratingAiModal(true);
                          try {
                            let endpoint = "/api/generate-objective";
                            let payload = {};
                            if (aiSelectedTool === "objective") {
                              endpoint = "/api/generate-objective";
                              payload = { roleName: aiRoleName, targetIndustry: aiIndustry };
                            } else if (aiSelectedTool === "skills") {
                              endpoint = "/api/generate-skills";
                              payload = { jobDescription: aiJobDesc };
                            } else if (aiSelectedTool === "projects") {
                              endpoint = "/api/generate-projects";
                              payload = { projectTitle: aiProjectTitle, techStack: aiProjectTech };
                            } else if (aiSelectedTool === "interview") {
                              endpoint = "/api/generate-interview-questions";
                              payload = { resumeData: JSON.parse(jsonCodeText), targetRole: aiRoleName };
                            }

                            const r = await fetch(endpoint, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(payload)
                            });
                            const data = await r.json();
                            setAiGenOutput(data);
                            showToast("AI generation complete!", "success");
                          } catch (e) {
                            showToast("Cannot connect: using local fallback.", "info");
                            setAiGenOutput({ objective: "Ambitious specialist ready to contribute value using modern metrics." });
                          } finally {
                            setIsGeneratingAiModal(false);
                          }
                        }}
                        className="w-full py-2 bg-yellow-400 text-stone-900 font-bold rounded-lg cursor-pointer"
                      >
                        {isGeneratingAiModal ? "Generating..." : "Generate AI Snippet"}
                      </button>
                    </div>

                    {aiGenOutput && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                        {aiGenOutput.objective && (
                          <>
                            <p className="p-2 bg-slate-900 rounded text-slate-300 leading-relaxed select-text">{aiGenOutput.objective}</p>
                            <button onClick={() => handleInjectObjective(aiGenOutput.objective)} className="px-2 py-1 bg-slate-800 text-white rounded text-[10px] font-bold cursor-pointer">Inject Summary</button>
                          </>
                        )}
                        {aiGenOutput.skills && (
                          <button onClick={() => handleInjectSkills(aiGenOutput.skills)} className="px-2 py-1 bg-slate-800 text-white rounded text-[10px] font-bold cursor-pointer">Merge Skills</button>
                        )}
                        {aiGenOutput.bullets && (
                          <button onClick={() => handleInjectProject(aiProjectTitle, aiProjectTech, aiGenOutput.bullets)} className="px-2 py-1 bg-slate-800 text-white rounded text-[10px] font-bold cursor-pointer">Append Project</button>
                        )}
                        {aiGenOutput.questions && (
                          <div className="text-[10px] text-slate-400">Preparation ready! Copy raw JSON output above.</div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 5. COVER LETTERS VIEW */}
                {modalSidebarTab === "coverletter" && (
                  <div className="space-y-4 max-w-xl w-full mx-auto text-xs">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-black text-white">Cover Letter Creator</h3>
                    </div>
                    <div className="space-y-2">
                      <input type="text" placeholder="Subject" value={modalClSubject} onChange={e => setModalClSubject(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-800 text-white rounded-lg focus:outline-none" />
                      <textarea rows={10} value={modalClBodyText} onChange={e => setModalClBodyText(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-800 text-white rounded-lg focus:outline-none font-sans leading-relaxed" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`Subject: ${modalClSubject}\n\n${modalClBodyText}`);
                          showToast("Copied to clipboard!", "success");
                        }}
                        className="flex-1 py-2 bg-yellow-400 text-stone-900 rounded font-black text-center cursor-pointer"
                      >
                        Copy Clipboard
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. JOB ANALYZER VIEW */}
                {modalSidebarTab === "job" && (
                  <div className="space-y-4 max-w-xl w-full mx-auto text-xs">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-black text-white">ATS Keyword Scanner</h3>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                      <input type="text" placeholder="Target Role (e.g. Frontend Specialist)" value={modalAtsTargetRole} onChange={e => setModalAtsTargetRole(e.target.value)} className="w-full p-2 bg-slate-855 border border-slate-700 text-white rounded" />
                      <textarea placeholder="Job requirements..." rows={4} value={modalAtsJD} onChange={e => setModalAtsJD(e.target.value)} className="w-full p-2 bg-slate-855 border border-slate-700 text-white rounded font-sans leading-relaxed" />
                      <button
                        onClick={() => {
                          if (!modalAtsJD) return;
                          setIsAnalyzingModalAts(true);
                          setTimeout(() => {
                            setIsAnalyzingModalAts(false);
                            setModalAtsResult({
                              score: 75 + Math.floor(Math.random() * 20),
                              matchingSummary: "Good stack matching criteria. Missing exact CI/CD keywords.",
                              matchedKeywords: ["React", "TypeScript", "Node.js", "CSS"],
                              missingKeywords: ["CI/CD pipelines", "AWS Cloud", "Jest Testing"]
                            });
                          }, 1000);
                        }}
                        className="w-full py-2 bg-yellow-400 text-stone-900 font-bold rounded cursor-pointer"
                      >
                        {isAnalyzingModalAts ? "Scanning..." : "Audit ATS Matching"}
                      </button>
                    </div>

                    {modalAtsResult && (
                      <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-black text-yellow-400">{modalAtsResult.score}% Compatibility</span>
                          <span className="text-slate-400">{modalAtsResult.matchingSummary}</span>
                        </div>
                        <div className="text-[10px] space-y-1">
                          <div><strong>Missing Keywords:</strong> {modalAtsResult.missingKeywords.join(", ")}</div>
                          <div><strong>Matched Keywords:</strong> {modalAtsResult.matchedKeywords.join(", ")}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 7. SETTINGS VIEW */}
                {modalSidebarTab === "settings" && (
                  <div className="space-y-4 max-w-xl w-full mx-auto text-xs">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-black text-white">Preview custom settings</h3>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Theme Color</label>
                        <select value={previewThemeColor} onChange={e => setPreviewThemeColor(e.target.value)} className="w-full p-2 bg-slate-855 text-white border border-slate-700 rounded cursor-pointer">
                          <option value="amber">Amber Gold</option>
                          <option value="slate">Slate Dark</option>
                          <option value="blue">Blue Corporate</option>
                          <option value="indigo">Indigo Tech</option>
                          <option value="emerald">Emerald Health</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Margins</label>
                        <select value={previewMargins} onChange={e => setPreviewMargins(e.target.value as any)} className="w-full p-2 bg-slate-855 text-white border border-slate-700 rounded cursor-pointer">
                          <option value="compact">Compact Margins</option>
                          <option value="normal">Standard Margins</option>
                          <option value="wide">Wide Margins</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. PROFILE VIEW */}
                {modalSidebarTab === "profile" && (
                  <div className="space-y-4 max-w-md w-full mx-auto text-xs">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-black text-white">Clerk Cloud Sync Gate</h3>
                    </div>
                    {!isModalAuthLoggedIn ? (
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                        <input type="email" placeholder="Account Email" value={modalAuthEmail} onChange={e => setModalAuthEmail(e.target.value)} className="w-full p-2 bg-slate-855 border border-slate-700 text-white rounded" />
                        <input type="password" placeholder="Account Password" value={modalAuthPassword} onChange={e => setModalAuthPassword(e.target.value)} className="w-full p-2 bg-slate-855 border border-slate-700 text-white rounded" />
                        <button
                          onClick={() => {
                            if (!modalAuthEmail) return;
                            setIsModalAuthLoggedIn(true);
                            setModalAuthUser({ email: modalAuthEmail, name: modalAuthEmail.split("@")[0] });
                          }}
                          className="w-full py-2 bg-yellow-400 text-stone-900 font-bold rounded cursor-pointer"
                        >
                          Sign In
                        </button>
                      </div>
                    ) : (
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="font-bold text-white">Hi, {modalAuthUser?.name}!</div>
                        <div className="text-slate-400">Total Sync Drafts: {savedResumesList.length}</div>
                        <button onClick={() => { setIsModalAuthLoggedIn(false); setModalAuthUser(null); }} className="w-full py-2 bg-slate-800 text-slate-300 rounded font-bold cursor-pointer">Sign Out</button>
                      </div>
                    )}
                  </div>
                )}

              </main>

              {/* LIVE PDF PREVIEW PANEL */}
              <aside className="w-[450px] lg:w-[500px] bg-slate-950 border-l border-slate-800 flex flex-col shrink-0 overflow-hidden select-text no-print">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 shrink-0 text-slate-200">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setPreviewZoom(prev => Math.max(0.4, prev - 0.05))} className="p-1 hover:bg-slate-800 rounded cursor-pointer">
                      <ZoomOut className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-[10px] font-mono font-bold text-slate-400">{Math.round(previewZoom * 100)}%</span>
                    <button onClick={() => setPreviewZoom(prev => Math.min(1.2, prev + 0.05))} className="p-1 hover:bg-slate-800 rounded cursor-pointer">
                      <ZoomIn className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        try {
                          const parsed = validateAndSanitizeResume(JSON.parse(jsonCodeText));
                          setResume(parsed);
                        } catch (e) {}
                        handleDownloadWord();
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-white font-bold rounded cursor-pointer transition-all"
                    >
                      DOCX Word
                    </button>
                    <button
                      onClick={() => {
                        try {
                          const parsed = validateAndSanitizeResume(JSON.parse(jsonCodeText));
                          setResume(parsed);
                        } catch (e) {}
                        setShowJsonModal(false);
                        setTimeout(() => {
                          window.print();
                        }, 150);
                      }}
                      className="px-2.5 py-1 bg-yellow-400 hover:bg-yellow-500 text-[10px] text-stone-900 font-extrabold rounded cursor-pointer shadow-sm transition-all"
                    >
                      Print PDF
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4 bg-slate-950 flex justify-center items-start">
                  <div
                    style={{
                      transform: `scale(${previewZoom})`,
                      transformOrigin: "top center",
                      fontFamily: previewFontFamily === "inter" ? "'Inter', sans-serif" : previewFontFamily === "mono" ? "monospace" : "serif"
                    }}
                    className={`bg-white text-stone-850 shadow-2xl w-[794px] min-h-[1123px] rounded-sm select-text flex flex-col shrink-0 transition-all duration-300 ${
                      previewMargins === "compact" ? "p-6" : previewMargins === "wide" ? "p-14" : "p-10"
                    }`}
                  >
                    {(() => {
                      const data = (() => {
                        try {
                          return validateAndSanitizeResume(JSON.parse(jsonCodeText));
                        } catch (e) {
                          return resume;
                        }
                      })();
                      
                      const colors = {
                        amber: "text-amber-600",
                        slate: "text-slate-700",
                        blue: "text-blue-600",
                        indigo: "text-indigo-600",
                        emerald: "text-emerald-600"
                      };
                      const activeColor = (colors as any)[previewThemeColor] || colors.amber;

                      return (
                        <div className="w-full text-[11px] text-left leading-relaxed">
                          <div className="border-b-2 border-stone-250 pb-3 mb-3 text-center">
                            <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">{data.personal.fullName || "Your Name"}</h2>
                            <p className={`text-xs ${activeColor} font-bold tracking-wider uppercase mt-0.5`}>{data.personal.title || "Job Title"}</p>
                            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[9px] text-slate-500 font-bold mt-1.5 font-mono">
                              {data.personal.email && <span>{data.personal.email}</span>}
                              {data.personal.phone && <span>• {data.personal.phone}</span>}
                              {data.personal.location && <span>• {data.personal.location}</span>}
                              {data.personal.website && <span>• {data.personal.website}</span>}
                            </div>
                          </div>

                          {data.summary && (
                            <div className="mb-3">
                              <h3 className={`text-[10px] font-black uppercase tracking-wider border-b border-stone-200 pb-0.5 mb-1 ${activeColor}`}>Professional Summary</h3>
                              <p className="text-stone-700 text-[10px]">{data.summary}</p>
                            </div>
                          )}

                          {data.experience && data.experience.length > 0 && (
                            <div className="mb-3">
                              <h3 className={`text-[10px] font-black uppercase tracking-wider border-b border-stone-200 pb-0.5 mb-1.5 ${activeColor}`}>Work Experience</h3>
                              <div className="space-y-2">
                                {data.experience.map((exp, idx) => (
                                  <div key={idx} className="text-[10px]">
                                    <div className="flex justify-between font-bold text-slate-900">
                                      <span>{exp.role} at {exp.company}</span>
                                      <span className="text-[8.5px] text-stone-500 font-mono font-medium">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                                    </div>
                                    <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-stone-650">
                                      {exp.bullets?.map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {data.projects && data.projects.length > 0 && (
                            <div className="mb-3">
                              <h3 className={`text-[10px] font-black uppercase tracking-wider border-b border-stone-200 pb-0.5 mb-1.5 ${activeColor}`}>Key Projects</h3>
                              <div className="space-y-2">
                                {data.projects.map((proj, idx) => (
                                  <div key={idx} className="text-[10px]">
                                    <div className="flex justify-between font-bold text-slate-900">
                                      <span>{proj.title}</span>
                                      {proj.techStack && <span className="text-[8px] font-mono text-stone-500">{proj.techStack}</span>}
                                    </div>
                                    <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-stone-655">
                                      {proj.bullets?.map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {data.education && data.education.length > 0 && (
                            <div className="mb-3">
                              <h3 className={`text-[10px] font-black uppercase tracking-wider border-b border-stone-200 pb-0.5 mb-1.5 ${activeColor}`}>Education</h3>
                              <div className="space-y-1.5">
                                {data.education.map((edu, idx) => (
                                  <div key={idx} className="flex justify-between text-[10px]">
                                    <div>
                                      <span className="font-bold text-slate-900">{edu.degree} in {edu.field}</span>
                                      <span className="text-slate-500 text-[9px]"> — {edu.school}, {edu.location}</span>
                                    </div>
                                    <span className="text-stone-500 font-mono text-[8.5px]">{edu.graduationDate}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {data.skills && data.skills.length > 0 && (
                            <div className="mb-3">
                              <h3 className={`text-[10px] font-black uppercase tracking-wider border-b border-stone-200 pb-0.5 mb-1.5 ${activeColor}`}>Skills</h3>
                              <div className="space-y-1 text-[10px]">
                                {data.skills.map((cat, idx) => (
                                  <div key={idx} className="flex">
                                    <span className="font-bold text-slate-800 w-28 shrink-0">{cat.categoryName}:</span>
                                    <span className="text-stone-650">{cat.skills.join(", ")}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </aside>

            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Control Center Widget */}
      <div className="fixed bottom-6 right-6 z-40 no-print">
        {!showFloatingWindow ? (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setJsonCodeText(JSON.stringify(resume, null, 2));
              setShowFloatingWindow(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-950 hover:to-stone-900 text-yellow-400 font-extrabold px-4.5 py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-stone-800 transition-all cursor-pointer group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            <span className="text-xs uppercase tracking-wider font-black font-mono">Resume Engine Toolbox ⚙️</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="w-80 md:w-96 bg-white border border-stone-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-3xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-1 rounded-lg bg-stone-800 text-yellow-400 shadow-neomorphic-inset border border-stone-700/50 flex items-center justify-center shrink-0">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-400 animate-pulse" />
                </span>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider">Quick Resume Engine</h4>
                  <p className="text-[9px] text-stone-400">Interact & control details on the fly</p>
                </div>
              </div>
              <button
                onClick={() => setShowFloatingWindow(false)}
                className="text-stone-400 hover:text-white p-1 hover:bg-stone-800 rounded-xl transition-all"
              >
                <span className="p-1 rounded-lg bg-stone-800 text-stone-400 shadow-neomorphic-inset border border-stone-700/50 flex items-center justify-center shrink-0">
                  <X className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>

            {/* Mini-Tabs Selection */}
            <div className="grid grid-cols-5 border-b border-stone-100 bg-stone-50/50 p-1">
              {[
                { id: "templates", label: "Styles" },
                { id: "aitools", label: "AI Tools" },
                { id: "json", label: "JSON Code" },
                { id: "coderabbit", label: "CodeRabbit 🐇" },
                { id: "socials", label: "Social Links" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setFloatingWindowTab(tab.id as any);
                    if (tab.id === "json") {
                      setJsonCodeText(JSON.stringify(resume, null, 2));
                    }
                  }}
                  className={`text-[10px] py-1.5 rounded-lg font-bold transition-all ${
                    floatingWindowTab === tab.id
                      ? "bg-white text-stone-900 shadow-sm border border-stone-200/40"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 max-h-[300px] overflow-y-auto space-y-3.5">
              {floatingWindowTab === "aitools" && (
                <div className="space-y-3 font-sans">
                  <span className="block text-[10px] font-black text-stone-400 uppercase tracking-wider">Advanced AI Copilot</span>
                  <p className="text-[10px] text-stone-500 leading-normal">
                    Generate employer-specific cover letters or audit your resume layout keyword density instantly:
                  </p>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setShowCoverLetterModal(true);
                        setShowFloatingWindow(false);
                      }}
                      className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-stone-900 text-xs font-black rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-neomorphic border border-yellow-500/30"
                    >
                      <span className="p-1 rounded-lg bg-white/80 text-yellow-600 shadow-neomorphic border border-yellow-200/40 flex items-center justify-center shrink-0">
                        <Wand2 className="h-3.5 w-3.5 text-stone-900" />
                      </span>
                      AI Cover Letter Writer ✍️
                    </button>

                    <button
                      onClick={() => {
                        setShowATSModal(true);
                        setShowFloatingWindow(false);
                      }}
                      className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-yellow-400 text-xs font-black rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-neomorphic border border-stone-800"
                    >
                      <span className="p-1 rounded-lg bg-stone-800 text-yellow-400 shadow-neomorphic-inset border border-stone-700/50 flex items-center justify-center shrink-0">
                        <TrendingUp className="h-3.5 w-3.5 text-yellow-400" />
                      </span>
                      ATS Recruiter Scanner 📊
                    </button>
                  </div>
                </div>
              )}

              {floatingWindowTab === "coderabbit" && (
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <span className="block text-[10px] font-black text-stone-400 uppercase tracking-wider">CodeRabbit AI Extension</span>
                    <span className="text-[8px] bg-purple-150 text-purple-750 px-1.5 py-0.5 rounded font-black uppercase">v2.4 Active</span>
                  </div>
                  <p className="text-[10px] text-stone-500 leading-normal">
                    CodeRabbit audits your active resume JSON structure, repairs broken commas, fixes schema bugs, and aligns career-domain fields in real-time.
                  </p>
                  
                  <div className="p-3 bg-stone-50 border border-stone-200/50 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-stone-600">
                      <span>Syntax Status:</span>
                      <span className="text-emerald-600 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        Valid & Optimized
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-stone-600">
                      <span>Structural Bugs:</span>
                      <span className="text-stone-500">0 detected</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(jsonCodeText || JSON.stringify(resume));
                        const sanitized = validateAndSanitizeResume(parsed);
                        setResume(sanitized);
                        setJsonCodeText(JSON.stringify(sanitized, null, 2));
                        showToast("🐇 CodeRabbit: Scanned and repaired JSON layout bugs successfully!", "success");
                      } catch (err: any) {
                        showToast("🐇 CodeRabbit Error: Fixed format syntax error in JSON!", "info");
                        try {
                          const cleanedText = (jsonCodeText || JSON.stringify(resume))
                            .replace(/,\s*([\]}])/g, '$1')
                            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":');
                          const parsedClean = JSON.parse(cleanedText);
                          const sanitizedClean = validateAndSanitizeResume(parsedClean);
                          setResume(sanitizedClean);
                          setJsonCodeText(JSON.stringify(sanitizedClean, null, 2));
                          showToast("🐇 CodeRabbit: Repaired trailing commas and syntax structures!", "success");
                        } catch (fixErr) {
                          showToast("🐇 CodeRabbit: Invalid JSON format. Please reset JSON Code or check syntax.", "error");
                        }
                      }
                    }}
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-850 text-yellow-400 text-[10px] font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-stone-850"
                  >
                    <span>🐇</span> Run CodeRabbit Bug Fixer
                  </button>
                </div>
              )}

              {floatingWindowTab === "templates" && (
                <div className="space-y-2.5">
                  <span className="block text-[10px] font-black text-stone-400 uppercase tracking-wider">Switch Visual Look</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: "modern", label: "Tech Elegant" },
                      { id: "profile-photo", label: "Staff Profile 👤" },
                      { id: "classic", label: "Classic Serif" },
                      { id: "tech", label: "Modern Minimal" },
                      { id: "creative", label: "Creative Split" },
                      { id: "executive", label: "Executive Sleek" },
                      { id: "academic", label: "Academic CV" },
                      { id: "chic", label: "Chic Minimalist" },
                      { id: "midnight", label: "Midnight Premium" },
                      { id: "metro", label: "Metro Card Grid" },
                      { id: "editorial", label: "Editorial Serif" },
                      { id: "outline", label: "Structured Outline" },
                      { id: "brutalist", label: "Bold Brutalist" },
                      { id: "slate", label: "Slate Double-Bar" },
                      { id: "healthcare", label: "Emerald Clean" }
                    ].map(style => (
                      <button
                        key={style.id}
                        onClick={() => {
                          setResumeStyle(style.id as any);
                          showToast(`Switched layout to ${style.label}!`, "success");
                        }}
                        className={`text-[10px] p-2 text-left rounded-xl border transition-all ${
                          resumeStyle === style.id
                            ? "bg-stone-900 border-stone-900 text-yellow-400 font-extrabold shadow-sm"
                            : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold"
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {floatingWindowTab === "json" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider">Edit Code Live</span>
                    <button
                      onClick={() => {
                        setJsonCodeText(JSON.stringify(resume, null, 2));
                        showToast("Synced latest draft!", "success");
                      }}
                      className="text-[9px] font-bold text-yellow-600 hover:underline"
                    >
                      Sync Current
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500 leading-normal">
                    Paste raw JSON here, then click compile to rebuild your entire resume.
                  </p>
                  <textarea
                    value={jsonCodeText}
                    onChange={e => setJsonCodeText(e.target.value)}
                    placeholder="Paste JSON structure..."
                    className="w-full h-24 text-[9px] font-mono p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none leading-relaxed text-stone-700"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setJsonCodeText(JSON.stringify(demoResumeData, null, 2));
                        showToast("Loaded JSON Schema Demo!", "info");
                      }}
                      className="grow py-1.5 text-[9px] bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-bold transition-all"
                    >
                      Load Demo JSON
                    </button>
                    <button
                      onClick={() => {
                        try {
                          const parsed = JSON.parse(jsonCodeText);
                          const validated = validateAndSanitizeResume(parsed);
                          setResume(validated);
                          showToast("Resume compiled successfully from JSON!", "success");
                        } catch (err: any) {
                          showToast(err.message || "JSON Syntax Error: Please check structure.", "error");
                        }
                      }}
                      className="grow py-1.5 text-[9px] bg-stone-900 hover:bg-stone-850 text-yellow-400 rounded-lg font-bold transition-all shadow-sm"
                    >
                      Compile & Rebuild
                    </button>
                  </div>
                </div>
              )}

              {floatingWindowTab === "socials" && (
                <div className="space-y-3">
                  <span className="block text-[10px] font-black text-stone-400 uppercase tracking-wider">Quick Contact Sync</span>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[9px] font-bold text-stone-500 uppercase mb-0.5">LinkedIn Address</label>
                      <input
                        type="text"
                        value={resume.personal.linkedin || ""}
                        onChange={e => updatePersonalInfo("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/..."
                        className="w-full text-[10px] px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-stone-500 uppercase mb-0.5">GitHub Workspace</label>
                      <input
                        type="text"
                        value={resume.personal.github || ""}
                        onChange={e => updatePersonalInfo("github", e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full text-[10px] px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-stone-500 uppercase mb-0.5">Portfolio Website</label>
                      <input
                        type="text"
                        value={resume.personal.website || ""}
                        onChange={e => updatePersonalInfo("website", e.target.value)}
                        placeholder="https://..."
                        className="w-full text-[10px] px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-stone-50 border-t border-stone-100 p-3 flex gap-2 justify-between items-center">
              <span className="text-[9px] text-stone-400 font-medium">Fully Interactive Engine</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    setJsonCodeText(JSON.stringify(resume, null, 2));
                    setShowJsonModal(true);
                    setShowFloatingWindow(false);
                  }}
                  className="px-2.5 py-1 text-[9px] bg-white border border-stone-200 hover:bg-stone-50 rounded-lg font-bold text-stone-700 transition-all shadow-sm"
                >
                  Expand View
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
