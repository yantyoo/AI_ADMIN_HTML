import { ACCOUNT_ACTION, ACCOUNT_ROLE, ACCOUNT_STATUS, CANDIDATES, Ls, state } from "../../src/app/data.js";
import { buildDetailFrame, buildSectionHeader, esc, statusBadge } from "../../src/app/utils.js";

export function accountsPage() {
  const stats = {
    total: state.accounts.items.filter((i) => i.status === "ACTIVE").length,
    masters: state.accounts.items.filter((i) => i.role === "MASTER" && i.status === "ACTIVE").length,
    operators: state.accounts.items.filter((i) => i.role === "OPERATOR" && i.status === "ACTIVE").length,
    inactive: state.accounts.items.filter((i) => i.status !== "ACTIVE").length,
  };
  const selected = state.accounts.items.find((i) => i.id === state.accounts.selectedId) || null;
  return `<div class="accounts-layout"><div class="accounts-stat-grid">${[
    { label: "전체 활성", value: `${stats.total}명` },
    { label: "MASTER", value: `${stats.masters}명` },
    { label: "OPERATOR", value: `${stats.operators}명` },
    { label: "비활성·잠금", value: `${stats.inactive}명` },
  ]
    .map((i) => `<div class="metric-card"><p class="metric-card__label">${esc(i.label)}</p><p class="metric-card__value">${esc(i.value)}</p></div>`)
    .join("")}</div><div class="accounts-grid"><section class="accounts-list-card">${buildSectionHeader(
    "계정 목록",
    `<button type="button" class="primary-button" data-action="account-open-add">계정 추가</button>`,
    "panel__header panel__header--compact",
  )}<div class="accounts-list-scroll"><table class="content-table knowledge-history-table"><thead><tr><th>이름</th><th>아이디</th><th>권한</th><th>상태</th><th>최종 로그인</th></tr></thead><tbody>${state.accounts.items
    .map(
      (i) =>
        `<tr class="${selected && selected.id === i.id ? "is-selected" : ""}" data-account-select="${i.id}"><td><div class="content-table__title">${esc(i.name)}</div>${i.id === Ls.id ? '<div class="content-table__sub">본인</div>' : ""}</td><td>${esc(i.id)}</td><td><span class="status-badge ${i.role === "MASTER" ? "status-badge--active" : "status-badge--processing"}">${ACCOUNT_ROLE[i.role]}</span></td><td>${statusBadge(i.status, ACCOUNT_STATUS)}</td><td>${esc(i.lastLoginAt || "-")}</td></tr>`,
    )
    .join("")}</tbody></table></div></section>${accountDetail(selected)}</div>${state.accounts.actionModal ? accountActionModal() : ""}${state.accounts.addOpen ? accountAddModal() : ""}</div>`;
}

export function accountDetail(i) {
  if (!i) {
    return buildDetailFrame(
      "계정 상세",
      `<div class="content-empty content-empty--detail">관리자를 선택하면 상세 정보가 표시됩니다.</div>`,
      "",
      "accounts-detail-card",
    );
  }
  const self = i.id === Ls.id;
  return buildDetailFrame(
    "계정 상세",
    `<div class="accounts-detail-scroll"><div class="detail-frame__header accounts-detail-identity-header"><div class="accounts-detail-identity"><span class="accounts-detail-identity__name">${esc(i.name)}</span><div class="accounts-detail-identity__meta"><span class="accounts-detail-identity__id">${esc(i.id)}</span><span class="accounts-detail-identity__role">${ACCOUNT_ROLE[i.role]}</span></div></div></div><dl class="content-detail__list"><div><dt>등록일</dt><dd>${esc(i.registeredAt)}</dd></div><div><dt>최종 로그인</dt><dd>${esc(i.lastLoginAt || "-")}</dd></div></dl>${self ? '<p class="accounts-self-notice">본인 계정은 권한 변경 및 비활성화가 제한됩니다.</p>' : `<div class="accounts-action-row">${i.status === "INACTIVE" ? '<button type="button" class="primary-button" data-action="account-open-status" data-type="ACTIVATE">권한 복구</button>' : ""}${i.status === "ACTIVE" && i.role === "OPERATOR" ? '<button type="button" class="danger-button" data-action="account-open-status" data-type="DEACTIVATE">권한 비활성화</button>' : ""}${i.status === "LOCKED" ? '<button type="button" class="primary-button" data-action="account-open-status" data-type="UNLOCK">잠금 해제</button>' : ""}</div>`}<div class="accounts-history"><h4>로그인 이력</h4>${i.loginHistory.length === 0 ? '<p class="accounts-history-empty">로그인 이력이 없습니다.</p>' : `<ul class="accounts-history-list">${i.loginHistory
      .map(
        (h) =>
          `<li><strong>${esc(h.occurredAt)}</strong>${h.success ? '<span class="accounts-login-success">성공</span>' : '<span class="accounts-login-fail">실패</span>'}<span class="accounts-history-ip">${esc(h.ip)}</span></li>`,
      )
      .join("")}</ul>`}</div><div class="accounts-history"><h4>잠금·해제 이력</h4>${i.lockHistory.length === 0 ? '<p class="accounts-history-empty">잠금·해제 이력이 없습니다.</p>' : `<ul class="accounts-history-list">${i.lockHistory
      .map(
        (h) =>
          `<li><strong>${esc(h.occurredAt)}</strong><span class="${h.type === "LOCKED" ? "accounts-history-status--lock" : "accounts-history-status--unlock"}">${h.type === "LOCKED" ? "잠금" : "해제"}</span><p class="accounts-history-sub">${esc(h.reason)} · ${esc(h.actor)}</p></li>`,
      )
      .join("")}</ul>`}</div></div>`,
    `<span class="status-badge status-badge--${i.status.toLowerCase()}">${ACCOUNT_STATUS[i.status]}</span>`,
    "accounts-detail-card",
  );
}

export function accountActionModal() {
  const m = state.accounts.actionModal;
  return `<section class="modal modal--sm" role="dialog" aria-modal="true" aria-label="${esc(ACCOUNT_ACTION[m.type])}" data-modal="account-action"><div class="modal__header modal__header--tight"><div><h3>${esc(
    ACCOUNT_ACTION[m.type],
  )}</h3></div></div><div class="modal__body"><label class="field"><span class="field__label">사유 입력 *</span><textarea class="field__input knowledge-textarea" rows="3" placeholder="사유를 입력해 주세요." data-field="account-reason">${esc(
    m.reason || "",
  )}</textarea></label></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="account-action-cancel">취소</button><button type="button" class="${m.type === "DEACTIVATE" ? "danger-button" : "primary-button"}" data-action="account-action-confirm" ${!String(
    m.reason || "",
  ).trim() ? "disabled" : ""}>확인</button></div></section>`;
}

export function accountAddModal() {
  const cand = filteredCandidates();
  const selected = CANDIDATES.find((c) => c.id === state.accounts.selectedCandidateId) || null;
  return `<section class="modal modal--lg" role="dialog" aria-modal="true" aria-label="계정 추가" data-modal="account-add"><div class="modal__header"><div><h3>계정 추가</h3></div></div><div class="modal__body"><label class="field"><span class="field__label">사용자 검색</span><input class="field__input" value="${esc(
    state.accounts.addSearch,
  )}" placeholder="검색어 입력" data-field="account-search"></label><ul class="user-candidate-list">${cand.length === 0 ? '<li class="user-candidate-empty">검색 결과가 없습니다.</li>' : cand
    .map(
      (c) =>
        `<li><button type="button" class="user-candidate-item${selected && selected.id === c.id ? " is-selected" : ""}" data-candidate="${c.id}"><span>${esc(c.name)} (${esc(c.id)})</span><span class="user-candidate-code">${esc(c.complexCode)}</span></button></li>`,
    )
    .join("")}</ul><label class="field"><span class="field__label">추가 사유 * (최대 200자)</span><textarea class="field__input knowledge-textarea" rows="2" maxLength="200" placeholder="추가 사유를 입력해 주세요." data-field="account-add-reason">${esc(
    state.accounts.addReason,
  )}</textarea></label></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="account-add-cancel">취소</button><button type="button" class="primary-button" data-action="account-add-confirm" ${!selected || !String(
    state.accounts.addReason,
  ).trim() ? "disabled" : ""}>확인</button></div></section>`;
}

export function filteredCandidates() {
  const k = state.accounts.addSearch.trim().toLowerCase();
  if (!k) return CANDIDATES;
  return CANDIDATES.filter((c) => c.name.toLowerCase().includes(k) || c.id.toLowerCase().includes(k) || c.complexCode.toLowerCase().includes(k));
}
