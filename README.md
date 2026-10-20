# Toy dəvətnaməsi — quraşdırma

Üç səhifə var:

| Fayl | Nə üçündür |
|---|---|
| `index.html` | Qonaqların açdığı dəvətnamə: zərf animasiyası, geri sayım, hekayə, xəritə, proqram, dress code, masa axtarışı, iştirak təsdiqi, təbrik kitabı |
| `foto.html` | QR kodla açılan səhifə: qonaqlar şəkil yükləyir, ortaq albomu görür |
| `admin.html` | Yalnız sizin üçün: təsdiqlər (CSV), təbriklər, şəkillər (ZIP), çap üçün QR kart, şəxsi linklər |

Bütün məlumatlar **`config.js`** faylındadır: adlar, tarix, məkan, proqram, masalar və s. Başqa fayla toxunmağa ehtiyac yoxdur.

`config.js`-də Supabase açarları boş olanda sayt **nümunə rejimində** işləyir. Hər şey görünür, amma göndərilənlər yadda saxlanmır.

---

## 1. Kompüterdə yoxlamaq

```bash
cd toy-sayti
python3 -m http.server 8000
```
Brauzerdə açın: http://localhost:8000. Faylı birbaşa iki kliklə açsanız, musiqi düyməsi görünməyə bilər.

## 2. Supabase (təxminən 10 dəqiqə)

1. https://supabase.com saytında **New project** yaradın. Region olaraq Frankfurt (eu-central-1) seçin.
2. **SQL Editor → New query** bölməsini açın. `supabase.sql` faylını açın və `ADMIN@EMAIL.COM` sözünü öz e-poçtunuzla əvəz edin. Sonra hamısını yapışdırıb **Run** basın.
3. **Authentication → Users → Add user → Create new user** ilə həmin e-poçtla istifadəçi yaradın. Şifrəni də qoyun və **Auto Confirm User** seçimini işarələyin.
4. **Authentication → Sign In / Providers** bölməsində **Allow new users to sign up** seçimini söndürün. Bu, əlavə qorunmadır.
5. **Project Settings → API Keys** bölməsindən **Project URL** və **anon / publishable** açarını kopyalayıb `config.js`-ə yazın:
   ```js
   supabase: {
     url: "https://xxxxxxxx.supabase.co",
     anonKey: "eyJhbGciOi..."   // və ya sb_publishable_...
   },
   ```
   ⚠️ `service_role` / `secret` açarını **heç vaxt** bura yazmayın.

## 3. GitHub Pages-də dərc etmək

1. GitHub-da yeni repo yaradın, məsələn `aysel-tural`. Repo **Public** olmalıdır, çünki pulsuz Pages üçün bu şərtdir.
2. Bu qovluqdakı bütün faylları repoya yükləyin (`Add file → Upload files` və ya `git push`).
3. **Settings → Pages → Source: Deploy from a branch → main / (root) → Save** edin.
4. 1–2 dəqiqə sonra sayt bu ünvanda açılacaq: `https://İSTİFADƏÇİ-ADI.github.io/aysel-tural/`

> Öz domeniniz varsa (məs. `ayseltural.az`): Settings → Pages → Custom domain, DNS-də CNAME → `İSTİFADƏÇİ-ADI.github.io`.

## 4. Toydan əvvəl

- **Admin:** `.../admin.html` ünvanına daxil olun.
- **QR kart:** Admin → *QR və linklər* → *Çap kartını endir* ilə A6 ölçüdə, 300 dpi PNG faylı alırsınız. Onu çap edib masalara qoyun.
- **Şəxsi linklər:** Qonaq adlarını yazın, sistem hər biri üçün `?g=Ad` linki yaradır. Dəvətnamədə "Hörmətli …" sətri həmin adla görünür, WhatsApp düyməsi də hazırdır.
- **Musiqi:** `music/song.mp3` faylını qoyun (lisenziyası olan və ya öz faylınız). Fayl yoxdursa, düymə avtomatik gizlənir.
- **Supabase 7 gün heç kim istifadə etməyəndə layihəni dayandırır.** Toydan 1–2 gün əvvəl saytı açıb bir təsdiq göndərin (sonra admindən silin). Dayanıbsa, Supabase panelində **Restore** basın.

## 5. Toydan sonra

- Admin → *Şəkillər* → **Bütün şəkilləri ZIP endir**
- Admin → *Təsdiqlər* → **CSV endir** (Excel-də açılır)
- İstəsəniz Supabase layihəsini silin. GitHub-dakı dəvətnamə xatirə kimi qala bilər.

## Limitlər (Supabase pulsuz plan)

| | Limit | Qeyd |
|---|---|---|
| Fayl yaddaşı | 1 GB | Şəkillər yüklənəndə ən uzun tərəfi 1800 px olan JPEG-ə çevrilir (~300–500 KB). Təxminən 2000+ şəkil sığır |
| Trafik | 5 GB / ay | Albomu çox adam baxarsa, əsas istifadə buradan gələcək |
| Bir dəfəyə | 30 şəkil | `foto.html`-də dəyişmək olar |

Video yükləmə yaddaşa qənaət üçün bağlıdır.

## Təhlükəsizlik qeydləri

- Təsdiqləri (RSVP) yalnız admin e-poçtu görür. Qonaqlar bir-birinin cavabını görə bilməz.
- Təbriklər və şəkillər hamıya açıqdır, çünki ortaq albom və təbrik kitabıdır. Uyğun olmayan nəsə gəlsə, admindən silin.
- `config.js`-dəki oturma planı (qonaq adları) saytın mənbə kodunda görünür.
