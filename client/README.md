# Fiction Book Review – Client (Vite + React + MUI)

แอปฝั่ง Client พัฒนาโดยใช้ Vite + React + React Router + MUI และ TanStack Query สำหรับดึงข้อมูล พร้อมระบบ Auth แบบ JWT เชื่อมต่อกับ REST API ที่ `/api`

## Quick Start
- ติดตั้งแพ็กเกจ: `npm install`
- กำหนดค่าแวดล้อม (Dev): สร้าง/แก้ไฟล์ `.env.local`
  - ตัวอย่างค่าเริ่มต้นในโปรเจกต์นี้: `VITE_API_BASE=/api`, `VITE_PROXY_TARGET=http://localhost:8080`
- รันโหมดพัฒนา: `npm run dev` (เปิดที่ `http://localhost:5173`)
- Build โปรดักชัน: `npm run build`
- พรีวิวหลังบิลด์: `npm run preview`

หมายเหตุ: ใน dev server มี proxy ให้เส้นทาง `/api`, `/images`, `/uploads` ไปยัง backend (ดูที่ `vite.config.js`)

## Project Structure (Client)

### Top-level — ไฟล์ระดับรากของฝั่ง client สำหรับเตรียมสภาพแวดล้อม/สคริปต์/การตั้งค่าเครื่องมือ และ entry HTML ของ Vite
| Path | Description |
| --- | --- |
| [Dockerfile](Dockerfile) | Dockerfile สำหรับ build/run ฝั่ง client |
| [index.html](index.html) | HTML entry ที่ Vite ใช้ mount React |
| [eslint.config.js](eslint.config.js) | ตั้งค่า ESLint สำหรับโค้ดฝั่ง client |
| [package.json](package.json) | สคริปต์และ dependencies ของ client |
| [vite.config.js](vite.config.js) | ตั้งค่า Vite, alias `@ -> src`, dev proxy ไป backend |
| [.env.local](.env.local) | ค่าคอนฟิกแวดล้อม (เช่น `VITE_API_BASE`) |

### App & Theme — จุดบูตระบบ React และกำหนดธีม/สไตล์ของ MUI รวมถึงประกาศเส้นทางหลักของแอป
| Path | Description |
| --- | --- |
| [src/main.jsx](src/main.jsx) | จุดเริ่มรัน React, ครอบด้วย QueryClientProvider + BrowserRouter |
| [src/App.jsx](src/App.jsx) | กำหนดเส้นทางหลักทั้งหมด (lazy-load) |
| [src/theme.js](src/theme.js) | ธีม MUI หลักของแอป |

### Layout Components — คอมโพเนนต์ “เปลือก” ครอบทุกหน้า จัดวาง AppBar, Drawer, พื้นที่เนื้อหา และ Footer รวมทั้งตัวป้องกันเส้นทาง
| Path | Description |
| --- | --- |
| [src/components/layout/AppLayout.jsx](src/components/layout/AppLayout.jsx) | โครงหน้าหลัก: รวม AppBar/Drawer/Container/Footer และปุ่มผู้ใช้ (Login/Logout/โปรไฟล์) |
| [src/components/layout/ProtectedRoute.jsx](src/components/layout/ProtectedRoute.jsx) | ตัวตรวจสิทธิ์: ถ้าไม่ล็อกอินจะ redirect ไป `/login` พร้อมแนบ state.from |
| [src/components/layout/AppFooter.jsx](src/components/layout/AppFooter.jsx) | ส่วนท้ายมาตรฐานของทุกหน้า แสดงข้อความแบรนด์และลิขสิทธิ์ |


### Components – Books
| Path | Description |
| --- | --- |
| [src/components/books/BookCard.jsx](src/components/books/BookCard.jsx) | การ์ดแสดงหนังสือ ใช้ในหน้า Home |

### Components – Reviews
| Path | Description |
| --- | --- |
| [src/components/reviews/ReviewList.jsx](src/components/reviews/ReviewList.jsx) | รายการรีวิว + pagination + ปุ่มเขียน |
| [src/components/reviews/CreateReviewForm.jsx](src/components/reviews/CreateReviewForm.jsx) | ฟอร์มสร้าง/แก้ไขรีวิว |
| [src/components/reviews/ReviewItem.jsx](src/components/reviews/ReviewItem.jsx) | แสดงรีวิวเดี่ยว, ปรับแต่ง/ลบของตัวเอง |

### Components – Common
| Path | Description |
| --- | --- |
| [src/components/common/Loading.jsx](src/components/common/Loading.jsx) | หน้ารอโหลดข้อมูลกลางจอ |
| [src/components/common/ErrorState.jsx](src/components/common/ErrorState.jsx) | กล่องแสดงข้อผิดพลาดพร้อมปุ่มลองใหม่ |
| [src/components/common/ErrorAlert.jsx](src/components/common/ErrorAlert.jsx) | Alert error แบบบรรทัดเดียว |
| [src/components/common/AutoWidthTextField.jsx](src/components/common/AutoWidthTextField.jsx) | TextField ปรับความกว้างอัตโนมัติ |
| [src/components/icons/GoogleIcon.jsx](src/components/icons/GoogleIcon.jsx) | ไอคอน Google แบบ data URL |

### Contexts — สถานะร่วมระดับแอปด้วย React Context ใช้แทนการส่ง props ไล่ชั้น
| Path | Description |
| --- | --- |
| [src/contexts/AuthContext.jsx](src/contexts/AuthContext.jsx) | จัดการสถานะผู้ใช้/โทเค็น, login/register/logout |
| [src/contexts/useAuth.js](src/contexts/useAuth.js) | Hook `useAuth()` สำหรับเข้าถึงคอนเท็กซ์ |

### lib — ยูทิลิตี้/ไลบรารีฝั่งไคลเอนต์ เช่น axios instance, query client, schema, การแจ้งเตือน, จัดเก็บ token/user, ตัวช่วย URL
| Path | Description |
| --- | --- |
| [src/lib/api.js](src/lib/api.js) | axios instance แนบ JWT, จัดการ 401 |
| [src/lib/queryClient.js](src/lib/queryClient.js) | ตั้งค่า TanStack Query Client |
| [src/lib/notify.js](src/lib/notify.js) | ฟังก์ชันแจ้งเตือนด้วย react-hot-toast |
| [src/lib/schemas.js](src/lib/schemas.js) | zod schema ฟอร์มต่างๆ (login/register/review ฯลฯ) |
| [src/lib/storage.js](src/lib/storage.js) | จัดเก็บ/ดึง JWT และ user ใน localStorage |
| [src/lib/url.js](src/lib/url.js) | คำนวณ API_BASE_URL และแปลง path รูปภาพ |
| [src/lib/avatar.js](src/lib/avatar.js) | ยูทิลทำสี avatar และตัวอักษรย่อ |

### Pages — หน้าแต่ละ route (Screen) ประกอบจาก Components และเชื่อม Contexts/lib เพื่อแสดงข้อมูล/เรียก API
| Path | Description |
| --- | --- |
| [src/pages/Home.jsx](src/pages/Home.jsx) | รายการหนังสือล่าสุด (ดึง `/book?page=&limit=`) |
| [src/pages/BookDetail.jsx](src/pages/BookDetail.jsx) | หน้ารายละเอียดหนังสือ + รีวิว |
| [src/pages/Login.jsx](src/pages/Login.jsx) | หน้าเข้าสู่ระบบ (อีเมล/ชื่อผู้ใช้ + Google OAuth) |
| [src/pages/Register.jsx](src/pages/Register.jsx) | หน้าสมัครสมาชิก |
| [src/pages/ForgotPassword.jsx](src/pages/ForgotPassword.jsx) | ขอรีเซ็ตรหัสผ่านผ่านอีเมล |
| [src/pages/ResetPassword.jsx](src/pages/ResetPassword.jsx) | ตั้งรหัสผ่านใหม่ด้วยโทเค็น |
| [src/pages/Profile.jsx](src/pages/Profile.jsx) | โปรไฟล์ผู้ใช้ (ชื่อที่แสดง/ชื่อผู้ใช้/อีเมล/รหัสผ่าน/รูป/ลบบัญชี) |
| [src/pages/NotFound.jsx](src/pages/NotFound.jsx) | หน้าสำหรับเส้นทางไม่พบ |

## Project Structure (Server)

### Top-level — จุดเริ่มต้นและไฟล์ระดับรากของ API server
| Path | Description |
| --- | --- |
| [../server/server.js](../server/server.js) | จุดเริ่มต้น Express app, ติดตั้ง middleware, mount routes, start server |
| [../server/Dockerfile](../server/Dockerfile) | Dockerfile สำหรับ build/run ฝั่ง server |
| [../server/package.json](../server/package.json) | สคริปต์และ dependencies ของ server |
| [../server/README.md](../server/README.md) | คู่มือฝั่ง API |

### App & Bootstrap — โหลดคอนฟิก, ตั้งค่า DB/Passport, ลงทะเบียนโมเดล
| Path | Description |
| --- | --- |
| [../server/src/model-registry/index.js](../server/src/model-registry/index.js) | ลงทะเบียน Models + ความสัมพันธ์ (User, Book, Review) |
| [../server/src/config/index.js](../server/src/config/index.js) | รวมค่า config จาก env (server/db/cors/mail/auth/clientUrl) |
| [../server/src/config/database.js](../server/src/config/database.js) | ตั้งค่า Sequelize + export `sequelize` |
| [../server/src/config/passport.js](../server/src/config/passport.js) | กลไก Google OAuth (passport-google-oauth20) |
| [../server/src/config/schema.js](../server/src/config/schema.js) | สคีมาคอนฟิกและการตรวจ env |

### Core (Middleware/Services) — Middleware/Services กลาง เช่น CORS, Security, Token/Email/File/Google
| Path | Description |
| --- | --- |
| [../server/src/core/middleware/cors.js](../server/src/core/middleware/cors.js) | ตั้งค่า CORS ตาม allowlist |
| [../server/src/core/middleware/security.js](../server/src/core/middleware/security.js) | Helmet และ Rate limiter (สร้าง limiter ต่อกลุ่มเส้นทาง) |
| [../server/src/core/services/token-service.js](../server/src/core/services/token-service.js) | ออก JWT ให้ผู้ใช้ |
| [../server/src/core/services/email-service.js](../server/src/core/services/email-service.js) | ส่งอีเมล (เช่น ลิงก์รีเซ็ตรหัสผ่าน) |
| [../server/src/core/services/file-service.js](../server/src/core/services/file-service.js) | จัดการไฟล์รูปโปรไฟล์ (ลบ/ทำความสะอาด) |
| [../server/src/core/services/google-service.js](../server/src/core/services/google-service.js) | ผู้ช่วยสำหรับ Google OAuth |

#### Core Middleware/Services — ความหมายแบบย่อ
| Name | Meaning | Notes |
| --- | --- | --- |
| [cors.js](../server/src/core/middleware/cors.js) | อนุญาต/ปฏิเสธการเรียกข้ามโดเมน (CORS) จาก origin ที่กำหนด | รองรับ methods/headers ทั่วไป, เปิด `credentials` เพื่อแนบ cookie/headers ได้ |
| [security.js](../server/src/core/middleware/security.js) | เสริมความปลอดภัยของ HTTP headers (Helmet) และจำกัดอัตราคำขอ (Rate limit) | ใช้ `helmet()` และ `createLimiter({windowMs,max})` สำหรับกลุ่มเส้นทางเสี่ยง เช่น `/api/auth` |
| [token-service.js](../server/src/core/services/token-service.js) | ออกโทเค็น JWT ให้ผู้ใช้หลังล็อกอิน/สมัคร | payload: `{ id, username, email }`, อายุโทเค็นตาม config (`jwtExpiresIn`) |
| [email-service.js](../server/src/core/services/email-service.js) | ส่งอีเมลธุรกรรม เช่น ลิงก์รีเซ็ตรหัสผ่าน | พึ่งพา mailer config ส่ง HTML พร้อมลิงก์หมดอายุ |
| [file-service.js](../server/src/core/services/file-service.js) | จัดการไฟล์รูปโปรไฟล์ในโฟลเดอร์ `uploads/profiles` | ลบไฟล์เก่า, cleanup รูปที่ไม่ถูกใช้งานตาม userId/filename |
| [google-service.js](../server/src/core/services/google-service.js) | ผู้ช่วยฝั่ง Google OAuth เช่นเพิกถอน token | เรียก Google revoke endpoint ขณะลบบัญชี/ตัดสิทธิ์ |

### Features – Auth
| Path | Description |
| --- | --- |
| [../server/src/features/auth/auth-routes.js](../server/src/features/auth/auth-routes.js) | เส้นทาง `/api/auth` (register/login/forgot/reset/google/account) |
| [../server/src/features/auth/auth-controller.js](../server/src/features/auth/auth-controller.js) | ตัวควบคุมจัดการคำขอ Auth + Google callback |
| [../server/src/features/auth/auth-service.js](../server/src/features/auth/auth-service.js) | ธุรกิจการสมัคร/ล็อกอิน/รีเซ็ต/ลบบัญชี (Sequelize + transaction) |
| [../server/src/features/auth/auth-middleware.js](../server/src/features/auth/auth-middleware.js) | ตรวจสอบ JWT แล้วผูก `req.user` |

### Features – Users
| Path | Description |
| --- | --- |
| [../server/src/features/users/user-routes.js](../server/src/features/users/user-routes.js) | เส้นทาง `/api/user` (profile/email/password) ต้องล็อกอิน |
| [../server/src/features/users/user-controller.js](../server/src/features/users/user-controller.js) | ดึง/อัปเดตโปรไฟล์ เปลี่ยนอีเมล/รหัสผ่าน |
| [../server/src/features/users/user-service.js](../server/src/features/users/user-service.js) | ธุรกิจการอัปเดต user + ตรวจสอบรหัสผ่าน |
| [../server/src/features/users/upload-middleware.js](../server/src/features/users/upload-middleware.js) | Multer รับไฟล์ `profileImage` |
| [../server/src/features/users/user-model.js](../server/src/features/users/user-model.js) | Sequelize Model ของผู้ใช้ |

### Features – Books
| Path | Description |
| --- | --- |
| [../server/src/features/books/book-routes.js](../server/src/features/books/book-routes.js) | เส้นทาง `/api/book` (list, get by id) |
| [../server/src/features/books/book-controller.js](../server/src/features/books/book-controller.js) | ควบคุมการดึงรายการ/รายละเอียด พร้อม avgRating/reviewCount |
| [../server/src/features/books/book-model.js](../server/src/features/books/book-model.js) | Sequelize Model ของหนังสือ |
| [../server/src/features/books/book-util.js](../server/src/features/books/book-util.js) | ผู้ช่วย URL รูปปก |

### Features – Reviews
| Path | Description |
| --- | --- |
| [../server/src/features/reviews/review-routes.js](../server/src/features/reviews/review-routes.js) | เส้นทาง `/api/review` (create/read/update/delete) |
| [../server/src/features/reviews/review-controller.js](../server/src/features/reviews/review-controller.js) | ธุรกิจรีวิว (สร้าง/อ่านแบบแบ่งหน้า/แก้ไข/ลบ) |
| [../server/src/features/reviews/review-model.js](../server/src/features/reviews/review-model.js) | Sequelize Model ของรีวิว |

### Assets & Seeders — รูปภาพ, โฟลเดอร์อัปโหลด, และสคริปต์ seed ข้อมูล
| Path | Description |
| --- | --- |
| [../server/src/public/images/books](../server/src/public/images/books) | รูปภาพประกอบ (ให้บริการผ่าน `/images`) |
| [../server/uploads](../server/uploads) | โฟลเดอร์ runtime สำหรับไฟล์อัปโหลด (เสิร์ฟผ่าน `/uploads`) |
| [../server/src/seeders/bookSeeder.js](../server/src/seeders/bookSeeder.js) | Seeder เติมข้อมูลหนังสือเริ่มต้น |
| [../server/src/seeders/data/books.json](../server/src/seeders/data/books.json) | ข้อมูลหนังสือสำหรับ seeding |



## Frontend Routes (React Router)

| Route | Element | Defined at | Key APIs |
| --- | --- | --- | --- |
| `/` | [src/pages/Home.jsx](src/pages/Home.jsx) | [src/App.jsx:24](src/App.jsx#L24) | `GET /api/book?page=&limit=` |
| `/book/detail/:id` | [src/pages/BookDetail.jsx](src/pages/BookDetail.jsx) | [src/App.jsx:25](src/App.jsx#L25) | `GET /api/book/:id`, `GET /api/review/books/:bookId/reviews`, `POST/PUT/DELETE /api/review` |
| `/login` | [src/pages/Login.jsx](src/pages/Login.jsx) | [src/App.jsx:26](src/App.jsx#L26) | `POST /api/auth/login`, `GET /api/auth/google` |
| `/register` | [src/pages/Register.jsx](src/pages/Register.jsx) | [src/App.jsx:27](src/App.jsx#L27) | `POST /api/auth/register` |
| `/forgot-password` | [src/pages/ForgotPassword.jsx](src/pages/ForgotPassword.jsx) | [src/App.jsx:28](src/App.jsx#L28) | `POST /api/auth/forgot-password` |
| `/reset-password` | [src/pages/ResetPassword.jsx](src/pages/ResetPassword.jsx) | [src/App.jsx:29](src/App.jsx#L29) | `PUT /api/auth/reset-password` |
| `/profile` (Protected) | [src/pages/Profile.jsx](src/pages/Profile.jsx) | [src/App.jsx:30](src/App.jsx#L30)–[37](src/App.jsx#L37) | `GET/PUT /api/user/profile`, `PUT /api/user/email`, `PUT /api/user/password`, `DELETE /api/auth/account` |
| `*` | [src/pages/NotFound.jsx](src/pages/NotFound.jsx) | [src/App.jsx:38](src/App.jsx#L38) | - |

หมายเหตุ: `ProtectedRoute` จะตรวจสอบสถานะผู้ใช้จาก `AuthContext` และเด้งไป `/login` พร้อม `state.from` หากยังไม่ล็อกอิน ([src/components/layout/ProtectedRoute.jsx:6](src/components/layout/ProtectedRoute.jsx#L6))

## API Endpoints (รวมและแม็ปหน้า/โค้ด)
ตารางด้านล่างสรุป REST endpoints ที่ฝั่ง Client เรียกใช้ พร้อมระบุไฟล์โค้ดที่เกี่ยวข้องทั้งฝั่งหน้าบ้านและหลังบ้าน (แนบหมายเลขบรรทัดเพื่อเข้าถึงได้รวดเร็ว)

### Auth
| Method | Path | Client code | Server route | Controller |
| --- | --- | --- | --- | --- |
| POST | `/api/auth/register` | [src/contexts/AuthContext.jsx:45](src/contexts/AuthContext.jsx#L45) | [../server/src/features/auth/auth-routes.js:9](../server/src/features/auth/auth-routes.js#L9) | [../server/src/features/auth/auth-controller.js:61](../server/src/features/auth/auth-controller.js#L61) |
| POST | `/api/auth/login` | [src/contexts/AuthContext.jsx:28](src/contexts/AuthContext.jsx#L28) | [../server/src/features/auth/auth-routes.js:10](../server/src/features/auth/auth-routes.js#L10) | [../server/src/features/auth/auth-controller.js:77](../server/src/features/auth/auth-controller.js#L77) |
| GET | `/api/auth/google` | [src/pages/Login.jsx:85](src/pages/Login.jsx#L85) | [../server/src/features/auth/auth-routes.js:16](../server/src/features/auth/auth-routes.js#L16) | - |
| GET | `/api/auth/google/callback` | [src/pages/Login.jsx:39](src/pages/Login.jsx#L39) | [../server/src/features/auth/auth-routes.js:59](../server/src/features/auth/auth-routes.js#L59) | [../server/src/features/auth/auth-controller.js:99](../server/src/features/auth/auth-controller.js#L99) |
| POST | `/api/auth/forgot-password` | [src/pages/ForgotPassword.jsx:48](src/pages/ForgotPassword.jsx#L48) | [../server/src/features/auth/auth-routes.js:11](../server/src/features/auth/auth-routes.js#L11) | [../server/src/features/auth/auth-controller.js:117](../server/src/features/auth/auth-controller.js#L117) |
| PUT | `/api/auth/reset-password` | [src/pages/ResetPassword.jsx:45](src/pages/ResetPassword.jsx#L45) | [../server/src/features/auth/auth-routes.js:12](../server/src/features/auth/auth-routes.js#L12) | [../server/src/features/auth/auth-controller.js:129](../server/src/features/auth/auth-controller.js#L129) |
| DELETE | `/api/auth/account` | [src/pages/Profile.jsx:509](src/pages/Profile.jsx#L509) | [../server/src/features/auth/auth-routes.js:13](../server/src/features/auth/auth-routes.js#L13) | [../server/src/features/auth/auth-controller.js:142](../server/src/features/auth/auth-controller.js#L142) |

### Users (ต้องล็อกอิน)
| Method | Path | Client code | Server route | Controller |
| --- | --- | --- | --- | --- |
| GET | `/api/user/profile` | [src/pages/Profile.jsx:54](src/pages/Profile.jsx#L54) | [../server/src/features/users/user-routes.js:10](../server/src/features/users/user-routes.js#L10) | - |
| PUT | `/api/user/profile` | [src/pages/Profile.jsx:78](src/pages/Profile.jsx#L78), [100](src/pages/Profile.jsx#L100), [125](src/pages/Profile.jsx#L125) | [../server/src/features/users/user-routes.js:11](../server/src/features/users/user-routes.js#L11) | - |
| PUT | `/api/user/email` | [src/pages/Profile.jsx:335](src/pages/Profile.jsx#L335) | [../server/src/features/users/user-routes.js:12](../server/src/features/users/user-routes.js#L12) | - |
| PUT | `/api/user/password` | [src/pages/Profile.jsx:410](src/pages/Profile.jsx#L410) | [../server/src/features/users/user-routes.js:13](../server/src/features/users/user-routes.js#L13) | - |

### Books
| Method | Path | Client code | Server route | Controller |
| --- | --- | --- | --- | --- |
| GET | `/api/book?page=&limit=` | [src/pages/Home.jsx:18](src/pages/Home.jsx#L18) | [../server/src/features/books/book-routes.js:6](../server/src/features/books/book-routes.js#L6) | - |
| GET | `/api/book/:id` | [src/pages/BookDetail.jsx:29](src/pages/BookDetail.jsx#L29) | [../server/src/features/books/book-routes.js:7](../server/src/features/books/book-routes.js#L7) | - |

### Reviews
| Method | Path | Client code | Server route | Controller |
| --- | --- | --- | --- | --- |
| GET | `/api/review/books/:bookId/reviews?page=&limit=` | [src/components/reviews/ReviewList.jsx:26](src/components/reviews/ReviewList.jsx#L26) | [../server/src/features/reviews/review-routes.js:8](../server/src/features/reviews/review-routes.js#L8) | - |
| POST | `/api/review/books/:bookId/reviews` | [src/components/reviews/CreateReviewForm.jsx:48](src/components/reviews/CreateReviewForm.jsx#L48) | [../server/src/features/reviews/review-routes.js:7](../server/src/features/reviews/review-routes.js#L7) | - |
| PUT | `/api/review/:reviewId` | [src/components/reviews/CreateReviewForm.jsx:47](src/components/reviews/CreateReviewForm.jsx#L47) | [../server/src/features/reviews/review-routes.js:10](../server/src/features/reviews/review-routes.js#L10) | - |
| DELETE | `/api/review/:reviewId` | [src/components/reviews/ReviewItem.jsx:36](src/components/reviews/ReviewItem.jsx#L36) | [../server/src/features/reviews/review-routes.js:11](../server/src/features/reviews/review-routes.js#L11) | - |

## การเชื่อมต่อและคอนฟิก
- Base URL ของ API ถูกกำหนดจาก `VITE_API_BASE` ผ่านไฟล์ `src/lib/url.js` (ค่าเริ่มต้น dev คือ `/api` ผ่าน proxy ไป `http://localhost:8080`)
- อินเตอร์เซปเตอร์ของ axios แนบเฮดเดอร์ `Authorization: Bearer <token>` อัตโนมัติ ถ้ามีโทเค็นใน localStorage และเคลียร์ auth เมื่อเจอ 401 (`src/lib/api.js`)
- path asset รูปภาพจาก API (เช่น `/uploads/...`, `/images/...`) จะแปลงเป็น URL เต็มด้วย `toApiAsset()` (`src/lib/url.js`)

## หมายเหตุการพัฒนา
- ใช้ alias `@` ชี้ไป `src` (ตั้งค่าใน `vite.config.js`)
- จัดการสถานะโหลด/แคชข้อมูลด้วย TanStack Query (`src/lib/queryClient.js`)
- ฟอร์มตรวจสอบด้วย zod ผ่าน `@hookform/resolvers` (`src/lib/schemas.js`)

## CRUD Details (Request/Response และตัวแปรสำคัญ)

ด้านล่างสรุป 2 ชุด CRUD หลักที่ฝั่ง Client ใช้งานจริง โดยเน้นรูปแบบ Request/Response และตัวแปรที่เกี่ยวข้อง พร้อมอ้างอิงไฟล์โค้ดที่เรียกใช้

### 1) Reviews CRUD

- ภาพรวม: สร้าง/อ่าน/แก้ไข/ลบ รีวิวของหนังสือแต่ละเล่ม (ต้องล็อกอินยกเว้นการอ่าน)
- การยืนยันตัวตน: แนบ `Authorization: Bearer <token>` กับทุก request ที่ต้องล็อกอิน (แนบอัตโนมัติจาก `src/lib/api.js`)

ตัวแปรสำคัญ
- `bookId` (path) ไอดีหนังสือ
- `reviewId` (path) ไอดีรีวิว
- `rating` (body, number) คะแนน 1–5
- `content` (body, string|optional) เนื้อหารีวิว
- `page`, `limit` (query) ใช้สำหรับ pagination ขณะดึงรายการรีวิว

ตารางสรุป
| Action | Method | Path | Request | Response (สำเร็จ) | Client code |
| --- | --- | --- | --- | --- | --- |
| Create | POST | `/api/review/books/:bookId/reviews` | body: `{ rating, content? }` | `201 { success: true, data: Review }` | [src/components/reviews/CreateReviewForm.jsx:45-49](src/components/reviews/CreateReviewForm.jsx#L45) |
| Read (by book) | GET | `/api/review/books/:bookId/reviews?page=&limit=` | query: `page`, `limit` | `200 { success: true, data: { reviews, pagination } }` | [src/components/reviews/ReviewList.jsx:23-30](src/components/reviews/ReviewList.jsx#L23) |
| Update | PUT | `/api/review/:reviewId` | body: `{ rating?, content? }` | `200 { success: true, data: Review }` | [src/components/reviews/CreateReviewForm.jsx:45-49](src/components/reviews/CreateReviewForm.jsx#L45) |
| Delete | DELETE | `/api/review/:reviewId` | - | `200 { success: true, message }` | [src/components/reviews/ReviewItem.jsx:34-48](src/components/reviews/ReviewItem.jsx#L34) |

ตัวอย่าง Response จริงจากฝั่ง Server
- Create/Update: `{ success: true, data: { id, userId, bookId, rating, content, createdAt, updatedAt } }`
- Read (by book): `{ success: true, data: { reviews: [ { id, rating, content, createdAt, User: { id, displayName, profileImage } } ], pagination: { currentPage, totalItems, totalPages, itemsPerPage } } }`
- Delete: `{ success: true, message: "ลบรีวิวเรียบร้อยแล้ว" }`

หมายเหตุข้อผิดพลาด
- ถ้ายิงซ้ำ (ผู้ใช้เคยรีวิวเล่มนั้นแล้ว): `400 { success: false, message }`
- ไม่พบหนังสือ/รีวิว: `404 { success: false, message }`
- ไม่มีสิทธิ์แก้ไข/ลบรีวิวของคนอื่น: `403 { success: false, message }`

การทำงานในฝั่ง Client (ย่อ)
- สร้าง/แก้ไข: ใช้ `react-hook-form` + `zod` ตรวจข้อมูล, เรียก `api.post/put`, แล้ว `invalidateQueries` ของ TanStack Query เพื่อรีเฟรชทั้งรีวิวและสรุปคะแนนหนังสือ ([src/components/reviews/CreateReviewForm.jsx](src/components/reviews/CreateReviewForm.jsx))
- ลบ: เรียก `api.delete`, invalidate/revalidate คีย์ที่เกี่ยวข้อง แล้ว toast แจ้งผล ([src/components/reviews/ReviewItem.jsx](src/components/reviews/ReviewItem.jsx))
- อ่าน: ใช้ `useQuery` ผูกกับคีย์ `['reviews', bookId, page]` เพื่อจัดการโหลด/แคช/รีเฟรช ([src/components/reviews/ReviewList.jsx](src/components/reviews/ReviewList.jsx))

### 2) User Profile CRUD

- ภาพรวม: อ่านโปรไฟล์ผู้ใช้, อัปเดตชื่อที่แสดง/ชื่อผู้ใช้/รูป, เปลี่ยนอีเมล, เปลี่ยนรหัสผ่าน, ลบบัญชี (ต้องล็อกอินทั้งหมด)
- การยืนยันตัวตน: แนบ `Authorization: Bearer <token>` อัตโนมัติจาก `src/lib/api.js`

ตัวแปรสำคัญ
- `displayName` (body, string) ชื่อที่แสดง
- `username` (body, string) ชื่อผู้ใช้
- `profileImage` (form-data, file) รูปโปรไฟล์
- `newEmail` (body, string), `password` (body, string) รหัสผ่านปัจจุบันเพื่อยืนยันการเปลี่ยนอีเมล
- `oldPassword` (body, string), `newPassword` (body, string)

ตารางสรุป
| Action | Method | Path | Request | Response (สำเร็จ) | Client code |
| --- | --- | --- | --- | --- | --- |
| Read profile | GET | `/api/user/profile` | - | `200 { success: true, data: { id, username, displayName, email, profileImage, isGoogleUser, hasLocalPassword, createdAt, updatedAt } }` | [src/pages/Profile.jsx:50-66](src/pages/Profile.jsx#L50) |
| Update profile | PUT | `/api/user/profile` | JSON: `{ displayName?, username? }` หรือ form-data: `profileImage` | `200 { success: true, message, data: { username, displayName, profileImage } }` | [src/pages/Profile.jsx:74-138](src/pages/Profile.jsx#L74) |
| Change email | PUT | `/api/user/email` | body: `{ newEmail, password }` | `200 { success: true, message, email }` | [src/pages/Profile.jsx:326-363](src/pages/Profile.jsx#L326) |
| Change password | PUT | `/api/user/password` | body: `{ oldPassword, newPassword }` | `200 { success: true, message }` | [src/pages/Profile.jsx:401-430](src/pages/Profile.jsx#L401) |
| Delete account | DELETE | `/api/auth/account` | - | `200 { success: true, message }` | [src/pages/Profile.jsx:505-516](src/pages/Profile.jsx#L505) |

การทำงานในฝั่ง Client (ย่อ)
- โหลดโปรไฟล์: `useEffect` ดึงข้อมูลครั้งแรกและ normalize รูปภาพด้วย `resolveProfileImagePath` ([src/pages/Profile.jsx:50-66](src/pages/Profile.jsx#L50))
- แก้ชื่อที่แสดง/ชื่อผู้ใช้: ส่ง `PUT /user/profile` แล้วอัปเดตทั้ง state ภายในหน้าและ context ผู้ใช้ ([src/pages/Profile.jsx:74-116](src/pages/Profile.jsx#L74))
- อัปโหลดรูป: ส่ง `multipart/form-data` ฟิลด์ `profileImage` (PUT `/user/profile`) แล้วรีเฟรช preview ([src/pages/Profile.jsx:118-138](src/pages/Profile.jsx#L118))
- เปลี่ยนอีเมล/รหัสผ่าน: ส่ง `PUT /user/email` และ `PUT /user/password` พร้อมแจ้งผลด้วย toast ([src/pages/Profile.jsx:326-430](src/pages/Profile.jsx#L326))
- ลบบัญชี: เรียก `DELETE /auth/account` แล้ว logout + redirect กลับหน้าแรก ([src/pages/Profile.jsx:505-516](src/pages/Profile.jsx#L505))
