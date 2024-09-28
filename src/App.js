import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [titlePosition, setTitlePosition] = useState(0);
  const [expandedTile, setExpandedTile] = useState(null);
  const expandedTileRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPartyMode, setIsPartyMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);

      const aboutSection = document.getElementById('about');
      const skillsSection = document.getElementById('skills');
      const projectsSection = document.getElementById('projects');
      const experienceSection = document.getElementById('experience');
      const educationSection = document.getElementById('education');
      const contactSection = document.getElementById('contact');

      if (position < skillsSection.offsetTop - window.innerHeight / 2) {
        setActiveSection('about');
      } else if (position < projectsSection.offsetTop - window.innerHeight / 2) {
        setActiveSection('skills');
      } else if (position < experienceSection.offsetTop - window.innerHeight / 2) {
        setActiveSection('projects');
      } else if (position < educationSection.offsetTop - window.innerHeight / 2) {
        setActiveSection('experience');
      } else if (position < contactSection.offsetTop - window.innerHeight / 2) {
        setActiveSection('education');
      } else {
        setActiveSection('contact');
      }

      // Move the title
      setTitlePosition(position * 0.5); // Adjust the multiplier to control the speed
    };

    const handleClickOutside = (event) => {
      if (expandedTileRef.current && !expandedTileRef.current.contains(event.target)) {
        setExpandedTile(null);
      }
    };

    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={isPartyMode ? 'party-mode' : ''}>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Maurice S. Gleiser Gherson - Portfolio</title>
        <meta name="description" content="Maurice S. Gleiser Gherson's professional portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`${process.env.PUBLIC_URL}/msghs.png`} />
        <style>
          {`
            :root {
                --primary-color: #000000;
                --secondary-color: #FFFFFF;
                --accent-color: #4A90E2;
                --quirky-color: #FFD700;
                --pantone-blue: #0F4C81;
                --pantone-orange: #FF6F61;
            }

            body {
                font-family: 'Helvetica Neue', sans-serif;
                color: var(--primary-color);
                background-color: var(--secondary-color);
                margin: 0;
                padding: 0;
                line-height: 1.6;
                overflow-x: hidden;
            }

            .container {
                max-width: 1000px;
                margin: 0 auto;
                padding: 0 20px;
            }

            header {
                padding: 20px 0;
                position: fixed;
                width: 100%;
                background-color: var(--secondary-color);
                z-index: 1000;
            }

            .logo {
                font-size: 24px;
                font-weight: bold;
                text-decoration: none;
                color: var(--primary-color);
                transition: transform 0.3s ease;
            }

            .section {
                padding: 80px 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                position: relative;
            }

            h1, h2 {
                font-size: 48px;
                margin-bottom: 30px;
            }

            p {
                font-size: 18px;
                margin-bottom: 30px;
                max-width: 600px;
            }

            .btn {
                display: inline-block;
                padding: 10px 20px;
                text-decoration: none;
                color: var(--secondary-color);
                background-color: var(--primary-color);
                transition: background-color 0.3s ease;
                border-radius: 25px;
            }

            .btn:hover {
                background-color: var(--accent-color);
            }

            .content-wrapper {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                transition: opacity 0.5s ease;
                pointer-events: none;
                text-align: center;
            }

            .content-wrapper.visible {
                opacity: 1;
                pointer-events: auto;
            }

            .tile-container {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-bottom: 40px;
            }

            .tile {
                background-color: var(--secondary-color);
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
                cursor: pointer;
            }

            .tile:hover {
                transform: translateY(-5px);
            }

            .emoji {
                font-size: 24px;
                margin-right: 10px;
            }

            .expanded-tile {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.95);
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow-y: auto;
            }

            .expanded-content {
                max-width: 800px;
                padding: 40px;
                position: relative;
            }

            .close-btn {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 24px;
                cursor: pointer;
            }

            .background-animation {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                background: 
                    linear-gradient(135deg, #f5f5f5 25%, transparent 25%) -50px 0,
                    linear-gradient(225deg, #f5f5f5 25%, transparent 25%) -50px 0,
                    linear-gradient(315deg, #f5f5f5 25%, transparent 25%),
                    linear-gradient(45deg, #f5f5f5 25%, transparent 25%);
                background-size: 100px 100px;
                background-color: #e0e0e0;
                animation: gradientAnimation 10s ease infinite;
            }

            @keyframes gradientAnimation {
                0% {
                    background-position: -50px 0, -50px 0, 0 0, 0 0;
                }
                100% {
                    background-position: 50px 100px, 50px 100px, 100px 100px, 100px 100px;
                }
            }

            .headshot {
                width: 100%;
                max-width: 400px;
                height: auto;
                object-fit: contain;
                margin-bottom: 20px;
                border-radius: 10px;
            }

            .headshot-container {
                position: relative;
                display: inline-block;
                overflow: hidden;
            }

            .headshot-container::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                box-shadow: inset 0 0 10px 5px rgba(255, 255, 255, 0.5);
                border-radius: 10px;
                pointer-events: none;
            }

            @media (max-width: 768px) {
                .section {
                    padding: 40px 0;
                }
                h1, h2 {
                    font-size: 36px;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .tile-container {
                    grid-template-columns: 1fr;
                }
                .headshot {
                    max-width: 300px;
                }
            }
          `}
        </style>
      </Helmet>
      
      <BackgroundAnimation isPartyMode={isPartyMode} />
      <Header titlePosition={titlePosition} />
      <About isActive={activeSection === 'about'} expandedTile={expandedTile} setExpandedTile={setExpandedTile} expandedTileRef={expandedTileRef} />
      <Skills isActive={activeSection === 'skills'} expandedTile={expandedTile} setExpandedTile={setExpandedTile} expandedTileRef={expandedTileRef} setIsPartyMode={setIsPartyMode} />
      <Projects isActive={activeSection === 'projects'} expandedTile={expandedTile} setExpandedTile={setExpandedTile} expandedTileRef={expandedTileRef} />
      <Experience isActive={activeSection === 'experience'} expandedTile={expandedTile} setExpandedTile={setExpandedTile} expandedTileRef={expandedTileRef} />
      <Education isActive={activeSection === 'education'} expandedTile={expandedTile} setExpandedTile={setExpandedTile} expandedTileRef={expandedTileRef} />
      <Contact isActive={activeSection === 'contact'} expandedTile={expandedTile} setExpandedTile={setExpandedTile} expandedTileRef={expandedTileRef} />
    </div>
  );
};

const BackgroundAnimation = ({ isPartyMode }) => {
  useEffect(() => {
    const container = document.querySelector('.background-animation');
    const newElements = [];
    
    if (isPartyMode) {
      // Create lasers
      for (let i = 0; i < 10; i++) {
        const laser = document.createElement('div');
        laser.classList.add('laser');
        laser.style.left = `${Math.random() * 100}%`;
        laser.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(laser);
        newElements.push(laser);
      }
    } else {
      // Create stars (dots)
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = i % 2 === 0 ? '100%' : '-10px';
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.animationDuration = `${Math.random() * 10 + 15}s`;
        star.style.animationName = i % 2 === 0 ? 'moveStar' : 'moveStarReverse';
        
        // Set the background position based on the star's horizontal position
        const leftPercentage = parseFloat(star.style.left);
        star.style.backgroundPosition = `${leftPercentage}% 50%`;
        
        container.appendChild(star);
        newElements.push(star);
      }
    }

    return () => {
      newElements.forEach(element => element.remove());
    };
  }, [isPartyMode]);

  return <div className={`background-animation ${isPartyMode ? 'party-mode' : ''}`}></div>;
};

const Header = ({ titlePosition }) => {
  const repeatedText = "Maurice S. Gleiser Gherson • ".repeat(10);
  
  return (
    <header>
      <div className="container">
        <div className="scrolling-header">
          <span className="logo" style={{ 
            color: 'black', 
            fontWeight: 'bold', 
            whiteSpace: 'nowrap',
            display: 'inline-block',
            animation: 'scroll-left 120s linear infinite',
            transform: `translateX(${-titlePosition}px)`
          }}>
            {repeatedText}
          </span>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .scrolling-header {
          overflow: hidden;
          width: 100%;
        }
      `}</style>
    </header>
  );
};

const About = ({ isActive, expandedTile, setExpandedTile, expandedTileRef }) => {
  return (
    <section className="section" id="about">
      <div className={`container content-wrapper ${isActive ? 'visible' : ''}`}>
        <div className="tile-container">
          <div style={{ padding: 0, overflow: 'hidden' }}>
            <img
              src={`${process.env.PUBLIC_URL}/img/msghs.png`}
              alt="Maurice S. Gleiser Gherson"
              className="headshot"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
                filter: 'grayscale(100%)',
                maskImage: 'radial-gradient(black 50%, transparent 70%)',
              }}
            />
          </div>
          <div className="tile">
            <h1>About Me</h1>
            <p>I'm Maurice S. Gleiser Gherson, an AI and Software Implementation Engineer with a passion for leveraging technology to drive business transformation. With a background in Industrial Engineering and a focus on AI in Business, I specialize in implementing AI-driven solutions that enhance operational efficiency and drive innovation.</p>
            <a href="#contact" className="btn">Get in Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = ({ isActive, expandedTile, setExpandedTile, expandedTileRef, setIsPartyMode }) => {
  const handleEasterEggClick = () => {
    setIsPartyMode(prevMode => !prevMode);
    window.open('https://soundcloud.com/msgfrom96', '_blank');
  };

  return (
    <section className="section" id="skills">
      <div className={`container content-wrapper ${isActive ? 'visible' : ''}`}>
        <h2 onClick={handleEasterEggClick} style={{ color: 'black', fontWeight: 'bold', cursor: 'pointer', background: 'var(--secondary-color)', padding: '10px 20px', display: 'inline-block', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>Skills</h2>
        <div className="tile-container">
          <div className="tile">
            <h3>Programming Languages</h3>
            <p>C#, JSON, JavaScript, Python, R, SQL</p>
          </div>
          <div className="tile">
            <h3>Technologies</h3>
            <p>GraphQL, APIs, .NET, Azure DevOps, Jira</p>
          </div>
          <div className="tile">
            <h3>Tools</h3>
            <p>Microsoft Office, CLI, Tableau, Adobe Suite</p>
          </div>
          <div className="tile">
            <h3>Certifications</h3>
            <p>Lean Six Sigma Green Belt</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = ({ isActive, expandedTile, setExpandedTile, expandedTileRef }) => {
  return (
    <section className="section" id="projects">
      <div className={`container content-wrapper ${isActive ? 'visible' : ''}`}>
        <h2 style={{ color: 'black', fontWeight: 'bold', background: 'var(--secondary-color)', padding: '10px 20px', display: 'inline-block', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>Projects</h2>
        <div className="tile-container">
          <div className="tile" onClick={() => setExpandedTile('project1')}>
            <h3>Systems Design Capstone Project</h3>
            <p>Norson Alimentos - Efficiency Improvement</p>
          </div>
          <div className="tile" onClick={() => setExpandedTile('project2')}>
            <h3>TAMID Consulting Group</h3>
            <p>GenAI Start-up Consulting and Finance Portfolio Competition</p>
          </div>
        </div>
      </div>
      {expandedTile === 'project1' && (
        <div className="expanded-tile">
          <div className="expanded-content" ref={expandedTileRef}>
            <span className="close-btn" onClick={() => setExpandedTile(null)}>✕</span>
            <h2 style={{ color: 'black', fontWeight: 'bold' }}>Systems Design Capstone Project for Norson Alimentos</h2>
            <p style={{ color: 'black', fontWeight: 'bold' }}>January 2021 – December 2021</p>
            <ul style={{ color: 'black', fontWeight: 'bold' }}>
              <li>Utilized SCADA data to identify inefficiencies</li>
              <li>Proposed a solution that could save $180,000 annually</li>
            </ul>
          </div>
        </div>
      )}
      {expandedTile === 'project2' && (
        <div className="expanded-tile">
          <div className="expanded-content" ref={expandedTileRef}>
            <span className="close-btn" onClick={() => setExpandedTile(null)}>✕</span>
            <h2 style={{ color: 'black', fontWeight: 'bold' }}>TAMID Consulting Group</h2>
            <p style={{ color: 'black', fontWeight: 'bold' }}>August 2020 – December 2021</p>
            <ul style={{ color: 'black', fontWeight: 'bold' }}>
              <li>Engaged as a consultant for GenAI start-up Upword (formerly Erudite)</li>
              <li>Created Go-To-Market strategies</li>
              <li>Participated in the national Finance Portfolio competition</li>
              <li>Achieved a 3% increase in portfolio value within 2 months</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

const Experience = ({ isActive, expandedTile, setExpandedTile, expandedTileRef }) => {
  return (
    <section className="section" id="experience">
      <div className={`container content-wrapper ${isActive ? 'visible' : ''}`}>
        <h2 style={{ color: 'black', fontWeight: 'bold', background: 'var(--secondary-color)', padding: '10px 20px', display: 'inline-block', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>Professional Experience</h2>
        <div className="tile-container">
          <div className="tile" onClick={() => setExpandedTile('exp1')}>
            <h3>Software Implementation Engineer & Manager</h3>
            <p>Siemens Industry Inc. (for Senseye Predictive Maintenance)</p>
            <p>May 2023 – July 2024</p>
          </div>
          <div className="tile" onClick={() => setExpandedTile('exp2')}>
            <h3>Software Analyst</h3>
            <p>Hye-Tech Network & Solutions</p>
            <p>April 2022 – May 2023</p>
          </div>
        </div>
      </div>
      {expandedTile === 'exp1' && (
        <div className="expanded-tile">
          <div className="expanded-content" ref={expandedTileRef}>
            <span className="close-btn" onClick={() => setExpandedTile(null)}>✕</span>
            <h2 style={{ color: 'black', fontWeight: 'bold' }}>Software Implementation Engineer & Manager</h2>
            <p style={{ color: 'black', fontWeight: 'bold' }}>Siemens Industry Inc. (for Senseye Predictive Maintenance)</p>
            <p style={{ color: 'black', fontWeight: 'bold' }}>May 2023 – July 2024</p>
            <ul style={{ color: 'black', fontWeight: 'bold' }}>
              <li>Led cross-functional teams to implement AI-driven predictive maintenance across several countries, reducing unplanned downtime by 80%</li>
              <li>Managed client relationships and provided tailored training across Latin America, resulting in a successful adoption of AI/ML Solutions, with $2.6 million in annual cost savings and a 20% increase in operational capacity</li>
              <li>Conducted in-depth workshops and training sessions for over 100 personnel across multiple countries, optimizing and fine-tuning AI/ML algorithms for Predictive Maintenance, and enhancing client capabilities and satisfaction</li>
            </ul>
          </div>
        </div>
      )}
      {expandedTile === 'exp2' && (
        <div className="expanded-tile">
          <div className="expanded-content" ref={expandedTileRef}>
            <span className="close-btn" onClick={() => setExpandedTile(null)}>✕</span>
            <h2 style={{ color: 'black', fontWeight: 'bold' }}>Software Analyst</h2>
            <p style={{ color: 'black', fontWeight: 'bold' }}>Hye-Tech Network & Solutions</p>
            <p style={{ color: 'black', fontWeight: 'bold' }}>April 2022 – May 2023</p>
            <ul style={{ color: 'black', fontWeight: 'bold' }}>
              <li>Developed and deployed full-stack solutions in ASP.NET and Azure, focusing on landing pages for software products</li>
              <li>Collaborated in a DevOps Agile environment, integrating CRM and Quoting Software via Azure Functions to streamline the sales process</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

const Education = ({ isActive, expandedTile, setExpandedTile, expandedTileRef }) => {
  return (
    <section className="section" id="education">
      <div className={`container content-wrapper ${isActive ? 'visible' : ''}`}>
        <h2 style={{ color: 'black', fontWeight: 'bold', background: 'var(--secondary-color)', padding: '10px 20px', display: 'inline-block', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>Education</h2>
        <div className="tile-container">
          <div className="tile" onClick={() => setExpandedTile('edu1')}>
            <h3>M.S. in Artificial Intelligence in Business</h3>
            <p>W. P. Carey School of Business at Arizona State University</p>
            <p>August 2024 - May 2025</p>
          </div>
          <div className="tile" onClick={() => setExpandedTile('edu2')}>
            <h3>B.S. in Industrial Engineering</h3>
            <p>Ira A Fulton School of Engineering at Arizona State University</p>
            <p>August 2019 - December 2021</p>
          </div>
        </div>
      </div>
      {expandedTile === 'edu1' && (
        <div className="expanded-tile">
          <div className="expanded-content" ref={expandedTileRef}>
            <span className="close-btn" onClick={() => setExpandedTile(null)}>✕</span>
            <h2 style={{ color: 'black', fontWeight: 'bold' }}>M.S. in Artificial Intelligence in Business</h2>
            <p style={{ color: 'black', fontWeight: 'bold' }}>W. P. Carey School of Business at Arizona State University</p>
            <p style={{ color: 'black', fontWeight: 'bold' }}>August 2024 - May 2025</p>
            <p style={{ color: 'black', fontWeight: 'bold' }}>GPA: 4.0</p>
            <h3 style={{ color: 'black', fontWeight: 'bold' }}>Relevant Coursework:</h3>
            <ul style={{ color: 'black', fontWeight: 'bold' }}>
              <li>Enterprise Data Analytics</li>
              <li>ML in Business</li>
              <li>AI Business Strategy</li>
              <li>Transforming Businesses with AI</li>
            </ul>
          </div>
        </div>
      )}
      {expandedTile === 'edu2' && (
        <div className="expanded-tile">
          <div className="expanded-content" ref={expandedTileRef}>
            <span className="close-btn" onClick={() => setExpandedTile(null)}>✕</span>
            <h2 style={{ color: 'black', fontWeight: 'bold' }}>B.S. in Industrial Engineering</h2>
            <p style={{ color: 'black', fontWeight: 'bold' }}>Ira A Fulton School of Engineering at Arizona State University</p>
            <p style={{ color: 'black', fontWeight: 'bold' }}>August 2019 - December 2021</p>
            <p style={{ color: 'black', fontWeight: 'bold' }}>GPA: 3.84</p>
            <h3 style={{ color: 'black', fontWeight: 'bold' }}>Relevant Coursework:</h3>
            <ul style={{ color: 'black', fontWeight: 'bold' }}>
              <li>Information Systems Engineering</li>
              <li>Stochastic Operations Research</li>
              <li>Financial Engineering</li>
              <li>Work Analysis & Design</li>
              <li>Deterministic Operations Research</li>
              <li>Quality Control</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

const Contact = ({ isActive, expandedTile, setExpandedTile, expandedTileRef }) => {
  return (
    <section className="section" id="contact">
      <div className={`container content-wrapper ${isActive ? 'visible' : ''}`}>
        <h2 style={{ color: 'black', fontWeight: 'bold', background: 'var(--secondary-color)', padding: '10px 20px', display: 'inline-block', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>Contact Me</h2>
        <p style={{ color: 'black', fontWeight: 'bold' }}>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
        <div className="tile-container">
          <div className="tile">
            <h3>Email</h3>
            <p><a href="mailto:gleiser2@hotmail.com">gleiser2@hotmail.com</a></p>
          </div>
          <div className="tile">
            <h3>Phone</h3>
            <p>(786) 246-0623</p>
          </div>
          <div className="tile">
            <h3>Location</h3>
            <p>Tempe, AZ</p>
          </div>
          <div className="tile">
            <h3>LinkedIn</h3>
            <p><a href="https://www.linkedin.com/in/maurice-gleiser" target="_blank" rel="noopener noreferrer">maurice-gleiser</a></p>
          </div>
          <div className="tile">
            <h3>eCard</h3>
            <p><a href={`${process.env.PUBLIC_URL}/maurice_gleiser.vcf`} download>Download Contact</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;