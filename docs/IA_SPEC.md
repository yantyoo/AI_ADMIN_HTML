# IA_SPEC

## 1. 목적

- 현재 구현된 관리자 화면의 정보 구조를 정리한다.
- 이 프로젝트는 브라우저 URL 라우터보다 `App` 상태와 `DashboardShell` 내부 전환을 사용한다.
- 따라서 IA는 "실제 라우트"보다 "화면 상태와 전환 흐름" 중심으로 본다.

## 2. 용어

| 구분 | 정의 |
|---|---|
| 1depth | 앱 진입 상태 또는 상위 화면 상태 |
| 2depth | 화면의 주요 패널 / 섹션 |
| 3depth | 사용자가 직접 조작하는 입력, 버튼, 리스트 항목 |

## 3. 공통 구조

### 3.1 공통 레이아웃

| 영역 | 역할 | 주요 컴포넌트 |
|---|---|---|
| Auth | 로그인 / OTP / 안내 | `AuthScreen`, `ModalDialog`, `ModalPortal` |
| Shell | 인증 후 관리자 화면 | `Sidebar`, `TopHeader`, `DashboardShell` |
| Main | 화면별 본문 | `panel`, `ListPanel`, `DetailFrame` |
| Modal | 생성 / 수정 / 삭제 / 안내 | `ModalDialog`, `ModalPortal` |
| Message | 성공 / 오류 / 복사 완료 | `ToastStack` |

### 3.2 공통 규칙

- 인증 전에는 로그인 화면만 노출한다.
- OTP는 별도 페이지가 아니라 로그인 화면 내부 모달이다.
- 인증 후에는 `DashboardShell` 안에서 화면이 전환된다.
- 모달은 화면 위에 오버레이로 뜬다.
- 긴 목록은 내부 스크롤을 사용한다.

### 3.3 권한

| 화면 | MASTER | OPERATOR | 비고 |
|---|---:|---:|---|
| 로그인 / OTP | O | O | 공용 |
| 대시보드 | O | O | 공용 |
| 콘텐츠 관리 | O | X | 메뉴 비노출 |
| 캐시 Q&A | O | X | 메뉴 비노출 |
| 지식 기반 조회 | O | O | 메뉴 노출 |
| 피드백 관리 | O | O | 공용 메뉴 |
| 계정/권한 관리 | O | X | 메뉴 비노출 |

## 4. 화면 IA

### 4.1 앱 진입

#### 상태

- 인증 전: 로그인 화면
- 인증 후: 관리자 shell

#### 규칙

- 별도 `/otp` 화면은 없다.
- OTP는 로그인 성공 후 모달로 뜬다.

### 4.2 로그인

#### 1depth
- 로그인 화면

#### 2depth
- 인증 카드
- OTP 모달
- 안내 모달

#### 3depth
- 아이디 입력
- 비밀번호 입력
- 아이디 저장 체크박스
- 로그인 버튼
- OTP 입력
- OTP 인증 완료 버튼
- 취소 버튼
- 안내 확인 버튼

#### 상태 흐름

- 로그인 성공 -> OTP 모달 오픈
- 로그인 실패 -> 안내 모달
- 권한 없음 -> 안내 모달
- OTP 성공 -> 대시보드로 이동
- OTP 5회 실패 -> 잠금 안내 모달

### 4.3 대시보드

#### 1depth
- 대시보드

#### 2depth
- 메인 지표 영역
- 우측 보조 영역

#### 3depth
- 기간 탭
- KPI 카드 3개
- 추이 차트
- 질문 키워드
- 피드백 비율

#### 상태

- 기본
- 기간 전환
- 오류

#### 구조

```text
dashboard-grid
├─ panel panel--main
│  ├─ SectionHeader
│  ├─ TimeRangeTabs
│  ├─ metric-card-grid
│  ├─ TrendChart
└─ dashboard-side
   ├─ KeywordList
   └─ FeedbackRatio
```

### 4.4 콘텐츠 관리

#### 1depth
- 콘텐츠 관리

#### 2depth
- 목록 패널
- 상세 패널
- 업로드 / 수정 모달
- 삭제 모달

#### 3depth
- 문서 유형 필터
- 문서명 검색
- 검색 / 초기화
- 행 선택
- 업로드 버튼
- 다운로드 / 수정 / 삭제 버튼
- 파일 선택
- 저장 경로 입력

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

### 4.5 캐시 Q&A

#### 1depth
- 캐시 Q&A

#### 2depth
- 목록 패널
- 상세 패널
- 등록 / 수정 모달
- 삭제 모달

#### 3depth
- 질문 검색
- 상태 필터
- 검색 / 초기화
- 페이지 이동
- 새 질문 등록
- 수정 / 활성화 / 비활성화 / 삭제

#### 구조

```text
cache-qa-grid
├─ ListPanel.cache-qa-list-card
│  ├─ cache-qa-toolbar
│  ├─ list-panel__body
│  └─ Pagination
└─ cache-qa-side
   └─ DetailFrame.cache-qa-detail-card
```

### 4.6 지식 기반 조회

#### 1depth
- 지식 기반 조회

#### 2depth
- 조회 조건 패널
- 조회 결과 패널

#### 3depth
- 문서 유형 선택
- 테스트 문서 선택
- 질문 입력
- 초기화
- 조회
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
└─ DetailFrame(panel panel--main)
   └─ knowledge-result-scroll
```

### 4.7 피드백 관리

#### 1depth
- 피드백 관리

#### 2depth
- 목록 패널
- 상세 패널

#### 3depth
- 반응 필터
- 시작일 / 종료일
- 검색
- 초기화
- 목록 행 선택

#### 구조

```text
feedback-grid
├─ feedback-list-card
│  ├─ feedback-filter-bar
│  └─ feedback-list-scroll
└─ DetailFrame.feedback-detail-card
   └─ feedback-detail-scroll
```

#### 상세 구성

- 상단: 복합명, 사용자 ID, 반응 배지
- 본문: 대화 내용
- 조건부 영역: `NEGATIVE`일 때만 부정 사유 표시

### 4.8 계정 / 권한 관리

#### 1depth
- 계정/권한 관리

#### 2depth
- 통계 영역
- 계정 목록 패널
- 계정 상세 패널
- 계정 추가 모달
- 권한 변경 모달

#### 3depth
- 행 선택
- 계정 추가
- 권한 변경
- 활성화 / 비활성화 / 잠금 해제
- 사유 입력

#### 구조

```text
accounts-layout
├─ accounts-stat-grid
└─ accounts-grid
   ├─ accounts-list-card
   └─ accounts-detail-card
```

### 4.9 보류 안내

#### 1depth
- 보류 안내

#### 2depth
- 안내 패널

#### 3depth
- 없음

## 5. 메시지 규칙

| 상태 | 위치 |
|---|---|
| 성공 | 화면 상단 토스트 |
| 실패 | 토스트 또는 모달 하단 |
| 빈 상태 | 리스트 또는 상세 중앙 |
| 권한 없음 | 메뉴 비노출 또는 버튼 비활성화 |
| 확인 필요 | 모달 footer |

## 6. 비고

- 현재 구현 기준으로 `/otp`는 별도 화면이 아니다.
- `knowledge`는 MASTER와 OPERATOR가 모두 볼 수 있다.
