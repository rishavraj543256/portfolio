
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export const projects = [
  {
    id: 1,
    title: "Tool_Final_excel",
    description: "A project folder named Tool_Final_excel. Description and details to be updated.",
    tags: ["Python", "pandas", "openpyxl", "Excel Automation"],
    image: "",
    demoUrl: "",
    repoUrl: ""
  },
  {
    id: 2,
    title: "Nivea_Projects-master",
    description: "A project folder named Nivea_Projects-master. Description and details to be updated.",
    tags: ["Python", "BeautifulSoup", "requests", "pandas", "openpyxl", "google-api-python-client", "PyPDF2", "python-docx"],
    image: "",
    demoUrl: "",
    repoUrl: ""
  },
  {
    id: 3,
    title: "E-Filing_Project",
    description: "A project folder named E-Filing_Project. Description and details to be updated.",
    tags: ["Python", "Django", "Flask", "pandas", "openpyxl", "selenium", "streamlit", "GitPython", "matplotlib", "pyarrow"],
    image: "",
    demoUrl: "",
    repoUrl: ""
  },
  {
    id: 4,
    title: "Coca_Cola_Projects-master",
    description: "A project folder named Coca_Cola_Projects-master. Description and details to be updated.",
    tags: ["Python", "tkinter", "pandas", "pdfplumber", "PyInstaller"],
    image: "",
    demoUrl: "",
    repoUrl: ""
  },
  {
    id: 5,
    title: "adani_report_processing-master",
    description: "A project folder named adani_report_processing-master. Description and details to be updated.",
    tags: ["Python", "pandas", "openpyxl", "xlrd", "pyinstaller"],
    image: "",
    demoUrl: "",
    repoUrl: ""
  }
];
