import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for On Thi Tin Hoc THPT 2018...");

  // 1. Clean existing records
  await prisma.contactRequest.deleteMany();
  await prisma.communityQuestion.deleteMany();
  await prisma.examAttempt.deleteMany();
  await prisma.question.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const adminPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("hocsinh123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Quản trị viên THPT",
      email: "admin@tinhoc.vn",
      passwordHash: adminPassword,
      role: "ADMIN",
      orientationPreference: "ICT",
    },
  });

  const student = await prisma.user.create({
    data: {
      name: "Nguyễn Văn Học Sinh",
      email: "hocsinh@tinhoc.vn",
      passwordHash: studentPassword,
      role: "STUDENT",
      orientationPreference: "CS",
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: "Trần Thị Minh Anh",
      email: "minhanh@tinhoc.vn",
      passwordHash: studentPassword,
      role: "STUDENT",
      orientationPreference: "ICT",
    },
  });

  const student3 = await prisma.user.create({
    data: {
      name: "Lê Hoàng Nam",
      email: "hoangnam@tinhoc.vn",
      passwordHash: studentPassword,
      role: "STUDENT",
      orientationPreference: "CS",
    },
  });

  console.log("Created users:", admin.email, student.email, student2.email, student3.email);

  // 3. Create Topics & Lessons
  const topicAI = await prisma.topic.create({
    data: {
      title: "Chủ đề A: Máy tính & Xã hội tri thức & Trí tuệ nhân tạo (AI)",
      slug: "may-tinh-va-ai",
      description: "Lịch sử phát triển máy tính, kiến trúc von Neumann, dữ liệu và tri thức, công nghệ AI hiện đại.",
      orderIndex: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      topicId: topicAI.id,
      title: "Bài 1: Khái niệm & Ứng dụng của Trí tuệ Nhân tạo (AI)",
      slug: "khai-niem-va-ung-dung-ai",
      category: "Lớp 12",
      orderIndex: 1,
      contentMarkdown: `# Khái niệm & Ứng dụng của Trí tuệ Nhân tạo (AI)

## 1. Trí tuệ nhân tạo (AI) là gì?
**Trí tuệ nhân tạo (Artificial Intelligence - AI)** là khả năng của máy móc hoặc hệ thống máy tính mô phỏng các hoạt động trí tuệ của con người, chẳng hạn như:
- Nhận thức và học hỏi từ dữ liệu.
- Suy luận và đưa ra quyết định.
- Tự động thích nghi với môi trường mới.

## 2. Phân loại AI theo mức độ năng lực
- **AI hẹp (Narrow AI / Weak AI):** Được thiết kế để hoàn thành một nhiệm vụ cụ thể xuất sắc (ví dụ: cờ vua Stockfish, nhận diện khuôn mặt, trợ lý Siri, dịch thuật Google Translate). Hầu hết AI hiện nay thuộc nhóm này.
- **AI tổng quát (General AI / AGI):** Hệ thống có trí tuệ ngang bằng hoặc vượt con người trong hầu hết mọi lĩnh vực nhận thức (đang trong quá trình nghiên cứu).
- **Siêu trí tuệ (Super AI):** Vượt xa năng lực trí tuệ của toàn bộ nhân loại.

## 3. Generative AI (AI tạo sinh) & Mô hình ngôn ngữ lớn (LLM)
- Generative AI có khả năng sáng tạo nội dung mới (văn bản, hình ảnh, mã nguồn) dựa trên dữ liệu đã học.
- Tiêu biểu: ChatGPT (OpenAI), Gemini (Google), Claude (Anthropic), Midjourney.

## 4. Cảnh báo đạo đức và an toàn AI
- Vấn đề thiên vị dữ liệu (Bias).
- Tin giả (Deepfake), lừa đảo danh tính.
- Tác động đến việc làm và quyền riêng tư dữ liệu.
`,
      flashcardsJson: JSON.stringify([
        {
          id: "fc-ai-1",
          front: "Narrow AI (AI hẹp) là gì?",
          back: "Hệ thống AI được thiết kế và huấn luyện để giải quyết MỘT nhiệm vụ chuyên biệt cụ thể (như nhận diện giọng nói, chơi cờ, xe tự lái).",
          tag: "AI",
        },
        {
          id: "fc-ai-2",
          front: "Turing Test dùng để kiểm tra điều gì?",
          back: "Kiểm tra xem máy tính có năng lực biểu hiện hành vi trí tuệ tương đương hoặc không thể phân biệt được với con người hay không.",
          tag: "AI",
        },
        {
          id: "fc-ai-3",
          front: "Deepfake là gì và rủi ro chính?",
          back: "Kỹ thuật dùng AI để tạo video/âm thanh giả mạo người thật, nguy cơ tạo tin giả và lừa đảo chiếm đoạt tài sản.",
          tag: "Đạo đức AI",
        },
        {
          id: "fc-ai-4",
          front: "Học máy (Machine Learning) khác gì lập trình truyền thống?",
          back: "Lập trình truyền thống: Dữ liệu + Quy tắc => Kết quả. Học máy: Dữ liệu + Kết quả => Quy tắc/Mô hình.",
          tag: "Machine Learning",
        },
      ]),
    },
  });

  const topicNetwork = await prisma.topic.create({
    data: {
      title: "Chủ đề B: Mạng máy tính & Internet",
      slug: "mang-may-tinh-va-internet",
      description: "Kiến trúc mạng, thiết bị mạng (Switch, Router), địa chỉ IP, DNS và Điện toán đám mây.",
      orderIndex: 2,
    },
  });

  await prisma.lesson.create({
    data: {
      topicId: topicNetwork.id,
      title: "Bài 2: Giao thức mạng, Địa chỉ IP, DNS & Điện toán đám mây",
      slug: "giao-thuc-mang-ip-dns-cloud",
      category: "Lớp 11",
      orderIndex: 1,
      contentMarkdown: `# Mạng máy tính, Địa chỉ IP và Điện toán đám mây

## 1. Thiết bị mạng cơ bản
- **Switch (Bộ chuyển mạch):** Kết nối các thiết bị trong cùng mạng cục bộ (LAN), truyền dữ liệu dựa trên địa chỉ MAC.
- **Router (Bộ định tuyến):** Định tuyến gói tin giữa các mạng khác nhau (kết nối LAN với WAN/Internet) dựa trên địa chỉ IP.

## 2. Địa chỉ IPv4 và IPv6
- **IPv4:** Độ dài **32 bit**, chia làm 4 nhóm (octet), mỗi nhóm từ 0 đến 255 cách nhau bởi dấu chấm (VD: \`192.168.1.1\`).
- **IPv6:** Độ dài **128 bit**, biểu diễn dưới dạng 8 nhóm số thập lục phân (hexadecimal) cách nhau bởi dấu hai chấm (VD: \`2001:0db8:85a3::8a2e:0370:7334\`).

## 3. Hệ thống tên miền (DNS)
- **DNS (Domain Name System):** Đóng vai trò như "danh bạ điện thoại của Internet", chuyển đổi tên miền dễ nhớ (VD: \`moet.gov.vn\`) thành địa chỉ IP mà máy tính hiểu được.

## 4. Điện toán đám mây (Cloud Computing)
3 mô hình dịch vụ chính:
1. **IaaS (Hạ tầng như một dịch vụ):** AWS EC2, Google Compute Engine (cho thuê máy chủ ảo, ổ cứng mạng).
2. **PaaS (Nền tảng như một dịch vụ):** Heroku, Vercel (môi trường triển khai code mà không cần quản lý hệ điều hành).
3. **SaaS (Phần mềm như một dịch vụ):** Google Docs, Gmail, Microsoft 365 (dùng trực tiếp qua trình duyệt).
`,
      flashcardsJson: JSON.stringify([
        {
          id: "fc-net-1",
          front: "Địa chỉ IPv4 có độ dài bao nhiêu bit?",
          back: "32 bit (gồm 4 byte, biểu diễn bằng 4 số thập phân từ 0 đến 255 phân tách bằng dấu chấm).",
          tag: "Mạng",
        },
        {
          id: "fc-net-2",
          front: "Nhiệm vụ chính của máy chủ DNS là gì?",
          back: "Phân giải tên miền (VD: google.com) thành địa chỉ IP (VD: 142.250.190.46) và ngược lại.",
          tag: "Giao thức",
        },
        {
          id: "fc-net-3",
          front: "Điểm khác biệt giữa Switch và Router?",
          back: "Switch nối các máy trong mạng LAN qua địa chỉ MAC; Router nối các mạng khác nhau qua địa chỉ IP.",
          tag: "Thiết bị",
        },
        {
          id: "fc-net-4",
          front: "Google Drive, Gmail thuộc mô hình điện toán đám mây nào?",
          back: "SaaS (Software as a Service - Phần mềm như một dịch vụ).",
          tag: "Cloud",
        },
      ]),
    },
  });

  const topicEthics = await prisma.topic.create({
    data: {
      title: "Chủ đề Đ: Đạo đức, Pháp luật & Văn hóa trong Môi trường số",
      slug: "dao-duc-phap-luat-van-hoa-so",
      description: "An toàn thông tin cá nhân, giấy phép phần mềm mã nguồn mở (GNU GPL), Luật An ninh mạng và phòng chống lừa đảo trực tuyến.",
      orderIndex: 3,
    },
  });

  await prisma.lesson.create({
    data: {
      topicId: topicEthics.id,
      title: "Bài 3A: Đạo đức, Pháp luật & An toàn thông tin trên không gian mạng",
      slug: "dao-duc-phap-luat-van-hoa-so",
      category: "Lớp 11 - 12",
      orderIndex: 1,
      contentMarkdown: `# Đạo đức, Pháp luật và Văn hóa trong Môi trường số

## 1. Quyền sở hữu trí tuệ & Giấy phép phần mềm
- **Phần mềm thương mại (Proprietary):** Độc quyền, người dùng phải mua bản quyền, không được sửa đổi hay phân phối lại mã nguồn.
- **Phần mềm mã nguồn mở (Open Source):** Công khai mã nguồn. Tiêu biểu nhất là giấy phép **GNU GPL** với tính chất *copyleft*: mọi sản phẩm phái sinh đều phải phát hành dưới cùng giấy phép mở.

## 2. Bảo vệ dữ liệu cá nhân & An toàn mạng
- **Phishing:** Giả mạo tổ chức uy tín (ngân hàng, cơ quan nhà nước) qua email/SMS để đánh cắp mật khẩu, mã OTP.
- **Xác thực 2 bước (2FA):** Lớp bảo vệ bổ sung ngoài mật khẩu, giúp ngăn chặn xâm nhập ngay cả khi lộ mật khẩu.
- **Nghị định 13/2023/NĐ-CP & Luật An ninh mạng:** Nghiêm cấm hành vi thu thập, phát tán trái phép dữ liệu cá nhân (CCCD, số điện thoại, hình ảnh riêng tư) và hành vi vu khống, xúc phạm danh dự người khác trên mạng.
`,
      flashcardsJson: JSON.stringify([
        {
          id: "fc-eth-1",
          front: "Tính chất Copyleft của giấy phép GNU GPL nghĩa là gì?",
          back: "Mọi phần mềm phái sinh từ mã nguồn mở GNU GPL cũng bắt buộc phải giữ nguyên giấy phép mở tự do.",
          tag: "Pháp luật",
        },
        {
          id: "fc-eth-2",
          front: "Tấn công Phishing là gì?",
          back: "Hình thức giả mạo email, tin nhắn hoặc website uy tín để lừa người dùng tiết lộ mật khẩu, OTP hoặc thông tin ngân hàng.",
          tag: "An toàn mạng",
        },
        {
          id: "fc-eth-3",
          front: "Tại sao HTTPS vẫn có thể xuất hiện ở trang web lừa đảo?",
          back: "HTTPS chỉ mã hóa đường truyền giữa máy khách và máy chủ; kẻ xấu vẫn có thể đăng ký chứng chỉ SSL miễn phí cho tên miền giả mạo.",
          tag: "Bảo mật",
        },
      ]),
    },
  });

  const topicWeb = await prisma.topic.create({
    data: {
      title: "Chủ đề C: Lập trình Web với HTML & CSS",
      slug: "lap-trinh-web-html-css",
      description: "Cấu trúc trang web chuẩn HTML5, các thẻ ngữ nghĩa, liên kết, bảng, biểu mẫu và tạo kiểu với CSS3.",
      orderIndex: 4,
    },
  });

  await prisma.lesson.create({
    data: {
      topicId: topicWeb.id,
      title: "Bài 3: Cấu trúc trang Web HTML5 & Tạo kiểu với CSS3",
      slug: "cau-truc-html5-va-css3",
      category: "Lớp 12",
      orderIndex: 1,
      contentMarkdown: `# Lập trình Web với HTML5 và CSS3

## 1. Cấu trúc tài liệu HTML5
\`\`\`html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tiêu đề trang</title>
</head>
<body>
  <header>Phần đầu trang</header>
  <main>
    <h1>Nội dung chính</h1>
    <p>Đoạn văn...</p>
    <a href="https://tinhoc.vn" target="_blank">Xem thêm</a>
    <img src="anh.jpg" alt="Mô tả ảnh" width="300">
  </main>
  <footer>Chân trang</footer>
</body>
</html>
\`\`\`

## 2. Các thẻ HTML quan trọng
- \`<a>\`: Tạo liên kết siêu văn bản, thuộc tính quan trọng: \`href\`, \`target\`.
- \`<img>\`: Chèn hình ảnh, thuộc tính quan trọng: \`src\` (đường dẫn), \`alt\` (văn bản thay thế).
- \`<table>\`, \`<tr>\`, \`<th>\`, \`<td>\`: Tạo bảng dữ liệu.
- \`<form>\`, \`<input>\`, \`<button>\`: Tạo biểu mẫu tương tác.

## 3. CSS3 cơ bản
- **Bộ chọn (Selectors):**
  - Phần tử: \`p { color: blue; }\`
  - Lớp (Class): \`.button { background-color: green; }\`
  - Định danh (ID): \`#header { font-size: 24px; }\`
- **Flexbox layout:**
\`\`\`css
.container {
  display: flex;
  justify-content: center; /* Căn giữa theo trục chính */
  align-items: center;     /* Căn giữa theo trục phụ */
}
\`\`\`
`,
      flashcardsJson: JSON.stringify([
        {
          id: "fc-web-1",
          front: "Thuộc tính nào của thẻ <img> là bắt buộc để hỗ trợ người khiếm thị?",
          back: "Thuộc tính alt (alternative text) cung cấp nội dung mô tả hình ảnh khi ảnh lỗi hoặc cho máy đọc màn hình.",
          tag: "HTML",
        },
        {
          id: "fc-web-2",
          front: "Để mở liên kết sang tab mới trong thẻ <a>, dùng thuộc tính gì?",
          back: 'target="_blank"',
          tag: "HTML",
        },
        {
          id: "fc-web-3",
          front: "Ký hiệu nào đại diện cho bộ chọn Class trong CSS?",
          back: "Dấu chấm (.) - Ví dụ: .btn-primary { color: white; }",
          tag: "CSS",
        },
      ]),
    },
  });

  const topicDB = await prisma.topic.create({
    data: {
      title: "Chủ đề D (ICT): Cơ sở Dữ liệu Quan hệ & Ngôn ngữ SQL",
      slug: "co-so-du-lieu-va-sql",
      description: "Khái niệm CSDL quan hệ, bảng, khóa chính, khóa ngoại và các câu lệnh truy vấn SQL kinh điển.",
      orderIndex: 5,
    },
  });

  await prisma.lesson.create({
    data: {
      topicId: topicDB.id,
      title: "Bài 4: Khóa chính, Khóa ngoại & Lệnh truy vấn SQL",
      slug: "khoa-chinh-khoa-ngoai-va-sql",
      category: "ICT",
      orderIndex: 1,
      contentMarkdown: `# Cơ sở dữ liệu quan hệ và ngôn ngữ SQL

## 1. Khái niệm cơ bản
- **Bảng (Table / Relation):** Tập hợp các dòng (bản ghi - record/tuple) và cột (thuộc tính - attribute/field).
- **Khóa chính (Primary Key):** Thuộc tính (hoặc tập thuộc tính) xác định DUY NHẤT mỗi bản ghi trong bảng. Giá trị không được rỗng (NOT NULL) và không được trùng lặp.
- **Khóa ngoại (Foreign Key):** Cột trong bảng này tham chiếu đến khóa chính của bảng khác nhằm duy trì tính toàn vẹn tham chiếu.

## 2. Các câu lệnh SQL phổ biến
\`\`\`sql
-- 1. Lấy toàn bộ danh sách học sinh lớp 12A1
SELECT HoTen, NgaySinh, DiemTB
FROM HocSinh
WHERE Lop = '12A1';

-- 2. Kết nối 2 bảng HocSinh và DiemThi
SELECT HocSinh.HoTen, DiemThi.MonHoc, DiemThi.Diem
FROM HocSinh
INNER JOIN DiemThi ON HocSinh.MaHS = DiemThi.MaHS
WHERE DiemThi.Diem >= 8.0;

-- 3. Đếm số lượng học sinh của từng lớp
SELECT Lop, COUNT(*) AS SoLuong
FROM HocSinh
GROUP BY Lop
HAVING COUNT(*) >= 30;
\`\`\`
`,
      flashcardsJson: JSON.stringify([
        {
          id: "fc-sql-1",
          front: "Điều kiện bắt buộc của một cột làm Khóa chính (Primary Key)?",
          back: "Giá trị phải là duy nhất (Unique) và không được chứa giá trị rỗng (NOT NULL).",
          tag: "CSDL",
        },
        {
          id: "fc-sql-2",
          front: "Mệnh đề nào dùng để lọc kết quả sau khi đã GROUP BY trong SQL?",
          back: "Mệnh đề HAVING (WHERE lọc trước khi gom nhóm, HAVING lọc sau khi gom nhóm).",
          tag: "SQL",
        },
        {
          id: "fc-sql-3",
          front: "Lệnh INNER JOIN thực hiện công việc gì?",
          back: "Kết hợp các bản ghi từ hai bảng dựa trên điều kiện ghép nối trùng khớp.",
          tag: "SQL",
        },
      ]),
    },
  });

  const topicCS = await prisma.topic.create({
    data: {
      title: "Chủ đề E (CS): Thuật toán & Lập trình Python",
      slug: "thuat-toan-va-python",
      description: "Cấu trúc dữ liệu danh sách, từ điển, thuật toán tìm kiếm nhị phân, sắp xếp và phân tích độ phức tạp thuật toán.",
      orderIndex: 6,
    },
  });

  await prisma.lesson.create({
    data: {
      topicId: topicCS.id,
      title: "Bài 5: Thuật toán Tìm kiếm Nhị phân & Độ phức tạp O(log n)",
      slug: "tim-kiem-nhi-phan-python",
      category: "CS",
      orderIndex: 1,
      contentMarkdown: `# Thuật toán Tìm kiếm Nhị phân trong Python

## 1. Điều kiện áp dụng
Dãy số (danh sách) **BẮT BUỘC ĐÃ ĐƯỢC SẮP XẾP** theo thứ tự tăng dần hoặc giảm dần.

## 2. Mã nguồn Python
\`\`\`python
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid # Tìm thấy tại vị trí mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1 # Không tìm thấy
\`\`\`

## 3. Độ phức tạp thời gian
- Trường hợp tốt nhất: **O(1)** (phần tử cần tìm nằm ngay ở vị trí giữa \`mid\`).
- Trường hợp xấu nhất & trung bình: **O(log n)** (mỗi bước lặp chia đôi không gian tìm kiếm).
- So với tìm kiếm tuần tự **O(n)**, tìm kiếm nhị phân hiệu quả vượt trội khi kích thước mảng \`n\` rất lớn.
`,
      flashcardsJson: JSON.stringify([
        {
          id: "fc-cs-1",
          front: "Điều kiện tiên quyết để thực hiện thuật toán tìm kiếm nhị phân?",
          back: "Mảng/danh sách phải được sắp xếp theo thứ tự (tăng dần hoặc giảm dần).",
          tag: "Thuật toán",
        },
        {
          id: "fc-cs-2",
          front: "Độ phức tạp thời gian trường hợp xấu nhất của tìm kiếm nhị phân?",
          back: "O(log n)",
          tag: "Độ phức tạp",
        },
        {
          id: "fc-cs-3",
          front: "Cấu trúc dữ liệu nào hoạt động theo nguyên lý LIFO (Last In First Out)?",
          back: "Ngăn xếp (Stack) - Vào sau ra trước.",
          tag: "Cấu trúc dữ liệu",
        },
      ]),
    },
  });

  console.log("Created topics and lessons successfully.");

  // 4. Create Full Official Mock Exam (2025 GDPT 2018 format)
  const exam = await prisma.exam.create({
    data: {
      title: "Đề minh họa Tốt nghiệp THPT 2025 - Môn Tin học (GDPT 2018)",
      description: "Đề thi chuẩn cấu trúc Bộ GD&ĐT gồm 28 câu (24 câu Phần I trắc nghiệm 4 lựa chọn, 4 câu Phần II trắc nghiệm Đúng/Sai với nhánh chung và 2 nhánh tự chọn CS / ICT). Thời gian làm bài: 50 phút.",
      difficulty: "CHUAN_BO",
      durationMinutes: 50,
      isPublished: true,
    },
  });

  // Questions for Part I (24 questions, 0.25 pt each)
  const part1Questions = [
    {
      orderIndex: 1,
      contentMarkdown: "Hệ thống AI nào dưới đây thuộc loại **AI hẹp (Narrow AI)**?",
      options: [
        { id: "A", text: "Hệ thống nhận diện khuôn mặt điểm danh tự động tại trường học." },
        { id: "B", text: "Hệ thống có cảm xúc và suy nghĩ độc lập giống hệt con người." },
        { id: "C", text: "Trí tuệ nhân tạo toàn năng vượt qua mọi khả năng trí tuệ nhân loại." },
        { id: "D", text: "Một cỗ máy có thể tự học mọi chuyên ngành đại học mà không cần dữ liệu huấn luyện." },
      ],
      correct: "A",
      explanation: "Hệ thống nhận diện khuôn mặt chỉ thực hiện một nhiệm vụ chuyên biệt là nhận dạng đặc trưng gương mặt, đây là ví dụ điển hình của AI hẹp (Narrow AI).",
    },
    {
      orderIndex: 2,
      contentMarkdown: "Bộ phận nào trong kiến trúc máy tính von Neumann có nhiệm vụ thực hiện các phép tính số học và phép so sánh logic?",
      options: [
        { id: "A", text: "Bộ nhớ trong (RAM)" },
        { id: "B", text: "Khối số học và logic (ALU - Arithmetic Logic Unit)" },
        { id: "C", text: "Khối điều khiển (CU - Control Unit)" },
        { id: "D", text: "Ổ cứng thể rắn (SSD)" },
      ],
      correct: "B",
      explanation: "ALU (Arithmetic Logic Unit) đảm nhiệm thực thi các phép tính cộng trừ nhân chia và các phép so sánh logic AND, OR, NOT.",
    },
    {
      orderIndex: 3,
      contentMarkdown: "Thiết bị mạng nào hoạt động tại tầng mạng (Network Layer) để định tuyến các gói tin giữa các mạng máy tính khác nhau dựa vào địa chỉ IP?",
      options: [
        { id: "A", text: "Hub" },
        { id: "B", text: "Switch" },
        { id: "C", text: "Router (Bộ định tuyến)" },
        { id: "D", text: "Repeater" },
      ],
      correct: "C",
      explanation: "Router là thiết bị định tuyến kết nối các mạng khác nhau (như mạng LAN gia đình với mạng WAN/Internet) dựa vào địa chỉ IP.",
    },
    {
      orderIndex: 4,
      contentMarkdown: "Địa chỉ nào sau đây là một địa chỉ **IPv4 hợp lệ**?",
      options: [
        { id: "A", text: "192.168.1.300" },
        { id: "B", text: "172.16.254.1" },
        { id: "C", text: "10.0.0.1.5" },
        { id: "D", text: "256.100.0.1" },
      ],
      correct: "B",
      explanation: "Địa chỉ IPv4 gồm 4 số phân cách bởi dấu chấm, mỗi số nằm trong khoảng từ 0 đến 255. Địa chỉ 172.16.254.1 thỏa mãn đầy đủ quy chuẩn.",
    },
    {
      orderIndex: 5,
      contentMarkdown: "Dịch vụ Google Docs cho phép người dùng soạn thảo văn bản trực tiếp trên trình duyệt mà không cần cài đặt phần mềm lên máy tính. Đây là ví dụ của mô hình điện toán đám mây nào?",
      options: [
        { id: "A", text: "IaaS (Infrastructure as a Service)" },
        { id: "B", text: "PaaS (Platform as a Service)" },
        { id: "C", text: "SaaS (Software as a Service)" },
        { id: "D", text: "DaaS (Data as a Service)" },
      ],
      correct: "C",
      explanation: "SaaS (Phần mềm như một dịch vụ) cung cấp phần mềm ứng dụng hoàn chỉnh cho người dùng cuối qua mạng Internet.",
    },
    {
      orderIndex: 6,
      contentMarkdown: "Hành vi kẻ xấu gửi email mạo danh ngân hàng yêu cầu nạn nhân bấm vào đường link lạ để xác thực tài khoản và đánh cắp mật khẩu được gọi là hình thức tấn công gì?",
      options: [
        { id: "A", text: "Phishing (Tấn công lừa đảo giả mạo)" },
        { id: "B", text: "DDoS (Tấn công từ chối dịch vụ)" },
        { id: "C", text: "Ransomware (Mã độc tống tiền)" },
        { id: "D", text: "Man-in-the-middle (Tấn công người đứng giữa)" },
      ],
      correct: "A",
      explanation: "Phishing là phương thức lừa đảo qua email, tin nhắn mạo danh các tổ chức uy tín nhằm đánh cắp thông tin nhạy cảm của người dùng.",
    },
    {
      orderIndex: 7,
      contentMarkdown: "Giấy phép mã nguồn mở nào quy định các phần mềm phái sinh (sửa đổi từ mã nguồn gốc) bắt buộc cũng phải được phát hành dưới cùng giấy phép mở tự do?",
      options: [
        { id: "A", text: "GNU GPL (General Public License)" },
        { id: "B", text: "Giấy phép bản quyền thương mại độc quyền (Commercial EULA)" },
        { id: "C", text: "Phần mềm dạng dùng thử giới hạn tính năng (Trialware)" },
        { id: "D", text: "Phần mềm quảng cáo (Adware)" },
      ],
      correct: "A",
      explanation: "GNU GPL có tính chất 'copyleft', quy định mọi sản phẩm phái sinh đều phải giữ nguyên tính tự do mã nguồn mở.",
    },
    {
      orderIndex: 8,
      contentMarkdown: "Theo quy định pháp luật về an toàn thông tin và văn hóa mạng, hành vi nào dưới đây là vi phạm pháp luật?",
      options: [
        { id: "A", text: "Chia sẻ bài viết khoa học có ghi rõ tên tác giả và nguồn gốc." },
        { id: "B", text: "Đặt mật khẩu phức tạp gồm chữ hoa, chữ thường, số và ký tự đặc biệt." },
        { id: "C", text: "Cắt ghép hình ảnh xúc phạm danh dự người khác rồi đăng lên mạng xã hội." },
        { id: "D", text: "Sử dụng phần mềm diệt virus quét mã độc định kỳ." },
      ],
      correct: "C",
      explanation: "Hành vi vu khống, xúc phạm nhân phẩm, danh dự của cá nhân trên mạng xã hội là hành vi bị nghiêm cấm theo Luật An ninh mạng.",
    },
    {
      orderIndex: 9,
      contentMarkdown: "Trong HTML, thẻ nào được sử dụng để tạo một **siêu liên kết (hyperlink)** đến một trang web khác?",
      options: [
        { id: "A", text: "<link>" },
        { id: "B", text: "<a>" },
        { id: "C", text: "<href>" },
        { id: "D", text: "<nav>" },
      ],
      correct: "B",
      explanation: "Thẻ <a> (anchor) cùng với thuộc tính href dùng để tạo siêu liên kết trong tài liệu HTML.",
    },
    {
      orderIndex: 10,
      contentMarkdown: "Thuộc tính nào của thẻ `<img>` trong HTML cung cấp văn bản thay thế khi hình ảnh không thể hiển thị?",
      codeSnippet: '<img src="avatar.png" alt="Ảnh đại diện thí sinh" width="150">',
      options: [
        { id: "A", text: "title" },
        { id: "B", text: "alt" },
        { id: "C", text: "src" },
        { id: "D", text: "caption" },
      ],
      correct: "B",
      explanation: "Thuộc tính alt (alternative text) cung cấp văn bản hiển thị thay thế nếu ảnh bị hỏng hoặc dành cho trình đọc màn hình trợ thính.",
    },
    {
      orderIndex: 11,
      contentMarkdown: "Trong CSS, thuộc tính nào được sử dụng để thiết lập **màu chữ** của một đoạn văn bản?",
      options: [
        { id: "A", text: "text-color" },
        { id: "B", text: "font-color" },
        { id: "C", text: "color" },
        { id: "D", text: "background-color" },
      ],
      correct: "C",
      explanation: "Trong chuẩn CSS, thuộc tính 'color' quy định màu chữ của phần tử (VD: color: #1e40af;).",
    },
    {
      orderIndex: 12,
      contentMarkdown: "Đoạn CSS nào dưới đây sử dụng mô hình Flexbox để **căn giữa theo chiều ngang (trục chính)** cho các phần tử con?",
      options: [
        { id: "A", text: "display: flex; justify-content: center;" },
        { id: "B", text: "display: flex; align-items: stretch;" },
        { id: "C", text: "display: block; float: center;" },
        { id: "D", text: "display: inline; text-align: justify;" },
      ],
      correct: "A",
      explanation: "Thuộc tính justify-content: center trong Flexbox căn chỉnh các phần tử con vào chính giữa trục chính (main axis).",
    },
    {
      orderIndex: 13,
      contentMarkdown: "Trong Python, kết quả xuất ra màn hình của đoạn mã sau là gì?",
      codeSnippet: "x = 15\ny = 4\nprint(x // y, x % y)",
      options: [
        { id: "A", text: "3.75 3" },
        { id: "B", text: "3 3" },
        { id: "C", text: "4 3" },
        { id: "D", text: "3 0" },
      ],
      correct: "B",
      explanation: "Toán tử // là phép chia lấy phần nguyên (15 // 4 = 3). Toán tử % là phép chia lấy phần dư (15 % 4 = 3). Kết quả in ra là: 3 3.",
    },
    {
      orderIndex: 14,
      contentMarkdown: "Cho đoạn mã Python sau. Giá trị của biến `s` sau khi kết thúc vòng lặp là bao nhiêu?",
      codeSnippet: "s = 0\nfor i in range(1, 6):\n    if i % 2 == 0:\n        s += i\nprint(s)",
      options: [
        { id: "A", text: "6" },
        { id: "B", text: "15" },
        { id: "C", text: "9" },
        { id: "D", text: "12" },
      ],
      correct: "A",
      explanation: "Hàm range(1, 6) sinh ra dãy [1, 2, 3, 4, 5]. Các số chẵn thỏa mãn i % 2 == 0 là 2 và 4. Tổng s = 2 + 4 = 6.",
    },
    {
      orderIndex: 15,
      contentMarkdown: "Cho chuỗi `st = 'TINHOC2025'`. Trong Python, cú pháp cắt chuỗi `st[3:6]` sẽ trả về giá trị nào?",
      options: [
        { id: "A", text: "'NHO'" },
        { id: "B", text: "'HOC'" },
        { id: "C", text: "'HOC2'" },
        { id: "D", text: "'TIN'" },
      ],
      correct: "B",
      explanation: "Chỉ số chuỗi trong Python bắt đầu từ 0: T(0) I(1) N(2) H(3) O(4) C(5) 2(6)... Cú pháp [3:6] lấy từ chỉ số 3 đến trước 6 (3, 4, 5) cho ra 'HOC'.",
    },
    {
      orderIndex: 16,
      contentMarkdown: "Cho danh sách `ds = [10, 20, 30]`. Sau khi thực hiện 2 lệnh `ds.append(40)` và `ds.pop(1)`, danh sách `ds` có giá trị là gì?",
      options: [
        { id: "A", text: "[10, 30, 40]" },
        { id: "B", text: "[20, 30, 40]" },
        { id: "C", text: "[10, 20, 30]" },
        { id: "D", text: "[10, 40]" },
      ],
      correct: "A",
      explanation: "Lệnh append(40) thêm 40 vào cuối -> [10, 20, 30, 40]. Lệnh pop(1) xóa phần tử ở vị trí chỉ số 1 (số 20) -> còn lại [10, 30, 40].",
    },
    {
      orderIndex: 17,
      contentMarkdown: "Trong hệ quản trị cơ sở dữ liệu quan hệ, phát biểu nào sau đây về **Khóa chính (Primary Key)** là đúng nhất?",
      options: [
        { id: "A", text: "Khóa chính có thể nhận giá trị NULL đối với các bản ghi mới thêm." },
        { id: "B", text: "Một bảng có thể có nhiều khóa chính cùng tồn tại độc lập." },
        { id: "C", text: "Khóa chính là một hoặc tập hợp các thuộc tính giúp phân biệt duy nhất từng bản ghi và không được chứa giá trị NULL." },
        { id: "D", text: "Giá trị khóa chính của hai bản ghi khác nhau có thể trùng nhau nếu thuộc cùng một danh mục." },
      ],
      correct: "C",
      explanation: "Khóa chính bắt buộc phải duy nhất và không được NULL (Entity Integrity Rule).",
    },
    {
      orderIndex: 18,
      contentMarkdown: "Mục đích chính của việc sử dụng **Khóa ngoại (Foreign Key)** trong cơ sở dữ liệu quan hệ là gì?",
      options: [
        { id: "A", text: "Tăng tốc độ khởi động máy chủ cơ sở dữ liệu." },
        { id: "B", text: "Thiết lập mối quan hệ giữa hai bảng và đảm bảo tính toàn vẹn tham chiếu dữ liệu." },
        { id: "C", text: "Tự động mã hóa mật khẩu người dùng lưu trong bảng." },
        { id: "D", text: "Cho phép người dùng bên ngoài truy cập CSDL không cần tài khoản." },
      ],
      correct: "B",
      explanation: "Khóa ngoại liên kết bảng con với bảng cha và ngăn chặn việc chèn bản ghi con mồ côi (không tồn tại ở bảng cha).",
    },
    {
      orderIndex: 19,
      contentMarkdown: "Câu lệnh SQL nào dưới đây dùng để lấy danh sách cột `HoTen` và `DiemTB` từ bảng `HocSinh` với điều kiện điểm trung bình từ 8.0 trở lên?",
      options: [
        { id: "A", text: "GET HoTen, DiemTB IN HocSinh IF DiemTB >= 8.0;" },
        { id: "B", text: "SELECT HoTen, DiemTB FROM HocSinh WHERE DiemTB >= 8.0;" },
        { id: "C", text: "FIND HoTen, DiemTB FROM HocSinh WITH DiemTB >= 8.0;" },
        { id: "D", text: "SEARCH HocSinh (HoTen, DiemTB) FILTER DiemTB >= 8.0;" },
      ],
      correct: "B",
      explanation: "Cú pháp chuẩn SQL là SELECT <cột> FROM <bảng> WHERE <điều_kiện>.",
    },
    {
      orderIndex: 20,
      contentMarkdown: "Để sắp xếp kết quả truy vấn SQL theo thứ tự **giảm dần** của cột `NgaySinh`, ta dùng mệnh đề nào?",
      options: [
        { id: "A", text: "ORDER BY NgaySinh DESC" },
        { id: "B", text: "SORT BY NgaySinh ASC" },
        { id: "C", text: "GROUP BY NgaySinh DOWN" },
        { id: "D", text: "ALIGN NgaySinh DESCENDING" },
      ],
      correct: "A",
      explanation: "ORDER BY <cột> DESC sắp xếp theo thứ tự giảm dần (Descending).",
    },
    {
      orderIndex: 21,
      contentMarkdown: "Thuật toán **Tìm kiếm nhị phân (Binary Search)** trên một dãy số có kích thước n có độ phức tạp thời gian trong trường hợp xấu nhất là bao nhiêu?",
      options: [
        { id: "A", text: "O(1)" },
        { id: "B", text: "O(log n)" },
        { id: "C", text: "O(n)" },
        { id: "D", text: "O(n²)" },
      ],
      correct: "B",
      explanation: "Mỗi bước của tìm kiếm nhị phân chia đôi không gian tìm kiếm, do đó số bước tối đa là log2(n), tức độ phức tạp O(log n).",
    },
    {
      orderIndex: 22,
      contentMarkdown: "Cấu trúc dữ liệu nào hoạt động theo nguyên lý **LIFO (Last In, First Out - Vào sau ra trước)**?",
      options: [
        { id: "A", text: "Queue (Hàng đợi)" },
        { id: "B", text: "Stack (Ngăn xếp)" },
        { id: "C", text: "Array (Mảng)" },
        { id: "D", text: "Linked List (Danh sách liên kết)" },
      ],
      correct: "B",
      explanation: "Stack hoạt động theo cơ chế LIFO (phần tử được đẩy vào sau cùng sẽ được lấy ra đầu tiên).",
    },
    {
      orderIndex: 23,
      contentMarkdown: "Trong các phát biểu sau về giao thức bảo mật mạng, phát biểu nào là đúng?",
      options: [
        { id: "A", text: "Giao thức HTTP mã hóa toàn bộ dữ liệu truyền tải giữa trình duyệt và máy chủ web." },
        { id: "B", text: "Giao thức HTTPS sử dụng chứng chỉ SSL/TLS để mã hóa dữ liệu truyền tải, chống nghe lén." },
        { id: "C", text: "Mạng Wi-Fi mở không mật khẩu (Open Wi-Fi) luôn an toàn tuyệt đối khi đăng nhập tài khoản ngân hàng." },
        { id: "D", text: "Tường lửa (Firewall) là phần cứng chỉ có chức năng tăng tốc độ đường truyền cáp quang." },
      ],
      correct: "B",
      explanation: "HTTPS (Hypertext Transfer Protocol Secure) kết hợp HTTP với lớp bảo mật SSL/TLS để mã hóa đường truyền.",
    },
    {
      orderIndex: 24,
      contentMarkdown: "Mô hình Trí tuệ Nhân tạo nào dưới đây là đại diện tiêu biểu của nhóm **Mô hình Ngôn ngữ Lớn (LLM - Large Language Model)** ứng dụng trong xử lý ngôn ngữ tự nhiên?",
      options: [
        { id: "A", text: "GPT-4 & Gemini" },
        { id: "B", text: "AlphaFold" },
        { id: "C", text: "K-Means Clustering" },
        { id: "D", text: "Dijkstra Shortest Path" },
      ],
      correct: "A",
      explanation: "GPT-4 và Gemini là các Large Language Models (LLM) hàng đầu hiện nay trong việc hiểu và sinh ngôn ngữ tự nhiên.",
    },
  ];

  const part1TopicMap: Record<number, string> = {
    1: "AI & Máy tính",
    2: "AI & Máy tính",
    3: "Mạng & An toàn",
    4: "Mạng & An toàn",
    5: "Mạng & An toàn",
    6: "Đạo đức & Pháp luật",
    7: "Đạo đức & Pháp luật",
    8: "Đạo đức & Pháp luật",
    9: "HTML & CSS",
    10: "HTML & CSS",
    11: "HTML & CSS",
    12: "HTML & CSS",
    13: "Thuật toán & Python",
    14: "Thuật toán & Python",
    15: "Thuật toán & Python",
    16: "Thuật toán & Python",
    17: "CSDL & SQL",
    18: "CSDL & SQL",
    19: "CSDL & SQL",
    20: "CSDL & SQL",
    21: "Thuật toán & Python",
    22: "Thuật toán & Python",
    23: "Mạng & An toàn",
    24: "AI & Máy tính",
  };

  for (const q of part1Questions) {
    await prisma.question.create({
      data: {
        examId: exam.id,
        part: 1,
        sectionType: "COMMON",
        topicTag: part1TopicMap[q.orderIndex] || "Chung",
        contentMarkdown: q.contentMarkdown,
        codeSnippet: q.codeSnippet || null,
        optionsJson: JSON.stringify(q.options),
        correctOption: q.correct,
        explanation: q.explanation,
        orderIndex: q.orderIndex,
      },
    });
  }

  // Part II: True/False cluster (4 questions total)
  // Question 25: Common (Phần chung 1 - HTML/CSS)
  await prisma.question.create({
    data: {
      examId: exam.id,
      part: 2,
      sectionType: "COMMON",
      topicTag: "HTML & CSS",
      orderIndex: 25,
      contentMarkdown: "Một nhóm học sinh xây dựng trang web giới thiệu câu lạc bộ Tin học của trường với đoạn mã HTML và CSS như sau:",
      codeSnippet: `<!-- Mã nguồn HTML -->
<div class="card highlight">
  <h2 id="title">CLB Tin học THPT</h2>
  <p class="desc">Chào mừng các bạn tham gia!</p>
  <a href="dangky.html" target="_blank">Đăng ký ngay</a>
</div>

/* Mã nguồn CSS */
.card {
  border: 1px solid #ccc;
  padding: 16px;
}
.highlight {
  background-color: #fef08a;
}
#title {
  color: #1e40af;
  font-size: 20px;
}
.card a {
  text-decoration: none;
  font-weight: bold;
}`,
      subQuestionsJson: JSON.stringify([
        {
          id: "a",
          text: "Phần tử `<div>` ở trên áp dụng đồng thời hai lớp (class) CSS là `card` và `highlight`.",
          isTrue: true,
          explanation: "Đúng. Thuộc tính class=\"card highlight\" cho phép phần tử nhận các thuộc tính từ cả hai class.",
        },
        {
          id: "b",
          text: "Bộ chọn `#title` trong CSS sẽ áp dụng cho tất cả các thẻ `<h2>` có trên toàn bộ trang web.",
          isTrue: false,
          explanation: "Sai. Bộ chọn #title là bộ chọn ID, chỉ áp dụng cho duy nhất phần tử có id=\"title\".",
        },
        {
          id: "c",
          text: "Thuộc tính `target=\"_blank\"` trong thẻ `<a>` khiến liên kết khi được người dùng nhấp chuột sẽ mở trang `dangky.html` trong một tab (hoặc cửa sổ) mới.",
          isTrue: true,
          explanation: "Đúng. target=\"_blank\" quy định mở liên kết ở tab/cửa sổ duyệt web mới.",
        },
        {
          id: "d",
          text: "Nếu thay đổi giá trị thuộc tính `padding: 16px;` thành `margin: 16px;`, khoảng cách giữa chữ bên trong và đường viền của khung thẻ `.card` sẽ tăng lên.",
          isTrue: false,
          explanation: "Sai. Padding là khoảng cách từ nội dung đến viền bên trong; Margin là khoảng cách từ viền ra bên ngoài các phần tử lân cận.",
        },
      ]),
      explanation: "Câu hỏi kiểm tra kiến thức về CSS Box Model, quy tắc bộ chọn ID/Class và thuộc tính liên kết trong HTML5.",
    },
  });

  // Question 26: Common (Phần chung 2 - Mạng & An toàn thông tin)
  await prisma.question.create({
    data: {
      examId: exam.id,
      part: 2,
      sectionType: "COMMON",
      topicTag: "Mạng & An toàn",
      orderIndex: 26,
      contentMarkdown: "Khi tham gia các hoạt động trực tuyến trên không gian mạng và kết nối mạng không dây công cộng:",
      subQuestionsJson: JSON.stringify([
        {
          id: "a",
          text: "Mạng Wi-Fi tại quán cà phê không đặt mật khẩu truy cập (Open Wi-Fi) có nguy cơ bị kẻ gian trong cùng mạng bắt gói tin (Packet Sniffing) để đọc thông tin chưa mã hóa.",
          isTrue: true,
          explanation: "Đúng. Wi-Fi mở không mã hóa lưu lượng cấp mạng, kẻ tấn công cùng mạng có thể nghe lén gói tin không bảo mật.",
        },
        {
          id: "b",
          text: "Biểu tượng ổ khóa màu xanh cùng tiền tố `https://` trên thanh địa chỉ trình duyệt chứng tỏ website đó tuyệt đối không thể là trang web lừa đảo.",
          isTrue: false,
          explanation: "Sai. HTTPS chỉ đảm bảo đường truyền được mã hóa giữa máy khách và máy chủ; kẻ xấu vẫn có thể đăng ký chứng chỉ SSL cho trang web lừa đảo.",
        },
        {
          id: "c",
          text: "Sử dụng tính năng Xác thực 2 bước (2FA - Two-Factor Authentication) giúp bảo vệ tài khoản ngay cả khi mật khẩu chính bị lộ.",
          isTrue: true,
          explanation: "Đúng. Khi có 2FA, kẻ tấn công cần thêm mã OTP hoặc khóa bảo mật vật lý mới đăng nhập được.",
        },
        {
          id: "d",
          text: "Việc tự ý đăng tải số điện thoại, căn cước công dân và điểm thi của bạn bè lên hội nhóm mạng xã hội khi chưa được sự đồng ý của họ là hành vi vi phạm quyền riêng tư và dữ liệu cá nhân.",
          isTrue: true,
          explanation: "Đúng. Căn cước công dân và thông tin cá nhân được bảo vệ bởi Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.",
        },
      ]),
      explanation: "Kiểm tra kiến thức an toàn thông tin, bảo mật mạng Wi-Fi công cộng và đạo đức, pháp luật môi trường số.",
    },
  });

  // Question 27: CS track (Khoa học máy tính - Hàm & Đệ quy Python)
  await prisma.question.create({
    data: {
      examId: exam.id,
      part: 2,
      sectionType: "CS",
      topicTag: "Thuật toán & Python",
      orderIndex: 27,
      contentMarkdown: "Cho hàm Python tính giá trị phần tử thứ n của dãy số Fibonacci như sau:",
      codeSnippet: `def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(5))`,
      subQuestionsJson: JSON.stringify([
        {
          id: "a",
          text: "Hàm `fibonacci(n)` ở trên sử dụng kỹ thuật lập trình đệ quy (hàm tự gọi lại chính nó).",
          isTrue: true,
          explanation: "Đúng. Dòng return fibonacci(n - 1) + fibonacci(n - 2) gọi lại chính hàm fibonacci.",
        },
        {
          id: "b",
          text: "Khi chạy chương trình, giá trị in ra màn hình của `print(fibonacci(5))` là `8`.",
          isTrue: false,
          explanation: "Sai. Dãy Fibonacci với F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5. Giá trị in ra là 5.",
        },
        {
          id: "c",
          text: "Các điều kiện `n <= 0` và `n == 1` đóng vai trò là điểm neo (điều kiện dừng) của hàm đệ quy.",
          isTrue: true,
          explanation: "Đúng. Điểm neo ngăn không cho hàm đệ quy rơi vào vòng lặp vô tận.",
        },
        {
          id: "d",
          text: "Hàm đệ quy `fibonacci(n)` cài đặt như trên có độ phức tạp thời gian xấp xỉ bậc đa thức O(n²), tối ưu hơn cách dùng vòng lặp thông thường.",
          isTrue: false,
          explanation: "Sai. Cài đặt đệ quy ngây thơ này có độ phức tạp thời gian cấp số mũ O(2^n), chậm hơn rất nhiều so với dùng vòng lặp O(n) hoặc quy hoạch động.",
        },
      ]),
      explanation: "Kiểm tra kiến thức đệ quy trong Python, điểm neo và phân tích độ phức tạp thuật toán.",
    },
  });

  // Question 28: CS track (Khoa học máy tính - Thuật toán tìm kiếm nhị phân Python)
  await prisma.question.create({
    data: {
      examId: exam.id,
      part: 2,
      sectionType: "CS",
      topicTag: "Thuật toán & Python",
      orderIndex: 28,
      contentMarkdown: "Cho thuật toán tìm kiếm nhị phân được cài đặt bằng Python như sau:",
      codeSnippet: `def search(arr, x):
    left = 0
    right = len(arr) - 1
    count = 0
    while left <= right:
        count += 1
        mid = (left + right) // 2
        if arr[mid] == x:
            return mid, count
        elif arr[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
    return -1, count

ds = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
pos, steps = search(ds, 23)`,
      subQuestionsJson: JSON.stringify([
        {
          id: "a",
          text: "Dãy `ds` đã được sắp xếp tăng dần, thỏa mãn điều kiện tiên quyết của thuật toán tìm kiếm nhị phân.",
          isTrue: true,
          explanation: "Đúng. [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] là dãy tăng dần.",
        },
        {
          id: "b",
          text: "Tại bước lặp đầu tiên, giá trị biến `mid` được tính là `4` và `arr[mid]` có giá trị là `16`.",
          isTrue: true,
          explanation: "Đúng. Ban đầu left=0, right=9. mid = (0 + 9)//2 = 4. arr[4] = 16.",
        },
        {
          id: "c",
          text: "Giá trị của biến `pos` trả về sau khi tìm kiếm phần tử `x = 23` là `5`.",
          isTrue: true,
          explanation: "Đúng. Phần tử 23 nằm ở chỉ số index 5 trong dãy ds.",
        },
        {
          id: "d",
          text: "Với dãy gồm 10 phần tử như trên, số lần so sánh tối đa (`steps`) của vòng lặp `while` khi không tìm thấy phần tử nào đó là 10 lần.",
          isTrue: false,
          explanation: "Sai. Với n=10, số lần lặp tối đa của tìm kiếm nhị phân là floor(log2(10)) + 1 = 4 lần, không bao giờ tới 10 lần.",
        },
      ]),
      explanation: "Kiểm tra chi tiết từng bước thực thi của thuật toán tìm kiếm nhị phân trong Python.",
    },
  });

  // Question 29: ICT track (Tin học ứng dụng - Cơ sở dữ liệu quan hệ)
  await prisma.question.create({
    data: {
      examId: exam.id,
      part: 2,
      sectionType: "ICT",
      topicTag: "CSDL & SQL",
      orderIndex: 27,
      contentMarkdown: "Xét cơ sở dữ liệu quản lý bán hàng của một siêu thị gồm hai bảng:",
      codeSnippet: `-- Bảng KhachHang(MaKH, TenKH, SoDT, DiaChi)
-- Trong đó MaKH là khóa chính (Primary Key).

-- Bảng DonHang(MaDH, MaKH, NgayDat, TongTien)
-- Trong đó MaDH là khóa chính, MaKH là khóa ngoại tham chiếu đến KhachHang(MaKH).`,
      subQuestionsJson: JSON.stringify([
        {
          id: "a",
          text: "Mối quan hệ giữa bảng `KhachHang` và bảng `DonHang` là mối quan hệ một - nhiều (1 - N), nghĩa là một khách hàng có thể có nhiều đơn hàng.",
          isTrue: true,
          explanation: "Đúng. Một khách hàng có thể đặt nhiều đơn hàng trong siêu thị.",
        },
        {
          id: "b",
          text: "Ta có thể thêm một bản ghi vào bảng `DonHang` với giá trị `MaKH` là 'KH999' dù mã 'KH999' này chưa từng tồn tại trong bảng `KhachHang`.",
          isTrue: false,
          explanation: "Sai. Tính toàn vẹn tham chiếu của khóa ngoại (Foreign Key) sẽ chặn hành động này để tránh dữ liệu mồ côi.",
        },
        {
          id: "c",
          text: "Trường `MaDH` trong bảng `DonHang` có thể chứa giá trị NULL nếu đơn hàng đó đang trong trạng thái xử lý.",
          isTrue: false,
          explanation: "Sai. MaDH là khóa chính của bảng DonHang, theo quy tắc khóa chính không bao giờ được phép nhận giá trị NULL.",
        },
        {
          id: "d",
          text: "Khi xóa một khách hàng trong bảng `KhachHang`, nếu không thiết lập quy tắc xóa liên hoàn (ON DELETE CASCADE) thì hệ thống sẽ báo lỗi nếu khách hàng đó đang có đơn hàng.",
          isTrue: true,
          explanation: "Đúng. Để bảo vệ toàn vẹn tham chiếu, hệ quản trị CSDL mặc định sẽ ngăn cản việc xóa bản ghi cha khi còn bản ghi con tham chiếu.",
        },
      ]),
      explanation: "Kiểm tra kiến thức cốt lõi về Khóa chính, Khóa ngoại và ràng buộc toàn vẹn tham chiếu trong CSDL quan hệ.",
    },
  });

  // Question 30: ICT track (Tin học ứng dụng - Truy vấn SQL tổng hợp)
  await prisma.question.create({
    data: {
      examId: exam.id,
      part: 2,
      sectionType: "ICT",
      topicTag: "CSDL & SQL",
      orderIndex: 28,
      contentMarkdown: "Cho bảng `Sach(MaSach, TenSach, TheLoai, DonGia, SoLuongTon)` trong CSDL thư viện trường học. Xét câu lệnh truy vấn SQL sau:",
      codeSnippet: `SELECT TheLoai, COUNT(MaSach) AS SoDauSach, SUM(SoLuongTon) AS TongSoLuong
FROM Sach
WHERE DonGia >= 50000
GROUP BY TheLoai
HAVING COUNT(MaSach) >= 5
ORDER BY TongSoLuong DESC;`,
      subQuestionsJson: JSON.stringify([
        {
          id: "a",
          text: "Mệnh đề `WHERE DonGia >= 50000` dùng để lọc các cuốn sách có đơn giá từ 50,000 VNĐ trở lên trước khi gom nhóm.",
          isTrue: true,
          explanation: "Đúng. Mệnh đề WHERE thực hiện lọc các dòng dữ liệu thô trước khi gom nhóm theo GROUP BY.",
        },
        {
          id: "b",
          text: "Mệnh đề `HAVING COUNT(MaSach) >= 5` có thể thay thế hoàn toàn bằng mệnh đề `WHERE COUNT(MaSach) >= 5` mà câu lệnh vẫn hợp lệ và chạy đúng cú pháp.",
          isTrue: false,
          explanation: "Sai. Hàm tổng hợp (Aggregate functions như COUNT, SUM) không được sử dụng trong mệnh đề WHERE; bắt buộc phải dùng trong HAVING.",
        },
        {
          id: "c",
          text: "Hàm `SUM(SoLuongTon)` dùng để tính tổng số lượng sách tồn kho của từng thể loại sách thỏa mãn điều kiện.",
          isTrue: true,
          explanation: "Đúng. Hàm SUM tính tổng giá trị cột được chỉ định theo từng nhóm thể loại.",
        },
        {
          id: "d",
          text: "Kết quả truy vấn sẽ hiển thị các thể loại sách được sắp xếp theo thứ tự số lượng tồn kho tăng dần.",
          isTrue: false,
          explanation: "Sai. Từ khóa DESC trong ORDER BY TongSoLuong DESC quy định thứ tự giảm dần (Descending), không phải tăng dần.",
        },
      ]),
      explanation: "Kiểm tra kiến thức SQL nâng cao về GROUP BY, HAVING, hàm tổng hợp COUNT/SUM và thứ tự thực thi câu lệnh SQL.",
    },
  });

  console.log("Created Mock Exam 1 with 24 Part I questions and 6 Part II questions (Common, CS, ICT).");

  // 5. Create Practice Exam 2 (Cơ bản - Ôn tập nhanh 15 phút)
  const exam2 = await prisma.exam.create({
    data: {
      title: "Đề luyện tập tổng hợp Cơ bản - HTML, SQL & Python (15 phút)",
      description: "Đề luyện nhanh giúp củng cố kiến thức nền tảng về Web HTML5/CSS3, truy vấn SQL và lập trình Python cơ bản.",
      difficulty: "CO_BAN",
      durationMinutes: 15,
      isPublished: true,
    },
  });

  const exam2Questions = [
    {
      part: 1,
      sectionType: "COMMON",
      topicTag: "HTML & CSS",
      orderIndex: 1,
      contentMarkdown: "Trong HTML5, thẻ nào dùng để định nghĩa phần **chân trang** của tài liệu web?",
      optionsJson: JSON.stringify([
        { id: "A", text: "<bottom>" },
        { id: "B", text: "<footer>" },
        { id: "C", text: "<section>" },
        { id: "D", text: "<aside>" },
      ]),
      correctOption: "B",
      explanation: "Thẻ ngữ nghĩa <footer> biểu diễn phần chân trang chứa thông tin bản quyền, liên hệ.",
    },
    {
      part: 1,
      sectionType: "COMMON",
      topicTag: "CSDL & SQL",
      orderIndex: 2,
      contentMarkdown: "Trong SQL, hàm tổng hợp nào dùng để **đếm số lượng bản ghi** thỏa mãn điều kiện?",
      optionsJson: JSON.stringify([
        { id: "A", text: "TOTAL()" },
        { id: "B", text: "SUM()" },
        { id: "C", text: "COUNT()" },
        { id: "D", text: "LEN()" },
      ]),
      correctOption: "C",
      explanation: "COUNT() trả về số lượng dòng (bản ghi); SUM() tính tổng giá trị số.",
    },
    {
      part: 1,
      sectionType: "COMMON",
      topicTag: "Thuật toán & Python",
      orderIndex: 3,
      contentMarkdown: "Cho danh sách Python `a = [3, 6, 9, 12]`. Giá trị của `len(a)` và `a[-1]` lần lượt là gì?",
      optionsJson: JSON.stringify([
        { id: "A", text: "4 và 12" },
        { id: "B", text: "3 và 12" },
        { id: "C", text: "4 và 3" },
        { id: "D", text: "4 và 9" },
      ]),
      correctOption: "A",
      explanation: "Danh sách có 4 phần tử nên len(a) = 4. Chỉ số âm a[-1] truy cập phần tử cuối cùng là 12.",
    },
    {
      part: 2,
      sectionType: "COMMON",
      topicTag: "AI & Máy tính",
      orderIndex: 4,
      contentMarkdown: "Xét các phát biểu về Trí tuệ nhân tạo (AI) và Mạng máy tính:",
      subQuestionsJson: JSON.stringify([
        { id: "a", text: "Học máy (Machine Learning) cho phép máy tính học các mẫu quy luật từ dữ liệu huấn luyện.", isTrue: true, explanation: "Đúng." },
        { id: "b", text: "Địa chỉ IPv6 có độ dài 64 bit.", isTrue: false, explanation: "Sai. IPv6 có độ dài 128 bit." },
        { id: "c", text: "DNS giúp chuyển đổi tên miền sang địa chỉ IP.", isTrue: true, explanation: "Đúng." },
        { id: "d", text: "Mô hình SaaS yêu cầu người dùng tự cài đặt phần mềm thủ công từ đĩa CD.", isTrue: false, explanation: "Sai. SaaS chạy trực tiếp qua trình duyệt trên nền tảng đám mây." },
      ]),
      explanation: "Ôn tập nhanh các khái niệm AI, IPv6, DNS và Điện toán đám mây.",
    },
  ];

  for (const q of exam2Questions) {
    await prisma.question.create({
      data: {
        examId: exam2.id,
        ...q,
      },
    });
  }

  // 6. Seed realistic ExamAttempts using the seeded exam questions
  const seededExamQuestions = await prisma.question.findMany({
    where: { examId: exam.id },
    orderBy: { orderIndex: "asc" },
  });

  const buildAttemptAnswers = (correctPart1Count: number, orientation: "CS" | "ICT", part2CorrectCountPerQ: number) => {
    const part1: Record<string, string> = {};
    const part2: Record<string, Record<string, boolean>> = {};
    let p1Idx = 0;
    for (const q of seededExamQuestions) {
      if (q.part === 1) {
        const wrongOpt = q.correctOption === "A" ? "B" : "A";
        part1[q.id] = p1Idx < correctPart1Count ? (q.correctOption || "A") : wrongOpt;
        p1Idx++;
      } else if (q.part === 2 && (q.sectionType === "COMMON" || q.sectionType === orientation)) {
        const subs = q.subQuestionsJson ? JSON.parse(q.subQuestionsJson) : [];
        part2[q.id] = {};
        subs.forEach((s: any, idx: number) => {
          part2[q.id][s.id] = idx < part2CorrectCountPerQ ? s.isTrue : !s.isTrue;
        });
      }
    }
    return { part1, part2 };
  };

  // Helper to score directly in seed
  const scoreSeedAnswers = (orientation: "CS" | "ICT", ans: { part1: Record<string, string>; part2: Record<string, Record<string, boolean>> }) => {
    let p1 = 0;
    let p2 = 0;
    const p2Table: Record<number, number> = { 1: 0.1, 2: 0.25, 3: 0.5, 4: 1.0 };
    for (const q of seededExamQuestions) {
      if (q.part === 1) {
        if (ans.part1[q.id] === q.correctOption) p1 += 0.25;
      } else if (q.part === 2 && (q.sectionType === "COMMON" || q.sectionType === orientation)) {
        const subs = q.subQuestionsJson ? JSON.parse(q.subQuestionsJson) : [];
        let c = 0;
        for (const s of subs) {
          if (ans.part2[q.id]?.[s.id] === s.isTrue) c++;
        }
        p2 += p2Table[c] || 0;
      }
    }
    const r1 = Math.round(p1 * 100) / 100;
    const r2 = Math.round(p2 * 100) / 100;
    return { p1: r1, p2: r2, total: Math.round((r1 + r2) * 100) / 100 };
  };

  const sampleRuns = [
    { userId: student.id, orientation: "CS" as const, p1Correct: 18, p2Correct: 2, secs: 2140, daysAgo: 4 },
    { userId: student.id, orientation: "CS" as const, p1Correct: 21, p2Correct: 3, secs: 1890, daysAgo: 1 },
    { userId: student2.id, orientation: "ICT" as const, p1Correct: 23, p2Correct: 4, secs: 1750, daysAgo: 2 },
    { userId: student3.id, orientation: "CS" as const, p1Correct: 22, p2Correct: 3, secs: 1920, daysAgo: 1 },
  ];

  for (const run of sampleRuns) {
    const ans = buildAttemptAnswers(run.p1Correct, run.orientation, run.p2Correct);
    const sc = scoreSeedAnswers(run.orientation, ans);
    await prisma.examAttempt.create({
      data: {
        userId: run.userId,
        examId: exam.id,
        selectedOrientation: run.orientation,
        answersJson: JSON.stringify(ans),
        part1Score: sc.p1,
        part2Score: sc.p2,
        totalScore: sc.total,
        timeSpentSeconds: run.secs,
        createdAt: new Date(Date.now() - run.daysAgo * 86400000),
      },
    });
  }

  // 7. Seed sample Community Questions for /qa
  await prisma.communityQuestion.createMany({
    data: [
      {
        name: "Minh Anh",
        grade: "10",
        topic: "Vòng lặp for và range()",
        content: "Cho em hỏi tại sao range(1, 6) trong Python chỉ lặp 5 lần chứ không phải 6 lần ạ?",
      },
      {
        name: "Hoàng Nam",
        grade: "12",
        topic: "Truy vấn SQL",
        content: "Khi nào mình dùng WHERE và khi nào bắt buộc phải dùng HAVING trong câu lệnh SELECT vậy mọi người?",
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
