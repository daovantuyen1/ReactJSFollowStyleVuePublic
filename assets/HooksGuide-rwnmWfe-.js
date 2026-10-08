import{a as e,j as n}from"./index-BLDyOIfq.js";import"./redux-qsi8-Wp-.js";import{P as i}from"./PageHeader-cLVDtPhx.js";import{r as c}from"./markdown-p-sWiDPZ.js";import{g as a}from"./antd-BHao4kc_.js";import"./react-DPUHAKBN.js";const o=`# Cách sử dụng Hook của React

So sánh nhanh với VueJS: các hook của React tương ứng với \`ref()\` / \`data()\`,
\`computed\`, \`watch\`, \`mounted\` của Vue.

## 0. Import các hook

\`\`\`js
import React, { useCallback, useEffect, useState, useMemo } from 'react'
\`\`\`

| Hook | Tương đương Vue | Công dụng |
|---|---|---|
| \`useState\` | \`ref()\` / \`data()\` | Lưu trạng thái (state) của một biến |
| \`useMemo\` | \`computed\` | Theo dõi N biến và **trả về** kết quả tính toán |
| \`useEffect\` | \`watch\` / \`mounted\` | Theo dõi N biến rồi **thực hiện** một việc, không trả về giá trị |
| \`useCallback\` | — | Ghi nhớ (cache) một function, chỉ tạo lại khi dependency đổi |

---

## 1. \`useState\` — lưu trạng thái

Hook để lưu trạng thái state của 1 biến, giống \`ref()\` / \`data()\` của VueJS.

\`\`\`jsx
const [count, setCount] = useState(0)

const SetCount = () => {
  setCount(count + 1)
}

return (
  <>
    <p>Thử tính chất reactive:</p>
    <p>Giá trị: {count}</p>
    <button onClick={SetCount}>Make count</button>
  </>
)
\`\`\`

---

## 2. \`useMemo\` — giống \`computed\`

Dùng để theo dõi sự thay đổi giá trị của N biến (biến \`useState\`, prop, biến đặc biệt)
và **return lại kết quả**. Giống \`computed\` của VueJS — ứng dụng: hiển thị tỉ số trận đấu, v.v.

\`\`\`jsx
// Tương tự computed: chỉ chạy lại hàm này khi 'bienNeedComputed' thay đổi.
const GetBienNeedComputed = useMemo(() => {
  console.log('Đang tính toán lại bienNeedComputed ...' + bienNeedComputed)
  // some logic here
  return 'Đã thay đổi:' + bienNeedComputed
}, [bienNeedComputed]) // Mảng dependency: các biến cần theo dõi, chỉ trigger khi giá trị thay đổi

const TriggerComputed = () => {
  const curDT = getCurrentDateTime()
  SetBienNeedComputed(curDT)
}

return (
  <>
    <p>Thử dùng useMemo - tương tự computed trong VueJS</p>
    <p>Giá trị đang theo dõi thay đổi: {GetBienNeedComputed}</p>
    <button onClick={TriggerComputed}>Trigger thay đổi</button>
  </>
)
\`\`\`

---

## 3. \`useEffect\` — giống \`watch\` / \`mounted\`

Dùng để theo dõi sự thay đổi giá trị của N biến (biến \`useState\`, prop, biến đặc biệt),
sau đó thực hiện một công việc nào đó và **không trả về giá trị**. Giống \`watch\` của Vue.

**Các tính chất:**

- Được chạy lần đầu tiên **sau khi** Component hiện tại đã render (giống sự kiện \`mounted\` của Vue).
- Khi trình duyệt load Component lần đầu, \`useEffect\` được trigger chạy lần đầu; sau đó chỉ
  trigger khi các biến nó đang theo dõi thay đổi giá trị (giống \`immediate: true\` của \`watch\` trong Vue).

### Ví dụ 1 — theo dõi 1 biến

\`\`\`jsx
// Tương tự watch trong Vue
useEffect(() => {
  if (bienNeedWatch)
    alert(\`đã chạy watch theo dõi thay đổi, giá trị mới: \${bienNeedWatch}\`)
}, [bienNeedWatch]) // Mảng dependency: các biến cần theo dõi, chỉ trigger khi giá trị thay đổi

const TriggerWatch = () => {
  const curDT = getCurrentDateTime()
  SetBienNeedWatch(curDT)
}

return (
  <>
    <p>Theo dõi sự thay đổi giá trị của 1 biến state/prop sử dụng useEffect - tương tự watch trong VueJS</p>
    <p>Giá trị đang theo dõi thay đổi: {bienNeedWatch}</p>
    <button onClick={TriggerWatch}>Trigger thay đổi</button>
  </>
)
\`\`\`

### Ví dụ 2 — chạy đúng 1 lần sau khi UI render

Giả lập hàm chạy 1 lần duy nhất sau khi UI đã render — giống hàm \`mounted\` của Vue:

\`\`\`jsx
useEffect(() => {
  // thực hiện cv nào đó
}, []) // []: cài đặt này để useEffect chạy 1 lần duy nhất
\`\`\`

---

## 4. \`useCallback\` — ghi nhớ function

Cách hoạt động gần giống \`useEffect\`.

Ví dụ dưới đây dùng để get data từ API: khi load web lần đầu, \`useEffect\` chạy lần đầu và
gọi \`fetchData\` để tải data xuống; khi user thay đổi 1 trong 3 biến \`search\`, \`page\`,
\`pageSize\` thì \`useCallback\` của \`fetchData\` được trigger để tải lại data.

\`\`\`jsx
// useCallback sẽ trả về 1 function -> fetchData là 1 function: có thể gọi fetchData()
const fetchData = useCallback(async () => {
  setLoading(true)
  try {
    const res = await GetData(search, page, pageSize)
    setData(res.items)
    setTotalCount(res.totalCount)
  } catch (err) {
    console.error(err)
    message.error(t('Tải dữ liệu thất bại'))
  } finally {
    setLoading(false)
  }
  // KHÔNG đưa \`t\` vào deps: useI18n() trả về hàm \`t\` MỚI mỗi lần render,
  // thêm vào đây sẽ khiến fetchData đổi liên tục -> useEffect chạy vô hạn.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [search, page, pageSize])

useEffect(() => {
  fetchData()
}, [fetchData])
// bởi vì fetchData là const (chỉ set giá trị 1 lần duy nhất) nên useEffect chỉ được gọi 1 lần duy nhất
\`\`\`

> **Lưu ý:** \`useCallback\` chỉ tạo lại function khi một trong các dependency thay đổi.
> Nếu đưa một giá trị "mới mỗi lần render" (như hàm \`t\` ở trên) vào mảng dependency,
> function sẽ đổi liên tục và kéo theo \`useEffect\` chạy lặp vô hạn.
`,m=()=>{const{t}=e();return n.jsxs(n.Fragment,{children:[n.jsx(i,{title:t("Cách sử dụng Hook của React"),subtitle:t("So sánh hook React với ref / computed / watch / mounted của VueJS")}),n.jsx(a,{size:"small",className:"readme-card",children:n.jsx("div",{className:"markdown-body",children:c(o)})})]})};export{m as default};
//# sourceMappingURL=HooksGuide-rwnmWfe-.js.map
