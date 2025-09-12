import { Mail, Github, Linkedin, Bug } from "lucide-react";
import React from "react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm"
    >
      <header className="flex items-center gap-3">
        <Mail className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Contact Information</h3>
      </header>

      <p className="text-muted-foreground">
        Have questions or ideas about this portal? We’d love to hear from you:
      </p>

      <ul className="space-y-3">
        <li>
          <a
            href="mailto:abhijeet62008@gmail.com"
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4 text-primary" />
            abhijeet62008@gmail.com
          </a>
        </li>

        <li>
          <a
            href="https://github.com/abhijeetsinghrajput"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub Profile
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/abhijeetsinghrajput"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn Profile
          </a>
        </li>

        <li>
          <a
            href="https://github.com/abhijeetsinghrajput/geu-erp/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            <Bug className="h-4 w-4" />
            Report an Issue
          </a>
        </li>
      </ul>

      <blockquote className="rounded-md border-l-4 border-primary bg-muted/40 p-4 italic text-muted-foreground">
        “We welcome feedback and suggestions to improve the portal for
        everyone.”
      </blockquote>
    </section>
  );
};

export default ContactSection;
