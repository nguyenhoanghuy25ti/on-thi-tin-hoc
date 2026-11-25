"use client";

import { useState, useMemo } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

function detectLanguage(code: string, provided?: string): string {
  if (provided && provided !== "text") {
    const lower = provided.toLowerCase();
    if (lower === "html") return "markup";
    if (lower === "py") return "python";
    return lower;
  }
  const trimmed = code.trim();
  if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|--\s)/im.test(trimmed)) return "sql";
  if (/^\s*(<!DOCTYPE|<html|<div|<img|<a\s|<head|<body|<!--)/im.test(trimmed)) return "markup";
  if (/^\s*(\.[a-zA-Z0-9_-]+\s*\{|#[a-zA-Z0-9_-]+\s*\{|\/\*)/.test(trimmed)) return "css";
  if (/\b(def |print\(|import |range\(|elif |while |for .+ in )/.test(trimmed)) return "python";
  return "markup";
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const resolvedLang = useMemo(() => detectLanguage(code, language), [code, language]);

  const highlightedHtml = useMemo(() => {
    const grammar = Prism.languages[resolvedLang] || Prism.languages.markup;
    try {
      return Prism.highlight(code, grammar, resolvedLang);
    } catch {
      return "";
    }
  }, [code, resolvedLang]);

  const displayLang =
    language && language !== "text"
      ? language
      : resolvedLang === "markup"
      ? "html/css"
      : resolvedLang;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-mono uppercase font-semibold text-slate-300">
            {displayLang}
          </span>
          {title && <span className="text-slate-500">| {title}</span>}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Đã chép</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Sao chép</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto text-slate-200 leading-relaxed prism-code">
        {highlightedHtml ? (
          <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          <code>{code}</code>
        )}
      </pre>
    </div>
  );
}
