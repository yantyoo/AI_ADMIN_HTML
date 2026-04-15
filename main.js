const MINI_ELEMENT_TYPE = Symbol.for("react.transitional.element");
const MINI_FRAGMENT = Symbol.for("react.fragment");
const MINI_STRICT = Symbol.for("react.strict_mode");
const c = {
  jsx(type, props, key) {
    return {
      $$typeof: MINI_ELEMENT_TYPE,
      type,
      key: key ?? null,
      ref: props?.ref ?? null,
      props: props ?? {},
    };
  },
  jsxs(type, props, key) {
    return {
      $$typeof: MINI_ELEMENT_TYPE,
      type,
      key: key ?? null,
      ref: props?.ref ?? null,
      props: props ?? {},
    };
  },
  Fragment: MINI_FRAGMENT,
};
const Ph = { StrictMode: MINI_STRICT, Fragment: MINI_FRAGMENT };
const $r = {
  createPortal(children, containerInfo) {
    return {
      $$typeof: Symbol.for("react.portal"),
      key: null,
      children,
      containerInfo,
      implementation: null,
    };
  },
};
const j = {
  useState() {
    throw new Error("mini runtime not initialized");
  },
  useMemo() {
    throw new Error("mini runtime not initialized");
  },
  useRef() {
    throw new Error("mini runtime not initialized");
  },
  useCallback() {
    throw new Error("mini runtime not initialized");
  },
  useEffect() {
    throw new Error("mini runtime not initialized");
  },
  useLayoutEffect() {
    throw new Error("mini runtime not initialized");
  },
};
const zv = { createRoot() { return { render() {} }; } };
function Oh({ children: e, backdropClassName: t, onBackdropClick: l }) {
  const [a, n] = j.useState(!1);
  return (
    j.useEffect(() => {
      n(!0);
    }, []),
    a
      ? $r.createPortal(
          c.jsx("div", {
            className: t ? `modal-backdrop ${t}` : "modal-backdrop",
            role: "presentation",
            onClick: l,
            children: e,
          }),
          document.body,
        )
      : null
  );
}
function nl({
  title: e,
  children: t,
  onClose: l,
  footer: a,
  description: n,
  size: u = "md",
  compact: i,
  backdropClassName: s,
  className: f,
  bodyClassName: r,
  headerClassName: b,
  footerClassName: y,
  ariaLabel: h,
}) {
  return c.jsx(Oh, {
    backdropClassName: s,
    onBackdropClick: l,
    children: c.jsxs("section", {
      className: `modal modal--${u}${i ? " modal--compact" : ""}${f ? ` ${f}` : ""}`,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": h,
      onClick: (m) => m.stopPropagation(),
      children: [
        c.jsx("div", {
          className: `modal__header${b ? ` ${b}` : ""}`,
          children: c.jsxs("div", {
            children: [
              c.jsx("h3", { children: e }),
              n ? c.jsx("p", { children: n }) : null,
            ],
          }),
        }),
        c.jsx("div", {
          className: `modal__body${r ? ` ${r}` : ""}`,
          children: t,
        }),
        a
          ? c.jsx("div", {
              className: `modal__footer${y ? ` ${y}` : ""}`,
              children: a,
            })
          : null,
      ],
    }),
  });
}
const su = "xperp-mock-auth-stage",
  dl = "xperp-mock-auth-user",
  Pt = "xperp-mock-auth-profile",
  kn = "xperp-mock-otp-failures",
  Kn = "xperp-mock-otp-locked",
  Ls = {
    userId: "chat1004",
    id: "chat1004",
    name: "박운영",
    role: "MASTER",
    department: "운영 관리자",
  },
  Uv = {
    test0000: Ls,
    test1111: {
      userId: "test1111",
      id: "op2031",
      name: "김운영",
      role: "OPERATOR",
      department: "운영 담당",
    },
  },
  fr = (e) => {
    if (!e) return null;
    try {
      const t = JSON.parse(e);
      return !t.userId || !t.id || !t.name || !t.role || !t.department
        ? null
        : t;
    } catch {
      return null;
    }
  },
  Hv = (e) => Uv[e] ?? Ls,
  Mh = () => {
    if (typeof window > "u") return Ls;
    const e = fr(window.sessionStorage.getItem(Pt));
    if (e) return e;
    const t = fr(window.localStorage.getItem(Pt));
    if (t) return t;
    const l =
      window.sessionStorage.getItem(dl) ??
      window.localStorage.getItem(dl) ??
      "";
    return Hv(l);
  },
  qv = (e, t) => {
    if (typeof window > "u") return;
    const l = JSON.stringify(e);
    (window.sessionStorage.setItem(Pt, l),
      t
        ? window.localStorage.setItem(Pt, l)
        : window.localStorage.removeItem(Pt));
  },
  Lv = () => {
    typeof window > "u" ||
      (window.sessionStorage.removeItem(Pt),
      window.localStorage.removeItem(Pt));
  },
  Dh = 10,
  Ch = 12,
  Bv = "123456",
  Lc = 5,
  Yv = {
    title: "로그인 오류",
    message: `아이디 또는 비밀번호가 올바르지 않습니다.다시 확인해 주세요.`,
  },
  wv = {
    title: "권한 없음",
    message: `권한이 없는 사용자입니다.관리자에게 권한을 요청해 주세요.`,
  },
  rr = {
    title: "OTP 잠금",
    message: `OTP 오류로 잠금된 아이디 입니다.관리자에게 문의하세요.`,
  },
  or = {
    test0000: {
      password: "a123456789",
      profile: {
        userId: "test0000",
        id: "chat1004",
        name: "박승준",
        role: "MASTER",
        department: "운영 관리자",
      },
      allowed: !0,
    },
    test1111: {
      password: "a123456789",
      profile: {
        userId: "test1111",
        id: "op2031",
        name: "권태영",
        role: "OPERATOR",
        department: "운영 담당",
      },
      allowed: !0,
    },
    blocked0000: {
      password: "a123456789",
      profile: {
        userId: "blocked0000",
        id: "op9001",
        name: "차단계정",
        role: "OPERATOR",
        department: "권한 미부여",
      },
      allowed: !1,
    },
  },
  Vv = { userId: "", password: "", otp: "" },
  dr = (e) =>
    new Promise((t) => {
      window.setTimeout(t, e);
    }),
  Qv = (e) => {
    const t = Number(e ?? "0");
    return Number.isFinite(t) ? t : 0;
  },
  Bc = (e) => e.replace(/[^A-Za-z0-9]/g, "").slice(0, Dh),
  hr = (e) => e.replace(/[^A-Za-z0-9]/g, "").slice(0, Ch);
function AuthScreen({ onAuthenticated: e }) {
  const [t, l] = j.useState(Vv),
    [a, n] = j.useState(""),
    [u, i] = j.useState(""),
    [s, f] = j.useState(!1),
    [r, b] = j.useState(!1),
    [y, h] = j.useState(!1),
    [m, A] = j.useState(0),
    [N, R] = j.useState(!1),
    [o, d] = j.useState(null),
    v = j.useMemo(
      () =>
        N
          ? "OTP 오류로 잠금된 아이디입니다. 관리자에게 문의하세요."
          : m > 0
            ? `OTP 인증에 실패했습니다. (${m}/${Lc})`
            : "OTP를 입력하면 로그인 절차를 완료합니다.",
      [m, N],
    );
  j.useEffect(() => {
    if (typeof window > "u") return;
    const Q = window.sessionStorage.getItem(su),
      se =
        window.sessionStorage.getItem(dl) ??
        window.localStorage.getItem(dl) ??
        "",
      xe = window.sessionStorage.getItem(Kn) === "true",
      x = Qv(window.sessionStorage.getItem(kn));
    if (Q === "authenticated") {
      e();
      return;
    }
    const z = Bc(se);
    (l((U) => ({ ...U, userId: z })),
      R(xe),
      A(x),
      h(Q === "otp_pending" && !!z));
  }, [e]);
  const g = (Q) => (se) => {
      const xe = Q === "userId" ? Bc(se) : Q === "password" ? hr(se) : se;
      (l((x) => ({ ...x, [Q]: xe })), i(""));
    },
    E = (Q) => {
      d(Q);
    },
    C = () => {
      d(null);
    },
    T = () => {
      (h(!0), i(""), n(""), A(0), R(!1));
    },
    D = () => {
      (h(!1), l((Q) => ({ ...Q, otp: "" })), n(""), i(""));
    },
    S = async (Q) => {
      if ((Q.preventDefault(), s)) return;
      if (!t.userId.trim() || !t.password.trim()) {
        i("아이디와 비밀번호를 입력해 주세요.");
        return;
      }
      const se = Bc(t.userId.trim()),
        xe = hr(t.password.trim()),
        x = or[se];
      if (!x || x.password !== xe) {
        E(Yv);
        return;
      }
      if (!x.allowed) {
        E(wv);
        return;
      }
      (f(!0),
        n("OTP 입력 창을 여는 중입니다."),
        window.sessionStorage.setItem(su, "otp_pending"),
        window.sessionStorage.setItem(dl, se),
        window.sessionStorage.setItem(kn, "0"),
        window.sessionStorage.removeItem(Kn),
        r
          ? window.localStorage.setItem(dl, se)
          : window.localStorage.removeItem(dl),
        await dr(250),
        f(!1),
        T());
    },
    _ = async (Q) => {
      if ((Q.preventDefault(), s || !y)) return;
      if (N) {
        E(rr);
        return;
      }
      if (t.otp.trim().length !== 6) {
        i("6자리 OTP를 입력해 주세요.");
        return;
      }
      if ((f(!0), t.otp.trim() !== Bv)) {
        const x = m + 1,
          z = x >= Lc;
        (A(x),
          window.sessionStorage.setItem(kn, String(x)),
          z
            ? (R(!0), window.sessionStorage.setItem(Kn, "true"), E(rr))
            : i(`OTP 인증에 실패했습니다. (${x}/${Lc})`),
          f(!1));
        return;
      }
      const se = or[t.userId.trim()],
        xe = (se == null ? void 0 : se.profile) ?? {
          userId: t.userId.trim(),
          id: t.userId.trim(),
          name: t.userId.trim(),
          role: "MASTER",
          department: "운영 관리자",
        };
      (qv(xe, r),
        window.sessionStorage.setItem(su, "authenticated"),
        window.sessionStorage.setItem(Pt, JSON.stringify(xe)),
        window.sessionStorage.removeItem(kn),
        window.sessionStorage.removeItem(Kn),
        n("대시보드로 이동합니다."),
        await dr(250),
        e());
    },
    te = s || !t.userId.trim() || !t.password.trim(),
    De = s || N || t.otp.trim().length !== 6;
  return c.jsxs("main", {
    className: "auth-shell auth-shell--standalone",
    children: [
      c.jsxs("section", {
        className: "auth-card auth-standalone",
        children: [
          c.jsxs("div", {
            className: "auth-card__intro auth-standalone__intro",
            children: [
              c.jsx("span", {
                className: "auth-card__badge",
                children: "Xp도우미",
              }),
              c.jsx("h1", {
                className: "auth-card__title",
                children: "Xp도우미 관리자",
              }),
              c.jsx("p", {
                className: "auth-card__eyebrow",
                children: "관리자 전용 시스템",
              }),
              c.jsxs("p", {
                className: "auth-card__description",
                children: [
                  "본 시스템은 내부 관리자 전용입니다.",
                  c.jsx("br", {}),
                  "무단 접근 및 정보 열람 시 관련 법령에 따라 책임이 발생할 수 있습니다.",
                ],
              }),
            ],
          }),
          c.jsxs("form", {
            className: "auth-form",
            onSubmit: S,
            children: [
              c.jsxs("div", {
                className: "auth-form__header",
                children: [
                  c.jsx("h2", {
                    className: "auth-form__title",
                    children: "관리자 로그인",
                  }),
                  c.jsx("p", {
                    className: "auth-form__caption",
                    children: "승인된 계정만 접속 가능합니다.",
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "auth-form__fields",
                children: [
                  c.jsxs("label", {
                    className: "field auth-field",
                    children: [
                      c.jsx("span", {
                        className: "field__label",
                        children: "아이디",
                      }),
                      c.jsx("input", {
                        className: "field__input auth-input",
                        maxLength: Dh,
                        value: t.userId,
                        onChange: (Q) => g("userId")(Q.target.value),
                        placeholder: "예: admin01",
                        autoComplete: "username",
                        inputMode: "text",
                      }),
                    ],
                  }),
                  c.jsxs("label", {
                    className: "field auth-field",
                    children: [
                      c.jsx("span", {
                        className: "field__label",
                        children: "비밀번호",
                      }),
                      c.jsx("input", {
                        type: "password",
                        className: "field__input auth-input",
                        maxLength: Ch,
                        value: t.password,
                        onChange: (Q) => g("password")(Q.target.value),
                        placeholder: "비밀번호 입력",
                        autoComplete: "current-password",
                        inputMode: "text",
                      }),
                    ],
                  }),
                  c.jsxs("label", {
                    className: "auth-remember",
                    children: [
                      c.jsx("input", {
                        type: "checkbox",
                        checked: r,
                        onChange: (Q) => b(Q.target.checked),
                      }),
                      c.jsx("span", { children: "아이디 저장" }),
                    ],
                  }),
                ],
              }),
              c.jsx("div", {
                className: "auth-form__actions",
                children: c.jsx("button", {
                  type: "submit",
                  className: "primary-button auth-submit",
                  disabled: te,
                  children: s ? "처리 중..." : "로그인",
                }),
              }),
              c.jsxs("div", {
                className: "auth-form__feedback",
                "aria-live": "polite",
                children: [
                  u
                    ? c.jsx("p", { className: "auth-error", children: u })
                    : null,
                  !u && a
                    ? c.jsx("p", { className: "auth-helper", children: a })
                    : null,
                ],
              }),
            ],
          }),
        ],
      }),
      y
        ? c.jsx(Oh, {
            backdropClassName: "auth-otp-backdrop",
            onBackdropClick: D,
            children: c.jsxs("section", {
              className: "modal auth-otp-modal",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "OTP 인증",
              onClick: (Q) => Q.stopPropagation(),
              children: [
                c.jsx("div", {
                  className: "modal__header auth-otp-modal__header",
                  children: c.jsxs("div", {
                    children: [
                      c.jsx("h3", { children: "OTP 인증" }),
                      c.jsx("p", {
                        className: "auth-otp-modal__caption",
                        children: v,
                      }),
                    ],
                  }),
                }),
                c.jsxs("form", {
                  className: "auth-otp-modal__body",
                  onSubmit: _,
                  children: [
                    c.jsxs("label", {
                      className: "field auth-otp-field",
                      children: [
                        c.jsx("span", {
                          className: "field__label",
                          children: "OTP",
                        }),
                        c.jsx("input", {
                          className: "field__input auth-input auth-input--otp",
                          value: t.otp,
                          onChange: (Q) => g("otp")(Q.target.value),
                          placeholder: "6자리 OTP 입력",
                          inputMode: "numeric",
                          autoComplete: "one-time-code",
                          maxLength: 6,
                          disabled: N,
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "auth-form__feedback",
                      "aria-live": "polite",
                      children: [
                        u
                          ? c.jsx("p", { className: "auth-error", children: u })
                          : null,
                        !u && a
                          ? c.jsx("p", {
                              className: "auth-helper",
                              children: a,
                            })
                          : null,
                      ],
                    }),
                    c.jsxs("div", {
                      className: "auth-form__actions auth-otp-modal__actions",
                      children: [
                        c.jsx("button", {
                          type: "button",
                          className: "secondary-button auth-cancel",
                          onClick: D,
                          children: "취소",
                        }),
                        c.jsx("button", {
                          type: "submit",
                          className: "primary-button auth-submit",
                          disabled: De,
                          children: s ? "처리 중..." : "인증 완료",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          })
        : null,
      o
        ? c.jsx(nl, {
            title: o.title,
            ariaLabel: o.title,
            onClose: C,
            size: "sm",
            compact: !0,
            backdropClassName: "auth-notice-backdrop",
            className: "auth-notice-modal",
            headerClassName: "modal__header--tight auth-notice-modal__header",
            bodyClassName: "auth-notice-modal__body",
            footerClassName: "modal__footer--split",
            footer: c.jsx("button", {
              type: "button",
              className: "primary-button",
              onClick: C,
              children: "확인",
            }),
            children: c.jsx("p", {
              className: "auth-notice-modal__message",
              children: o.message,
            }),
          })
        : null,
    ],
  });
}
const Ul = (e, t, l) => {
    const a = Number(((t / Math.max(e, 1)) * 100).toFixed(1));
    return {
      count: t,
      ratio: a,
      keywords: l.map((n, u) => ({
        rank: u + 1,
        label: n.label,
        count: n.count,
        ratio: Number(((n.count / Math.max(t, 1)) * 100).toFixed(1)),
      })),
    };
  },
  DASHBOARD_SECTIONS = {
    DAY: {
      selectedRange: "DAY",
      metrics: [
        {
          key: "visitors",
          label: "접속자 수",
          value: 184,
          compareLabel: "전일 대비",
          compareRate: 4.8,
          compareDirection: "UP",
        },
        {
          key: "inquiries",
          label: "문의 수",
          value: 326,
          compareLabel: "전일 대비",
          compareRate: 2.1,
          compareDirection: "UP",
        },
        {
          key: "failures",
          label: "실패 수",
          value: 4,
          compareLabel: "전일 대비",
          compareRate: 1.2,
          compareDirection: "DOWN",
        },
      ],
      trend: [
        { label: "3/31", dateLabel: "2026-03-31", visitors: 41, inquiries: 28 },
        { label: "4/1", dateLabel: "2026-04-01", visitors: 53, inquiries: 39 },
        { label: "4/2", dateLabel: "2026-04-02", visitors: 68, inquiries: 51 },
        { label: "4/3", dateLabel: "2026-04-03", visitors: 74, inquiries: 58 },
        { label: "4/4", dateLabel: "2026-04-04", visitors: 83, inquiries: 62 },
        { label: "4/5", dateLabel: "2026-04-05", visitors: 91, inquiries: 68 },
        { label: "4/6", dateLabel: "2026-04-06", visitors: 97, inquiries: 72 },
      ],
      fixedKeywords: [
        { rank: 1, label: "비밀번호 변경", count: 92, ratio: 42.2 },
        { rank: 2, label: "접속 지연", count: 61, ratio: 28 },
        { rank: 3, label: "자동 등록", count: 44, ratio: 20.2 },
      ],
      fixedFeedbackRatio: {
        totalCount: 340,
        defaultReaction: "POSITIVE",
        positive: Ul(340, 187, [
          { label: "응답이 빨라요", count: 52 },
          { label: "설명이 명확해요", count: 44 },
          { label: "추천할 만해요", count: 33 },
          { label: "사용하기 쉬워요", count: 29 },
          { label: "불편함이 없어요", count: 24 },
        ]),
        negative: Ul(340, 153, [
          { label: "응답이 늦어요", count: 41 },
          { label: "의도가 조금 달라요", count: 36 },
          { label: "설명이 부족해요", count: 28 },
          { label: "오류가 발생했어요", count: 25 },
          { label: "결과가 기대와 달라요", count: 23 },
        ]),
      },
    },
    WEEK: {
      selectedRange: "WEEK",
      metrics: [
        {
          key: "visitors",
          label: "접속자 수",
          value: 1051,
          compareLabel: "지난주 대비",
          compareRate: 5,
          compareDirection: "UP",
        },
        {
          key: "inquiries",
          label: "문의 수",
          value: 1820,
          compareLabel: "지난주 대비",
          compareRate: 3.4,
          compareDirection: "UP",
        },
        {
          key: "failures",
          label: "실패 수",
          value: 19,
          compareLabel: "지난주 대비",
          compareRate: 0.8,
          compareDirection: "DOWN",
        },
      ],
      trend: [
        {
          label: "4월 1주차",
          dateLabel: "2026-04-01 ~ 2026-04-07",
          visitors: 330,
          inquiries: 250,
        },
        {
          label: "4월 2주차",
          dateLabel: "2026-04-08 ~ 2026-04-14",
          visitors: 430,
          inquiries: 320,
        },
        {
          label: "4월 3주차",
          dateLabel: "2026-04-15 ~ 2026-04-21",
          visitors: 500,
          inquiries: 360,
        },
        {
          label: "4월 4주차",
          dateLabel: "2026-04-22 ~ 2026-04-28",
          visitors: 495,
          inquiries: 350,
        },
        {
          label: "4월 5주차",
          dateLabel: "2026-04-29 ~ 2026-05-05",
          visitors: 540,
          inquiries: 410,
        },
        {
          label: "4월 6주차",
          dateLabel: "2026-05-06 ~ 2026-05-12",
          visitors: 642,
          inquiries: 506,
        },
        {
          label: "4월 7주차",
          dateLabel: "2026-05-13 ~ 2026-05-19",
          visitors: 492,
          inquiries: 370,
        },
      ],
      fixedKeywords: [
        { rank: 1, label: "비밀번호 변경", count: 1520, ratio: 44.8 },
        { rank: 2, label: "접속 지연", count: 985, ratio: 29.1 },
        { rank: 3, label: "자동 등록", count: 503, ratio: 14.8 },
      ],
      fixedFeedbackRatio: {
        totalCount: 1680,
        defaultReaction: "POSITIVE",
        positive: Ul(1680, 924, [
          { label: "응답이 빨라요", count: 260 },
          { label: "설명이 명확해요", count: 210 },
          { label: "추천할 만해요", count: 175 },
          { label: "사용하기 쉬워요", count: 150 },
          { label: "불편함이 없어요", count: 129 },
        ]),
        negative: Ul(1680, 756, [
          { label: "응답이 늦어요", count: 230 },
          { label: "의도가 조금 달라요", count: 162 },
          { label: "설명이 부족해요", count: 143 },
          { label: "오류가 발생했어요", count: 121 },
          { label: "결과가 기대와 달라요", count: 100 },
        ]),
      },
    },
    MONTH: {
      selectedRange: "MONTH",
      metrics: [
        {
          key: "visitors",
          label: "접속자 수",
          value: 4216,
          compareLabel: "전월 대비",
          compareRate: 7.2,
          compareDirection: "UP",
        },
        {
          key: "inquiries",
          label: "문의 수",
          value: 8014,
          compareLabel: "전월 대비",
          compareRate: 4.6,
          compareDirection: "UP",
        },
        {
          key: "failures",
          label: "실패 수",
          value: 83,
          compareLabel: "전월 대비",
          compareRate: 2.4,
          compareDirection: "DOWN",
        },
      ],
      trend: [
        { label: "10월", dateLabel: "2025-10", visitors: 1200, inquiries: 940 },
        {
          label: "11월",
          dateLabel: "2025-11",
          visitors: 1420,
          inquiries: 1110,
        },
        {
          label: "12월",
          dateLabel: "2025-12",
          visitors: 1880,
          inquiries: 1425,
        },
        { label: "1월", dateLabel: "2026-01", visitors: 2140, inquiries: 1632 },
        { label: "2월", dateLabel: "2026-02", visitors: 2256, inquiries: 1714 },
        { label: "3월", dateLabel: "2026-03", visitors: 2390, inquiries: 1788 },
        { label: "4월", dateLabel: "2026-04", visitors: 2574, inquiries: 1847 },
      ],
      fixedKeywords: [
        { rank: 1, label: "비밀번호 변경", count: 3610, ratio: 48.1 },
        { rank: 2, label: "접속 지연", count: 1922, ratio: 25.6 },
        { rank: 3, label: "자동 등록", count: 1316, ratio: 17.5 },
      ],
      fixedFeedbackRatio: {
        totalCount: 11240,
        defaultReaction: "POSITIVE",
        positive: Ul(11240, 6519, [
          { label: "응답이 빨라요", count: 1820 },
          { label: "설명이 명확해요", count: 1512 },
          { label: "추천할 만해요", count: 1260 },
          { label: "사용하기 쉬워요", count: 1014 },
          { label: "불편함이 없어요", count: 913 },
        ]),
        negative: Ul(11240, 4721, [
          { label: "응답이 늦어요", count: 1290 },
          { label: "의도가 조금 달라요", count: 1174 },
          { label: "설명이 부족해요", count: 980 },
          { label: "오류가 발생했어요", count: 745 },
          { label: "결과가 기대와 달라요", count: 532 },
        ]),
      },
    },
  };
function SectionHeader({ title: e, actions: t, className: l, titleAs: a = "h2" }) {
  const n = a;
  return c.jsxs("div", {
    className: `section-header${l ? ` ${l}` : ""}`,
    children: [
      c.jsx("div", {
        className: "section-header__copy",
        children: c.jsx(n, { className: "section-header__title", children: e }),
      }),
      t
        ? c.jsx("div", { className: "section-header__actions", children: t })
        : null,
    ],
  });
}
const mr = (e) =>
    e
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/[^0-9a-z가-힣]/gi, ""),
  Bu = (e, t) => t.localeCompare(e),
  fu = (e) => (Number.isInteger(e) ? `${e}%` : `${e.toFixed(1)}%`);
function KeywordList({ title: e, items: t, bare: l }) {
  return c.jsxs("section", {
    className: `dashboard-keyword-card${l ? " dashboard-keyword-card--bare" : ""}`,
    children: [
      c.jsx(SectionHeader, { title: e, className: "dashboard-keyword-card__header" }),
      t.length === 0
        ? c.jsx("div", {
            className: "dashboard-keyword-empty",
            children: "조건에 맞는 질문 키워드가 없습니다.",
          })
        : c.jsx("ol", {
            className: "keyword-list",
            children: t.map((a) =>
              c.jsxs(
                "li",
                {
                  className: "keyword-list__item",
                  children: [
                    c.jsxs("div", {
                      className: "keyword-list__left",
                      children: [
                        c.jsx("span", {
                          className: "keyword-list__rank",
                          children: a.rank,
                        }),
                        c.jsx("span", {
                          className: "keyword-list__label",
                          children: a.label,
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "keyword-list__stats",
                      children: [
                        c.jsxs("strong", {
                          className: "keyword-list__count",
                          children: [a.count.toLocaleString(), "건"],
                        }),
                        c.jsx("span", {
                          className: "keyword-list__divider",
                          children: "·",
                        }),
                        c.jsx("span", {
                          className: "keyword-list__ratio",
                          children: fu(a.ratio),
                        }),
                      ],
                    }),
                  ],
                },
                a.rank,
              ),
            ),
          }),
    ],
  });
}
const Yc = {
    POSITIVE: { label: "만족해요", tooltipLabel: "만족해요" },
    NEGATIVE: { label: "아쉬워요", tooltipLabel: "아쉬워요" },
  },
  vr = 100,
  ct = 50,
  Jn = 42,
  La = 24,
  $n = (e, t, l, a) => {
    const n = ((a - 90) * Math.PI) / 180;
    return { x: e + l * Math.cos(n), y: t + l * Math.sin(n) };
  },
  yr = (e, t) => {
    const l = $n(ct, ct, Jn, t),
      a = $n(ct, ct, Jn, e),
      n = $n(ct, ct, La, e),
      u = $n(ct, ct, La, t),
      i = t - e <= 180 ? 0 : 1;
    return [
      `M ${l.x.toFixed(3)} ${l.y.toFixed(3)}`,
      `A ${Jn} ${Jn} 0 ${i} 0 ${a.x.toFixed(3)} ${a.y.toFixed(3)}`,
      `L ${n.x.toFixed(3)} ${n.y.toFixed(3)}`,
      `A ${La} ${La} 0 ${i} 1 ${u.x.toFixed(3)} ${u.y.toFixed(3)}`,
      "Z",
    ].join(" ");
  };
function FeedbackRatio({ data: e }) {
  const [t, l] = j.useState(e.defaultReaction),
    [a, n] = j.useState(null),
    u = (e.positive.count / e.totalCount) * 100,
    i = (e.negative.count / e.totalCount) * 100,
    s = j.useMemo(
      () => yr(0, (e.positive.count / e.totalCount) * 360),
      [e.positive.count, e.totalCount],
    ),
    f = j.useMemo(
      () => yr((e.positive.count / e.totalCount) * 360, 360),
      [e.positive.count, e.totalCount],
    ),
    r = a ? e[a === "POSITIVE" ? "positive" : "negative"] : null,
    b = `${Yc[t].label} TOP5 키워드`;
  return c.jsxs("section", {
    className: "panel panel--side feedback-ratio-card",
    children: [
      c.jsx(SectionHeader, {
        title: "피드백 비율",
        className: "feedback-ratio-card__header",
      }),
      c.jsxs("div", {
        className: "feedback-ratio",
        children: [
          c.jsxs("div", {
            className: "feedback-ratio__chart-shell",
            children: [
              c.jsxs("svg", {
                className: "feedback-ratio__chart",
                viewBox: `0 0 ${vr} ${vr}`,
                role: "img",
                "aria-label": `피드백 비율 도넛 차트. 만족해요 ${fu(u)}, 아쉬워요 ${fu(i)}`,
                children: [
                  c.jsx("path", {
                    d: s,
                    className:
                      "feedback-ratio__slice feedback-ratio__slice--positive",
                    onMouseEnter: () => n("POSITIVE"),
                    onMouseLeave: () => n(null),
                    onFocus: () => n("POSITIVE"),
                    onBlur: () => n(null),
                    tabIndex: 0,
                  }),
                  c.jsx("path", {
                    d: f,
                    className:
                      "feedback-ratio__slice feedback-ratio__slice--negative",
                    onMouseEnter: () => n("NEGATIVE"),
                    onMouseLeave: () => n(null),
                    onFocus: () => n("NEGATIVE"),
                    onBlur: () => n(null),
                    tabIndex: 0,
                  }),
                  c.jsx("circle", {
                    cx: ct,
                    cacheQaRecords: ct,
                    r: La,
                    className: "feedback-ratio__hole",
                  }),
                  c.jsx("text", {
                    x: "50",
                    y: "46",
                    textAnchor: "middle",
                    className: "feedback-ratio__center-label",
                    children: "전체 건수",
                  }),
                  c.jsxs("text", {
                    x: "50",
                    y: "60",
                    textAnchor: "middle",
                    className: "feedback-ratio__center-value",
                    children: [e.totalCount.toLocaleString(), "건"],
                  }),
                ],
              }),
              r
                ? c.jsxs("div", {
                    className: "feedback-ratio__tooltip",
                    "aria-live": "polite",
                    children: [
                      c.jsx("span", {
                        className: "feedback-ratio__tooltip-label",
                        children: Yc[a].tooltipLabel,
                      }),
                      c.jsxs("strong", {
                        children: [
                          r.count.toLocaleString(),
                          "건 · ",
                          fu(r.ratio),
                        ],
                      }),
                    ],
                  })
                : null,
            ],
          }),
          c.jsx("div", {
            className: "feedback-toggle",
            role: "tablist",
            "aria-label": "피드백 유형",
            children: ["POSITIVE", "NEGATIVE"].map((y) => {
              const h = y === t;
              return c.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": h,
                  className: `feedback-toggle__button${h ? " is-selected" : ""}`,
                  onClick: () => l(y),
                  children: Yc[y].label,
                },
                y,
              );
            }),
          }),
          c.jsx(KeywordList, {
            title: b,
            items: t === "POSITIVE" ? e.positive.keywords : e.negative.keywords,
            bare: !0,
          }),
        ],
      }),
    ],
  });
}
function MetricCard({ metric: e }) {
  const t = e.compareDirection === "UP" ? "+" : "-",
    l = e.compareDirection === "UP" ? "is-up" : "is-down";
  return c.jsxs("article", {
    className: "metric-card",
    children: [
      c.jsx("div", { className: "metric-card__label", children: e.label }),
      c.jsxs("div", {
        className: "metric-card__value",
        children: [e.value.toLocaleString(), "건"],
      }),
      c.jsxs("div", {
        className: `metric-card__compare ${l}`,
        children: [
          c.jsxs("strong", { children: [t, " ", e.compareRate, "%"] }),
          c.jsx("span", { children: e.compareLabel }),
        ],
      }),
    ],
  });
}
const kv = {
    DAY: { label: "일간", note: "오늘 기준 7일" },
    WEEK: { label: "주간", note: "이번주 기준 7주" },
    MONTH: { label: "월간", note: "이번달 기준 7달" },
  },
  Kv = ["DAY", "WEEK", "MONTH"];
function TimeRangeTabs({ value: e, onChange: t }) {
  return c.jsx("div", {
    className: "time-range-tabs",
    role: "tablist",
    "aria-label": "기간 선택",
    children: Kv.map((l) => {
      const a = l === e;
      return c.jsx(
        "button",
        {
          type: "button",
          className: `time-range-tabs__button${a ? " is-selected" : ""}`,
          onClick: () => t(l),
          children: kv[l].label,
        },
        l,
      );
    }),
  });
}
const wc = 760,
  Ht = 340,
  et = 32,
  Vc = 24,
  $v = 5,
  br = (e, t, l) => Math.min(Math.max(e, t), l),
  Wv = (e, t, l, a) => {
    const n = Math.max(a, 0),
      u = Math.min($v, l / 2, n / 2);
    return n
      ? u === 0
        ? `M ${e} ${t} H ${e + l} V ${t + n} H ${e} Z`
        : [
            `M ${e} ${t + n}`,
            `V ${t + u}`,
            `Q ${e} ${t} ${e + u} ${t}`,
            `H ${e + l - u}`,
            `Q ${e + l} ${t} ${e + l} ${t + u}`,
            `V ${t + n}`,
            "Z",
          ].join(" ")
      : "";
  };
function TrendChart({ points: e }) {
  const [t, l] = j.useState(null),
    a = Math.max(...e.map((y) => y.visitors), 1),
    n = Math.max(...e.map((y) => y.inquiries), 1),
    i = Math.max(a, n) || 1,
    s = j.useMemo(
      () =>
        e.map((y, h) => {
          const m = et + (h * (wc - et * 2)) / Math.max(e.length - 1, 1),
            A = Ht - et - (y.visitors / i) * (Ht - et * 2),
            N = Ht - et - (y.inquiries / i) * (Ht - et * 2);
          return { ...y, x: m, visitorY: A, inquiryY: N };
        }),
      [e, i],
    ),
    f = s
      .map((y, h) => `${h === 0 ? "M" : "L"} ${y.x} ${y.inquiryY}`)
      .join(" "),
    r = (y, h) => {
      var d;
      const m =
        (d = y.currentTarget.ownerSVGElement) == null
          ? void 0
          : d.getBoundingClientRect();
      if (!m) return;
      const A = y.clientX - m.left + 14,
        N = y.clientY - m.top - 14,
        R = br(A, 12, Math.max(m.width - 208, 12)),
        o = br(N, 12, Math.max(m.height - 104, 12));
      l({ point: h, left: R, top: o });
    };
  if (!s.length)
    return c.jsxs("div", {
      className: "trend-chart trend-chart--empty",
      children: [
        c.jsx("div", {
          className: "trend-chart__empty",
          children: "표시할 차트 데이터가 없습니다.",
        }),
        c.jsxs("div", {
          className: "trend-chart__legend",
          children: [
            c.jsxs("span", {
              className: "trend-chart__legend-item",
              children: [
                c.jsx("span", {
                  className:
                    "trend-chart__legend-dot trend-chart__legend-dot--bar",
                }),
                c.jsx("span", { children: "접속자 수" }),
              ],
            }),
            c.jsxs("span", {
              className: "trend-chart__legend-item",
              children: [
                c.jsx("span", { className: "trend-chart__legend-dot" }),
                c.jsx("span", { children: "문의 수" }),
              ],
            }),
          ],
        }),
      ],
    });
  const b = t == null ? void 0 : t.point;
  return c.jsxs("div", {
    className: "trend-chart",
    children: [
      c.jsxs("div", {
        className: "trend-chart__stage",
        children: [
          c.jsxs("svg", {
            viewBox: `0 0 ${wc} ${Ht}`,
            className: "trend-chart__svg",
            role: "img",
            children: [
              [0, 1, 2, 3, 4].map((y) => {
                const h = et + (y * (Ht - et * 2)) / 4;
                return c.jsx(
                  "line",
                  {
                    x1: et,
                    y1: h,
                    x2: wc - et,
                    y2: h,
                    className: "trend-chart__grid",
                  },
                  y,
                );
              }),
              s.map((y) => {
                const h = y.x - Vc / 2,
                  m = Ht - et - y.visitorY,
                  A = Wv(h, y.visitorY, Vc, m);
                return c.jsxs(
                  "g",
                  {
                    className: "trend-chart__bar-group",
                    onMouseEnter: (N) => r(N, y),
                    onMouseMove: (N) => r(N, y),
                    onMouseLeave: () => l(null),
                    children: [
                      c.jsx("path", { d: A, className: "trend-chart__bar" }),
                      c.jsx("rect", {
                        x: h - 4,
                        y: y.visitorY,
                        width: Vc + 8,
                        height: m,
                        fill: "transparent",
                        className: "trend-chart__bar-hitarea",
                      }),
                      c.jsx("text", {
                        x: y.x,
                        y: Ht - 8,
                        textAnchor: "middle",
                        className: "trend-chart__label",
                        children: y.label,
                      }),
                    ],
                  },
                  `${y.label}-bar`,
                );
              }),
              c.jsx("path", { d: f, className: "trend-chart__path" }),
              s.map((y) =>
                c.jsxs(
                  "g",
                  {
                    className: "trend-chart__point-group",
                    onMouseEnter: (h) => r(h, y),
                    onMouseMove: (h) => r(h, y),
                    onMouseLeave: () => l(null),
                    children: [
                      c.jsx("circle", {
                        cx: y.x,
                        cacheQaRecords: y.inquiryY,
                        r: "5",
                        className: "trend-chart__point",
                      }),
                      c.jsx("circle", {
                        cx: y.x,
                        cacheQaRecords: y.inquiryY,
                        r: "10",
                        fill: "transparent",
                      }),
                    ],
                  },
                  y.label,
                ),
              ),
            ],
          }),
          b && t
            ? c.jsxs("div", {
                className: "trend-chart__tooltip",
                style: { left: t.left, top: t.top },
                "aria-live": "polite",
                children: [
                  c.jsx("span", {
                    className: "trend-chart__tooltip-date",
                    children: b.dateLabel,
                  }),
                  c.jsxs("strong", {
                    children: [b.visitors.toLocaleString(), " 접속자"],
                  }),
                  c.jsxs("span", {
                    children: [b.inquiries.toLocaleString(), " 문의"],
                  }),
                ],
              })
            : null,
        ],
      }),
      c.jsxs("div", {
        className: "trend-chart__legend",
        children: [
          c.jsxs("span", {
            className: "trend-chart__legend-item",
            children: [
              c.jsx("span", {
                className:
                  "trend-chart__legend-dot trend-chart__legend-dot--bar",
              }),
              c.jsx("span", { children: "접속자 수" }),
            ],
          }),
          c.jsxs("span", {
            className: "trend-chart__legend-item",
            children: [
              c.jsx("span", { className: "trend-chart__legend-dot" }),
              c.jsx("span", { children: "문의 수" }),
            ],
          }),
        ],
      }),
    ],
  });
}
function DashboardView({ data: e }) {
  const [t, l] = j.useState(e.selectedRange),
    a = DASHBOARD_SECTIONS[t];
  return c.jsxs("div", {
    className: "dashboard-grid",
    children: [
      c.jsxs("section", {
        className: "panel panel--main",
        children: [
          c.jsx(SectionHeader, {
            title: "기간별 지표 현황",
            actions: c.jsx("div", {
              className: "dashboard-header-actions",
              children: c.jsx(TimeRangeTabs, { value: t, onChange: l }),
            }),
          }),
          c.jsx("div", {
            className: "metric-card-grid",
            children: a.metrics.map((n) => c.jsx(MetricCard, { metric: n }, n.key)),
          }),
          c.jsx(TrendChart, { points: a.trend }),
        ],
      }),
      c.jsxs("section", {
        className: "dashboard-side",
        children: [
          c.jsx(KeywordList, { title: "질문 키워드", items: e.fixedKeywords }),
          c.jsx(FeedbackRatio, { data: e.fixedFeedbackRatio }),
        ],
      }),
    ],
  });
}
const contentDocuments = [
  {
    id: "doc-001",
    name: "챗봇 운영 매뉴얼",
    type: "MANUAL",
    path: "/rag/manual/chatbot-operations",
    author: "박운영",
    createdAt: "2026-03-28 09:10",
    updatedAt: "2026-04-01 14:22",
    status: "ACTIVE",
    fileName: "chatbot-operations.pdf",
    fileSize: "12.4MB",
    history: [
      {
        id: "hist-001",
        version: "v3",
        actor: "박운영",
        action: "수정",
        reason: "업무 프로세스 변경 반영",
        occurredAt: "2026-04-01 14:22",
      },
      {
        id: "hist-002",
        version: "v2",
        actor: "김관리",
        action: "업로드",
        reason: "초기 반영",
        occurredAt: "2026-03-28 09:10",
      },
    ],
  },
  {
    id: "doc-002",
    name: "FAQ 응답 모음",
    type: "FAQ",
    path: "/rag/faq/common-questions",
    author: "박운영",
    createdAt: "2026-03-30 11:05",
    updatedAt: "2026-04-02 10:40",
    status: "ACTIVE",
    fileName: "faq-collection.docx",
    fileSize: "2.1MB",
    history: [
      {
        id: "hist-003",
        version: "v2",
        actor: "박운영",
        action: "수정",
        reason: "질문 분류 보완",
        occurredAt: "2026-04-02 10:40",
      },
    ],
  },
  {
    id: "doc-003",
    name: "수납 안내서",
    type: "MANUAL",
    path: "/rag/manual/payment-guide",
    author: "김관리",
    createdAt: "2026-03-25 16:20",
    updatedAt: "2026-03-29 08:15",
    status: "ACTIVE",
    fileName: "payment-guide.md",
    fileSize: "0.8MB",
    history: [
      {
        id: "hist-004",
        version: "v1",
        actor: "김관리",
        action: "업로드",
        reason: "신규 등록",
        occurredAt: "2026-03-25 16:20",
      },
    ],
  },
  {
    id: "doc-004",
    name: "차량등록 FAQ",
    type: "FAQ",
    path: "/rag/faq/vehicle-registration",
    author: "박운영",
    createdAt: "2026-03-20 13:35",
    updatedAt: "2026-03-20 13:35",
    status: "FAILED",
    fileName: "vehicle-registration.txt",
    fileSize: "0.2MB",
    history: [
      {
        id: "hist-005",
        version: "v1",
        actor: "박운영",
        action: "업로드 실패",
        reason: "파싱 오류",
        occurredAt: "2026-03-20 13:35",
      },
    ],
  },
];
async function createContentDocument(e) {
  return {
    id: `doc-${Date.now()}`,
    name: e.fileName.replace(/\.[^.]+$/, ""),
    type: e.type,
    path: e.path,
    author: "박운영",
    createdAt: "2026-04-02 09:00",
    updatedAt: "2026-04-02 09:00",
    status: "ACTIVE",
    fileName: e.fileName,
    fileSize: "0MB",
    history: [
      {
        id: `hist-${Date.now()}`,
        version: "v1",
        actor: "박운영",
        action: "업로드",
        reason: "신규 등록",
        occurredAt: "2026-04-02 09:00",
      },
    ],
  };
}
function DetailFrame({
  title: e,
  actions: t,
  children: l,
  className: a,
  bodyClassName: n,
  titleAs: u = "h3",
}) {
  return c.jsxs("section", {
    className: `detail-frame${a ? ` ${a}` : ""}`,
    children: [
      c.jsx(SectionHeader, {
        title: e,
        actions: t,
        className: "detail-frame__header",
        titleAs: u,
      }),
      c.jsx("div", {
        className: `detail-frame__body${n ? ` ${n}` : ""}`,
        children: l,
      }),
    ],
  });
}
function ToastStack({ items: e }) {
  return e.length === 0
    ? null
    : c.jsx("div", {
        className: "toast-stack",
        "aria-live": "polite",
        "aria-atomic": "true",
        children: e.map((t) =>
          c.jsx(
            "div",
            {
              className: `toast toast--${t.tone}`,
              role: "status",
              children: t.message,
            },
            t.key,
          ),
        ),
      });
}
function yn(e = 3e3) {
  const [t, l] = j.useState(null);
  j.useEffect(() => {
    if (!t) return;
    const u = window.setTimeout(() => l(null), e);
    return () => window.clearTimeout(u);
  }, [e, t]);
  const a = j.useCallback((u) => {
      l(u);
    }, []),
    n = j.useCallback(() => {
      l(null);
    }, []);
  return { message: t, showMessage: a, clearMessage: n };
}
const contentTypeOptions = [
    { label: "전체", value: "ALL" },
    { label: "매뉴얼", value: "MANUAL" },
    { label: "FAQ", value: "FAQ" },
  ],
  contentStatusLabels = { ACTIVE: "정상", FAILED: "실패" },
  Qc = { fileName: "", path: "", type: "MANUAL" },
  allowedFileExtensions = ".pdf,.docx,.txt,.md",
  messageDurationMs = 3e3,
  sortContentDocuments = (e, t) => Bu(e.updatedAt, t.updatedAt) || Bu(e.createdAt, t.createdAt);
function ContentManagementView({ documents: e }) {
  var Z, ue;
  const t = j.useRef(null),
    l = e.slice().sort(sortContentDocuments),
    [a, n] = j.useState({ keyword: "", type: "ALL" }),
    [u, i] = j.useState(""),
    [s, f] = j.useState(() => l),
    [r, b] = j.useState(((Z = l[0]) == null ? void 0 : Z.id) ?? ""),
    [y, h] = j.useState(!1),
    [m, A] = j.useState(!1),
    [N, R] = j.useState("CREATE"),
    [o, d] = j.useState(null),
    v = yn(messageDurationMs),
    g = yn(messageDurationMs),
    [E, C] = j.useState(""),
    [T, D] = j.useState(Qc),
    S = j.useMemo(() => {
      const M = a.keyword.trim().toLowerCase();
      return s
        .filter((X) => {
          const il =
              M.length === 0 ||
              X.name.toLowerCase().includes(M) ||
              X.path.toLowerCase().includes(M),
            Pe = a.type === "ALL" || X.type === a.type;
          return il && Pe;
        })
        .sort(sortContentDocuments);
    }, [a.keyword, a.type, s]),
    _ = S.find((M) => M.id === r) ?? S[0] ?? null,
    te =
      T.fileName.trim().length > 0 &&
      T.path.trim().length > 0 &&
      E.trim().length > 0,
    De = () => {
      n((M) => ({ ...M, keyword: u.trim() }));
    },
    Q = () => {
      (i(""), n((M) => ({ ...M, keyword: "", type: "ALL" })));
    },
    se = () => {
      (R("CREATE"),
        d(null),
        D(Qc),
        C(""),
        g.clearMessage(),
        t.current && (t.current.value = ""),
        h(!0));
    },
    xe = () => {
      _ &&
        (R("EDIT"),
        d(_.id),
        D({ fileName: _.fileName, path: _.path, type: _.type }),
        C(_.fileName),
        g.clearMessage(),
        t.current && (t.current.value = ""),
        h(!0));
    },
    x = () => {
      (h(!1), d(null), C(""), t.current && (t.current.value = ""));
    },
    z = async () => {
      if (!te) {
        g.showMessage("파일과 경로를 모두 입력해 주세요.");
        return;
      }
      const M = await createContentDocument(T),
        X = new Date().toLocaleString("sv-SE").slice(0, 16).replace("T", " ");
      if (N === "CREATE" || !o) {
        const Pe = [
          { ...M, status: "ACTIVE", createdAt: X, updatedAt: X },
          ...s,
        ].sort(sortContentDocuments);
        (f(Pe), b(M.id), v.showMessage("문서 업로드가 완료되었습니다."));
      } else
        (f((il) =>
          il
            .map((Pe) => {
              if (Pe.id !== o) return Pe;
              const Hh = `v${Pe.history.length + 1}`;
              return {
                ...Pe,
                name: M.name,
                fileName: M.fileName,
                path: M.path,
                type: M.type,
                status: "ACTIVE",
                updatedAt: X,
                history: [
                  {
                    id: `hist-${Date.now()}`,
                    version: Hh,
                    actor: "관리자",
                    action: "수정",
                    reason: "기존 문서 수정",
                    occurredAt: X,
                  },
                  ...Pe.history,
                ],
              };
            })
            .sort(sortContentDocuments),
        ),
          b(o),
          v.showMessage("문서가 수정되었습니다."));
      (g.clearMessage(), x(), D(Qc));
    },
    U = () => {
      _ &&
        (f((M) => {
          var il;
          const X = M.filter((Pe) => Pe.id !== _.id).sort(sortContentDocuments);
          return (b(((il = X[0]) == null ? void 0 : il.id) ?? ""), X);
        }),
        A(!1),
        v.showMessage("문서 삭제가 완료되었습니다."));
    },
    $ = () => {
      _ && v.showMessage("문서 다운로드를 준비했습니다.");
    },
    O = (M) => {
      if (!M) {
        (C(""), D((X) => ({ ...X, fileName: "" })));
        return;
      }
      (C(M.name), D((X) => ({ ...X, fileName: M.name })));
    },
    Y = [
      ...(v.message
        ? [{ key: "content-success", tone: "success", message: v.message }]
        : []),
      ...(g.message
        ? [{ key: "content-error", tone: "error", message: g.message }]
        : []),
    ];
  return c.jsxs("div", {
    className: "page-content page-content--fill content-page",
    children: [
      c.jsx(ToastStack, { items: Y }),
      c.jsxs("div", {
        className: "content-grid",
        children: [
          c.jsxs("section", {
            className: "content-table-card",
            children: [
              c.jsx(SectionHeader, {
                title: "문서 목록",
                actions: c.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: se,
                  children: "문서 업로드",
                }),
                className:
                  "content-table-card__header content-table-card__header--list",
              }),
              c.jsxs("form", {
                className:
                  "content-toolbar content-toolbar--content content-table-card__toolbar",
                onSubmit: (M) => {
                  (M.preventDefault(), De());
                },
                children: [
                  c.jsxs("label", {
                    className:
                      "field content-toolbar__field content-toolbar__field--select",
                    children: [
                      c.jsx("span", {
                        className: "field__label",
                        children: "문서 유형",
                      }),
                      c.jsx("select", {
                        className: "field__input",
                        value: a.type,
                        onChange: (M) =>
                          n((X) => ({ ...X, type: M.target.value })),
                        children: contentTypeOptions.map((M) =>
                          c.jsx(
                            "option",
                            { value: M.value, children: M.label },
                            M.value,
                          ),
                        ),
                      }),
                    ],
                  }),
                  c.jsxs("label", {
                    className:
                      "field content-toolbar__field content-toolbar__field--search",
                    children: [
                      c.jsx("span", {
                        className: "field__label",
                        children: "문서명 검색",
                      }),
                      c.jsx("input", {
                        className: "field__input",
                        type: "search",
                        value: u,
                        onChange: (M) => i(M.target.value),
                        placeholder: "2자 이상 입력",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "content-toolbar__actions",
                    children: [
                      c.jsx("button", {
                        type: "submit",
                        className: "primary-button content-toolbar__button",
                        children: "검색",
                      }),
                      c.jsx("button", {
                        type: "button",
                        className: "secondary-button content-toolbar__button",
                        onClick: Q,
                        children: "초기화",
                      }),
                    ],
                  }),
                ],
              }),
              c.jsx("div", {
                className: "content-table-scroll",
                children: c.jsxs("table", {
                  className: "content-table",
                  children: [
                    c.jsx("thead", {
                      children: c.jsxs("tr", {
                        children: [
                          c.jsx("th", { children: "문서명" }),
                          c.jsx("th", { children: "유형" }),
                          c.jsx("th", { children: "등록자" }),
                          c.jsx("th", { children: "등록일" }),
                          c.jsx("th", { children: "수정일" }),
                          c.jsx("th", { children: "상태" }),
                        ],
                      }),
                    }),
                    c.jsx("tbody", {
                      children:
                        S.length === 0
                          ? c.jsx("tr", {
                              children: c.jsx("td", {
                                colSpan: 6,
                                className: "content-empty",
                                children: "조건에 맞는 문서가 없습니다.",
                              }),
                            })
                          : S.map((M) =>
                              c.jsxs(
                                "tr",
                                {
                                  className:
                                    M.id === (_ == null ? void 0 : _.id)
                                      ? "is-selected"
                                      : "",
                                  onClick: () => b(M.id),
                                  children: [
                                    c.jsxs("td", {
                                      children: [
                                        c.jsx("div", {
                                          className: "content-table__title",
                                          children: M.name,
                                        }),
                                        c.jsx("div", {
                                          className: "content-table__sub",
                                          children: M.path,
                                        }),
                                      ],
                                    }),
                                    c.jsx("td", {
                                      children:
                                        M.type === "MANUAL" ? "매뉴얼" : "FAQ",
                                    }),
                                    c.jsx("td", { children: M.author }),
                                    c.jsx("td", { children: M.createdAt }),
                                    c.jsx("td", { children: M.updatedAt }),
                                    c.jsx("td", {
                                      children: c.jsx("span", {
                                        className: `status-badge status-badge--${M.status.toLowerCase()}`,
                                        children: contentStatusLabels[M.status],
                                      }),
                                    }),
                                  ],
                                },
                                M.id,
                              ),
                            ),
                    }),
                  ],
                }),
              }),
            ],
          }),
          c.jsx(DetailFrame, {
            className: "content-detail-card",
            title: "문서 상세",
            actions: _
              ? c.jsx("span", {
                  className: `status-badge status-badge--${_.status.toLowerCase()}`,
                  children: contentStatusLabels[_.status],
                })
              : null,
            children: _
              ? c.jsxs("div", {
                  className: "content-detail-scroll",
                  children: [
                    c.jsx("div", {
                      className: "content-detail__name-card",
                      children: c.jsxs("div", {
                        className: "content-detail__identity",
                        children: [
                          c.jsx("h3", {
                            className: "content-detail__title",
                            children: _.name,
                          }),
                          c.jsx("span", {
                            className: "content-detail__type-pill",
                            children: _.type === "MANUAL" ? "매뉴얼" : "FAQ",
                          }),
                        ],
                      }),
                    }),
                    c.jsxs("dl", {
                      className: "content-detail__list",
                      children: [
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "저장 경로" }),
                            c.jsx("dd", { children: _.path }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "파일 크기" }),
                            c.jsx("dd", { children: _.fileSize }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "등록자" }),
                            c.jsx("dd", { children: _.author }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "등록일" }),
                            c.jsx("dd", { children: _.createdAt }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "수정자" }),
                            c.jsx("dd", {
                              children:
                                ((ue = _.history[0]) == null
                                  ? void 0
                                  : ue.actor) ?? _.author,
                            }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "수정일" }),
                            c.jsx("dd", { children: _.updatedAt }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "content-detail-actions",
                      children: [
                        c.jsx("button", {
                          type: "button",
                          className: "secondary-button",
                          onClick: $,
                          children: "다운로드",
                        }),
                        c.jsx("button", {
                          type: "button",
                          className: "secondary-button",
                          onClick: xe,
                          children: "수정",
                        }),
                        c.jsx("button", {
                          type: "button",
                          className: "danger-button",
                          onClick: () => A(!0),
                          children: "삭제",
                        }),
                      ],
                    }),
                    c.jsxs("section", {
                      className: "content-history",
                      children: [
                        c.jsx("h4", { children: "변경 이력" }),
                        c.jsx("ul", {
                          children: _.history.map((M) =>
                            c.jsxs(
                              "li",
                              {
                                children: [
                                  c.jsx("strong", { children: M.version }),
                                  c.jsxs("span", {
                                    children: [
                                      M.actor,
                                      " · ",
                                      M.action,
                                      " · ",
                                      M.occurredAt,
                                    ],
                                  }),
                                  c.jsx("p", { children: M.reason }),
                                ],
                              },
                              M.id,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                })
              : c.jsx("div", {
                  className: "content-empty content-empty--detail",
                  children: "선택한 문서가 없습니다.",
                }),
          }),
        ],
      }),
      y
        ? c.jsxs(nl, {
            title: N === "EDIT" ? "문서 수정 업로드" : "문서 업로드",
            ariaLabel: N === "EDIT" ? "문서 수정 업로드" : "문서 업로드",
            onClose: x,
            size: "lg",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: x,
                  children: "취소",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: z,
                  disabled: !te,
                  children: N === "EDIT" ? "수정 저장" : "저장",
                }),
              ],
            }),
            children: [
              c.jsxs("label", {
                className: "field",
                children: [
                  c.jsx("span", {
                    className: "field__label",
                    children: "파일 선택 *",
                  }),
                  c.jsx("input", {
                    ref: t,
                    className: "field__input content-file-input",
                    type: "file",
                    accept: allowedFileExtensions,
                    onChange: (M) => {
                      var X;
                      return O((X = M.target.files) == null ? void 0 : X[0]);
                    },
                  }),
                  c.jsx("span", {
                    className: "content-file-name",
                    children: E ? `선택한 파일: ${E}` : "파일을 선택해 주세요.",
                  }),
                ],
              }),
              c.jsxs("label", {
                className: "field",
                children: [
                  c.jsx("span", {
                    className: "field__label",
                    children: "저장 경로",
                  }),
                  c.jsx("input", {
                    className: "field__input",
                    value: T.path,
                    onChange: (M) => D((X) => ({ ...X, path: M.target.value })),
                    placeholder: "/rag/manual/chatbot-guide",
                  }),
                ],
              }),
              c.jsxs("label", {
                className: "field",
                children: [
                  c.jsx("span", {
                    className: "field__label",
                    children: "문서 유형",
                  }),
                  c.jsxs("select", {
                    className: "field__input",
                    value: T.type,
                    onChange: (M) => D((X) => ({ ...X, type: M.target.value })),
                    children: [
                      c.jsx("option", { value: "MANUAL", children: "매뉴얼" }),
                      c.jsx("option", { value: "FAQ", children: "FAQ" }),
                    ],
                  }),
                ],
              }),
            ],
          })
        : null,
      m
        ? c.jsx(nl, {
            title: "문서 삭제 확인",
            ariaLabel: "문서 삭제 확인",
            onClose: () => A(!1),
            size: "sm",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => A(!1),
                  children: "취소",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "danger-button",
                  onClick: U,
                  children: "삭제",
                }),
              ],
            }),
            children: c.jsx("p", {
              className: "content-confirm",
              children:
                "문서를 삭제하면 목록에서 사라집니다. 복구 작업은 별도로 제공되지 않습니다.",
            }),
          })
        : null,
    ],
  });
}
function ListPanel({
  title: e,
  actions: t,
  toolbar: l,
  footer: a,
  className: n,
  children: u,
}) {
  return c.jsxs("section", {
    className: `list-panel${n ? ` ${n}` : ""}`,
    children: [
      c.jsx(SectionHeader, { title: e, actions: t, className: "list-panel__header" }),
      l
        ? c.jsx("div", { className: "list-panel__toolbar", children: l })
        : null,
      c.jsx("div", { className: "list-panel__body", children: u }),
      a ? c.jsx("div", { className: "list-panel__footer", children: a }) : null,
    ],
  });
}
function ny(e, t) {
  if (t <= 7) return Array.from({ length: t }, (u, i) => i + 1);
  const l = [1];
  e > 4 && l.push(null);
  const a = Math.max(2, e - 1),
    n = Math.min(t - 1, e + 1);
  for (let u = a; u <= n; u += 1) l.push(u);
  return (e < t - 3 && l.push(null), l.push(t), l);
}
function Pagination({ page: e, totalPages: t, onChange: l }) {
  const a = Math.max(1, t),
    n = Math.min(Math.max(e, 1), a),
    u = ny(n, a);
  return c.jsxs("nav", {
    className: "pagination",
    "aria-label": "페이지네이션",
    children: [
      c.jsx("button", {
        type: "button",
        className: "pagination__button",
        disabled: n === 1,
        onClick: () => l(n - 1),
        children: "이전",
      }),
      u.map((i, s) =>
        i === null
          ? c.jsx(
              "span",
              {
                className: "pagination__ellipsis",
                "aria-hidden": "true",
                children: "...",
              },
              `ellipsis-${s}`,
            )
          : c.jsx(
              "button",
              {
                type: "button",
                className: `pagination__button${n === i ? " is-active" : ""}`,
                "aria-current": n === i ? "page" : void 0,
                onClick: () => l(i),
                children: i,
              },
              i,
            ),
      ),
      c.jsx("button", {
        type: "button",
        className: "pagination__button",
        disabled: n === a,
        onClick: () => l(n + 1),
        children: "다음",
      }),
    ],
  });
}
const Ys = () =>
    new Date().toLocaleString("sv-SE").slice(0, 16).replace("T", " "),
  cacheQaRecords = [
    {
      id: "cache-001",
      question: "배송은 언제 도착하나요?",
      answer:
        "일반 배송은 결제 완료 후 2~3영업일 내 도착합니다. 지역과 상품에 따라 차이가 있습니다.",
      status: "ACTIVE",
      createdAt: "2026-04-01 09:10",
      updatedAt: "2026-04-02 11:40",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 182,
      lastMatchedAt: "2026-04-03 09:18",
    },
    {
      id: "cache-002",
      question: "주문을 취소하고 싶어요",
      answer:
        "배송 전 주문은 마이페이지에서 직접 취소할 수 있습니다. 배송 후에는 반품 절차로 진행됩니다.",
      status: "ACTIVE",
      createdAt: "2026-04-01 10:22",
      updatedAt: "2026-04-03 08:12",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 145,
      lastMatchedAt: "2026-04-03 09:40",
    },
    {
      id: "cache-003",
      question: "비밀번호를 재설정하려면 어떻게 하나요?",
      answer:
        "로그인 화면의 비밀번호 찾기 버튼을 눌러 등록된 이메일 또는 휴대폰 인증 후 재설정할 수 있습니다.",
      status: "ACTIVE",
      createdAt: "2026-04-01 13:05",
      updatedAt: "2026-04-02 15:55",
      createdBy: "운영팀",
      updatedBy: "운영팀",
      hitCount: 96,
      lastMatchedAt: "2026-04-03 08:05",
    },
    {
      id: "cache-004",
      question: "환불은 얼마나 걸리나요?",
      answer: "환불 승인 후 카드사 및 결제수단에 따라 3~7영업일이 소요됩니다.",
      status: "ACTIVE",
      createdAt: "2026-04-01 15:18",
      updatedAt: "2026-04-01 15:18",
      createdBy: "운영팀",
      updatedBy: "운영팀",
      hitCount: 74,
      lastMatchedAt: "2026-04-03 07:55",
    },
    {
      id: "cache-005",
      question: "회원 탈퇴는 어디서 하나요?",
      answer:
        "마이페이지 > 계정 설정 > 회원 탈퇴에서 진행할 수 있습니다. 탈퇴 후 복구는 불가합니다.",
      status: "INACTIVE",
      createdAt: "2026-03-30 11:30",
      updatedAt: "2026-04-02 10:30",
      createdBy: "관리자",
      updatedBy: "운영팀",
      hitCount: 61,
      lastMatchedAt: "2026-04-02 14:20",
    },
    {
      id: "cache-006",
      question: "영수증을 다시 받을 수 있나요?",
      answer:
        "주문 상세 화면에서 영수증 재발급을 눌러 이메일로 다시 받을 수 있습니다.",
      status: "ACTIVE",
      createdAt: "2026-03-29 09:45",
      updatedAt: "2026-04-02 09:10",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 53,
      lastMatchedAt: "2026-04-03 07:12",
    },
    {
      id: "cache-007",
      question: "쿠폰은 어디서 적용하나요?",
      answer:
        "결제 단계의 쿠폰 입력란에서 보유 쿠폰을 선택하거나 쿠폰 코드를 입력할 수 있습니다.",
      status: "ACTIVE",
      createdAt: "2026-03-28 16:00",
      updatedAt: "2026-04-02 12:00",
      createdBy: "운영팀",
      updatedBy: "운영팀",
      hitCount: 117,
      lastMatchedAt: "2026-04-03 06:58",
    },
    {
      id: "cache-008",
      question: "주문 조회가 안 돼요",
      answer:
        "주문 번호와 연락처가 일치하는지 확인해 주세요. 그래도 조회되지 않으면 고객센터에 문의해 주세요.",
      status: "ACTIVE",
      createdAt: "2026-03-28 18:20",
      updatedAt: "2026-04-01 16:05",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 88,
      lastMatchedAt: "2026-04-03 09:00",
    },
    {
      id: "cache-009",
      question: "배송 주소를 수정하고 싶어요",
      answer:
        "결제 완료 직후에는 주문 상세에서 주소 수정이 가능하며, 출고 이후에는 수정이 불가합니다.",
      status: "INACTIVE",
      createdAt: "2026-03-27 14:12",
      updatedAt: "2026-04-01 13:55",
      createdBy: "운영팀",
      updatedBy: "운영팀",
      hitCount: 34,
      lastMatchedAt: "2026-04-01 14:05",
    },
    {
      id: "cache-010",
      question: "결제 수단을 변경할 수 있나요?",
      answer:
        "결제 완료 전에는 수단 변경이 가능하며, 이미 결제된 주문은 취소 후 재주문해야 합니다.",
      status: "ACTIVE",
      createdAt: "2026-03-27 09:40",
      updatedAt: "2026-04-02 17:25",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 69,
      lastMatchedAt: "2026-04-03 08:45",
    },
    {
      id: "cache-011",
      question: "환불 계좌 정보는 어디서 확인하나요?",
      answer:
        "환불 신청 화면에서 등록된 환불 계좌를 확인할 수 있으며, 필요 시 변경 가능합니다.",
      status: "ACTIVE",
      createdAt: "2026-03-26 11:10",
      updatedAt: "2026-04-03 09:05",
      createdBy: "운영팀",
      updatedBy: "관리자",
      hitCount: 41,
      lastMatchedAt: "2026-04-03 09:12",
    },
    {
      id: "cache-012",
      question: "상품 교환은 어떻게 진행되나요?",
      answer:
        "교환 사유를 접수한 후 회수 및 재발송 절차로 진행되며, 상품 상태에 따라 승인 여부가 달라집니다.",
      status: "INACTIVE",
      createdAt: "2026-03-25 15:35",
      updatedAt: "2026-04-01 18:10",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 27,
      lastMatchedAt: null,
    },
  ],
  Il = (e) =>
    e
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/[^0-9a-z가-힣]/gi, ""),
  iy = (e, t) => {
    const l = Il(e),
      a = Il(t);
    if (!l && !a) return 1;
    if (!l || !a) return 0;
    if (l === a) return 1;
    const n = Array.from({ length: l.length + 1 }, (i, s) =>
      Array.from({ length: a.length + 1 }, (f, r) =>
        s === 0 ? r : r === 0 ? s : 0,
      ),
    );
    for (let i = 1; i <= l.length; i += 1)
      for (let s = 1; s <= a.length; s += 1) {
        const f = l[i - 1] === a[s - 1] ? 0 : 1;
        n[i][s] = Math.min(
          n[i - 1][s] + 1,
          n[i][s - 1] + 1,
          n[i - 1][s - 1] + f,
        );
      }
    return 1 - n[l.length][a.length] / Math.max(l.length, a.length);
  },
  findCacheQaDuplicate = (e, t, l) => {
    let n = null;
    for (const u of e) {
      if (l && u.id === l) continue;
      const i = Math.max(
        iy(u.question, t),
        Il(u.question).includes(Il(t)) ? 0.92 : 0,
        Il(t).includes(Il(u.question)) ? 0.92 : 0,
      );
      i >= 0.85 && (!n || i > n.score) && (n = { item: u, score: i });
    }
    return n;
  },
  createCacheQaEntry = async (e, t = "관리자") => {
    const l = Ys();
    return {
      id: `cache-${Date.now()}`,
      question: e.question.trim(),
      answer: e.answer.trim(),
      status: e.status,
      createdAt: l,
      updatedAt: l,
      createdBy: t,
      updatedBy: t,
      hitCount: 0,
      lastMatchedAt: null,
    };
  },
  updateCacheQaEntry = async (e, t, l = "관리자") => {
    const a = Ys();
    return {
      ...e,
      question: t.question.trim(),
      answer: t.answer.trim(),
      status: t.status,
      updatedAt: a,
      updatedBy: l,
    };
  },
  toggleCacheQaEntryStatus = async (e, t, l = "관리자") => {
    const a = Ys();
    return { ...e, status: t, updatedAt: a, updatedBy: l };
  },
  Gc = 10,
  Sr = 500,
  Ar = 2e3,
  xr = 3e3,
  Er = { ACTIVE: "활성", INACTIVE: "비활성" },
  dy = [
    { label: "전체", value: "ALL" },
    { label: "활성", value: "ACTIVE" },
    { label: "비활성", value: "INACTIVE" },
  ],
  Hl = { question: "", answer: "", status: "ACTIVE" },
  ql = (e, t) => Bu(e.createdAt, t.createdAt);
function CacheAnswerManagementView({ items: e }) {
  var $;
  const [t, l] = j.useState(e.slice().sort(ql)),
    [a, n] = j.useState({ keyword: "", status: "ALL" }),
    [u, i] = j.useState(""),
    [s, f] = j.useState((($ = e[0]) == null ? void 0 : $.id) ?? null),
    [r, b] = j.useState(1),
    [y, h] = j.useState(!1),
    [m, A] = j.useState("CREATE"),
    [N, R] = j.useState(null),
    [o, d] = j.useState(Hl),
    v = yn(xr),
    g = yn(xr),
    [E, C] = j.useState(!1),
    T = j.useMemo(() => {
      const O = mr(a.keyword);
      return t
        .map((Y) => {
          const Z = mr(Y.question),
            ue = O.length === 0 || Z.includes(O) || O.includes(Z),
            M =
              O.length === 0
                ? 1
                : Math.max(
                    Z === O
                      ? 1
                      : 1 -
                          Math.abs(Z.length - O.length) /
                            Math.max(Z.length, O.length, 1),
                    Z.includes(O) ? 0.92 : 0,
                    O.includes(Z) ? 0.92 : 0,
                  );
          return { item: Y, score: M, exactMatch: ue };
        })
        .filter(({ item: Y, score: Z, exactMatch: ue }) => {
          const M = a.status === "ALL" || Y.status === a.status,
            X = O.length === 0 ? !0 : ue || Z >= 0.35;
          return M && X;
        })
        .sort((Y, Z) =>
          O.length > 0 && Z.score !== Y.score
            ? Z.score - Y.score
            : ql(Y.item, Z.item),
        )
        .map(({ item: Y }) => Y);
    }, [a.keyword, a.status, t]),
    D = Math.max(1, Math.ceil(T.length / Gc)),
    S = T.slice((r - 1) * Gc, r * Gc),
    _ = T.find((O) => O.id === s) ?? null;
  (j.useEffect(() => {
    b((O) => Math.min(O, D));
  }, [D]),
    j.useEffect(() => {
      if (T.length === 0) {
        f(null);
        return;
      }
      (!s || !T.some((O) => O.id === s)) && f(T[0].id);
    }, [T, s]));
  const te = () => {
      (A("CREATE"), R(null), d(Hl), g.clearMessage(), h(!0));
    },
    De = () => {
      _ &&
        (A("EDIT"),
        R(_.id),
        d({ question: _.question, answer: _.answer, status: _.status }),
        g.clearMessage(),
        h(!0));
    },
    Q = () => {
      (h(!1), g.clearMessage());
    },
    se = () => {
      (i(""), n((O) => ({ ...O, keyword: "" })), b(1));
    },
    xe = () => {
      (n((O) => ({ ...O, keyword: u.trim() })), b(1));
    },
    x = async () => {
      if (!o.question.trim() || !o.answer.trim()) {
        g.showMessage("질문과 답변을 모두 입력해 주세요.");
        return;
      }
      if (findCacheQaDuplicate(t, o.question.trim(), N ?? void 0)) {
        g.showMessage("유사한 질문이 이미 등록되어 있습니다.");
        return;
      }
      if (m === "CREATE") {
        const ue = await createCacheQaEntry(o);
        (l((M) => [ue, ...M].sort(ql)),
          f(ue.id),
          v.showMessage("답변이 등록되었습니다."),
          d(Hl),
          Q());
        return;
      }
      if (!N) {
        g.showMessage("수정할 항목을 선택해 주세요.");
        return;
      }
      const Y = t.find((ue) => ue.id === N);
      if (!Y) {
        g.showMessage("수정 대상이 존재하지 않습니다.");
        return;
      }
      const Z = await updateCacheQaEntry(Y, o);
      (l((ue) => ue.map((M) => (M.id === N ? Z : M)).sort(ql)),
        f(Z.id),
        v.showMessage("답변이 수정되었습니다."),
        d(Hl),
        A("CREATE"),
        R(null),
        Q());
    },
    z = async () => {
      if (!_) return;
      const O = _.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
        Y = await toggleCacheQaEntryStatus(_, O);
      (l((Z) => Z.map((ue) => (ue.id === Y.id ? Y : ue)).sort(ql)),
        f(Y.id),
        v.showMessage(
          O === "ACTIVE"
            ? "답변이 활성화되었습니다."
            : "답변이 비활성화되었습니다.",
        ));
    },
    U = () => {
      _ &&
        (l((O) => {
          var Z;
          const Y = O.filter((ue) => ue.id !== _.id).sort(ql);
          return (f(((Z = Y[0]) == null ? void 0 : Z.id) ?? null), Y);
        }),
        C(!1),
        v.showMessage("답변이 삭제되었습니다."),
        A("CREATE"),
        R(null),
        d(Hl));
    };
  return c.jsxs("div", {
    className: "cache-qa-layout",
    children: [
      c.jsx(ToastStack, {
        items: [
          v.message
            ? { key: "cache-qa-success", tone: "success", message: v.message }
            : null,
          g.message
            ? { key: "cache-qa-error", tone: "error", message: g.message }
            : null,
        ].filter((O) => !!O),
      }),
      c.jsxs("div", {
        className: "cache-qa-grid",
        children: [
          c.jsx(ListPanel, {
            className: "cache-qa-list-card",
            title: "캐시 답변 목록",
            actions: c.jsx("button", {
              type: "button",
              className: "primary-button",
              onClick: te,
              children: "캐시 답변 등록",
            }),
            toolbar: c.jsxs("form", {
              className: "cache-qa-toolbar",
              onSubmit: (O) => {
                (O.preventDefault(), xe());
              },
              children: [
                c.jsxs("label", {
                  className: "field cache-qa-field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "질문 검색",
                    }),
                    c.jsx("input", {
                      className: "field__input",
                      type: "search",
                      placeholder: "2자 이상 입력 권장",
                      value: u,
                      onChange: (O) => i(O.target.value),
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field cache-qa-field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "상태",
                    }),
                    c.jsx("select", {
                      className: "field__input",
                      value: a.status,
                      onChange: (O) => {
                        (n((Y) => ({ ...Y, status: O.target.value })), b(1));
                      },
                      children: dy.map((O) =>
                        c.jsx(
                          "option",
                          { value: O.value, children: O.label },
                          O.value,
                        ),
                      ),
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "cache-qa-toolbar__actions",
                  children: [
                    c.jsx("button", {
                      type: "submit",
                      className: "primary-button",
                      children: "검색",
                    }),
                    c.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      onClick: se,
                      children: "초기화",
                    }),
                  ],
                }),
              ],
            }),
            footer: c.jsx(Pagination, { page: r, totalPages: D, onChange: b }),
            children: c.jsx("div", {
              className: "list-panel__scroll cache-qa-list-scroll",
              children:
                S.length === 0
                  ? c.jsx("div", {
                      className: "list-panel__empty",
                      children: "조건에 맞는 답변이 없습니다.",
                    })
                  : c.jsxs("table", {
                      className: "content-table cache-qa-table",
                      children: [
                        c.jsx("thead", {
                          children: c.jsxs("tr", {
                            children: [
                              c.jsx("th", { children: "질문" }),
                              c.jsx("th", { children: "상태" }),
                              c.jsx("th", { children: "등록일" }),
                              c.jsx("th", { children: "수정일" }),
                            ],
                          }),
                        }),
                        c.jsx("tbody", {
                          children: S.map((O) =>
                            c.jsxs(
                              "tr",
                              {
                                className:
                                  O.id === (_ == null ? void 0 : _.id)
                                    ? "is-selected"
                                    : "",
                                onClick: () => f(O.id),
                                children: [
                                  c.jsx("td", {
                                    children: c.jsx("div", {
                                      className: "content-table__title",
                                      children: O.question,
                                    }),
                                  }),
                                  c.jsx("td", {
                                    children: c.jsx("span", {
                                      className: `status-badge status-badge--${O.status.toLowerCase()}`,
                                      children: Er[O.status],
                                    }),
                                  }),
                                  c.jsx("td", { children: O.createdAt }),
                                  c.jsx("td", { children: O.updatedAt }),
                                ],
                              },
                              O.id,
                            ),
                          ),
                        }),
                      ],
                    }),
            }),
          }),
          c.jsx("aside", {
            className: "cache-qa-side",
            children: c.jsx(DetailFrame, {
              className: "cache-qa-detail-card",
              title: "상세 정보",
              actions: _
                ? c.jsx("span", {
                    className: `status-badge status-badge--${_.status.toLowerCase()}`,
                    children: Er[_.status],
                  })
                : null,
              children: _
                ? c.jsxs("div", {
                    className: "cache-qa-detail-scroll",
                    children: [
                      c.jsxs("div", {
                        className: "feedback-conversation-section",
                        children: [
                          c.jsx("p", {
                            className: "feedback-conversation-label",
                            children: "대화 내용",
                          }),
                          c.jsxs("div", {
                            className: "cache-qa-conversation",
                            children: [
                              c.jsxs("div", {
                                className:
                                  "feedback-conversation__turn feedback-conversation__turn--user",
                                children: [
                                  c.jsx("p", {
                                    className: "feedback-conversation__speaker",
                                    children: "질문",
                                  }),
                                  c.jsx("p", {
                                    className: "feedback-conversation__message",
                                    children: _.question,
                                  }),
                                ],
                              }),
                              c.jsxs("div", {
                                className:
                                  "feedback-conversation__turn feedback-conversation__turn--bot",
                                children: [
                                  c.jsx("p", {
                                    className: "feedback-conversation__speaker",
                                    children: "답변",
                                  }),
                                  c.jsx("p", {
                                    className: "feedback-conversation__message",
                                    children: _.answer,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("dl", {
                        className: "content-detail__list cache-qa-meta",
                        children: [
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "등록자" }),
                              c.jsx("dd", { children: _.createdBy }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "등록일" }),
                              c.jsx("dd", { children: _.createdAt }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "수정자" }),
                              c.jsx("dd", { children: _.updatedBy }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "수정일" }),
                              c.jsx("dd", { children: _.updatedAt }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "캐시 조회 수" }),
                              c.jsx("dd", {
                                children: _.hitCount.toLocaleString(),
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "cache-qa-detail-actions",
                        children: [
                          c.jsx("button", {
                            type: "button",
                            className: "secondary-button",
                            onClick: De,
                            children: "수정",
                          }),
                          c.jsx("button", {
                            type: "button",
                            className: "primary-button",
                            onClick: z,
                            disabled: !_,
                            children:
                              _.status === "ACTIVE" ? "비활성화" : "활성화",
                          }),
                          c.jsx("button", {
                            type: "button",
                            className: "danger-button",
                            onClick: () => C(!0),
                            children: "삭제",
                          }),
                        ],
                      }),
                    ],
                  })
                : c.jsx("div", {
                    className: "list-panel__empty cache-qa-empty",
                    children: "답변을 선택하면 상세 정보가 표시됩니다.",
                  }),
            }),
          }),
        ],
      }),
      y
        ? c.jsx(nl, {
            title: m === "EDIT" ? "캐시 답변 수정" : "캐시 답변 등록",
            ariaLabel: m === "EDIT" ? "캐시 답변 수정" : "캐시 답변 등록",
            onClose: Q,
            size: "xl",
            footerClassName: "modal__footer--split",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => {
                    (Q(), d(Hl), A("CREATE"), R(null));
                  },
                  children: "초기화",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: x,
                  children: m === "EDIT" ? "수정 저장" : "등록",
                }),
              ],
            }),
            children: c.jsxs("div", {
              className: "cache-qa-form cache-qa-form--modal",
              children: [
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "질문 *",
                    }),
                    c.jsx("textarea", {
                      className:
                        "field__input knowledge-textarea cache-qa-textarea",
                      rows: 3,
                      maxLength: Sr,
                      value: o.question,
                      placeholder: "캐시 답변용 질문을 입력해 주세요.",
                      onChange: (O) =>
                        d((Y) => ({ ...Y, question: O.target.value })),
                    }),
                    c.jsxs("p", {
                      className: "cache-qa-form__counter",
                      children: [o.question.length, "/", Sr, "자"],
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "답변 *",
                    }),
                    c.jsx("textarea", {
                      className:
                        "field__input knowledge-textarea cache-qa-textarea",
                      rows: 6,
                      maxLength: Ar,
                      value: o.answer,
                      placeholder: "캐시 답변으로 반환할 답변을 입력해 주세요.",
                      onChange: (O) =>
                        d((Y) => ({ ...Y, answer: O.target.value })),
                    }),
                    c.jsxs("p", {
                      className: "cache-qa-form__counter",
                      children: [o.answer.length, "/", Ar, "자"],
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "상태",
                    }),
                    c.jsxs("select", {
                      className: "field__input",
                      value: o.status,
                      onChange: (O) =>
                        d((Y) => ({ ...Y, status: O.target.value })),
                      children: [
                        c.jsx("option", { value: "ACTIVE", children: "활성" }),
                        c.jsx("option", {
                          value: "INACTIVE",
                          children: "비활성",
                        }),
                      ],
                    }),
                  ],
                }),
                g.message
                  ? c.jsx("p", {
                      className: "content-error",
                      children: g.message,
                    })
                  : null,
              ],
            }),
          })
        : null,
      E
        ? c.jsx(nl, {
            title: "캐시 답변 삭제 확인",
            ariaLabel: "캐시 답변 삭제 확인",
            onClose: () => C(!1),
            size: "sm",
            compact: !0,
            footerClassName: "modal__footer--split",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => C(!1),
                  children: "취소",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "danger-button",
                  onClick: U,
                  children: "삭제",
                }),
              ],
            }),
            children: c.jsx("p", {
              className: "content-confirm",
              children: "선택한 답변을 삭제하면 캐시 답변에서 즉시 제외됩니다.",
            }),
          })
        : null,
    ],
  });
}
const knowledgeDocuments = [
  {
    id: "kdoc-001",
    name: "챗봇 운영 매뉴얼",
    type: "MANUAL",
    path: "/rag/manual/chatbot-operations",
  },
  {
    id: "kdoc-002",
    name: "업무 안내서",
    type: "MANUAL",
    path: "/rag/manual/payment-guide",
  },
  {
    id: "kdoc-003",
    name: "FAQ 모음",
    type: "FAQ",
    path: "/rag/faq/common-questions",
  },
  {
    id: "kdoc-004",
    name: "차량등록 FAQ",
    type: "FAQ",
    path: "/rag/faq/vehicle-registration",
  },
];
async function loadKnowledgeDocuments() {
  return { documents: knowledgeDocuments };
}
async function executeKnowledgeQuery(e) {
  const t = knowledgeDocuments.find((l) => l.id === e.documentId);
  return t
    ? {
        answer: `"${e.question}"에 대한 응답입니다.선택하신 문서(${t.name})를 기반으로 관련 내용을 조회한 결과, 해당 내용에 대한 예시 응답을 생성했습니다. 실제 API 연동 시에는 정확한 문맥을 기준으로 응답합니다.`,
        generatedAt: "2026-04-02 10:30:00",
        referenceDocument: { name: t.name, type: t.type, path: t.path },
        referenceParagraph: "chunk-042",
      }
    : null;
}
function KnowledgeQueryView({ documents: e }) {
  const [t, l] = j.useState({ question: "", documentType: "", documentId: "" }),
    [a, n] = j.useState("IDLE"),
    [u, i] = j.useState(null),
    [s, f] = j.useState(!1),
    r = j.useMemo(
      () => (t.documentType ? e.filter((o) => o.type === t.documentType) : e),
      [t.documentType, e],
    ),
    b = t.question.length >= 1 && t.documentType !== "" && t.documentId !== "",
    y = a !== "IDLE",
    h = (o) => {
      l({ ...t, documentType: o, documentId: "" });
    },
    m = async () => {
      (n("LOADING"), i(null));
      try {
        const o = await executeKnowledgeQuery(t);
        (n(o ? "SUCCESS" : "EMPTY"), o && i(o));
      } catch {
        n("ERROR");
      }
    },
    A = () => {
      (n("ERROR"), i(null), f(!1));
    },
    N = () => {
      (l({ question: "", documentType: "", documentId: "" }),
        n("IDLE"),
        i(null),
        f(!1));
    },
    R = () => {
      u &&
        navigator.clipboard.writeText(u.answer).then(() => {
          (f(!0), setTimeout(() => f(!1), 2e3));
        });
    };
  return c.jsx("div", {
    className: "knowledge-layout",
    children: c.jsxs("div", {
      className: "knowledge-grid",
      children: [
        c.jsxs("section", {
          className: "panel panel--main",
          children: [
            c.jsx(SectionHeader, { title: "조회 조건" }),
            c.jsxs("div", {
              className: "knowledge-form",
              children: [
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "문서 유형 *",
                    }),
                    c.jsxs("select", {
                      className: "field__input",
                      value: t.documentType,
                      onChange: (o) => h(o.target.value),
                      children: [
                        c.jsx("option", { value: "", children: "선택하세요" }),
                        c.jsx("option", {
                          value: "MANUAL",
                          children: "매뉴얼",
                        }),
                        c.jsx("option", { value: "FAQ", children: "FAQ" }),
                      ],
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "테스트 문서 *",
                    }),
                    c.jsxs("select", {
                      className: "field__input",
                      value: t.documentId,
                      disabled: !t.documentType,
                      onChange: (o) => l({ ...t, documentId: o.target.value }),
                      children: [
                        c.jsx("option", { value: "", children: "선택하세요" }),
                        r.map((o) =>
                          c.jsx(
                            "option",
                            { value: o.id, children: o.name },
                            o.id,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "질문 입력 *",
                    }),
                    c.jsx("textarea", {
                      className: "field__input knowledge-textarea",
                      value: t.question,
                      maxLength: 1e3,
                      rows: 4,
                      placeholder: "1자 이상 입력 (최대 1000자)",
                      onChange: (o) => l({ ...t, question: o.target.value }),
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "knowledge-action-row",
                  children: [
                    c.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      disabled: !y,
                      onClick: N,
                      children: "초기화",
                    }),
                    c.jsx("button", {
                      type: "button",
                      className: "primary-button",
                      disabled: !b || a === "LOADING",
                      onClick: m,
                      children: a === "LOADING" ? "조회 중" : "조회",
                    }),
                    c.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      onClick: A,
                      children: "오류 보기",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        c.jsxs(DetailFrame, {
          className: "panel panel--main",
          title: "조회 결과",
          children: [
            a === "IDLE" &&
              c.jsx("div", {
                className: "knowledge-result-empty",
                children: "조건을 입력한 뒤 조회를 시작해 주세요.",
              }),
            a === "LOADING" &&
              c.jsx("div", {
                className: "knowledge-result-empty",
                children: "조회 중입니다.",
              }),
            a === "EMPTY" &&
              c.jsx("div", {
                className: "knowledge-result-empty",
                children: "선택한 문서에서 일치하는 답변을 찾지 못했습니다.",
              }),
            a === "ERROR" &&
              c.jsx("div", {
                className: "knowledge-result-empty",
                children: "조회에 실패했습니다. 다시 시도해 주세요.",
              }),
            a === "SUCCESS" &&
              u &&
              c.jsxs("div", {
                className: "knowledge-result-scroll",
                children: [
                  c.jsxs("div", {
                    className: "knowledge-answer",
                    children: [
                      c.jsx("p", {
                        className: "knowledge-answer__text",
                        children: u.answer,
                      }),
                      c.jsxs("p", {
                        className: "knowledge-answer__meta",
                        children: ["생성 시각: ", u.generatedAt],
                      }),
                    ],
                  }),
                  c.jsxs("dl", {
                    className: "content-detail__list knowledge-reference",
                    children: [
                      c.jsxs("div", {
                        children: [
                          c.jsx("dt", { children: "참조 문서" }),
                          c.jsxs("dd", {
                            children: [
                              u.referenceDocument.name,
                              c.jsx("span", {
                                className: "knowledge-ref-type",
                                children:
                                  u.referenceDocument.type === "MANUAL"
                                    ? "매뉴얼"
                                    : "FAQ",
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        children: [
                          c.jsx("dt", { children: "저장 경로" }),
                          c.jsx("dd", { children: u.referenceDocument.path }),
                        ],
                      }),
                      c.jsxs("div", {
                        children: [
                          c.jsx("dt", { children: "참조 단락" }),
                          c.jsx("dd", { children: u.referenceParagraph }),
                        ],
                      }),
                    ],
                  }),
                  c.jsx("div", {
                    className: "knowledge-footer",
                    children: c.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      onClick: R,
                      children: s ? "복사 완료" : "결과 복사",
                    }),
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
const feedbackReactionLabels = { POSITIVE: "긍정", NEGATIVE: "부정" },
  by = [
    { label: "전체", value: "ALL" },
    { label: "긍정", value: "POSITIVE" },
    { label: "부정", value: "NEGATIVE" },
  ],
  Xc = (e) => new Date(e.replace(" ", "T")),
  gy = (e) => `${e}T00:00:00`,
  py = (e) => `${e}T23:59:59.999`,
  _y = (e, t) => {
    if (!t.startDate && !t.endDate) return !0;
    const l = Xc(e).getTime(),
      a = t.startDate ? Xc(gy(t.startDate)).getTime() : null,
      n = t.endDate ? Xc(py(t.endDate)).getTime() : null;
    return a !== null && n !== null && a > n
      ? l >= n && l <= a
      : !((a !== null && l < a) || (n !== null && l > n));
  },
  Sy = (e, t) => Bu(e.createdAt, t.createdAt);
function FeedbackManagementView({ feedbacks: e }) {
  const [t, l] = j.useState({ reaction: "ALL" }),
    [a, n] = j.useState({ startDate: "", endDate: "" }),
    [u, i] = j.useState({ startDate: "", endDate: "" }),
    [s, f] = j.useState(null),
    r = j.useMemo(
      () =>
        e
          .filter((m) => t.reaction === "ALL" || m.reaction === t.reaction)
          .filter((m) => _y(m.createdAt, u))
          .slice()
          .sort(Sy),
      [u, e, t.reaction],
    ),
    b = r.find((m) => m.id === s) ?? r[0] ?? null,
    y = () => {
      i(a);
    },
    h = () => {
      const m = { startDate: "", endDate: "" };
      (n(m), i(m));
    };
  return c.jsx("div", {
    className: "feedback-layout",
    children: c.jsxs("div", {
      className: "feedback-grid",
      children: [
        c.jsxs("section", {
          className: "feedback-list-card",
          children: [
            c.jsx(SectionHeader, {
              title: "피드백 목록",
              className: "feedback-list-header",
            }),
            c.jsxs("div", {
              className: "feedback-filter-bar",
              children: [
                c.jsxs("div", {
                  className: "feedback-filter-field",
                  children: [
                    c.jsx("label", {
                      className: "field__label",
                      htmlFor: "feedback-reaction-filter",
                      children: "유형",
                    }),
                    c.jsx("select", {
                      id: "feedback-reaction-filter",
                      className: "field__input feedback-filter-select",
                      value: t.reaction,
                      onChange: (m) => l({ reaction: m.target.value }),
                      children: by.map((m) =>
                        c.jsx(
                          "option",
                          { value: m.value, children: m.label },
                          m.value,
                        ),
                      ),
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "feedback-range-actions",
                  children: [
                    c.jsxs("div", {
                      className: "feedback-range-field",
                      children: [
                        c.jsx("label", {
                          className: "field__label",
                          htmlFor: "feedback-range-start",
                          children: "시작일",
                        }),
                        c.jsx("input", {
                          id: "feedback-range-start",
                          type: "date",
                          className: "field__input feedback-range-input",
                          value: a.startDate,
                          onChange: (m) =>
                            n((A) => ({ ...A, startDate: m.target.value })),
                        }),
                      ],
                    }),
                    c.jsx("span", {
                      className: "feedback-range-divider",
                      "aria-hidden": "true",
                      children: "~",
                    }),
                    c.jsxs("div", {
                      className: "feedback-range-field",
                      children: [
                        c.jsx("label", {
                          className: "field__label",
                          htmlFor: "feedback-range-end",
                          children: "종료일",
                        }),
                        c.jsx("input", {
                          id: "feedback-range-end",
                          type: "date",
                          className: "field__input feedback-range-input",
                          value: a.endDate,
                          onChange: (m) =>
                            n((A) => ({ ...A, endDate: m.target.value })),
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "feedback-range-buttons",
                      children: [
                        c.jsx("button", {
                          type: "button",
                          className: "primary-button feedback-range-button",
                          onClick: y,
                          children: "검색",
                        }),
                        c.jsx("button", {
                          type: "button",
                          className: "secondary-button feedback-range-button",
                          onClick: h,
                          children: "초기화",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            c.jsx("div", {
              className: "feedback-list-scroll",
              children: c.jsxs("table", {
                className: "content-table",
                children: [
                  c.jsx("thead", {
                    children: c.jsxs("tr", {
                      children: [
                        c.jsx("th", { children: "작성일시" }),
                        c.jsx("th", { children: "단지명" }),
                        c.jsx("th", { children: "사용자" }),
                        c.jsx("th", { children: "반응" }),
                        c.jsx("th", { children: "부정사유" }),
                      ],
                    }),
                  }),
                  c.jsx("tbody", {
                    children:
                      r.length === 0
                        ? c.jsx("tr", {
                            children: c.jsx("td", {
                              colSpan: 5,
                              className: "content-empty",
                              children: "조건에 맞는 피드백이 없습니다.",
                            }),
                          })
                        : r.map((m) =>
                            c.jsxs(
                              "tr",
                              {
                                className:
                                  m.id === (b == null ? void 0 : b.id)
                                    ? "is-selected"
                                    : "",
                                onClick: () => f(m.id),
                                children: [
                                  c.jsx("td", { children: m.createdAt }),
                                  c.jsx("td", { children: m.complexName }),
                                  c.jsx("td", { children: m.userId }),
                                  c.jsx("td", {
                                    children: c.jsx("span", {
                                      className: `feedback-reaction-badge feedback-reaction-badge--${m.reaction.toLowerCase()}`,
                                      children: feedbackReactionLabels[m.reaction],
                                    }),
                                  }),
                                  c.jsx("td", {
                                    children: m.hasNegativeReason
                                      ? "있음"
                                      : "-",
                                  }),
                                ],
                              },
                              m.id,
                            ),
                          ),
                  }),
                ],
              }),
            }),
          ],
        }),
        c.jsx(DetailFrame, {
          className: "feedback-detail-card",
          title: "피드백 상세",
          actions: b
            ? c.jsx("span", {
                className: `feedback-reaction-badge feedback-reaction-badge--${b.reaction.toLowerCase()}`,
                children: feedbackReactionLabels[b.reaction],
              })
            : null,
          children:
            b === null
              ? c.jsx("div", {
                  className: "content-empty content-empty--detail",
                  children: "피드백을 선택하면 상세 정보가 표시됩니다.",
                })
              : c.jsxs("div", {
                  className: "feedback-detail-scroll",
                  children: [
                    c.jsx(SectionHeader, {
                      title: c.jsxs("div", {
                        className: "feedback-detail-identity",
                        children: [
                          c.jsx("span", {
                            className: "feedback-detail-identity__complex",
                            children: b.complexName,
                          }),
                          c.jsx("span", {
                            className: "feedback-detail-identity__user",
                            children: b.userId,
                          }),
                        ],
                      }),
                      className:
                        "detail-frame__header feedback-detail-identity-header",
                      titleAs: "h3",
                    }),
                    c.jsxs("div", {
                      className: "feedback-conversation-section",
                      children: [
                        c.jsx("p", {
                          className: "feedback-conversation-label",
                          children: "대화 내용",
                        }),
                        c.jsx("div", {
                          className: "feedback-conversation",
                          children: b.conversation.map((m, A) =>
                            c.jsxs(
                              "div",
                              {
                                className: `feedback-conversation__turn feedback-conversation__turn--${m.speaker.toLowerCase()}`,
                                children: [
                                  c.jsxs("p", {
                                    className: "feedback-conversation__speaker",
                                    children: [
                                      m.speaker === "USER" ? "사용자" : "챗봇",
                                      " · ",
                                      m.sentAt,
                                    ],
                                  }),
                                  c.jsx("p", {
                                    className: "feedback-conversation__message",
                                    children: m.message,
                                  }),
                                ],
                              },
                              A,
                            ),
                          ),
                        }),
                      ],
                    }),
                    b.reaction === "NEGATIVE" &&
                      b.negativeReason &&
                      c.jsxs("div", {
                        className: "feedback-negative-reason",
                        children: [
                          c.jsx("strong", { children: "부정사유" }),
                          c.jsx("p", { children: b.negativeReason }),
                        ],
                      }),
                  ],
                }),
        }),
      ],
    }),
  });
}
const accountRecords = [
    {
      id: "chat1004",
      name: "박운영",
      role: "MASTER",
      status: "ACTIVE",
      registeredAt: "2025-06-01",
      lastLoginAt: "2026-04-02 08:45",
      loginHistory: [
        {
          id: "lh-001",
          occurredAt: "2026-04-02 08:45",
          success: !0,
          ip: "192.168.1.10",
        },
        {
          id: "lh-002",
          occurredAt: "2026-04-01 09:12",
          success: !0,
          ip: "192.168.1.10",
        },
      ],
      lockHistory: [],
    },
    {
      id: "op2031",
      name: "김관리",
      role: "OPERATOR",
      status: "ACTIVE",
      registeredAt: "2025-09-15",
      lastLoginAt: "2026-04-01 14:30",
      loginHistory: [
        {
          id: "lh-003",
          occurredAt: "2026-04-01 14:30",
          success: !0,
          ip: "10.0.0.5",
        },
        {
          id: "lh-004",
          occurredAt: "2026-03-31 10:00",
          success: !1,
          ip: "10.0.0.5",
        },
      ],
      lockHistory: [],
    },
    {
      id: "op3044",
      name: "이운영",
      role: "OPERATOR",
      status: "INACTIVE",
      registeredAt: "2025-11-20",
      lastLoginAt: "2026-03-10 17:00",
      loginHistory: [
        {
          id: "lh-005",
          occurredAt: "2026-03-10 17:00",
          success: !0,
          ip: "172.16.0.2",
        },
      ],
      lockHistory: [
        {
          id: "lkh-001",
          type: "UNLOCKED",
          reason: "본인 요청 해제",
          actor: "chat1004",
          occurredAt: "2026-03-10 16:55",
        },
        {
          id: "lkh-002",
          type: "LOCKED",
          reason: "OTP 5회 실패",
          actor: "SYSTEM",
          occurredAt: "2026-03-10 16:50",
        },
      ],
    },
    {
      id: "op4099",
      name: "최보안",
      role: "OPERATOR",
      status: "LOCKED",
      registeredAt: "2026-01-05",
      lastLoginAt: null,
      loginHistory: [],
      lockHistory: [
        {
          id: "lkh-003",
          type: "LOCKED",
          reason: "OTP 5회 실패",
          actor: "SYSTEM",
          occurredAt: "2026-04-01 09:30",
        },
      ],
    },
  ],
  candidateAccounts = [
    { id: "emp001", name: "정수진", complexCode: "COMPLEX-101" },
    { id: "emp002", name: "박현준", complexCode: "COMPLEX-205" },
    { id: "emp003", name: "한지원", complexCode: "COMPLEX-310" },
  ];
function calculateAccountStats(e) {
  return {
    total: e.filter((t) => t.status === "ACTIVE").length,
    masters: e.filter((t) => t.role === "MASTER" && t.status === "ACTIVE")
      .length,
    operators: e.filter((t) => t.role === "OPERATOR" && t.status === "ACTIVE")
      .length,
    inactive: e.filter((t) => t.status !== "ACTIVE").length,
  };
}
async function loadAccountData() {
  const e = calculateAccountStats(accountRecords);
  return { accounts: accountRecords, stats: e };
}
const CURRENT_ACCOUNT_ID = "chat1004",
  accountStatusLabels = { ACTIVE: "활성", INACTIVE: "비활성", LOCKED: "잠금" },
  accountRoleLabels = { MASTER: "MASTER", OPERATOR: "OPERATOR" },
  accountActionLabels = {
    ACTIVATE: "권한 복구",
    DEACTIVATE: "권한 비활성화",
    UNLOCK: "잠금 해제",
  },
  jy = 3e3;
function AccountPermissionManagementView({ accounts: e }) {
  const [t, l] = j.useState(e),
    [a, n] = j.useState(null),
    [u, i] = j.useState(null),
    [s, f] = j.useState(!1),
    [r, b] = j.useState(""),
    [y, h] = j.useState(""),
    [m, A] = j.useState(null),
    N = yn(jy),
    R = j.useMemo(
      () => ({
        total: t.filter((S) => S.status === "ACTIVE").length,
        masters: t.filter((S) => S.role === "MASTER" && S.status === "ACTIVE")
          .length,
        operators: t.filter(
          (S) => S.role === "OPERATOR" && S.status === "ACTIVE",
        ).length,
        inactive: t.filter((S) => S.status !== "ACTIVE").length,
      }),
      [t],
    ),
    o = t.find((S) => S.id === a) ?? null,
    d = j.useMemo(() => {
      const S = y.trim().toLowerCase();
      return S
        ? candidateAccounts.filter(
            (_) =>
              _.name.toLowerCase().includes(S) ||
              _.id.toLowerCase().includes(S) ||
              _.complexCode.toLowerCase().includes(S),
          )
        : candidateAccounts;
    }, [y]),
    v = (S, _) => {
      (l((te) => te.map((De) => (De.id === S ? { ...De, status: _ } : De))),
        n(S));
    },
    g = () => {
      if (!u) return;
      const { type: S, accountId: _ } = u;
      (S === "ACTIVATE"
        ? (v(_, "ACTIVE"), N.showMessage("관리자 권한이 복구되었습니다."))
        : S === "DEACTIVATE"
          ? (v(_, "INACTIVE"),
            N.showMessage("관리자 권한이 비활성화되었습니다."))
          : S === "UNLOCK" &&
            (v(_, "ACTIVE"), N.showMessage("계정 잠금이 해제되었습니다.")),
        i(null));
    },
    E = () => {
      (f(!1), b(""), h(""), A(null));
    },
    C = () => {
      if (!m) return;
      const S = {
        id: m.id,
        name: m.name,
        role: "OPERATOR",
        status: "ACTIVE",
        registeredAt: "2026-04-02",
        lastLoginAt: null,
        loginHistory: [],
        lockHistory: [],
      };
      (l((_) => [..._, S]), E(), N.showMessage("관리자가 추가되었습니다."));
    },
    T = (S) => S === CURRENT_ACCOUNT_ID,
    D = [
      { label: "전체 활성", value: `${R.total}명` },
      { label: "MASTER", value: `${R.masters}명` },
      { label: "OPERATOR", value: `${R.operators}명` },
      { label: "비활성·잠금", value: `${R.inactive}명` },
    ];
  return c.jsxs("div", {
    className: "accounts-layout",
    children: [
      c.jsx(ToastStack, {
        items: N.message
          ? [{ key: "accounts-success", tone: "success", message: N.message }]
          : [],
      }),
      c.jsx("div", {
        className: "accounts-stat-grid",
        children: D.map((S) =>
          c.jsxs(
            "div",
            {
              className: "metric-card",
              children: [
                c.jsx("p", {
                  className: "metric-card__label",
                  children: S.label,
                }),
                c.jsx("p", {
                  className: "metric-card__value",
                  children: S.value,
                }),
              ],
            },
            S.label,
          ),
        ),
      }),
      c.jsxs("div", {
        className: "accounts-grid",
        children: [
          c.jsxs("section", {
            className: "accounts-list-card",
            children: [
              c.jsx(SectionHeader, {
                title: "계정 목록",
                actions: c.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: () => f(!0),
                  children: "계정 추가",
                }),
                className: "panel__header panel__header--compact",
              }),
              c.jsx("div", {
                className: "accounts-list-scroll",
                children: c.jsxs("table", {
                  className: "content-table knowledge-history-table",
                  children: [
                    c.jsx("thead", {
                      children: c.jsxs("tr", {
                        children: [
                          c.jsx("th", { children: "이름" }),
                          c.jsx("th", { children: "아이디" }),
                          c.jsx("th", { children: "권한" }),
                          c.jsx("th", { children: "상태" }),
                          c.jsx("th", { children: "최종 로그인" }),
                        ],
                      }),
                    }),
                    c.jsx("tbody", {
                      children: t.map((S) =>
                        c.jsxs(
                          "tr",
                          {
                            className: S.id === a ? "is-selected" : "",
                            onClick: () => n(S.id),
                            children: [
                              c.jsxs("td", {
                                children: [
                                  c.jsx("div", {
                                    className: "content-table__title",
                                    children: S.name,
                                  }),
                                  T(S.id) &&
                                    c.jsx("div", {
                                      className: "content-table__sub",
                                      children: "본인",
                                    }),
                                ],
                              }),
                              c.jsx("td", { children: S.id }),
                              c.jsx("td", {
                                children: c.jsx("span", {
                                  className: `status-badge ${S.role === "MASTER" ? "status-badge--active" : "status-badge--processing"}`,
                                  children: accountRoleLabels[S.role],
                                }),
                              }),
                              c.jsx("td", {
                                children: c.jsx("span", {
                                  className: `status-badge status-badge--${S.status.toLowerCase()}`,
                                  children: accountStatusLabels[S.status],
                                }),
                              }),
                              c.jsx("td", { children: S.lastLoginAt ?? "-" }),
                            ],
                          },
                          S.id,
                        ),
                      ),
                    }),
                  ],
                }),
              }),
            ],
          }),
          c.jsx(DetailFrame, {
            className: "accounts-detail-card",
            title: "계정 상세",
            actions: o
              ? c.jsx("span", {
                  className: `status-badge status-badge--${o.status.toLowerCase()}`,
                  children: accountStatusLabels[o.status],
                })
              : null,
            children:
              o === null
                ? c.jsx("div", {
                    className: "content-empty content-empty--detail",
                    children: "관리자를 선택하면 상세 정보가 표시됩니다.",
                  })
                : c.jsxs("div", {
                    className: "accounts-detail-scroll",
                    children: [
                      c.jsx(SectionHeader, {
                        title: c.jsxs("div", {
                          className: "accounts-detail-identity",
                          children: [
                            c.jsx("span", {
                              className: "accounts-detail-identity__name",
                              children: o.name,
                            }),
                            c.jsxs("div", {
                              className: "accounts-detail-identity__meta",
                              children: [
                                c.jsx("span", {
                                  className: "accounts-detail-identity__id",
                                  children: o.id,
                                }),
                                c.jsx("span", {
                                  className: "accounts-detail-identity__role",
                                  children: accountRoleLabels[o.role],
                                }),
                              ],
                            }),
                          ],
                        }),
                        className:
                          "detail-frame__header accounts-detail-identity-header",
                        titleAs: "h3",
                      }),
                      c.jsxs("dl", {
                        className: "content-detail__list",
                        children: [
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "등록일" }),
                              c.jsx("dd", { children: o.registeredAt }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "최종 로그인" }),
                              c.jsx("dd", { children: o.lastLoginAt ?? "-" }),
                            ],
                          }),
                        ],
                      }),
                      T(o.id)
                        ? c.jsx("p", {
                            className: "accounts-self-notice",
                            children:
                              "본인 계정은 권한 변경 및 비활성화가 제한됩니다.",
                          })
                        : c.jsxs("div", {
                            className: "accounts-action-row",
                            children: [
                              o.status === "INACTIVE" &&
                                c.jsx("button", {
                                  type: "button",
                                  className: "primary-button",
                                  onClick: () =>
                                    i({
                                      type: "ACTIVATE",
                                      accountId: o.id,
                                      reason: "",
                                    }),
                                  children: "권한 복구",
                                }),
                              o.status === "ACTIVE" &&
                                o.role === "OPERATOR" &&
                                c.jsx("button", {
                                  type: "button",
                                  className: "danger-button",
                                  onClick: () =>
                                    i({
                                      type: "DEACTIVATE",
                                      accountId: o.id,
                                      reason: "",
                                    }),
                                  children: "권한 비활성화",
                                }),
                              o.status === "LOCKED" &&
                                c.jsx("button", {
                                  type: "button",
                                  className: "primary-button",
                                  onClick: () =>
                                    i({
                                      type: "UNLOCK",
                                      accountId: o.id,
                                      reason: "",
                                    }),
                                  children: "잠금 해제",
                                }),
                            ],
                          }),
                      c.jsxs("div", {
                        className: "accounts-history",
                        children: [
                          c.jsx("h4", { children: "로그인 이력" }),
                          o.loginHistory.length === 0
                            ? c.jsx("p", {
                                className: "accounts-history-empty",
                                children: "로그인 이력이 없습니다.",
                              })
                            : c.jsx("ul", {
                                className: "accounts-history-list",
                                children: o.loginHistory.map((S) =>
                                  c.jsxs(
                                    "li",
                                    {
                                      children: [
                                        c.jsx("strong", {
                                          children: S.occurredAt,
                                        }),
                                        S.success
                                          ? c.jsx("span", {
                                              className:
                                                "accounts-login-success",
                                              children: "성공",
                                            })
                                          : c.jsx("span", {
                                              className: "accounts-login-fail",
                                              children: "실패",
                                            }),
                                        c.jsx("span", {
                                          className: "accounts-history-ip",
                                          children: S.ip,
                                        }),
                                      ],
                                    },
                                    S.id,
                                  ),
                                ),
                              }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "accounts-history",
                        children: [
                          c.jsx("h4", { children: "잠금·해제 이력" }),
                          o.lockHistory.length === 0
                            ? c.jsx("p", {
                                className: "accounts-history-empty",
                                children: "잠금·해제 이력이 없습니다.",
                              })
                            : c.jsx("ul", {
                                className: "accounts-history-list",
                                children: o.lockHistory.map((S) =>
                                  c.jsxs(
                                    "li",
                                    {
                                      children: [
                                        c.jsx("strong", {
                                          children: S.occurredAt,
                                        }),
                                        c.jsx("span", {
                                          className:
                                            S.type === "LOCKED"
                                              ? "accounts-history-status--lock"
                                              : "accounts-history-status--unlock",
                                          children:
                                            S.type === "LOCKED"
                                              ? "잠금"
                                              : "해제",
                                        }),
                                        c.jsxs("p", {
                                          className: "accounts-history-sub",
                                          children: [S.reason, " · ", S.actor],
                                        }),
                                      ],
                                    },
                                    S.id,
                                  ),
                                ),
                              }),
                        ],
                      }),
                    ],
                  }),
          }),
        ],
      }),
      u &&
        c.jsx(nl, {
          title: accountActionLabels[u.type],
          ariaLabel: accountActionLabels[u.type],
          onClose: () => i(null),
          size: "sm",
          footer: c.jsxs(c.Fragment, {
            children: [
              c.jsx("button", {
                type: "button",
                className: "secondary-button",
                onClick: () => i(null),
                children: "취소",
              }),
              c.jsx("button", {
                type: "button",
                className:
                  u.type === "DEACTIVATE" ? "danger-button" : "primary-button",
                disabled: !u.reason.trim(),
                onClick: g,
                children: "확인",
              }),
            ],
          }),
          children: c.jsxs("label", {
            className: "field",
            children: [
              c.jsx("span", {
                className: "field__label",
                children: "사유 입력 *",
              }),
              c.jsx("textarea", {
                className: "field__input knowledge-textarea",
                rows: 3,
                value: u.reason,
                placeholder: "사유를 입력해 주세요.",
                onChange: (S) => i({ ...u, reason: S.target.value }),
              }),
            ],
          }),
        }),
      s &&
        c.jsxs(nl, {
          title: "계정 추가",
          ariaLabel: "계정 추가",
          onClose: E,
          size: "lg",
          footer: c.jsxs(c.Fragment, {
            children: [
              c.jsx("button", {
                type: "button",
                className: "secondary-button",
                onClick: E,
                children: "취소",
              }),
              c.jsx("button", {
                type: "button",
                className: "primary-button",
                disabled: !m || !r.trim(),
                onClick: C,
                children: "확인",
              }),
            ],
          }),
          children: [
            c.jsxs("label", {
              className: "field",
              children: [
                c.jsx("span", {
                  className: "field__label",
                  children: "사용자 검색",
                }),
                c.jsx("input", {
                  className: "field__input",
                  value: y,
                  placeholder: "검색어 입력",
                  onChange: (S) => h(S.target.value),
                }),
              ],
            }),
            c.jsx("ul", {
              className: "user-candidate-list",
              children:
                d.length === 0
                  ? c.jsx("li", {
                      className: "user-candidate-empty",
                      children: "검색 결과가 없습니다.",
                    })
                  : d.map((S) =>
                      c.jsx(
                        "li",
                        {
                          children: c.jsxs("button", {
                            type: "button",
                            className: `user-candidate-item${(m == null ? void 0 : m.id) === S.id ? " is-selected" : ""}`,
                            onClick: () => A(S),
                            children: [
                              c.jsxs("span", {
                                children: [S.name, " (", S.id, ")"],
                              }),
                              c.jsx("span", {
                                className: "user-candidate-code",
                                children: S.complexCode,
                              }),
                            ],
                          }),
                        },
                        S.id,
                      ),
                    ),
            }),
            c.jsxs("label", {
              className: "field",
              children: [
                c.jsx("span", {
                  className: "field__label",
                  children: "추가 사유 * (최대 200자)",
                }),
                c.jsx("textarea", {
                  className: "field__input knowledge-textarea",
                  rows: 2,
                  maxLength: 200,
                  value: r,
                  placeholder: "추가 사유를 입력해 주세요.",
                  onChange: (S) => b(S.target.value),
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
const NAV_ITEMS = [
    {
      key: "dashboard",
      label: "대시보드",
      href: "/dashboard",
      roles: ["MASTER", "OPERATOR"],
    },
    {
      key: "content",
      label: "콘텐츠 관리",
      href: "/content",
      roles: ["MASTER"],
    },
    {
      key: "cache-qa",
      label: "캐시 답변 관리",
      href: "/cache-qa",
      roles: ["MASTER"],
    },
    {
      key: "knowledge",
      label: "지식 기반 조회",
      href: "/knowledge",
      roles: ["MASTER", "OPERATOR"],
    },
    {
      key: "feedback",
      label: "피드백 관리",
      href: "/feedback",
      roles: ["MASTER", "OPERATOR"],
    },
    {
      key: "accounts",
      label: "계정/권한 관리",
      href: "/accounts",
      roles: ["MASTER"],
    },
  ],
  ROUTE_META = {
    "/": {
      title: "대시보드",
      description: "운영 현황을 한눈에 확인하는 메인 화면입니다.",
    },
    "/dashboard": {
      title: "대시보드",
      description: "운영 현황을 한눈에 확인하는 메인 화면입니다.",
    },
    "/content": {
      title: "콘텐츠 관리",
      description:
        "RAG 문서를 등록하고 수정, 삭제, 이력을 관리하는 화면입니다.",
    },
    "/knowledge": {
      title: "지식 기반 조회",
      description: "등록된 문서를 기반으로 응답 테스트를 수행하는 화면입니다.",
    },
    "/feedback": {
      title: "피드백 관리",
      description: "피드백 목록과 상세 정보를 확인하는 화면입니다.",
    },
    "/accounts": {
      title: "계정/권한 관리",
      description: "운영 계정과 권한 상태를 확인하는 화면입니다.",
    },
    "/cache-qa": {
      title: "캐시 답변 관리",
      description: "캐시 응답과 질문을 단위로 관리하는 화면입니다.",
    },
  },
  feedbackRecords = [
    {
      id: "fb-001",
      complexName: "한강 아파트",
      userId: "user_2***",
      reaction: "POSITIVE",
      hasNegativeReason: !1,
      createdAt: "2026-04-02 09:15",
      conversation: [
        {
          speaker: "USER",
          message: "수납 방법이 어떻게 되나요?",
          sentAt: "2026-04-02 09:14",
        },
        {
          speaker: "BOT",
          message:
            "수납은 관리비 고지서 기준으로 매월 25일까지 납부하시면 됩니다. 온라인 뱅킹 또는 자동이체를 통해 납부하실 수 있습니다.",
          sentAt: "2026-04-02 09:14",
        },
      ],
      negativeReason: null,
    },
    {
      id: "fb-002",
      complexName: "마포 자이",
      userId: "user_5***",
      reaction: "NEGATIVE",
      hasNegativeReason: !0,
      createdAt: "2026-04-02 10:22",
      conversation: [
        {
          speaker: "USER",
          message: "차량 등록 서류가 뭔가요?",
          sentAt: "2026-04-02 10:21",
        },
        {
          speaker: "BOT",
          message:
            "차량 등록을 위해서는 주민등록등본, 차량등록증, 인감증명서가 필요합니다.",
          sentAt: "2026-04-02 10:21",
        },
      ],
      negativeReason:
        "응답이 너무 간략합니다. 구체적인 절차 안내가 필요합니다.",
    },
    {
      id: "fb-003",
      complexName: "강남 래미안",
      userId: "user_9***",
      reaction: "POSITIVE",
      hasNegativeReason: !1,
      createdAt: "2026-04-01 16:40",
      conversation: [
        {
          speaker: "USER",
          message: "연말정산 관련 서류 제출 기한이 언제인가요?",
          sentAt: "2026-04-01 16:39",
        },
        {
          speaker: "BOT",
          message:
            "연말정산 서류 제출 기한은 매년 1월 15일까지입니다. 회사 내부 정책에 따라 조기 마감될 수 있으니 인사팀에 확인하세요.",
          sentAt: "2026-04-01 16:39",
        },
      ],
      negativeReason: null,
    },
    {
      id: "fb-004",
      complexName: "서초 e편한세상",
      userId: "user_3***",
      reaction: "NEGATIVE",
      hasNegativeReason: !1,
      createdAt: "2026-04-01 11:05",
      conversation: [
        {
          speaker: "USER",
          message: "보안 서비스 신청 방법을 알려주세요",
          sentAt: "2026-04-01 11:04",
        },
        {
          speaker: "BOT",
          message: "죄송합니다. 해당 내용에 대한 정보를 찾지 못했습니다.",
          sentAt: "2026-04-01 11:04",
        },
      ],
      negativeReason: null,
    },
  ];
async function loadFeedbackItems() {
  return feedbackRecords.slice().sort((e, t) => t.createdAt.localeCompare(e.createdAt));
}
const Dy = "xperp-mock-auth-stage",
  Rr = "xperp-mock-authenticated",
  Cy = "xperp-mock-auth-user",
  Ry = "xperp-mock-otp-failures",
  zy = "xperp-mock-otp-locked";
function Sidebar({ currentPath: e, onNavigate: t, onLogout: l }) {
  const [a, n] = j.useState(!1),
    u = Mh(),
    i = NAV_ITEMS.filter((f) => f.roles.includes(u.role)),
    s = () => {
      (typeof window < "u" &&
        (window.sessionStorage.removeItem(Dy),
        window.sessionStorage.removeItem(Rr),
        window.sessionStorage.removeItem(Cy),
        window.sessionStorage.removeItem(Ry),
        window.sessionStorage.removeItem(zy),
        window.localStorage.removeItem(Rr)),
        Lv(),
        n(!1),
        l());
    };
  return c.jsxs("aside", {
    className: "sidebar",
    children: [
      c.jsxs("div", {
        className: "sidebar__brand",
        children: [
          c.jsx("div", { className: "sidebar__logo", children: "XpERP" }),
          c.jsx("div", {
            className: "sidebar__badge",
            children: "AI 관리자로",
          }),
        ],
      }),
      c.jsx("nav", {
        className: "sidebar__nav",
        "aria-label": "메뉴",
        children: i.map((f) => {
          const r = e === f.href;
          return c.jsxs(
            "button",
            {
              type: "button",
              className: `sidebar__nav-item${r ? " is-active" : ""}`,
              onClick: () => t(f.href),
              "aria-current": r ? "page" : void 0,
              children: [
                c.jsx("span", {
                  className: "sidebar__nav-icon",
                  "aria-hidden": "true",
                  children: f.key.slice(0, 1).toUpperCase(),
                }),
                c.jsx("span", { children: f.label }),
              ],
            },
            f.key,
          );
        }),
      }),
      c.jsxs("div", {
        className: "sidebar__user",
        children: [
          c.jsxs("div", {
            className: "sidebar__user-row",
            children: [
              c.jsx("div", {
                className: "sidebar__user-name",
                children: u.name,
              }),
              c.jsx("div", { className: "sidebar__user-meta", children: u.id }),
            ],
          }),
          c.jsxs("div", {
            className: "sidebar__user-role",
            children: [u.role, " · ", u.department],
          }),
          c.jsx("button", {
            type: "button",
            className: "secondary-button sidebar__logout",
            onClick: () => n(!0),
            children: "로그아웃",
          }),
        ],
      }),
      a
        ? c.jsx(nl, {
            title: "로그아웃",
            ariaLabel: "로그아웃 확인",
            onClose: () => n(!1),
            size: "sm",
            compact: !0,
            backdropClassName: "logout-backdrop",
            headerClassName: "modal__header--tight",
            footerClassName: "modal__footer--split",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => n(!1),
                  children: "취소",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "danger-button",
                  onClick: s,
                  children: "확인",
                }),
              ],
            }),
            children: c.jsx("p", {
              className: "logout-confirm__text",
              children: "로그아웃 하시겠습니까?",
            }),
          })
        : null,
    ],
  });
}
function TopHeader({ title: e, description: t, rightSlot: l }) {
  return c.jsxs("header", {
    className: "top-header",
    children: [
      c.jsxs("div", {
        className: "top-header__copy",
        children: [
          c.jsx("h1", { className: "top-header__title", children: e }),
          t
            ? c.jsx("p", { className: "top-header__description", children: t })
            : null,
        ],
      }),
      l ? c.jsx("div", { className: "top-header__slot", children: l }) : null,
    ],
  });
}
function DashboardShell({ currentPath: e, onNavigate: t, onLogout: l }) {
  const a = Mh(),
    n = ROUTE_META[e] ?? ROUTE_META["/dashboard"],
    u = j.useMemo(
      () => NAV_ITEMS.filter((r) => r.roles.includes(a.role)).map((r) => r.href),
      [a.role],
    ),
    [i, s] = j.useState(null);
  (j.useEffect(() => {
    let r = !0;
    return (
      Promise.all([loadFeedbackItems(), loadAccountData(), my()]).then(([b, y, h]) => {
        r &&
          s({
            feedbacks: b,
            accounts: y.accounts,
            knowledgeDocuments: h.documents,
          });
      }),
      () => {
        r = !1;
      }
    );
  }, []),
    j.useEffect(() => {
      u.includes(e) || (u[0] && t(u[0]));
    }, [e, t, u]));
  const f = () => {
    switch (e) {
      case "/dashboard":
        return c.jsx(DashboardView, { data: DASHBOARD_SECTIONS.WEEK });
      case "/content":
        return c.jsx(ContentManagementView, { documents: contentDocuments });
      case "/cache-qa":
        return c.jsx(CacheAnswerManagementView, { items: cacheQaRecords });
      case "/knowledge":
        return i
          ? c.jsx(KnowledgeQueryView, { documents: i.knowledgeDocuments })
          : c.jsx(LoadingPlaceholder, { label: "지식 기반 조회" });
      case "/feedback":
        return i
          ? c.jsx(FeedbackManagementView, { feedbacks: i.feedbacks })
          : c.jsx(LoadingPlaceholder, { label: "피드백 관리" });
      case "/accounts":
        return i
          ? c.jsx(AccountPermissionManagementView, { accounts: i.accounts })
          : c.jsx(LoadingPlaceholder, { label: "계정/권한 관리" });
      default:
        return c.jsx(DashboardView, { data: DASHBOARD_SECTIONS.WEEK });
    }
  };
  return c.jsxs("div", {
    className: "admin-shell",
    children: [
      c.jsx(Sidebar, { currentPath: e, onNavigate: t, onLogout: l }),
      c.jsxs("div", {
        className: "admin-shell__main",
        children: [
          c.jsx(TopHeader, { title: n.title, description: n.description }),
          c.jsx("main", { className: "admin-shell__content", children: f() }),
        ],
      }),
    ],
  });
}
function LoadingPlaceholder({ label: e }) {
  return c.jsx("section", {
    className: "panel panel--main",
    children: c.jsxs("div", {
      className: "content-empty content-empty--detail",
      children: [e, " 데이터를 불러오는 중입니다."],
    }),
  });
}
const AUTHENTICATED_STATUS = "authenticated";
function App() {
  const [e, t] = j.useState(!1),
    [l, a] = j.useState("/dashboard");
  j.useEffect(() => {
    typeof window > "u" || t(window.sessionStorage.getItem(su) === AUTHENTICATED_STATUS);
  }, []);
  const n = () => {
      (t(!0), a("/dashboard"));
    },
    u = () => {
      (t(!1), a("/dashboard"));
    };
  return e
    ? c.jsx(DashboardShell, { currentPath: l, onNavigate: a, onLogout: u })
    : c.jsx(AuthScreen, { onAuthenticated: n });
}

const miniRuntime = {
  root: null,
  element: null,
  instances: new Map(),
  effects: [],
  currentInstance: null,
  currentHookIndex: 0,
  scheduled: false,
  portalRoot: null,
};

function getInstance(path, type) {
  const key = `${path}`;
  let instance = miniRuntime.instances.get(key);
  if (!instance) {
    instance = {
      type,
      hooks: [],
      effects: [],
      childCount: 0,
    };
    miniRuntime.instances.set(key, instance);
  }
  instance.type = type;
  instance.childCount = 0;
  return instance;
}

function scheduleRender() {
  if (miniRuntime.scheduled) return;
  miniRuntime.scheduled = true;
  queueMicrotask(() => {
    miniRuntime.scheduled = false;
    renderMiniApp();
  });
}

function useMiniState(initialValue) {
  const instance = miniRuntime.currentInstance;
  const index = miniRuntime.currentHookIndex++;
  if (instance.hooks[index] === void 0) {
    instance.hooks[index] = typeof initialValue === "function" ? initialValue() : initialValue;
  }
  const setState = (nextValue) => {
    const resolved = typeof nextValue === "function" ? nextValue(instance.hooks[index]) : nextValue;
    if (!Object.is(resolved, instance.hooks[index])) {
      instance.hooks[index] = resolved;
      scheduleRender();
    }
  };
  return [instance.hooks[index], setState];
}

function depsChanged(prevDeps, nextDeps) {
  if (!prevDeps || !nextDeps) return true;
  if (prevDeps.length !== nextDeps.length) return true;
  for (let index = 0; index < prevDeps.length; index += 1) {
    if (!Object.is(prevDeps[index], nextDeps[index])) return true;
  }
  return false;
}

function useMiniMemo(factory, deps) {
  const instance = miniRuntime.currentInstance;
  const index = miniRuntime.currentHookIndex++;
  const record = instance.hooks[index];
  if (!record || depsChanged(record.deps, deps)) {
    const value = factory();
    instance.hooks[index] = { value, deps };
    return value;
  }
  return record.value;
}

function useMiniRef(initialValue) {
  const instance = miniRuntime.currentInstance;
  const index = miniRuntime.currentHookIndex++;
  if (!instance.hooks[index]) {
    instance.hooks[index] = { current: initialValue };
  }
  return instance.hooks[index];
}

function useMiniCallback(callback, deps) {
  return useMiniMemo(() => callback, deps);
}

function useMiniEffect(effect, deps) {
  const instance = miniRuntime.currentInstance;
  const index = miniRuntime.currentHookIndex++;
  const previous = instance.hooks[index];
  if (!previous || depsChanged(previous.deps, deps)) {
    instance.hooks[index] = { effect, deps, cleanup: previous?.cleanup ?? null, pending: true };
    miniRuntime.effects.push({ instance, index });
  }
}

function setDomProps(node, props) {
  for (const [key, value] of Object.entries(props)) {
    if (key === "children" || key === "key" || key === "ref" || value === void 0 || value === null) {
      continue;
    }
    if (key === "className") {
      node.setAttribute("class", String(value));
      continue;
    }
    if (key === "htmlFor") {
      node.setAttribute("for", String(value));
      continue;
    }
    if (key === "style" && typeof value === "object") {
      Object.assign(node.style, value);
      continue;
    }
    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      if (eventName === "change") {
        node.addEventListener("input", value);
        node.addEventListener("change", value);
      } else {
        node.addEventListener(eventName, value);
      }
      continue;
    }
    if (typeof value === "boolean") {
      if (value) node.setAttribute(key, "");
      continue;
    }
    if (key in node) {
      try {
        node[key] = value;
        continue;
      } catch {
        // fall through
      }
    }
    node.setAttribute(key, String(value));
  }
}

function renderChildren(parent, children, path) {
  if (children === void 0 || children === null || children === false) return;
  if (Array.isArray(children)) {
    children.forEach((child, index) => {
      const childNode = renderMiniElement(child, `${path}.${index}`);
      if (childNode) parent.appendChild(childNode);
    });
    return;
  }
  const childNode = renderMiniElement(children, `${path}.0`);
  if (childNode) parent.appendChild(childNode);
}

function renderMiniElement(element, path) {
  if (element === void 0 || element === null || element === false) {
    return document.createTextNode("");
  }
  if (typeof element === "string" || typeof element === "number") {
    return document.createTextNode(String(element));
  }
  if (Array.isArray(element)) {
    const fragment = document.createDocumentFragment();
    element.forEach((child, index) => {
      const node = renderMiniElement(child, `${path}.${index}`);
      if (node) fragment.appendChild(node);
    });
    return fragment;
  }
  if (element.$$typeof === Symbol.for("react.portal")) {
    if (!miniRuntime.portalRoot) {
      miniRuntime.portalRoot = document.createElement("div");
      miniRuntime.portalRoot.setAttribute("data-mini-portal", "true");
      document.body.appendChild(miniRuntime.portalRoot);
    }
    const portalContainer = miniRuntime.portalRoot;
    portalContainer.innerHTML = "";
    const portalContent = renderMiniElement(element.children ?? element.props?.children, `${path}.portal`);
    if (portalContent) portalContainer.appendChild(portalContent);
    return document.createTextNode("");
  }
  if (element.$$typeof !== MINI_ELEMENT_TYPE) {
    return document.createTextNode("");
  }
  if (element.type === MINI_FRAGMENT || element.type === MINI_STRICT) {
    const fragment = document.createDocumentFragment();
    renderChildren(fragment, element.props?.children, path);
    return fragment;
  }
  if (typeof element.type === "function") {
    const instance = getInstance(path, element.type);
    const previousInstance = miniRuntime.currentInstance;
    const previousHookIndex = miniRuntime.currentHookIndex;
    miniRuntime.currentInstance = instance;
    miniRuntime.currentHookIndex = 0;
    instance.childCount += 1;
    const rendered = element.type({ ...(element.props ?? {}) });
    const node = renderMiniElement(rendered, `${path}:render`);
    miniRuntime.currentInstance = previousInstance;
    miniRuntime.currentHookIndex = previousHookIndex;
    return node;
  }

  const node = document.createElement(element.type);
  setDomProps(node, element.props ?? {});
  renderChildren(node, element.props?.children, path);
  return node;
}

function renderMiniApp() {
  if (!miniRuntime.root) return;
  miniRuntime.effects = [];
  miniRuntime.root.innerHTML = "";
  if (miniRuntime.portalRoot) {
    miniRuntime.portalRoot.innerHTML = "";
  }
  const node = renderMiniElement(miniRuntime.element, "root");
  if (node) miniRuntime.root.appendChild(node);
  const effects = miniRuntime.effects.slice();
  miniRuntime.effects = [];
  for (const { instance, index } of effects) {
    const record = instance.hooks[index];
    if (!record || !record.pending) continue;
    record.pending = false;
    if (typeof record.cleanup === "function") {
      try {
        record.cleanup();
      } catch {
        // ignore cleanup errors
      }
    }
    try {
      const cleanup = record.effect();
      record.cleanup = typeof cleanup === "function" ? cleanup : null;
    } catch {
      record.cleanup = null;
    }
  }
}

function mountMiniApp(container) {
  miniRuntime.root = container;
  return {
    render(element) {
      miniRuntime.element = element;
      renderMiniApp();
    },
  };
}

j.useState = useMiniState;
j.useMemo = useMiniMemo;
j.useRef = useMiniRef;
j.useCallback = useMiniCallback;
j.useEffect = useMiniEffect;
j.useLayoutEffect = useMiniEffect;

zv.createRoot = mountMiniApp;

const miniRoot = zv.createRoot(document.getElementById("root"));
miniRoot.render(c.jsx(App, {}));
