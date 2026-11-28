import type { GradeCurriculum } from "./curriculum-types";

export const GRADE_12_CURRICULUM: GradeCurriculum = {
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
          intro:
            "Trí tuệ nhân tạo (AI) đang có mặt từ chiếc điện thoại nhận diện khuôn mặt, trợ lí ảo giọng nói đến xe tự lái và chẩn đoán hình ảnh y khoa. Nhưng bản chất AI là gì, gồm những năng lực nào và ranh giới giữa AI hẹp hiện tại với AI tổng quát trong tương lai nằm ở đâu?",
          objectives: [
            "Trình bày được định nghĩa AI và 4 khả năng đặc trưng của hệ thống AI: Học, Suy luận, Nhận thức môi trường và Hiểu ngôn ngữ tự nhiên.",
            "Phân biệt chuẩn xác AI hẹp (Narrow AI / Weak AI), AI tổng quát (AGI) và AI tạo sinh (Generative AI).",
            "Phân tích được các lĩnh vực ứng dụng của AI (Thị giác máy tính, Xử lí ngôn ngữ tự nhiên NLP, gợi ý, tài chính, y tế, nông nghiệp).",
          ],
          bullets: [
            "4 năng lực cốt lõi của AI: Học từ dữ liệu (cải thiện theo thời gian), Suy luận (rút ra kết luận từ tri thức), Nhận thức môi trường (qua cảm biến/camera/micro) và Hiểu ngôn ngữ tự nhiên (NLP).",
            "AI hẹp (Narrow AI) thực hiện xuất sắc MỘT nhiệm vụ chuyên biệt (AlphaZero, Siri, nhận diện khuôn mặt) — hầu hết AI hiện nay thuộc nhóm này; AI tổng quát (AGI) có trí tuệ đa nhiệm như người vẫn đang nghiên cứu.",
            "AI tạo sinh (Generative AI) tạo nội dung mới (văn bản, ảnh, âm thanh, mã nguồn); Thị giác máy tính giúp máy nhìn hiểu ảnh X-quang, biển báo; AI không có ý thức sinh học và vẫn có thể sai sót.",
          ],
          sections: [
            {
              title: "Khái niệm và 4 năng lực đặc trưng của Trí tuệ nhân tạo (AI)",
              content: `**Trí tuệ nhân tạo (Artificial Intelligence — AI)** là lĩnh vực khoa học máy tính nghiên cứu xây dựng các hệ thống phần mềm/máy móc có khả năng mô phỏng hoạt động trí tuệ của con người. *(Lưu ý: AI KHÔNG nhất thiết phải có thân thể robot vật lí; phần mềm chatbot, hệ thống gợi ý phim hay lọc gian lận ngân hàng đều là AI).*

**4 năng lực đặc trưng của hệ thống AI:**
1. **Khả năng học (Learning):** Rút ra tri thức, quy luật từ dữ liệu và tự **cải thiện hiệu suất** theo thời gian khi tiếp xúc thêm dữ liệu mới.
2. **Khả năng suy luận (Reasoning):** Vận dụng quy tắc logic và tri thức đã có để rút ra kết luận hoặc đưa ra quyết định mới.
3. **Khả năng nhận thức môi trường (Perception):** Thu nhận và diễn giải tín hiệu từ thế giới thực thông qua **cảm biến, camera, micro** (ví dụ xe tự lái nhận diện vật cản, biển báo giao thông).
4. **Khả năng hiểu và tạo ngôn ngữ tự nhiên (NLP):** Đọc hiểu văn bản, giao tiếp giọng nói và dịch tự động đa ngôn ngữ theo thời gian thực.

> **Giới hạn bản chất:** AI chưa có **tự ý thức sinh học**, cảm xúc tự thân hay quyền công dân; đồng thời không phải mọi phần mềm rẽ nhánh \`if-else\` cứng nhắc đơn giản đều được gọi là AI tổng quát.`,
            },
            {
              title: "Phân loại AI theo mức độ năng lực: Narrow AI, AGI và Generative AI",
              content: `| Phân loại | Bản chất & Phạm vi | Hiện trạng & Ví dụ |
| :--- | :--- | :--- |
| **AI hẹp (Narrow AI / Weak AI)** | Giải quyết xuất sắc **một hoặc một nhóm nhiệm vụ chuyên biệt**; ra khỏi phạm vi đó thì không hoạt động được | Chiếm **hầu hết AI hiện nay**: chơi cờ AlphaZero, mở khóa khuôn mặt, trợ lí ảo Siri/Google Assistant, dịch máy |
| **AI tổng quát (AGI — General AI)** | Có khả năng tự học, suy luận và giải quyết **linh hoạt mọi nhiệm vụ trí tuệ đa dạng** tương đương con người | **Vẫn đang là mục tiêu nghiên cứu**, chưa đạt được hoàn chỉnh |
| **AI tạo sinh (Generative AI)** | Nhánh AI có khả năng **tạo mới nội dung** (văn bản, hình ảnh, âm thanh, video, mã nguồn) từ mẫu dữ liệu đã học | ChatGPT, Gemini, Claude, Midjourney |`,
            },
            {
              title: "Các lĩnh vực công nghệ và Ứng dụng thực tế tiêu biểu",
              content: `- **Thị giác máy tính (Computer Vision):** Giúp máy tính "nhìn" và phân tích hình ảnh/video (đọc ảnh X-quang hỗ trợ bác sĩ, nhận diện khuôn mặt mở khóa smartphone, phát hiện sâu bệnh trong nông nghiệp thông minh).
- **Xử lí ngôn ngữ tự nhiên (NLP):** Trợ lí ảo giao tiếp giọng nói, chatbot chăm sóc khách hàng 24/7, dịch thuật tự động.
- **Tài chính – Ngân hàng:** Phân tích hàng triệu mẫu giao dịch để phát hiện nhanh hành vi gian lận thẻ tín dụng bất thường.
- **Giáo dục & Đời sống:** Hệ thống gợi ý bài giảng/phim phù hợp sở thích cá nhân, cá nhân hóa lộ trình ôn tập.`,
            },
          ],
          example: {
            title: "Phân tích tình huống phân loại AI trong thực tế",
            code: `• Vì sao trợ lí ảo (Siri / Google Assistant) vẫn thuộc nhóm AI hẹp (Narrow AI)?
  ──▶ Vì nó chỉ xử lí giao tiếp ngôn ngữ và các tác vụ trợ lí được lập trình/huấn luyện sẵn, không có trí tuệ đa nhiệm tự chủ hoàn toàn mọi lĩnh vực như con người (AGI).

• Hệ thống AI phân tích ảnh chụp X-quang phổi dùng công nghệ nào?
  ──▶ Thị giác máy tính (Computer Vision).`,
            language: "text",
            explanation:
              "Phân biệt rõ AI hẹp (đã phổ biến, chuyên biệt) với AI tổng quát (đang nghiên cứu, đa nhiệm như người) là điểm hỏi rất hay gặp.",
          },
          commonMistakes: [
            "Nhầm tưởng rằng ChatGPT hay xe tự lái hiện nay đã là AI tổng quát (AGI) hoàn chỉnh vượt xa con người mọi mặt — thực tế vẫn thuộc AI hẹp/tạo sinh chuyên biệt.",
            "Cho rằng hệ thống AI bắt buộc phải có thân hình robot vật lí mới gọi là AI.",
            "Tin rằng AI hoàn toàn miễn nhiễm sai sót nên bác sĩ hay người dùng không cần kiểm tra lại kết quả.",
          ],
          note: "Nhớ: Mọi hệ thống AI vận hành phổ biến hiện nay đều là AI hẹp (Narrow AI); AGI là mục tiêu tương lai; đọc ảnh/video là Computer Vision; hiểu tiếng người là NLP.",
        },
        {
          id: "l12-1-2",
          title: "Học máy và dữ liệu huấn luyện",
          minutes: 30,
          orientation: "CHUNG",
          tags: ["học máy", "dữ liệu"],
          intro:
            "Làm thế nào một phần mềm có thể phân biệt ảnh con chó với con mèo hay lọc thư rác khi con người không thể viết nổi hàng triệu câu lệnh `if-else` cho từng bức ảnh? Câu trả lời nằm ở Học máy (Machine Learning) — nhánh cốt lõi tạo nên sự bùng nổ của AI hiện đại.",
          objectives: [
            "Phân biệt bản chất giữa Lập trình truyền thống và Học máy (Machine Learning).",
            "Phân loại chính xác 3 hướng Học máy: Học có giám sát, Học không giám sát và Học tăng cường cùng bài toán đặc trưng.",
            "Giải thích quy trình chuẩn bị dữ liệu (tiền xử lí, tách tập Train / Test) và hai rủi ro lớn: Thiên lệch dữ liệu (Bias) và Quá khớp (Overfitting).",
          ],
          bullets: [
            "Lập trình truyền thống: Dữ liệu + Quy tắc (do người viết) → Kết quả; Học máy: Dữ liệu + Kết quả mẫu → Mô hình (tự rút ra Quy tắc).",
            "3 hướng Học máy: Có giám sát (dữ liệu đã gán nhãn: phân loại Spam, dự đoán giá nhà); Không giám sát (dữ liệu chưa gán nhãn: gom cụm khách hàng); Tăng cường (thử–sai với phần thưởng/phạt: robot giữ thăng bằng, AI chơi cờ).",
            "Phải tiền xử lí (làm sạch nhiễu, dữ liệu thiếu), tách riêng tập Huấn luyện (Train) và Kiểm thử (Test) để đánh giá khách quan, tránh Quá khớp (Overfitting) và Thiên lệch (Bias).",
          ],
          sections: [
            {
              title: "Lập trình truyền thống vs Học máy (Machine Learning)",
              content: `- **Lập trình truyền thống:** Con người phải viết tường minh toàn bộ **Quy tắc (\`if-else\`, công thức)** rồi đưa **Dữ liệu** vào để máy tính ra **Kết quả**. Phù hợp với bài toán có quy tắc rõ ràng, cố định (ví dụ: tính thuế thu nhập theo bậc, giải phương trình bậc 2).
- **Học máy (Machine Learning):** Con người cung cấp lượng lớn **Dữ liệu** (và kết quả mẫu), thuật toán tự học ra **Mô hình (Quy tắc ẩn)** để dự đoán cho dữ liệu mới. Đặc biệt hiệu quả với bài toán **rất khó viết quy tắc thủ công** như nhận diện khuôn mặt, giọng nói, chữ viết tay.`,
            },
            {
              title: "3 hướng tiếp cận chính của Học máy",
              content: `| Hướng Học máy | Đặc điểm dữ liệu & Cơ chế học | Bài toán điển hình |
| :--- | :--- | :--- |
| **Học có giám sát** *(Supervised Learning)* | Dùng dữ liệu **đã được gán nhãn (biết trước đáp án đúng)** | • Phân loại (Classification): Lọc Email \`Spam\`/\`Thường\`, phân loại ảnh Chó/Mèo<br>• Hồi quy (Regression): Dự đoán **giá nhà** từ diện tích, vị trí |
| **Học không giám sát** *(Unsupervised Learning)* | Dữ liệu **chưa gán nhãn**; thuật toán tự tìm cấu trúc ẩn hoặc **gom cụm** | Phân nhóm khách hàng theo hành vi mua sắm mà chưa định nghĩa sẵn các nhóm |
| **Học tăng cường** *(Reinforcement Learning)* | Tác tử (Agent) tương tác với môi trường qua cơ chế **thử – sai** và tối ưu hóa **phần thưởng / hình phạt** | AI tự chơi cờ vây qua hàng triệu ván, robot tự giữ thăng bằng |`,
            },
            {
              title: "Vai trò của Dữ liệu, Tập Train/Test, Bias và Overfitting",
              content: `- **Tiền xử lí (Làm sạch dữ liệu):** Loại bỏ bản ghi lỗi, nhiễu, xử lí giá trị bị thiếu và chuẩn hóa định dạng trước khi huấn luyện — giúp mô hình học chính xác (dữ liệu sai nhãn sẽ làm mô hình học sai).
- **Chia tập Train và Test:**
  - **Tập huấn luyện (Training Set):** Dùng để mô hình học các tham số/quy luật.
  - **Tập kiểm thử (Test Set):** Phải **tách riêng hoàn toàn** khỏi tập Train để đánh giá khách quan khả năng tổng quát hóa trên dữ liệu mới chưa từng thấy (tuyệt đối không dùng nguyên tập Train để chấm điểm rồi báo cáo độ chính xác!).
- **Quá khớp (Overfitting / Học vẹt):** Hiện tượng mô hình học quá sát (học thuộc cả nhiễu) trên tập huấn luyện nên đạt điểm rất cao khi Train nhưng dự đoán kém trên tập Test / dữ liệu thực tế.
- **Thiên lệch dữ liệu (Data Bias):** Nếu dữ liệu huấn luyện thiếu đa dạng hoặc mang định kiến, mô hình AI tạo ra sẽ đưa ra dự đoán thiếu công bằng với một số nhóm đối tượng.`,
            },
          ],
          example: {
            title: "Phân loại nhanh bài toán Học máy trong đề thi",
            code: `1. Cho 10.000 email đã đánh dấu sẵn "Rác" hoặc "Bình thường" để máy học lọc thư:
   ──▶ Học có giám sát (vì dữ liệu ĐÃ GÁN NHÃN).

2. Cho dữ liệu mua hàng của 50.000 khách (không có nhãn nhóm) để chia thành các tệp khách hàng:
   ──▶ Học không giám sát (vì CHƯA GÁN NHÃN, tự gom cụm).

3. Mô hình đạt 99.8% trên tập Train nhưng chỉ đạt 58% trên tập Test:
   ──▶ Hiện tượng Quá khớp (Overfitting).`,
            language: "text",
            explanation:
              "Chỉ cần xét xem dữ liệu đầu vào có nhãn đáp án sẵn hay không, hay học qua thưởng–phạt là xác định ngay được loại Học máy.",
          },
          commonMistakes: [
            "Nhầm bài toán dự đoán giá nhà (có dữ liệu giá lịch sử đã biết — là Học có giám sát) sang Học không giám sát.",
            "Nghĩ rằng dùng chung Tập kiểm thử (Test) giống hệt Tập huấn luyện (Train) là tốt vì điểm đánh giá cao — đó là sai lầm nghiêm trọng trong đánh giá mô hình.",
            "Cho rằng mô hình học máy chỉ cần 1 mẫu dữ liệu duy nhất hoặc dữ liệu nhiễu/sai nhãn không ảnh hưởng kết quả.",
          ],
          note: "Nhớ cặp từ khóa: Đã gán nhãn → Có giám sát; Chưa gán nhãn/Gom cụm → Không giám sát; Thử-sai + Thưởng/Phạt → Tăng cường; Học vẹt → Quá khớp (Overfitting).",
        },
        {
          id: "l12-1-3",
          title: "Ứng dụng AI, đạo đức AI và hướng nghiệp",
          minutes: 25,
          orientation: "CHUNG",
          tags: ["đạo đức AI", "hướng nghiệp"],
          intro:
            "AI tạo sinh giúp viết lách, lập trình và thiết kế nhanh chóng, nhưng cũng mang theo nguy cơ Deepfake lừa đảo, hiện tượng 'ảo giác AI', rò rỉ dữ liệu nhạy cảm và dịch chuyển thị trường lao động. Đồng thời, đây cũng là dịp để em định hướng nghề nghiệp trong ngành CNTT (Chủ đề G).",
          objectives: [
            "Nhận diện các rủi ro từ AI: Deepfake lừa đảo, Ảo giác AI (Hallucination), rò rỉ dữ liệu cá nhân, thiên lệch và tiêu thụ năng lượng.",
            "Trình bày và vận dụng các nguyên tắc Đạo đức AI: Minh bạch, Giải thích được, Công bằng, An toàn – Riêng tư và Con người chịu trách nhiệm cuối cùng.",
            "Biết cách sử dụng AI có trách nhiệm trong học tập và nhận diện các nhóm nghề nghiệp CNTT trọng tâm theo định hướng ICT & CS (Chủ đề G).",
          ],
          bullets: [
            "Deepfake giả mạo khuôn mặt/giọng nói để lừa chuyển tiền; Ảo giác (Hallucination) là việc AI trả lời rất tự tin nhưng bịa đặt thông tin/nguồn trích dẫn sai sự thật.",
            "Nguyên tắc Đạo đức AI: Minh bạch (thông báo rõ sản phẩm do AI tạo), Giải thích được, Công bằng (tránh dữ liệu lệch), Bảo vệ riêng tư, và Con người luôn giữ quyền kiểm soát & chịu trách nhiệm cuối cùng.",
            "Thị trường lao động CNTT (Chủ đề G): AI thay thế công việc lặp lại và tạo nhu cầu lớn cho người biết làm chủ công nghệ (Quản trị CSDL, Kỹ sư phần mềm/AI, An toàn mạng, Quản trị hệ thống).",
          ],
          sections: [
            {
              title: "Các rủi ro hiện hữu khi phát triển và sử dụng AI",
              content: `- **Deepfake (Giả mạo sâu):** Dùng AI tổng hợp video, hình ảnh hoặc giọng nói giả mạo người thật để lừa đảo (ví dụ giả danh người thân gọi video nhờ chuyển tiền khẩn cấp) hoặc bôi nhọ danh dự.
  - *Cách phòng tránh:* Khi gặp cuộc gọi video nhờ chuyển tiền gấp có biểu hiện giật lag/mặt đơ thiếu tự nhiên, **ngừng chuyển tiền ngay** và xác minh qua kênh liên lạc trực tiếp khác (gọi điện thoại số thường, hỏi câu hỏi riêng tư).
- **Ảo giác AI (Hallucination):** Hiện tượng các mô hình ngôn ngữ lớn (ChatGPT, Gemini...) trả lời rất trôi chảy, tự tin nhưng thông tin bịa đặt hoặc tự nghĩ ra nguồn trích dẫn không có thật. Vì vậy **không bao giờ tin 100%** kết quả chatbot mà không kiểm chứng!
- **Rò rỉ dữ liệu riêng tư:** Nhập số CCCD, mật khẩu, hồ sơ bệnh án hay bí mật công ty vào chatbot AI công khai có nguy cơ bị lưu lại hoặc rò rỉ.
- **Thiên lệch & Tiêu thụ tài nguyên:** Dữ liệu huấn luyện thiên vị khiến AI tuyển dụng đối xử bất công với một nhóm ứng viên; ngoài ra các mô hình AI lớn tiêu thụ rất nhiều điện năng và tài nguyên tính toán.`,
            },
            {
              title: "Nguyên tắc Đạo đức AI và Cách dùng AI học tập đúng đắn",
              content: `1. **Tính minh bạch (Transparency):** Người dùng phải được thông báo rõ khi đang tương tác với AI, và các nội dung (ảnh, bài viết, video) do AI tạo nên được đánh dấu nguồn gốc để tránh gây hiểu lầm.
2. **Tính giải thích được (Explainability):** Cần hiểu được cơ sở, lí do vì sao hệ thống AI đưa ra một quyết định quan trọng (ví dụ duyệt vay vốn hay chẩn đoán bệnh) chứ không chỉ là "hộp đen".
3. **Tính công bằng & Nhân văn:** Phục vụ lợi ích con người, không gây hại, không phân biệt đối xử.
4. **Con người chịu trách nhiệm cuối cùng:** Trong mọi lĩnh vực trọng yếu (y tế, pháp luật, tài chính), **con người** luôn là chủ thể kiểm duyệt và chịu trách nhiệm cuối cùng — phần mềm AI không thể tự ra tòa chịu trách nhiệm thay tổ chức y tế hay bác sĩ.

**Dùng AI trong học tập có trách nhiệm:** Dùng AI để gợi ý ý tưởng, giải thích khái niệm khó, sửa lỗi code rồi **tự kiểm chứng, tự viết lại và rèn tư duy phản biện**; tuyệt đối không sao chép nguyên văn bài làm của AI rồi nhận là sản phẩm của mình.`,
            },
            {
              title: "Tác động việc làm và Định hướng nghề nghiệp CNTT (Chủ đề G)",
              content: `AI không làm mất hết việc làm mà **tự động hóa các công việc lặp lại**, đồng thời tạo ra nhiều nghề nghiệp mới đòi hỏi kĩ năng số và tư duy sáng tạo cao.

| Nhóm nghề tiêu biểu (Chủ đề G) | Công việc chính | Gắn với định hướng THPT |
| :--- | :--- | :--- |
| **Quản trị Cơ sở dữ liệu (DBA) & Phân tích dữ liệu** | Thiết kế bảng, tối ưu truy vấn SQL, bảo mật và khai thác dữ liệu doanh nghiệp | Định hướng **ICT** |
| **Quản trị mạng & An toàn thông tin** | Vận hành hạ tầng mạng, cấu hình tường lửa, VPN, phòng chống tấn công mạng | Chung & **ICT / CS** |
| **Kĩ sư Phát triển phần mềm & Kĩ sư AI / Thuật toán** | Thiết kế kiến trúc hệ thống, tối ưu thuật toán, huấn luyện và triển khai mô hình AI | Định hướng **CS** |`,
            },
          ],
          example: {
            title: "Xử lí 2 tình huống thực tế về Đạo đức AI",
            code: `Tình huống 1: Cần làm bài tiểu luận Lịch sử có trợ giúp của Chatbot AI.
  ✗ Sai: Copy nguyên bài AI viết nộp thầy cô, không đọc kiểm tra lại số liệu/năm tháng.
  ✓ Đúng: Hỏi AI gợi ý dàn ý, tự đối chiếu lại sự kiện với SGK/nguồn chính thống để tránh "ảo giác", rồi tự viết bài và ghi chú phần tham khảo.

Tình huống 2: Bác sĩ dùng AI gợi ý chẩn đoán khối u trên phim chụp.
  ──▶ Nếu có sai sót xảy ra, bác sĩ / bệnh viện (con người) vẫn là bên chịu trách nhiệm chuyên môn và pháp lí cuối cùng.`,
            language: "text",
            explanation:
              "Mọi câu hỏi về AI trong đề thi đều xoay quanh tính trung thực, kiểm chứng thông tin và vai trò chủ thể chịu trách nhiệm của con người.",
          },
          commonMistakes: [
            "Cho rằng thông tin chatbot AI cung cấp luôn chính xác 100% và không bao giờ bịa đặt nguồn.",
            "Nghĩ rằng nếu AI chẩn đoán sai bệnh thì phần mềm AI sẽ tự chịu trách nhiệm pháp lí thay cho con người.",
            "Cho rằng Đạo đức AI chỉ là chuyện của lập trình viên, người dùng cuối không cần quan tâm.",
            "Tưởng nhập CCCD hoặc dữ liệu mật lên chatbot AI công khai là hoàn toàn không có rủi ro.",
          ],
          note: "Từ khóa hay ra thi: Deepfake (giả mạo mặt/giọng nói), Ảo giác / Hallucination (bịa đặt tự tin), Minh bạch (gắn nhãn nội dung AI) và Con người chịu trách nhiệm cuối cùng.",
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
          intro:
            "Khi em mở trình duyệt truy cập một trang web, gửi email hay gọi video call, hàng triệu gói tin đi qua khắp thế giới mà vẫn tới đúng máy tính và đúng phần mềm trên máy em. Tất cả vận hành trơn tru nhờ kiến trúc 4 tầng của mô hình TCP/IP.",
          objectives: [
            "Trình bày đúng tên, thứ tự từ trên xuống dưới và chức năng từng tầng trong mô hình 4 tầng TCP/IP (phân biệt với mô hình 7 tầng OSI).",
            "So sánh giao thức tầng Giao vận TCP và UDP, biết chọn đúng giao thức theo tính chất ứng dụng và vai trò của số hiệu cổng (Port).",
            "Ghi nhớ chính xác số hiệu cổng mặc định của HTTP (80), HTTPS (443) cùng cấu trúc và độ dài bit của IPv4 (32 bit) và IPv6 (128 bit).",
          ],
          bullets: [
            "Mô hình TCP/IP gồm 4 tầng (từ trên xuống): Tầng Ứng dụng (HTTP, HTTPS, DNS, SMTP) → Tầng Giao vận (TCP, UDP dùng số hiệu cổng Port) → Tầng Liên mạng (IP đánh địa chỉ & định tuyến) → Tầng Truy cập mạng (vật lí, địa chỉ MAC).",
            "TCP đảm bảo truyền tin tin cậy, đầy đủ, đúng thứ tự (tải tệp, web, email); UDP không thiết lập kết nối, truyền nhanh, độ trễ thấp (gọi video, livestream, game trực tuyến).",
            "HTTP (cổng 80) truyền văn bản rõ; HTTPS (cổng 443) mã hóa bằng SSL/TLS; IPv4 dài 32 bit (4 số 0..255), IPv6 dài 128 bit; không có 2 máy nối trực tiếp Internet dùng trùng IP công cộng cùng lúc.",
          ],
          sections: [
            {
              title: "Mô hình 4 tầng TCP/IP (từ trên xuống dưới)",
              content: `Khác với mô hình tham chiếu OSI (7 tầng), bộ giao thức thực tế của Internet — **TCP/IP** — được tổ chức thành **4 tầng** theo thứ tự từ trên xuống dưới:

| Thứ tự (Trên → Dưới) | Tên tầng TCP/IP | Chức năng chính | Giao thức / Định danh tiêu biểu |
| :--- | :--- | :--- | :--- |
| **Tầng 4 (Trên cùng)** | **Tầng Ứng dụng** *(Application)* | Giao tiếp trực tiếp với phần mềm người dùng (trình duyệt, email) | **HTTP, HTTPS, DNS, SMTP, IMAP, POP3** |
| **Tầng 3** | **Tầng Giao vận** *(Transport)* | Chia nhỏ dữ liệu, kiểm soát truyền đầu-cuối, dùng **số hiệu cổng (Port)** để phân biệt các ứng dụng trên cùng 1 máy | **TCP**, **UDP** |
| **Tầng 2** | **Tầng Liên mạng** *(Internet)* | Đánh địa chỉ logic và **định tuyến (Router)** đưa gói tin từ mạng nguồn đến đúng mạng đích | **IP (IPv4, IPv6)** |
| **Tầng 1 (Dưới cùng)** | **Tầng Truy cập mạng** *(Network Access)* | Truyền tín hiệu vật lí trên dây cáp/sóng vô tuyến và xử lí **địa chỉ vật lí MAC** | Ethernet, Wi-Fi, địa chỉ **MAC** |`,
            },
            {
              title: "So sánh Giao thức TCP và UDP",
              content: `| Tiêu chí | TCP *(Transmission Control Protocol)* | UDP *(User Datagram Protocol)* |
| :--- | :--- | :--- |
| **Thiết lập kết nối** | Hướng kết nối (bắt tay 3 bước trước khi truyền) | Không thiết lập kết nối (gửi thẳng gói tin) |
| **Độ tin cậy** | **Rất cao:** Kiểm tra lỗi, xác nhận đã nhận và **gửi lại** nếu mất gói, đảm bảo **đúng thứ tự** | **Không đảm bảo:** Có thể mất gói hoặc đến sai thứ tự, không gửi lại |
| **Tốc độ & Độ trễ** | Chậm hơn một chút do chi phí kiểm tra/xác nhận | **Nhanh, độ trễ rất thấp** |
| **Ứng dụng phù hợp** | Duyệt web (HTTP/HTTPS), tải tệp tin lớn, gửi email (cần chính xác 100%) | **Gọi video trực tiếp, livestream, truyền thoại VoIP, game online** |`,
            },
            {
              title: "Cổng dịch vụ (Port) và Địa chỉ IPv4 / IPv6",
              content: `- **HTTP (Cổng 80):** Truyền tải siêu văn bản giữa trình duyệt (Client) và máy chủ Web dưới dạng văn bản rõ (không mã hóa).
- **HTTPS (Cổng 443):** Bổ sung giao thức bảo mật **SSL/TLS** mã hóa dữ liệu truyền tải web.
- **IPv4:** Độ dài **32 bit**, chia làm 4 nhóm (4 octet) từ \`0\` đến \`255\` ngăn cách bởi dấu chấm (VD \`192.168.1.1\`).
- **IPv6:** Độ dài **128 bit** (biểu diễn bằng 8 nhóm số thập lục phân), ra đời để giải quyết tình trạng cạn kiệt địa chỉ IPv4.
- **Tính duy nhất trên Internet toàn cầu:** Hai thiết bị kết nối trực tiếp vào Internet toàn cầu tại cùng một thời điểm **không thể** dùng trùng một địa chỉ IP công cộng giống hệt nhau.`,
            },
          ],
          example: {
            title: "Phân bổ giao thức theo 4 tầng khi truy cập một trang web",
            code: `1. Tầng Ứng dụng:    DNS đổi "onthi.vn" -> IP; trình duyệt tạo yêu cầu HTTPS (Cổng 443)
2. Tầng Giao vận:    TCP đóng gói dữ liệu, gắn Port đích = 443 đảm bảo không mất gói
3. Tầng Liên mạng:   IP gắn địa chỉ IP nguồn & IP đích để Router định tuyến qua Internet
4. Tầng Truy cập:    Chuyển thành khung dữ liệu gắn địa chỉ MAC và phát lên cáp quang / Wi-Fi`,
            language: "text",
            explanation:
              "Mỗi tầng đảm nhận một phần việc độc lập và bổ sung thông tin điều khiển vào gói tin trước khi truyền qua mạng.",
          },
          commonMistakes: [
            "Nhầm số tầng của mô hình TCP/IP (4 tầng) với mô hình OSI (7 tầng).",
            "Đảo ngược số hiệu cổng: nhớ **HTTP = 80**, **HTTPS = 443** (đừng nhớ ngược 443 cho HTTP!).",
            "Nhầm lẫn tầng của các giao thức: HTTP và DNS nằm ở tầng **Ứng dụng** (không phải tầng Truy cập mạng vật lí).",
            "Nghĩ rằng TCP không thể truyền tệp tin văn bản hoặc hai máy nối trực tiếp Internet công cộng có thể dùng trùng IP công cộng.",
          ],
          note: "Bảng nhớ nhanh: 4 tầng (Ứng dụng → Giao vận → Liên mạng → Truy cập mạng); HTTP = 80, HTTPS = 443; IPv4 = 32 bit, IPv6 = 128 bit.",
        },
        {
          id: "l12-2-2",
          title: "An ninh mạng và mã hoá dữ liệu",
          minutes: 30,
          orientation: "CHUNG",
          tags: ["mã hoá", "chữ kí số"],
          intro:
            "Khi truyền thông tin nhạy cảm qua Internet công cộng, dữ liệu có thể bị nghe lén hoặc giả mạo. Làm thế nào mã hóa đối xứng, mã hóa bất đối xứng, hàm băm và chữ kí số phối hợp với nhau (như trong giao thức HTTPS và VPN) để bảo vệ cả tính bí mật lẫn tính xác thực?",
          objectives: [
            "Phân biệt 3 kĩ thuật mật mã: Mã hóa đối xứng (1 khóa), Mã hóa bất đối xứng (Public Key / Private Key) và Hàm băm (Hash một chiều).",
            "Giải thích chính xác cặp khóa dùng để Kí và Xác minh trong Chữ kí số, cũng như cặp khóa khi Mã hóa gửi tin mật.",
            "Trình bày vai trò của VPN, Tường lửa (Firewall), Hệ thống phát hiện xâm nhập (IDS), Nguyên tắc phân quyền tối thiểu và các thói quen bảo vệ hệ thống.",
          ],
          bullets: [
            "Mã hóa đối xứng dùng CHUNG 1 khóa (tốc độ nhanh, khó trao đổi khóa an toàn từ xa); Mã hóa bất đối xứng dùng cặp Khóa công khai (chia sẻ rộng) & Khóa bí mật (giữ kín tuyệt đối).",
            "Gửi tin mật bất đối xứng: dùng Khóa CÔNG KHAI của người nhận để mã hóa, người nhận dùng Khóa BÍ MẬT của mình để giải mã. Chữ kí số: người gửi dùng Khóa BÍ MẬT của mình để kí, người nhận dùng Khóa CÔNG KHAI của người gửi để kiểm tra.",
            "Hàm băm (Hash) biến dữ liệu thành chuỗi cố định một chiều (không giải mã ngược lại được); HTTPS kết hợp bất đối xứng (trao đổi khóa phiên) + đối xứng (truyền dữ liệu nhanh); VPN tạo đường hầm mã hóa qua mạng công cộng.",
          ],
          sections: [
            {
              title: "Mã hóa đối xứng, Mã hóa bất đối xứng và Hàm băm (Hash)",
              content: `| Kĩ thuật | Cơ chế khóa & Đặc điểm | Ưu / Nhược điểm & Ứng dụng |
| :--- | :--- | :--- |
| **Mã hóa đối xứng** *(Symmetric)* | Dùng **chung 1 khóa bí mật** cho cả mã hóa và giải mã | **Tốc độ rất nhanh**, phù hợp mã hóa dữ liệu dung lượng lớn. **Nhược điểm:** Khó trao đổi khóa chung an toàn qua mạng từ xa |
| **Mã hóa bất đối xứng** *(Asymmetric)* | Dùng **cặp 2 khóa**: **Khóa công khai** *(Public Key — chia sẻ rộng rãi)* và **Khóa bí mật** *(Private Key — giữ kín tuyệt đối)* | Giải quyết bài toán trao đổi khóa và kí số, nhưng tốc độ chậm hơn đối xứng |
| **Hàm băm** *(Hash Function)* | Ánh xạ dữ liệu độ dài bất kì thành chuỗi giá trị cố định **một chiều** | **Không thể giải mã ngược lại** dữ liệu gốc; dùng lưu mật khẩu an toàn và kiểm tra toàn vẹn dữ liệu |

> **Thực tế trong HTTPS:** Trình duyệt và máy chủ dùng **mã hóa bất đối xứng** ở bước đầu để trao đổi an toàn một **khóa phiên**, sau đó dùng **mã hóa đối xứng** bằng khóa phiên đó để truyền toàn bộ dữ liệu trang web với tốc độ cao!`,
            },
            {
              title: "Cơ chế Gửi tin mật vs Chữ kí số (Digital Signature)",
              content: `Đây là hai quy trình **rất dễ bị đảo ngược trong đề thi**, hãy nắm chắc mục đích từng quy trình:

1. **Khi An muốn gửi thông điệp BÍ MẬT chỉ để Bình đọc được:**
   - An lấy **Khóa công khai của Bình** để mã hóa thông điệp.
   - Chỉ duy nhất Bình có **Khóa bí mật của Bình** mới giải mã đọc được.
2. **Khi An tạo CHỮ KÍ SỐ cho văn bản để chứng minh danh tính & tính toàn vẹn:**
   - **Tạo chữ kí:** An dùng **Khóa bí mật (Private Key) của An** để kí lên văn bản (hoặc giá trị băm của văn bản).
   - **Xác minh:** Bất kì người nhận nào cũng có thể lấy **Khóa công khai (Public Key) của An** để kiểm tra: (a) Đúng là An đã kí (**xác thực danh tính**), và (b) Văn bản không bị sửa đổi dù chỉ 1 kí tự (**toàn vẹn**).`,
            },
            {
              title: "Các lớp phòng vệ An ninh mạng: Firewall, IDS, VPN & Phân quyền",
              content: `- **Tường lửa (Firewall):** Kiểm soát và lọc lưu lượng mạng ra/vào dựa trên các quy tắc cho phép hoặc chặn kết nối. *(Lưu ý: Firewall KHÔNG thay thế được ý thức người dùng nếu người dùng tự bấm link lừa đảo Phishing).*
- **Hệ thống phát hiện xâm nhập (IDS):** Giám sát lưu lượng mạng và **cảnh báo** khi phát hiện dấu hiệu tấn công/bất thường.
- **Mạng riêng ảo — VPN (Virtual Private Network):** Tạo **đường hầm mã hóa** qua Internet công cộng, giúp nhân viên/học sinh kết nối làm việc từ xa hoặc dùng Wi-Fi công cộng an toàn tránh bị nghe lén gói tin.
- **Nguyên tắc phân quyền tối thiểu (Least Privilege):** Chỉ cấp cho mỗi tài khoản đúng quyền hạn tối thiểu cần thiết để làm việc, giúp hạn chế tối đa thiệt hại nếu một tài khoản bị lộ.
- **Bảo vệ toàn diện:** Kết hợp **2FA**, dùng mật khẩu riêng biệt cho từng tài khoản, **cập nhật bản vá bảo mật** thường xuyên và **sao lưu định kì tách biệt** để chống Ransomware.`,
            },
          ],
          example: {
            title: "Phân biệt Kí số (Chữ kí số) và Mã hóa bí mật",
            code: `• Kí văn bản (Chữ kí số):
    Người gửi:  Văn bản + Khóa BÍ MẬT của mình    ──▶ Tạo Chữ kí số
    Người nhận: Chữ kí  + Khóa CÔNG KHAI người gửi ──▶ Xác minh danh tính & toàn vẹn

• Gửi tin bí mật từ An tới Bình:
    An:   Tin nhắn + Khóa CÔNG KHAI của Bình ──▶ Bản mã
    Bình: Bản mã   + Khóa BÍ MẬT của Bình    ──▶ Đọc tin gốc`,
            language: "text",
            explanation:
              "Khóa bí mật (Private Key) luôn giữ kín ở chủ sở hữu — dùng để GIẢI MÃ tin gửi tới mình, hoặc dùng để KÍ văn bản của chính mình.",
          },
          commonMistakes: [
            "Đảo ngược khóa của Chữ kí số: tưởng dùng Khóa công khai để kí — thực tế phải dùng **Khóa bí mật của người gửi** để kí, vì nếu dùng Khóa công khai thì ai cũng giả mạo chữ kí được!",
            "Cho rằng Khóa bí mật (Private Key) cần chia sẻ công khai cho mọi người.",
            "Nhầm Chữ kí số chỉ bảo mật nội dung mà không chứng minh được người kí, hoặc nhầm hàm băm (Hash) có thể giải mã ngược lại dữ liệu gốc.",
            "Tin rằng bật tường lửa là có thể nhấp mọi link lạ mà không sợ nhiễm mã độc.",
          ],
          note: "Nguyên tắc vàng: Khóa Bí mật KHÔNG BAO GIỜ chia sẻ! Kí số = Private Key của người gửi; Kiểm tra chữ kí = Public Key của người gửi.",
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
          intro:
            "Nếu một trường học lưu danh sách học sinh bằng hàng chục tệp Excel rời rạc ở phòng Đào tạo, phòng Tài vụ và Thư viện, khi một bạn đổi lớp hoặc đổi số điện thoại, việc cập nhật thủ công từng tệp sẽ gây sai lệch dữ liệu nghiêm trọng. Đó là lí do Cơ sở dữ liệu (CSDL) và Hệ quản trị CSDL ra đời.",
          objectives: [
            "Phân biệt rạch ròi Cơ sở dữ liệu (tập hợp dữ liệu có tổ chức) và Hệ quản trị CSDL (phần mềm dùng để tạo, quản lí và khai thác CSDL).",
            "Trình bày được các ưu điểm cốt lõi của Hệ QTCSDL so với lưu trữ tệp rời rạc: giảm dư thừa/mâu thuẫn, tính nhất quán, độc lập dữ liệu, kiểm soát đồng thời, phân quyền và sao lưu.",
            "Nắm vững 3 nhóm chức năng của Hệ QTCSDL, vai trò Khung nhìn (View), Người quản trị CSDL (DBA) và nhận diện các Hệ QTCSDL phổ biến (MySQL, PostgreSQL, SQL Server, SQLite).",
          ],
          bullets: [
            "CSDL (Database) là tập hợp dữ liệu có cấu trúc liên quan với nhau; Hệ QTCSDL (DBMS như MySQL, PostgreSQL, SQL Server, SQLite) là PHẦN MỀM giúp tạo lập, cập nhật, bảo mật và khai thác CSDL bằng ngôn ngữ chuẩn SQL.",
            "Ưu điểm vượt trội: Giảm trùng lặp dư thừa, đảm bảo tính nhất quán, hỗ trợ tính độc lập dữ liệu (đổi cách lưu vật lí không cần viết lại ứng dụng), kiểm soát giao dịch đồng thời (như đặt vé máy bay), sao lưu/phục hồi.",
            "Khung nhìn (View) che giấu thông tin nhạy cảm theo từng nhóm người dùng; DBA (Database Administrator) chịu trách nhiệm thiết kế, phân quyền, tối ưu và sao lưu CSDL.",
          ],
          sections: [
            {
              title: "Phân biệt Cơ sở dữ liệu (CSDL) và Hệ quản trị CSDL (QTCSDL)",
              content: `- **Cơ sở dữ liệu (CSDL / Database):** Là **tập hợp các dữ liệu** có liên quan với nhau, được tổ chức có cấu trúc và lưu trữ trên máy tính để nhiều người dùng và ứng dụng cùng khai thác (VD: toàn bộ dữ liệu Học sinh, Lớp, Điểm thi, Sách thư viện).
- **Hệ quản trị CSDL (Hệ QTCSDL / DBMS):** Là **hệ thống phần mềm** chuyên dụng cung cấp môi trường để người dùng tạo lập, lưu trữ, cập nhật, bảo mật và khai thác CSDL.
  - *Các Hệ QTCSDL quan hệ phổ biến:* **MySQL, PostgreSQL, Microsoft SQL Server, Oracle**.
  - *Hệ QTCSDL nhúng gọn nhẹ:* **SQLite** (lưu toàn bộ CSDL trong **một tệp duy nhất**, thường nhúng trực tiếp trong ứng dụng di động hoặc phần mềm nhỏ).
- **Ngôn ngữ chuẩn:** **SQL** *(Structured Query Language)* là ngôn ngữ chuẩn phổ biến nhất để định nghĩa cấu trúc và thao tác dữ liệu trong các Hệ QTCSDL quan hệ.`,
            },
            {
              title: "3 nhóm chức năng cơ bản và Ưu điểm của Hệ QTCSDL",
              content: `**3 nhóm chức năng của một Hệ QTCSDL:**
1. **Định nghĩa dữ liệu (DDL):** Tạo lập cấu trúc bảng, xác định kiểu dữ liệu các cột và các ràng buộc khóa.
2. **Cập nhật và khai thác dữ liệu (DML):** Thêm, sửa, xóa bản ghi và tìm kiếm, kết xuất thống kê báo cáo.
3. **Kiểm soát, bảo mật và an toàn dữ liệu:**
   - **Phân quyền truy cập** và tạo **Khung nhìn (View)** che giấu các cột nhạy cảm (ví dụ học sinh chỉ xem điểm của mình, không được sửa điểm hay xem lương giáo viên).
   - **Kiểm soát truy cập đồng thời:** Ngăn xung đột khi nhiều nhân viên cùng đặt vé máy bay/chuyển tiền tại một thời điểm.
   - **Sao lưu và phục hồi (Backup & Recovery):** Khôi phục dữ liệu khi mất điện hoặc hỏng phần cứng.

**Các tính chất quan trọng:**
- **Giảm dư thừa & Đảm bảo nhất quán:** Khắc phục tình trạng lưu cùng dữ liệu ở nhiều tệp rời rạc gây mâu thuẫn khi sửa ở tệp này mà quên tệp kia; mọi giao dịch đều phải thỏa mãn các ràng buộc hợp lệ.
- **Tính độc lập dữ liệu:** Cho phép thay đổi cách tổ chức lưu trữ vật lí mà **không cần viết lại** toàn bộ mã nguồn phần mềm ứng dụng đang khai thác (và dữ liệu cũng không bị khóa chặt vào một ngôn ngữ lập trình duy nhất).`,
            },
            {
              title: "Vai trò của Người quản trị CSDL (DBA)",
              content: `**DBA (Database Administrator)** là người chịu trách nhiệm quản lí tổng thể CSDL: thiết kế và điều chỉnh cấu trúc, **cấp phát phân quyền hợp lí** (chỉ Admin/người có thẩm quyền mới có quyền quản trị, không cấp Full quyền Admin cho mọi người dùng!), theo dõi hiệu năng, lập kế hoạch sao lưu định kì và xử lí sự cố.`,
            },
          ],
          example: {
            title: "So sánh Quản lí bằng Tệp rời rạc vs Hệ QTCSDL",
            code: `• Quản lí rời rạc (Excel ở nhiều phòng):
    Phòng Đào tạo sửa địa chỉ học sinh A, nhưng tệp ở Thư viện vẫn giữ địa chỉ cũ ──▶ Dữ liệu mâu thuẫn, dư thừa!

• Quản lí bằng Hệ QTCSDL (MySQL / PostgreSQL / SQLite):
    Lưu tập trung một nơi; Thư viện chỉ được cấp View xem (Mã HS, Họ tên, Lớp), Đào tạo được quyền cập nhật ──▶ Nhất quán, bảo mật cao.`,
            language: "text",
            explanation:
              "Hệ QTCSDL giải quyết đồng thời 4 bài toán lớn: trùng lặp dữ liệu, mâu thuẫn cập nhật, xung đột đồng thời và phân quyền bảo mật.",
          },
          commonMistakes: [
            "Nhầm lẫn CSDL (chính là dữ liệu) với Hệ QTCSDL (là phần mềm quản trị như MySQL, PostgreSQL, SQLite).",
            "Cho rằng dùng Hệ QTCSDL khiến dữ liệu phụ thuộc hoàn toàn vào một ngôn ngữ lập trình duy nhất (ngược lại: giúp độc lập dữ liệu!).",
            "Nghĩ rằng nên cấp quyền quản trị cao nhất (Admin) cho tất cả người dùng để tiện chỉnh sửa.",
            "Cho rằng thiết kế giao diện đồ họa trò chơi 3D là chức năng cơ bản của Hệ QTCSDL.",
          ],
          note: "Phân biệt nhanh: CSDL = Dữ liệu; Hệ QTCSDL = Phần mềm (MySQL, SQL Server, PostgreSQL, SQLite); SQL = Ngôn ngữ truy vấn; View = Khung nhìn che dữ liệu nhạy cảm.",
        },
        {
          id: "l12-3-2",
          title: "Mô hình quan hệ và khoá",
          minutes: 30,
          orientation: "ICT",
          tags: ["khoá chính", "khoá ngoại"],
          intro:
            "Trong Cơ sở dữ liệu quan hệ, dữ liệu được tổ chức thành các bảng hai chiều liên kết chặt chẽ với nhau. Để không bao giờ xảy ra tình trạng nhầm lẫn hai học sinh trùng tên hay tạo ra bản ghi 'mồ côi' trỏ vào một lớp học không tồn tại, mô hình quan hệ sử dụng các khái niệm Khóa ứng viên, Khóa chính, Khóa ngoại và các ràng buộc toàn vẹn.",
          objectives: [
            "Nắm vững các thuật ngữ của mô hình quan hệ: Bảng (Quan hệ), Hàng (Bản ghi/Tuple), Cột (Trường/Thuộc tính), Miền giá trị (Domain) và các tính chất chuẩn của bảng.",
            "Phân biệt Khóa ứng viên (Candidate Key), Khóa chính (Primary Key) và Khóa tổ hợp (Composite Key); nắm chắc quy tắc Toàn vẹn thực thể (duy nhất và NOT NULL).",
            "Thiết lập đúng Khóa ngoại (Foreign Key) cho các quan hệ 1–1, 1–N và N–N (bảng trung gian), đồng thời giải thích Ràng buộc toàn vẹn tham chiếu.",
          ],
          bullets: [
            "Trong bảng quan hệ: mỗi hàng là 1 Bản ghi (Record/Tuple), mỗi cột là 1 Trường/Thuộc tính (Field/Attribute) có tên phân biệt và cùng Miền giá trị (Domain); mỗi ô chỉ chứa 1 giá trị đơn (nguyên tố), thứ tự hàng/cột không làm đổi bản chất dữ liệu.",
            "Khóa chính (Primary Key) được chọn từ các Khóa ứng viên (có thể là 1 cột như MaHS hoặc Khóa tổ hợp nhiều cột như (MaHS, MaMon, HocKy)); bắt buộc DUY NHẤT và NOT NULL (Toàn vẹn thực thể).",
            "Khóa ngoại (Foreign Key) bảo đảm Toàn vẹn tham chiếu (giá trị ở bảng con phải tồn tại ở khóa chính bảng cha); quan hệ 1–N đặt khóa ngoại ở bảng phía N; quan hệ N–N tách thành bảng trung gian chứa 2 khóa ngoại.",
          ],
          sections: [
            {
              title: "Bảng, Bản ghi, Thuộc tính, Miền giá trị và Tính chất của Bảng",
              content: `Trong **mô hình dữ liệu quan hệ** (do E. F. Codd đề xuất), dữ liệu được lưu trong các **Bảng (Table / Quan hệ — Relation)**:

- **Hàng (Row) = Bản ghi (Record / Bộ / Tuple):** Tập hợp các giá trị trên một hàng tương ứng với một đối tượng cụ thể (VD: hồ sơ của một học sinh).
- **Cột (Column) = Trường (Field) / Thuộc tính (Attribute):** Đại diện cho một đặc điểm của đối tượng (VD: \`MaHS\`, \`HoTen\`, \`DiemTB\`).
- **Miền giá trị (Domain):** Tập hợp các kiểu dữ liệu và phạm vi giá trị hợp lệ mà một thuộc tính có thể nhận (VD: miền giá trị của cột \`DiemTB\` là số thực từ \`0.0\` đến \`10.0\`).

**4 tính chất bắt buộc của một bảng chuẩn trong mô hình quan hệ:**
1. Mỗi cột có **tên phân biệt** và tất cả các giá trị trong cùng một cột phải thuộc **cùng một miền giá trị**.
2. **Mỗi ô** tại giao điểm của một hàng và một cột chỉ chứa **một giá trị đơn (nguyên tố)** (không nhét danh sách nhiều số điện thoại vào chung 1 ô).
3. **Không có hai hàng nào trùng nhau hoàn toàn** trên mọi cột (đảm bảo bởi Khóa chính).
4. **Thứ tự các hàng và thứ tự các cột không quan trọng** — việc hoán đổi vị trí hai hàng hay hai cột không làm thay đổi bản chất ngữ nghĩa của bảng.`,
            },
            {
              title: "Khóa ứng viên, Khóa chính, Khóa tổ hợp & Toàn vẹn thực thể",
              content: `- **Khóa ứng viên (Candidate Key):** Là cột (hoặc tập hợp tối thiểu các cột) có giá trị **duy nhất** để phân biệt các bản ghi trong bảng. Một bảng có thể có **nhiều khóa ứng viên** (VD trong bảng \`HocSinh\`, cả \`MaHS\` và \`CCCD\` đều xác định duy nhất từng bạn).
- **Khóa chính (Primary Key — PK):** Là **một khóa ứng viên** được người thiết kế **chọn làm khóa đại diện chính thức** cho bảng (mỗi bảng chỉ có **1 khóa chính**).
  - *Lưu ý chọn khóa chính:* Không chọn \`HoTen\` hay \`NgaySinh\` vì nhiều người có thể trùng tên, trùng ngày sinh; nên chọn mã định danh ổn định như \`MaHS\`, \`MaSP\`, \`CCCD\`.
- **Khóa tổ hợp / Khóa ghép (Composite Key):** Khi một cột đơn lẻ chưa đủ xác định duy nhất mỗi hàng, khóa chính phải kết hợp từ **hai hay nhiều cột**.
  - *Ví dụ:* Bảng \`DangKyMon(MaHS, MaMon, HocKy)\` — 1 học sinh học nhiều môn, 1 môn có nhiều học sinh theo từng học kỳ → Khóa chính phù hợp nhất là khóa tổ hợp **\`(MaHS, MaMon, HocKy)\`**.
- **Ràng buộc Toàn vẹn thực thể (Entity Integrity):** Khóa chính bắt buộc thỏa mãn 2 điều kiện:
  1. **Duy nhất (Unique):** Không được có 2 bản ghi trùng giá trị khóa chính.
  2. **Không rỗng (NOT NULL):** Tuyệt đối không được để trống \`NULL\` (kể cả học sinh mới chuyển trường cũng phải cấp mã trước khi nhập).
  - *Hệ quả vi phạm:* Nếu cố tình \`INSERT\` hai bản ghi có cùng khóa chính hoặc khóa chính \`NULL\`, **Hệ QTCSDL sẽ báo lỗi vi phạm ràng buộc và từ chối thao tác**.`,
            },
            {
              title: "Khóa ngoại (Foreign Key) & Toàn vẹn tham chiếu",
              content: `- **Khóa ngoại (Foreign Key — FK):** Là một cột (hoặc nhóm cột) trong **bảng con** dùng để **tham chiếu (liên kết)** đến **Khóa chính** của **bảng cha** (hoặc chính bảng đó).
  - *Ví dụ:* Trong \`MuonSach(MaPhieu [PK], MaHS [FK], MaSach [FK], NgayMuon)\` liên kết với \`HocSinh(MaHS [PK], HoTen)\`, cột **\`MaHS\` trong bảng \`MuonSach\`** là khóa ngoại!
- **Ràng buộc Toàn vẹn tham chiếu (Referential Integrity):** Mọi giá trị khác NULL xuất hiện ở cột Khóa ngoại của bảng con **bắt buộc phải tồn tại sẵn** trong cột Khóa chính của bảng cha được tham chiếu.
  - *Hệ quả:* Không thể thêm một dòng vào \`HocSinh\` có \`MaLop = '12A9'\` nếu lớp \`'12A9'\` chưa tồn tại trong bảng \`Lop\` (tránh tạo ra "bản ghi mồ côi"). Tương tự, không thể xóa tùy tiện lớp \`'12A1'\` ở bảng cha khi vẫn còn học sinh đang tham chiếu tới \`'12A1'\`.`,
            },
            {
              title: "Thiết kế liên kết giữa các bảng: 1–1, 1–N và N–N",
              content: `| Loại quan hệ | Mô tả thực tế | Cách đặt Khóa ngoại trong CSDL quan hệ |
| :--- | :--- | :--- |
| **1 – 1** *(Một – Một)* | 1 Công dân – 1 Hộ chiếu | Đặt khóa ngoại (kèm ràng buộc Unique) ở một trong hai bảng |
| **1 – N** *(Một – Nhiều)* | 1 Lớp có nhiều Học sinh; 1 Học sinh chỉ thuộc 1 Lớp | **BẮT BUỘC đặt Khóa ngoại ở bảng phía N (nhiều)** — tức đặt \`MaLop [FK]\` trong bảng \`HocSinh\` |
| **N – N** *(Nhiều – Nhiều)* | 1 Học sinh tham gia nhiều Câu lạc bộ; 1 Câu lạc bộ có nhiều Học sinh | **Tạo thêm một Bảng trung gian** (VD \`ThamGiaCLB(MaHS [FK], MaCLB [FK], NgayThamGia)\`) chứa **ít nhất 2 khóa ngoại** tham chiếu tới khóa chính của 2 bảng gốc |`,
            },
          ],
          example: {
            title: "Thiết kế CSDL Quản lí Lớp – Học sinh – Câu lạc bộ (1-N và N-N)",
            code: `-- 1. Quan hệ 1–N giữa Lop (1) và HocSinh (N): Đặt FK ở bảng phía N (HocSinh)
Lop(MaLop [PK], TenLop, GVCN)
HocSinh(MaHS [PK], HoTen, NgaySinh, MaLop [FK -> Lop.MaLop], DiemTB)

-- 2. Quan hệ N–N giữa HocSinh và CauLacBo: Tách thành bảng trung gian ThamGiaCLB
CauLacBo(MaCLB [PK], TenCLB)
ThamGiaCLB(MaHS [PK, FK -> HocSinh.MaHS], MaCLB [PK, FK -> CauLacBo.MaCLB], VaiTro)`,
            language: "sql",
            steps: [
              "Chọn `MaLop`, `MaHS`, `MaCLB` làm Khóa chính vì chúng duy nhất, ổn định và không bao giờ NULL (không chọn `HoTen`).",
              "Vì 1 Lớp có nhiều Học sinh (1–N), đặt khóa ngoại `MaLop` vào bảng phía N là `HocSinh`.",
              "Vì 1 Học sinh có thể vào nhiều CLB và ngược lại (N–N), tạo bảng trung gian `ThamGiaCLB` với khóa chính tổ hợp `(MaHS, MaCLB)` đồng thời là 2 khóa ngoại.",
            ],
            explanation:
              "Mô hình này bảo đảm không có học sinh thuộc lớp 'ma' chưa tồn tại và dễ dàng lưu vai trò của từng bạn trong mỗi câu lạc bộ.",
          },
          examples: [
            {
              title: "Thiết kế CSDL Quản lí Lớp – Học sinh – Câu lạc bộ (1-N và N-N)",
              code: `Lop(MaLop [PK], TenLop, GVCN)
HocSinh(MaHS [PK], HoTen, MaLop [FK -> Lop.MaLop], DiemTB)
CauLacBo(MaCLB [PK], TenCLB)
ThamGiaCLB(MaHS [PK, FK], MaCLB [PK, FK], VaiTro)`,
              language: "sql",
              explanation:
                "Quan hệ 1–N đặt khóa ngoại ở phía N (`HocSinh`); quan hệ N–N tách qua bảng trung gian chứa 2 khóa ngoại.",
            },
            {
              title: "Kiểm tra vi phạm Toàn vẹn thực thể và Toàn vẹn tham chiếu",
              code: `-- Bảng cha Lop hiện chỉ có các MaLop: '12A1', '12A2'
-- Bảng con HocSinh hiện có: ('HS01', 'Nguyễn An', '12A1')

Trường hợp 1: Thêm ('HS01', 'Trần Bình', '12A2') vào HocSinh
  ──▶ LỖI Toàn vẹn thực thể! Vì MaHS = 'HS01' bị trùng khóa chính.

Trường hợp 2: Thêm (NULL, 'Lê Chi', '12A1') vào HocSinh
  ──▶ LỖI Toàn vẹn thực thể! Vì Khóa chính MaHS không được nhận NULL.

Trường hợp 3: Thêm ('HS02', 'Phạm Dũng', '12A9') vào HocSinh
  ──▶ LỖI Toàn vẹn tham chiếu! Vì MaLop = '12A9' chưa tồn tại trong bảng cha Lop.`,
              language: "text",
              explanation:
                "Trong mọi trường hợp vi phạm ràng buộc, Hệ QTCSDL đều báo lỗi và từ chối lưu dữ liệu sai.",
            },
          ],
          commonMistakes: [
            "Nhầm lẫn đặt Khóa ngoại ở bảng phía 1 thay vì bảng phía N trong quan hệ 1–N.",
            "Cho rằng hoán đổi vị trí hai hàng trong bảng sẽ làm thay đổi bản chất dữ liệu của quan hệ.",
            "Nghĩ rằng Khóa chính có thể tạm thời để trống `NULL` cho học sinh mới nhập học, hoặc chọn `HoTen` làm Khóa chính.",
            "Nhầm cột Khóa ngoại trong bài toán bảng trung gian: trong `MuonSach(MaPhieu, MaHS, MaSach)`, cột `MaHS` trong `MuonSach` là Khóa ngoại tham chiếu tới `HocSinh.MaHS`.",
          ],
          note: "Nhớ 4 quy tắc vàng: (1) Hàng = Bản ghi/Tuple, Cột = Trường/Thuộc tính; (2) PK = Duy nhất + NOT NULL (Toàn vẹn thực thể); (3) FK = Tham chiếu PK bảng cha (Toàn vẹn tham chiếu); (4) 1-N đặt FK phía N, N-N dùng bảng trung gian.",
        },
        {
          id: "l12-3-3",
          title: "Truy vấn dữ liệu với SQL",
          minutes: 35,
          orientation: "ICT",
          tags: ["SELECT", "GROUP BY"],
          intro:
            "Sau khi thiết kế được các bảng và khóa trong CSDL quan hệ, công cụ để tạo bảng, cập nhật dữ liệu và trích xuất thông tin thống kê chính là ngôn ngữ truy vấn có cấu trúc **SQL**. Bài học này giúp em nắm vững thứ tự viết chuẩn, phân biệt `WHERE` và `HAVING`, ghép bảng `INNER JOIN` và các lệnh sửa đổi dữ liệu.",
          objectives: [
            "Viết đúng thứ tự các mệnh đề trong câu lệnh truy vấn `SELECT ... FROM ... INNER JOIN ... WHERE ... GROUP BY ... HAVING ... ORDER BY`.",
            "Phân biệt triệt để điều kiện lọc từng bản ghi (`WHERE`) và điều kiện lọc nhóm sau gom nhóm (`HAVING`), cùng các toán tử `BETWEEN`, `LIKE`, `DISTINCT`, `ASC`/`DESC`.",
            "Sử dụng đúng 5 hàm gộp (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) và 4 câu lệnh thay đổi dữ liệu/cấu trúc (`INSERT INTO`, `UPDATE`, `DELETE`, `DROP TABLE`).",
          ],
          bullets: [
            "Thứ tự viết chuẩn: `SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY`; mặc định `ORDER BY` sắp xếp tăng dần (`ASC`), muốn giảm dần phải ghi `DESC`.",
            "`WHERE` lọc từng hàng TRƯỚC khi gom nhóm (không được chứa hàm gộp như `COUNT(*)`); `HAVING` lọc trên kết quả các nhóm SAU `GROUP BY` (dùng với hàm gộp).",
            "`DISTINCT` loại bỏ dòng trùng lặp; `BETWEEN a AND b` lấy cả hai đầu mút `[a, b]`; `LIKE 'Nguyễn%'` tìm chuỗi bắt đầu bằng 'Nguyễn' (`%` đại diện 0 hoặc nhiều kí tự); `DELETE` thiếu `WHERE` sẽ xóa sạch mọi dòng trong bảng.",
          ],
          sections: [
            {
              title: "Thứ tự chuẩn của câu lệnh SELECT và Các toán tử lọc phổ biến",
              content: `Một câu lệnh truy vấn SQL chuẩn phải viết **đúng thứ tự** 6 mệnh đề sau (bắt buộc có \`SELECT\` và \`FROM\`):

\`\`\`sql
SELECT [DISTINCT] danh_sach_cot_hoac_ham_gop
FROM ten_bang
[INNER JOIN bang_khac ON dieu_kien_ghep]
[WHERE dieu_kien_loc_tung_dong]
[GROUP BY cot_gom_nhom]
[HAVING dieu_kien_loc_nhom]
[ORDER BY cot_sap_xep [ASC | DESC]];
\`\`\`

**Các thành phần thường hỏi trong đề thi:**
- **\`SELECT *\`**: Lấy tất cả các cột của bảng.
- **\`SELECT DISTINCT Lop\`**: Loại bỏ các giá trị trùng lặp trong kết quả trả về.
- **\`WHERE\` với \`AND\` / \`OR\`**: \`AND\` chỉ đúng khi cả hai điều kiện cùng thỏa mãn.
- **\`BETWEEN 7.0 AND 9.0\`**: Kiểm tra giá trị nằm trong khoảng từ \`7.0\` đến \`9.0\` (**bao gồm cả hai đầu mút**).
- **\`LIKE 'Nguyễn%'\`**: Kí tự đại diện **\`%\`** khớp với **0 hoặc nhiều kí tự bất kì** → lọc ra tất cả học sinh có họ bắt đầu bằng chữ \`Nguyễn\`.
- **\`ORDER BY DiemTB DESC\`**: Sắp xếp giảm dần; nếu không viết \`ASC\` hay \`DESC\`, SQL mặc định sắp xếp **tăng dần (\`ASC\`)**.`,
            },
            {
              title: "Ghép bảng INNER JOIN, Hàm gộp và Phân biệt WHERE vs HAVING",
              content: `- **\`INNER JOIN B ON A.id = B.a_id\`**: Ghép nối các bản ghi **khớp nhau ở cả hai bảng** theo điều kiện \`ON\`.
- **5 Hàm tổng hợp (Aggregate Functions):**
  - \`COUNT(*)\` hoặc \`COUNT(col)\`: Đếm số lượng bản ghi.
  - \`SUM(col)\`: Tính tổng các giá trị số.
  - \`AVG(col)\`: Tính giá trị **trung bình cộng** của cột số.
  - \`MIN(col)\` / \`MAX(col)\`: Tìm giá trị nhỏ nhất / lớn nhất (áp dụng được cho **cả kiểu số, ngày tháng và chuỗi văn bản**).

**Phân biệt cốt lõi \`WHERE\` vs \`HAVING\` (ĐIỂM HAY BẪY NHẤT):**

| Tiêu chí | \`WHERE\` | \`HAVING\` |
| :--- | :--- | :--- |
| **Thời điểm lọc** | Lọc **từng bản ghi (hàng) đơn lẻ TRƯỚC khi** \`GROUP BY\` | Lọc **trên từng nhóm SAU khi** đã \`GROUP BY\` |
| **Dùng hàm gộp (\`COUNT\`, \`AVG\`...)?** | **TUYỆT ĐỐI KHÔNG ĐƯỢC!** Viết \`WHERE COUNT(*) > 30\` là **LỖI CÚ PHÁP** | **ĐƯỢC DÙNG** hàm gộp để lọc nhóm (VD \`HAVING COUNT(*) > 30\`) |`,
            },
            {
              title: "Các câu lệnh thao tác dữ liệu: INSERT INTO, UPDATE, DELETE & DROP TABLE",
              content: `- **Thêm bản ghi (\`INSERT INTO\`):** Thêm một hoặc nhiều dòng mới vào bảng:
  \`INSERT INTO HocSinh(MaHS, HoTen, DiemTB) VALUES ('HS09', 'Trần An', 8.5);\`
- **Cập nhật dữ liệu (\`UPDATE\`):** Sửa giá trị cho các bản ghi thỏa mãn \`WHERE\`:
  \`UPDATE HocSinh SET DiemTB = 9.0 WHERE MaHS = 'HS01';\`
- **Xóa bản ghi (\`DELETE\`):** Xóa các dòng thỏa \`WHERE\`. **Cảnh báo:** Nếu viết \`DELETE FROM HocSinh;\` mà **thiếu \`WHERE\`**, SQL sẽ xóa toàn bộ dữ liệu trong bảng (nhưng vẫn giữ lại cấu trúc bảng).
- **Xóa bảng (\`DROP TABLE\`):** Xóa **toàn bộ cấu trúc bảng lẫn dữ liệu** khỏi CSDL (KHÔNG phải chỉ xóa giá trị của một cột!).`,
            },
          ],
          example: {
            title: "Truy vấn tổng hợp INNER JOIN + WHERE + GROUP BY + HAVING + ORDER BY",
            code: `SELECT L.TenLop, COUNT(H.MaHS) AS SiSo, AVG(H.DiemTB) AS DTB
FROM Lop L
INNER JOIN HocSinh H ON L.MaLop = H.MaLop
WHERE H.DiemTB >= 5.0
GROUP BY L.TenLop
HAVING COUNT(H.MaHS) >= 30
ORDER BY DTB DESC;`,
            language: "sql",
            steps: [
              "FROM + INNER JOIN: Ghép từng học sinh ở bảng `HocSinh` với lớp tương ứng ở bảng `Lop` qua `MaLop`.",
              "WHERE: Loại bỏ các học sinh có `DiemTB < 5.0` TRƯỚC khi gom nhóm.",
              "GROUP BY: Gom các học sinh đạt >= 5.0 theo từng `TenLop` để tính `COUNT` và `AVG`.",
              "HAVING: Chỉ giữ lại những lớp có số học sinh đạt từ 30 bạn trở lên.",
              "ORDER BY DTB DESC: Sắp xếp các lớp đạt điều kiện theo điểm trung bình giảm dần.",
            ],
            explanation:
              "Nếu đặt điều kiện `COUNT(H.MaHS) >= 30` vào `WHERE`, câu lệnh sẽ báo lỗi ngay lập tức vì `WHERE` chạy trước khi gom nhóm.",
          },
          examples: [
            {
              title: "Truy vấn tổng hợp INNER JOIN + WHERE + GROUP BY + HAVING + ORDER BY",
              code: `SELECT L.TenLop, COUNT(H.MaHS) AS SiSo, AVG(H.DiemTB) AS DTB
FROM Lop L
INNER JOIN HocSinh H ON L.MaLop = H.MaLop
WHERE H.DiemTB >= 5.0
GROUP BY L.TenLop
HAVING COUNT(H.MaHS) >= 30
ORDER BY DTB DESC;`,
              language: "sql",
              explanation:
                "Tuân thủ chuẩn thứ tự 6 mệnh đề `SELECT → FROM/JOIN → WHERE → GROUP BY → HAVING → ORDER BY`.",
            },
            {
              title: "Cập nhật dữ liệu & Truy vấn lọc mẫu chuỗi",
              code: `-- Lấy họ tên & điểm học sinh đạt từ 8.0, xếp giảm dần
SELECT HoTen, DiemTB
FROM HocSinh
WHERE DiemTB >= 8.0
ORDER BY DiemTB DESC;

-- Cập nhật điểm cho học sinh có mã HS01
UPDATE HocSinh
SET DiemTB = 9.0
WHERE MaHS = 'HS01';`,
              language: "sql",
              explanation:
                "Luôn kiểm tra kỹ mệnh đề `WHERE` trong `UPDATE` và `DELETE` để tránh sửa hoặc xóa nhầm toàn bộ bảng.",
            },
          ],
          commonMistakes: [
            "Đặt hàm gộp (`COUNT(*)`, `AVG(...)`) vào trong mệnh đề `WHERE` thay vì `HAVING`.",
            "Nhầm thứ tự viết mệnh đề: đặt `ORDER BY` lên trước `GROUP BY` hoặc đặt `WHERE` sau `GROUP BY`.",
            "Tưởng viết `ORDER BY HoTen` không ghi gì sẽ mặc định sắp xếp giảm dần (mặc định là tăng dần `ASC`!).",
            "Nhầm `AVG()` dùng để tính tổng (tổng là `SUM`, trung bình cộng là `AVG`), hoặc nhầm `MIN()` chỉ dùng cho chuỗi/số, hoặc nhầm `DROP TABLE` chỉ xóa 1 cột.",
          ],
          note: "Nhớ câu thần chú SQL: S-F-W-G-H-O (`SELECT - FROM - WHERE - GROUP BY - HAVING - ORDER BY`); `WHERE` trước `GROUP BY` (cấm hàm gộp), `HAVING` sau `GROUP BY`.",
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
          intro:
            "Tìm một cái tên trong danh bạ 1 triệu người: nếu dò từng dòng từ đầu đến cuối (tìm kiếm tuần tự) có thể mất tới 1 triệu phép so sánh, nhưng nếu mở giữa quyển sách rồi liên tục chia đôi (tìm kiếm nhị phân), ta chỉ cần tối đa 20 bước! Bài học này giúp em mô phỏng chính xác từng bước `left`, `right`, `mid` và xử lí cả dãy tăng dần lẫn giảm dần.",
          objectives: [
            "So sánh điều kiện áp dụng, ưu nhược điểm và độ phức tạp (tốt nhất, xấu nhất) của Tìm kiếm tuần tự và Tìm kiếm nhị phân.",
            "Mô phỏng chính xác từng bước giá trị `left`, `right`, `mid = (left + right) // 2` của Tìm kiếm nhị phân trên cả dãy tăng dần và giảm dần.",
            "Tính nhanh số lần so sánh tối đa (~ `log₂ n`) và giải thích lí do CSDL lớn cần lập chỉ mục (Index).",
          ],
          bullets: [
            "Tìm kiếm tuần tự duyệt từ đầu đến cuối, dùng được trên MỌI dãy (kể cả chưa sắp xếp), tốt nhất 1 phép so sánh (gặp ngay ở đầu), xấu nhất `O(n)` (ở cuối hoặc không có).",
            "Tìm kiếm nhị phân BẮT BUỘC dãy đã SẮP XẾP (tăng hoặc giảm, áp dụng cho cả số âm lẫn chuỗi), mỗi bước thu hẹp một nửa không gian tìm kiếm → xấu nhất `O(log n)`.",
            "Trên dãy TĂNG dần: nếu `a[mid] < x` thì tìm nửa phải (`left = mid + 1`); nếu `a[mid] > x` thì tìm nửa trái (`right = mid - 1`). Trên dãy GIẢM dần thì ngược lại!",
          ],
          sections: [
            {
              title: "Tìm kiếm tuần tự (Linear / Sequential Search)",
              content: `- **Ý tưởng:** Duyệt lần lượt từng phần tử từ chỉ số \`0\` đến \`n - 1\`, so sánh với giá trị cần tìm \`x\`. Nếu thấy \`a[i] == x\` thì trả về vị trí \`i\`; nếu duyệt hết toàn bộ mảng mà không thấy thì trả về \`-1\`.
- **Khi nào ưu tiên dùng?** Khi danh sách **chưa được sắp xếp** và chỉ cần tìm một lần (hoặc khi muốn đếm số lần xuất hiện / tìm vị trí đầu tiên trên dãy lộn xộn).
- **Đánh giá hiệu quả:**
  - *Trường hợp tốt nhất:* \`x\` nằm ngay ở phần tử đầu tiên \`a[0]\` → chỉ cần **1 phép so sánh** (\`O(1)\`).
  - *Trường hợp xấu nhất:* \`x\` ở cuối mảng hoặc không có trong mảng → cần **\`n\` phép so sánh** (**\`O(n)\`**). Nếu \`n\` tăng gấp đôi, thời gian xấu nhất tăng gấp đôi.`,
            },
            {
              title: "Tìm kiếm nhị phân (Binary Search) trên dãy đã sắp xếp",
              content: `- **Điều kiện tiên quyết:** Dãy đầu vào **BẮT BUỘC đã được sắp xếp** theo thứ tự (tăng dần hoặc giảm dần; hoạt động bình thường với cả số nguyên âm hay xâu kí tự có thứ tự).
- **Ý tưởng chia đôi:** Dùng hai biến biên \`left = 0\`, \`right = n - 1\`. Khi \`left <= right\`, xét phần tử giữa \`mid = (left + right) // 2\`:
  - Nếu \`a[mid] == x\`: Tìm thấy, trả về \`mid\`.
  - **Nếu dãy TĂNG dần:**
    - \`a[mid] < x\` → \`x\` chỉ có thể ở nửa bên phải → cập nhật **\`left = mid + 1\`**.
    - \`a[mid] > x\` → \`x\` chỉ có thể ở nửa bên trái → cập nhật **\`right = mid - 1\`**.
  - **Nếu dãy GIẢM dần** (VD \`[50, 40, 30, 20, 10]\`): Ngược lại! Nếu \`a[mid] < x\` thì giá trị lớn hơn nằm ở **nửa bên trái** (\`right = mid - 1\`).
- **Độ phức tạp & Ứng dụng thực tế:**
  - Mỗi bước loại bỏ **một nửa** phần tử còn lại → độ phức tạp xấu nhất **\`O(log n)\`**.
  - Khi \`n\` tăng gấp đôi (VD từ \`1.000\` lên \`2.000\`), số bước tối đa chỉ **tăng thêm 1 bước**! Với \`n = 32\` tối đa ~\`5\` bước (\`log₂ 32 = 5\`); với \`n = 1024\` tối đa ~\`10\` bước; với \`n = 1.000.000\` tối đa chỉ khoảng **\`20\` bước**.
  - **Liên hệ CSDL:** Hệ QTCSDL lập **chỉ mục (Index)** theo cấu trúc có thứ tự để thực hiện tìm kiếm nhị phân/cây tìm kiếm cực nhanh thay vì quét tuần tự hàng triệu dòng.`,
            },
          ],
          example: {
            title: "Cài đặt & Mô phỏng từng bước Tìm kiếm nhị phân",
            code: `def binary_search(a, x):
    left, right = 0, len(a) - 1
    while left <= right:
        mid = (left + right) // 2
        if a[mid] == x:
            return mid
        elif a[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Mô phỏng với a = [3, 7, 11, 15, 19, 25, 30, 42], tìm x = 7:
# Bước 1: left = 0, right = 7 -> mid = (0 + 7) // 2 = 3 -> a[3] = 15
#         Vì a[3] = 15 > 7 -> cập nhật right = mid - 1 = 2 (left vẫn = 0)
# Bước 2: left = 0, right = 2 -> mid = (0 + 2) // 2 = 1 -> a[1] = 7 == x -> Trả về 1!`,
            language: "python",
            steps: [
              "Khởi tạo left = 0, right = 7 (len(a) - 1).",
              "Bước 1: mid = (0 + 7) // 2 = 3, phần tử giữa a[3] = 15 > 7 nên dịch biên phải: right = 3 - 1 = 2.",
              "Bước 2: mid = (0 + 2) // 2 = 1, phần tử giữa a[1] = 7 khớp x → Trả về chỉ số 1.",
            ],
            explanation:
              "Chú ý phép chia lấy phần nguyên `(left + right) // 2` trong Python làm tròn xuống (ví dụ `7 // 2 = 3`).",
          },
          commonMistakes: [
            "Quên điều kiện tiên quyết của Tìm kiếm nhị phân là dãy PHẢI được sắp xếp trước.",
            "Tính sai `mid` do quên chỉ số mảng Python bắt đầu từ `0` (nên `right = n - 1`, không phải `n`), hoặc không dùng chia nguyên `// 2`.",
            "Cập nhật nhầm chiều `left`/`right` khi đề cho dãy **giảm dần** (trên dãy giảm dần, số lớn nằm bên trái nên `a[mid] < x` phải dịch `right = mid - 1`).",
            "Tưởng tìm kiếm tuần tự luôn thực hiện đúng 1 phép so sánh hoặc tìm kiếm nhị phân sai với số âm.",
          ],
          note: "Nhớ: Tuần tự = dãy bất kì, O(n); Nhị phân = BẮT BUỘC đã sắp xếp, O(log n), log₂(1024) = 10, nhân đôi n chỉ tăng +1 bước.",
        },
        {
          id: "l12-4-2",
          title: "Thuật toán sắp xếp",
          minutes: 30,
          orientation: "CS",
          tags: ["nổi bọt", "quick sort"],
          intro:
            "Sắp xếp không chỉ giúp hiển thị bảng điểm từ cao xuống thấp mà còn là bước chuẩn bị bắt buộc trước khi dùng Tìm kiếm nhị phân. Em cần mô phỏng rành mạch từng lượt của 3 thuật toán cơ bản `O(n²)` (Nổi bọt, Chọn, Chèn) và hiểu tư tưởng chia để trị của 2 thuật toán hiệu quả `O(n log n)` (Quick Sort, Merge Sort).",
          objectives: [
            "Mô phỏng chính xác trạng thái mảng và đếm số phép so sánh/hoán đổi sau từng vòng lặp của Bubble Sort, Selection Sort và Insertion Sort.",
            "Phân biệt chiến lược thiết kế thuật toán và độ phức tạp (tốt nhất, trung bình, xấu nhất) của 5 thuật toán: Bubble, Selection, Insertion, Quick Sort và Merge Sort.",
            "Hiểu khái niệm Thuật toán sắp xếp ổn định (Stable Sort) và biết chọn thuật toán phù hợp với kích thước dữ liệu lớn (như 500.000 hồ sơ).",
          ],
          bullets: [
            "Nhóm O(n²): Bubble Sort (so sánh & đổi chỗ cặp kề nhau, đẩy số lớn về cuối), Selection Sort (tìm min đoạn còn lại đổi về đầu, luôn O(n²) mọi trường hợp), Insertion Sort (chèn vào phần đã xếp bên trái, nhanh O(n) khi dãy gần xếp xong, xấu nhất O(n²) khi dãy ngược hoàn toàn).",
            "Nhóm Chia để trị O(n log n): Quick Sort (chọn phần tử chốt pivot để phân hoạch 2 bên; trung bình O(n log n), xấu nhất O(n²)) và Merge Sort (chia đôi đến kích thước 1 rồi trộn lại; LUÔN O(n log n) kể cả xấu nhất).",
            "Sắp xếp ổn định (Stable Sort) giữ nguyên thứ tự tương đối ban đầu của các phần tử có khóa bằng nhau; sắp xếp áp dụng được cho cả số và chuỗi họ tên.",
          ],
          sections: [
            {
              title: "3 thuật toán sắp xếp cơ bản O(n²): Bubble, Selection, Insertion",
              content: `1. **Sắp xếp nổi bọt (Bubble Sort):**
   - Liên tục so sánh các cặp phần tử **kề nhau** \`a[j]\` và \`a[j + 1]\`, nếu sai thứ tự thì hoán đổi.
   - Sau vòng lặp ngoài thứ nhất (\`i = 0\`), phần tử **lớn nhất** nổi lên đứng đúng vị trí **cuối dãy**. Với \`n\` phần tử, vòng ngoài đầu tiên so sánh \`n - 1\` cặp.
   - *Phiên bản cải tiến:* Dùng biến cờ kiểm tra xem vòng lặp có xảy ra hoán đổi nào không; nếu dãy đã sắp xếp sẵn thì dừng ngay sau **1 lượt duyệt (\`O(n)\`)**.
2. **Sắp xếp chọn (Selection Sort):**
   - Chia dãy làm phần đã xếp bên trái và phần chưa xếp bên phải. Ở bước \`i\`, **tìm phần tử nhỏ nhất** trong đoạn còn lại \`[i..n-1]\` và **đổi chỗ** về vị trí \`i\`.
   - Dù đầu vào đã sắp xếp sẵn hay chưa, Selection Sort **vẫn luôn thực hiện \`O(n²)\` phép so sánh**.
3. **Sắp xếp chèn (Insertion Sort):**
   - Giữ phần bên trái đã sắp xếp; lần lượt lấy từng phần tử ở phần bên phải **chèn vào đúng vị trí** trong phần đã xếp bên trái (giống cách xếp bài trên tay).
   - **Ưu điểm:** Rất nhanh (\`O(n)\`) nếu dãy đầu vào **gần như đã sắp xếp**. **Trường hợp xấu nhất \`O(n²)\`:** Xảy ra khi dãy ban đầu có **thứ tự ngược hoàn toàn** (ví dụ đang giảm dần mà cần xếp tăng dần).`,
            },
            {
              title: "2 thuật toán Chia để trị O(n log n): Quick Sort & Merge Sort",
              content: `- **Sắp xếp nhanh (Quick Sort):** Dùng chiến lược Chia để trị — chọn một phần tử làm **chốt (pivot)**, phân hoạch dãy thành 2 phần (nhỏ hơn chốt ở bên trái, lớn hơn chốt ở bên phải) rồi đệ quy sắp xếp hai phần. Độ phức tạp trung bình **\`O(n log n)\`** (nhanh trong thực tế, xấu nhất \`O(n²)\` nếu chọn chốt lệch).
- **Sắp xếp trộn (Merge Sort):** Dùng chiến lược **Chia để trị** — chia đôi dãy liên tục đến khi còn các dãy con độ dài \`1\`, sau đó **trộn (merge)** từng cặp dãy con có thứ tự thành dãy lớn hơn. Độ phức tạp cả trung bình lẫn **trường hợp xấu nhất luôn là \`O(n log n)\`**.

**Bảng tổng hợp so sánh 5 thuật toán:**

| Thuật toán | Tốt nhất | Trung bình | Xấu nhất | Ghi chú trọng tâm |
| :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** *(Nổi bọt)* | \`O(n)\` *(có cờ)* | \`O(n²)\` | \`O(n²)\` | Đổi chỗ cặp kề nhau, lớn nhất về cuối |
| **Selection Sort** *(Chọn)* | \`O(n²)\` | \`O(n²)\` | \`O(n²)\` | Tìm min đoạn sau đổi về đầu đoạn |
| **Insertion Sort** *(Chèn)* | \`O(n)\` | \`O(n²)\` | \`O(n²)\` | Hiệu quả với dãy gần xếp xong |
| **Quick Sort** *(Nhanh)* | \`O(n log n)\` | \`O(n log n)\` | \`O(n²)\` | Chọn phần tử chốt (pivot) |
| **Merge Sort** *(Trộn)* | \`O(n log n)\` | \`O(n log n)\` | **\`O(n log n)\`** | Chia đôi đến 1 rồi trộn lại |`,
            },
            {
              title: "Thuật toán sắp xếp ổn định (Stable Sort) và Chọn thuật toán cho dữ liệu lớn",
              content: `- **Sắp xếp ổn định (Stable Sort):** Là thuật toán đảm bảo **giữ nguyên thứ tự tương đối trước-sau ban đầu** của các phần tử có giá trị khóa bằng nhau.
  - *Ví dụ:* Khi sắp xếp bảng học sinh theo điểm giảm dần, An (9.0) đứng trước Bình (9.0) trong danh sách gốc; thuật toán ổn định (như Merge Sort, Insertion Sort, Bubble Sort) sẽ giữ An vẫn đứng trước Bình sau khi sắp xếp.
- **Chọn thuật toán với dữ liệu lớn:** Với \`500.000\` hồ sơ thí sinh, \`n² = 2.5 × 10¹¹\` phép tính (Bubble Sort chạy mất hàng chục phút/giờ), trong khi \`n log₂ n ≈ 9.5 × 10⁶\` (Quick Sort / Merge Sort chạy chưa tới 1 giây)!`,
            },
          ],
          example: {
            title: "Mô phỏng vòng đầu tiên của Bubble Sort và Selection Sort",
            code: `# 1. Sắp xếp nổi bọt (Bubble Sort) tăng dần trên a = [4, 2, 7, 1]:
#    - So sánh (4, 2): 4 > 2 -> đổi chỗ -> [2, 4, 7, 1]
#    - So sánh (4, 7): giữ nguyên      -> [2, 4, 7, 1]
#    - So sánh (7, 1): 7 > 1 -> đổi chỗ -> [2, 4, 1, 7]
#    Kết quả sau vòng lặp ngoài đầu tiên: [2, 4, 1, 7] (3 cặp so sánh)

# 2. Sắp xếp chọn (Selection Sort) tăng dần trên b = [29, 10, 14, 37, 13]:
#    - Phần tử nhỏ nhất toàn dãy là 10 (ở vị trí 1).
#    - Đổi chỗ 29 và 10 -> Sau bước đầu tiên: [10, 29, 14, 37, 13]`,
            language: "python",
            steps: [
              "Bubble Sort luôn so sánh từng cặp LIỀN KỀ nhau từ trái sang phải để đẩy số lớn nhất về cuối.",
              "Selection Sort quét tìm vị trí phần tử NHỎ NHẤT ở đoạn còn lại rồi đổi chỗ MỘT LẦN với phần tử đầu đoạn đó.",
            ],
            explanation:
              "Phân biệt hai cách chạy này giúp không bao giờ nhầm trạng thái mảng sau lượt lặp đầu tiên giữa Bubble Sort và Selection Sort.",
          },
          commonMistakes: [
            "Nhầm Merge Sort có trường hợp xấu nhất là `O(n²)` — chỉ Quick Sort mới có xấu nhất `O(n²)`, còn Merge Sort luôn là `O(n log n)`.",
            "Tưởng Selection Sort nhanh lên thành `O(n)` khi dãy đã sắp xếp — nó vẫn phải tìm min từng đoạn nên luôn mất `O(n²)` phép so sánh.",
            "Nhầm trạng thái sau lượt 1 của Selection Sort `[29, 10, 14, 37, 13]` thành `[10, 14, 29, 37, 13]` — Selection Sort chỉ đổi chỗ `29` và `10` nên ra `[10, 29, 14, 37, 13]`.",
            "Cho rằng sắp xếp chỉ áp dụng được cho số, không áp dụng được cho xâu họ tên.",
          ],
          note: "Mẹo phân biệt lượt 1: Bubble Sort (cặp kề, số lớn nhất về cuối); Selection Sort (tìm min đổi với đầu dãy); Insertion Sort (chèn vào đoạn trái đã xếp).",
        },
        {
          id: "l12-4-3",
          title: "Độ phức tạp thuật toán",
          minutes: 25,
          orientation: "CS",
          tags: ["O lớn", "độ phức tạp"],
          intro:
            "Nếu đo hiệu quả thuật toán bằng đồng hồ bấm giây trên máy cá nhân, cùng một đoạn code chạy trên siêu máy tính sẽ nhanh hơn máy cũ — cách đo đó không khách quan. Khoa học máy tính dùng kí hiệu **Big-O (`O(...)`)** để đánh giá tốc độ tăng trưởng số phép toán và bộ nhớ khi kích thước dữ liệu `n` tăng lên rất lớn.",
          objectives: [
            "Hiểu bản chất của Độ phức tạp thời gian, Độ phức tạp không gian và lí do dùng kí hiệu Big-O (xét cận trên trường hợp xấu nhất, độc lập phần cứng).",
            "Rút gọn thành thạo mọi biểu thức đếm số phép toán `T(n)` về dạng Big-O chuẩn (bỏ hằng số hệ số và giữ số hạng bậc cao nhất).",
            "Xác định nhanh Big-O cho các cấu trúc lặp tuần tự, lồng nhau, chia đôi (`n //= 2`), đệ quy và sắp xếp đúng thứ tự tăng dần 6 lớp độ phức tạp.",
          ],
          bullets: [
            "Big-O đo tốc độ tăng số phép toán theo kích thước đầu vào `n` (thường ở trường hợp xấu nhất), độc lập với tốc độ CPU/phần cứng; khi rút gọn phải BỎ hệ số hằng và số hạng bậc thấp (VD `3n² + 5n + 10` → `O(n²)`).",
            "Thứ tự tăng dần (nhanh → chậm khi n lớn): `O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ)`.",
            "Truy cập mảng `a[i]` hay biểu thức hằng số là `O(1)`; vòng `1..n` là `O(n)`; vòng chia đôi `n = n // 2` là `O(log n)`; 2 vòng `1..n` nối tiếp nhau vẫn là `O(n)`; 2 vòng lồng nhau là `O(n²)`; Fibonacci đệ quy ngây thơ `F(n-1) + F(n-2)` là `O(2ⁿ)`.",
          ],
          sections: [
            {
              title: "Kí hiệu Big-O: Độ phức tạp Thời gian & Không gian",
              content: `- **Tại sao dùng Big-O thay vì bấm đồng hồ giây?** Thời gian thực tế (tính bằng giây) phụ thuộc vào tốc độ CPU, RAM, ngôn ngữ lập trình và trình biên dịch. **Big-O** đo **tốc độ tăng của số phép toán cơ bản** theo kích thước dữ liệu đầu vào \`n\`, giúp đánh giá khách quan bản chất thuật toán độc lập với phần cứng.
- **Thường xét trường hợp nào?** Big-O thường dùng biểu diễn cận trên tốc độ tăng trưởng trong **trường hợp xấu nhất (Worst-case)** để đảm bảo thuật toán không vượt quá ngưỡng đó.
- **Độ phức tạp không gian (Space Complexity):** Đo lượng **bộ nhớ RAM phụ** tăng thêm theo \`n\`. Ví dụ: nếu thuật toán chỉ dùng vài biến đơn thì là \`O(1)\`; nếu tạo thêm một mảng phụ kích thước \`n\` để sao chép dữ liệu thì tối thiểu là **\`O(n)\`** *(không phải mọi đệ quy đều \`O(1)\` vì đệ quy tốn ngăn xếp gọi hàm!)*.`,
            },
            {
              title: "Quy tắc rút gọn biểu thức T(n) sang Big-O",
              content: `Khi đã đếm được biểu thức số phép toán \`T(n)\`, để chuyển sang dạng Big-O chuẩn ta thực hiện đúng **2 quy tắc**:
1. **Bỏ toàn bộ hằng số nhân phía trước** (VD: \`O(5n)\` hay \`O(10n²)\` là viết sai chuẩn → phải rút gọn thành \`O(n)\`, \`O(n²)\`; hằng số thuần túy \`T(n) = 1000\` không phụ thuộc \`n\` → **\`O(1)\`**).
2. **Chỉ giữ lại số hạng tăng nhanh nhất khi \`n → ∞\`**, bỏ hết các số hạng bậc thấp hơn.
   - \`T(n) = 3n² + 5n + 10\` → **\`O(n²)\`**
   - \`T(n) = 5n³ + 20n² + 1000\` → **\`O(n³)\`**
   - \`T(n) = 4n log n + 100n + 50\` → **\`O(n log n)\`** (vì \`n log n\` trội hơn \`n\` khi \`n\` rất lớn).`,
            },
            {
              title: "Thứ tự 7 lớp độ phức tạp và Cách nhận diện từ mã nguồn",
              content: `Thứ tự tăng dần (từ **nhanh nhất → chậm nhất** khi \`n\` lớn):
**\`O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ)\`**

| Lớp Big-O | Mẫu mã nguồn / Thuật toán điển hình | Ý nghĩa khi tăng \`n\` |
| :--- | :--- | :--- |
| **\`O(1)\`** *(Hằng số)* | Truy cập \`a[5]\`, phép tính cộng trừ cơ bản | Không đổi dù \`n\` rất lớn |
| **\`O(log n)\`** *(Logarit)* | Tìm kiếm nhị phân; vòng lặp chia đôi \`n = n // 2\` | \`n\` tăng gấp đôi chỉ thêm 1 bước |
| **\`O(n)\`** *(Tuyến tính)* | 1 vòng \`for\` \`1..n\`; **2 vòng \`for\` nối tiếp độc lập** (\`n + n = 2n\`) | \`n\` tăng \`k\` lần → thời gian tăng \`k\` lần |
| **\`O(n log n)\`** | Merge Sort, Quick Sort; vòng \`for\` \`n\` lần mà bên trong gọi tìm kiếm nhị phân \`O(log n)\` | Tối ưu cho bài toán sắp xếp so sánh |
| **\`O(n²)\`** *(Bình phương)* | **2 vòng \`for\` lồng nhau** \`1..n\`; Bubble/Selection/Insertion Sort | \`n\` tăng \`k\` lần → thời gian tăng **\`k²\`** lần (VD tăng 3 lần → 9 lần; tăng 4 lần → 16 lần) |
| **\`O(n³)\`** *(Lập phương)* | **3 vòng \`for\` lồng nhau** \`1..n\` | Chạy được với \`n\` nhỏ vài trăm |
| **\`O(2ⁿ)\`** *(Hàm mũ)* | Đệ quy Fibonacci ngây thơ \`F(n-1) + F(n-2)\`, quay lui sinh tập con | Không khả thi với \`n = 100\` (\`2¹⁰⁰ ≈ 1.26 × 10³⁰\` phép toán, máy tính chạy hàng tỉ năm!) |`,
            },
          ],
          example: {
            title: "Phân tích Big-O cho các cấu trúc vòng lặp & Tỉ lệ tăng thời gian",
            code: `# 1. Hai vòng lặp NỐI TIẾP (không lồng nhau): O(n) + O(n) = O(2n) -> O(n)
for i in range(n):
    s += a[i]
for j in range(n):
    p *= a[j]

# 2. Vòng lặp ngoài n lần, bên trong gọi Binary Search O(log n) -> O(n log n)
for x in queries:            # n lần
    binary_search(a, x)      # mỗi lần O(log n)

# 3. Vòng lặp chia đôi kích thước: O(log n)
while n > 1:
    n = n // 2`,
            language: "python",
            steps: [
              "Các khối lệnh thực hiện NỐI TIẾP nhau thì CỘNG độ phức tạp và lấy phần trội nhất.",
              "Các vòng lặp LỒNG VÀO NHAU thì NHÂN độ phức tạp với nhau (n × log n = O(n log n)).",
              "Nếu thuật toán là O(n²) và tăng kích thước n lên 4 lần → số phép toán tăng 4² = 16 lần.",
            ],
            explanation:
              "Phân biệt nối tiếp (cộng) với lồng nhau (nhân) giải quyết chính xác 100% các câu hỏi đánh giá mã nguồn.",
          },
          commonMistakes: [
            "Giữ nguyên hằng số trong đáp án Big-O (viết sai thành `O(5n)` hoặc cho rằng `O(10n²)` khác `O(n²)`).",
            "Nhầm 2 vòng `for` chạy nối tiếp độc lập thành `O(n²)` — chỉ khi **lồng vào nhau** mới nhân thành `O(n²)`, còn nối tiếp nhau là `n + n = 2n → O(n)`!",
            "Cho rằng `O(n²)` tăng trưởng nhanh hơn `O(2ⁿ)` hoặc mọi hàm đệ quy đều có độ phức tạp không gian `O(1)`.",
          ],
          note: "Nhớ 3 quy tắc Big-O: Bỏ hằng số; Lấy bậc cao nhất; Nối tiếp thì CỘNG, Lồng nhau thì NHÂN; O(n²) khi tăng n lên k lần thì thời gian tăng k² lần.",
        },
      ],
    },
  ],
};
