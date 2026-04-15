# IA_SPEC

## 1. 목적

- 현재 구현된 관리자 화면의 정보 구조를 정리한다.
- 브라우저에서 `index.html`을 직접 여는 정적 구조를 기준으로 한다.
- 화면 상태와 전환 흐름을 중심으로 본다.

## 2. 용어

| 구분 | 정의 |
|---|---|
| 1depth | 로그인 진입 상태 또는 상위 메뉴 화면 |
| 2depth | 화면의 주요 패널 / 섹션 |
| 3depth | 사용자가 직접 조작하는 입력, 버튼, 리스트 항목 |

## 3. 공통 구조

### 3.1 공통 레이아웃

| 영역 | 역할 | 주요 구성 |
|---|---|---|
| Auth | 로그인 / OTP / 안내 | `AuthScreen`, 안내 모달 |
| Shell | 로그인 후 관리자 화면 | `Sidebar`, `TopHeader`, `DashboardShell` |
| Main | 화면별 본문 | `ListPanel`, `DetailFrame`, `SectionHeader` |
| Modal | 생성 / 수정 / 삭제 / 안내 | 각 화면 내부 모달 렌더 |
| Message | 성공 / 실패 / 복사 완료 | `ToastStack` |

### 3.2 공통 규칙

- 로그인 성공 전에는 관리자 메뉴를 노출하지 않는다.
- OTP는 별도 페이지가 아니라 로그인 화면의 모달이다.
- 로그인 성공 후에는 `DashboardShell` 구조로 전환한다.
- 모달은 화면 위에 오버레이로 뜬다.
- 긴 목록은 내부 스크롤을 사용한다.

### 3.3 권한

| 메뉴 | MASTER | OPERATOR | 비고 |
|---|---:|---:|---|
| 로그인 / OTP | O | O | 공통 |
| 대시보드 | O | O | 공통 |
| 콘텐츠 관리 | O | X | 메뉴 비노출 |
| 캐시 답변 관리 | O | X | 메뉴 비노출 |
| 지식 기반 조회 | O | O | 메뉴 노출 |
| 피드백 관리 | O | O | 공통 메뉴 |
| 계정/권한 관리 | O | X | 메뉴 비노출 |

## 4. 화면 IA

### 4.1 로그인

#### 상태
- 로그인 화면
- 로그인 오류 모달
- OTP 인증 모달
- OTP 잠금 안내 모달

#### 구조
- 아이디 입력
- 비밀번호 입력
- 아이디 저장 체크박스
- 로그인 버튼
- OTP 입력
- OTP 확인 / 취소 버튼
- 오류 안내 메시지

### 4.2 대시보드

#### 1depth
- 대시보드

#### 2depth
- KPI 영역
- 추이 차트 영역
- 우측 보조 영역

#### 3depth
- 기간 선택
- KPI 카드 3개
- 추이 차트
- 지명 리스트
- 긍정 / 부정 비율

#### 구조
```text
dashboard-grid
├─ panel panel--main
│  ├─ SectionHeader
│  ├─ TimeRangeTabs
│  ├─ metric-card-grid / MetricCard
│  └─ TrendChart
└─ dashboard-side
   ├─ KeywordList
   └─ FeedbackRatio
```

### 4.3 콘텐츠 관리

#### 1depth
- 콘텐츠 관리

#### 2depth
- 목록 패널
- 상세 패널
- 등록 / 수정 / 삭제 모달

#### 3depth
- 유형 필터
- 문서명 검색
- 업로드 버튼
- 수정 / 삭제 / 다운로드 버튼
- 파일 선택
- 경로 입력

#### 구조
```text
content-grid
├─ content-table-card
│  ├─ SectionHeader
│  ├─ content-toolbar
│  └─ content-table-scroll
└─ content-detail-card
   ├─ content-detail-scroll
   ├─ content-history
   └─ content-detail-actions
```

### 4.4 캐시 답변 관리

#### 1depth
- 캐시 답변 관리

#### 2depth
- 목록 패널
- 상세 패널
- 등록 / 수정 모달
- 삭제 모달

#### 3depth
- 질문 검색
- 상태 필터
- 페이지네이션
- 등록 폼
- 수정 / 활성화 / 비활성화 / 삭제 버튼

#### 구조
```text
cache-qa-grid
├─ ListPanel.cache-answer-list-card
│  ├─ cache-qa-toolbar
│  ├─ list-panel__body
│  └─ Pagination
└─ cache-qa-side
   └─ DetailFrame.cache-answer-detail-card
```

### 4.5 지식 기반 조회

#### 1depth
- 지식 기반 조회

#### 2depth
- 조회 조건 패널
- 조회 결과 패널

#### 3depth
- 질문 입력
- 문서 유형 선택
- 테스트 문서 선택
- 조회 실행
- 결과 복사

#### 상태
- `IDLE`
- `LOADING`
- `SUCCESS`
- `EMPTY`
- `ERROR`

#### 구조
```text
knowledge-grid
├─ panel panel--main
│  └─ knowledge-form
└─ DetailFrame(knowledge-result-panel)
   └─ knowledge-result-scroll
```

### 4.6 피드백 관리

#### 1depth
- 피드백 관리

#### 2depth
- 목록 패널
- 상세 패널

#### 3depth
- 반응 필터
- 시작일 / 종료일 필터
- 검색
- 목록 항목 선택

#### 구조
```text
feedback-grid
├─ feedback-list-card
│  ├─ feedback-filter-bar
│  └─ feedback-list-scroll
└─ DetailFrame.feedback-management-detail-card
   └─ feedback-detail-scroll
```

#### 상세 구조
- 상단: 복합명, 사용자 ID, 반응 배지
- 본문: 대화 내용
- 조건부 영역: `NEGATIVE`일 때만 부정 사유 노출

### 4.7 계정 / 권한 관리

#### 1depth
- 계정/권한 관리

#### 2depth
- 통계 영역
- 계정 목록 패널
- 계정 상세 패널
- 계정 추가 모달
- 권한 변경 모달

#### 3depth
- 사용자 검색
- 계정 추가
- 권한 복구 / 비활성화 / 잠금 해제
- 사유 입력

#### 구조
```text
accounts-layout
├─ accounts-stat-grid
└─ accounts-grid
   ├─ accounts-list-card
   └─ accounts-detail-card
```

### 4.8 안내 모달

#### 1depth
- 로그인 오류 / 권한 차단 / OTP 잠금 안내

#### 2depth
- 안내 모달

#### 3depth
- 없음

## 5. 메시지 규칙

| 상태 | 위치 |
|---|---|
| 성공 | 화면 상단 또는 토스트 |
| 실패 | 토스트 또는 모달 하단 |
| 빈 결과 | 리스트 또는 상세 중앙 |
| 권한 없음 | 메뉴 비노출 또는 버튼 비활성화 |
| 확인 필요 | 모달 footer |

## 6. 비고

- 현재 구현에는 `/otp` 별도 페이지가 없다.
- `knowledge`는 MASTER / OPERATOR 모두 접근 가능하다.
- 문서 구조는 정적 파일 기반 구현과 일치해야 한다.
