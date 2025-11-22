
export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  techStack?: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 1,
    company: "TNBT Group (Rutul Shah & Co LLP)",
    role: "Python Developer",
    duration: "Nov 2024 - Present",
    location: "Ahmedabad",
    description: [
      "Automated 15CB XML file generation, compression, and upload to Income Tax portals using Python.",
      "Created a complete workflow for downloading client data, creating XMLs, and compressing them into ZIPs for e-filing.",
      "Developed dynamic Excel-based automation tools for FMCG clients (Adani, HCCB, Reliance, Nivea) for inventory, dispatch, and reporting processes.",
      "Implemented automated formatting, data population, sign-off section preservation, and formula retention, reducing report generation time by 60%.",
      "Automated repetitive form-filling and validation workflows inside Oracle ERP using image-based scripting (PyAutoGUI)."
    ],
    techStack: ["Python", "Selenium", "pandas", "openpyxl", "Tkinter", "PySide6", "PyAutoGUI", "pytesseract"]
  },
  {
    id: 2,
    company: "Qubeta Techno Lab (Integrity Healthcare Solutions)",
    role: "Python Developer",
    duration: "Mar 2024 - Jul 2024",
    location: "Ahmedabad",
    description: [
      "Developed Python automation solutions for healthcare claims processing, reducing manual effort by 70% and improving data accuracy.",
      "Created Selenium-based data extraction tools for BCBS Texas, NJ Health, and Wellcare claims portals.",
      "Automated data extraction from web portals and stored results in Excel spreadsheets for reporting.",
      "Automated PDF generation and file management for claims documentation, ensuring compliance with healthcare record-keeping requirements.",
      "Implemented comprehensive error handling and logging systems for reliable operation."
    ],
    techStack: ["Python", "Selenium", "PySide6/Qt", "BeautifulSoup", "pandas", "openpyxl", "logging", "JSON"]
  },
  {
    id: 3,
    company: "Advarisk",
    role: "Junior Python Developer",
    duration: "May 2023 - Dec 2023",
    location: "Pune, Maharashtra",
    description: [
      "Automated hourly Zulip notifications for scraping metrics using Python3 and Prefect.",
      "Oversaw scraping tasks to ensure data accuracy and identified bugs for continuous improvement.",
      "Proficient in web scraping land records from state government sites."
    ],
    techStack: ["Python3", "Django", "MongoDB", "BeautifulSoup", "Requests", "Prefect"]
  }
];
