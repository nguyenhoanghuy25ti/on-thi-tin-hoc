export interface VideoLesson {
  id: string;
  grade: number;
  number: number;
  title: string;
  subtitle: string;
  videoId: string;
  embedUrl: string;
  url: string;
}

export const GRADE_VIDEO_COUNTS: Record<number, number> = {
  10: 29,
  11: 30,
  12: 30,
};

const RAW_VIDEOS: Record<number, Record<number, { id: string; topic: string }>> = {
  10: {
    1: { id: "mC5mZPzhbv8", topic: "Thông tin và xử lý thông tin" },
    2: { id: "HRc4RE1p1kM", topic: "Vai trò của thiết bị thông minh và tin học đối với xã hội" },
    3: { id: "tMjRNhAumCE", topic: "Một số kiểu dữ liệu và dữ liệu văn bản" },
    4: { id: "hmiyngC2lCo", topic: "Hệ nhị phân và dữ liệu số nguyên" },
    5: { id: "F2_pYk5K7S4", topic: "Dữ liệu lôgic" },
    6: { id: "HZmdGAt80Zw", topic: "Dữ liệu âm thanh và hình ảnh" },
    7: { id: "-sbQW0xau3Y", topic: "Thực hành sử dụng thiết bị số thông dụng" },
    8: { id: "GsA1umN2csw", topic: "Mạng máy tính trong cuộc sống hiện đại" },
    9: { id: "39BO5jPK-uk", topic: "An toàn trong không gian mạng" },
    10: { id: "JrmW-gLyDYs", topic: "Thực hành khai thác tài nguyên trên Internet" },
    11: { id: "j-6TsSCVVXk", topic: "Ứng xử trên môi trường số" },
    12: { id: "rhqtylR1zjY", topic: "Phần mềm thiết kế đồ hoạ" },
    13: { id: "hDMJuW5_y3A", topic: "Bổ sung các đối tượng đồ hoạ" },
    14: { id: "fO5A-Q1jl-w", topic: "Làm việc với đối tượng đường và văn bản" },
    15: { id: "LTz90sOH2kI", topic: "Hoàn thiện hình ảnh đồ hoạ" },
    16: { id: "eEk3EdI_IjA", topic: "Ngôn ngữ lập trình bậc cao và Python" },
    17: { id: "fp_fQ8gNpNo", topic: "Biến và lệnh gán" },
    18: { id: "NyjwcV_at8Q", topic: "Các lệnh vào ra đơn giản" },
    19: { id: "icU7VNHtw4E", topic: "Câu lệnh điều kiện IF" },
    20: { id: "iIvizLSMIbQ", topic: "Câu lệnh lặp FOR" },
    21: { id: "8Qaw9XNGroM", topic: "Câu lệnh lặp WHILE" },
    22: { id: "7OMZwM_7eps", topic: "Kiểu dữ liệu danh sách" },
    23: { id: "fPjvxxRBKUg", topic: "Một số lệnh làm việc với dữ liệu danh sách" },
    24: { id: "LVQwH0p7Df4", topic: "Xâu kí tự" },
    25: { id: "q8pik4BaNTM", topic: "Một số lệnh làm việc với xâu kí tự" },
    26: { id: "3Jm_pBRzN_8", topic: "Hàm trong Python" },
    27: { id: "utPUELFJyvc", topic: "Tham số của hàm" },
    28: { id: "usTZcZL-KvU", topic: "Phạm vi của biến" },
    29: { id: "rmp1qMQZmtc", topic: "Nhận biết lỗi chương trình" },
  },
  11: {
    1: { id: "8UojG1Ax_fg", topic: "Hệ điều hành" },
    2: { id: "p7Sf8xMmds8", topic: "Thực hành sử dụng hệ điều hành" },
    3: { id: "TnZQNhvq63k", topic: "Phần mềm nguồn mở và phần mềm chạy trên Internet" },
    4: { id: "xV_nGHbSFvc", topic: "Bên trong máy tính" },
    5: { id: "RpZW632wdi0", topic: "Kết nối máy tính với các thiết bị số" },
    6: { id: "wl4Wj-ARCw4", topic: "Lưu trữ và chia sẻ tệp tin trên Internet" },
    7: { id: "O4WzlXPI8cY", topic: "Thực hành tìm kiếm thông tin trên Internet" },
    8: { id: "9RhnIGYPJ14", topic: "Thực hành nâng cao sử dụng thư điện tử và mạng xã hội" },
    9: { id: "A7HEwPhWLqE", topic: "Giao tiếp an toàn trên Internet" },
    10: { id: "esjFcm0hjOQ", topic: "Lưu trữ dữ liệu và khai thác thông tin phục vụ quản lí" },
    11: { id: "Zj87nnCrrIw", topic: "Cơ sở dữ liệu" },
    12: { id: "-Aub2iEwbio", topic: "Hệ quản trị cơ sở dữ liệu và hệ cơ sở dữ liệu" },
    13: { id: "sf8K84aFMP4", topic: "Cơ sở dữ liệu quan hệ" },
    14: { id: "cYMDM4IDl8U", topic: "SQL - Ngôn ngữ truy vấn có cấu trúc" },
    15: { id: "x8F0NNQA2sw", topic: "Bảo mật và an toàn hệ cơ sở dữ liệu" },
    16: { id: "mOJrdaGs2QA", topic: "Công việc quản trị cơ sở dữ liệu" },
    17: { id: "OICNS79D-OI", topic: "Quản trị cơ sở dữ liệu trên máy tính" },
    18: { id: "hx-MuSgIfak", topic: "Thực hành xác định cấu trúc bảng và các trường khoá" },
    19: { id: "yFb_LdEOoTs", topic: "Thực hành tạo lập cơ sở dữ liệu và các bảng" },
    20: { id: "06uU4WK87z0", topic: "Thực hành tạo lập các bảng có khoá ngoài" },
    21: { id: "TfRVJTS5rv8", topic: "Các thuật toán sắp xếp đơn giản" },
    22: { id: "Y0_k9zV6Ods", topic: "Thực hành cập nhật bảng dữ liệu có tham chiếu" },
    23: { id: "boTNjrSTyLs", topic: "Thực hành truy xuất dữ liệu qua liên kết các bảng" },
    24: { id: "I_LHGERHYHQ", topic: "Đánh giá độ phức tạp thời gian thuật toán" },
    25: { id: "VwlqoLYVArY", topic: "Phần mềm chỉnh sửa ảnh" },
    26: { id: "JE7ttMAtyLs", topic: "Công cụ tinh chỉnh màu sắc và công cụ chọn" },
    27: { id: "i980NBKJH2g", topic: "Công cụ vẽ và một số ứng dụng" },
    28: { id: "6MOti_kXyz0", topic: "Tạo ảnh động" },
    29: { id: "cUzedg19270", topic: "Khám phá phần mềm làm phim" },
    30: { id: "aYEZ3-CGgG0", topic: "Biên tập phim" },
  },
  12: {
    1: { id: "W5sviVD_ALg", topic: "Làm quen với Trí tuệ nhân tạo" },
    2: { id: "KCVS9hsRpx4", topic: "Trí tuệ nhân tạo trong khoa học và đời sống" },
    3: { id: "IOxQ2cdUlms", topic: "Một số thiết bị mạng thông dụng" },
    4: { id: "ksxk5JmgXDU", topic: "Giao thức mạng" },
    5: { id: "YuWoCc7_64c", topic: "Thực hành chia sẻ tài nguyên trên mạng" },
    6: { id: "a0plZs4F9Y8", topic: "Giao tiếp và ứng xử trong không gian mạng" },
    7: { id: "oV-CbUfMMcw", topic: "HTML và cấu trúc trang web" },
    8: { id: "IQcSEAnlzH8", topic: "Định dạng văn bản" },
    9: { id: "f1dyEO0D48w", topic: "Tạo danh sách, bảng" },
    10: { id: "FofbdWzs_yA", topic: "Tạo liên kết" },
    11: { id: "UWJaiz5unvc", topic: "Chèn tệp tin đa phương tiện và khung nội tuyến vào trang web" },
    12: { id: "sX2bd3tuzNI", topic: "Tạo biểu mẫu" },
    13: { id: "gDohlxgY64U", topic: "Khái niệm, vai trò của CSS" },
    14: { id: "Gz1KnCmoNJQ", topic: "Định dạng văn bản bằng CSS" },
    15: { id: "Xousa-WuprU", topic: "Tạo màu cho chữ và nền" },
    16: { id: "MosrJcUM7uA", topic: "Định dạng khung" },
    17: { id: "pE5krdeyg_U", topic: "Các mức ưu tiên của bộ chọn" },
    18: { id: "3orOTbRSE3s", topic: "Thực hành tổng hợp thiết kế trang web" },
    19: { id: "QFGJ6qLaxxA", topic: "Dịch vụ sửa chữa và bảo trì máy tính" },
    20: { id: "V3rnG09XLU8", topic: "Nhóm nghề quản trị thuộc ngành Công nghệ thông tin" },
    21: { id: "QRqgdl9hiYE", topic: "Hội thảo hướng nghiệp" },
    22: { id: "Rcryg9CHnhM", topic: "Thực hành kết nối các thiết bị số" },
    23: { id: "grNdxntaLEA", topic: "Chuẩn bị xây dựng trang web" },
    24: { id: "zvwI35zYve4", topic: "Xây dựng phần đầu trang web" },
    25: { id: "mhFFxI94CkQ", topic: "Xây dựng phần thân và chân trang web" },
    26: { id: "eKHAc_tHUQg", topic: "Liên kết và thanh điều hướng" },
    27: { id: "siKFHI-GE5c", topic: "Biểu mẫu trên trang web" },
    28: { id: "IVVMdX4kWR0", topic: "Thực hành trải nghiệm trích xuất thông tin và tri thức" },
    29: { id: "Fs1GecPiQ2c", topic: "Mô phỏng trong giải quyết vấn đề" },
    30: { id: "m3braVRt6Es", topic: "Ứng dụng mô phỏng trong giáo dục" },
  },
};

export const ALL_VIDEOS: VideoLesson[] = [10, 11, 12].flatMap((grade) =>
  Array.from({ length: GRADE_VIDEO_COUNTS[grade] }, (_, idx) => {
    const num = idx + 1;
    const item = RAW_VIDEOS[grade][num];
    return {
      id: `G${grade}.L${String(num).padStart(2, "0")}`,
      grade,
      number: num,
      title: `Bài ${num}: ${item.topic}`,
      subtitle: `Tin học ${grade} · Kết nối tri thức`,
      videoId: item.id,
      embedUrl: `https://www.youtube.com/embed/${item.id}?rel=0&modestbranding=1`,
      url: `https://www.youtube.com/watch?v=${item.id}`,
    };
  })
);

export const TOTAL_VIDEOS_COUNT = ALL_VIDEOS.length;

export function getVideosByGrade(grade: number | string): VideoLesson[] {
  return ALL_VIDEOS.filter((v) => v.grade === Number(grade));
}
