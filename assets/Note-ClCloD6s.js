import{a as e,j as n}from"./index-DmW-54pE.js";import"./redux-qsi8-Wp-.js";import{P as c}from"./PageHeader-CPk1UIAi.js";import{r as i}from"./markdown-CyAYEi8L.js";import{g as o}from"./antd-BHao4kc_.js";import"./react-DPUHAKBN.js";const g=`# Yêu cầu xây dựng project ReactJS Sample

Ghi chú yêu cầu ban đầu — dùng làm checklist khi dựng project.

---

## A. Yêu cầu về project

### 1. UI

Sử dụng thư viện **Ant Design** cho phần UI.

### 2. Router

Sử dụng **React Router**, cách khai báo và sử dụng phải **giống với Vue Router**:

- Khai báo phải nằm trong thư mục \`/router/index.js\`
- Dùng chế độ **hash web history**: có dấu \`#\` trên URL

### 3. Gọi API

Sử dụng **Axios** để call API, khai báo trong các thư mục sau:

| File | Nội dung |
|---|---|
| \`/model/http.js\` | Định nghĩa các function \`post\`, \`get\`, \`postfile\`, \`getfile\` sử dụng axios |
| \`/model/api.js\` | Định nghĩa các endpoint API (gọi đến các function \`post\`, \`get\`, \`postfile\`, \`getfile\` để gọi API server) |

### 4. Build tool

Sử dụng **ViteJS**.

### 5. State management

Sử dụng **Redux Toolkit** để lưu trạng thái, khai báo và lưu trong các thư mục sau:

| File | Nội dung |
|---|---|
| \`/store/state.js\` | Khai báo object state để lưu trạng thái chung của các biến |
| \`/store/mutations.js\` | Khai báo các hàm set giá trị vào state |
| \`/store/index.js\` | Khai báo state instance |
| \`/store/getters.js\` | Khai báo các hàm get giá trị từ state |

### 6. Cấu trúc thư mục

Chia project thành các folder sau:

- \`assets\`
- \`components\`
- \`pages\`
- \`model\`
- \`router\`
- \`utils\`

### 7. \`vite.config.js\`

Thiết lập file \`vite.config.js\` với:

- Chỗ để set **base path** (sub domain)
  - Ví dụ: set base path là \`medicine\` → \`http://10.220.7.94/medicine\`
- Chỗ để set **sourcemap**
- Chỗ để set **allow local IP / IPv4**

### 8. Đa ngôn ngữ (i18n)

Thêm thư viện i18n giống với **vue-i18n**, theo cấu trúc sau:

| File | Nội dung |
|---|---|
| \`/lang/en_US.js\` | JSON của tiếng Anh |
| \`/lang/vi_VN.js\` | JSON của tiếng Việt |
| \`/lang/zh_TW.js\` | JSON của tiếng Trung |
| \`/lang/index.js\` | Khai báo object i18n |

Mỗi file ngôn ngữ có cấu trúc:

\`\`\`js
export default {
  'key tiếng việt': 'nội dung ngôn ngữ tương ứng',
}
\`\`\`

---

## B. Yêu cầu về file \`CLAUDE.md\`

Viết file \`CLAUDE.md\` gồm các quy tắc sau:

1. Không được tự ý thay đổi **cấu trúc code** (nếu thay đổi phải có sự đồng ý của tôi).
2. Không được tự ý đổi **logic** của các đoạn code JS hoặc logic trong code Vue
   (nếu thay đổi phải có sự đồng ý của tôi).
3. Không được tự ý **nâng cấp / hạ cấp** các thư viện trong file \`package.json\`.
4. Không sử dụng **CSS inline-style**, **JS inline-style**; không sử dụng CSS nằm trong cặp thẻ
   \`<style></style>\`; không sử dụng JS nằm trong thẻ \`<script><\/script>\`; không sử dụng thẻ
   image, video, các thẻ media khác có source là **inline base64**.
   (Nếu có trường hợp ngoại lệ phải có sự đồng ý của tôi.)
5. Chỉ sử dụng component UI library là **Ant Design**. Nếu component đang cần viết mà không có
   trong thư viện component UI đã liệt kê thì **cảnh báo** để tôi chọn hoặc gợi ý code mẫu cho tôi.
   Nhưng phải đảm bảo component của Ant Design **không render ra thẻ \`<script><\/script>\` hoặc
   \`<style></style>\`** và fill nội dung CSS, JS vào trong đó.
6. Không trỏ đến các source font chữ, font icon, JS, CSS, image, video, các tài nguyên khác...
   từ **bên ngoài**; chỉ trỏ từ source **nội bộ** trong project.
   (Nếu có trường hợp ngoại lệ phải có sự đồng ý của tôi.)
7. Hãy xử lý thật nhanh, **không lan man đi đọc toàn bộ code project**.
8. Mẹo sử dụng Claude Code: đưa ra các **yêu cầu đơn** (không gộp nhiều yêu cầu trong 1 lần
   request, không sẽ hết token).
`,d=()=>{const{t}=e();return n.jsxs(n.Fragment,{children:[n.jsx(c,{title:t("Note"),subtitle:t("Yêu cầu xây dựng project (đọc từ note.md)")}),n.jsx(o,{size:"small",className:"readme-card",children:n.jsx("div",{className:"markdown-body",children:i(g)})})]})};export{d as default};
//# sourceMappingURL=Note-ClCloD6s.js.map
