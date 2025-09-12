import { Github } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";

const TransparencySection = () => {
  return (
    <section id="transparency" className="space-y-4 md:space-y-6">
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
          created to enhance the usability of the official GEU student ERP
          system.
        </p>

        <blockquote>
          "The portal does not store any credentials and is fully open-source.
          You can verify our security practices by reviewing the source code."
        </blockquote>

        <p>Key points:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Complete source code available on{" "}
            <a
              href="https://github.com/your-username/geu-student-portal"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>Anyone can review, audit, and contribute to the codebase</li>
          <li>Transparency in how we handle and process your data</li>
          <li>Community-driven development and improvements</li>
        </ul>

        <a
          href="https://github.com/your-username/geu-student-portal"
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          <Button>
            <Github size={16} />
            View on GitHub
          </Button>
        </a>
      </div>
    </section>
  );
};

export default TransparencySection;
