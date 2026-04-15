import { CONTENT_LABEL, CONTENT_TYPE, state } from "../../src/app/data.js";
import { buildDetailFrame, buildSectionHeader, esc, statusBadge } from "../../src/app/utils.js";

export function contentPage() {
  const list = contentFiltered();
  const selected = list.find((x) => x.id === state.content.selectedId) || list[0] || null;
  return `<div class="page-content page-content--fill content-page"><div class="content-grid"><section class="content-table-card">${buildSectionHeader(
    "문서 목록",
    `<button type="button" class="primary-button" data-action="content-open-create">문서 업로드</button>`,
    "content-table-card__header content-table-card__header--list",
  )}<form class="content-toolbar content-toolbar--content content-table-card__toolbar" data-form="content-filter"><label class="field content-toolbar__field content-toolbar__field--select"><span class="field__label">문서 유형</span><select class="field__input" data-field="content-type">${CONTENT_TYPE.map(
    (o) => `<option value="${o.value}"${state.content.type === o.value ? " selected" : ""}>${o.label}</option>`,
  ).join("")}</select></label><label class="field content-toolbar__field content-toolbar__field--search"><span class="field__label">문서명 검색</span><input class="field__input" type="search" value="${esc(
    state.content.filterDraft,
  )}" placeholder="2자 이상 입력" data-field="content-filterDraft"></label><div class="content-toolbar__actions"><button type="submit" class="primary-button content-toolbar__button">검색</button><button type="button" class="secondary-button content-toolbar__button" data-action="content-reset-filter">초기화</button></div></form><div class="content-table-scroll"><table class="content-table"><thead><tr><th>문서명</th><th>유형</th><th>등록자</th><th>등록일</th><th>수정일</th><th>상태</th></tr></thead><tbody>${list.length === 0 ? `<tr><td colSpan="6" class="content-empty">조건에 맞는 문서가 없습니다.</td></tr>` : list
    .map(
      (d) =>
        `<tr class="${selected && d.id === selected.id ? "is-selected" : ""}" data-content-select="${d.id}"><td><div class="content-table__title">${esc(
          d.name,
        )}</div><div class="content-table__sub">${esc(d.path)}</div></td><td>${d.type === "MANUAL" ? "매뉴얼" : "FAQ"}</td><td>${esc(
          d.author,
        )}</td><td>${esc(d.createdAt)}</td><td>${esc(d.updatedAt)}</td><td>${statusBadge(d.status, CONTENT_LABEL)}</td></tr>`,
    )
    .join("")}</tbody></table></div></section>${contentDetail(selected)}</div>${state.content.modalOpen ? contentModal() : ""}${state.content.deleteOpen ? contentDeleteModal() : ""}</div>`;
}

export function contentFiltered() {
  const k = state.content.filterApplied.trim().toLowerCase();
  return state.content.docs
    .filter(
      (d) =>
        (!k || d.name.toLowerCase().includes(k) || d.path.toLowerCase().includes(k)) &&
        (state.content.type === "ALL" || d.type === state.content.type),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.createdAt.localeCompare(a.createdAt));
}

export function contentDetail(d) {
  if (!d) {
    return buildDetailFrame(
      "문서 상세",
      `<div class="content-empty content-empty--detail">선택한 문서가 없습니다.</div>`,
      "",
      "content-detail-card",
    );
  }
  const actor = d.history[0]?.actor || d.author;
  return buildDetailFrame(
    "문서 상세",
    `<div class="content-detail-scroll"><div class="content-detail__name-card"><div class="content-detail__identity"><h3 class="content-detail__title">${esc(
      d.name,
    )}</h3><span class="content-detail__type-pill">${d.type === "MANUAL" ? "매뉴얼" : "FAQ"}</span></div></div><dl class="content-detail__list"><div><dt>저장 경로</dt><dd>${esc(
      d.path,
    )}</dd></div><div><dt>파일 크기</dt><dd>${esc(d.fileSize)}</dd></div><div><dt>등록자</dt><dd>${esc(d.author)}</dd></div><div><dt>등록일</dt><dd>${esc(
      d.createdAt,
    )}</dd></div><div><dt>수정자</dt><dd>${esc(actor)}</dd></div><div><dt>수정일</dt><dd>${esc(d.updatedAt)}</dd></div></dl><div class="content-detail-actions"><button type="button" class="secondary-button" data-action="content-download">다운로드</button><button type="button" class="secondary-button" data-action="content-open-edit">수정</button><button type="button" class="danger-button" data-action="content-open-delete">삭제</button></div><section class="content-history"><h4>변경 이력</h4><ul>${d.history
      .map(
        (h) =>
          `<li><strong>${esc(h.version)}</strong><span>${esc(h.actor)} · ${esc(h.action)} · ${esc(h.occurredAt)}</span><p>${esc(h.reason)}</p></li>`,
      )
      .join("")}</ul></section></div>`,
    d ? `<span class="status-badge status-badge--${d.status.toLowerCase()}">${CONTENT_LABEL[d.status]}</span>` : "",
    "content-detail-card",
  );
}

export function contentModal() {
  return `<section class="modal modal--lg" role="dialog" aria-modal="true" aria-label="${esc(
    state.content.modalMode === "EDIT" ? "문서 수정 업로드" : "문서 업로드",
  )}" data-modal="content"><div class="modal__header"><div><h3>${esc(
    state.content.modalMode === "EDIT" ? "문서 수정 업로드" : "문서 업로드",
  )}</h3></div></div><div class="modal__body"><label class="field"><span class="field__label">파일 선택 *</span><input class="field__input" type="file" accept=".pdf,.docx,.txt,.md" data-field="content-file"><span class="content-file-name">${state.content.selectedFileLabel ? `선택한 파일: ${esc(
    state.content.selectedFileLabel,
  )}` : "파일을 선택해 주세요."}</span></label><label class="field"><span class="field__label">저장 경로</span><input class="field__input" value="${esc(
    state.content.form.path,
  )}" placeholder="/rag/manual/chatbot-guide" data-field="content-path"></label><label class="field"><span class="field__label">문서 유형</span><select class="field__input" data-field="content-modalType"><option value="MANUAL"${state.content.form.type === "MANUAL" ? " selected" : ""}>매뉴얼</option><option value="FAQ"${state.content.form.type === "FAQ" ? " selected" : ""}>FAQ</option></select></label>${state.content.modalError ? `<p class="content-error">${esc(state.content.modalError)}</p>` : ""}</div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="content-close">취소</button><button type="button" class="primary-button" data-action="content-save">${state.content.modalMode === "EDIT" ? "수정 저장" : "업로드"}</button></div></section>`;
}

export function contentDeleteModal() {
  return `<section class="modal modal--sm modal--compact" role="dialog" aria-modal="true" aria-label="문서 삭제 확인" data-modal="content-delete"><div class="modal__header modal__header--tight"><div><h3>문서 삭제 확인</h3></div></div><div class="modal__body"><p class="content-confirm">문서를 삭제하면 목록에서 사라집니다. 복구 작업은 별도로 제공되지 않습니다.</p></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="content-delete-cancel">취소</button><button type="button" class="danger-button" data-action="content-delete-confirm">삭제</button></div></section>`;
}
