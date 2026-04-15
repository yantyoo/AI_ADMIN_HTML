import { FEEDBACK, clone, state } from "../../src/app/data.js";
import { buildDetailFrame, buildSectionHeader, esc } from "../../src/app/utils.js";

export function feedbackPage() {
  const list = feedbackFiltered();
  const selected = list.find((x) => x.id === state.feedback.selectedId) || list[0] || null;
  return `<div class="feedback-layout"><div class="feedback-grid"><section class="feedback-list-card">${buildSectionHeader(
    "피드백 목록",
    "",
    "feedback-list-header",
  )}<div class="feedback-filter-bar"><div class="feedback-filter-field"><label class="field__label" for="feedback-reaction-filter">유형</label><select id="feedback-reaction-filter" class="field__input feedback-filter-select" data-field="feedback-reaction">${[
    { label: "전체", value: "ALL" },
    { label: "긍정", value: "POSITIVE" },
    { label: "부정", value: "NEGATIVE" },
  ]
    .map((o) => `<option value="${o.value}"${state.feedback.filters.reaction === o.value ? " selected" : ""}>${o.label}</option>`)
    .join("")}</select></div><div class="feedback-range-actions"><div class="feedback-range-field"><label class="field__label" for="feedback-range-start">시작일</label><input id="feedback-range-start" type="date" class="field__input feedback-range-input" value="${state.feedback.draftRange.startDate}" data-field="feedback-start"></div><span class="feedback-range-divider" aria-hidden="true">~</span><div class="feedback-range-field"><label class="field__label" for="feedback-range-end">종료일</label><input id="feedback-range-end" type="date" class="field__input feedback-range-input" value="${state.feedback.draftRange.endDate}" data-field="feedback-end"></div><div class="feedback-range-buttons"><button type="button" class="primary-button feedback-range-button" data-action="feedback-search">검색</button><button type="button" class="secondary-button feedback-range-button" data-action="feedback-reset">초기화</button></div></div></div><div class="feedback-list-scroll"><table class="content-table"><thead><tr><th>작성일시</th><th>단지명</th><th>사용자</th><th>반응</th><th>부정사유</th></tr></thead><tbody>${list.length === 0 ? `<tr><td colSpan="5" class="content-empty">조건에 맞는 피드백이 없습니다.</td></tr>` : list
    .map(
      (i) =>
        `<tr class="${selected && selected.id === i.id ? "is-selected" : ""}" data-feedback-select="${i.id}"><td>${esc(i.createdAt)}</td><td>${esc(i.complexName)}</td><td>${esc(i.userId)}</td><td><span class="feedback-reaction-badge feedback-reaction-badge--${i.reaction.toLowerCase()}">${i.reaction === "POSITIVE" ? "긍정" : "부정"}</span></td><td>${i.hasNegativeReason ? "있음" : "-"}</td></tr>`,
    )
    .join("")}</tbody></table></div></section>${feedbackDetail(selected)}</div></div>`;
}

export function feedbackFiltered() {
  return clone(FEEDBACK)
    .filter((i) => state.feedback.filters.reaction === "ALL" || i.reaction === state.feedback.filters.reaction)
    .filter((i) => rangeCheck(i.createdAt, state.feedback.appliedRange))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function rangeCheck(value, range) {
  if (!range.startDate && !range.endDate) return true;
  const t = new Date(value.replace(" ", "T")).getTime();
  const s = range.startDate ? new Date(`${range.startDate}T00:00:00`).getTime() : null;
  const e = range.endDate ? new Date(`${range.endDate}T23:59:59.999`).getTime() : null;
  return s !== null && e !== null && s > e ? t >= e && t <= s : !((s !== null && t < s) || (e !== null && t > e));
}

export function feedbackDetail(i) {
  if (!i) {
    return buildDetailFrame(
      "피드백 상세",
      `<div class="content-empty content-empty--detail">피드백을 선택하면 상세 정보가 표시됩니다.</div>`,
      "",
      "feedback-detail-card",
    );
  }
  return buildDetailFrame(
    "피드백 상세",
    `<div class="feedback-detail-scroll"><div class="feedback-conversation-section"><p class="feedback-conversation-label">대화 내용</p><div class="feedback-conversation">${i.conversation
      .map(
        (t) =>
          `<div class="feedback-conversation__turn feedback-conversation__turn--${t.speaker.toLowerCase()}"><p class="feedback-conversation__speaker">${t.speaker === "USER" ? "사용자" : "챗봇"} · ${esc(t.sentAt)}</p><p class="feedback-conversation__message">${esc(t.message)}</p></div>`,
      )
      .join("")}</div></div>${i.reaction === "NEGATIVE" && i.negativeReason ? `<div class="feedback-negative-reason"><strong>부정사유</strong><p>${esc(i.negativeReason)}</p></div>` : ""}</div>`,
    `<span class="feedback-reaction-badge feedback-reaction-badge--${i.reaction.toLowerCase()}">${i.reaction === "POSITIVE" ? "긍정" : "부정"}</span>`,
    "feedback-detail-card",
  );
}
