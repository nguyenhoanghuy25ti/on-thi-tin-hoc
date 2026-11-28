"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="space-y-3 text-[14.5px] leading-relaxed text-foreground/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1({ children }: any) {
            return (
              <h1 className="font-heading text-2xl font-extrabold text-foreground mt-4 mb-2">
                {children}
              </h1>
            );
          },
          h2({ children }: any) {
            return (
              <h2 className="font-heading text-lg font-bold text-foreground mt-5 mb-2 border-b border-border/60 pb-1.5">
                {children}
              </h2>
            );
          },
          h3({ children }: any) {
            return (
              <h3 className="font-heading text-[15.5px] font-bold text-primary mt-4 mb-1.5">
                {children}
              </h3>
            );
          },
          h4({ children }: any) {
            return (
              <h4 className="font-heading text-sm font-bold text-foreground mt-3 mb-1">
                {children}
              </h4>
            );
          },
          p({ children }: any) {
            return <p className="leading-relaxed text-foreground/90 my-2">{children}</p>;
          },
          strong({ children }: any) {
            return <strong className="font-bold text-foreground">{children}</strong>;
          },
          em({ children }: any) {
            return <em className="italic text-foreground/85">{children}</em>;
          },
          ul({ children }: any) {
            return (
              <ul className="my-2.5 ml-5 list-disc space-y-1.5 marker:text-primary">
                {children}
              </ul>
            );
          },
          ol({ children }: any) {
            return (
              <ol className="my-2.5 ml-5 list-decimal space-y-1.5 marker:font-semibold marker:text-primary">
                {children}
              </ol>
            );
          },
          li({ children }: any) {
            return <li className="leading-relaxed pl-1">{children}</li>;
          },
          blockquote({ children }: any) {
            return (
              <blockquote className="my-3 rounded-r-xl border-l-4 border-primary bg-accent/60 px-4 py-3 text-[13.5px] text-foreground/90">
                {children}
              </blockquote>
            );
          },
          hr() {
            return <hr className="my-4 border-border" />;
          },
          a({ href, children }: any) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline underline-offset-2 hover:opacity-80"
              >
                {children}
              </a>
            );
          },
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "text";
            const codeString = String(children).replace(/\n$/, "");

            if (!inline && (match || codeString.includes("\n"))) {
              if (language === "text") {
                return (
                  <pre className="my-3 overflow-x-auto rounded-xl border border-border bg-secondary/70 p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-foreground">
                    <code>{codeString}</code>
                  </pre>
                );
              }
              return <CodeBlock code={codeString} language={language} />;
            }

            return (
              <code
                className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[12.5px] font-semibold text-primary"
                {...props}
              >
                {children}
              </code>
            );
          },
          table({ children }: any) {
            return (
              <div className="my-4 overflow-x-auto rounded-xl border border-border">
                <table className="min-w-full divide-y divide-border text-[13.5px]">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }: any) {
            return <thead className="bg-secondary/80">{children}</thead>;
          },
          th({ children }: any) {
            return (
              <th className="px-4 py-2.5 text-left font-heading text-xs font-bold uppercase tracking-wider text-foreground">
                {children}
              </th>
            );
          },
          td({ children }: any) {
            return (
              <td className="border-t border-border/70 px-4 py-2.5 align-top text-foreground/85">
                {children}
              </td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
