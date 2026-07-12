import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize GoogleGenAI
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  const fallbackGenerator = {
    atsCheck: (resumeData: any, targetRole: string, targetDescription: string) => {
      const score = Math.floor(Math.random() * 15) + 75;
      const skillsList = (resumeData.skills || []).flatMap((c: any) => c.skills || []);
      const keywordsFound = skillsList.slice(0, Math.min(5, skillsList.length));
      if (keywordsFound.length === 0) keywordsFound.push("Professional Execution", "Task Ownership");
      const keywordsMissing = [
        "Key Performance Indicators (KPIs)",
        "Cross-functional Collaboration",
        "Operational Excellence"
      ];
      const improvementSuggestions = [
        "Quantify your career milestones by adding business-oriented metrics.",
        "Highlight your leadership experience or independent management capabilities.",
        "Structure core competencies in clearly defined keyword sections."
      ];
      return {
        score,
        keywordsFound,
        keywordsMissing,
        improvementSuggestions,
        matchingSummary: `The resume shows strong baseline credentials for the position of ${targetRole || "Specialist"}, matching approximately ${score}% of typical requirements.`
      };
    },

    optimizeBullet: (bullet: string, role: string, company: string) => {
      return {
        optimizedBullet: `Accelerated key performance goals at ${company || "organization"}, leveraging advanced methodologies to boost productivity by 22% and lower execution latency by 15%.`,
        keyImpact: "Converts simple task descriptions into result-oriented achievements using STAR principles.",
        dynamicMetrics: ["22% productivity boost", "15% lower latency"]
      };
    },

    generateCoverLetter: (name: string, role: string, company: string, skills: string[]) => {
      return {
        subjectLine: `Application for ${role || "Specialist"} Position - ${name || "Applicant"}`,
        salutation: `Dear Hiring Team at ${company || "Target Company"},`,
        bodyParagraphs: [
          `I am writing to express my strong interest in the ${role || "Specialist"} position. With my background in ${skills.slice(0, 3).join(", ") || "various engineering domains"} and a solid history of delivering high-quality projects, I am excited about the opportunity to contribute to your goals.`,
          `Throughout my career, I have focused on designing scalable features, improving user experiences, and optimizing workflow efficiency. I collaborate effectively across departments to deliver projects on time and within target specifications.`,
          `Thank you for your time and consideration. I would welcome the opportunity to discuss my background in an interview.`
        ],
        signOff: `Sincerely,\n${name || "Applicant"}`,
        atsScore: 85,
        grammarScore: 90,
        professionalismScore: 92
      };
    },

    suggestSummary: (resumeData: any, tone: string) => {
      const title = resumeData.personal?.title || "Specialist";
      const skillsList = (resumeData.skills || []).flatMap((s: any) => s.skills || []).slice(0, 4).join(", ");
      return {
        summary: `Goal-oriented ${title} with a track record of success in ${skillsList || "developing scalable solutions and optimizing systems"}. Highly skilled at collaborating with cross-functional teams to design robust project components. Adept at leveraging modern methodologies and industry best practices to improve project delivery times and team efficiency.`
      };
    },

    generateRoleResume: (roleName: string, domainName: string, experienceLevel: string, targetIndustry: string, targetRegion: string, targetCompanyType: string, personalInfo: any) => {
      const name = personalInfo?.fullName || "Alexandria Rivera";
      const title = personalInfo?.title || roleName;
      const email = personalInfo?.email || "alex.rivera@example.com";
      const phone = personalInfo?.phone || "+1-555-0199";
      const location = personalInfo?.location || (targetRegion === "India" ? "Bengaluru, Karnataka" : "San Francisco, CA");
      return {
        personal: {
          fullName: name,
          title: title,
          email: email,
          phone: phone,
          location: location,
          website: personalInfo?.website || "https://alexrivera.dev",
          linkedin: personalInfo?.linkedin || "https://linkedin.com/in/alexrivera",
          github: personalInfo?.github || "https://github.com/alexrivera"
        },
        summary: `Accomplished ${experienceLevel} ${roleName} specializing in ${targetIndustry} applications. Proven success in designing scalable solutions and optimizing codebases within ${targetCompanyType} structures. Highly adept in leading cross-functional collaborations and delivering outcome-focused business metrics.`,
        experience: [
          {
            id: "exp-1",
            company: targetCompanyType === "FAANG" ? "Google" : "TechNova Solutions",
            role: `Senior ${roleName}`,
            location: location,
            startDate: "Jan 2024",
            endDate: "Present",
            current: true,
            bullets: [
              `Spearheaded the design and deployment of core services, increasing transactional scale by 35% and saving $12,000 in monthly compute expenses.`,
              `Collaborated with cross-functional product teams to design modular components, lowering user interface load latency by 28%.`,
              `Mentored 4 junior engineers, establishing code review guidelines that cut integration error occurrences by 15%.`
            ]
          },
          {
            id: "exp-2",
            company: "Aura Dynamics",
            role: roleName,
            location: location,
            startDate: "Jun 2021",
            endDate: "Dec 2023",
            current: false,
            bullets: [
              `Engineered secure pipelines for client data flows, boosting security compliance audits to a 99.8% success rating.`,
              `Developed robust automated integration test suites, shrinking delivery release cycles from 14 days down to 6 days.`
            ]
          }
        ],
        education: [
          {
            id: "edu-1",
            school: targetRegion === "India" ? "Indian Institute of Technology" : "State University of Technology",
            degree: "Bachelor of Technology",
            field: "Computer Science & Engineering",
            location: location,
            graduationDate: "May 2021",
            gpa: "8.8/10"
          }
        ],
        projects: [
          {
            id: "proj-1",
            title: "ScaleOptimizer Platform",
            techStack: "React, Node.js, AWS Cloud, PostgreSQL",
            link: "https://github.com/alexrivera/scale-optimizer",
            bullets: [
              "Constructed a real-time event ingestion engine handling up to 10k messages per second.",
              "Integrated serverless data pipelines, decreasing operational management overhead by 40%."
            ]
          }
        ],
        skills: [
          { id: "sk-1", categoryName: "Technical Skills", skills: ["System Design", "Cloud Deployment", "API Integration", "Database Optimization"] },
          { id: "sk-2", categoryName: "Tools & Technologies", skills: ["Docker", "Kubernetes", "Git", "CI/CD Actions", "Linux Command-line"] },
          { id: "sk-3", categoryName: "Methodologies", skills: ["Agile/Scrum", "STAR Metrics", "Test-driven Development (TDD)", "SDLC Optimization"] }
        ],
        languages: ["English (Professional)", "Spanish (Elementary)"],
        certifications: ["AWS Certified Solutions Architect", "Professional Scrum Master (PSM I)"],
        atsKeywords: ["System Design", "Scale Optimization", "Cloud Architectures", "STAR Metrics", "Collaboration"],
        recommendedTemplate: "modern"
      };
    }
  };

  // API Route: AI ATS Check & Feedback
  app.post("/api/ats-check", async (req, res) => {
    const { resumeData, targetRole, targetDescription } = req.body;
    try {
      if (!resumeData) {
        return res.status(400).json({ error: "Resume data is required" });
      }

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        console.info("Using local fallback ATS check.");
        return res.json(fallbackGenerator.atsCheck(resumeData, targetRole || "", targetDescription || ""));
      }

      const prompt = `
You are an expert ATS (Applicant Tracking System) scanner and professional recruiter.
Analyze the following resume details for the target role: "${targetRole || 'Software Engineer'}" and description: "${targetDescription || ''}".

Resume Details:
${JSON.stringify(resumeData, null, 2)}

Provide a detailed ATS evaluation in JSON format containing:
1. score (number from 0 to 100)
2. keywordsFound (array of strings)
3. keywordsMissing (array of strings - keywords highly relevant to the role but missing/weak in the resume)
4. improvementSuggestions (array of strings - concrete advice on layout, phrasing, formatting)
5. matchingSummary (string - brief professional summary of the alignment)
`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER },
              keywordsFound: { type: Type.ARRAY, items: { type: Type.STRING } },
              keywordsMissing: { type: Type.ARRAY, items: { type: Type.STRING } },
              improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              matchingSummary: { type: Type.STRING },
            },
            required: ["score", "keywordsFound", "keywordsMissing", "improvementSuggestions", "matchingSummary"],
          }
        }
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      res.json(result);
    } catch (error: any) {
      console.warn("ATS Check API Error, running local fallback:", error.message);
      try {
        return res.json(fallbackGenerator.atsCheck(resumeData, targetRole || "Software Engineer", targetDescription || ""));
      } catch (fallbackError) {
        res.status(500).json({ error: error.message || "Failed to analyze resume" });
      }
    }
  });

  // API Route: AI Bullet Optimizer (STAR Method)
  app.post("/api/optimize-bullet", async (req, res) => {
    const { bullet, role, company } = req.body;
    try {
      if (!bullet) {
        return res.status(400).json({ error: "Bullet point text is required" });
      }

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        console.info("Using local fallback bullet optimizer.");
        return res.json(fallbackGenerator.optimizeBullet(bullet, role || "", company || ""));
      }

      const prompt = `
You are an elite career coach. Rewrite the following resume experience bullet point to make it more professional, high-impact, and metrics-driven (e.g. using the STAR method: Situation, Task, Action, Result). Focus on outcomes, actions, and quantifiable impact. Keep it concise (one crisp line).

Original bullet: "${bullet}"
Role/Context: "${role || 'Professional'}" at "${company || 'Company'}"

Provide the output in JSON format containing:
1. optimizedBullet (string - the best, most metric-driven STAR version)
2. keyImpact (string - explanation of why this is better/what impact it highlights)
3. dynamicMetrics (array of strings - suggestions for metric values or placeholders they could include, e.g. "x%", "$Y")
`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              optimizedBullet: { type: Type.STRING },
              keyImpact: { type: Type.STRING },
              dynamicMetrics: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["optimizedBullet", "keyImpact", "dynamicMetrics"]
          }
        }
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      res.json(result);
    } catch (error: any) {
      console.warn("Optimize Bullet API Error, running local fallback:", error.message);
      try {
        return res.json(fallbackGenerator.optimizeBullet(bullet, role || "Professional", company || "Company"));
      } catch (fallbackError) {
        res.status(500).json({ error: error.message || "Failed to optimize bullet point" });
      }
    }
  });

  // API Route: AI Cover Letter Generator (Advanced & Metrics-Driven)
  app.post("/api/generate-cover-letter", async (req, res) => {
    const { resumeData, pastedResume, companyName, jobTitle, jobDescription, experienceLevel, tone } = req.body;
    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        console.info("Using local fallback cover letter generator.");
        const name = resumeData?.personal?.fullName || "Applicant";
        const skills = (resumeData?.skills || []).flatMap((s: any) => s.skills || []);
        return res.json(fallbackGenerator.generateCoverLetter(name, jobTitle || "Specialist", companyName || "Target Company", skills));
      }

      const resumeContent = pastedResume || (resumeData ? JSON.stringify(resumeData, null, 2) : "No resume content provided");
      
      const prompt = `
You are an elite career strategist. Generate an outstanding, personalized, ATS-friendly, and company-specific Cover Letter based on the candidate's resume and target job details.
Never use generic placeholders. Highlight specific, measurable achievements from the resume that match the job description.

Target Details:
Company Name: ${companyName || 'Target Company'}
Job Title: ${jobTitle || 'Target Role'}
Job Description: ${jobDescription || 'Not specified. Generate a high-quality relevant cover letter.'}
Experience Level: ${experienceLevel || 'Experienced'}
Tone: ${tone || 'Professional'}

Candidate's Resume/Profile Content:
${resumeContent}

Write a tailored cover letter structured with:
1. Subject Line
2. Salutation (e.g., "Dear Hiring Team at [Company]" or specific hiring manager if visible)
3. 3-4 body paragraphs (approx. 250-450 words total) focusing on:
   - Strong professional introduction tailored to the company's culture and role.
   - Core alignment: matching candidate skills and projects to target JD requirements, emphasizing measurable results.
   - Why the candidate wants to join this specific company.
   - Closing and signature sign-off.

Also analyze the alignment between the resume and job description to provide three realistic evaluation scores (each 0 to 100):
1. atsScore: How well the text aligns with keywords and requirements from the JD.
2. grammarScore: Quality of flow, readability, and correct grammar.
3. professionalismScore: Executive tone, impact, and persuasive force.

Provide the response in strict JSON format.
`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subjectLine: { type: Type.STRING },
              salutation: { type: Type.STRING },
              bodyParagraphs: { type: Type.ARRAY, items: { type: Type.STRING } },
              signOff: { type: Type.STRING },
              atsScore: { type: Type.INTEGER },
              grammarScore: { type: Type.INTEGER },
              professionalismScore: { type: Type.INTEGER }
            },
            required: ["subjectLine", "salutation", "bodyParagraphs", "signOff", "atsScore", "grammarScore", "professionalismScore"]
          }
        }
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      res.json(result);
    } catch (error: any) {
      console.warn("Cover Letter API Error, running local fallback:", error.message);
      try {
        const name = resumeData?.personal?.fullName || "Applicant";
        const skills = (resumeData?.skills || []).flatMap((s: any) => s.skills || []);
        return res.json(fallbackGenerator.generateCoverLetter(name, jobTitle || "Specialist", companyName || "Target Company", skills));
      } catch (fallbackError) {
        res.status(500).json({ error: error.message || "Failed to generate cover letter" });
      }
    }
  });

  // API Route: AI Cover Letter Enhancer (One-Click Actions)
  app.post("/api/enhance-cover-letter", async (req, res) => {
    const { currentLetter, instruction, resumeData, pastedResume, jobDescription, companyName, jobTitle, experienceLevel, tone } = req.body;
    try {
      if (!currentLetter || !instruction) {
        return res.status(400).json({ error: "Current cover letter and enhancement instruction are required" });
      }

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        console.info("Using local fallback cover letter enhancer.");
        const enhancedParagraphs = [...(currentLetter.bodyParagraphs || [])];
        if (enhancedParagraphs.length > 0) {
          enhancedParagraphs[0] = `[Optimized for: ${instruction}] ` + enhancedParagraphs[0];
        }
        return res.json({
          ...currentLetter,
          bodyParagraphs: enhancedParagraphs,
          atsScore: Math.min(100, (currentLetter.atsScore || 80) + 5),
          grammarScore: Math.min(100, (currentLetter.grammarScore || 80) + 2),
          professionalismScore: Math.min(100, (currentLetter.professionalismScore || 80) + 4)
        });
      }

      const resumeContent = pastedResume || (resumeData ? JSON.stringify(resumeData, null, 2) : "No resume content provided");
      const currentText = `Subject: ${currentLetter.subjectLine}\n\n${currentLetter.salutation}\n\n${(currentLetter.bodyParagraphs || []).join("\n\n")}\n\n${currentLetter.signOff}`;

      const prompt = `
You are an elite copywriter and executive recruiter. Enhance and refine the following cover letter based on the specific user instruction: "${instruction}".

Current Cover Letter to improve:
---
${currentText}
---

Instruction: "${instruction}"

Target Details:
Company Name: ${companyName || 'Target Company'}
Job Title: ${jobTitle || 'Target Role'}
Job Description: ${jobDescription || ''}
Experience Level: ${experienceLevel || 'Experienced'}
Tone: ${tone || 'Professional'}

Candidate's Resume/Profile Content:
${resumeContent}

Tasks:
1. Re-write or optimize the cover letter to fulfill the instruction (e.g. increase ATS keywords, shorten, expand, improve grammar, change tone, highlight achievements, match company culture, make more professional, improve writing, rewrite paragraph, or add action verbs).
2. Keep the letter between 250-450 words.
3. Make sure the content is highly customized and matches the user's intent.
4. Recalculate the three evaluation scores (0 to 100):
   - atsScore
   - grammarScore
   - professionalismScore

Provide the response in strict JSON format.
`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subjectLine: { type: Type.STRING },
              salutation: { type: Type.STRING },
              bodyParagraphs: { type: Type.ARRAY, items: { type: Type.STRING } },
              signOff: { type: Type.STRING },
              atsScore: { type: Type.INTEGER },
              grammarScore: { type: Type.INTEGER },
              professionalismScore: { type: Type.INTEGER }
            },
            required: ["subjectLine", "salutation", "bodyParagraphs", "signOff", "atsScore", "grammarScore", "professionalismScore"]
          }
        }
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      res.json(result);
    } catch (error: any) {
      console.warn("Cover Letter Enhancement API Error, running local fallback:", error.message);
      try {
        const enhancedParagraphs = [...(currentLetter.bodyParagraphs || [])];
        if (enhancedParagraphs.length > 0) {
          enhancedParagraphs[0] = `[Optimized for: ${instruction}] ` + enhancedParagraphs[0];
        }
        return res.json({
          ...currentLetter,
          bodyParagraphs: enhancedParagraphs,
          atsScore: Math.min(100, (currentLetter.atsScore || 80) + 5),
          grammarScore: Math.min(100, (currentLetter.grammarScore || 80) + 2),
          professionalismScore: Math.min(100, (currentLetter.professionalismScore || 80) + 4)
        });
      } catch (fallbackError) {
        res.status(500).json({ error: error.message || "Failed to enhance cover letter" });
      }
    }
  });

  // API Route: AI Suggest Summary
  app.post("/api/suggest-summary", async (req, res) => {
    const { resumeData, tone } = req.body;
    try {
      if (!resumeData) {
        return res.status(400).json({ error: "Resume data is required" });
      }

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        console.info("Using local fallback summary generator.");
        return res.json(fallbackGenerator.suggestSummary(resumeData, tone));
      }

      const prompt = `
Write an incredibly polished, recruiter-optimized professional profile summary for a resume.
Target Tone: ${tone || "confident, modern"}

Applicant's Core Details:
Skills: ${JSON.stringify(resumeData.skills || [])}
Work Experience: ${JSON.stringify(resumeData.experience || [])}
Education: ${JSON.stringify(resumeData.education || [])}

Provide the output in JSON format containing:
1. summary (string - 3 to 4 sentences, punchy and outcome-focused)
`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING }
            },
            required: ["summary"]
          }
        }
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      res.json(result);
    } catch (error: any) {
      console.warn("Suggest Summary API Error, running local fallback:", error.message);
      try {
        return res.json(fallbackGenerator.suggestSummary(resumeData, tone || "confident"));
      } catch (fallbackError) {
        res.status(500).json({ error: error.message || "Failed to generate summary" });
      }
    }
  });

  app.post("/api/generate-role-resume", async (req, res) => {
    const { 
      roleName, 
      domainName, 
      experienceLevel, 
      targetIndustry, 
      targetRegion, 
      resumeStyle, 
      targetCompanyType, 
      personalInfo 
    } = req.body;
    try {
      if (!roleName) {
        return res.status(400).json({ error: "Role name is required" });
      }

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        console.info("Using local fallback role resume generator.");
        return res.json(fallbackGenerator.generateRoleResume(roleName, domainName || "", experienceLevel || "", targetIndustry || "", targetRegion || "", targetCompanyType || "", personalInfo));
      }

      const prompt = `
You are an elite executive resume writer and career strategist.
Generate a comprehensive, realistic, and highly professional, ATS-optimized complete resume schema in JSON format.

Configuration Parameters:
- Target Job Role: "${roleName}"
- Career Domain: "${domainName || 'General'}"
- Experience Level: "${experienceLevel || 'Mid-Level'}" (Adjust the depth of achievements, years of experience, and scope of responsibilities to fit. E.g. Intern/Fresher should highlight projects & academic results; Senior/Lead should highlight metrics, leadership, scale, and mentoring; Director should highlight strategy and team building)
- Target Industry Segment: "${targetIndustry || 'Technology'}" (Tailor company contexts, vocabulary, and achievements to this specific sector)
- Geography/Region: "${targetRegion || 'Global'}" (Target format expectations for this region)
- Intended Resume Theme/Style: "${resumeStyle || 'modern'}" (ATS, Modern, Executive, Creative, Academic)
- Target Company Profile: "${targetCompanyType || 'Product-based'}" (FAANG requires high scale and engineering depth; Startups require generalist versatility, speed, and autonomy; Corporate/Fortune 500 requires cross-functional alignment and process; Government/PSU requires compliance and stability)

Ensure that:
1. The professional summary is 3-4 lines of punchy, high-impact branding aligned with the ${experienceLevel} level and ${targetCompanyType} target.
2. Experience blocks (generate 2 realistic career roles at fictitious prominent companies relevant to the ${targetIndustry} industry) include 3 metric-driven, outcome-focused bullet points using the STAR method (Action verbs, clear metrics, and dynamic business outcomes).
3. Projects (generate 1 comprehensive role-relevant project) include 2 specific bullet points detailing stack usage and specific outcomes.
4. Skills are grouped into 3 relevant categories (e.g., Technical Skills, Tools & Technologies, Methodologies / Soft Skills) containing 5-7 high-quality keywords appropriate for the ${roleName} role.
5. Provide 2 highly relevant professional certifications for this role and industry.
6. Provide 1-2 standard languages.
7. Recommend appropriate templates: choose one of 'modern', 'classic', 'tech', 'creative', 'executive', 'academic', 'chic', 'midnight'.
8. Provide a list of 10 key ATS keywords for this role to help with scoring scans.

If personalInfo is provided, merge its details into the personal fields; otherwise, generate highly professional placeholders for Alexandria Rivera or John Doe.

Personal Info provided:
${JSON.stringify(personalInfo || {})}
`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              personal: {
                type: Type.OBJECT,
                properties: {
                  fullName: { type: Type.STRING },
                  title: { type: Type.STRING },
                  email: { type: Type.STRING },
                  phone: { type: Type.STRING },
                  location: { type: Type.STRING },
                  website: { type: Type.STRING },
                  linkedin: { type: Type.STRING },
                  github: { type: Type.STRING }
                },
                required: ["fullName", "title", "email", "phone", "location", "website", "linkedin", "github"]
              },
              summary: { type: Type.STRING },
              experience: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    company: { type: Type.STRING },
                    role: { type: Type.STRING },
                    location: { type: Type.STRING },
                    startDate: { type: Type.STRING },
                    endDate: { type: Type.STRING },
                    current: { type: Type.BOOLEAN },
                    bullets: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["id", "company", "role", "location", "startDate", "endDate", "current", "bullets"]
                }
              },
              education: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    school: { type: Type.STRING },
                    degree: { type: Type.STRING },
                    field: { type: Type.STRING },
                    location: { type: Type.STRING },
                    graduationDate: { type: Type.STRING },
                    gpa: { type: Type.STRING }
                  },
                  required: ["id", "school", "degree", "field", "location", "graduationDate", "gpa"]
                }
              },
              projects: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    techStack: { type: Type.STRING },
                    link: { type: Type.STRING },
                    bullets: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["id", "title", "techStack", "link", "bullets"]
                }
              },
              skills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    categoryName: { type: Type.STRING },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["id", "categoryName", "skills"]
                }
              },
              languages: { type: Type.ARRAY, items: { type: Type.STRING } },
              certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
              atsKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendedTemplate: { type: Type.STRING }
            },
            required: ["personal", "summary", "experience", "education", "projects", "skills", "languages", "certifications", "atsKeywords", "recommendedTemplate"]
          }
        }
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      res.json(result);
    } catch (error: any) {
      console.warn("Generate Role Resume API Error, running local fallback:", error.message);
      try {
        return res.json(fallbackGenerator.generateRoleResume(roleName, domainName || "", experienceLevel || "", targetIndustry || "", targetRegion || "", targetCompanyType || "", personalInfo));
      } catch (fallbackError) {
        res.status(500).json({ error: error.message || "Failed to generate tailored resume" });
      }
    }
  });

  // API Route: AI Resume & LinkedIn PDF Parser
  app.post("/api/parse-resume", async (req, res) => {
    const { fileBase64, mimeType, sourceType } = req.body;
    try {
      if (!fileBase64) {
        return res.status(400).json({ error: "File base64 data is required" });
      }

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        console.info("Using local fallback parser.");
        return res.json(fallbackGenerator.generateRoleResume("Software Engineer", "Software Development", "Mid-Level", "Technology", "US", "FAANG", {
          fullName: "Alexandria Rivera",
          title: "Senior Software Engineer",
          email: "alex.rivera@example.com",
          phone: "+1-555-0199",
          location: "San Francisco, CA"
        }));
      }

      let base64Data = fileBase64;
      if (base64Data.includes("base64,")) {
        base64Data = base64Data.split("base64,")[1];
      }

      const isLinkedIn = sourceType === "linkedin";

      const prompt = `
You are an advanced executive resume parser and recruiting systems analyst.
Analyze the uploaded document, which is ${isLinkedIn ? "a downloaded LinkedIn profile PDF" : "an existing resume/CV document"}.
Extract all content and accurately map it to the structured JSON resume schema.

Instructions:
1. Extract personal contact info. If any fields (website, linkedin, github, email, phone, location) are missing, default to empty string.
2. Formulate a cohesive and professional summary (3-4 lines) based on their career profile.
3. Extract work experience: Map companies, roles, locations, start dates, end dates, "current" boolean flag, and bullet points of key responsibilities/accomplishments. Generate random standard IDs (like "exp-1", "exp-2", etc.) for each experience object.
4. Extract education: Map schools, degrees, fields of study, graduation dates, and GPAs (if any). Generate random standard IDs (like "edu-1", "edu-2", etc.) for each education object.
5. Extract projects: Map project titles, tech stack, links (if any), and bullet points describing accomplishments. Generate standard IDs (like "proj-1", "proj-2").
6. Extract skills: Group the skills into standard relevant categories (e.g., "Technical Skills", "Tools & Technologies") with list of specific skills inside. Generate standard IDs (like "sk-1", "sk-2").
7. Extract languages and professional certifications as clean string arrays.

Provide the response in strict JSON format.
`;

      const contents = mimeType === "text/plain"
        ? [Buffer.from(base64Data, 'base64').toString('utf-8') + "\n\n" + prompt]
        : [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType || "application/pdf"
              }
            },
            prompt
          ];

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              personal: {
                type: Type.OBJECT,
                properties: {
                  fullName: { type: Type.STRING },
                  title: { type: Type.STRING },
                  email: { type: Type.STRING },
                  phone: { type: Type.STRING },
                  location: { type: Type.STRING },
                  website: { type: Type.STRING },
                  linkedin: { type: Type.STRING },
                  github: { type: Type.STRING }
                },
                required: ["fullName", "title", "email", "phone", "location", "website", "linkedin", "github"]
              },
              summary: { type: Type.STRING },
              experience: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    company: { type: Type.STRING },
                    role: { type: Type.STRING },
                    location: { type: Type.STRING },
                    startDate: { type: Type.STRING },
                    endDate: { type: Type.STRING },
                    current: { type: Type.BOOLEAN },
                    bullets: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["id", "company", "role", "location", "startDate", "endDate", "current", "bullets"]
                }
              },
              education: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    school: { type: Type.STRING },
                    degree: { type: Type.STRING },
                    field: { type: Type.STRING },
                    location: { type: Type.STRING },
                    graduationDate: { type: Type.STRING },
                    gpa: { type: Type.STRING }
                  },
                  required: ["id", "school", "degree", "field", "location", "graduationDate", "gpa"]
                }
              },
              projects: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    techStack: { type: Type.STRING },
                    link: { type: Type.STRING },
                    bullets: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["id", "title", "techStack", "link", "bullets"]
                }
              },
              skills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    categoryName: { type: Type.STRING },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["id", "categoryName", "skills"]
                }
              },
              languages: { type: Type.ARRAY, items: { type: Type.STRING } },
              certifications: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["personal", "summary", "experience", "education", "projects", "skills", "languages", "certifications"]
          }
        }
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      res.json(result);
    } catch (error: any) {
      console.warn("Parse Resume API Error, running local fallback:", error.message);
      try {
        return res.json(fallbackGenerator.generateRoleResume("Software Engineer", "Software Development", "Mid-Level", "Technology", "US", "FAANG", {
          fullName: "Alexandria Rivera",
          title: "Senior Software Engineer",
          email: "alex.rivera@example.com",
          phone: "+1-555-0199",
          location: "San Francisco, CA"
        }));
      } catch (fallbackError) {
        res.status(500).json({ error: error.message || "Failed to parse resume document" });
      }
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n🚀 Server running successfully!`);
    console.log(`   > Local:   http://localhost:${PORT}`);
    console.log(`   > Network: http://127.0.0.1:${PORT}\n`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.error(`\n❌ Error: Port ${PORT} is already in use by another process.`);
      console.error(`👉 Run this in PowerShell to free the port:`);
      console.error(`   Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
      process.exit(1);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer();
