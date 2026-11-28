import type { GradeCurriculum } from "./curriculum-types";

export const GRADE_11_CURRICULUM: GradeCurriculum = {
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
          intro:
            "Khi em bật máy tính hay điện thoại, phần mềm đầu tiên khởi chạy để quản lí CPU, bộ nhớ RAM, ổ cứng và cho phép các ứng dụng khác hoạt động chính là Hệ điều hành. Cùng với đó, phong trào phần mềm mã nguồn mở (như Linux) đang làm thay đổi cách thế giới xây dựng công nghệ.",
          objectives: [
            "Trình bày được vai trò trung gian và 5 nhóm chức năng cốt lõi của Hệ điều hành (quản lí CPU/tiến trình, RAM, tệp tin, thiết bị qua Driver, giao diện GUI/CLI).",
            "Phân biệt Hệ điều hành cho máy tính cá nhân (Windows, macOS, Linux/Ubuntu) và cho thiết bị di động (Android — phát triển từ nhân Linux, iOS).",
            "So sánh chính xác Phần mềm thương mại (mã đóng) với Phần mềm mã nguồn mở, Freeware và tính chất Copyleft của giấy phép GNU GPL.",
          ],
          bullets: [
            "Hệ điều hành (OS) là cầu nối bắt buộc giữa phần cứng và phần mềm ứng dụng; giao tiếp với thiết bị ngoại vi nhờ trình điều khiển Driver và quản lí đĩa theo cây thư mục.",
            "Phần mềm nguồn mở (Linux, LibreOffice, GIMP, Inkscape) công khai mã nguồn cho phép xem, sửa, nâng cấp; cộng đồng cùng kiểm tra và vá lỗi nhanh.",
            "Giấy phép GNU GPL có tính chất Copyleft: mọi sản phẩm phái sinh từ mã nguồn mở GPL cũng phải phát hành dưới giấy phép mở tương tự.",
          ],
          sections: [
            {
              title: "Vai trò và 5 chức năng cốt lõi của Hệ điều hành (OS)",
              content: `**Hệ điều hành (Operating System)** là phần mềm hệ thống giữ vai trò **trung gian bắt buộc** kết nối giữa **Phần cứng** và **Phần mềm ứng dụng** (không có hệ điều hành, các phần mềm ứng dụng thông thường không thể chạy trực tiếp trên phần cứng).

**5 chức năng chính của Hệ điều hành:**
1. **Quản lí bộ xử lí (Điều phối tiến trình):** Khi mở đồng thời trình duyệt, trình nghe nhạc và trình soạn thảo, HĐH chia sẻ thời gian CPU hợp lí giữa các tiến trình.
2. **Quản lí bộ nhớ (RAM):** Cấp phát và thu hồi vùng nhớ cho từng chương trình đang chạy.
3. **Quản lí lưu trữ tệp tin:** Tổ chức dữ liệu trên ổ đĩa theo cấu trúc **cây thư mục và tệp tin**.
4. **Quản lí thiết bị ngoại vi:** Sử dụng **trình điều khiển thiết bị (Driver)** để giao tiếp và điều khiển máy in, card đồ họa, bàn phím, chuột...
5. **Cung cấp giao diện giao tiếp người dùng:**
   - **GUI (Graphical User Interface):** Giao diện đồ họa với cửa sổ, biểu tượng, menu và con trỏ chuột (phổ biến hiện nay).
   - **CLI (Command-Line Interface):** Giao diện dòng lệnh gõ văn bản (dùng trước đây hoặc cho quản trị viên hệ thống).`,
            },
            {
              title: "Phân loại Hệ điều hành Máy tính cá nhân vs Thiết bị di động",
              content: `| Nhóm thiết bị | Hệ điều hành tiêu biểu | Đặc điểm nổi bật |
| :--- | :--- | :--- |
| **Máy tính cá nhân (PC / Laptop)** | Windows, macOS, Linux (Ubuntu, Fedora) | Quản lí đa nhiệm mạnh, giao diện cửa sổ; **macOS** là hệ điều hành thương mại (mã nguồn đóng) của Apple, **không** phải mã nguồn mở |
| **Thiết bị di động (Smartphone / Tablet)** | **Android**, **iOS** | Tối ưu cho màn hình cảm ứng, tiết kiệm pin, kết nối 4G/5G/GPS; **Android** được phát triển dựa trên **nhân (kernel) Linux** |`,
            },
            {
              title: "Phần mềm Thương mại, Phần mềm Miễn phí (Freeware) và Nguồn mở",
              content: `| Tiêu chí | Phần mềm thương mại (Mã đóng) | Phần mềm miễn phí (Freeware) | Phần mềm nguồn mở (Open Source) |
| :--- | :--- | :--- | :--- |
| **Mã nguồn** | Bí mật, đóng kín | Thường đóng kín | **Công khai** để xem, học tập, sửa đổi |
| **Chi phí** | Phải mua bản quyền | Miễn phí sử dụng | Thường miễn phí phần mềm, có thể thu phí dịch vụ hỗ trợ/triển khai |
| **Quyền tùy biến** | Không được tự sửa đổi | Không được tự sửa đổi mã nguồn | Được tùy biến, giảm phụ thuộc độc quyền nhà cung cấp |
| **Ví dụ thực tế** | Windows, Microsoft Office, Adobe Photoshop | Một số tiện ích đóng gói miễn phí | **Linux (Ubuntu)**, bộ văn phòng **LibreOffice** (Writer, Calc, Impress), **GIMP** (sửa ảnh), **Inkscape** |

- **Giấy phép GNU GPL & Copyleft:** Quy định tự do sử dụng, nghiên cứu, sửa đổi và phân phối lại; đồng thời **tính chất Copyleft** bắt buộc mọi phần mềm phái sinh từ mã nguồn GNU GPL cũng phải giữ nguyên giấy phép mở tự do.`,
            },
          ],
          example: {
            title: "Nhận diện phần mềm nguồn mở thay thế tương ứng",
            code: `• Hệ điều hành:      Windows / macOS (đóng)   ──▶ Ubuntu / Linux (mở)
• Văn phòng:        Microsoft Office (đóng)  ──▶ LibreOffice Writer, Calc, Impress (mở)
• Chỉnh sửa ảnh:    Adobe Photoshop (đóng)   ──▶ GIMP (mở)
• Đồ họa vector:    Adobe Illustrator (đóng) ──▶ Inkscape (mở)`,
            language: "text",
            explanation:
              "Nắm rõ các cặp phần mềm tương ứng giúp làm nhanh câu hỏi trắc nghiệm nhận diện phần mềm nguồn mở thật trong SGK.",
          },
          commonMistakes: [
            "Nhầm rằng 'phần mềm miễn phí (Freeware)' đồng nghĩa với 'phần mềm nguồn mở' — Freeware không công khai mã nguồn.",
            "Nghĩ rằng phần mềm nguồn mở chắc chắn luôn miễn phí mọi dịch vụ bảo trì/hỗ trợ đi kèm, hoặc tưởng macOS là phần mềm nguồn mở.",
            "Cho rằng hệ điều hành chỉ quản lí màn hình và bàn phím mà không quản lí RAM, hay ứng dụng có thể truy cập trực tiếp phần cứng bỏ qua hệ điều hành.",
          ],
          note: "Nhớ kỹ: Nhân Android dựa trên Linux; Driver kết nối HĐH với phần cứng; Copyleft (GNU GPL) bắt buộc bản phái sinh cũng phải mở.",
        },
        {
          id: "l11-1-2",
          title: "Phần mềm ứng dụng và dịch vụ đám mây",
          minutes: 20,
          orientation: "CHUNG",
          tags: ["IaaS", "PaaS", "SaaS"],
          intro:
            "Ngày nay, em có thể soạn văn bản trên Google Docs, thiết kế poster trên Canva hay lập trình trên trình duyệt mà không cần cài đặt phần mềm nặng lên máy. Điện toán đám mây đã phân tầng dịch vụ như thế nào từ hạ tầng phần cứng đến ứng dụng người dùng cuối?",
          objectives: [
            "Phân biệt phần mềm hệ thống với phần mềm ứng dụng (cài đặt cục bộ và chạy trực tuyến trên trình duyệt).",
            "Phân loại chính xác 3 mô hình dịch vụ điện toán đám mây: IaaS, PaaS và SaaS cùng ví dụ thực tế.",
            "Đánh giá khách quan ưu điểm và hạn chế của dịch vụ đám mây trong học tập và doanh nghiệp.",
          ],
          bullets: [
            "Phần mềm ứng dụng phục vụ trực tiếp nhu cầu người dùng (soạn thảo, bảng tính, đồ họa); gồm loại cài đặt cục bộ và phần mềm trực tuyến chạy qua trình duyệt.",
            "3 mô hình đám mây: IaaS (thuê hạ tầng máy chủ ảo: AWS EC2, Google Compute Engine), PaaS (nền tảng triển khai code: Vercel, Heroku, Google App Engine), SaaS (dùng phần mềm sẵn: Google Docs, Gmail, Canva, Microsoft 365 Online).",
            "Ưu điểm của đám mây là mở rộng linh hoạt, tiết kiệm đầu tư ban đầu, cộng tác thời gian thực; nhược điểm là phụ thuộc kết nối Internet và cần bảo mật tài khoản.",
          ],
          sections: [
            {
              title: "Phần mềm ứng dụng cục bộ và Phần mềm trực tuyến",
              content: `- **Phần mềm ứng dụng:** Là các chương trình giúp người dùng giải quyết công việc cụ thể như soạn thảo văn bản (Word, Writer), tính toán bảng tính (Excel, Calc), thiết kế ảnh (Photoshop, GIMP), trình chiếu...
- **Cục bộ (Desktop App) vs Trực tuyến (Web App):**
  - *Cài đặt cục bộ:* Phải tải bộ cài và cài lên ổ cứng từng máy; chạy được khi không có mạng nhưng khó cộng tác nhiều người cùng lúc.
  - *Chạy trực tuyến qua trình duyệt:* Không cần cấu hình máy cá nhân quá mạnh, không phải tự cài đặt hay cập nhật thủ công, hỗ trợ **nhiều người cùng chỉnh sửa theo thời gian thực** (như Google Docs, Google Sheets, Microsoft Excel Online).`,
            },
            {
              title: "3 mô hình dịch vụ Điện toán đám mây: IaaS, PaaS, SaaS",
              content: `| Mô hình | Tên đầy đủ | Nhà cung cấp quản lí gì? Khách hàng làm gì? | Ví dụ điển hình |
| :--- | :--- | :--- | :--- |
| **IaaS** | *Infrastructure as a Service* (Hạ tầng như một dịch vụ) | Nhà cung cấp cho thuê máy chủ ảo (VPS), CPU, RAM, ổ cứng mạng. **Khách hàng tự cài HĐH** và phần mềm | **AWS EC2**, **Google Compute Engine**, Azure VM |
| **PaaS** | *Platform as a Service* (Nền tảng như một dịch vụ) | Nhà cung cấp lo sẵn phần cứng, HĐH và môi trường chạy. **Lập trình viên chỉ việc đẩy code lên triển khai** | **Vercel**, **Heroku**, **Google App Engine** |
| **SaaS** | *Software as a Service* (Phần mềm như một dịch vụ) | Nhà cung cấp vận hành trọn gói; **người dùng cuối mở trình duyệt dùng ngay** | **Gmail**, **Google Docs**, **Google Drive**, **Canva**, **Microsoft 365 Online** |

> **Quy luật giảm dần trách nhiệm quản trị:** Ở tầng **IaaS**, khách hàng có quyền kiểm soát và tự cài đặt hệ điều hành nhiều nhất; sang **PaaS** chỉ tập trung vào mã nguồn ứng dụng; đến **SaaS** chỉ việc sử dụng phần mềm hoàn chỉnh.`,
            },
            {
              title: "Ưu điểm và Hạn chế của dịch vụ đám mây",
              content: `- **Ưu điểm:**
  - Chi phí linh hoạt theo mức sử dụng thực tế (trả tiền theo tháng/lượt dùng), không tốn vốn lớn mua máy chủ vật lí ban đầu.
  - Mở rộng hoặc thu hẹp tài nguyên tính toán nhanh chóng khi lưu lượng tăng đột biến.
  - Dễ dàng lưu trữ, đồng bộ và chia sẻ tài liệu lớn chỉ bằng đường liên kết (Google Drive, OneDrive, iCloud).
- **Hạn chế cần lưu ý:**
  - **Phụ thuộc kết nối Internet:** Khi mất mạng hoàn toàn, phần mềm trực tuyến không hỗ trợ chế độ ngoại tuyến sẽ không sử dụng/đồng bộ được.
  - **An toàn tài khoản:** Dùng đám mây **không** giúp người dùng miễn nhiễm với việc lộ mật khẩu; vẫn phải đặt mật khẩu mạnh và bật 2FA.`,
            },
          ],
          example: {
            title: "Phân loại nhanh tình huống sử dụng 3 tầng IaaS – PaaS – SaaS",
            code: `• Tình huống 1 (IaaS): Công ty thuê máy chủ ảo trên Google Compute Engine rồi tự cài Ubuntu và cấu hình database.
• Tình huống 2 (PaaS): Nhóm sinh viên đẩy mã nguồn web Next.js lên Vercel để chạy ngay mà không cần cài đặt hệ điều hành.
• Tình huống 3 (SaaS): Học sinh mở Google Docs trên Chrome để làm báo cáo nhóm theo thời gian thực.`,
            language: "text",
            explanation:
              "Hãy nhìn vào đối tượng sử dụng và mức độ tự cấu hình: Tự cài HĐH → IaaS; Đẩy code lên môi trường sẵn → PaaS; Người dùng mở web xài luôn → SaaS.",
          },
          commonMistakes: [
            "Nhầm chữ viết tắt: I = Infrastructure (Hạ tầng), P = Platform (Nền tảng), S = Software (Phần mềm).",
            "Cho rằng dùng phần mềm trực tuyến trên trình duyệt bắt buộc máy cá nhân phải có cấu hình cực mạnh — thực chất máy chủ đám mây gánh phần xử lí nặng.",
            "Nhầm 'Phần mềm nguồn mở' đồng nghĩa với 'Phần mềm đám mây' (đây là 2 khái niệm phân loại theo tiêu chí hoàn toàn khác nhau).",
          ],
          note: "Nhớ mẹo: Thuê máy chủ ảo tự cài HĐH = IaaS; Môi trường đẩy code = PaaS; Ứng dụng web dùng ngay (Gmail, Docs, Canva) = SaaS.",
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
          intro:
            "Làm thế nào 40 thiết bị trong một gia đình hay phòng học đều dùng chung một đường truyền Internet của nhà mạng? Và khi chia sẻ thư mục hay máy in trong mạng nội bộ LAN, cần cấu hình địa chỉ IP, mặt nạ mạng và phân quyền ra sao cho an toàn?",
          objectives: [
            "So sánh chính xác kết nối có dây (cáp xoắn đôi RJ45, cáp quang) với kết nối không dây (Bluetooth, Wi-Fi, chuẩn bảo mật Wi-Fi, Repeater/Mesh).",
            "Hiểu cấu trúc địa chỉ IPv4 nội bộ, ý nghĩa của Mặt nạ mạng (Subnet Mask) và cơ chế chuyển đổi địa chỉ NAT trên Router.",
            "Thực hiện thiết lập và phân quyền chia sẻ thư mục, máy in an toàn trong mạng nội bộ LAN (Read, Read/Write, Full Control).",
          ],
          bullets: [
            "Bluetooth kết nối cự li rất gần (truyền ảnh giữa 2 điện thoại gần nhau, tai nghe); Wi-Fi phủ sóng phòng/tòa nhà (nên bật mã hóa WPA2/WPA3 và có thể mở rộng bằng Repeater/Mesh).",
            "Mặt nạ mạng (Subnet Mask, VD `255.255.255.0`) tách địa chỉ IPv4 thành phần địa chỉ mạng và phần địa chỉ máy trạm; hai máy cùng LAN không được trùng IP.",
            "Kĩ thuật NAT trên Router ánh xạ nhiều IP nội bộ (như `192.168.1.x`) qua 1 IP công cộng để ra Internet; khi chia sẻ thư mục LAN nên cấp quyền Chỉ đọc (Read) cho người lạ.",
          ],
          sections: [
            {
              title: "Phương thức kết nối có dây, không dây và Mở rộng mạng",
              content: `- **Kết nối có dây (Ethernet):** Dùng **cáp xoắn đôi RJ45** nối máy tính vào **Switch** trong phòng thực hành, hoặc **cáp quang** (truyền tín hiệu bằng xung ánh sáng, tốc độ rất cao, ít suy hao và không bị nhiễu điện từ). Kết nối dây ổn định hơn và không bị tường chắn làm suy giảm như Wi-Fi.
- **Kết nối không dây:**
  - **Bluetooth:** Tầm ngắn vài mét, tiện truyền nhanh ảnh giữa 2 điện thoại đứng gần nhau khi không có Wi-Fi hoặc nối tai nghe không dây.
  - **Wi-Fi (qua Access Point):** Phủ sóng phòng học, tòa nhà. Nên bật chuẩn bảo mật **WPA2 hoặc WPA3** trên bộ phát để mã hóa kết nối; dùng **Repeater / Mesh Wi-Fi** để mở rộng vùng phủ sóng cho nhà nhiều tầng. Tránh dùng Wi-Fi công cộng không mật khẩu cho giao dịch ngân hàng.`,
            },
            {
              title: "Địa chỉ IPv4 nội bộ, Mặt nạ mạng (Subnet Mask) và Kĩ thuật NAT",
              content: `- **Địa chỉ IPv4 và Xung đột IP:** Mỗi thiết bị trong cùng mạng LAN phải có địa chỉ IPv4 **duy nhất** (ví dụ dải nội bộ \`192.168.1.10\`, \`192.168.1.25\`). Nếu hai máy đặt trùng hoàn toàn một địa chỉ IP sẽ xảy ra xung đột mạng.
- **Mặt nạ mạng (Subnet Mask):** Đi kèm địa chỉ IP để phân tách **phần địa chỉ mạng (Net ID)** và **phần địa chỉ máy trạm (Host ID)**.
  - *Ví dụ:* Với IP \`192.168.1.25\` và Subnet Mask \`255.255.255.0\`, ba nhóm số đầu \`192.168.1\` là **phần địa chỉ mạng**, còn \`.25\` là **phần máy trạm**.
- **Kĩ thuật NAT (Network Address Translation):** Chạy trên Router gia đình/cơ quan, giúp chuyển đổi (ánh xạ) nhiều địa chỉ IP nội bộ (Private IP) sang một địa chỉ IP công cộng (Public IP) để tất cả thiết bị dùng chung đường truyền Internet.`,
            },
            {
              title: "Chia sẻ thư mục và máy in trong mạng LAN",
              content: `Trên hệ điều hành (như Windows), để các máy cùng mạng LAN nhìn thấy tài nguyên chia sẻ, cần bật **Network Discovery** (Phát hiện mạng) và **File and Printer Sharing**.

**Phân quyền truy cập khi chia sẻ thư mục:**
- **Chỉ đọc (Read):** Người khác chỉ xem và sao chép tệp về máy họ, **không sửa hoặc xóa** được bản gốc — nên áp dụng mặc định cho người dùng phổ thông/người lạ để tránh mất dữ liệu.
- **Đọc / Ghi (Read/Write)** hoặc **Toàn quyền (Full Control):** Cho phép xem, sửa đổi và xóa tệp trong thư mục chia sẻ.

**Lưu ý khi chia sẻ máy in qua USB hay thư mục trên PC:** Máy tính cắm trực tiếp máy in USB hoặc chứa thư mục chia sẻ **bắt buộc phải đang bật nguồn và kết nối LAN** thì các máy trạm khác mới in hoặc truy cập được.`,
            },
          ],
          example: {
            title: "Cơ chế NAT & Phân tích Subnet Mask trong mạng LAN",
            code: `1. Phân tách địa chỉ IP bằng Subnet Mask:
   IPv4:        192.168.1 . 25
   Subnet Mask: 255.255.255 . 0
   ──▶ Phần mạng: 192.168.1  |  Phần máy trạm: 25

2. Cơ chế NAT trên Router:
   Laptop (192.168.1.10)    ──┐
   Điện thoại (192.168.1.11)──┼──▶ [Router NAT] ──(Public IP: 113.160.45.8)──▶ Internet`,
            language: "text",
            explanation:
              "NAT vừa tiết kiệm địa chỉ IPv4 công cộng khan hiếm, vừa che giấu IP nội bộ của các thiết bị bên trong LAN.",
          },
          commonMistakes: [
            "Nhầm rằng tắt nguồn máy tính chứa thư mục chia sẻ (hoặc máy cắm máy in USB) thì các máy khác trong LAN vẫn truy cập bình thường.",
            "Cho rằng hai thiết bị trong cùng LAN có thể dùng trùng địa chỉ IPv4 mà không xung đột.",
            "Tưởng Bluetooth có tầm phủ sóng rộng hơn Wi-Fi hoặc cáp quang.",
          ],
          note: "Nhớ: NAT = đổi IP nội bộ sang IP công cộng trên Router; Subnet Mask = tách phần mạng và phần máy trạm; Chia sẻ cho người lạ nên để quyền Read.",
        },
        {
          id: "l11-2-2",
          title: "An toàn thông tin trên không gian số",
          minutes: 25,
          orientation: "CHUNG",
          tags: ["mã độc", "bảo mật"],
          intro:
            "Một cú click nhầm vào phần mềm bẻ khóa (crack) hay tin nhắn giả mạo ngân hàng có thể khiến toàn bộ dữ liệu trên máy bị mã hóa đòi tiền chuộc hoặc mất sạch tài khoản. Em cần phân biệt rõ các loại mã độc, tấn công mạng và nắm chắc các lớp phòng thủ hiệu quả.",
          objectives: [
            "Phân biệt 5 loại mã độc hay thi: Virus, Sâu máy tính (Worm), Trojan, Ransomware và Keylogger.",
            "Nhận diện các hình thức tấn công phổ biến: Phishing (lừa đảo giả mạo) và DDoS (từ chối dịch vụ phân tán).",
            "Vận dụng đúng các giải pháp phòng vệ: Sao lưu dự phòng (Backup tách biệt), Tường lửa (Firewall), HTTPS, 2FA, Trình quản lí mật khẩu và cập nhật bản vá.",
          ],
          bullets: [
            "Virus cần gắn vào tệp vật chủ để lây; Worm tự nhân bản lây lan qua mạng; Trojan giả dạng phần mềm hữu ích; Ransomware mã hóa dữ liệu đòi tiền chuộc; Keylogger ghi lén thao tác bàn phím.",
            "Phishing giả mạo email/tin nhắn/website uy tín (có thể tinh vi sửa vài kí tự tên miền) để đánh cắp mật khẩu, OTP; DDoS làm quá tải máy chủ bằng lượng truy cập khổng lồ.",
            "Phòng vệ toàn diện: Sao lưu định kì ra ổ cứng rời/đám mây (chống Ransomware), bật Firewall & 2FA, dùng trình quản lí mật khẩu, cập nhật HĐH & phần mềm diệt virus, không cài phần mềm crack.",
          ],
          sections: [
            {
              title: "Phân biệt 5 loại Mã độc (Malware) thường gặp",
              content: `| Loại mã độc | Cơ chế hoạt động & Dấu hiệu đặc trưng |
| :--- | :--- |
| **Virus** *(cổ điển)* | Bắt buộc **gắn (ký sinh) vào một tệp tin hoặc chương trình vật chủ**; chỉ lây lan khi người dùng chạy hoặc chia sẻ tệp bị nhiễm |
| **Worm** *(Sâu máy tính)* | **Tự nhân bản và tự lây lan nhanh qua mạng** mà **không cần tệp vật chủ**, thường làm nghẽn băng thông hệ thống |
| **Trojan** *(Con ngựa thành Troy)* | **Giả dạng phần mềm hữu ích** (game miễn phí, công cụ crack, phần mềm lậu) để đánh lừa người dùng cài đặt rồi mở cửa hậu đánh cắp dữ liệu |
| **Ransomware** *(Mã độc tống tiền)* | **Mã hóa toàn bộ dữ liệu** trên ổ đĩa nạn nhân và **đòi tiền chuộc** mới đưa khóa giải mã |
| **Keylogger** | Âm thầm **ghi lại mọi thao tác gõ phím** (mật khẩu, số thẻ) gửi về cho kẻ tấn công |`,
            },
            {
              title: "Các hình thức tấn công mạng: Phishing và DDoS",
              content: `- **Phishing (Lừa đảo giả mạo):** Kẻ gian gửi tin nhắn SMS, email báo trúng thưởng lớn bất ngờ/cảnh báo khóa tài khoản, kèm đường link dẫn tới trang web giả mạo (tên miền cố tình đổi vài kí tự rất giống trang thật) để lừa nạn nhân nhập mật khẩu và mã **OTP**.
  - *Cảnh giác với HTTPS:* Tiền tố \`https://\` + ổ khóa chứng tỏ đường truyền được **mã hóa bảo mật** chống nghe lén, nhưng kẻ xấu vẫn có thể đăng kí chứng chỉ SSL cho tên miền giả mạo — do đó phải kiểm tra kĩ **tên miền chính xác**.
- **DDoS (Distributed Denial of Service — Tấn công từ chối dịch vụ phân tán):** Huy động hàng loạt máy tính/thiết bị nhiễm mã độc gửi lượng truy cập khổng lồ đồng thời nhằm làm **quá tải tài nguyên**, khiến máy chủ hợp pháp tê liệt.`,
            },
            {
              title: "Các tuyến phòng thủ và Xử lí sự cố tài khoản",
              content: `1. **Sao lưu dự phòng (Backup) đúng cách:** Biện pháp hiệu quả nhất để khôi phục dữ liệu khi dính Ransomware hoặc hỏng ổ cứng là sao lưu định kì ra **ổ cứng rời ngắt kết nối** hoặc **lưu trữ đám mây** (chỉ chép sang thư mục khác trên *cùng một ổ cứng* là KHÔNG an toàn nếu ổ cứng hỏng vật lí hoặc bị mã hóa hết!).
2. **Bảo mật mật khẩu & 2FA:** Dùng **Trình quản lí mật khẩu** để tạo và lưu mật khẩu riêng biệt, dài, đủ 4 nhóm kí tự cho từng dịch vụ; luôn bật **2FA** (OTP / sinh trắc học) và tuyệt đối không chia sẻ mã OTP.
3. **Tường lửa (Firewall) & Cập nhật bản vá:** Firewall kiểm soát lưu lượng mạng vào/ra theo quy tắc bảo mật; cập nhật HĐH giúp vá lỗ hổng bảo mật; cập nhật cơ sở dữ liệu cho phần mềm diệt virus thường xuyên. Tuy nhiên, Firewall **không** bảo vệ được nếu chính người dùng tự tay tải tệp độc hại/link rút gọn lạ.
4. **Khi phát hiện tài khoản bị đăng nhập trái phép từ thiết bị lạ:** Việc ưu tiên đầu tiên là **đổi ngay mật khẩu mạnh, đăng xuất khỏi tất cả các thiết bị khác và bật/kiểm tra lại 2FA**.`,
            },
          ],
          example: {
            title: "So sánh nhanh 4 tình huống mất an toàn thông tin",
            code: `1. Tải game crack miễn phí về cài xong bị mất tài khoản Facebook ──▶ Trojan / Keylogger
2. Toàn bộ file Word, ảnh chuyển đuôi lạ không mở được, hiện bảng đòi Bitcoin ──▶ Ransomware
3. Nhận SMS "Tài khoản sắp khóa, bấm bit.ly/... nhập OTP để xác minh" ──▶ Phishing
4. Trang web trường bị 100.000 kết nối giả tràn vào cùng lúc gây sập ──▶ DDoS`,
            language: "text",
            explanation:
              "Nhận diện đúng tên gọi từng loại tấn công và mã độc giúp chọn ngay biện pháp phòng tránh phù hợp nhất.",
          },
          commonMistakes: [
            "Nhầm Virus với Worm: Virus cần tệp vật chủ, còn Worm tự lây lan qua mạng không cần tệp vật chủ.",
            "Tin rằng đã bật Tường lửa (Firewall) hoặc thấy ổ khóa `https://` thì bấm link rút gọn/tệp đính kèm lạ vẫn an toàn tuyệt đối.",
            "Cho rằng copy bản sao lưu sang ổ D hay thư mục khác trên cùng 1 ổ cứng vật lí là đã chống được hỏng ổ cứng hay Ransomware.",
            "Nghĩ rằng cài phần mềm bẻ khóa (crack) miễn phí là vô hại.",
          ],
          note: "Chốt nhanh: Giả dạng phần mềm hữu ích = Trojan; Tự lây qua mạng = Worm; Mã hóa đòi tiền = Ransomware; Giả mạo link lấy OTP = Phishing; Quá tải server = DDoS.",
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
          intro:
            "Khi làm bài thuyết trình hay video, nhiều bạn có thói quen tìm ảnh trên Google rồi lưu về dùng ngay mà không ghi nguồn, hoặc tải phần mềm lậu về cài. Đó đều là hành vi xâm phạm quyền sở hữu trí tuệ. Bài học này hệ thống đầy đủ Quyền tác giả theo Luật Sở hữu trí tuệ Việt Nam và hệ thống giấy phép mở Creative Commons (CC).",
          objectives: [
            "Phân biệt 2 nhóm quyền chính trong Quyền tác giả: Quyền nhân thân và Quyền tài sản.",
            "Hiểu phạm vi bảo hộ bản quyền số (văn bản, ảnh, video, phần mềm, bài báo miễn phí) và nhận diện hành vi đạo văn.",
            "Giải mã chính xác các kí hiệu giấy phép Creative Commons: `CC0`, `BY`, `NC`, `ND`, `SA`.",
          ],
          bullets: [
            "Theo Luật Sở hữu trí tuệ Việt Nam, Quyền tác giả gồm 2 nhóm: Quyền nhân thân (đặt tên, đứng tên, bảo vệ sự toàn vẹn tác phẩm) và Quyền tài sản (sao chép, phân phối, thu lợi).",
            "Mọi sản phẩm sáng tạo trên mạng (kể cả ảnh không ghi chú © hay bài báo đọc miễn phí) mặc định đều được bảo hộ bản quyền; lấy ý tưởng/bài viết của người khác nhận làm của mình là Đạo văn.",
            "Giấy phép Creative Commons (CC) quy định điều kiện chia sẻ: BY (ghi tên tác giả), NC (phi thương mại), ND (không tạo bản phái sinh), SA (chia sẻ tương tự), CC0 (phạm vi công cộng).",
          ],
          sections: [
            {
              title: "Quyền tác giả theo Luật Sở hữu trí tuệ Việt Nam",
              content: `Mọi sản phẩm sáng tạo số — từ văn bản, ảnh chụp, âm nhạc, video cho đến **phần mềm máy tính (mã nguồn)** — đều được pháp luật bảo hộ quyền tác giả, **ngay cả khi không gắn kí hiệu \`©\` (Copyright)** hay không có dòng cảnh báo bản quyền. Kí hiệu \`©\` chỉ giúp nhắc nhở rõ ràng rằng tác phẩm đang được bảo hộ bản quyền.

**2 nhóm quyền cấu thành Quyền tác giả:**
1. **Quyền nhân thân:** Gắn liền với tác giả, gồm quyền đặt tên cho tác phẩm, **đứng tên thật hoặc bút danh trên tác phẩm**, công bố tác phẩm và **bảo vệ sự toàn vẹn của tác phẩm** (không cho người khác tự ý cắt xén, xuyên tạc nội dung).
2. **Quyền tài sản:** Quyền làm tác phẩm phái sinh, sao chép, phân phối, truyền đạt tác phẩm đến công chúng và **khai thác thu lợi ích kinh tế**.

- **Đạo văn (Plagiarism):** Là hành vi lấy nguyên văn hoặc ý tưởng/cấu trúc bài viết của người khác và nhận làm của mình mà không trích dẫn nguồn.
- **Giấy phép phần mềm đơn lẻ (Single-user license):** Nếu mua bản quyền cho 1 máy tính cá nhân, chỉ được cài đặt và sử dụng trên đúng 1 máy theo thỏa thuận (không được sao chép chia cho cả lớp cài miễn phí).`,
            },
            {
              title: "Hệ thống giấy phép mở Creative Commons (CC)",
              content: `Để thuận tiện chia sẻ tri thức mà vẫn bảo vệ quyền lợi tác giả, hệ thống giấy phép **Creative Commons (CC)** dùng 4 điều kiện kí hiệu ghép lại:

| Kí hiệu | Tên tiếng Anh | Ý nghĩa & Nghĩa vụ của người dùng lại |
| :--- | :--- | :--- |
| **\`BY\`** | *Attribution* | **Bắt buộc ghi công / trích dẫn rõ tên tác giả**, tên tác phẩm và nguồn |
| **\`NC\`** | *Non-Commercial* | **Phi thương mại:** Chỉ dùng cho học tập, cá nhân; **cấm** dùng vào mục đích kinh doanh kiếm tiền |
| **\`ND\`** | *No Derivatives* | **Không phái sinh:** Chỉ được chia sẻ nguyên bản, **cấm** chỉnh sửa, cắt ghép tạo phiên bản mới |
| **\`SA\`** | *Share Alike* | **Chia sẻ tương tự:** Nếu chỉnh sửa tạo bản phái sinh thì phải phát hành dưới **cùng giấy phép tương tự** bản gốc |
| **\`CC0\`** | *Public Domain* | **Phạm vi công cộng:** Tác giả từ bỏ mọi ràng buộc bản quyền; người dùng tự do sử dụng (kể cả thương mại) |`,
            },
          ],
          example: {
            title: "Đọc hiểu các tổ hợp giấy phép Creative Commons thường gặp",
            code: `• CC BY-SA 4.0 (như Wikipedia / Wikimedia Commons):
    Được sửa đổi và dùng kể cả thương mại, NHƯNG phải (1) ghi nguồn tác giả (BY) và (2) giữ nguyên giấy phép CC BY-SA cho bản mới (SA).

• CC BY-NC-ND:
    Phải ghi nguồn (BY), KHÔNG được bán kiếm tiền (NC), KHÔNG được chỉnh sửa/cắt ghép (ND).`,
            language: "text",
            explanation:
              "Chỉ cần thuộc 4 kí hiệu BY, NC, ND, SA là giải được mọi biến thể giấy phép Creative Commons trong đề thi.",
          },
          commonMistakes: [
            "Nghĩ rằng ảnh hay bài báo đọc miễn phí trên Google không ghi dấu © thì ai cũng được quyền copy toàn văn, xóa tên tác giả hoặc đem in bán.",
            "Nhầm kí hiệu `ND` (No Derivatives — cấm sửa đổi) là cho phép chỉnh sửa thoải mái.",
            "Cho rằng chỉ cần ghi tên tác giả là được phép đem sách của người khác đi in lậu bán lấy tiền — hành vi kinh doanh trái phép vẫn vi phạm Quyền tài sản!",
          ],
          note: "Nhớ 4 chữ vàng của Creative Commons: BY = Ghi nguồn; NC = Không thương mại; ND = Không sửa đổi; SA = Giữ cùng giấy phép.",
        },
        {
          id: "l11-3-2",
          title: "Giao tiếp và ứng xử trong môi trường số",
          minutes: 20,
          orientation: "CHUNG",
          tags: ["bạo lực mạng", "riêng tư"],
          intro:
            "Mỗi lượt thích, bình luận, bức ảnh đăng lên hay thậm chí việc âm thầm lướt web đều để lại một vệt dữ liệu dài lâu trên Internet gọi là 'Dấu chân số'. Cách em ứng xử hôm nay sẽ định hình uy tín cá nhân của em nhiều năm sau khi đi xin học bổng hay tuyển dụng.",
          objectives: [
            "Phân biệt Dấu chân số chủ động (Active) và Dấu chân số bị động (Passive) cùng ảnh hưởng lâu dài tới danh tiếng cá nhân.",
            "Thực hành văn hóa giao tiếp lịch sự (Netiquette) khi thảo luận nhóm và viết email chuyên nghiệp gửi thầy cô.",
            "Nhận diện, phòng tránh bạo lực mạng và biết cách phản ứng khôn ngoan trước bình luận khiêu khích hoặc tin đồn.",
          ],
          bullets: [
            "Dấu chân số (Digital Footprint) gồm dấu chân chủ động (bài đăng, ảnh, bình luận ta tự đăng) và dấu chân bị động (cookie, địa chỉ IP, lịch sử duyệt web bị hệ thống tự ghi lại); xóa bài vẫn có thể đã bị chụp màn hình lưu giữ.",
            "Không đăng thông tin nhạy cảm (CCCD, mật khẩu, địa chỉ nhà), không quay lén hay tag bạn bè vào bài quảng cáo khi chưa xin phép; tài khoản ẩn danh vẫn có dấu vết kĩ thuật.",
            "Khi gặp bình luận khiêu khích: giữ bình tĩnh, không chửi bới tay đôi, chặn/báo cáo; khi viết email cho giáo viên phải có Tiêu đề rõ ràng, lời chào, nội dung lịch sự và chữ kí tên/lớp.",
          ],
          sections: [
            {
              title: "Dấu chân số (Digital Footprint): Chủ động vs Bị động",
              content: `**Dấu chân số** là toàn bộ dấu vết dữ liệu hoạt động mà người dùng để lại khi sử dụng Internet. Dấu chân số rất khó xóa sạch hoàn toàn vì dữ liệu có thể đã được máy chủ lưu trữ hoặc người khác chụp màn hình/sao chép lại.

| Loại dấu chân số | Cách hình thành | Ví dụ cụ thể |
| :--- | :--- | :--- |
| **Chủ động (Active)** | Người dùng **tự giác đăng tải**, chia sẻ thông tin | Đăng trạng thái, ảnh, video lên Facebook/TikTok, viết bình luận, gửi email |
| **Bị động (Passive)** | Các trang web, nền tảng **tự động thu thập âm thầm** | Lưu **cookie**, ghi nhận **địa chỉ IP**, vị trí GPS, lịch sử tìm kiếm và thời gian xem video |

- **Cách xây dựng dấu chân số tích cực từ THPT:** Chia sẻ sản phẩm học tập, bài viết hữu ích, bình luận lịch sự, giữ thái độ tôn trọng — vì nhiều trường đại học và nhà tuyển dụng hiện nay xem xét hồ sơ mạng xã hội của ứng viên.`,
            },
            {
              title: "Quy tắc Netiquette, Email chuẩn mực và Quyền riêng tư",
              content: `- **Văn hóa thảo luận nhóm (Netiquette):** Trình bày rõ ý kiến, tôn trọng khác biệt, không spam tin nhắn rác hay gắn thẻ (tag) bạn bè vào bài quảng cáo bán hàng khi chưa được đồng ý.
- **Viết Email cho giáo viên / nhà trường:** Luôn ghi rõ **Chủ đề (Subject)** ngắn gọn đúng nội dung, có **lời chào trân trọng**, trình bày mạch lạc có dấu tiếng Việt, tệp đính kèm đặt tên rõ ràng và có **phần kết + Họ tên, Lớp**.
- **Bảo vệ quyền riêng tư:** Xin phép trước khi đăng ảnh chung; tuyệt đối không tự ý công khai tin nhắn riêng tư, không quay lén phát tán tình huống nhạy cảm của người khác để câu tương tác.`,
            },
            {
              title: "Ứng phó trước Bạo lực mạng và Khiêu khích trực tuyến",
              content: `- **Bạo lực mạng:** Hành vi dùng công nghệ số để đe dọa, quấy rối, lập nhóm nói xấu, bôi nhọ hoặc cô lập người khác. Gây tổn thương tâm lí nặng nề chứ **không phải** trò đùa vô hại.
- **Cách ứng xử đúng:**
  - Khi bị tài khoản lạ khiêu khích vô cớ: **Không đôi co bằng lời lẽ thô tục**, giữ bình tĩnh, chặn và báo cáo vi phạm.
  - Khi thấy bạn bị lập nhóm nói xấu: **Không hùa theo hay chia sẻ**, lên tiếng bảo vệ đúng mực hoặc báo ngay cho thầy cô chủ nhiệm/gia đình để kịp thời hỗ trợ.
  - Khi thấy tin giật gân: **Kiểm chứng nguồn tin và ngày đăng** trước khi bấm nút chia sẻ.`,
            },
          ],
          example: {
            title: "Mẫu Email chuyên nghiệp gửi giáo viên bộ môn",
            code: `To:      gv.tinhoc@truongthpt.edu.vn
Subject: [11A1 - Nguyễn Văn An] Nộp bài thực hành Python tuần 5

Kính chào thầy/cô,
Em là Nguyễn Văn An, học sinh lớp 11A1. Em xin phép gửi thầy/cô bài thực hành xử lí xâu kí tự tuần 5 ở tệp đính kèm bên dưới.
Em cảm ơn thầy/cô và chúc thầy/cô một ngày làm việc tốt lành.
Trân trọng,
Nguyễn Văn An - Lớp 11A1`,
            language: "text",
            explanation:
              "Một bức email có Subject rõ ràng, xưng hô lễ phép và đầy đủ thông tin người gửi thể hiện sự tôn trọng và chuyên nghiệp.",
          },
          commonMistakes: [
            "Nghĩ rằng dùng tài khoản ẩn danh đi xúc phạm người khác sẽ không để lại bất kì dấu vết kĩ thuật nào (địa chỉ IP, log máy chủ vẫn lưu vết).",
            "Cho rằng nhà tuyển dụng không bao giờ xem mạng xã hội của ứng viên, hoặc xóa bài rồi là mất vĩnh viễn.",
            "Nhầm lẫn dấu chân số chủ động (tự đăng bài) với dấu chân số bị động (cookie, IP web tự thu thập).",
          ],
          note: "3 câu hỏi trước khi đăng: (1) Có đúng sự thật & tôn trọng không? (2) Có lộ riêng tư bản thân/bạn bè không? (3) 5 năm nữa nhìn lại có tự hào không?",
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
          intro:
            "Khi cần lưu điểm kiểm tra của cả lớp 40 học sinh thay vì tạo 40 biến rời rạc, ta dùng kiểu dữ liệu Danh sách (`list`). Hiểu rõ cơ chế chỉ số âm/dương, các phương thức thêm/xóa/sắp xếp và sự khác biệt giữa sao chép tham chiếu (`b = a`) với sao chép độc lập (`b = a.copy()`) là chìa khóa giải quyết các bài Python lớp 11.",
          objectives: [
            "Khởi tạo danh sách, truy cập và sửa đổi phần tử theo chỉ số dương (`0..n-1`) và chỉ số âm (`-1..-n`), tránh lỗi `IndexError`.",
            "Phân biệt và sử dụng thành thạo `append`, `insert`, `pop`, `remove`, `del`, `sort()` vs `sorted()`, `reverse()`, `count()`.",
            "Biết cách duyệt danh sách, tính `len`, `sum`, `max`, `min`, dùng phép toán `+`, `*`, cắt danh sách `a[start:end]` và sao chép danh sách độc lập `a.copy()`.",
          ],
          bullets: [
            "List có tính khả biến (mutable) và có thể chứa phần tử khác kiểu nhau; chỉ số bắt đầu từ `0`, `a[-1]` là phần tử cuối; truy cập ngoài phạm vi gây lỗi `IndexError`.",
            "`append(x)` thêm cuối; `insert(i, x)` chèn tại chỉ số `i`; `pop(i)` xóa & trả về theo chỉ số (mặc định cuối); `remove(x)` xóa theo giá trị đầu tiên gặp.",
            "Phép gán `b = a` khiến `a` và `b` cùng trỏ một vùng nhớ (sửa `b` làm `a` đổi theo); muốn tạo bản sao độc lập phải dùng `b = a.copy()` hoặc `b = a[:]`.",
          ],
          sections: [
            {
              title: "Khởi tạo, Chỉ số (Index) và Phép toán cơ bản trên List",
              content: `- **Khởi tạo:** \`a = [10, 20, 30, 40]\` (danh sách trong Python **không bắt buộc** các phần tử phải cùng kiểu dữ liệu, và cho phép sửa đổi trực tiếp giá trị phần tử — gọi là *mutable*).
- **Chỉ số dương và âm:**
  - Phần tử đầu tiên có chỉ số \`0\` (\`a[0] = 10\`), phần tử cuối có chỉ số \`len(a) - 1\` hoặc **\`-1\`** (\`a[-1] = 40\`, \`a[-2] = 30\`).
  - Truy cập chỉ số vượt phạm vi (VD \`a[4]\` khi chỉ có 4 phần tử) gây lỗi **\`IndexError\`**.
- **Cắt danh sách (Slicing):** \`a[start:end]\` lấy các phần tử từ chỉ số \`start\` đến **\`end - 1\`** (VD \`a[1:3]\` chỉ lấy \`a[1]\` và \`a[2]\`, KHÔNG lấy \`a[3]\`).
- **Phép toán trên List:**
  - Nối và lặp: \`[1, 2] + [3] * 2\` → \`[1, 2, 3, 3]\`.
  - Kiểm tra tồn tại: \`x in a\` trả về \`True\`/\`False\`.
  - Hàm thống kê: \`len(a)\` (độ dài), \`sum(a)\` (tổng), \`max(a)\` (lớn nhất), \`min(a)\` (nhỏ nhất).`,
            },
            {
              title: "Các phương thức thêm, xóa, sắp xếp quan trọng",
              content: `| Lệnh / Phương thức | Chức năng | Lưu ý hay ra thi |
| :--- | :--- | :--- |
| \`a.append(x)\` | Thêm \`x\` vào **cuối** danh sách | Độ dài tăng thêm 1 |
| \`a.insert(i, x)\` | Chèn \`x\` vào **vị trí chỉ số \`i\`** | Các phần tử từ \`i\` trở về sau bị đẩy lùi 1 vị trí |
| \`a.pop(i)\` | Xóa theo **chỉ số \`i\`** và **trả về** phần tử đó | Nếu bỏ trống \`a.pop()\` sẽ xóa và trả về phần tử cuối |
| \`a.remove(x)\` | Xóa phần tử đầu tiên có **giá trị \`x\`** | Báo lỗi \`ValueError\` nếu \`x\` không có trong \`a\` |
| \`del a[i]\` | Xóa phần tử tại chỉ số \`i\` | Không trả về giá trị |
| \`a.sort()\` vs \`sorted(a)\` | Sắp xếp tăng dần | **\`a.sort()\` sửa trực tiếp \`a\` (trả về \`None\`)**; **\`sorted(a)\` tạo danh sách mới, giữ nguyên \`a\`** |
| \`a.reverse()\` | Đảo ngược thứ tự các phần tử tại chỗ | Làm thay đổi trực tiếp \`a\` |
| \`a.count(x)\` | Đếm số lần xuất hiện của giá trị \`x\` | Không làm thay đổi \`a\` |`,
            },
            {
              title: "Duyệt danh sách và Bẫy tham chiếu (b = a vs b = a.copy())",
              content: `- **Hai cách duyệt danh sách:**
  - Duyệt giá trị: \`for x in a:\` (gọn khi chỉ cần đọc/tính toán phần tử).
  - Duyệt chỉ số: \`for i in range(len(a)):\` (khi cần biết vị trí \`i\` hoặc sửa đổi \`a[i]\`).
- **Cẩn thận khi sao chép danh sách:**
  - Viết \`b = a\` **KHÔNG** tạo danh sách mới! Cả \`a\` và \`b\` cùng trỏ tới một danh sách duy nhất trong bộ nhớ, nên sửa \`b[0] = 99\` thì \`a[0]\` cũng biến thành \`99\`.
  - Muốn tạo bản sao **độc lập hoàn toàn**, phải viết **\`b = a.copy()\`** hoặc **\`b = a[:]\`** (hoặc \`b = list(a)\`).`,
            },
          ],
          example: {
            title: "Thao tác trên danh sách điểm & Truy vết chỉ số sau insert/pop",
            code: `a = [3, 6, 9, 12]
a.insert(1, 5)        # Chèn 5 vào vị trí 1 -> [3, 5, 6, 9, 12]
print(a[2])           # 6 (vì số 6 đã bị đẩy từ vị trí 1 sang vị trí 2)

x = a.pop()           # x = 12, a còn [3, 5, 6, 9]
a[2] = a[0] + a[-1]   # a[2] = 3 + 9 = 12 -> a = [3, 5, 12, 9]`,
            language: "python",
            steps: [
              "Ban đầu a = [3, 6, 9, 12].",
              "Sau a.insert(1, 5), phần tử 5 đứng ở chỉ số 1, đẩy 6 sang chỉ số 2.",
              "a.pop() không truyền đối số sẽ lấy và xóa phần tử cuối cùng (12).",
              "a[-1] lúc này là 9, a[0] là 3 nên a[2] cập nhật thành 12.",
            ],
            explanation:
              "Phân biệt rõ truyền **chỉ số** (`insert`, `pop`, `del`) với truyền **giá trị** (`append`, `remove`, `count`).",
          },
          examples: [
            {
              title: "Thao tác trên danh sách điểm & Truy vết chỉ số sau insert/pop",
              code: `a = [3, 6, 9, 12]
a.insert(1, 5)        # [3, 5, 6, 9, 12]
print(a[2])           # 6
x = a.pop()           # x = 12, a = [3, 5, 6, 9]`,
              language: "python",
              explanation:
                "Chú ý khi chèn ở giữa, chỉ số các phần tử phía sau đều tăng thêm 1.",
            },
            {
              title: "Phân biệt a.sort() với sorted(a) và b = a với b = a.copy()",
              code: `a = [8, 3, 5]
b = sorted(a)         # b = [3, 5, 8], a vẫn giữ nguyên [8, 3, 5]

c = a                 # c cùng trỏ với a!
d = a.copy()          # d là bản sao độc lập
c[0] = 100            # a[0] cũng đổi thành 100, nhưng d vẫn là [8, 3, 5]
print(a, b, d)`,
              language: "python",
              explanation:
                "Nhiều câu hỏi Đúng/Sai kiểm tra hiểu biết về tham chiếu `b = a` và hành vi tại chỗ (in-place) của `sort()`.",
            },
          ],
          commonMistakes: [
            "Nhầm `a.remove(x)` là xóa phần tử ở vị trí chỉ số `x` — thực tế `remove(x)` tìm theo GIÁ TRỊ `x`, còn `pop(i)` mới xóa theo CHỈ SỐ `i`.",
            "Nhầm `a.insert(0, x)` thêm vào cuối — thực chất `insert(0, x)` chèn vào ĐẦU danh sách (vị trí `0`).",
            "Tưởng `a[1:3]` lấy 3 phần tử tại vị trí `1, 2, 3` — Python slicing luôn dừng ở `end - 1`, tức chỉ lấy `1` và `2`.",
            "Viết `b = a.sort()` rồi nghĩ `b` là danh sách đã sắp xếp — `a.sort()` trả về `None`!",
          ],
          note: "Nhớ kỹ: `pop(i)` theo chỉ số; `remove(x)` theo giá trị; `a[-1]` là phần tử cuối; `b = a.copy()` để sao chép độc lập.",
        },
        {
          id: "l11-4-2",
          title: "Xâu kí tự",
          minutes: 25,
          orientation: "ICT_CS",
          tags: ["xâu", "cắt xâu"],
          intro:
            "Tên người, biển số xe, mật khẩu hay dữ liệu văn bản đều được lưu dưới dạng Xâu kí tự (`str`). Khác với List, xâu kí tự có tính bất biến (immutable) và đi kèm hàng loạt phương thức xử lí mạnh mẽ như `strip()`, `split()`, `join()`, `find()`, `replace()`.",
          objectives: [
            "Hiểu chỉ số, độ dài `len(s)` (tính cả khoảng trắng) và tính bất biến (immutable) của xâu kí tự trong Python.",
            "Thành thạo các phép cắt xâu `s[start:end]`, `s[:end]`, `s[start:]`, đảo xâu `s[::-1]`, nối xâu (`+`), lặp xâu (`*`) và toán tử `in`.",
            "Sử dụng chuẩn các phương thức: `strip`, `split`, `join`, `find`, `replace`, `lower`, `upper`, `count`, `isdigit`, `startswith`.",
          ],
          bullets: [
            "Xâu kí tự là bất biến (immutable): không thể sửa trực tiếp `s[0] = 'A'`, và các hàm như `s.lower()`, `s.replace()` trả về xâu MỚI chứ không tự làm thay đổi `s` nếu không gán lại.",
            "Phép cắt `s[start:end]` lấy từ `start` đến `end - 1`; `s[:3]` lấy 3 kí tự đầu; `s[2:]` lấy từ chỉ số 2 đến hết; `s[::-1]` đảo ngược xâu.",
            "`s.split()` tách xâu thành list các từ; `'kí_tự'.join(list)` ghép list thành xâu; `s.find(sub)` trả về vị trí đầu tiên hoặc `-1` nếu không thấy.",
          ],
          sections: [
            {
              title: "Tính chất cơ bản và Cắt xâu (Slicing) trong Python",
              content: `- **Độ dài xâu \`len(s)\`:** Đếm **tất cả** kí tự trong xâu, bao gồm cả **dấu cách (khoảng trắng)**. Ví dụ \`len('') == 0\`, \`len('A B C') == 5\`.
- **Tính bất biến (Immutable):** Không thể viết \`s[0] = 'A'\` (sẽ báo lỗi \`TypeError\`). Mọi phương thức xử lí xâu đều tạo ra **một xâu mới** chứ không tự ghi đè biến cũ trừ khi bạn viết \`s = s.lower()\`.
- **Phép toán trên xâu:**
  - Nối xâu: \`'10' + '20'\` cho ra **\`'1020'\`** (ghép chữ, không cộng số!).
  - Lặp xâu: \`'Ha' * 3\` → \`'HaHaHa'\`.
  - Kiểm tra xâu con: \`'an' in 'hoanganh'\` → \`True\` (phân biệt chữ hoa/thường!).
  - Duyệt từng kí tự: \`for ch in s:\`.
- **Cắt xâu \`s[start:end]\`:** Lấy từ chỉ số \`start\` đến **\`end - 1\`**.
  - \`s[:3]\`: từ đầu đến chỉ số \`2\`.
  - \`s[2:]\`: từ chỉ số \`2\` đến hết xâu.
  - \`s[::-1]\`: đảo ngược toàn bộ xâu (VD \`'PYTHON'[::-1]\` → \`'NOHTYP'\`).`,
            },
            {
              title: "Bảng tổng hợp các phương thức xử lí xâu hay thi",
              content: `| Phương thức | Công dụng | Ví dụ minh họa |
| :--- | :--- | :--- |
| \`s.strip()\` | Xóa khoảng trắng (hoặc \`\\n\`) ở **hai đầu** xâu | \`'  Tin  '.strip()\` → \`'Tin'\` |
| \`s.split(sep)\` | Tách xâu thành **list** (mặc định tách theo khoảng trắng) | \`'2025-11-25'.split('-')\` → \`['2025', '11', '25']\` |
| \`sep.join(ds)\` | Ghép một danh sách các xâu thành **1 xâu** | \`'-'.join(['11', 'A1', 'Tin'])\` → \`'11-A1-Tin'\` |
| \`s.find(sub)\` | Tìm vị trí đầu tiên của \`sub\`; trả về **\`-1\`** nếu không thấy | \`'tin hoc 11'.find('hoc')\` → \`4\` |
| \`s.replace(a, b)\` | Tạo xâu mới thay thế \`a\` bằng \`b\` (phân biệt hoa/thường) | \`'Hoc Tin hoc'.replace('hoc', 'Python')\` → \`'Hoc Tin Python'\` |
| \`s.lower() / upper()\` | Chuyển toàn bộ về chữ thường / chữ HOA | \`'Ha Noi'.lower()\` → \`'ha noi'\` |
| \`s.count(sub)\` | Đếm số lần xuất hiện của \`sub\` trong \`s\` | \`'banana'.count('a')\` → \`3\` |
| \`s.isdigit()\` | Trả về \`True\` nếu \`s\` khác rỗng và **toàn chữ số \`0-9\`** | \`'2026'.isdigit()\` → \`True\` |
| \`s.startswith(p)\` | Kiểm tra \`s\` có **bắt đầu** bằng \`p\` không | \`'Tin11'.startswith('Tin')\` → \`True\` |`,
            },
          ],
          example: {
            title: "Cắt xâu, Đếm từ và Tìm kiếm xâu con",
            code: `s = "TINHOC2025"
# Chỉ số: T(0) I(1) N(2) H(3) O(4) C(5) 2(6) 0(7) 2(8) 5(9)
print(s[3:6])        # "HOC" (lấy vị trí 3, 4, 5)
print(s[:3])         # "TIN"
print(s[::-1])       # "5202COHNIT"

cau = "  lap trinh python  "
tu = cau.strip().split()   # ['lap', 'trinh', 'python']
print(len(tu))             # 3`,
            language: "python",
            steps: [
              "Đánh chỉ số từng kí tự bắt đầu từ 0 (nhớ đếm cả dấu cách nếu có).",
              "s[3:6] lấy các kí tự ở chỉ số 3, 4, 5 → 'HOC'.",
              "strip() bỏ khoảng trắng thừa hai đầu, split() tách thành danh sách 3 từ.",
            ],
            explanation:
              "Nếu gọi `s.replace('tin', 'python')` lên `'TINHOC'`, kết quả không đổi vì Python phân biệt chữ hoa và thường.",
          },
          commonMistakes: [
            "Cố gán trực tiếp `s[0] = 'A'` (gây lỗi vì xâu là immutable).",
            "Gọi `s.lower()` hoặc `s.strip()` đứng một mình mà quên gán lại `s = s.lower()` rồi tưởng biến `s` đã bị đổi.",
            "Cắt xâu sai cận phải: tưởng `'ABCDEF'[0:3]` ra `'ABCD'` (đúng là `'ABC'`).",
            "Quên đếm dấu cách khi tính `len('A B C')` (độ dài là `5`, không phải `3`).",
          ],
          note: "Nhớ: `s[start:end]` lấy đến `end - 1`; `find()` không thấy trả `-1`; xâu là bất biến nên `lower()/replace()` phải gán lại mới giữ thay đổi.",
        },
        {
          id: "l11-4-3",
          title: "Tệp và xử lí tệp",
          minutes: 30,
          orientation: "ICT_CS",
          tags: ["tệp", "open"],
          intro:
            "Biến trong bộ nhớ RAM sẽ mất hết ngay khi chương trình tắt. Để lưu trữ dữ liệu lâu dài trên ổ đĩa và đọc dữ liệu đầu vào từ bài toán thực tế (như danh sách điểm, nhật kí hệ thống), Python cung cấp cơ chế đọc và ghi tệp văn bản thông qua hàm `open()`.",
          objectives: [
            "Phân biệt chính xác 3 chế độ mở tệp: `'r'` (đọc), `'w'` (ghi đè mới) và `'a'` (ghi nối thêm cuối tệp).",
            "Sử dụng chuẩn cú pháp `with open(..., encoding='utf-8') as f:` để tự động đóng tệp an toàn và hỗ trợ tiếng Việt.",
            "Phân biệt 3 phương thức đọc (`read`, `readline`, `readlines`) và cách ghi dữ liệu (`write`, ép kiểu `str()`, thêm `'\\n'`).",
          ],
          bullets: [
            "Chế độ `'r'` báo lỗi `FileNotFoundError` nếu tệp chưa tồn tại và KHÔNG cho phép gọi `write()`; `'w'` tạo mới hoặc XÓA SẠCH nội dung cũ để ghi đè; `'a'` tạo mới nếu chưa có hoặc ghi nối tiếp vào cuối tệp.",
            "Dùng `with open(ten_tep, mode, encoding='utf-8') as f:` để Python tự động đóng tệp (flush bộ đệm) khi thoát khối, không cần gọi thêm `f.close()`.",
            "Dữ liệu đọc từ tệp luôn là kiểu `str` (thường kèm `'\\n'` cuối dòng nên hay dùng `line.strip()`); hàm `f.write()` chỉ nhận `str` và không tự xuống dòng.",
          ],
          sections: [
            {
              title: "Ba chế độ mở tệp: 'r', 'w' và 'a'",
              content: `Hàm \`open(ten_tep, che_do, encoding="utf-8")\` mở tệp với 3 chế độ phổ biến:

| Chế độ | Mục đích | Nếu tệp CHƯA tồn tại | Nếu tệp ĐÃ có nội dung |
| :--- | :--- | :--- | :--- |
| **\`'r'\`** *(Read)* | Chỉ đọc (mặc định) | Báo lỗi **\`FileNotFoundError\`** | Đọc từ đầu tệp; **không** gọi được \`f.write()\` |
| **\`'w'\`** *(Write)* | Ghi đè mới | Tự động **tạo tệp mới** | **XÓA SẠCH** toàn bộ nội dung cũ rồi ghi từ đầu |
| **\`'a'\`** *(Append)* | Ghi nối thêm | Tự động **tạo tệp mới** | **Giữ nguyên** nội dung cũ và ghi nối tiếp vào **cuối tệp** |

- **Tại sao nên dùng \`with open(...) as f:\`?** Khi ra khỏi khối lệnh \`with\`, tệp tự động được đóng an toàn ngay cả khi gặp lỗi giữa chừng (không cần viết \`f.close()\`). Nếu mở kiểu cũ \`f = open(...)\` mà quên \`f.close()\`, dữ liệu ghi có thể bị kẹt trong bộ đệm (buffer) chưa lưu xuống đĩa!
- **Tham số \`encoding='utf-8'\`:** Bắt buộc nên truyền khi đọc/ghi tệp có tiếng Việt có dấu để tránh lỗi giải mã (\`UnicodeDecodeError\`) hoặc lỗi hiển thị font.`,
            },
            {
              title: "Các phương thức đọc tệp và xử lí dữ liệu số",
              content: `| Phương thức | Kết quả trả về | Ghi chú sử dụng |
| :--- | :--- | :--- |
| **\`f.read()\`** | **Một xâu (\`str\`) duy nhất** chứa toàn bộ nội dung tệp | Nếu truyền \`f.read(5)\` là đọc **5 kí tự** (KHÔNG phải 5 dòng!) |
| **\`f.readline()\`** | **Một dòng** tiếp theo dưới dạng \`str\` | Gọi 2 lần liên tiếp sẽ đọc lần lượt dòng 1 rồi dòng 2 |
| **\`f.readlines()\`** | **Danh sách (\`list\`)** gồm các phần tử, mỗi phần tử là 1 dòng | Thường kèm kí tự xuống dòng \`\\n\` ở cuối mỗi phần tử |
| \`for line in f:\` | Duyệt lần lượt từng dòng trong tệp | Tiết kiệm RAM; nên dùng \`line.strip()\` để cắt bỏ \`\\n\` ở cuối dòng |

**Chuyển dòng số đọc từ tệp sang danh sách số nguyên:**
Nếu tệp có dòng \`line = '12 25 30\\n'\`:
\`\`\`python
nums = [int(x) for x in line.strip().split()]   # -> [12, 25, 30]
# Hoặc: nums = list(map(int, line.split()))
\`\`\``,
            },
            {
              title: "Ghi dữ liệu vào tệp với f.write()",
              content: `- Hàm \`f.write(s)\` **chỉ chấp nhận tham số là xâu (\`str\`)**. Nếu viết \`f.write(123)\` sẽ gây lỗi \`TypeError\`; phải chuyển sang xâu bằng \`f.write(str(123))\`.
- \`f.write()\` **không tự động xuống dòng** như \`print()\`. Muốn ghi hai dòng tách biệt phải tự chèn kí tự \`\\n\`:
\`\`\`python
with open("ketqua.txt", "w", encoding="utf-8") as f:
    f.write("Dong 1\\n")
    f.write("Dong 2\\n")
\`\`\``,
            },
          ],
          example: {
            title: "Đọc dãy số từ tệp input.txt, tính tổng và ghi ra ketqua.txt",
            code: `# Giả sử tệp input.txt chứa dòng: "12 25 30"
with open("input.txt", "r", encoding="utf-8") as f:
    line = f.readline().strip()
    ds = [int(x) for x in line.split()]

tong = sum(ds)  # 67

with open("ketqua.txt", "w", encoding="utf-8") as f:
    f.write("Tong la: " + str(tong) + "\\n")`,
            language: "python",
            steps: [
              "Mở `input.txt` ở chế độ `'r'` với `with` và `encoding='utf-8'`.",
              "Đọc dòng, bỏ `\\n` bằng `strip()`, tách từ bằng `split()` và ép từng phần tử sang `int()`.",
              "Mở `ketqua.txt` ở chế độ `'w'` và dùng `str(tong)` khi ghi bằng `write()`.",
            ],
            explanation:
              "Kết hợp `with open`, `strip()`, `split()` và ép kiểu `int()`/`str()` là mẫu bài tập xử lí tệp chuẩn trong đề thi.",
          },
          commonMistakes: [
            "Mở tệp đã có dữ liệu ở chế độ `'w'` và tưởng nội dung cũ được giữ lại — `'w'` xóa sạch nội dung cũ ngay khi mở!",
            "Truyền số trực tiếp vào `f.write(123)` mà không đổi sang `str(123)`.",
            "Nhầm `f.read(5)` là đọc 5 dòng (thực tế đọc 5 kí tự đầu tiên).",
            "Khi dùng `with open(...) as f:`, viết thừa `f.close()` ở cuối, hoặc quên truyền `encoding='utf-8'` với tệp tiếng Việt.",
          ],
          note: "Nhớ 3 chữ cái chế độ tệp: 'r' = Read (lỗi nếu thiếu tệp); 'w' = Write (xóa cũ ghi đè); 'a' = Append (ghi nối cuối).",
        },
        {
          id: "l11-4-4",
          title: "Hàm và chương trình con",
          minutes: 30,
          orientation: "CS",
          tags: ["hàm", "return"],
          intro:
            "Khi chương trình ngày càng dài, việc gộp tất cả vào một khối lệnh khiến mã nguồn rối rắm và khó sửa lỗi. Hàm (chương trình con) giúp chia bài toán lớn thành các khối chức năng nhỏ gọn, tái sử dụng nhiều lần. Tuy nhiên, học sinh rất dễ mất điểm ở phần phân biệt `return` với `print()`, tham số mặc định và phạm vi biến cục bộ / toàn cục.",
          objectives: [
            "Định nghĩa và gọi đúng cú pháp hàm bằng từ khóa `def`, kể cả hàm không tham số, hàm có tham số mặc định và hàm trả về nhiều giá trị.",
            "Phân biệt triệt để kết quả in ra màn hình (`print`) với giá trị trả về (`return` / mặc định `None`).",
            "Hiểu quy tắc phạm vi biến: biến cục bộ (local), biến toàn cục (`global`) và cách truyền tham số với kiểu bất biến vs khả biến (như `list`).",
          ],
          bullets: [
            "Hàm được định nghĩa bằng `def ten_ham(...):` trước thời điểm gọi; hàm không có `return` (hoặc `return` trống) trả về `None`.",
            "Các lệnh nằm sau `return` trong cùng nhánh thực thi sẽ KHÔNG được chạy; hàm có thể trả về nhiều giá trị cùng lúc (dạng tuple); tham số mặc định bắt buộc đặt SAU các tham số không mặc định.",
            "Biến tạo trong hàm là biến cục bộ (độc lập giữa các hàm khác nhau); muốn GÁN LẠI giá trị cho biến toàn cục bên trong hàm phải khai báo `global ten_bien`.",
          ],
          sections: [
            {
              title: "Cú pháp định nghĩa Hàm, Tham số mặc định và Lệnh return",
              content: `- **Định nghĩa hàm:** Dùng từ khóa **\`def\`** theo sau là tên hàm và cặp dấu ngoặc tròn \`()\` (kể cả khi hàm không có tham số vẫn bắt buộc viết \`()\`). Hàm phải được định nghĩa **trước** lúc lời gọi hàm được thực thi.
- **Tham số mặc định:** Cho phép bỏ qua đối số khi gọi (VD \`def tinh(a, b=3):\`). **Quy tắc bắt buộc:** Mọi tham số có giá trị mặc định phải đặt **ở phía sau** các tham số không có giá trị mặc định (VD \`def chao(ten, loi='Xin chao'):\` là đúng; \`def chao(loi='Xin chao', ten):\` là sai cú pháp!).
- **Truyền sai số lượng đối số:** Nếu \`def tong(a, b):\` cần 2 đối số mà gọi \`tong(5)\` sẽ báo lỗi **\`TypeError\`**.
- **Tên tham số và đối số:** Tham số hình thức trong \`def\` và biến đối số truyền vào **không cần** đặt trùng tên nhau.

**Lệnh \`return\` vs \`print()\` (CỰC KÌ QUAN TRỌNG):**
- Hàm có \`return gt\`: Trả kết quả về cho nơi gọi để gán vào biến hoặc tính tiếp (VD \`f(f(2))\`). Ngay khi gặp \`return\`, hàm **dừng thực thi ngay lập tức** (mọi lệnh sau \`return\` trong cùng nhánh sẽ bị bỏ qua).
- Hàm chỉ dùng \`print(...)\` mà **không có \`return\`** (hoặc viết \`return\` đứng một mình): Giá trị trả về mặc định là **\`None\`**! Nên \`y = f(5)\` sẽ cho \`y = None\`.
- **Trả về nhiều giá trị:** Python cho phép \`return a // b, a % b\`, thực chất trả về một **bộ (tuple)**.`,
            },
            {
              title: "Phạm vi biến (Local vs Global) và Truyền tham số List",
              content: `- **Biến cục bộ (Local Variable):** Tạo ra bên trong thân hàm, chỉ tồn tại trong lúc hàm đang chạy và **không truy cập được từ bên ngoài**. Hai hàm độc lập hoàn toàn có thể đặt trùng tên biến cục bộ (như biến \`i\`) mà không đụng độ nhau.
- **Biến toàn cục (Global Variable):** Khai báo ở ngoài mọi hàm.
  - Nếu chỉ **đọc** biến toàn cục bên trong hàm (như \`print(k)\`), Python cho phép đọc bình thường.
  - Nếu muốn **gán/sửa đổi** biến toàn cục bên trong hàm, bắt buộc phải khai báo **\`global ten_bien\`** ở đầu hàm; nếu không, Python sẽ coi đó là một biến cục bộ mới cùng tên, khiến biến toàn cục bên ngoài giữ nguyên không đổi! *(Tuy nhiên, tránh lạm dụng \`global\` vì làm mã khó bảo trì).*
- **Lưu ý với tham số là List (khả biến):** Nếu truyền danh sách \`a = [1, 2]\` vào \`def them(ds): ds.append(99)\`, thì \`a\` bên ngoài sẽ đổi thành \`[1, 2, 99]\` vì cùng tham chiếu tới một danh sách.`,
            },
          ],
          example: {
            title: "Phân tích tham số mặc định, hàm lồng nhau và từ khóa global",
            code: `# 1. Tham số mặc định và hàm trả về nhiều giá trị
def hcn(dai, rong=2):
    return (dai + rong) * 2, dai * rong

cv, dt = hcn(5, 3)     # cv = 16, dt = 15
cv2, dt2 = hcn(5)      # dùng rong mặc định = 2 -> cv2 = 14, dt2 = 10

# 2. Hàm lồng nhau f(f(2))
def f(n):
    return n * n + 1

print(f(f(2)))         # f(2) = 5 -> f(5) = 26

# 3. Phân biệt print và return
def in_gap_doi(x):
    print(x * 2)       # Không có return!

y = in_gap_doi(5)      # In ra 10, nhưng y nhận giá trị None!`,
            language: "python",
            steps: [
              "hcn(5) sử dụng giá trị mặc định rong=2 vì không truyền đối số thứ hai.",
              "f(f(2)): Tính bên trong trước f(2) = 2*2+1 = 5, rồi tính f(5) = 5*5+1 = 26.",
              "in_gap_doi(5) chỉ gọi print() chứ không return nên biến y gán bằng None.",
            ],
            explanation:
              "Đây là 3 dạng câu hỏi kinh điển thường gặp nhất trong phần Hàm Python lớp 11.",
          },
          examples: [
            {
              title: "Phân tích tham số mặc định, hàm lồng nhau và từ khóa global",
              code: `def f(n):
    return n * n + 1

print(f(f(2)))   # f(2) = 5 -> f(5) = 26`,
              language: "python",
              explanation:
                "Nhờ có `return`, giá trị của `f(2)` được truyền tiếp làm đầu vào cho lần gọi `f(...)` bên ngoài.",
            },
            {
              title: "Ảnh hưởng của biến cục bộ vs từ khóa global",
              code: `x = 10
def doi_sai():
    x = 50        # Tạo biến cục bộ mới, KHÔNG sửa x toàn cục!

doi_sai()
print(x)          # Vẫn in ra 10

def doi_dung():
    global x
    x = 50        # Sửa trực tiếp biến x toàn cục

doi_dung()
print(x)          # In ra 50`,
              language: "python",
              explanation:
                "Thiếu `global x`, lệnh `x = 50` trong hàm chỉ tạo ra một biến cục bộ tạm thời rồi biến mất sau khi hàm kết thúc.",
            },
          ],
          commonMistakes: [
            "Nhầm lẫn giữa `print(kq)` và `return kq`: nghĩ rằng hàm `print(kq)` có thể gán được giá trị cho biến ngoài hàm (thực tế biến ngoài nhận `None`).",
            "Đặt tham số mặc định đứng TRƯỚC tham số không mặc định trong `def` (gây lỗi `SyntaxError`).",
            "Quên từ khóa `global` khi muốn gán lại biến ngoài hàm, hoặc nghĩ hai hàm khác nhau không được dùng trùng tên biến cục bộ.",
            "Cho rằng một hàm chỉ được phép trả về tối đa 1 giá trị duy nhất.",
          ],
          note: "Nhớ 3 quy tắc vàng về Hàm: Không `return` → trả `None`; Sửa biến ngoài hàm → dùng `global`; Tham số mặc định → đặt ở cuối.",
        },
      ],
    },
  ],
};
