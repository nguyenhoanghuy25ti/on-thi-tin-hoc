"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Bot,
  GraduationCap,
  MessageCircleQuestion,
  Search,
  Send,
  Sparkles,
} from "lucide-react";

interface CommunityQuestion {
  id: string;
  name: string;
  grade: string;
  topic: string;
  content: string;
  createdAt?: string;
  answer?: string;
  responder?: string;
  isCurated?: boolean;
}

const GRADE_OPTIONS = ["10", "11", "12"];
const FILTER_TABS = [
  { key: "all", label: "Tất cả" },
  { key: "10", label: "Lớp 10" },
  { key: "11", label: "Lớp 11" },
  { key: "12", label: "Lớp 12" },
];

const CURATED_QA_ITEMS: CommunityQuestion[] = [
  {
    id: "faq-exam-structure",
    name: "Ban chuyên môn IT Master",
    grade: "12",
    topic: "Cấu trúc đề thi Tốt nghiệp THPT (GDPT 2018)",
    content:
      "Cấu trúc đề thi Tốt nghiệp THPT môn Tin học hiện hành gồm mấy phần và cách tính điểm phần Đúng/Sai như thế nào?",
    answer:
      "Đề thi 50 phút gồm 28 câu (thang 10 điểm): Phần I có 24 câu trắc nghiệm 4 lựa chọn (0,25 điểm/câu = 6,0 điểm). Phần II có 4 câu Đúng/Sai (2 câu chung + 2 câu tự chọn theo định hướng CS hoặc ICT, mỗi câu gồm 4 ý a,b,c,d). Điểm Phần II tính lũy tiến theo số ý đúng trong mỗi câu: đúng 1 ý được 0,1đ; đúng 2 ý được 0,25đ; đúng 3 ý được 0,5đ; đúng cả 4 ý được 1,0đ.",
    responder: "Giáo viên Tin học",
    createdAt: "2026-11-20T08:00:00.000Z",
    isCurated: true,
  },
  {
    id: "faq-cs-vs-ict",
    name: "Ban chuyên môn IT Master",
    grade: "12",
    topic: "Chọn nhánh CS hay ICT khi thi THPT",
    content:
      "Em nên chọn nhánh Khoa học máy tính (CS) hay Tin học ứng dụng (ICT) ở Phần II của đề thi?",
    answer:
      "Nếu em mạnh về tư duy lập trình Python, đệ quy, tìm kiếm nhị phân, sắp xếp và phân tích độ phức tạp Big-O thì nên chọn nhánh CS. Nếu em học chắc về thiết kế Web (HTML5/CSS3), mô hình Cơ sở dữ liệu quan hệ (khóa chính, khóa ngoại) và câu lệnh SQL (SELECT, JOIN, GROUP BY, HAVING) thì chọn nhánh ICT.",
    responder: "Giáo viên Tin học",
    createdAt: "2026-11-19T08:00:00.000Z",
    isCurated: true,
  },
  {
    id: "faq-sql-where-having",
    name: "Hoàng Nam",
    grade: "12",
    topic: "Truy vấn SQL (WHERE vs HAVING)",
    content:
      "Khi nào mình dùng WHERE và khi nào bắt buộc phải dùng HAVING trong câu lệnh SELECT vậy mọi người?",
    answer:
      "WHERE dùng để lọc từng bản ghi (dòng) thỏa mãn điều kiện TRƯỚC KHI gom nhóm (GROUP BY). HAVING dùng để lọc các nhóm SAU KHI đã gom nhóm và tính các hàm tổng hợp (COUNT, SUM, AVG, MIN, MAX). Lưu ý: không được đặt hàm gộp như COUNT(*) > 30 bên trong WHERE.",
    responder: "Trợ lý AI IT Master",
    createdAt: "2026-11-18T08:00:00.000Z",
    isCurated: true,
  },
  {
    id: "faq-python-range",
    name: "Minh Anh",
    grade: "10",
    topic: "Vòng lặp for và range() trong Python",
    content:
      "Cho em hỏi tại sao range(1, 6) trong Python chỉ lặp 5 lần chứ không phải 6 lần ạ?",
    answer:
      "Trong Python, hàm range(start, stop) sinh dãy số nguyên nửa khoảng [start, stop), tức là bắt đầu từ `start` và dừng TRƯỚC `stop` (không bao gồm `stop`). Vì vậy range(1, 6) tạo ra dãy [1, 2, 3, 4, 5] gồm đúng 5 phần tử. Quy ước tương tự cũng áp dụng khi cắt xâu s[start:end].",
    responder: "Giáo viên Tin học",
    createdAt: "2026-11-17T08:00:00.000Z",
    isCurated: true,
  },
  {
    id: "faq-network-nat-dns",
    name: "Bảo Ngọc",
    grade: "11",
    topic: "Mạng máy tính (DNS, Switch, Router)",
    content:
      "Điểm khác nhau cốt lõi giữa Switch và Router, cũng như vai trò của DNS là gì ạ?",
    answer:
      "Switch (bộ chuyển mạch) kết nối các thiết bị trong cùng một mạng cục bộ LAN dựa trên địa chỉ MAC. Router (bộ định tuyến) kết nối các mạng khác nhau (LAN ra Internet) dựa trên địa chỉ IP và kỹ thuật NAT. Còn DNS đóng vai trò như 'danh bạ Internet', phân giải tên miền dễ nhớ (vd: moet.gov.vn) sang địa chỉ IP số.",
    responder: "Trợ lý AI IT Master",
    createdAt: "2026-11-16T08:00:00.000Z",
    isCurated: true,
  },
];

function generateAutoAnswer(topic: string, content: string, grade: string): {
  answer: string;
  responder: string;
} {
  const text = `${topic} ${content}`.toLowerCase();

  if (text.includes("where") || text.includes("having") || text.includes("sql") || text.includes("group by")) {
    return {
      responder: "Trợ lý AI IT Master",
      answer:
        "Gợi ý nhanh về SQL: Thứ tự chuẩn là SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY. Dùng WHERE để lọc từng dòng trước khi gom nhóm; dùng HAVING để lọc điều kiện có chứa hàm gộp (COUNT, SUM, AVG, MIN, MAX) sau GROUP BY.",
    };
  }
  if (text.includes("range") || text.includes("for") || text.includes("while") || text.includes("python")) {
    return {
      responder: "Trợ lý AI IT Master",
      answer:
        "Gợi ý Python: `input()` luôn trả về kiểu xâu (`str`), cần ép kiểu `int(input())` khi tính toán; `range(a, b)` chạy từ `a` đến `b - 1`; phép `//` chia lấy nguyên và `%` chia lấy dư.",
    };
  }
  if (text.includes("nhị phân") || text.includes("tìm kiếm") || text.includes("big-o") || text.includes("độ phức tạp")) {
    return {
      responder: "Trợ lý AI IT Master",
      answer:
        "Gợi ý Thuật toán: Tìm kiếm nhị phân yêu cầu dãy ĐÃ ĐƯỢC SẮP XẾP và đạt độ phức tạp O(log n). Các thuật toán sắp xếp cơ bản (Nổi bọt, Chọn, Chèn) có độ phức tạp O(n²), còn Quick Sort / Merge Sort là O(n log n).",
    };
  }
  if (text.includes("cấu trúc") || text.includes("đúng/sai") || text.includes("đúng sai") || text.includes("thang điểm")) {
    return {
      responder: "Giáo viên Tin học",
      answer:
        "Theo cấu trúc đề thi THPT 2018: Phần I gồm 24 câu (0,25đ/câu); Phần II gồm 4 câu Đúng/Sai (mỗi câu 4 ý a,b,c,d: đúng 1 ý = 0,1đ, 2 ý = 0,25đ, 3 ý = 0,5đ, 4 ý = 1,0đ).",
    };
  }
  if (text.includes("mạng") || text.includes("dns") || text.includes("ip") || text.includes("tcp") || text.includes("router")) {
    return {
      responder: "Trợ lý AI IT Master",
      answer:
        "Gợi ý Mạng máy tính: Switch nối các máy trong LAN (theo MAC), Router nối các mạng khác nhau (theo IP), DNS phân giải tên miền thành IP. IPv4 dài 32 bit, IPv6 dài 128 bit; HTTP cổng 80 và HTTPS cổng 443.",
    };
  }

  return {
    responder: "Trợ lý AI IT Master",
    answer: `Câu hỏi Lớp ${grade} của em đã được ghi nhận! Em có thể xem lại phần Tóm tắt trọng tâm SGK Lớp ${grade} tại mục Kiến thức SGK và làm thử 20 câu ôn luyện tương ứng; giáo viên phụ trách sẽ bổ sung giải đáp chi tiết thêm nếu cần.`,
  };
}

export default function QaPage() {
  const [dbItems, setDbItems] = useState<CommunityQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [filterGrade, setFilterGrade] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [form, setForm] = useState({ name: "", grade: "10", topic: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch("/api/qa");
      const data = await res.json();
      if (res.ok && Array.isArray(data.items)) {
        setDbItems(data.items);
        setLoadError(false);
      } else {
        setLoadError(true);
      }
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!form.name.trim() || !form.content.trim()) {
      setFormError("Em cần điền tên hiển thị và nội dung câu hỏi.");
      return;
    }

    setSubmitting(true);
    const auto = generateAutoAnswer(form.topic, form.content, form.grade);

    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Chưa gửi được câu hỏi. Em thử lại giúp nhé.");
      } else {
        const created: CommunityQuestion = {
          ...(data.item || {
            id: `local-${Date.now()}`,
            name: form.name.trim(),
            grade: form.grade,
            topic: form.topic.trim(),
            content: form.content.trim(),
            createdAt: new Date().toISOString(),
          }),
          answer: auto.answer,
          responder: auto.responder,
        };
        setDbItems((prev) => [created, ...prev]);
        setForm({ name: "", grade: form.grade, topic: "", content: "" });
        setFormSuccess("Đã đăng câu hỏi thành công và hiển thị ngay trong danh sách!");
      }
    } catch {
      // Fallback immediate display if DB is offline
      const localItem: CommunityQuestion = {
        id: `local-${Date.now()}`,
        name: form.name.trim(),
        grade: form.grade,
        topic: form.topic.trim(),
        content: form.content.trim(),
        createdAt: new Date().toISOString(),
        answer: auto.answer,
        responder: auto.responder,
      };
      setDbItems((prev) => [localItem, ...prev]);
      setForm({ name: "", grade: form.grade, topic: "", content: "" });
      setFormSuccess("Đã thêm câu hỏi vào phiên thảo luận hiện tại.");
    } finally {
      setSubmitting(false);
    }
  };

  // Merge live DB items + curated THPT Q&A (deduplicate overlapping content)
  const allItems = useMemo(() => {
    const normalizedDb = dbItems.map((item) => {
      const auto = generateAutoAnswer(item.topic, item.content, item.grade);
      return {
        ...item,
        answer: item.answer || auto.answer,
        responder: item.responder || auto.responder,
      };
    });
    const dbContents = new Set(normalizedDb.map((i) => i.content.trim().toLowerCase()));
    const extraCurated = CURATED_QA_ITEMS.filter(
      (c) => !dbContents.has(c.content.trim().toLowerCase())
    );
    return [...normalizedDb, ...extraCurated];
  }, [dbItems]);

  const visibleItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allItems.filter((item) => {
      if (filterGrade !== "all" && String(item.grade) !== filterGrade) return false;
      if (!q) return true;
      return (
        item.content.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        (item.answer || "").toLowerCase().includes(q)
      );
    });
  }, [allItems, filterGrade, searchQuery]);

  return (
    <div className="container-page py-10 lg:py-14 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            HỎI ĐÁP TIN HỌC & CẤU TRÚC ĐỀ THI THPT
          </span>
          <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Hỏi đáp cùng Giáo viên & Trợ lý AI
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Tìm kiếm lời giải cho các thắc mắc về kiến thức SGK Kết nối tri thức, cú pháp Python/SQL hoặc đặt câu hỏi mới để nhận giải đáp tức thì.
          </p>
        </div>

        <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterGrade(tab.key)}
              className={`rounded-lg px-3 py-2 text-[12px] font-semibold transition ${
                filterGrade === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm câu hỏi theo từ khóa (vd: cấu trúc đề thi, WHERE HAVING, range, DNS, tìm kiếm nhị phân)..."
          className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div className="space-y-3">
          {loadError && dbItems.length === 0 && (
            <p className="rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-3 text-[12.5px] text-amber-700 dark:text-amber-300">
              Đang hiển thị kho câu hỏi thảo luận chuẩn (chế độ ngoại tuyến).
            </p>
          )}

          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-2xl border border-border bg-card"
                />
              ))}
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-12 text-center">
              <MessageCircleQuestion className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">
                Không tìm thấy câu hỏi nào khớp với từ khóa &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="mt-1 text-[12.5px] text-muted-foreground">
                Em có thể xóa bộ lọc hoặc gửi câu hỏi mới ở khung bên cạnh.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {visibleItems.map((item) => {
                const isTeacher = item.responder?.includes("Giáo viên");
                return (
                  <li
                    key={item.id}
                    className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[13px] font-bold text-foreground">
                          {item.name}
                        </span>
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                          Lớp {item.grade}
                        </span>
                        {item.topic && (
                          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-foreground">
                            {item.topic}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[10.5px] text-muted-foreground">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("vi-VN", {
                              timeZone: "Asia/Bangkok",
                            })
                          : ""}
                      </span>
                    </div>

                    <p className="whitespace-pre-line text-[14px] font-medium leading-relaxed text-foreground">
                      {item.content}
                    </p>

                    {item.answer && (
                      <div className="rounded-xl border border-primary/20 bg-accent/60 p-3.5 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-primary">
                          {isTeacher ? (
                            <GraduationCap className="h-3.5 w-3.5" />
                          ) : (
                            <Bot className="h-3.5 w-3.5" />
                          )}
                          <span>{item.responder || "Giải đáp chi tiết"}</span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-foreground/85">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="lg:sticky lg:top-24">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
          >
            <h2 className="font-heading text-lg font-bold text-foreground">
              Gửi câu hỏi mới
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Câu hỏi sẽ hiển thị ngay lập tức kèm gợi ý giải đáp tự động.
            </p>

            <label className="mt-5 block text-[12px] font-semibold text-foreground">
              Tên hiển thị *
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ví dụ: Minh Anh - 12A1"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            />

            <label className="mt-4 block text-[12px] font-semibold text-foreground">
              Khối lớp
            </label>
            <select
              value={form.grade}
              onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            >
              {GRADE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </select>

            <label className="mt-4 block text-[12px] font-semibold text-foreground">
              Chủ đề / bài học
            </label>
            <input
              value={form.topic}
              onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
              placeholder="Ví dụ: Vòng lặp while, Truy vấn SQL, Cấu trúc đề thi"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            />

            <label className="mt-4 block text-[12px] font-semibold text-foreground">
              Nội dung câu hỏi *
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              rows={5}
              placeholder="Em chưa hiểu chỗ này vì…"
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            />

            {formError && (
              <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-[12px] text-destructive">
                {formError}
              </p>
            )}

            {formSuccess && (
              <p className="mt-3 rounded-lg bg-emerald-500/15 px-3 py-2 text-[12px] font-semibold text-emerald-700 dark:text-emerald-300">
                {formSuccess}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-5 w-full disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Đang gửi…" : "Gửi câu hỏi"}
            </button>

            <p className="mt-3 text-[11.5px] leading-relaxed text-muted-foreground">
              Câu hỏi được công khai để các bạn cùng tham khảo — em không nên ghi số điện thoại hay địa chỉ cá nhân.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
