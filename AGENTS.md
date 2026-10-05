# AGENTS.md

## 1. Mục đích

File này quy định cách các AI agent và thành viên nhóm triển khai toàn bộ project môn Công nghệ Web. Mọi nhiệm vụ trong repository phải tuân thủ các yêu cầu về phạm vi, công nghệ, kiến trúc và quy trình dưới đây.

## 2. Thông tin project

- Tên đề tài: Hệ thống cộng tác làm việc theo thời gian thực.
- Thời gian thực hiện: 8 tuần.
- Quy mô nhóm: 3 thành viên.
- Mục tiêu: Xây dựng hệ thống quản lý nhiều dự án bằng bảng Kanban, cho phép nhiều người làm việc đồng thời và nhìn thấy thay đổi của nhau theo thời gian thực.

## 3. Phạm vi chức năng

### 3.1. Authentication

- Đăng ký.
- Đăng nhập.
- Đăng xuất.
- Quản lý hồ sơ người dùng.

### 3.2. Project

- Tạo, xem, sửa và xóa project.
- Một user có thể tham gia nhiều project.

### 3.3. Project Member

- Quản lý thành viên project.
- Hai vai trò trong project: `OWNER` và `MEMBER`.
- Mời thành viên.
- Rời project.
- Xóa thành viên.
- Kiểm tra quyền truy cập cho mọi thao tác cần bảo vệ.

### 3.4. Kanban

- Quản lý column và task.
- Mỗi board có ba column mặc định: `TODO`, `DOING`, `DONE`.
- CRUD column.
- CRUD task.
- Kéo thả task bằng `dnd-kit`.
- Sắp xếp lại task.
- Hỗ trợ assignee, deadline và label.

### 3.5. Realtime

- Đồng bộ thao tác tạo, sửa, xóa và di chuyển task.
- Đồng bộ column.
- Hiển thị online presence.
- Mỗi project sử dụng project room phù hợp.
- Chat theo thời gian thực.
- Board cursor.

### 3.6. Collaborative editing

- Cho phép nhiều người cùng chỉnh sửa description của một task.
- Hiển thị người đang chỉnh sửa.
- Đồng bộ cursor/selection nếu editor được chọn hỗ trợ.
- Đồng bộ lại trạng thái sau khi reconnect.

### 3.7. Communication

- Project chat.
- Task comments.

### 3.8. History

- Activity log phải lưu tối thiểu: actor, action, entity và timestamp.

### 3.9. Responsive

- Hoạt động trên desktop và mobile.
- Kanban có thể scroll ngang trên mobile.
- Giao diện task detail phải phù hợp màn hình nhỏ.

### 3.10. Deployment

- Docker chỉ được triển khai ở giai đoạn cuối hoặc khi có yêu cầu rõ ràng.
- Production phải sử dụng HTTPS và WSS.

## 4. Technology stack bắt buộc

### Frontend

- React.
- TypeScript.
- HTML/CSS responsive.
- `dnd-kit` cho drag and drop.

### Backend

- Node.js.
- Express.
- TypeScript.

### Database

- PostgreSQL.
- Prisma ORM.

### Realtime

- Socket.IO.

### Collaborative text

- Yjs.
- `y-websocket`.
- Editor binding tương thích với Yjs.

### Deployment

- Docker.
- HTTPS/WSS trong production.

Không tự ý thay đổi technology stack. Không tự ý thêm Next.js, NestJS, MongoDB, Firebase, Supabase hoặc framework/nền tảng lớn khác nếu chưa được người dùng yêu cầu và xác nhận.

## 5. Nguyên tắc kiến trúc

1. PostgreSQL là nguồn dữ liệu nghiệp vụ chính và là nơi lưu trạng thái nghiệp vụ cuối cùng.
2. REST API xử lý các thao tác nghiệp vụ gồm authentication, project, member, column, task, label, comment và history.
3. Socket.IO chỉ phục vụ realtime Kanban, chat, presence và board cursor.
4. Socket.IO không thay thế database.
5. Luồng xử lý ưu tiên:

   ```text
   Client
   -> REST API
   -> Authentication/Authorization
   -> PostgreSQL
   -> Socket.IO broadcast
   -> Các client khác
   ```

6. Chỉ broadcast thay đổi nghiệp vụ sau khi backend đã kiểm tra và database đã xác nhận thao tác thành công.
7. Yjs chỉ dùng cho dữ liệu thực sự cần collaborative editing; trước mắt chỉ dùng cho Task Description.
8. Không dùng Yjs để thay thế toàn bộ Task, Kanban hoặc dữ liệu nghiệp vụ trong PostgreSQL.
9. Mỗi Task collaborative description tương ứng với một `Y.Doc`.
10. Backend phải kiểm tra authentication và authorization. Không được chỉ kiểm tra quyền ở frontend.
11. Không cho client tự quyết định trạng thái nghiệp vụ cuối cùng.
12. Khi move hoặc reorder task, trạng thái và thứ tự cuối cùng phải được backend/database xác nhận.
13. Thiết kế reconnect phải đồng bộ lại dữ liệu từ nguồn đáng tin cậy, tránh coi trạng thái cục bộ của client là trạng thái cuối cùng.

## 6. Quy tắc code

1. Chỉ triển khai chức năng được yêu cầu trong prompt hiện tại.
2. Không tự động triển khai chức năng của nhiệm vụ hoặc tuần tiếp theo.
3. Không rewrite code đang hoạt động nếu không có lý do rõ ràng.
4. Ưu tiên code đơn giản, dễ đọc, dễ giải thích, phù hợp project sinh viên và dễ bảo vệ trước giảng viên.
5. TypeScript phải khai báo kiểu rõ ràng và hạn chế sử dụng `any`. Nếu buộc phải dùng `any`, phải có lý do cụ thể.
6. Không hard-code password, database URL, API secret, session secret hoặc thông tin nhạy cảm khác.
7. Secret và cấu hình phụ thuộc môi trường phải sử dụng environment variable.
8. Khi nhiệm vụ cần cấu hình môi trường, phải cung cấp `.env.example` với giá trị mẫu an toàn; không commit file `.env` thật.
9. Không tự động `git commit` hoặc `git push` trừ khi người dùng yêu cầu rõ ràng.
10. Trước thay đổi kiến trúc lớn, phải phân tích ảnh hưởng, giải thích phương án và chờ người dùng xác nhận.
11. Không thêm dependency nếu chưa thực sự cần cho nhiệm vụ hiện tại.
12. Không đổi framework, database, giao thức realtime hoặc cách lưu dữ liệu cốt lõi chỉ để thuận tiện triển khai.
13. Tôn trọng code và thay đổi hiện có của người dùng; không xóa hoặc hoàn tác thay đổi ngoài phạm vi.

## 7. Cấu trúc repository dự kiến

Ưu tiên cấu trúc đơn giản:

```text
root/
  frontend/
  backend/
  docs/
  AGENTS.md
  README.md
  .gitignore
```

Không sử dụng monorepo framework phức tạp nếu không có nhu cầu rõ ràng và chưa được xác nhận.

## 8. Quy trình cho mỗi nhiệm vụ

Khi nhận prompt mới, thực hiện theo thứ tự:

1. Đọc toàn bộ `AGENTS.md` áp dụng cho phạm vi file cần làm.
2. Đọc code và tài liệu liên quan trước khi thay đổi.
3. Xác định đúng phạm vi của prompt hiện tại.
4. Chỉ thực hiện nhiệm vụ được giao.
5. Không tự động triển khai tính năng kế tiếp.
6. Nếu yêu cầu không rõ và lựa chọn có thể ảnh hưởng kiến trúc, dữ liệu hoặc phạm vi lớn, phải hỏi người dùng trước.
7. Thực hiện thay đổi nhỏ nhất đủ để hoàn thành yêu cầu.
8. Sau khi sửa code, chạy các kiểm tra phù hợp đã có trong project:
   - TypeScript typecheck.
   - Build.
   - Lint nếu đã cấu hình.
   - Test nếu đã có test.
9. Không tự ý cài công cụ hệ thống. Không tự ý cài package ngoài phạm vi được giao.
10. Hoàn thành báo cáo rồi dừng lại; không tiếp tục làm trước phần khác.

## 9. Báo cáo sau mỗi nhiệm vụ

Báo cáo kết quả phải nêu rõ:

- File đã tạo.
- File đã sửa.
- Package đã cài; ghi rõ `không có` nếu không cài package.
- Command đã chạy.
- Kết quả typecheck, build, lint và test; nếu không chạy phải nêu lý do.
- Phần còn chưa làm hoặc giới hạn hiện tại.

Không tuyên bố hoàn thành nếu kiểm tra bắt buộc thất bại hoặc chưa xác minh được. Phân biệt rõ lỗi có sẵn với lỗi phát sinh từ thay đổi hiện tại.

## 10. Ưu tiên theo thời gian 8 tuần

- Tuân theo kế hoạch và prompt của người dùng tại từng thời điểm.
- Không tự suy diễn rằng toàn bộ chức năng phải được triển khai cùng lúc.
- Ưu tiên nền tảng nghiệp vụ ổn định trước các tính năng realtime và collaborative editing phức tạp, nhưng chỉ triển khai khi đúng phạm vi được giao.
- Docker và cấu hình production thuộc giai đoạn cuối, trừ khi người dùng yêu cầu khác.

## 11. Điều kiện dừng

Khi đã hoàn thành đúng nhiệm vụ, đã chạy các kiểm tra phù hợp và đã báo cáo đầy đủ, phải dừng lại. Không tạo thêm file, cài thêm package, refactor ngoài phạm vi hoặc bắt đầu tính năng mới.

## 12. Phạm vi làm việc của Huân — Front-end

Huân phụ trách thư mục `frontend/` và các công việc Front-end sau:

- React và TypeScript.
- Routing.
- Giao diện Authentication.
- Giao diện Project và Member.
- Kanban.
- Task Detail.
- Drag and drop bằng `dnd-kit`.
- Search và Filter.
- Giao diện Chat, Comment và Activity.
- Giao diện online presence.
- Tích hợp REST API client.
- Tích hợp Socket.IO client.
- Tích hợp Yjs editor phía client.
- Responsive cho desktop và mobile.
- Trạng thái loading, error và reconnect.

Các phần sau không thuộc phạm vi mặc định của Huân:

- PostgreSQL.
- Prisma.
- Express business logic.
- Authentication và authorization phía backend.
- Database transaction.
- Socket.IO server.
- Yjs server/provider.
- Persistence phía backend.
- Docker và deployment.

Quy tắc phối hợp và giới hạn phạm vi:

1. Front-end được đọc các contract do backend cung cấp để thực hiện tích hợp.
2. Không tự sửa backend nếu chưa có yêu cầu rõ ràng.
3. Nếu REST API, Socket.IO event hoặc Yjs provider cần thiết chưa tồn tại, chỉ mô tả contract cần có; không tự triển khai phần server tương ứng.
4. Mọi thay đổi nằm ngoài thư mục `frontend/` phải được báo trước và chờ người dùng xác nhận.
