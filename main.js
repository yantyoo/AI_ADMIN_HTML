const MINI_ELEMENT_TYPE = Symbol.for("react.transitional.element");
const MINI_FRAGMENT = Symbol.for("react.fragment");
const MINI_STRICT = Symbol.for("react.strict_mode");
const miniJsxRuntime = {
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
const miniReactRuntime = { StrictMode: MINI_STRICT, Fragment: MINI_FRAGMENT };
const miniPortalRuntime = {
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
const miniHookRuntime = {
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
const miniRendererRuntime = { createRoot() { return { render() {} }; } };
const jsxRuntime = miniJsxRuntime;
const reactRuntime = miniReactRuntime;
const portalRuntime = miniPortalRuntime;
const hookRuntime = miniHookRuntime;
const rendererRuntime = miniRendererRuntime;
function ModalBackdropPortal({ children: e, backdropClassName: t, onBackdropClick: l }) {
  const [a, n] = hookRuntime.useState(!1);
  return (
    hookRuntime.useEffect(() => {
      n(!0);
    }, []),
    a
      ? portalRuntime.createPortal(
          jsxRuntime.jsx("div", {
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
function ModalDialog({
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
  return jsxRuntime.jsx(ModalBackdropPortal, {
    backdropClassName: s,
    onBackdropClick: l,
    children: jsxRuntime.jsxs("section", {
      className: `modal modal--${u}${i ? " modal--compact" : ""}${f ? ` ${f}` : ""}`,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": h,
      onClick: (m) => m.stopPropagation(),
      children: [
        jsxRuntime.jsx("div", {
          className: `modal__header${b ? ` ${b}` : ""}`,
          children: jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsx("h3", { children: e }),
              n ? jsxRuntime.jsx("p", { children: n }) : null,
            ],
          }),
        }),
        jsxRuntime.jsx("div", {
          className: `modal__body${r ? ` ${r}` : ""}`,
          children: t,
        }),
        a
          ? jsxRuntime.jsx("div", {
              className: `modal__footer${y ? ` ${y}` : ""}`,
              children: a,
            })
          : null,
      ],
    }),
  });
}
const AUTH_STAGE_KEY = "xperp-mock-auth-stage",
  AUTH_USER_ID_KEY = "xperp-mock-auth-user",
  AUTH_PROFILE_KEY = "xperp-mock-auth-profile",
  OTP_FAILURE_COUNT_KEY = "xperp-mock-otp-failures",
  OTP_LOCKED_KEY = "xperp-mock-otp-locked",
  DEFAULT_ACCOUNT_PROFILE = {
    userId: "chat1004",
    id: "chat1004",
    name: "박운영",
    role: "MASTER",
    department: "운영 관리자",
  },
  ACCOUNT_PROFILE_BY_USER_ID = {
    test0000: DEFAULT_ACCOUNT_PROFILE,
    test1111: {
      userId: "test1111",
      id: "op2031",
      name: "김운영",
      role: "OPERATOR",
      department: "운영 담당",
    },
  },
  parseStoredAccountProfile = (e) => {
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
  resolveAccountProfile = (e) => ACCOUNT_PROFILE_BY_USER_ID[e] ?? DEFAULT_ACCOUNT_PROFILE,
  loadCurrentAccountProfile = () => {
    if (typeof window > "u") return DEFAULT_ACCOUNT_PROFILE;
    const e = parseStoredAccountProfile(window.sessionStorage.getItem(AUTH_PROFILE_KEY));
    if (e) return e;
    const t = parseStoredAccountProfile(window.localStorage.getItem(AUTH_PROFILE_KEY));
    if (t) return t;
    const l =
      window.sessionStorage.getItem(AUTH_USER_ID_KEY) ??
      window.localStorage.getItem(AUTH_USER_ID_KEY) ??
      "";
    return resolveAccountProfile(l);
  },
  persistAccountProfile = (e, t) => {
    if (typeof window > "u") return;
    const l = JSON.stringify(e);
    (window.sessionStorage.setItem(AUTH_PROFILE_KEY, l),
      t
        ? window.localStorage.setItem(AUTH_PROFILE_KEY, l)
        : window.localStorage.removeItem(AUTH_PROFILE_KEY));
  },
  clearPersistedAccountProfile = () => {
    typeof window > "u" ||
      (window.sessionStorage.removeItem(AUTH_PROFILE_KEY),
      window.localStorage.removeItem(AUTH_PROFILE_KEY));
  },
  LOGIN_USER_ID_MAX_LENGTH = 10,
  LOGIN_PASSWORD_MAX_LENGTH = 12,
  DEFAULT_OTP_CODE = "123456",
  MAX_OTP_ATTEMPTS = 5,
  invalidLoginDialog = {
    title: "로그인 오류",
    message: `아이디 또는 비밀번호가 올바르지 않습니다.다시 확인해 주세요.`,
  },
  accessDeniedDialog = {
    title: "권한 없음",
    message: `권한이 없는 사용자입니다.관리자에게 권한을 요청해 주세요.`,
  },
  otpLockedDialog = {
    title: "OTP 잠금",
    message: `OTP 오류로 잠금된 아이디 입니다.관리자에게 문의하세요.`,
  },
  loginAccountDirectory = {
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
  EMPTY_CREDENTIALS = { userId: "", password: "", otp: "" },
  delay = (e) =>
    new Promise((t) => {
      window.setTimeout(t, e);
    }),
  toSafeNumber = (e) => {
    const t = Number(e ?? "0");
    return Number.isFinite(t) ? t : 0;
  },
  sanitizeUserId = (e) => e.replace(/[^A-Za-z0-9]/g, "").slice(0, LOGIN_USER_ID_MAX_LENGTH),
  sanitizePassword = (e) => e.replace(/[^A-Za-z0-9]/g, "").slice(0, LOGIN_PASSWORD_MAX_LENGTH);
function AuthScreen({ onAuthenticated }) {
  const [credentialForm, setCredentialForm] = hookRuntime.useState(EMPTY_CREDENTIALS),
    [helperMessage, setHelperMessage] = hookRuntime.useState(""),
    [errorMessage, setErrorMessage] = hookRuntime.useState(""),
    [isSubmitting, setIsSubmitting] = hookRuntime.useState(!1),
    [rememberUserId, setRememberUserId] = hookRuntime.useState(!1),
    [isOtpPanelOpen, setIsOtpPanelOpen] = hookRuntime.useState(!1),
    [otpFailureCount, setOtpFailureCount] = hookRuntime.useState(0),
    [isOtpLocked, setIsOtpLocked] = hookRuntime.useState(!1),
    [noticeDialog, setNoticeDialog] = hookRuntime.useState(null),
    otpCaption = hookRuntime.useMemo(
      () =>
        isOtpLocked
          ? "OTP 오류로 잠금된 아이디입니다. 관리자에게 문의하세요."
          : otpFailureCount > 0
            ? `OTP 인증에 실패했습니다. (${otpFailureCount}/${MAX_OTP_ATTEMPTS})`
            : "OTP를 입력하면 로그인 절차를 완료합니다.",
      [otpFailureCount, isOtpLocked],
    );
  hookRuntime.useEffect(() => {
    if (typeof window > "u") return;
    const authStage = window.sessionStorage.getItem(AUTH_STAGE_KEY),
      storedUserId =
        window.sessionStorage.getItem(AUTH_USER_ID_KEY) ??
        window.localStorage.getItem(AUTH_USER_ID_KEY) ??
        "",
      otpLocked = window.sessionStorage.getItem(OTP_LOCKED_KEY) === "true",
      failures = toSafeNumber(window.sessionStorage.getItem(OTP_FAILURE_COUNT_KEY));
    if (authStage === "authenticated") {
      onAuthenticated();
      return;
    }
    const sanitizedUserId = sanitizeUserId(storedUserId);
    (setCredentialForm((prev) => ({ ...prev, userId: sanitizedUserId })),
      setIsOtpLocked(otpLocked),
      setOtpFailureCount(failures),
      setIsOtpPanelOpen(authStage === "otp_pending" && !!sanitizedUserId));
  }, []);
  const isComposingRef = hookRuntime.useRef({ userId: !1, password: !1, otp: !1 }),
    updateField = (field) => (value) => {
      if (!isComposingRef.current[field]) {
        const sanitized = field === "userId" ? sanitizeUserId(value) : field === "password" ? sanitizePassword(value) : value;
        (setCredentialForm((prev) => ({ ...prev, [field]: sanitized })), setErrorMessage(""));
      }
    },
    handleCompositionStart = (field) => (event) => {
      isComposingRef.current[field] = !0;
    },
    handleCompositionEnd = (field) => (event) => {
      isComposingRef.current[field] = !1;
      if (field === "userId") {
        const sanitized = sanitizeUserId(event.target.value);
        (setCredentialForm((prev) => ({ ...prev, userId: sanitized })), setErrorMessage(""));
      }
      if (field === "password") {
        const sanitized = sanitizePassword(event.target.value);
        (setCredentialForm((prev) => ({ ...prev, password: sanitized })), setErrorMessage(""));
      }
      if (field === "otp") {
        setCredentialForm((prev) => ({ ...prev, otp: event.target.value }));
      }
    },
    showNoticeDialog = (dialog) => {
      setNoticeDialog(dialog);
    },
    hideNoticeDialog = () => {
      setNoticeDialog(null);
    },
    openOtpPanel = () => {
      (setIsOtpPanelOpen(!0), setErrorMessage(""), setHelperMessage(""), setOtpFailureCount(0), setIsOtpLocked(!1));
    },
    closeOtpPanel = () => {
      (setIsOtpPanelOpen(!1), setCredentialForm((prev) => ({ ...prev, otp: "" })), setHelperMessage(""), setErrorMessage(""));
    },
    handleCredentialSubmit = async (event) => {
      if ((event.preventDefault(), isSubmitting)) return;
      if (!credentialForm.userId.trim() || !credentialForm.password.trim()) {
        setErrorMessage("아이디와 비밀번호를 입력해 주세요.");
        return;
      }
      const userId = sanitizeUserId(credentialForm.userId.trim()),
        password = sanitizePassword(credentialForm.password.trim()),
        account = loginAccountDirectory[userId];
      if (!account || account.password !== password) {
        showNoticeDialog(invalidLoginDialog);
        return;
      }
      if (!account.allowed) {
        showNoticeDialog(accessDeniedDialog);
        return;
      }
      (setIsSubmitting(!0),
        setHelperMessage("OTP 입력 창을 여는 중입니다."),
        window.sessionStorage.setItem(AUTH_STAGE_KEY, "otp_pending"),
        window.sessionStorage.setItem(AUTH_USER_ID_KEY, userId),
        window.sessionStorage.setItem(OTP_FAILURE_COUNT_KEY, "0"),
        window.sessionStorage.removeItem(OTP_LOCKED_KEY),
        rememberUserId
          ? window.localStorage.setItem(AUTH_USER_ID_KEY, userId)
          : window.localStorage.removeItem(AUTH_USER_ID_KEY),
        await delay(250),
        setIsSubmitting(!1),
        openOtpPanel());
    },
    handleOtpSubmit = async (event) => {
      if ((event.preventDefault(), isSubmitting || !isOtpPanelOpen)) return;
      if (isOtpLocked) {
        showNoticeDialog(otpLockedDialog);
        return;
      }
      if (credentialForm.otp.trim().length !== 6) {
        setErrorMessage("6자리 OTP를 입력해 주세요.");
        return;
      }
      if ((setIsSubmitting(!0), credentialForm.otp.trim() !== DEFAULT_OTP_CODE)) {
        const newFailCount = otpFailureCount + 1,
          shouldLock = newFailCount >= MAX_OTP_ATTEMPTS;
        (setOtpFailureCount(newFailCount),
          window.sessionStorage.setItem(OTP_FAILURE_COUNT_KEY, String(newFailCount)),
          shouldLock
            ? (setIsOtpLocked(!0), window.sessionStorage.setItem(OTP_LOCKED_KEY, "true"), showNoticeDialog(otpLockedDialog))
            : setErrorMessage(`OTP 인증에 실패했습니다. (${newFailCount}/${MAX_OTP_ATTEMPTS})`),
          setIsSubmitting(!1));
        return;
      }
      const accountEntry = loginAccountDirectory[credentialForm.userId.trim()],
        profile = (accountEntry == null ? void 0 : accountEntry.profile) ?? {
          userId: credentialForm.userId.trim(),
          id: credentialForm.userId.trim(),
          name: credentialForm.userId.trim(),
          role: "MASTER",
          department: "운영 관리자",
        };
      (persistAccountProfile(profile, rememberUserId),
        window.sessionStorage.setItem(AUTH_STAGE_KEY, "authenticated"),
        window.sessionStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(profile)),
        window.sessionStorage.removeItem(OTP_FAILURE_COUNT_KEY),
        window.sessionStorage.removeItem(OTP_LOCKED_KEY),
        setHelperMessage("대시보드로 이동합니다."),
        await delay(250),
        onAuthenticated());
    },
    isCredentialFormDisabled = isSubmitting || !credentialForm.userId.trim() || !credentialForm.password.trim(),
    isOtpSubmitDisabled = isSubmitting || isOtpLocked || credentialForm.otp.trim().length !== 6;
  return jsxRuntime.jsxs("main", {
    className: "auth-shell auth-shell--standalone",
    children: [
      jsxRuntime.jsxs("section", {
        className: "auth-card auth-standalone",
        children: [
          jsxRuntime.jsxs("div", {
            className: "auth-card__intro auth-standalone__intro",
            children: [
              jsxRuntime.jsx("span", {
                className: "auth-card__badge",
                children: "Xp도우미",
              }),
              jsxRuntime.jsx("h1", {
                className: "auth-card__title",
                children: "Xp도우미 관리자",
              }),
              jsxRuntime.jsx("p", {
                className: "auth-card__eyebrow",
                children: "관리자 전용 시스템",
              }),
              jsxRuntime.jsxs("p", {
                className: "auth-card__description",
                children: [
                  "본 시스템은 내부 관리자 전용입니다.",
                  jsxRuntime.jsx("br", {}),
                  "무단 접근 및 정보 열람 시 관련 법령에 따라 책임이 발생할 수 있습니다.",
                ],
              }),
            ],
          }),
          jsxRuntime.jsxs("form", {
            className: "auth-form",
            onSubmit: handleCredentialSubmit,
            children: [
              jsxRuntime.jsxs("div", {
                className: "auth-form__header",
                children: [
                  jsxRuntime.jsx("h2", {
                    className: "auth-form__title",
                    children: "관리자 로그인",
                  }),
                  jsxRuntime.jsx("p", {
                    className: "auth-form__caption",
                    children: "승인된 계정만 접속 가능합니다.",
                  }),
                ],
              }),
              jsxRuntime.jsxs("div", {
                className: "auth-form__fields",
                children: [
                  jsxRuntime.jsxs("label", {
                    className: "field auth-field",
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "field__label",
                        children: "아이디",
                      }),
                      jsxRuntime.jsx("input", {
                        className: "field__input auth-input",
                        maxLength: LOGIN_USER_ID_MAX_LENGTH,
                        value: credentialForm.userId,
                        onChange: (ev) => updateField("userId")(ev.target.value),
                        onCompositionStart: handleCompositionStart("userId"),
                        onCompositionEnd: handleCompositionEnd("userId"),
                        placeholder: "예: admin01",
                        autoComplete: "username",
                        inputMode: "text",
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("label", {
                    className: "field auth-field",
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "field__label",
                        children: "비밀번호",
                      }),
                      jsxRuntime.jsx("input", {
                        type: "password",
                        className: "field__input auth-input",
                        maxLength: LOGIN_PASSWORD_MAX_LENGTH,
                        value: credentialForm.password,
                        onChange: (ev) => updateField("password")(ev.target.value),
                        onCompositionStart: handleCompositionStart("password"),
                        onCompositionEnd: handleCompositionEnd("password"),
                        placeholder: "비밀번호 입력",
                        autoComplete: "current-password",
                        inputMode: "text",
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("label", {
                    className: "auth-remember",
                    children: [
                      jsxRuntime.jsx("input", {
                        type: "checkbox",
                        checked: rememberUserId,
                        onChange: (ev) => setRememberUserId(ev.target.checked),
                      }),
                      jsxRuntime.jsx("span", { children: "아이디 저장" }),
                    ],
                  }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "auth-form__actions",
                children: jsxRuntime.jsx("button", {
                  type: "submit",
                  className: "primary-button auth-submit",
                  disabled: isCredentialFormDisabled,
                  children: isSubmitting ? "처리 중..." : "로그인",
                }),
              }),
              jsxRuntime.jsxs("div", {
                className: "auth-form__feedback",
                "aria-live": "polite",
                children: [
                  errorMessage
                    ? jsxRuntime.jsx("p", { className: "auth-error", children: errorMessage })
                    : null,
                  !errorMessage && helperMessage
                    ? jsxRuntime.jsx("p", { className: "auth-helper", children: helperMessage })
                    : null,
                ],
              }),
            ],
          }),
        ],
      }),
      isOtpPanelOpen
        ? jsxRuntime.jsx(ModalBackdropPortal, {
            backdropClassName: "auth-otp-backdrop",
            onBackdropClick: closeOtpPanel,
            children: jsxRuntime.jsxs("section", {
              className: "modal auth-otp-modal",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "OTP 인증",
              onClick: (ev) => ev.stopPropagation(),
              children: [
                jsxRuntime.jsx("div", {
                  className: "modal__header auth-otp-modal__header",
                  children: jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsx("h3", { children: "OTP 인증" }),
                      jsxRuntime.jsx("p", {
                        className: "auth-otp-modal__caption",
                        children: otpCaption,
                      }),
                    ],
                  }),
                }),
                jsxRuntime.jsxs("form", {
                  className: "auth-otp-modal__body",
                  onSubmit: handleOtpSubmit,
                  children: [
                    jsxRuntime.jsxs("label", {
                      className: "field auth-otp-field",
                      children: [
                        jsxRuntime.jsx("span", {
                          className: "field__label",
                          children: "OTP",
                        }),
                        jsxRuntime.jsx("input", {
                          className: "field__input auth-input auth-input--otp",
                          value: credentialForm.otp,
                          onChange: (ev) => updateField("otp")(ev.target.value),
                          onCompositionStart: handleCompositionStart("otp"),
                          onCompositionEnd: handleCompositionEnd("otp"),
                          placeholder: "6자리 OTP 입력",
                          inputMode: "numeric",
                          autoComplete: "one-time-code",
                          maxLength: 6,
                          disabled: isOtpLocked,
                        }),
                      ],
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "auth-form__feedback",
                      "aria-live": "polite",
                      children: [
                        errorMessage
                          ? jsxRuntime.jsx("p", { className: "auth-error", children: errorMessage })
                          : null,
                        !errorMessage && helperMessage
                          ? jsxRuntime.jsx("p", {
                              className: "auth-helper",
                              children: helperMessage,
                            })
                          : null,
                      ],
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "auth-form__actions auth-otp-modal__actions",
                      children: [
                        jsxRuntime.jsx("button", {
                          type: "button",
                          className: "secondary-button auth-cancel",
                          onClick: closeOtpPanel,
                          children: "취소",
                        }),
                        jsxRuntime.jsx("button", {
                          type: "submit",
                          className: "primary-button auth-submit",
                          disabled: isOtpSubmitDisabled,
                          children: isSubmitting ? "처리 중..." : "인증 완료",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          })
        : null,
      noticeDialog
        ? jsxRuntime.jsx(ModalDialog, {
            title: noticeDialog.title,
            ariaLabel: noticeDialog.title,
            onClose: hideNoticeDialog,
            size: "sm",
            compact: !0,
            backdropClassName: "auth-notice-backdrop",
            className: "auth-notice-modal",
            headerClassName: "modal__header--tight auth-notice-modal__header",
            bodyClassName: "auth-notice-modal__body",
            footerClassName: "modal__footer--split",
            footer: jsxRuntime.jsx("button", {
              type: "button",
              className: "primary-button",
              onClick: hideNoticeDialog,
              children: "확인",
            }),
            children: jsxRuntime.jsx("p", {
              className: "auth-notice-modal__message",
              children: noticeDialog.message,
            }),
          })
        : null,
    ],
  });
}
const buildKeywordSummary = (e, t, l) => {
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
        positive: buildKeywordSummary(340, 187, [
          { label: "응답이 빨라요", count: 52 },
          { label: "설명이 명확해요", count: 44 },
          { label: "추천할 만해요", count: 33 },
          { label: "사용하기 쉬워요", count: 29 },
          { label: "불편함이 없어요", count: 24 },
        ]),
        negative: buildKeywordSummary(340, 153, [
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
        positive: buildKeywordSummary(1680, 924, [
          { label: "응답이 빨라요", count: 260 },
          { label: "설명이 명확해요", count: 210 },
          { label: "추천할 만해요", count: 175 },
          { label: "사용하기 쉬워요", count: 150 },
          { label: "불편함이 없어요", count: 129 },
        ]),
        negative: buildKeywordSummary(1680, 756, [
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
        positive: buildKeywordSummary(11240, 6519, [
          { label: "응답이 빨라요", count: 1820 },
          { label: "설명이 명확해요", count: 1512 },
          { label: "추천할 만해요", count: 1260 },
          { label: "사용하기 쉬워요", count: 1014 },
          { label: "불편함이 없어요", count: 913 },
        ]),
        negative: buildKeywordSummary(11240, 4721, [
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
  return jsxRuntime.jsxs("div", {
    className: `section-header${l ? ` ${l}` : ""}`,
    children: [
      jsxRuntime.jsx("div", {
        className: "section-header__copy",
        children: jsxRuntime.jsx(n, { className: "section-header__title", children: e }),
      }),
      t
        ? jsxRuntime.jsx("div", { className: "section-header__actions", children: t })
        : null,
    ],
  });
}
const normalizeSearchKeyword = (e) =>
    e
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/[^0-9a-z가-힣]/gi, ""),
  sortDescendingByTimestamp = (e, t) => t.localeCompare(e),
  formatPercent = (e) => (Number.isInteger(e) ? `${e}%` : `${e.toFixed(1)}%`);
function KeywordList({ title: e, items: t, bare: l }) {
  return jsxRuntime.jsxs("section", {
    className: `dashboard-keyword-card${l ? " dashboard-keyword-card--bare" : ""}`,
    children: [
      jsxRuntime.jsx(SectionHeader, { title: e, className: "dashboard-keyword-card__header" }),
      t.length === 0
        ? jsxRuntime.jsx("div", {
            className: "dashboard-keyword-empty",
            children: "조건에 맞는 질문 키워드가 없습니다.",
          })
        : jsxRuntime.jsx("ol", {
            className: "keyword-list",
            children: t.map((a) =>
              jsxRuntime.jsxs(
                "li",
                {
                  className: "keyword-list__item",
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "keyword-list__left",
                      children: [
                        jsxRuntime.jsx("span", {
                          className: "keyword-list__rank",
                          children: a.rank,
                        }),
                        jsxRuntime.jsx("span", {
                          className: "keyword-list__label",
                          children: a.label,
                        }),
                      ],
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "keyword-list__stats",
                      children: [
                        jsxRuntime.jsxs("strong", {
                          className: "keyword-list__count",
                          children: [a.count.toLocaleString(), "건"],
                        }),
                        jsxRuntime.jsx("span", {
                          className: "keyword-list__divider",
                          children: "·",
                        }),
                        jsxRuntime.jsx("span", {
                          className: "keyword-list__ratio",
                          children: formatPercent(a.ratio),
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
const feedbackReactionMeta = {
    POSITIVE: { label: "만족해요", tooltipLabel: "만족해요" },
    NEGATIVE: { label: "아쉬워요", tooltipLabel: "아쉬워요" },
  },
  DONUT_SVG_SIZE = 100,
  DONUT_CENTER = 50,
  DONUT_OUTER_RADIUS = 42,
  DONUT_INNER_RADIUS = 24,
  getDonutPoint = (cx, cy, radius, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  },
  buildDonutSlicePath = (startAngle, endAngle) => {
    const outerEnd = getDonutPoint(DONUT_CENTER, DONUT_CENTER, DONUT_OUTER_RADIUS, endAngle),
      outerStart = getDonutPoint(DONUT_CENTER, DONUT_CENTER, DONUT_OUTER_RADIUS, startAngle),
      innerStart = getDonutPoint(DONUT_CENTER, DONUT_CENTER, DONUT_INNER_RADIUS, startAngle),
      innerEnd = getDonutPoint(DONUT_CENTER, DONUT_CENTER, DONUT_INNER_RADIUS, endAngle),
      largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return [
      `M ${outerEnd.x.toFixed(3)} ${outerEnd.y.toFixed(3)}`,
      `A ${DONUT_OUTER_RADIUS} ${DONUT_OUTER_RADIUS} 0 ${largeArcFlag} 0 ${outerStart.x.toFixed(3)} ${outerStart.y.toFixed(3)}`,
      `L ${innerStart.x.toFixed(3)} ${innerStart.y.toFixed(3)}`,
      `A ${DONUT_INNER_RADIUS} ${DONUT_INNER_RADIUS} 0 ${largeArcFlag} 1 ${innerEnd.x.toFixed(3)} ${innerEnd.y.toFixed(3)}`,
      "Z",
    ].join(" ");
  };
function FeedbackRatio({ data }) {
  const [activeTab, setActiveTab] = hookRuntime.useState(data.defaultReaction),
    [hoveredType, setHoveredType] = hookRuntime.useState(null),
    positivePercent = (data.positive.count / data.totalCount) * 100,
    negativePercent = (data.negative.count / data.totalCount) * 100,
    positiveSlicePath = hookRuntime.useMemo(
      () => buildDonutSlicePath(0, (data.positive.count / data.totalCount) * 360),
      [data.positive.count, data.totalCount],
    ),
    negativeSlicePath = hookRuntime.useMemo(
      () => buildDonutSlicePath((data.positive.count / data.totalCount) * 360, 360),
      [data.positive.count, data.totalCount],
    ),
    hoveredData = hoveredType ? data[hoveredType === "POSITIVE" ? "positive" : "negative"] : null,
    keywordsTitle = `${feedbackReactionMeta[activeTab].label} TOP5 키워드`;
  return jsxRuntime.jsxs("section", {
    className: "panel panel--side feedback-ratio-card",
    children: [
      jsxRuntime.jsx(SectionHeader, {
        title: "피드백 비율",
        className: "feedback-ratio-card__header",
      }),
      jsxRuntime.jsxs("div", {
        className: "feedback-ratio",
        children: [
          jsxRuntime.jsxs("div", {
            className: "feedback-ratio__chart-shell",
            children: [
              jsxRuntime.jsxs("svg", {
                className: "feedback-ratio__chart",
                viewBox: `0 0 ${DONUT_SVG_SIZE} ${DONUT_SVG_SIZE}`,
                role: "img",
                "aria-label": `피드백 비율 도넛 차트. 만족해요 ${formatPercent(positivePercent)}, 아쉬워요 ${formatPercent(negativePercent)}`,
                children: [
                  jsxRuntime.jsx("path", {
                    d: positiveSlicePath,
                    className:
                      "feedback-ratio__slice feedback-ratio__slice--positive",
                    onMouseEnter: () => setHoveredType("POSITIVE"),
                    onMouseLeave: () => setHoveredType(null),
                    onFocus: () => setHoveredType("POSITIVE"),
                    onBlur: () => setHoveredType(null),
                    tabIndex: 0,
                  }),
                  jsxRuntime.jsx("path", {
                    d: negativeSlicePath,
                    className:
                      "feedback-ratio__slice feedback-ratio__slice--negative",
                    onMouseEnter: () => setHoveredType("NEGATIVE"),
                    onMouseLeave: () => setHoveredType(null),
                    onFocus: () => setHoveredType("NEGATIVE"),
                    onBlur: () => setHoveredType(null),
                    tabIndex: 0,
                  }),
                  jsxRuntime.jsx("circle", {
                    cx: DONUT_CENTER,
                    cy: DONUT_CENTER,
                    r: DONUT_INNER_RADIUS,
                    className: "feedback-ratio__hole",
                  }),
                  jsxRuntime.jsx("text", {
                    x: "50",
                    y: "46",
                    textAnchor: "middle",
                    className: "feedback-ratio__center-label",
                    children: "전체 건수",
                  }),
                  jsxRuntime.jsxs("text", {
                    x: "50",
                    y: "60",
                    textAnchor: "middle",
                    className: "feedback-ratio__center-value",
                    children: [data.totalCount.toLocaleString(), "건"],
                  }),
                ],
              }),
              hoveredData
                ? jsxRuntime.jsxs("div", {
                    className: "feedback-ratio__tooltip",
                    "aria-live": "polite",
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "feedback-ratio__tooltip-label",
                        children: feedbackReactionMeta[hoveredType].tooltipLabel,
                      }),
                      jsxRuntime.jsxs("strong", {
                        children: [
                          hoveredData.count.toLocaleString(),
                          "건 · ",
                          formatPercent(hoveredData.ratio),
                        ],
                      }),
                    ],
                  })
                : null,
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "feedback-toggle",
            role: "tablist",
            "aria-label": "피드백 유형",
            children: ["POSITIVE", "NEGATIVE"].map((reactionKey) => {
              const isActive = reactionKey === activeTab;
              return jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": isActive,
                  className: `feedback-toggle__button${isActive ? " is-selected" : ""}`,
                  onClick: () => setActiveTab(reactionKey),
                  children: feedbackReactionMeta[reactionKey].label,
                },
                reactionKey,
              );
            }),
          }),
          jsxRuntime.jsx(KeywordList, {
            title: keywordsTitle,
            items: activeTab === "POSITIVE" ? data.positive.keywords : data.negative.keywords,
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
  return jsxRuntime.jsxs("article", {
    className: "metric-card",
    children: [
      jsxRuntime.jsx("div", { className: "metric-card__label", children: e.label }),
      jsxRuntime.jsxs("div", {
        className: "metric-card__value",
        children: [e.value.toLocaleString(), "건"],
      }),
      jsxRuntime.jsxs("div", {
        className: `metric-card__compare ${l}`,
        children: [
          jsxRuntime.jsxs("strong", { children: [t, " ", e.compareRate, "%"] }),
          jsxRuntime.jsx("span", { children: e.compareLabel }),
        ],
      }),
    ],
  });
}
const timeRangeMeta = {
    DAY: { label: "일간", note: "오늘 기준 7일" },
    WEEK: { label: "주간", note: "이번주 기준 7주" },
    MONTH: { label: "월간", note: "이번달 기준 7달" },
  },
  TIME_RANGE_KEYS = ["DAY", "WEEK", "MONTH"];
function TimeRangeTabs({ value: e, onChange: t }) {
  return jsxRuntime.jsx("div", {
    className: "time-range-tabs",
    role: "tablist",
    "aria-label": "기간 선택",
    children: TIME_RANGE_KEYS.map((l) => {
      const a = l === e;
      return jsxRuntime.jsx(
        "button",
        {
          type: "button",
          className: `time-range-tabs__button${a ? " is-selected" : ""}`,
          onClick: () => t(l),
          children: timeRangeMeta[l].label,
        },
        l,
      );
    }),
  });
}
const CHART_WIDTH = 760,
  CHART_HEIGHT = 340,
  CHART_PADDING = 32,
  TOOLTIP_WIDTH = 24,
  BAR_CORNER_RADIUS = 5,
  clamp = (val, min, max) => Math.min(Math.max(val, min), max),
  buildRoundedRectPath = (x, y, width, height) => {
    const clampedHeight = Math.max(height, 0),
      cornerRadius = Math.min(BAR_CORNER_RADIUS, width / 2, clampedHeight / 2);
    return clampedHeight
      ? cornerRadius === 0
        ? `M ${x} ${y} H ${x + width} V ${y + clampedHeight} H ${x} Z`
        : [
            `M ${x} ${y + clampedHeight}`,
            `V ${y + cornerRadius}`,
            `Q ${x} ${y} ${x + cornerRadius} ${y}`,
            `H ${x + width - cornerRadius}`,
            `Q ${x + width} ${y} ${x + width} ${y + cornerRadius}`,
            `V ${y + clampedHeight}`,
            "Z",
          ].join(" ")
      : "";
  };
function TrendChart({ points }) {
  const [tooltip, setTooltip] = hookRuntime.useState(null),
    maxVisitors = Math.max(...points.map((pt) => pt.visitors), 1),
    maxInquiries = Math.max(...points.map((pt) => pt.inquiries), 1),
    maxValue = Math.max(maxVisitors, maxInquiries) || 1,
    computedPoints = hookRuntime.useMemo(
      () =>
        points.map((pt, idx) => {
          const x = CHART_PADDING + (idx * (CHART_WIDTH - CHART_PADDING * 2)) / Math.max(points.length - 1, 1),
            visitorY = CHART_HEIGHT - CHART_PADDING - (pt.visitors / maxValue) * (CHART_HEIGHT - CHART_PADDING * 2),
            inquiryY = CHART_HEIGHT - CHART_PADDING - (pt.inquiries / maxValue) * (CHART_HEIGHT - CHART_PADDING * 2);
          return { ...pt, x, visitorY, inquiryY };
        }),
      [points, maxValue],
    ),
    inquiryLinePath = computedPoints
      .map((pt, idx) => `${idx === 0 ? "M" : "L"} ${pt.x} ${pt.inquiryY}`)
      .join(" "),
    handleBarHover = (event, pt) => {
      var svgEl;
      const svgRect =
        (svgEl = event.currentTarget.ownerSVGElement) == null
          ? void 0
          : svgEl.getBoundingClientRect();
      if (!svgRect) return;
      const rawLeft = event.clientX - svgRect.left + 14,
        rawTop = event.clientY - svgRect.top - 14,
        clampedLeft = clamp(rawLeft, 12, Math.max(svgRect.width - 208, 12)),
        clampedTop = clamp(rawTop, 12, Math.max(svgRect.height - 104, 12));
      setTooltip({ point: pt, left: clampedLeft, top: clampedTop });
    };
  if (!computedPoints.length)
    return jsxRuntime.jsxs("div", {
      className: "trend-chart trend-chart--empty",
      children: [
        jsxRuntime.jsx("div", {
          className: "trend-chart__empty",
          children: "표시할 차트 데이터가 없습니다.",
        }),
        jsxRuntime.jsxs("div", {
          className: "trend-chart__legend",
          children: [
            jsxRuntime.jsxs("span", {
              className: "trend-chart__legend-item",
              children: [
                jsxRuntime.jsx("span", {
                  className:
                    "trend-chart__legend-dot trend-chart__legend-dot--bar",
                }),
                jsxRuntime.jsx("span", { children: "접속자 수" }),
              ],
            }),
            jsxRuntime.jsxs("span", {
              className: "trend-chart__legend-item",
              children: [
                jsxRuntime.jsx("span", { className: "trend-chart__legend-dot" }),
                jsxRuntime.jsx("span", { children: "문의 수" }),
              ],
            }),
          ],
        }),
      ],
    });
  const hoveredPoint = tooltip == null ? void 0 : tooltip.point;
  return jsxRuntime.jsxs("div", {
    className: "trend-chart",
    children: [
      jsxRuntime.jsxs("div", {
        className: "trend-chart__stage",
        children: [
          jsxRuntime.jsxs("svg", {
            viewBox: `0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`,
            className: "trend-chart__svg",
            role: "img",
            children: [
              [0, 1, 2, 3, 4].map((lineIdx) => {
                const lineY = CHART_PADDING + (lineIdx * (CHART_HEIGHT - CHART_PADDING * 2)) / 4;
                return jsxRuntime.jsx(
                  "line",
                  {
                    x1: CHART_PADDING,
                    y1: lineY,
                    x2: CHART_WIDTH - CHART_PADDING,
                    y2: lineY,
                    className: "trend-chart__grid",
                  },
                  lineIdx,
                );
              }),
              computedPoints.map((pt) => {
                const barX = pt.x - TOOLTIP_WIDTH / 2,
                  barHeight = CHART_HEIGHT - CHART_PADDING - pt.visitorY,
                  barPath = buildRoundedRectPath(barX, pt.visitorY, TOOLTIP_WIDTH, barHeight);
                return jsxRuntime.jsxs(
                  "g",
                  {
                    className: "trend-chart__bar-group",
                    onMouseEnter: (ev) => handleBarHover(ev, pt),
                    onMouseMove: (ev) => handleBarHover(ev, pt),
                    onMouseLeave: () => setTooltip(null),
                    children: [
                      jsxRuntime.jsx("path", { d: barPath, className: "trend-chart__bar" }),
                      jsxRuntime.jsx("rect", {
                        x: barX - 4,
                        y: pt.visitorY,
                        width: TOOLTIP_WIDTH + 8,
                        height: barHeight,
                        fill: "transparent",
                        className: "trend-chart__bar-hitarea",
                      }),
                      jsxRuntime.jsx("text", {
                        x: pt.x,
                        y: CHART_HEIGHT - 8,
                        textAnchor: "middle",
                        className: "trend-chart__label",
                        children: pt.label,
                      }),
                    ],
                  },
                  `${pt.label}-bar`,
                );
              }),
              jsxRuntime.jsx("path", { d: inquiryLinePath, className: "trend-chart__path" }),
              computedPoints.map((pt) =>
                jsxRuntime.jsxs(
                  "g",
                  {
                    className: "trend-chart__point-group",
                    onMouseEnter: (ev) => handleBarHover(ev, pt),
                    onMouseMove: (ev) => handleBarHover(ev, pt),
                    onMouseLeave: () => setTooltip(null),
                    children: [
                      jsxRuntime.jsx("circle", {
                        cx: pt.x,
                        cy: pt.inquiryY,
                        r: "5",
                        className: "trend-chart__point",
                      }),
                      jsxRuntime.jsx("circle", {
                        cx: pt.x,
                        cy: pt.inquiryY,
                        r: "10",
                        fill: "transparent",
                      }),
                    ],
                  },
                  pt.label,
                ),
              ),
            ],
          }),
          hoveredPoint && tooltip
            ? jsxRuntime.jsxs("div", {
                className: "trend-chart__tooltip",
                style: { left: tooltip.left, top: tooltip.top },
                "aria-live": "polite",
                children: [
                  jsxRuntime.jsx("span", {
                    className: "trend-chart__tooltip-date",
                    children: hoveredPoint.dateLabel,
                  }),
                  jsxRuntime.jsxs("strong", {
                    children: [hoveredPoint.visitors.toLocaleString(), " 접속자"],
                  }),
                  jsxRuntime.jsxs("span", {
                    children: [hoveredPoint.inquiries.toLocaleString(), " 문의"],
                  }),
                ],
              })
            : null,
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "trend-chart__legend",
        children: [
          jsxRuntime.jsxs("span", {
            className: "trend-chart__legend-item",
            children: [
              jsxRuntime.jsx("span", {
                className:
                  "trend-chart__legend-dot trend-chart__legend-dot--bar",
              }),
              jsxRuntime.jsx("span", { children: "접속자 수" }),
            ],
          }),
          jsxRuntime.jsxs("span", {
            className: "trend-chart__legend-item",
            children: [
              jsxRuntime.jsx("span", { className: "trend-chart__legend-dot" }),
              jsxRuntime.jsx("span", { children: "문의 수" }),
            ],
          }),
        ],
      }),
    ],
  });
}
function DashboardView({ data }) {
  const [selectedRange, setSelectedRange] = hookRuntime.useState(data.selectedRange),
    currentSection = DASHBOARD_SECTIONS[selectedRange];
  return jsxRuntime.jsxs("div", {
    className: "dashboard-grid",
    children: [
      jsxRuntime.jsxs("section", {
        className: "panel panel--main",
        children: [
          jsxRuntime.jsx(SectionHeader, {
            title: "기간별 지표 현황",
            actions: jsxRuntime.jsx("div", {
              className: "dashboard-header-actions",
              children: jsxRuntime.jsx(TimeRangeTabs, { value: selectedRange, onChange: setSelectedRange }),
            }),
          }),
          jsxRuntime.jsx("div", {
            className: "metric-card-grid",
            children: currentSection.metrics.map((metric) => jsxRuntime.jsx(MetricCard, { metric }, metric.key)),
          }),
          jsxRuntime.jsx(TrendChart, { points: currentSection.trend }),
        ],
      }),
      jsxRuntime.jsxs("section", {
        className: "dashboard-side",
        children: [
          jsxRuntime.jsx(KeywordList, { title: "질문 키워드", items: data.fixedKeywords }),
          jsxRuntime.jsx(FeedbackRatio, { data: data.fixedFeedbackRatio }),
        ],
      }),
    ],
  });
}
const contentDocumentList = [
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
  return jsxRuntime.jsxs("section", {
    className: `detail-frame${a ? ` ${a}` : ""}`,
    children: [
      jsxRuntime.jsx(SectionHeader, {
        title: e,
        actions: t,
        className: "detail-frame__header",
        titleAs: u,
      }),
      jsxRuntime.jsx("div", {
        className: `detail-frame__body${n ? ` ${n}` : ""}`,
        children: l,
      }),
    ],
  });
}
function ToastStack({ items: e }) {
  return e.length === 0
    ? null
    : jsxRuntime.jsx("div", {
        className: "toast-stack",
        "aria-live": "polite",
        "aria-atomic": "true",
        children: e.map((t) =>
          jsxRuntime.jsx(
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
function useTimedMessage(e = 3e3) {
  const [t, l] = hookRuntime.useState(null);
  hookRuntime.useEffect(() => {
    if (!t) return;
    const u = window.setTimeout(() => l(null), e);
    return () => window.clearTimeout(u);
  }, [e, t]);
  const a = hookRuntime.useCallback((u) => {
      l(u);
    }, []),
    n = hookRuntime.useCallback(() => {
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
  EMPTY_UPLOAD_FORM = { fileName: "", path: "", type: "MANUAL" },
  allowedFileExtensions = ".pdf,.docx,.txt,.md",
  messageDurationMs = 3e3,
  sortContentDocumentList = (e, t) => sortDescendingByTimestamp(e.updatedAt, t.updatedAt) || sortDescendingByTimestamp(e.createdAt, t.createdAt);
function ContentManagementView({ documents: e }) {
  var Z, ue;
  const t = hookRuntime.useRef(null),
    l = e.slice().sort(sortContentDocumentList),
    [a, n] = hookRuntime.useState({ keyword: "", type: "ALL" }),
    [u, i] = hookRuntime.useState(""),
    [s, f] = hookRuntime.useState(() => l),
    [r, b] = hookRuntime.useState(((Z = l[0]) == null ? void 0 : Z.id) ?? ""),
    [y, h] = hookRuntime.useState(!1),
    [m, A] = hookRuntime.useState(!1),
    [N, R] = hookRuntime.useState("CREATE"),
    [o, d] = hookRuntime.useState(null),
    v = useTimedMessage(messageDurationMs),
    g = useTimedMessage(messageDurationMs),
    [E, C] = hookRuntime.useState(""),
    [T, D] = hookRuntime.useState(EMPTY_UPLOAD_FORM),
    S = hookRuntime.useMemo(() => {
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
        .sort(sortContentDocumentList);
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
        D(EMPTY_UPLOAD_FORM),
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
        ].sort(sortContentDocumentList);
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
            .sort(sortContentDocumentList),
        ),
          b(o),
          v.showMessage("문서가 수정되었습니다."));
      (g.clearMessage(), x(), D(EMPTY_UPLOAD_FORM));
    },
    U = () => {
      _ &&
        (f((M) => {
          var il;
          const X = M.filter((Pe) => Pe.id !== _.id).sort(sortContentDocumentList);
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
  return jsxRuntime.jsxs("div", {
    className: "page-content page-content--fill content-page",
    children: [
      jsxRuntime.jsx(ToastStack, { items: Y }),
      jsxRuntime.jsxs("div", {
        className: "content-grid",
        children: [
          jsxRuntime.jsxs("section", {
            className: "content-table-card",
            children: [
              jsxRuntime.jsx(SectionHeader, {
                title: "문서 목록",
                actions: jsxRuntime.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: se,
                  children: "문서 업로드",
                }),
                className:
                  "content-table-card__header content-table-card__header--list",
              }),
              jsxRuntime.jsxs("form", {
                className:
                  "content-toolbar content-toolbar--content content-table-card__toolbar",
                onSubmit: (M) => {
                  (M.preventDefault(), De());
                },
                children: [
                  jsxRuntime.jsxs("label", {
                    className:
                      "field content-toolbar__field content-toolbar__field--select",
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "field__label",
                        children: "문서 유형",
                      }),
                      jsxRuntime.jsx("select", {
                        className: "field__input",
                        value: a.type,
                        onChange: (M) =>
                          n((X) => ({ ...X, type: M.target.value })),
                        children: contentTypeOptions.map((M) =>
                          jsxRuntime.jsx(
                            "option",
                            { value: M.value, children: M.label },
                            M.value,
                          ),
                        ),
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("label", {
                    className:
                      "field content-toolbar__field content-toolbar__field--search",
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "field__label",
                        children: "문서명 검색",
                      }),
                      jsxRuntime.jsx("input", {
                        className: "field__input",
                        type: "search",
                        value: u,
                        onChange: (M) => i(M.target.value),
                        placeholder: "2자 이상 입력",
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "content-toolbar__actions",
                    children: [
                      jsxRuntime.jsx("button", {
                        type: "submit",
                        className: "primary-button content-toolbar__button",
                        children: "검색",
                      }),
                      jsxRuntime.jsx("button", {
                        type: "button",
                        className: "secondary-button content-toolbar__button",
                        onClick: Q,
                        children: "초기화",
                      }),
                    ],
                  }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "content-table-scroll",
                children: jsxRuntime.jsxs("table", {
                  className: "content-table",
                  children: [
                    jsxRuntime.jsx("thead", {
                      children: jsxRuntime.jsxs("tr", {
                        children: [
                          jsxRuntime.jsx("th", { children: "문서명" }),
                          jsxRuntime.jsx("th", { children: "유형" }),
                          jsxRuntime.jsx("th", { children: "등록자" }),
                          jsxRuntime.jsx("th", { children: "등록일" }),
                          jsxRuntime.jsx("th", { children: "수정일" }),
                          jsxRuntime.jsx("th", { children: "상태" }),
                        ],
                      }),
                    }),
                    jsxRuntime.jsx("tbody", {
                      children:
                        S.length === 0
                          ? jsxRuntime.jsx("tr", {
                              children: jsxRuntime.jsx("td", {
                                colSpan: 6,
                                className: "content-empty",
                                children: "조건에 맞는 문서가 없습니다.",
                              }),
                            })
                          : S.map((M) =>
                              jsxRuntime.jsxs(
                                "tr",
                                {
                                  className:
                                    M.id === (_ == null ? void 0 : _.id)
                                      ? "is-selected"
                                      : "",
                                  onClick: () => b(M.id),
                                  children: [
                                    jsxRuntime.jsxs("td", {
                                      children: [
                                        jsxRuntime.jsx("div", {
                                          className: "content-table__title",
                                          children: M.name,
                                        }),
                                        jsxRuntime.jsx("div", {
                                          className: "content-table__sub",
                                          children: M.path,
                                        }),
                                      ],
                                    }),
                                    jsxRuntime.jsx("td", {
                                      children:
                                        M.type === "MANUAL" ? "매뉴얼" : "FAQ",
                                    }),
                                    jsxRuntime.jsx("td", { children: M.author }),
                                    jsxRuntime.jsx("td", { children: M.createdAt }),
                                    jsxRuntime.jsx("td", { children: M.updatedAt }),
                                    jsxRuntime.jsx("td", {
                                      children: jsxRuntime.jsx("span", {
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
          jsxRuntime.jsx(DetailFrame, {
            className: "content-detail-card",
            title: "문서 상세",
            actions: _
              ? jsxRuntime.jsx("span", {
                  className: `status-badge status-badge--${_.status.toLowerCase()}`,
                  children: contentStatusLabels[_.status],
                })
              : null,
            children: _
              ? jsxRuntime.jsxs("div", {
                  className: "content-detail-scroll",
                  children: [
                    jsxRuntime.jsx("div", {
                      className: "content-detail__name-card",
                      children: jsxRuntime.jsxs("div", {
                        className: "content-detail__identity",
                        children: [
                          jsxRuntime.jsx("h3", {
                            className: "content-detail__title",
                            children: _.name,
                          }),
                          jsxRuntime.jsx("span", {
                            className: "content-detail__type-pill",
                            children: _.type === "MANUAL" ? "매뉴얼" : "FAQ",
                          }),
                        ],
                      }),
                    }),
                    jsxRuntime.jsxs("dl", {
                      className: "content-detail__list",
                      children: [
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsx("dt", { children: "저장 경로" }),
                            jsxRuntime.jsx("dd", { children: _.path }),
                          ],
                        }),
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsx("dt", { children: "파일 크기" }),
                            jsxRuntime.jsx("dd", { children: _.fileSize }),
                          ],
                        }),
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsx("dt", { children: "등록자" }),
                            jsxRuntime.jsx("dd", { children: _.author }),
                          ],
                        }),
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsx("dt", { children: "등록일" }),
                            jsxRuntime.jsx("dd", { children: _.createdAt }),
                          ],
                        }),
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsx("dt", { children: "수정자" }),
                            jsxRuntime.jsx("dd", {
                              children:
                                ((ue = _.history[0]) == null
                                  ? void 0
                                  : ue.actor) ?? _.author,
                            }),
                          ],
                        }),
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsx("dt", { children: "수정일" }),
                            jsxRuntime.jsx("dd", { children: _.updatedAt }),
                          ],
                        }),
                      ],
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "content-detail-actions",
                      children: [
                        jsxRuntime.jsx("button", {
                          type: "button",
                          className: "secondary-button",
                          onClick: $,
                          children: "다운로드",
                        }),
                        jsxRuntime.jsx("button", {
                          type: "button",
                          className: "secondary-button",
                          onClick: xe,
                          children: "수정",
                        }),
                        jsxRuntime.jsx("button", {
                          type: "button",
                          className: "danger-button",
                          onClick: () => A(!0),
                          children: "삭제",
                        }),
                      ],
                    }),
                    jsxRuntime.jsxs("section", {
                      className: "content-history",
                      children: [
                        jsxRuntime.jsx("h4", { children: "변경 이력" }),
                        jsxRuntime.jsx("ul", {
                          children: _.history.map((M) =>
                            jsxRuntime.jsxs(
                              "li",
                              {
                                children: [
                                  jsxRuntime.jsx("strong", { children: M.version }),
                                  jsxRuntime.jsxs("span", {
                                    children: [
                                      M.actor,
                                      " · ",
                                      M.action,
                                      " · ",
                                      M.occurredAt,
                                    ],
                                  }),
                                  jsxRuntime.jsx("p", { children: M.reason }),
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
              : jsxRuntime.jsx("div", {
                  className: "content-empty content-empty--detail",
                  children: "선택한 문서가 없습니다.",
                }),
          }),
        ],
      }),
      y
        ? jsxRuntime.jsxs(ModalDialog, {
            title: N === "EDIT" ? "문서 수정 업로드" : "문서 업로드",
            ariaLabel: N === "EDIT" ? "문서 수정 업로드" : "문서 업로드",
            onClose: x,
            size: "lg",
            footer: jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: x,
                  children: "취소",
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: z,
                  disabled: !te,
                  children: N === "EDIT" ? "수정 저장" : "저장",
                }),
              ],
            }),
            children: [
              jsxRuntime.jsxs("label", {
                className: "field",
                children: [
                  jsxRuntime.jsx("span", {
                    className: "field__label",
                    children: "파일 선택 *",
                  }),
                  jsxRuntime.jsx("input", {
                    ref: t,
                    className: "field__input content-file-input",
                    type: "file",
                    accept: allowedFileExtensions,
                    onChange: (M) => {
                      var X;
                      return O((X = M.target.files) == null ? void 0 : X[0]);
                    },
                  }),
                  jsxRuntime.jsx("span", {
                    className: "content-file-name",
                    children: E ? `선택한 파일: ${E}` : "파일을 선택해 주세요.",
                  }),
                ],
              }),
              jsxRuntime.jsxs("label", {
                className: "field",
                children: [
                  jsxRuntime.jsx("span", {
                    className: "field__label",
                    children: "저장 경로",
                  }),
                  jsxRuntime.jsx("input", {
                    className: "field__input",
                    value: T.path,
                    onChange: (M) => D((X) => ({ ...X, path: M.target.value })),
                    placeholder: "/rag/manual/chatbot-guide",
                  }),
                ],
              }),
              jsxRuntime.jsxs("label", {
                className: "field",
                children: [
                  jsxRuntime.jsx("span", {
                    className: "field__label",
                    children: "문서 유형",
                  }),
                  jsxRuntime.jsxs("select", {
                    className: "field__input",
                    value: T.type,
                    onChange: (M) => D((X) => ({ ...X, type: M.target.value })),
                    children: [
                      jsxRuntime.jsx("option", { value: "MANUAL", children: "매뉴얼" }),
                      jsxRuntime.jsx("option", { value: "FAQ", children: "FAQ" }),
                    ],
                  }),
                ],
              }),
            ],
          })
        : null,
      m
        ? jsxRuntime.jsx(ModalDialog, {
            title: "문서 삭제 확인",
            ariaLabel: "문서 삭제 확인",
            onClose: () => A(!1),
            size: "sm",
            footer: jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => A(!1),
                  children: "취소",
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "danger-button",
                  onClick: U,
                  children: "삭제",
                }),
              ],
            }),
            children: jsxRuntime.jsx("p", {
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
  return jsxRuntime.jsxs("section", {
    className: `list-panel${n ? ` ${n}` : ""}`,
    children: [
      jsxRuntime.jsx(SectionHeader, { title: e, actions: t, className: "list-panel__header" }),
      l
        ? jsxRuntime.jsx("div", { className: "list-panel__toolbar", children: l })
        : null,
      jsxRuntime.jsx("div", { className: "list-panel__body", children: u }),
      a ? jsxRuntime.jsx("div", { className: "list-panel__footer", children: a }) : null,
    ],
  });
}
function buildPaginationRange(e, t) {
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
    u = buildPaginationRange(n, a);
  return jsxRuntime.jsxs("nav", {
    className: "pagination",
    "aria-label": "페이지네이션",
    children: [
      jsxRuntime.jsx("button", {
        type: "button",
        className: "pagination__button",
        disabled: n === 1,
        onClick: () => l(n - 1),
        children: "이전",
      }),
      u.map((i, s) =>
        i === null
          ? jsxRuntime.jsx(
              "span",
              {
                className: "pagination__ellipsis",
                "aria-hidden": "true",
                children: "...",
              },
              `ellipsis-${s}`,
            )
          : jsxRuntime.jsx(
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
      jsxRuntime.jsx("button", {
        type: "button",
        className: "pagination__button",
        disabled: n === a,
        onClick: () => l(n + 1),
        children: "다음",
      }),
    ],
  });
}
const getCurrentTimestamp = () =>
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
  normalizeForSearch = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/[^0-9a-z가-힣]/gi, ""),
  calculateTextSimilarity = (textA, textB) => {
    const a = normalizeForSearch(textA),
      b = normalizeForSearch(textB);
    if (!a && !b) return 1;
    if (!a || !b) return 0;
    if (a === b) return 1;
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (__, j) =>
        i === 0 ? j : j === 0 ? i : 0,
      ),
    );
    for (let i = 1; i <= a.length; i += 1)
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost,
        );
      }
    return 1 - matrix[a.length][b.length] / Math.max(a.length, b.length);
  },
  findCacheQaDuplicate = (list, question, excludeId) => {
    let bestMatch = null;
    for (const item of list) {
      if (excludeId && item.id === excludeId) continue;
      const similarity = Math.max(
        calculateTextSimilarity(item.question, question),
        normalizeForSearch(item.question).includes(normalizeForSearch(question)) ? 0.92 : 0,
        normalizeForSearch(question).includes(normalizeForSearch(item.question)) ? 0.92 : 0,
      );
      similarity >= 0.85 && (!bestMatch || similarity > bestMatch.score) && (bestMatch = { item, score: similarity });
    }
    return bestMatch;
  },
  createCacheQaEntry = async (e, t = "관리자") => {
    const l = getCurrentTimestamp();
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
    const a = getCurrentTimestamp();
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
    const a = getCurrentTimestamp();
    return { ...e, status: t, updatedAt: a, updatedBy: l };
  },
  CACHE_QA_PAGE_SIZE = 10,
  CACHE_QA_QUESTION_MAX_LENGTH = 500,
  CACHE_QA_ANSWER_MAX_LENGTH = 2e3,
  CACHE_QA_MESSAGE_DURATION_MS = 3e3,
  cacheQaStatusLabels = { ACTIVE: "활성", INACTIVE: "비활성" },
  cacheQaStatusOptions = [
    { label: "전체", value: "ALL" },
    { label: "활성", value: "ACTIVE" },
    { label: "비활성", value: "INACTIVE" },
  ],
  EMPTY_CACHE_QA_FORM = { question: "", answer: "", status: "ACTIVE" },
  sortCacheQaEntriesByCreatedAt = (e, t) => sortDescendingByTimestamp(e.createdAt, t.createdAt);
function CacheAnswerManagementView({ items: e }) {
  var $;
  const [t, l] = hookRuntime.useState(e.slice().sort(sortCacheQaEntriesByCreatedAt)),
    [a, n] = hookRuntime.useState({ keyword: "", status: "ALL" }),
    [u, i] = hookRuntime.useState(""),
    [s, f] = hookRuntime.useState((($ = e[0]) == null ? void 0 : $.id) ?? null),
    [r, b] = hookRuntime.useState(1),
    [y, h] = hookRuntime.useState(!1),
    [m, A] = hookRuntime.useState("CREATE"),
    [N, R] = hookRuntime.useState(null),
    [o, d] = hookRuntime.useState(EMPTY_CACHE_QA_FORM),
    v = useTimedMessage(CACHE_QA_MESSAGE_DURATION_MS),
    g = useTimedMessage(CACHE_QA_MESSAGE_DURATION_MS),
    [E, C] = hookRuntime.useState(!1),
    T = hookRuntime.useMemo(() => {
      const O = normalizeSearchKeyword(a.keyword);
      return t
        .map((Y) => {
          const Z = normalizeSearchKeyword(Y.question),
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
            : sortCacheQaEntriesByCreatedAt(Y.item, Z.item),
        )
        .map(({ item: Y }) => Y);
    }, [a.keyword, a.status, t]),
    D = Math.max(1, Math.ceil(T.length / CACHE_QA_PAGE_SIZE)),
    S = T.slice((r - 1) * CACHE_QA_PAGE_SIZE, r * CACHE_QA_PAGE_SIZE),
    _ = T.find((O) => O.id === s) ?? null;
  (hookRuntime.useEffect(() => {
    b((O) => Math.min(O, D));
  }, [D]),
    hookRuntime.useEffect(() => {
      if (T.length === 0) {
        f(null);
        return;
      }
      (!s || !T.some((O) => O.id === s)) && f(T[0].id);
    }, [T, s]));
  const te = () => {
      (A("CREATE"), R(null), d(EMPTY_CACHE_QA_FORM), g.clearMessage(), h(!0));
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
        (l((M) => [ue, ...M].sort(sortCacheQaEntriesByCreatedAt)),
          f(ue.id),
          v.showMessage("답변이 등록되었습니다."),
          d(EMPTY_CACHE_QA_FORM),
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
      (l((ue) => ue.map((M) => (M.id === N ? Z : M)).sort(sortCacheQaEntriesByCreatedAt)),
        f(Z.id),
        v.showMessage("답변이 수정되었습니다."),
        d(EMPTY_CACHE_QA_FORM),
        A("CREATE"),
        R(null),
        Q());
    },
    z = async () => {
      if (!_) return;
      const O = _.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
        Y = await toggleCacheQaEntryStatus(_, O);
      (l((Z) => Z.map((ue) => (ue.id === Y.id ? Y : ue)).sort(sortCacheQaEntriesByCreatedAt)),
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
          const Y = O.filter((ue) => ue.id !== _.id).sort(sortCacheQaEntriesByCreatedAt);
          return (f(((Z = Y[0]) == null ? void 0 : Z.id) ?? null), Y);
        }),
        C(!1),
        v.showMessage("답변이 삭제되었습니다."),
        A("CREATE"),
        R(null),
        d(EMPTY_CACHE_QA_FORM));
    };
  return jsxRuntime.jsxs("div", {
    className: "cache-qa-layout",
    children: [
      jsxRuntime.jsx(ToastStack, {
        items: [
          v.message
            ? { key: "cache-qa-success", tone: "success", message: v.message }
            : null,
          g.message
            ? { key: "cache-qa-error", tone: "error", message: g.message }
            : null,
        ].filter((O) => !!O),
      }),
      jsxRuntime.jsxs("div", {
        className: "cache-qa-grid",
        children: [
          jsxRuntime.jsx(ListPanel, {
            className: "cache-qa-list-card",
            title: "캐시 답변 목록",
            actions: jsxRuntime.jsx("button", {
              type: "button",
              className: "primary-button",
              onClick: te,
              children: "캐시 답변 등록",
            }),
            toolbar: jsxRuntime.jsxs("form", {
              className: "cache-qa-toolbar",
              onSubmit: (O) => {
                (O.preventDefault(), xe());
              },
              children: [
                jsxRuntime.jsxs("label", {
                  className: "field cache-qa-field",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "field__label",
                      children: "질문 검색",
                    }),
                    jsxRuntime.jsx("input", {
                      className: "field__input",
                      type: "search",
                      placeholder: "2자 이상 입력 권장",
                      value: u,
                      onChange: (O) => i(O.target.value),
                    }),
                  ],
                }),
                jsxRuntime.jsxs("label", {
                  className: "field cache-qa-field",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "field__label",
                      children: "상태",
                    }),
                    jsxRuntime.jsx("select", {
                      className: "field__input",
                      value: a.status,
                      onChange: (O) => {
                        (n((Y) => ({ ...Y, status: O.target.value })), b(1));
                      },
                      children: cacheQaStatusOptions.map((O) =>
                        jsxRuntime.jsx(
                          "option",
                          { value: O.value, children: O.label },
                          O.value,
                        ),
                      ),
                    }),
                  ],
                }),
                jsxRuntime.jsxs("div", {
                  className: "cache-qa-toolbar__actions",
                  children: [
                    jsxRuntime.jsx("button", {
                      type: "submit",
                      className: "primary-button",
                      children: "검색",
                    }),
                    jsxRuntime.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      onClick: se,
                      children: "초기화",
                    }),
                  ],
                }),
              ],
            }),
            footer: jsxRuntime.jsx(Pagination, { page: r, totalPages: D, onChange: b }),
            children: jsxRuntime.jsx("div", {
              className: "list-panel__scroll cache-qa-list-scroll",
              children:
                S.length === 0
                  ? jsxRuntime.jsx("div", {
                      className: "list-panel__empty",
                      children: "조건에 맞는 답변이 없습니다.",
                    })
                  : jsxRuntime.jsxs("table", {
                      className: "content-table cache-qa-table",
                      children: [
                        jsxRuntime.jsx("thead", {
                          children: jsxRuntime.jsxs("tr", {
                            children: [
                              jsxRuntime.jsx("th", { children: "질문" }),
                              jsxRuntime.jsx("th", { children: "상태" }),
                              jsxRuntime.jsx("th", { children: "등록일" }),
                              jsxRuntime.jsx("th", { children: "수정일" }),
                            ],
                          }),
                        }),
                        jsxRuntime.jsx("tbody", {
                          children: S.map((O) =>
                            jsxRuntime.jsxs(
                              "tr",
                              {
                                className:
                                  O.id === (_ == null ? void 0 : _.id)
                                    ? "is-selected"
                                    : "",
                                onClick: () => f(O.id),
                                children: [
                                  jsxRuntime.jsx("td", {
                                    children: jsxRuntime.jsx("div", {
                                      className: "content-table__title",
                                      children: O.question,
                                    }),
                                  }),
                                  jsxRuntime.jsx("td", {
                                    children: jsxRuntime.jsx("span", {
                                      className: `status-badge status-badge--${O.status.toLowerCase()}`,
                                      children: cacheQaStatusLabels[O.status],
                                    }),
                                  }),
                                  jsxRuntime.jsx("td", { children: O.createdAt }),
                                  jsxRuntime.jsx("td", { children: O.updatedAt }),
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
          jsxRuntime.jsx("aside", {
            className: "cache-qa-side",
            children: jsxRuntime.jsx(DetailFrame, {
              className: "cache-qa-detail-card",
              title: "상세 정보",
              actions: _
                ? jsxRuntime.jsx("span", {
                    className: `status-badge status-badge--${_.status.toLowerCase()}`,
                    children: cacheQaStatusLabels[_.status],
                  })
                : null,
              children: _
                ? jsxRuntime.jsxs("div", {
                    className: "cache-qa-detail-scroll",
                    children: [
                      jsxRuntime.jsxs("div", {
                        className: "feedback-conversation-section",
                        children: [
                          jsxRuntime.jsx("p", {
                            className: "feedback-conversation-label",
                            children: "대화 내용",
                          }),
                          jsxRuntime.jsxs("div", {
                            className: "cache-qa-conversation",
                            children: [
                              jsxRuntime.jsxs("div", {
                                className:
                                  "feedback-conversation__turn feedback-conversation__turn--user",
                                children: [
                                  jsxRuntime.jsx("p", {
                                    className: "feedback-conversation__speaker",
                                    children: "질문",
                                  }),
                                  jsxRuntime.jsx("p", {
                                    className: "feedback-conversation__message",
                                    children: _.question,
                                  }),
                                ],
                              }),
                              jsxRuntime.jsxs("div", {
                                className:
                                  "feedback-conversation__turn feedback-conversation__turn--bot",
                                children: [
                                  jsxRuntime.jsx("p", {
                                    className: "feedback-conversation__speaker",
                                    children: "답변",
                                  }),
                                  jsxRuntime.jsx("p", {
                                    className: "feedback-conversation__message",
                                    children: _.answer,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      jsxRuntime.jsxs("dl", {
                        className: "content-detail__list cache-qa-meta",
                        children: [
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("dt", { children: "등록자" }),
                              jsxRuntime.jsx("dd", { children: _.createdBy }),
                            ],
                          }),
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("dt", { children: "등록일" }),
                              jsxRuntime.jsx("dd", { children: _.createdAt }),
                            ],
                          }),
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("dt", { children: "수정자" }),
                              jsxRuntime.jsx("dd", { children: _.updatedBy }),
                            ],
                          }),
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("dt", { children: "수정일" }),
                              jsxRuntime.jsx("dd", { children: _.updatedAt }),
                            ],
                          }),
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("dt", { children: "캐시 조회 수" }),
                              jsxRuntime.jsx("dd", {
                                children: _.hitCount.toLocaleString(),
                              }),
                            ],
                          }),
                        ],
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "cache-qa-detail-actions",
                        children: [
                          jsxRuntime.jsx("button", {
                            type: "button",
                            className: "secondary-button",
                            onClick: De,
                            children: "수정",
                          }),
                          jsxRuntime.jsx("button", {
                            type: "button",
                            className: "primary-button",
                            onClick: z,
                            disabled: !_,
                            children:
                              _.status === "ACTIVE" ? "비활성화" : "활성화",
                          }),
                          jsxRuntime.jsx("button", {
                            type: "button",
                            className: "danger-button",
                            onClick: () => C(!0),
                            children: "삭제",
                          }),
                        ],
                      }),
                    ],
                  })
                : jsxRuntime.jsx("div", {
                    className: "list-panel__empty cache-qa-empty",
                    children: "답변을 선택하면 상세 정보가 표시됩니다.",
                  }),
            }),
          }),
        ],
      }),
      y
        ? jsxRuntime.jsx(ModalDialog, {
            title: m === "EDIT" ? "캐시 답변 수정" : "캐시 답변 등록",
            ariaLabel: m === "EDIT" ? "캐시 답변 수정" : "캐시 답변 등록",
            onClose: Q,
            size: "xl",
            footerClassName: "modal__footer--split",
            footer: jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => {
                    (Q(), d(EMPTY_CACHE_QA_FORM), A("CREATE"), R(null));
                  },
                  children: "초기화",
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: x,
                  children: m === "EDIT" ? "수정 저장" : "등록",
                }),
              ],
            }),
            children: jsxRuntime.jsxs("div", {
              className: "cache-qa-form cache-qa-form--modal",
              children: [
                jsxRuntime.jsxs("label", {
                  className: "field",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "field__label",
                      children: "질문 *",
                    }),
                    jsxRuntime.jsx("textarea", {
                      className:
                        "field__input knowledge-textarea cache-qa-textarea",
                      rows: 3,
                      maxLength: CACHE_QA_QUESTION_MAX_LENGTH,
                      value: o.question,
                      placeholder: "캐시 답변용 질문을 입력해 주세요.",
                      onChange: (O) =>
                        d((Y) => ({ ...Y, question: O.target.value })),
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "cache-qa-form__counter",
                      children: [o.question.length, "/", CACHE_QA_QUESTION_MAX_LENGTH, "자"],
                    }),
                  ],
                }),
                jsxRuntime.jsxs("label", {
                  className: "field",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "field__label",
                      children: "답변 *",
                    }),
                    jsxRuntime.jsx("textarea", {
                      className:
                        "field__input knowledge-textarea cache-qa-textarea",
                      rows: 6,
                      maxLength: CACHE_QA_ANSWER_MAX_LENGTH,
                      value: o.answer,
                      placeholder: "캐시 답변으로 반환할 답변을 입력해 주세요.",
                      onChange: (O) =>
                        d((Y) => ({ ...Y, answer: O.target.value })),
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "cache-qa-form__counter",
                      children: [o.answer.length, "/", CACHE_QA_ANSWER_MAX_LENGTH, "자"],
                    }),
                  ],
                }),
                jsxRuntime.jsxs("label", {
                  className: "field",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "field__label",
                      children: "상태",
                    }),
                    jsxRuntime.jsxs("select", {
                      className: "field__input",
                      value: o.status,
                      onChange: (O) =>
                        d((Y) => ({ ...Y, status: O.target.value })),
                      children: [
                        jsxRuntime.jsx("option", { value: "ACTIVE", children: "활성" }),
                        jsxRuntime.jsx("option", {
                          value: "INACTIVE",
                          children: "비활성",
                        }),
                      ],
                    }),
                  ],
                }),
                g.message
                  ? jsxRuntime.jsx("p", {
                      className: "content-error",
                      children: g.message,
                    })
                  : null,
              ],
            }),
          })
        : null,
      E
        ? jsxRuntime.jsx(ModalDialog, {
            title: "캐시 답변 삭제 확인",
            ariaLabel: "캐시 답변 삭제 확인",
            onClose: () => C(!1),
            size: "sm",
            compact: !0,
            footerClassName: "modal__footer--split",
            footer: jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => C(!1),
                  children: "취소",
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "danger-button",
                  onClick: U,
                  children: "삭제",
                }),
              ],
            }),
            children: jsxRuntime.jsx("p", {
              className: "content-confirm",
              children: "선택한 답변을 삭제하면 캐시 답변에서 즉시 제외됩니다.",
            }),
          })
        : null,
    ],
  });
}
const knowledgeDocumentList = [
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
  return { documents: knowledgeDocumentList };
}
async function executeKnowledgeQuery(e) {
  const t = knowledgeDocumentList.find((l) => l.id === e.documentId);
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
  const [t, l] = hookRuntime.useState({ question: "", documentType: "", documentId: "" }),
    [a, n] = hookRuntime.useState("IDLE"),
    [u, i] = hookRuntime.useState(null),
    [s, f] = hookRuntime.useState(!1),
    r = hookRuntime.useMemo(
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
  return jsxRuntime.jsx("div", {
    className: "knowledge-layout",
    children: jsxRuntime.jsxs("div", {
      className: "knowledge-grid",
      children: [
        jsxRuntime.jsxs("section", {
          className: "panel panel--main",
          children: [
            jsxRuntime.jsx(SectionHeader, { title: "조회 조건" }),
            jsxRuntime.jsxs("div", {
              className: "knowledge-form",
              children: [
                jsxRuntime.jsxs("label", {
                  className: "field",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "field__label",
                      children: "문서 유형 *",
                    }),
                    jsxRuntime.jsxs("select", {
                      className: "field__input",
                      value: t.documentType,
                      onChange: (o) => h(o.target.value),
                      children: [
                        jsxRuntime.jsx("option", { value: "", children: "선택하세요" }),
                        jsxRuntime.jsx("option", {
                          value: "MANUAL",
                          children: "매뉴얼",
                        }),
                        jsxRuntime.jsx("option", { value: "FAQ", children: "FAQ" }),
                      ],
                    }),
                  ],
                }),
                jsxRuntime.jsxs("label", {
                  className: "field",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "field__label",
                      children: "테스트 문서 *",
                    }),
                    jsxRuntime.jsxs("select", {
                      className: "field__input",
                      value: t.documentId,
                      disabled: !t.documentType,
                      onChange: (o) => l({ ...t, documentId: o.target.value }),
                      children: [
                        jsxRuntime.jsx("option", { value: "", children: "선택하세요" }),
                        r.map((o) =>
                          jsxRuntime.jsx(
                            "option",
                            { value: o.id, children: o.name },
                            o.id,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
                jsxRuntime.jsxs("label", {
                  className: "field",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "field__label",
                      children: "질문 입력 *",
                    }),
                    jsxRuntime.jsx("textarea", {
                      className: "field__input knowledge-textarea",
                      value: t.question,
                      maxLength: 1e3,
                      rows: 4,
                      placeholder: "1자 이상 입력 (최대 1000자)",
                      onChange: (o) => l({ ...t, question: o.target.value }),
                    }),
                  ],
                }),
                jsxRuntime.jsxs("div", {
                  className: "knowledge-action-row",
                  children: [
                    jsxRuntime.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      disabled: !y,
                      onClick: N,
                      children: "초기화",
                    }),
                    jsxRuntime.jsx("button", {
                      type: "button",
                      className: "primary-button",
                      disabled: !b || a === "LOADING",
                      onClick: m,
                      children: a === "LOADING" ? "조회 중" : "조회",
                    }),
                    jsxRuntime.jsx("button", {
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
        jsxRuntime.jsxs(DetailFrame, {
          className: "panel panel--main",
          title: "조회 결과",
          children: [
            a === "IDLE" &&
              jsxRuntime.jsx("div", {
                className: "knowledge-result-empty",
                children: "조건을 입력한 뒤 조회를 시작해 주세요.",
              }),
            a === "LOADING" &&
              jsxRuntime.jsx("div", {
                className: "knowledge-result-empty",
                children: "조회 중입니다.",
              }),
            a === "EMPTY" &&
              jsxRuntime.jsx("div", {
                className: "knowledge-result-empty",
                children: "선택한 문서에서 일치하는 답변을 찾지 못했습니다.",
              }),
            a === "ERROR" &&
              jsxRuntime.jsx("div", {
                className: "knowledge-result-empty",
                children: "조회에 실패했습니다. 다시 시도해 주세요.",
              }),
            a === "SUCCESS" &&
              u &&
              jsxRuntime.jsxs("div", {
                className: "knowledge-result-scroll",
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "knowledge-answer",
                    children: [
                      jsxRuntime.jsx("p", {
                        className: "knowledge-answer__text",
                        children: u.answer,
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "knowledge-answer__meta",
                        children: ["생성 시각: ", u.generatedAt],
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("dl", {
                    className: "content-detail__list knowledge-reference",
                    children: [
                      jsxRuntime.jsxs("div", {
                        children: [
                          jsxRuntime.jsx("dt", { children: "참조 문서" }),
                          jsxRuntime.jsxs("dd", {
                            children: [
                              u.referenceDocument.name,
                              jsxRuntime.jsx("span", {
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
                      jsxRuntime.jsxs("div", {
                        children: [
                          jsxRuntime.jsx("dt", { children: "저장 경로" }),
                          jsxRuntime.jsx("dd", { children: u.referenceDocument.path }),
                        ],
                      }),
                      jsxRuntime.jsxs("div", {
                        children: [
                          jsxRuntime.jsx("dt", { children: "참조 단락" }),
                          jsxRuntime.jsx("dd", { children: u.referenceParagraph }),
                        ],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: "knowledge-footer",
                    children: jsxRuntime.jsx("button", {
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
  feedbackReactionOptions = [
    { label: "전체", value: "ALL" },
    { label: "긍정", value: "POSITIVE" },
    { label: "부정", value: "NEGATIVE" },
  ],
  parseDateTimeString = (e) => new Date(e.replace(" ", "T")),
  withStartOfDay = (e) => `${e}T00:00:00`,
  withEndOfDay = (e) => `${e}T23:59:59.999`,
  isWithinDateRange = (e, t) => {
    if (!t.startDate && !t.endDate) return !0;
    const l = parseDateTimeString(e).getTime(),
      a = t.startDate ? parseDateTimeString(withStartOfDay(t.startDate)).getTime() : null,
      n = t.endDate ? parseDateTimeString(withEndOfDay(t.endDate)).getTime() : null;
    return a !== null && n !== null && a > n
      ? l >= n && l <= a
      : !((a !== null && l < a) || (n !== null && l > n));
  },
  sortFeedbackRecordsByCreatedAt = (e, t) => sortDescendingByTimestamp(e.createdAt, t.createdAt);
function FeedbackManagementView({ feedbacks: e }) {
  const [t, l] = hookRuntime.useState({ reaction: "ALL" }),
    [a, n] = hookRuntime.useState({ startDate: "", endDate: "" }),
    [u, i] = hookRuntime.useState({ startDate: "", endDate: "" }),
    [s, f] = hookRuntime.useState(null),
    r = hookRuntime.useMemo(
      () =>
        e
          .filter((m) => t.reaction === "ALL" || m.reaction === t.reaction)
          .filter((m) => isWithinDateRange(m.createdAt, u))
          .slice()
          .sort(sortFeedbackRecordsByCreatedAt),
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
  return jsxRuntime.jsx("div", {
    className: "feedback-layout",
    children: jsxRuntime.jsxs("div", {
      className: "feedback-grid",
      children: [
        jsxRuntime.jsxs("section", {
          className: "feedback-list-card",
          children: [
            jsxRuntime.jsx(SectionHeader, {
              title: "피드백 목록",
              className: "feedback-list-header",
            }),
            jsxRuntime.jsxs("div", {
              className: "feedback-filter-bar",
              children: [
                jsxRuntime.jsxs("div", {
                  className: "feedback-filter-field",
                  children: [
                    jsxRuntime.jsx("label", {
                      className: "field__label",
                      htmlFor: "feedback-reaction-filter",
                      children: "유형",
                    }),
                    jsxRuntime.jsx("select", {
                      id: "feedback-reaction-filter",
                      className: "field__input feedback-filter-select",
                      value: t.reaction,
                      onChange: (m) => l({ reaction: m.target.value }),
                      children: feedbackReactionOptions.map((m) =>
                        jsxRuntime.jsx(
                          "option",
                          { value: m.value, children: m.label },
                          m.value,
                        ),
                      ),
                    }),
                  ],
                }),
                jsxRuntime.jsxs("div", {
                  className: "feedback-range-actions",
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "feedback-range-field",
                      children: [
                        jsxRuntime.jsx("label", {
                          className: "field__label",
                          htmlFor: "feedback-range-start",
                          children: "시작일",
                        }),
                        jsxRuntime.jsx("input", {
                          id: "feedback-range-start",
                          type: "date",
                          className: "field__input feedback-range-input",
                          value: a.startDate,
                          onChange: (m) =>
                            n((A) => ({ ...A, startDate: m.target.value })),
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("span", {
                      className: "feedback-range-divider",
                      "aria-hidden": "true",
                      children: "~",
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "feedback-range-field",
                      children: [
                        jsxRuntime.jsx("label", {
                          className: "field__label",
                          htmlFor: "feedback-range-end",
                          children: "종료일",
                        }),
                        jsxRuntime.jsx("input", {
                          id: "feedback-range-end",
                          type: "date",
                          className: "field__input feedback-range-input",
                          value: a.endDate,
                          onChange: (m) =>
                            n((A) => ({ ...A, endDate: m.target.value })),
                        }),
                      ],
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "feedback-range-buttons",
                      children: [
                        jsxRuntime.jsx("button", {
                          type: "button",
                          className: "primary-button feedback-range-button",
                          onClick: y,
                          children: "검색",
                        }),
                        jsxRuntime.jsx("button", {
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
            jsxRuntime.jsx("div", {
              className: "feedback-list-scroll",
              children: jsxRuntime.jsxs("table", {
                className: "content-table",
                children: [
                  jsxRuntime.jsx("thead", {
                    children: jsxRuntime.jsxs("tr", {
                      children: [
                        jsxRuntime.jsx("th", { children: "작성일시" }),
                        jsxRuntime.jsx("th", { children: "단지명" }),
                        jsxRuntime.jsx("th", { children: "사용자" }),
                        jsxRuntime.jsx("th", { children: "반응" }),
                        jsxRuntime.jsx("th", { children: "부정사유" }),
                      ],
                    }),
                  }),
                  jsxRuntime.jsx("tbody", {
                    children:
                      r.length === 0
                        ? jsxRuntime.jsx("tr", {
                            children: jsxRuntime.jsx("td", {
                              colSpan: 5,
                              className: "content-empty",
                              children: "조건에 맞는 피드백이 없습니다.",
                            }),
                          })
                        : r.map((m) =>
                            jsxRuntime.jsxs(
                              "tr",
                              {
                                className:
                                  m.id === (b == null ? void 0 : b.id)
                                    ? "is-selected"
                                    : "",
                                onClick: () => f(m.id),
                                children: [
                                  jsxRuntime.jsx("td", { children: m.createdAt }),
                                  jsxRuntime.jsx("td", { children: m.complexName }),
                                  jsxRuntime.jsx("td", { children: m.userId }),
                                  jsxRuntime.jsx("td", {
                                    children: jsxRuntime.jsx("span", {
                                      className: `feedback-reaction-badge feedback-reaction-badge--${m.reaction.toLowerCase()}`,
                                      children: feedbackReactionLabels[m.reaction],
                                    }),
                                  }),
                                  jsxRuntime.jsx("td", {
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
        jsxRuntime.jsx(DetailFrame, {
          className: "feedback-detail-card",
          title: "피드백 상세",
          actions: b
            ? jsxRuntime.jsx("span", {
                className: `feedback-reaction-badge feedback-reaction-badge--${b.reaction.toLowerCase()}`,
                children: feedbackReactionLabels[b.reaction],
              })
            : null,
          children:
            b === null
              ? jsxRuntime.jsx("div", {
                  className: "content-empty content-empty--detail",
                  children: "피드백을 선택하면 상세 정보가 표시됩니다.",
                })
              : jsxRuntime.jsxs("div", {
                  className: "feedback-detail-scroll",
                  children: [
                    jsxRuntime.jsx(SectionHeader, {
                      title: jsxRuntime.jsxs("div", {
                        className: "feedback-detail-identity",
                        children: [
                          jsxRuntime.jsx("span", {
                            className: "feedback-detail-identity__complex",
                            children: b.complexName,
                          }),
                          jsxRuntime.jsx("span", {
                            className: "feedback-detail-identity__user",
                            children: b.userId,
                          }),
                        ],
                      }),
                      className:
                        "detail-frame__header feedback-detail-identity-header",
                      titleAs: "h3",
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "feedback-conversation-section",
                      children: [
                        jsxRuntime.jsx("p", {
                          className: "feedback-conversation-label",
                          children: "대화 내용",
                        }),
                        jsxRuntime.jsx("div", {
                          className: "feedback-conversation",
                          children: b.conversation.map((m, A) =>
                            jsxRuntime.jsxs(
                              "div",
                              {
                                className: `feedback-conversation__turn feedback-conversation__turn--${m.speaker.toLowerCase()}`,
                                children: [
                                  jsxRuntime.jsxs("p", {
                                    className: "feedback-conversation__speaker",
                                    children: [
                                      m.speaker === "USER" ? "사용자" : "챗봇",
                                      " · ",
                                      m.sentAt,
                                    ],
                                  }),
                                  jsxRuntime.jsx("p", {
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
                      jsxRuntime.jsxs("div", {
                        className: "feedback-negative-reason",
                        children: [
                          jsxRuntime.jsx("strong", { children: "부정사유" }),
                          jsxRuntime.jsx("p", { children: b.negativeReason }),
                        ],
                      }),
                  ],
                }),
        }),
      ],
    }),
  });
}
const accountRecordList = [
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
function buildAccountStatsSummary(e) {
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
  const e = buildAccountStatsSummary(accountRecordList);
  return { accounts: accountRecordList, stats: e };
}
const CURRENT_ACCOUNT_ID = "chat1004",
  accountStatusLabels = { ACTIVE: "활성", INACTIVE: "비활성", LOCKED: "잠금" },
  accountRoleLabels = { MASTER: "MASTER", OPERATOR: "OPERATOR" },
  accountActionLabels = {
    ACTIVATE: "권한 복구",
    DEACTIVATE: "권한 비활성화",
    UNLOCK: "잠금 해제",
  },
  ACCOUNT_MESSAGE_DURATION_MS = 3e3;
function AccountPermissionManagementView({ accounts: initialAccounts }) {
  const [accountList, setAccountList] = hookRuntime.useState(initialAccounts),
    [selectedAccountId, setSelectedAccountId] = hookRuntime.useState(null),
    [pendingAction, setPendingAction] = hookRuntime.useState(null),
    [isAddModalOpen, setIsAddModalOpen] = hookRuntime.useState(!1),
    [addReason, setAddReason] = hookRuntime.useState(""),
    [candidateSearch, setCandidateSearch] = hookRuntime.useState(""),
    [selectedCandidate, setSelectedCandidate] = hookRuntime.useState(null),
    timedMessage = useTimedMessage(ACCOUNT_MESSAGE_DURATION_MS),
    accountStats = hookRuntime.useMemo(
      () => ({
        total: accountList.filter((acc) => acc.status === "ACTIVE").length,
        masters: accountList.filter((acc) => acc.role === "MASTER" && acc.status === "ACTIVE")
          .length,
        operators: accountList.filter(
          (acc) => acc.role === "OPERATOR" && acc.status === "ACTIVE",
        ).length,
        inactive: accountList.filter((acc) => acc.status !== "ACTIVE").length,
      }),
      [accountList],
    ),
    selectedAccount = accountList.find((acc) => acc.id === selectedAccountId) ?? null,
    filteredCandidates = hookRuntime.useMemo(() => {
      const q = candidateSearch.trim().toLowerCase();
      return q
        ? candidateAccounts.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.id.toLowerCase().includes(q) ||
              c.complexCode.toLowerCase().includes(q),
          )
        : candidateAccounts;
    }, [candidateSearch]),
    updateAccountStatus = (accountId, newStatus) => {
      (setAccountList((prev) => prev.map((acc) => (acc.id === accountId ? { ...acc, status: newStatus } : acc))),
        setSelectedAccountId(accountId));
    },
    confirmAction = () => {
      if (!pendingAction) return;
      const { type: actionType, accountId } = pendingAction;
      (actionType === "ACTIVATE"
        ? (updateAccountStatus(accountId, "ACTIVE"), timedMessage.showMessage("관리자 권한이 복구되었습니다."))
        : actionType === "DEACTIVATE"
          ? (updateAccountStatus(accountId, "INACTIVE"),
            timedMessage.showMessage("관리자 권한이 비활성화되었습니다."))
          : actionType === "UNLOCK" &&
            (updateAccountStatus(accountId, "ACTIVE"), timedMessage.showMessage("계정 잠금이 해제되었습니다.")),
        setPendingAction(null));
    },
    closeAddModal = () => {
      (setIsAddModalOpen(!1), setAddReason(""), setCandidateSearch(""), setSelectedCandidate(null));
    },
    confirmAddAccount = () => {
      if (!selectedCandidate) return;
      const newAccount = {
        id: selectedCandidate.id,
        name: selectedCandidate.name,
        role: "OPERATOR",
        status: "ACTIVE",
        registeredAt: "2026-04-02",
        lastLoginAt: null,
        loginHistory: [],
        lockHistory: [],
      };
      (setAccountList((prev) => [...prev, newAccount]), closeAddModal(), timedMessage.showMessage("관리자가 추가되었습니다."));
    },
    isCurrentUser = (id) => id === CURRENT_ACCOUNT_ID,
    statItems = [
      { label: "전체 활성", value: `${accountStats.total}명` },
      { label: "MASTER", value: `${accountStats.masters}명` },
      { label: "OPERATOR", value: `${accountStats.operators}명` },
      { label: "비활성·잠금", value: `${accountStats.inactive}명` },
    ];
  return jsxRuntime.jsxs("div", {
    className: "accounts-layout",
    children: [
      jsxRuntime.jsx(ToastStack, {
        items: timedMessage.message
          ? [{ key: "accounts-success", tone: "success", message: timedMessage.message }]
          : [],
      }),
      jsxRuntime.jsx("div", {
        className: "accounts-stat-grid",
        children: statItems.map((item) =>
          jsxRuntime.jsxs(
            "div",
            {
              className: "metric-card",
              children: [
                jsxRuntime.jsx("p", {
                  className: "metric-card__label",
                  children: item.label,
                }),
                jsxRuntime.jsx("p", {
                  className: "metric-card__value",
                  children: item.value,
                }),
              ],
            },
            item.label,
          ),
        ),
      }),
      jsxRuntime.jsxs("div", {
        className: "accounts-grid",
        children: [
          jsxRuntime.jsxs("section", {
            className: "accounts-list-card",
            children: [
              jsxRuntime.jsx(SectionHeader, {
                title: "계정 목록",
                actions: jsxRuntime.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: () => setIsAddModalOpen(!0),
                  children: "계정 추가",
                }),
                className: "panel__header panel__header--compact",
              }),
              jsxRuntime.jsx("div", {
                className: "accounts-list-scroll",
                children: jsxRuntime.jsxs("table", {
                  className: "content-table knowledge-history-table",
                  children: [
                    jsxRuntime.jsx("thead", {
                      children: jsxRuntime.jsxs("tr", {
                        children: [
                          jsxRuntime.jsx("th", { children: "이름" }),
                          jsxRuntime.jsx("th", { children: "아이디" }),
                          jsxRuntime.jsx("th", { children: "권한" }),
                          jsxRuntime.jsx("th", { children: "상태" }),
                          jsxRuntime.jsx("th", { children: "최종 로그인" }),
                        ],
                      }),
                    }),
                    jsxRuntime.jsx("tbody", {
                      children: accountList.map((acc) =>
                        jsxRuntime.jsxs(
                          "tr",
                          {
                            className: acc.id === selectedAccountId ? "is-selected" : "",
                            onClick: () => setSelectedAccountId(acc.id),
                            children: [
                              jsxRuntime.jsxs("td", {
                                children: [
                                  jsxRuntime.jsx("div", {
                                    className: "content-table__title",
                                    children: acc.name,
                                  }),
                                  isCurrentUser(acc.id) &&
                                    jsxRuntime.jsx("div", {
                                      className: "content-table__sub",
                                      children: "본인",
                                    }),
                                ],
                              }),
                              jsxRuntime.jsx("td", { children: acc.id }),
                              jsxRuntime.jsx("td", {
                                children: jsxRuntime.jsx("span", {
                                  className: `status-badge ${acc.role === "MASTER" ? "status-badge--active" : "status-badge--processing"}`,
                                  children: accountRoleLabels[acc.role],
                                }),
                              }),
                              jsxRuntime.jsx("td", {
                                children: jsxRuntime.jsx("span", {
                                  className: `status-badge status-badge--${acc.status.toLowerCase()}`,
                                  children: accountStatusLabels[acc.status],
                                }),
                              }),
                              jsxRuntime.jsx("td", { children: acc.lastLoginAt ?? "-" }),
                            ],
                          },
                          acc.id,
                        ),
                      ),
                    }),
                  ],
                }),
              }),
            ],
          }),
          jsxRuntime.jsx(DetailFrame, {
            className: "accounts-detail-card",
            title: "계정 상세",
            actions: selectedAccount
              ? jsxRuntime.jsx("span", {
                  className: `status-badge status-badge--${selectedAccount.status.toLowerCase()}`,
                  children: accountStatusLabels[selectedAccount.status],
                })
              : null,
            children:
              selectedAccount === null
                ? jsxRuntime.jsx("div", {
                    className: "content-empty content-empty--detail",
                    children: "관리자를 선택하면 상세 정보가 표시됩니다.",
                  })
                : jsxRuntime.jsxs("div", {
                    className: "accounts-detail-scroll",
                    children: [
                      jsxRuntime.jsx(SectionHeader, {
                        title: jsxRuntime.jsxs("div", {
                          className: "accounts-detail-identity",
                          children: [
                            jsxRuntime.jsx("span", {
                              className: "accounts-detail-identity__name",
                              children: selectedAccount.name,
                            }),
                            jsxRuntime.jsxs("div", {
                              className: "accounts-detail-identity__meta",
                              children: [
                                jsxRuntime.jsx("span", {
                                  className: "accounts-detail-identity__id",
                                  children: selectedAccount.id,
                                }),
                                jsxRuntime.jsx("span", {
                                  className: "accounts-detail-identity__role",
                                  children: accountRoleLabels[selectedAccount.role],
                                }),
                              ],
                            }),
                          ],
                        }),
                        className:
                          "detail-frame__header accounts-detail-identity-header",
                        titleAs: "h3",
                      }),
                      jsxRuntime.jsxs("dl", {
                        className: "content-detail__list",
                        children: [
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("dt", { children: "등록일" }),
                              jsxRuntime.jsx("dd", { children: selectedAccount.registeredAt }),
                            ],
                          }),
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("dt", { children: "최종 로그인" }),
                              jsxRuntime.jsx("dd", { children: selectedAccount.lastLoginAt ?? "-" }),
                            ],
                          }),
                        ],
                      }),
                      isCurrentUser(selectedAccount.id)
                        ? jsxRuntime.jsx("p", {
                            className: "accounts-self-notice",
                            children:
                              "본인 계정은 권한 변경 및 비활성화가 제한됩니다.",
                          })
                        : jsxRuntime.jsxs("div", {
                            className: "accounts-action-row",
                            children: [
                              selectedAccount.status === "INACTIVE" &&
                                jsxRuntime.jsx("button", {
                                  type: "button",
                                  className: "primary-button",
                                  onClick: () =>
                                    setPendingAction({
                                      type: "ACTIVATE",
                                      accountId: selectedAccount.id,
                                      reason: "",
                                    }),
                                  children: "권한 복구",
                                }),
                              selectedAccount.status === "ACTIVE" &&
                                selectedAccount.role === "OPERATOR" &&
                                jsxRuntime.jsx("button", {
                                  type: "button",
                                  className: "danger-button",
                                  onClick: () =>
                                    setPendingAction({
                                      type: "DEACTIVATE",
                                      accountId: selectedAccount.id,
                                      reason: "",
                                    }),
                                  children: "권한 비활성화",
                                }),
                              selectedAccount.status === "LOCKED" &&
                                jsxRuntime.jsx("button", {
                                  type: "button",
                                  className: "primary-button",
                                  onClick: () =>
                                    setPendingAction({
                                      type: "UNLOCK",
                                      accountId: selectedAccount.id,
                                      reason: "",
                                    }),
                                  children: "잠금 해제",
                                }),
                            ],
                          }),
                      jsxRuntime.jsxs("div", {
                        className: "accounts-history",
                        children: [
                          jsxRuntime.jsx("h4", { children: "로그인 이력" }),
                          selectedAccount.loginHistory.length === 0
                            ? jsxRuntime.jsx("p", {
                                className: "accounts-history-empty",
                                children: "로그인 이력이 없습니다.",
                              })
                            : jsxRuntime.jsx("ul", {
                                className: "accounts-history-list",
                                children: selectedAccount.loginHistory.map((entry) =>
                                  jsxRuntime.jsxs(
                                    "li",
                                    {
                                      children: [
                                        jsxRuntime.jsx("strong", {
                                          children: entry.occurredAt,
                                        }),
                                        entry.success
                                          ? jsxRuntime.jsx("span", {
                                              className:
                                                "accounts-login-success",
                                              children: "성공",
                                            })
                                          : jsxRuntime.jsx("span", {
                                              className: "accounts-login-fail",
                                              children: "실패",
                                            }),
                                        jsxRuntime.jsx("span", {
                                          className: "accounts-history-ip",
                                          children: entry.ip,
                                        }),
                                      ],
                                    },
                                    entry.id,
                                  ),
                                ),
                              }),
                        ],
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "accounts-history",
                        children: [
                          jsxRuntime.jsx("h4", { children: "잠금·해제 이력" }),
                          selectedAccount.lockHistory.length === 0
                            ? jsxRuntime.jsx("p", {
                                className: "accounts-history-empty",
                                children: "잠금·해제 이력이 없습니다.",
                              })
                            : jsxRuntime.jsx("ul", {
                                className: "accounts-history-list",
                                children: selectedAccount.lockHistory.map((entry) =>
                                  jsxRuntime.jsxs(
                                    "li",
                                    {
                                      children: [
                                        jsxRuntime.jsx("strong", {
                                          children: entry.occurredAt,
                                        }),
                                        jsxRuntime.jsx("span", {
                                          className:
                                            entry.type === "LOCKED"
                                              ? "accounts-history-status--lock"
                                              : "accounts-history-status--unlock",
                                          children:
                                            entry.type === "LOCKED"
                                              ? "잠금"
                                              : "해제",
                                        }),
                                        jsxRuntime.jsxs("p", {
                                          className: "accounts-history-sub",
                                          children: [entry.reason, " · ", entry.actor],
                                        }),
                                      ],
                                    },
                                    entry.id,
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
      pendingAction &&
        jsxRuntime.jsx(ModalDialog, {
          title: accountActionLabels[pendingAction.type],
          ariaLabel: accountActionLabels[pendingAction.type],
          onClose: () => setPendingAction(null),
          size: "sm",
          footer: jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                className: "secondary-button",
                onClick: () => setPendingAction(null),
                children: "취소",
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                className:
                  pendingAction.type === "DEACTIVATE" ? "danger-button" : "primary-button",
                disabled: !pendingAction.reason.trim(),
                onClick: confirmAction,
                children: "확인",
              }),
            ],
          }),
          children: jsxRuntime.jsxs("label", {
            className: "field",
            children: [
              jsxRuntime.jsx("span", {
                className: "field__label",
                children: "사유 입력 *",
              }),
              jsxRuntime.jsx("textarea", {
                className: "field__input knowledge-textarea",
                rows: 3,
                value: pendingAction.reason,
                placeholder: "사유를 입력해 주세요.",
                onChange: (e) => setPendingAction({ ...pendingAction, reason: e.target.value }),
              }),
            ],
          }),
        }),
      isAddModalOpen &&
        jsxRuntime.jsxs(ModalDialog, {
          title: "계정 추가",
          ariaLabel: "계정 추가",
          onClose: closeAddModal,
          size: "lg",
          footer: jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                className: "secondary-button",
                onClick: closeAddModal,
                children: "취소",
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                className: "primary-button",
                disabled: !selectedCandidate || !addReason.trim(),
                onClick: confirmAddAccount,
                children: "확인",
              }),
            ],
          }),
          children: [
            jsxRuntime.jsxs("label", {
              className: "field",
              children: [
                jsxRuntime.jsx("span", {
                  className: "field__label",
                  children: "사용자 검색",
                }),
                jsxRuntime.jsx("input", {
                  className: "field__input",
                  value: candidateSearch,
                  placeholder: "검색어 입력",
                  onChange: (e) => setCandidateSearch(e.target.value),
                }),
              ],
            }),
            jsxRuntime.jsx("ul", {
              className: "user-candidate-list",
              children:
                filteredCandidates.length === 0
                  ? jsxRuntime.jsx("li", {
                      className: "user-candidate-empty",
                      children: "검색 결과가 없습니다.",
                    })
                  : filteredCandidates.map((candidate) =>
                      jsxRuntime.jsx(
                        "li",
                        {
                          children: jsxRuntime.jsxs("button", {
                            type: "button",
                            className: `user-candidate-item${(selectedCandidate == null ? void 0 : selectedCandidate.id) === candidate.id ? " is-selected" : ""}`,
                            onClick: () => setSelectedCandidate(candidate),
                            children: [
                              jsxRuntime.jsxs("span", {
                                children: [candidate.name, " (", candidate.id, ")"],
                              }),
                              jsxRuntime.jsx("span", {
                                className: "user-candidate-code",
                                children: candidate.complexCode,
                              }),
                            ],
                          }),
                        },
                        candidate.id,
                      ),
                    ),
            }),
            jsxRuntime.jsxs("label", {
              className: "field",
              children: [
                jsxRuntime.jsx("span", {
                  className: "field__label",
                  children: "추가 사유 * (최대 200자)",
                }),
                jsxRuntime.jsx("textarea", {
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
const navigationItems = [
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
  routeMetadata = {
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
  feedbackRecordList = [
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
  return feedbackRecordList.slice().sort((e, t) => t.createdAt.localeCompare(e.createdAt));
}
const AUTH_STATUS_KEY = "xperp-mock-authenticated",
  AUTH_USER_ID_STORAGE_KEY = "xperp-mock-auth-user",
  OTP_FAILURE_COUNT_STORAGE_KEY = "xperp-mock-otp-failures",
  OTP_LOCKED_STORAGE_KEY = "xperp-mock-otp-locked";
function Sidebar({ currentPath: e, onNavigate: t, onLogout: l }) {
  const [a, n] = hookRuntime.useState(!1),
    u = loadCurrentAccountProfile(),
    i = navigationItems.filter((f) => f.roles.includes(u.role)),
    s = () => {
      (typeof window < "u" &&
        (window.sessionStorage.removeItem(AUTH_STAGE_KEY),
        window.sessionStorage.removeItem(AUTH_STATUS_KEY),
        window.sessionStorage.removeItem(AUTH_USER_ID_STORAGE_KEY),
        window.sessionStorage.removeItem(OTP_FAILURE_COUNT_STORAGE_KEY),
        window.sessionStorage.removeItem(OTP_LOCKED_STORAGE_KEY),
        window.localStorage.removeItem(AUTH_STATUS_KEY)),
        clearPersistedAccountProfile(),
        n(!1),
        l());
    };
  return jsxRuntime.jsxs("aside", {
    className: "sidebar",
    children: [
      jsxRuntime.jsxs("div", {
        className: "sidebar__brand",
        children: [
          jsxRuntime.jsx("div", { className: "sidebar__logo", children: "XpERP" }),
          jsxRuntime.jsx("div", {
            className: "sidebar__badge",
            children: "AI 관리자로",
          }),
        ],
      }),
      jsxRuntime.jsx("nav", {
        className: "sidebar__nav",
        "aria-label": "메뉴",
        children: i.map((f) => {
          const r = e === f.href;
          return jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              className: `sidebar__nav-item${r ? " is-active" : ""}`,
              onClick: () => t(f.href),
              "aria-current": r ? "page" : void 0,
              children: [
                jsxRuntime.jsx("span", {
                  className: "sidebar__nav-icon",
                  "aria-hidden": "true",
                  children: f.key.slice(0, 1).toUpperCase(),
                }),
                jsxRuntime.jsx("span", { children: f.label }),
              ],
            },
            f.key,
          );
        }),
      }),
      jsxRuntime.jsxs("div", {
        className: "sidebar__user",
        children: [
          jsxRuntime.jsxs("div", {
            className: "sidebar__user-row",
            children: [
              jsxRuntime.jsx("div", {
                className: "sidebar__user-name",
                children: u.name,
              }),
              jsxRuntime.jsx("div", { className: "sidebar__user-meta", children: u.id }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            className: "sidebar__user-role",
            children: [u.role, " · ", u.department],
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            className: "secondary-button sidebar__logout",
            onClick: () => n(!0),
            children: "로그아웃",
          }),
        ],
      }),
      a
        ? jsxRuntime.jsx(ModalDialog, {
            title: "로그아웃",
            ariaLabel: "로그아웃 확인",
            onClose: () => n(!1),
            size: "sm",
            compact: !0,
            backdropClassName: "logout-backdrop",
            headerClassName: "modal__header--tight",
            footerClassName: "modal__footer--split",
            footer: jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => n(!1),
                  children: "취소",
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  className: "danger-button",
                  onClick: s,
                  children: "확인",
                }),
              ],
            }),
            children: jsxRuntime.jsx("p", {
              className: "logout-confirm__text",
              children: "로그아웃 하시겠습니까?",
            }),
          })
        : null,
    ],
  });
}
function TopHeader({ title: e, description: t, rightSlot: l }) {
  return jsxRuntime.jsxs("header", {
    className: "top-header",
    children: [
      jsxRuntime.jsxs("div", {
        className: "top-header__copy",
        children: [
          jsxRuntime.jsx("h1", { className: "top-header__title", children: e }),
          t
            ? jsxRuntime.jsx("p", { className: "top-header__description", children: t })
            : null,
        ],
      }),
      l ? jsxRuntime.jsx("div", { className: "top-header__slot", children: l }) : null,
    ],
  });
}
function DashboardShell({ currentPath: e, onNavigate: t, onLogout: l }) {
  const a = loadCurrentAccountProfile(),
    n = routeMetadata[e] ?? routeMetadata["/dashboard"],
    u = hookRuntime.useMemo(
      () => navigationItems.filter((r) => r.roles.includes(a.role)).map((r) => r.href),
      [a.role],
    ),
    [i, s] = hookRuntime.useState(null);
  (hookRuntime.useEffect(() => {
    let r = !0;
    return (
      Promise.all([loadFeedbackItems(), loadAccountData(), loadKnowledgeDocuments()]).then(([b, y, h]) => {
        r &&
          s({
            feedbacks: b,
            accounts: y.accounts,
            knowledgeDocumentList: h.documents,
          });
      }),
      () => {
        r = !1;
      }
    );
  }, []),
    hookRuntime.useEffect(() => {
      u.includes(e) || (u[0] && t(u[0]));
    }, [e, t, u]));
  const f = () => {
    switch (e) {
      case "/dashboard":
        return jsxRuntime.jsx(DashboardView, { data: DASHBOARD_SECTIONS.WEEK });
      case "/content":
        return jsxRuntime.jsx(ContentManagementView, { documents: contentDocumentList });
      case "/cache-qa":
        return jsxRuntime.jsx(CacheAnswerManagementView, { items: cacheQaRecords });
      case "/knowledge":
        return i
          ? jsxRuntime.jsx(KnowledgeQueryView, { documents: i.knowledgeDocumentList })
          : jsxRuntime.jsx(LoadingPlaceholder, { label: "지식 기반 조회" });
      case "/feedback":
        return i
          ? jsxRuntime.jsx(FeedbackManagementView, { feedbacks: i.feedbacks })
          : jsxRuntime.jsx(LoadingPlaceholder, { label: "피드백 관리" });
      case "/accounts":
        return i
          ? jsxRuntime.jsx(AccountPermissionManagementView, { accounts: i.accounts })
          : jsxRuntime.jsx(LoadingPlaceholder, { label: "계정/권한 관리" });
      default:
        return jsxRuntime.jsx(DashboardView, { data: DASHBOARD_SECTIONS.WEEK });
    }
  };
  return jsxRuntime.jsxs("div", {
    className: "admin-shell",
    children: [
      jsxRuntime.jsx(Sidebar, { currentPath: e, onNavigate: t, onLogout: l }),
      jsxRuntime.jsxs("div", {
        className: "admin-shell__main",
        children: [
          jsxRuntime.jsx(TopHeader, { title: n.title, description: n.description }),
          jsxRuntime.jsx("main", { className: "admin-shell__content", children: f() }),
        ],
      }),
    ],
  });
}
function LoadingPlaceholder({ label: e }) {
  return jsxRuntime.jsx("section", {
    className: "panel panel--main",
    children: jsxRuntime.jsxs("div", {
      className: "content-empty content-empty--detail",
      children: [e, " 데이터를 불러오는 중입니다."],
    }),
  });
}
const AUTHENTICATED_STATUS = "authenticated";
function App() {
  const [e, t] = hookRuntime.useState(!1),
    [l, a] = hookRuntime.useState("/dashboard");
  hookRuntime.useEffect(() => {
    typeof window > "u" || t(window.sessionStorage.getItem(AUTH_STAGE_KEY) === AUTHENTICATED_STATUS);
  }, []);
  const n = () => {
      (t(!0), a("/dashboard"));
    },
    u = () => {
      (t(!1), a("/dashboard"));
    };
  return e
    ? jsxRuntime.jsx(DashboardShell, { currentPath: l, onNavigate: a, onLogout: u })
    : jsxRuntime.jsx(AuthScreen, { onAuthenticated: n });
}

const miniRendererState = {
  root: null,
  element: null,
  instances: new Map(),
  effects: [],
  currentInstance: null,
  currentHookIndex: 0,
  scheduled: false,
  portalRoot: null,
};

function getMiniInstance(path, type) {
  const key = `${path}`;
  let instance = miniRendererState.instances.get(key);
  if (!instance) {
    instance = {
      type,
      hooks: [],
      effects: [],
      childCount: 0,
    };
    miniRendererState.instances.set(key, instance);
  }
  instance.type = type;
  instance.childCount = 0;
  return instance;
}

function scheduleMiniRender() {
  if (miniRendererState.scheduled) return;
  miniRendererState.scheduled = true;
  queueMicrotask(() => {
    miniRendererState.scheduled = false;
    renderMiniApp();
  });
}

function useMiniState(initialValue) {
  const instance = miniRendererState.currentInstance;
  const index = miniRendererState.currentHookIndex++;
  if (instance.hooks[index] === void 0) {
    instance.hooks[index] = typeof initialValue === "function" ? initialValue() : initialValue;
  }
  const setState = (nextValue) => {
    const resolved = typeof nextValue === "function" ? nextValue(instance.hooks[index]) : nextValue;
    if (!Object.is(resolved, instance.hooks[index])) {
      instance.hooks[index] = resolved;
      scheduleMiniRender();
    }
  };
  return [instance.hooks[index], setState];
}

function haveDependenciesChanged(prevDeps, nextDeps) {
  if (!prevDeps || !nextDeps) return true;
  if (prevDeps.length !== nextDeps.length) return true;
  for (let index = 0; index < prevDeps.length; index += 1) {
    if (!Object.is(prevDeps[index], nextDeps[index])) return true;
  }
  return false;
}

function useMiniMemo(factory, deps) {
  const instance = miniRendererState.currentInstance;
  const index = miniRendererState.currentHookIndex++;
  const record = instance.hooks[index];
  if (!record || haveDependenciesChanged(record.deps, deps)) {
    const value = factory();
    instance.hooks[index] = { value, deps };
    return value;
  }
  return record.value;
}

function useMiniRef(initialValue) {
  const instance = miniRendererState.currentInstance;
  const index = miniRendererState.currentHookIndex++;
  if (!instance.hooks[index]) {
    instance.hooks[index] = { current: initialValue };
  }
  return instance.hooks[index];
}

function useMiniCallback(callback, deps) {
  return useMiniMemo(() => callback, deps);
}

function useMiniEffect(effect, deps) {
  const instance = miniRendererState.currentInstance;
  const index = miniRendererState.currentHookIndex++;
  const previous = instance.hooks[index];
  if (!previous || haveDependenciesChanged(previous.deps, deps)) {
    instance.hooks[index] = { effect, deps, cleanup: previous?.cleanup ?? null, pending: true };
    miniRendererState.effects.push({ instance, index });
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
    if (!miniRendererState.portalRoot) {
      miniRendererState.portalRoot = document.createElement("div");
      miniRendererState.portalRoot.setAttribute("data-mini-portal", "true");
      document.body.appendChild(miniRendererState.portalRoot);
    }
    const portalContainer = miniRendererState.portalRoot;
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
    const instance = getMiniInstance(path, element.type);
    const previousInstance = miniRendererState.currentInstance;
    const previousHookIndex = miniRendererState.currentHookIndex;
    miniRendererState.currentInstance = instance;
    miniRendererState.currentHookIndex = 0;
    instance.childCount += 1;
    const rendered = element.type({ ...(element.props ?? {}) });
    const node = renderMiniElement(rendered, `${path}:render`);
    miniRendererState.currentInstance = previousInstance;
    miniRendererState.currentHookIndex = previousHookIndex;
    return node;
  }

  const node = document.createElement(element.type);
  setDomProps(node, element.props ?? {});
  renderChildren(node, element.props?.children, path);
  return node;
}

function renderMiniApp() {
  if (!miniRendererState.root) return;
  miniRendererState.effects = [];
  miniRendererState.root.innerHTML = "";
  if (miniRendererState.portalRoot) {
    miniRendererState.portalRoot.innerHTML = "";
  }
  const node = renderMiniElement(miniRendererState.element, "root");
  if (node) miniRendererState.root.appendChild(node);
  const effects = miniRendererState.effects.slice();
  miniRendererState.effects = [];
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
  miniRendererState.root = container;
  return {
    render(element) {
      miniRendererState.element = element;
      renderMiniApp();
    },
  };
}

hookRuntime.useState = useMiniState;
hookRuntime.useMemo = useMiniMemo;
hookRuntime.useRef = useMiniRef;
hookRuntime.useCallback = useMiniCallback;
hookRuntime.useEffect = useMiniEffect;
hookRuntime.useLayoutEffect = useMiniEffect;

rendererRuntime.createRoot = mountMiniApp;

function initializeApp() {
  const root = document.getElementById("root");
  if (root) {
    const appRootController = rendererRuntime.createRoot(root);
    appRootController.render(jsxRuntime.jsx(App, {}));
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
