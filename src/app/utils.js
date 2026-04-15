import {
  ACCOUNTS,
  AUTH_STATUS,
  CANDIDATES,
  CACHE_FORM,
  clone,
  CONTENT_FORM,
  createState,
  FEEDBACK,
  KNOWLEDGE_DOCS,
  Ls,
  META,
  NAV,
  OTP,
  OTP_MAX,
  OTP_PENDING,
  P,
  R,
  S,
  state,
  TOAST_MS,
} from "./data.js";

let toastSeq = 0;
const timers = new Map();
const focusSel =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const now = () => new Date().toLocaleString("sv-SE").slice(0, 16).replace("T", " ");
export const cleanId = (v) => String(v ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 10);
export const cleanPwd = (v) => String(v ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
export const cleanOtp = (v) => String(v ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 6);
export const norm = (v) => String(v ?? "").toLowerCase().trim().replace(/\s+/g, "").replace(/[^0-9a-z가-힣]/gi, "");
export const cmpDesc = (a, b) => String(b).localeCompare(String(a));
export const ratio = (v) => (Number.isInteger(v) ? `${v}%` : `${v.toFixed(1)}%`);
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export const similarity = (a, b) => {
  a = norm(a);
  b = norm(b);
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  if (a === b) return 1;
  const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }
  return 1 - matrix[a.length][b.length] / Math.max(a.length, b.length);
};

export const toast = (message, tone = "success", ms = TOAST_MS) => {
  const id = `t-${Date.now()}-${++toastSeq}`;
  state.toasts.push({ id, message, tone });
  renderSoon();
  const tm = setTimeout(() => {
    timers.delete(id);
    state.toasts = state.toasts.filter((x) => x.id !== id);
    renderSoon();
  }, ms);
  timers.set(id, tm);
};

export const clearToasts = () => {
  for (const tm of timers.values()) clearTimeout(tm);
  timers.clear();
  state.toasts = [];
};

export const storedProfile = () => {
  try {
    const s = sessionStorage.getItem(S.profile) || localStorage.getItem(S.profile);
    if (s) {
      const p = JSON.parse(s);
      if (p?.id && p?.name && p?.role && p?.department) return p;
    }
  } catch {
    // ignore
  }
  return Ls;
};

export const saveProfile = (p, remember) => {
  const raw = JSON.stringify(p);
  sessionStorage.setItem(S.profile, raw);
  if (remember) localStorage.setItem(S.profile, raw);
  else localStorage.removeItem(S.profile);
};

export const clearStorage = () => {
  Object.values(S).forEach((k) => {
    sessionStorage.removeItem(k);
    localStorage.removeItem(k);
  });
  localStorage.removeItem(S.auth);
};

export const allowedRoutes = () => {
  const role = (storedProfile() || Ls).role;
  return NAV.filter((n) => n.roles.includes(role)).map((n) => n.href);
};

export const routeMeta = () => META[state.path] || META["/dashboard"];

export const showAuthNotice = (notice) => {
  state.auth.notice = notice;
  renderSoon();
};

export const closeAuthNotice = () => {
  state.auth.notice = null;
  renderSoon();
};

export const openOtp = () => {
  state.auth.processing = false;
  state.auth.otpOpen = true;
  state.auth.form.otp = "";
  state.auth.error = "";
  state.auth.helper = "";
  state.auth.otpLocked = false;
  state.auth.otpFailures = 0;
  sessionStorage.setItem(S.stage, OTP_PENDING);
  sessionStorage.setItem(S.fail, "0");
  sessionStorage.removeItem(S.lock);
  renderSoon();
};

export const closeOtp = () => {
  state.auth.otpOpen = false;
  state.auth.form.otp = "";
  state.auth.error = "";
  state.auth.helper = "";
  renderSoon();
};

export const initFromStorage = () => {
  state.auth.form.userId = cleanId(sessionStorage.getItem(S.userId) || localStorage.getItem(S.userId) || "");
  state.auth.otpLocked = sessionStorage.getItem(S.lock) === "true";
  state.auth.otpFailures = Number(sessionStorage.getItem(S.fail) || "0") || 0;
  state.auth.otpOpen = false;
  state.auth.processing = false;
  state.auth.helper = "";
  state.auth.error = "";
  state.auth.notice = null;
  state.authenticated = sessionStorage.getItem(S.auth) === AUTH_STATUS;
  if (!state.authenticated) {
    sessionStorage.removeItem(S.stage);
    sessionStorage.removeItem(S.fail);
    sessionStorage.removeItem(S.lock);
  }
  if (state.authenticated) ensureShellData();
};

export const ensureShellData = () => {
  if (state.shellLoaded) return;
  state.shellLoaded = true;
  Promise.all([
    Promise.resolve(FEEDBACK.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))),
    Promise.resolve(clone(ACCOUNTS)),
    Promise.resolve(clone(KNOWLEDGE_DOCS)),
  ]).then(([feedbacks, accounts, knowledge]) => {
    state.shell.feedbacks = feedbacks;
    state.shell.accounts = accounts;
    state.shell.knowledge = knowledge;
    renderSoon();
  });
};

export const normalize = (v) =>
  String(v || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^0-9a-z가-힣]/gi, "");

export const buildSectionHeader = (title, actions = "", cls = "", tag = "h2") =>
  `<div class="section-header${cls ? ` ${cls}` : ""}"><div class="section-header__copy"><${tag} class="section-header__title">${
    typeof title === "string" ? esc(title) : title
  }</${tag}></div>${actions ? `<div class="section-header__actions">${actions}</div>` : ""}</div>`;

export const buildDetailFrame = (title, body, actions = "", cls = "", bodyCls = "", tag = "h3") =>
  `<section class="detail-frame${cls ? ` ${cls}` : ""}">${buildSectionHeader(title, actions, "detail-frame__header", tag)}<div class="detail-frame__body${
    bodyCls ? ` ${bodyCls}` : ""
  }">${body}</div></section>`;

export const statusBadge = (status, map) =>
  `<span class="status-badge status-badge--${String(status).toLowerCase()}">${esc(map[status] || status)}</span>`;

export const buildToastStack = () =>
  state.toasts.length
    ? `<div class="toast-stack" aria-live="polite" aria-atomic="true">${state.toasts
        .map((t) => `<div class="toast toast--${t.tone}" role="status">${esc(t.message)}</div>`)
        .join("")}</div>`
    : "";

export const loading = (label) => `<section class="panel panel--main"><div class="content-empty content-empty--detail">${esc(label)} 데이터를 불러오는 중입니다.</div></section>`;

export const focusModal = () => {
  const modal = P.querySelector("[data-modal]") || R.querySelector("[data-modal]");
  if (!modal) {
    if (state.restoreFocus) state.restoreFocus.focus({ preventScroll: true });
    state.restoreFocus = null;
    return;
  }
  const f = modal.querySelector(focusSel);
  if (f instanceof HTMLElement) f.focus({ preventScroll: true });
};

export const rememberFocus = () => {
  state.restoreFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
};

export const renderSoon = () => {
  if (renderSoon.locked) return;
  renderSoon.locked = true;
  queueMicrotask(() => {
    renderSoon.locked = false;
    render();
  });
};

export const render = () => {
  // set in controller after imports resolve
};

export const setRender = (fn) => {
  renderSoon.renderFn = fn;
  renderSoon.locked = false;
};

export const invokeRender = () => {
  if (typeof renderSoon.renderFn === "function") renderSoon.renderFn();
};

export const resetAppState = () => {
  Object.assign(state, createState());
  state.path = "/dashboard";
  state.auth = createState().auth;
  state.dash = createState().dash;
  state.content = createState().content;
  state.cache = createState().cache;
  state.knowledge = createState().knowledge;
  state.feedback = createState().feedback;
  state.accounts = createState().accounts;
};
