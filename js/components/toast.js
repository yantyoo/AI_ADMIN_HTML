import { state } from "../../src/app/data.js";
import { esc } from "../../src/app/utils.js";

export function buildToastStack() {
  return state.toasts.length
    ? `<div class="toast-stack" aria-live="polite" aria-atomic="true">${state.toasts
        .map((t) => `<div class="toast toast--${t.tone}" role="status">${esc(t.message)}</div>`)
        .join("")}</div>`
    : "";
}
