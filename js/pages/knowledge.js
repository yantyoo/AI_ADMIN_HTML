import { KNOWLEDGE_DOCS, state } from "../../src/app/data.js";
import { buildDetailFrame, buildSectionHeader, esc } from "../../src/app/utils.js";

export function knowledgePage() {
  const docs = state.shell.knowledge || [];
  const docsFiltered = state.knowledge.form.documentType ? docs.filter((d) => d.type === state.knowledge.form.documentType) : docs;
  return `<div class="knowledge-layout"><div class="knowledge-grid"><section class="panel panel--main">${buildSectionHeader("조회 조건")}<div class="knowledge-form"><label class="field"><span class="field__label">문서 유형 *</span><select class="field__input" data-field="knowledge-type"><option value="">선택하세요</option><option value="MANUAL"${state.knowledge.form.documentType === "MANUAL" ? " selected" : ""}>매뉴얼</option><option value="FAQ"${state.knowledge.form.documentType === "FAQ" ? " selected" : ""}>FAQ</option></select></label><label class="field"><span class="field__label">테스트 문서 *</span><select class="field__input" data-field="knowledge-doc" ${!state.knowledge.form.documentType ? "disabled" : ""}><option value="">선택하세요</option>${docsFiltered.map(
    (d) => `<option value="${d.id}"${state.knowledge.form.documentId === d.id ? " selected" : ""}>${esc(d.name)}</option>`,
  ).join("")}</select></label><label class="field"><span class="field__label">질문 입력 *</span><textarea class="field__input knowledge-textarea" rows="4" maxLength="1000" placeholder="1자 이상 입력 (최대 1000자)" data-field="knowledge-question">${esc(
    state.knowledge.form.question,
  )}</textarea></label><div class="knowledge-action-row"><button type="button" class="secondary-button" data-action="knowledge-reset" ${state.knowledge.status === "IDLE" && !state.knowledge.result ? "disabled" : ""}>초기화</button><button type="button" class="primary-button" data-action="knowledge-query" ${!canQuery() || state.knowledge.status === "LOADING" ? "disabled" : ""}>${state.knowledge.status === "LOADING" ? "조회 중" : "조회"}</button><button type="button" class="secondary-button" data-action="knowledge-error">오류 보기</button></div></div></section>${buildDetailFrame(
    "조회 결과",
    knowledgeResult(),
    "",
    "panel panel--main",
  )}</div></div>`;
}

export function canQuery() {
  return state.knowledge.form.question.length >= 1 && state.knowledge.form.documentType !== "" && state.knowledge.form.documentId !== "";
}

export function knowledgeResult() {
  if (state.knowledge.status === "IDLE") return `<div class="knowledge-result-empty">조건을 입력한 뒤 조회를 시작해 주세요.</div>`;
  if (state.knowledge.status === "LOADING") return `<div class="knowledge-result-empty">조회 중입니다.</div>`;
  if (state.knowledge.status === "EMPTY") return `<div class="knowledge-result-empty">선택한 문서에서 일치하는 답변을 찾지 못했습니다.</div>`;
  if (state.knowledge.status === "ERROR") return `<div class="knowledge-result-empty">조회에 실패했습니다. 다시 시도해 주세요.</div>`;
  if (!state.knowledge.result) return "";
  const r = state.knowledge.result;
  return `<div class="knowledge-result-scroll"><div class="knowledge-answer"><p class="knowledge-answer__text">${esc(r.answer)}</p><p class="knowledge-answer__meta">생성 시각: ${esc(r.generatedAt)}</p></div><dl class="content-detail__list knowledge-reference"><div><dt>참조 문서</dt><dd>${esc(r.referenceDocument.name)} <span class="knowledge-ref-type">${r.referenceDocument.type === "MANUAL" ? "매뉴얼" : "FAQ"}</span></dd></div><div><dt>저장 경로</dt><dd>${esc(r.referenceDocument.path)}</dd></div><div><dt>참조 단락</dt><dd>${esc(r.referenceParagraph)}</dd></div></dl><div class="knowledge-footer"><button type="button" class="secondary-button" data-action="knowledge-copy">${state.knowledge.copied ? "복사 완료" : "결과 복사"}</button></div></div>`;
}
