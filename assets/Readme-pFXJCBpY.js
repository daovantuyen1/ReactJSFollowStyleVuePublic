import{a as t,j as n}from"./index-BLDyOIfq.js";import"./redux-qsi8-Wp-.js";import{P as i}from"./PageHeader-cLVDtPhx.js";import{r as o}from"./markdown-p-sWiDPZ.js";import{g as a}from"./antd-BHao4kc_.js";import"./react-DPUHAKBN.js";const c=`# ReactJS Sample

Project mẫu ReactJS theo cấu trúc tương tự VueJS (vue-router / vuex style).

## Công nghệ

| Thành phần | Thư viện |
|---|---|
| Build tool | Vite 5 |
| UI | Ant Design 5 |
| Router | React Router 6 — **Hash history** (\`#\`) |
| State | Redux Toolkit |
| HTTP | Axios |
| i18n | Tự viết theo phong cách vue-i18n |

## Cài đặt & chạy

\`\`\`bash
npm install
npm run dev        # http://localhost:5173/medicine/#/
npm run build      # build ra thư mục dist/
npm run preview    # xem thử bản build
\`\`\`

## Quy ước code

Xem [CLAUDE.md](CLAUDE.md) — các ràng buộc bắt buộc của project. Tóm tắt:

- Không tự ý đổi cấu trúc code, đổi logic JS/Vue, hay nâng/hạ version thư viện
  trong \`package.json\` (phải hỏi trước).
- **Không dùng inline style** (\`style={{...}}\`, \`el.style.x = ...\`), không dùng thẻ
  \`<style>\` / \`<script>\` nhồi CSS/JS, không dùng media base64 inline.
  Toàn bộ CSS nằm trong [src/assets/styles.css](src/assets/styles.css) và gắn qua \`className\`.
- **Chỉ dùng UI library Ant Design**; nếu component cần viết không có trong Ant Design
  thì phải cảnh báo để chọn phương án.
- **Chỉ trỏ tài nguyên nội bộ** trong project, không dùng CDN / font / icon / js / css
  từ bên ngoài.

## Cấu trúc thư mục

\`\`\`
src/
├── assets/            # css, hình ảnh, font
│   ├── logo.svg
│   └── styles.css     # TOÀN BỘ css của project (không dùng inline style)
├── components/        # component dùng chung
│   ├── MainLayout.jsx
│   ├── PageHeader.jsx
│   ├── LanguageSwitcher.jsx
│   ├── CounterDemo.jsx
│   └── TodoDemo.jsx
├── pages/             # các trang (view)
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Medicine.jsx
│   ├── MedicineDetail.jsx
│   ├── Login.jsx
│   └── NotFound.jsx
├── model/             # tầng gọi API
│   ├── http.js        # post / get / postfile / getfile (axios)
│   └── api.js         # khai báo endpoint
├── router/
│   └── index.jsx      # khai báo routes (hash history)
├── store/             # quản lý trạng thái
│   ├── state.js       # object state
│   ├── mutations.js   # hàm set state
│   ├── getters.js     # hàm get state
│   └── index.js       # state instance (redux store)
├── lang/              # đa ngôn ngữ
│   ├── vi_VN.js       # từ điển tiếng Việt
│   ├── en_US.js       # từ điển tiếng Anh
│   ├── zh_TW.js       # từ điển tiếng Trung
│   └── index.js       # object i18n
├── utils/
│   └── index.js       # hàm tiện ích
├── App.jsx
└── main.jsx
\`\`\`

---

## 1. Router — \`src/router/index.jsx\`

Khai báo tập trung theo phong cách **vue-router**:

\`\`\`js
export const routes = [
  { path: '/',            name: 'home',            component: () => import('@/pages/Home'),  meta: { title: 'Trang chủ' } },
  { path: '/about',       name: 'about',           component: () => import('@/pages/About'), meta: { title: 'Giới thiệu' } },
  {
    path: '/medicine',
    name: 'medicine',
    component: () => import('@/components/MedicineLayout'),   // render <RouterView /> cho route con
    meta: { title: 'Danh mục thuốc', requiresAuth: true },
    children: [
      { path: '',           name: 'medicine-list',   component: () => import('@/pages/Medicine') },
      { path: 'detail/:id', name: 'medicine-detail', component: () => import('@/pages/MedicineDetail'), props: true },
      { path: '/medicine/import', name: 'medicine-import', component: () => import('@/pages/MedicineImport') },
      {
        path: 'catalog',                       // CẤP 2 -> /medicine/catalog
        name: 'medicine-catalog',
        component: () => import('@/components/MedicineCatalogLayout'),  // render <RouterView /> cho cấp 3
        meta: { title: 'Danh mục' },
        children: [
          { path: '',            name: 'medicine-catalog-list',  component: () => import('@/pages/MedicineCatalogList') },
          { path: 'group/:id',   name: 'medicine-catalog-group', component: () => import('@/pages/MedicineCatalogGroup'), props: true },
        ],
      },
    ],
  },
  { path: '/login',       name: 'login',           component: () => import('@/pages/Login'),    meta: { layout: 'blank' } },
  { path: '/:pathMatch(.*)*', name: 'not-found',   component: () => import('@/pages/NotFound'), meta: { layout: 'blank' } },

  // REDIRECT — không cần \`component\`, tự ẩn khỏi menu trái
  { path: '/home',           redirect: '/' },
  { path: '/thuoc',          redirect: 'medicine' },                                  // tương đối
  { path: '/danh-muc-thuoc', redirect: { name: 'medicine' } },                        // object location
  { path: '/thuoc-dau-tien', redirect: { name: 'medicine-detail', params: { id: 1 } } },
  { path: '/tim-kiem',       redirect: (to) => ({ name: 'medicine', query: to.query }) },
]
\`\`\`

### Lazy load component (giống vue-router)

\`component\` nhận **cả hai dạng**:

\`\`\`js
component: () => import('@/pages/Home')   // LAZY — tách chunk riêng, tải khi vào route
component: Home                          // import tĩnh — nằm trong bundle chính
\`\`\`

Router tự nhận diện loader (hàm không tham số, thân hàm chỉ là \`import(...)\`) rồi bọc
\`React.lazy\` + \`<Suspense>\` — bạn **không cần** tự viết \`React.lazy\`:

\`\`\`js
// router/index.jsx tự làm việc này giúp bạn
const Component = lazy(() => loader().then((mod) => ({ default: mod?.default ?? mod })))
\`\`\`

- Loader phải trả về module có \`export default\` (mọi page trong project đều vậy).
- Trong lúc tải chunk, \`<Suspense>\` hiển thị \`<Spin size="large" />\`.
- Kết quả build: mỗi route lazy thành 1 file riêng, ví dụ
  \`dist/assets/Home-*.js\`, \`dist/assets/Medicine-*.js\` — bundle chính nhỏ hơn hẳn.
- Route cha lazy cũng được: chunk của cha tải trước, rồi mới tới chunk của con.

**Hash history** — URL luôn có dấu \`#\`:

\`\`\`
http://10.220.7.94/medicine/#/
http://10.220.7.94/medicine/#/about
http://10.220.7.94/medicine/#/medicine/detail/5
\`\`\`

### Sử dụng trong component (giống vue-router)

\`\`\`jsx
import { useRouter, useRoute, RouterLink, RouterView } from '@/router'

const router = useRouter()
router.push('/about')
router.push({ name: 'medicine-detail', params: { id: 5 } })
router.push({ name: 'medicine', query: { keyword: 'para' } })
router.replace('/login')
router.back()

const route = useRoute()
route.path      // '/medicine/detail/5'
route.name      // 'medicine-detail'
route.params    // { id: '5' }
route.query     // { keyword: 'para' }
route.meta      // { title: '...', requiresAuth: true }
route.matched   // [route cha, route con] — chuỗi record khớp url
\`\`\`

### Route lồng nhau — \`children\`

Mỗi phần tử trong \`routes\` có thể có thêm \`children\`: **một mảng giống hệt \`routes\`**
(path / name / component / props / meta / children...).

\`\`\`js
{
  path: '/medicine',
  name: 'medicine',
  component: () => import('@/components/MedicineLayout'),   // phải render <RouterView /> cho route con
  meta: { title: 'Danh mục thuốc', icon: 'medicine', requiresAuth: true },
  children: [
    { path: '',            name: 'medicine-list',   component: () => import('@/pages/Medicine') },        // -> /medicine
    { path: 'detail/:id',  name: 'medicine-detail', component: () => import('@/pages/MedicineDetail'), props: true }, // -> /medicine/detail/:id
    { path: '/medicine/import', name: 'medicine-import', component: () => import('@/pages/MedicineImport') },          // path tuyệt đối

    // LỒNG TIẾP NHIỀU TẦNG: children của children
    {
      path: 'catalog',                    // CẤP 2 -> /medicine/catalog
      name: 'medicine-catalog',
      component: () => import('@/components/MedicineCatalogLayout'),   // cũng render <RouterView /> cho cấp 3
      meta: { title: 'Danh mục', icon: 'catalog' },
      children: [
        { path: '',          name: 'medicine-catalog-list',  component: () => import('@/pages/MedicineCatalogList') },   // -> /medicine/catalog
        { path: 'group/:id', name: 'medicine-catalog-group', component: () => import('@/pages/MedicineCatalogGroup'), props: true }, // -> /medicine/catalog/group/:id
      ],
    },
  ],
}
\`\`\`

Quy tắc:

| Điểm | Hành vi |
|---|---|
| \`path\` của con | viết tương đối (\`detail/:id\`) hoặc tuyệt đối (\`/medicine/import\`) |
| \`path: ''\` | trang index, hiển thị khi vào đúng path của cha |
| lồng nhiều tầng | \`children\` lồng bao nhiêu cấp cũng được, mỗi cấp cần 1 \`<RouterView />\` |
| \`meta\` | gộp từ cha xuống con, **con ghi đè cha** (\`route.meta\` là meta đã gộp) |
| \`requiresAuth\` / \`layout\` | khai báo ở cha là đủ, con tự kế thừa |
| guard \`beforeEach\` | chạy lần lượt cho từng record cha → con |
| cha không có \`component\` | router tự render \`<RouterView />\` để hiển thị con |
| \`router.push({ name })\` | tìm được cả route con (đệ quy), dùng \`fullPath\` đã ghép |
| \`route.matched\` | mảng record cha → con khớp url hiện tại |
| \`meta.hidden: true\` | ẩn khỏi menu trái (vẫn vào được bằng url) |

Trong component cha, đặt \`<RouterView />\` (tương đương \`<router-view />\`) tại vị trí
muốn hiển thị nội dung route con:

\`\`\`jsx
import { RouterView } from '@/router'

const MedicineLayout = () => (
  <>
    <PageHeader title="Danh mục thuốc" />
    <RouterView />
  </>
)
\`\`\`

### Redirect (giống vue-router)

Route có \`redirect\` **không cần \`component\`** — vào route đó sẽ được chuyển ngay sang
đích khác bằng \`replace\` (không để lại entry trong history). Route redirect cũng
**tự động bị ẩn khỏi menu trái**.

\`\`\`js
{ path: '/home',           redirect: '/' },                                   // chuỗi tuyệt đối
{ path: '/thuoc',          redirect: 'medicine' },                            // chuỗi tương đối
{ path: '/danh-muc-thuoc', redirect: { name: 'medicine' } },                  // object location
{ path: '/thuoc-dau-tien', redirect: { name: 'medicine-detail', params: { id: 1 } } },
{ path: '/tim-kiem',       redirect: (to) => ({ name: 'medicine', query: to.query }) }, // hàm
\`\`\`

| Dạng \`redirect\` | Ý nghĩa |
|---|---|
| \`'/medicine'\` | path tuyệt đối, dùng nguyên xi |
| \`'medicine'\` | **tương đối** — tính theo path của chính route đó (giống vue-router) |
| \`''\` | giữ nguyên path của chính route đó |
| \`'../other'\` | lùi 1 cấp rồi ghép (\`/a/b/c\` → \`/a/other\`) |
| \`{ name, params, query }\` | tra \`fullPath\` theo \`name\` rồi thay \`params\`, thêm \`query\` |
| \`{ path, query }\` | dùng \`path\` + \`query\` |
| \`(to) => location\` | hàm nhận route hiện tại (\`path\`, \`fullPath\`, \`params\`, \`query\`, \`hash\`) |

Chuỗi tương đối dùng đúng thuật toán \`resolveRelativePath\` của vue-router
(export từ \`@/router\` nếu cần dùng lại):

\`\`\`js
import { resolveRelativePath } from '@/router'

resolveRelativePath('medicine', '/thuoc')          // '/medicine'
resolveRelativePath('',         '/medicine/list')  // '/medicine/list'
resolveRelativePath('../other', '/a/b/c')          // '/a/other'
\`\`\`

Redirect dùng được ở **cả route gốc lẫn route con**, ở mọi cấp lồng nhau:

\`\`\`js
children: [
  { path: 'list', redirect: '' },   // /medicine/list -> /medicine/list (chính nó)
  { path: 'all',  redirect: '' },   // /medicine/catalog/all -> /medicine/catalog/all
]
\`\`\`

### Menu trái — tự sinh nhiều cấp từ \`routes\`

\`MainLayout\` đệ quy theo \`children\` để dựng menu (Ant Design \`Menu\` hỗ trợ submenu
lồng nhau sẵn):

\`\`\`
Trang chủ
Giới thiệu
Danh mục thuốc            <- /medicine
  ├─ Danh sách            <- /medicine
  └─ Danh mục             <- /medicine/catalog
       └─ Danh sách danh mục  <- /medicine/catalog
\`\`\`

- \`key\` của mỗi item là \`name\` của route (duy nhất, kể cả route index có path
  trùng cha); khi bấm sẽ tra \`name -> fullPath\` để điều hướng.
- Item đang chọn = \`route.name\`; submenu cha tự mở theo \`route.matched\`.
- Route có \`meta.hidden: true\`, \`layout: 'blank'\` hoặc \`redirect\` sẽ không lên menu.

### Guard

\`\`\`js
export const beforeEach = (to, from) => {
  if (to.meta?.requiresAuth && !localStorage.getItem(TOKEN_KEY)) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  return true
}
\`\`\`

---

## 2. Gọi API — \`src/model/\`

### \`http.js\` — 4 hàm nền tảng

\`\`\`js
import { post, get, postfile, getfile } from '@/model/http'

await post('/auth/login', { username, password })   // POST JSON
await get('/medicine/list', { page: 1, size: 20 })  // GET + query params
await postfile('/file/upload', { file }, (p) => console.log(p + '%'))  // upload
await getfile('/medicine/export', { keyword }, 'medicine.xlsx')        // download
\`\`\`

Đã cấu hình sẵn: baseURL, timeout, gắn \`Authorization: Bearer <token>\`, bắt lỗi 401/403/5xx và hiển thị \`message\` của Ant Design.

### \`api.js\` — khai báo endpoint

\`\`\`js
import api from '@/model/api'

await api.authApi.login({ username, password })
await api.medicineApi.list({ keyword, page: 1 })
await api.medicineApi.detail(5)
await api.medicineApi.importExcel(file, onProgress)
await api.medicineApi.exportExcel({ keyword }, 'medicine.xlsx')
\`\`\`

---

## 3. State — \`src/store/\`

| File | Vai trò | Tương đương Vuex |
|---|---|---|
| \`state.js\` | object state | \`state\` |
| \`mutations.js\` | hàm set giá trị (reducer) | \`mutations\` |
| \`getters.js\` | hàm get giá trị | \`getters\` |
| \`index.js\` | state instance | \`store\` |

\`\`\`jsx
import { useAppDispatch, useAppSelector, mutations } from '@/store'
import { getters } from '@/store/getters'

const dispatch = useAppDispatch()
const counter  = useAppSelector(getters.counter)

dispatch(mutations.increase(1))
dispatch(mutations.setToken('abc'))
dispatch(mutations.setValue({ key: 'loading', value: true }))
\`\`\`

> \`mutations\` export từ \`@/store\` là **action creator** (cùng tên với reducer trong
> \`mutations.js\`), nên gọi được trực tiếp như trên. Các hàm trong \`mutations.js\`
> là reducer của Redux Toolkit — chúng nhận \`(state, action)\` và đọc giá trị ở
> \`action.payload\`, **không gọi trực tiếp**.

Thêm biến mới: chỉ cần thêm key vào \`state.js\` + 1 hàm set trong \`mutations.js\` + 1 getter trong \`getters.js\`.

---

## 4. Đa ngôn ngữ — \`src/lang/\`

Khai báo theo phong cách **vue-i18n**. Key của từ điển **chính là câu tiếng Việt**.

\`\`\`
src/lang/
├── vi_VN.js   # export default { "Trang chủ": "Trang chủ", ... }
├── en_US.js   # export default { "Trang chủ": "Home", ... }
├── zh_TW.js   # export default { "Trang chủ": "首頁", ... }
└── index.js   # object i18n
\`\`\`

### Sử dụng trong component

\`\`\`jsx
import { useI18n } from '@/lang'

const { t, locale, setLocale, availableLocales } = useI18n()

t('Trang chủ')                              // 'Home' khi locale = en_US
t('Tổng: {{count}}', { count: 5 })          // nội suy tham số
setLocale('zh_TW')                          // đổi ngôn ngữ
\`\`\`

### Sử dụng ngoài component

\`\`\`js
import i18n from '@/lang'

i18n.t('Trang chủ')
i18n.setLocale('en_US')
i18n.locale            // 'en_US'
\`\`\`

### Thêm ngôn ngữ mới

1. Tạo file \`src/lang/ja_JP.js\` với \`export default { "Trang chủ": "ホーム", ... }\`
2. Import và thêm vào \`messages\` + \`availableLocales\` trong \`src/lang/index.js\`

Ngôn ngữ đã chọn được lưu vào \`localStorage\` và tự khôi phục ở lần mở sau. Locale của Ant Design (\`ConfigProvider\`) cũng tự đồng bộ theo.

---

## 5. \`vite.config.js\`

Các hằng số cần sửa nằm ở đầu file:

\`\`\`js
const BASE_PATH = 'medicine'      // -> http://10.220.7.94/medicine/
const ENABLE_SOURCEMAP = true     // true | false | 'hidden'
const DEV_HOST = '0.0.0.0'        // cho phép truy cập qua local IP / IPv4
const DEV_PORT = 5173
const API_PROXY_PREFIX = '/api'
const API_PROXY_TARGET = 'http://10.220.7.94'
\`\`\`

- **Base path**: \`BASE_PATH = 'medicine'\` → app chạy tại \`http://10.220.7.94/medicine/\`. Để \`''\` nếu deploy ở root.
- **Sourcemap**: \`true\` (có map), \`false\` (không), \`'hidden'\` (có map nhưng không tham chiếu trong bundle).
- **Local IP / IPv4**: \`DEV_HOST = '0.0.0.0'\` cho phép truy cập từ máy khác trong LAN qua \`http://10.220.7.94:5173/medicine/\`.
- **Proxy**: request tới \`/api/*\` được forward sang \`API_PROXY_TARGET\`, tránh CORS khi dev.

### Deploy với base path

Build xong copy nội dung \`dist/\` vào thư mục \`medicine\` trên web server (IIS / Nginx). Vì dùng hash history nên **không cần** cấu hình rewrite URL.

---

## 6. Biến môi trường — \`.env\`

\`\`\`env
VITE_API_BASE_URL=/api
VITE_API_TIMEOUT=30000
VITE_TOKEN_KEY=reactjs_sample_token
\`\`\`

## Tài khoản demo

Trang \`/login\` chấp nhận bất kỳ tài khoản / mật khẩu nào (mock). Trang \`/medicine\` có công tắc **Dùng dữ liệu mock** để chạy thử khi chưa có API server.
`,d=()=>{const{t:e}=t();return n.jsxs(n.Fragment,{children:[n.jsx(i,{title:e("README"),subtitle:e("Tài liệu hướng dẫn của project (đọc từ README.md)")}),n.jsx(a,{size:"small",className:"readme-card",children:n.jsx("div",{className:"markdown-body",children:o(c)})})]})};export{d as default};
//# sourceMappingURL=Readme-pFXJCBpY.js.map
