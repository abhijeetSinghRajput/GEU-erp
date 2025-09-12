import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Users } from "lucide-react";

const faq = [
  {
    q: "How is this faster than the official GEU website?",
    a: "We use a single-page architecture with priority-based loading, intelligent caching, and persistent session management. While the official site reloads pages and re-authenticates frequently, our system maintains sessions and loads data progressively.",
  },
  {
    q: "Is my data safe? Do you store my credentials?",
    a: "We never store passwords or sensitive credentials. We act as a secure proxy, maintaining only session cookies server-side for performance. All your data comes directly from GEU servers - we don't modify, log, or store any personal information.",
  },
  {
    q: "Why do you need to mimic browser headers?",
    a: "GEU's ERP has security measures that block non-browser requests. We replicate legitimate browser behavior (CSRF tokens, proper content types, session validation) to ensure your requests are accepted while maintaining security standards.",
  },
  {
    q: "Can GEU detect that I'm using this instead of their website?",
    a: "No. From GEU's perspective, you're making legitimate authenticated requests with valid sessions. We don't bypass any security measures - we work within them to provide a better user experience.",
  },
  {
    q: "What happens if GEU updates their system?",
    a: "Our proxy architecture is designed to be resilient to minor changes. For major updates, we monitor and adapt our integration points. The modular design allows quick updates without affecting the entire system.",
  },
  {
    q: "Why is mobile experience so much better?",
    a: "The official GEU site wasn't designed mobile-first. Our React-based interface uses modern responsive design, touch-friendly interactions, and optimized loading patterns specifically for mobile devices.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <h3>Frequently Asked Questions</h3>
      </div>

      <div className="space-y-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-0"
        >
          {faq.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="text-muted-foreground"
            >
              <AccordionTrigger className="hover:no-underline hover:text-primary focus:no-underline">
                {item.q}
              </AccordionTrigger>

              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
