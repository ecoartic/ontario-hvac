# Ontario HVAC — v3.6.1 Stable

این نسخه ساختار سایت و پنل نسخه پایدار را حفظ می‌کند و فقط ادیتور استاندارد مقاله را اضافه می‌کند.

- `npm install`
- `npm run dev`
- سایت: `http://127.0.0.1:55000/fa/`
- پنل: `http://127.0.0.1:55000/admin/`

تا زمانی که سایت/پنل باز است Terminal باید در حال اجرا بماند.

# Ontario HVAC FA — v3.3 Local Admin Fix

این نسخه برای Windows/Node 24 اصلاح شده است.

## اجرا

```bash
npm install
npm run dev
```

بعد از آماده شدن هر دو سرویس:

- سایت: `http://127.0.0.1:55000/fa/`
- پنل: `http://127.0.0.1:55000/admin/`

`npm run dev` با پکیج cross-platform `concurrently` هم Astro و هم `decap-server` را اجرا می‌کند.

پورت‌ها:
- Astro: `55000`
- Decap local backend: `55001`
