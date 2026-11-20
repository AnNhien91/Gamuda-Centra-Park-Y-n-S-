/* Gamuda Central Park — tương tác giao diện (không phụ thuộc thư viện) */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DATA = window.__SITE__ || { plans: [] };

  /* ---------- Tracking helper ---------- */
  function track(event, params = {}) {
    try {
      if (window.gtag) window.gtag('event', event, params);
      if (window.dataLayer) window.dataLayer.push({ event, ...params });
      if (window.fbq) {
        if (event === 'generate_lead') window.fbq('track', 'Lead', params);
        else if (event === 'call_click' || event === 'zalo_click') window.fbq('track', 'Contact', { method: event });
      }
    } catch (_) { /* không chặn UI vì tracking */ }
  }
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (el) track(el.dataset.track, { location: el.closest('section,header,footer,nav')?.id || el.className });
  });

  /* ---------- Header ---------- */
  const header = $('[data-header]');
  const navToggle = $('[data-nav-toggle]');
  const mobileNav = $('#mobile-nav');
  const mobileCta = $('.mobile-cta');
  const hero = $('.hero');
  const navBackdrop = $('[data-nav-backdrop]');
  const backTop = $('[data-back-top]');
  let lastY = window.scrollY;

  function onScroll() {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
      const navOpen = navToggle?.getAttribute('aria-expanded') === 'true';
      header.classList.toggle('is-hidden', !navOpen && y > 700 && y > lastY + 4);
      if (y < lastY - 4) header.classList.remove('is-hidden');
    }
    if (mobileCta) {
      const threshold = hero ? hero.offsetHeight * 0.6 : 200;
      mobileCta.classList.toggle('is-visible', y > threshold);
    }
    if (backTop) {
      // Hiện khi khách đã cuộn qua ~60% trang (đang xem phần cuối)
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      backTop.classList.toggle('is-visible', maxY > 0 && y > Math.max(window.innerHeight, maxY * 0.6));
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setNav(open) {
    if (!navToggle || !mobileNav) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    mobileNav.hidden = !open;
    if (navBackdrop) navBackdrop.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    header.classList.toggle('nav-open', open);
    header.classList.remove('is-hidden');
    header.classList.toggle('is-scrolled', open || window.scrollY > 40);
    if (open) mobileNav.querySelector('a')?.focus({ preventScroll: true });
  }
  navToggle?.addEventListener('click', () => setNav(navToggle.getAttribute('aria-expanded') !== 'true'));
  navBackdrop?.addEventListener('click', () => setNav(false));
  window.addEventListener('resize', () => { if (window.innerWidth >= 1180 && navToggle?.getAttribute('aria-expanded') === 'true') setNav(false); });

  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    header?.classList.remove('is-hidden');
    $('.brand')?.focus({ preventScroll: true });
  });
  mobileNav?.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') { setNav(false); navToggle.focus(); }
  });

  // Đánh dấu mục menu theo section đang xem
  const navLinks = $$('[data-nav]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle('is-current', a.dataset.nav === en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach((a) => { const s = document.getElementById(a.dataset.nav); if (s) io.observe(s); });
  }

  /* ---------- Hero slideshow ---------- */
  const slides = $$('.hero-slide');
  const dots = $$('[data-hero-dot]');
  if (slides.length > 1) {
    let idx = 0; let timer;
    const go = (i) => {
      slides[idx].classList.remove('is-active');
      dots[idx]?.setAttribute('aria-selected', 'false');
      idx = (i + slides.length) % slides.length;
      const img = slides[idx].querySelector('img');
      if (img && img.loading === 'lazy') img.loading = 'eager';
      slides[idx].classList.add('is-active');
      dots[idx]?.setAttribute('aria-selected', 'true');
    };
    const start = () => { if (!reduceMotion) { clearInterval(timer); timer = setInterval(() => go(idx + 1), 7000); } };
    dots.forEach((d) => d.addEventListener('click', () => { go(Number(d.dataset.heroDot)); start(); }));
    document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(timer) : start()));
    // tải trước ảnh slide sau khi trang đã hiển thị
    window.addEventListener('load', () => slides.forEach((s) => { const im = s.querySelector('img'); if (im) im.loading = 'eager'; }));
    start();
  }

  /* ---------- Reveal + count-up ---------- */
  const fmtNum = (n, dec, group) => n.toLocaleString('vi-VN', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: group });
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const dec = Number(el.dataset.decimals || 0);
    const group = el.dataset.format === '1';
    if (reduceMotion) { el.textContent = fmtNum(target, dec, group); return; }
    const dur = 1600; const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmtNum(target * eased, dec, group);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        $$('[data-count]', en.target).forEach(countUp);
        rio.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach((el) => rio.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Parallax nhẹ ---------- */
  const para = $('[data-parallax]');
  if (para && !reduceMotion) {
    let ticking = false;
    const update = () => {
      const r = para.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        para.style.transform = `translate3d(0, ${(p * -8).toFixed(2)}%, 0)`;
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  /* ---------- Tabs (dùng chung) ---------- */
  function activateTab(btn, focus) {
    const group = btn.dataset.tabGroup;
    const id = btn.dataset.tab;
    $$(`[data-tab-group="${group}"]`).forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    $$(`[data-panel-group="${group}"]`).forEach((p) => { p.hidden = p.dataset.panel !== id; });
    if (focus) btn.focus();
    if (group === 'plan') renderCalc();
    if (group === 'unit' && window.innerWidth < 960) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  $$('[data-tab-group]').forEach((btn) => {
    if (!btn.classList.contains('is-active')) btn.tabIndex = -1;
    btn.addEventListener('click', () => activateTab(btn));
    btn.addEventListener('keydown', (e) => {
      const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const list = $$(`[data-tab-group="${btn.dataset.tabGroup}"]`);
      const i = list.indexOf(btn);
      let n = i;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % list.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + list.length) % list.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = list.length - 1;
      activateTab(list[n], true);
    });
  });

  /* ---------- Căn hộ: 3D / 2D ---------- */
  $$('.unit-panel').forEach((panel) => {
    const btns = $$('[data-view]', panel);
    const box = $('.unit-img', panel);
    const i3 = $('.v-3d', panel); const i2 = $('.v-2d', panel);
    btns.forEach((b) => b.addEventListener('click', () => {
      const is2d = b.dataset.view === '2d';
      btns.forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      i3.hidden = is2d; i2.hidden = !is2d;
      box.dataset.src = (is2d ? i2 : i3).getAttribute('src');
      box.style.aspectRatio = is2d ? '3 / 2' : '';
    }));
  });

  /* ---------- Gallery filter ---------- */
  const filterBtns = $$('[data-filter]');
  filterBtns.forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.filter;
    filterBtns.forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    $$('.masonry-item').forEach((it) => {
      const show = f === 'all' || it.dataset.cat === f;
      it.classList.toggle('is-hidden', !show);
      if (show) it.classList.add('is-in');
    });
  }));

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox');
  if (lb) {
    const lbImg = $('.lb-img', lb); const lbCap = $('.lb-caption', lb); const lbCount = $('.lb-count', lb);
    let items = []; let cur = 0; let opener = null;
    const show = (i) => {
      cur = (i + items.length) % items.length;
      const it = items[cur];
      lbImg.src = it.dataset.src; lbImg.alt = it.dataset.caption || '';
      lbCap.textContent = it.dataset.caption || '';
      lbCount.textContent = `${cur + 1} / ${items.length}`;
    };
    const open = (el) => {
      const group = el.dataset.lightbox;
      items = $$(`[data-lightbox="${group}"]`).filter((x) => !x.classList.contains('is-hidden'));
      opener = el;
      lb.classList.toggle('is-single', items.length < 2);
      show(Math.max(0, items.indexOf(el)));
      lb.hidden = false; document.body.style.overflow = 'hidden';
      $('[data-lb-close]', lb).focus();
    };
    const close = () => { lb.hidden = true; document.body.style.overflow = ''; lbImg.removeAttribute('src'); opener?.focus(); };
    document.addEventListener('click', (e) => { const el = e.target.closest('[data-lightbox]'); if (el) { e.preventDefault(); open(el); } });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', () => show(cur - 1));
    $('[data-lb-next]', lb).addEventListener('click', () => show(cur + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-figure')) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(cur + 1);
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'Tab') { // giữ focus trong lightbox
        const f = $$('button:not([hidden])', lb).filter((b) => b.offsetParent !== null);
        const first = f[0]; const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    let sx = null;
    lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (sx === null) return; const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); sx = null;
    });
  }

  /* ---------- Google Map (tải khi bấm) ---------- */
  $$('[data-map]').forEach((box) => {
    const btn = $('[data-map-load]', box);
    btn?.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = box.dataset.src; f.title = 'Bản đồ vị trí dự án Gamuda Central Park';
      f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
      box.innerHTML = ''; box.appendChild(f);
      track('map_open');
    });
  });

  /* ---------- Modal ---------- */
  const modal = $('#lead-modal');
  let modalOpener = null;
  function openModal(source, opener) {
    if (!modal) return;
    modalOpener = opener || null;
    const form = $('form', modal);
    if (form) form.dataset.source = source || 'modal';
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('input[name="name"]', modal)?.focus(), 60);
    track('lead_form_open', { source });
  }
  function closeModal() {
    if (!modal) return;
    if (typeof modal.close === 'function') modal.close(); else modal.removeAttribute('open');
  }
  modal?.addEventListener('close', () => { document.body.style.overflow = ''; modalOpener?.focus(); });
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  $$('[data-close-modal]').forEach((b) => b.addEventListener('click', closeModal));
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open-lead]');
    if (b) { e.preventDefault(); openModal(b.dataset.openLead, b); }
  });

  /* ---------- Forms ---------- */
  const PHONE_RE = /^0(3|5|7|8|9)\d{8}$/;
  const normPhone = (v) => { let p = v.replace(/[^\d+]/g, ''); if (p.startsWith('+84')) p = '0' + p.slice(3); else if (p.startsWith('84') && p.length === 11) p = '0' + p.slice(2); return p; };

  function setErr(form, name, msg) {
    const input = form.elements[name]; if (!input) return;
    const field = input.closest('.field');
    const err = field?.querySelector('.field-error');
    field?.classList.toggle('has-error', Boolean(msg));
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg || '';
  }
  function validate(form) {
    const v = (n) => (form.elements[n]?.value || '').trim();
    const errs = {};
    if (v('name').length < 2) errs.name = 'Vui lòng nhập họ tên.';
    if (!PHONE_RE.test(normPhone(v('phone')))) errs.phone = 'Số điện thoại chưa đúng (10 số, ví dụ 0912 345 678).';
    if (form.elements.email && v('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) errs.email = 'Email chưa đúng định dạng.';
    if (form.elements.consent && !form.elements.consent.checked) errs.consent = 'Vui lòng đồng ý để chúng tôi liên hệ tư vấn.';
    ['name', 'phone', 'email', 'consent'].forEach((n) => setErr(form, n, errs[n]));
    return errs;
  }

  $$('[data-lead-form]').forEach((form) => {
    const tInput = form.elements.t;
    const stamp = () => { if (tInput && !tInput.value) tInput.value = String(Date.now()); };
    form.addEventListener('focusin', stamp, { once: true });
    setTimeout(stamp, 0);

    // Kiểm tra lại khi người dùng sửa trường đang lỗi
    form.addEventListener('input', (e) => {
      const f = e.target.closest('.field');
      if (f?.classList.contains('has-error')) validate(form);
    });
    form.addEventListener('blur', (e) => {
      if (e.target.name === 'phone' && e.target.value.trim()) {
        const ok = PHONE_RE.test(normPhone(e.target.value));
        setErr(form, 'phone', ok ? '' : 'Số điện thoại chưa đúng (10 số, ví dụ 0912 345 678).');
      }
    }, true);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('.form-status', form);
      status.textContent = ''; status.className = 'form-status';
      const errs = validate(form);
      if (Object.keys(errs).length) {
        form.elements[Object.keys(errs)[0]]?.focus();
        return;
      }
      const btn = $('button[type="submit"]', form);
      btn.classList.add('is-loading'); btn.disabled = true;

      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      payload.consent = Boolean(form.elements.consent?.checked);
      payload.source = form.dataset.source || 'website';
      payload.phone = normPhone(payload.phone || '');

      try {
        const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.ok) {
          track('generate_lead', { source: payload.source, need: payload.need || '' });
          const box = document.createElement('div');
          box.className = 'form-success';
          box.setAttribute('role', 'status');
          box.innerHTML = '<span class="center-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>' +
            '<h3>Đã nhận thông tin!</h3><p>Chuyên viên sẽ gọi lại cho bạn trong 15 phút (8:00 – 21:00). Cảm ơn bạn đã quan tâm Gamuda Central Park.</p>';
          form.replaceWith(box);
          box.tabIndex = -1; box.focus();
        } else {
          if (json.errors) Object.entries(json.errors).forEach(([k, m]) => setErr(form, k, m));
          status.textContent = json.error || 'Vui lòng kiểm tra lại thông tin.';
          status.classList.add('is-error');
        }
      } catch (_) {
        status.textContent = `Mất kết nối. Vui lòng thử lại hoặc gọi ${DATA.phone || 'hotline'}.`;
        status.classList.add('is-error');
      } finally {
        btn.classList.remove('is-loading'); btn.disabled = false;
      }
    });
  });

  /* ---------- Máy tính dòng tiền ---------- */
  const priceInput = $('[data-calc-price]');
  const priceRange = $('[data-calc-range]');
  const calcTable = $('[data-calc-table] tbody');
  const calcSummary = $('[data-calc-summary]');

  function money(vnd) {
    if (!isFinite(vnd) || vnd <= 0) return '—';
    if (vnd >= 1e9) return (vnd / 1e9).toLocaleString('vi-VN', { maximumFractionDigits: 2 }) + ' tỷ';
    return Math.round(vnd / 1e6).toLocaleString('vi-VN') + ' triệu';
  }
  function currentPlan() {
    const active = $('[data-tab-group="plan"].is-active');
    return DATA.plans.find((p) => p.id === active?.dataset.tab) || DATA.plans[0];
  }
  function renderCalc() {
    if (!calcTable || !priceInput) return;
    const plan = currentPlan(); if (!plan) return;
    const price = Math.max(0, parseFloat(String(priceInput.value).replace(',', '.')) || 0) * 1e9;
    const isLoan = plan.id === 'loan';
    const disc = isLoan ? 0 : parseFloat(plan.discount) / 100;
    const net = price * (1 - disc);

    calcTable.innerHTML = plan.steps.map((s, i) => {
      let detail = '';
      if (isLoan && (s.own || s.bank)) {
        const parts = [];
        if (s.own) parts.push(`Khách: ${money(net * s.own / 100)}`);
        if (s.bank) parts.push(`Ngân hàng: ${money(net * s.bank / 100)}`);
        detail = `<span class="muted">${parts.join(' · ')}</span>`;
      }
      return `<tr class="${s.label ? 'row-key' : ''}"><td>${i + 1}${s.label ? ' · ' + s.label : ''}</td><td>${s.date}</td><td>${s.pct}%</td><td>${money(net * s.pct / 100)}${detail}</td></tr>`;
    }).join('');

    const rows = [['Giá trị căn hộ', money(price)]];
    if (isLoan) {
      const own = plan.steps.reduce((a, s) => a + (s.own || 0), 0);
      rows.push([`Vốn tự có (${own}%)`, money(net * own / 100)]);
      rows.push([`Ngân hàng giải ngân (${100 - own}%)`, money(net * (100 - own) / 100)]);
      rows.push(['CĐT hỗ trợ lãi suất', '24 tháng', true]);
    } else {
      rows.push([`Chiết khấu (từ ${plan.discount})`, '−' + money(price * disc)]);
      rows.push(['Giá sau chiết khấu', money(net), true]);
    }
    calcSummary.innerHTML = rows.map(([k, v, strong]) => `<div class="${strong ? 'is-strong' : ''}"><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  }
  priceInput?.addEventListener('input', () => { if (priceRange) priceRange.value = priceInput.value; renderCalc(); });
  priceRange?.addEventListener('input', () => { priceInput.value = priceRange.value; renderCalc(); });
  renderCalc();
})();
