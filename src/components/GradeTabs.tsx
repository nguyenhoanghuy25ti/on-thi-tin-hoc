import Link from "next/link";
import { CURRICULUM } from "@/lib/curriculum";

export default function GradeTabs({
  basePath,
  activeGrade,
  extraParams,
}: {
  basePath: string;
  activeGrade: number;
  extraParams?: Record<string, string>;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card p-1.5 shadow-sm">
      {CURRICULUM.map((g) => {
        const params = new URLSearchParams({ ...(extraParams || {}), grade: String(g.grade) });
        const isCurrent = Number(activeGrade) === g.grade;
        return (
          <Link
            key={g.grade}
            href={`${basePath}?${params.toString()}`}
            className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold transition ${
              isCurrent
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            Khối {g.grade}
          </Link>
        );
      })}
    </div>
  );
}
