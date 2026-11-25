export interface LessonItem {
  id: string;
  title: string;
  minutes: number;
  tags: string[];
  bullets: string[];
  note: string;
}

export interface ChapterItem {
  id: string;
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
      "Hiểu máy tính – dữ liệu – thông tin, làm quen mạng Internet và viết những chương trình Python đầu tiên.",
    intro:
      "Lớp 10 đặt nền móng: hiểu dữ liệu – thông tin – máy tính, làm quen mạng Internet, rèn đạo đức số và viết những chương trình Python đầu tiên.",
    sgk: "https://drive.google.com/file/d/1HvQfS8mA9jZ3-4VunxAxHy7hKqAZkm46/view?usp=sharing",
    chapters: [
      {
        id: "l10-c1",
        title: "Máy tính và xã hội tri thức",
        desc: "Dữ liệu, thông tin, xử lí thông tin và vai trò của máy tính trong đời sống.",
        practiceId: "p10-1",
        lessons: [
          {
            id: "l10-1-1",
            title: "Dữ liệu, thông tin và xử lí thông tin",
            minutes: 25,
            tags: ["dữ liệu", "thông tin", "bit", "byte"],
            bullets: [
              "Thông tin là những hiểu biết về thế giới; dữ liệu là dạng biểu diễn của thông tin (văn bản, số, hình ảnh, âm thanh).",
              "Máy tính biến dữ liệu thành thông tin hữu ích; dữ liệu vào sai thì kết quả ra cũng sai.",
              "Dữ liệu số lưu bằng bit: 1 byte = 8 bit; 1 KB = 1024 B, tiếp theo là MB, GB, TB.",
            ],
            note: "Đề hay hỏi phân biệt dữ liệu (cách biểu diễn) với thông tin (ý nghĩa) và đổi đơn vị 1 KB = 1024 B.",
          },
          {
            id: "l10-1-2",
            title: "Sự ưu việt của máy tính và thành tựu của tin học",
            minutes: 20,
            tags: ["ưu việt máy tính", "thành tựu tin học", "tự động hoá"],
            bullets: [
              "Máy tính tính toán nhanh, chính xác, lưu trữ lớn và làm việc liên tục không mệt mỏi.",
              "Thành tựu tiêu biểu: máy tính điện tử, Internet, trí tuệ nhân tạo, robot, thực tế ảo.",
              "Máy tính không thay thế hoàn toàn con người: nó thiếu tư duy sáng tạo và cảm xúc.",
            ],
            note: "Khi hỏi máy tính ưu việt hơn con người ở đâu, hãy loại phương án nói máy tính có cảm xúc, sáng tạo.",
          },
          {
            id: "l10-1-3",
            title: "Máy tính trong đời sống và tin học với xã hội",
            minutes: 20,
            tags: ["đô thị thông minh", "kĩ năng số", "khoảng cách số"],
            bullets: [
              "Tin học có mặt trong giáo dục, y tế, giao thông, thương mại và giải trí.",
              "Đô thị thông minh dùng cảm biến và dữ liệu lớn để điều hành đời sống đô thị.",
              "Khoảng cách số là chênh lệch về khả năng tiếp cận và sử dụng công nghệ.",
            ],
            note: "Câu hỏi khái niệm thường nhắm vào khoảng cách số và tác động hai mặt của tin học.",
          },
        ],
      },
      {
        id: "l10-c2",
        title: "Mạng máy tính và Internet",
        desc: "Thành phần, phân loại mạng; Internet, điện toán đám mây, thư điện tử và ứng dụng web.",
        practiceId: "p10-2",
        lessons: [
          {
            id: "l10-2-1",
            title: "Mạng máy tính: thành phần và phân loại",
            minutes: 25,
            tags: ["mạng máy tính", "LAN", "WAN"],
            bullets: [
              "Thành phần mạng: thiết bị đầu cuối, thiết bị kết nối (switch, router), đường truyền, giao thức.",
              "Theo phạm vi có mạng cục bộ LAN và mạng diện rộng WAN; theo kiểu kết nối có có dây và không dây.",
              "Mạng có dây ổn định hơn, mạng không dây linh hoạt hơn.",
            ],
            note: "Đừng nhầm router với modem: router chia sẻ mạng, modem đưa tín hiệu ra đường truyền của nhà cung cấp.",
          },
          {
            id: "l10-2-2",
            title: "Internet, DNS và điện toán đám mây",
            minutes: 25,
            tags: ["Internet", "DNS", "điện toán đám mây"],
            bullets: [
              "Internet là mạng toàn cầu kết nối các mạng máy tính, dùng bộ giao thức TCP/IP.",
              "DNS phân giải tên miền thành địa chỉ IP; hệ thống máy chủ DNS hoạt động theo cấp.",
              "Điện toán đám mây cung cấp tài nguyên tính toán qua mạng, trả phí theo mức dùng.",
            ],
            note: "Dạng câu hỏi quen thuộc: tên miền là phần chữ, địa chỉ IP là dãy số.",
          },
          {
            id: "l10-2-3",
            title: "Thư điện tử và ứng dụng web",
            minutes: 20,
            tags: ["email", "SMTP", "web"],
            bullets: [
              "Thư điện tử gồm người gửi, người nhận, tiêu đề, nội dung và tệp đính kèm; địa chỉ có dạng ten@tenmien.",
              "Thư được chuyển qua máy chủ SMTP và lưu ở máy chủ POP3/IMAP.",
              "Web 2.0 cho phép người dùng tạo nội dung; dịch vụ web chạy trên giao thức HTTP/HTTPS.",
            ],
            note: "Nhớ: SMTP để gửi thư, POP3/IMAP để nhận thư.",
          },
        ],
      },
      {
        id: "l10-c3",
        title: "Đạo đức, pháp luật và văn hoá trong môi trường số",
        desc: "Ứng xử văn minh trên mạng, bảo vệ thông tin cá nhân và tôn trọng bản quyền.",
        practiceId: "p10-3",
        lessons: [
          {
            id: "l10-3-1",
            title: "Ứng xử văn minh trên mạng",
            minutes: 20,
            tags: ["ứng xử số", "tin giả"],
            bullets: [
              "Tôn trọng người khác khi bình luận; không dùng lời lẽ xúc phạm hay kích động.",
              "Không tung tin sai lệch; kiểm tra nguồn trước khi chia sẻ.",
              "Hành vi thiếu văn hoá trên mạng cũng có thể vi phạm pháp luật.",
            ],
            note: "Câu hỏi tình huống nên chọn phương án báo cáo nội dung xấu chứ không đối đáp lại.",
          },
          {
            id: "l10-3-2",
            title: "Bảo vệ thông tin cá nhân và bản quyền",
            minutes: 25,
            tags: ["thông tin cá nhân", "bản quyền"],
            bullets: [
              "Thông tin cá nhân gồm họ tên, số điện thoại, số CCCD, tài khoản và ảnh cá nhân.",
              "Dùng mật khẩu mạnh, bật xác thực hai lớp, không chia sẻ tài khoản cho người khác.",
              "Tôn trọng bản quyền: xin phép và trích dẫn nguồn khi dùng tác phẩm của người khác.",
            ],
            note: "Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân thường được nhắc trong phần đọc hiểu.",
          },
        ],
      },
      {
        id: "l10-c4",
        title: "Giải quyết vấn đề với sự trợ giúp của máy tính",
        desc: "Thuật toán và lập trình Python: biến, rẽ nhánh, vòng lặp, hàm.",
        practiceId: "p10-4",
        lessons: [
          {
            id: "l10-4-1",
            title: "Thuật toán và mô tả thuật toán",
            minutes: 25,
            tags: ["thuật toán", "sơ đồ khối"],
            bullets: [
              "Thuật toán là dãy hữu hạn các bước rõ ràng để giải một bài toán.",
              "Ba cách mô tả: liệt kê từng bước, sơ đồ khối, ngôn ngữ lập trình.",
              "Thuật toán phải có đầu vào, đầu ra, tính xác định và tính dừng.",
            ],
            note: "Sơ đồ khối: hình chữ nhật là xử lí, hình thoi là điều kiện, hình bình hành là nhập/xuất.",
          },
          {
            id: "l10-4-2",
            title: "Biến, kiểu dữ liệu và nhập xuất",
            minutes: 25,
            tags: ["Python", "biến", "input"],
            bullets: [
              "Biến là vùng nhớ có tên dùng để lưu giá trị; tên biến không bắt đầu bằng chữ số.",
              "Kiểu dữ liệu cơ bản trong Python: int, float, str, bool.",
              "Nhập bằng input() (luôn trả về xâu), xuất bằng print(); đổi kiểu bằng int(), float().",
            ],
            note: "input() trả về xâu nên muốn tính toán phải viết int(input()) — lỗi kinh điển trong đề.",
          },
          {
            id: "l10-4-3",
            title: "Rẽ nhánh",
            minutes: 25,
            tags: ["if", "elif", "điều kiện"],
            bullets: [
              "Cấu trúc if, if…else, if…elif…else; khối lệnh thụt lề 4 dấu cách.",
              "Điều kiện dùng toán tử so sánh ==, !=, <, >, <=, >= và nối bằng and, or, not.",
              "Python viết elif, không có else if.",
            ],
            note: "Đề thường cho bảng điểm và hỏi kết quả in ra — hãy chạy tay từng nhánh.",
          },
          {
            id: "l10-4-4",
            title: "Vòng lặp",
            minutes: 30,
            tags: ["for", "while", "range"],
            bullets: [
              "while lặp theo điều kiện, for lặp theo số lần hoặc duyệt dãy.",
              "range(a, b) chạy từ a đến b-1; range(a, b, k) có bước nhảy k.",
              "break thoát vòng lặp, continue bỏ qua lần lặp hiện tại.",
            ],
            note: "range(1, 6) lặp 5 lần — chỗ hay mất điểm vì tưởng là 6.",
          },
        ],
      },
    ],
  },
  {
    grade: 11,
    headline: "Dữ liệu lớn hơn và lập trình có cấu trúc",
    summary:
      "Hệ điều hành, an toàn thông tin, ứng xử văn hoá trên mạng và xử lí danh sách, xâu, tệp bằng Python.",
    intro:
      "Lớp 11 đi sâu vào hệ điều hành, an toàn thông tin và kĩ thuật lập trình: làm việc với danh sách, xâu kí tự, tệp và hàm.",
    sgk: "https://drive.google.com/drive/folders/1SGK-Tin11",
    chapters: [
      {
        id: "l11-c1",
        title: "Máy tính và xã hội tri thức",
        desc: "Hệ điều hành, phần mềm nguồn mở và dịch vụ đám mây.",
        practiceId: "p11-1",
        lessons: [
          {
            id: "l11-1-1",
            title: "Hệ điều hành và phần mềm nguồn mở",
            minutes: 25,
            tags: ["hệ điều hành", "nguồn mở"],
            bullets: [
              "Hệ điều hành quản lí phần cứng, tệp, tiến trình và cung cấp giao diện người dùng.",
              "Phần mềm nguồn mở cho phép xem, sửa và phát triển mã nguồn: Linux, LibreOffice, GIMP.",
              "Phần mềm thương mại giữ kín mã nguồn và dùng theo giấy phép.",
            ],
            note: "Hãy nhớ ví dụ nguồn mở thật (Linux, LibreOffice) thay vì đoán theo tên phần mềm.",
          },
          {
            id: "l11-1-2",
            title: "Phần mềm ứng dụng và dịch vụ đám mây",
            minutes: 20,
            tags: ["IaaS", "PaaS", "SaaS"],
            bullets: [
              "Phần mềm ứng dụng phục vụ công việc cụ thể: soạn thảo, bảng tính, đồ hoạ.",
              "Dịch vụ đám mây gồm lưu trữ, máy chủ ảo và ba mô hình IaaS, PaaS, SaaS.",
              "Ưu điểm: linh hoạt, không đầu tư hạ tầng; nhược điểm: phụ thuộc kết nối mạng.",
            ],
            note: "Phân biệt IaaS (hạ tầng), PaaS (nền tảng), SaaS (phần mềm) — câu hỏi phân loại rất dễ mất điểm.",
          },
        ],
      },
      {
        id: "l11-c2",
        title: "Mạng máy tính và Internet",
        desc: "Kết nối mạng, chia sẻ tài nguyên và an toàn thông tin trên không gian số.",
        practiceId: "p11-2",
        lessons: [
          {
            id: "l11-2-1",
            title: "Kết nối mạng và chia sẻ tài nguyên",
            minutes: 25,
            tags: ["LAN", "Wi-Fi", "chia sẻ"],
            bullets: [
              "Kết nối có dây dùng cáp xoắn, cáp quang; không dây dùng Wi-Fi, Bluetooth.",
              "Chia sẻ tài nguyên trong LAN: tệp, máy in, ổ đĩa.",
              "Thiết bị định tuyến dùng địa chỉ IP, mặt nạ mạng và kĩ thuật NAT để ra Internet.",
            ],
            note: "Bluetooth phạm vi ngắn, Wi-Fi phạm vi rộng hơn — câu hỏi so sánh hay gặp.",
          },
          {
            id: "l11-2-2",
            title: "An toàn thông tin trên không gian số",
            minutes: 25,
            tags: ["mã độc", "bảo mật"],
            bullets: [
              "Nguy cơ: mã độc, lừa đảo trực tuyến, đánh cắp tài khoản, tấn công từ chối dịch vụ.",
              "Bảo vệ: cập nhật phần mềm, mật khẩu mạnh, sao lưu dữ liệu, xác thực hai lớp.",
              "Dữ liệu quan trọng nên mã hoá và sao lưu định kì.",
            ],
            note: "Phân biệt virus, worm (tự lây lan) và trojan (giả dạng phần mềm hữu ích).",
          },
        ],
      },
      {
        id: "l11-c3",
        title: "Đạo đức, pháp luật và văn hoá trong môi trường số",
        desc: "Nghĩa vụ tôn trọng bản quyền và giao tiếp văn minh trên mạng.",
        practiceId: "p11-3",
        lessons: [
          {
            id: "l11-3-1",
            title: "Nghĩa vụ tôn trọng bản quyền",
            minutes: 20,
            tags: ["bản quyền", "giấy phép"],
            bullets: [
              "Tác phẩm số cũng được bảo hộ quyền tác giả: văn bản, ảnh, nhạc, video, mã nguồn.",
              "Dùng có trích dẫn cho mục đích học tập; không sao chép vì mục đích thương mại.",
              "Phần mềm phải có giấy phép; dùng phần mềm lậu là vi phạm pháp luật.",
            ],
            note: "Trích dẫn nguồn không có nghĩa là được dùng tác phẩm cho mọi mục đích.",
          },
          {
            id: "l11-3-2",
            title: "Giao tiếp và ứng xử trong môi trường số",
            minutes: 20,
            tags: ["bạo lực mạng", "riêng tư"],
            bullets: [
              "Tôn trọng sự riêng tư: không đăng ảnh, thông tin của người khác khi chưa xin phép.",
              "Kiểm chứng thông tin trước khi chia sẻ; không tham gia bạo lực mạng.",
              "Xây dựng hình ảnh số tích cực cho bản thân.",
            ],
            note: "Tình huống bị bắt nạt trên mạng: lưu bằng chứng, chặn, báo cáo và nhờ người lớn hỗ trợ.",
          },
        ],
      },
      {
        id: "l11-c4",
        title: "Giải quyết vấn đề với sự trợ giúp của máy tính",
        desc: "Danh sách, xâu kí tự, tệp và hàm trong Python.",
        practiceId: "p11-4",
        lessons: [
          {
            id: "l11-4-1",
            title: "Danh sách và mảng một chiều",
            minutes: 30,
            tags: ["list", "chỉ số"],
            bullets: [
              "List trong Python: a = [1, 2, 3]; chỉ số bắt đầu từ 0, chỉ số âm tính từ cuối.",
              "Hàm thường dùng: append, insert, remove, pop, len, sum, max, min, sort.",
              "Duyệt bằng for x in a hoặc for i in range(len(a)).",
            ],
            note: "a[-1] là phần tử cuối cùng — chi tiết nhỏ nhưng xuất hiện nhiều trong câu hỏi nhanh.",
          },
          {
            id: "l11-4-2",
            title: "Xâu kí tự",
            minutes: 25,
            tags: ["xâu", "cắt xâu"],
            bullets: [
              "Xâu là dãy kí tự đặt trong dấu nháy; nối bằng +, nhân bằng *.",
              "Cắt xâu bằng s[start:end]: bắt đầu từ 0 và không lấy kí tự ở vị trí end.",
              "Hàm: len, upper, lower, strip, split, find, replace.",
            ],
            note: '"Python"[0:3] bằng "Pyt" — cắt xâu sai mốc là lỗi phổ biến nhất.',
          },
          {
            id: "l11-4-3",
            title: "Tệp và xử lí tệp",
            minutes: 30,
            tags: ["tệp", "open"],
            bullets: [
              "Mở tệp bằng open(ten, mode): r đọc, w ghi đè, a ghi thêm.",
              "Nên dùng with open(...) as f để tệp tự đóng sau khi dùng.",
              "Đọc toàn bộ bằng read(), đọc từng dòng bằng readline() hoặc vòng for.",
            ],
            note: "Chế độ w xoá sạch nội dung cũ — đề hay hỏi hệ quả của việc chọn sai chế độ.",
          },
          {
            id: "l11-4-4",
            title: "Hàm và chương trình con",
            minutes: 30,
            tags: ["hàm", "return"],
            bullets: [
              "Hàm giúp tái sử dụng: def tenham(thamso): return giatri.",
              "Biến trong hàm là biến cục bộ; muốn dùng biến toàn cục phải khai báo global.",
              "Hàm có thể trả về nhiều giá trị hoặc không trả về (None).",
            ],
            note: "Hàm không có return sẽ trả về None — nhớ khi đề hỏi giá trị được in ra.",
          },
        ],
      },
    ],
  },
  {
    grade: 12,
    headline: "Trí tuệ nhân tạo và ứng dụng thực tiễn",
    summary:
      "AI – học máy, giao thức mạng, cơ sở dữ liệu và các bài toán thuật toán nâng cao để sẵn sàng vào đại học.",
    intro:
      "Lớp 12 tổng hợp kiến thức hiện đại: trí tuệ nhân tạo, giao thức mạng, cơ sở dữ liệu quan hệ và thuật toán nâng cao.",
    sgk: "https://drive.google.com/drive/folders/1SGK-Tin12",
    chapters: [
      {
        id: "l12-c1",
        title: "Trí tuệ nhân tạo và học máy",
        desc: "Khái niệm AI, dữ liệu huấn luyện và các vấn đề đạo đức khi dùng AI.",
        practiceId: "p12-1",
        lessons: [
          {
            id: "l12-1-1",
            title: "Trí tuệ nhân tạo: khái niệm và ứng dụng",
            minutes: 25,
            tags: ["AI", "ứng dụng"],
            bullets: [
              "AI giúp máy tính thực hiện những việc cần trí tuệ con người: học, suy luận, hiểu ngôn ngữ.",
              "Ứng dụng: trợ lí ảo, nhận dạng ảnh, dịch máy, xe tự lái, gợi ý nội dung.",
              "AI mạnh ở dữ liệu lớn và tác vụ lặp; yếu ở ngữ cảnh cảm xúc và phán đoán đạo đức.",
            ],
            note: "Phân biệt AI hẹp (một nhóm nhiệm vụ) với AI tổng quát (mọi nhiệm vụ).",
          },
          {
            id: "l12-1-2",
            title: "Học máy và dữ liệu huấn luyện",
            minutes: 30,
            tags: ["học máy", "dữ liệu"],
            bullets: [
              "Học máy dùng dữ liệu để máy tự tìm ra mô hình thay vì lập trình từng quy tắc.",
              "Ba hướng chính: học có giám sát, học không giám sát, học tăng cường.",
              "Chất lượng dữ liệu huấn luyện quyết định chất lượng mô hình; dữ liệu lệch gây thiên lệch.",
            ],
            note: "Học có giám sát cần dữ liệu đã gán nhãn — câu hỏi phân loại hay gặp.",
          },
          {
            id: "l12-1-3",
            title: "Ứng dụng AI và đạo đức AI",
            minutes: 20,
            tags: ["đạo đức AI", "trách nhiệm"],
            bullets: [
              "AI có mặt trong y tế, giáo dục, nông nghiệp, thương mại và giao thông.",
              "Rủi ro: thiên lệch, xâm phạm quyền riêng tư, mất việc làm, tin giả.",
              "Cần minh bạch, trách nhiệm giải trình và sự kiểm soát cuối cùng của con người.",
            ],
            note: "Câu hỏi tình huống thường chọn phương án con người chịu trách nhiệm cuối cùng.",
          },
        ],
      },
      {
        id: "l12-c2",
        title: "Mạng máy tính và Internet",
        desc: "Giao thức TCP/IP, an ninh mạng và mã hoá dữ liệu.",
        practiceId: "p12-2",
        lessons: [
          {
            id: "l12-2-1",
            title: "Giao thức mạng và mô hình TCP/IP",
            minutes: 25,
            tags: ["TCP", "UDP", "TCP/IP"],
            bullets: [
              "Giao thức là bộ quy tắc trao đổi dữ liệu giữa các thiết bị.",
              "TCP/IP gồm 4 tầng: ứng dụng, giao vận, liên mạng, truy cập mạng.",
              "TCP tin cậy và hướng kết nối; UDP nhanh nhưng không đảm bảo.",
            ],
            note: "HTTPS dùng cổng 443, HTTP dùng cổng 80 — chi tiết nhỏ nhưng hay được hỏi.",
          },
          {
            id: "l12-2-2",
            title: "An ninh mạng và mã hoá dữ liệu",
            minutes: 30,
            tags: ["mã hoá", "chữ kí số"],
            bullets: [
              "Mối nguy: tấn công từ chối dịch vụ, mã hoá tống tiền, giả mạo, nghe lén.",
              "Các lớp bảo vệ: tường lửa, IDS/IPS, VPN và phân quyền người dùng.",
              "Mã hoá đối xứng dùng một khoá; bất đối xứng dùng cặp khoá công khai – riêng.",
            ],
            note: "Chữ kí số dùng khoá riêng để kí và khoá công khai để kiểm tra — dễ bị đảo trong đề.",
          },
        ],
      },
      {
        id: "l12-c3",
        title: "Cơ sở dữ liệu",
        desc: "Khái niệm CSDL, mô hình quan hệ, khoá và truy vấn SQL.",
        practiceId: "p12-3",
        lessons: [
          {
            id: "l12-3-1",
            title: "Khái niệm cơ sở dữ liệu và hệ QTCSDL",
            minutes: 25,
            tags: ["CSDL", "QTCSDL"],
            bullets: [
              "CSDL là tập dữ liệu có tổ chức, giảm trùng lặp và đảm bảo tính nhất quán.",
              "Hệ QTCSDL (MySQL, SQL Server, Oracle) tạo lập, cập nhật và khai thác dữ liệu.",
              "Kiến trúc ba mức: vật lí, logic và khung nhìn.",
            ],
            note: "Phân biệt CSDL (dữ liệu) với hệ QTCSDL (phần mềm quản trị).",
          },
          {
            id: "l12-3-2",
            title: "Mô hình quan hệ và khoá",
            minutes: 30,
            tags: ["khoá chính", "khoá ngoại"],
            bullets: [
              "Bảng (quan hệ) gồm các bản ghi (hàng) và trường (cột).",
              "Khoá chính xác định duy nhất mỗi bản ghi; khoá ngoại liên kết hai bảng.",
              "Ràng buộc toàn vẹn: thực thể, tham chiếu và miền giá trị.",
            ],
            note: "Khoá chính không được NULL và không được trùng — câu hỏi chắc chắn xuất hiện.",
          },
          {
            id: "l12-3-3",
            title: "Truy vấn dữ liệu với SQL",
            minutes: 35,
            tags: ["SELECT", "GROUP BY"],
            bullets: [
              "Cấu trúc: SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY.",
              "Hàm gộp: COUNT, SUM, AVG, MIN, MAX.",
              "Nối bảng bằng JOIN; thêm, sửa, xoá bằng INSERT, UPDATE, DELETE.",
            ],
            note: "WHERE lọc trước khi gộp, HAVING lọc sau khi gộp — chỗ dễ sai nhất.",
          },
        ],
      },
      {
        id: "l12-c4",
        title: "Thuật toán nâng cao",
        desc: "Tìm kiếm, sắp xếp và độ phức tạp thuật toán.",
        practiceId: "p12-4",
        lessons: [
          {
            id: "l12-4-1",
            title: "Thuật toán tìm kiếm",
            minutes: 25,
            tags: ["tuần tự", "nhị phân"],
            bullets: [
              "Tìm kiếm tuần tự có độ phức tạp O(n), không cần dãy đã sắp xếp.",
              "Tìm kiếm nhị phân có độ phức tạp O(log n), yêu cầu dãy đã sắp xếp.",
              "Với dữ liệu lớn, tìm kiếm nhị phân nhanh hơn rất nhiều.",
            ],
            note: "Nếu đề hỏi điều kiện để dùng tìm kiếm nhị phân, đáp án là dãy đã được sắp xếp.",
          },
          {
            id: "l12-4-2",
            title: "Thuật toán sắp xếp",
            minutes: 30,
            tags: ["nổi bọt", "quick sort"],
            bullets: [
              "Sắp xếp nổi bọt, chèn, chọn có độ phức tạp O(n²), phù hợp dữ liệu nhỏ.",
              "Sắp xếp nhanh và sắp xếp trộn có độ phức tạp O(n log n), hiệu quả với dữ liệu lớn.",
              "Sắp xếp ổn định giữ nguyên thứ tự các phần tử bằng nhau.",
            ],
            note: "Đề hay yêu cầu đếm số lần so sánh của sắp xếp nổi bọt với dãy nhỏ — hãy mô phỏng từng vòng.",
          },
          {
            id: "l12-4-3",
            title: "Độ phức tạp thuật toán",
            minutes: 25,
            tags: ["O lớn", "độ phức tạp"],
            bullets: [
              "Độ phức tạp thời gian diễn tả số phép toán theo kích thước dữ liệu n.",
              "Kí hiệu O lớn: O(1), O(log n), O(n), O(n log n), O(n²).",
              "Việc chọn thuật toán phụ thuộc kích thước dữ liệu và giới hạn thời gian.",
            ],
            note: "Nhân đôi n mà thời gian chỉ tăng thêm hằng số thì thuật toán có dạng O(log n).",
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
  c.lessons.map((l) => ({ ...l, grade: c.grade, chapterTitle: c.title }))
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
