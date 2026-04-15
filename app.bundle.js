var XpERPAdmin = (() => {
  // src/app/data.js
  var S = {
    stage: "xperp-mock-auth-stage",
    auth: "xperp-mock-authenticated",
    user: "xperp-mock-auth-user",
    profile: "xperp-mock-auth-profile",
    fail: "xperp-mock-otp-failures",
    lock: "xperp-mock-otp-locked"
  };
  var AUTH_STATUS = "authenticated";
  var OTP_PENDING = "otp_pending";
  var OTP = "123456";
  var TOAST_MS = 3e3;
  var OTP_MAX = 5;
  var R = document.getElementById("root");
  var P = document.createElement("div");
  P.id = "portal-root";
  document.body.appendChild(P);
  var Ls = {
    userId: "chat1004",
    id: "chat1004",
    name: "\uBC15\uC6B4\uC601",
    role: "MASTER",
    department: "\uC6B4\uC601 \uAD00\uB9AC\uC790"
  };
  var AuthUsers = {
    test0000: {
      password: "a123456789",
      profile: {
        userId: "test0000",
        id: "chat1004",
        name: "\uBC15\uC2B9\uC900",
        role: "MASTER",
        department: "\uC6B4\uC601 \uAD00\uB9AC\uC790"
      },
      allowed: true
    },
    test1111: {
      password: "a123456789",
      profile: {
        userId: "test1111",
        id: "op2031",
        name: "\uAD8C\uD0DC\uC601",
        role: "OPERATOR",
        department: "\uC6B4\uC601 \uB2F4\uB2F9"
      },
      allowed: true
    },
    blocked0000: {
      password: "a123456789",
      profile: {
        userId: "blocked0000",
        id: "op9001",
        name: "\uCC28\uB2E8\uACC4\uC815",
        role: "OPERATOR",
        department: "\uAD8C\uD55C \uBBF8\uBD80\uC5EC"
      },
      allowed: false
    }
  };
  var Msg = {
    bad: {
      title: "\uB85C\uADF8\uC778 \uC624\uB958",
      message: "\uC544\uC774\uB514 \uB610\uB294 \uBE44\uBC00\uBC88\uD638\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD574 \uC8FC\uC138\uC694."
    },
    denied: {
      title: "\uAD8C\uD55C \uC5C6\uC74C",
      message: "\uAD8C\uD55C\uC774 \uC5C6\uB294 \uC0AC\uC6A9\uC790\uC785\uB2C8\uB2E4. \uAD00\uB9AC\uC790\uC5D0\uAC8C \uAD8C\uD55C\uC744 \uC694\uCCAD\uD574 \uC8FC\uC138\uC694."
    },
    locked: {
      title: "OTP \uC7A0\uAE08",
      message: "OTP \uC624\uB958\uB85C \uC7A0\uAE08\uB41C \uC544\uC774\uB514 \uC785\uB2C8\uB2E4. \uAD00\uB9AC\uC790\uC5D0\uAC8C \uBB38\uC758\uD558\uC138\uC694."
    }
  };
  var NAV = [
    { key: "dashboard", label: "\uB300\uC2DC\uBCF4\uB4DC", href: "/dashboard", roles: ["MASTER", "OPERATOR"] },
    { key: "content", label: "\uCF58\uD150\uCE20 \uAD00\uB9AC", href: "/content", roles: ["MASTER"] },
    { key: "cache-qa", label: "\uCE90\uC2DC \uB2F5\uBCC0 \uAD00\uB9AC", href: "/cache-qa", roles: ["MASTER"] },
    { key: "knowledge", label: "\uC9C0\uC2DD \uAE30\uBC18 \uC870\uD68C", href: "/knowledge", roles: ["MASTER", "OPERATOR"] },
    { key: "feedback", label: "\uD53C\uB4DC\uBC31 \uAD00\uB9AC", href: "/feedback", roles: ["MASTER", "OPERATOR"] },
    { key: "accounts", label: "\uACC4\uC815/\uAD8C\uD55C \uAD00\uB9AC", href: "/accounts", roles: ["MASTER"] }
  ];
  var META = {
    "/dashboard": {
      title: "\uB300\uC2DC\uBCF4\uB4DC",
      description: "\uC6B4\uC601 \uD604\uD669\uC744 \uD55C\uB208\uC5D0 \uD655\uC778\uD558\uB294 \uBA54\uC778 \uD654\uBA74\uC785\uB2C8\uB2E4."
    },
    "/content": {
      title: "\uCF58\uD150\uCE20 \uAD00\uB9AC",
      description: "RAG \uBB38\uC11C\uB97C \uB4F1\uB85D\uD558\uACE0 \uC218\uC815, \uC0AD\uC81C, \uC774\uB825\uC744 \uAD00\uB9AC\uD558\uB294 \uD654\uBA74\uC785\uB2C8\uB2E4."
    },
    "/knowledge": {
      title: "\uC9C0\uC2DD \uAE30\uBC18 \uC870\uD68C",
      description: "\uB4F1\uB85D\uB41C \uBB38\uC11C\uB97C \uAE30\uBC18\uC73C\uB85C \uC751\uB2F5 \uD14C\uC2A4\uD2B8\uB97C \uC218\uD589\uD558\uB294 \uD654\uBA74\uC785\uB2C8\uB2E4."
    },
    "/feedback": {
      title: "\uD53C\uB4DC\uBC31 \uAD00\uB9AC",
      description: "\uD53C\uB4DC\uBC31 \uBAA9\uB85D\uACFC \uC0C1\uC138 \uC815\uBCF4\uB97C \uD655\uC778\uD558\uB294 \uD654\uBA74\uC785\uB2C8\uB2E4."
    },
    "/accounts": {
      title: "\uACC4\uC815/\uAD8C\uD55C \uAD00\uB9AC",
      description: "\uC6B4\uC601 \uACC4\uC815\uACFC \uAD8C\uD55C \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uD654\uBA74\uC785\uB2C8\uB2E4."
    },
    "/cache-qa": {
      title: "\uCE90\uC2DC \uB2F5\uBCC0 \uAD00\uB9AC",
      description: "\uCE90\uC2DC \uC751\uB2F5\uACFC \uC9C8\uBB38\uC744 \uB2E8\uC704\uB85C \uAD00\uB9AC\uD558\uB294 \uD654\uBA74\uC785\uB2C8\uB2E4."
    }
  };
  var CONTENT_FORM = {
    fileName: "",
    path: "",
    type: "MANUAL"
  };
  var CACHE_FORM = {
    question: "",
    answer: "",
    status: "ACTIVE"
  };
  var CONTENT_DOCS = [
    {
      id: "doc-1",
      name: "\uCC57\uBD07 \uC6B4\uC601 \uB9E4\uB274\uC5BC",
      type: "MANUAL",
      path: "/rag/manual/chatbot-operations",
      author: "\uBC15\uC6B4\uC601",
      createdAt: "2026-04-01 09:10",
      updatedAt: "2026-04-13 16:20",
      status: "ACTIVE",
      fileName: "chatbot-operations.pdf",
      fileSize: "12.4MB",
      history: [
        { id: "hist-1", version: "v3", actor: "\uBC15\uC6B4\uC601", action: "\uC218\uC815", reason: "\uC6B4\uC601 \uC808\uCC28 \uCD5C\uC2E0\uD654", occurredAt: "2026-04-13 16:20" },
        { id: "hist-2", version: "v2", actor: "\uBC15\uC6B4\uC601", action: "\uC218\uC815", reason: "FAQ \uACBD\uB85C \uBC18\uC601", occurredAt: "2026-04-08 14:15" },
        { id: "hist-3", version: "v1", actor: "\uBC15\uC6B4\uC601", action: "\uC5C5\uB85C\uB4DC", reason: "\uC2E0\uADDC \uB4F1\uB85D", occurredAt: "2026-04-01 09:10" }
      ]
    },
    {
      id: "doc-2",
      name: "\uACF5\uD1B5 FAQ",
      type: "FAQ",
      path: "/rag/faq/common-questions",
      author: "\uBC15\uC6B4\uC601",
      createdAt: "2026-04-02 10:20",
      updatedAt: "2026-04-12 15:00",
      status: "ACTIVE",
      fileName: "faq-common.docx",
      fileSize: "6.8MB",
      history: [
        { id: "hist-4", version: "v2", actor: "\uBC15\uC6B4\uC601", action: "\uC218\uC815", reason: "\uC6A9\uC5B4 \uC815\uB9AC", occurredAt: "2026-04-12 15:00" },
        { id: "hist-5", version: "v1", actor: "\uBC15\uC6B4\uC601", action: "\uC5C5\uB85C\uB4DC", reason: "\uC2E0\uADDC \uB4F1\uB85D", occurredAt: "2026-04-02 10:20" }
      ]
    },
    {
      id: "doc-3",
      name: "\uACB0\uC81C \uC548\uB0B4 \uB9E4\uB274\uC5BC",
      type: "MANUAL",
      path: "/rag/manual/payment-guide",
      author: "\uBC15\uC6B4\uC601",
      createdAt: "2026-04-05 11:40",
      updatedAt: "2026-04-11 13:05",
      status: "ACTIVE",
      fileName: "payment-guide.md",
      fileSize: "3.1MB",
      history: [
        { id: "hist-6", version: "v2", actor: "\uAD00\uB9AC\uC790", action: "\uC218\uC815", reason: "\uC218\uC218\uB8CC \uC815\uCC45 \uBC18\uC601", occurredAt: "2026-04-11 13:05" },
        { id: "hist-7", version: "v1", actor: "\uBC15\uC6B4\uC601", action: "\uC5C5\uB85C\uB4DC", reason: "\uC2E0\uADDC \uB4F1\uB85D", occurredAt: "2026-04-05 11:40" }
      ]
    },
    {
      id: "doc-4",
      name: "\uCC28\uB7C9 \uB4F1\uB85D FAQ",
      type: "FAQ",
      path: "/rag/faq/vehicle-registration",
      author: "\uBC15\uC6B4\uC601",
      createdAt: "2026-04-06 14:30",
      updatedAt: "2026-04-10 09:45",
      status: "INACTIVE",
      fileName: "vehicle-registration.docx",
      fileSize: "2.9MB",
      history: [
        { id: "hist-8", version: "v2", actor: "\uAD00\uB9AC\uC790", action: "\uC218\uC815", reason: "\uBE44\uD65C\uC131 \uC804\uD658", occurredAt: "2026-04-10 09:45" },
        { id: "hist-9", version: "v1", actor: "\uBC15\uC6B4\uC601", action: "\uC5C5\uB85C\uB4DC", reason: "\uC2E0\uADDC \uB4F1\uB85D", occurredAt: "2026-04-06 14:30" }
      ]
    }
  ];
  var KNOWLEDGE_DOCS = CONTENT_DOCS.map(({ id, name, type, path }) => ({ id, name, type, path }));
  var CACHE_DOCS = [
    {
      id: "cache-1",
      question: "\uBE44\uBC00\uBC88\uD638\uB97C \uBCC0\uACBD\uD558\uB824\uBA74?",
      answer: "\uB9C8\uC774\uD398\uC774\uC9C0 > \uBCF4\uC548 \uC124\uC815\uC5D0\uC11C \uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD\uC744 \uC9C4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      status: "ACTIVE",
      createdAt: "2026-04-13 08:20",
      updatedAt: "2026-04-13 08:20",
      createdBy: "\uBC15\uC6B4\uC601",
      updatedBy: "\uBC15\uC6B4\uC601",
      hitCount: 124,
      lastMatchedAt: "2026-04-15 11:20"
    },
    {
      id: "cache-2",
      question: "\uC811\uC18D\uC774 \uC9C0\uC5F0\uB420 \uB54C\uB294?",
      answer: "\uB124\uD2B8\uC6CC\uD06C \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uACE0 5\uBD84 \uB4A4 \uC7AC\uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.",
      status: "ACTIVE",
      createdAt: "2026-04-12 14:00",
      updatedAt: "2026-04-12 16:40",
      createdBy: "\uBC15\uC6B4\uC601",
      updatedBy: "\uAD00\uB9AC\uC790",
      hitCount: 82,
      lastMatchedAt: "2026-04-15 09:02"
    },
    {
      id: "cache-3",
      question: "\uC790\uB3D9 \uB4F1\uB85D\uC774 \uC548 \uB429\uB2C8\uB2E4",
      answer: "\uBB38\uC11C \uC0C1\uD0DC\uAC00 \uBE44\uD65C\uC131\uC778 \uACBD\uC6B0 \uCE90\uC2DC \uC751\uB2F5\uC5D0\uC11C \uC81C\uC678\uB429\uB2C8\uB2E4.",
      status: "INACTIVE",
      createdAt: "2026-04-11 10:15",
      updatedAt: "2026-04-14 12:30",
      createdBy: "\uBC15\uC6B4\uC601",
      updatedBy: "\uBC15\uC6B4\uC601",
      hitCount: 46,
      lastMatchedAt: null
    },
    {
      id: "cache-4",
      question: "\uAD00\uB9AC\uC790 \uAD8C\uD55C\uC740 \uC5B4\uB5BB\uAC8C \uBCF5\uAD6C\uD558\uB098\uC694?",
      answer: "\uACC4\uC815/\uAD8C\uD55C \uAD00\uB9AC \uD654\uBA74\uC5D0\uC11C \uAD8C\uD55C \uBCF5\uAD6C\uB97C \uC9C4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      status: "ACTIVE",
      createdAt: "2026-04-10 09:25",
      updatedAt: "2026-04-10 09:25",
      createdBy: "\uBC15\uC6B4\uC601",
      updatedBy: "\uBC15\uC6B4\uC601",
      hitCount: 31,
      lastMatchedAt: "2026-04-15 08:15"
    }
  ];
  var FEEDBACK = [
    {
      id: "fb-1",
      createdAt: "2026-04-15 09:18",
      complexName: "\uADF8\uB9B0\uC544\uD30C\uD2B8",
      userId: "user-1001",
      reaction: "POSITIVE",
      hasNegativeReason: false,
      negativeReason: "",
      conversation: [
        { speaker: "USER", sentAt: "09:17", message: "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD \uC704\uCE58\uB97C \uBC14\uB85C \uCC3E\uC744 \uC218 \uC788\uC5B4 \uC88B\uC558\uC5B4\uC694." },
        { speaker: "BOT", sentAt: "09:17", message: "\uD544\uC694\uD55C \uACBD\uB85C\uB97C \uBE60\uB974\uAC8C \uC548\uB0B4\uD588\uC2B5\uB2C8\uB2E4." }
      ]
    },
    {
      id: "fb-2",
      createdAt: "2026-04-15 08:50",
      complexName: "\uC13C\uD2B8\uB7F4\uD558\uC6B0\uC2A4",
      userId: "user-1034",
      reaction: "NEGATIVE",
      hasNegativeReason: true,
      negativeReason: "\uC751\uB2F5\uC774 \uC57D\uAC04 \uB2A6\uC5B4\uC694.",
      conversation: [
        { speaker: "USER", sentAt: "08:48", message: "\uC811\uC18D\uC774 \uC9C0\uC5F0\uB420 \uB54C \uC5B4\uB5BB\uAC8C \uD574\uC57C \uD558\uB098\uC694?" },
        { speaker: "BOT", sentAt: "08:49", message: "\uB124\uD2B8\uC6CC\uD06C \uC0C1\uD0DC\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694." }
      ]
    },
    {
      id: "fb-3",
      createdAt: "2026-04-14 16:10",
      complexName: "\uD574\uC624\uB984\uBE4C",
      userId: "user-2101",
      reaction: "POSITIVE",
      hasNegativeReason: false,
      negativeReason: "",
      conversation: [
        { speaker: "USER", sentAt: "16:08", message: "\uBB38\uC11C\uAC00 \uBC14\uB85C \uBC18\uC601\uB3FC\uC11C \uD3B8\uD588\uC5B4\uC694." },
        { speaker: "BOT", sentAt: "16:09", message: "\uAC10\uC0AC\uD569\uB2C8\uB2E4. \uCD5C\uC2E0 \uBB38\uC11C\uB85C \uC751\uB2F5\uD588\uC2B5\uB2C8\uB2E4." }
      ]
    },
    {
      id: "fb-4",
      createdAt: "2026-04-14 11:35",
      complexName: "\uB77C\uC628\uD0C0\uC6CC",
      userId: "user-0892",
      reaction: "NEGATIVE",
      hasNegativeReason: true,
      negativeReason: "\uC124\uBA85\uC774 \uC870\uAE08 \uBD80\uC871\uD588\uC5B4\uC694.",
      conversation: [
        { speaker: "USER", sentAt: "11:33", message: "\uCC28\uB7C9 \uB4F1\uB85D\uC774 \uC548 \uB3FC\uC694." },
        { speaker: "BOT", sentAt: "11:34", message: "\uBE44\uD65C\uC131 \uBB38\uC11C\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694." }
      ]
    },
    {
      id: "fb-5",
      createdAt: "2026-04-13 14:02",
      complexName: "\uD30C\uC778\uBDF0",
      userId: "user-5678",
      reaction: "POSITIVE",
      hasNegativeReason: false,
      negativeReason: "",
      conversation: [
        { speaker: "USER", sentAt: "14:01", message: "\uB2F5\uBCC0\uC774 \uBA85\uD655\uD574\uC11C \uC88B\uC2B5\uB2C8\uB2E4." },
        { speaker: "BOT", sentAt: "14:01", message: "\uB3C4\uC6C0\uC774 \uB418\uC5C8\uB2E4\uBA74 \uB2E4\uD589\uC785\uB2C8\uB2E4." }
      ]
    }
  ];
  var ACCOUNTS = [
    {
      id: "chat1004",
      name: "\uBC15\uC6B4\uC601",
      role: "MASTER",
      status: "ACTIVE",
      registeredAt: "2026-04-01",
      lastLoginAt: "2026-04-15 08:45",
      loginHistory: [
        { occurredAt: "2026-04-15 08:45", success: true, ip: "10.0.0.11" },
        { occurredAt: "2026-04-14 17:20", success: true, ip: "10.0.0.11" }
      ],
      lockHistory: []
    },
    {
      id: "op2031",
      name: "\uAD8C\uD0DC\uC601",
      role: "OPERATOR",
      status: "ACTIVE",
      registeredAt: "2026-04-03",
      lastLoginAt: "2026-04-14 18:15",
      loginHistory: [{ occurredAt: "2026-04-14 18:15", success: true, ip: "10.0.0.24" }],
      lockHistory: []
    },
    {
      id: "op9012",
      name: "\uCC28\uB2E8\uACC4\uC815",
      role: "OPERATOR",
      status: "LOCKED",
      registeredAt: "2026-04-04",
      lastLoginAt: "2026-04-11 09:00",
      loginHistory: [{ occurredAt: "2026-04-11 08:59", success: false, ip: "10.0.0.45" }],
      lockHistory: [{ occurredAt: "2026-04-11 09:00", type: "LOCKED", reason: "OTP \uC5F0\uC18D \uC2E4\uD328", actor: "\uC2DC\uC2A4\uD15C" }]
    },
    {
      id: "op9301",
      name: "\uAE40\uC9C0\uC6D0",
      role: "OPERATOR",
      status: "INACTIVE",
      registeredAt: "2026-04-05",
      lastLoginAt: null,
      loginHistory: [],
      lockHistory: [{ occurredAt: "2026-04-08 10:30", type: "UNLOCKED", reason: "\uAD8C\uD55C \uAC80\uD1A0 \uC644\uB8CC", actor: "\uAD00\uB9AC\uC790" }]
    }
  ];
  var CANDIDATES = [
    { id: "op3001", name: "\uC774\uC11C\uC900", complexCode: "C-1001" },
    { id: "op3002", name: "\uCD5C\uC720\uC9C4", complexCode: "C-1023" },
    { id: "op3003", name: "\uD55C\uC9C0\uBBFC", complexCode: "C-1055" }
  ];
  var clone = (value) => JSON.parse(JSON.stringify(value));
  var createAuthState = () => ({
    form: { userId: "", password: "", otp: "" },
    remember: false,
    helper: "",
    error: "",
    processing: false,
    otpOpen: false,
    otpLocked: false,
    otpFailures: 0,
    notice: null
  });
  var createDashState = () => ({
    range: "WEEK",
    hoveredTrend: null,
    hoveredReaction: null,
    tooltip: { left: 12, top: 12 },
    selectedReaction: "POSITIVE"
  });
  var createContentState = () => ({
    docs: clone(CONTENT_DOCS),
    filterDraft: "",
    filterApplied: "",
    type: "ALL",
    selectedId: CONTENT_DOCS[0]?.id ?? null,
    modalOpen: false,
    modalMode: "CREATE",
    modalTarget: null,
    modalError: "",
    deleteOpen: false,
    selectedFileLabel: "",
    form: clone(CONTENT_FORM)
  });
  var createCacheState = () => ({
    items: clone(CACHE_DOCS).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    filterDraft: "",
    filterApplied: "",
    status: "ALL",
    page: 1,
    selectedId: CACHE_DOCS[0]?.id ?? null,
    modalOpen: false,
    modalMode: "CREATE",
    modalTarget: null,
    modalError: "",
    deleteOpen: false,
    form: clone(CACHE_FORM)
  });
  var createKnowledgeState = () => ({
    form: { question: "", documentType: "", documentId: "" },
    status: "IDLE",
    result: null,
    copied: false
  });
  var createFeedbackState = () => ({
    filters: { reaction: "ALL" },
    draftRange: { startDate: "", endDate: "" },
    appliedRange: { startDate: "", endDate: "" },
    selectedId: null
  });
  var createAccountsState = () => ({
    items: clone(ACCOUNTS),
    selectedId: ACCOUNTS[0]?.id ?? null,
    actionModal: null,
    addOpen: false,
    addSearch: "",
    addReason: "",
    selectedCandidateId: null
  });
  var createState = () => ({
    authenticated: false,
    path: "/dashboard",
    shellLoaded: false,
    shell: { feedbacks: null, accounts: null, knowledge: null },
    auth: createAuthState(),
    dash: createDashState(),
    content: createContentState(),
    cache: createCacheState(),
    knowledge: createKnowledgeState(),
    feedback: createFeedbackState(),
    accounts: createAccountsState(),
    toasts: [],
    logoutOpen: false,
    restoreFocus: null
  });
  var state = createState();

  // src/app/utils.js
  var esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  var now = () => (/* @__PURE__ */ new Date()).toLocaleString("sv-SE").slice(0, 16).replace("T", " ");
  var cleanId = (v) => String(v ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 10);
  var cleanPwd = (v) => String(v ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
  var cleanOtp = (v) => String(v ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 6);
  var norm = (v) => String(v ?? "").toLowerCase().trim().replace(/\s+/g, "").replace(/[^0-9a-z가-힣]/gi, "");
  var cmpDesc = (a, b) => String(b).localeCompare(String(a));

  // src/app/controller.js
  var q = false;
  function toast(message, tone = "success", ms = TOAST_MS) {
    const id = `t-${Date.now()}-${++toastSeq}`;
    state.toasts.push({ id, message, tone });
    renderSoon();
    const tm = setTimeout(() => {
      timers.delete(id);
      state.toasts = state.toasts.filter((x) => x.id !== id);
      renderSoon();
    }, ms);
    timers.set(id, tm);
  }
  function clearToasts() {
    for (const tm of timers.values()) clearTimeout(tm);
    timers.clear();
    state.toasts = [];
  }
  function storedProfile() {
    try {
      const s = sessionStorage.getItem(S.profile) || localStorage.getItem(S.profile);
      if (s) {
        const p = JSON.parse(s);
        if (p?.id && p?.name && p?.role && p?.department) return p;
      }
    } catch {
    }
    return Ls;
  }
  function saveProfile(p, remember) {
    const raw = JSON.stringify(p);
    sessionStorage.setItem(S.profile, raw);
    if (remember) localStorage.setItem(S.profile, raw);
    else localStorage.removeItem(S.profile);
  }
  function clearStorage() {
    Object.values(S).forEach((k) => {
      sessionStorage.removeItem(k);
      localStorage.removeItem(k);
    });
    localStorage.removeItem(S.auth);
  }
  function allowedRoutes() {
    const role = (storedProfile() || Ls).role;
    return NAV.filter((n) => n.roles.includes(role)).map((n) => n.href);
  }
  function routeMeta() {
    return META[state.path] || META["/dashboard"];
  }
  function showAuthNotice(notice) {
    state.auth.notice = notice;
    renderSoon();
  }
  function closeAuthNotice() {
    state.auth.notice = null;
    renderSoon();
  }
  function openOtp() {
    state.auth.processing = false;
    state.auth.otpOpen = true;
    state.auth.form.otp = "";
    state.auth.error = "";
    state.auth.helper = "";
    state.auth.otpLocked = false;
    state.auth.otpFailures = 0;
    sessionStorage.setItem(S.stage, OTP_PENDING);
    sessionStorage.setItem(S.fail, "0");
    sessionStorage.removeItem(S.lock);
    R.innerHTML = auth();
    P.innerHTML = "";
    focusModal();
  }
  function closeOtp() {
    state.auth.otpOpen = false;
    state.auth.form.otp = "";
    state.auth.error = "";
    state.auth.helper = "";
    renderSoon();
  }
  function initFromStorage() {
    state.auth.form.userId = cleanId(sessionStorage.getItem(S.userId) || localStorage.getItem(S.userId) || "");
    state.auth.otpLocked = sessionStorage.getItem(S.lock) === "true";
    state.auth.otpFailures = Number(sessionStorage.getItem(S.fail) || "0") || 0;
    state.auth.otpOpen = false;
    state.auth.processing = false;
    state.auth.helper = "";
    state.auth.error = "";
    state.auth.notice = null;
    state.authenticated = sessionStorage.getItem(S.auth) === AUTH_STATUS;
    if (!state.authenticated) {
      sessionStorage.removeItem(S.stage);
      sessionStorage.removeItem(S.fail);
      sessionStorage.removeItem(S.lock);
    }
    if (state.authenticated) ensureShellData();
  }
  function ensureShellData() {
    if (state.shellLoaded) return;
    state.shellLoaded = true;
    Promise.all([Promise.resolve(FEEDBACK.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))), Promise.resolve(clone(ACCOUNTS)), Promise.resolve(clone(KNOWLEDGE_DOCS))]).then(([feedbacks, accounts, knowledge]) => {
      state.shell.feedbacks = feedbacks;
      state.shell.accounts = accounts;
      state.shell.knowledge = knowledge;
      renderSoon();
    });
  }
  function buildToastStack() {
    return state.toasts.length ? `<div class="toast-stack" aria-live="polite" aria-atomic="true">${state.toasts.map((t) => `<div class="toast toast--${t.tone}" role="status">${esc(t.message)}</div>`).join("")}</div>` : "";
  }
  function shell() {
    const user = storedProfile();
    const nav = allowedRoutes().map((h) => NAV.find((n) => n.href === h)).filter(Boolean);
    return `<div class="admin-shell">${sidebar(user, nav)}<div class="admin-shell__main">${header(routeMeta().title, routeMeta().description)}<main class="admin-shell__content">${buildToastStack()}${contentView()}</main></div></div>${shellModals()}`;
  }
  function sidebar(user, nav) {
    return `<aside class="sidebar"><div class="sidebar__brand"><div class="sidebar__logo">XpERP</div><div class="sidebar__badge">AI \uAD00\uB9AC\uC790\uB85C</div></div><nav class="sidebar__nav" aria-label="\uBA54\uB274">${nav.map((i) => `<button type="button" class="sidebar__nav-item${state.path === i.href ? " is-active" : ""}" data-nav="${i.href}" ${state.path === i.href ? 'aria-current="page"' : ""}><span class="sidebar__nav-icon" aria-hidden="true">${esc(i.key[0].toUpperCase())}</span><span>${esc(i.label)}</span></button>`).join("")}</nav><div class="sidebar__user"><div class="sidebar__user-row"><div class="sidebar__user-name">${esc(user.name)}</div><div class="sidebar__user-meta">${esc(user.id)}</div></div><div class="sidebar__user-role">${esc(user.role)} \xB7 ${esc(user.department)}</div><button type="button" class="secondary-button sidebar__logout" data-action="logout-open">\uB85C\uADF8\uC544\uC6C3</button></div></aside>`;
  }
  function header(title, desc) {
    return `<header class="top-header"><div class="top-header__copy"><h1 class="top-header__title">${esc(title)}</h1><p class="top-header__description">${esc(desc)}</p></div></header>`;
  }
  function auth() {
    return `<main class="auth-shell auth-shell--standalone"><section class="auth-card auth-standalone"><div class="auth-card__intro auth-standalone__intro"><span class="auth-card__badge">Xp\uB3C4\uC6B0\uBBF8</span><h1 class="auth-card__title">Xp\uB3C4\uC6B0\uBBF8 \uAD00\uB9AC\uC790</h1><p class="auth-card__eyebrow">\uAD00\uB9AC\uC790 \uC804\uC6A9 \uC2DC\uC2A4\uD15C</p><p class="auth-card__description">\uBCF8 \uC2DC\uC2A4\uD15C\uC740 \uB0B4\uBD80 \uAD00\uB9AC\uC790 \uC804\uC6A9\uC785\uB2C8\uB2E4.<br>\uBB34\uB2E8 \uC811\uADFC \uBC0F \uC815\uBCF4 \uC5F4\uB78C \uC2DC \uAD00\uB828 \uBC95\uB839\uC5D0 \uB530\uB77C \uCC45\uC784\uC774 \uBC1C\uC0DD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.</p></div><form class="auth-form" data-form="login"><div class="auth-form__header"><h2 class="auth-form__title">\uAD00\uB9AC\uC790 \uB85C\uADF8\uC778</h2><p class="auth-form__caption">\uC2B9\uC778\uB41C \uACC4\uC815\uB9CC \uC811\uC18D \uAC00\uB2A5\uD569\uB2C8\uB2E4.</p></div><div class="auth-form__fields"><label class="field auth-field"><span class="field__label">\uC544\uC774\uB514</span><input class="field__input auth-input" maxLength="10" value="${esc(state.auth.form.userId)}" placeholder="\uC608: admin01" data-field="userId"></label><label class="field auth-field"><span class="field__label">\uBE44\uBC00\uBC88\uD638</span><input type="password" class="field__input auth-input" maxLength="12" value="${esc(state.auth.form.password)}" placeholder="\uBE44\uBC00\uBC88\uD638 \uC785\uB825" data-field="password"></label><label class="auth-remember"><input type="checkbox" ${state.auth.remember ? "checked" : ""} data-field="remember"><span>\uC544\uC774\uB514 \uC800\uC7A5</span></label></div><div class="auth-form__actions"><button type="submit" class="primary-button auth-submit" ${state.auth.processing ? "disabled" : ""}>${state.auth.processing ? "\uCC98\uB9AC \uC911..." : "\uB85C\uADF8\uC778"}</button></div><div class="auth-form__feedback" aria-live="polite">${state.auth.error ? `<p class="auth-error">${esc(state.auth.error)}</p>` : ""}${!state.auth.error && state.auth.helper ? `<p class="auth-helper">${esc(state.auth.helper)}</p>` : ""}</div></form></section></main>${authModals()}`;
  }
  function authModals() {
    let html = "";
    if (state.auth.otpOpen) html += `<div class="modal-backdrop auth-otp-backdrop"><section class="modal auth-otp-modal" role="dialog" aria-modal="true" aria-label="OTP \uC778\uC99D" data-modal="otp"><div class="modal__header auth-otp-modal__header"><div><h3>OTP \uC778\uC99D</h3><p class="auth-otp-modal__caption">${esc(state.auth.helper || "OTP\uB97C \uC785\uB825\uD558\uBA74 \uB85C\uADF8\uC778 \uC808\uCC28\uB97C \uC644\uB8CC\uD569\uB2C8\uB2E4.")}</p></div></div><form class="auth-otp-modal__body" data-form="otp"><label class="field auth-otp-field"><span class="field__label">OTP</span><input class="field__input auth-input auth-input--otp" value="${esc(state.auth.form.otp)}" maxLength="6" placeholder="6\uC790\uB9AC OTP \uC785\uB825" data-field="otp" ${state.auth.processing ? "disabled" : ""}></label><div class="auth-form__feedback" aria-live="polite">${state.auth.error ? `<p class="auth-error">${esc(state.auth.error)}</p>` : ""}${!state.auth.error && state.auth.helper ? `<p class="auth-helper">${esc(state.auth.helper)}</p>` : ""}</div><div class="auth-form__actions auth-otp-modal__actions"><button type="button" class="secondary-button auth-cancel" data-action="otp-close">\uCDE8\uC18C</button><button type="submit" class="primary-button auth-submit" ${state.auth.processing || cleanOtp(state.auth.form.otp).length !== 6 ? "disabled" : ""}>${state.auth.processing ? "\uCC98\uB9AC \uC911..." : "\uC778\uC99D \uC644\uB8CC"}</button></div></form></section></div>`;
    if (state.auth.notice) html += `<div class="modal-backdrop auth-notice-backdrop"><section class="modal modal--sm modal--compact auth-notice-modal" role="dialog" aria-modal="true" aria-label="${esc(state.auth.notice.title)}" data-modal="notice"><div class="modal__header modal__header--tight auth-notice-modal__header"><div><h3>${esc(state.auth.notice.title)}</h3></div></div><div class="modal__body auth-notice-modal__body"><p class="auth-notice-modal__message">${esc(state.auth.notice.message)}</p></div><div class="modal__footer modal__footer--split"><button type="button" class="primary-button" data-action="notice-ok">\uD655\uC778</button></div></section></div>`;
    return html;
  }
  function shellModals() {
    let html = "";
    if (state.logoutOpen) html += `<section class="modal modal--sm modal--compact" role="dialog" aria-modal="true" aria-label="\uB85C\uADF8\uC544\uC6C3 \uD655\uC778" data-modal="logout"><div class="modal__header modal__header--tight"><div><h3>\uB85C\uADF8\uC544\uC6C3</h3></div></div><div class="modal__body"><p class="logout-confirm__text">\uB85C\uADF8\uC544\uC6C3 \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?</p></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="logout-cancel">\uCDE8\uC18C</button><button type="button" class="danger-button" data-action="logout-confirm">\uD655\uC778</button></div></section>`;
    if (state.content.modalOpen) html += contentModal();
    if (state.content.deleteOpen) html += `<section class="modal modal--sm modal--compact" role="dialog" aria-modal="true" aria-label="\uBB38\uC11C \uC0AD\uC81C \uD655\uC778" data-modal="content-delete"><div class="modal__header modal__header--tight"><div><h3>\uBB38\uC11C \uC0AD\uC81C \uD655\uC778</h3></div></div><div class="modal__body"><p class="content-confirm">\uBB38\uC11C\uB97C \uC0AD\uC81C\uD558\uBA74 \uBAA9\uB85D\uC5D0\uC11C \uC0AC\uB77C\uC9D1\uB2C8\uB2E4. \uBCF5\uAD6C \uC791\uC5C5\uC740 \uBCC4\uB3C4\uB85C \uC81C\uACF5\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.</p></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="content-delete-cancel">\uCDE8\uC18C</button><button type="button" class="danger-button" data-action="content-delete-confirm">\uC0AD\uC81C</button></div></section>`;
    if (state.cache.modalOpen) html += cacheModal();
    if (state.cache.deleteOpen) html += `<section class="modal modal--sm modal--compact" role="dialog" aria-modal="true" aria-label="\uCE90\uC2DC \uB2F5\uBCC0 \uC0AD\uC81C \uD655\uC778" data-modal="cache-delete"><div class="modal__header modal__header--tight"><div><h3>\uCE90\uC2DC \uB2F5\uBCC0 \uC0AD\uC81C \uD655\uC778</h3></div></div><div class="modal__body"><p class="content-confirm">\uC120\uD0DD\uD55C \uB2F5\uBCC0\uC744 \uC0AD\uC81C\uD558\uBA74 \uCE90\uC2DC \uB2F5\uBCC0\uC5D0\uC11C \uC989\uC2DC \uC81C\uC678\uB429\uB2C8\uB2E4.</p></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="cache-delete-cancel">\uCDE8\uC18C</button><button type="button" class="danger-button" data-action="cache-delete-confirm">\uC0AD\uC81C</button></div></section>`;
    if (state.accounts.actionModal) html += accountActionModal();
    if (state.accounts.addOpen) html += accountAddModal();
    return html;
  }
  function contentFiltered() {
    const k = state.content.filterApplied.trim().toLowerCase();
    return state.content.docs.filter((d) => (!k || d.name.toLowerCase().includes(k) || d.path.toLowerCase().includes(k)) && (state.content.type === "ALL" || d.type === state.content.type)).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.createdAt.localeCompare(a.createdAt));
  }
  function contentModal() {
    return `<section class="modal modal--lg" role="dialog" aria-modal="true" aria-label="${esc(state.content.modalMode === "EDIT" ? "\uBB38\uC11C \uC218\uC815 \uC5C5\uB85C\uB4DC" : "\uBB38\uC11C \uC5C5\uB85C\uB4DC")}" data-modal="content"><div class="modal__header"><div><h3>${esc(state.content.modalMode === "EDIT" ? "\uBB38\uC11C \uC218\uC815 \uC5C5\uB85C\uB4DC" : "\uBB38\uC11C \uC5C5\uB85C\uB4DC")}</h3></div></div><div class="modal__body"><label class="field"><span class="field__label">\uD30C\uC77C \uC120\uD0DD *</span><input class="field__input" type="file" accept=".pdf,.docx,.txt,.md" data-field="content-file"><span class="content-file-name">${state.content.selectedFileLabel ? `\uC120\uD0DD\uD55C \uD30C\uC77C: ${esc(state.content.selectedFileLabel)}` : "\uD30C\uC77C\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."}</span></label><label class="field"><span class="field__label">\uC800\uC7A5 \uACBD\uB85C</span><input class="field__input" value="${esc(state.content.form.path)}" placeholder="/rag/manual/chatbot-guide" data-field="content-path"></label><label class="field"><span class="field__label">\uBB38\uC11C \uC720\uD615</span><select class="field__input" data-field="content-modalType"><option value="MANUAL"${state.content.form.type === "MANUAL" ? " selected" : ""}>\uB9E4\uB274\uC5BC</option><option value="FAQ"${state.content.form.type === "FAQ" ? " selected" : ""}>FAQ</option></select></label>${state.content.modalError ? `<p class="content-error">${esc(state.content.modalError)}</p>` : ""}</div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="content-close">\uCDE8\uC18C</button><button type="button" class="primary-button" data-action="content-save">${state.content.modalMode === "EDIT" ? "\uC218\uC815 \uC800\uC7A5" : "\uC800\uC7A5"}</button></div></section>`;
  }
  function cacheFiltered() {
    const k = norm(state.cache.filterApplied);
    return state.cache.items.map((item) => {
      const q2 = norm(item.question);
      const exact = !k || q2.includes(k) || k.includes(q2);
      const score = !k ? 1 : Math.max(q2 === k ? 1 : 1 - Math.abs(q2.length - k.length) / Math.max(q2.length, k.length, 1), q2.includes(k) ? 0.92 : 0, k.includes(q2) ? 0.92 : 0);
      return { item, score, exact };
    }).filter(({ item, score, exact }) => (state.cache.status === "ALL" || item.status === state.cache.status) && (!k || exact || score >= 0.35)).sort((a, b) => k && b.score !== a.score ? b.score - a.score : cmpDesc(a.item.createdAt, b.item.createdAt)).map((x) => x.item);
  }
  function cacheModal() {
    return `<section class="modal modal--xl" role="dialog" aria-modal="true" aria-label="${esc(state.cache.modalMode === "EDIT" ? "\uCE90\uC2DC \uB2F5\uBCC0 \uC218\uC815" : "\uCE90\uC2DC \uB2F5\uBCC0 \uB4F1\uB85D")}" data-modal="cache"><div class="modal__header"><div><h3>${esc(state.cache.modalMode === "EDIT" ? "\uCE90\uC2DC \uB2F5\uBCC0 \uC218\uC815" : "\uCE90\uC2DC \uB2F5\uBCC0 \uB4F1\uB85D")}</h3></div></div><div class="modal__body"><div class="cache-qa-form cache-qa-form--modal"><label class="field"><span class="field__label">\uC9C8\uBB38 *</span><textarea class="field__input knowledge-textarea cache-qa-textarea" rows="3" maxLength="500" placeholder="\uCE90\uC2DC \uB2F5\uBCC0\uC6A9 \uC9C8\uBB38\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694." data-field="cache-question">${esc(state.cache.form.question)}</textarea><p class="cache-qa-form__counter">${state.cache.form.question.length}/500\uC790</p></label><label class="field"><span class="field__label">\uB2F5\uBCC0 *</span><textarea class="field__input knowledge-textarea cache-qa-textarea" rows="6" maxLength="2000" placeholder="\uCE90\uC2DC \uB2F5\uBCC0\uC73C\uB85C \uBC18\uD658\uD560 \uB2F5\uBCC0\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694." data-field="cache-answer">${esc(state.cache.form.answer)}</textarea><p class="cache-qa-form__counter">${state.cache.form.answer.length}/2000\uC790</p></label><label class="field"><span class="field__label">\uC0C1\uD0DC</span><select class="field__input" data-field="cache-modalStatus"><option value="ACTIVE"${state.cache.form.status === "ACTIVE" ? " selected" : ""}>\uD65C\uC131</option><option value="INACTIVE"${state.cache.form.status === "INACTIVE" ? " selected" : ""}>\uBE44\uD65C\uC131</option></select></label>${state.cache.modalError ? `<p class="content-error">${esc(state.cache.modalError)}</p>` : ""}</div></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="cache-reset-modal">\uCD08\uAE30\uD654</button><button type="button" class="primary-button" data-action="cache-save">${state.cache.modalMode === "EDIT" ? "\uC218\uC815 \uC800\uC7A5" : "\uB4F1\uB85D"}</button></div></section>`;
  }
  function canQuery() {
    return state.knowledge.form.question.length >= 1 && state.knowledge.form.documentType !== "" && state.knowledge.form.documentId !== "";
  }
  function accountActionModal() {
    const m = state.accounts.actionModal;
    return `<section class="modal modal--sm" role="dialog" aria-modal="true" aria-label="${esc(ACCOUNT_ACTION[m.type])}" data-modal="account-action"><div class="modal__header modal__header--tight"><div><h3>${esc(ACCOUNT_ACTION[m.type])}</h3></div></div><div class="modal__body"><label class="field"><span class="field__label">\uC0AC\uC720 \uC785\uB825 *</span><textarea class="field__input knowledge-textarea" rows="3" placeholder="\uC0AC\uC720\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694." data-field="account-reason">${esc(m.reason || "")}</textarea></label></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="account-action-cancel">\uCDE8\uC18C</button><button type="button" class="${m.type === "DEACTIVATE" ? "danger-button" : "primary-button"}" data-action="account-action-confirm" ${!String(m.reason || "").trim() ? "disabled" : ""}>\uD655\uC778</button></div></section>`;
  }
  function accountAddModal() {
    const cand = filteredCandidates();
    const selected = CANDIDATES.find((c) => c.id === state.accounts.selectedCandidateId) || null;
    return `<section class="modal modal--lg" role="dialog" aria-modal="true" aria-label="\uACC4\uC815 \uCD94\uAC00" data-modal="account-add"><div class="modal__header"><div><h3>\uACC4\uC815 \uCD94\uAC00</h3></div></div><div class="modal__body"><label class="field"><span class="field__label">\uC0AC\uC6A9\uC790 \uAC80\uC0C9</span><input class="field__input" value="${esc(state.accounts.addSearch)}" placeholder="\uAC80\uC0C9\uC5B4 \uC785\uB825" data-field="account-search"></label><ul class="user-candidate-list">${cand.length === 0 ? '<li class="user-candidate-empty">\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</li>' : cand.map((c) => `<li><button type="button" class="user-candidate-item${selected && selected.id === c.id ? " is-selected" : ""}" data-candidate="${c.id}"><span>${esc(c.name)} (${esc(c.id)})</span><span class="user-candidate-code">${esc(c.complexCode)}</span></button></li>`).join("")}</ul><label class="field"><span class="field__label">\uCD94\uAC00 \uC0AC\uC720 * (\uCD5C\uB300 200\uC790)</span><textarea class="field__input knowledge-textarea" rows="2" maxLength="200" placeholder="\uCD94\uAC00 \uC0AC\uC720\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694." data-field="account-add-reason">${esc(state.accounts.addReason)}</textarea></label></div><div class="modal__footer modal__footer--split"><button type="button" class="secondary-button" data-action="account-add-cancel">\uCDE8\uC18C</button><button type="button" class="primary-button" data-action="account-add-confirm" ${!selected || !String(state.accounts.addReason).trim() ? "disabled" : ""}>\uD655\uC778</button></div></section>`;
  }
  function filteredCandidates() {
    const k = state.accounts.addSearch.trim().toLowerCase();
    if (!k) return CANDIDATES;
    return CANDIDATES.filter((c) => c.name.toLowerCase().includes(k) || c.id.toLowerCase().includes(k) || c.complexCode.toLowerCase().includes(k));
  }
  function handleLoginSubmit(e) {
    e.preventDefault();
    if (state.auth.processing) return;
    const userId = cleanId(state.auth.form.userId.trim()), password = cleanPwd(state.auth.form.password.trim());
    if (!userId || !password) {
      state.auth.error = "\uC544\uC774\uB514\uC640 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.";
      state.auth.helper = "";
      renderSoon();
      return;
    }
    const user = AuthUsers[userId];
    if (!user || user.password !== password) {
      showAuthNotice(Msg.bad);
      return;
    }
    if (!user.allowed) {
      showAuthNotice(Msg.denied);
      return;
    }
    state.auth.processing = true;
    state.auth.helper = "OTP \uC785\uB825 \uCC3D\uC744 \uC5EC\uB294 \uC911\uC785\uB2C8\uB2E4.";
    state.auth.error = "";
    sessionStorage.setItem(S.stage, OTP_PENDING);
    sessionStorage.setItem(S.userId, userId);
    sessionStorage.setItem(S.fail, "0");
    sessionStorage.removeItem(S.lock);
    if (state.auth.remember) localStorage.setItem(S.userId, userId);
    else localStorage.removeItem(S.userId);
    openOtp();
  }
  function handleOtpSubmit(e) {
    e.preventDefault();
    if (state.auth.processing || !state.auth.otpOpen) return;
    if (state.auth.otpLocked) {
      showAuthNotice(Msg.locked);
      return;
    }
    const otp = cleanOtp(state.auth.form.otp.trim());
    if (otp.length !== 6) {
      state.auth.error = "6\uC790\uB9AC OTP\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.";
      state.auth.helper = "";
      renderSoon();
      return;
    }
    state.auth.processing = true;
    state.auth.error = "";
    renderSoon();
    if (otp !== OTP) {
      const f = (state.auth.otpFailures || 0) + 1;
      state.auth.otpFailures = f;
      sessionStorage.setItem(S.fail, String(f));
      state.auth.processing = false;
      if (f >= OTP_MAX) {
        state.auth.otpLocked = true;
        sessionStorage.setItem(S.lock, "true");
        showAuthNotice(Msg.locked);
      } else {
        state.auth.error = `OTP \uC778\uC99D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. (${f}/${OTP_MAX})`;
      }
      renderSoon();
      return;
    }
    const profile = (AuthUsers[cleanId(sessionStorage.getItem(S.userId) || state.auth.form.userId)] || {}).profile || Ls;
    saveProfile(profile, state.auth.remember);
    sessionStorage.setItem(S.auth, AUTH_STATUS);
    sessionStorage.setItem(S.profile, JSON.stringify(profile));
    sessionStorage.removeItem(S.fail);
    sessionStorage.removeItem(S.lock);
    state.auth.processing = false;
    state.auth.helper = "\uB300\uC2DC\uBCF4\uB4DC\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.";
    state.authenticated = true;
    state.path = "/dashboard";
    state.shellLoaded = false;
    ensureShellData();
    R.innerHTML = shell();
    P.innerHTML = "";
    focusModal();
  }
  function handleAction(action, value) {
    switch (action) {
      case "notice-ok":
        closeAuthNotice();
        break;
      case "otp-close":
        closeOtp();
        break;
      case "logout-open":
        state.logoutOpen = true;
        rememberFocus();
        renderSoon();
        break;
      case "logout-cancel":
        state.logoutOpen = false;
        renderSoon();
        break;
      case "logout-confirm":
        logout();
        break;
      case "dash-range":
        state.dash.range = value;
        renderSoon();
        break;
      case "dash-reaction":
        state.dash.selectedReaction = value;
        renderSoon();
        break;
      case "content-open-create":
        state.content.modalOpen = true;
        state.content.modalMode = "CREATE";
        state.content.modalTarget = null;
        state.content.modalError = "";
        state.content.selectedFileLabel = "";
        state.content.form = clone(CONTENT_FORM);
        rememberFocus();
        renderSoon();
        break;
      case "content-open-edit": {
        const d = selectedContent();
        if (!d) return;
        state.content.modalOpen = true;
        state.content.modalMode = "EDIT";
        state.content.modalTarget = d.id;
        state.content.modalError = "";
        state.content.form = { fileName: d.fileName, path: d.path, type: d.type };
        state.content.selectedFileLabel = d.fileName;
        rememberFocus();
        renderSoon();
        break;
      }
      case "content-close":
        state.content.modalOpen = false;
        state.content.modalError = "";
        state.content.form = clone(CONTENT_FORM);
        state.content.selectedFileLabel = "";
        renderSoon();
        break;
      case "content-save":
        saveContent();
        break;
      case "content-open-delete":
        if (selectedContent()) {
          state.content.deleteOpen = true;
          rememberFocus();
          renderSoon();
        }
        break;
      case "content-delete-cancel":
        state.content.deleteOpen = false;
        renderSoon();
        break;
      case "content-delete-confirm":
        deleteContent();
        break;
      case "content-download":
        toast("\uBB38\uC11C \uB2E4\uC6B4\uB85C\uB4DC\uB97C \uC900\uBE44\uD588\uC2B5\uB2C8\uB2E4.");
        break;
      case "content-reset-filter":
        state.content.filterDraft = "";
        state.content.filterApplied = "";
        state.content.type = "ALL";
        renderSoon();
        break;
      case "cache-open-create":
        state.cache.modalOpen = true;
        state.cache.modalMode = "CREATE";
        state.cache.modalTarget = null;
        state.cache.modalError = "";
        state.cache.form = clone(CACHE_FORM);
        rememberFocus();
        renderSoon();
        break;
      case "cache-open-edit": {
        const i = selectedCache();
        if (!i) return;
        state.cache.modalOpen = true;
        state.cache.modalMode = "EDIT";
        state.cache.modalTarget = i.id;
        state.cache.modalError = "";
        state.cache.form = { question: i.question, answer: i.answer, status: i.status };
        rememberFocus();
        renderSoon();
        break;
      }
      case "cache-open-delete":
        if (selectedCache()) {
          state.cache.deleteOpen = true;
          rememberFocus();
          renderSoon();
        }
        break;
      case "cache-delete-cancel":
        state.cache.deleteOpen = false;
        renderSoon();
        break;
      case "cache-delete-confirm":
        deleteCache();
        break;
      case "cache-toggle":
        toggleCache();
        break;
      case "cache-reset-filter":
        state.cache.filterDraft = "";
        state.cache.filterApplied = "";
        state.cache.status = "ALL";
        state.cache.page = 1;
        renderSoon();
        break;
      case "cache-reset-modal":
        state.cache.modalOpen = false;
        state.cache.modalMode = "CREATE";
        state.cache.modalTarget = null;
        state.cache.modalError = "";
        state.cache.form = clone(CACHE_FORM);
        renderSoon();
        break;
      case "cache-save":
        saveCache();
        break;
      case "cache-page":
        state.cache.page = clamp(Number(value), 1, Math.max(1, Math.ceil(cacheFiltered().length / 10)));
        renderSoon();
        break;
      case "knowledge-reset":
        state.knowledge = { form: { question: "", documentType: "", documentId: "" }, status: "IDLE", result: null, copied: false };
        renderSoon();
        break;
      case "knowledge-error":
        state.knowledge.status = "ERROR";
        state.knowledge.result = null;
        state.knowledge.copied = false;
        renderSoon();
        break;
      case "knowledge-query":
        runKnowledge();
        break;
      case "knowledge-copy":
        if (state.knowledge.result) navigator.clipboard.writeText(state.knowledge.result.answer).then(() => {
          state.knowledge.copied = true;
          renderSoon();
          setTimeout(() => {
            state.knowledge.copied = false;
            renderSoon();
          }, 2e3);
        });
        break;
      case "feedback-search":
        state.feedback.appliedRange = { ...state.feedback.draftRange };
        renderSoon();
        break;
      case "feedback-reset":
        state.feedback.draftRange = { startDate: "", endDate: "" };
        state.feedback.appliedRange = { startDate: "", endDate: "" };
        renderSoon();
        break;
      case "account-open-add":
        state.accounts.addOpen = true;
        state.accounts.addSearch = "";
        state.accounts.addReason = "";
        state.accounts.selectedCandidateId = null;
        rememberFocus();
        renderSoon();
        break;
      case "account-add-cancel":
        state.accounts.addOpen = false;
        state.accounts.addSearch = "";
        state.accounts.addReason = "";
        state.accounts.selectedCandidateId = null;
        renderSoon();
        break;
      case "account-add-confirm":
        addAccount();
        break;
      case "account-open-status": {
        const i = selectedAccount();
        if (!i || i.id === Ls.id) return;
        state.accounts.actionModal = { type: value, accountId: i.id, reason: "" };
        rememberFocus();
        renderSoon();
        break;
      }
      case "account-action-cancel":
        state.accounts.actionModal = null;
        renderSoon();
        break;
      case "account-action-confirm":
        confirmAccountAction();
        break;
    }
  }
  function selectedContent() {
    const list = contentFiltered();
    return list.find((i) => i.id === state.content.selectedId) || list[0] || null;
  }
  function saveContent() {
    if (!String(state.content.form.fileName).trim() || !String(state.content.form.path).trim()) {
      state.content.modalError = "\uD30C\uC77C\uACFC \uACBD\uB85C\uB97C \uBAA8\uB450 \uC785\uB825\uD574 \uC8FC\uC138\uC694.";
      renderSoon();
      return;
    }
    const file = state.content.form.fileName.trim();
    const name = file.replace(/\.[^.]+$/, "");
    const stamp = now();
    if (state.content.modalMode === "CREATE" || !state.content.modalTarget) {
      const created = { id: `doc-${Date.now()}`, name, type: state.content.form.type, path: state.content.form.path, author: "\uBC15\uC6B4\uC601", createdAt: stamp, updatedAt: stamp, status: "ACTIVE", fileName: file, fileSize: "0MB", history: [{ id: `hist-${Date.now()}`, version: "v1", actor: "\uBC15\uC6B4\uC601", action: "\uC5C5\uB85C\uB4DC", reason: "\uC2E0\uADDC \uB4F1\uB85D", occurredAt: stamp }] };
      state.content.docs = [created, ...state.content.docs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.createdAt.localeCompare(a.createdAt));
      state.content.selectedId = created.id;
      toast("\uBB38\uC11C \uC5C5\uB85C\uB4DC\uAC00 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
    } else {
      state.content.docs = state.content.docs.map((d) => d.id === state.content.modalTarget ? { ...d, name, fileName: file, path: state.content.form.path, type: state.content.form.type, status: "ACTIVE", updatedAt: stamp, history: [{ id: `hist-${Date.now()}`, version: `v${d.history.length + 1}`, actor: "\uAD00\uB9AC\uC790", action: "\uC218\uC815", reason: "\uAE30\uC874 \uBB38\uC11C \uC218\uC815", occurredAt: stamp }, ...d.history] } : d).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.createdAt.localeCompare(a.createdAt));
      state.content.selectedId = state.content.modalTarget;
      toast("\uBB38\uC11C\uAC00 \uC218\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
    }
    state.content.modalOpen = false;
    state.content.modalError = "";
    state.content.form = clone(CONTENT_FORM);
    state.content.selectedFileLabel = "";
    renderSoon();
  }
  function deleteContent() {
    const cur = selectedContent();
    if (!cur) return;
    state.content.docs = state.content.docs.filter((d) => d.id !== cur.id).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.createdAt.localeCompare(a.createdAt));
    state.content.selectedId = state.content.docs[0]?.id || null;
    state.content.deleteOpen = false;
    toast("\uBB38\uC11C \uC0AD\uC81C\uAC00 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
    renderSoon();
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
    i.updatedBy = "\uAD00\uB9AC\uC790";
    state.cache.items = state.cache.items.map((x) => x.id === i.id ? i : x).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    toast(i.status === "ACTIVE" ? "\uB2F5\uBCC0\uC774 \uD65C\uC131\uD654\uB418\uC5C8\uC2B5\uB2C8\uB2E4." : "\uB2F5\uBCC0\uC774 \uBE44\uD65C\uC131\uD654\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
    renderSoon();
  }
  function saveCache() {
    if (!String(state.cache.form.question).trim() || !String(state.cache.form.answer).trim()) {
      state.cache.modalError = "\uC9C8\uBB38\uACFC \uB2F5\uBCC0\uC744 \uBAA8\uB450 \uC785\uB825\uD574 \uC8FC\uC138\uC694.";
      renderSoon();
      return;
    }
    const nq = norm(state.cache.form.question.trim());
    const dup = state.cache.items.find((i) => (!state.cache.modalTarget || i.id !== state.cache.modalTarget) && Math.max(similarity(i.question, state.cache.form.question.trim()), norm(i.question).includes(nq) ? 0.92 : 0, nq.includes(norm(i.question)) ? 0.92 : 0) >= 0.85);
    if (dup) {
      state.cache.modalError = "\uC720\uC0AC\uD55C \uC9C8\uBB38\uC774 \uC774\uBBF8 \uB4F1\uB85D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.";
      renderSoon();
      return;
    }
    const stamp = now();
    if (state.cache.modalMode === "CREATE") {
      const item = { id: `cache-${Date.now()}`, question: state.cache.form.question.trim(), answer: state.cache.form.answer.trim(), status: state.cache.form.status, createdAt: stamp, updatedAt: stamp, createdBy: "\uAD00\uB9AC\uC790", updatedBy: "\uAD00\uB9AC\uC790", hitCount: 0, lastMatchedAt: null };
      state.cache.items = [item, ...state.cache.items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      state.cache.selectedId = item.id;
      toast("\uB2F5\uBCC0\uC774 \uB4F1\uB85D\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
    } else {
      const idx = state.cache.items.findIndex((i) => i.id === state.cache.modalTarget);
      if (idx < 0) {
        state.cache.modalError = "\uC218\uC815 \uB300\uC0C1\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.";
        renderSoon();
        return;
      }
      const old = state.cache.items[idx];
      const item = { ...old, question: state.cache.form.question.trim(), answer: state.cache.form.answer.trim(), status: state.cache.form.status, updatedAt: stamp, updatedBy: "\uAD00\uB9AC\uC790" };
      state.cache.items = [...state.cache.items.slice(0, idx), item, ...state.cache.items.slice(idx + 1)].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      state.cache.selectedId = item.id;
      toast("\uB2F5\uBCC0\uC774 \uC218\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
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
    toast("\uB2F5\uBCC0\uC774 \uC0AD\uC81C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
    renderSoon();
  }
  function runKnowledge() {
    if (!canQuery()) return;
    state.knowledge.status = "LOADING";
    state.knowledge.result = null;
    state.knowledge.copied = false;
    renderSoon();
    setTimeout(() => {
      const doc = KNOWLEDGE_DOCS.find((d) => d.id === state.knowledge.form.documentId);
      if (!doc) {
        state.knowledge.status = "EMPTY";
        state.knowledge.result = null;
      } else {
        state.knowledge.status = "SUCCESS";
        state.knowledge.result = { answer: `"${state.knowledge.form.question}"\uC5D0 \uB300\uD55C \uC751\uB2F5\uC785\uB2C8\uB2E4.\uC120\uD0DD\uD558\uC2E0 \uBB38\uC11C(${doc.name})\uB97C \uAE30\uBC18\uC73C\uB85C \uAD00\uB828 \uB0B4\uC6A9\uC744 \uC870\uD68C\uD55C \uACB0\uACFC, \uD574\uB2F9 \uB0B4\uC6A9\uC5D0 \uB300\uD55C \uC608\uC2DC \uC751\uB2F5\uC744 \uC0DD\uC131\uD588\uC2B5\uB2C8\uB2E4. \uC2E4\uC81C API \uC5F0\uB3D9 \uC2DC\uC5D0\uB294 \uC815\uD655\uD55C \uBB38\uB9E5\uC744 \uAE30\uC900\uC73C\uB85C \uC751\uB2F5\uD569\uB2C8\uB2E4.`, generatedAt: "2026-04-02 10:30:00", referenceDocument: { name: doc.name, type: doc.type, path: doc.path }, referenceParagraph: "chunk-042" };
      }
      renderSoon();
    }, 0);
  }
  function selectedAccount() {
    return state.accounts.items.find((i) => i.id === state.accounts.selectedId) || null;
  }
  function confirmAccountAction() {
    const m = state.accounts.actionModal;
    if (!m || !String(m.reason || "").trim()) return;
    const idx = state.accounts.items.findIndex((i) => i.id === m.accountId);
    if (idx < 0) return;
    const next = m.type === "ACTIVATE" ? "ACTIVE" : m.type === "DEACTIVATE" ? "INACTIVE" : "ACTIVE";
    state.accounts.items[idx] = { ...state.accounts.items[idx], status: next };
    state.accounts.selectedId = m.accountId;
    state.accounts.actionModal = null;
    toast(m.type === "ACTIVATE" ? "\uAD00\uB9AC\uC790 \uAD8C\uD55C\uC774 \uBCF5\uAD6C\uB418\uC5C8\uC2B5\uB2C8\uB2E4." : m.type === "DEACTIVATE" ? "\uAD00\uB9AC\uC790 \uAD8C\uD55C\uC774 \uBE44\uD65C\uC131\uD654\uB418\uC5C8\uC2B5\uB2C8\uB2E4." : "\uACC4\uC815 \uC7A0\uAE08\uC774 \uD574\uC81C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
    renderSoon();
  }
  function addAccount() {
    const c = CANDIDATES.find((x) => x.id === state.accounts.selectedCandidateId);
    if (!c || !String(state.accounts.addReason).trim()) return;
    state.accounts.items = [...state.accounts.items, { id: c.id, name: c.name, role: "OPERATOR", status: "ACTIVE", registeredAt: "2026-04-02", lastLoginAt: null, loginHistory: [], lockHistory: [] }];
    state.accounts.selectedId = c.id;
    state.accounts.addOpen = false;
    state.accounts.addSearch = "";
    state.accounts.addReason = "";
    state.accounts.selectedCandidateId = null;
    toast("\uAD00\uB9AC\uC790\uAC00 \uCD94\uAC00\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
    renderSoon();
  }
  function similarity(a, b) {
    a = norm(a);
    b = norm(b);
    if (!a && !b) return 1;
    if (!a || !b) return 0;
    if (a === b) return 1;
    const m = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_2, j) => i === 0 ? j : j === 0 ? i : 0));
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + c);
    }
    return 1 - m[a.length][b.length] / Math.max(a.length, b.length);
  }
  function rememberFocus() {
    const el = document.activeElement;
    if (!(el instanceof HTMLElement)) {
      state.restoreFocus = null;
      return;
    }
    const field = el.closest("[data-field]");
    if (field?.dataset.field) {
      state.restoreFocus = { selector: `[data-field="${field.dataset.field}"]`, selectionStart: "selectionStart" in el ? el.selectionStart : null, selectionEnd: "selectionEnd" in el ? el.selectionEnd : null };
      return;
    }
    const action = el.closest("[data-action]");
    if (action?.dataset.action) {
      state.restoreFocus = { selector: `[data-action="${action.dataset.action}"]`, selectionStart: null, selectionEnd: null };
      return;
    }
    const nav = el.closest("[data-nav]");
    if (nav?.dataset.nav) {
      state.restoreFocus = { selector: `[data-nav="${nav.dataset.nav}"]`, selectionStart: null, selectionEnd: null };
      return;
    }
    state.restoreFocus = null;
  }
  function closeTopModal() {
    if (!state.authenticated) {
      if (state.auth.notice) return closeAuthNotice();
      if (state.auth.otpOpen) return closeOtp();
      return;
    }
    if (state.logoutOpen) {
      state.logoutOpen = false;
      renderSoon();
      return;
    }
    if (state.content.deleteOpen) {
      state.content.deleteOpen = false;
      renderSoon();
      return;
    }
    if (state.content.modalOpen) return handleAction("content-close");
    if (state.cache.deleteOpen) {
      state.cache.deleteOpen = false;
      renderSoon();
      return;
    }
    if (state.cache.modalOpen) return handleAction("cache-reset-modal");
    if (state.accounts.actionModal) {
      state.accounts.actionModal = null;
      renderSoon();
      return;
    }
    if (state.accounts.addOpen) {
      state.accounts.addOpen = false;
      renderSoon();
      return;
    }
  }
  function render() {
    if (!state.authenticated) {
      R.innerHTML = auth();
      P.innerHTML = "";
    } else {
      const allowed = allowedRoutes();
      if (allowed.length && !allowed.includes(state.path)) state.path = allowed[0];
      R.innerHTML = shell();
      P.innerHTML = "";
    }
    document.body.style.overflow = P.innerHTML || R.querySelector("[data-modal]") ? "hidden" : "";
    focusModal();
  }
  function focusModal() {
    const modal = P.querySelector("[data-modal]") || R.querySelector("[data-modal]");
    if (modal) {
      const f = modal.querySelector(focusSel);
      if (f instanceof HTMLElement) f.focus({ preventScroll: true });
      return;
    }
    const target = state.restoreFocus?.selector ? document.querySelector(state.restoreFocus.selector) : null;
    if (target instanceof HTMLElement) {
      target.focus({ preventScroll: true });
      if ("setSelectionRange" in target && Number.isInteger(state.restoreFocus.selectionStart) && Number.isInteger(state.restoreFocus.selectionEnd)) {
        try {
          target.setSelectionRange(state.restoreFocus.selectionStart, state.restoreFocus.selectionEnd);
        } catch {
        }
      }
    }
    state.restoreFocus = null;
  }
  function renderSoon() {
    if (q) return;
    q = true;
    queueMicrotask(() => {
      q = false;
      render();
    });
  }
  function fieldInput(e) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const f = t.closest("[data-field]");
    if (!f) return;
    const k = f.dataset.field;
    switch (k) {
      case "userId":
        state.auth.form.userId = cleanId(t.value);
        state.auth.error = "";
        return;
      case "password":
        state.auth.form.password = cleanPwd(t.value);
        state.auth.error = "";
        return;
      case "otp":
        state.auth.form.otp = cleanOtp(t.value);
        state.auth.error = "";
        return;
      case "remember":
        state.auth.remember = !!t.checked;
        return;
      case "content-filterDraft":
        state.content.filterDraft = t.value;
        break;
      case "content-type":
        state.content.type = t.value;
        break;
      case "content-path":
        state.content.form.path = t.value;
        break;
      case "content-modalType":
        state.content.form.type = t.value;
        break;
      case "content-file": {
        const file = t.files && t.files[0];
        state.content.form.fileName = file ? file.name : "";
        state.content.selectedFileLabel = file ? file.name : "";
        break;
      }
      case "cache-filterDraft":
        state.cache.filterDraft = t.value;
        break;
      case "cache-status":
        state.cache.status = t.value;
        break;
      case "cache-question":
        state.cache.form.question = t.value;
        state.cache.modalError = "";
        break;
      case "cache-answer":
        state.cache.form.answer = t.value;
        state.cache.modalError = "";
        break;
      case "cache-modalStatus":
        state.cache.form.status = t.value;
        break;
      case "knowledge-type":
        state.knowledge.form.documentType = t.value;
        state.knowledge.form.documentId = "";
        break;
      case "knowledge-doc":
        state.knowledge.form.documentId = t.value;
        break;
      case "knowledge-question":
        state.knowledge.form.question = t.value;
        break;
      case "feedback-reaction":
        state.feedback.filters.reaction = t.value;
        break;
      case "feedback-start":
        state.feedback.draftRange.startDate = t.value;
        break;
      case "feedback-end":
        state.feedback.draftRange.endDate = t.value;
        break;
      case "account-reason":
        if (state.accounts.actionModal) state.accounts.actionModal.reason = t.value;
        break;
      case "account-search":
        state.accounts.addSearch = t.value;
        break;
      case "account-add-reason":
        state.accounts.addReason = t.value;
        break;
    }
    renderSoon();
  }
  function clickHandler(e) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const nav = t.closest("[data-nav]");
    if (nav) return state.path = nav.dataset.nav, renderSoon();
    const a = t.closest("[data-action]");
    if (!a) return;
    const action = a.dataset.action, val = a.dataset.value;
    switch (action) {
      case "notice-ok":
        return closeAuthNotice();
      case "otp-close":
        return closeOtp();
      case "logout-open":
        state.logoutOpen = true;
        rememberFocus();
        return renderSoon();
      case "logout-cancel":
        state.logoutOpen = false;
        return renderSoon();
      case "logout-confirm":
        return logout();
      case "dash-range":
        state.dash.range = val;
        return renderSoon();
      case "dash-reaction":
        state.dash.selectedReaction = val;
        return renderSoon();
      case "content-open-create":
        state.content.modalOpen = true;
        state.content.modalMode = "CREATE";
        state.content.modalTarget = null;
        state.content.modalError = "";
        state.content.form = clone(CONTENT_FORM);
        state.content.selectedFileLabel = "";
        rememberFocus();
        return renderSoon();
      case "content-open-edit": {
        const d = selectedContent();
        if (!d) return;
        state.content.modalOpen = true;
        state.content.modalMode = "EDIT";
        state.content.modalTarget = d.id;
        state.content.modalError = "";
        state.content.form = { fileName: d.fileName, path: d.path, type: d.type };
        state.content.selectedFileLabel = d.fileName;
        rememberFocus();
        return renderSoon();
      }
      case "content-close":
        state.content.modalOpen = false;
        state.content.modalError = "";
        state.content.form = clone(CONTENT_FORM);
        state.content.selectedFileLabel = "";
        return renderSoon();
      case "content-save":
        return saveContent();
      case "content-open-delete":
        if (selectedContent()) {
          state.content.deleteOpen = true;
          rememberFocus();
          renderSoon();
        }
        return;
      case "content-delete-cancel":
        state.content.deleteOpen = false;
        return renderSoon();
      case "content-delete-confirm":
        return deleteContent();
      case "content-download":
        return toast("\uBB38\uC11C \uB2E4\uC6B4\uB85C\uB4DC\uB97C \uC900\uBE44\uD588\uC2B5\uB2C8\uB2E4.");
      case "content-reset-filter":
        state.content.filterDraft = "";
        state.content.filterApplied = "";
        state.content.type = "ALL";
        return renderSoon();
      case "cache-open-create":
        state.cache.modalOpen = true;
        state.cache.modalMode = "CREATE";
        state.cache.modalTarget = null;
        state.cache.modalError = "";
        state.cache.form = clone(CACHE_FORM);
        rememberFocus();
        return renderSoon();
      case "cache-open-edit": {
        const i = selectedCache();
        if (!i) return;
        state.cache.modalOpen = true;
        state.cache.modalMode = "EDIT";
        state.cache.modalTarget = i.id;
        state.cache.modalError = "";
        state.cache.form = { question: i.question, answer: i.answer, status: i.status };
        rememberFocus();
        return renderSoon();
      }
      case "cache-open-delete":
        if (selectedCache()) {
          state.cache.deleteOpen = true;
          rememberFocus();
          renderSoon();
        }
        return;
      case "cache-delete-cancel":
        state.cache.deleteOpen = false;
        return renderSoon();
      case "cache-delete-confirm":
        return deleteCache();
      case "cache-toggle":
        return toggleCache();
      case "cache-reset-filter":
        state.cache.filterDraft = "";
        state.cache.filterApplied = "";
        state.cache.status = "ALL";
        state.cache.page = 1;
        return renderSoon();
      case "cache-reset-modal":
        state.cache.modalOpen = false;
        state.cache.modalMode = "CREATE";
        state.cache.modalTarget = null;
        state.cache.modalError = "";
        state.cache.form = clone(CACHE_FORM);
        return renderSoon();
      case "cache-save":
        return saveCache();
      case "cache-page":
        state.cache.page = clamp(Number(val), 1, Math.max(1, Math.ceil(cacheFiltered().length / 10)));
        return renderSoon();
      case "knowledge-reset":
        state.knowledge = { form: { question: "", documentType: "", documentId: "" }, status: "IDLE", result: null, copied: false };
        return renderSoon();
      case "knowledge-error":
        state.knowledge.status = "ERROR";
        state.knowledge.result = null;
        state.knowledge.copied = false;
        return renderSoon();
      case "knowledge-query":
        return runKnowledge();
      case "knowledge-copy":
        if (state.knowledge.result) navigator.clipboard.writeText(state.knowledge.result.answer).then(() => {
          state.knowledge.copied = true;
          renderSoon();
          setTimeout(() => {
            state.knowledge.copied = false;
            renderSoon();
          }, 2e3);
        });
        return;
      case "feedback-search":
        state.feedback.appliedRange = { ...state.feedback.draftRange };
        return renderSoon();
      case "feedback-reset":
        state.feedback.draftRange = { startDate: "", endDate: "" };
        state.feedback.appliedRange = { startDate: "", endDate: "" };
        return renderSoon();
      case "account-open-add":
        state.accounts.addOpen = true;
        state.accounts.addSearch = "";
        state.accounts.addReason = "";
        state.accounts.selectedCandidateId = null;
        rememberFocus();
        return renderSoon();
      case "account-add-cancel":
        state.accounts.addOpen = false;
        state.accounts.addSearch = "";
        state.accounts.addReason = "";
        state.accounts.selectedCandidateId = null;
        return renderSoon();
      case "account-add-confirm":
        return addAccount();
      case "account-open-status": {
        const i = selectedAccount();
        if (!i || i.id === Ls.id) return;
        state.accounts.actionModal = { type: val, accountId: i.id, reason: "" };
        rememberFocus();
        return renderSoon();
      }
      case "account-action-cancel":
        state.accounts.actionModal = null;
        return renderSoon();
      case "account-action-confirm":
        return confirmAccountAction();
    }
    if (action === "content-select" || action === "cache-select" || action === "feedback-select" || action === "account-select") return;
  }
  function tableSelection(e) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const row = t.closest("[data-content-select],[data-cache-select],[data-feedback-select],[data-account-select]");
    if (!row) return;
    if (row.dataset.contentSelect) {
      state.content.selectedId = row.dataset.contentSelect;
      return renderSoon();
    }
    if (row.dataset.cacheSelect) {
      state.cache.selectedId = row.dataset.cacheSelect;
      return renderSoon();
    }
    if (row.dataset.feedbackSelect) {
      state.feedback.selectedId = row.dataset.feedbackSelect;
      return renderSoon();
    }
    if (row.dataset.accountSelect) {
      state.accounts.selectedId = row.dataset.accountSelect;
      return renderSoon();
    }
  }
  function modalClick(e) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const modal = t.closest("[data-modal]");
    if (modal && t === modal) closeTopModal();
  }
  function submitHandler(e) {
    const f = e.target;
    if (!(f instanceof HTMLFormElement)) return;
    const name = f.dataset.form;
    if (name === "login") return handleLoginSubmit(e);
    if (name === "otp") return handleOtpSubmit(e);
    if (name === "content-filter") {
      e.preventDefault();
      state.content.filterApplied = state.content.filterDraft.trim();
      return renderSoon();
    }
    if (name === "cache-filter") {
      e.preventDefault();
      state.cache.filterApplied = state.cache.filterDraft.trim();
      state.cache.page = 1;
      return renderSoon();
    }
  }
  function keyHandler(e) {
    if (e.key === "Escape" && (P.querySelector("[data-modal]") || R.querySelector("[data-modal]"))) {
      e.preventDefault();
      closeTopModal();
      return;
    }
    if (e.key !== "Tab") return;
    const modal = P.querySelector("[data-modal]") || R.querySelector("[data-modal]");
    if (!modal) return;
    const f = Array.from(modal.querySelectorAll(focusSel)).filter((n) => n instanceof HTMLElement && !n.hasAttribute("disabled"));
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1], active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }
  function logout() {
    clearToasts();
    clearStorage();
    state.authenticated = false;
    state.path = "/dashboard";
    state.shellLoaded = false;
    state.auth = { form: { userId: "", password: "", otp: "" }, remember: false, helper: "", error: "", processing: false, otpOpen: false, otpLocked: false, otpFailures: 0, notice: null };
    state.dash = { range: "WEEK", hoveredTrend: null, hoveredReaction: null, tooltip: { left: 12, top: 12 }, selectedReaction: "POSITIVE" };
    state.content = { docs: clone(CONTENT_DOCS), filterDraft: "", filterApplied: "", type: "ALL", selectedId: CONTENT_DOCS[0]?.id ?? null, modalOpen: false, modalMode: "CREATE", modalTarget: null, modalError: "", deleteOpen: false, selectedFileLabel: "", form: clone(CONTENT_FORM) };
    state.cache = { items: clone(CACHE_DOCS).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), filterDraft: "", filterApplied: "", status: "ALL", page: 1, selectedId: CACHE_DOCS[0]?.id ?? null, modalOpen: false, modalMode: "CREATE", modalTarget: null, modalError: "", deleteOpen: false, form: clone(CACHE_FORM) };
    state.knowledge = { form: { question: "", documentType: "", documentId: "" }, status: "IDLE", result: null, copied: false };
    state.feedback = { filters: { reaction: "ALL" }, draftRange: { startDate: "", endDate: "" }, appliedRange: { startDate: "", endDate: "" }, selectedId: null };
    state.accounts = { items: clone(ACCOUNTS), selectedId: ACCOUNTS[0]?.id ?? null, actionModal: null, addOpen: false, addSearch: "", addReason: "", selectedCandidateId: null };
    state.logoutOpen = false;
    state.restoreFocus = null;
    renderSoon();
  }
  function trendHover(e) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const trend = t.closest("[data-trend]");
    if (trend) {
      state.dash.hoveredTrend = Number(trend.dataset.trend);
      const rect = trend.getBoundingClientRect();
      state.dash.tooltip = { left: clamp(e.clientX - rect.left + 14, 12, Math.max(rect.width - 208, 12)), top: clamp(e.clientY - rect.top - 14, 12, Math.max(rect.height - 104, 12)) };
      renderSoon();
      return;
    }
    const reaction = t.closest("[data-reaction]");
    if (reaction) {
      state.dash.hoveredReaction = reaction.dataset.reaction;
      renderSoon();
    }
  }
  function trendLeave(e) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.closest("[data-trend]") && !(e.relatedTarget instanceof Node && t.closest("[data-trend]").contains(e.relatedTarget))) {
      state.dash.hoveredTrend = null;
      renderSoon();
    }
    if (t.closest("[data-reaction]") && !(e.relatedTarget instanceof Node && t.closest("[data-reaction]").contains(e.relatedTarget))) {
      state.dash.hoveredReaction = null;
      renderSoon();
    }
  }
  function trendFocus(e) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const trend = t.closest("[data-trend]");
    if (trend) {
      state.dash.hoveredTrend = Number(trend.dataset.trend);
      const rect = trend.getBoundingClientRect();
      state.dash.tooltip = { left: clamp(rect.width / 2, 12, Math.max(rect.width - 208, 12)), top: 12 };
      renderSoon();
      return;
    }
    const reaction = t.closest("[data-reaction]");
    if (reaction) {
      state.dash.hoveredReaction = reaction.dataset.reaction;
      renderSoon();
    }
  }
  function trendBlur(e) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.closest("[data-trend]")) {
      state.dash.hoveredTrend = null;
      renderSoon();
    }
    if (t.closest("[data-reaction]")) {
      state.dash.hoveredReaction = null;
      renderSoon();
    }
  }
  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }
  function initApp() {
    initFromStorage();
    R.addEventListener("click", (e) => {
      clickHandler(e);
      tableSelection(e);
    });
    P.addEventListener("click", modalClick);
    R.addEventListener("input", fieldInput);
    R.addEventListener("change", fieldInput);
    P.addEventListener("input", fieldInput);
    P.addEventListener("change", fieldInput);
    R.addEventListener("submit", submitHandler);
    P.addEventListener("submit", submitHandler);
    document.addEventListener("keydown", keyHandler);
    R.addEventListener("mouseover", trendHover);
    R.addEventListener("mouseout", trendLeave);
    R.addEventListener("focusin", trendFocus);
    R.addEventListener("focusout", trendBlur);
    render();
  }

  // src/app/runtime.js
  initApp();
})();
