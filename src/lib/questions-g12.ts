import type { PracticeSet } from "./questions";

export const G12_SETS: PracticeSet[] = [
  {
    id: "l12-1-1",
    grade: 12,
    chapterId: "l12-c1",
    title: "Bài 1: Trí tuệ nhân tạo: khái niệm và ứng dụng",
    desc: "Khả năng của AI (học, suy luận, nhận thức), AI hẹp và AI tổng quát.",
    mcq: [
      {
        id: "l12-1-1-m1",
        prompt: "Đặc trưng nào KHÔNG phải là năng lực chính của hệ thống Trí tuệ nhân tạo (AI)?",
        options: [
          "Khả năng học từ dữ liệu",
          "Khả năng suy luận và giải quyết vấn đề",
          "Khả năng hiểu ngôn ngữ và nhận dạng hình ảnh",
          "Khả năng tự ý thức sinh học như cơ thể sống",
        ],
        answer: 3,
        explain: "AI mô phỏng hoạt động trí tuệ (học, suy luận, nhận thức), chưa có ý thức sinh học.",
      },
      {
        id: "l12-1-1-m2",
        prompt: "Hệ thống AI chỉ thực hiện xuất sắc một nhiệm vụ chuyên biệt (như chơi cờ, nhận diện khuôn mặt) gọi là gì?",
        options: ["AI hẹp (Narrow AI)", "Siêu trí tuệ (Super AI)", "AI tổng quát (AGI)", "AI cảm xúc"],
        answer: 0,
        explain: "Hầu hết các ứng dụng AI thực tế hiện nay thuộc nhóm AI hẹp.",
      },
      {
        id: "l12-1-1-m3",
        prompt: "Ứng dụng nào sau đây sử dụng công nghệ Xử lí ngôn ngữ tự nhiên (NLP) của AI?",
        options: [
          "Trợ lí ảo giao tiếp bằng giọng nói và dịch thuật tự động",
          "Cầu dao điện cơ học",
          "Quạt máy thông thường",
          "Máy in kim đơn sắc",
        ],
        answer: 0,
        explain: "Trợ lí ảo, chatbot và dịch máy là ứng dụng điển hình của NLP.",
      },
    ],
    truefalse: [
      {
        id: "l12-1-1-t1",
        prompt: "Đánh giá các nhận định sau về Trí tuệ nhân tạo:",
        statements: [
          { text: "AI tạo sinh (Generative AI) có khả năng tạo ra văn bản, hình ảnh hoặc mã nguồn mới.", answer: true },
          { text: "Mọi hệ thống AI hiện nay đều là AI tổng quát vượt xa trí tuệ con người trên mọi lĩnh vực.", answer: false },
          { text: "Thị giác máy tính (Computer Vision) giúp AI phân tích ảnh chụp X-quang hỗ trợ bác sĩ.", answer: true },
        ],
        explain: "AI tổng quát (AGI) vẫn đang trong giai đoạn nghiên cứu.",
      },
      {
        id: "l12-1-1-t2",
        prompt: "Đánh giá các nhận định sau về ứng dụng AI trong đời sống:",
        statements: [
          { text: "Hệ thống gợi ý phim hoặc bài giảng phù hợp sở thích cá nhân ứng dụng AI.", answer: true },
          { text: "Xe tự lái kết hợp cảm biến và AI để nhận biết vật cản, biển báo.", answer: true },
          { text: "AI hoàn toàn miễn nhiễm với sai sót nên không cần con người kiểm tra lại.", answer: false },
        ],
        explain: "AI vẫn có thể nhầm lẫn (ảo giác hoặc nhận diện sai) nên cần con người giám sát.",
      },
    ],
    short: [
      {
        id: "l12-1-1-s1",
        prompt: "Loại AI được thiết kế để hoàn thành tốt một nhiệm vụ cụ thể gọi là AI gì?",
        answers: ["ai hẹp", "narrow ai", "hẹp"],
        explain: "Đó là AI hẹp (Narrow AI / Weak AI).",
      },
      {
        id: "l12-1-1-s2",
        prompt: "Nêu 2 ứng dụng thực tế của AI trong lĩnh vực giáo dục hoặc y tế.",
        answers: ["chẩn đoán", "học tập", "gợi ý", "dịch"],
        explain: "Giáo dục: trợ lí giải thích bài tập, cá nhân hóa lộ trình học. Y tế: hỗ trợ đọc ảnh chụp X-quang/MRI, phát hiện sớm bệnh.",
      },
    ],
  },
  {
    id: "l12-1-2",
    grade: 12,
    chapterId: "l12-c1",
    title: "Bài 2: Học máy và dữ liệu huấn luyện",
    desc: "Phân biệt lập trình truyền thống với Học máy, học có giám sát/không giám sát/tăng cường.",
    mcq: [
      {
        id: "l12-1-2-m1",
        prompt: "Điểm khác biệt cốt lõi giữa Học máy (Machine Learning) và lập trình truyền thống là gì?",
        options: [
          "Học máy tự rút ra quy luật/mô hình từ dữ liệu thay vì phải lập trình cứng từng quy tắc",
          "Học máy không cần dữ liệu đầu vào",
          "Lập trình truyền thống luôn tự học từ ảnh",
          "Học máy không dùng máy tính",
        ],
        answer: 0,
        explain: "Lập trình truyền thống: Quy tắc + Dữ liệu => Kết quả. Học máy: Dữ liệu + Kết quả => Quy tắc (Mô hình).",
      },
      {
        id: "l12-1-2-m2",
        prompt: "Bài toán phân loại email thành 'Thư rác' và 'Thư thường' dựa trên tập dữ liệu đã gắn nhãn sẵn thuộc loại học nào?",
        options: [
          "Học không giám sát (Unsupervised Learning)",
          "Học có giám sát (Supervised Learning)",
          "Học ngẫu nhiên",
          "Không phải học máy",
        ],
        answer: 1,
        explain: "Học có giám sát sử dụng tập dữ liệu huấn luyện đã được gắn nhãn kết quả.",
      },
      {
        id: "l12-1-2-m3",
        prompt: "Điều gì xảy ra nếu dữ liệu huấn luyện mô hình AI bị thiên lệch (Bias) hoặc thiếu đa dạng?",
        options: [
          "Mô hình dự đoán sẽ chính xác hơn",
          "Mô hình sẽ đưa ra kết quả thiên lệch, thiếu công bằng",
          "Máy tính chạy nhanh gấp đôi",
          "Không ảnh hưởng gì đến kết quả",
        ],
        answer: 1,
        explain: "Chất lượng và sự cân bằng của dữ liệu huấn luyện quyết định độ tin cậy của mô hình.",
      },
    ],
    truefalse: [
      {
        id: "l12-1-2-t1",
        prompt: "Đánh giá các nhận định sau về các hướng Học máy:",
        statements: [
          { text: "Học không giám sát tìm cấu trúc ẩn hoặc gom cụm trên dữ liệu chưa gán nhãn.", answer: true },
          { text: "Học tăng cường (Reinforcement Learning) học thông qua cơ chế thử-sai và phần thưởng/phạt.", answer: true },
          { text: "Mô hình học máy chỉ cần 1 mẫu dữ liệu duy nhất là đạt độ chính xác 100%.", answer: false },
        ],
        explain: "Học máy cần tập dữ liệu đủ lớn, sạch và đại diện cho thực tế.",
      },
      {
        id: "l12-1-2-t2",
        prompt: "Đánh giá các nhận định sau về dữ liệu huấn luyện:",
        statements: [
          { text: "Thường chia dữ liệu thành tập huấn luyện (Training) và tập kiểm thử (Test).", answer: true },
          { text: "Dữ liệu nhiễu, sai nhãn không ảnh hưởng đến chất lượng mô hình.", answer: false },
          { text: "Học máy là nhánh quan trọng nhất thúc đẩy sự bùng nổ của AI hiện đại.", answer: true },
        ],
        explain: "Dữ liệu nhiễu, sai nhãn sẽ làm mô hình học sai quy luật.",
      },
    ],
    short: [
      {
        id: "l12-1-2-s1",
        prompt: "Hướng học máy sử dụng dữ liệu đã gán nhãn để huấn luyện mô hình gọi là gì?",
        answers: ["học có giám sát", "supervised learning"],
        explain: "Đó là Học có giám sát (Supervised Learning).",
      },
      {
        id: "l12-1-2-s2",
        prompt: "Tại sao cần tách riêng Tập kiểm thử (Test set) khỏi Tập huấn luyện (Train set)?",
        answers: ["đánh giá", "khách quan", "tổng quát", "học vẹt"],
        explain: "Để đánh giá khách quan khả năng dự đoán của mô hình trên dữ liệu mới chưa từng thấy, tránh tình trạng mô hình chỉ 'học vẹt' dữ liệu cũ.",
      },
    ],
  },
  {
    id: "l12-1-3",
    grade: 12,
    chapterId: "l12-c1",
    title: "Bài 3: Ứng dụng AI và đạo đức AI",
    desc: "Cơ hội, rủi ro (Deepfake, quyền riêng tư, việc làm) và nguyên tắc AI có trách nhiệm.",
    mcq: [
      {
        id: "l12-1-3-m1",
        prompt: "Rủi ro nghiêm trọng nào gắn liền với công nghệ Deepfake?",
        options: [
          "Tạo video/giọng nói giả mạo người thật để lừa đảo và phát tán tin giả",
          "Làm tăng tốc độ gõ phím",
          "Giảm dung lượng pin",
          "Xóa lịch sử trình duyệt",
        ],
        answer: 0,
        explain: "Deepfake có thể mạo danh lãnh đạo, người thân để lừa đảo tài chính hoặc bôi nhọ danh dự.",
      },
      {
        id: "l12-1-3-m2",
        prompt: "Trong các hệ thống ra quyết định quan trọng (y tế, pháp luật), ai là người chịu trách nhiệm cuối cùng?",
        options: [
          "Con người (chuyên gia, tổ chức vận hành)",
          "Chỉ riêng phần mềm AI",
          "Cáp quang truyền dữ liệu",
          "Không ai chịu trách nhiệm",
        ],
        answer: 0,
        explain: "Nguyên tắc đạo đức AI quy định con người giữ quyền kiểm soát và trách nhiệm cuối cùng.",
      },
      {
        id: "l12-1-3-m3",
        prompt: "Khi sử dụng AI tạo sinh để hỗ trợ học tập, cách làm nào là đúng đắn?",
        options: [
          "Nhờ AI gợi ý hướng giải, giải thích khái niệm rồi tự kiểm chứng và hoàn thiện bài",
          "Sao chép nguyên văn câu trả lời của AI mà không đọc lại",
          "Tin tuyệt đối mọi thông tin AI đưa ra",
          "Dùng AI làm bài kiểm tra gian lận",
        ],
        answer: 0,
        explain: "AI là công cụ trợ giảng hữu ích nhưng học sinh cần tự tư duy và kiểm chứng thông tin.",
      },
    ],
    truefalse: [
      {
        id: "l12-1-3-t1",
        prompt: "Đánh giá các nhận định sau về đạo đức và an toàn AI:",
        statements: [
          { text: "AI cần đảm bảo tính minh bạch, công bằng và tôn trọng quyền riêng tư dữ liệu.", answer: true },
          { text: "Đưa dữ liệu nhạy cảm cá nhân lên chatbot công khai không có rủi ro rò rỉ thông tin.", answer: false },
          { text: "Sự phát triển của AI đòi hỏi người lao động phải học kỹ năng mới để thích ứng.", answer: true },
        ],
        explain: "Dữ liệu nhập vào chatbot công khai có thể được lưu trữ hoặc dùng để huấn luyện lại.",
      },
      {
        id: "l12-1-3-t2",
        prompt: "Đánh giá các nhận định sau về kiểm soát AI:",
        statements: [
          { text: "Các sản phẩm do AI tạo nên được đánh dấu rõ nguồn gốc để tránh gây nhầm lẫn.", answer: true },
          { text: "Chủ nghĩa nhân văn yêu cầu AI phục vụ lợi ích con người và không gây hại.", answer: true },
          { text: "Mọi quốc gia đều khuyến khích dùng AI tạo tin giả.", answer: false },
        ],
        explain: "Pháp luật nghiêm cấm hành vi sử dụng AI tạo tin giả và lừa đảo.",
      },
    ],
    short: [
      {
        id: "l12-1-3-s1",
        prompt: "Công nghệ dùng AI tạo hình ảnh/video/âm thanh giả mạo khuôn mặt và giọng nói người thật gọi là gì?",
        answers: ["deepfake"],
        explain: "Đó là Deepfake.",
      },
      {
        id: "l12-1-3-s2",
        prompt: "Nêu 2 nguyên tắc đạo đức quan trọng khi phát triển và sử dụng AI.",
        answers: ["minh bạch", "công bằng", "riêng tư", "con người"],
        explain: "Minh bạch, công bằng không thiên lệch, tôn trọng quyền riêng tư dữ liệu và bảo đảm con người chịu trách nhiệm cuối cùng.",
      },
    ],
  },
  {
    id: "l12-2-1",
    grade: 12,
    chapterId: "l12-c2",
    title: "Bài 4: Giao thức mạng và mô hình TCP/IP",
    desc: "4 tầng TCP/IP, so sánh TCP vs UDP và các cổng HTTP (80), HTTPS (443).",
    mcq: [
      {
        id: "l12-2-1-m1",
        prompt: "Mô hình TCP/IP gồm mấy tầng?",
        options: ["2 tầng", "4 tầng", "7 tầng", "10 tầng"],
        answer: 1,
        explain: "TCP/IP gồm 4 tầng: Ứng dụng, Giao vận, Liên mạng (Internet), Truy cập mạng.",
      },
      {
        id: "l12-2-1-m2",
        prompt: "So với UDP, giao thức TCP có ưu điểm gì?",
        options: [
          "Đảm bảo gói tin đến đích đầy đủ, đúng thứ tự và có kiểm soát lỗi",
          "Không cần thiết lập kết nối trước khi truyền",
          "Luôn bỏ qua gói tin bị mất",
          "Chỉ truyền được âm thanh",
        ],
        answer: 0,
        explain: "TCP hướng kết nối và tin cậy; UDP nhanh, độ trễ thấp, phù hợp livestream/game.",
      },
      {
        id: "l12-2-1-m3",
        prompt: "Cổng mặc định của giao thức HTTP và HTTPS lần lượt là bao nhiêu?",
        options: ["21 và 22", "80 và 443", "25 và 110", "53 và 8080"],
        answer: 1,
        explain: "HTTP sử dụng cổng 80; HTTPS sử dụng cổng 443.",
      },
    ],
    truefalse: [
      {
        id: "l12-2-1-t1",
        prompt: "Đánh giá các nhận định sau về mô hình TCP/IP:",
        statements: [
          { text: "Giao thức IP nằm ở tầng Liên mạng, làm nhiệm vụ đánh địa chỉ và định tuyến gói tin.", answer: true },
          { text: "HTTP và DNS là các giao thức thuộc tầng Truy cập mạng vật lí.", answer: false },
          { text: "UDP phù hợp với cuộc gọi video trực tiếp cần độ trễ thấp.", answer: true },
        ],
        explain: "HTTP, DNS, SMTP nằm ở tầng Ứng dụng (Application Layer).",
      },
      {
        id: "l12-2-1-t2",
        prompt: "Đánh giá các nhận định sau về giao thức bảo mật:",
        statements: [
          { text: "HTTPS sử dụng chứng chỉ SSL/TLS để mã hóa đường truyền web.", answer: true },
          { text: "Địa chỉ IPv4 có độ dài 32 bit, IPv6 có độ dài 128 bit.", answer: true },
          { text: "Giao thức TCP không thể truyền tải tệp tin văn bản.", answer: false },
        ],
        explain: "TCP được dùng cho hầu hết các tác vụ truyền tệp, tải trang web và gửi email.",
      },
    ],
    short: [
      {
        id: "l12-2-1-s1",
        prompt: "Số hiệu cổng mặc định của giao thức bảo mật HTTPS là bao nhiêu?",
        answers: ["443"],
        explain: "Cổng 443.",
      },
      {
        id: "l12-2-1-s2",
        prompt: "Kể tên 4 tầng của mô hình TCP/IP theo thứ tự từ trên xuống dưới.",
        answers: ["ứng dụng", "giao vận", "liên mạng", "truy cập"],
        explain: "1. Tầng Ứng dụng; 2. Tầng Giao vận; 3. Tầng Liên mạng (Internet); 4. Tầng Truy cập mạng.",
      },
    ],
  },
  {
    id: "l12-2-2",
    grade: 12,
    chapterId: "l12-c2",
    title: "Bài 5: An ninh mạng và mã hoá dữ liệu",
    desc: "Mã hóa đối xứng, bất đối xứng, chữ kí số, VPN và tường lửa.",
    mcq: [
      {
        id: "l12-2-2-m1",
        prompt: "Đặc điểm của mã hóa bất đối xứng (Asymmetric Encryption) là gì?",
        options: [
          "Dùng một cặp khóa gồm Khóa công khai (Public Key) và Khóa bí mật (Private Key)",
          "Dùng chung duy nhất một khóa để cả mã hóa và giải mã",
          "Không cần dùng khóa",
          "Chỉ mã hóa được số nguyên",
        ],
        answer: 0,
        explain: "Mã hóa đối xứng dùng 1 khóa chung; bất đối xứng dùng cặp khóa Public/Private.",
      },
      {
        id: "l12-2-2-m2",
        prompt: "Khi tạo chữ kí số (Digital Signature) cho văn bản điện tử, người gửi dùng khóa nào để kí?",
        options: [
          "Khóa bí mật (Private Key) của chính người gửi",
          "Khóa công khai của người lạ",
          "Mật khẩu Wi-Fi",
          "Địa chỉ IP",
        ],
        answer: 0,
        explain: "Người gửi dùng Khóa bí mật của mình để kí; người nhận dùng Khóa công khai của người gửi để xác minh.",
      },
      {
        id: "l12-2-2-m3",
        prompt: "Mạng riêng ảo (VPN) giúp ích gì khi kết nối từ xa?",
        options: [
          "Tạo đường hầm mã hóa dữ liệu truyền qua Internet công cộng",
          "Làm tăng độ phân giải màn hình",
          "Xóa hết file trong ổ C",
          "Ngắt kết nối với máy chủ",
        ],
        answer: 0,
        explain: "VPN bảo vệ tính riêng tư và toàn vẹn dữ liệu khi truy cập từ mạng công cộng.",
      },
    ],
    truefalse: [
      {
        id: "l12-2-2-t1",
        prompt: "Đánh giá các nhận định sau về mã hóa và chữ kí số:",
        statements: [
          { text: "Chữ kí số giúp xác thực danh tính người gửi và chứng minh tài liệu không bị sửa đổi.", answer: true },
          { text: "Khóa bí mật (Private Key) cần được chia sẻ công khai cho mọi người trên mạng.", answer: false },
          { text: "Mã hóa dữ liệu giúp kẻ nghe lén không đọc được nội dung gốc ngay cả khi bắt được gói tin.", answer: true },
        ],
        explain: "Private Key phải được giữ bí mật tuyệt đối bởi chủ sở hữu.",
      },
      {
        id: "l12-2-2-t2",
        prompt: "Đánh giá các nhận định sau về phòng vệ mạng:",
        statements: [
          { text: "Hệ thống phát hiện xâm nhập (IDS) cảnh báo khi có lưu lượng bất thường.", answer: true },
          { text: "Phân quyền tối thiểu (Least Privilege) giúp hạn chế thiệt hại nếu một tài khoản bị lộ.", answer: true },
          { text: "Tường lửa có thể thay thế hoàn toàn ý thức bảo mật của người dùng.", answer: false },
        ],
        explain: "Con người vẫn là mắt xích quan trọng nhất trong an ninh mạng.",
      },
    ],
    short: [
      {
        id: "l12-2-2-s1",
        prompt: "Mạng riêng ảo tạo đường hầm mã hóa qua Internet viết tắt là gì?",
        answers: ["vpn"],
        explain: "VPN (Virtual Private Network).",
      },
      {
        id: "l12-2-2-s2",
        prompt: "Giải thích vai trò của Khóa công khai và Khóa bí mật trong chữ kí số.",
        answers: ["bí mật", "công khai", "kí", "kiểm tra"],
        explain: "Người gửi dùng Khóa bí mật (Private Key) để kí vào văn bản; người nhận dùng Khóa công khai (Public Key) của người gửi để kiểm tra tính xác thực và toàn vẹn.",
      },
    ],
  },
  {
    id: "l12-3-1",
    grade: 12,
    chapterId: "l12-c3",
    title: "Bài 6: Khái niệm cơ sở dữ liệu và hệ QTCSDL",
    desc: "Phân biệt CSDL và Hệ QTCSDL (DBMS), ưu điểm tổ chức dữ liệu, tính nhất quán.",
    mcq: [
      {
        id: "l12-3-1-m1",
        prompt: "Sự khác nhau giữa Cơ sở dữ liệu (CSDL) và Hệ quản trị CSDL (QTCSDL) là gì?",
        options: [
          "CSDL là tập hợp dữ liệu có tổ chức; Hệ QTCSDL là phần mềm giúp tạo lập, cập nhật và khai thác CSDL",
          "Hai khái niệm là một phần mềm duy nhất",
          "CSDL là phần mềm, Hệ QTCSDL là phần cứng",
          "Hệ QTCSDL chỉ là file văn bản Word",
        ],
        answer: 0,
        explain: "Ví dụ: Dữ liệu học sinh là CSDL; phần mềm MySQL/PostgreSQL/SQLite là Hệ QTCSDL.",
      },
      {
        id: "l12-3-1-m2",
        prompt: "Ưu điểm nào đạt được khi quản lí dữ liệu bằng Hệ QTCSDL thay vì các tệp rời rạc?",
        options: [
          "Giảm trùng lặp dữ liệu, đảm bảo tính nhất quán và kiểm soát truy cập đồng thời",
          "Tạo ra nhiều bản sao mâu thuẫn nhau hơn",
          "Không thể tìm kiếm dữ liệu",
          "Mất dữ liệu mỗi khi đóng máy",
        ],
        answer: 0,
        explain: "Hệ QTCSDL chuẩn hóa lưu trữ tập trung, tránh dư thừa và xung đột dữ liệu.",
      },
      {
        id: "l12-3-1-m3",
        prompt: "Phần mềm nào sau đây là Hệ quản trị CSDL quan hệ phổ biến?",
        options: ["MySQL, SQL Server, PostgreSQL", "Paint, Notepad", "WinRAR, VLC", "Chrome, Edge"],
        answer: 0,
        explain: "MySQL, PostgreSQL, SQL Server, Oracle, SQLite là các hệ QTCSDL quan hệ.",
      },
    ],
    truefalse: [
      {
        id: "l12-3-1-t1",
        prompt: "Đánh giá các nhận định sau về CSDL và Hệ QTCSDL:",
        statements: [
          { text: "Hệ QTCSDL cung cấp cơ chế phân quyền để người dùng chỉ xem/sửa dữ liệu trong phạm vi cho phép.", answer: true },
          { text: "Khi dùng Hệ QTCSDL, dữ liệu phụ thuộc hoàn toàn vào một ngôn ngữ lập trình duy nhất.", answer: false },
          { text: "Sao lưu và phục hồi là chức năng bảo vệ an toàn của Hệ QTCSDL.", answer: true },
        ],
        explain: "Tính độc lập dữ liệu cho phép nhiều ứng dụng khác nhau cùng truy cập CSDL.",
      },
      {
        id: "l12-3-1-t2",
        prompt: "Đánh giá các nhận định sau về kiến trúc CSDL:",
        statements: [
          { text: "Khung nhìn (View) giúp che giấu bớt thông tin nhạy cảm với từng nhóm người dùng.", answer: true },
          { text: "Việc lưu cùng một địa chỉ khách hàng ở 5 tệp khác nhau giúp dễ cập nhật nhất quán.", answer: false },
          { text: "SQLite là hệ QTCSDL gọn nhẹ lưu trữ trong một tệp duy nhất.", answer: true },
        ],
        explain: "Lưu trùng lặp ở nhiều nơi dễ gây sai lệch dữ liệu khi chỉ cập nhật một chỗ.",
      },
    ],
    short: [
      {
        id: "l12-3-1-s1",
        prompt: "Tên viết tắt tiếng Anh của Hệ quản trị cơ sở dữ liệu là gì?",
        answers: ["dbms", "rdbms"],
        explain: "DBMS (Database Management System).",
      },
      {
        id: "l12-3-1-s2",
        prompt: "Nêu 2 lợi ích của việc dùng Hệ QTCSDL so với lưu trữ bằng nhiều file Excel rời rạc.",
        answers: ["trùng lặp", "nhất quán", "phân quyền", "truy vấn"],
        explain: "Giảm trùng lặp dư thừa, đảm bảo nhất quán dữ liệu, phân quyền bảo mật chặt chẽ và truy vấn đồng thời nhanh chóng.",
      },
    ],
  },
  {
    id: "l12-3-2",
    grade: 12,
    chapterId: "l12-c3",
    title: "Bài 7: Mô hình quan hệ và khoá",
    desc: "Bảng, bản ghi, thuộc tính, Khóa chính (Primary Key), Khóa ngoại (Foreign Key) và toàn vẹn.",
    mcq: [
      {
        id: "l12-3-2-m1",
        prompt: "Quy tắc bắt buộc đối với Khóa chính (Primary Key) của một bảng là gì?",
        options: [
          "Giá trị duy nhất cho từng bản ghi và KHÔNG được nhận giá trị NULL",
          "Có thể trùng nhau giữa hai học sinh",
          "Luôn luôn là cột Họ và tên",
          "Được phép để trống NULL",
        ],
        answer: 0,
        explain: "Tính toàn vẹn thực thể yêu cầu Khóa chính là duy nhất và NOT NULL.",
      },
      {
        id: "l12-3-2-m2",
        prompt: "Vai trò của Khóa ngoại (Foreign Key) trong CSDL quan hệ là gì?",
        options: [
          "Liên kết giữa hai bảng và bảo đảm tính toàn vẹn tham chiếu",
          "Tăng cỡ chữ hiển thị",
          "Tự động sắp xếp bảng theo vần A-Z",
          "Mã hóa tệp tin",
        ],
        answer: 0,
        explain: "Khóa ngoại ở bảng con tham chiếu đến Khóa chính của bảng cha.",
      },
      {
        id: "l12-3-2-m3",
        prompt: "Trong bảng `MuonSach(MaPhieu, MaHS, MaSach, NgayMuon)` liên kết với `HocSinh(MaHS, HoTen)`, cột nào là khóa ngoại?",
        options: ["NgayMuon", "HoTen", "MaHS trong bảng MuonSach", "Không có khóa ngoại"],
        answer: 2,
        explain: "MaHS trong MuonSach tham chiếu đến MaHS (khóa chính) của bảng HocSinh.",
      },
    ],
    truefalse: [
      {
        id: "l12-3-2-t1",
        prompt: "Đánh giá các nhận định sau về mô hình quan hệ:",
        statements: [
          { text: "Mỗi hàng trong bảng được gọi là một bản ghi (Record / Tuple).", answer: true },
          { text: "Mỗi cột trong bảng được gọi là một trường hoặc thuộc tính (Field / Attribute).", answer: true },
          { text: "Ta có thể thêm bản ghi ở bảng con chứa mã khóa ngoại chưa tồn tại ở bảng cha.", answer: false },
        ],
        explain: "Ràng buộc toàn vẹn tham chiếu ngăn chặn việc thêm giá trị khóa ngoại không tồn tại ở bảng cha.",
      },
      {
        id: "l12-3-2-t2",
        prompt: "Đánh giá các nhận định sau về thiết kế khóa:",
        statements: [
          { text: "Một khóa chính có thể được tạo thành từ tổ hợp nhiều cột (Khóa tổ hợp).", answer: true },
          { text: "Nên chọn cột `HoTen` làm khóa chính của bảng Học sinh toàn trường.", answer: false },
          { text: "Trong quan hệ 1-N, khóa ngoại được đặt ở bảng phía N (nhiều).", answer: true },
        ],
        explain: "Họ tên dễ trùng nhau giữa nhiều học sinh, nên dùng `MaHS` hoặc `CCCD` làm khóa chính.",
      },
    ],
    short: [
      {
        id: "l12-3-2-s1",
        prompt: "Cột dùng để liên kết tham chiếu đến khóa chính của bảng khác gọi là gì?",
        answers: ["khóa ngoại", "khoá ngoại", "foreign key"],
        explain: "Đó là Khóa ngoại (Foreign Key).",
      },
      {
        id: "l12-3-2-s2",
        prompt: "Giải thích vì sao không nên dùng cột `HoTen` làm Khóa chính cho bảng `HocSinh`.",
        answers: ["trùng", "duy nhất"],
        explain: "Vì hai học sinh khác nhau có thể trùng họ và tên, vi phạm tính chất duy nhất của Khóa chính.",
      },
    ],
  },
  {
    id: "l12-3-3",
    grade: 12,
    chapterId: "l12-c3",
    title: "Bài 8: Truy vấn dữ liệu với SQL",
    desc: "SELECT, WHERE, ORDER BY, INNER JOIN, GROUP BY, HAVING và các hàm gộp.",
    mcq: [
      {
        id: "l12-3-3-m1",
        prompt: "Thứ tự đúng của các mệnh đề trong một câu lệnh truy vấn SQL chuẩn là gì?",
        options: [
          "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
          "FROM → SELECT → WHERE → ORDER BY → GROUP BY",
          "SELECT → WHERE → FROM → HAVING → GROUP BY",
          "ORDER BY → SELECT → FROM → WHERE",
        ],
        answer: 0,
        explain: "Cú pháp viết chuẩn: SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ...",
      },
      {
        id: "l12-3-3-m2",
        prompt: "Sự khác nhau giữa `WHERE` và `HAVING` trong SQL là gì?",
        options: [
          "WHERE lọc từng dòng trước khi gom nhóm; HAVING lọc các nhóm sau khi đã GROUP BY",
          "WHERE dùng cho số, HAVING dùng cho chữ",
          "Hai từ khóa thay thế hoàn toàn cho nhau trong mọi trường hợp",
          "HAVING luôn chạy trước FROM",
        ],
        answer: 0,
        explain: "Các hàm tổng hợp (COUNT, SUM, AVG) chỉ được đặt ở HAVING, không đặt trong WHERE.",
      },
      {
        id: "l12-3-3-m3",
        prompt: "Để sắp xếp danh sách theo cột `DiemTB` giảm dần, dùng mệnh đề nào?",
        options: ["ORDER BY DiemTB ASC", "ORDER BY DiemTB DESC", "GROUP BY DiemTB DESC", "SORT DiemTB DOWN"],
        answer: 1,
        explain: "DESC (Descending) là giảm dần; ASC (Ascending) là tăng dần.",
      },
    ],
    truefalse: [
      {
        id: "l12-3-3-t1",
        prompt: "Cho bảng `HocSinh(MaHS, HoTen, Lop, DiemTB)`. Đánh giá các câu lệnh SQL:",
        statements: [
          { text: "`SELECT HoTen, DiemTB FROM HocSinh WHERE Lop = '12A1';` lấy tên và điểm của học sinh lớp 12A1.", answer: true },
          { text: "`SELECT Lop, COUNT(*) FROM HocSinh WHERE COUNT(*) > 30 GROUP BY Lop;` hợp lệ về cú pháp.", answer: false },
          { text: "Lệnh `INNER JOIN` ghép nối các dòng khớp nhau từ hai bảng theo điều kiện `ON`.", answer: true },
        ],
        explain: "Điều kiện `COUNT(*) > 30` phải đặt sau `HAVING`, không được đặt ở `WHERE`.",
      },
      {
        id: "l12-3-3-t2",
        prompt: "Đánh giá các nhận định sau về các lệnh SQL:",
        statements: [
          { text: "`INSERT INTO`, `UPDATE`, `DELETE` là các câu lệnh thao tác thay đổi dữ liệu.", answer: true },
          { text: "Hàm `AVG(Diem)` dùng để tính tổng các giá trị điểm.", answer: false },
          { text: "Dấu `*` trong `SELECT *` có nghĩa là lấy tất cả các cột của bảng.", answer: true },
        ],
        explain: "AVG() tính giá trị trung bình (Average); SUM() mới tính tổng.",
      },
    ],
    short: [
      {
        id: "l12-3-3-s1",
        prompt: "Từ khóa SQL dùng để gom các bản ghi có cùng giá trị vào một nhóm là gì?",
        answers: ["group by"],
        explain: "Mệnh đề GROUP BY.",
      },
      {
        id: "l12-3-3-s2",
        prompt: "Viết câu lệnh SQL lấy `HoTen` và `DiemTB` từ bảng `HocSinh` với điều kiện `DiemTB >= 8.0`, sắp xếp giảm dần theo `DiemTB`.",
        answers: ["select", "from hocsinh", "where diemtb >= 8", "order by diemtb desc"],
        explain: "SELECT HoTen, DiemTB FROM HocSinh WHERE DiemTB >= 8.0 ORDER BY DiemTB DESC;",
      },
    ],
  },
  {
    id: "l12-4-1",
    grade: 12,
    chapterId: "l12-c4",
    title: "Bài 9: Thuật toán tìm kiếm",
    desc: "Tìm kiếm tuần tự O(n) và tìm kiếm nhị phân O(log n) từng bước.",
    mcq: [
      {
        id: "l12-4-1-m1",
        prompt: "Điều kiện tiên quyết để áp dụng được Thuật toán tìm kiếm nhị phân là gì?",
        options: [
          "Danh sách đã được sắp xếp theo thứ tự (tăng dần hoặc giảm dần)",
          "Danh sách chỉ toàn số lẻ",
          "Danh sách có độ dài là số nguyên tố",
          "Danh sách chưa sắp xếp",
        ],
        answer: 0,
        explain: "Tìm kiếm nhị phân dựa vào việc so sánh với phần tử giữa để loại bỏ một nửa danh sách, nên bắt buộc phải sắp xếp trước.",
      },
      {
        id: "l12-4-1-m2",
        prompt: "Cho dãy `a = [2, 5, 8, 12, 16, 23, 38]`. Khi tìm `x = 23` bằng tìm kiếm nhị phân, ở bước 1 `mid` và `a[mid]` bằng mấy?",
        options: ["mid = 3, a[mid] = 12", "mid = 4, a[mid] = 16", "mid = 2, a[mid] = 8", "mid = 5, a[mid] = 23"],
        answer: 0,
        explain: "left = 0, right = 6 -> mid = (0 + 6)//2 = 3, nên a[3] = 12.",
      },
      {
        id: "l12-4-1-m3",
        prompt: "Khi dãy chưa được sắp xếp và chỉ tìm kiếm một lần duy nhất, thuật toán nào phù hợp?",
        options: ["Tìm kiếm tuần tự", "Tìm kiếm nhị phân", "Sắp xếp nổi bọt rồi nhị phân", "Không tìm được"],
        answer: 0,
        explain: "Tìm kiếm tuần tự chạy trên dãy bất kì với chi phí O(n), nhanh hơn việc sắp xếp rồi mới tìm.",
      },
    ],
    truefalse: [
      {
        id: "l12-4-1-t1",
        prompt: "Đánh giá các nhận định sau về tìm kiếm nhị phân và tuần tự:",
        statements: [
          { text: "Tìm kiếm nhị phân có độ phức tạp trường hợp xấu nhất là O(log n).", answer: true },
          { text: "Với 1.000.000 phần tử đã sắp xếp, tìm kiếm nhị phân cần tối đa khoảng 20 bước so sánh.", answer: true },
          { text: "Tìm kiếm tuần tự luôn nhanh hơn tìm kiếm nhị phân trên mảng lớn đã sắp xếp.", answer: false },
        ],
        explain: "2^20 = 1.048.576 nên tìm kiếm nhị phân chỉ cần ~20 bước so với 1.000.000 bước của tuần tự.",
      },
      {
        id: "l12-4-1-t2",
        prompt: "Đánh giá các bước trong tìm kiếm nhị phân tăng dần (left, right):",
        statements: [
          { text: "Nếu `a[mid] < x` thì ta cập nhật `left = mid + 1`.", answer: true },
          { text: "Nếu `a[mid] > x` thì ta cập nhật `right = mid - 1`.", answer: true },
          { text: "Điều kiện dừng vòng lặp khi không tìm thấy là `left <= right` vẫn còn đúng.", answer: false },
        ],
        explain: "Vòng lặp dừng khi `left > right` (tức khoảng tìm kiếm đã rỗng).",
      },
    ],
    short: [
      {
        id: "l12-4-1-s1",
        prompt: "Với mảng đã sắp xếp gồm 32 phần tử, tìm kiếm nhị phân thực hiện tối đa khoảng bao nhiêu lần so sánh (log₂32)?",
        answers: ["5", "6"],
        explain: "log₂(32) = 5 (hoặc tối đa 5–6 bước tùy quy ước đếm bước cuối).",
      },
      {
        id: "l12-4-1-s2",
        prompt: "Mô tả ngắn gọn ý tưởng thuật toán tìm kiếm nhị phân trên dãy tăng dần.",
        answers: ["giữa", "nửa", "mid"],
        explain: "So sánh giá trị cần tìm x với phần tử ở giữa (mid): nếu bằng thì trả về vị trí; nếu x lớn hơn thì tìm tiếp ở nửa phải, ngược lại tìm ở nửa trái.",
      },
    ],
  },
  {
    id: "l12-4-2",
    grade: 12,
    chapterId: "l12-c4",
    title: "Bài 10: Thuật toán sắp xếp",
    desc: "Sắp xếp nổi bọt, chèn, chọn O(n²) và sắp xếp nhanh/trộn O(n log n).",
    mcq: [
      {
        id: "l12-4-2-m1",
        prompt: "Thuật toán nào liên tục so sánh các cặp phần tử kề nhau và hoán đổi nếu sai thứ tự?",
        options: [
          "Sắp xếp nổi bọt (Bubble Sort)",
          "Sắp xếp trộn (Merge Sort)",
          "Sắp xếp nhanh (Quick Sort)",
          "Tìm kiếm nhị phân",
        ],
        answer: 0,
        explain: "Bubble Sort đưa dần phần tử lớn nhất về cuối dãy qua việc hoán đổi cặp kề nhau.",
      },
      {
        id: "l12-4-2-m2",
        prompt: "Nhóm thuật toán sắp xếp nào có độ phức tạp trung bình O(n log n)?",
        options: [
          "Bubble Sort, Insertion Sort",
          "Quick Sort, Merge Sort",
          "Selection Sort, Bubble Sort",
          "Linear Search",
        ],
        answer: 1,
        explain: "Quick Sort và Merge Sort dùng chiến lược chia để trị đạt độ phức tạp O(n log n).",
      },
      {
        id: "l12-4-2-m3",
        prompt: "Thế nào là một thuật toán sắp xếp ổn định (Stable Sort)?",
        options: [
          "Giữ nguyên thứ tự tương đối ban đầu của các phần tử có khóa bằng nhau",
          "Luôn chạy trong 1 giây bất kể dữ liệu",
          "Không dùng phép so sánh",
          "Chỉ sắp xếp được số âm",
        ],
        answer: 0,
        explain: "Tính ổn định rất quan trọng khi sắp xếp bảng dữ liệu theo nhiều tiêu chí liên tiếp.",
      },
    ],
    truefalse: [
      {
        id: "l12-4-2-t1",
        prompt: "Đánh giá các nhận định sau về các thuật toán sắp xếp:",
        statements: [
          { text: "Sắp xếp chọn (Selection Sort) tìm phần tử nhỏ nhất ở đoạn còn lại để đưa về đầu đoạn.", answer: true },
          { text: "Sắp xếp chèn (Insertion Sort) hoạt động hiệu quả khi dãy ban đầu đã gần như được sắp xếp.", answer: true },
          { text: "Bubble Sort là thuật toán nhanh nhất cho dữ liệu 10 triệu phần tử.", answer: false },
        ],
        explain: "Bubble Sort có độ phức tạp O(n²), quá chậm khi n = 10 triệu.",
      },
      {
        id: "l12-4-2-t2",
        prompt: "Cho dãy `[5, 1, 4, 2]`. Đánh giá quá trình sắp xếp nổi bọt tăng dần:",
        statements: [
          { text: "Sau vòng lặp ngoài đầu tiên, phần tử lớn nhất (số 5) được đẩy về cuối dãy.", answer: true },
          { text: "Số cặp so sánh ở vòng ngoài đầu tiên với 4 phần tử là 3 cặp.", answer: true },
          { text: "Tổng số lần hoán đổi bằng 0.", answer: false },
        ],
        explain: "Dãy chưa sắp xếp nên có thực hiện đổi chỗ (5 với 1, 5 với 4, 5 với 2...).",
      },
    ],
    short: [
      {
        id: "l12-4-2-s1",
        prompt: "Thuật toán sắp xếp nào chia dãy theo phần tử chốt (pivot) với độ phức tạp trung bình O(n log n)?",
        answers: ["quick sort", "sắp xếp nhanh"],
        explain: "Quick Sort (Sắp xếp nhanh).",
      },
      {
        id: "l12-4-2-s2",
        prompt: "Cho dãy `[4, 2, 7, 1]`. Viết trạng thái dãy sau vòng lặp ngoài đầu tiên của Sắp xếp nổi bọt tăng dần.",
        answers: ["[2, 4, 1, 7]", "2, 4, 1, 7", "2 4 1 7"],
        explain: "So sánh (4,2)->[2,4,7,1]; (4,7)->giữ nguyên; (7,1)->[2,4,1,7].",
      },
    ],
  },
  {
    id: "l12-4-3",
    grade: 12,
    chapterId: "l12-c4",
    title: "Bài 11: Độ phức tạp thuật toán",
    desc: "Ký hiệu Big-O: O(1), O(log n), O(n), O(n log n), O(n²), O(2^n) và cách đánh giá.",
    mcq: [
      {
        id: "l12-4-3-m1",
        prompt: "Thứ tự độ phức tạp thời gian tăng dần (từ nhanh nhất đến chậm nhất khi n lớn) nào đúng?",
        options: [
          "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)",
          "O(n²) < O(n) < O(log n) < O(1)",
          "O(1) < O(n) < O(log n) < O(n²)",
          "O(2ⁿ) < O(n log n) < O(n)",
        ],
        answer: 0,
        explain: "O(1) hằng số nhanh nhất; hàm mũ O(2ⁿ) tăng bùng nổ chậm nhất.",
      },
      {
        id: "l12-4-3-m2",
        prompt: "Hai vòng lặp `for` lồng nhau đều chạy từ `1` đến `n` có độ phức tạp thời gian là gì?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        answer: 1,
        explain: "Vòng ngoài n lần × vòng trong n lần = n² phép toán -> O(n²).",
      },
      {
        id: "l12-4-3-m3",
        prompt: "Truy cập trực tiếp phần tử `a[5]` trong một mảng có độ phức tạp thời gian là bao nhiêu?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: 0,
        explain: "Truy cập phần tử mảng theo chỉ số mất thời gian hằng số O(1), không phụ thuộc kích thước n.",
      },
    ],
    truefalse: [
      {
        id: "l12-4-3-t1",
        prompt: "Đánh giá các nhận định sau về ký hiệu Big-O:",
        statements: [
          { text: "Độ phức tạp `3n² + 5n + 10` khi rút gọn theo Big-O sẽ là `O(n²)`.", answer: true },
          { text: "Hằng số nhân phía trước được giữ nguyên trong ký hiệu Big-O (như `O(5n)`).", answer: false },
          { text: "Hàm Fibonacci đệ quy ngây thơ `F(n-1) + F(n-2)` có độ phức tạp cấp số mũ `O(2ⁿ)`.", answer: true },
        ],
        explain: "Khi viết Big-O, ta bỏ qua hằng số hệ số và các số hạng bậc thấp.",
      },
      {
        id: "l12-4-3-t2",
        prompt: "Đánh giá các nhận định sau về chọn thuật toán:",
        statements: [
          { text: "Độ phức tạp thời gian đo số phép toán cơ bản theo kích thước dữ liệu đầu vào `n`.", answer: true },
          { text: "Thuật toán O(n) khi kích thước `n` tăng gấp đôi thì số phép toán cũng tăng khoảng gấp đôi.", answer: true },
          { text: "Độ phức tạp không gian không liên quan đến bộ nhớ RAM sử dụng.", answer: false },
        ],
        explain: "Độ phức tạp không gian (Space Complexity) đo lượng bộ nhớ cần dùng theo `n`.",
      },
    ],
    short: [
      {
        id: "l12-4-3-s1",
        prompt: "Viết ký hiệu Big-O rút gọn của biểu thức số phép toán `T(n) = 4n log n + 100n + 50`.",
        answers: ["o(n log n)", "n log n"],
        explain: "Số hạng trội bậc cao nhất là n log n nên kết quả là O(n log n).",
      },
      {
        id: "l12-4-3-s2",
        prompt: "Vì sao khi đánh giá hiệu quả thuật toán, người ta dùng ký hiệu Big-O thay vì chỉ bấm đồng hồ giây?",
        answers: ["phần cứng", "máy tính", "độc lập", "kích thước"],
        explain: "Vì thời gian chạy bằng giây phụ thuộc tốc độ CPU/RAM từng máy, còn Big-O đánh giá khách quan tốc độ tăng số phép toán theo kích thước dữ liệu `n`.",
      },
    ],
  },
];
