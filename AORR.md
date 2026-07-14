# AORR 상태 머신 설계

이 문서는 개인 프로페셔널 웹사이트를 GitHub Pages에서 실행 가능한 정적 사이트로 만들기 위한 실행형 AORR 상태 머신이다.

전제:
- 최종 산출물은 HTML, CSS, JavaScript만으로 동작하는 정적 웹사이트다.
- 루트 디렉토리에 `index.html`, `styles.css`, `script.js`가 존재해야 한다.
- 게임 코드는 `script.js` 내부에 포함되거나, 별도 JavaScript 파일로 분리될 수 있다.
- 백엔드 서버는 사용하지 않는다.
- 불확실한 개인 정보, 콘텐츠, 저장소 설정, 배포 권한은 [사람 확인 필요]로 처리한다.

## 1. Target

### 프로페셔널 웹사이트 개발 목표
- 개인 소개, 경력, 프로젝트, 연락처를 포함한 프로페셔널 웹사이트를 만든다.
- 모바일과 데스크톱 모두에서 읽기 좋고 조작 가능한 반응형 UI를 제공한다.
- 상단 내비게이션에 `Games` 탭을 추가하고, 지렁이 게임을 제공한다.
- 정적 사이트로 배포 가능해야 하며, GitHub Pages에서 그대로 실행되어야 한다.

### GitHub Pages 배포 목표
- 정적 호스팅 제약에 맞게 작성한다.
- 상대 경로와 정적 자산 참조만 사용한다.
- 브라우저만으로 렌더링되고 실행되어야 한다.
- 배포 전에 로컬에서 동일한 파일 세트로 검증 가능해야 한다.

### 입력 자료
- [사람 확인 필요] 이름, 소개 문구, 경력, 프로젝트, 연락처, 프로필 이미지, 소셜 링크
- [사람 확인 필요] 웹사이트 톤, 색상 선호, 타이포그래피 선호
- [사람 확인 필요] 게임에 필요한 규칙, 난이도, 추가 기능
- 저장소의 기존 파일 구조
- GitHub Pages 배포 대상 브랜치/경로 규칙

### 필수 페이지와 섹션
- 홈 또는 소개 영역
- About / Intro 섹션
- Skills 또는 Experience 섹션
- Projects 섹션
- Contact 섹션
- `Games` 탭 또는 `Games` 섹션
- 지렁이 게임 플레이 영역

### Games 탭 및 지렁이 게임 요구사항
- 상단에 `Games` 탭이 있어야 한다.
- 키보드 조작이 가능해야 한다.
- 모바일 터치 조작이 가능해야 한다.
- 점수, 게임 오버, 재시작이 가능해야 한다.
- 화면 크기에 따라 플레이 영역이 적응해야 한다.
- [사람 확인 필요] 추가 게임 기능이 있다면 게임 루프에 포함한다.

### 데스크톱 및 모바일 완료 기준
- 데스크톱에서 내비게이션, 콘텐츠, 게임이 모두 정상 동작한다.
- 모바일에서 레이아웃이 깨지지 않고 조작이 가능하다.
- 320px 수준의 좁은 화면에서도 핵심 콘텐츠가 유지된다.
- 브라우저 콘솔에 치명적 오류가 없어야 한다.
- GitHub Pages에서 동일하게 동작해야 한다.

## 2. Act

### 한 번의 개발 루프에서 수행할 최소 작업
1. 단 하나의 실패 원인을 선택한다.
2. 그 원인과 직접 관련된 최소 파일만 수정한다.
3. 필요한 경우에만 새 파일을 추가한다.
4. 로컬 검증 명령어를 실행한다.
5. 결과를 관찰하고, 통과하면 다음 상태로 이동한다.

### 수정 가능한 파일 범위
- 현재 실패 원인과 직접 연결된 파일만 수정한다.
- 기본적으로는 `index.html`, `styles.css`, `script.js`와 게임 관련 JS 파일만 수정한다.
- 콘텐츠 수정이 필요할 때만 콘텐츠 파일을 수정한다.
- 저장소 설정 파일은 배포/호환성 문제가 있을 때만 수정한다.

### 생성할 수 있는 파일
- `index.html`
- `styles.css`
- `script.js`
- [선택] `game.js`, `snake.js` 같은 게임 분리 파일
- [선택] 정적 리소스 파일

### 실행 가능한 로컬 검증 명령어
실행 순서는 프로젝트 구조에 맞게 선택한다.

```bash
# 정적 파일 확인
dir

# 로컬 서버 시작 예시
python -m http.server 8000

# 또는 Node 기반 정적 서버가 있으면
npx serve .

# HTML/CSS/JS 오류를 브라우저와 콘솔에서 확인
```

검증 시에는 최소한 다음을 확인한다.
- 파일이 실제로 생성되었는가
- 서버가 응답하는가
- 브라우저에서 렌더링되는가
- 콘솔 오류가 없는가

## 3. Observe

관찰 단계는 실패 원인이 실제로 해결되었는지 확인하는 단계다.

### 관찰 항목
- 파일 생성 여부
- HTML 구조 오류
- CSS 반응형 문제
- JavaScript 실행 오류
- 로컬 웹서버 응답
- 브라우저 콘솔 오류
- 데스크톱 화면 표시
- 모바일 화면 표시
- 키보드 게임 조작
- 터치 게임 조작
- GitHub Pages 호환성

### 관찰 결과 해석
- 통과: 기대한 동작이 재현되고 오류가 없다.
- 실패: 하나의 근본 원인에 연결된 증상이 반복된다.
- 불명확: 외부 정보가 필요하거나 콘텐츠가 아직 확정되지 않았다면 [사람 확인 필요]로 전환한다.

## 4. Reason

실패 원인 분류 기준은 다음과 같다.

| 분류 | 의미 |
|---|---|
| `HTML_STRUCTURE` | 마크업 구조, 시맨틱 태그, 링크 구조 문제 |
| `CSS_RESPONSIVE` | 반응형 레이아웃, 미디어 쿼리, 화면 깨짐 문제 |
| `JAVASCRIPT` | 스크립트 문법, 런타임 오류, 이벤트 바인딩 문제 |
| `GAME_LOGIC` | 지렁이 이동, 충돌, 점수, 상태 전환 로직 문제 |
| `GAME_CONTROL` | 키보드, 터치, 입력 잠금, 포커스 문제 |
| `CONTENT` | 이름, 소개, 경력, 프로젝트, 문구 불명확 또는 누락 |
| `TEST` | 검증 명령어, 검증 절차, 재현 조건 부족 |
| `ENVIRONMENT` | 로컬 서버, 브라우저, 경로, 파일 시스템 문제 |
| `GITHUB_PERMISSION` | GitHub 인증, 권한, 토큰, 저장소 접근 문제 |
| `DEPLOYMENT` | GitHub Pages 설정, 배포 경로, 빌드 산출물 문제 |
| `UNKNOWN` | 위 분류로 명확히 나눌 수 없는 문제 |

### 분류 규칙
- 증상이 여러 개인 경우에도 가장 먼저 의심되는 원인 하나만 고른다.
- 하나의 루프에서는 하나의 실패 원인만 수정한다.
- 원인이 불명확하면 `UNKNOWN`으로 두고 추가 관찰을 먼저 수행한다.

## 5. Repeat

반복 규칙은 다음과 같다.
- 한 번에 하나의 실패 원인만 수정한다.
- 관련된 최소 파일만 변경한다.
- 수정 후에는 동일한 Verifier를 다시 실행한다.
- 통과한 기능은 회귀 테스트로 다시 확인한다.
- 동일 오류 fingerprint가 반복되면 무한 수정 대신 정지 조건을 검토한다.

### 회귀 테스트 원칙
- 이미 통과한 반응형 레이아웃을 다시 깨지 않았는지 확인한다.
- 이미 통과한 게임 입력 방식이 유지되는지 확인한다.
- 이미 통과한 GitHub Pages 호환성 가정을 깨지 않았는지 확인한다.

## 6. Stop

다음 중 하나면 루프를 멈춘다.
- 전체 테스트가 통과한 경우
- 최대 Retry에 도달한 경우
- 동일한 오류 fingerprint가 2회 반복된 경우
- 개인정보나 콘텐츠 확인이 필요한 경우
- GitHub 인증 또는 배포 권한 문제가 발생한 경우

정지 시에는 원인, 마지막 성공 상태, 다음에 필요한 입력을 기록한다.

## 7. Human-in-the-loop

다음 상황에서는 사람 확인이 필요하다.
- 이름, 소개, 경력, 프로젝트 등 개인 콘텐츠가 불명확한 경우
- 기존 콘텐츠 삭제가 필요한 경우
- 외부 분석 도구나 외부 서비스를 추가해야 하는 경우
- GitHub 저장소 설정을 변경해야 하는 경우
- 요구사항이 충돌하는 경우
- [사람 확인 필요] 추가 게임 기능의 범위가 확정되지 않은 경우

---

## 상태 정의

| 상태 | 의미 |
|---|---|
| `READY` | 시작 가능, 입력이 충분하고 아직 작업 전 |
| `ACTING` | 현재 파일 수정 또는 구현 작업 중 |
| `VERIFYING` | 로컬 검증과 브라우저 확인을 수행 중 |
| `RETRYING` | 실패 원인을 수정하고 다시 검증하는 중 |
| `PASSED` | 해당 루프의 검증이 통과함 |
| `DEPLOY_READY` | 배포 전 최종 검증이 끝남 |
| `DEPLOYING` | GitHub Pages 배포를 수행 중 |
| `DEPLOYED` | 배포 완료 및 원격 확인 완료 |
| `BLOCKED` | 환경, 권한, 정보 부족으로 진행 불가 |
| `HITL_REQUIRED` | 사람 입력이 있어야 다음 단계로 진행 가능 |

---

## 개발 루프별 상태 머신

아래 표는 전체 작업을 작은 루프로 나눈 실행 순서다. 각 행은 하나의 개발 루프를 뜻한다.

| 단계 | 입력 | Act | Observe | 출력 | 테스트 기준 | 다음 상태 |
|---|---|---|---|---|---|---|
| 저장소 및 기존 파일 확인 | 현재 저장소 구조, 기존 파일, README, Git 상태 | 루트 파일과 기존 문서를 확인하고 작업 범위를 파악한다 | 정적 사이트인지, 기존 프레임워크가 있는지, 충돌 파일이 있는지 확인 | 작업 범위 요약, 초기 제약 조건 | 최소한 `index.html` 대상 여부와 기존 파일 충돌 여부를 알 수 있어야 함 | `READY` 또는 `HITL_REQUIRED` |
| 정적 사이트 기본 구조 | 사이트 맵 초안, 필수 섹션 목록 | `index.html`, `styles.css`, `script.js`의 기본 골격을 만든다 | HTML 렌더링, 링크, 기본 스타일, 스크립트 로딩 확인 | 정적 페이지 뼈대 | 루트 파일 3종이 존재하고 브라우저에서 열림 | `VERIFYING` |
| 프로페셔널 콘텐츠 영역 | [사람 확인 필요] 이름, 소개, 경력, 프로젝트, 연락처 | 소개, 경력, 프로젝트, 연락처 섹션을 채운다 | 콘텐츠가 읽히고 누락이 없는지 확인 | 완성된 프로필 콘텐츠 영역 | 데스크톱/모바일에서 핵심 정보가 잘 보임 | `VERIFYING` 또는 `HITL_REQUIRED` |
| 반응형 내비게이션 | 메뉴 항목, 이동 대상, 모바일 기준폭 | 상단 내비게이션과 모바일 메뉴 구조를 만든다 | 탭 이동, 포커스, 모바일에서 메뉴 접근성 확인 | 반응형 네비게이션 | 320px, 768px, 데스크톱에서 메뉴 사용 가능 | `VERIFYING` |
| Games 탭 | `Games` 탭 위치, 이동 방식, 게임 영역 | `Games` 탭을 추가하고 게임 섹션으로 연결한다 | 탭 전환, 링크 동작, 현재 위치 표시 확인 | Games 진입점 | 키보드/터치로 진입 가능하고 링크가 깨지지 않음 | `VERIFYING` |
| 지렁이 게임 핵심 로직 | 게임 규칙, 맵 크기, 점수 규칙, 실패 조건 | 이동, 먹이 생성, 충돌, 점수, 게임 오버를 구현한다 | 콘솔 오류, 게임 상태 전환, 점수 변화 확인 | 동작하는 게임 MVP | 게임이 시작/진행/종료 상태를 순환함 | `VERIFYING` |
| 키보드 조작 | 방향키 또는 WASD 규칙 | 키보드 이벤트와 이동 제한을 연결한다 | 입력 반응, 반대 방향 방지, 재시작 여부 확인 | 키보드 플레이 가능 상태 | 방향키 입력에 즉시 반응하고 충돌이 정상 처리됨 | `VERIFYING` |
| 모바일 터치 조작 | 모바일 기기, 터치 패턴, 화면 폭 | 버튼형 또는 스와이프형 조작을 추가한다 | 터치 오작동, 포커스 문제, 세로 화면 적합성 확인 | 터치 플레이 가능 상태 | 모바일에서 손가락 조작으로 게임이 진행됨 | `VERIFYING` |
| 게임 UI 및 점수 | 점수판, 상태 표시, 재시작 문구 | 점수, 게임 오버, 재시작 안내, 피드백을 다듬는다 | 가독성, 상태 인지성, 버튼 위치 확인 | 개선된 게임 UI | 점수와 상태가 명확하고 다시 시작할 수 있음 | `VERIFYING` |
| 접근성과 반응형 검증 | 완성된 UI, 브라우저별 확인 대상 | 접근성, 대비, 탭 순서, 반응형 레이아웃을 점검한다 | 브라우저 콘솔, 화면 깨짐, 조작성 확인 | 검증 리포트 | 주요 화면 폭과 입력 방식에서 문제 없음 | `PASSED` 또는 `RETRYING` |
| GitHub Pages 호환성 검증 | 최종 정적 파일 세트 | 상대 경로, 정적 자산, 배포 제약을 다시 점검한다 | 페이지가 서버 없이 동작하는지, 404 없는지 확인 | 배포 가능 상태 | GitHub Pages에서 그대로 동작할 가능성이 높음 | `DEPLOY_READY` 또는 `HITL_REQUIRED` |
| 배포 | 인증 상태, 저장소 설정, 배포 브랜치 | GitHub Pages로 배포한다 | 원격 URL 접근, 캐시, 배포 반영 확인 | 배포 완료 결과 | 배포 주소에서 사이트가 열림 | `DEPLOYED` 또는 `BLOCKED` |

---

## 상태 전이 규칙

### 기본 흐름
`READY` -> `ACTING` -> `VERIFYING` -> `PASSED`

### 실패 흐름
`VERIFYING` -> `RETRYING` -> `ACTING`

### 사람 확인 흐름
`VERIFYING` 또는 `ACTING` -> `HITL_REQUIRED`

### 배포 흐름
`PASSED` -> `DEPLOY_READY` -> `DEPLOYING` -> `DEPLOYED`

### 차단 흐름
`VERIFYING` 또는 `DEPLOYING` -> `BLOCKED`

---

## 권장 실행 순서

1. 저장소 및 기존 파일 확인
2. 정적 사이트 기본 구조
3. 프로페셔널 콘텐츠 영역
4. 반응형 내비게이션
5. Games 탭
6. 지렁이 게임 핵심 로직
7. 키보드 조작
8. 모바일 터치 조작
9. 게임 UI 및 점수
10. 접근성과 반응형 검증
11. GitHub Pages 호환성 검증
12. 배포

---

## Step 1에서 파생되는 게임 확장 규칙

`[게임 추가 기능:]`이 Step 1 문서에 존재한다면 아래 원칙으로 반영한다.
- 해당 기능은 반드시 `지렁이 게임 핵심 로직` 이후의 확장 항목으로 넣는다.
- 추가 기능이 게임 조작, 점수, 상태, 렌더링 중 어디에 영향을 주는지 먼저 분류한다.
- 여러 기능이 섞여 있으면 한 기능씩 분리해 별도 루프로 수행한다.
- 범위가 불명확하면 [사람 확인 필요]로 전환한다.

---

## 최종 판단 규칙

이 AORR 상태 머신의 목적은 다음 두 가지다.
- 구현을 작은 루프로 나눠 실패를 조기에 발견하는 것
- 정적 웹사이트와 게임 기능을 GitHub Pages 제약 안에서 안전하게 완성하는 것

따라서 매 루프마다 다음 질문에 답해야 한다.
1. 지금 수정한 실패 원인은 하나인가?
2. 수정한 파일이 최소 범위인가?
3. 같은 검증을 다시 실행했는가?
4. 통과한 기능을 회귀 확인했는가?
5. 사람 확인이 필요한 정보가 남아 있지 않은가?
## Self-Correcting TDD Loop

이 섹션은 정적 GitHub Pages 웹사이트를 위한 Verifier 중심 자기수정 루프를 정의한다.

### 현재 환경에서 확인된 검증 도구

| 도구 | 상태 | 용도 | 비고 |
|---|---|---|---|
| `python` | 사용 가능 | 로컬 정적 서버, 파일 존재/경로 검사, HTML 구조 검사 보조 | 기본 Verifier로 사용 |
| `python3` | 사용 가능하나 WindowsApps 경유 | 대체 실행 경로 | `python` 우선 사용 |
| `curl` | 사용 가능 | 간단한 HTTP 응답 확인 보조 | PowerShell 환경에서는 alias일 수 있음 |
| `claude` CLI | 감지되지 않음 | 독립 Verifier 후보 | 현재 환경에서는 Sonnet 5 사용 가능 여부를 확인할 수 없음 |
| `git` CLI | 감지되지 않음 | 저장소 상태/변경 검증 보조 | `.git` 폴더는 있으나 실행 파일은 확인되지 않음 |
| `node` / `npm` / `npx` | 감지되지 않음 | JS/정적 검사 보조 | 현재 루프에서는 사용하지 않음 |
| 브라우저 제어 | 사용 가능 여부는 세션 도구에 따름 | viewport, 콘솔, 입력, 화면 검증 | 가능하면 독립 Verifier로 사용 |

### Claude Code CLI 판정

- 현재 환경에서 `claude` 실행 파일이 감지되지 않았다.
- 따라서 Sonnet 5 사용 가능 여부를 실제로 확인하지 못했다.
- 현재 단계에서는 실제 모델명을 기록할 수 없으므로 `[사람 확인 필요]`로 둔다.
- 이후 `claude`가 설치되면 `claude --version`과 설치 안내 문서에 따라 사용 가능 모델을 다시 확인한다.

### Verifier 우선순위

1. 파일/경로/정적 참조 검증은 `python` 기반 스크립트로 수행한다.
2. 로컬 HTTP 응답과 정적 서빙은 `python -m http.server` 또는 `python3 -m http.server`로 수행한다.
3. 브라우저 렌더링, viewport, 콘솔, 게임 입력은 브라우저 제어 도구가 있으면 그 도구로 검증한다.
4. `claude` CLI가 존재하고 로그인/모델 사용이 확인되면 독립 Verifier로 추가한다.
5. `git`/`node`/`npm`/`npx`는 현재 환경에서 전제하지 않는다.

### Self-Correcting TDD 상태 흐름

`READY` -> `ACTING` -> `VERIFYING` -> `RETRYING` -> `ACTING`

통과 시:

`VERIFYING` -> `PASSED`

배포 직전:

`PASSED` -> `DEPLOY_READY`

배포 중:

`DEPLOY_READY` -> `DEPLOYING` -> `DEPLOYED`

중단 시:

`VERIFYING` -> `BLOCKED`
`VERIFYING` -> `HITL_REQUIRED`

### TDD 루프 원칙

- 먼저 실패를 재현할 수 있는 Verifier를 정한다.
- 한 Retry에서는 하나의 원인만 수정한다.
- 실패를 고치기 전에 테스트 기준을 완화하지 않는다.
- 전체 사이트를 다시 쓰지 않는다.
- 이미 통과한 기능은 반드시 회귀 확인한다.
- 환경/권한 문제는 코드로 억지 해결하지 않는다.

### 루프 단계 정의

| 단계 | 입력 | Act | Observe | 출력 | 테스트 기준 | 다음 상태 |
|---|---|---|---|---|---|---|
| Preflight | 현재 파일 목록, 검증 도구 존재 여부 | `python`, `python3`, `curl`, `claude` CLI, 브라우저 도구 존재 여부를 확인한다 | 실제 실행 가능한 도구만 남는지 확인한다 | 사용 가능한 Verifier 목록 | 없는 도구를 테스트 계획에 넣지 않음 | `READY` 또는 `HITL_REQUIRED` |
| File Check | 루트 파일 세트, 상대 경로 규칙 | `index.html`, `styles.css`, `script.js` 존재 및 연결을 점검한다 | 잘못된 절대 경로, 대소문자 불일치, 누락 파일을 찾는다 | 기본 파일 검증 결과 | 루트 파일 존재와 연결 경로가 일치해야 함 | `VERIFYING` |
| HTML Check | `index.html` | 기본 문서 구조, `title`, `meta viewport`, 시맨틱 태그, 내비게이션, `Games` 영역, `alt` 속성, 내부 링크를 점검한다 | 깨진 링크, 누락된 영역, 구조 이상을 찾는다 | HTML 검증 결과 | 필수 섹션과 링크가 존재해야 함 | `VERIFYING` |
| CSS Check | `styles.css`, HTML 렌더링 | 데스크톱, 태블릿, 모바일 폭에서 레이아웃을 점검한다 | 가로 스크롤, 내비게이션 반응형, `Games` UI 반응형을 확인한다 | CSS 검증 결과 | 375px, 768px, 1440px에서 핵심 UI가 유지되어야 함 | `VERIFYING` |
| JS Check | `script.js` 및 게임 JS | 문법, DOM null 참조, 중복 이벤트, 로드 시 오류를 점검한다 | 브라우저 콘솔 오류와 로드 실패를 수집한다 | JavaScript 검증 결과 | 콘솔 오류 없이 페이지 로드가 완료되어야 함 | `VERIFYING` |
| Game Check | 게임 코드, UI, 입력 장치 | 게임 시작, 일시정지, 다시 시작, 점수, 음식 생성, 충돌, 입력 제어를 검증한다 | 키보드, 터치, 반대 방향 방지, 중복 실행 여부를 확인한다 | 지렁이 게임 검증 결과 | 게임이 의도한 입력 방식으로 끝까지 진행되어야 함 | `VERIFYING` |
| Local Server Check | 정적 파일 세트 | 로컬 정적 서버를 띄우고 HTTP 응답을 확인한다 | `index.html`, CSS, JS가 정상 응답하는지 확인한다 | 서버 응답 검증 결과 | 로컬에서 사이트가 정상 로드되어야 함 | `VERIFYING` |
| Browser Check | 로컬 서버 URL, viewport | 모바일 약 375px, 태블릿 약 768px, 데스크톱 약 1440px으로 확인한다 | 화면 깨짐, 콘솔 오류, 입력 동작을 확인한다 | 브라우저 검증 결과 | 세 viewport 모두에서 레이아웃과 조작이 유지되어야 함 | `PASSED` 또는 `RETRYING` |
| GitHub Pages Check | 최종 정적 파일 세트 | 루트 `index.html`, 상대 경로, 서버 전용 기능 미사용 여부를 점검한다 | 로컬 파일 시스템 의존성, 백엔드 의존성, 비호환 API 사용을 찾는다 | GitHub Pages 호환성 결과 | GitHub Pages에서 그대로 동작 가능해야 함 | `DEPLOY_READY` 또는 `HITL_REQUIRED` |

### 실패 로그 수집 형식

실패가 나면 아래 항목을 모두 기록한다.

- 실행 명령어
- exit code
- 실패한 검증 항목
- 핵심 오류 메시지
- 관련 파일과 라인
- 브라우저 콘솔 메시지
- 오류 fingerprint

### 오류 fingerprint 규칙

fingerprint는 같은 실패를 다시 식별할 수 있어야 한다.

권장 구성:
- 검증 단계 이름
- 실패 분류
- 핵심 오류 메시지 앞부분
- 관련 파일
- 근접 라인 번호
- 브라우저 콘솔의 첫 번째 치명 오류 문구

예시 구조:

`HTML_STRUCTURE|missing viewport|index.html:12|console:none`

### Retry 정책

- 하나의 오류에 대해 최대 3회만 Retry한다.
- 동일 오류 fingerprint가 2회 반복되면 즉시 중지한다.
- 각 Retry는 가설 1개, 변경 파일 1세트, 검증 명령어 1세트로 제한한다.
- 수정 후에는 같은 Verifier를 다시 실행한다.
- 이미 통과한 항목은 회귀 테스트로만 다시 확인한다.

### 실패 원인 분류

| 분류 | 판정 기준 |
|---|---|
| `HTML_STRUCTURE` | 잘못된 문서 구조, 누락 태그, 잘못된 링크 구조 |
| `CSS_RESPONSIVE` | 화면 폭에 따른 깨짐, 가로 스크롤, 레이아웃 붕괴 |
| `JAVASCRIPT` | 문법 오류, 로드 시 예외, DOM 접근 실패 |
| `GAME_LOGIC` | 점수, 이동, 충돌, 상태 전환의 규칙 오류 |
| `GAME_CONTROL` | 키보드/터치 입력 반응 실패, 반대 방향 방지 실패 |
| `CONTENT` | 이름, 소개, 경력, 프로젝트 콘텐츠 불명확 |
| `TEST` | 검증 절차 자체가 부족하거나 재현이 불가능 |
| `ENVIRONMENT` | 로컬 서버, 경로, 브라우저, 파일 시스템 문제 |
| `GITHUB_PERMISSION` | 토큰, 인증, 저장소 접근, 권한 문제 |
| `DEPLOYMENT` | GitHub Pages 설정, 경로, 호스팅 호환 문제 |
| `UNKNOWN` | 위 분류로 단정할 수 없는 경우 |

### Minimal Fix 원칙

- 한 Retry에서는 하나의 원인만 수정한다.
- 관련 파일만 수정한다.
- 테스트 삭제 또는 검증 기준 완화는 금지한다.
- 전체 사이트의 불필요한 재작성은 금지한다.
- 이미 통과한 기능을 깨뜨리는 수정은 금지한다.
- 외부 프레임워크로 임의 전환하지 않는다.

### Stop 조건

다음 중 하나면 즉시 중지한다.

- 전체 테스트가 통과한 경우
- 최대 Retry에 도달한 경우
- 동일 오류 fingerprint가 2회 반복된 경우
- 개인정보나 콘텐츠 확인이 필요한 경우
- GitHub 인증 또는 배포 권한 문제가 발생한 경우

### 권장 순서

1. 파일/경로 검증
2. HTML 구조 검증
3. CSS 반응형 검증
4. JavaScript 로드/콘솔 검증
5. 지렁이 게임 입력/로직 검증
6. 로컬 서버 검증
7. 브라우저 viewport 검증
8. GitHub Pages 호환성 검증
9. 배포 준비

### 결과 판정

- `PASSED`: 현재 단계와 회귀 범위가 모두 통과했다.
- `RETRYING`: 하나의 원인을 수정한 뒤 같은 Verifier를 다시 돌린다.
- `HITL_REQUIRED`: 이름, 소개, 경력, 프로젝트, 게임 추가 기능, 배포 설정처럼 사람 판단이 필요한 정보가 남았다.
- `BLOCKED`: 환경/권한 제약으로 더 이상 자동 진행이 불가하다.
## Change Request Loop Plan

- Change Request ID: `CRQ-20260714-01`
- Request state: `CHANGE_PLANNED`
- Baseline commit: `3e23686`
- Baseline URL: `https://hyejishin07.github.io`

### Loop CR-001

| Field | Value |
|---|---|
| Connected Change Item | CR-001 |
| Target | Make the snake game grid fill the entire board |
| Act | Inspect the board rendering path and fix the minimal rendering bug |
| Observe | Grid coverage, console errors, board sizing, existing controls |
| Reason | `BUG`, `GAME_EFFECT` |
| Verifier | Local static server plus browser visual check |
| Repeat | One cause per retry, max 3 retries |
| Stop | Passed, repeated fingerprint, or HITL need |
| HITL | Only if board size or visual density is unclear |
| State | `READY` |

### Loop CR-002

| Field | Value |
|---|---|
| Connected Change Item | CR-002 |
| Target | Define and implement About editing with image uploads |
| Act | Choose the static editing and persistence model before implementation |
| Observe | Whether text and images can persist on GitHub Pages |
| Reason | `CONTENT`, `NEW_FEATURE` |
| Verifier | Local static server, browser check, GitHub Pages compatibility review |
| Repeat | One cause per retry, max 3 retries |
| Stop | Passed, repeated fingerprint, or HITL need |
| HITL | Content source, persistence model, file types, and size limits |
| State | `HITL_REQUIRED` |

### Loop CR-003

| Field | Value |
|---|---|
| Connected Change Item | CR-003 |
| Target | Define and implement Projects editing with attachments |
| Act | Add Projects-specific fields and attachment behavior |
| Observe | Editable content, attachment rendering, and layout regression |
| Reason | `CONTENT`, `NEW_FEATURE` |
| Verifier | Local static server and browser UI verification |
| Repeat | One cause per retry, max 3 retries |
| Stop | Passed, repeated fingerprint, or HITL need |
| HITL | Attachment source, file rules, persistence expectations |
| State | `HITL_REQUIRED` |

### Loop CR-004

| Field | Value |
|---|---|
| Connected Change Item | CR-004 |
| Target | Define and implement Experience editing with attachments |
| Act | Add Experience-specific fields and attachment behavior |
| Observe | Editable content, attachment rendering, and layout regression |
| Reason | `CONTENT`, `NEW_FEATURE` |
| Verifier | Local static server and browser UI verification |
| Repeat | One cause per retry, max 3 retries |
| Stop | Passed, repeated fingerprint, or HITL need |
| HITL | Attachment source, file rules, persistence expectations |
| State | `HITL_REQUIRED` |

### Loop CR-005

| Field | Value |
|---|---|
| Connected Change Item | CR-005 |
| Target | Define and implement Research editing with attachments |
| Act | Add Research-specific fields and attachment behavior |
| Observe | Editable content, attachment rendering, and layout regression |
| Reason | `CONTENT`, `NEW_FEATURE` |
| Verifier | Local static server and browser UI verification |
| Repeat | One cause per retry, max 3 retries |
| Stop | Passed, repeated fingerprint, or HITL need |
| HITL | Attachment source, file rules, persistence expectations |
| State | `HITL_REQUIRED` |

### Loop CR-006

| Field | Value |
|---|---|
| Connected Change Item | CR-006 |
| Target | Define and implement Contact text-only editing |
| Act | Add Contact text editing without upload controls |
| Observe | Content editing works and media controls are absent |
| Reason | `CONTENT`, `NEW_FEATURE` |
| Verifier | Local static server and browser UI verification |
| Repeat | One cause per retry, max 3 retries |
| Stop | Passed, repeated fingerprint, or HITL need |
| HITL | Exact editable Contact fields and authoring UX |
| State | `HITL_REQUIRED` |

### Execution Update

- `CR-001` status: `PASSED`
- Modified file: `script.js`
- Local verification: `index.html`, `styles.css`, and `script.js` returned HTTP 200
- Environment note: `node` CLI was unavailable for direct JS syntax checking

### Execution Update

- `CR-002` status: `PASSED`
- Scope: shared page editor for About, Projects, Experience, Research, and Contact
- Modified files: `index.html`, `styles.css`, `script.js`, `CHANGE_REQUEST.md`
- Verifier: PowerShell static server plus Node VM smoke tests
- Result: About text editing and image upload persisted correctly in the mock DOM smoke test; local HTTP responses were `200`
