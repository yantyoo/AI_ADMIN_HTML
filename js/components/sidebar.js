import { state } from "../../src/app/data.js";
import { esc } from "../../src/app/utils.js";

export function sidebar(user, nav) {
  return `<aside class="sidebar"><div class="sidebar__brand"><div class="sidebar__logo">XpERP</div><div class="sidebar__badge">AI 관리자로</div></div><nav class="sidebar__nav" aria-label="메뉴">${nav
    .map(
      (i) =>
        `<button type="button" class="sidebar__nav-item${state.path === i.href ? " is-active" : ""}" data-nav="${i.href}" ${state.path === i.href ? 'aria-current="page"' : ""}><span class="sidebar__nav-icon" aria-hidden="true">${esc(
          i.key[0].toUpperCase(),
        )}</span><span>${esc(i.label)}</span></button>`,
    )
    .join("")}</nav><div class="sidebar__user"><div class="sidebar__user-row"><div class="sidebar__user-name">${esc(user.name)}</div><div class="sidebar__user-meta">${esc(
    user.id,
  )}</div></div><div class="sidebar__user-role">${esc(user.role)} · ${esc(user.department)}</div><button type="button" class="secondary-button sidebar__logout" data-action="logout-open">로그아웃</button></div></aside>`;
}
