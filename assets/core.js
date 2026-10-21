/* Ortaq köməkçilər: dil, tarix, Supabase */
(function () {
  const W = window.WEDDING;

  const I18N = {
    az: {
      label: "TOY DƏVƏTNAMƏSİ", kicker: "TOY", tagline: "Bu xüsusi günümüzdə sizi yanımızda görmək bizim üçün böyük sevincdir", eb_countdown: "GERİ SAYIM", eb_venue: "MƏKAN", eb_program: "PROQRAM", eb_rsvp: "İŞTİRAK TƏSDİQİ", eb_gb: "TƏBRİKLƏR", eb_photos: "FOTO ALBOM", eb_story: "HEKAYƏ", eb_dress: "GEYİM", eb_seating: "OTURMA PLANI", and: "və", title: "Toy dəvətnaməsi", tap: "Dəvətnaməni açmaq üçün toxunun",
      for_guest: "Hörmətli {name}",
      invite: "Həyatımızın ən xoşbəxt gününü sizinlə bölüşmək istəyirik. Sizi toy məclisimizdə görməkdən şərəf duyarıq.",
      countdown: "Toya qalan vaxt", d: "gün", h: "saat", m: "dəq.", s: "san.",
      today: "Böyük gün gəldi!", passed: "Bizimlə olduğunuz üçün təşəkkür edirik!",
      story: "Bizim hekayəmiz",
      venue: "Tədbir məkanı", maps: "Google Maps", waze: "Waze", calendar: "Təqvimə əlavə et",
      program: "Toy proqramı",
      dress: "Geyim tərzi",
      seating: "Masanızı tapın", seat_ph: "Ad və soyadınızı yazın", seat_btn: "Axtar",
      seat_found: "{name} — {n} saylı masa", seat_none: "Tapılmadı. Ad və soyadı tam yazın və ya bizə yazın.",
      rsvp: "İştirak edəcəksinizmi?", rsvp_by: "Zəhmət olmasa {date} tarixinədək cavab verin",
      name: "Ad və soyad", yes: "Gələcəm", no: "Gələ bilməyəcəm", maybe: "Hələ bilmirəm",
      count: "Neçə nəfər olacaqsınız?", note: "Arzu və ya qeyd (istəyə bağlı)", send: "Göndər",
      sending: "Göndərilir…", thanks_yes: "Təşəkkür edirik! Sizi səbirsizliklə gözləyirik.",
      thanks_no: "Təşəkkür edirik! Sizi ürəyimizdə yanımızda hiss edəcəyik.",
      thanks_maybe: "Təşəkkür edirik! Qərar verəndə yenidən göndərə bilərsiniz.",
      err: "Göndərmək alınmadı. İnterneti yoxlayıb yenidən cəhd edin.", need_name: "Zəhmət olmasa adınızı yazın.",
      gb: "Təbrik kitabı", gb_ph: "Arzularınızı yazın…", gb_send: "Təbrik göndər", gb_empty: "İlk təbriki siz yazın.",
      photos: "Toy şəkilləri", photos_text: "Toy günü masalardakı QR kodu skan edin və ya düyməyə toxunun — çəkdiyiniz şəkillər birbaşa ortaq albomumuza düşəcək.",
      photos_btn: "Albomu aç",
      upload: "Şəkil yüklə", upload_hint: "Bir neçə şəkli birdən seçə bilərsiniz", your_name: "Adınız (istəyə bağlı)",
      uploading: "{done} / {total} yüklənir…", uploaded: "Hazırdır! {n} şəkil albomda. Təşəkkür edirik!",
      album: "Ortaq albom", album_empty: "Hələ şəkil yoxdur. İlk şəkli siz əlavə edin!", back: "Dəvətnaməyə qayıt",
      footer: "Sizi səbirsizliklə gözləyirik", music_on: "Musiqini başlat", music_off: "Musiqini dayandır", scan_cap: "Şəkil yükləmək üçün skan edin",
      demo: "Nümunə rejimi — Supabase qoşulmayıb, göndərilənlər yadda saxlanmır."
    },
    en: {
      label: "WEDDING INVITATION", kicker: "WEDDING", tagline: "It would mean the world to us to celebrate this special day with you", eb_countdown: "COUNTDOWN", eb_venue: "LOCATION", eb_program: "SCHEDULE", eb_rsvp: "RSVP", eb_gb: "GUESTBOOK", eb_photos: "PHOTO ALBUM", eb_story: "STORY", eb_dress: "STYLE", eb_seating: "SEATING", and: "&", title: "Wedding invitation", tap: "Tap to open your invitation",
      for_guest: "Dear {name}",
      invite: "We would be honoured to have you with us as we celebrate the happiest day of our lives.",
      countdown: "Time until the wedding", d: "days", h: "hrs", m: "min", s: "sec",
      today: "The big day is here!", passed: "Thank you for celebrating with us!",
      story: "Our story",
      venue: "Wedding venue", maps: "Google Maps", waze: "Waze", calendar: "Add to calendar",
      program: "Programme",
      dress: "Dress code",
      seating: "Find your table", seat_ph: "Type your full name", seat_btn: "Search",
      seat_found: "{name} — Table {n}", seat_none: "Not found. Try your full name or message us.",
      rsvp: "Will you join us?", rsvp_by: "Kindly reply by {date}",
      name: "Full name", yes: "Joyfully accept", no: "Regretfully decline", maybe: "Not sure yet",
      count: "Number of guests", note: "A wish or note (optional)", send: "Send",
      sending: "Sending…", thanks_yes: "Thank you! We can't wait to see you.",
      thanks_no: "Thank you! You will be with us in our hearts.",
      thanks_maybe: "Thank you! You can send again once you decide.",
      err: "Could not send. Please check your connection and try again.", need_name: "Please enter your name.",
      gb: "Guestbook", gb_ph: "Write your wishes…", gb_send: "Send wishes", gb_empty: "Be the first to write.",
      photos: "Wedding photos", photos_text: "On the day, scan the QR code on your table or tap the button — your photos go straight into our shared album.",
      photos_btn: "Open album",
      upload: "Upload photos", upload_hint: "You can pick several photos at once", your_name: "Your name (optional)",
      uploading: "Uploading {done} / {total}…", uploaded: "Done! {n} photos added. Thank you!",
      album: "Shared album", album_empty: "No photos yet. Be the first!", back: "Back to invitation",
      footer: "We can't wait to celebrate with you", music_on: "Play music", music_off: "Pause music", scan_cap: "Scan to upload photos",
      demo: "Preview mode — Supabase is not connected, nothing is saved."
    },
    ru: {
      label: "СВАДЕБНОЕ ПРИГЛАШЕНИЕ", kicker: "СВАДЬБА", tagline: "Будем счастливы разделить этот особенный день с вами", eb_countdown: "ОБРАТНЫЙ ОТСЧЁТ", eb_venue: "МЕСТО", eb_program: "ПРОГРАММА", eb_rsvp: "ПОДТВЕРЖДЕНИЕ", eb_gb: "ПОЖЕЛАНИЯ", eb_photos: "ФОТОАЛЬБОМ", eb_story: "ИСТОРИЯ", eb_dress: "СТИЛЬ", eb_seating: "РАССАДКА", and: "и", title: "Свадебное приглашение", tap: "Нажмите, чтобы открыть приглашение",
      for_guest: "Приглашение для: {name}",
      invite: "Мы будем счастливы разделить с вами самый радостный день нашей жизни и приглашаем вас на нашу свадьбу.",
      countdown: "До свадьбы осталось", d: "дн.", h: "час.", m: "мин.", s: "сек.",
      today: "Этот день настал!", passed: "Спасибо, что были с нами!",
      story: "Наша история",
      venue: "Место проведения", maps: "Google Maps", waze: "Waze", calendar: "Добавить в календарь",
      program: "Программа вечера",
      dress: "Дресс-код",
      seating: "Найдите свой стол", seat_ph: "Введите имя и фамилию", seat_btn: "Найти",
      seat_found: "{name} — стол № {n}", seat_none: "Не найдено. Введите полное имя или напишите нам.",
      rsvp: "Подтвердите участие", rsvp_by: "Пожалуйста, ответьте до {date}",
      name: "Имя и фамилия", yes: "Приду", no: "Не смогу", maybe: "Пока не знаю",
      count: "Сколько вас будет?", note: "Пожелание или комментарий (необязательно)", send: "Отправить",
      sending: "Отправка…", thanks_yes: "Спасибо! Ждём вас с нетерпением.",
      thanks_no: "Спасибо! Вы будете с нами в наших сердцах.",
      thanks_maybe: "Спасибо! Когда решите, отправьте ответ ещё раз.",
      err: "Не удалось отправить. Проверьте интернет и попробуйте снова.", need_name: "Пожалуйста, введите имя.",
      gb: "Книга пожеланий", gb_ph: "Напишите пожелание…", gb_send: "Отправить пожелание", gb_empty: "Напишите первое пожелание.",
      photos: "Фото со свадьбы", photos_text: "В день свадьбы отсканируйте QR-код на столе или нажмите кнопку — ваши фото сразу попадут в общий альбом.",
      photos_btn: "Открыть альбом",
      upload: "Загрузить фото", upload_hint: "Можно выбрать сразу несколько фото", your_name: "Ваше имя (необязательно)",
      uploading: "Загрузка {done} / {total}…", uploaded: "Готово! Добавлено фото: {n}. Спасибо!",
      album: "Общий альбом", album_empty: "Пока нет фото. Будьте первым!", back: "К приглашению",
      footer: "С нетерпением ждём вас", music_on: "Включить музыку", music_off: "Выключить музыку", scan_cap: "Сканируйте, чтобы загрузить фото",
      demo: "Демо-режим — Supabase не подключён, данные не сохраняются."
    }
  };

  const MONTHS = {
    az: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
  };
  const DAYS = {
    az: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    ru: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
  };

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  const params = new URLSearchParams(location.search);
  let lang = params.get("lang") || store("toy_lang") || "az";
  if (!I18N[lang]) lang = "az";

  /* Toy tarixini Bakı vaxtı ilə göstərmək üçün +04:00 ofsetindən hesablanır */
  function bakuParts(iso) {
    const d = new Date(iso);
    const b = new Date(d.getTime() + 4 * 3600 * 1000);
    return { y: b.getUTCFullYear(), mo: b.getUTCMonth(), d: b.getUTCDate(), wd: b.getUTCDay(),
             hh: String(b.getUTCHours()).padStart(2, "0"), mm: String(b.getUTCMinutes()).padStart(2, "0") };
  }

  document.documentElement.dataset.theme = W.theme || "emerald";

  const T = {
    W,
    get lang() { return lang; },
    t(key, vars) {
      let s = (I18N[lang] && I18N[lang][key]) || I18N.az[key] || key;
      if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
      return s;
    },
    pick(v) {
      if (v == null) return "";
      if (typeof v === "string") return v;
      return v[lang] || v.az || "";
    },
    longDate(iso) {
      const p = bakuParts(iso);
      if (lang === "en") return `${p.d} ${MONTHS.en[p.mo]} ${p.y}`;
      if (lang === "ru") return `${p.d} ${MONTHS.ru[p.mo]} ${p.y}`;
      return `${p.d} ${MONTHS.az[p.mo]} ${p.y}`;
    },
    weekday(iso) { const p = bakuParts(iso); const s = DAYS[lang][p.wd]; return s.charAt(0).toUpperCase() + s.slice(1); },
    time(iso) { const p = bakuParts(iso); return `${p.hh}:${p.mm}`; },
    dotDate(iso) { const p = bakuParts(iso); return `${String(p.d).padStart(2, "0")} · ${String(p.mo + 1).padStart(2, "0")} · ${p.y}`; },
    setLang(l) {
      if (!I18N[l]) return;
      lang = l; store("toy_lang", l);
      document.documentElement.lang = l;
      T.applyI18n();
      document.dispatchEvent(new CustomEvent("langchange"));
    },
    applyI18n(root) {
      (root || document).querySelectorAll("[data-i18n]").forEach(el => { el.textContent = T.t(el.dataset.i18n); });
      (root || document).querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = T.t(el.dataset.i18nPh); });
      document.querySelectorAll(".lang-switch button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    },
    norm(s) {
      return (s || "").toLocaleLowerCase("az")
        .replace(/ə/g, "e").replace(/ı/g, "i").replace(/i̇/g, "i").replace(/ö/g, "o").replace(/ü/g, "u")
        .replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g")
        .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
    },
    esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); },
    params,
    isDemo: !(W.supabase && W.supabase.url && W.supabase.anonKey),
    _sb: null,
    async sb() {
      if (T.isDemo) return null;
      if (T._sb) return T._sb;
      if (!window.supabase) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "assets/vendor/supabase.js"; s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      T._sb = window.supabase.createClient(W.supabase.url, W.supabase.anonKey);
      return T._sb;
    },
    photoUrl(path) { return `${W.supabase.url}/storage/v1/object/public/photos/${path}`; },
    baseUrl() { return location.href.split(/[?#]/)[0].replace(/[^/]*$/, ""); },
    initLangSwitch() {
      document.querySelectorAll(".lang-switch button").forEach(b => b.addEventListener("click", () => T.setLang(b.dataset.lang)));
      document.documentElement.lang = lang;
      T.applyI18n();
    }
  };

  window.TOY = T;
})();
