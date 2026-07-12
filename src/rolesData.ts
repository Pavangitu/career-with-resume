export interface RoleInfo {
  role: string;
  defaultTemplate: "modern" | "classic" | "tech" | "creative" | "executive" | "academic" | "chic" | "midnight" | "metro" | "editorial" | "outline" | "brutalist" | "slate" | "healthcare" | "future";
}

export interface DomainInfo {
  domain: string;
  roles: RoleInfo[];
}

export const domainsAndRoles: DomainInfo[] = [
  {
    domain: "Software Development",
    roles: [
      { role: "Software Engineer", defaultTemplate: "modern" },
      { role: "Software Developer", defaultTemplate: "modern" },
      { role: "Frontend Developer", defaultTemplate: "tech" },
      { role: "Backend Developer", defaultTemplate: "tech" },
      { role: "Full Stack Developer", defaultTemplate: "modern" },
      { role: "Web Developer", defaultTemplate: "modern" },
      { role: "Mobile App Developer", defaultTemplate: "chic" },
      { role: "Android Developer", defaultTemplate: "tech" },
      { role: "iOS Developer", defaultTemplate: "tech" },
      { role: "Flutter Developer", defaultTemplate: "modern" },
      { role: "React Native Developer", defaultTemplate: "modern" },
      { role: "Game Developer", defaultTemplate: "creative" },
      { role: "Embedded Software Engineer", defaultTemplate: "classic" },
      { role: "Firmware Engineer", defaultTemplate: "classic" },
      { role: "Systems Programmer", defaultTemplate: "classic" },
      { role: "API Developer", defaultTemplate: "tech" },
      { role: "SDK Developer", defaultTemplate: "tech" },
      { role: "Compiler Engineer", defaultTemplate: "academic" },
      { role: "Graphics Programmer", defaultTemplate: "creative" },
      { role: "AR Developer", defaultTemplate: "creative" },
      { role: "VR Developer", defaultTemplate: "creative" },
      { role: "XR Developer", defaultTemplate: "creative" },
      { role: "Blockchain Developer", defaultTemplate: "midnight" },
      { role: "Smart Contract Developer", defaultTemplate: "midnight" },
      { role: "Web3 Developer", defaultTemplate: "midnight" },
      { role: "Low-Code Developer", defaultTemplate: "chic" },
      { role: "No-Code Developer", defaultTemplate: "chic" }
    ]
  },
  {
    domain: "Artificial Intelligence & Data",
    roles: [
      { role: "AI Engineer", defaultTemplate: "tech" },
      { role: "Machine Learning Engineer", defaultTemplate: "tech" },
      { role: "Deep Learning Engineer", defaultTemplate: "tech" },
      { role: "Computer Vision Engineer", defaultTemplate: "tech" },
      { role: "NLP Engineer", defaultTemplate: "tech" },
      { role: "Prompt Engineer", defaultTemplate: "modern" },
      { role: "LLM Engineer", defaultTemplate: "tech" },
      { role: "AI Research Engineer", defaultTemplate: "academic" },
      { role: "Generative AI Engineer", defaultTemplate: "tech" },
      { role: "Robotics AI Engineer", defaultTemplate: "tech" },
      { role: "AI Product Engineer", defaultTemplate: "modern" },
      { role: "AI Integration Specialist", defaultTemplate: "chic" },
      { role: "Data Scientist", defaultTemplate: "modern" },
      { role: "Data Analyst", defaultTemplate: "classic" },
      { role: "Business Intelligence Analyst", defaultTemplate: "executive" },
      { role: "Data Engineer", defaultTemplate: "tech" },
      { role: "Analytics Engineer", defaultTemplate: "tech" },
      { role: "Statistician", defaultTemplate: "academic" },
      { role: "Quantitative Analyst", defaultTemplate: "classic" },
      { role: "Data Architect", defaultTemplate: "executive" },
      { role: "Big Data Engineer", defaultTemplate: "tech" },
      { role: "Data Governance Specialist", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Cloud Computing",
    roles: [
      { role: "Cloud Developer", defaultTemplate: "tech" },
      { role: "Cloud Software Engineer", defaultTemplate: "tech" },
      { role: "Cloud Application Developer", defaultTemplate: "tech" },
      { role: "Cloud Solutions Developer", defaultTemplate: "tech" },
      { role: "Cloud Backend Developer", defaultTemplate: "tech" },
      { role: "Cloud API Developer", defaultTemplate: "tech" },
      { role: "Cloud Full Stack Developer", defaultTemplate: "tech" },
      { role: "Cloud Native Developer", defaultTemplate: "tech" },
      { role: "Serverless Developer", defaultTemplate: "tech" },
      { role: "Cloud Engineer", defaultTemplate: "tech" },
      { role: "Cloud Infrastructure Engineer", defaultTemplate: "tech" },
      { role: "Cloud Operations Engineer", defaultTemplate: "tech" },
      { role: "Cloud Systems Engineer", defaultTemplate: "tech" },
      { role: "Cloud Platform Engineer", defaultTemplate: "tech" },
      { role: "Cloud Deployment Engineer", defaultTemplate: "tech" },
      { role: "Cloud Support Engineer", defaultTemplate: "tech" },
      { role: "Cloud Integration Engineer", defaultTemplate: "tech" },
      { role: "Cloud Migration Engineer", defaultTemplate: "tech" },
      { role: "Cloud Automation Engineer", defaultTemplate: "tech" },
      { role: "Cloud Architect", defaultTemplate: "executive" },
      { role: "Enterprise Cloud Architect", defaultTemplate: "executive" },
      { role: "Solutions Architect", defaultTemplate: "executive" },
      { role: "Infrastructure Architect", defaultTemplate: "executive" },
      { role: "Multi-Cloud Architect", defaultTemplate: "executive" },
      { role: "Hybrid Cloud Architect", defaultTemplate: "executive" },
      { role: "DevOps Engineer", defaultTemplate: "tech" },
      { role: "Cloud DevOps Engineer", defaultTemplate: "tech" },
      { role: "Platform Engineer", defaultTemplate: "tech" },
      { role: "Site Reliability Engineer (SRE)", defaultTemplate: "tech" },
      { role: "Kubernetes Engineer", defaultTemplate: "tech" },
      { role: "Docker Engineer", defaultTemplate: "tech" },
      { role: "CI/CD Engineer", defaultTemplate: "tech" },
      { role: "Infrastructure as Code Engineer", defaultTemplate: "tech" },
      { role: "Terraform Engineer", defaultTemplate: "tech" },
      { role: "Ansible Engineer", defaultTemplate: "tech" },
      { role: "AWS Cloud Engineer", defaultTemplate: "tech" },
      { role: "AWS Solutions Architect", defaultTemplate: "tech" },
      { role: "AWS Developer", defaultTemplate: "tech" },
      { role: "AWS SysOps Administrator", defaultTemplate: "tech" },
      { role: "AWS Security Engineer", defaultTemplate: "tech" },
      { role: "AWS Data Engineer", defaultTemplate: "tech" },
      { role: "AWS DevOps Engineer", defaultTemplate: "tech" },
      { role: "AWS Network Engineer", defaultTemplate: "tech" },
      { role: "Azure Administrator", defaultTemplate: "tech" },
      { role: "Azure Developer", defaultTemplate: "tech" },
      { role: "Azure Solutions Architect", defaultTemplate: "tech" },
      { role: "Azure Security Engineer", defaultTemplate: "tech" },
      { role: "Azure AI Engineer", defaultTemplate: "tech" },
      { role: "Azure Data Engineer", defaultTemplate: "tech" },
      { role: "Azure DevOps Engineer", defaultTemplate: "tech" },
      { role: "Google Cloud Engineer", defaultTemplate: "tech" },
      { role: "Google Cloud Architect", defaultTemplate: "tech" },
      { role: "Google Cloud Developer", defaultTemplate: "tech" },
      { role: "Google Cloud Data Engineer", defaultTemplate: "tech" },
      { role: "Google Cloud Security Engineer", defaultTemplate: "tech" },
      { role: "Google Cloud DevOps Engineer", defaultTemplate: "tech" },
      { role: "Cloud Security Engineer", defaultTemplate: "tech" },
      { role: "Cloud Security Analyst", defaultTemplate: "tech" },
      { role: "Cloud IAM Engineer", defaultTemplate: "tech" },
      { role: "Cloud Compliance Specialist", defaultTemplate: "tech" },
      { role: "Cloud Risk Analyst", defaultTemplate: "tech" },
      { role: "Cloud Database Administrator", defaultTemplate: "tech" },
      { role: "Cloud Data Engineer", defaultTemplate: "tech" },
      { role: "Cloud Data Architect", defaultTemplate: "tech" },
      { role: "Cloud Analytics Engineer", defaultTemplate: "tech" },
      { role: "AI Cloud Engineer", defaultTemplate: "tech" },
      { role: "ML Infrastructure Engineer", defaultTemplate: "tech" },
      { role: "AI Platform Engineer", defaultTemplate: "tech" },
      { role: "MLOps Engineer", defaultTemplate: "tech" }
    ]
  },
  {
    domain: "Cybersecurity",
    roles: [
      { role: "Cyber Security Analyst", defaultTemplate: "classic" },
      { role: "Security Engineer", defaultTemplate: "tech" },
      { role: "Penetration Tester", defaultTemplate: "midnight" },
      { role: "Ethical Hacker", defaultTemplate: "midnight" },
      { role: "SOC Analyst", defaultTemplate: "tech" },
      { role: "Digital Forensics Expert", defaultTemplate: "classic" },
      { role: "Incident Response Engineer", defaultTemplate: "tech" },
      { role: "Threat Intelligence Analyst", defaultTemplate: "classic" },
      { role: "Malware Analyst", defaultTemplate: "tech" },
      { role: "Security Consultant", defaultTemplate: "executive" },
      { role: "IAM Engineer", defaultTemplate: "tech" },
      { role: "GRC Analyst", defaultTemplate: "classic" },
      { role: "Application Security Engineer", defaultTemplate: "tech" },
      { role: "Network Security Engineer", defaultTemplate: "tech" },
      { role: "Cloud Security Engineer", defaultTemplate: "tech" }
    ]
  },
  {
    domain: "DevOps",
    roles: [
      { role: "DevOps Engineer", defaultTemplate: "tech" },
      { role: "CI/CD Engineer", defaultTemplate: "tech" },
      { role: "Release Engineer", defaultTemplate: "tech" },
      { role: "Build Engineer", defaultTemplate: "tech" },
      { role: "Automation Engineer", defaultTemplate: "tech" },
      { role: "Infrastructure Automation Engineer", defaultTemplate: "tech" },
      { role: "Platform Reliability Engineer", defaultTemplate: "tech" },
      { role: "Monitoring Engineer", defaultTemplate: "tech" }
    ]
  },
  {
    domain: "Networking",
    roles: [
      { role: "Network Engineer", defaultTemplate: "classic" },
      { role: "Network Administrator", defaultTemplate: "classic" },
      { role: "Network Architect", defaultTemplate: "executive" },
      { role: "Wireless Engineer", defaultTemplate: "classic" },
      { role: "Telecom Engineer", defaultTemplate: "classic" },
      { role: "VoIP Engineer", defaultTemplate: "classic" },
      { role: "Infrastructure Specialist", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Database",
    roles: [
      { role: "Database Administrator", defaultTemplate: "classic" },
      { role: "SQL Developer", defaultTemplate: "tech" },
      { role: "Database Engineer", defaultTemplate: "tech" },
      { role: "Database Architect", defaultTemplate: "executive" },
      { role: "NoSQL Engineer", defaultTemplate: "tech" },
      { role: "Data Warehouse Engineer", defaultTemplate: "tech" }
    ]
  },
  {
    domain: "QA & Testing",
    roles: [
      { role: "QA Engineer", defaultTemplate: "tech" },
      { role: "Software Tester", defaultTemplate: "classic" },
      { role: "Automation Tester", defaultTemplate: "tech" },
      { role: "Manual Tester", defaultTemplate: "classic" },
      { role: "Test Architect", defaultTemplate: "executive" },
      { role: "Performance Tester", defaultTemplate: "tech" },
      { role: "Security Tester", defaultTemplate: "tech" },
      { role: "Mobile Tester", defaultTemplate: "chic" },
      { role: "Game Tester", defaultTemplate: "creative" }
    ]
  },
  {
    domain: "UI/UX Design",
    roles: [
      { role: "UI Designer", defaultTemplate: "creative" },
      { role: "UX Designer", defaultTemplate: "creative" },
      { role: "Product Designer", defaultTemplate: "creative" },
      { role: "Interaction Designer", defaultTemplate: "creative" },
      { role: "Motion Designer", defaultTemplate: "creative" },
      { role: "UX Researcher", defaultTemplate: "academic" },
      { role: "Design System Engineer", defaultTemplate: "tech" },
      { role: "Visual Designer", defaultTemplate: "creative" },
      { role: "Graphic Designer", defaultTemplate: "creative" },
      { role: "Brand Designer", defaultTemplate: "creative" }
    ]
  },
  {
    domain: "Product & Management",
    roles: [
      { role: "Product Manager", defaultTemplate: "executive" },
      { role: "Associate Product Manager", defaultTemplate: "modern" },
      { role: "Technical Product Manager", defaultTemplate: "executive" },
      { role: "Project Manager", defaultTemplate: "executive" },
      { role: "Program Manager", defaultTemplate: "executive" },
      { role: "Delivery Manager", defaultTemplate: "executive" },
      { role: "Scrum Master", defaultTemplate: "modern" },
      { role: "Agile Coach", defaultTemplate: "executive" },
      { role: "Business Analyst", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "IT Support",
    roles: [
      { role: "IT Support Engineer", defaultTemplate: "classic" },
      { role: "Help Desk Engineer", defaultTemplate: "classic" },
      { role: "Desktop Support Engineer", defaultTemplate: "classic" },
      { role: "Technical Support Engineer", defaultTemplate: "classic" },
      { role: "System Administrator", defaultTemplate: "classic" },
      { role: "IT Administrator", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Electronics",
    roles: [
      { role: "Electronics Engineer", defaultTemplate: "classic" },
      { role: "VLSI Engineer", defaultTemplate: "tech" },
      { role: "PCB Designer", defaultTemplate: "classic" },
      { role: "FPGA Engineer", defaultTemplate: "tech" },
      { role: "ASIC Engineer", defaultTemplate: "tech" },
      { role: "Hardware Engineer", defaultTemplate: "classic" },
      { role: "Semiconductor Engineer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Electrical",
    roles: [
      { role: "Electrical Engineer", defaultTemplate: "classic" },
      { role: "Power Systems Engineer", defaultTemplate: "classic" },
      { role: "Control Systems Engineer", defaultTemplate: "classic" },
      { role: "Automation Engineer", defaultTemplate: "tech" },
      { role: "Instrumentation Engineer", defaultTemplate: "classic" },
      { role: "Renewable Energy Engineer", defaultTemplate: "classic" },
      { role: "Substation Engineer", defaultTemplate: "classic" },
      { role: "Maintenance Engineer", defaultTemplate: "classic" },
      { role: "Electrical Design Engineer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Mechanical",
    roles: [
      { role: "Mechanical Engineer", defaultTemplate: "classic" },
      { role: "Design Engineer", defaultTemplate: "classic" },
      { role: "Production Engineer", defaultTemplate: "classic" },
      { role: "Manufacturing Engineer", defaultTemplate: "classic" },
      { role: "Maintenance Engineer", defaultTemplate: "classic" },
      { role: "Quality Engineer", defaultTemplate: "classic" },
      { role: "CAD Engineer", defaultTemplate: "classic" },
      { role: "CAM Engineer", defaultTemplate: "classic" },
      { role: "HVAC Engineer", defaultTemplate: "classic" },
      { role: "Automobile Engineer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Civil Engineering",
    roles: [
      { role: "Civil Engineer", defaultTemplate: "classic" },
      { role: "Structural Engineer", defaultTemplate: "classic" },
      { role: "Site Engineer", defaultTemplate: "classic" },
      { role: "Construction Engineer", defaultTemplate: "classic" },
      { role: "Planning Engineer", defaultTemplate: "classic" },
      { role: "Quantity Surveyor", defaultTemplate: "classic" },
      { role: "Project Engineer", defaultTemplate: "classic" },
      { role: "Transportation Engineer", defaultTemplate: "classic" },
      { role: "Water Resources Engineer", defaultTemplate: "classic" },
      { role: "Geotechnical Engineer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Chemical Engineering",
    roles: [
      { role: "Chemical Engineer", defaultTemplate: "classic" },
      { role: "Process Engineer", defaultTemplate: "classic" },
      { role: "Plant Engineer", defaultTemplate: "classic" },
      { role: "Production Engineer", defaultTemplate: "classic" },
      { role: "Refinery Engineer", defaultTemplate: "classic" },
      { role: "Petroleum Engineer", defaultTemplate: "classic" },
      { role: "Process Safety Engineer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Aerospace",
    roles: [
      { role: "Aerospace Engineer", defaultTemplate: "classic" },
      { role: "Aeronautical Engineer", defaultTemplate: "classic" },
      { role: "Aircraft Maintenance Engineer", defaultTemplate: "classic" },
      { role: "Flight Test Engineer", defaultTemplate: "classic" },
      { role: "Space Systems Engineer", defaultTemplate: "classic" },
      { role: "Propulsion Engineer", defaultTemplate: "classic" },
      { role: "Avionics Engineer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Automobile",
    roles: [
      { role: "Automotive Engineer", defaultTemplate: "classic" },
      { role: "Vehicle Design Engineer", defaultTemplate: "classic" },
      { role: "EV Engineer", defaultTemplate: "classic" },
      { role: "Autonomous Vehicle Engineer", defaultTemplate: "classic" },
      { role: "Powertrain Engineer", defaultTemplate: "classic" },
      { role: "Testing Engineer", defaultTemplate: "classic" },
      { role: "Manufacturing Engineer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Robotics",
    roles: [
      { role: "Robotics Engineer", defaultTemplate: "tech" },
      { role: "Automation Engineer", defaultTemplate: "tech" },
      { role: "Industrial Robotics Engineer", defaultTemplate: "classic" },
      { role: "Mechatronics Engineer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Internet of Things (IoT)",
    roles: [
      { role: "IoT Engineer", defaultTemplate: "tech" },
      { role: "Embedded IoT Developer", defaultTemplate: "tech" },
      { role: "Sensor Integration Engineer", defaultTemplate: "classic" },
      { role: "Edge Computing Engineer", defaultTemplate: "tech" }
    ]
  },
  {
    domain: "Biotechnology",
    roles: [
      { role: "Biotechnology Engineer", defaultTemplate: "classic" },
      { role: "Biomedical Engineer", defaultTemplate: "classic" },
      { role: "Clinical Research Associate", defaultTemplate: "academic" },
      { role: "Research Scientist", defaultTemplate: "academic" },
      { role: "Bioinformatics Engineer", defaultTemplate: "tech" },
      { role: "Laboratory Analyst", defaultTemplate: "academic" }
    ]
  },
  {
    domain: "Healthcare",
    roles: [
      { role: "Doctor", defaultTemplate: "healthcare" },
      { role: "Dentist", defaultTemplate: "healthcare" },
      { role: "Nurse", defaultTemplate: "healthcare" },
      { role: "Pharmacist", defaultTemplate: "healthcare" },
      { role: "Physiotherapist", defaultTemplate: "healthcare" },
      { role: "Medical Laboratory Technician", defaultTemplate: "healthcare" },
      { role: "Radiologist", defaultTemplate: "healthcare" },
      { role: "Nutritionist", defaultTemplate: "healthcare" },
      { role: "Psychologist", defaultTemplate: "healthcare" }
    ]
  },
  {
    domain: "Pharmacy",
    roles: [
      { role: "Pharmacist", defaultTemplate: "classic" },
      { role: "Drug Safety Associate", defaultTemplate: "classic" },
      { role: "Regulatory Affairs Associate", defaultTemplate: "classic" },
      { role: "Clinical Pharmacologist", defaultTemplate: "academic" }
    ]
  },
  {
    domain: "Agriculture",
    roles: [
      { role: "Agricultural Engineer", defaultTemplate: "classic" },
      { role: "Irrigation Engineer", defaultTemplate: "classic" },
      { role: "Agronomist", defaultTemplate: "academic" },
      { role: "Farm Manager", defaultTemplate: "classic" },
      { role: "Food Technologist", defaultTemplate: "classic" },
      { role: "Soil Scientist", defaultTemplate: "academic" },
      { role: "Horticulturist", defaultTemplate: "academic" }
    ]
  },
  {
    domain: "Finance",
    roles: [
      { role: "Accountant", defaultTemplate: "classic" },
      { role: "Chartered Accountant", defaultTemplate: "executive" },
      { role: "Financial Analyst", defaultTemplate: "executive" },
      { role: "Investment Banker", defaultTemplate: "executive" },
      { role: "Auditor", defaultTemplate: "classic" },
      { role: "Risk Analyst", defaultTemplate: "executive" },
      { role: "Tax Consultant", defaultTemplate: "classic" },
      { role: "Equity Research Analyst", defaultTemplate: "executive" },
      { role: "Credit Analyst", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Banking",
    roles: [
      { role: "Bank PO", defaultTemplate: "classic" },
      { role: "Relationship Manager", defaultTemplate: "executive" },
      { role: "Loan Officer", defaultTemplate: "classic" },
      { role: "Credit Manager", defaultTemplate: "classic" },
      { role: "Operations Executive", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "MBA Roles",
    roles: [
      { role: "Marketing Executive", defaultTemplate: "executive" },
      { role: "Digital Marketing Executive", defaultTemplate: "executive" },
      { role: "Brand Manager", defaultTemplate: "executive" },
      { role: "Product Marketing Manager", defaultTemplate: "executive" },
      { role: "SEO Executive", defaultTemplate: "executive" },
      { role: "SEM Specialist", defaultTemplate: "executive" },
      { role: "Content Marketing Manager", defaultTemplate: "executive" },
      { role: "Performance Marketing Executive", defaultTemplate: "executive" },
      { role: "Growth Marketing Manager", defaultTemplate: "executive" },
      { role: "Social Media Manager", defaultTemplate: "executive" },
      { role: "Email Marketing Specialist", defaultTemplate: "executive" },
      { role: "HR Executive", defaultTemplate: "executive" },
      { role: "HR Manager", defaultTemplate: "executive" },
      { role: "HR Generalist", defaultTemplate: "executive" },
      { role: "HR Business Partner", defaultTemplate: "executive" },
      { role: "Talent Acquisition Specialist", defaultTemplate: "executive" },
      { role: "Recruiter", defaultTemplate: "executive" },
      { role: "Payroll Executive", defaultTemplate: "executive" },
      { role: "HR Operations Executive", defaultTemplate: "executive" },
      { role: "Learning and Development Executive", defaultTemplate: "executive" },
      { role: "Employee Relations Specialist", defaultTemplate: "executive" },
      { role: "Financial Analyst", defaultTemplate: "executive" },
      { role: "Accountant", defaultTemplate: "executive" },
      { role: "Cost Accountant", defaultTemplate: "executive" },
      { role: "Investment Analyst", defaultTemplate: "executive" },
      { role: "Budget Analyst", defaultTemplate: "executive" },
      { role: "Tax Consultant", defaultTemplate: "executive" },
      { role: "Credit Analyst", defaultTemplate: "executive" },
      { role: "Risk Analyst", defaultTemplate: "executive" },
      { role: "Banking Executive", defaultTemplate: "executive" },
      { role: "Treasury Executive", defaultTemplate: "executive" },
      { role: "Sales Executive", defaultTemplate: "executive" },
      { role: "Business Development Executive", defaultTemplate: "executive" },
      { role: "Territory Sales Manager", defaultTemplate: "executive" },
      { role: "Area Sales Manager", defaultTemplate: "executive" },
      { role: "Sales Manager", defaultTemplate: "executive" },
      { role: "Key Account Manager", defaultTemplate: "executive" },
      { role: "Relationship Manager", defaultTemplate: "executive" },
      { role: "Customer Success Manager", defaultTemplate: "executive" },
      { role: "Operations Executive", defaultTemplate: "executive" },
      { role: "Operations Manager", defaultTemplate: "executive" },
      { role: "Supply Chain Executive", defaultTemplate: "executive" },
      { role: "Logistics Coordinator", defaultTemplate: "executive" },
      { role: "Procurement Executive", defaultTemplate: "executive" },
      { role: "Vendor Manager", defaultTemplate: "executive" },
      { role: "Inventory Analyst", defaultTemplate: "executive" },
      { role: "Warehouse Manager", defaultTemplate: "executive" },
      { role: "Business Analyst", defaultTemplate: "executive" },
      { role: "Business Consultant", defaultTemplate: "executive" },
      { role: "Strategy Analyst", defaultTemplate: "executive" },
      { role: "Project Coordinator", defaultTemplate: "executive" },
      { role: "Project Manager", defaultTemplate: "executive" },
      { role: "Product Manager", defaultTemplate: "executive" },
      { role: "Product Owner", defaultTemplate: "executive" },
      { role: "Operations Analyst", defaultTemplate: "executive" },
      { role: "Relationship Officer", defaultTemplate: "executive" },
      { role: "Credit Officer", defaultTemplate: "executive" },
      { role: "Loan Officer", defaultTemplate: "executive" },
      { role: "Insurance Advisor", defaultTemplate: "executive" },
      { role: "Claims Executive", defaultTemplate: "executive" },
      { role: "Wealth Manager", defaultTemplate: "executive" },
      { role: "Startup Founder", defaultTemplate: "executive" },
      { role: "Co-Founder", defaultTemplate: "executive" },
      { role: "Business Owner", defaultTemplate: "executive" },
      { role: "Business Consultant", defaultTemplate: "executive" },
      { role: "Franchise Manager", defaultTemplate: "executive" }
    ]
  },
  {
    domain: "Human Resources",
    roles: [
      { role: "HR Generalist", defaultTemplate: "executive" },
      { role: "Recruiter", defaultTemplate: "modern" },
      { role: "Talent Acquisition Specialist", defaultTemplate: "executive" },
      { role: "HR Business Partner", defaultTemplate: "executive" },
      { role: "Payroll Executive", defaultTemplate: "classic" },
      { role: "Learning & Development Specialist", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Sales",
    roles: [
      { role: "Sales Executive", defaultTemplate: "modern" },
      { role: "Business Development Executive", defaultTemplate: "modern" },
      { role: "Sales Manager", defaultTemplate: "executive" },
      { role: "Key Account Manager", defaultTemplate: "executive" },
      { role: "Territory Manager", defaultTemplate: "executive" }
    ]
  },
  {
    domain: "Marketing",
    roles: [
      { role: "Marketing Executive", defaultTemplate: "modern" },
      { role: "Digital Marketing Specialist", defaultTemplate: "modern" },
      { role: "SEO Specialist", defaultTemplate: "tech" },
      { role: "SEM Specialist", defaultTemplate: "tech" },
      { role: "Social Media Manager", defaultTemplate: "creative" },
      { role: "Performance Marketing Manager", defaultTemplate: "executive" },
      { role: "Brand Manager", defaultTemplate: "executive" },
      { role: "Growth Marketer", defaultTemplate: "modern" },
      { role: "Email Marketing Specialist", defaultTemplate: "modern" }
    ]
  },
  {
    domain: "Content",
    roles: [
      { role: "Technical Writer", defaultTemplate: "academic" },
      { role: "Content Writer", defaultTemplate: "classic" },
      { role: "Copywriter", defaultTemplate: "creative" },
      { role: "Content Strategist", defaultTemplate: "executive" },
      { role: "Editor", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Media",
    roles: [
      { role: "Journalist", defaultTemplate: "classic" },
      { role: "Reporter", defaultTemplate: "classic" },
      { role: "Anchor", defaultTemplate: "classic" },
      { role: "Video Editor", defaultTemplate: "creative" },
      { role: "Photographer", defaultTemplate: "creative" },
      { role: "Cinematographer", defaultTemplate: "creative" },
      { role: "Script Writer", defaultTemplate: "classic" },
      { role: "Content Creator", defaultTemplate: "creative" },
      { role: "Podcast Producer", defaultTemplate: "creative" }
    ]
  },
  {
    domain: "Animation",
    roles: [
      { role: "Animator", defaultTemplate: "creative" },
      { role: "2D Animator", defaultTemplate: "creative" },
      { role: "3D Animator", defaultTemplate: "creative" },
      { role: "VFX Artist", defaultTemplate: "creative" },
      { role: "Motion Graphics Designer", defaultTemplate: "creative" },
      { role: "Game Artist", defaultTemplate: "creative" }
    ]
  },
  {
    domain: "Law",
    roles: [
      { role: "Advocate", defaultTemplate: "classic" },
      { role: "Corporate Lawyer", defaultTemplate: "slate" },
      { role: "Legal Associate", defaultTemplate: "classic" },
      { role: "Legal Advisor", defaultTemplate: "slate" },
      { role: "Compliance Officer", defaultTemplate: "classic" },
      { role: "Legal Consultant", defaultTemplate: "slate" }
    ]
  },
  {
    domain: "Education",
    roles: [
      { role: "Teacher", defaultTemplate: "classic" },
      { role: "Lecturer", defaultTemplate: "academic" },
      { role: "Professor", defaultTemplate: "academic" },
      { role: "Research Assistant", defaultTemplate: "academic" },
      { role: "Academic Coordinator", defaultTemplate: "classic" },
      { role: "Principal", defaultTemplate: "academic" },
      { role: "Instructional Designer", defaultTemplate: "academic" }
    ]
  },
  {
    domain: "Government",
    roles: [
      { role: "Civil Services Officer (IAS, IPS, IFS)", defaultTemplate: "classic" },
      { role: "SSC Officer", defaultTemplate: "classic" },
      { role: "Railway Officer", defaultTemplate: "classic" },
      { role: "Banking Officer", defaultTemplate: "classic" },
      { role: "PSU Engineer", defaultTemplate: "classic" },
      { role: "Defence Officer", defaultTemplate: "classic" },
      { role: "Public Administration Officer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Defence",
    roles: [
      { role: "Army Officer", defaultTemplate: "classic" },
      { role: "Navy Officer", defaultTemplate: "classic" },
      { role: "Air Force Officer", defaultTemplate: "classic" },
      { role: "Intelligence Officer", defaultTemplate: "classic" },
      { role: "Defence Scientist", defaultTemplate: "academic" }
    ]
  },
  {
    domain: "Hospitality",
    roles: [
      { role: "Hotel Manager", defaultTemplate: "executive" },
      { role: "Chef", defaultTemplate: "classic" },
      { role: "Restaurant Manager", defaultTemplate: "executive" },
      { role: "Event Manager", defaultTemplate: "creative" },
      { role: "Front Office Executive", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Aviation",
    roles: [
      { role: "Pilot", defaultTemplate: "classic" },
      { role: "Cabin Crew", defaultTemplate: "classic" },
      { role: "Ground Staff", defaultTemplate: "classic" },
      { role: "Airport Operations Manager", defaultTemplate: "executive" },
      { role: "Air Traffic Controller", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Logistics",
    roles: [
      { role: "Supply Chain Analyst", defaultTemplate: "modern" },
      { role: "Warehouse Manager", defaultTemplate: "classic" },
      { role: "Procurement Specialist", defaultTemplate: "classic" },
      { role: "Logistics Coordinator", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Retail",
    roles: [
      { role: "Retail Manager", defaultTemplate: "executive" },
      { role: "Store Manager", defaultTemplate: "classic" },
      { role: "Merchandiser", defaultTemplate: "classic" },
      { role: "Category Manager", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Real Estate",
    roles: [
      { role: "Real Estate Consultant", defaultTemplate: "modern" },
      { role: "Property Manager", defaultTemplate: "classic" },
      { role: "Architect", defaultTemplate: "creative" },
      { role: "Interior Designer", defaultTemplate: "creative" }
    ]
  },
  {
    domain: "Freelancers",
    roles: [
      { role: "Freelancer", defaultTemplate: "chic" },
      { role: "Consultant", defaultTemplate: "executive" },
      { role: "Independent Contractor", defaultTemplate: "classic" },
      { role: "Virtual Assistant", defaultTemplate: "modern" }
    ]
  },
  {
    domain: "Creative Careers",
    roles: [
      { role: "Music Producer", defaultTemplate: "creative" },
      { role: "Singer", defaultTemplate: "creative" },
      { role: "Actor", defaultTemplate: "creative" },
      { role: "Influencer", defaultTemplate: "creative" },
      { role: "YouTuber", defaultTemplate: "creative" },
      { role: "Podcast Producer", defaultTemplate: "creative" }
    ]
  },
  {
    domain: "Research",
    roles: [
      { role: "Research Scientist", defaultTemplate: "academic" },
      { role: "Research Fellow", defaultTemplate: "academic" },
      { role: "Lab Assistant", defaultTemplate: "academic" },
      { role: "Scientific Officer", defaultTemplate: "academic" }
    ]
  },
  {
    domain: "Environmental",
    roles: [
      { role: "Environmental Engineer", defaultTemplate: "classic" },
      { role: "Sustainability Consultant", defaultTemplate: "executive" },
      { role: "Climate Analyst", defaultTemplate: "modern" },
      { role: "ESG Analyst", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Future AI Careers",
    roles: [
      { role: "AI Agent Developer", defaultTemplate: "future" },
      { role: "AI Automation Engineer", defaultTemplate: "future" },
      { role: "Prompt Engineer", defaultTemplate: "future" },
      { role: "LLM Engineer", defaultTemplate: "future" },
      { role: "MLOps Engineer", defaultTemplate: "future" },
      { role: "Quantum Software Engineer", defaultTemplate: "future" },
      { role: "Digital Twin Engineer", defaultTemplate: "future" },
      { role: "Robotics AI Engineer", defaultTemplate: "future" },
      { role: "Autonomous Systems Engineer", defaultTemplate: "future" },
      { role: "Spatial Computing Engineer", defaultTemplate: "future" },
      { role: "AI Safety Engineer", defaultTemplate: "future" },
      { role: "AI Governance Specialist", defaultTemplate: "future" },
      { role: "Human-AI Interaction Designer", defaultTemplate: "future" }
    ]
  },
  {
    domain: "Quantum Computing",
    roles: [
      { role: "Quantum Software Engineer", defaultTemplate: "tech" },
      { role: "Quantum Research Scientist", defaultTemplate: "academic" },
      { role: "Quantum Algorithm Developer", defaultTemplate: "academic" },
      { role: "Quantum Hardware Engineer", defaultTemplate: "classic" }
    ]
  },
  {
    domain: "Space Technology",
    roles: [
      { role: "Satellite Engineer", defaultTemplate: "tech" },
      { role: "Mission Operations Engineer", defaultTemplate: "classic" },
      { role: "Space Data Scientist", defaultTemplate: "tech" },
      { role: "Rocket Propulsion Engineer", defaultTemplate: "tech" }
    ]
  },
  {
    domain: "Student & Entry-Level",
    roles: [
      { role: "Fresher", defaultTemplate: "modern" },
      { role: "Graduate Engineer Trainee (GET)", defaultTemplate: "modern" },
      { role: "Management Trainee (MT)", defaultTemplate: "classic" },
      { role: "Intern", defaultTemplate: "modern" },
      { role: "Apprentice", defaultTemplate: "classic" },
      { role: "Campus Hire", defaultTemplate: "modern" },
      { role: "Graduate Program Candidate", defaultTemplate: "academic" }
    ]
  }
];
