export type CurriculumOrientation = "CHUNG" | "ICT" | "CS" | "ICT_CS";

export interface LessonExample {
  title: string;
  code?: string;
  language?: string;
  explanation: string;
}

export interface LessonItem {
  id: string;
  title: string;
  minutes: number;
  orientation?: CurriculumOrientation;
  tags: string[];
  objectives: string[];
  bullets: string[];
  example: LessonExample;
  note: string;
}

export interface ChapterItem {
  id: string;
  topicCode: string;
  orientation: CurriculumOrientation;
  title: string;
  desc: string;
  practiceId: string;
  lessons: LessonItem[];
}

export interface GradeCurriculum {
  grade: number;
  headline: string;
  summary: string;
  intro: string;
  sgk: string;
  chapters: ChapterItem[];
}

export const CURRICULUM: GradeCurriculum[] = [
  {
    grade: 10,
    headline: "Nền tảng số và tư duy thuật toán",
    summary:
      "Hiểu máy tính – dữ liệu – thông tin, làm quen mạng Internet, đạo đức số và viết những chương trình Python đầu tiên.",
    intro:
      "Lớp 10 (phần chung bắt buộc theo SGK Kết nối tri thức) đặt nền móng về dữ liệu – thông tin, mạng Internet, đạo đức số và lập trình Python cơ bản.",
    sgk: "https://drive.google.com/file/d/1HvQfS8mA9jZ3-4VunxAxHy7hKqAZkm46/view?usp=sharing",
    chapters: [
      {
        id: "l10-c1",
        topicCode: "Chủ đề A",
        orientation: "CHUNG",
        title: "Chủ đề A: Máy tính và xã hội tri thức",
        desc: "Dữ liệu, thông tin, xử lí thông tin, đơn vị đo dữ liệu và vai trò của máy tính trong đời sống.",
        practiceId: "p10-1",
        lessons: [
          {
            id: "l10-1-1",
            title: "Dữ liệu, thông tin và xử lí thông tin",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["dữ liệu", "thông tin", "bit", "byte"],
            objectives: [
              "Phân biệt được dữ liệu (hình thức biểu diễn) và thông tin (ý nghĩa rút ra).",
              "Trình bày được chu trình xử lí thông tin: Tiếp nhận → Xử lí → Lưu trữ / Truyền.",
              "Quy đổi thành thạo các đơn vị đo lượng dữ liệu: bit, Byte, KB, MB, GB, TB.",
            ],
            bullets: [
              "Thông tin là những hiểu biết về thế giới; dữ liệu là dạng biểu diễn của thông tin (văn bản, số, hình ảnh, âm thanh).",
              "Máy tính biến dữ liệu thành thông tin hữu ích; dữ liệu vào sai thì kết quả ra cũng sai (GIGO).",
              "Dữ liệu số lưu bằng bit (0 hoặc 1): 1 Byte = 8 bit; mỗi bậc tiếp theo gấp 1024 lần (1 KB = 1024 B, MB, GB, TB).",
            ],
            example: {
              title: "Ví dụ quy đổi dung lượng tệp & phân biệt dữ liệu - thông tin",
              code: `Dữ liệu: Dãy kí tự "38.5" trên nhiệt kế\nThông tin: Cơ thể đang sốt nhẹ, cần nghỉ ngơi\n\nQuy đổi: 2 GB = 2 × 1024 MB = 2048 MB\n         4 Byte = 4 × 8 = 32 bit`,
              language: "text",
              explanation:
                "Cùng một con số dữ liệu nhưng tùy ngữ cảnh người đọc mà rút ra thông tin và quyết định khác nhau.",
            },
            note: "Đề hay hỏi phân biệt dữ liệu (cách biểu diễn) với thông tin (ý nghĩa) và đổi đơn vị 1 KB = 1024 B.",
          },
          {
            id: "l10-1-2",
            title: "Sự ưu việt của máy tính và thành tựu của tin học",
            minutes: 20,
            orientation: "CHUNG",
            tags: ["ưu việt máy tính", "thành tựu tin học", "tự động hoá"],
            objectives: [
              "Nêu được 4 ưu thế nổi bật của máy tính: tốc độ nhanh, độ chính xác cao, lưu trữ lớn, làm việc liên tục.",
              "Kể được các thành tựu tiêu biểu của tin học: máy tính điện tử, Internet, AI, robot, thực tế ảo.",
              "Nhận thức đúng giới hạn của máy tính: hoạt động theo chương trình, không có cảm xúc tự thân.",
            ],
            bullets: [
              "Máy tính tính toán hàng tỉ phép tính mỗi giây, lưu trữ khối lượng dữ liệu khổng lồ và làm việc bền bỉ.",
              "Thành tựu tiêu biểu: máy tính điện tử, Internet & WWW, trí tuệ nhân tạo (AI), robot tự động, thực tế ảo.",
              "Máy tính không thay thế hoàn toàn con người vì thiếu tư duy sáng tạo độc lập, trực giác và cảm xúc.",
            ],
            example: {
              title: "So sánh năng lực Máy tính và Con người",
              code: `Máy tính: Tính 10^9 phép/giây, không mệt, làm theo thuật toán cài sẵn.\nCon người: Đề xuất ý tưởng mới, đồng cảm cảm xúc, đánh giá đạo đức.`,
              language: "text",
              explanation:
                "Con người thiết kế thuật toán và kiểm soát mục đích sử dụng; máy tính là công cụ khuếch đại trí tuệ.",
            },
            note: "Khi hỏi máy tính ưu việt hơn con người ở đâu, hãy loại phương án nói máy tính có cảm xúc, sáng tạo.",
          },
          {
            id: "l10-1-3",
            title: "Máy tính trong đời sống và tin học với xã hội",
            minutes: 20,
            orientation: "CHUNG",
            tags: ["đô thị thông minh", "kĩ năng số", "khoảng cách số"],
            objectives: [
              "Trình bày được ứng dụng tin học trong giáo dục, y tế, giao thông, thương mại điện tử.",
              "Hiểu được mô hình đô thị thông minh (Smart City) và xã hội tri thức.",
              "Phân tích được khái niệm khoảng cách số và tác động hai mặt của công nghệ.",
            ],
            bullets: [
              "Tin học hiện diện trong hồ sơ bệnh án điện tử, học trực tuyến LMS, thanh toán không tiền mặt.",
              "Đô thị thông minh dùng mạng lưới cảm biến IoT và dữ liệu lớn để điều hành giao thông, môi trường.",
              "Khoảng cách số là sự chênh lệch về cơ hội tiếp cận và kỹ năng sử dụng công nghệ giữa các nhóm dân cư.",
            ],
            example: {
              title: "Minh họa hệ thống giao thông thông minh",
              code: `Cảm biến lưu lượng xe ──▶ Máy chủ phân tích ──▶ Tự động điều chỉnh đèn đỏ/xanh\nGiúp giảm ùn tắc vào giờ cao điểm tại các nút giao trọng điểm.`,
              language: "text",
              explanation:
                "Minh họa cách tin học kết nối cảm biến (IoT) và xử lí dữ liệu để phục vụ xã hội.",
            },
            note: "Câu hỏi khái niệm thường nhắm vào khoảng cách số và tác động hai mặt của tin học.",
          },
        ],
      },
      {
        id: "l10-c2",
        topicCode: "Chủ đề B & C",
        orientation: "CHUNG",
        title: "Chủ đề B & C: Mạng máy tính, Internet & Lưu trữ trao đổi thông tin",
        desc: "Thành phần, phân loại mạng; Internet, DNS, điện toán đám mây, thư điện tử và ứng dụng web.",
        practiceId: "p10-2",
        lessons: [
          {
            id: "l10-2-1",
            title: "Mạng máy tính: thành phần và phân loại",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["mạng máy tính", "LAN", "WAN"],
            objectives: [
              "Nhận biết được 4 thành phần cơ bản của mạng máy tính.",
              "Phân biệt mạng cục bộ (LAN) và mạng diện rộng (WAN), kết nối có dây và không dây.",
              "Hiểu đúng vai trò của Switch, Modem và Router.",
            ],
            bullets: [
              "Thành phần mạng: thiết bị đầu cuối, thiết bị kết nối (Switch, Router), môi trường truyền dẫn, giao thức.",
              "Theo phạm vi có mạng cục bộ LAN (phòng học, tòa nhà) và mạng diện rộng WAN (liên tỉnh, toàn cầu).",
              "Mạng có dây (cáp xoắn, cáp quang) ổn định hơn; mạng không dây (Wi-Fi) linh hoạt hơn.",
            ],
            example: {
              title: "Sơ đồ kết nối mạng LAN trường học ra Internet",
              code: `[Máy tính phòng TH] ──(Cáp mạng)──▶ [Switch] ──▶ [Router / Modem] ──▶ [Internet]`,
              language: "text",
              explanation:
                "Switch nối các máy trong cùng mạng LAN; Router định tuyến gói tin kết nối LAN với Internet.",
            },
            note: "Đừng nhầm router với modem: router chia sẻ và định tuyến mạng, modem điều chế tín hiệu từ đường truyền nhà cung cấp.",
          },
          {
            id: "l10-2-2",
            title: "Internet, DNS và điện toán đám mây",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["Internet", "DNS", "điện toán đám mây"],
            objectives: [
              "Hiểu cơ chế hoạt động của Internet dựa trên bộ giao thức TCP/IP.",
              "Giải thích được chức năng phân giải tên miền thành địa chỉ IP của hệ thống DNS.",
              "Nêu được lợi ích và hạn chế của dịch vụ lưu trữ, tính toán đám mây.",
            ],
            bullets: [
              "Internet là mạng toàn cầu kết nối hàng tỉ thiết bị thông qua bộ giao thức chuẩn TCP/IP.",
              "DNS đóng vai trò 'danh bạ': chuyển tên miền dễ nhớ (moet.gov.vn) thành địa chỉ IP số.",
              "Điện toán đám mây (Google Drive, OneDrive) cung cấp tài nguyên qua mạng, mở rộng linh hoạt theo nhu cầu.",
            ],
            example: {
              title: "Luồng phân giải tên miền DNS khi truy cập web",
              code: `Người dùng gõ: https://moet.gov.vn\n  ──▶ Máy chủ DNS phân giải thành IP: 14.225.x.x\n  ──▶ Trình duyệt kết nối tới máy chủ web qua địa chỉ IP`,
              language: "text",
              explanation:
                "Máy tính giao tiếp bằng địa chỉ IP, còn con người dùng tên miền dễ nhớ nhờ hệ thống DNS.",
            },
            note: "Dạng câu hỏi quen thuộc: tên miền là phần chữ, địa chỉ IP là dãy số.",
          },
          {
            id: "l10-2-3",
            title: "Thư điện tử và ứng dụng web",
            minutes: 20,
            orientation: "CHUNG",
            tags: ["email", "SMTP", "web"],
            objectives: [
              "Nắm vững cấu trúc địa chỉ email và phân biệt các trường To, Cc, Bcc.",
              "Phân biệt giao thức gửi thư (SMTP) và nhận thư (POP3/IMAP).",
              "Hiểu khái niệm URL, trình duyệt và ứng dụng Web 2.0.",
            ],
            bullets: [
              "Địa chỉ email có dạng ten_nguoi_dung@ten_mien; Cc hiển thị người nhận khác, Bcc ẩn danh sách người nhận.",
              "Thư gửi đi qua máy chủ SMTP và được nhận/đồng bộ về máy khách qua giao thức POP3 hoặc IMAP.",
              "Web 2.0 cho phép người dùng tương tác, tạo nội dung; truy cập an toàn qua giao thức HTTPS.",
            ],
            example: {
              title: "Cú pháp địa chỉ Email & URL chuẩn",
              code: `Email hợp lệ: hocsinh10a1@itmaster.edu.vn\nURL chuẩn:    https://itmaster.vn/theory?grade=10\nGiao thức:    SMTP (Gửi thư) | POP3, IMAP (Nhận thư)`,
              language: "text",
              explanation:
                "Phân biệt rõ giao thức gửi (SMTP) với giao thức nhận (POP3/IMAP) và công dụng bảo mật của Bcc.",
            },
            note: "Nhớ: SMTP để gửi thư, POP3/IMAP để nhận thư.",
          },
        ],
      },
      {
        id: "l10-c3",
        topicCode: "Chủ đề D",
        orientation: "CHUNG",
        title: "Chủ đề D: Đạo đức, pháp luật và văn hoá trong môi trường số",
        desc: "Ứng xử văn minh trên mạng, phòng tránh tin giả, bảo vệ thông tin cá nhân và tôn trọng bản quyền.",
        practiceId: "p10-3",
        lessons: [
          {
            id: "l10-3-1",
            title: "Ứng xử văn minh trên mạng",
            minutes: 20,
            orientation: "CHUNG",
            tags: ["ứng xử số", "tin giả"],
            objectives: [
              "Thực hành các chuẩn mực giao tiếp lịch sự, tôn trọng người khác trên không gian mạng.",
              "Nhận diện và kiểm chứng tin giả (fake news) trước khi chia sẻ.",
              "Biết cách xử lí an toàn khi gặp tình huống bắt nạt hoặc quấy rối trực tuyến.",
            ],
            bullets: [
              "Tôn trọng người khác khi bình luận; không dùng lời lẽ xúc phạm, bôi nhọ hay kích động.",
              "Kiểm chứng thông tin qua các nguồn chính thống; không chia sẻ tin đồn thất thiệt.",
              "Khi bị quấy rối trên mạng: chụp ảnh lưu bằng chứng, chặn, báo cáo nền tảng và báo cho người lớn.",
            ],
            example: {
              title: "Quy trình 3 bước kiểm chứng tin tức (Fact-check)",
              code: `1. Kiểm tra nguồn gốc: Trang báo chính thống hay tài khoản ẩn danh?\n2. Đối chiếu đa nguồn: Có cơ quan chức năng nào xác nhận chưa?\n3. Đọc kỹ nội dung & ngày đăng: Tránh tin cũ cắt ghép câu view.`,
              language: "text",
              explanation:
                "Thói quen kiểm chứng giúp học sinh tránh trở thành người tiếp tay lan truyền tin giả.",
            },
            note: "Câu hỏi tình huống nên chọn phương án lưu bằng chứng, chặn và báo cáo chứ không đối đáp công kích lại.",
          },
          {
            id: "l10-3-2",
            title: "Bảo vệ thông tin cá nhân và bản quyền",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["thông tin cá nhân", "bản quyền"],
            objectives: [
              "Nhận biết được dữ liệu cá nhân nhạy cảm (CCCD, tài khoản ngân hàng, mật khẩu, hình ảnh riêng tư).",
              "Áp dụng quy tắc tạo mật khẩu mạnh và bật xác thực hai lớp (2FA).",
              "Hiểu nghĩa vụ tôn trọng bản quyền số và trích dẫn nguồn hợp lệ.",
            ],
            bullets: [
              "Không công khai số CCCD, số điện thoại, mã QR vé/thẻ hoặc mã OTP lên mạng xã hội.",
              "Dùng mật khẩu dài (từ 8–12 kí tự gồm hoa, thường, số, kí tự đặc biệt) và bật xác thực 2 bước (2FA).",
              "Tôn trọng bản quyền: ghi rõ nguồn, tên tác giả và tuân thủ giấy phép khi dùng tài liệu mạng.",
            ],
            example: {
              title: "Tiêu chí Mật khẩu an toàn & Nghị định 13/2023/NĐ-CP",
              code: `Mật khẩu yếu:  123456, ngaysinh2008 (dễ bị dò)\nMật khẩu mạnh: TinHoc@2026#10A (≥12 kí tự, đủ 4 nhóm)\nBảo vệ thêm:   Bật 2FA (OTP / Authenticator App)`,
              language: "text",
              explanation:
                "Kết hợp mật khẩu mạnh và 2FA giúp ngăn chặn xâm nhập ngay cả khi lộ mật khẩu.",
            },
            note: "Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân thường được nhắc trong phần đọc hiểu.",
          },
        ],
      },
      {
        id: "l10-c4",
        topicCode: "Chủ đề F",
        orientation: "CHUNG",
        title: "Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính (Python)",
        desc: "Thuật toán, sơ đồ khối và lập trình Python: biến, kiểu dữ liệu, nhập xuất, rẽ nhánh và vòng lặp.",
        practiceId: "p10-4",
        lessons: [
          {
            id: "l10-4-1",
            title: "Thuật toán và mô tả thuật toán",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["thuật toán", "sơ đồ khối"],
            objectives: [
              "Trình bày được định nghĩa và 5 tính chất của thuật toán (đầu vào, đầu ra, xác định, dừng, đúng đắn).",
              "Phân biệt 3 cách mô tả thuật toán: liệt kê bước, sơ đồ khối, ngôn ngữ lập trình.",
              "Đọc hiểu và vẽ được sơ đồ khối sử dụng đúng quy ước hình khối.",
            ],
            bullets: [
              "Thuật toán là dãy hữu hạn các thao tác rõ ràng, xác định để biến đầu vào thành đầu ra mong muốn.",
              "Quy ước sơ đồ khối: Ô-van (Bắt đầu/Kết thúc), Hình bình hành (Nhập/Xuất), Hình chữ nhật (Xử lí/Gán), Hình thoi (Điều kiện).",
              "Mọi thuật toán đều được tổ chức từ 3 cấu trúc điều khiển cơ bản: Tuần tự, Rẽ nhánh và Lặp.",
            ],
            example: {
              title: "Mô tả thuật toán kiểm tra số chẵn/lẻ",
              code: `Bước 1 (Nhập - Hình bình hành): Nhập số nguyên n\nBước 2 (Điều kiện - Hình thoi): Kiểm tra n chia hết cho 2?\n   - Đúng: In "Chẵn" (Hình bình hành)\n   - Sai:  In "Lẻ"   (Hình bình hành)\nBước 3 (Kết thúc - Hình ô-van): Dừng`,
              language: "text",
              explanation:
                "Nắm chắc hình khối chuẩn giúp giải nhanh các câu hỏi đọc hiểu sơ đồ khối.",
            },
            note: "Sơ đồ khối: hình chữ nhật là xử lí, hình thoi là điều kiện, hình bình hành là nhập/xuất.",
          },
          {
            id: "l10-4-2",
            title: "Biến, kiểu dữ liệu và nhập xuất",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["Python", "biến", "input"],
            objectives: [
              "Đặt tên biến hợp lệ theo quy tắc của ngôn ngữ lập trình Python.",
              "Phân biệt 4 kiểu dữ liệu cơ bản: int, float, str, bool và các phép toán số học (/, //, %, **).",
              "Sử dụng thành thạo lệnh input(), print() và hàm ép kiểu int(), float().",
            ],
            bullets: [
              "Tên biến chỉ gồm chữ cái, chữ số, dấu gạch dưới `_`; không bắt đầu bằng chữ số và không trùng từ khóa.",
              "Hàm `input()` luôn trả về kiểu xâu (`str`), cần ép kiểu `int()` hoặc `float()` trước khi tính toán.",
              "Phép chia `/` cho số thực; `//` chia lấy phần nguyên; `%` chia lấy phần dư; `**` lũy thừa.",
            ],
            example: {
              title: "Nhập 2 số nguyên và tính chia nguyên, chia dư",
              code: `a = int(input("Nhập a: "))\nb = int(input("Nhập b: "))\nprint("Thương nguyên:", a // b, "Số dư:", a % b)`,
              language: "python",
              explanation:
                "Ví dụ với a = 17, b = 5 thì a // b = 3 và a % b = 2; nếu không dùng int() sẽ gây lỗi TypeError.",
            },
            note: "input() trả về xâu nên muốn tính toán phải viết int(input()) — lỗi kinh điển trong đề.",
          },
          {
            id: "l10-4-3",
            title: "Rẽ nhánh",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["if", "elif", "điều kiện"],
            objectives: [
              "Viết đúng cú pháp câu lệnh rẽ nhánh `if`, `if...else`, `if...elif...else` trong Python.",
              "Sử dụng chính xác các toán tử so sánh (`==`, `!=`, `<`, `>`, `<=`, `>=`) và logic (`and`, `or`, `not`).",
              "Tuân thủ quy tắc dấu hai chấm `:` và thụt lề 4 dấu cách của khối lệnh Python.",
            ],
            bullets: [
              "Python dùng từ khóa `elif` cho nhánh điều kiện phụ (không dùng `else if`).",
              "Sau biểu thức điều kiện của `if`, `elif`, `else` bắt buộc có dấu hai chấm `:`.",
              "Toán tử `and` chỉ đúng khi tất cả điều kiện đúng; `or` đúng khi có ít nhất một điều kiện đúng.",
            ],
            example: {
              title: "Xếp loại học lực theo điểm trung bình",
              code: `diem = float(input())\nif diem >= 8.0:\n    print("Giỏi")\nelif diem >= 6.5:\n    print("Khá")\nelse:\n    print("Đạt")`,
              language: "python",
              explanation:
                "Các nhánh được kiểm tra lần lượt từ trên xuống; nhánh nào thỏa mãn đầu tiên sẽ được thực thi.",
            },
            note: "Đề thường cho bảng điểm và hỏi kết quả in ra — hãy chạy tay từng nhánh.",
          },
          {
            id: "l10-4-4",
            title: "Vòng lặp",
            minutes: 30,
            orientation: "CHUNG",
            tags: ["for", "while", "range"],
            objectives: [
              "Phân biệt khi nào dùng vòng lặp `for` (biết trước số lần) và `while` (lặp theo điều kiện).",
              "Xác định đúng dãy số do hàm `range(stop)`, `range(start, stop)`, `range(start, stop, step)` sinh ra.",
              "Sử dụng đúng câu lệnh `break` (thoát vòng lặp) và `continue` (qua lượt mới).",
            ],
            bullets: [
              "`range(a, b)` sinh ra các số nguyên từ `a` đến `b - 1`; `range(a, b, k)` có bước nhảy `k`.",
              "`while` kiểm tra điều kiện trước mỗi lần lặp; chú ý cập nhật biến điều kiện để tránh lặp vô hạn.",
              "`break` dừng hẳn vòng lặp gần nhất; `continue` bỏ qua phần còn lại của lần lặp hiện tại.",
            ],
            example: {
              title: "Tính tổng các số chẵn từ 2 đến 10",
              code: `tong = 0\nfor i in range(2, 11, 2):\n    tong += i\nprint(tong)  # Kết quả: 30`,
              language: "python",
              explanation:
                "`range(2, 11, 2)` sinh ra 2, 4, 6, 8, 10. Tổng tích lũy bằng 30.",
            },
            note: "range(1, 6) lặp 5 lần (1 đến 5) — chỗ hay mất điểm vì tưởng là 6.",
          },
        ],
      },
    ],
  },
  {
    grade: 11,
    headline: "Hệ điều hành, an toàn số & lập trình cấu trúc",
    summary:
      "Hệ điều hành, phần mềm nguồn mở, an toàn thông tin, ứng xử số và xử lí danh sách, xâu, tệp, hàm bằng Python (gồm cả 2 định hướng ICT & CS).",
    intro:
      "Lớp 11 (SGK Kết nối tri thức với cuộc sống) kết hợp kiến thức phần chung (hệ điều hành, an toàn thông tin, bản quyền số) với kiến thức nền tảng cho hai định hướng Tin học ứng dụng (ICT) và Khoa học máy tính (CS).",
    sgk: "https://drive.google.com/drive/folders/1SGK-Tin11",
    chapters: [
      {
        id: "l11-c1",
        topicCode: "Chủ đề A",
        orientation: "CHUNG",
        title: "Chủ đề A: Máy tính và xã hội tri thức (HĐH & Phần mềm)",
        desc: "Hệ điều hành, phần mềm nguồn mở (GNU GPL) và các mô hình dịch vụ đám mây IaaS, PaaS, SaaS.",
        practiceId: "p11-1",
        lessons: [
          {
            id: "l11-1-1",
            title: "Hệ điều hành và phần mềm nguồn mở",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["hệ điều hành", "nguồn mở"],
            objectives: [
              "Trình bày được vai trò quản lí phần cứng, tiến trình, tệp tin và giao diện của Hệ điều hành.",
              "Phân biệt phần mềm thương mại (độc quyền) và phần mềm mã nguồn mở.",
              "Hiểu nguyên tắc tự do và tính chất copyleft của giấy phép GNU GPL.",
            ],
            bullets: [
              "Hệ điều hành (Windows, macOS, Linux, Android, iOS) là cầu nối giữa phần cứng và phần mềm ứng dụng.",
              "Phần mềm nguồn mở (Linux, LibreOffice, GIMP) công khai mã nguồn cho phép xem, sửa và phân phối lại.",
              "Giấy phép GNU GPL quy định sản phẩm phái sinh từ mã nguồn mở cũng phải giữ giấy phép mở.",
            ],
            example: {
              title: "Phân loại Phần mềm Thương mại vs Nguồn mở",
              code: `Thương mại (Mã đóng): Windows, Microsoft Office, Adobe Photoshop\nNguồn mở (GNU GPL):   Ubuntu/Linux, LibreOffice, GIMP, Inkscape`,
              language: "text",
              explanation:
                "Phần mềm nguồn mở không có nghĩa luôn miễn phí mọi dịch vụ hỗ trợ, mà nhấn mạnh quyền tự do tiếp cận mã nguồn.",
            },
            note: "Hãy nhớ ví dụ nguồn mở thật (Linux, LibreOffice, GIMP) thay vì đoán theo tên phần mềm.",
          },
          {
            id: "l11-1-2",
            title: "Phần mềm ứng dụng và dịch vụ đám mây",
            minutes: 20,
            orientation: "CHUNG",
            tags: ["IaaS", "PaaS", "SaaS"],
            objectives: [
              "Phân biệt phần mềm cài đặt cục bộ (Desktop) và phần mềm chạy trực tuyến qua trình duyệt.",
              "Phân loại chính xác 3 mô hình điện toán đám mây: IaaS, PaaS và SaaS.",
              "Đánh giá được ưu điểm và rủi ro khi sử dụng dịch vụ đám mây.",
            ],
            bullets: [
              "**IaaS (Hạ tầng):** Cho thuê máy chủ ảo, lưu trữ mạng (AWS EC2, Google Compute Engine).",
              "**PaaS (Nền tảng):** Cung cấp môi trường triển khai ứng dụng sẵn sàng cho lập trình viên (Vercel, Heroku).",
              "**SaaS (Phần mềm):** Người dùng sử dụng trực tiếp ứng dụng qua trình duyệt (Google Docs, Gmail, Canva).",
            ],
            example: {
              title: "Nhận diện 3 tầng dịch vụ Đám mây",
              code: `IaaS ──▶ Thuê máy ảo VPS để tự cài hệ điều hành\nPaaS ──▶ Đẩy mã nguồn Next.js lên Vercel chạy tự động\nSaaS ──▶ Mở Google Docs soạn văn bản trực tiếp với nhóm`,
              language: "text",
              explanation:
                "Mức độ quản lí hạ tầng giảm dần từ IaaS → PaaS → SaaS, giúp người dùng tập trung vào công việc chính.",
            },
            note: "Phân biệt IaaS (hạ tầng), PaaS (nền tảng), SaaS (phần mềm) — câu hỏi phân loại rất dễ mất điểm.",
          },
        ],
      },
      {
        id: "l11-c2",
        topicCode: "Chủ đề B & C",
        orientation: "CHUNG",
        title: "Chủ đề B & C: Mạng, chia sẻ tài nguyên & An toàn thông tin",
        desc: "Kết nối có dây/không dây, chia sẻ tệp và máy in trong LAN, kĩ thuật NAT và phòng chống mã độc.",
        practiceId: "p11-2",
        lessons: [
          {
            id: "l11-2-1",
            title: "Kết nối mạng và chia sẻ tài nguyên",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["LAN", "Wi-Fi", "chia sẻ"],
            objectives: [
              "So sánh phạm vi và ứng dụng của Bluetooth và Wi-Fi khi kết nối thiết bị số.",
              "Thực hiện phân quyền chia sẻ thư mục, máy in an toàn trong mạng nội bộ LAN.",
              "Giải thích được vai trò của kĩ thuật NAT trên thiết bị định tuyến Router.",
            ],
            bullets: [
              "Bluetooth kết nối thiết bị cá nhân cự li gần (vài mét); Wi-Fi phủ sóng phòng học, tòa nhà.",
              "Khi chia sẻ thư mục trong LAN, có thể cấp quyền Chỉ đọc (Read) hoặc Đọc/Ghi (Read/Write).",
              "Kĩ thuật NAT trên Router ánh xạ nhiều địa chỉ IP nội bộ (192.168.x.x) qua một IP công cộng để ra Internet.",
            ],
            example: {
              title: "Cơ chế NAT (Network Address Translation) tại gia đình",
              code: `Laptop (192.168.1.10) ──┐\nĐiện thoại (192.168.1.11) ──▶ [Router NAT] ──(IP công cộng: 113.160.x.x)──▶ Internet`,
              language: "text",
              explanation:
                "Nhờ NAT mà nhiều thiết bị trong nhà dùng chung một đường truyền Internet của nhà mạng.",
            },
            note: "Bluetooth phạm vi ngắn, Wi-Fi phạm vi rộng hơn — câu hỏi so sánh hay gặp.",
          },
          {
            id: "l11-2-2",
            title: "An toàn thông tin trên không gian số",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["mã độc", "bảo mật"],
            objectives: [
              "Phân biệt các loại mã độc phổ biến: Virus, Worm (sâu máy tính), Trojan và Ransomware.",
              "Nhận diện nguy cơ tấn công mạng (Phishing, DDoS) và cách phòng tránh.",
              "Áp dụng quy tắc sao lưu dự phòng (Backup) và cập nhật bản vá bảo mật.",
            ],
            bullets: [
              "Worm tự nhân bản lây lan qua mạng không cần tệp vật chủ; Trojan giả dạng phần mềm hữu ích để mở cửa hậu.",
              "Ransomware mã hóa toàn bộ dữ liệu và đòi tiền chuộc; biện pháp chống tốt nhất là sao lưu định kì.",
              "Cần cập nhật hệ điều hành, bật tường lửa (Firewall), dùng 2FA và tránh cài phần mềm crack.",
            ],
            example: {
              title: "Phân biệt nhanh 3 loại mã độc hay thi",
              code: `Worm:       Tự lây lan qua mạng, làm nghẽn băng thông\nTrojan:     Đội lốt game/phần mềm crack để đánh cắp mật khẩu\nRansomware: Khóa mã hóa ổ đĩa, đòi tiền chuộc`,
              language: "text",
              explanation:
                "Không bấm link lạ và sao lưu dữ liệu quan trọng ra ổ rời/đám mây là tuyến phòng thủ hiệu quả nhất.",
            },
            note: "Phân biệt virus, worm (tự lây lan) và trojan (giả dạng phần mềm hữu ích).",
          },
        ],
      },
      {
        id: "l11-c3",
        topicCode: "Chủ đề D",
        orientation: "CHUNG",
        title: "Chủ đề D: Đạo đức, pháp luật và văn hoá trong môi trường số",
        desc: "Nghĩa vụ tôn trọng bản quyền tác phẩm số, giấy phép Creative Commons và xây dựng dấu chân số tích cực.",
        practiceId: "p11-3",
        lessons: [
          {
            id: "l11-3-1",
            title: "Nghĩa vụ tôn trọng bản quyền",
            minutes: 20,
            orientation: "CHUNG",
            tags: ["bản quyền", "giấy phép"],
            objectives: [
              "Nắm được phạm vi bảo hộ quyền tác giả đối với các tác phẩm số (văn bản, ảnh, video, mã nguồn).",
              "Phân biệt sử dụng hợp lệ có trích dẫn với hành vi đạo văn, sao chép thương mại trái phép.",
              "Hiểu ý nghĩa các mức giấy phép chia sẻ mở Creative Commons (CC).",
            ],
            bullets: [
              "Mọi sản phẩm sáng tạo trên Internet (kể cả không ghi chữ bản quyền) mặc định đều được bảo hộ.",
              "Đạo văn là lấy nội dung/ý tưởng của người khác nhận làm của mình mà không trích dẫn nguồn.",
              "Giấy phép Creative Commons (CC BY, CC BY-NC...) giúp tác giả quy định rõ quyền tái sử dụng.",
            ],
            example: {
              title: "Cách trích dẫn hợp lệ khi làm bài thuyết trình",
              code: `Đúng: "Nguồn ảnh: Wikimedia Commons (Giấy phép CC BY-SA 4.0) - Tác giả..."\nSai:  Tải ảnh trên mạng rồi xóa watermark và nhận là ảnh tự chụp.`,
              language: "text",
              explanation:
                "Ghi nguồn minh bạch và tuân thủ điều kiện phi thương mại (NC) giúp tránh vi phạm sở hữu trí tuệ.",
            },
            note: "Trích dẫn nguồn không có nghĩa là được dùng tác phẩm cho mọi mục đích thương mại.",
          },
          {
            id: "l11-3-2",
            title: "Giao tiếp và ứng xử trong môi trường số",
            minutes: 20,
            orientation: "CHUNG",
            tags: ["bạo lực mạng", "riêng tư"],
            objectives: [
              "Hiểu khái niệm Dấu chân số (Digital Footprint) và tác động lâu dài tới uy tín cá nhân.",
              "Thực hành tôn trọng quyền riêng tư hình ảnh, tin nhắn của người khác.",
              "Biết cách phòng tránh và hỗ trợ bạn bè trước hành vi bạo lực mạng.",
            ],
            bullets: [
              "Dấu chân số gồm toàn bộ bài đăng, bình luận, lượt chia sẻ để lại trên Internet — khó xóa sạch hoàn toàn.",
              "Luôn xin phép trước khi đăng ảnh chung hoặc thông tin liên quan đến người khác.",
              "Không hùa theo tin đồn hay lập nhóm nói xấu; lưu bằng chứng và báo cho thầy cô/phụ huynh khi cần.",
            ],
            example: {
              title: "Nguyên tắc 3 trước khi nhấn nút Đăng / Bình luận",
              code: `1. Thông tin này có đúng sự thật và tôn trọng người khác không?\n2. Có làm lộ dữ liệu riêng tư của bản thân hoặc bạn bè không?\n3. Sau 5 năm nữa nhìn lại bài đăng này, mình có tự hào không?`,
              language: "text",
              explanation:
                "Xây dựng dấu chân số tích cực từ THPT giúp ích lớn cho học bổng và tuyển dụng sau này.",
            },
            note: "Tình huống bị bắt nạt trên mạng: lưu bằng chứng, chặn, báo cáo và nhờ người lớn hỗ trợ.",
          },
        ],
      },
      {
        id: "l11-c4",
        topicCode: "Chủ đề F",
        orientation: "ICT_CS",
        title: "Chủ đề F (Định hướng CS & ICT): Dữ liệu cấu trúc, Tệp & Hàm Python",
        desc: "Kiến thức lập trình trọng tâm cho định hướng Khoa học máy tính (CS) và nền tảng xử lí dữ liệu (ICT): List, Xâu, Tệp và Hàm.",
        practiceId: "p11-4",
        lessons: [
          {
            id: "l11-4-1",
            title: "Danh sách và mảng một chiều",
            minutes: 30,
            orientation: "ICT_CS",
            tags: ["list", "chỉ số"],
            objectives: [
              "Khởi tạo, truy cập phần tử danh sách bằng chỉ số dương (`0..n-1`) và chỉ số âm (`-1`).",
              "Sử dụng thành thạo các phương thức `append`, `insert`, `pop`, `remove`, `sort`, `count`.",
              "Viết vòng lặp duyệt và tính toán trên danh sách (`len`, `sum`, `max`, `min`).",
            ],
            bullets: [
              "List trong Python có thể thay đổi phần tử (mutable); `a[0]` là phần tử đầu, `a[-1]` là phần tử cuối.",
              "`append(x)` thêm vào cuối; `insert(i, x)` chèn tại chỉ số `i`; `pop(i)` xóa theo chỉ số; `remove(x)` xóa theo giá trị.",
              "Duyệt phần tử trực tiếp bằng `for x in a:` hoặc theo chỉ số bằng `for i in range(len(a)):`.",
            ],
            example: {
              title: "Thao tác trên danh sách điểm số",
              code: `ds = [7.5, 8.0, 9.0]\nds.append(8.5)        # [7.5, 8.0, 9.0, 8.5]\nds.pop(0)             # [8.0, 9.0, 8.5]\nprint(ds[-1], max(ds)) # 8.5 9.0`,
              language: "python",
              explanation:
                "Phân biệt rõ `pop(0)` xóa theo vị trí 0 còn `remove(8.0)` xóa theo giá trị 8.0.",
            },
            note: "a[-1] là phần tử cuối cùng — chi tiết nhỏ nhưng xuất hiện nhiều trong câu hỏi nhanh.",
          },
          {
            id: "l11-4-2",
            title: "Xâu kí tự",
            minutes: 25,
            orientation: "ICT_CS",
            tags: ["xâu", "cắt xâu"],
            objectives: [
              "Thực hiện phép nối xâu (`+`), lặp xâu (`*`), kiểm tra xâu con (`in`) và cắt xâu (`s[start:end]`).",
              "Sử dụng đúng các phương thức chuẩn hóa & tách từ: `strip()`, `split()`, `join()`, `find()`, `replace()`.",
              "Hiểu tính bất biến (immutable) của xâu kí tự trong Python.",
            ],
            bullets: [
              "Cắt xâu `s[start:end]` lấy từ vị trí `start` đến `end - 1` (không bao gồm `end`).",
              "`s.split()` tách xâu thành danh sách các từ; `s.find(sub)` trả về `-1` nếu không tìm thấy.",
              "Xâu là bất biến nên không thể gán trực tiếp `s[0] = 'A'`, phải tạo xâu mới.",
            ],
            example: {
              title: "Cắt xâu & Tách từ chuẩn hóa họ tên",
              code: `s = "  TINHOC2025  ".strip()\nprint(s[3:6])           # "HOC" (vị trí 3, 4, 5)\ncau = "IT Master THPT"\nprint(len(cau.split())) # 3 từ`,
              language: "python",
              explanation:
                "Chỉ số trong `TINHOC2025` là T(0) I(1) N(2) H(3) O(4) C(5)..., nên `s[3:6]` cho ra `HOC`.",
            },
            note: '"Python"[0:3] bằng "Pyt" — cắt xâu sai mốc là lỗi phổ biến nhất.',
          },
          {
            id: "l11-4-3",
            title: "Tệp và xử lí tệp",
            minutes: 30,
            orientation: "ICT_CS",
            tags: ["tệp", "open"],
            objectives: [
              "Phân biệt các chế độ mở tệp: `'r'` (đọc), `'w'` (ghi đè), `'a'` (ghi nối thêm).",
              "Sử dụng cú pháp an toàn `with open(..., encoding='utf-8') as f:` để tự động đóng tệp.",
              "Đọc và ghi dữ liệu văn bản bằng `read()`, `readline()`, `readlines()` và `write()`.",
            ],
            bullets: [
              "Chế độ `'r'` báo lỗi nếu tệp chưa tồn tại; `'w'` xóa sạch nội dung cũ nếu tệp đã có.",
              "Nên dùng `with open(...) as f:` để tệp tự động được đóng kể cả khi xảy ra lỗi.",
              "Hàm `f.write()` chỉ nhận chuỗi (`str`), nên số phải chuyển qua `str(...)` trước khi ghi.",
            ],
            example: {
              title: "Đọc danh sách số từ tệp và ghi kết quả",
              code: `with open("ketqua.txt", "w", encoding="utf-8") as f:\n    f.write("Điểm TB: " + str(9.0))\n\nwith open("ketqua.txt", "r", encoding="utf-8") as f:\n    print(f.read())`,
              language: "python",
              explanation:
                "Luôn chỉ định `encoding='utf-8'` khi đọc/ghi tiếng Việt để tránh lỗi hiển thị dấu.",
            },
            note: "Chế độ w xoá sạch nội dung cũ — đề hay hỏi hệ quả của việc chọn sai chế độ.",
          },
          {
            id: "l11-4-4",
            title: "Hàm và chương trình con",
            minutes: 30,
            orientation: "CS",
            tags: ["hàm", "return"],
            objectives: [
              "Định nghĩa được hàm với từ khóa `def`, tham số mặc định và giá trị trả về `return`.",
              "Phân biệt kết quả in ra (`print`) và giá trị trả về (`return` / `None`).",
              "Hiểu phạm vi biến cục bộ (local) bên trong hàm và biến toàn cục (`global`).",
            ],
            bullets: [
              "Hàm giúp chia nhỏ bài toán, dễ bảo trì và tái sử dụng mã nguồn nhiều lần.",
              "Hàm không có lệnh `return` (hoặc `return` trống) sẽ trả về giá trị đặc biệt `None`.",
              "Biến tạo bên trong hàm là biến cục bộ; muốn sửa biến ngoài hàm phải khai báo `global`.",
            ],
            example: {
              title: "Hàm tính chu vi và diện tích hình chữ nhật",
              code: `def hcn(dai, rong=2):\n    return (dai + rong) * 2, dai * rong\n\ncv, dt = hcn(5, 3)  # cv = 16, dt = 15\ncv2, dt2 = hcn(5)   # dùng rong mặc định = 2`,
              language: "python",
              explanation:
                "Hàm Python có thể trả về nhiều giá trị cùng lúc dưới dạng bộ (tuple).",
            },
            note: "Hàm không có return sẽ trả về None — nhớ khi đề hỏi giá trị được in ra.",
          },
        ],
      },
    ],
  },
  {
    grade: 12,
    headline: "Trí tuệ nhân tạo, mạng, CSDL (ICT) & Thuật toán (CS)",
    summary:
      "Chinh phục cấu trúc đề thi Tốt nghiệp THPT: Phần chung (AI, Giao thức TCP/IP, An ninh mạng, Hướng nghiệp) và 2 nhánh tự chọn Định hướng ICT (CSDL & SQL) và Định hướng CS (Tìm kiếm, Sắp xếp, Big-O).",
    intro:
      "Lớp 12 (SGK Kết nối tri thức với cuộc sống) tổng hợp kiến thức trọng tâm cho kỳ thi Tốt nghiệp THPT: Phần chung (AI – Học máy, Giao thức TCP/IP, An ninh mạng, Hướng nghiệp) và hai định hướng tự chọn Tin học ứng dụng (ICT) & Khoa học máy tính (CS).",
    sgk: "https://drive.google.com/drive/folders/1SGK-Tin12",
    chapters: [
      {
        id: "l12-c1",
        topicCode: "Chủ đề A & G",
        orientation: "CHUNG",
        title: "Chủ đề A & G: Trí tuệ nhân tạo (AI) & Hướng nghiệp Tin học",
        desc: "Khái niệm AI, Học máy, dữ liệu huấn luyện, đạo đức AI và định hướng nghề nghiệp trong kỷ nguyên số.",
        practiceId: "p12-1",
        lessons: [
          {
            id: "l12-1-1",
            title: "Trí tuệ nhân tạo: khái niệm và ứng dụng",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["AI", "ứng dụng"],
            objectives: [
              "Nêu được các đặc trưng cốt lõi của AI: học, suy luận, nhận thức, hiểu ngôn ngữ tự nhiên.",
              "Phân biệt AI hẹp (Narrow AI) với AI tổng quát (AGI) và AI tạo sinh (Generative AI).",
              "Kể được các ứng dụng tiêu biểu trong y tế, giáo dục, giao thông và đời sống.",
            ],
            bullets: [
              "AI hẹp (Narrow AI) giải quyết xuất sắc một nhiệm vụ chuyên biệt (nhận diện mặt, chơi cờ, dịch máy).",
              "AI tạo sinh (Generative AI / LLM như ChatGPT, Gemini) tạo văn bản, ảnh, mã nguồn mới từ dữ liệu học.",
              "AI hỗ trợ đắc lực nhưng vẫn có thể mắc sai sót (ảo giác), thiếu cảm xúc và ý thức sinh học.",
            ],
            example: {
              title: "Phân loại các hệ thống AI quen thuộc",
              code: `• Thị giác máy tính (Computer Vision): Đọc ảnh X-quang, xe tự lái\n• Xử lí ngôn ngữ tự nhiên (NLP): Dịch máy, trợ lí ảo giọng nói\n• AI tạo sinh (GenAI): Hỗ trợ giải thích bài học, gợi ý mã nguồn`,
              language: "text",
              explanation:
                "Hầu hết hệ thống AI đang vận hành hiện nay thuộc nhóm AI hẹp (Narrow AI).",
            },
            note: "Phân biệt AI hẹp (một nhóm nhiệm vụ) với AI tổng quát (mọi nhiệm vụ như con người).",
          },
          {
            id: "l12-1-2",
            title: "Học máy và dữ liệu huấn luyện",
            minutes: 30,
            orientation: "CHUNG",
            tags: ["học máy", "dữ liệu"],
            objectives: [
              "Phân biệt phương pháp lập trình truyền thống và Học máy (Machine Learning).",
              "Phân loại 3 hướng Học máy: Học có giám sát, Học không giám sát, Học tăng cường.",
              "Giải thích vai trò của tập dữ liệu huấn luyện (Train) / kiểm thử (Test) và rủi ro thiên lệch dữ liệu (Bias).",
            ],
            bullets: [
              "Lập trình truyền thống: Quy tắc + Dữ liệu → Kết quả. Học máy: Dữ liệu + Kết quả → Mô hình (Quy tắc).",
              "Học có giám sát dùng dữ liệu đã gán nhãn (lọc thư rác); Học không giám sát gom cụm dữ liệu chưa gán nhãn.",
              "Học tăng cường học qua cơ chế thử–sai và điểm thưởng/phạt; dữ liệu lệch gây dự đoán thiếu công bằng.",
            ],
            example: {
              title: "So sánh 3 hướng Học máy trên bài toán thực tế",
              code: `• Có giám sát (Supervised):    Phân loại Email Spam / Thường (có nhãn)\n• Không giám sát (Unsupervised): Phân nhóm khách hàng theo hành vi mua sắm\n• Tăng cường (Reinforcement):  AI tự chơi cờ vây qua hàng triệu ván thử-sai`,
              language: "text",
              explanation:
                "Luôn tách Tập kiểm thử (Test set) riêng để đánh giá khách quan mô hình, tránh hiện tượng học vẹt.",
            },
            note: "Học có giám sát cần dữ liệu đã gán nhãn — câu hỏi phân loại hay gặp.",
          },
          {
            id: "l12-1-3",
            title: "Ứng dụng AI, đạo đức AI và hướng nghiệp",
            minutes: 20,
            orientation: "CHUNG",
            tags: ["đạo đức AI", "hướng nghiệp"],
            objectives: [
              "Nhận diện các rủi ro từ AI: Deepfake, rò rỉ dữ liệu riêng tư, thiên lệch và thay đổi việc làm.",
              "Trình bày các nguyên tắc AI có trách nhiệm: minh bạch, công bằng, quyền riêng tư, con người kiểm soát.",
              "Liên hệ các nhóm nghề quản trị mạng, quản trị CSDL, phát triển phần mềm trong ngành CNTT (Chủ đề G).",
            ],
            bullets: [
              "Deepfake dùng AI giả mạo video, giọng nói người thật để lừa đảo hoặc bôi nhọ danh dự.",
              "Trong các quyết định y tế, pháp luật, tài chính, con người luôn là chủ thể chịu trách nhiệm cuối cùng.",
              "Học sinh cần rèn kỹ năng số và hiểu biết ngành nghề CNTT (Quản trị hệ thống, CSDL, Kỹ sư phần mềm, An ninh mạng).",
            ],
            example: {
              title: "Ứng xử chuẩn khi dùng AI & Định hướng nghề nghiệp (Chủ đề G)",
              code: `Dùng AI học tập: Hỏi gợi ý & giải thích -> Tự kiểm chứng -> Tự hoàn thiện bài.\nKhông làm:      Nhập số CCCD/mật khẩu vào chatbot công khai; sao chép nguyên văn.\nNhóm nghề CNTT: Quản trị CSDL (ICT), Kỹ sư Thuật toán & AI (CS), An toàn mạng.`,
              language: "text",
              explanation:
                "AI là trợ thủ đắc lực nếu người học giữ vai trò kiểm chứng và làm chủ kiến thức.",
            },
            note: "Câu hỏi tình huống luôn chọn phương án con người giữ quyền kiểm soát và trách nhiệm cuối cùng.",
          },
        ],
      },
      {
        id: "l12-c2",
        topicCode: "Chủ đề B & D",
        orientation: "CHUNG",
        title: "Chủ đề B & D: Giao thức mạng TCP/IP & An ninh mạng",
        desc: "Mô hình 4 tầng TCP/IP, so sánh TCP vs UDP, mã hóa đối xứng/bất đối xứng, chữ kí số và phòng vệ mạng.",
        practiceId: "p12-2",
        lessons: [
          {
            id: "l12-2-1",
            title: "Giao thức mạng và mô hình TCP/IP",
            minutes: 25,
            orientation: "CHUNG",
            tags: ["TCP", "UDP", "TCP/IP"],
            objectives: [
              "Trình bày 4 tầng của mô hình TCP/IP và chức năng từng tầng.",
              "So sánh giao thức TCP (tin cậy, hướng kết nối) và UDP (nhanh, độ trễ thấp).",
              "Ghi nhớ số hiệu cổng chuẩn của HTTP (80) và HTTPS (443), độ dài IPv4 (32 bit) và IPv6 (128 bit).",
            ],
            bullets: [
              "4 tầng TCP/IP từ trên xuống: Ứng dụng (HTTP, DNS, SMTP) → Giao vận (TCP, UDP) → Liên mạng (IP) → Truy cập mạng.",
              "TCP đảm bảo gói tin đến đích đầy đủ, đúng thứ tự; UDP phù hợp gọi video, livestream cần tốc độ.",
              "HTTPS dùng chứng chỉ SSL/TLS mã hóa truyền tải web qua cổng 443 (HTTP dùng cổng 80).",
            ],
            example: {
              title: "Bảng tóm tắt Giao thức & Số hiệu cổng hay thi",
              code: `• HTTP  (Cổng 80):  Truyền tải trang web không mã hóa\n• HTTPS (Cổng 443): Truyền tải trang web có mã hóa SSL/TLS\n• IPv4: 32 bit (4 số 0..255) | IPv6: 128 bit (hệ thập lục phân)`,
              language: "text",
              explanation:
                "Nắm chắc vị trí các giao thức theo 4 tầng TCP/IP giúp trả lời chính xác câu Đúng/Sai.",
            },
            note: "HTTPS dùng cổng 443, HTTP dùng cổng 80 — chi tiết nhỏ nhưng hay được hỏi.",
          },
          {
            id: "l12-2-2",
            title: "An ninh mạng và mã hoá dữ liệu",
            minutes: 30,
            orientation: "CHUNG",
            tags: ["mã hoá", "chữ kí số"],
            objectives: [
              "Phân biệt mã hóa đối xứng (1 khóa chung) và mã hóa bất đối xứng (Khóa công khai / Khóa bí mật).",
              "Giải thích chính xác cơ chế kí và xác minh của Chữ kí số (Digital Signature).",
              "Trình bày vai trò của Tường lửa, IDS/IPS, VPN và nguyên tắc phân quyền tối thiểu.",
            ],
            bullets: [
              "Mã hóa đối xứng dùng chung 1 khóa; bất đối xứng dùng cặp Khóa công khai (Public) và Khóa bí mật (Private).",
              "Chữ kí số: người gửi dùng **Khóa bí mật** của mình để kí; người nhận dùng **Khóa công khai** của người gửi để kiểm tra.",
              "VPN tạo đường hầm mã hóa qua Internet công cộng; tường lửa kiểm soát lưu lượng theo quy tắc bảo mật.",
            ],
            example: {
              title: "Quy trình xác thực Chữ kí số",
              code: `Người gửi: Văn bản + Khóa bí mật (Private Key) ──▶ Tạo Chữ kí số\nNgười nhận: Văn bản + Chữ kí + Khóa công khai (Public Key) ──▶ Xác minh hợp lệ`,
              language: "text",
              explanation:
                "Khóa bí mật luôn giữ kín tuyệt đối bởi chủ sở hữu; chỉ Khóa công khai mới được chia sẻ rộng rãi.",
            },
            note: "Chữ kí số dùng khoá riêng để kí và khoá công khai để kiểm tra — dễ bị đảo trong đề.",
          },
        ],
      },
      {
        id: "l12-c3",
        topicCode: "Chủ đề E & F",
        orientation: "ICT",
        title: "Chủ đề E & F (Định hướng Tin học ứng dụng - ICT): CSDL & SQL",
        desc: "Kiến thức trọng tâm nhánh tự chọn Tin học ứng dụng (ICT): Khái niệm CSDL, Hệ QTCSDL, mô hình quan hệ, khóa chính/ngoại và truy vấn SQL.",
        practiceId: "p12-3",
        lessons: [
          {
            id: "l12-3-1",
            title: "Khái niệm cơ sở dữ liệu và hệ QTCSDL",
            minutes: 25,
            orientation: "ICT",
            tags: ["CSDL", "QTCSDL"],
            objectives: [
              "Phân biệt rõ Cơ sở dữ liệu (tập dữ liệu có tổ chức) và Hệ quản trị CSDL (phần mềm quản lí).",
              "Nêu được ưu điểm của quản lí bằng Hệ QTCSDL: giảm trùng lặp, đảm bảo nhất quán, phân quyền, sao lưu.",
              "Hiểu kiến trúc 3 mức (vật lí, logic, khung nhìn View) và kể tên các Hệ QTCSDL phổ biến.",
            ],
            bullets: [
              "CSDL lưu trữ dữ liệu có cấu trúc tập trung; Hệ QTCSDL (MySQL, PostgreSQL, SQL Server, SQLite) tạo và khai thác CSDL.",
              "Khung nhìn (View) cho phép che giấu các trường nhạy cảm với từng nhóm người dùng cụ thể.",
              "Tính độc lập dữ liệu giúp phần mềm và dữ liệu không bị phụ thuộc cứng vào nhau.",
            ],
            example: {
              title: "Phân biệt CSDL và Hệ QTCSDL trong thực tế",
              code: `• CSDL (Database):     Danh sách Học sinh, Điểm thi, Sách thư viện\n• Hệ QTCSDL (DBMS):    Phần mềm MySQL, PostgreSQL, SQLite, SQL Server\n• Khung nhìn (View):   Học sinh chỉ xem được Điểm của mình, không sửa được`,
              language: "text",
              explanation:
                "Quản lí dữ liệu bằng Hệ QTCSDL tránh tình trạng sửa ở file này nhưng file khác vẫn giữ thông tin cũ.",
            },
            note: "Phân biệt CSDL (dữ liệu) với hệ QTCSDL (phần mềm quản trị).",
          },
          {
            id: "l12-3-2",
            title: "Mô hình quan hệ và khoá",
            minutes: 30,
            orientation: "ICT",
            tags: ["khoá chính", "khoá ngoại"],
            objectives: [
              "Hiểu đúng thuật ngữ Bảng (quan hệ), Bản ghi (hàng/tuple) và Trường (cột/thuộc tính).",
              "Nắm vững 2 điều kiện bắt buộc của Khóa chính (duy nhất và NOT NULL).",
              "Thiết lập được Khóa ngoại và giải thích ràng buộc toàn vẹn tham chiếu giữa 2 bảng.",
            ],
            bullets: [
              "Khóa chính (Primary Key) định danh duy nhất mỗi bản ghi; tuyệt đối không trùng lặp và không được để trống (NULL).",
              "Khóa ngoại (Foreign Key) ở bảng con tham chiếu đến khóa chính của bảng cha để bảo toàn liên kết.",
              "Trong quan hệ 1–N (VD: 1 Lớp – nhiều Học sinh), khóa ngoại được đặt ở bảng phía N.",
            ],
            example: {
              title: "Thiết kế 2 bảng có Khóa chính & Khóa ngoại",
              code: `Lop(MaLop [PK], TenLop, GVCN)\nHocSinh(MaHS [PK], HoTen, MaLop [FK -> Lop.MaLop], DiemTB)`,
              language: "sql",
              explanation:
                "Không chọn `HoTen` làm Khóa chính vì nhiều học sinh có thể trùng tên; mọi `MaLop` trong `HocSinh` phải tồn tại ở bảng `Lop`.",
            },
            note: "Khoá chính không được NULL và không được trùng — câu hỏi chắc chắn xuất hiện.",
          },
          {
            id: "l12-3-3",
            title: "Truy vấn dữ liệu với SQL",
            minutes: 35,
            orientation: "ICT",
            tags: ["SELECT", "GROUP BY"],
            objectives: [
              "Viết chuẩn thứ tự các mệnh đề trong câu lệnh `SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY`.",
              "Phân biệt điều kiện lọc từng dòng (`WHERE`) và điều kiện lọc sau gom nhóm (`HAVING`).",
              "Sử dụng thành thạo `INNER JOIN`, các hàm gộp (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) và `ASC`/`DESC`.",
            ],
            bullets: [
              "`WHERE` lọc từng bản ghi trước khi gom nhóm; `HAVING` lọc trên kết quả các nhóm sau `GROUP BY`.",
              "Các hàm gộp (`COUNT`, `SUM`, `AVG`) chỉ được dùng ở `SELECT` hoặc `HAVING`, không được đặt trong `WHERE`.",
              "`ORDER BY col DESC` sắp xếp giảm dần; `ASC` tăng dần; `INNER JOIN` ghép bảng theo điều kiện `ON`.",
            ],
            example: {
              title: "Câu lệnh SQL tổng hợp (JOIN + GROUP BY + HAVING)",
              code: `SELECT L.TenLop, COUNT(H.MaHS) AS SiSo, AVG(H.DiemTB) AS DTB\nFROM Lop L\nINNER JOIN HocSinh H ON L.MaLop = H.MaLop\nWHERE H.DiemTB >= 5.0\nGROUP BY L.TenLop\nHAVING COUNT(H.MaHS) >= 30\nORDER BY DTB DESC;`,
              language: "sql",
              explanation:
                "Mệnh đề `WHERE` lọc học sinh đạt từ 5.0 trước, sau đó mới gom nhóm theo lớp và dùng `HAVING` giữ lại lớp có ≥30 bạn.",
            },
            note: "WHERE lọc trước khi gộp, HAVING lọc sau khi gộp — chỗ dễ sai nhất.",
          },
        ],
      },
      {
        id: "l12-c4",
        topicCode: "Chủ đề F",
        orientation: "CS",
        title: "Chủ đề F (Định hướng Khoa học máy tính - CS): Thuật toán nâng cao",
        desc: "Kiến thức trọng tâm nhánh tự chọn Khoa học máy tính (CS): Tìm kiếm nhị phân, sắp xếp và phân tích độ phức tạp thuật toán Big-O.",
        practiceId: "p12-4",
        lessons: [
          {
            id: "l12-4-1",
            title: "Thuật toán tìm kiếm",
            minutes: 25,
            orientation: "CS",
            tags: ["tuần tự", "nhị phân"],
            objectives: [
              "So sánh điều kiện áp dụng và độ phức tạp giữa Tìm kiếm tuần tự `O(n)` và Tìm kiếm nhị phân `O(log n)`.",
              "Mô phỏng từng bước chạy (`left`, `right`, `mid`) của thuật toán tìm kiếm nhị phân.",
              "Đọc hiểu và cài đặt được hàm tìm kiếm nhị phân bằng Python.",
            ],
            bullets: [
              "Tìm kiếm tuần tự chạy trên dãy bất kì (chưa cần sắp xếp), độ phức tạp `O(n)`.",
              "Tìm kiếm nhị phân BẮT BUỘC dãy đã được sắp xếp, mỗi bước loại bỏ một nửa không gian tìm kiếm → `O(log n)`.",
              "Với 1.000.000 phần tử đã sắp xếp, tìm kiếm nhị phân chỉ cần tối đa khoảng 20 lần so sánh.",
            ],
            example: {
              title: "Cài đặt Tìm kiếm nhị phân chuẩn bằng Python",
              code: `def binary_search(a, x):\n    left, right = 0, len(a) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if a[mid] == x:\n            return mid\n        elif a[mid] < x:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1`,
              language: "python",
              explanation:
                "Ở mỗi vòng lặp, nếu `a[mid] < x` thì dịch biên trái `left = mid + 1`; ngược lại dịch biên phải `right = mid - 1`.",
            },
            note: "Nếu đề hỏi điều kiện để dùng tìm kiếm nhị phân, đáp án là dãy đã được sắp xếp.",
          },
          {
            id: "l12-4-2",
            title: "Thuật toán sắp xếp",
            minutes: 30,
            orientation: "CS",
            tags: ["nổi bọt", "quick sort"],
            objectives: [
              "Mô phỏng từng bước các thuật toán sắp xếp cơ bản `O(n²)`: Nổi bọt (Bubble), Chọn (Selection), Chèn (Insertion).",
              "Phân biệt với nhóm thuật toán hiệu quả `O(n log n)`: Sắp xếp nhanh (Quick Sort), Sắp xếp trộn (Merge Sort).",
              "Hiểu khái niệm thuật toán sắp xếp ổn định (Stable Sort).",
            ],
            bullets: [
              "Bubble Sort so sánh và đổi chỗ các cặp kề nhau, đưa dần phần tử lớn nhất về cuối dãy sau mỗi vòng.",
              "Selection Sort chọn phần tử nhỏ nhất ở đoạn còn lại đưa về đầu đoạn; Insertion Sort hiệu quả với dãy gần xếp xong.",
              "Quick Sort (chọn phần tử chốt pivot) và Merge Sort (chia để trị) có độ phức tạp trung bình `O(n log n)`.",
            ],
            example: {
              title: "Sắp xếp nổi bọt tăng dần bằng Python",
              code: `a = [5, 1, 4, 2]\nn = len(a)\nfor i in range(n - 1):\n    for j in range(n - 1 - i):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\n# Sau vòng i=0: [1, 4, 2, 5] (3 cặp so sánh)`,
              language: "python",
              explanation:
                "Sau vòng lặp ngoài thứ nhất, số lớn nhất (5) nổi lên đúng vị trí cuối dãy.",
            },
            note: "Đề hay yêu cầu đếm số lần so sánh của sắp xếp nổi bọt với dãy nhỏ — hãy mô phỏng từng vòng.",
          },
          {
            id: "l12-4-3",
            title: "Độ phức tạp thuật toán",
            minutes: 25,
            orientation: "CS",
            tags: ["O lớn", "độ phức tạp"],
            objectives: [
              "Hiểu ý nghĩa kí hiệu Big-O trong đánh giá thời gian thực thi theo kích thước đầu vào `n`.",
              "Sắp xếp đúng thứ tự tăng dần của các lớp độ phức tạp: `O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)`.",
              "Rút gọn biểu thức đếm số phép toán về dạng Big-O chuẩn (bỏ hằng số hệ số và số hạng bậc thấp).",
            ],
            bullets: [
              "Big-O đo tốc độ tăng số phép toán cơ bản theo `n`, độc lập với tốc độ CPU của từng máy.",
              "Truy cập mảng `a[i]` mất `O(1)`; 1 vòng lặp `1..n` là `O(n)`; 2 vòng lặp lồng nhau `1..n` là `O(n²)`.",
              "Khi rút gọn Big-O (VD: `3n² + 5n + 10`), chỉ giữ lại số hạng bậc cao nhất và bỏ hệ số → `O(n²)`.",
            ],
            example: {
              title: "Xác định nhanh độ phức tạp Big-O từ mã nguồn",
              code: `• x = a[0] + 5                        ──▶ O(1)\n• for i in range(n): s += a[i]        ──▶ O(n)\n• for i in range(n): for j in range(n)──▶ O(n²)\n• Tìm kiếm nhị phân trên n phần tử    ──▶ O(log n)`,
              language: "python",
              explanation:
                "Hàm đệ quy Fibonacci `F(n-1) + F(n-2)` gọi phân nhánh đôi cho độ phức tạp hàm mũ `O(2ⁿ)`.",
            },
            note: "Nhân đôi n mà thời gian chỉ tăng thêm một hằng số bước thì thuật toán có dạng O(log n).",
          },
        ],
      },
    ],
  },
];

export const ALL_CHAPTERS = CURRICULUM.flatMap((g) =>
  g.chapters.map((c) => ({ ...c, grade: g.grade }))
);

export const ALL_LESSONS = ALL_CHAPTERS.flatMap((c) =>
  c.lessons.map((l) => ({
    ...l,
    grade: c.grade,
    chapterTitle: c.title,
    topicCode: c.topicCode,
    chapterOrientation: c.orientation,
  }))
);

export const TOTAL_LESSONS_COUNT = ALL_LESSONS.length;

export function getCurriculumByGrade(grade: number | string): GradeCurriculum {
  return CURRICULUM.find((g) => g.grade === Number(grade)) || CURRICULUM[0];
}

export function getLessonById(lessonId: string) {
  return ALL_LESSONS.find((l) => l.id === lessonId) || null;
}

export function getChapterByLessonId(lessonId: string) {
  return ALL_CHAPTERS.find((c) => c.lessons.some((l) => l.id === lessonId)) || null;
}

export function getNextLesson(lessonId: string) {
  const idx = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  return idx >= 0 && idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1] : null;
}
