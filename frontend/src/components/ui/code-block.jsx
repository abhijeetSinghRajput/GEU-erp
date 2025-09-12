"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div className="codeblock relative w-full my-2 rounded-lg bg-zinc-900 p-4 pb-1 font-mono text-sm">
      <div className="flex justify-between items-center pb-2">
        {/* Tabs OR filename */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {tabsExist
            ? tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-1 text-xs transition-colors font-sans rounded-md ${
                    activeTab === index
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab.name}
                </button>
              ))
            : filename && (
                <div className="text-xs text-zinc-400">{filename}</div>
              )}
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="absolute text-muted-foreground hover:text-muted-foreground top-2 right-2 size-5 rounded-sm hover:bg-transparent"
        onClick={copyToClipboard}
        disabled={copied}
      >
        {copied ? <IconCheck /> : <IconCopy />}
      </Button>

      <div className="relative overflow-hidden">
        <ScrollArea className="w-full">
          <div className="min-w-max pb-3">
            <SyntaxHighlighter
              language={activeLanguage}
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: 0,
                background: "transparent",
                fontSize: "0.875rem",
                minWidth: "100%",
                display: "table",
              }}
              wrapLines={false}
              showLineNumbers={true}
              lineProps={(lineNumber) => ({
                style: {
                  backgroundColor: activeHighlightLines.includes(lineNumber)
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                  display: "block",
                  width: "100%",
                },
              })}
              PreTag="div"
            >
              {String(activeCode)}
            </SyntaxHighlighter>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};