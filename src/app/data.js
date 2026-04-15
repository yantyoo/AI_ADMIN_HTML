export const S = {
  stage: "xperp-mock-auth-stage",
  auth: "xperp-mock-authenticated",
  user: "xperp-mock-auth-user",
  profile: "xperp-mock-auth-profile",
  fail: "xperp-mock-otp-failures",
  lock: "xperp-mock-otp-locked",
};

export const AUTH_STATUS = "authenticated";
export const OTP_PENDING = "otp_pending";
export const OTP = "123456";
export const TOAST_MS = 3000;
export const OTP_MAX = 5;

export const R = document.getElementById("root");
export const P = document.createElement("div");
P.id = "portal-root";
document.body.appendChild(P);

export const Ls = {
  userId: "chat1004",
  id: "chat1004",
  name: "박운영",
  role: "MASTER",
  department: "운영 관리자",
};

export const AuthUsers = {
  test0000: {
    password: "a123456789",
    profile: {
      userId: "test0000",
      id: "chat1004",
      name: "박승준",
      role: "MASTER",
      department: "운영 관리자",
    },
    allowed: true,
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
    allowed: true,
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
    allowed: false,
  },
};

export const Msg = {
  bad: {
    title: "로그인 오류",
    message: "아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해 주세요.",
  },
  denied: {
    title: "권한 없음",
    message: "권한이 없는 사용자입니다. 관리자에게 권한을 요청해 주세요.",
  },
  locked: {
    title: "OTP 잠금",
    message: "OTP 오류로 잠금된 아이디 입니다. 관리자에게 문의하세요.",
  },
};

export const NAV = [
  { key: "dashboard", label: "대시보드", href: "/dashboard", roles: ["MASTER", "OPERATOR"] },
  { key: "content", label: "콘텐츠 관리", href: "/content", roles: ["MASTER"] },
  { key: "cache-qa", label: "캐시 답변 관리", href: "/cache-qa", roles: ["MASTER"] },
  { key: "knowledge", label: "지식 기반 조회", href: "/knowledge", roles: ["MASTER", "OPERATOR"] },
  { key: "feedback", label: "피드백 관리", href: "/feedback", roles: ["MASTER", "OPERATOR"] },
  { key: "accounts", label: "계정/권한 관리", href: "/accounts", roles: ["MASTER"] },
];

export const META = {
  "/dashboard": {
    title: "대시보드",
    description: "운영 현황을 한눈에 확인하는 메인 화면입니다.",
  },
  "/content": {
    title: "콘텐츠 관리",
    description: "RAG 문서를 등록하고 수정, 삭제, 이력을 관리하는 화면입니다.",
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
};

export const D = {
  DAY: {
    selectedRange: "DAY",
    metrics: [
      { key: "visitors", label: "접속자 수", value: 184, compareLabel: "전일 대비", compareRate: 4.8, compareDirection: "UP" },
      { key: "inquiries", label: "문의 수", value: 326, compareLabel: "전일 대비", compareRate: 2.1, compareDirection: "UP" },
      { key: "failures", label: "실패 수", value: 4, compareLabel: "전일 대비", compareRate: 1.2, compareDirection: "DOWN" },
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
      { rank: 2, label: "접속 지연", count: 61, ratio: 28.0 },
      { rank: 3, label: "자동 등록", count: 44, ratio: 20.2 },
    ],
    fixedFeedbackRatio: {
      totalCount: 340,
      defaultReaction: "POSITIVE",
      positive: {
        count: 187,
        ratio: 55.0,
        keywords: [
          { rank: 1, label: "응답이 빨라요", count: 52, ratio: 27.8 },
          { rank: 2, label: "설명이 명확해요", count: 44, ratio: 23.5 },
          { rank: 3, label: "추천할 만해요", count: 33, ratio: 17.6 },
          { rank: 4, label: "사용하기 쉬워요", count: 29, ratio: 15.5 },
          { rank: 5, label: "불편함이 없어요", count: 24, ratio: 12.8 },
        ],
      },
      negative: {
        count: 153,
        ratio: 45.0,
        keywords: [
          { rank: 1, label: "응답이 늦어요", count: 41, ratio: 26.8 },
          { rank: 2, label: "의도가 조금 달라요", count: 36, ratio: 23.5 },
          { rank: 3, label: "설명이 부족해요", count: 28, ratio: 18.3 },
          { rank: 4, label: "오류가 발생했어요", count: 25, ratio: 16.3 },
          { rank: 5, label: "결과가 기대와 달라요", count: 23, ratio: 15.0 },
        ],
      },
    },
  },
  WEEK: {
    selectedRange: "WEEK",
    metrics: [
      { key: "visitors", label: "접속자 수", value: 1051, compareLabel: "지난주 대비", compareRate: 5.0, compareDirection: "UP" },
      { key: "inquiries", label: "문의 수", value: 1820, compareLabel: "지난주 대비", compareRate: 3.4, compareDirection: "UP" },
      { key: "failures", label: "실패 수", value: 19, compareLabel: "지난주 대비", compareRate: 0.8, compareDirection: "DOWN" },
    ],
    trend: [
      { label: "4월 1주차", dateLabel: "2026-04-01 ~ 2026-04-07", visitors: 330, inquiries: 250 },
      { label: "4월 2주차", dateLabel: "2026-04-08 ~ 2026-04-14", visitors: 430, inquiries: 320 },
      { label: "4월 3주차", dateLabel: "2026-04-15 ~ 2026-04-21", visitors: 500, inquiries: 360 },
      { label: "4월 4주차", dateLabel: "2026-04-22 ~ 2026-04-28", visitors: 495, inquiries: 350 },
      { label: "4월 5주차", dateLabel: "2026-04-29 ~ 2026-05-05", visitors: 540, inquiries: 410 },
      { label: "4월 6주차", dateLabel: "2026-05-06 ~ 2026-05-12", visitors: 642, inquiries: 506 },
      { label: "4월 7주차", dateLabel: "2026-05-13 ~ 2026-05-19", visitors: 492, inquiries: 370 },
    ],
    fixedKeywords: [
      { rank: 1, label: "비밀번호 변경", count: 1520, ratio: 44.8 },
      { rank: 2, label: "접속 지연", count: 985, ratio: 29.1 },
      { rank: 3, label: "자동 등록", count: 503, ratio: 14.8 },
    ],
    fixedFeedbackRatio: {
      totalCount: 1680,
      defaultReaction: "POSITIVE",
      positive: {
        count: 924,
        ratio: 55.0,
        keywords: [
          { rank: 1, label: "응답이 빨라요", count: 260, ratio: 28.1 },
          { rank: 2, label: "설명이 명확해요", count: 210, ratio: 22.7 },
          { rank: 3, label: "추천할 만해요", count: 175, ratio: 18.9 },
          { rank: 4, label: "사용하기 쉬워요", count: 150, ratio: 16.2 },
          { rank: 5, label: "불편함이 없어요", count: 129, ratio: 14.0 },
        ],
      },
      negative: {
        count: 756,
        ratio: 45.0,
        keywords: [
          { rank: 1, label: "응답이 늦어요", count: 230, ratio: 30.4 },
          { rank: 2, label: "의도가 조금 달라요", count: 162, ratio: 21.4 },
          { rank: 3, label: "설명이 부족해요", count: 143, ratio: 18.9 },
          { rank: 4, label: "오류가 발생했어요", count: 121, ratio: 16.0 },
          { rank: 5, label: "결과가 기대와 달라요", count: 100, ratio: 13.2 },
        ],
      },
    },
  },
  MONTH: {
    selectedRange: "MONTH",
    metrics: [
      { key: "visitors", label: "접속자 수", value: 4216, compareLabel: "전월 대비", compareRate: 7.2, compareDirection: "UP" },
      { key: "inquiries", label: "문의 수", value: 8014, compareLabel: "전월 대비", compareRate: 4.6, compareDirection: "UP" },
      { key: "failures", label: "실패 수", value: 83, compareLabel: "전월 대비", compareRate: 2.4, compareDirection: "DOWN" },
    ],
    trend: [
      { label: "10월", dateLabel: "2025-10", visitors: 1200, inquiries: 940 },
      { label: "11월", dateLabel: "2025-11", visitors: 1420, inquiries: 1110 },
      { label: "12월", dateLabel: "2025-12", visitors: 1880, inquiries: 1425 },
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
      positive: {
        count: 6519,
        ratio: 58.0,
        keywords: [
          { rank: 1, label: "응답이 빨라요", count: 1820, ratio: 27.9 },
          { rank: 2, label: "설명이 명확해요", count: 1512, ratio: 23.2 },
          { rank: 3, label: "추천할 만해요", count: 1260, ratio: 19.3 },
          { rank: 4, label: "사용하기 쉬워요", count: 1014, ratio: 15.6 },
          { rank: 5, label: "불편함이 없어요", count: 913, ratio: 14.0 },
        ],
      },
      negative: {
        count: 4721,
        ratio: 42.0,
        keywords: [
          { rank: 1, label: "응답이 늦어요", count: 1290, ratio: 27.3 },
          { rank: 2, label: "의도가 조금 달라요", count: 1174, ratio: 24.9 },
          { rank: 3, label: "설명이 부족해요", count: 980, ratio: 20.8 },
          { rank: 4, label: "오류가 발생했어요", count: 745, ratio: 15.8 },
          { rank: 5, label: "결과가 기대와 달라요", count: 532, ratio: 11.3 },
        ],
      },
    },
  },
};

export const CONTENT_TYPE = [
  { label: "전체", value: "ALL" },
  { label: "매뉴얼", value: "MANUAL" },
  { label: "FAQ", value: "FAQ" },
];

export const CONTENT_LABEL = {
  ACTIVE: "활성",
  INACTIVE: "비활성",
};

export const CACHE_FILTER = [
  { label: "전체", value: "ALL" },
  { label: "활성", value: "ACTIVE" },
  { label: "비활성", value: "INACTIVE" },
];

export const CACHE_LABEL = {
  ACTIVE: "활성",
  INACTIVE: "비활성",
};

export const ACCOUNT_ROLE = {
  MASTER: "MASTER",
  OPERATOR: "OPERATOR",
};

export const ACCOUNT_STATUS = {
  ACTIVE: "활성",
  INACTIVE: "비활성",
  LOCKED: "잠금",
};

export const ACCOUNT_ACTION = {
  ACTIVATE: "권한 복구",
  DEACTIVATE: "권한 비활성화",
  UNLOCK: "잠금 해제",
};

export const CONTENT_FORM = {
  fileName: "",
  path: "",
  type: "MANUAL",
};

export const CACHE_FORM = {
  question: "",
  answer: "",
  status: "ACTIVE",
};

export const CONTENT_DOCS = [
  {
    id: "doc-1",
    name: "챗봇 운영 매뉴얼",
    type: "MANUAL",
    path: "/rag/manual/chatbot-operations",
    author: "박운영",
    createdAt: "2026-04-01 09:10",
    updatedAt: "2026-04-13 16:20",
    status: "ACTIVE",
    fileName: "chatbot-operations.pdf",
    fileSize: "12.4MB",
    history: [
      { id: "hist-1", version: "v3", actor: "박운영", action: "수정", reason: "운영 절차 최신화", occurredAt: "2026-04-13 16:20" },
      { id: "hist-2", version: "v2", actor: "박운영", action: "수정", reason: "FAQ 경로 반영", occurredAt: "2026-04-08 14:15" },
      { id: "hist-3", version: "v1", actor: "박운영", action: "업로드", reason: "신규 등록", occurredAt: "2026-04-01 09:10" },
    ],
  },
  {
    id: "doc-2",
    name: "공통 FAQ",
    type: "FAQ",
    path: "/rag/faq/common-questions",
    author: "박운영",
    createdAt: "2026-04-02 10:20",
    updatedAt: "2026-04-12 15:00",
    status: "ACTIVE",
    fileName: "faq-common.docx",
    fileSize: "6.8MB",
    history: [
      { id: "hist-4", version: "v2", actor: "박운영", action: "수정", reason: "용어 정리", occurredAt: "2026-04-12 15:00" },
      { id: "hist-5", version: "v1", actor: "박운영", action: "업로드", reason: "신규 등록", occurredAt: "2026-04-02 10:20" },
    ],
  },
  {
    id: "doc-3",
    name: "결제 안내 매뉴얼",
    type: "MANUAL",
    path: "/rag/manual/payment-guide",
    author: "박운영",
    createdAt: "2026-04-05 11:40",
    updatedAt: "2026-04-11 13:05",
    status: "ACTIVE",
    fileName: "payment-guide.md",
    fileSize: "3.1MB",
    history: [
      { id: "hist-6", version: "v2", actor: "관리자", action: "수정", reason: "수수료 정책 반영", occurredAt: "2026-04-11 13:05" },
      { id: "hist-7", version: "v1", actor: "박운영", action: "업로드", reason: "신규 등록", occurredAt: "2026-04-05 11:40" },
    ],
  },
  {
    id: "doc-4",
    name: "차량 등록 FAQ",
    type: "FAQ",
    path: "/rag/faq/vehicle-registration",
    author: "박운영",
    createdAt: "2026-04-06 14:30",
    updatedAt: "2026-04-10 09:45",
    status: "INACTIVE",
    fileName: "vehicle-registration.docx",
    fileSize: "2.9MB",
    history: [
      { id: "hist-8", version: "v2", actor: "관리자", action: "수정", reason: "비활성 전환", occurredAt: "2026-04-10 09:45" },
      { id: "hist-9", version: "v1", actor: "박운영", action: "업로드", reason: "신규 등록", occurredAt: "2026-04-06 14:30" },
    ],
  },
];

export const KNOWLEDGE_DOCS = CONTENT_DOCS.map(({ id, name, type, path }) => ({ id, name, type, path }));

export const CACHE_DOCS = [
  {
    id: "cache-1",
    question: "비밀번호를 변경하려면?",
    answer: "마이페이지 > 보안 설정에서 비밀번호 변경을 진행할 수 있습니다.",
    status: "ACTIVE",
    createdAt: "2026-04-13 08:20",
    updatedAt: "2026-04-13 08:20",
    createdBy: "박운영",
    updatedBy: "박운영",
    hitCount: 124,
    lastMatchedAt: "2026-04-15 11:20",
  },
  {
    id: "cache-2",
    question: "접속이 지연될 때는?",
    answer: "네트워크 상태를 확인하고 5분 뒤 재시도해 주세요.",
    status: "ACTIVE",
    createdAt: "2026-04-12 14:00",
    updatedAt: "2026-04-12 16:40",
    createdBy: "박운영",
    updatedBy: "관리자",
    hitCount: 82,
    lastMatchedAt: "2026-04-15 09:02",
  },
  {
    id: "cache-3",
    question: "자동 등록이 안 됩니다",
    answer: "문서 상태가 비활성인 경우 캐시 응답에서 제외됩니다.",
    status: "INACTIVE",
    createdAt: "2026-04-11 10:15",
    updatedAt: "2026-04-14 12:30",
    createdBy: "박운영",
    updatedBy: "박운영",
    hitCount: 46,
    lastMatchedAt: null,
  },
  {
    id: "cache-4",
    question: "관리자 권한은 어떻게 복구하나요?",
    answer: "계정/권한 관리 화면에서 권한 복구를 진행할 수 있습니다.",
    status: "ACTIVE",
    createdAt: "2026-04-10 09:25",
    updatedAt: "2026-04-10 09:25",
    createdBy: "박운영",
    updatedBy: "박운영",
    hitCount: 31,
    lastMatchedAt: "2026-04-15 08:15",
  },
];

export const FEEDBACK = [
  {
    id: "fb-1",
    createdAt: "2026-04-15 09:18",
    complexName: "그린아파트",
    userId: "user-1001",
    reaction: "POSITIVE",
    hasNegativeReason: false,
    negativeReason: "",
    conversation: [
      { speaker: "USER", sentAt: "09:17", message: "비밀번호 변경 위치를 바로 찾을 수 있어 좋았어요." },
      { speaker: "BOT", sentAt: "09:17", message: "필요한 경로를 빠르게 안내했습니다." },
    ],
  },
  {
    id: "fb-2",
    createdAt: "2026-04-15 08:50",
    complexName: "센트럴하우스",
    userId: "user-1034",
    reaction: "NEGATIVE",
    hasNegativeReason: true,
    negativeReason: "응답이 약간 늦어요.",
    conversation: [
      { speaker: "USER", sentAt: "08:48", message: "접속이 지연될 때 어떻게 해야 하나요?" },
      { speaker: "BOT", sentAt: "08:49", message: "네트워크 상태를 확인해 주세요." },
    ],
  },
  {
    id: "fb-3",
    createdAt: "2026-04-14 16:10",
    complexName: "해오름빌",
    userId: "user-2101",
    reaction: "POSITIVE",
    hasNegativeReason: false,
    negativeReason: "",
    conversation: [
      { speaker: "USER", sentAt: "16:08", message: "문서가 바로 반영돼서 편했어요." },
      { speaker: "BOT", sentAt: "16:09", message: "감사합니다. 최신 문서로 응답했습니다." },
    ],
  },
  {
    id: "fb-4",
    createdAt: "2026-04-14 11:35",
    complexName: "라온타워",
    userId: "user-0892",
    reaction: "NEGATIVE",
    hasNegativeReason: true,
    negativeReason: "설명이 조금 부족했어요.",
    conversation: [
      { speaker: "USER", sentAt: "11:33", message: "차량 등록이 안 돼요." },
      { speaker: "BOT", sentAt: "11:34", message: "비활성 문서를 확인해 주세요." },
    ],
  },
  {
    id: "fb-5",
    createdAt: "2026-04-13 14:02",
    complexName: "파인뷰",
    userId: "user-5678",
    reaction: "POSITIVE",
    hasNegativeReason: false,
    negativeReason: "",
    conversation: [
      { speaker: "USER", sentAt: "14:01", message: "답변이 명확해서 좋습니다." },
      { speaker: "BOT", sentAt: "14:01", message: "도움이 되었다면 다행입니다." },
    ],
  },
];

export const ACCOUNTS = [
  {
    id: "chat1004",
    name: "박운영",
    role: "MASTER",
    status: "ACTIVE",
    registeredAt: "2026-04-01",
    lastLoginAt: "2026-04-15 08:45",
    loginHistory: [
      { occurredAt: "2026-04-15 08:45", success: true, ip: "10.0.0.11" },
      { occurredAt: "2026-04-14 17:20", success: true, ip: "10.0.0.11" },
    ],
    lockHistory: [],
  },
  {
    id: "op2031",
    name: "권태영",
    role: "OPERATOR",
    status: "ACTIVE",
    registeredAt: "2026-04-03",
    lastLoginAt: "2026-04-14 18:15",
    loginHistory: [{ occurredAt: "2026-04-14 18:15", success: true, ip: "10.0.0.24" }],
    lockHistory: [],
  },
  {
    id: "op9012",
    name: "차단계정",
    role: "OPERATOR",
    status: "LOCKED",
    registeredAt: "2026-04-04",
    lastLoginAt: "2026-04-11 09:00",
    loginHistory: [{ occurredAt: "2026-04-11 08:59", success: false, ip: "10.0.0.45" }],
    lockHistory: [{ occurredAt: "2026-04-11 09:00", type: "LOCKED", reason: "OTP 연속 실패", actor: "시스템" }],
  },
  {
    id: "op9301",
    name: "김지원",
    role: "OPERATOR",
    status: "INACTIVE",
    registeredAt: "2026-04-05",
    lastLoginAt: null,
    loginHistory: [],
    lockHistory: [{ occurredAt: "2026-04-08 10:30", type: "UNLOCKED", reason: "권한 검토 완료", actor: "관리자" }],
  },
];

export const CANDIDATES = [
  { id: "op3001", name: "이서준", complexCode: "C-1001" },
  { id: "op3002", name: "최유진", complexCode: "C-1023" },
  { id: "op3003", name: "한지민", complexCode: "C-1055" },
];

export const clone = (value) => JSON.parse(JSON.stringify(value));

const createAuthState = () => ({
  form: { userId: "", password: "", otp: "" },
  remember: false,
  helper: "",
  error: "",
  processing: false,
  otpOpen: false,
  otpLocked: false,
  otpFailures: 0,
  notice: null,
});

const createDashState = () => ({
  range: "WEEK",
  hoveredTrend: null,
  hoveredReaction: null,
  tooltip: { left: 12, top: 12 },
  selectedReaction: "POSITIVE",
});

const createContentState = () => ({
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
  form: clone(CONTENT_FORM),
});

const createCacheState = () => ({
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
  form: clone(CACHE_FORM),
});

const createKnowledgeState = () => ({
  form: { question: "", documentType: "", documentId: "" },
  status: "IDLE",
  result: null,
  copied: false,
});

const createFeedbackState = () => ({
  filters: { reaction: "ALL" },
  draftRange: { startDate: "", endDate: "" },
  appliedRange: { startDate: "", endDate: "" },
  selectedId: null,
});

const createAccountsState = () => ({
  items: clone(ACCOUNTS),
  selectedId: ACCOUNTS[0]?.id ?? null,
  actionModal: null,
  addOpen: false,
  addSearch: "",
  addReason: "",
  selectedCandidateId: null,
});

export const createState = () => ({
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
  restoreFocus: null,
});

export const state = createState();
