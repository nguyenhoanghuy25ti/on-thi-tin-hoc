import type { PracticeSet } from "./questions";

export const G10_SETS: PracticeSet[] = [
  {
    id: "l10-1-1",
    grade: 10,
    chapterId: "l10-c1",
    title: "Bài 1: Dữ liệu, thông tin và xử lí thông tin",
    desc: "Phân biệt dữ liệu – thông tin, chu trình xử lí và quy đổi đơn vị bit, byte, KB, MB, GB.",
    mcq: [
      {
        id: "l10-1-1-m1",
        prompt: "Trong tin học, phát biểu nào phân biệt đúng giữa dữ liệu và thông tin?",
        options: [
          "Dữ liệu là ý nghĩa rút ra, thông tin là các con số thô",
          "Dữ liệu là hình thức biểu diễn, thông tin là ý nghĩa có ích đối với con người",
          "Dữ liệu chỉ tồn tại trên giấy, thông tin chỉ tồn tại trong RAM",
          "Hai khái niệm hoàn toàn đồng nhất trong mọi ngữ cảnh",
        ],
        answer: 1,
        explain: "Dữ liệu là dạng biểu diễn (văn bản, số, ảnh, âm thanh); thông tin là hiểu biết, ý nghĩa rút ra sau xử lí.",
      },
      {
        id: "l10-1-1-m2",
        prompt: "1 Kilobyte (KB) bằng bao nhiêu byte theo quy ước nhị phân trong tin học?",
        options: ["1000 byte", "1024 byte", "512 byte", "2048 byte"],
        answer: 1,
        explain: "1 KB = 2^10 byte = 1024 byte.",
      },
      {
        id: "l10-1-1-m3",
        prompt: "Thứ tự đơn vị đo lượng dữ liệu tăng dần nào sau đây là đúng?",
        options: [
          "Bit → Byte → MB → KB → GB",
          "Byte → Bit → KB → MB → GB",
          "Bit → Byte → KB → MB → GB → TB",
          "KB → Byte → MB → GB → TB",
        ],
        answer: 2,
        explain: "1 byte = 8 bit, sau đó mỗi bậc lớn gấp 1024 lần bậc trước: KB → MB → GB → TB.",
      },
    ],
    truefalse: [
      {
        id: "l10-1-1-t1",
        prompt: "Đánh giá các nhận định sau về dữ liệu và thông tin:",
        statements: [
          { text: "1 byte gồm 8 bit, mỗi bit nhận một trong hai giá trị 0 hoặc 1.", answer: true },
          { text: "Dữ liệu đầu vào sai thì kết quả xử lí vẫn luôn chính xác nếu máy tính đủ mạnh.", answer: false },
          { text: "Cùng một dữ liệu có thể mang lại thông tin khác nhau cho những người khác nhau.", answer: true },
        ],
        explain: "Dữ liệu vào sai sẽ cho kết quả sai (Garbage In, Garbage Out).",
      },
      {
        id: "l10-1-1-t2",
        prompt: "Đánh giá các nhận định sau về đơn vị đo dữ liệu:",
        statements: [
          { text: "2 MB bằng 2048 KB.", answer: true },
          { text: "Đơn vị bit/giây (bps) dùng để đo dung lượng ổ cứng.", answer: false },
          { text: "Một bức ảnh chụp bằng điện thoại là một dạng dữ liệu đa phương tiện.", answer: true },
        ],
        explain: "bps là đơn vị đo tốc độ truyền dữ liệu, không phải dung lượng lưu trữ.",
      },
    ],
    short: [
      {
        id: "l10-1-1-s1",
        prompt: "Một tệp video có dung lượng 3 GB. Giá trị tương ứng tính theo MB là bao nhiêu?",
        answers: ["3072"],
        explain: "1 GB = 1024 MB nên 3 GB = 3 × 1024 = 3072 MB.",
      },
      {
        id: "l10-1-1-s2",
        prompt: "Hãy nêu ngắn gọn sự khác nhau cốt lõi giữa 'Dữ liệu' và 'Thông tin' theo SGK Kết nối tri thức.",
        answers: ["biểu diễn", "ý nghĩa", "hiểu biết"],
        explain: "Dữ liệu là dạng thể hiện/biểu diễn (ký hiệu, số, ảnh...), còn thông tin là ý nghĩa, hiểu biết con người thu được từ dữ liệu đó.",
      },
    ],
  },
  {
    id: "l10-1-2",
    grade: 10,
    chapterId: "l10-c1",
    title: "Bài 2: Sự ưu việt của máy tính và thành tựu của tin học",
    desc: "Ưu thế tốc độ, lưu trữ, độ chính xác của máy tính và các thành tựu tiêu biểu.",
    mcq: [
      {
        id: "l10-1-2-m1",
        prompt: "Điểm ưu việt nổi bật của máy tính so với con người là gì?",
        options: [
          "Có cảm xúc phong phú và trực giác nghệ thuật",
          "Tính toán cực nhanh, chính xác và làm việc bền bỉ liên tục",
          "Tự đặt ra mục tiêu sống độc lập",
          "Không cần chương trình vẫn tự giải mọi bài toán mới",
        ],
        answer: 1,
        explain: "Máy tính vượt trội về tốc độ xử lí, khả năng lưu trữ lớn và hoạt động liên tục không mệt mỏi.",
      },
      {
        id: "l10-1-2-m2",
        prompt: "Thành tựu nào gắn liền với sự ra đời của kỷ nguyên kết nối toàn cầu?",
        options: ["Bàn tính gẩy", "Mạng Internet và World Wide Web", "Máy đánh chữ cơ", "Băng cassette"],
        answer: 1,
        explain: "Internet và WWW giúp con người chia sẻ tri thức và giao tiếp toàn cầu tức thời.",
      },
      {
        id: "l10-1-2-m3",
        prompt: "Phát biểu nào sau đây đúng về giới hạn của máy tính?",
        options: [
          "Máy tính có thể thay thế hoàn toàn tư duy sáng tạo của con người",
          "Máy tính chỉ thực hiện chính xác theo thuật toán và chương trình con người thiết kế",
          "Máy tính tự có ý thức đạo đức",
          "Máy tính không bao giờ gặp lỗi phần cứng",
        ],
        answer: 1,
        explain: "Máy tính hoạt động dựa trên chương trình do con người tạo ra, thiếu cảm xúc và sáng tạo tự thân.",
      },
    ],
    truefalse: [
      {
        id: "l10-1-2-t1",
        prompt: "Đánh giá các nhận định sau về sự ưu việt của máy tính:",
        statements: [
          { text: "Máy tính có thể thực hiện hàng tỉ phép tính mỗi giây.", answer: true },
          { text: "Máy tính có thể tự cảm nhận niềm vui, nỗi buồn như con người.", answer: false },
          { text: "Khả năng lưu trữ của máy tính giúp số hóa cả thư viện sách vào một thiết bị nhỏ.", answer: true },
        ],
        explain: "Máy tính không có cảm xúc sinh học như con người.",
      },
      {
        id: "l10-1-2-t2",
        prompt: "Đánh giá các nhận định sau về thành tựu tin học:",
        statements: [
          { text: "Trí tuệ nhân tạo (AI) và Internet là những thành tựu lớn của tin học hiện đại.", answer: true },
          { text: "Tin học chỉ ứng dụng trong lĩnh vực toán học thuần túy.", answer: false },
          { text: "Công nghệ tự động hóa giúp giảm sức lao động chân tay nặng nhọc.", answer: true },
        ],
        explain: "Tin học ứng dụng rộng rãi trong y tế, giáo dục, nông nghiệp, công nghiệp, giao thông...",
      },
    ],
    short: [
      {
        id: "l10-1-2-s1",
        prompt: "Kể tên 2 thành tựu tiêu biểu của ngành Tin học hiện đại được nhắc trong bài.",
        answers: ["internet", "ai", "trí tuệ nhân tạo", "robot"],
        explain: "Ví dụ: Internet, Trí tuệ nhân tạo (AI), Robot tự động, Thực tế ảo (VR).",
      },
      {
        id: "l10-1-2-s2",
        prompt: "Vì sao máy tính không thể thay thế hoàn toàn vai trò của con người?",
        answers: ["sáng tạo", "cảm xúc", "chương trình"],
        explain: "Vì máy tính thiếu tư duy sáng tạo độc lập, cảm xúc, phán đoán đạo đức và vẫn phụ thuộc chương trình do con người xây dựng.",
      },
    ],
  },
  {
    id: "l10-1-3",
    grade: 10,
    chapterId: "l10-c1",
    title: "Bài 3: Máy tính trong đời sống và tin học với xã hội",
    desc: "Đô thị thông minh, xã hội tri thức, kỹ năng số và vấn đề khoảng cách số.",
    mcq: [
      {
        id: "l10-1-3-m1",
        prompt: "Khái niệm 'Khoảng cách số' (Digital Divide) dùng để chỉ điều gì?",
        options: [
          "Khoảng cách vật lí giữa hai máy chủ",
          "Sự chênh lệch về cơ hội tiếp cận và kỹ năng sử dụng công nghệ số",
          "Độ trễ đường truyền cáp quang",
          "Số lượng bit chênh lệch giữa IPv4 và IPv6",
        ],
        answer: 1,
        explain: "Khoảng cách số phản ánh sự bất bình đẳng giữa các nhóm dân cư/vùng miền trong việc tiếp cận CNTT.",
      },
      {
        id: "l10-1-3-m2",
        prompt: "Đô thị thông minh (Smart City) vận hành chủ yếu dựa vào công nghệ nào?",
        options: [
          "Cảm biến IoT, dữ liệu lớn và phân tích thông minh",
          "Chỉ dùng hệ thống loa phát thanh truyền thống",
          "Giấy tờ hành chính viết tay",
          "Ngắt kết nối Internet toàn thành phố",
        ],
        answer: 0,
        explain: "Đô thị thông minh dùng mạng lưới cảm biến thu thập dữ liệu giao thông, môi trường để tối ưu quản lí.",
      },
      {
        id: "l10-1-3-m3",
        prompt: "Ví dụ nào sau đây thể hiện mặt trái của việc lạm dụng thiết bị số?",
        options: [
          "Học trực tuyến mọi lúc mọi nơi",
          "Nghiện mạng xã hội, giảm giao tiếp trực tiếp và mỏi mắt",
          "Tra cứu tài liệu khoa học nhanh chóng",
          "Thanh toán không dùng tiền mặt tiện lợi",
        ],
        answer: 1,
        explain: "Sử dụng thiết bị số quá mức ảnh hưởng sức khỏe thể chất, tinh thần và giao tiếp xã hội.",
      },
    ],
    truefalse: [
      {
        id: "l10-1-3-t1",
        prompt: "Đánh giá các nhận định sau về tác động của Tin học:",
        statements: [
          { text: "Xã hội tri thức coi tri thức và thông tin là động lực phát triển chủ chốt.", answer: true },
          { text: "Mọi người ở vùng sâu vùng xa đều tiếp cận Internet tốc độ cao như nhau nên không có khoảng cách số.", answer: false },
          { text: "Kỹ năng số giúp công dân học tập và làm việc hiệu quả hơn.", answer: true },
        ],
        explain: "Khoảng cách số vẫn tồn tại giữa các khu vực địa lí và điều kiện kinh tế khác nhau.",
      },
      {
        id: "l10-1-3-t2",
        prompt: "Đánh giá các nhận định sau về ứng dụng tin học trong đời sống:",
        statements: [
          { text: "Hồ sơ bệnh án điện tử giúp bác sĩ tra cứu lịch sử khám nhanh chóng.", answer: true },
          { text: "Thương mại điện tử bắt buộc người mua phải đến trực tiếp cửa hàng trả tiền mặt.", answer: false },
          { text: "Hệ thống đèn giao thông thông minh có thể điều chỉnh nhịp đèn theo lưu lượng xe.", answer: true },
        ],
        explain: "Thương mại điện tử cho phép đặt hàng và thanh toán trực tuyến từ xa.",
      },
    ],
    short: [
      {
        id: "l10-1-3-s1",
        prompt: "Thuật ngữ chỉ sự chênh lệch về điều kiện tiếp cận công nghệ số giữa các vùng miền gọi là gì?",
        answers: ["khoảng cách số"],
        explain: "Đó là 'khoảng cách số' (Digital Divide).",
      },
      {
        id: "l10-1-3-s2",
        prompt: "Nêu 1 tác động tích cực và 1 tác động tiêu cực của Tin học đối với học sinh.",
        answers: ["học", "lệ thuộc", "nghiện", "tài liệu"],
        explain: "Tích cực: tra cứu tài liệu, học trực tuyến nhanh chóng. Tiêu cực: dễ xao nhãng, nghiện game/mạng xã hội nếu không kiểm soát thời gian.",
      },
    ],
  },
  {
    id: "l10-2-1",
    grade: 10,
    chapterId: "l10-c2",
    title: "Bài 4: Mạng máy tính: thành phần và phân loại",
    desc: "Thiết bị đầu cuối, Switch, Router, đường truyền và mạng LAN/WAN.",
    mcq: [
      {
        id: "l10-2-1-m1",
        prompt: "Mạng máy tính trong phạm vi một tòa nhà hoặc một trường học thuộc loại nào?",
        options: ["WAN", "LAN", "MAN toàn cầu", "PAN vệ tinh"],
        answer: 1,
        explain: "LAN (Local Area Network) là mạng cục bộ kết nối các thiết bị trong phạm vi địa lí hẹp.",
      },
      {
        id: "l10-2-1-m2",
        prompt: "Thiết bị nào giúp chuyển tiếp gói tin giữa mạng LAN và mạng Internet?",
        options: ["Switch", "Router", "Máy in mạng", "Chuột quang"],
        answer: 1,
        explain: "Router (bộ định tuyến) kết nối các mạng khác nhau và tìm đường đi cho gói tin.",
      },
      {
        id: "l10-2-1-m3",
        prompt: "Ưu điểm chính của kết nối có dây (cáp mạng) so với Wi-Fi là gì?",
        options: [
          "Dễ mang đi mọi nơi không cần dây",
          "Độ ổn định cao, ít bị nhiễu sóng hơn",
          "Không cần thiết bị phát",
          "Kết nối tự động không cần cắm cáp",
        ],
        answer: 1,
        explain: "Mạng có dây truyền tín hiệu ổn định và ít suy hao hơn mạng không dây.",
      },
    ],
    truefalse: [
      {
        id: "l10-2-1-t1",
        prompt: "Đánh giá các nhận định sau về thiết bị mạng:",
        statements: [
          { text: "Switch dùng để kết nối các máy tính trong cùng một mạng LAN.", answer: true },
          { text: "Modem và Router hoàn toàn giống nhau về chức năng.", answer: false },
          { text: "Cáp quang truyền dữ liệu bằng tín hiệu ánh sáng với tốc độ rất cao.", answer: true },
        ],
        explain: "Modem chuyển đổi tín hiệu từ nhà mạng, Router định tuyến chia sẻ kết nối mạng.",
      },
      {
        id: "l10-2-1-t2",
        prompt: "Đánh giá các nhận định sau về phân loại mạng:",
        statements: [
          { text: "Mạng diện rộng (WAN) kết nối nhiều mạng LAN trên phạm vi lớn.", answer: true },
          { text: "Điện thoại thông minh không thể làm thiết bị đầu cuối trong mạng.", answer: false },
          { text: "Giao thức mạng là tập hợp các quy tắc để các thiết bị giao tiếp được với nhau.", answer: true },
        ],
        explain: "Máy tính, điện thoại, máy in đều có thể là thiết bị đầu cuối trong mạng.",
      },
    ],
    short: [
      {
        id: "l10-2-1-s1",
        prompt: "Tên viết tắt tiếng Anh của mạng cục bộ là gì?",
        answers: ["lan"],
        explain: "LAN (Local Area Network).",
      },
      {
        id: "l10-2-1-s2",
        prompt: "Kể tên 4 thành phần cơ bản tạo nên một mạng máy tính.",
        answers: ["đầu cuối", "kết nối", "đường truyền", "giao thức"],
        explain: "Gồm: thiết bị đầu cuối, thiết bị kết nối, môi trường truyền dẫn (đường truyền) và giao thức mạng.",
      },
    ],
  },
  {
    id: "l10-2-2",
    grade: 10,
    chapterId: "l10-c2",
    title: "Bài 5: Internet, DNS và điện toán đám mây",
    desc: "Cơ chế phân giải tên miền DNS, địa chỉ IP và các dịch vụ đám mây.",
    mcq: [
      {
        id: "l10-2-2-m1",
        prompt: "Chức năng chính của hệ thống DNS trên Internet là gì?",
        options: [
          "Nén dữ liệu trước khi gửi",
          "Chuyển đổi tên miền dễ nhớ thành địa chỉ IP",
          "Diệt virus tự động",
          "Tăng dung lượng RAM máy chủ",
        ],
        answer: 1,
        explain: "DNS (Domain Name System) phân giải tên miền như moet.gov.vn sang địa chỉ IP số.",
      },
      {
        id: "l10-2-2-m2",
        prompt: "Bộ giao thức nền tảng giúp toàn bộ mạng Internet vận hành thống nhất là gì?",
        options: ["SMTP/POP3", "TCP/IP", "USB 3.0", "ASCII"],
        answer: 1,
        explain: "Internet hoạt động dựa trên bộ giao thức TCP/IP.",
      },
      {
        id: "l10-2-2-m3",
        prompt: "Dịch vụ Google Drive cho phép lưu trữ và chia sẻ tệp trực tuyến thuộc nhóm nào?",
        options: ["Mạng LAN nội bộ", "Điện toán đám mây", "Phần mềm hệ thống", "Phần cứng ngoại vi"],
        answer: 1,
        explain: "Google Drive là dịch vụ lưu trữ trên nền tảng điện toán đám mây.",
      },
    ],
    truefalse: [
      {
        id: "l10-2-2-t1",
        prompt: "Đánh giá các nhận định sau về Internet và DNS:",
        statements: [
          { text: "Địa chỉ IP giúp định danh duy nhất thiết bị tham gia Internet.", answer: true },
          { text: "Nếu không có DNS, người dùng không thể truy cập trang web ngay cả khi biết địa chỉ IP.", answer: false },
          { text: "Internet là mạng của các mạng, kết nối hàng tỉ thiết bị toàn cầu.", answer: true },
        ],
        explain: "Nếu biết chính xác địa chỉ IP, trình duyệt vẫn truy cập được máy chủ mà không cần phân giải tên miền.",
      },
      {
        id: "l10-2-2-t2",
        prompt: "Đánh giá các nhận định sau về điện toán đám mây:",
        statements: [
          { text: "Người dùng có thể mở rộng tài nguyên lưu trữ đám mây linh hoạt theo nhu cầu.", answer: true },
          { text: "Dịch vụ đám mây hoạt động bình thường kể cả khi mất kết nối Internet hoàn toàn.", answer: false },
          { text: "Người dùng giảm được chi phí đầu tư máy chủ vật lí ban đầu.", answer: true },
        ],
        explain: "Điện toán đám mây phụ thuộc vào đường truyền mạng Internet.",
      },
    ],
    short: [
      {
        id: "l10-2-2-s1",
        prompt: "Hệ thống phân giải tên miền thành địa chỉ IP viết tắt là gì?",
        answers: ["dns"],
        explain: "DNS (Domain Name System).",
      },
      {
        id: "l10-2-2-s2",
        prompt: "Nêu 1 ưu điểm và 1 hạn chế của dịch vụ điện toán đám mây.",
        answers: ["linh hoạt", "tiết kiệm", "internet", "bảo mật"],
        explain: "Ưu điểm: truy cập mọi nơi, linh hoạt chi phí. Hạn chế: phụ thuộc kết nối Internet và cần chú ý bảo mật dữ liệu.",
      },
    ],
  },
  {
    id: "l10-2-3",
    grade: 10,
    chapterId: "l10-c2",
    title: "Bài 6: Thư điện tử và ứng dụng web",
    desc: "Cấu trúc địa chỉ email, giao thức SMTP/POP3/IMAP và dịch vụ Web.",
    mcq: [
      {
        id: "l10-2-3-m1",
        prompt: "Giao thức nào được dùng để GỬI thư điện tử từ máy khách lên máy chủ?",
        options: ["POP3", "IMAP", "SMTP", "FTP"],
        answer: 2,
        explain: "SMTP (Simple Mail Transfer Protocol) đảm nhận việc gửi và chuyển tiếp email.",
      },
      {
        id: "l10-2-3-m2",
        prompt: "Địa chỉ thư điện tử nào sau đây đúng cú pháp?",
        options: ["hocsinh.tinhoc.vn", "hocsinh@tinhoc.vn", "@tinhoc.vn", "hocsinh@@gmail.com"],
        answer: 1,
        explain: "Địa chỉ email hợp lệ có cấu trúc <tên_người_dùng>@<tên_miền>.",
      },
      {
        id: "l10-2-3-m3",
        prompt: "Giao thức giúp truyền tải trang web an toàn có mã hóa là gì?",
        options: ["HTTP", "HTTPS", "Telnet", "UDP"],
        answer: 1,
        explain: "HTTPS kết hợp HTTP và lớp bảo mật SSL/TLS để mã hóa dữ liệu trao đổi.",
      },
    ],
    truefalse: [
      {
        id: "l10-2-3-t1",
        prompt: "Đánh giá các nhận định sau về thư điện tử:",
        statements: [
          { text: "Email cho phép đính kèm nhiều loại tệp như văn bản, hình ảnh, bảng tính.", answer: true },
          { text: "POP3 và IMAP đều là giao thức dùng để gửi thư đi.", answer: false },
          { text: "Một bức thư có thể gửi đồng thời cho nhiều người nhận qua Cc hoặc Bcc.", answer: true },
        ],
        explain: "POP3 và IMAP dùng để nhận thư về từ hộp thư trên máy chủ.",
      },
      {
        id: "l10-2-3-t2",
        prompt: "Đánh giá các nhận định sau về ứng dụng Web:",
        statements: [
          { text: "Web 2.0 cho phép người dùng tương tác và tự đóng góp nội dung.", answer: true },
          { text: "Trình duyệt web chỉ chạy được trên máy tính để bàn.", answer: false },
          { text: "URL là địa chỉ định vị duy nhất một tài nguyên trên Web.", answer: true },
        ],
        explain: "Trình duyệt web chạy trên cả điện thoại, máy tính bảng, TV thông minh...",
      },
    ],
    short: [
      {
        id: "l10-2-3-s1",
        prompt: "Viết tên giao thức dùng để gửi thư điện tử (3 hoặc 4 chữ cái).",
        answers: ["smtp"],
        explain: "SMTP (Simple Mail Transfer Protocol).",
      },
      {
        id: "l10-2-3-s2",
        prompt: "Phân biệt nhanh chức năng của Cc và Bcc khi gửi email.",
        answers: ["ẩn", "bảo mật", "nhìn thấy"],
        explain: "Cc cho phép mọi người nhận nhìn thấy địa chỉ của nhau; Bcc ẩn danh sách địa chỉ người nhận khác để giữ riêng tư.",
      },
    ],
  },
  {
    id: "l10-3-1",
    grade: 10,
    chapterId: "l10-c3",
    title: "Bài 7: Ứng xử văn minh trên mạng",
    desc: "Chuẩn mực giao tiếp, kiểm chứng tin giả và xử lí tình huống bắt nạt mạng.",
    mcq: [
      {
        id: "l10-3-1-m1",
        prompt: "Khi đọc được một tin tức gây sốc chưa rõ nguồn gốc trên mạng xã hội, em nên làm gì?",
        options: [
          "Chia sẻ ngay lập tức để cảnh báo mọi người",
          "Kiểm chứng từ các trang báo chí, cơ quan chính thống trước khi tin hoặc chia sẻ",
          "Bình luận công kích người viết",
          "Chỉnh sửa thêm chi tiết cho hấp dẫn hơn",
        ],
        answer: 1,
        explain: "Kiểm chứng nguồn tin giúp ngăn chặn phát tán tin giả (fake news).",
      },
      {
        id: "l10-3-1-m2",
        prompt: "Hành vi nào thể hiện văn hóa ứng xử lịch sự trên không gian mạng?",
        options: [
          "Dùng ngôn từ tôn trọng, lắng nghe quan điểm khác biệt",
          "Chụp ảnh màn hình tin nhắn riêng tư bêu xấu người khác",
          "Lập tài khoản ảo để bình luận khiêu khích",
          "Thả biểu tượng chế giễu bài viết của bạn cùng lớp",
        ],
        answer: 0,
        explain: "Giao tiếp văn minh đòi hỏi thái độ tôn trọng, lịch sự và có trách nhiệm với phát ngôn.",
      },
      {
        id: "l10-3-1-m3",
        prompt: "Cách ứng phó an toàn khi bị kẻ lạ đe dọa, quấy rối qua mạng là gì?",
        options: [
          "Chụp lại bằng chứng, chặn liên hệ, báo cáo nền tảng và báo cho thầy cô/phụ huynh",
          "Chửi trả lại gay gắt hơn",
          "Gửi số điện thoại và địa chỉ nhà cho kẻ đó",
          "Im lặng chịu đựng một mình",
        ],
        answer: 0,
        explain: "Lưu giữ bằng chứng và tìm sự hỗ trợ từ người lớn, cơ quan chức năng là biện pháp an toàn nhất.",
      },
    ],
    truefalse: [
      {
        id: "l10-3-1-t1",
        prompt: "Đánh giá các nhận định sau về ứng xử trên mạng:",
        statements: [
          { text: "Mọi phát ngôn trên không gian mạng đều phải chịu trách nhiệm trước pháp luật.", answer: true },
          { text: "Dùng tài khoản ẩn danh thì không thể bị xử lí nếu tung tin sai sự thật.", answer: false },
          { text: "Không nên tham gia bình luận hùa theo các trào lưu công kích cá nhân.", answer: true },
        ],
        explain: "Cơ quan chức năng có thể truy vết danh tính thật ngay cả với tài khoản ẩn danh.",
      },
      {
        id: "l10-3-1-t2",
        prompt: "Đánh giá các nhận định sau về tin giả:",
        statements: [
          { text: "Tin giả thường dùng tiêu đề giật gân để câu lượt xem và chia sẻ.", answer: true },
          { text: "Tin nào có nhiều lượt thích (like) chắc chắn là tin thật.", answer: false },
          { text: "Cần đối chiếu nhiều nguồn tin uy tín trước khi kết luận.", answer: true },
        ],
        explain: "Số lượt thích có thể bị thao túng hoặc do người dùng chưa kiểm chứng bấm vào.",
      },
    ],
    short: [
      {
        id: "l10-3-1-s1",
        prompt: "Cụm từ tiếng Việt chỉ thông tin sai sự thật được cố ý lan truyền trên mạng là gì?",
        answers: ["tin giả"],
        explain: "Đó là 'tin giả' (Fake news).",
      },
      {
        id: "l10-3-1-s2",
        prompt: "Nêu 3 bước em cần làm khi phát hiện bị quấy rối trên mạng xã hội.",
        answers: ["bằng chứng", "chặn", "báo"],
        explain: "1. Chụp màn hình lưu bằng chứng; 2. Chặn và báo cáo tài khoản xấu; 3. Báo ngay cho cha mẹ, thầy cô hoặc cơ quan chức năng.",
      },
    ],
  },
  {
    id: "l10-3-2",
    grade: 10,
    chapterId: "l10-c3",
    title: "Bài 8: Bảo vệ thông tin cá nhân và bản quyền",
    desc: "An toàn dữ liệu cá nhân (CCCD, mật khẩu, 2FA) và tôn trọng quyền tác giả.",
    mcq: [
      {
        id: "l10-3-2-m1",
        prompt: "Thông tin nào sau đây thuộc dữ liệu cá nhân nhạy cảm cần bảo mật nghiêm ngặt?",
        options: [
          "Số Căn cước công dân và mật khẩu ngân hàng",
          "Lịch thi tốt nghiệp THPT chung toàn quốc",
          "Tên sách giáo khoa Tin học 10",
          "Dự báo thời tiết cuối tuần",
        ],
        answer: 0,
        explain: "Số CCCD, tài khoản ngân hàng, mật khẩu gắn trực tiếp với danh tính và tài sản cá nhân.",
      },
      {
        id: "l10-3-2-m2",
        prompt: "Biện pháp nào tăng cường bảo mật tài khoản ngay cả khi bị lộ mật khẩu?",
        options: [
          "Đặt mật khẩu là ngày sinh",
          "Bật xác thực hai bước (2FA)",
          "Dùng cùng một mật khẩu cho mọi trang web",
          "Lưu mật khẩu công khai trên Facebook",
        ],
        answer: 1,
        explain: "2FA yêu cầu thêm mã OTP hoặc khóa xác nhận thứ hai khi đăng nhập.",
      },
      {
        id: "l10-3-2-m3",
        prompt: "Khi sử dụng hình ảnh của tác giả khác vào bài thuyết trình học tập, cần làm gì để tôn trọng bản quyền?",
        options: [
          "Xóa tên tác giả và ghi tên mình",
          "Ghi rõ nguồn gốc và tên tác giả (trích dẫn hợp lệ)",
          "Đem bán lấy tiền không cần xin phép",
          "Cắt ghép làm sai lệch nội dung gốc",
        ],
        answer: 1,
        explain: "Cần trích dẫn nguồn đầy đủ và tuân thủ giấy phép sử dụng của tác phẩm.",
      },
    ],
    truefalse: [
      {
        id: "l10-3-2-t1",
        prompt: "Đánh giá các nhận định sau về bảo vệ thông tin cá nhân:",
        statements: [
          { text: "Mật khẩu mạnh nên kết hợp chữ hoa, chữ thường, số và kí tự đặc biệt.", answer: true },
          { text: "Có thể bấm vào mọi đường link nhận thưởng qua tin nhắn lạ để kiểm tra.", answer: false },
          { text: "Không nên đăng ảnh thẻ căn cước, vé máy bay có mã QR lên mạng công khai.", answer: true },
        ],
        explain: "Đường link lạ có thể là bẫy Phishing đánh cắp thông tin và chiếm quyền tài khoản.",
      },
      {
        id: "l10-3-2-t2",
        prompt: "Đánh giá các nhận định sau về bản quyền số:",
        statements: [
          { text: "Mã nguồn phần mềm cũng là đối tượng được pháp luật bảo hộ quyền tác giả.", answer: true },
          { text: "Tài liệu tìm thấy miễn phí trên Google đồng nghĩa được phép bán lại thương mại.", answer: false },
          { text: "Nghị định 13/2023/NĐ-CP quy định về bảo vệ dữ liệu cá nhân tại Việt Nam.", answer: true },
        ],
        explain: "Tài liệu công khai trên mạng vẫn thuộc quyền sở hữu của tác giả hoặc nhà xuất bản.",
      },
    ],
    short: [
      {
        id: "l10-3-2-s1",
        prompt: "Cơ chế xác thực hai lớp viết tắt bằng tiếng Anh là gì?",
        answers: ["2fa"],
        explain: "2FA (Two-Factor Authentication).",
      },
      {
        id: "l10-3-2-s2",
        prompt: "Nêu 2 nguyên tắc đặt mật khẩu an toàn cho tài khoản cá nhân.",
        answers: ["dài", "kí tự", "trùng"],
        explain: "Mật khẩu đủ dài (từ 8-12 kí tự trở lên), kết hợp chữ hoa/thường/số/kí tự đặc biệt, không dùng chung giữa các tài khoản quan trọng.",
      },
    ],
  },
  {
    id: "l10-4-1",
    grade: 10,
    chapterId: "l10-c4",
    title: "Bài 9: Thuật toán và mô tả thuật toán",
    desc: "Tính chất của thuật toán, phương pháp liệt kê và quy ước hình khối sơ đồ khối.",
    mcq: [
      {
        id: "l10-4-1-m1",
        prompt: "Trong sơ đồ khối (Flowchart), hình thoi biểu diễn thao tác nào?",
        options: ["Bắt đầu / Kết thúc", "Nhập / Xuất dữ liệu", "Kiểm tra điều kiện (Rẽ nhánh)", "Tính toán gán giá trị"],
        answer: 2,
        explain: "Hình thoi biểu diễn điều kiện rẽ nhánh; hình chữ nhật là xử lí; hình bình hành là nhập/xuất.",
      },
      {
        id: "l10-4-1-m2",
        prompt: "Tính chất nào bắt buộc một thuật toán phải kết thúc sau hữu hạn bước?",
        options: ["Tính dừng", "Tính ngẫu nhiên", "Tính vô hạn", "Tính đối xứng"],
        answer: 0,
        explain: "Thuật toán phải có tính dừng, tính xác định, đầu vào, đầu ra và tính đúng đắn.",
      },
      {
        id: "l10-4-1-m3",
        prompt: "Ba cách phổ biến để mô tả thuật toán là gì?",
        options: [
          "Liệt kê các bước, sơ đồ khối, ngôn ngữ lập trình",
          "Vẽ tranh, hát, kể chuyện",
          "Bảng tính Excel, Word, PowerPoint",
          "Chỉ dùng duy nhất mã máy 0 và 1",
        ],
        answer: 0,
        explain: "Thuật toán thường được mô tả bằng liệt kê từng bước (ngôn ngữ tự nhiên), sơ đồ khối hoặc viết bằng ngôn ngữ lập trình.",
      },
    ],
    truefalse: [
      {
        id: "l10-4-1-t1",
        prompt: "Đánh giá các nhận định sau về thuật toán:",
        statements: [
          { text: "Mỗi bước trong thuật toán phải rõ ràng, đơn nghĩa (tính xác định).", answer: true },
          { text: "Một vòng lặp chạy mãi mãi không thoát ra vẫn được xem là thuật toán chuẩn.", answer: false },
          { text: "Hình chữ nhật trong sơ đồ khối dùng cho các phép tính và gán giá trị.", answer: true },
        ],
        explain: "Thuật toán bắt buộc phải dừng sau hữu hạn bước.",
      },
      {
        id: "l10-4-1-t2",
        prompt: "Đánh giá các nhận định sau về bài toán và thuật toán:",
        statements: [
          { text: "Một bài toán có thể có nhiều thuật toán khác nhau để giải.", answer: true },
          { text: "Hình ô-van (elip) dùng để biểu diễn thao tác nhập dữ liệu.", answer: false },
          { text: "Thuật toán cần cho ra kết quả đúng với mọi bộ dữ liệu đầu vào hợp lệ.", answer: true },
        ],
        explain: "Hình ô-van biểu diễn điểm Bắt đầu / Kết thúc; hình bình hành mới dùng cho Nhập / Xuất.",
      },
    ],
    short: [
      {
        id: "l10-4-1-s1",
        prompt: "Trong sơ đồ khối, hình gì dùng để biểu diễn thao tác kiểm tra điều kiện?",
        answers: ["hình thoi", "thoi"],
        explain: "Hình thoi biểu diễn khối kiểm tra điều kiện Đúng/Sai.",
      },
      {
        id: "l10-4-1-s2",
        prompt: "Kể tên 3 cấu trúc điều khiển cơ bản trong mọi thuật toán.",
        answers: ["tuần tự", "rẽ nhánh", "lặp"],
        explain: "Ba cấu trúc cơ bản là: Tuần tự, Rẽ nhánh (lựa chọn) và Lặp.",
      },
    ],
  },
  {
    id: "l10-4-2",
    grade: 10,
    chapterId: "l10-c4",
    title: "Bài 10: Biến, kiểu dữ liệu và nhập xuất trong Python",
    desc: "Quy tắc đặt tên biến, kiểu int/float/str/bool, lệnh input() và print().",
    mcq: [
      {
        id: "l10-4-2-m1",
        prompt: "Tên biến nào sau đây HỢP LỆ trong Python?",
        options: ["2diem_thi", "diem-thi", "diem_thi_1", "class"],
        answer: 2,
        explain: "Tên biến không được bắt đầu bằng số, không chứa dấu gạch ngang (-) và không trùng từ khóa (class).",
      },
      {
        id: "l10-4-2-m2",
        prompt: "Hàm input() trong Python luôn trả về dữ liệu thuộc kiểu nào?",
        options: ["int", "float", "str", "bool"],
        answer: 2,
        explain: "input() luôn trả về kiểu xâu kí tự (str); cần ép kiểu int() hoặc float() nếu muốn tính toán số học.",
      },
      {
        id: "l10-4-2-m3",
        prompt: "Kết quả của phép tính `17 // 5` và `17 % 5` trong Python lần lượt là gì?",
        options: ["3.4 và 2", "3 và 2", "3 và 3", "4 và 2"],
        answer: 1,
        explain: "// chia lấy phần nguyên (17 // 5 = 3), % chia lấy phần dư (17 % 5 = 2).",
      },
    ],
    truefalse: [
      {
        id: "l10-4-2-t1",
        prompt: "Đánh giá các nhận định sau về biến và kiểu dữ liệu Python:",
        statements: [
          { text: "Python phân biệt chữ hoa và chữ thường (ví dụ `Tuoi` khác `tuoi`).", answer: true },
          { text: "Lệnh `x = input()` cho `x = 10` khi người dùng gõ 10, nên `x + 5` ra `15`.", answer: false },
          { text: "Hàm `int('25')` chuyển xâu `'25'` thành số nguyên `25`.", answer: true },
        ],
        explain: "input() trả về xâu '10', nên '10' + 5 sẽ gây TypeError nếu không ép kiểu int().",
      },
      {
        id: "l10-4-2-t2",
        prompt: "Đánh giá các nhận định sau về phép toán Python:",
        statements: [
          { text: "Phép toán `2 ** 3` cho kết quả là 8.", answer: true },
          { text: "Phép chia `/` luôn trả về số nguyên nếu chia hết.", answer: false },
          { text: "Lệnh `print('A', 'B', sep='-')` in ra `A-B`.", answer: true },
        ],
        explain: "Phép chia `/` trong Python 3 luôn trả về kiểu số thực float (ví dụ 8 / 2 = 4.0).",
      },
    ],
    short: [
      {
        id: "l10-4-2-s1",
        prompt: "Cho x = 23, y = 5. Kết quả của `print(x // y + x % y)` là bao nhiêu?",
        answers: ["7"],
        explain: "23 // 5 = 4; 23 % 5 = 3. Tổng 4 + 3 = 7.",
      },
      {
        id: "l10-4-2-s2",
        prompt: "Viết 1 dòng lệnh Python nhập một số nguyên từ bàn phím và gán cho biến `n`.",
        answers: ["n = int(input())", "int(input("],
        explain: "Cú pháp chuẩn: `n = int(input())` (có thể kèm chuỗi nhắc bên trong input).",
      },
    ],
  },
  {
    id: "l10-4-3",
    grade: 10,
    chapterId: "l10-c4",
    title: "Bài 11: Câu lệnh rẽ nhánh trong Python",
    desc: "Cấu trúc if, if-else, if-elif-else, quy tắc thụt lề và biểu thức logic.",
    mcq: [
      {
        id: "l10-4-3-m1",
        prompt: "Từ khóa nào dùng cho nhánh điều kiện phụ (ngược lại nếu) trong Python?",
        options: ["else if", "elseif", "elif", "if else"],
        answer: 2,
        explain: "Python dùng từ khóa viết gọn `elif`.",
      },
      {
        id: "l10-4-3-m2",
        prompt: "Với x = 7, đoạn lệnh `if x > 10: y = 1` / `elif x >= 5: y = 2` / `else: y = 3` cho `y` bằng mấy?",
        options: ["1", "2", "3", "Lỗi cú pháp"],
        answer: 1,
        explain: "7 > 10 sai, chuyển sang elif 7 >= 5 đúng nên y = 2.",
      },
      {
        id: "l10-4-3-m3",
        prompt: "Biểu thức điều kiện nào kiểm tra `n` vừa là số chẵn vừa lớn hơn 0?",
        options: ["n % 2 == 0 or n > 0", "n % 2 == 0 and n > 0", "n // 2 == 0 and n > 0", "n % 2 = 0 and n > 0"],
        answer: 1,
        explain: "Phép so sánh bằng dùng `==`, kết hợp đồng thời dùng toán tử `and`.",
      },
    ],
    truefalse: [
      {
        id: "l10-4-3-t1",
        prompt: "Đánh giá các nhận định sau về câu lệnh rẽ nhánh Python:",
        statements: [
          { text: "Các lệnh bên trong khối `if` bắt buộc phải thụt lề thẳng hàng nhau.", answer: true },
          { text: "Sau điều kiện của `if` không cần dấu hai chấm `:`.", answer: false },
          { text: "Toán tử `!=` dùng để kiểm tra hai giá trị khác nhau.", answer: true },
        ],
        explain: "Cú pháp chuẩn Python bắt buộc có dấu hai chấm `:` ở cuối dòng `if`, `elif`, `else`.",
      },
      {
        id: "l10-4-3-t2",
        prompt: "Đánh giá các biểu thức logic với a = 4, b = 9:",
        statements: [
          { text: "`a < 5 and b > 10` có giá trị là False.", answer: true },
          { text: "`a < 5 or b > 10` có giá trị là True.", answer: true },
          { text: "`not (a == 4)` có giá trị là True.", answer: false },
        ],
        explain: "a == 4 là True nên `not (a == 4)` là False.",
      },
    ],
    short: [
      {
        id: "l10-4-3-s1",
        prompt: "Cho a = 8, b = 12. Đoạn code: `if a > b: m = a` / `else: m = b * 2`. Giá trị của `m` là bao nhiêu?",
        answers: ["24"],
        explain: "Vì 8 > 12 sai nên thực hiện nhánh else: m = 12 * 2 = 24.",
      },
      {
        id: "l10-4-3-s2",
        prompt: "Viết đoạn lệnh Python kiểm tra biến `n`: nếu `n % 2 == 0` thì in 'Chan', ngược lại in 'Le'.",
        answers: ["if n % 2 == 0:", "else:"],
        explain: "if n % 2 == 0:\n    print('Chan')\nelse:\n    print('Le')",
      },
    ],
  },
  {
    id: "l10-4-4",
    grade: 10,
    chapterId: "l10-c4",
    title: "Bài 12: Vòng lặp for và while trong Python",
    desc: "Hàm range(), lặp for với số lần biết trước, lặp while theo điều kiện, break/continue.",
    mcq: [
      {
        id: "l10-4-4-m1",
        prompt: "Lệnh `for i in range(2, 10, 2):` sẽ cho biến `i` nhận những giá trị nào?",
        options: ["2, 4, 6, 8, 10", "2, 4, 6, 8", "2, 3, 4, 5, 6, 7, 8, 9", "0, 2, 4, 6, 8"],
        answer: 1,
        explain: "range(2, 10, 2) bắt đầu từ 2, bước nhảy 2, dừng trước 10 -> [2, 4, 6, 8].",
      },
      {
        id: "l10-4-4-m2",
        prompt: "Lệnh nào dùng để thoát ngay lập tức khỏi vòng lặp đang chạy?",
        options: ["stop", "exit", "break", "continue"],
        answer: 2,
        explain: "`break` thoát hẳn khỏi vòng lặp; `continue` chỉ bỏ qua phần còn lại của lần lặp hiện tại.",
      },
      {
        id: "l10-4-4-m3",
        prompt: "Khi không biết trước chính xác số lần lặp mà lặp đến khi điều kiện sai, ta ưu tiên dùng lệnh nào?",
        options: ["for", "while", "if", "def"],
        answer: 1,
        explain: "Vòng lặp `while` phù hợp khi số lần lặp phụ thuộc một điều kiện động.",
      },
    ],
    truefalse: [
      {
        id: "l10-4-4-t1",
        prompt: "Đánh giá các nhận định sau về vòng lặp trong Python:",
        statements: [
          { text: "`range(5)` sinh ra các số nguyên từ 0 đến 4 (5 số).", answer: true },
          { text: "Vòng lặp `while True:` sẽ tự động dừng sau 100 lần chạy.", answer: false },
          { text: "Lệnh `continue` nhảy sang bước lặp kế tiếp của vòng lặp.", answer: true },
        ],
        explain: "`while True:` lặp vô hạn nếu bên trong không có lệnh `break` hoặc thoát.",
      },
      {
        id: "l10-4-4-t2",
        prompt: "Cho đoạn mã: `s = 0` / `for i in range(1, 5): s += i`. Đánh giá các nhận định:",
        statements: [
          { text: "Vòng lặp chạy tổng cộng 4 lần.", answer: true },
          { text: "Giá trị biến `s` sau vòng lặp bằng 15.", answer: false },
          { text: "Ở lần lặp cuối cùng, biến `i` có giá trị bằng 4.", answer: true },
        ],
        explain: "range(1, 5) gồm 1, 2, 3, 4 nên tổng s = 1 + 2 + 3 + 4 = 10.",
      },
    ],
    short: [
      {
        id: "l10-4-4-s1",
        prompt: "Cho `k = 1` / `while k < 10: k = k * 2`. Giá trị của `k` sau khi vòng lặp kết thúc là bao nhiêu?",
        answers: ["16"],
        explain: "k lần lượt là 1 -> 2 -> 4 -> 8 -> 16. Khi k = 16, điều kiện 16 < 10 sai nên dừng.",
      },
      {
        id: "l10-4-4-s2",
        prompt: "Viết vòng lặp `for` tính tổng các số chẵn từ 2 đến 10 trong Python.",
        answers: ["range(2, 11, 2)", "range(2,11,2)", "i % 2 == 0"],
        explain: "s = 0\nfor i in range(2, 11, 2):\n    s += i\nprint(s)",
      },
    ],
  },
];
