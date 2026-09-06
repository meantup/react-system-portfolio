import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
  {
    title: "Gadget E-Commerce System",
    category: "Full Stack",
    description: "A responsive gadget selling platform with product catalog, categories, brands, cart, checkout and admin management.",
    tech: ["React.js", "ASP.NET Core", "PostgreSQL", "Docker"],
    icon: "🛒"
  },
  {
    title: "Employee Attendance System",
    category: "Business System",
    description: "Employee attendance and monitoring application with dashboard, employee records, time logs and reports.",
    tech: ["React.js", "ASP.NET Core", "SQL Server", "REST API"],
    icon: "🕒"
  },
  {
    title: "Inventory Management System",
    category: "Business System",
    description: "Inventory solution for managing products, stock movements, suppliers, categories and reporting.",
    tech: ["React.js", ".NET", "PostgreSQL", "EF Core"],
    icon: "📦"
  },
  {
    title: "Real-Time Chat System",
    category: "Web Application",
    description: "Real-time messaging application supporting online status, rooms and instant message delivery.",
    tech: ["React.js", "ASP.NET Core", "SignalR", "WebSocket"],
    icon: "💬"
  }
];

const skills = [
  ["React.js", "Frontend"],
  ["JavaScript", "Frontend"],
  ["HTML5 / CSS3", "Frontend"],
  ["Java", "Backend"],
  ["Spring Boot", "Backend"],
  ["Spring Framework", "Backend"],
  ["ASP.NET Core", "Backend"],
  ["C# / .NET", "Backend"],
  ["REST API", "Backend"],
  ["JUnit", "Testing"],
  ["Mockito", "Testing"],
  ["Entity Framework Core", "Data"],
  ["PostgreSQL", "Data"],
  ["SQL Server", "Data"],
  ["Docker", "DevOps"],
  ["Git", "Tools"],
  ["Azure", "Cloud"]
];

const formEndpoint = "https://formsubmit.co/ajax/markocariza2@gmail.com";

function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const filters = ["All", "Full Stack", "Business System", "Web Application"];
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, subject, message } = formData;

    if (!email || !subject || !message) {
      return;
    }

    setSubmitStatus("Sending...");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          subject,
          message,
          _replyto: email,
          _captcha: "false"
        })
      });

      if (!response.ok) {
        throw new Error("Unable to send inquiry");
      }

      setFormData({ email: "", subject: "", message: "" });
      setSubmitStatus("Your inquiry was sent successfully.");
    } catch {
      setSubmitStatus("Unable to send your inquiry. Please try again.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <nav className="nav container">
          <a className="logo" href="#home">
            <span>&lt;/&gt;</span> Mark<span>.</span>
          </a>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="nav-contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-glow glow-one"></div>
          <div className="hero-glow glow-two"></div>
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">SOFTWARE DEVELOPER</p>
              <h1>Building modern <span>systems</span> that solve real problems.</h1>
              <p className="hero-text">
                Application Systems Engineer / Consultant focused on building
                scalable web applications, APIs and business systems using
                React.js, Java Spring Framework, and modern testing practices.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn primary">View Projects</a>
                <a href="#contact" className="btn secondary">Contact Me</a>
              </div>
              <div className="stats">
                <div><strong>5+</strong><span>Years Experience</span></div>
                <div><strong>15+</strong><span>Systems Built</span></div>
                <div><strong>10+</strong><span>Technologies</span></div>
              </div>
            </div>

            <div className="code-card">
              <div className="window-bar">
                <span></span><span></span><span></span>
              </div>
              <pre>{`const developer = {
  name: "Mark Ocariza",
  role: "Software Developer",
  frontend: [
    "React.js",
    "JavaScript",
    "HTML5",
    "CSS3"
  ],
  backend: [
    "Spring Boot",
    "Java",
    "ASP.NET Core",
    "C#",
    "REST API"
  ],
  testing: [
    "XUnit",
    "JUnit",
    "Mockito"
  ],
  database: [
    "PostgreSQL",
    "SQL Server"
  ],
  passion: "Building systems 🚀"
};`}</pre>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">ABOUT ME</p>
              <h2>Developer focused on <span>business solutions.</span></h2>
            </div>
            <div className="about-grid">
              <div className="about-card">
                <div className="avatar">MO</div>
                <h3>Mark Ocariza</h3>
                <p>Application Systems Engineer / Consultant</p>
                <div className="availability"><i></i> Available for freelance projects</div>
              </div>
              <div className="about-copy">
                <p>
                  I am a software developer with 5+ years of experience creating
                  enterprise and business applications. My focus is on clean
                  architecture, maintainable code, reliable APIs and intuitive
                  user interfaces.
                </p>
                <p>
                  I work across the stack—from React.js interfaces and responsive
                  HTML/CSS to ASP.NET Core APIs, Java Spring Boot services,
                  database design, JUnit/Mockito testing and cloud deployment.
                </p>
                <div className="principles">
                  <div><b>01</b><span>Clean & Maintainable Code</span></div>
                  <div><b>02</b><span>Responsive User Experience</span></div>
                  <div><b>03</b><span>Secure & Scalable APIs</span></div>
                  <div><b>04</b><span>Business-Oriented Solutions</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section dark-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">TECH STACK</p>
              <h2>Tools I use to <span>build systems.</span></h2>
            </div>
            <div className="skills-grid">
              {skills.map(([name, group]) => (
                <div className="skill-card" key={name}>
                  <div className="skill-icon">{name.slice(0, 2).toUpperCase()}</div>
                  <div><strong>{name}</strong><small>{group}</small></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <div className="section-heading projects-heading">
              <div>
                <p className="eyebrow">PORTFOLIO</p>
                <h2>Featured <span>systems.</span></h2>
              </div>
              <div className="filters">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={activeFilter === filter ? "active" : ""}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-top">
                    <div className="project-icon">{project.icon}</div>
                    <span>{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                  <a href="#contact" className="project-link">Discuss Project →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-box">
            <div>
              <p className="eyebrow">LET'S WORK TOGETHER</p>
              <h2>Have a system idea?</h2>
              <p>Let's turn your requirements into a clean, modern and reliable application.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label className="full-width">
                  <span>From</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="your-email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="full-width">
                  <span>Subject</span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="full-width">
                  <span>Message</span>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="contact-actions">
                <button type="submit" className="btn primary">Send Email</button>
                <a className="btn secondary" href="#home">Back to Top ↑</a>
              </div>
              {submitStatus && <p className="form-status" role="status">{submitStatus}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <span>© 2026 Mark Ocariza</span>
          <span>React.js • HTML5 • CSS3</span>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);