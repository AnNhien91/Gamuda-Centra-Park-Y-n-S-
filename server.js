require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const { site, agent, tracking, project } = require('./config/site');
const { validateLead, deliverLead, channelStatus, NEEDS, PURPOSES } = require('./src/leads');
const { icon } = require('./src/icons');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1); // Hostinger chạy sau reverse proxy
app.disable('x-powered-by');

// ---------- Bảo mật & hiệu năng ----------
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://connect.facebook.net',
        ],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
        'img-src': ["'self'", 'data:', 'https:'],
        'connect-src': [
          "'self'",
          'https://www.google-analytics.com',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://www.googletagmanager.com',
          'https://www.facebook.com',
        ],
        'frame-src': ["'self'", 'https://www.google.com', 'https://maps.google.com', 'https://www.googletagmanager.com'],
        'upgrade-insecure-requests': isProd ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);
app.use(compression());
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));

app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: isProd ? '30d' : 0,
    setHeaders(res, filePath) {
      if (/\.(css|js)$/.test(filePath)) res.setHeader('Cache-Control', isProd ? 'public, max-age=86400' : 'no-cache');
    },
  })
);

// Biến dùng chung cho mọi view
const assetVersion = Date.now().toString(36);
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.agent = agent;
  res.locals.tracking = tracking;
  res.locals.project = project;
  res.locals.v = assetVersion;
  res.locals.icon = icon;
  res.locals.needs = NEEDS;
  res.locals.purposes = PURPOSES;
  res.locals.img = (name, w) => `/images/${name}${w ? '-' + w : ''}.webp`;
  res.locals.path = req.path;
  res.locals.year = new Date().getFullYear();
  next();
});

// ---------- Trang ----------
app.get('/', (req, res) => res.render('index'));
app.get('/chinh-sach-bao-mat', (req, res) => res.render('privacy'));
app.get('/cam-on', (req, res) => res.render('thanks'));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${site.url}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ['/', '/chinh-sach-bao-mat']
    .map((u) => `<url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join('');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
});

app.get('/healthz', (req, res) => res.json({ ok: true, channels: channelStatus() }));

// ---------- API nhận lead ----------
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'Bạn gửi quá nhiều lần. Vui lòng thử lại sau ít phút hoặc gọi hotline.' },
});

app.post('/api/lead', leadLimiter, async (req, res) => {
  const result = validateLead(req.body || {});
  if (result.spam) return res.json({ ok: true }); // lặng lẽ bỏ qua bot
  if (!result.ok) return res.status(422).json({ ok: false, errors: result.errors });

  const lead = {
    ...result.data,
    ip: req.ip,
    userAgent: (req.get('user-agent') || '').slice(0, 200),
    page: (req.get('referer') || '').slice(0, 300),
    createdAt: new Date().toISOString(),
  };

  try {
    const delivery = await deliverLead(lead);
    if (!delivery.ok) {
      return res.status(502).json({
        ok: false,
        error: `Hệ thống đang bận. Vui lòng gọi ${agent.phoneDisplay} để được tư vấn ngay.`,
      });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('[lead] unexpected error', err);
    return res.status(500).json({ ok: false, error: `Có lỗi xảy ra. Vui lòng gọi ${agent.phoneDisplay}.` });
  }
});

// ---------- 404 & lỗi ----------
app.use((req, res) => res.status(404).render('404'));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('404', { error: true });
});

app.listen(PORT, () => {
  console.log(`Gamuda Central Park website chạy tại http://localhost:${PORT}`);
  console.log('Kênh nhận lead:', channelStatus());
});
