'use client'

import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Button } from "@/components/ui/button"
import { Check, Copy, Download } from 'lucide-react';
import { useTheme } from 'next-themes';

interface CodeEditorProps {
  language: 'typescript' | 'tsx';
  value: string;
  fileName: string;
}

export function CodeEditor({ language, value, fileName }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  const lines = value.split('\n');
  const isLargeFile = lines.length > 40;

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLargeFile) {
    return (
      <div className="relative rounded-sm overflow-hidden p-4 bg-background">
        <p className="mb-4">This file is too large to preview ({lines.length} lines).</p>
        <Button
          variant="outline"
          className="mr-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download {fileName}
        </Button>
        <Button
          variant="outline"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 mr-2" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative rounded-sm overflow-hidden">
      <div className="from-stone-100 to-stone-200 dark:to-black/90 dark:via-stone-950/10 dark:from-stone-950/90 absolute inset-0 bg-gradient-to-tr" />
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 z-10 w-8 h-8 p-0 hover:bg-accent hover:text-accent-foreground"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <Highlight 
          theme={resolvedTheme === "dark" ? themes.dracula : themes.github} 
          code={value} 
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} text-sm overflow-x-auto p-4`} style={{ ...style, background: 'transparent' }}>
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    <span className="inline-block w-8 text-right text-gray-500 select-none mr-2">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

