import { NAV, state } from "../../src/app/data.js";
import { allowedRoutes, cleanOtp, esc, loading, routeMeta, storedProfile } from "../../src/app/utils.js";
import { sidebar } from "./sidebar.js";
import { header } from "./header.js";
import { buildToastStack } from "./toast.js";
import { dashboard } from "../../js/pages/dashboard.js";
import { contentDeleteModal, contentModal, contentPage } from "../../js/pages/content.js";
import { cacheDeleteModal, cacheModal, cachePage } from "../../js/pages/cache.js";
import { knowledgePage } from "../../js/pages/knowledge.js";
import { feedbackPage } from "../../js/pages/feedback.js";
import { accountActionModal, accountAddModal, accountsPage } from "../../js/pages/accounts.js";

export function shell() {
  const user = storedProfile();
  const nav = allowedRoutes().map((href) => NAV.find((item) => item.href === href)).filter(Boolean);
  return `<div class="admin-shell">${sidebar(user, nav)}<div class="admin-shell__main">${header(
    routeMeta().title,
    routeMeta().description,
  )}<main class="admin-shell__content">${buildToastStack()}${contentView()}</main></div></div>${shellModals()}`;
}

export function auth() {
  return `<main class="auth-shell auth-shell--standalone"><section class="auth-card auth-standalone"><div class="auth-card__intro auth-standalone__intro"><span class="auth-card__badge">Xp도우미</span><h1 class="auth-card__title">Xp도우미 관리자</h1><p class="auth-card__eyebrow">관리자 전용 시스템</p><p class="auth-card__description">본 시스템은 내부 관리자 전용입니다.<br>무단 접근 및 정보 열람 시 관련 법령에 따라 책임이 발생할 수 있습니다.</p></div><form class="auth-form" data-form="login"><div class="auth-form__header"><h2 class="auth-form__title">관리자 로그인</h2><p class="auth-form__caption">승인된 계정만 접속 가능합니다.</p></div><div class="auth-form__fields"><label class="field auth-field"><span class="field__label">아이디</span><input class="field__input auth-input" maxLength="10" value="${esc(state.auth.form.userId)}" placeholder="예: admin01" data-field="userId"></label><label class="field auth-field"><span class="field__label">비밀번호</span><input type="password" class="field__input auth-input" maxLength="12" value="${esc(state.auth.form.password)}" placeholder="비밀번호 입력" data-field="password"></label><label class="auth-remember"><input type="checkbox" ${state.auth.remember ? "checked" : ""} data-field="remember"><span>아이디 저장</span></label></div><div class="auth-form__actions"><button type="submit" class="primary-button auth-submit" ${state.auth.processing ? "disabled" : ""}>${state.auth.processing ? "처리 중..." : "로그인"}</button></div><div class="auth-form__feedback" aria-live="polite">${state.auth.error ? `<p class="auth-error">${esc(state.auth.error)}</p>` : ""}${!state.auth.error && state.auth.helper ? `<p class="auth-helper">${esc(state.auth.helper)}</p>` : ""}</div></form></section></main>${authModals()}`;
}

export function authModals() {
  let html = "";
  if (state.auth.otpOpen) {
    html += `<section class="modal auth-otp-modal" role="dialog" aria-modal="true" aria-label="OTP 인증" data-modal="otp"><div class="modal__header auth-otp-modal__header"><div><h3>OTP 인증</h3><p class="auth-otp-modal__caption">${esc(
      state.auth.helper || "OTP를 입력하면 로그인 절차를 완료합니다.",
    )}</p></div></div><form class="auth-otp-modal__body" data-form="otp"><label class="field auth-otp-field"><span class="field__label">OTP</span><input class="field__input auth-input auth-input--otp" value="${esc(
      state.auth.form.otp,
    )}" maxLength="6" placeholder="6자리 OTP 입력" data-field="otp" ${state.auth.processing ? "disabled" : ""}></label><div class="auth-form__feedback" aria-live="polite">${state.auth.error ? `<p class="auth-error">${esc(state.auth.error)}</p>` : ""}${!state.auth.error && state.auth.helper ? `<p class="auth-helper">${esc(state.auth.helper)}</p>` : ""}</div><div class="auth-form__actions auth-otp-modal__actions"><button type="button" class="secondary-button auth-cancel" data-action="otp-close">취소</button><button type="submit" class="primary-button auth-submit" ${state.auth.processing || cleanOtp(state.auth.form.otp).length !== 6 ? "disabled" : ""}>${state.auth.processing ? "처리 중..." : "인증 완료"}</button></div></form></section>`;
  }
  if (state.auth.notice) {
    html += `<section class="modal modal--sm modal--compact auth-notice-modal" role="dialog" aria-modal="true" aria-label="${esc(
      state.auth.notice.title,
    )}" data-modal="notice"><div class="modal__header modal__header--tight auth-notice-modal__header"><div><h3>${esc(state.auth.notice.title)}</h3></div></div><div class="modal__body auth-notice-modal__body"><p class="auth-notice-modal__message">${esc(
      state.auth.notice.message,
    )}</p></div><div class="modal__footer modal__footer--split"><button type="button" class="primary-button" data-action="notice-ok">확인</button></div></section>`;
  }
  return html;
}

export function shellModals() {
  let html = "";
  if (state.logoutOpen) {
    html += `<section class="modal modal--sm modal--compact" role="dialog" aria-modal="true" aria-label="로그아웃 확인" data-modal="logout"><div class="modal__header modal__header--tight"><div><h3>로그아웃</h3></div></div><div class="modal__body"><p class="logout-confirm__text">로그아웃 하시겠습니까?</p></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="logout-cancel">취소</button><button type="button" class="danger-button" data-action="logout-confirm">확인</button></div></section>`;
  }
  if (state.content.modalOpen) html += contentModal();
  if (state.content.deleteOpen) html += contentDeleteModal();
  if (state.cache.modalOpen) html += cacheModal();
  if (state.cache.deleteOpen) html += cacheDeleteModal();
  if (state.accounts.actionModal) html += accountActionModal();
  if (state.accounts.addOpen) html += accountAddModal();
  return html;
}

export function contentView() {
  if (!state.authenticated) return "";
  if (!allowedRoutes().includes(state.path)) state.path = allowedRoutes()[0] || "/dashboard";
  if (state.path === "/dashboard") return dashboard();
  if (state.path === "/content") return contentPage();
  if (state.path === "/cache-qa") return cachePage();
  if (state.path === "/knowledge") return state.shell.knowledge ? knowledgePage() : loading("지식 기반 조회");
  if (state.path === "/feedback") return state.shell.feedbacks ? feedbackPage() : loading("피드백 관리");
  if (state.path === "/accounts") return state.shell.accounts ? accountsPage() : loading("계정/권한 관리");
  return dashboard();
}
