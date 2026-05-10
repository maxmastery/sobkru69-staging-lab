# คู่มือตั้งค่า Supabase สำหรับ SobKru69

เอกสารนี้ใช้แทนการเชื่อมต่อ Google Sheet/Google Apps Script เดิม โดยให้ Supabase เป็นฐานข้อมูลและที่เก็บไฟล์หลักของระบบ

## 1. สร้าง Table, Function, Policy และ Bucket

1. เปิด Supabase Dashboard ของโปรเจกต์ที่สร้างไว้
2. ไปที่ `SQL Editor`
3. เปิดไฟล์ `supabase/schema.sql` ในโปรเจกต์นี้
4. คัดลอก SQL ทั้งหมดไปวางใน SQL Editor
5. กด `Run`

สิ่งที่จะถูกสร้าง:

- `app_users` สำหรับสมาชิกและผู้ใช้งาน
- `app_settings` สำหรับ popup notification และข้อความวิ่ง
- `bell_notifications` สำหรับแจ้งเตือนรูประฆัง
- `support_messages` สำหรับข้อความติดต่อผู้ดูแล
- `news_posts` สำหรับข่าวสารประชาสัมพันธ์
- `discussion_threads`, `discussion_replies` สำหรับกระดานสนทนา
- `reports`, `banned_users` สำหรับรายงาน/ระงับผู้ใช้
- `products` สำหรับสินค้า/ไฟล์สรุป
- `donations` สำหรับประวัติเลี้ยงกาแฟและสลิป
- `lesson_progress`, `study_time`, `quiz_attempts`, `mock_exam_attempts` สำหรับรองรับการเก็บความก้าวหน้าและผลสอบในอนาคต
- Buckets: `sobkru-images`, `sobkru-slips`, `sobkru-files`

## 2. นำค่า Supabase มาใส่ในระบบ

ไปที่ Supabase Dashboard > `Project Settings` > `API` แล้วคัดลอก:

- `Project URL`
- `anon public key`

จากนั้นทำได้ 2 วิธี เลือกวิธีใดวิธีหนึ่ง

### วิธี A: ตั้งค่าผ่านหน้า Admin

1. เข้าเว็บ
2. Login ด้วย Super Admin: `Krumax` / `@max123456`
3. เข้า `Admin Panel`
4. ไปที่ `ตั้งค่า Backend`
5. ใส่ `Supabase Project URL`
6. ใส่ `Supabase Anon Public Key`
7. Bucket ใช้ค่าเดิมได้เลย: `sobkru-images`, `sobkru-slips`, `sobkru-files`
8. กด `บันทึกการตั้งค่า`

### วิธี B: ตั้งค่าผ่าน `.env.local`

สร้างหรือแก้ไฟล์ `.env.local`

```env
GEMINI_API_KEY=your-gemini-api-key-here
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
VITE_SUPABASE_IMAGES_BUCKET=sobkru-images
VITE_SUPABASE_SLIPS_BUCKET=sobkru-slips
VITE_SUPABASE_FILES_BUCKET=sobkru-files
```

หลังแก้ `.env.local` ให้ restart dev server

```bash
npm run dev
```

## Stripe และระบบส่งไฟล์หลังชำระเงิน

ตั้งค่า Environment Variables ฝั่ง Vercel เพิ่มเติม:

```env
STRIPE_SECRET_KEY=sk_live_or_test_key
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_ADMIN_TOKEN=change-this-to-a-long-random-secret
CRON_SECRET=change-this-to-a-long-random-secret
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-secret-key
```

ใน Stripe Dashboard ให้เพิ่ม webhook endpoint เป็น `https://your-domain.com/api/stripe-webhook` และเลือก event `checkout.session.completed` กับ `checkout.session.async_payment_succeeded`

หากใช้ GitHub Actions fallback cron ให้ตั้ง repository secrets `VERCEL_APP_URL` และ `CRON_SECRET` ด้วยค่าเดียวกับ production

## 3. ทดสอบการเชื่อมต่อ

1. เปิดหน้าเว็บ
2. สมัครสมาชิกใหม่ 1 บัญชี
3. Login ด้วยบัญชีที่สมัคร
4. เข้า Admin Panel > จัดการผู้ใช้งาน แล้วตรวจว่ามีผู้ใช้ใหม่แสดงขึ้นมา
5. ลองบันทึก Popup Notification หรือข้อความวิ่ง
6. ลองอัปโหลดรูปจากหน้า Admin Notification หรือ News

## 4. หมายเหตุด้านความปลอดภัย

โปรเจกต์นี้เป็น Frontend-only app จึงใช้ `anon public key` จากฝั่ง browser เพื่อให้เชื่อมต่อได้ทันทีตามโครงสร้างเดิมของระบบ Google Apps Script

ข้อควรทราบ:

- ระบบซ่อน `password_hash` ไม่ให้ถูกอ่านผ่าน table select โดยตรง และใช้ RPC สำหรับ login/register/list/update/delete user
- ตารางบางส่วนเปิด policy ให้ frontend อ่าน/เขียนได้ เพื่อให้ระบบเดิมทำงานต่อได้โดยไม่ต้องมี backend server
- ถ้าจะใช้งานจริงระดับ production และต้องป้องกันการโกงสลิป/สิทธิ์ admin แบบเข้มงวด ควรเพิ่ม Supabase Auth และ Edge Functions ที่ใช้ service role key ฝั่ง server เท่านั้น

ตอนนี้ระบบพร้อมใช้งานกับ Supabase หลังจากรัน SQL และใส่ Project URL + Anon Key แล้ว
