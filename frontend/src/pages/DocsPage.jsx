import {
  Database,
  FileText,
  GitBranch,
  Lock,
  Network,
  Shield,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../components/ui/code-block";
import Header from "../components/Header";

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState("transparency");

  const sections = [
    {
      id: "overview",
      title: "Overview",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "architecture",
      title: "Architecture Pattern",
      icon: <Network className="w-4 h-4" />,
    },
    {
      id: "auth",
      title: "Authentication Flow",
      icon: <Lock className="w-4 h-4" />,
    },
    {
      id: "fetch",
      title: "Core Utility: fetchGEU",
      icon: <GitBranch className="w-4 h-4" />,
    },
    {
      id: "patterns",
      title: "Data Interaction Patterns",
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: "endpoints",
      title: "API Endpoints & GEU Integration",
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: "security",
      title: "Security Measures",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: "response",
      title: "Response Processing",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "flow",
      title: "Data Flow Summary",
      icon: <Network className="w-4 h-4" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full p-4 lg:p-8 docs">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-cal-sans pt-8 text-3xl md:text-4xl lg:pt-12">
            Docs
          </h1>
          <div className="relative flex mb-[50vh] gap-12 py-[40px] md:py-[80px]">
            {/* Sidebar */}
            <ul className="border-foreground/10 sticky top-24 hidden h-fit w-full max-w-[240px] space-y-3 border-l md:block">
              {sections.map((section) => (
                <li key={section.id} className="relative cursor-pointer pl-3">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-left w-full flex items-center gap-2"
                  >
                    {activeSection === section.id && (
                      <span className="bg-foreground absolute -left-[1.5px] top-1/2 inline-block h-5 w-[2px] -translate-y-1/2 rounded-2xl" />
                    )}
                    <p
                      className={`transition-opacity duration-200 text-sm ${
                        activeSection === section.id
                          ? "text-foreground opacity-100 font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {section.title}
                    </p>
                  </button>
                </li>
              ))}
            </ul>

            {/* Main Content */}
            <main className="flex flex-1 flex-col gap-16 sm:gap-20 md:gap-12">
              {/* Overview */}
              <section id="overview" className="space-y-3">
                <h3>Overview</h3>
                <p className="text-muted-foreground">
                  This backend acts as a <strong>proxy/middleware</strong>{" "}
                  between the client and the official{" "}
                  <a
                    href="https://student.geu.ac.in"
                    className="text-primary hover:underline"
                  >
                    GEU ERP
                  </a>
                  . It handles authentication, session management, and data
                  retrieval while keeping security and user privacy intact.
                </p>
              </section>

              {/* Architecture */}
              <section id="architecture" className="space-y-3">
                <h3>Architecture Pattern</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Client authenticates through our backend</li>
                  <li>Backend maintains session cookies from GEU ERP</li>
                  <li>
                    All requests are forwarded with proper authentication
                    headers
                  </li>
                  <li>Responses are processed and returned to the client</li>
                </ul>
              </section>

              {/* Authentication Flow */}
              <section id="auth" className="space-y-3">
                <h3>Authentication Flow</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold">
                      1. Initial Authentication Setup (getCaptcha)
                    </h4>
                    <CodeBlock language="http" code={`GET /api/auth/captcha`} />
                    <p className="text-muted-foreground">
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Creates new cookie jar and session </li>
                        <li>Extracts verification token & captcha </li>
                        <li>Stores ERP cookies </li>
                        <li>Returns captcha + form token</li>
                      </ul>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">2. User Login (login)</h4>
                    <CodeBlock language="http" code={`POST /api/auth/login`} />
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Validates fields (studentId, password, captcha) </li>
                      <li>Posts to GEU login with proper headers </li>
                      <li>Stores authentication cookies </li>
                      <li>No credentials stored</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      3. Session Management (checkAuth)
                    </h4>
                    <CodeBlock language="http" code={`GET /api/auth/check`} />
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Verifies if session is still valid </li>
                      <li>200 = authenticated </li>
                      <li>302 = re-login required </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* fetchGEU Utility */}
              <section id="fetch" className="space-y-3">
                <h3>Core Utility: fetchGEU</h3>
                <p className="text-muted-foreground">
                  Central function that handles all GEU communication:
                </p>
                <CodeBlock
                  language="js"
                  code={`fetchGEU(endpoint, req, options)

// Includes session cookies automatically
// Handles JSON, form, binary
// Detects session expiry
// Maintains headers & tokens`}
                />
              </section>

              {/* Response Processing */}
              <section id="response" className="space-y-3">
                <h3>Response Processing</h3>
                <p className="text-muted-foreground">
                  GEU returns JSON strings in fields like <code>state</code>.
                </p>
                <CodeBlock
                  language="js"
                  code={`const result = await fetchGEU(...);
const data = JSON.parse(result.state || "[]");`}
                />
                <p className="text-muted-foreground">
                  Files (PDF, images) are streamed directly to client.
                </p>
              </section>

              {/* Flow Summary */}
              <section id="flow" className="space-y-3">
                <h3>Data Flow Summary</h3>
                <CodeBlock
                  language="text"
                  code={`Client Request → Backend API
Authentication Check → Validate cookies
Request Forwarding → GEU Server
Response Processing → Parse/Transform
Client Response → Return processed data`}
                />
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
