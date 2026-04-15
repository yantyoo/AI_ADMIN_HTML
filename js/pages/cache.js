import { CACHE_FILTER, CACHE_FORM, CACHE_LABEL, state, clone } from "../../src/app/data.js";
import { buildDetailFrame, buildSectionHeader, esc, statusBadge, clamp, now, norm, similarity, renderSoon } from "../../src/app/utils.js";

export function cachePage() {
  const list = cacheFiltered();
  const total = Math.max(1, Math.ceil(list.length / 10));
  const page = clamp(state.cache.page, 1, total);
  const start = (page - 1) * 10;
  const pageItems = list.slice(start, start + 10);
  const selected = pageItems.find((x) => x.id === state.cache.selectedId) || pageItems[0] || null;
  return `<div class="cache-qa-layout"><div class="cache-qa-stat-grid">${[
    { label: "전체", value: `${state.cache.items.length}건` },
    { label: "활성", value: `${state.cache.items.filter((i) => i.status === "ACTIVE").length}건` },
    { label: "비활성", value: `${state.cache.items.filter((i) => i.status !== "ACTIVE").length}건` },
    { label: "조회", value: `${state.cache.items.reduce((sum, i) => sum + (i.hitCount || 0), 0)}회` },
  ]
    .map(
      (i) =>
        `<div class="metric-card"><p class="metric-card__label">${esc(i.label)}</p><p class="metric-card__value">${esc(i.value)}</p></div>`,
    )
    .join("")}</div><div class="cache-qa-grid"><section class="cache-qa-list-card">${buildSectionHeader(
    "캐시 답변 목록",
    `<button type="button" class="primary-button" data-action="cache-open-create">답변 등록</button>`,
    "panel__header panel__header--compact",
  )}<div class="cache-qa-toolbar"><label class="field cache-qa-field"><span class="field__label">질문 검색</span><input class="field__input" value="${esc(
    state.cache.filterDraft,
  )}" placeholder="질문 일부 입력" data-field="cache-filterDraft"></label><label class="field cache-qa-field"><span class="field__label">상태</span><select class="field__input" data-field="cache-status">${CACHE_FILTER.map(
    (o) => `<option value="${o.value}"${state.cache.status === o.value ? " selected" : ""}>${o.label}</option>`,
  ).join("")}</select></label><div class="cache-qa-toolbar__actions"><button type="button" class="primary-button" data-action="cache-reset-filter">초기화</button></div></div><div class="cache-qa-list-scroll"><table class="content-table cache-qa-table"><thead><tr><th>질문</th><th>상태</th><th>조회수</th><th>최종 매칭</th></tr></thead><tbody>${pageItems.length === 0 ? `<tr><td colSpan="4" class="content-empty">조건에 맞는 답변이 없습니다.</td></tr>` : pageItems
    .map(
      (i) =>
        `<tr class="${selected && selected.id === i.id ? "is-selected" : ""}" data-cache-select="${i.id}"><td><div class="content-table__title">${esc(i.question)}</div><div class="content-table__sub">${esc(
          i.updatedBy || i.createdBy || "-",
        )}</div></td><td>${statusBadge(i.status, CACHE_LABEL)}</td><td>${(i.hitCount || 0).toLocaleString()}회</td><td>${esc(i.lastMatchedAt || "-")}</td></tr>`,
    )
    .join("")}</tbody></table></div>${pagination(page, total)}</section>${cacheDetail(selected)}</div>${state.cache.modalOpen ? cacheModal() : ""}${state.cache.deleteOpen ? cacheDeleteModal() : ""}</div>`;
}

export function cacheFiltered() {
  const k = state.cache.filterApplied.trim().toLowerCase();
  return clone(state.cache.items)
    .filter((i) => (!k || i.question.toLowerCase().includes(k)) && (state.cache.status === "ALL" || i.status === state.cache.status))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function cacheDetail(i) {
  if (!i) {
    return buildDetailFrame(
      "캐시 답변 상세",
      `<div class="content-empty content-empty--detail">선택한 답변이 없습니다.</div>`,
      "",
      "cache-qa-detail-card",
    );
  }
  return buildDetailFrame(
    "캐시 답변 상세",
    `<div class="cache-qa-detail-scroll"><div class="cache-qa-summary-grid"><div class="cache-qa-card cache-qa-card--question"><div class="cache-qa-card__header"><strong>질문</strong>${statusBadge(
      i.status,
      CACHE_LABEL,
    )}</div><p>${esc(i.question)}</p></div><div class="cache-qa-card cache-qa-card--answer"><div class="cache-qa-card__header"><strong>답변</strong><span>${(i.hitCount || 0).toLocaleString()}회 매칭</span></div><p>${esc(i.answer)}</p></div></div><dl class="cache-qa-meta"><div class="cache-qa-meta__item"><dt>등록자</dt><dd>${esc(
      i.createdBy || "-",
    )}</dd></div><div class="cache-qa-meta__item"><dt>수정자</dt><dd>${esc(i.updatedBy || "-")}</dd></div><div class="cache-qa-meta__item"><dt>등록일</dt><dd>${esc(i.createdAt)}</dd></div><div class="cache-qa-meta__item"><dt>수정일</dt><dd>${esc(i.updatedAt)}</dd></div><div class="cache-qa-meta__item"><dt>최종 매칭</dt><dd>${esc(i.lastMatchedAt || "-")}</dd></div><div class="cache-qa-meta__item"><dt>상태</dt><dd>${CACHE_LABEL[i.status]}</dd></div></dl><div class="cache-qa-detail-actions"><button type="button" class="secondary-button" data-action="cache-open-edit">수정</button><button type="button" class="secondary-button" data-action="cache-toggle">${i.status === "ACTIVE" ? "비활성화" : "활성화"}</button><button type="button" class="danger-button" data-action="cache-open-delete">삭제</button></div></div>`,
    statusBadge(i.status, CACHE_LABEL),
    "cache-qa-detail-card",
  );
}

export function cacheModal() {
  return `<section class="modal modal--xl" role="dialog" aria-modal="true" aria-label="${esc(
    state.cache.modalMode === "EDIT" ? "캐시 답변 수정" : "캐시 답변 등록",
  )}" data-modal="cache"><div class="modal__header"><div><h3>${esc(
    state.cache.modalMode === "EDIT" ? "캐시 답변 수정" : "캐시 답변 등록",
  )}</h3></div></div><div class="modal__body"><div class="cache-qa-form cache-qa-form--modal"><label class="field"><span class="field__label">질문 *</span><textarea class="field__input knowledge-textarea cache-qa-textarea" rows="3" maxLength="500" placeholder="캐시 답변용 질문을 입력해 주세요." data-field="cache-question">${esc(
    state.cache.form.question,
  )}</textarea><p class="cache-qa-form__counter">${state.cache.form.question.length}/500자</p></label><label class="field"><span class="field__label">답변 *</span><textarea class="field__input knowledge-textarea cache-qa-textarea" rows="6" maxLength="2000" placeholder="캐시 답변으로 반환할 답변을 입력해 주세요." data-field="cache-answer">${esc(
    state.cache.form.answer,
  )}</textarea><p class="cache-qa-form__counter">${state.cache.form.answer.length}/2000자</p></label><label class="field"><span class="field__label">상태</span><select class="field__input" data-field="cache-modalStatus"><option value="ACTIVE"${state.cache.form.status === "ACTIVE" ? " selected" : ""}>활성</option><option value="INACTIVE"${state.cache.form.status === "INACTIVE" ? " selected" : ""}>비활성</option></select></label>${state.cache.modalError ? `<p class="content-error">${esc(state.cache.modalError)}</p>` : ""}</div></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="cache-reset-modal">초기화</button><button type="button" class="primary-button" data-action="cache-save">${state.cache.modalMode === "EDIT" ? "수정 저장" : "등록"}</button></div></section>`;
}

export function cacheDeleteModal() {
  return `<section class="modal modal--sm modal--compact" role="dialog" aria-modal="true" aria-label="캐시 답변 삭제 확인" data-modal="cache-delete"><div class="modal__header modal__header--tight"><div><h3>캐시 답변 삭제 확인</h3></div></div><div class="modal__body"><p class="content-confirm">선택한 답변을 삭제하면 캐시 답변에서 즉시 제외됩니다.</p></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="cache-delete-cancel">취소</button><button type="button" class="danger-button" data-action="cache-delete-confirm">삭제</button></div></section>`;
}

export function listPanel(title, actions, toolbar, body, footer = "", cls = "") {
  return `<section class="list-panel${cls ? ` ${cls}` : ""}">${buildSectionHeader(
    title,
    actions,
    "list-panel__header",
  )}${toolbar ? `<div class="list-panel__toolbar">${toolbar}</div>` : ""}<div class="list-panel__body">${body}</div>${footer ? `<div class="list-panel__footer">${footer}</div>` : ""}</section>`;
}

export function pagination(page, total) {
  const items = pageNums(page, total);
  return `<nav class="pagination" aria-label="페이지네이션"><button type="button" class="pagination__button" data-action="cache-page" data-value="${page - 1}" ${page === 1 ? "disabled" : ""}>이전</button>${items
    .map((i) =>
      i === null
        ? `<span class="pagination__ellipsis" aria-hidden="true">...</span>`
        : `<button type="button" class="pagination__button${page === i ? " is-active" : ""}" data-action="cache-page" data-value="${i}" ${page === i ? 'aria-current="page"' : ""}>${i}</button>`,
    )
    .join("")}<button type="button" class="pagination__button" data-action="cache-page" data-value="${page + 1}" ${page === total ? "disabled" : ""}>다음</button></nav>`;
}

export function pageNums(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const arr = [1];
  if (page > 4) arr.push(null);
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  for (let i = start; i <= end; i += 1) arr.push(i);
  if (page < total - 3) arr.push(null);
  arr.push(total);
  return arr;
}

function selectedCache() {
  const list = cacheFiltered();
  return list.find((i) => i.id === state.cache.selectedId) || list[0] || null;
}

function toggleCache() {
  const i = selectedCache();
  if (!i) return;
  i.status = i.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  i.updatedAt = now();
  i.updatedBy = "관리자";
  state.cache.items = state.cache.items.map((x) => (x.id === i.id ? i : x)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  renderSoon();
}

function saveCache() {
  if (!String(state.cache.form.question).trim() || !String(state.cache.form.answer).trim()) {
    state.cache.modalError = "질문과 답변을 모두 입력해 주세요.";
    renderSoon();
    return;
  }
  const nq = norm(state.cache.form.question.trim());
  const dup = state.cache.items.find(
    (i) =>
      (!state.cache.modalTarget || i.id !== state.cache.modalTarget) &&
      Math.max(similarity(i.question, state.cache.form.question.trim()), norm(i.question).includes(nq) ? 0.92 : 0, nq.includes(norm(i.question)) ? 0.92 : 0) >= 0.85,
  );
  if (dup) {
    state.cache.modalError = "유사한 질문이 이미 등록되어 있습니다.";
    renderSoon();
    return;
  }
  const stamp = now();
  if (state.cache.modalMode === "CREATE") {
    const item = {
      id: `cache-${Date.now()}`,
      question: state.cache.form.question.trim(),
      answer: state.cache.form.answer.trim(),
      status: state.cache.form.status,
      createdAt: stamp,
      updatedAt: stamp,
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 0,
      lastMatchedAt: null,
    };
    state.cache.items = [item, ...state.cache.items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    state.cache.selectedId = item.id;
  } else {
    const idx = state.cache.items.findIndex((i) => i.id === state.cache.modalTarget);
    if (idx < 0) {
      state.cache.modalError = "수정 대상이 존재하지 않습니다.";
      renderSoon();
      return;
    }
    const old = state.cache.items[idx];
    const item = {
      ...old,
      question: state.cache.form.question.trim(),
      answer: state.cache.form.answer.trim(),
      status: state.cache.form.status,
      updatedAt: stamp,
      updatedBy: "관리자",
    };
    state.cache.items = [...state.cache.items.slice(0, idx), item, ...state.cache.items.slice(idx + 1)].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
    state.cache.selectedId = item.id;
  }
  state.cache.modalOpen = false;
  state.cache.modalError = "";
  state.cache.form = clone(CACHE_FORM);
  renderSoon();
}

function deleteCache() {
  const cur = selectedCache();
  if (!cur) return;
  state.cache.items = state.cache.items.filter((i) => i.id !== cur.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  state.cache.selectedId = state.cache.items[0]?.id || null;
  state.cache.deleteOpen = false;
  renderSoon();
}
