import {
  AlertCircleIcon,
  ExternalLink,
  FileText,
  GitBranch,
  Github,
  Handshake,
  Mail,
  ShieldCheck,
  UserLock,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState("transparency");

  const sections = [
    { id: "transparency", title: "Transparency", icon: <Github size={20} /> },
    { id: "credentials", title: "Credentials & Security" },
    { id: "data-fetching", title: "How We Fetch Data" },
    { id: "contribution", title: "Contribution" },
    { id: "disclaimer", title: "Disclaimer" },
    { id: "terms", title: "Terms of Service" },
    { id: "privacy", title: "Privacy Policy" },
    { id: "contact", title: "Contact Information" },
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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full p-2 sm:p-4 lg:p-8 docs">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-cal-sans pt-8 text-3xl md:text-4xl lg:pt-12">
            Terms of Service & Privacy Policy
          </h1>
          <div className="relative flex mb-[50vh] gap-12 py-[40px] md:py-[80px]">
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

            <div className="flex flex-1 flex-col gap-16 sm:gap-20 md:gap-12">
              {/* Transparency Section */}
              <div id="transparency" className="space-y-4 md:space-y-6">
                <h3>
                  <Github className="text-primary" />
                  Transparency
                </h3>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    This student portal is a{" "}
                    <strong className="text-foreground">
                      community-driven open-source project
                    </strong>{" "}
                    created to enhance the usability of the official GEU student
                    ERP system.
                  </p>

                  <blockquote>
                    "The portal does not store any credentials and is fully
                    open-source. You can verify our security practices by
                    reviewing the source code."
                  </blockquote>

                  <p>Key points:</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      Complete source code available on{" "}
                      <a
                        href="https://github.com/abhijeetsinghrajput/geu-erp"
                        className="text-primary hover:underline"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      Anyone can review, audit, and contribute to the codebase
                    </li>
                    <li>Transparency in how we handle and process your data</li>
                    <li>Community-driven development and improvements</li>
                  </ul>

                  <a
                    href="https://github.com/abhijeetsinghrajput/geu-erp"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                  >
                    <Button>
                      <Github size={16} />
                      View on GitHub
                    </Button>
                  </a>
                </div>
              </div>

              {/* Credentials & Security Section */}
              <div id="credentials" className="space-y-4 md:space-y-6">
                <h3>
                  <ShieldCheck className="text-primary" />
                  Credentials & Security
                </h3>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Your login credentials are{" "}
                    <strong className="text-foreground">
                      never stored, shared, or sold
                    </strong>
                    . They are used only to securely authenticate with the
                    official GEU ERP system.
                  </p>

                  <p>Security measures we implement:</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Secure encryption for all data transmissions</li>
                    <li>
                      Hashed password storage using industry-standard algorithms
                    </li>
                    <li>Regular security audits of our codebase</li>
                    <li>Continuous monitoring for potential vulnerabilities</li>
                  </ul>

                  <p>
                    All authentication happens directly with the official GEU
                    ERP at{" "}
                    <a
                      href="https://student.geu.ac.in"
                      className="text-primary hover:underline"
                    >
                      https://student.geu.ac.in
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* How We Fetch Data Section */}
              <div id="data-fetching" className="space-y-4 md:space-y-6">
                <div className="flex justify-between items-center">
                  <h3>
                    <GitBranch className="text-primary" />
                    How We Fetch Data
                  </h3>
                  <Link
                    to={"/docs"}
                    className="text-sm flex items-center gap-2 text-primary font-semibold underline underline-offset-2"
                  >
                    See Docs <ExternalLink size={16} />
                  </Link>
                </div>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    The portal{" "}
                    <strong className="text-foreground">
                      does not scrape or directly access GEU databases
                    </strong>
                    . Instead, it communicates securely with the official{" "}
                    <a
                      href="https://student.geu.ac.in"
                      className="text-primary hover:underline"
                    >
                      GEU ERP servers
                    </a>{" "}
                    using your authenticated session and verification tokens.
                  </p>

                  <blockquote className="bg-input/30 border-l-2 p-2 rounded-md overflow-hidden border-accent pl-4 italic">
                    "All requests are proxied to official ERP endpoints. No
                    personal data or credentials are stored on our servers."
                  </blockquote>

                  <p>🔑 Our data-fetching flow works as follows:</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      <strong>Session Initialization:</strong> A secure session
                      is established with <code>ASP.NET_SessionId</code> and{" "}
                      <code>__RequestVerificationToken</code>.
                    </li>
                    <li>
                      <strong>Authentication:</strong> Login credentials are
                      sent only to the official GEU login API. We never log or
                      store them.
                    </li>
                    <li>
                      <strong>Request Proxying:</strong> After login, the portal
                      forwards requests (attendance, exams, profile, etc.) to
                      official ERP endpoints with your valid session cookies.
                    </li>
                    <li>
                      <strong>Temporary Data:</strong> Data is displayed in your
                      browser but never persisted on our servers.
                    </li>
                  </ul>

                  <blockquote className="bg-input/30 border-l-2 p-2 rounded-md overflow-hidden border-accent pl-4 italic">
                    "Minimal access, maximum security – we only fetch what you
                    request."
                  </blockquote>
                </div>
              </div>

              {/* Contribution Section */}
              <div id="contribution" className="space-y-4 md:space-y-6">
                <h3>
                  <Handshake className="text-primary" />
                  Contribution
                </h3>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    This project is open-source and encourages contributions
                    from developers, designers, and students.
                  </p>

                  <blockquote className="bg-input/30 border-l-2 p-2 rounded-md overflow-hidden border-accent pl-4 italic">
                    "Together, we can build a better platform for all GEU
                    students."
                  </blockquote>

                  <p>How you can contribute:</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      Report bugs or suggest features through GitHub Issues
                    </li>
                    <li>Submit pull requests for improvements or fixes</li>
                    <li>Help improve our documentation</li>
                    <li>Spread the word about the project</li>
                    <li>Help with design and user experience improvements</li>
                  </ul>
                </div>
              </div>

              {/* Disclaimer Section */}
              <div id="disclaimer" className="space-y-4 md:space-y-6">
                <h3>
                  <AlertCircleIcon className="text-primary" />
                  Disclaimer
                </h3>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    This portal is{" "}
                    <strong className="text-foreground">
                      not an official GEU product
                    </strong>
                    . It is built for educational and usability purposes only.
                  </p>

                  <ul className="list-disc space-y-2 pl-5">
                    <li>All official records remain on the GEU ERP</li>
                    <li>
                      This portal is simply an interface improvement layer
                    </li>
                    <li>
                      We are not responsible for any discrepancies in data
                    </li>
                    <li>
                      Always verify critical information with official sources
                    </li>
                  </ul>

                  <p>
                    All official records remain on the GEU ERP at{" "}
                    <a
                      href="https://student.geu.ac.in"
                      className="text-primary hover:underline"
                    >
                      https://student.geu.ac.in
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Terms of Service Section */}
              <div id="terms" className="space-y-4 md:space-y-6">
                <h3>
                  <FileText className="text-primary" />
                  Terms of Service
                </h3>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    By using the GEU Student Portal, you agree to the following
                    terms:
                  </p>

                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      Use the portal for legitimate educational purposes only
                    </li>
                    <li>
                      Not attempt to compromise the security of the system
                    </li>
                    <li>Respect the privacy of other users</li>
                    <li>Abide by your institution's code of conduct</li>
                    <li>
                      Understand that this is a community project with no
                      official affiliation
                    </li>
                  </ul>

                  <blockquote className="bg-input/30 border-l-2 p-2 rounded-md overflow-hidden border-accent pl-4 italic">
                    "Your continued use of our services indicates your
                    acceptance of these terms."
                  </blockquote>
                </div>
              </div>

              {/* Privacy Policy Section */}
              <div id="privacy" className="space-y-4 md:space-y-6">
                <h3>
                  <UserLock className="text-primary" />
                  Privacy Policy
                </h3>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    We value your privacy and are committed to protecting your
                    personal information:
                  </p>

                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      We do not collect any personal information beyond what is
                      required for authentication
                    </li>
                    <li>We do not use cookies for tracking purposes</li>
                    <li>We do not share your data with any third parties</li>
                    <li>All session data is cleared when you log out</li>
                    <li>
                      You can review our source code to verify our privacy
                      practices
                    </li>
                  </ul>

                  <p>
                    <strong className="text-foreground">Last Updated:</strong>{" "}
                    October 27, 2023
                  </p>
                </div>
              </div>

              {/* Contact Information Section */}
              <div id="contact" className="space-y-4 md:space-y-6">
                <h3>
                  <Mail className="text-primary" />
                  Contact Information
                </h3>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    If you have any questions about these terms or the portal,
                    please contact us:
                  </p>

                  <ul className="list-disc space-y-2 pl-5">
                    <li>Email: abhijeet62008@gmail.com</li>
                    <li>
                      GitHub: https://github.com/abhijeetsinghrajput/geu-erp
                    </li>
                    <li>
                      Issue Tracker: Create an issue on our GitHub repository
                    </li>
                  </ul>

                  <blockquote className="bg-input/30 border-l-2 p-2 rounded-md overflow-hidden border-accent pl-4 italic">
                    "We welcome feedback and suggestions to improve the portal
                    for everyone."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
