"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  RotateCcw,
  Globe,
  Terminal,
  Database,
  Table as TableIcon,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import type { Database as SqlJsDatabase } from "sql.js";

type PlaygroundTab = "html" | "python" | "sql";

const SQL_INIT_SCRIPT = `
CREATE TABLE HocSinh (
  MaHS TEXT PRIMARY KEY,
  HoTen TEXT NOT NULL,
  Lop TEXT NOT NULL,
  DiemTB REAL NOT NULL
);
INSERT INTO HocSinh VALUES
  ('HS01', 'Nguyễn Văn An', '12A1', 8.5),
  ('HS02', 'Trần Thị Bình', '12A1', 9.2),
  ('HS03', 'Lê Hoàng Cường', '12A2', 7.8),
  ('HS04', 'Phạm Minh Dũng', '12A2', 8.9),
  ('HS05', 'Vũ Mai Hoa', '12A3', 9.5);

CREATE TABLE DiemThi (
  MaHS TEXT NOT NULL,
  MonHoc TEXT NOT NULL,
  Diem REAL NOT NULL,
  FOREIGN KEY (MaHS) REFERENCES HocSinh(MaHS)
);
INSERT INTO DiemThi VALUES
  ('HS01', 'Tin học', 9.0),
  ('HS01', 'Toán', 8.5),
  ('HS02', 'Tin học', 9.5),
  ('HS03', 'Tin học', 7.5),
  ('HS04', 'Tin học', 8.8),
  ('HS05', 'Tin học', 10.0);

CREATE TABLE Sach (
  MaSach TEXT PRIMARY KEY,
  TenSach TEXT NOT NULL,
  TheLoai TEXT NOT NULL,
  DonGia INTEGER NOT NULL,
  SoLuongTon INTEGER NOT NULL
);
INSERT INTO Sach VALUES
  ('S01', 'Tin học 12 (Định hướng CS)', 'Giáo khoa', 45000, 150),
  ('S02', 'Tin học 12 (Định hướng ICT)', 'Giáo khoa', 45000, 200),
  ('S03', 'Lập trình Python từ cơ bản đến nâng cao', 'Tham khảo', 120000, 45),
  ('S04', 'Cơ sở dữ liệu & SQL thực hành', 'Tham khảo', 98000, 32),
  ('S05', 'Tuyển tập 100 đề ôn thi THPT Tin học', 'Luyện thi', 85000, 80);

CREATE TABLE MuonSach (
  MaPhieu TEXT PRIMARY KEY,
  MaHS TEXT NOT NULL,
  MaSach TEXT NOT NULL,
  NgayMuon TEXT NOT NULL,
  SoLuong INTEGER NOT NULL,
  FOREIGN KEY (MaHS) REFERENCES HocSinh(MaHS),
  FOREIGN KEY (MaSach) REFERENCES Sach(MaSach)
);
INSERT INTO MuonSach VALUES
  ('PM01', 'HS01', 'S03', '2025-03-01', 1),
  ('PM02', 'HS02', 'S04', '2025-03-02', 2),
  ('PM03', 'HS05', 'S05', '2025-03-05', 1);
`;

const defaultHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      padding: 24px;
      background: #f8fafc;
      color: #0f172a;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      border: 1px solid #e2e8f0;
      max-width: 400px;
      margin: 0 auto;
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: #eff6ff;
      color: #2563eb;
      font-weight: 700;
      border-radius: 9999px;
      font-size: 12px;
    }
    h2 { margin: 12px 0 8px; color: #1e293b; }
    p { color: #64748b; font-size: 14px; line-height: 1.5; }
    .btn {
      display: inline-block;
      margin-top: 16px;
      padding: 10px 20px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      font-weight: 600;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">CLB Tin Học THPT</span>
    <h2>Chào mừng tân học sinh 2025</h2>
    <p>Cùng ôn luyện cấu trúc đề thi mới nhất và chinh phục điểm 10 môn Tin học nhé!</p>
    <a href="#" class="btn">Tham gia ngay</a>
  </div>
</body>
</html>`;

const defaultPython = `# Thuật toán tìm kiếm nhị phân (Binary Search)
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    steps = 0

    while left <= right:
        steps += 1
        mid = (left + right) // 2
        print(f"Bước {steps}: Xét chỉ số mid = {mid}, giá trị = {arr[mid]}")

        if arr[mid] == target:
            return mid, steps
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1, steps

ds = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
can_tim = 23

print(f"Dãy số: {ds}")
print(f"Số cần tìm: {can_tim}")
print("-" * 40)

vitri, tong_buoc = binary_search(ds, can_tim)

if vitri != -1:
    print(f"==> TÌM THẤY {can_tim} tại chỉ số {vitri} sau {tong_buoc} bước so sánh!")
else:
    print(f"==> Không tìm thấy {can_tim} trong danh sách.")
`;

const defaultSQL = `-- Truy vấn học sinh có Điểm TB >= 8.5 (chạy trên SQLite thật qua sql.js)
SELECT MaHS, HoTen, Lop, DiemTB
FROM HocSinh
WHERE DiemTB >= 8.5
ORDER BY DiemTB DESC;`;

const SQL_PRESETS = [
  {
    label: "Lọc HocSinh >= 8.5",
    sql: `SELECT MaHS, HoTen, Lop, DiemTB\nFROM HocSinh\nWHERE DiemTB >= 8.5\nORDER BY DiemTB DESC;`,
  },
  {
    label: "INNER JOIN DiemThi",
    sql: `SELECT HocSinh.HoTen, HocSinh.Lop, DiemThi.MonHoc, DiemThi.Diem\nFROM HocSinh\nINNER JOIN DiemThi ON HocSinh.MaHS = DiemThi.MaHS\nWHERE DiemThi.MonHoc = 'Tin học'\nORDER BY DiemThi.Diem DESC;`,
  },
  {
    label: "GROUP BY & HAVING (Sach)",
    sql: `SELECT TheLoai, COUNT(MaSach) AS SoDauSach, SUM(SoLuongTon) AS TongTonKho\nFROM Sach\nGROUP BY TheLoai\nHAVING SUM(SoLuongTon) >= 50\nORDER BY TongTonKho DESC;`,
  },
  {
    label: "JOIN 3 bảng (MuonSach)",
    sql: `SELECT MuonSach.MaPhieu, HocSinh.HoTen, Sach.TenSach, MuonSach.NgayMuon, MuonSach.SoLuong\nFROM MuonSach\nINNER JOIN HocSinh ON MuonSach.MaHS = HocSinh.MaHS\nINNER JOIN Sach ON MuonSach.MaSach = Sach.MaSach;`,
  },
];

const PYTHON_PRESETS = [
  { label: "Tìm kiếm nhị phân", code: defaultPython },
  {
    label: "Đệ quy Fibonacci",
    code: `def fibonacci(n):\n    if n <= 0:\n        return 0\n    elif n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nfor i in range(8):\n    print(f"F({i}) = {fibonacci(i)}")`,
  },
  {
    label: "Sắp xếp nổi bọt (Bubble Sort)",
    code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        for j in range(n - 1 - i):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n\nds = [64, 34, 25, 12, 22, 11, 90]\nprint("Trước sắp xếp:", ds)\nprint("Sau sắp xếp:  ", bubble_sort(ds.copy()))`,
  },
];

interface SqlResultSet {
  columns: string[];
  rows: any[][];
}

export default function PlaygroundPage() {
  const [tab, setTab] = useState<PlaygroundTab>("python");

  const [htmlCode, setHtmlCode] = useState(defaultHTML);
  const [pythonCode, setPythonCode] = useState(defaultPython);
  const [sqlCode, setSqlCode] = useState(defaultSQL);

  // Python states
  const [pythonOutput, setPythonOutput] = useState("");
  const [isPyRunning, setIsPyRunning] = useState(false);

  // sql.js states
  const dbRef = useRef<SqlJsDatabase | null>(null);
  const [sqlReady, setSqlReady] = useState(false);
  const [sqlError, setSqlError] = useState<string | null>(null);
  const [sqlMessage, setSqlMessage] = useState<string>("");
  const [sqlResultSets, setSqlResultSets] = useState<SqlResultSet[]>([]);

  const initDatabase = useCallback(async () => {
    try {
      setSqlError(null);
      const initSqlJs = (await import("sql.js")).default;
      const SQL = await initSqlJs({
        locateFile: () => "/sql-wasm.wasm",
      });
      if (dbRef.current) {
        dbRef.current.close();
      }
      const db = new SQL.Database();
      db.run(SQL_INIT_SCRIPT);
      dbRef.current = db;
      setSqlReady(true);
      return db;
    } catch (err: any) {
      setSqlError(`Không thể khởi tạo SQLite (sql.js): ${err.message}`);
      return null;
    }
  }, []);

  const executeSQL = useCallback(
    async (queryToRun?: string) => {
      const sqlText = (queryToRun ?? sqlCode).trim();
      if (!sqlText) {
        setSqlResultSets([]);
        setSqlError("Vui lòng nhập câu lệnh SQL.");
        setSqlMessage("");
        return;
      }

      let db = dbRef.current;
      if (!db) {
        db = await initDatabase();
        if (!db) return;
      }

      try {
        setSqlError(null);
        const results = db.exec(sqlText);
        if (results.length === 0) {
          setSqlResultSets([]);
          setSqlMessage("Câu lệnh đã thực thi thành công (không có dòng kết quả trả về).");
        } else {
          setSqlResultSets(
            results.map((r) => ({
              columns: r.columns,
              rows: r.values,
            }))
          );
          const totalRows = results.reduce((acc, r) => acc + r.values.length, 0);
          setSqlMessage(
            `Truy vấn SQLite thành công! Trả về ${totalRows} dòng dữ liệu (${results.length} bảng kết quả).`
          );
        }
      } catch (err: any) {
        setSqlResultSets([]);
        setSqlMessage("");
        setSqlError(`Lỗi SQLite: ${err.message}`);
      }
    },
    [sqlCode, initDatabase]
  );

  useEffect(() => {
    if (tab === "sql" && !sqlReady) {
      initDatabase().then((db) => {
        if (db) executeSQL(defaultSQL);
      });
    }
  }, [tab, sqlReady, initDatabase, executeSQL]);

  const handleResetSqlDb = async () => {
    const db = await initDatabase();
    if (db) {
      setSqlCode(defaultSQL);
      executeSQL(defaultSQL);
    }
  };

  const runPython = async () => {
    setIsPyRunning(true);
    setPythonOutput("Đang khởi tạo môi trường Python 3 (Pyodide)...\n");

    try {
      const win = window as any;
      if (!win.loadPyodide) {
        setPythonOutput((prev) => prev + "Đang tải bộ thông dịch Pyodide từ CDN...\n");
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Không thể tải Pyodide CDN (kiểm tra kết nối mạng)."));
          document.head.appendChild(script);
        });
      }

      if (!win.pyodideInstance) {
        setPythonOutput((prev) => prev + "Đang tải thư viện chuẩn Python runtime...\n");
        win.pyodideInstance = await win.loadPyodide({
          stdout: (text: string) => {
            setPythonOutput((prev) => prev + text + "\n");
          },
          stderr: (text: string) => {
            setPythonOutput((prev) => prev + "[Lỗi] " + text + "\n");
          },
        });
      }

      setPythonOutput("");
      const startTime = performance.now();
      await win.pyodideInstance.runPythonAsync(pythonCode);
      const endTime = performance.now();
      setPythonOutput(
        (prev) => prev + `\n--- Thực thi hoàn tất trong ${((endTime - startTime) / 1000).toFixed(3)}s ---`
      );
    } catch (err: any) {
      setPythonOutput((prev) => prev + `\n[Lỗi thực thi]: ${err.message}`);
    } finally {
      setIsPyRunning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header and Tab Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            In-Browser Code Playground
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Thực Hành Lập Trình & Truy Vấn Trực Tuyến
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Chạy trực tiếp Python 3 (Pyodide), live render HTML5/CSS3 và thực thi mọi câu lệnh SQLite (sql.js) ngay trên trình duyệt.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setTab("html")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              tab === "html"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4 text-orange-500" />
            HTML / CSS Live
          </button>

          <button
            onClick={() => setTab("python")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              tab === "python"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Terminal className="w-4 h-4 text-blue-500" />
            Python 3 Runner
          </button>

          <button
            onClick={() => setTab("sql")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              tab === "sql"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Database className="w-4 h-4 text-emerald-500" />
            SQLite Sandbox
          </button>
        </div>
      </div>

      {/* Presets bar for Python & SQL */}
      {tab === "python" && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-600 dark:text-slate-400">Bài mẫu nhanh:</span>
          {PYTHON_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setPythonCode(p.code)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {tab === "sql" && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-600 dark:text-slate-400">Truy vấn mẫu:</span>
          {SQL_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setSqlCode(p.sql);
                executeSQL(p.sql);
              }}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Editor & Output Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[550px]">
        {/* Left Side: Code Editor */}
        <div className="flex flex-col bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-slate-400 ml-2">
                {tab === "html" && "index.html"}
                {tab === "python" && "main.py"}
                {tab === "sql" && "query.sql (SQLite 3)"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {tab === "html" && (
                <button
                  onClick={() => setHtmlCode(defaultHTML)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white rounded bg-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Đặt lại
                </button>
              )}

              {tab === "python" && (
                <>
                  <button
                    onClick={() => setPythonCode(defaultPython)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white rounded bg-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Mã mẫu
                  </button>
                  <button
                    onClick={runPython}
                    disabled={isPyRunning}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isPyRunning ? "Đang chạy..." : "Chạy Python"}
                  </button>
                </>
              )}

              {tab === "sql" && (
                <>
                  <button
                    onClick={handleResetSqlDb}
                    title="Khôi phục dữ liệu CSDL gốc"
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white rounded bg-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset CSDL
                  </button>
                  <button
                    onClick={() => executeSQL()}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Thực thi SQL
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 p-4 flex">
            {tab === "html" && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[460px] bg-transparent font-mono text-xs sm:text-sm text-slate-200 resize-none focus:outline-none leading-relaxed"
              />
            )}
            {tab === "python" && (
              <textarea
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[460px] bg-transparent font-mono text-xs sm:text-sm text-slate-200 resize-none focus:outline-none leading-relaxed"
              />
            )}
            {tab === "sql" && (
              <textarea
                value={sqlCode}
                onChange={(e) => setSqlCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[460px] bg-transparent font-mono text-xs sm:text-sm text-slate-200 resize-none focus:outline-none leading-relaxed"
              />
            )}
          </div>
        </div>

        {/* Right Side: Output Viewer */}
        <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              {tab === "html" && <Globe className="w-4 h-4 text-orange-500" />}
              {tab === "python" && <Terminal className="w-4 h-4 text-blue-500" />}
              {tab === "sql" && <TableIcon className="w-4 h-4 text-emerald-500" />}
              <span>
                {tab === "html" && "HTML/CSS Live Output Preview"}
                {tab === "python" && "Python 3 Terminal Console"}
                {tab === "sql" && "SQLite Engine (sql.js) - Kết quả truy vấn"}
              </span>
            </div>
            {tab === "python" && (
              <button
                onClick={() => setPythonOutput("")}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                Xóa màn hình
              </button>
            )}
          </div>

          <div className="flex-1 p-4 flex flex-col overflow-auto bg-slate-50/50 dark:bg-slate-950/50">
            {tab === "html" && (
              <iframe
                title="Live HTML Preview"
                srcDoc={htmlCode}
                sandbox="allow-scripts"
                className="w-full h-full min-h-[460px] bg-white rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner"
              />
            )}

            {tab === "python" && (
              <div className="w-full h-full min-h-[460px] bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-xs sm:text-sm text-emerald-400 overflow-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                {pythonOutput || (
                  <span className="text-slate-500 italic">
                    Nhấn nút &quot;Chạy Python&quot; ở trên để thực thi đoạn mã...
                  </span>
                )}
              </div>
            )}

            {tab === "sql" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Lược đồ SQLite sẵn có:</span>
                  <code className="bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-mono">
                    HocSinh(MaHS, HoTen, Lop, DiemTB)
                  </code>
                  <code className="bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                    DiemThi(MaHS, MonHoc, Diem)
                  </code>
                  <code className="bg-slate-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded font-mono">
                    Sach(MaSach, TenSach, TheLoai, DonGia, SoLuongTon)
                  </code>
                  <code className="bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded font-mono">
                    MuonSach(MaPhieu, MaHS, MaSach, NgayMuon, SoLuong)
                  </code>
                </div>

                {sqlError && (
                  <div className="text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-3 py-2.5 rounded-lg border border-rose-200 dark:border-rose-800 font-mono">
                    {sqlError}
                  </div>
                )}

                {sqlMessage && !sqlError && (
                  <div className="text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    {sqlMessage}
                  </div>
                )}

                {sqlResultSets.map((result, setIdx) => (
                  <div
                    key={setIdx}
                    className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm"
                  >
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-800">
                        <tr>
                          {result.columns.map((col, idx) => (
                            <th
                              key={idx}
                              className="px-4 py-2.5 text-left font-bold text-slate-800 dark:text-slate-100 font-mono"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                        {result.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-2 text-slate-700 dark:text-slate-300">
                                {cell === null ? (
                                  <span className="italic text-slate-400">NULL</span>
                                ) : typeof cell === "number" ? (
                                  cell.toLocaleString()
                                ) : (
                                  String(cell)
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
