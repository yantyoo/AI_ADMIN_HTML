# FEATURE_SPEC

## 1. 목적

- 현재 구현된 관리자 화면의 기능을 코드 기준으로 정의한다.
- 기능 ID(`FS-xxx`)로 관리한다.
- 신규 기획보다 현재 동작하는 기능과 상태를 우선한다.
- 화면 구조와 IA는 `docs/IA_SPEC.md`를 따른다.

## 2. 공통 규칙

### 2.1 상태값

| 상태 | 의미 |
|---|---|
| `IDLE` | 초기 대기 |
| `LOADING` | 조회 또는 처리 중 |
| `SUCCESS` | 정상 완료 |
| `EMPTY` | 결과 없음 |
| `ERROR` | 오류 또는 실패 상태 |
| `ACTIVE` | 활성 상태 |
| `INACTIVE` | 비활성 상태 |
| `LOCKED` | 잠금 상태 |

### 2.2 공통 컴포넌트

- `Sidebar`, `TopHeader`, `DashboardShell`
- `ListPanel`, `DetailFrame`
- `SectionHeader`
- `ModalDialog`, `ModalPortal`
- `Pagination`
- `ToastStack`

### 2.3 공통 정책

- 긴 리스트는 내부 스크롤을 사용한다.
- 선택형 화면은 목록과 상세를 분리한다.
- 모달 작업은 저장 / 확인 / 취소로 끝낸다.
- 실패 시 기존 입력값은 유지한다.

## 3. 기능 정의

### 3.1 인증

| FS ID | 기능 | 설명 | 입력값 | 결과 | 현재 구현 |
|---|---|---|---|---|---|
| FS-001 | 로그인 | 아이디 / 비밀번호로 로그인한다 | `userId`, `password`, `rememberId` | OTP 모달 오픈 | 로그인 화면 전용 |
| FS-002 | OTP 인증 | 6자리 OTP를 입력한다 | `otp` | 대시보드 진입 | OTP는 모달 |
| FS-003 | 권한 차단 | 허용되지 않은 계정은 차단한다 | `userId`, `password` | 안내 모달 | `blocked0000` 예시 |
| FS-004 | OTP 실패 | OTP 실패를 누적한다 | `otp` | 실패 횟수 표시 | 5회 실패 시 잠금 |
| FS-005 | OTP 잠금 | OTP 5회 실패 시 잠금한다 | 없음 | 잠금 안내 | sessionStorage 저장 |
| FS-006 | 인증 유지 | 인증 상태를 유지한다 | 없음 | 새로고침 후 유지 | session/localStorage 사용 |
| FS-007 | 로그아웃 | 인증을 해제하고 다시 로그인으로 간다 | 없음 | 인증 해제 | 로그아웃 모달 사용 |

#### 인증 정책

- 성공한 로그인 이후에만 OTP 모달이 열린다.
- OTP는 `123456` 고정값이다.
- 로그인 실패는 안내 모달로 처리한다.
- OTP 잠금은 `AUTH_OTP_LOCKED_KEY`에 저장한다.

### 3.2 대시보드

| FS ID | 기능 | 설명 | 입력값 | 결과 | 현재 구현 |
|---|---|---|---|---|---|
| FS-008 | 기간 선택 | DAY / WEEK / MONTH를 전환한다 | `selectedRange` | KPI / 차트 갱신 | 로컬 상태 |
| FS-009 | KPI 노출 | 방문자 수를 표시한다 | 기간 | KPI 카드 표시 | `MetricCard` |
| FS-010 | KPI 노출 | 문의 수를 표시한다 | 기간 | KPI 카드 표시 | `MetricCard` |
| FS-011 | KPI 노출 | 실패 수를 표시한다 | 기간 | KPI 카드 표시 | `MetricCard` |
| FS-012 | 추이 차트 | 방문자 / 문의 추이를 표시한다 | 기간 | SVG 차트 표시 | `TrendChart` |
| FS-013 | 질문 키워드 | 상위 질문 키워드를 보여준다 | 없음 | 우측 패널 표시 | `KeywordList` |
| FS-014 | 피드백 비율 | 긍정 / 부정 비율을 보여준다 | 없음 | 우측 패널 표시 | `FeedbackRatio` |
#### 대시보드 정책

- 초기 기간은 `WEEK`다.
- 차트와 KPI는 같은 기간 데이터로 갱신한다.
#### 데이터

- API: `getDashboardData(range)`
- 타입: `DashboardPayload`, `MetricCardData`, `TrendPoint`, `KeywordItem`, `FeedbackRatioData`

### 3.3 콘텐츠 관리

| FS ID | 기능 | 설명 | 입력값 | 결과 | 현재 구현 |
|---|---|---|---|---|---|
| FS-016 | 목록 조회 | 문서 목록을 본다 | 없음 | 목록 노출 | 최신순 정렬 |
| FS-017 | 유형 필터 | MANUAL / FAQ를 필터한다 | `type` | 목록 축소 | 선택값 기준 |
| FS-018 | 키워드 검색 | 문서명 / 경로를 검색한다 | `keyword` | 필터 적용 | 로컬 필터 |
| FS-019 | 상세 조회 | 선택 문서 상세를 본다 | `documentId` | 상세 패널 | 목록 선택 기반 |
| FS-020 | 업로드 | 새 문서를 등록한다 | `fileName`, `path`, `type` | 목록 추가 | 모달 입력 |
| FS-021 | 업로드 실패 | 필수값이 없으면 막는다 | `fileName`, `path`, `type` | 검증 오류 | 파일 / 경로 필수 |
| FS-022 | 수정 | 선택 문서를 수정한다 | `documentId` | 상세 갱신 | history 추가 |
| FS-023 | 수정 실패 | 대상이 없으면 막는다 | `documentId` | 오류 메시지 | 선택값 검증 |
| FS-024 | 다운로드 | 선택 문서를 다운로드한다 | 없음 | 토스트 표시 | 실제 파일 다운로드 아님 |
| FS-025 | 삭제 | 선택 문서를 삭제한다 | `documentId` | 목록 갱신 | 다음 항목 자동 선택 |
| FS-026 | 변경 이력 | 변경 이력을 본다 | `documentId` | 이력 리스트 | history 1건 이상 |
| FS-027 | 상태 표시 | ACTIVE / FAILED를 보여준다 | 없음 | 배지 표시 | 목록과 상세 공통 |
| FS-028 | 업로드 상태 | 성공 / 실패 상태를 보여준다 | 없음 | 상태 노출 | 토스트 + 배지 |

#### 콘텐츠 정책

- 허용 파일 확장자: `.pdf`, `.docx`, `.txt`, `.md`
- 검색은 문서명과 경로에만 적용한다.
- 업로드 / 수정 시 파일과 경로는 필수다.
- 수정 시 변경 이력이 추가된다.

#### 데이터

- API: `getContentDocuments`, `uploadContentDocument`
- 타입: `ContentDocument`, `ContentHistoryItem`, `ContentDocumentType`, `ContentDocumentStatus`

### 3.4 캐시 Q&A

| FS ID | 기능 | 설명 | 입력값 | 결과 | 현재 구현 |
|---|---|---|---|---|---|
| FS-029 | 목록 조회 | 캐시 Q&A 목록을 본다 | 없음 | 목록 노출 | 페이지당 10개 |
| FS-030 | 검색 | 질문으로 검색한다 | `keyword` | 목록 필터 | 유사도 정렬 |
| FS-031 | 상태 필터 | 전체 / 활성 / 비활성 필터한다 | `status` | 목록 필터 | `ALL`, `ACTIVE`, `INACTIVE` |
| FS-032 | 페이지 이동 | 페이지를 이동한다 | `page` | 페이지 clamp | 현재 페이지 유지 |
| FS-033 | 상세 조회 | 선택 항목 상세를 본다 | `id` | 상세 패널 | 목록 선택 기반 |
| FS-034 | 등록 | 새 Q&A를 등록한다 | `question`, `answer`, `status` | 목록 추가 | 모달 입력 |
| FS-035 | 등록 실패 | 검증 실패를 막는다 | 없음 | 오류 메시지 | 질문 / 답변 필수 |
| FS-036 | 수정 | 선택 Q&A를 수정한다 | `question`, `answer`, `status` | 상세 갱신 | history 없음 |
| FS-037 | 수정 실패 | 대상이 없으면 막는다 | `id` | 오류 메시지 | 선택값 검증 |
| FS-038 | 활성화 / 비활성화 | 상태를 전환한다 | `id`, `status` | 상태 갱신 | 즉시 반영 |
| FS-039 | 삭제 | 선택 Q&A를 삭제한다 | `id` | 목록 갱신 | 다음 항목 자동 선택 |
| FS-040 | 검증 | 중복 질문을 검사한다 | 없음 | 검증 오류 | Levenshtein + 포함 검사 |
| FS-041 | 오류 처리 | 데이터 없음 / 대상 없음 처리 | `id` | 오류 메시지 | 모달 / 토스트 |
| FS-042 | 토스트 | 성공 / 실패 메시지를 보여준다 | 없음 | 토스트 표시 | 자동 종료 |
| FS-043 | 유사도 검색 | 검색어와 질문 유사도를 계산한다 | `question` | 정렬 반영 | 점수 0.85 이상 |

#### 캐시 Q&A 정책

- 페이지 크기는 10건이다.
- 유사도 검색은 질문 정규화 후 비교한다.
- 중복 질문은 등록 전에 차단한다.
- 상태 전환은 상세 패널을 즉시 갱신한다.

#### 데이터

- API: `getCacheQaInitialData`, `createCacheQaEntry`, `updateCacheQaEntry`, `toggleCacheQaEntryStatus`, `findCacheQaDuplicate`
- 타입: `CacheQaItem`, `CacheQaForm`, `CacheQaStatus`, `CacheQaFilters`, `CacheQaMatch`

### 3.5 지식 기반 조회

| FS ID | 기능 | 설명 | 입력값 | 결과 | 현재 구현 |
|---|---|---|---|---|---|
| FS-044 | 질문 입력 | 질문을 입력한다 | `question` | 조회 가능 상태 | 1자 이상 |
| FS-045 | 문서 유형 선택 | MANUAL / FAQ를 선택한다 | `documentType` | 문서 목록 필터 | 선택 시 문서 초기화 |
| FS-046 | 문서 선택 | 테스트 문서를 선택한다 | `documentId` | 대상 문서 결정 | 필수 값 |
| FS-047 | 조회 실행 | 조건 충족 시 조회한다 | `form` | 결과 패널 갱신 | `IDLE / LOADING / SUCCESS / EMPTY / ERROR` |
| FS-048 | 결과 표시 | 답변 / 참조 문서를 보여준다 | 없음 | 결과 영역 표시 | 성공 상태 |
| FS-049 | 빈 결과 | 일치 결과가 없음을 보여준다 | 없음 | 빈 상태 | EMPTY |
| FS-050 | 오류 상태 | 조회 실패를 보여준다 | 없음 | 오류 상태 | ERROR |
| FS-051 | 결과 복사 | 답변을 복사한다 | `answer` | 복사 완료 토스트 | 성공 후만 노출 |
| FS-052 | 초기화 | 입력값과 결과를 초기화한다 | 없음 | IDLE 복귀 | 폼과 결과 초기화 |

#### 지식 기반 정책

- 문서 유형 변경 시 문서 선택은 초기화된다.
- 복사 버튼은 성공 상태에서만 의미가 있다.
- 결과는 답변, 생성 시각, 참조 문서, 참조 단락으로 구성한다.

#### 데이터

- API: `getKnowledgeInitialData`, `executeKnowledgeQuery`
- 타입: `KnowledgeDocument`, `KnowledgeQueryForm`, `KnowledgeResult`

### 3.6 피드백 관리

| FS ID | 기능 | 설명 | 입력값 | 결과 | 현재 구현 |
|---|---|---|---|---|---|
| FS-056 | 목록 조회 | 피드백 목록을 본다 | `reaction`, `dateRange` | 목록 표시 | 필터 기반 |
| FS-057 | 반응 필터 | 긍정 / 부정 / 전체를 필터한다 | `reaction` | 목록 필터 | 실시간 변경 |
| FS-058 | 상세 조회 | 선택 피드백 상세를 본다 | `id` | 상세 패널 | 목록 선택 |
| FS-059 | 빈 상태 | 결과가 없을 때 안내한다 | 없음 | 빈 상태 | 리스트 / 상세 |
| FS-060 | 부정 사유 | 부정 피드백의 사유를 본다 | 없음 | 부정 사유 표시 | `NEGATIVE`만 노출 |

#### 피드백 정책

- 대화 내용은 사용자와 봇의 순서대로 보여준다.
- 날짜 필터는 검색 버튼을 눌렀을 때 반영한다.
- 부정 사유는 `NEGATIVE` 반응에서만 노출한다.

#### 데이터

- API: `getFeedbacks`
- 타입: `FeedbackDetail`, `FeedbackConversationTurn`, `FeedbackFilters`, `FeedbackReaction`

### 3.7 계정 / 권한 관리

| FS ID | 기능 | 설명 | 입력값 | 결과 | 현재 구현 |
|---|---|---|---|---|---|
| FS-061 | 통계 노출 | 계정 통계를 본다 | 없음 | 통계 카드 | 활성 기준 계산 |
| FS-062 | 역할 통계 | MASTER / OPERATOR 통계를 본다 | 없음 | KPI 카드 | 로컬 계산 |
| FS-063 | 상세 조회 | 계정 상세를 본다 | `id` | 상세 패널 | 목록 선택 |
| FS-064 | 계정 추가 | 후보 계정을 선택해 추가한다 | 없음 | 목록 추가 | 모달 기반 |
| FS-065 | 계정 추가 실패 | 후보 / 사유가 없으면 막는다 | `candidate`, `reason` | 검증 오류 | 버튼 비활성화 |
| FS-066 | 권한 변경 | 활성 / 비활성 / 잠금을 바꾼다 | `id`, `reason` | 상태 변경 | 모달 기반 |
| FS-067 | OPERATOR 비활성화 | 활성 OPERATOR를 비활성화한다 | `id`, `reason` | 상태 변경 | MASTER 전용 |
| FS-068 | 잠금 해제 | LOCKED 계정을 해제한다 | `id`, `reason` | 상태 변경 | MASTER 전용 |
| FS-069 | 감사 이력 | 로그인 / 잠금 이력을 본다 | 없음 | 이력 목록 | 읽기 전용 |
| FS-070 | 본인 계정 보호 | 본인 계정 변경을 막는다 | `id` | 버튼 비노출 | self guard |
| FS-071 | 상세 잠금 이력 | 잠금 / 해제 이력을 본다 | 없음 | 이력 목록 | 읽기 전용 |

#### 계정 정책

- `MASTER`와 `OPERATOR` 역할만 사용한다.
- 본인 계정은 권한 변경 대상이 아니다.
- 계정 추가와 권한 변경은 사유 입력이 필요하다.
- 로그인 이력과 잠금 이력은 읽기 전용이다.

#### 데이터

- API: `getAccountsData`
- 타입: `AccountDetail`, `AccountStats`, `UserCandidate`, `AccountLoginHistory`, `AccountLockHistory`

## 4. API / 데이터 요약

| 영역 | 주요 함수 / 데이터 |
|---|---|
| 인증 | `sessionStorage`, `localStorage`, mock 계정 |
| 대시보드 | `getDashboardData(range)` |
| 콘텐츠 | `getContentDocuments`, `uploadContentDocument` |
| 캐시 Q&A | `getCacheQaInitialData`, `createCacheQaEntry`, `updateCacheQaEntry`, `toggleCacheQaEntryStatus`, `findCacheQaDuplicate` |
| 지식 기반 조회 | `getKnowledgeInitialData`, `executeKnowledgeQuery` |
| 피드백 | `getFeedbacks` |
| 계정/권한 | `getAccountsData` |

## 5. 공통 UX

| 상황 | UX |
|---|---|
| 성공 | 토스트와 상세 갱신 |
| 실패 | 기존 입력 유지 + 오류 메시지 |
| 빈 결과 | 빈 상태 안내 |
| 권한 없음 | 메뉴 비노출 또는 버튼 비활성화 |
| 확인 필요 | 모달 footer에서 최종 확인 |

## 6. 비고

- 실제 API는 없다. 현재는 mock 데이터와 로컬 상태로 동작한다.
- 코드에 없는 실제 라우트 개념은 문서에서 제거한다.
- 미구현 기능은 별도 질문으로 분리한다.
