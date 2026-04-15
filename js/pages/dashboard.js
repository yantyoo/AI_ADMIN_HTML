import { D, state } from "../../src/app/data.js";
import { buildSectionHeader, esc, ratio } from "../../src/app/utils.js";

export function dashboard() {
  const sec = D[state.dash.range];
  return `<div class="dashboard-grid"><section class="panel panel--main">${buildSectionHeader(
    "기간별 지표 현황",
    `<div class="dashboard-header-actions">${["DAY", "WEEK", "MONTH"]
      .map(
        (r) =>
          `<button type="button" class="time-range-tabs__button${state.dash.range === r ? " is-selected" : ""}" data-action="dash-range" data-value="${r}">${r === "DAY" ? "일간" : r === "WEEK" ? "주간" : "월간"}</button>`,
      )
      .join("")}</div>`,
    "",
    "h2",
  )}<div class="metric-card-grid">${sec.metrics
    .map(
      (m) =>
        `<article class="metric-card"><div class="metric-card__label">${esc(m.label)}</div><div class="metric-card__value">${m.value.toLocaleString()}건</div><div class="metric-card__compare ${m.compareDirection === "UP" ? "is-up" : "is-down"}"><strong>${m.compareDirection === "UP" ? "+" : "-"} ${m.compareRate}%</strong><span>${esc(m.compareLabel)}</span></div></article>`,
    )
    .join("")}</div>${trendChart(sec.trend)}</section><section class="dashboard-side">${keywordList(
    "질문 키워드",
    sec.fixedKeywords,
  )}${feedbackRatio(sec.fixedFeedbackRatio)}</section></div>`;
}

export function keywordList(title, items, bare = false) {
  return `<section class="dashboard-keyword-card${bare ? " dashboard-keyword-card--bare" : ""}">${buildSectionHeader(
    title,
    "",
    "dashboard-keyword-card__header",
  )}<ol class="keyword-list">${items
    .map(
      (i) =>
        `<li class="keyword-list__item"><div class="keyword-list__left"><span class="keyword-list__rank">${i.rank}</span><span class="keyword-list__label">${esc(i.label)}</span></div><div class="keyword-list__stats"><strong class="keyword-list__count">${i.count.toLocaleString()}건</strong><span class="keyword-list__divider">·</span><span class="keyword-list__ratio">${ratio(i.ratio)}</span></div></li>`,
    )
    .join("")}</ol></section>`;
}

export function trendChart(points) {
  const max = Math.max(...points.map((p) => Math.max(p.visitors, p.inquiries)), 1);
  const plotted = points.map((p, i) => ({
    ...p,
    x: 32 + (i * (760 - 64)) / Math.max(points.length - 1, 1),
    vy: 340 - 32 - (p.visitors / max) * (340 - 64),
    iy: 340 - 32 - (p.inquiries / max) * (340 - 64),
  }));
  const line = plotted.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.iy}`).join(" ");
  return `<div class="trend-chart"><div class="trend-chart__stage"><svg viewBox="0 0 760 340" class="trend-chart__svg" role="img">${[0, 1, 2, 3, 4]
    .map((i) => {
      const y = 32 + (i * (340 - 64)) / 4;
      return `<line x1="32" y1="${y}" x2="728" y2="${y}" class="trend-chart__grid"></line>`;
    })
    .join("")}${plotted
    .map(
      (p, i) =>
        `<g class="trend-chart__bar-group" data-trend="${i}"><path d="M ${p.x - 12} ${p.vy + Math.max(340 - 32 - p.vy, 0)} H ${p.x + 12} V ${p.vy} H ${p.x - 12} Z" class="trend-chart__bar"></path><rect x="${p.x - 16}" y="${p.vy}" width="32" height="${340 - 32 - p.vy}" fill="transparent" class="trend-chart__bar-hitarea"></rect><text x="${p.x}" y="332" text-anchor="middle" class="trend-chart__label">${esc(p.label)}</text></g>`,
    )
    .join("")}<path d="${line}" class="trend-chart__path"></path>${plotted
    .map(
      (p, i) =>
        `<g class="trend-chart__point-group" data-trend="${i}"><circle cx="${p.x}" cy="${p.iy}" r="5" class="trend-chart__point"></circle><circle cx="${p.x}" cy="${p.iy}" r="10" fill="transparent"></circle></g>`,
    )
    .join("")}</svg>${state.dash.hoveredTrend != null ? `<div class="trend-chart__tooltip" aria-live="polite" style="left:${state.dash.tooltip.left}px;top:${state.dash.tooltip.top}px;"><span class="trend-chart__tooltip-date">${esc(plotted[state.dash.hoveredTrend].dateLabel)}</span><strong>${plotted[state.dash.hoveredTrend].visitors.toLocaleString()} 접속자</strong><span>${plotted[state.dash.hoveredTrend].inquiries.toLocaleString()} 문의</span></div>` : ""}</div><div class="trend-chart__legend"><span class="trend-chart__legend-item"><span class="trend-chart__legend-dot trend-chart__legend-dot--bar"></span><span>접속자 수</span></span><span class="trend-chart__legend-item"><span class="trend-chart__legend-dot"></span><span>문의 수</span></span></div></div>`;
}

export function feedbackRatio(data) {
  const pos = (data.positive.count / data.totalCount) * 100;
  const neg = (data.negative.count / data.totalCount) * 100;
  const title = `${state.dash.selectedReaction === "NEGATIVE" ? "아쉬워요" : "만족해요"} TOP5 키워드`;
  const slice = (start, end, outer = 42, inner = 24) => {
    const p = (r, a) => {
      const rad = ((a - 90) * Math.PI) / 180;
      return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
    };
    const s = p(outer, start);
    const e = p(outer, end);
    const i = p(inner, end);
    const j = p(inner, start);
    const large = end - start <= 180 ? 0 : 1;
    return `M ${s.x.toFixed(3)} ${s.y.toFixed(3)} A ${outer} ${outer} 0 ${large} 0 ${e.x.toFixed(3)} ${e.y.toFixed(3)} L ${i.x.toFixed(3)} ${i.y.toFixed(3)} A ${inner} ${inner} 0 ${large} 1 ${j.x.toFixed(3)} ${j.y.toFixed(3)} Z`;
  };
  return `<section class="panel panel--side feedback-ratio-card">${buildSectionHeader(
    "피드백 비율",
    "",
    "feedback-ratio-card__header",
  )}<div class="feedback-ratio"><div class="feedback-ratio__chart-shell"><svg class="feedback-ratio__chart" viewBox="0 0 100 100" role="img" aria-label="피드백 비율 도넛 차트. 만족해요 ${ratio(pos)}, 아쉬워요 ${ratio(neg)}"><path d="${slice(
    0,
    pos * 3.6,
  )}" class="feedback-ratio__slice feedback-ratio__slice--positive" data-reaction="POSITIVE" tabindex="0"></path><path d="${slice(
    pos * 3.6,
    360,
  )}" class="feedback-ratio__slice feedback-ratio__slice--negative" data-reaction="NEGATIVE" tabindex="0"></path><circle cx="50" cy="50" r="24" class="feedback-ratio__hole"></circle><text x="50" y="46" text-anchor="middle" class="feedback-ratio__center-label">전체 건수</text><text x="50" y="60" text-anchor="middle" class="feedback-ratio__center-value">${data.totalCount.toLocaleString()}건</text></svg>${state.dash.hoveredReaction ? `<div class="feedback-ratio__tooltip" aria-live="polite"><span class="feedback-ratio__tooltip-label">${esc(state.dash.hoveredReaction === "POSITIVE" ? "만족해요" : "아쉬워요")}</span><strong>${(
    state.dash.hoveredReaction === "POSITIVE" ? data.positive.count : data.negative.count
  ).toLocaleString()}건 · ${ratio(
    (state.dash.hoveredReaction === "POSITIVE" ? data.positive.count : data.negative.count) / data.totalCount * 100,
  )}</strong></div>` : ""}</div><div class="feedback-toggle" role="tablist" aria-label="피드백 유형">${["POSITIVE", "NEGATIVE"]
    .map(
      (r) =>
        `<button type="button" role="tab" aria-selected="${state.dash.selectedReaction === r}" class="feedback-toggle__button${state.dash.selectedReaction === r ? " is-selected" : ""}" data-action="dash-reaction" data-value="${r}">${r === "POSITIVE" ? "만족해요" : "아쉬워요"}</button>`,
    )
    .join("")}</div>${keywordList(title, state.dash.selectedReaction === "POSITIVE" ? data.positive.keywords : data.negative.keywords, true)}</div></section>`;
}
