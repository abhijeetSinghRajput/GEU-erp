import { Handshake } from "lucide-react";
import React from "react";

const ContributionSection = () => {
  return (
    <section id="contribution" className="space-y-4 md:space-y-6">
      <h3>
        <Handshake className="text-primary" />
        Contribution
      </h3>
      <div className="text-muted-foreground space-y-4">
        <p>
          This project is open-source and encourages contributions from
          developers, designers, and students.
        </p>

        <blockquote>
          "Together, we can build a better platform for all GEU students."
        </blockquote>

        <p>How you can contribute:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Report bugs or suggest features through GitHub Issues</li>
          <li>Submit pull requests for improvements or fixes</li>
          <li>Help improve our documentation</li>
          <li>Spread the word about the project</li>
          <li>Help with design and user experience improvements</li>
        </ul>
      </div>
    </section>
  );
};

export default ContributionSection;
