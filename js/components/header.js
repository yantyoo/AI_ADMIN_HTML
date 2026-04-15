import { esc } from "../../src/app/utils.js";

export function header(title, desc) {
  return `<header class="top-header"><div class="top-header__copy"><h1 class="top-header__title">${esc(title)}</h1><p class="top-header__description">${esc(desc)}</p></div></header>`;
}
