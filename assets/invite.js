(function () {
  const T = window.TOY, W = T.W, $ = id => document.getElementById(id);
  const ORN = '<svg class="ornament" viewBox="0 0 150 20" fill="none" stroke="currentColor" stroke-width=".9" aria-hidden="true"><path d="M2 10h54M94 10h54"/><path d="M75 2.5 81 10l-6 7.5L69 10z"/><path d="M75 6.5 78 10l-3 3.5L72 10z" fill="currentColor"/><circle cx="62" cy="10" r="1.6" fill="currentColor" stroke="none"/><circle cx="88" cy="10" r="1.6" fill="currentColor" stroke="none"/></svg>';
  document.querySelectorAll(".orn").forEach(el => el.innerHTML = ORN);

  const S = Object.assign({ countdown: true, story: true, venue: true, program: true, dressCode: true, seating: true, rsvp: true, guestbook: true, photos: true }, W.sections || {});
  const show = (id, on) => { $(id).hidden = !on; };
  show("countdown", S.countdown);
  show("story", S.story && W.story && W.story.length);
  show("venue", S.venue && W.venue);
  show("program", S.program && W.program && W.program.length);
  show("dress", S.dressCode && W.dressCode);
  show("seating", S.seating && W.seating && W.seating.length);
  show("rsvp", S.rsvp);
  show("guestbook", S.guestbook);
  show("photos", S.photos);
  [...document.querySelectorAll("section.block")].filter(s => !s.hidden).forEach((s, i) => s.classList.toggle("alt", i % 2 === 1));

  if (W.rsvpMaybe === false) {
    const m = document.querySelector('input[name="att"][value="maybe"]');
    if (m) { m.closest(".choice").remove(); document.querySelector(".choices.three").classList.replace("three", "two"); }
  }

  const guest = (T.params.get("g") || "").trim().slice(0, 80);
  if (guest) $("rName").value = guest, $("gName").value = guest;

  /* ---------- Render (dilə görə) ---------- */
  function render() {
    const couple = `${W.bride} ${W.theme === "white-gold" ? T.t("and") : "&"} ${W.groom}`;
    document.title = `${couple} — ${T.t("title")}`;
    if ($("envNames")) {   // zərf açıldıqdan sonra DOM-dan silinir
      $("envNames").textContent = couple;
      $("seal").textContent = W.monogram || (W.bride[0] + "&" + W.groom[0]);
    }
    const amp = W.theme === "white-gold" ? T.esc(T.t("and")) : "&amp;";
    $("heroNames").innerHTML = `<span class="nm1">${T.esc(W.bride)}</span><span class="amp">${amp}</span><span class="nm2">${T.esc(W.groom)}</span>`;
    const dp = T.dotDate(W.date).split(" · ");
    $("heroDate").textContent = dp.join(".");
    $("heroDay").textContent = T.weekday(W.date).toLocaleUpperCase(T.lang === "az" ? "az" : T.lang);
    $("heroTime").textContent = T.time(W.date);
    $("heroVenue").textContent = W.venue ? [W.venue.name, T.pick(W.venue.hall)].filter(Boolean).join(", ").toLocaleUpperCase(T.lang === "az" ? "az" : T.lang) : "";
    if (guest) { $("guestLine").hidden = false; $("guestLine").textContent = T.t("for_guest", { name: guest }); }
    $("inviteText").textContent = T.pick(W.inviteText) || T.t("invite");
    $("footNames").textContent = couple;
    $("footDate").textContent = `${T.longDate(W.date)} · ${T.time(W.date)}`;

    if (W.story) $("storyList").innerHTML = W.story.map(s =>
      `<div class="story-item"><div class="story-year">${T.esc(s.year)}</div><div class="story-title">${T.esc(T.pick(s.title))}</div><p class="muted">${T.esc(T.pick(s.text))}</p></div>`).join("");

    if (W.venue) {
      const v = W.venue;
      $("venueName").textContent = v.name;
      $("venueHall").textContent = T.pick(v.hall);
      $("venueAddr").textContent = v.address || "";
      const q = v.lat != null ? `${v.lat},${v.lng}` : encodeURIComponent(v.mapQuery || (v.name + " " + (v.address || "")));
      const hl = T.lang === "ru" ? "ru" : T.lang === "en" ? "en" : "az";
      const mapSrc = `https://maps.google.com/maps?q=${q}&z=16&hl=${hl}&output=embed`;
      if ($("map").getAttribute("src") !== mapSrc) $("map").src = mapSrc;
      $("gmaps").href = v.lat != null ? `https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}` : `https://www.google.com/maps/search/?api=1&query=${q}`;
      $("waze").href = v.wazeUrl ? v.wazeUrl : v.lat != null ? `https://waze.com/ul?ll=${v.lat},${v.lng}&navigate=yes` : `https://waze.com/ul?q=${q}`;
    }

    if (W.program) $("programList").innerHTML = W.program.map(p =>
      `<li><span class="ic" aria-hidden="true">${T.esc(p.icon || "•")}</span><div class="pt"><span class="tm">${T.esc(p.time)}</span><span class="ti">${T.esc(T.pick(p.title))}</span></div></li>`).join("");

    if (W.dressCode) {
      $("dressTitle").textContent = T.pick(W.dressCode.title);
      $("dressNote").textContent = T.pick(W.dressCode.note);
      $("swatches").innerHTML = (W.dressCode.colors || []).map(c => `<span class="swatch" style="background:${T.esc(c)}"></span>`).join("");
    }

    $("rsvpBy").textContent = W.rsvpDeadline ? T.t("rsvp_by", { date: T.longDate(W.rsvpDeadline + "T12:00:00+04:00") }) : "";
    if (guest) $("albumLink").href = "foto.html?g=" + encodeURIComponent(guest);
    tick();
    renderWishes();
  }

  /* ---------- Geri sayım ---------- */
  const target = new Date(W.date).getTime();
  function tick() {
    const diff = target - Date.now();
    const el = $("cd");
    if (diff <= 0) {
      const sameDay = diff > -24 * 3600 * 1000;
      el.outerHTML = `<p class="cd-msg" id="cd">${T.esc(T.t(sameDay ? "today" : "passed"))}</p>`;
      return;
    }
    const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    const cells = [[d, "d"], [h, "h"], [m, "m"], [s, "s"]];
    if (!el.children.length) el.innerHTML = cells.map(() => `<div class="cd-cell"><div class="cd-num"></div><div class="cd-lbl"></div></div>`).join("");
    [...el.children].forEach((c, i) => {
      c.firstChild.textContent = String(cells[i][0]).padStart(2, "0");
      c.lastChild.textContent = T.t(cells[i][1]);
    });
  }
  setInterval(tick, 1000);

  /* ---------- Zərf ---------- */
  const audio = $("audio"), mbtn = $("musicBtn");
  if (W.music) {
    fetch(W.music, { method: "HEAD" }).then(r => { if (r.ok) { audio.src = W.music; mbtn.hidden = false; } }).catch(() => {});
  }
  function setPlaying(on) {
    mbtn.classList.toggle("playing", on);
    mbtn.setAttribute("aria-label", T.t(on ? "music_off" : "music_on"));
    $("musicLbl").textContent = T.t(on ? "music_off" : "music_on");
  }
  setPlaying(false);
  document.addEventListener("langchange", () => setPlaying(!audio.paused));
  audio.addEventListener("pause", () => setPlaying(false));
  audio.addEventListener("play", () => setPlaying(true));
  mbtn.addEventListener("click", () => {
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => {}); else { audio.pause(); setPlaying(false); }
  });

  const intro = $("intro");
  function openEnvelope() {
    if (intro.classList.contains("opening")) return;
    intro.classList.add("opening");
    if (audio.src) audio.play().then(() => setPlaying(true)).catch(() => {});
    setTimeout(() => { intro.classList.add("gone"); document.body.classList.remove("locked"); }, 1900);
    setTimeout(() => intro.remove(), 2900);
  }
  $("envelope").addEventListener("click", openEnvelope);
  if (T.params.has("skip")) { intro.remove(); document.body.classList.remove("locked"); }

  /* ---------- Görünəndə animasiya ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- Təqvim (.ics) ---------- */
  $("icsBtn").addEventListener("click", () => {
    const start = new Date(W.date), end = new Date(start.getTime() + (W.durationHours || 5) * 36e5);
    const f = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const v = W.venue || {};
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//toy//az", "BEGIN:VEVENT",
      `UID:${f(start)}-${W.bride}-${W.groom}@toy`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
      `SUMMARY:${W.bride} & ${W.groom}`, `LOCATION:${[v.name, v.address].filter(Boolean).join(", ")}`,
      `URL:${T.baseUrl()}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "toy.ics"; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });

  /* ---------- Oturma planı ---------- */
  $("seatForm").addEventListener("submit", e => {
    e.preventDefault();
    const q = T.norm($("seatInput").value), out = $("seatResult");
    out.classList.remove("none");
    if (q.length < 2) { out.textContent = ""; return; }
    const hits = [];
    (W.seating || []).forEach(t => t.guests.forEach(g => {
      const n = T.norm(g);
      if (n === q || n.includes(q) || q.split(" ").every(w => n.includes(w))) hits.push({ g, t: t.table });
    }));
    if (!hits.length) { out.classList.add("none"); out.textContent = T.t("seat_none"); return; }
    out.innerHTML = hits.slice(0, 4).map(h => {
      const s = T.esc(T.t("seat_found", { name: "\u0001", n: "\u0002" }));
      return s.replace("\u0001", T.esc(h.g)).replace("\u0002", `<b>${T.esc(h.t)}</b>`);
    }).join("<br>");
  });

  /* ---------- RSVP ---------- */
  let cnt = 1;
  const setCnt = v => { cnt = Math.max(1, Math.min(10, v)); $("cnt").textContent = cnt; };
  $("minus").onclick = () => setCnt(cnt - 1);
  $("plus").onclick = () => setCnt(cnt + 1);
  document.querySelectorAll('input[name="att"]').forEach(r => r.addEventListener("change", () => {
    $("countField").hidden = document.querySelector('input[name="att"]:checked').value === "no";
  }));
  function note(el, kind, text) { el.className = `notice show ${kind}`; el.textContent = text; }

  $("rsvpForm").addEventListener("submit", async e => {
    e.preventDefault();
    const name = $("rName").value.trim();
    const att = document.querySelector('input[name="att"]:checked').value;
    if (!name) { note($("rMsg"), "err", T.t("need_name")); $("rName").focus(); return; }
    const btn = $("rSend"); btn.disabled = true; btn.textContent = T.t("sending");
    try {
      const sb = await T.sb();
      if (sb) {
        const { error } = await sb.from("rsvps").insert({ name, attending: att, guests: att === "no" ? 0 : cnt, message: $("rNote").value.trim() || null, lang: T.lang });
        if (error) throw error;
      } else await new Promise(r => setTimeout(r, 500));
      note($("rMsg"), "ok", T.t(att === "yes" ? "thanks_yes" : att === "no" ? "thanks_no" : "thanks_maybe"));
    } catch (err) {
      console.error(err); note($("rMsg"), "err", T.t("err"));
    } finally { btn.disabled = false; btn.textContent = T.t("send"); }
  });

  /* ---------- Təbrik kitabı ---------- */
  let wishes = [];
  function renderWishes() {
    const box = $("wishes");
    if (!wishes.length) { box.innerHTML = `<p class="muted center">${T.esc(T.t("gb_empty"))}</p>`; return; }
    box.innerHTML = wishes.map(w => `<div class="wish"><p>${T.esc(w.message)}</p><div class="who">${T.esc(w.name)}</div></div>`).join("");
  }
  async function loadWishes() {
    try {
      const sb = await T.sb(); if (!sb) return renderWishes();
      const { data, error } = await sb.from("guestbook").select("name,message,created_at").order("created_at", { ascending: false }).limit(100);
      if (!error) wishes = data || [];
    } catch (e) { console.error(e); }
    renderWishes();
  }
  $("gbForm").addEventListener("submit", async e => {
    e.preventDefault();
    const name = $("gName").value.trim(), message = $("gText").value.trim();
    if (!name) { note($("gMsg"), "err", T.t("need_name")); return; }
    if (!message) { $("gText").focus(); return; }
    const btn = $("gSend"); btn.disabled = true;
    try {
      const sb = await T.sb();
      if (sb) { const { error } = await sb.from("guestbook").insert({ name, message }); if (error) throw error; }
      wishes.unshift({ name, message });
      renderWishes(); $("gText").value = ""; $("gMsg").className = "notice";
    } catch (err) { console.error(err); note($("gMsg"), "err", T.t("err")); }
    finally { btn.disabled = false; }
  });

  /* ---------- 3D qızılı üzüklər ---------- */
  (function rings() {
    const box = $("rings"); if (!box) return;
    const ring = (id, stops, gem) => {
      let layers = "";
      for (let z = -4; z <= 4; z++) {
        const shade = 1 - Math.abs(z) * 0.07;
        layers += `<svg viewBox="0 0 120 120" style="transform:translateZ(${z * 1.1}px);filter:brightness(${shade})"><circle cx="60" cy="60" r="46" fill="none" stroke="url(#${id})" stroke-width="10"/>${z === 4 ? '<circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.6" stroke-dasharray="40 250" stroke-dashoffset="-20" stroke-linecap="round"/>' : ""}</svg>`;
      }
      const g = gem ? `<div class="gem"></div>` : "";
      return `<div class="ring ${id}">${layers}${g}</div>`;
    };
    box.innerHTML = `<svg width="0" height="0" style="position:absolute"><defs>
      <linearGradient id="rg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7DE9A"/><stop offset=".3" stop-color="#D2A042"/><stop offset=".55" stop-color="#8E621A"/><stop offset=".8" stop-color="#E2B95E"/><stop offset="1" stop-color="#FFF0C2"/></linearGradient>
      <linearGradient id="rg2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF4D2"/><stop offset=".35" stop-color="#E4C47A"/><stop offset=".6" stop-color="#B38A3C"/><stop offset=".85" stop-color="#F2D990"/><stop offset="1" stop-color="#FFF8E4"/></linearGradient>
    </defs></svg>` + ring("rg1", 0, false) + ring("rg2", 0, true);
  })();

  /* ---------- Künc naxışları (qızılı budaqlar) ---------- */
  (function garlands() {
    const leaf = "M0 0 C6 -5 16 -5 22 0 C16 5 6 5 0 0Z";
    let g = "";
    for (let i = 0; i < 13; i++) {
      const t = i / 12, x = 10 + 180 * t, y = 20 + 150 * t * t;           // əyri budaq
      const ang = Math.atan2(300 * t, 180) * 180 / Math.PI;
      const side = i % 2 ? 1 : -1, sc = 1.15 - t * .45;
      g += `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(ang + side * 55).toFixed(1)}) scale(${sc.toFixed(2)})" d="${leaf}"/>`;
    }
    const svg = `<svg viewBox="0 0 220 220" fill="currentColor"><path d="M10 20 Q 120 30 190 170" fill="none" stroke="currentColor" stroke-width="1.3"/>${g}</svg>`;
    document.querySelectorAll(".garland").forEach(el => el.innerHTML = svg);
  })();

  /* ---------- Foto bölməsində əsl QR ---------- */
  (function photoQr() {
    const box = $("qrPhotos"); if (!box || !window.qrcode) return;
    const q = qrcode(0, "H"); q.addData(T.baseUrl() + "foto.html"); q.make();
    const n = q.getModuleCount(), c = 10, m = 2, S = (n + m * 2) * c;
    const finder = (r, k) => (r < 7 && k < 7) || (r < 7 && k >= n - 7) || (r >= n - 7 && k < 7);
    const mid = n / 2, hole = 2.6;                                          // ortada monoqram üçün yer
    let dots = "";
    for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) {
      if (!q.isDark(r, k) || finder(r, k)) continue;
      if (Math.abs(r - mid + .5) < hole && Math.abs(k - mid + .5) < hole) continue;
      dots += `<rect x="${(k + m) * c + .4}" y="${(r + m) * c + .4}" width="${c - .8}" height="${c - .8}" rx="${c * .32}"/>`;
    }
    const eye = (r, k) => { const x = (k + m) * c, y = (r + m) * c;
      return `<rect x="${x + c * .5}" y="${y + c * .5}" width="${c * 6}" height="${c * 6}" rx="${c * 1.6}" fill="none" stroke="currentColor" stroke-width="${c}"/><rect x="${x + c * 2}" y="${y + c * 2}" width="${c * 3}" height="${c * 3}" rx="${c * .9}"/>`; };
    const cx = S / 2, mono = T.esc(W.monogram || "");
    box.innerHTML = `<svg viewBox="0 0 ${S} ${S}" fill="currentColor" role="img" aria-label="QR">${dots}${eye(0, 0)}${eye(0, n - 7)}${eye(n - 7, 0)}
      <circle cx="${cx}" cy="${cx}" r="${c * 2.5}" fill="#fff" stroke="#C9AA74" stroke-width="2"/>
      <text x="${cx}" y="${cx + c * .7}" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="${c * 2.1}" fill="#94702F">${mono}</text></svg>`;
  })();

  /* ---------- Qızılı parıltılar ---------- */
  function sparkles(canvas, count, opts) {
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches || W.theme !== "white-gold") return;
    const ctx = canvas.getContext("2d"), dpr = Math.min(2, devicePixelRatio || 1);
    let w, h, parts = [], alive = true;
    const size = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); addEventListener("resize", size);
    const mk = (y) => ({ x: Math.random() * w, y: y ?? Math.random() * h, r: .6 + Math.random() * 1.8, vy: -(.08 + Math.random() * .25), vx: (Math.random() - .5) * .12, p: Math.random() * 6.28, sp: .01 + Math.random() * .03 });
    for (let i = 0; i < count; i++) parts.push(mk());
    function frame() {
      if (!alive || !canvas.isConnected) return;
      ctx.clearRect(0, 0, w, h);
      for (const s of parts) {
        s.x += s.vx; s.y += s.vy; s.p += s.sp;
        if (s.y < -5) Object.assign(s, mk(h + 5));
        const a = (Math.sin(s.p) + 1) / 2 * (opts.alpha || .9);
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
        g.addColorStop(0, `rgba(222,190,120,${a})`); g.addColorStop(.35, `rgba(200,160,85,${a * .55})`); g.addColorStop(1, "rgba(200,160,85,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3, 0, 6.29); ctx.fill();
        if (s.r > 1.9 && a > .6) { ctx.strokeStyle = `rgba(230,200,130,${a * .6})`; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(s.x - s.r * 4, s.y); ctx.lineTo(s.x + s.r * 4, s.y); ctx.moveTo(s.x, s.y - s.r * 4); ctx.lineTo(s.x, s.y + s.r * 4); ctx.stroke(); }
      }
      requestAnimationFrame(frame);
    }
    frame();
  }
  sparkles($("sparkIntro"), 70, { alpha: .95 });
  sparkles($("sparkHero"), 28, { alpha: .6 });

  /* ---------- Başlat ---------- */
  T.initLangSwitch();
  document.addEventListener("langchange", render);
  render();
  if (S.guestbook) loadWishes();
  if (T.isDemo) {
    const bar = document.createElement("div"); bar.className = "demo-bar"; bar.dataset.i18n = "demo"; bar.textContent = T.t("demo");
    document.body.appendChild(bar);
  }
})();
