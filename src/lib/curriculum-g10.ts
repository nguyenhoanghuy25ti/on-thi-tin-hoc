import type { GradeCurriculum } from "./curriculum-types";

export const GRADE_10_CURRICULUM: GradeCurriculum = {
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
          intro:
            "Mỗi ngày em tiếp xúc với hàng loạt con số, chữ viết, hình ảnh và âm thanh từ đồng hồ, nhiệt kế, điện thoại hay bảng điểm. Nhưng khi nào chúng chỉ là 'dữ liệu' thô và khi nào chúng trở thành 'thông tin' giúp ta ra quyết định? Bài học này làm rõ ranh giới đó, chu trình xử lí thông tin của máy tính và cách quy đổi các đơn vị đo dữ liệu số.",
          objectives: [
            "Phân biệt chính xác Dữ liệu (hình thức biểu diễn), Thông tin (ý nghĩa rút ra) và Vật mang tin.",
            "Trình bày đầy đủ chu trình xử lí thông tin 4 bước của máy tính: Tiếp nhận → Xử lí → Lưu trữ → Truyền.",
            "Hiểu cách số hóa mọi dạng dữ liệu thành dãy bit (hệ nhị phân) và quy đổi thành thạo các đơn vị bit, Byte, KB, MB, GB, TB.",
          ],
          bullets: [
            "Dữ liệu là hình thức biểu diễn (con số, văn bản, hình ảnh, âm thanh); Thông tin là ý nghĩa rút ra từ dữ liệu tùy theo ngữ cảnh và người tiếp nhận.",
            "Chu trình xử lí thông tin gồm: Tiếp nhận dữ liệu đầu vào → Xử lí theo thuật toán → Xuất/Truyền kết quả và Lưu trữ trên vật mang tin.",
            "Mọi dữ liệu trong máy tính đều được mã hóa thành dãy bit (0 và 1): 1 Byte = 8 bit; mỗi bậc KB, MB, GB, TB kế tiếp nhau gấp 1024 lần.",
          ],
          sections: [
            {
              title: "Phân biệt Thông tin, Dữ liệu và Vật mang tin",
              content: `Trong Tin học (SGK Kết nối tri thức), ba khái niệm này có mối liên hệ chặt chẽ nhưng không đồng nhất:

- **Dữ liệu (Data):** Là các giá trị thô, các kí hiệu, con số, văn bản, hình ảnh hoặc âm thanh dùng để **biểu diễn** thông tin. Dữ liệu có thể được thu thập, lưu trữ và truyền đi mà chưa cần hiểu ý nghĩa.
- **Thông tin (Information):** Là **ý nghĩa** có ích mà con người rút ra được sau khi phân tích, đặt dữ liệu vào một ngữ cảnh cụ thể để phục vụ nhận thức hoặc ra quyết định.
- **Vật mang tin (Information Carrier):** Là phương tiện vật lí dùng để lưu giữ và truyền đạt dữ liệu (ví dụ: tờ giấy ghi chữ, đĩa DVD, ổ cứng SSD, thẻ nhớ USB, bảng điện tử).

| Tiêu chí | Dữ liệu | Thông tin |
| :--- | :--- | :--- |
| **Bản chất** | Hình thức biểu diễn (kí hiệu, số, ảnh, âm thanh) | Ý nghĩa, hiểu biết rút ra từ dữ liệu |
| **Tính khách quan** | Tồn tại độc lập dưới dạng vật lí/số hóa | Phụ thuộc mục đích, kiến thức và ngữ cảnh người đọc |
| **Ví dụ** | Dãy số \`38.5\` hiện trên màn hình nhiệt kế | "Cơ thể đang bị sốt nhẹ, cần nghỉ ngơi và theo dõi" |
| **Ví dụ 2** | Bảng điểm gồm các cột Tên, Toán, Văn, Tin | Nhận biết học sinh nào đạt giỏi hoặc cần ôn thêm môn nào |

> **Lưu ý quan trọng:** Cùng một dữ liệu đầu vào có thể mang lại **thông tin khác nhau** cho những người khác nhau (ví dụ: bảng nhiệt độ thời tiết đối với khách du lịch là thông tin chuẩn bị quần áo, còn với nông dân là thông tin chăm sóc cây trồng).`,
            },
            {
              title: "Chu trình xử lí thông tin và nguyên tắc GIGO",
              content: `Hệ thống máy tính thực hiện quá trình biến đổi dữ liệu thành thông tin hữu ích theo 4 hoạt động cốt lõi:

1. **Tiếp nhận (Input):** Thu nhận dữ liệu từ thế giới thực qua thiết bị vào như bàn phím, chuột, micro, máy quét, cảm biến, camera.
2. **Xử lí (Processing):** Bộ xử lí trung tâm (CPU) thực hiện các phép tính toán học, logic theo chương trình để biến đổi dữ liệu thô thành kết quả có ý nghĩa.
3. **Lưu trữ (Storage):** Ghi giữ dữ liệu và kết quả tạm thời trên RAM hoặc lâu dài trên ổ cứng HDD/SSD, thẻ nhớ, đám mây để dùng lại về sau.
4. **Truyền / Xuất (Output):** Đưa kết quả ra màn hình, máy in, loa hoặc truyền qua mạng đến thiết bị khác.

**Nguyên tắc GIGO (Garbage In, Garbage Out):** Nếu dữ liệu đầu vào bị sai hoặc thiếu chính xác thì dù máy tính có cấu hình mạnh đến đâu, kết quả thông tin đầu ra vẫn bị sai lệch theo.`,
            },
            {
              title: "Số hóa dữ liệu và Hệ nhị phân",
              content: `Máy tính điện tử hoạt động dựa trên hai trạng thái vật lí ổn định của dòng điện (có điện / không có điện, mức áp cao / thấp). Vì vậy, mọi dạng dữ liệu — dù là văn bản, số nguyên, hình ảnh đa phương tiện hay âm thanh — khi đưa vào máy tính đều phải **số hóa** thành dãy kí hiệu của **hệ nhị phân** chỉ gồm hai chữ số \`0\` và \`1\`.

- **Bit (Binary Digit):** Là đơn vị nhỏ nhất dùng để đo lượng dữ liệu số, mỗi bit chỉ nhận một trong hai giá trị \`0\` hoặc \`1\`.
- **Byte (B):** Gồm **8 bit** liên tiếp (\`1 Byte = 8 bit\`), đủ để mã hóa một kí tự cơ bản trong bảng mã ASCII.`,
            },
            {
              title: "Bảng đơn vị đo lượng dữ liệu và cách quy đổi",
              content: `Trong tin học phổ thông, các bội số của Byte tăng theo lũy thừa của 2, cụ thể mỗi bậc lớn hơn gấp **\`2¹⁰ = 1024\`** lần bậc liền trước:

| Đơn vị | Kí hiệu | Giá trị theo đơn vị liền trước | Quy đổi tương đương |
| :--- | :--- | :--- | :--- |
| Bit | bit (b) | Đơn vị nhỏ nhất (\`0\` hoặc \`1\`) | — |
| Byte | B | \`1 B = 8 bit\` | 1 kí tự ASCII |
| Kilobyte | KB | \`1 KB = 1024 B\` | \`8192 bit\` |
| Megabyte | MB | \`1 MB = 1024 KB\` | \`1024 × 1024 B\` |
| Gigabyte | GB | \`1 GB = 1024 MB\` | \`1024 × 1024 KB\` |
| Terabyte | TB | \`1 TB = 1024 GB\` | \`1024 × 1024 MB\` |

**Quy tắc quy đổi nhanh:**
- Đổi từ đơn vị **lớn sang nhỏ**: **Nhân** với \`1024\` (riêng từ Byte sang bit nhân với \`8\`).
- Đổi từ đơn vị **nhỏ sang lớn**: **Chia** cho \`1024\` (riêng từ bit sang Byte chia cho \`8\`).
- Phân biệt: \`bps\` (bit per second) là đơn vị đo **tốc độ truyền dữ liệu** trên mạng, **không phải** đơn vị đo dung lượng lưu trữ.`,
            },
          ],
          example: {
            title: "Quy đổi dung lượng từ GB, KB sang MB và bit",
            code: `Bài 1: Đổi 3 GB sang MB
  3 GB = 3 × 1024 MB = 3072 MB

Bài 2: Đổi 4 KB sang bit
  4 KB = 4 × 1024 Byte = 4096 Byte
  4096 Byte = 4096 × 8 bit = 32768 bit`,
            language: "text",
            steps: [
              "Xác định chiều quy đổi: từ lớn sang nhỏ dùng phép nhân.",
              "Mỗi bậc từ TB → GB → MB → KB → Byte nhân 1024.",
              "Khi xuống đến đơn vị cuối là bit thì nhân thêm 8.",
            ],
            explanation:
              "Nắm chắc thứ tự b → B → KB → MB → GB → TB giúp tính nhanh mọi bài toán dung lượng.",
          },
          examples: [
            {
              title: "Quy đổi dung lượng từ GB, KB sang MB và bit",
              code: `Bài 1: 3 GB = 3 × 1024 = 3072 MB
Bài 2: 2 TB = 2 × 1024 = 2048 GB
Bài 3: 4 KB = 4 × 1024 × 8 = 32768 bit`,
              language: "text",
              steps: [
                "Xác định bậc đơn vị cần đổi trong dãy bit < Byte < KB < MB < GB < TB.",
                "Giữa Byte và KB/MB/GB/TB cách nhau hệ số 1024; giữa bit và Byte là hệ số 8.",
              ],
              explanation:
                "Nhiều học sinh quên nhân 8 khi đổi từ Byte/KB sang bit hoặc nhầm 1000 thay cho 1024.",
            },
            {
              title: "Tính số lượng tệp lưu trữ được trên thẻ nhớ",
              code: `Đề bài: Một thẻ nhớ dung lượng 16 GB chứa được tối đa khoảng bao nhiêu tệp ảnh có kích thước 4 MB mỗi tệp?

Giải:
  Bước 1: Đổi dung lượng thẻ nhớ về cùng đơn vị MB:
          16 GB = 16 × 1024 MB = 16384 MB
  Bước 2: Chia cho dung lượng 1 tệp:
          16384 : 4 = 4096 (tệp ảnh)`,
              language: "text",
              explanation:
                "Trước khi chia dung lượng để tính số tệp, luôn phải đưa cả tử và mẫu về cùng một đơn vị (MB hoặc KB).",
            },
          ],
          commonMistakes: [
            "Nhầm lẫn giữa Dữ liệu và Thông tin: con số thô trên bảng/màn hình là Dữ liệu; ý nghĩa rút ra mới là Thông tin.",
            "Nhầm \`1 KB = 1000 B\` trong đề Tin học phổ thông: theo SGK chuẩn, quy ước là \`1 KB = 1024 B\`, \`1 MB = 1024 KB\`, \`1 TB = 1024 GB\` (không phải \`1 TB = 1024 MB\`!).",
            "Nhầm \`bit/s (bps)\` là đơn vị dung lượng ổ cứng — thực tế \`bps\` là đơn vị tốc độ truyền dữ liệu.",
            "Quên nhân với \`8\` khi đổi từ KB hoặc Byte sang bit.",
          ],
          note: "Luôn nhớ dãy tăng dần: bit < Byte < KB < MB < GB < TB; hệ số chuyển giữa Byte–bit là 8, còn giữa các bậc từ Byte trở lên là 1024.",
        },
        {
          id: "l10-1-2",
          title: "Sự ưu việt của máy tính và thành tựu của tin học",
          minutes: 20,
          orientation: "CHUNG",
          tags: ["ưu việt máy tính", "thành tựu tin học", "tự động hoá"],
          intro:
            "Vì sao một chiếc máy tính nhỏ gọn có thể xử lí bài toán phức tạp chỉ trong nháy mắt và thay đổi hoàn toàn cách nhân loại làm việc? Đồng thời, ranh giới nào mà máy tính hiện đại vẫn chưa thể vượt qua con người?",
          objectives: [
            "Phân tích được 4 ưu thế vượt trội của máy tính: tốc độ tính toán, độ chính xác bền bỉ, dung lượng lưu trữ lớn và khả năng kết nối.",
            "Trình bày được các thành tựu tiêu biểu của tin học: máy tính điện tử, Internet & WWW, Trí tuệ nhân tạo (AI), Robot tự động và Thực tế ảo (VR).",
            "Nhận thức đúng vai trò chủ thể của con người và giới hạn của máy tính.",
          ],
          bullets: [
            "Máy tính có 4 ưu việt lớn: tốc độ hàng tỉ phép tính/giây (GHz), độ chính xác ổn định không mệt mỏi, lưu trữ khổng lồ và kết nối toàn cầu.",
            "Thành tựu tiêu biểu của tin học: máy tính điện tử (từ giữa thế kỉ XX), Internet/WWW, Trí tuệ nhân tạo (AI), tự động hóa bằng robot, Thực tế ảo (VR).",
            "Máy tính làm việc theo chương trình do con người viết; chưa có cảm xúc tự thân, ý thức công dân hay tư duy sáng tạo độc lập hoàn toàn.",
          ],
          sections: [
            {
              title: "Bốn ưu thế vượt trội của máy tính",
              content: `So với khả năng xử lí thủ công của con người, máy tính sở hữu 4 ưu thế nổi bật:

1. **Tốc độ tính toán cực nhanh:** Bộ vi xử lí hiện đại hoạt động với xung nhịp hàng tỉ chu kì mỗi giây (GHz), thực hiện hàng tỉ phép tính/giây — công việc mà con người tính tay có thể mất hàng năm.
2. **Độ chính xác cao và làm việc bền bỉ:** Máy tính thực hiện một chuỗi thao tác lặp lại hàng triệu lần mà không mệt mỏi, không mất tập trung hay sai sót do tâm lí như con người.
3. **Khả năng lưu trữ khổng lồ trong không gian nhỏ gọn:** Một ổ cứng hoặc thẻ nhớ nhỏ có thể chứa hàng triệu trang sách, ảnh và video độ phân giải cao, dễ dàng sao chép và tra cứu tức thời.
4. **Khả năng kết nối và truyền tin toàn cầu:** Khi nối mạng Internet, máy tính trao đổi dữ liệu gần như tức thời vượt qua mọi khoảng cách địa lí.`,
            },
            {
              title: "Những thành tựu tiêu biểu của ngành Tin học",
              content: `Từ khi chiếc máy tính điện tử đầu tiên ra đời vào giữa thế kỉ XX, tin học đã tạo nên những bước ngoặt lớn:

| Thành tựu | Bản chất & Ứng dụng điển hình |
| :--- | :--- |
| **Máy tính điện tử & Vi xử lí** | Mở đầu cuộc cách mạng thông tin, thu nhỏ từ máy cỡ phòng xuống laptop, điện thoại thông minh |
| **Internet & World Wide Web** | Tạo ra kỷ nguyên kết nối toàn cầu, chia sẻ tri thức tức thời, học tập và thương mại xuyên biên giới |
| **Trí tuệ nhân tạo (AI)** | Máy học từ dữ liệu để nhận dạng giọng nói, khuôn mặt, dịch ngôn ngữ tự động, hỗ trợ chẩn đoán y khoa |
| **Robot & Tự động hóa** | Kết hợp cơ khí chính xác với chương trình điều khiển (dây chuyền lắp ráp ô tô, kho hàng tự động) |
| **Thực tế ảo (VR) & Thực tế tăng cường (AR)** | Mô phỏng môi trường 3D tương tác qua kính chuyên dụng phục vụ mô phỏng phẫu thuật, đào tạo phi công, giải trí |`,
            },
            {
              title: "Giới hạn của máy tính và vai trò chủ thể của con người",
              content: `Dù mạnh mẽ, máy tính **không thể thay thế hoàn toàn con người** vì các giới hạn bản chất:

- **Hoạt động thuần túy theo chương trình:** Máy tính không tự đặt ra mục tiêu; nếu thuật toán hay dữ liệu do con người thiết kế bị sai, máy sẽ tính sai theo. (Do đó nếu kết quả sai, nguyên nhân thường đến từ lỗi chương trình hoặc dữ liệu đầu vào chứ không chỉ do hỏng phần cứng).
- **Thiếu cảm xúc, đạo đức và ý thức sinh học:** Máy tính có thể mô phỏng câu trả lời lịch sự nhưng không tự cảm nhận niềm vui, nỗi buồn hay chịu trách nhiệm pháp lí như một công dân.
- **Con người là chủ thể sáng tạo và kiểm soát:** Con người đề xuất ý tưởng mới, thiết kế thuật toán, đánh giá tính nhân văn và làm chủ công nghệ.`,
            },
          ],
          example: {
            title: "Phân tích sự phối hợp giữa Con người và Máy tính trong thực tế",
            code: `Bài toán: Dự báo bão và điều phối cứu hộ thiên tai
- Máy tính: Thu thập hàng triệu điểm dữ liệu vệ tinh, chạy mô hình khí tượng trong vài phút.
- Con người: Phân tích ngữ cảnh địa phương, ra quyết định sơ tán dân cư và điều phối nhân lực.`,
            language: "text",
            explanation:
              "Máy tính khuếch đại sức mạnh tính toán và lưu trữ, còn con người giữ quyền quyết định cuối cùng và trách nhiệm xã hội.",
          },
          commonMistakes: [
            "Cho rằng máy tính 'thông minh hơn con người về mọi mặt' hoặc đã có 'ý thức, cảm xúc thật, quyền lợi công dân'.",
            "Nghĩ rằng khi máy tính ra kết quả sai thì nguyên nhân chắc chắn do hỏng phần cứng — thực tế phần lớn là lỗi dữ liệu đầu vào hoặc lỗi lập trình.",
            "Nhầm khái niệm Thực tế ảo (VR - môi trường 3D tương tác) với lưu trữ dữ liệu thông thường.",
          ],
          note: "Khi gặp câu hỏi về giới hạn của máy tính, luôn nhớ: máy tính không có cảm xúc tự thân, không có ý thức pháp lí và luôn cần con người thiết kế, kiểm soát.",
        },
        {
          id: "l10-1-3",
          title: "Máy tính trong đời sống và tin học với xã hội",
          minutes: 20,
          orientation: "CHUNG",
          tags: ["đô thị thông minh", "kĩ năng số", "khoảng cách số"],
          intro:
            "Công nghệ thông tin đã đi sâu vào từng lớp học, bệnh viện, siêu thị và hệ thống điều hành thành phố. Tuy nhiên, sự phát triển nhanh của công nghệ cũng đặt ra bài toán về 'khoảng cách số' và thói quen sử dụng thiết bị lành mạnh.",
          objectives: [
            "Trình bày được các ứng dụng tiêu biểu của tin học trong giáo dục, y tế, giao thông, dịch vụ công và thương mại điện tử.",
            "Hiểu rõ bản chất của Xã hội tri thức và mô hình Đô thị thông minh (Smart City).",
            "Giải thích được khái niệm Khoảng cách số, giải pháp thu hẹp và các kĩ năng số tích cực cho học sinh.",
          ],
          bullets: [
            "Xã hội tri thức coi tri thức và thông tin là động lực phát triển chủ chốt; tin học len lỏi vào LMS, bệnh án điện tử, QR/ví điện tử, dịch vụ công trực tuyến.",
            "Đô thị thông minh (Smart City) kết hợp mạng cảm biến IoT và dữ liệu lớn để điều hành giao thông, năng lượng, môi trường theo thời gian thực.",
            "Khoảng cách số (Digital Divide) là sự chênh lệch về cơ hội tiếp cận thiết bị, Internet và kĩ năng số giữa các vùng miền, độ tuổi.",
          ],
          sections: [
            {
              title: "Ứng dụng của Tin học trong các lĩnh vực đời sống",
              content: `Chuyển đổi số giúp nâng cao chất lượng sống và hiệu suất công việc trên nhiều phương diện:

- **Giáo dục:** Hệ thống quản lí học tập trực tuyến (LMS), học liệu số, lớp học trực tuyến giúp học mọi lúc mọi nơi và cá nhân hóa tiến độ ôn tập.
- **Y tế:** Hồ sơ bệnh án điện tử giúp bác sĩ tra cứu nhanh lịch sử khám chữa bệnh, đặt lịch khám từ xa và chẩn đoán hình ảnh hỗ trợ bởi AI.
- **Thương mại & Tài chính:** Thương mại điện tử, thanh toán không dùng tiền mặt qua mã QR, ví điện tử, chuyển khoản ngân hàng nhanh chóng (không cần mang tiền mặt đến cửa hàng).
- **Hành chính công:** Dịch vụ công trực tuyến giúp người dân nộp hồ sơ, tra cứu thủ tục minh bạch, giảm giấy tờ rườm rà và thời gian chờ đợi.`,
            },
            {
              title: "Xã hội tri thức và Đô thị thông minh (Smart City)",
              content: `- **Xã hội tri thức:** Là xã hội mà trong đó **tri thức và thông tin** giữ vai trò động lực phát triển chủ chốt về kinh tế và xã hội. Kỹ năng công nghệ thông tin trở thành năng lực thiết yếu của mọi công dân.
- **Đô thị thông minh (Smart City):** Là mô hình thành phố vận hành dựa trên mạng lưới **cảm biến IoT (Internet vạn vật)**, điện toán đám mây và **phân tích dữ liệu lớn**.
  - *Ví dụ:* Cảm biến đo lưu lượng xe ở ngã tư gửi dữ liệu về trung tâm để tự động điều chỉnh nhịp đèn giao thông; bản đồ số cảnh báo ùn tắc theo thời gian thực dựa trên dữ liệu vị trí từ các thiết bị tham gia giao thông; cảm biến giám sát chất lượng không khí và tiết kiệm điện chiếu sáng công cộng.`,
            },
            {
              title: "Khoảng cách số và Tác động hai mặt của công nghệ",
              content: `**Khoảng cách số (Digital Divide):** Là sự chênh lệch về điều kiện tiếp cận công nghệ số (máy tính, Internet tốc độ cao) và kĩ năng sử dụng công nghệ giữa các quốc gia, giữa thành thị với vùng sâu vùng xa, hoặc giữa các nhóm tuổi (người cao tuổi thường gặp khó khăn với dịch vụ công trực tuyến).

**Giải pháp thu hẹp khoảng cách số:**
- Đầu tư hạ tầng viễn thông, phủ sóng Internet đến vùng khó khăn.
- Phổ cập môn Tin học trong nhà trường phổ thông và tổ chức tập huấn kĩ năng số cho cộng đồng.

**Mặt trái và thói quen sử dụng lành mạnh:**
- Lạm dụng thiết bị số (ngồi liên tục 8–10 giờ mỗi ngày, nghiện game/mạng xã hội) gây suy giảm thị lực, bệnh cột sống, giảm tương tác trực tiếp và mất tập trung học tập.
- Kĩ năng số tích cực gồm: biết tìm kiếm – kiểm chứng thông tin, bảo vệ dữ liệu cá nhân, nghỉ ngơi hợp lí (quy tắc 20-20-20 bảo vệ mắt) và cân bằng thời gian trực tuyến.`,
            },
          ],
          example: {
            title: "Luồng hoạt động của hệ thống giao thông thông minh",
            code: `Cảm biến lưu lượng xe + Camera giao thông
        ──▶ Gửi dữ liệu thời gian thực về Máy chủ trung tâm
        ──▶ Phân tích mật độ phương tiện tại từng nút giao
        ──▶ Tự động điều chỉnh thời gian đèn xanh/đỏ & cập nhật lên bản đồ số`,
            language: "text",
            explanation:
              "Đây là minh họa điển hình cho việc kết hợp cảm biến IoT và xử lí dữ liệu lớn trong Đô thị thông minh.",
          },
          commonMistakes: [
            "Nhầm tưởng khoảng cách số chỉ tồn tại giữa các quốc gia phát triển và đang phát triển — thực tế nó xảy ra ngay trong cùng một nước, giữa thành thị và nông thôn hoặc giữa các thế hệ.",
            "Cho rằng thương mại điện tử vẫn bắt buộc người mua phải tới trực tiếp cửa hàng thanh toán tiền mặt.",
            "Nghĩ rằng trong xã hội tri thức chỉ lập trình viên mới cần kĩ năng số.",
          ],
          note: "Nhớ kỹ 3 khái niệm cốt lõi: Xã hội tri thức (tri thức là động lực), Đô thị thông minh (cảm biến IoT + dữ liệu lớn) và Khoảng cách số (chênh lệch tiếp cận & kĩ năng số).",
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
          intro:
            "Ở phòng thực hành Tin học của trường, 30 máy tính có thể dùng chung một máy in và cùng truy cập Internet. Hệ thống đó được cấu tạo từ những thành phần nào và thiết bị nào chịu trách nhiệm nối dây nội bộ hay dẫn đường ra thế giới bên ngoài?",
          objectives: [
            "Trình bày được 4 thành phần cơ bản tạo nên một mạng máy tính và lợi ích của việc kết nối mạng.",
            "Phân biệt mạng cục bộ (LAN) và mạng diện rộng (WAN) theo phạm vi địa lí.",
            "Phân biệt chính xác chức năng của Switch, Access Point, Router và Modem, cũng như cáp xoắn đôi, cáp quang và kết nối không dây.",
          ],
          bullets: [
            "4 thành phần của mạng: Thiết bị đầu cuối (PC, điện thoại, máy in mạng), Thiết bị kết nối (Switch, Router, Modem), Môi trường truyền dẫn (cáp đồng, cáp quang, sóng vô tuyến) và Giao thức mạng.",
            "LAN (Local Area Network) phủ phạm vi nhỏ như phòng học, tòa nhà; WAN (Wide Area Network) kết nối nhiều mạng LAN trên phạm vi liên tỉnh, quốc gia, toàn cầu.",
            "Switch kết nối các máy trong cùng mạng LAN; Router định tuyến gói tin giữa các mạng khác nhau; Modem điều chế và giải điều chế tín hiệu đường truyền.",
          ],
          sections: [
            {
              title: "Khái niệm, lợi ích và 4 thành phần của mạng máy tính",
              content: `Mạng máy tính là tập hợp các máy tính và thiết bị số được kết nối với nhau cho phép truyền dữ liệu và chia sẻ tài nguyên.

**Lợi ích chính của mạng máy tính:**
- Trao đổi thông tin, tệp tin nhanh chóng giữa nhiều người dùng.
- Chia sẻ tài nguyên phần cứng (ví dụ: 30 máy tính trong phòng thực hành dùng chung 1 máy in mạng) và phần mềm, dữ liệu dùng chung (thư mục bài giảng, cơ sở dữ liệu).

**4 thành phần cơ bản của một mạng máy tính:**
1. **Thiết bị đầu cuối (End devices):** Máy tính để bàn, laptop, điện thoại thông minh, máy chủ (Server), máy khách (Client), máy in mạng...
2. **Thiết bị kết nối mạng:** Hub, Switch, Access Point, Router, Modem.
3. **Môi trường truyền dẫn (Đường truyền):** Có dây (cáp xoắn đôi UTP/RJ45, cáp quang) hoặc không dây (sóng vô tuyến Wi-Fi, Bluetooth, vệ tinh).
4. **Giao thức truyền thông (Protocol):** Tập hợp các quy tắc quy định khuôn dạng gói tin và cách các thiết bị giao tiếp, trao đổi dữ liệu với nhau.`,
            },
            {
              title: "Phân biệt các thiết bị mạng và đường truyền",
              content: `| Thiết bị / Đường truyền | Chức năng & Đặc điểm chính |
| :--- | :--- |
| **Switch (Bộ chuyển mạch)** | Kết nối nhiều thiết bị trong **cùng một mạng LAN** bằng cáp mạng; chuyển tiếp dữ liệu đến đúng cổng của máy nhận |
| **Access Point (Điểm truy cập)** | Phát sóng Wi-Fi để các thiết bị di động (laptop, điện thoại) kết nối không dây vào mạng LAN |
| **Router (Bộ định tuyến)** | Tìm đường đi (định tuyến) và chuyển tiếp gói tin giữa **các mạng khác nhau** (ví dụ nối mạng LAN với Internet) |
| **Modem** | Điều chế và giải điều chế tín hiệu giữa đường truyền của nhà cung cấp dịch vụ (ISP) với mạng nội bộ |
| **Cáp xoắn đôi (UTP / RJ45)** | Dây đồng phổ biến nối máy tính với Switch trong phòng học; chi phí thấp, lắp đặt dễ |
| **Cáp quang** | Truyền dữ liệu bằng **tín hiệu ánh sáng**, tốc độ rất cao, truyền xa ít suy hao và không bị nhiễu điện từ |`,
            },
            {
              title: "Phân loại mạng: LAN vs WAN và Có dây vs Không dây",
              content: `**Theo phạm vi địa lí:**
- **Mạng cục bộ — LAN (Local Area Network):** Kết nối các thiết bị trong phạm vi hẹp như một gia đình, một phòng tin học, một tòa nhà hoặc khuôn viên trường học. Tốc độ truyền nội bộ cao, chi phí lắp đặt thấp.
- **Mạng diện rộng — WAN (Wide Area Network):** Kết nối nhiều mạng LAN trên phạm vi địa lí rộng lớn (liên tỉnh, giữa các chi nhánh ngân hàng toàn quốc, xuyên lục địa). Internet là mạng WAN lớn nhất toàn cầu.

**Theo môi trường truyền dẫn:**
- **Kết nối có dây:** Ổn định, băng thông cao, ít bị nhiễu sóng hay suy giảm do tường chắn.
- **Kết nối không dây (Wi-Fi, Bluetooth):** Linh hoạt cho thiết bị di động vì không cần kéo dây cáp. Bluetooth dùng cho cự li rất ngắn (kết nối tai nghe, truyền tệp gần nhau), còn Wi-Fi phủ sóng phòng/tòa nhà.`,
            },
          ],
          example: {
            title: "Sơ đồ kết nối mạng LAN trường học ra Internet",
            code: `[30 Máy tính phòng TH] + [Máy in mạng]
        │  (Cáp xoắn đôi RJ45)
        ▼
    [Switch] ◀──(Wi-Fi)── [Access Point] ◀── [Laptop/Điện thoại]
        │
        ▼
  [Router / Modem] ──(Cáp quang ISP)──▶ [Mạng Internet (WAN)]`,
            language: "text",
            steps: [
              "Switch kết nối tập trung các máy bàn và máy in trong cùng phòng học (mạng LAN).",
              "Access Point mở rộng kết nối không dây Wi-Fi cho thiết bị di động vào cùng mạng LAN đó.",
              "Router định tuyến gói tin từ LAN đi qua Modem/đường truyền quang ra Internet.",
            ],
            explanation:
              "Mỗi thiết bị mạng đảm nhận một vai trò riêng biệt; hiểu đúng sơ đồ giúp trả lời chính xác mọi câu hỏi phân loại thiết bị.",
          },
          commonMistakes: [
            "Nhầm lẫn chức năng của Modem và Router: Modem chuyển đổi tín hiệu đường truyền ISP, còn Router định tuyến gói tin giữa các mạng.",
            "Cho rằng mạng Bluetooth có phạm vi rộng hơn Wi-Fi hoặc cáp đồng ít suy hao hơn cáp quang (thực tế cáp quang truyền xa và ít suy hao nhất).",
            "Nghĩ rằng một máy tính đơn lẻ không mở được phần mềm Word/soạn thảo nếu chưa nối mạng LAN — thực tế phần mềm cục bộ vẫn chạy bình thường.",
          ],
          note: "Mẹo ghi nhớ nhanh: LAN = phạm vi hẹp (Switch), WAN = diện rộng (Router nối các mạng), Cáp quang = ánh sáng, tốc độ cao, ít nhiễu.",
        },
        {
          id: "l10-2-2",
          title: "Internet, DNS và điện toán đám mây",
          minutes: 25,
          orientation: "CHUNG",
          tags: ["Internet", "DNS", "điện toán đám mây"],
          intro:
            "Hàng ngày em gõ địa chỉ như `moet.gov.vn` để xem tin tức hay mở Google Drive để lưu bài tập mà không cần biết máy chủ nằm ở đâu hay có dãy số IP gì. Đằng sau sự tiện lợi đó là bộ giao thức TCP/IP, hệ thống phân giải tên miền DNS và mô hình Điện toán đám mây.",
          objectives: [
            "Hiểu bản chất Internet là mạng của các mạng, không thuộc sở hữu riêng của một tổ chức nào và vận hành nhờ bộ giao thức TCP/IP.",
            "Nắm vững cấu trúc địa chỉ IPv4 (32 bit), tên miền và cơ chế phân giải tên miền của hệ thống DNS.",
            "Trình bày được khái niệm, ví dụ, ưu điểm và hạn chế của Điện toán đám mây (Google Drive, OneDrive, Google Docs...).",
          ],
          bullets: [
            "Internet là mạng toàn cầu kết nối hàng triệu mạng máy tính nhỏ hơn qua bộ giao thức nền tảng TCP/IP; gói tin có thể đi qua nhiều đường dự phòng nếu một tuyến gặp sự cố.",
            "Địa chỉ IPv4 dài 32 bit gồm 4 số thập phân từ 0 đến 255 ngăn cách bởi dấu chấm; DNS phân giải tên miền dễ nhớ thành địa chỉ IP.",
            "Điện toán đám mây cung cấp tài nguyên lưu trữ và phần mềm qua Internet (Google Drive, Google Docs, OneDrive, iCloud), linh hoạt nhưng phụ thuộc kết nối mạng và cần chú ý bảo mật.",
          ],
          sections: [
            {
              title: "Internet và Bộ giao thức TCP/IP",
              content: `- **Internet là gì?** Là "mạng của các mạng" trên phạm vi toàn cầu, kết nối hàng tỉ thiết bị thông qua các mạng cục bộ và mạng diện rộng của nhiều nhà cung cấp dịch vụ.
- **Quyền sở hữu:** Internet **không thuộc sở hữu độc quyền** của bất kì cá nhân, công ty hay chính phủ riêng lẻ nào; mọi máy tính kết nối theo chuẩn chung đều có thể tham gia.
- **Bộ giao thức TCP/IP:** Là bộ giao thức truyền thông nền tảng giúp toàn bộ mạng Internet vận hành thống nhất, chia dữ liệu thành các gói tin (packet), đánh địa chỉ và truyền tới đích. Nếu một tuyến đường truyền bị đứt, gói tin có thể tự động được định tuyến qua đường dự phòng khác.`,
            },
            {
              title: "Địa chỉ IP, Tên miền và Hệ thống DNS",
              content: `- **Địa chỉ IP (Internet Protocol):** Là con số định danh duy nhất cho thiết bị khi tham gia mạng.
  - **IPv4** có độ dài **32 bit**, thường viết dưới dạng **4 số thập phân** ngăn cách bởi dấu chấm, mỗi số có giá trị từ **0 đến 255** (ví dụ: \`192.168.1.1\`, \`14.225.10.25\`). Giá trị nào vượt quá 255 (như \`300.10.1.5\`) là không hợp lệ!
- **Tên miền (Domain Name):** Dãy chữ dễ nhớ thay cho địa chỉ IP số. Tên miền được phân cấp từ phải sang trái (ví dụ trong \`thpt.moet.gov.vn\`: \`.vn\` là mã quốc gia Việt Nam, \`.gov\` là tổ chức chính phủ, \`moet\` là Bộ GD&ĐT).
- **Hệ thống DNS (Domain Name System):** Đóng vai trò như **"danh bạ điện thoại của Internet"**, có chức năng **phân giải tên miền thành địa chỉ IP** tương ứng (và ngược lại). Các máy chủ DNS trên toàn cầu được tổ chức theo cấu trúc **phân cấp hình cây**.

> **Lưu ý:** Nếu DNS gặp sự cố, người dùng vẫn có thể truy cập trang web nếu gõ trực tiếp đúng địa chỉ IP của máy chủ web đó vào trình duyệt.`,
            },
            {
              title: "Điện toán đám mây (Cloud Computing)",
              content: `Điện toán đám mây là việc cung cấp các tài nguyên tính toán (máy chủ, lưu trữ tệp, phần mềm ứng dụng) qua mạng Internet thay vì phải tự đầu tư máy chủ vật lí hoặc cài đặt nặng lên máy cá nhân.

- **Ví dụ phổ biến:**
  - *Lưu trữ & đồng bộ đám mây:* Google Drive, Microsoft OneDrive, Apple iCloud, Dropbox.
  - *Phần mềm trực tuyến trên trình duyệt (SaaS):* Google Docs, Google Sheets, Canva — cho phép nhiều người cùng chỉnh sửa một tài liệu theo thời gian thực.
- **Ưu điểm:** Tiết kiệm chi phí mua máy chủ vật lí ban đầu; dễ dàng mở rộng/thu hẹp dung lượng linh hoạt theo nhu cầu; truy cập và đồng bộ dữ liệu trên nhiều thiết bị (điện thoại, laptop).
- **Hạn chế & Lưu ý:** Phụ thuộc vào kết nối Internet (khi mất mạng hoàn toàn thì không đồng bộ/truy cập dữ liệu mới trên đám mây được); cần chú ý rủi ro rò rỉ dữ liệu nếu lộ mật khẩu hoặc phân quyền chia sẻ công khai quá rộng.`,
            },
          ],
          example: {
            title: "Luồng phân giải tên miền DNS & Kiểm tra địa chỉ IPv4 hợp lệ",
            code: `1. Luồng truy cập Web:
   Người dùng nhập: https://moet.gov.vn
     ──▶ Máy chủ DNS tra cứu trong hệ thống phân cấp
     ──▶ Trả về địa chỉ IPv4 của máy chủ web (VD: 14.225.x.x)
     ──▶ Trình duyệt kết nối trực tiếp tới IP đó qua TCP/IP

2. Kiểm tra địa chỉ IPv4:
   • 172.16.254.1   ──▶ Hợp lệ (4 số, mỗi số từ 0..255)
   • 192.168.300.1  ──▶ KHÔNG hợp lệ (300 > 255)
   • 10.0.5         ──▶ KHÔNG hợp lệ (chỉ có 3 nhóm số)`,
            language: "text",
            explanation:
              "Con người dùng tên miền dễ nhớ nhờ DNS dịch sang IPv4 (4 octet từ 0 đến 255) để máy tính giao tiếp.",
          },
          commonMistakes: [
            "Nhầm rằng mất DNS thì hoàn toàn không thể truy cập trang web ngay cả khi đã biết chính xác địa chỉ IP.",
            "Chọn nhầm địa chỉ IPv4 có số lớn hơn 255 hoặc thiếu/thừa nhóm số (IPv4 chuẩn gồm đúng 4 số 0..255).",
            "Cho rằng dùng dịch vụ đám mây thì không cần Internet hoặc cá nhân vẫn phải tự mua máy chủ vật lí đặt ở nhà.",
          ],
          note: "Ghi nhớ nhanh: TCP/IP = bộ giao thức nền tảng Internet; IPv4 = 32 bit (4 số 0..255); DNS = chuyển tên miền sang IP; Đám mây = lưu trữ/chỉnh sửa trực tuyến mọi nơi.",
        },
        {
          id: "l10-2-3",
          title: "Thư điện tử và ứng dụng web",
          minutes: 20,
          orientation: "CHUNG",
          tags: ["email", "SMTP", "web"],
          intro:
            "Email và trình duyệt web là hai công cụ làm việc quen thuộc nhất trên Internet. Để trả lời đúng các câu hỏi thi về cách gửi nhận thư bí mật, giao thức truyền tải hay sự khác biệt giữa Web 1.0 và Web 2.0, em cần nắm chắc các quy tắc kĩ thuật bên dưới.",
          objectives: [
            "Nắm vững cấu trúc địa chỉ email hợp lệ và phân biệt chuẩn xác chức năng các trường To, Cc, Bcc, Subject.",
            "Phân biệt 3 giao thức thư điện tử: SMTP (gửi), POP3 (nhận tải về) và IMAP (nhận đồng bộ nhiều thiết bị).",
            "Hiểu khái niệm URL, HTTP/HTTPS, siêu liên kết (Hyperlink), trình duyệt web và sự khác nhau giữa Web 1.0 với Web 2.0.",
          ],
          bullets: [
            "Địa chỉ email có dạng ten_tai_khoan@ten_mien (duy nhất 1 kí tự @); Bcc ẩn danh sách người nhận khỏi nhau, còn Cc hiển thị công khai.",
            "SMTP dùng để GỬI thư; POP3 và IMAP dùng để NHẬN thư (IMAP đồng bộ trạng thái đã đọc trên nhiều thiết bị tốt hơn POP3).",
            "URL định vị duy nhất tài nguyên Web; HTTPS mã hóa bảo mật (SSL/TLS) có biểu tượng ổ khóa; Web 2.0 cho phép người dùng tương tác và tạo nội dung.",
          ],
          sections: [
            {
              title: "Cấu trúc Thư điện tử (Email) và Các trường gửi thư",
              content: `- **Cú pháp địa chỉ Email:** \`ten_nguoi_dung@ten_mien\` (ví dụ \`hocsinh10a1@itmaster.edu.vn\`). Luôn có **đúng 1 kí tự \`@\`** ngăn cách phần tên tài khoản và tên miền, không chứa dấu cách.
- **Ý nghĩa các trường khi soạn thư:**
  - **To:** Nhập địa chỉ người nhận chính (KHÔNG phải địa chỉ người gửi).
  - **Cc (Carbon Copy):** Gửi bản sao công khai; mọi người nhận đều nhìn thấy danh sách địa chỉ trong mục Cc.
  - **Bcc (Blind Carbon Copy):** Gửi bản sao **ẩn danh**; những người nhận không thấy được địa chỉ email của nhau (rất hữu ích khi gửi thông báo hàng loạt cho phụ huynh hoặc khách hàng để bảo mật thông tin).
  - **Subject (Chủ đề):** Tiêu đề tóm tắt ngắn gọn nội dung bức thư.
- **An toàn tệp đính kèm:** Email cho phép đính kèm văn bản, ảnh, bảng tính; tuyệt đối không mở tệp thực thi đuôi lạ như \`.exe\`, \`.bat\` hay bấm link lạ yêu cầu nhập mật khẩu ngân hàng (dấu hiệu Phishing).`,
            },
            {
              title: "Giao thức gửi và nhận thư: SMTP, POP3, IMAP",
              content: `| Giao thức | Chức năng | Đặc điểm hoạt động cần nhớ |
| :--- | :--- | :--- |
| **SMTP** *(Simple Mail Transfer Protocol)* | **GỬI thư** | Chuyển thư đi từ máy khách lên máy chủ thư hoặc giữa các máy chủ |
| **POP3** *(Post Office Protocol v3)* | **NHẬN thư** | Mặc định tải thư về một thiết bị và thường xóa bản sao trên máy chủ |
| **IMAP** *(Internet Message Access Protocol)* | **NHẬN & Đồng bộ thư** | Giữ bản sao trên máy chủ, **đồng bộ** hộp thư và trạng thái đã đọc trên nhiều thiết bị (laptop, điện thoại) |`,
            },
            {
              title: "Ứng dụng Web, URL, HTTP/HTTPS và Tìm kiếm thông tin",
              content: `- **Trình duyệt web (Web Browser):** Phần mềm (Chrome, Edge, Firefox, Safari) diễn giải mã HTML/CSS/JS để hiển thị trang web cho người dùng trên cả máy tính và điện thoại.
- **URL (Uniform Resource Locator):** Địa chỉ định vị duy nhất một tài nguyên trên Web (ví dụ \`https://itmaster.vn/theory?grade=10\`).
- **Siêu liên kết (Hyperlink):** Văn bản/hình ảnh gắn liên kết giúp chuyển nhanh sang trang hoặc tài nguyên khác khi nhấp chuột.
- **HTTP vs HTTPS:** \`HTTPS\` bổ sung lớp mã hóa **SSL/TLS** (biểu tượng ổ khóa) giúp bảo vệ dữ liệu truyền giữa trình duyệt và máy chủ khỏi bị nghe lén.
- **Web 1.0 vs Web 2.0:** Web 1.0 là web tĩnh "chỉ đọc", người dùng chỉ xem nội dung có sẵn. **Web 2.0** cho phép người dùng **tương tác, bình luận, tự tạo và chia sẻ nội dung** (mạng xã hội, diễn đàn, ứng dụng web trực tuyến như Google Docs, Canva).
- **Mẹo tìm kiếm thông tin:** Đặt cụm từ trong dấu ngoặc kép \`"..."\` giúp máy tìm kiếm lọc các kết quả chứa chính xác nguyên cụm từ đó; nhưng kết quả đứng đầu chưa chắc chính xác 100%, vẫn cần kiểm chứng.`,
            },
          ],
          example: {
            title: "Phân tích tình huống gửi Email & Cú pháp URL chuẩn",
            code: `Email đúng:   nam.nguyen_10a@truongthpt.edu.vn
Email sai:    nam nguyen@truong.vn (chứa dấu cách), a@@b.com (hai dấu @)

Tình huống: Giáo viên gửi thông báo điểm cho 40 phụ huynh nhưng không muốn phụ huynh thấy email của nhau.
  ──▶ Nhập 40 email vào trường: Bcc (Blind Carbon Copy)
  ──▶ Nhập tiêu đề ngắn gọn vào: Subject`,
            language: "text",
            explanation:
              "Bcc vừa gửi được đồng thời cho nhiều người vừa đảm bảo quyền riêng tư danh sách email.",
          },
          commonMistakes: [
            "Nhầm POP3 và IMAP là giao thức GỬI thư — cả hai đều là giao thức NHẬN thư; chỉ có SMTP dùng để gửi thư.",
            "Nhầm trường To dùng để nhập địa chỉ của chính mình (người gửi).",
            "Nhầm lẫn chức năng giữa Cc (thấy nhau) và Bcc (ẩn danh người nhận).",
            "Tin rằng mọi kết quả đứng đầu Google đều đúng 100% hoặc trình duyệt web chỉ chạy được trên máy tính để bàn.",
          ],
          note: "Câu thần chú email: SMTP = Send (Gửi); POP3 & IMAP = Nhận (IMAP đồng bộ nhiều thiết bị); Bcc = Bí mật danh sách người nhận.",
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
          intro:
            "Không gian mạng cho phép ta kết nối nhanh với hàng triệu người, nhưng ẩn sau màn hình không có nghĩa là 'vô can'. Tin giả (fake news), bắt nạt trực tuyến và phát ngôn thiếu kiểm soát có thể gây tổn thương tâm lí nặng nề và kéo theo hệ lụy pháp lí.",
          objectives: [
            "Thực hành đúng chuẩn mực giao tiếp lịch sự, tôn trọng quan điểm khác biệt và bảo vệ sự riêng tư của người khác trên mạng.",
            "Nhận diện các dấu hiệu của tin giả (fake news) và áp dụng quy trình kiểm chứng 3 bước trước khi chia sẻ.",
            "Biết quy trình 3 bước ứng phó an toàn khi gặp tình huống bị quấy rối hoặc bắt nạt qua mạng (Cyberbullying).",
          ],
          bullets: [
            "Mọi phát ngôn trên mạng đều phải chịu trách nhiệm trước pháp luật — tài khoản ẩn danh vẫn có thể bị truy vết và xử lí nếu tung tin sai sự thật hay vu khống.",
            "Kiểm chứng tin tức qua báo chí chính thống, cổng thông tin cơ quan nhà nước (.gov.vn) và đối chiếu nhiều nguồn trước khi chia sẻ; nếu lỡ chia sẻ nhầm phải gỡ bài và đính chính.",
            "Khi bị đe dọa hoặc bắt nạt qua mạng: (1) Lưu/chụp ảnh bằng chứng, (2) Chặn & báo cáo (Report) tài khoản vi phạm, (3) Báo cho gia đình, thầy cô hoặc cơ quan chức năng.",
          ],
          sections: [
            {
              title: "Chuẩn mực văn hóa ứng xử trên không gian mạng",
              content: `- **Lịch sự và tôn trọng:** Dùng ngôn từ đúng mực khi bình luận hoặc trao đổi trong nhóm học tập; biết lắng nghe và phản biện dựa trên lập luận chứ không công kích cá nhân.
- **Không tiếp tay cho nội dung xấu:** Không bấm "Thích" (Like), chia sẻ hay tranh cãi tay đôi dưới các bài viết kích động bạo lực — vì tương tác càng cao càng khiến thuật toán đẩy bài viết xấu lan rộng.
- **Tôn trọng quyền riêng tư người khác:** Luôn hỏi ý kiến trước khi đăng tải ảnh chụp chung có mặt bạn bè; không tự ý chụp màn hình tung tin nhắn riêng tư giữa hai người lên mạng công khai.
- **Trách nhiệm pháp lí:** Theo Luật An ninh mạng, hành vi bịa đặt, vu khống xúc phạm danh dự, nhân phẩm người khác có thể bị **xử phạt hành chính hoặc truy cứu trách nhiệm hình sự**, kể cả khi sử dụng tài khoản ảo/ẩn danh.`,
            },
            {
              title: "Nhận diện Tin giả (Fake News) và Quy trình kiểm chứng",
              content: `**Dấu hiệu nhận biết bài viết có nguy cơ cao là tin giả:**
- Tiêu đề giật gân, câu view, phóng đại quá mức kèm các cụm từ thúc ép ("chia sẻ gấp", "ai cũng phải biết").
- Tài khoản đăng tải ẩn danh, mới tạo, không trích dẫn nguồn chính thống.
- Hình ảnh cắt ghép, sai ngày đăng (lấy tin cũ nhiều năm trước gắn vào sự kiện hiện tại).

**Quy trình 3 bước kiểm chứng trước khi tin và chia sẻ:**
1. **Kiểm tra nguồn gốc & tác giả:** Trang đăng tải có phải báo chí chính thống hoặc cổng thông tin chính phủ (\`.gov.vn\`) không?
2. **Kiểm tra ngày đăng & ngữ cảnh:** Sự kiện diễn ra lúc nào? Có bị cắt ghép sai ngữ cảnh không?
3. **Đối chiếu đa nguồn:** Tìm xem có cơ quan chức năng hay nhiều tờ báo uy tín khác cùng xác nhận không.

> **Xử lí khi lỡ chia sẻ nhầm:** Việc làm có trách nhiệm nhất là **gỡ bài đăng ngay lập tức** và đăng thông báo đính chính xin lỗi nếu cần.`,
            },
            {
              title: "Phòng tránh và ứng phó với Bắt nạt qua mạng (Cyberbullying)",
              content: `**Bắt nạt qua mạng** là hành vi dùng công nghệ số (tin nhắn, bình luận, lập nhóm nói xấu, tung ảnh ghép) để đe dọa, quấy rối, hạ nhục người khác lặp đi lặp lại.

**Quy trình ứng phó an toàn (không đôi co lại):**
1. **Giữ bình tĩnh và lưu bằng chứng:** Chụp ảnh màn hình toàn bộ tin nhắn, bình luận, đường link tài khoản quấy rối.
2. **Chặn và báo cáo (Block & Report):** Ngắt liên lạc, chặn tài khoản đó và báo cáo vi phạm lên nền tảng mạng xã hội; kiểm tra lại thiết lập quyền riêng tư tài khoản cá nhân.
3. **Tìm kiếm sự hỗ trợ:** Chia sẻ ngay với cha mẹ, thầy cô giáo hoặc người lớn đáng tin cậy (hoặc cơ quan chức năng nếu bị đe dọa nghiêm trọng).`,
            },
          ],
          example: {
            title: "So sánh cách xử lí tình huống trên mạng xã hội",
            code: `Tình huống A: Thấy tin đồn "Học sinh toàn quốc được nghỉ học 1 tháng vì dịch lạ" trên tài khoản lạ.
  ✗ Sai: Chia sẻ ngay vào nhóm lớp vì thấy nhiều lượt Like.
  ✓ Đúng: Vào cổng thông tin Bộ GD&ĐT (moet.gov.vn) và báo chính thống để kiểm chứng.

Tình huống B: Bị tài khoản lạ nhắn tin đe dọa, xúc phạm.
  ✗ Sai: Nhắn tin chửi lại hoặc im lặng chịu đựng.
  ✓ Đúng: Chụp ảnh lưu bằng chứng → Chặn & Báo cáo → Báo thầy cô/phụ huynh.`,
            language: "text",
            explanation:
              "Số lượt thích hay người quen chia sẻ lại không đảm bảo tính xác thực; luôn đối chiếu nguồn chính thống và xử lí văn minh.",
          },
          commonMistakes: [
            "Tin rằng 'dùng nick ảo ẩn danh thì pháp luật không xử lí được' hoặc 'tin nào nhiều lượt Like/bạn thân chia sẻ chắc chắn là thật'.",
            "Chọn phương án đáp trả gay gắt, công kích lại kẻ quấy rối trong câu hỏi tình huống (cách đúng luôn là lưu bằng chứng, chặn, báo cáo và nhờ người lớn).",
            "Nghĩ rằng văng tục hay trêu chọc trên mạng chỉ là đùa vui vô hại.",
          ],
          note: "Gặp câu hỏi tình huống: Tin sốc → Kiểm chứng báo chính thống/.gov.vn; Bị quấy rối → Lưu bằng chứng + Chặn + Báo cáo + Báo người lớn.",
        },
        {
          id: "l10-3-2",
          title: "Bảo vệ thông tin cá nhân và bản quyền",
          minutes: 25,
          orientation: "CHUNG",
          tags: ["thông tin cá nhân", "bản quyền"],
          intro:
            "Chỉ một bức ảnh chụp thẻ căn cước, vé máy bay có mã QR hay một cú nhấp chuột vào đường link lạ cũng đủ khiến người dùng mất quyền kiểm soát tài khoản ngân hàng. Bên cạnh việc tự bảo vệ mình, học sinh còn phải biết tôn trọng bản quyền số theo pháp luật.",
          objectives: [
            "Nhận diện được dữ liệu cá nhân cơ bản và dữ liệu cá nhân nhạy cảm (CCCD, sinh trắc học, tài khoản ngân hàng, OTP) theo Nghị định 13/2023/NĐ-CP.",
            "Áp dụng thành thạo quy tắc tạo mật khẩu mạnh, xác thực hai lớp (2FA) và thói quen an toàn khi dùng Wi-Fi/máy tính công cộng.",
            "Hiểu phạm vi bảo hộ quyền tác giả số, ý nghĩa giấy phép mở Creative Commons (như CC BY) và cách trích dẫn hợp lệ.",
          ],
          bullets: [
            "Dữ liệu nhạy cảm (số CCCD, sinh trắc học vân tay/khuôn mặt, tài khoản ngân hàng, mã OTP, mã QR vé/thẻ) tuyệt đối không công khai hay gửi cho người lạ.",
            "Mật khẩu an toàn phải dài (≥8–12 kí tự), kết hợp chữ hoa, chữ thường, số, kí tự đặc biệt, khác nhau giữa các dịch vụ và luôn bật xác thực 2 lớp (2FA).",
            "Cả văn bản, ảnh, video lẫn mã nguồn phần mềm đều được bảo hộ bản quyền; khi sử dụng lại phải ghi rõ nguồn trích dẫn và tuân thủ giấy phép (như CC BY).",
          ],
          sections: [
            {
              title: "Bảo vệ dữ liệu cá nhân và Nghị định 13/2023/NĐ-CP",
              content: `Tại Việt Nam, **Nghị định 13/2023/NĐ-CP** quy định cụ thể về bảo vệ dữ liệu cá nhân, trong đó chia làm dữ liệu cơ bản và **dữ liệu cá nhân nhạy cảm** cần bảo vệ nghiêm ngặt:

- **Thông tin cần giữ bí mật tuyệt đối:** Số Căn cước công dân (CCCD), dữ liệu sinh trắc học (vân tay, nhận dạng khuôn mặt), số tài khoản ngân hàng, mật khẩu, mã **OTP** (One-Time Password), thông tin sức khỏe, hình ảnh riêng tư và mã QR trên vé máy bay/thẻ ngân hàng.
- **Nguyên tắc vàng với mã OTP:** Không cung cấp mã OTP cho **bất kì ai** qua điện thoại hay tin nhắn, kể cả người tự xưng là nhân viên ngân hàng hoặc công an.`,
            },
            {
              title: "Kĩ năng bảo mật tài khoản và Phòng tránh lừa đảo (Phishing)",
              content: `1. **Tạo mật khẩu mạnh:** Dài tối thiểu 8–12 kí tự, phối hợp đủ **4 nhóm**: chữ hoa (\`A-Z\`), chữ thường (\`a-z\`), chữ số (\`0-9\`) và kí tự đặc biệt (\`@, #, $, !\`). Không dùng ngày sinh, \`123456\`, và **không dùng chung 1 mật khẩu** cho email, mạng xã hội với ngân hàng.
2. **Bật xác thực hai lớp — 2FA (Two-Factor Authentication):** Kết hợp "thứ bạn biết" (mật khẩu) với "thứ bạn có" (mã OTP qua SMS/Authenticator App hoặc sinh trắc học). Ngay cả khi lộ mật khẩu, kẻ gian vẫn bị chặn lại.
3. **Nhận diện tấn công Phishing:** Là hình thức kẻ gian giả mạo giao diện trang web ngân hàng, email cơ quan uy tín để lừa người dùng bấm link lạ và nhập mật khẩu, OTP.
4. **An toàn thiết bị & mạng công cộng:**
   - Khi dùng **máy tính công cộng** (thư viện, phòng net): Dùng chế độ ẩn danh và **đăng xuất (Sign out)** khỏi mọi tài khoản trước khi rời đi (không lưu mật khẩu lên trình duyệt).
   - Khi dùng **Wi-Fi công cộng không mật khẩu**: Không thực hiện giao dịch chuyển tiền ngân hàng hay đăng nhập tài khoản nhạy cảm.
   - Không cài phần mềm **crack (bẻ khóa)** hay ứng dụng từ link lạ ngoài kho chính thức vì dễ chứa mã độc đánh cắp dữ liệu.
   - Khóa màn hình điện thoại bằng mật khẩu/sinh trắc học và cập nhật hệ điều hành, trình duyệt thường xuyên để vá lỗ hổng bảo mật.`,
            },
            {
              title: "Tôn trọng bản quyền số và Giấy phép Creative Commons",
              content: `- **Đối tượng bảo hộ:** Văn bản, hình ảnh, âm thanh, video và cả **mã nguồn phần mềm** đều được pháp luật bảo hộ quyền tác giả.
- **Hiểu đúng về tài nguyên miễn phí trên mạng:** Một bức ảnh hay bài viết tìm thấy miễn phí trên Google **không đồng nghĩa** được phép tự ý sao chép xóa tên tác giả hay đem bán thương mại. Tương tự, quay lén phim chiếu rạp đăng miễn phí lên mạng vẫn là hành vi vi phạm pháp luật.
- **Giấy phép Creative Commons (CC):** Cho phép tác giả quy định rõ quyền tái sử dụng cho cộng đồng. Ví dụ nhãn **\`CC BY\`** (Attribution) cho phép sao chép, chia sẻ và chỉnh sửa lại với điều kiện bắt buộc **ghi rõ tên tác giả / trích dẫn nguồn**.
- **Phần mềm mã nguồn mở:** Vẫn đi kèm giấy phép sử dụng mà người dùng cần tuân thủ.`,
            },
          ],
          example: {
            title: "Đánh giá mật khẩu & Cách trích dẫn ảnh hợp lệ",
            code: `• Mật khẩu YẾU:  123456, nguyenvana2008, matkhau123 (dễ bị dò bằng từ điển)
• Mật khẩu MẠNH: Th!nH0c#10A@2026 (≥12 kí tự, đủ hoa-thường-số-kí tự đặc biệt)

Trích dẫn hợp lệ khi dùng ảnh CC BY trong bài PowerPoint:
  "Ảnh: Sơ đồ mạng máy tính — Tác giả: Nguyễn A (Nguồn: Wikimedia Commons, CC BY 4.0)"`,
            language: "text",
            explanation:
              "Kết hợp mật khẩu mạnh + 2FA bảo vệ tài khoản toàn diện; ghi nguồn đầy đủ thể hiện văn hóa tôn trọng sở hữu trí tuệ.",
          },
          commonMistakes: [
            "Nghĩ rằng tải tài liệu miễn phí trên mạng về hoặc quay lén phim đăng lên mạng không thu tiền thì không vi phạm bản quyền.",
            "Tin rằng 'phần mềm mã nguồn mở không có giấy phép gì, muốn làm gì cũng được' — thực tế chúng có giấy phép riêng (như GNU GPL, MIT).",
            "Cho phép trình duyệt trên máy tính thư viện lưu mật khẩu hoặc quên đăng xuất trước khi về.",
          ],
          note: "Nhớ 4 từ khóa hay thi: Nghị định 13/2023/NĐ-CP (dữ liệu cá nhân), 2FA (xác thực 2 lớp), Phishing (giả mạo đánh cắp mật khẩu/OTP), CC BY (dùng lại phải ghi nguồn).",
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
          intro:
            "Trước khi gõ bất kì dòng lệnh Python nào, lập trình viên cần thiết kế 'bản vẽ tư duy' giải bài toán — đó chính là Thuật toán. Hiểu đúng các tính chất của thuật toán và quy ước sơ đồ khối là nền tảng để đọc hiểu đề thi phần lập trình.",
          objectives: [
            "Trình bày được định nghĩa bài toán (Input/Output) và 5 tính chất bắt buộc của thuật toán.",
            "Phân biệt 3 cách mô tả thuật toán: liệt kê các bước bằng lời, sơ đồ khối (Flowchart) và ngôn ngữ lập trình.",
            "Nhận biết chính xác ý nghĩa từng hình khối chuẩn trong sơ đồ khối và 3 cấu trúc điều khiển cơ bản.",
          ],
          bullets: [
            "Thuật toán là dãy hữu hạn các thao tác rõ ràng, xác định để biến đầu vào (Input) thành đầu ra (Output) đúng đắn.",
            "Quy ước sơ đồ khối: Ô-van/Elip (Bắt đầu/Kết thúc), Hình bình hành (Nhập/Xuất), Hình chữ nhật (Tính toán/Gán), Hình thoi (Kiểm tra điều kiện), Mũi tên (Hướng thực hiện).",
            "Mọi thuật toán đều được tổ chức từ 3 cấu trúc điều khiển: Tuần tự, Rẽ nhánh và Lặp.",
          ],
          sections: [
            {
              title: "Khái niệm bài toán và 5 tính chất của Thuật toán",
              content: `Một bài toán tin học luôn được xác định bởi 2 yếu tố: **Đầu vào (Input)** — các dữ liệu ban đầu đã cho, và **Đầu ra (Output)** — kết quả cần tìm. Một bài toán có thể có nhiều thuật toán khác nhau để giải.

**5 tính chất bắt buộc của một thuật toán chuẩn:**
1. **Tính đầu vào (Input):** Nhận 0 hoặc nhiều giá trị đầu vào hợp lệ.
2. **Tính đầu ra (Output):** Cho ra ít nhất một kết quả đầu ra giải quyết bài toán.
3. **Tính dừng (Finiteness):** Thuật toán **bắt buộc phải kết thúc** sau một số hữu hạn bước (một vòng lặp chạy mãi mãi không thoát ra KHÔNG được coi là thuật toán chuẩn).
4. **Tính xác định (Definiteness):** Mỗi bước phải **rõ ràng, đơn nghĩa**, để bất kì ai hay máy tính nào thực hiện theo cùng đầu vào đều cho kết quả giống nhau.
5. **Tính đúng đắn (Correctness):** Phải cho ra kết quả chính xác với **mọi** bộ dữ liệu đầu vào hợp lệ (chứ không chỉ đúng trên 1 bộ thử đơn lẻ).`,
            },
            {
              title: "Ba cách mô tả thuật toán và Quy ước Sơ đồ khối (Flowchart)",
              content: `Ta có thể mô tả thuật toán bằng 3 cách: **(1) Liệt kê các bước bằng ngôn ngữ tự nhiên**, **(2) Vẽ Sơ đồ khối (Flowchart)** — trực quan, dễ theo dõi luồng rẽ nhánh/lặp, và **(3) Viết bằng ngôn ngữ lập trình** (Python, C++...).

| Hình khối trong Sơ đồ khối | Chức năng quy ước |
| :--- | :--- |
| **Hình ô-van (Elip)** | Điểm **Bắt đầu** hoặc **Kết thúc** thuật toán |
| **Hình bình hành** | Thao tác **Nhập** dữ liệu đầu vào hoặc **Xuất** (In) kết quả |
| **Hình chữ nhật** | Thao tác **Xử lí**, tính toán biểu thức hoặc **gán** giá trị cho biến |
| **Hình thoi** | **Kiểm tra điều kiện** (thường có 2 nhánh đầu ra: Đúng / Sai) |
| **Đường mũi tên** | Chỉ **trình tự và hướng** thực hiện tiếp theo giữa các khối |`,
            },
            {
              title: "Ba cấu trúc điều khiển cơ bản trong mọi thuật toán",
              content: `Mọi thuật toán dù phức tạp đến đâu đều được lắp ghép từ 3 cấu trúc cơ bản sau:

1. **Cấu trúc Tuần tự:** Các bước được thực hiện lần lượt từ trên xuống dưới theo một trình tự cố định (không bỏ bước, không đảo ngẫu nhiên).
2. **Cấu trúc Rẽ nhánh:** Kiểm tra một điều kiện logic để lựa chọn nhánh xử lí tương ứng với kết quả Đúng hoặc Sai.
3. **Cấu trúc Lặp:** Thực hiện lặp đi lặp lại một nhóm thao tác khi điều kiện còn thỏa mãn (hoặc lặp với số lần xác định).`,
            },
          ],
          example: {
            title: "Mô tả thuật toán Tìm giá trị lớn nhất trong 2 số a, b",
            code: `• Input:  Hai số a và b
• Output: Giá trị lớn nhất max_val

Sơ đồ khối dạng văn bản:
  [Hình ô-van]        Bắt đầu
       │
       ▼
  [Hình bình hành]    Nhập a, b
       │
       ▼
  [Hình thoi]         Kiểm tra: a > b ?
     ├── Đúng ──▶ [Hình chữ nhật]  max_val ← a
     └── Sai  ──▶ [Hình chữ nhật]  max_val ← b
       │
       ▼
  [Hình bình hành]    Xuất max_val
       │
       ▼
  [Hình ô-van]        Kết thúc`,
            language: "text",
            explanation:
              "Chú ý cách dùng đúng từng loại hình khối: nhập/xuất dùng bình hành, gán giá trị dùng chữ nhật, kiểm tra điều kiện dùng hình thoi.",
          },
          commonMistakes: [
            "Nhầm hình bình hành (Nhập/Xuất) với hình chữ nhật (Xử lí/Tính toán/Gán).",
            "Nhầm hình ô-van (Bắt đầu/Kết thúc) dùng cho nhập dữ liệu.",
            "Cho rằng một chương trình lặp vô hạn vẫn là thuật toán chuẩn (vi phạm Tính dừng), hoặc chỉ cần chạy đúng 1 test mẫu là đạt Tính đúng đắn.",
          ],
          note: "Ghi nhớ nhanh sơ đồ khối: Ô-van = Bắt đầu/Dừng; Bình hành = Nhập/Xuất; Chữ nhật = Tính/Gán; Thoi = Điều kiện.",
        },
        {
          id: "l10-4-2",
          title: "Biến, kiểu dữ liệu và nhập xuất",
          minutes: 25,
          orientation: "CHUNG",
          tags: ["Python", "biến", "input"],
          intro:
            "Làm quen với ngôn ngữ lập trình Python: cách đặt tên biến hợp lệ, hiểu 4 kiểu dữ liệu cơ bản, phân biệt phép chia `/` với `//` và `%`, cũng như tránh lỗi kinh điển khi dùng hàm `input()` và `print()`.",
          objectives: [
            "Đặt tên biến hợp lệ và hiểu phép gán động trong Python (bao gồm hoán đổi giá trị `a, b = b, a`).",
            "Phân biệt 4 kiểu dữ liệu cơ bản (`int`, `float`, `str`, `bool`), hàm `type()` và cách ép kiểu (`int()`, `float()`, `str()`).",
            "Tính đúng giá trị biểu thức theo thứ tự ưu tiên phép toán (`**` → `* / // %` → `+ -`) và sử dụng chuẩn tham số `sep`, `end` trong `print()`.",
          ],
          bullets: [
            "Tên biến chỉ gồm chữ cái, chữ số, dấu `_`; không bắt đầu bằng chữ số, không chứa khoảng trắng/kí tự đặc biệt, phân biệt hoa-thường và không trùng từ khóa.",
            "Hàm `input()` LUÔN trả về xâu (`str`), cần dùng `int(input())` hoặc `float(input())` khi tính toán số học.",
            "Trong Python 3, phép `/` luôn trả về số thực (`float`, VD `10 / 2 = 5.0`), `//` chia lấy phần nguyên, `%` lấy phần dư, `**` là lũy thừa.",
          ],
          sections: [
            {
              title: "Quy tắc đặt tên biến, phép gán và chú thích",
              content: `- **Biến (Variable):** Dùng để lưu giữ giá trị trong bộ nhớ; trong Python, biến không cần khai báo kiểu trước và có thể gán lại giá trị thuộc kiểu dữ liệu khác.
- **Quy tắc đặt tên biến hợp lệ:**
  - Chỉ được chứa chữ cái (\`a-z\`, \`A-Z\`), chữ số (\`0-9\`) và dấu gạch dưới \`_\` (VD: \`_tong_diem\`, \`diem10\`).
  - **Không** bắt đầu bằng chữ số (sai: \`10a\`), **không** chứa dấu cách hay dấu gạch ngang \`-\`.
  - **Không** trùng từ khóa của Python (\`if\`, \`for\`, \`while\`, \`def\`, \`True\`, \`and\`...).
  - Python **phân biệt chữ hoa và chữ thường** (\`Tuoi\` khác \`tuoi\`).
- **Phép gán \`=\`:** Viết \`ten_bien = gia_tri\` (chiều từ phải sang trái; viết \`10 = x\` là sai cú pháp!). Python hỗ trợ gán hoán đổi rất gọn: \`a, b = b, a\`.
- **Chú thích (Comment):** Dùng dấu \`#\` để viết ghi chú trên 1 dòng; trình thông dịch bỏ qua phần sau \`#\`.`,
            },
            {
              title: "4 kiểu dữ liệu cơ bản và Ép kiểu",
              content: `| Kiểu dữ liệu | Tên tiếng Anh | Ví dụ | Ghi chú quan trọng |
| :--- | :--- | :--- | :--- |
| \`int\` | Số nguyên | \`-5, 0, 2026\` | \`int('25')\` → \`25\`; \`int(9.8)\` → \`9\` (cắt phần thập phân, không làm tròn lên) |
| \`float\` | Số thực | \`3.14, 5.0, -2.5\` | \`float('7.5')\` → \`7.5\` |
| \`str\` | Xâu kí tự | \`'Python', "12"\` | \`'Tin' + '10'\` → \`'Tin10'\`; \`'5' * 3\` → \`'555'\` (lặp xâu, hợp lệ!) |
| \`bool\` | Logic | \`True, False\` | \`bool(0)\` → \`False\`; số khác 0 cho \`True\` |

- Dùng hàm **\`type(x)\`** để kiểm tra kiểu dữ liệu hiện tại của biến hoặc giá trị \`x\` (VD: \`type(True)\` cho \`<class 'bool'>\`).`,
            },
            {
              title: "Các phép toán số học và Thứ tự ưu tiên",
              content: `| Phép toán | Ý nghĩa | Ví dụ & Kết quả |
| :--- | :--- | :--- |
| \`**\` | Lũy thừa (ưu tiên cao nhất) | \`2 ** 3\` → \`8\` |
| \`*\` | Phép nhân | \`3 * 4\` → \`12\` |
| \`/\` | Chia thực (luôn ra \`float\`) | \`10 / 2\` → \`5.0\` |
| \`//\` | Chia lấy phần nguyên | \`17 // 5\` → \`3\` |
| \`%\` | Chia lấy phần dư | \`17 % 5\` → \`2\` |
| \`+\`, \`-\` | Cộng, trừ (ưu tiên thấp nhất) | \`2 + 3 * 2 ** 2\` → \`2 + 3 * 4\` → \`14\` |

**Thứ tự ưu tiên từ cao xuống thấp:** Ngoặc tròn \`()\` → Lũy thừa \`**\` → Nhân/Chia (\`*\`, \`/\`, \`//\`, \`%\`, từ trái sang phải) → Cộng/Trừ (\`+\`, \`-\`).`,
            },
            {
              title: "Nhập xuất chuẩn với input() và print()",
              content: `- **Nhập dữ liệu \`input()\`:** Luôn trả về kiểu xâu (\`str\`). Nếu gõ \`10\` cho \`x = input()\`, thì \`x\` là \`'10'\` nên \`x + 5\` sẽ báo lỗi \`TypeError\`! Muốn nhập số nguyên phải viết \`n = int(input())\`, nhập số thực viết \`x = float(input())\`.
- **Xuất dữ liệu \`print()\`:**
  - \`sep\` quy định kí tự ngăn cách giữa các đối số (mặc định là dấu cách \`' '\`). Ví dụ: \`print('Tin', '10', sep='_', end='!')\` in ra \`Tin_10!\`.
  - \`end\` quy định kí tự kết thúc sau lệnh \`print\` (mặc định là xuống dòng \`'\\n'\`). Đặt \`end=''\` hoặc \`end=' '\` để các lệnh \`print\` tiếp theo in trên cùng một dòng.`,
            },
          ],
          example: {
            title: "Nhập 2 số nguyên, hoán đổi giá trị và tính chia nguyên, chia dư",
            code: `a = int(input("Nhập a: "))   # VD nhập 17
b = int(input("Nhập b: "))   # VD nhập 5
print("Thương nguyên:", a // b, "Số dư:", a % b)  # 3 và 2

a, b = b, a                  # Hoán đổi nhanh: a = 5, b = 17
print("Sau hoán đổi:", a, b, sep=" - ", end="!")  # Sau hoán đổi: - 5 - 17!`,
            language: "python",
            steps: [
              "Ép kiểu int() ngay quanh input() để a, b là số nguyên.",
              "Thực hiện a // b = 3 và a % b = 2.",
              "Lệnh a, b = b, a hoán đổi giá trị hai biến trong một dòng.",
            ],
            explanation:
              "Nếu thiếu `int()`, phép `//` hay `%` trên hai xâu sẽ gây lỗi `TypeError`.",
          },
          examples: [
            {
              title: "Nhập 2 số nguyên, hoán đổi giá trị và tính chia nguyên, chia dư",
              code: `a = int(input("Nhập a: "))   # VD nhập 17
b = int(input("Nhập b: "))   # VD nhập 5
print("Thương nguyên:", a // b, "Số dư:", a % b)  # 3 và 2

a, b = b, a                  # Hoán đổi nhanh: a = 5, b = 17
print("Sau hoán đổi:", a, b, sep=" - ", end="!")`,
              language: "python",
              explanation:
                "Ép kiểu `int()` giúp tính toán đúng; `sep` đổi dấu ngăn cách giữa các mục, `end` đổi kí tự cuối dòng.",
            },
            {
              title: "Tính giá trị biểu thức phức hợp và kiểm tra kiểu",
              code: `x = 2 + 3 * 2 ** 2     # 2**2 = 4 -> 3*4 = 12 -> 2+12 = 14
y = 10 / 2             # 5.0 (kiểu float)
z = int(9.8)           # 9 (cắt phần thập phân)
s = '5' * 3            # '555' (lặp xâu, không phải 15)
print(x, type(y), z, s)`,
              language: "python",
              explanation:
                "Chú ý `**` tính trước `*`, phép `/` luôn ra `float`, và `'5' * 3` lặp xâu thành `'555'` chứ không báo lỗi.",
            },
          ],
          commonMistakes: [
            "Quên rằng `input()` luôn trả về `str`: `a = input(); b = input(); print(a + b)` với `12` và `34` sẽ ghép xâu ra `'1234'` chứ không phải `46`!",
            "Nghĩ rằng `10 / 2` ra số nguyên `5` — trong Python 3, `/` luôn ra `5.0` (`float`).",
            "Tưởng `int(9.8)` làm tròn thành `10` — thực chất `int()` chỉ cắt bỏ phần thập phân cho ra `9`.",
            "Tính sai thứ tự ưu tiên: làm `2 + 3` trước khi nhân hoặc làm `3 * 2` trước khi lũy thừa `** 2`.",
          ],
          note: "Nhớ 3 bẫy kinh điển: input() luôn ra str; 10 / 2 luôn ra float (5.0); int(9.8) cắt bỏ thập phân ra 9.",
        },
        {
          id: "l10-4-3",
          title: "Rẽ nhánh",
          minutes: 25,
          orientation: "CHUNG",
          tags: ["if", "elif", "điều kiện"],
          intro:
            "Không phải lúc nào chương trình cũng chạy thẳng một mạch từ trên xuống. Khi cần kiểm tra điểm xếp loại, kiểm tra số chẵn lẻ hay năm nhuận, ta dùng cấu trúc rẽ nhánh `if ... elif ... else` kết hợp các phép toán so sánh và logic.",
          objectives: [
            "Viết chuẩn cú pháp câu lệnh rẽ nhánh `if`, `if...else`, `if...elif...else` và `if` lồng nhau trong Python.",
            "Phân biệt phép gán `=` với phép so sánh bằng `==` cùng các toán tử so sánh và logic (`and`, `or`, `not`).",
            "Tuân thủ quy tắc dấu hai chấm `:` và thụt lề thẳng hàng để tránh lỗi `IndentationError`.",
          ],
          bullets: [
            "Cấu trúc rẽ nhánh dùng từ khóa `if`, `elif` (không dùng `else if`), `else`, bắt buộc có dấu hai chấm `:` ở cuối dòng điều kiện.",
            "Các câu lệnh cùng một khối `if` phải thụt lề thẳng hàng nhau (chuẩn 4 dấu cách); thụt lề sai gây lỗi `IndentationError`.",
            "Trong một chuỗi `if ... elif ... else`, tối đa chỉ có MỘT nhánh thỏa mãn đầu tiên được thực thi; trái lại các lệnh `if` độc lập nối tiếp nhau sẽ kiểm tra tất cả.",
          ],
          sections: [
            {
              title: "Toán tử so sánh và Toán tử logic",
              content: `| Nhóm toán tử | Kí hiệu | Ý nghĩa | Ví dụ (\`a = 5, b = 5\`) |
| :--- | :--- | :--- | :--- |
| **So sánh** | \`==\` | So sánh bằng (khác phép gán \`=\`!) | \`a == b\` → \`True\` |
| | \`!=\` | So sánh khác | \`a != b\` → \`False\` |
| | \`<\`, \`>\`, \`<=\`, \`>=\` | Bé hơn, lớn hơn, bé/lớn hơn hoặc bằng | \`a >= 5\` → \`True\` |
| **Logic** | \`and\` | Đúng khi **TẤT CẢ** biểu thức đều đúng | \`a == 5 and b > 10\` → \`False\` |
| | \`or\` | Đúng khi có **ÍT NHẤT MỘT** biểu thức đúng | \`a != b or a >= 5\` → \`True\` |
| | \`not\` | Phủ định giá trị logic | \`not False\` → \`True\` |

- **Kiểm tra khoảng giá trị:** Kiểm tra \`x\` thuộc đoạn \`[1, 10]\`: viết \`1 <= x <= 10\` hoặc \`x >= 1 and x <= 10\`.
- **Kiểm tra chia hết:** \`n % 2 == 0\` (số chẵn), \`n % 3 == 0 and n % 5 == 0\` (chia hết cho cả 3 và 5).`,
            },
            {
              title: "Cú pháp if, if...else, if...elif...else và Thụt lề",
              content: `Python dùng **dấu hai chấm \`:\`** kết thúc dòng điều kiện và dùng **thụt lề** (thường 4 dấu cách) để xác định các câu lệnh thuộc thân nhánh (có thể gồm 1 hoặc nhiều lệnh thẳng hàng nhau).

\`\`\`python
if điều_kiện_1:
    # Khối lệnh 1 (chạy khi điều_kiện_1 đúng)
elif điều_kiện_2:
    # Khối lệnh 2 (chạy khi điều_kiện_1 sai và điều_kiện_2 đúng)
else:
    # Khối lệnh mặc định (không bắt buộc phải có elif ở giữa)
\`\`\`

**Điểm cực kì quan trọng khi đọc code đề thi:**
- Với chuỗi **\`if ... elif ... else\`**: Kiểm tra từ trên xuống, gặp điều kiện nào đúng **đầu tiên** thì chạy nhánh đó rồi **thoát ngay** khỏi toàn bộ cấu trúc (tối đa 1 nhánh chạy).
- Với các câu lệnh **\`if\` đứng tách rời liên tiếp**: Mỗi lệnh \`if\` được kiểm tra độc lập! Nếu cả 2 điều kiện đều đúng thì cả 2 đều chạy.`,
            },
          ],
          example: {
            title: "Xếp loại học lực & Kiểm tra năm nhuận",
            code: `# Ví dụ 1: Chuỗi if ... elif ... else (chỉ 1 nhánh chạy)
diem = float(input())
if diem >= 8.0:
    print("Giỏi")
elif diem >= 6.5:
    print("Khá")
else:
    print("Đạt")

# Ví dụ 2: Kiểm tra năm nhuận (chia hết cho 400, hoặc chia hết cho 4 nhưng không chia hết cho 100)
nam = 2024
la_nam_nhuan = (nam % 400 == 0) or (nam % 4 == 0 and nam % 100 != 0)
print(la_nam_nhuan)  # True`,
            language: "python",
            explanation:
              "Với `diem = 8.5`, cả `diem >= 8.0` và `diem >= 6.5` đều đúng nhưng chỉ nhánh đầu tiên (`Giỏi`) được thực thi.",
          },
          examples: [
            {
              title: "Xếp loại học lực & Kiểm tra năm nhuận",
              code: `diem = float(input())
if diem >= 8.0:
    print("Giỏi")
elif diem >= 6.5:
    print("Khá")
else:
    print("Đạt")`,
              language: "python",
              explanation:
                "Các nhánh được kiểm tra lần lượt từ trên xuống; nhánh thỏa mãn đầu tiên chạy rồi kết thúc cấu trúc.",
            },
            {
              title: "Phân biệt if...elif với hai lệnh if liên tiếp",
              code: `x = 10
if x > 5:
    x += 1    # x trở thành 11 (điều kiện 10 > 5 đúng)
if x > 10:
    x += 2    # x trở thành 13 (vì lúc này x = 11 > 10 vẫn đúng!)
print(x)      # Kết quả: 13`,
              language: "python",
              steps: [
                "Ban đầu x = 10.",
                "Lệnh if thứ nhất: 10 > 5 là True → x tăng thêm 1 thành 11.",
                "Lệnh if thứ hai là lệnh ĐỘC LẬP: kiểm tra x mới (11) > 10 là True → x tăng thêm 2 thành 13.",
              ],
              explanation:
                "Rất nhiều học sinh tưởng lệnh thứ hai không chạy vì nhầm sang `elif` hoặc quên cập nhật giá trị mới của `x`.",
            },
          ],
          commonMistakes: [
            "Viết nhầm `else if` (của C/Java) thay vì `elif` trong Python, hoặc quên dấu hai chấm `:`.",
            "Nhầm phép gán `=` với phép so sánh bằng `==` trong biểu thức điều kiện.",
            "Thụt lề không đều giữa các dòng trong cùng một nhánh `if`, gây lỗi `IndentationError`.",
            "Nhầm lẫn hành vi giữa `if ... elif` (chỉ chạy tối đa 1 nhánh) với nhiều lệnh `if` liên tiếp (có thể chạy tất cả nếu đều đúng).",
          ],
          note: "Chú ý phân biệt `if...elif` với nhiều `if` nối tiếp nhau, và luôn chạy tay từng dòng giá trị biến sau mỗi nhánh.",
        },
        {
          id: "l10-4-4",
          title: "Vòng lặp",
          minutes: 30,
          orientation: "CHUNG",
          tags: ["for", "while", "range"],
          intro:
            "Để tính tổng hàng nghìn số, in bảng cửu chương hay duyệt từng kí tự trong văn bản, máy tính cần lặp đi lặp lại thao tác một cách tự động. Python cung cấp hai cấu trúc vòng lặp chính là `for` và `while` cùng hai lệnh điều khiển luồng `break` và `continue`.",
          objectives: [
            "Phân biệt khi nào dùng vòng lặp `for` (biết trước số lần hoặc duyệt tập hợp/xâu) và `while` (lặp theo điều kiện chưa biết trước số lần).",
            "Xác định chính xác dãy số nguyên sinh ra bởi `range(stop)`, `range(start, stop)` và `range(start, stop, step)` kể cả bước nhảy âm.",
            "Phân tích chính xác tác dụng của `break` và `continue` khi chạy tay vết biến qua từng lượt lặp.",
          ],
          bullets: [
            "`range(start, stop, step)` luôn DỪNG TRƯỚC `stop`: `range(5)` sinh `0..4`; `range(1, 5)` sinh `1..4`; `range(3, 3)` rỗng; `step < 0` để đếm ngược.",
            "`while` kiểm tra điều kiện trước mỗi lượt: nếu điều kiện sai ngay từ đầu thì không chạy lần nào; phải cập nhật biến điều kiện trong thân để tránh lặp vô hạn.",
            "`break` thoát hẳn khỏi vòng lặp gần nhất; `continue` chỉ bỏ qua phần còn lại của lượt hiện tại để nhảy sang lượt lặp kế tiếp.",
          ],
          sections: [
            {
              title: "Vòng lặp for và Hàm range()",
              content: `Vòng lặp \`for\` dùng khi biết trước số lần lặp hoặc khi muốn duyệt lần lượt từng phần tử của xâu, danh sách.

**3 dạng của hàm \`range()\`:**
- \`range(n)\`: Sinh các số nguyên từ \`0\` đến \`n - 1\` (tổng cộng \`n\` số). VD: \`range(5)\` → \`0, 1, 2, 3, 4\`.
- \`range(a, b)\`: Sinh các số nguyên từ \`a\` đến \`b - 1\` (KHÔNG bao gồm \`b\`). Nếu \`a >= b\` thì dãy rỗng, vòng lặp chạy 0 lần.
- \`range(a, b, k)\`: Bước nhảy \`k\`. Có thể dùng \`k < 0\` để đếm ngược (VD: \`range(10, 0, -3)\` → \`10, 7, 4, 1\`; \`range(9, 0, -2)\` → \`9, 7, 5, 3, 1\`).

**Duyệt xâu kí tự bằng \`for\`:**
\`\`\`python
for ch in "Python":
    print(ch, end=" ")   # P y t h o n
\`\`\``,
            },
            {
              title: "Vòng lặp while và Kiểm soát lặp vô hạn",
              content: `Vòng lặp \`while\` được ưu tiên khi **chưa biết trước chính xác số lần lặp** (ví dụ: nhập mật khẩu đến khi đúng, chia đôi số \`n\` đến khi bằng 0, lặp khi điều kiện còn thỏa mãn).

\`\`\`python
while điều_kiện:
    # Thực hiện khi điều_kiện là True
    # Nhớ cập nhật biến điều kiện!
\`\`\`

- Nếu \`điều_kiện\` sai ngay từ lần kiểm tra đầu tiên, thân vòng \`while\` chạy **0 lần**.
- Nếu quên cập nhật biến điều kiện (như viết \`i = 1\` rồi \`while i <= 4: print(i)\` mà không tăng \`i\`), hoặc viết \`while True:\` không có \`break\`, chương trình sẽ rơi vào **vòng lặp vô hạn**.`,
            },
            {
              title: "Câu lệnh break và continue",
              content: `Cả \`break\` và \`continue\` đều dùng được bên trong cả \`for\` lẫn \`while\`:

| Lệnh | Tác dụng | Ví dụ với \`for i in range(1, 6):\` |
| :--- | :--- | :--- |
| **\`break\`** | **Thoát ngay lập tức** khỏi vòng lặp đang chứa nó (không chạy các lượt sau nữa) | \`if i == 3: break\` rồi \`print(i)\` → chỉ in \`1 2\` |
| **\`continue\`** | **Bỏ qua phần còn lại** của lượt hiện tại và nhảy ngay sang lượt lặp kế tiếp | \`if i == 3: continue\` rồi \`print(i)\` → in \`1 2 4 5\` |`,
            },
          ],
          example: {
            title: "Tính tổng số chẵn & Chạy tay vòng lặp while",
            code: `# 1. Tính tổng các số chẵn từ 2 đến 10 bằng for
tong = 0
for i in range(2, 11, 2):
    tong += i
print(tong)  # 30 (2 + 4 + 6 + 8 + 10)

# 2. Chạy tay vòng lặp while
n, s = 10, 0
while n > 0:
    s += n
    n -= 4
print(s, n)  # s = 10 + 6 + 2 = 18; n = -2`,
            language: "python",
            steps: [
              "Lượt 1: n=10 > 0 → s = 0+10 = 10, n = 6.",
              "Lượt 2: n=6 > 0 → s = 10+6 = 16, n = 2.",
              "Lượt 3: n=2 > 0 → s = 16+2 = 18, n = -2.",
              "Kiểm tra n > 0 (-2 > 0 là False) → Dừng lặp, in s = 18 và n = -2.",
            ],
            explanation:
              "Khi giải đề trắc nghiệm hoặc tự luận vòng lặp, luôn lập bảng theo dõi giá trị từng biến qua mỗi lượt lặp.",
          },
          examples: [
            {
              title: "Tính tổng số chẵn & Chạy tay vòng lặp while",
              code: `tong = 0
for i in range(2, 11, 2):
    tong += i
print(tong)  # 30`,
              language: "python",
              explanation:
                "Vì `range(start, stop, step)` không lấy `stop`, muốn lấy đến `10` phải viết `stop = 11`.",
            },
            {
              title: "Phân biệt kết quả khi dùng break và continue",
              code: `# Dùng continue: bỏ qua số 3
for i in range(1, 6):
    if i == 3:
        continue
    print(i, end=" ")   # In ra: 1 2 4 5

print()
# Dùng break: dừng hẳn tại 3
for i in range(1, 6):
    if i == 3:
        break
    print(i, end=" ")   # In ra: 1 2`,
              language: "python",
              explanation:
                "`continue` chỉ nhảy qua một lần in khi `i == 3`, còn `break` chấm dứt toàn bộ vòng lặp.",
            },
          ],
          commonMistakes: [
            "Tưởng `range(1, 5)` gồm cả số `5` (thực tế chỉ gồm `1, 2, 3, 4`).",
            "Nhầm `continue` là thoát toàn bộ chương trình hoặc thoát vòng lặp; thực ra `continue` chỉ bỏ qua lượt hiện tại.",
            "Quên bước nhảy âm khi đếm ngược: viết `range(10, 0)` không có `-1` sẽ ra dãy rỗng.",
            "Chạy `while` không cập nhật biến đếm khiến chương trình treo vô hạn.",
          ],
          note: "Luôn kẻ bảng vết biến (Lượt 1, Lượt 2...) cho mọi câu hỏi vòng lặp `for`/`while` và kiểm tra biên `stop - 1` của `range()`.",
        },
      ],
    },
  ],
};
