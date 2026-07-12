import { ResumeData } from "./types";

export const demoResumeData: ResumeData = {
  personal: {
    fullName: "Alex Rivera",
    title: "Senior Frontend Engineer",
    email: "alex.rivera@email.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    website: "https://alexrivera.dev",
    linkedin: "https://linkedin.com/in/alex-rivera-frontend",
    github: "https://github.com/alexriveradev",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
  },
  summary: "Highly skilled Senior Frontend Engineer with 6+ years of experience building high-performance, responsive web applications. Expert in React, TypeScript, and modern state management. Passionate about engineering elegant user experiences, optimization of web performance, and mentoring junior engineers.",
  experience: [
    {
      id: "exp-1",
      company: "InnovateTech Solutions",
      role: "Senior Frontend Developer",
      location: "San Francisco, CA",
      startDate: "2023-03",
      endDate: "",
      current: true,
      bullets: [
        "Architected and deployed a multi-tenant enterprise dashboard using React 18, Vite, and Tailwind CSS, reducing initial bundle size by 35% and improving lighthouse performance from 68 to 96.",
        "Led a team of 4 frontend engineers, introducing robust unit testing and CI/CD pipelines that reduced production bugs by 40% and accelerated delivery cycles by 3 weeks.",
        "Implemented secure client-side real-time data sync using WebSockets and optimistic UI updates, resulting in a 25% increase in user engagement."
      ]
    },
    {
      id: "exp-2",
      company: "SaaSify Systems",
      role: "Frontend Engineer",
      location: "Austin, TX",
      startDate: "2020-06",
      endDate: "2023-02",
      current: false,
      bullets: [
        "Re-engineered the core e-commerce checkout flow using Next.js and Redux Toolkit, decreasing cart abandonment by 18% and generating over $1.2M in incremental revenue.",
        "Collaborated with UX/UI designers to build a reusable corporate design system and component library, improving design consistency and cutting UI dev time by 50%."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Berkeley, CA",
      graduationDate: "2020-05",
      gpa: "3.85"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "FlowState Workspace",
      techStack: "React, Tailwind, Node.js, WebSockets",
      link: "https://github.com/alexriveradev/flowstate",
      bullets: [
        "Built a collaborative, real-time board editor featuring sub-second synchronizations and clean drag-and-drop mechanics.",
        "Integrated offline-first localStorage syncing, ensuring users can resume workspace sessions instantly without server loss."
      ]
    }
  ],
  skills: [
    {
      id: "skill-1",
      categoryName: "Languages",
      skills: ["JavaScript (ES6+)", "TypeScript", "HTML5 & CSS3", "GraphQL", "SQL"]
    },
    {
      id: "skill-2",
      categoryName: "Frameworks & Libraries",
      skills: ["React 18", "Next.js", "Redux Toolkit", "Tailwind CSS", "Framer Motion", "Jest / Vitest"]
    },
    {
      id: "skill-3",
      categoryName: "Tools & DevOps",
      skills: ["Git & GitHub", "Vite / Webpack", "Docker", "CI/CD (GitHub Actions)", "AWS (S3/CloudFront)"]
    }
  ],
  languages: ["English (Native)", "Spanish (Conversational)"],
  certifications: [
    "AWS Certified Solutions Architect – Associate (2024)",
    "Meta Front-End Developer Professional Certificate (2021)"
  ]
};
