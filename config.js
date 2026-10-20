/* =========================================================
   TOY DƏVƏTNAMƏSİ — BÜTÜN MƏLUMATLAR BURADADIR
   Yalnız bu faylı dəyişməklə dəvətnaməni tam fərdiləşdirə bilərsiniz.
   Mətnlər 3 dildə: az / en / ru. Bir dil boş qalsa, AZ variantı göstərilir.
   ========================================================= */
window.WEDDING = {

  /* ---- Cütlük ---- */
  bride: "Püstə",
  groom: "Rüfət",
  monogram: "P&R",                     // möhür üzərindəki hərflər

  /* ---- Tarix və vaxt (Bakı vaxtı, +04:00) ---- */
  date: "2026-11-28T18:00:00+04:00",
  durationHours: 5,                        // təqvim üçün təxmini müddət
  rsvpDeadline: "2026-11-21",              // cavab üçün son tarix (boş qoysanız göstərilmir)

  /* ---- Dəvət mətni (boş qoysanız standart mətn işlənir) ---- */
  inviteText: {
    az: "",
    en: "",
    ru: ""
  },

  /* ---- Məkan ---- */
  venue: {
    name: "Yeni Arzu",
    hall: { az: "VIP zalı", en: "VIP Hall", ru: "VIP-зал" },
    address: "Bakı, Babək prospekti 64/3",
    mapQuery: "Arzu Hall şadlıq sarayı, Babək prospekti 64/3, Bakı",
    wazeUrl: "https://www.waze.com/az/live-map/directions/arzu-hall-sadliq-sarayi-babek-prospekti-baki?to=place.w.32702868.327225287.10371969",
    lat: null,   // xəritədə yer səhv çıxsa, Google Maps-dan dəqiq koordinatları bura yazın
    lng: null
  },

  /* ---- Bizim hekayəmiz (istəmirsinizsə: story: []) ---- */
  story: [
    { year: "2019", title: { az: "İlk tanışlıq", en: "We met", ru: "Знакомство" },
      text: { az: "Universitet kitabxanasında eyni kitabı axtarırdıq.", en: "We reached for the same book in the university library.", ru: "Мы потянулись за одной и той же книгой в библиотеке." } },
    { year: "2023", title: { az: "İlk səyahət", en: "First trip", ru: "Первое путешествие" },
      text: { az: "Şəkidə xan sarayının qarşısında uzun söhbət.", en: "A long talk in front of the Khan's Palace in Shaki.", ru: "Долгий разговор у Ханского дворца в Шеки." } },
    { year: "2026", title: { az: "Bəli!", en: "She said yes", ru: "Она сказала «да»" },
      text: { az: "Dənizkənarı bulvarda, gün batarkən.", en: "On the seaside boulevard, at sunset.", ru: "На бульваре у моря, на закате." } }
  ],

  /* ---- Toy proqramı ---- */
  program: [
    { time: "18:00", title: { az: "Qonaqların möhtəşəm qarşılanması", en: "Grand welcome of guests", ru: "Торжественная встреча гостей" } },
    { time: "19:00", title: { az: "Bəy və gəlinin girişi və rəqsi", en: "Entrance and first dance of the couple", ru: "Выход и танец жениха и невесты" } },
    { time: "20:30", title: { az: "Şah plov süfrəsi", en: "Shah pilaf feast", ru: "Шах-плов" } },
    { time: "20:45", title: { az: "Tort kəsimi", en: "Cake cutting", ru: "Разрезание торта" } },
    { time: "21:00", title: { az: "Band qrupu", en: "Live band", ru: "Живая музыка" } },
    { time: "21:30", title: { az: "Diskoteka", en: "Dance party", ru: "Дискотека" } },
    { time: "22:30", title: { az: "Yekun proqram", en: "Closing programme", ru: "Завершение вечера" } }
  ],

  /* ---- Geyim tərzi ---- */
  dressCode: {
    title: { az: "Rəsmi", en: "Formal", ru: "Официальный" },
    note: { az: "Tünd və pastel çalarlar xoşdur. Zəhmət olmasa ağ rəngdən çəkinin.",
            en: "Dark or pastel tones are welcome. Please avoid white.",
            ru: "Приветствуются тёмные и пастельные тона. Пожалуйста, избегайте белого." },
    colors: ["#1E4D3F", "#B08D57", "#E9DCC6", "#5A2E3A"]
  },

  /* ---- Fon musiqisi ----
     MP3 faylını "music" qovluğuna qoyun və adını bura yazın.
     Fayl yoxdursa, musiqi düyməsi avtomatik gizlənir. */
  music: "music/song.mp3",

  /* ---- Oturma planı (istəmirsinizsə: seating: []) ----
     Hər masa üçün qonaq adları. Axtarış hərf böyüklüyünə və ə/e, ı/i fərqinə baxmır. */
  seating: [
    { table: 1, guests: ["Rəşad Məmmədov", "Leyla Məmmədova", "Orxan Əliyev"] },
    { table: 2, guests: ["Nigar Həsənova", "Kamran Həsənov", "Fidan Quliyeva"] },
    { table: 3, guests: ["Elnur İsmayılov", "Sevinc İsmayılova"] }
  ],

  /* ---- Bölmələri açıb-bağlamaq ---- */
  sections: {
    countdown: true,
    story: false,
    venue: true,
    program: true,
    dressCode: false,
    seating: false,
    rsvp: true,
    guestbook: true,
    photos: true
  },

  /* İştirak təsdiqində "Hələ bilmirəm" variantı olsun? */
  rsvpMaybe: false,

  /* Rəng teması: "white-gold" (ağ-qızılı) və ya "emerald" (yaşıl-qızılı) */
  theme: "white-gold",

  /* ---- Supabase (README-də necə alınacağı yazılıb) ----
     Boş qalsa, sayt NÜMUNƏ rejimində işləyir: hər şey görünür, amma heç nə saxlanmır. */
  supabase: {
    url: "",        // məs: "https://abcdxyz.supabase.co"
    anonKey: ""     // "anon public" açarı
  },

  /* ---- Şəkil yükləmə ---- */
  photoMaxSide: 1800,      // yüklənən şəklin ən uzun tərəfi (px) — yaddaşa qənaət üçün
  photoQuality: 0.82
};
