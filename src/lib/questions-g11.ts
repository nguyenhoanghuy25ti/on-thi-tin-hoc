import type { PracticeSet } from "./questions";

export const G11_SETS: PracticeSet[] = [
  {
    id: "l11-1-1",
    grade: 11,
    chapterId: "l11-c1",
    title: "Bài 1: Hệ điều hành và phần mềm nguồn mở",
    desc: "Vai trò của hệ điều hành, phần mềm thương mại và phần mềm mã nguồn mở.",
    mcq: [
      {
        id: "l11-1-1-m1",
        prompt: "Chức năng cốt lõi nào thuộc về Hệ điều hành (Operating System)?",
        options: [
          "Thiết kế đồ họa 3D chuyên sâu",
          "Quản lí tài nguyên phần cứng, tệp tin, tiến trình và cung cấp giao diện người dùng",
          "Chỉ dùng để soạn thảo văn bản",
          "Thay thế hoàn toàn CPU",
        ],
        answer: 1,
        explain: "Hệ điều hành điều phối CPU, bộ nhớ, thiết bị ngoại vi, hệ thống tệp và giao diện.",
      },
      {
        id: "l11-1-1-m2",
        prompt: "Nhóm phần mềm nào sau đây ĐỀU là phần mềm mã nguồn mở?",
        options: [
          "Windows, Microsoft Word, Photoshop",
          "Linux, LibreOffice, GIMP",
          "macOS, CorelDRAW, Excel",
          "iOS, AutoCAD, PowerPoint",
        ],
        answer: 1,
        explain: "Linux, LibreOffice và GIMP là các phần mềm nguồn mở tiêu biểu.",
      },
      {
        id: "l11-1-1-m3",
        prompt: "Đặc trưng của giấy phép nguồn mở GNU GPL là gì?",
        options: [
          "Cấm tuyệt đối việc xem mã nguồn",
          "Cho phép xem, sửa mã nguồn; sản phẩm phái sinh cũng phải giữ giấy phép mở",
          "Bắt buộc trả phí bản quyền hằng năm cho mọi cá nhân",
          "Chỉ chạy được trên điện thoại di động",
        ],
        answer: 1,
        explain: "GNU GPL bảo đảm quyền tự do mã nguồn và tính kế thừa mở (copyleft).",
      },
    ],
    truefalse: [
      {
        id: "l11-1-1-t1",
        prompt: "Đánh giá các nhận định sau về Hệ điều hành:",
        statements: [
          { text: "Không có hệ điều hành, các phần mềm ứng dụng thông thường không thể chạy trên máy tính.", answer: true },
          { text: "Android và iOS là các hệ điều hành dành cho thiết bị di động.", answer: true },
          { text: "Hệ điều hành chỉ quản lí màn hình và bàn phím, không quản lí RAM.", answer: false },
        ],
        explain: "Hệ điều hành quản lí toàn diện CPU, RAM, ổ đĩa, tiến trình và thiết bị vào ra.",
      },
      {
        id: "l11-1-1-t2",
        prompt: "Đánh giá các nhận định sau về phần mềm nguồn mở:",
        statements: [
          { text: "Cộng đồng lập trình viên có thể cùng kiểm tra và vá lỗi bảo mật nhanh chóng.", answer: true },
          { text: "Phần mềm nguồn mở chắc chắn luôn miễn phí hoàn toàn mọi dịch vụ hỗ trợ đi kèm.", answer: false },
          { text: "LibreOffice Writer là phần mềm nguồn mở thay thế được cho Microsoft Word.", answer: true },
        ],
        explain: "Các công ty vẫn có thể thu phí dịch vụ triển khai, bảo trì và hỗ trợ doanh nghiệp cho phần mềm nguồn mở.",
      },
    ],
    short: [
      {
        id: "l11-1-1-s1",
        prompt: "Tên hệ điều hành mã nguồn mở phổ biến nhất thế giới hiện nay (5 chữ cái)?",
        answers: ["linux"],
        explain: "Linux được sử dụng rộng rãi trên máy chủ, siêu máy tính và làm nhân cho Android.",
      },
      {
        id: "l11-1-1-s2",
        prompt: "So sánh điểm khác nhau cơ bản giữa Phần mềm thương mại và Phần mềm nguồn mở.",
        answers: ["mã nguồn", "đóng", "mở", "sửa"],
        explain: "Phần mềm thương mại giữ kín mã nguồn và bán giấy phép sử dụng; phần mềm nguồn mở công khai mã nguồn cho phép xem, sửa và phát triển.",
      },
    ],
  },
  {
    id: "l11-1-2",
    grade: 11,
    chapterId: "l11-c1",
    title: "Bài 2: Phần mềm ứng dụng và dịch vụ đám mây",
    desc: "Phân biệt 3 mô hình dịch vụ đám mây IaaS, PaaS, SaaS và phần mềm trực tuyến.",
    mcq: [
      {
        id: "l11-1-2-m1",
        prompt: "Mô hình dịch vụ đám mây cung cấp ứng dụng hoàn chỉnh qua trình duyệt (như Gmail, Google Docs) gọi là gì?",
        options: ["IaaS", "PaaS", "SaaS", "LAN"],
        answer: 2,
        explain: "SaaS (Software as a Service) cung cấp phần mềm hoàn chỉnh cho người dùng cuối qua Internet.",
      },
      {
        id: "l11-1-2-m2",
        prompt: "Một doanh nghiệp thuê máy chủ ảo, ổ cứng mạng và tự cài hệ điều hành lên đó thuộc mô hình nào?",
        options: ["SaaS", "IaaS", "PaaS", "Freeware"],
        answer: 1,
        explain: "IaaS (Infrastructure as a Service) cung cấp hạ tầng tính toán, lưu trữ, mạng.",
      },
      {
        id: "l11-1-2-m3",
        prompt: "Lập trình viên dùng môi trường triển khai ứng dụng có sẵn trên đám mây (như Vercel, Heroku) thuộc mô hình nào?",
        options: ["IaaS", "PaaS", "SaaS", "Firmware"],
        answer: 1,
        explain: "PaaS (Platform as a Service) cung cấp nền tảng phát triển và vận hành ứng dụng.",
      },
    ],
    truefalse: [
      {
        id: "l11-1-2-t1",
        prompt: "Đánh giá các nhận định sau về dịch vụ đám mây:",
        statements: [
          { text: "Google Docs cho phép nhiều người cùng chỉnh sửa một văn bản theo thời gian thực.", answer: true },
          { text: "Dùng phần mềm trực tuyến qua trình duyệt bắt buộc phải có cấu hình máy tính cực mạnh.", answer: false },
          { text: "Chi phí thuê dịch vụ đám mây thường tính linh hoạt theo mức sử dụng.", answer: true },
        ],
        explain: "Phần nặng được xử lí trên máy chủ đám mây, máy người dùng chỉ cần trình duyệt và kết nối mạng.",
      },
      {
        id: "l11-1-2-t2",
        prompt: "Đánh giá các nhận định sau về 3 mô hình IaaS, PaaS, SaaS:",
        statements: [
          { text: "IaaS viết tắt của Infrastructure as a Service.", answer: true },
          { text: "Trong mô hình SaaS, người dùng cuối phải tự viết code để xây dựng giao diện phần mềm.", answer: false },
          { text: "Canva hoặc Microsoft 365 Online là ví dụ của SaaS.", answer: true },
        ],
        explain: "Ở SaaS, nhà cung cấp lo toàn bộ phần mềm, người dùng chỉ việc đăng nhập và sử dụng.",
      },
    ],
    short: [
      {
        id: "l11-1-2-s1",
        prompt: "Viết tên viết tắt của mô hình đám mây 'Phần mềm như một dịch vụ'.",
        answers: ["saas"],
        explain: "SaaS (Software as a Service).",
      },
      {
        id: "l11-1-2-s2",
        prompt: "Nêu ví dụ cụ thể cho mỗi mô hình IaaS, PaaS và SaaS.",
        answers: ["aws", "vercel", "google docs", "gmail"],
        explain: "IaaS: AWS EC2 / Google Compute Engine; PaaS: Vercel / Heroku; SaaS: Google Docs / Gmail / Canva.",
      },
    ],
  },
  {
    id: "l11-2-1",
    grade: 11,
    chapterId: "l11-c2",
    title: "Bài 3: Kết nối mạng và chia sẻ tài nguyên",
    desc: "Kết nối có dây/không dây, chia sẻ tệp và máy in trong LAN, kĩ thuật NAT.",
    mcq: [
      {
        id: "l11-2-1-m1",
        prompt: "So sánh phạm vi hoạt động giữa Bluetooth và Wi-Fi, nhận định nào đúng?",
        options: [
          "Bluetooth có phạm vi ngắn (vài mét), Wi-Fi có phạm vi rộng hơn",
          "Bluetooth phủ sóng toàn thành phố",
          "Wi-Fi chỉ dùng trong khoảng cách dưới 10 cm",
          "Hai công nghệ có phạm vi giống hệt nhau",
        ],
        answer: 0,
        explain: "Bluetooth dùng kết nối cá nhân cự li gần (tai nghe, loa); Wi-Fi phủ sóng phòng học, tòa nhà.",
      },
      {
        id: "l11-2-1-m2",
        prompt: "Để các máy tính trong phòng thực hành dùng chung một máy in qua mạng LAN cần thực hiện gì?",
        options: [
          "Cài đặt chia sẻ máy in (Printer Sharing) trên máy chủ/máy nối trực tiếp và cấp quyền trong LAN",
          "Rút dây mạng của tất cả các máy",
          "Gửi máy in qua email",
          "Cài lại hệ điều hành cho từng máy mỗi ngày",
        ],
        answer: 0,
        explain: "Trong mạng LAN có thể chia sẻ thư mục, ổ đĩa và máy in dùng chung.",
      },
      {
        id: "l11-2-1-m3",
        prompt: "Kĩ thuật NAT trên Router gia đình giúp làm gì?",
        options: [
          "Cho phép nhiều thiết bị dùng địa chỉ IP nội bộ (LAN) cùng truy cập Internet qua một IP công cộng",
          "Tăng dung lượng ổ cứng của điện thoại",
          "Tạo mật khẩu Wi-Fi tự động",
          "Chống hư hỏng màn hình",
        ],
        answer: 0,
        explain: "NAT (Network Address Translation) ánh xạ địa chỉ IP riêng sang IP công cộng khi ra Internet.",
      },
    ],
    truefalse: [
      {
        id: "l11-2-1-t1",
        prompt: "Đánh giá các nhận định sau về chia sẻ tài nguyên mạng:",
        statements: [
          { text: "Có thể thiết lập quyền Chỉ đọc (Read) hoặc Đọc/Ghi (Read/Write) khi chia sẻ thư mục trong LAN.", answer: true },
          { text: "Chia sẻ tài nguyên trong mạng LAN bắt buộc phải tải tệp lên YouTube.", answer: false },
          { text: "Địa chỉ `192.168.1.10` thường là địa chỉ IP dùng trong mạng nội bộ.", answer: true },
        ],
        explain: "Dải 192.168.x.x là địa chỉ IP riêng (Private IP) cho mạng LAN.",
      },
      {
        id: "l11-2-1-t2",
        prompt: "Đánh giá các nhận định sau về kết nối thiết bị:",
        statements: [
          { text: "Cáp xoắn đôi RJ45 thường dùng kết nối máy tính với Switch trong phòng máy.", answer: true },
          { text: "Mạng Wi-Fi công cộng không mật khẩu luôn an toàn cho giao dịch ngân hàng.", answer: false },
          { text: "Bộ lặp tín hiệu (Repeater / Mesh) giúp mở rộng vùng phủ sóng Wi-Fi.", answer: true },
        ],
        explain: "Wi-Fi công cộng không mã hóa dễ bị nghe lén gói tin.",
      },
    ],
    short: [
      {
        id: "l11-2-1-s1",
        prompt: "Kĩ thuật chuyển đổi địa chỉ IP nội bộ sang IP công cộng trên Router viết tắt là gì?",
        answers: ["nat"],
        explain: "NAT (Network Address Translation).",
      },
      {
        id: "l11-2-1-s2",
        prompt: "Vì sao khi chia sẻ thư mục trong mạng LAN, ta nên phân quyền 'Chỉ đọc' cho người lạ?",
        answers: ["xóa", "sửa", "an toàn", "bảo vệ"],
        explain: "Để người khác có thể xem tài liệu nhưng không thể tự ý chỉnh sửa hoặc xóa nhầm dữ liệu gốc.",
      },
    ],
  },
  {
    id: "l11-2-2",
    grade: 11,
    chapterId: "l11-c2",
    title: "Bài 4: An toàn thông tin trên không gian số",
    desc: "Phân biệt Virus, Worm, Trojan, Ransomware và các biện pháp phòng chống.",
    mcq: [
      {
        id: "l11-2-2-m1",
        prompt: "Loại phần mềm độc hại nào giả dạng làm phần mềm hữu ích (game miễn phí, công cụ crack) để đánh lừa người dùng cài đặt?",
        options: ["Worm (Sâu máy tính)", "Trojan", "Firewall", "Antivirus"],
        answer: 1,
        explain: "Trojan (Ngựa thành Troy) ngụy trang dưới vỏ bọc phần mềm vô hại.",
      },
      {
        id: "l11-2-2-m2",
        prompt: "Ransomware gây ra hậu quả nguy hiểm nào sau đây?",
        options: [
          "Mã hóa toàn bộ dữ liệu trên máy và đòi tiền chuộc để giải mã",
          "Làm màn hình sáng hơn",
          "Tăng tốc độ tải trang web",
          "Tự động dọn rác ổ đĩa",
        ],
        answer: 0,
        explain: "Ransomware (mã độc tống tiền) khóa chặt dữ liệu người dùng bằng thuật toán mã hóa.",
      },
      {
        id: "l11-2-2-m3",
        prompt: "Biện pháp hiệu quả nhất để khôi phục dữ liệu khi gặp sự cố mã độc tống tiền hoặc hỏng ổ cứng là gì?",
        options: [
          "Sao lưu dữ liệu định kì ra thiết bị rời hoặc lưu trữ đám mây an toàn",
          "Khởi động lại máy 10 lần",
          "Thay bàn phím mới",
          "Tăng độ phân giải màn hình",
        ],
        answer: 0,
        explain: "Nguyên tắc sao lưu (Backup 3-2-1) giúp phục hồi dữ liệu an toàn mà không phải trả tiền chuộc.",
      },
    ],
    truefalse: [
      {
        id: "l11-2-2-t1",
        prompt: "Đánh giá các nhận định sau về phần mềm độc hại:",
        statements: [
          { text: "Sâu máy tính (Worm) có khả năng tự nhân bản và lây lan nhanh qua mạng mà không cần tệp vật chủ.", answer: true },
          { text: "Cài đặt phần mềm bẻ khóa (crack) không tiềm ẩn nguy cơ nhiễm mã độc.", answer: false },
          { text: "Cập nhật hệ điều hành thường xuyên giúp vá các lỗ hổng bảo mật đã biết.", answer: true },
        ],
        explain: "Phần mềm crack là con đường lây nhiễm Trojan và Ransomware phổ biến nhất.",
      },
      {
        id: "l11-2-2-t2",
        prompt: "Đánh giá các nhận định sau về phòng chống tấn công mạng:",
        statements: [
          { text: "Tấn công DDoS làm quá tải tài nguyên máy chủ bằng lượng truy cập khổng lồ.", answer: true },
          { text: "Tường lửa (Firewall) kiểm soát lưu lượng mạng vào/ra dựa theo quy tắc bảo mật.", answer: true },
          { text: "Một khi đã bật tường lửa thì không cần chú ý khi mở tệp đính kèm lạ trong email.", answer: false },
        ],
        explain: "Người dùng vẫn cần cảnh giác với email lừa đảo (Phishing) và tệp lạ.",
      },
    ],
    short: [
      {
        id: "l11-2-2-s1",
        prompt: "Loại tấn công từ chối dịch vụ phân tán viết tắt là gì?",
        answers: ["ddos"],
        explain: "DDoS (Distributed Denial of Service).",
      },
      {
        id: "l11-2-2-s2",
        prompt: "Phân biệt ngắn gọn giữa Virus/Worm và Trojan.",
        answers: ["lây lan", "giả dạng", "tự nhân bản"],
        explain: "Worm/Virus tự nhân bản và lây lan sang tệp/máy khác; Trojan giả dạng phần mềm hợp pháp để người dùng tự cài rồi mở cửa hậu.",
      },
    ],
  },
  {
    id: "l11-3-1",
    grade: 11,
    chapterId: "l11-c3",
    title: "Bài 5: Nghĩa vụ tôn trọng bản quyền",
    desc: "Quyền tác giả đối với sản phẩm số, trích dẫn hợp lệ và tránh vi phạm bản quyền.",
    mcq: [
      {
        id: "l11-3-1-m1",
        prompt: "Hành vi nào sau đây VI PHẠM Luật Sở hữu trí tuệ?",
        options: [
          "Mua phần mềm có bản quyền hợp lệ",
          "Sao chép phần mềm có bản quyền và bán lại thu lợi bất chính",
          "Sử dụng tài nguyên mở đúng theo điều khoản Creative Commons",
          "Trích dẫn một đoạn ngắn từ sách giáo khoa có ghi rõ nguồn",
        ],
        answer: 1,
        explain: "Sao chép, phân phối trái phép sản phẩm có bản quyền vì mục đích thương mại là hành vi vi phạm pháp luật.",
      },
      {
        id: "l11-3-1-m2",
        prompt: "Sản phẩm nào sau đây được bảo hộ quyền tác giả trong môi trường số?",
        options: [
          "Bài viết, ảnh chụp, video, bản nhạc và mã nguồn phần mềm",
          "Chỉ sách in bằng giấy",
          "Chỉ tranh sơn dầu",
          "Không có sản phẩm số nào được bảo hộ",
        ],
        answer: 0,
        explain: "Tất cả tác phẩm sáng tạo ở dạng số đều được pháp luật bảo hộ quyền tác giả.",
      },
      {
        id: "l11-3-1-m3",
        prompt: "Giấy phép Creative Commons (CC) dùng để làm gì?",
        options: [
          "Cho phép tác giả quy định rõ quyền sử dụng lại tác phẩm (ghi công, phi thương mại...)",
          "Xóa bỏ hoàn toàn tên tác giả",
          "Bắt buộc mọi người phải trả tiền mới được đọc tin tức",
          "Thay thế phần mềm diệt virus",
        ],
        answer: 0,
        explain: "Creative Commons cung cấp các mức giấy phép chia sẻ mở linh hoạt và minh bạch.",
      },
    ],
    truefalse: [
      {
        id: "l11-3-1-t1",
        prompt: "Đánh giá các nhận định sau về bản quyền số:",
        statements: [
          { text: "Dùng phần mềm không bản quyền (lậu) vừa vi phạm pháp luật vừa dễ nhiễm mã độc.", answer: true },
          { text: "Chỉ cần ghi tên tác giả là được phép đem sách của họ đi in lậu bán lấy tiền.", answer: false },
          { text: "Quyền nhân thân của tác giả bao gồm quyền đứng tên trên tác phẩm.", answer: true },
        ],
        explain: "Sử dụng thương mại sản phẩm có bản quyền bắt buộc phải được sự cho phép của chủ sở hữu.",
      },
      {
        id: "l11-3-1-t2",
        prompt: "Đánh giá các nhận định sau về sử dụng tài liệu trên Internet:",
        statements: [
          { text: "Ảnh tìm trên mạng không ghi chú gì mặc định vẫn có bản quyền thuộc về người tạo ra nó.", answer: true },
          { text: "Kho ảnh mở (như Wikimedia Commons) cho phép tái sử dụng theo điều kiện ghi trong giấy phép.", answer: true },
          { text: "Đạo văn là hành vi hợp pháp trong nghiên cứu học đường.", answer: false },
        ],
        explain: "Đạo văn (sao chép ý tưởng/nội dung không trích dẫn) là hành vi vi phạm đạo đức học thuật và bản quyền.",
      },
    ],
    short: [
      {
        id: "l11-3-1-s1",
        prompt: "Hành vi lấy bài viết của người khác và nhận là của mình gọi là gì?",
        answers: ["đạo văn"],
        explain: "Đó là hành vi đạo văn (Plagiarism).",
      },
      {
        id: "l11-3-1-s2",
        prompt: "Khi sử dụng ảnh hoặc tài liệu của người khác trong bài báo cáo, em cần làm gì để đúng quy định?",
        answers: ["nguồn", "tác giả", "xin phép"],
        explain: "Ghi rõ nguồn và tên tác giả; kiểm tra giấy phép sử dụng và xin phép nếu dùng ngoài phạm vi học tập cá nhân.",
      },
    ],
  },
  {
    id: "l11-3-2",
    grade: 11,
    chapterId: "l11-c3",
    title: "Bài 6: Giao tiếp và ứng xử trong môi trường số",
    desc: "Tôn trọng quyền riêng tư, xây dựng dấu chân số tích cực và phòng tránh bạo lực mạng.",
    mcq: [
      {
        id: "l11-3-2-m1",
        prompt: "Khái niệm 'Dấu chân số' (Digital Footprint) là gì?",
        options: [
          "Vết vân tay trên màn hình cảm ứng",
          "Toàn bộ dữ liệu, lịch sử bài đăng, bình luận mà người dùng để lại trên Internet",
          "Kích thước file ảnh",
          "Mã số sinh viên",
        ],
        answer: 1,
        explain: "Mọi hoạt động trực tuyến đều tạo thành dấu chân số và có thể ảnh hưởng lâu dài đến uy tín cá nhân.",
      },
      {
        id: "l11-3-2-m2",
        prompt: "Trước khi đăng ảnh chụp chung có mặt bạn bè lên mạng xã hội, em nên làm gì?",
        options: [
          "Hỏi ý kiến và được sự đồng ý của các bạn trong ảnh",
          "Đăng ngay không cần hỏi",
          "Cố tình chọn ảnh bạn đang xấu nhất để trêu chọc",
          "Gắn thêm thông tin số điện thoại của bạn",
        ],
        answer: 0,
        explain: "Tôn trọng hình ảnh và quyền riêng tư của người khác là quy tắc cơ bản trên mạng.",
      },
      {
        id: "l11-3-2-m3",
        prompt: "Thái độ đúng đắn khi thấy bạn mình bị lập hội nhóm nói xấu trên mạng là gì?",
        options: [
          "Tham gia bình luận hùa theo",
          "Không chia sẻ tiếp, động viên bạn, lưu bằng chứng và báo cho thầy cô/gia đình",
          "Chia sẻ link hội nhóm cho cả trường cùng xem",
          "Cười nhạo bạn",
        ],
        answer: 1,
        explain: "Không tiếp tay cho bạo lực mạng và chủ động bảo vệ nạn nhân, báo cho người có trách nhiệm.",
      },
    ],
    truefalse: [
      {
        id: "l11-3-2-t1",
        prompt: "Đánh giá các nhận định sau về quyền riêng tư và dấu chân số:",
        statements: [
          { text: "Bài đăng trên mạng sau khi xóa vẫn có thể đã bị người khác chụp ảnh lưu lại.", answer: true },
          { text: "Nhà tuyển dụng tương lai không bao giờ xem trang mạng xã hội của ứng viên.", answer: false },
          { text: "Tự ý công khai tin nhắn riêng tư của người khác là xâm phạm quyền riêng tư.", answer: true },
        ],
        explain: "Dấu chân số tích cực giúp tạo ấn tượng chuyên nghiệp trong học tập và nghề nghiệp.",
      },
      {
        id: "l11-3-2-t2",
        prompt: "Đánh giá các nhận định sau về bạo lực mạng:",
        statements: [
          { text: "Bạo lực mạng có thể gây tổn thương tâm lí nặng nề cho nạn nhân.", answer: true },
          { text: "Gửi tin nhắn đe dọa bạn bè chỉ là trò đùa vô hại.", answer: false },
          { text: "Mỗi người cần kiểm soát cảm xúc trước khi bấm nút gửi bình luận.", answer: true },
        ],
        explain: "Đe dọa, xúc phạm người khác qua mạng là hành vi bạo lực mạng bị nghiêm cấm.",
      },
    ],
    short: [
      {
        id: "l11-3-2-s1",
        prompt: "Tập hợp các dấu vết dữ liệu hoạt động người dùng để lại trên Internet gọi là gì?",
        answers: ["dấu chân số"],
        explain: "Đó là 'dấu chân số' (Digital Footprint).",
      },
      {
        id: "l11-3-2-s2",
        prompt: "Làm thế nào để xây dựng dấu chân số tích cực khi còn là học sinh THPT?",
        answers: ["lịch sự", "chia sẻ", "học tập", "bảo mật"],
        explain: "Đăng tải nội dung tích cực, chia sẻ kiến thức học tập lành mạnh, bình luận lịch sự và kiểm soát quyền riêng tư tài khoản.",
      },
    ],
  },
  {
    id: "l11-4-1",
    grade: 11,
    chapterId: "l11-c4",
    title: "Bài 7: Danh sách và mảng một chiều trong Python",
    desc: "Khởi tạo list, chỉ số dương/âm, phương thức append/insert/pop/remove và duyệt list.",
    mcq: [
      {
        id: "l11-4-1-m1",
        prompt: "Cho `a = [10, 20, 30, 40]`. Giá trị của `a[1] + a[-1]` là bao nhiêu?",
        options: ["50", "60", "30", "70"],
        answer: 1,
        explain: "a[1] = 20 (phần tử thứ 2), a[-1] = 40 (phần tử cuối). 20 + 40 = 60.",
      },
      {
        id: "l11-4-1-m2",
        prompt: "Sau khi chạy `ds = [1, 2, 3]; ds.append(4); ds.pop(0)`, danh sách `ds` là gì?",
        options: ["[2, 3, 4]", "[1, 2, 3]", "[1, 3, 4]", "[4, 2, 3]"],
        answer: 0,
        explain: "append(4) -> [1, 2, 3, 4]; pop(0) xóa phần tử ở chỉ số 0 (số 1) -> [2, 3, 4].",
      },
      {
        id: "l11-4-1-m3",
        prompt: "Hàm nào dùng để tính tổng các phần tử số trong danh sách `a`?",
        options: ["len(a)", "sum(a)", "total(a)", "count(a)"],
        answer: 1,
        explain: "sum(a) trả về tổng giá trị; len(a) trả về số lượng phần tử.",
      },
    ],
    truefalse: [
      {
        id: "l11-4-1-t1",
        prompt: "Đánh giá các nhận định sau về kiểu `list` trong Python:",
        statements: [
          { text: "Danh sách trong Python có thể thay đổi phần tử sau khi khởi tạo (mutable).", answer: true },
          { text: "Lệnh `a.remove(x)` xóa phần tử tại vị trí chỉ số `x`.", answer: false },
          { text: "Hàm `a.sort()` sắp xếp các phần tử trong danh sách `a` tăng dần tại chỗ.", answer: true },
        ],
        explain: "`remove(x)` xóa theo GIÁ TRỊ x đầu tiên tìm thấy, còn `pop(i)` mới xóa theo chỉ số i.",
      },
      {
        id: "l11-4-1-t2",
        prompt: "Cho `nums = [5, 2, 9, 2]`. Đánh giá các nhận định sau:",
        statements: [
          { text: "`len(nums)` trả về giá trị 4.", answer: true },
          { text: "`max(nums)` trả về giá trị 9.", answer: true },
          { text: "`nums.count(2)` trả về giá trị 1.", answer: false },
        ],
        explain: "Số 2 xuất hiện 2 lần trong danh sách nên `nums.count(2)` bằng 2.",
      },
    ],
    short: [
      {
        id: "l11-4-1-s1",
        prompt: "Cho `a = [3, 6, 9, 12]`. Sau lệnh `a.insert(1, 5)`, giá trị của `a[2]` là bao nhiêu?",
        answers: ["6"],
        explain: "insert(1, 5) chèn số 5 vào vị trí chỉ số 1 -> [3, 5, 6, 9, 12], nên a[2] = 6.",
      },
      {
        id: "l11-4-1-s2",
        prompt: "Viết vòng lặp Python in ra các phần tử chẵn trong danh sách `a = [1, 4, 7, 8, 10]`.",
        answers: ["for", "% 2 == 0", "print"],
        explain: "for x in a:\n    if x % 2 == 0:\n        print(x)",
      },
    ],
  },
  {
    id: "l11-4-2",
    grade: 11,
    chapterId: "l11-c4",
    title: "Bài 8: Xâu kí tự trong Python",
    desc: "Cắt xâu (slicing), nối xâu và các phương thức split, join, replace, find.",
    mcq: [
      {
        id: "l11-4-2-m1",
        prompt: "Cho xâu `s = 'TINHOC2025'`. Kết quả của biểu thức cắt xâu `s[3:6]` là gì?",
        options: ["'NHO'", "'HOC'", "'HOC2'", "'TIN'"],
        answer: 1,
        explain: "Chỉ số: T(0) I(1) N(2) H(3) O(4) C(5)... s[3:6] lấy vị trí 3, 4, 5 -> 'HOC'.",
      },
      {
        id: "l11-4-2-m2",
        prompt: "Phương thức nào tách một xâu thành danh sách các từ dựa theo khoảng trắng?",
        options: ["s.strip()", "s.split()", "s.find()", "s.upper()"],
        answer: 1,
        explain: "`s.split()` tách xâu thành list các từ; `s.strip()` cắt khoảng trắng hai đầu.",
      },
      {
        id: "l11-4-2-m3",
        prompt: "Kết quả của `'Ha' * 3` trong Python là gì?",
        options: ["'Ha3'", "'HaHaHa'", "Lỗi TypeError", "'Haa'"],
        answer: 1,
        explain: "Toán tử `*` với xâu và số nguyên lặp lại xâu đó n lần.",
      },
    ],
    truefalse: [
      {
        id: "l11-4-2-t1",
        prompt: "Đánh giá các nhận định sau về xâu kí tự Python:",
        statements: [
          { text: "Có thể sửa trực tiếp một kí tự trong xâu bằng lệnh `s[0] = 'A'`.", answer: false },
          { text: "Biểu thức `'an' in 'hoanganh'` trả về True.", answer: true },
          { text: "Hàm `s.find('x')` trả về `-1` nếu không tìm thấy `'x'` trong `s`.", answer: true },
        ],
        explain: "Xâu trong Python là bất biến (immutable), không thể gán trực tiếp s[0] = 'A'.",
      },
      {
        id: "l11-4-2-t2",
        prompt: "Cho `s = '  Python 11  '`. Đánh giá các nhận định:",
        statements: [
          { text: "`s.strip()` xóa các dấu cách ở đầu và cuối xâu.", answer: true },
          { text: "`'a' + 'b'` cho kết quả là `'ab'`.", answer: true },
          { text: "`'abc'.upper()` trả về `'abc'`.", answer: false },
        ],
        explain: "`upper()` chuyển toàn bộ thành chữ in hoa `'ABC'`.",
      },
    ],
    short: [
      {
        id: "l11-4-2-s1",
        prompt: "Cho `s = 'lap trinh python'`. Kết quả của `len(s.split())` là bao nhiêu?",
        answers: ["3"],
        explain: "s.split() tách thành ['lap', 'trinh', 'python'] gồm 3 từ.",
      },
      {
        id: "l11-4-2-s2",
        prompt: "Viết biểu thức Python kiểm tra xem xâu `s` có chứa từ `'Tin'` hay không.",
        answers: ["'tin' in s", "\"tin\" in s", "in s"],
        explain: "Dùng toán tử `in`: `'Tin' in s` (hoặc kiểm tra không phân biệt hoa thường `'tin' in s.lower()`).",
      },
    ],
  },
  {
    id: "l11-4-3",
    grade: 11,
    chapterId: "l11-c4",
    title: "Bài 9: Tệp và xử lí tệp trong Python",
    desc: "Mở tệp với open(), các chế độ r/w/a, cú pháp with open() và đọc/ghi dòng.",
    mcq: [
      {
        id: "l11-4-3-m1",
        prompt: "Chế độ mở tệp nào dùng để GHI THÊM dữ liệu vào cuối tệp mà không xóa nội dung cũ?",
        options: ["'r'", "'w'", "'a'", "'x'"],
        answer: 2,
        explain: "'a' (append) ghi thêm vào cuối tệp; 'w' sẽ xóa sạch nội dung cũ nếu tệp đã tồn tại.",
      },
      {
        id: "l11-4-3-m2",
        prompt: "Ưu điểm của cú pháp `with open('data.txt', 'r') as f:` là gì?",
        options: [
          "Tự động đóng tệp an toàn ngay cả khi xảy ra lỗi",
          "Tự động xóa tệp sau khi đọc",
          "Chỉ đọc được tệp dưới 10 byte",
          "Biến tệp văn bản thành tệp ảnh",
        ],
        answer: 0,
        explain: "Context manager `with` đảm bảo giải phóng và đóng tệp tự động khi kết thúc khối lệnh.",
      },
      {
        id: "l11-4-3-m3",
        prompt: "Phương thức nào đọc toàn bộ nội dung tệp văn bản thành một xâu kí tự duy nhất?",
        options: ["f.read()", "f.write()", "f.close()", "f.seek(0)"],
        answer: 0,
        explain: "f.read() đọc toàn bộ tệp; f.readline() đọc từng dòng; f.readlines() trả về list các dòng.",
      },
    ],
    truefalse: [
      {
        id: "l11-4-3-t1",
        prompt: "Đánh giá các nhận định sau về xử lí tệp Python:",
        statements: [
          { text: "Mở tệp không tồn tại ở chế độ `'r'` sẽ gây lỗi `FileNotFoundError`.", answer: true },
          { text: "Mở tệp đã có dữ liệu ở chế độ `'w'` sẽ giữ nguyên toàn bộ nội dung cũ.", answer: false },
          { text: "Nên truyền `encoding='utf-8'` khi đọc/ghi tệp tiếng Việt.", answer: true },
        ],
        explain: "Chế độ `'w'` (write) ghi đè từ đầu và xóa sạch nội dung trước đó.",
      },
      {
        id: "l11-4-3-t2",
        prompt: "Đánh giá các nhận định sau về đọc ghi dòng trong tệp:",
        statements: [
          { text: "Có thể dùng vòng lặp `for line in f:` để duyệt từng dòng trong tệp.", answer: true },
          { text: "Lệnh `f.write(123)` ghi trực tiếp số nguyên 123 mà không cần chuyển sang xâu.", answer: false },
          { text: "Dữ liệu lưu trong tệp được giữ lại ngay cả khi tắt máy tính.", answer: true },
        ],
        explain: "`f.write()` chỉ nhận đối số kiểu xâu (`str`), nên cần `f.write(str(123))`.",
      },
    ],
    short: [
      {
        id: "l11-4-3-s1",
        prompt: "Kí tự đại diện cho chế độ mở tệp để ĐỌC trong hàm `open()` là gì?",
        answers: ["r", "'r'"],
        explain: "Chế độ `'r'` (read).",
      },
      {
        id: "l11-4-3-s2",
        prompt: "Viết đoạn code Python mở tệp `ketqua.txt` ở chế độ ghi đè và ghi dòng chữ 'Hoan thanh'.",
        answers: ["open", "'w'", "write"],
        explain: "with open('ketqua.txt', 'w', encoding='utf-8') as f:\n    f.write('Hoan thanh')",
      },
    ],
  },
  {
    id: "l11-4-4",
    grade: 11,
    chapterId: "l11-c4",
    title: "Bài 10: Hàm và chương trình con trong Python",
    desc: "Định nghĩa def, tham số, giá trị trả về return và phạm vi biến cục bộ/toàn cục.",
    mcq: [
      {
        id: "l11-4-4-m1",
        prompt: "Từ khóa nào dùng để định nghĩa một hàm mới trong Python?",
        options: ["function", "func", "def", "define"],
        answer: 2,
        explain: "Cú pháp định nghĩa hàm là `def ten_ham(tham_so):`.",
      },
      {
        id: "l11-4-4-m2",
        prompt: "Cho hàm `def f(x): print(x * 2)`. Khi gọi `y = f(5)`, giá trị của biến `y` là gì?",
        options: ["10", "5", "None", "0"],
        answer: 2,
        explain: "Hàm chỉ in ra 10 chứ không có lệnh `return`, nên giá trị trả về mặc định là `None`.",
      },
      {
        id: "l11-4-4-m3",
        prompt: "Biến được khai báo bên trong thân hàm thuộc loại nào?",
        options: ["Biến toàn cục (Global)", "Biến cục bộ (Local)", "Hằng số hệ thống", "Từ khóa"],
        answer: 1,
        explain: "Biến khai báo trong hàm là biến cục bộ, chỉ có phạm vi sử dụng trong hàm đó.",
      },
    ],
    truefalse: [
      {
        id: "l11-4-4-t1",
        prompt: "Đánh giá các nhận định sau về hàm trong Python:",
        statements: [
          { text: "Hàm giúp chia nhỏ bài toán phức tạp và tái sử dụng mã nguồn nhiều lần.", answer: true },
          { text: "Một hàm chỉ được phép trả về tối đa 1 giá trị duy nhất.", answer: false },
          { text: "Lệnh `return` kết thúc thực thi hàm ngay lập tức và trả về kết quả.", answer: true },
        ],
        explain: "Hàm Python có thể trả về nhiều giá trị cùng lúc dưới dạng tuple (ví dụ `return a, b`).",
      },
      {
        id: "l11-4-4-t2",
        prompt: "Cho `x = 10` bên ngoài, `def doi(): x = 5`. Đánh giá các nhận định:",
        statements: [
          { text: "Sau khi gọi `doi()`, giá trị biến `x` bên ngoài vẫn là 10.", answer: true },
          { text: "Nếu muốn sửa biến `x` toàn cục bên trong hàm `doi()`, cần dùng từ khóa `global x`.", answer: true },
          { text: "Tham số hình thức và đối số truyền vào bắt buộc phải đặt cùng một tên.", answer: false },
        ],
        explain: "Tên đối số truyền vào khi gọi hàm không cần giống tên tham số khi định nghĩa.",
      },
    ],
    short: [
      {
        id: "l11-4-4-s1",
        prompt: "Cho hàm `def tinh(a, b=3): return a * b`. Giá trị của `tinh(4) + tinh(2, 5)` là bao nhiêu?",
        answers: ["22"],
        explain: "tinh(4) = 4 * 3 = 12; tinh(2, 5) = 2 * 5 = 10. Tổng = 22.",
      },
      {
        id: "l11-4-4-s2",
        prompt: "Viết hàm `dien_tich_hcn(dai, rong)` trả về diện tích hình chữ nhật.",
        answers: ["def dien_tich_hcn", "return dai * rong", "return"],
        explain: "def dien_tich_hcn(dai, rong):\n    return dai * rong",
      },
    ],
  },
];
