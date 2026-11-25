# NỀN TẢNG ÔN THI TỐT NGHIỆP THPT MÔN TIN HỌC (GDPT 2018)

Hệ thống luyện thi và ôn tập toàn diện môn Tin học bám sát cấu trúc đề minh họa mới nhất của Bộ Giáo dục & Đào tạo.

---

## 1. CÔNG NGHỆ SỬ DỤNG
- **Framework:** Next.js 14 (App Router) + TypeScript.
- **Styling:** TailwindCSS, Lucide React Icons.
- **Database:** SQLite (`prisma/dev.db`) + Prisma ORM.
- **Authentication:** JWT Cookie-based Auth (`jose` + `bcryptjs`) với 2 phân quyền `STUDENT` và `ADMIN`.
- **Markdown & Code Highlighting:** `react-markdown`, `remark-gfm` kèm component `CodeBlock` hỗ trợ sao chép nhanh mã nguồn.
- **In-Browser Code Playground:** HTML/CSS Live Iframe Preview, Python 3 Runner (Pyodide CDN), SQL Sandbox (với CSDL quan hệ mẫu).

---

## 2. TÀI KHOẢN MẪU (SEED DATA ĐÃ TẠO SẴN)
| Phân quyền | Email | Mật khẩu | Ghi chú |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (ADMIN)** | `admin@tinhoc.vn` | `admin123` | Có quyền vào `/admin`, thêm/sửa/xóa đề thi, nhập xuất JSON |
| **Học sinh (STUDENT)** | `hocsinh@tinhoc.vn` | `hocsinh123` | Thi thử, lưu lịch sử điểm số, xếp hạng trên Leaderboard |

---

## 3. CÁC TÍNH NĂNG NỔI BẬT

### 3.1. Cấu trúc Đề thi & Quy chế Chấm điểm chuẩn Bộ GD&ĐT (50 phút, Thang 10)
- **Tổng 28 câu hỏi (40 lệnh hỏi):**
  - **Phần I (6.0 điểm - 24 câu):** Trắc nghiệm 4 lựa chọn (A, B, C, D). Mỗi câu đúng nhận **0.25 điểm**.
  - **Phần II (4.0 điểm - 4 câu):** Trắc nghiệm Đúng/Sai (mỗi câu gồm 4 mệnh đề a, b, c, d):
    - **2 câu Phần chung:** Dành cho tất cả thí sinh (Mạng & An toàn thông tin, HTML/CSS).
    - **2 câu Phần riêng:** Thí sinh được chọn trước khi vào phòng thi:
      - Nhánh **CS (Khoa học máy tính):** Thuật toán tìm kiếm nhị phân, sắp xếp, hàm đệ quy Python, độ phức tạp $O(n)$.
      - Nhánh **ICT (Tin học ứng dụng):** Cơ sở dữ liệu quan hệ, khóa chính, khóa ngoại, câu lệnh SQL (`INNER JOIN`, `GROUP BY`, `HAVING`).
    - **Công thức chấm điểm lũy tiến Phần II:**
      - Đúng 1/4 ý: **0.1 điểm**
      - Đúng 2/4 ý: **0.25 điểm**
      - Đúng 3/4 ý: **0.5 điểm**
      - Đúng 4/4 ý: **1.0 điểm**
      - 0 ý đúng: **0.0 điểm**

### 3.2. Phòng Thi Thử Trực Tuyến (`/exams/[id]/take`)
- Đồng hồ đếm ngược 50 phút chính xác theo giây (tự động nộp bài khi hết giờ).
- Bảng điều hướng câu hỏi (Question Palette) hiển thị trạng thái câu đã làm, chưa làm, câu đánh dấu xem lại (Flag).
- Giao diện chọn phương án Phần I và toggle Đúng / Sai Phần II trực quan, chống chọn nhầm.
- Trang Kết quả (`/exams/[id]/result/[attemptId]`) chấm điểm tự động tức thì kèm **Lời giải chi tiết** từng câu.

### 3.3. Học Lý Thuyết & Flashcard 3D (`/learn`)
- Đọc bài giảng Markdown định dạng đẹp với code highlighting.
- Chế độ Flashcard lật thẻ 3D có nút lật mặt sau, qua lại, trộn thẻ (Shuffle).

### 3.4. Code Playground (`/playground`)
- **HTML/CSS:** Gõ mã nguồn và xem kết quả render trực tiếp trong iframe.
- **Python 3:** Chạy trực tiếp Python trên trình duyệt (thực thi thuật toán tìm kiếm nhị phân, Fibonacci...).
- **SQL Sandbox:** Thực thi câu lệnh `SELECT`, `INNER JOIN`, `GROUP BY` trên các bảng `HocSinh`, `DiemThi`, `Sach`.

### 3.5. Trang Quản Trị Admin (`/admin`)
- Quản lý đề thi, nhập đề thi nhanh bằng file JSON (1-click import), xuất JSON để sao lưu.
- Trình tạo câu hỏi hỗ trợ cả Phần I và Phần II với đầy đủ nhãn `COMMON`, `CS`, `ICT`.

---

## 4. HƯỚNG DẪN CHẠY ỨNG DỤNG

```bash
# 1. Di chuyển vào thư mục dự án
cd C:\Users\Admin\on-thi-tin-hoc

# 2. Khởi chạy server phát triển
npm run dev

# 3. Mở trình duyệt truy cập:
# http://localhost:3000
```
