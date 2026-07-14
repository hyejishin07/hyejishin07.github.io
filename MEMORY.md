# MEMORY

프로페셔널 웹사이트 개발 루프의 상태와 가드레일을 관리하는 메모리 문서다.

## Goal

- GitHub Pages용 프로페셔널 웹사이트 완성
- 반응형 데스크톱 및 모바일 지원
- `Games` 탭 구현
- 키보드와 모바일 터치로 조작 가능한 지렁이 게임 구현
- GitHub Pages 최초 배포
- Step 1의 `[게임 추가 기능:]` 반영

## Required Deliverables

- 프로젝트 루트의 `index.html`
- `styles.css`
- `script.js`
- 필요한 경우 별도 `game.js`
- 필요한 이미지 및 정적 assets
- `AORR.md`
- `MEMORY.md`

## Current Scope

- 정적 HTML, CSS, JavaScript
- 프로페셔널 웹사이트 콘텐츠
- 반응형 레이아웃
- `Games` 탭
- 지렁이 게임
- GitHub Pages 배포

## Out of Scope

- 백엔드 서버
- 데이터베이스
- 로그인 및 회원가입
- 결제
- 사용자 개인정보 수집
- 별도 승인 없는 외부 API
- 별도 승인 없는 프레임워크 전환

## Current State

| 항목 | 값 |
|---|---|
| 현재 상태 | `DEPLOYED` |
| 완료한 루프 | 정적 사이트 기본 구조 생성 1회, 프로페셔널 섹션 구조 확장 1회 |
| 다음 루프 | `Games` 영역 구체화 또는 지렁이 게임 핵심 로직 |
| 현재 Retry 횟수 | 0 |
| 현재 오류 fingerprint | 없음 |
| Blocker | 없음 |
| 마지막 정상 상태 | GitHub Pages에서 `https://hyejishin07.github.io` HTTP 200 확인 |

## Guardrails

- 기존 개인 콘텐츠 임의 삭제 금지
- 확인되지 않은 경력이나 프로젝트 정보 생성 금지
- 테스트 삭제 또는 완화 금지
- 토큰 출력 금지
- 토큰을 HTML, CSS, JavaScript에 저장 금지
- 토큰을 Git에 커밋 금지
- `github_token.txt` 커밋 금지
- `env_settings.txt` 커밋 금지
- 백엔드 기능 추가 금지
- 대규모 리팩토링 금지
- 테스트를 통과시키기 위한 기능 제거 금지

## Acceptance Criteria

- 루트 `index.html` 존재
- 로컬 정적 서버에서 정상 로드
- CSS와 JavaScript 정상 로드
- 콘솔 오류 없음
- 모바일 및 데스크톱에서 레이아웃 정상
- `Games` 탭 정상 이동
- 지렁이 게임 정상 실행
- 키보드 조작 정상
- 모바일 터치 조작 정상
- 점수 및 재시작 정상
- GitHub Pages에서 HTTP 200 응답
- 배포된 사이트에서도 동일 기능 정상

## Retry Policy

- 하나의 오류당 최대 3회
- 동일 오류 fingerprint 2회 반복 시 중지
- 한 번의 Retry에서 하나의 원인만 수정
- Retry마다 동일 Verifier 재실행

## HITL Conditions

- 개인 프로필 내용 불명확
- 기존 콘텐츠 삭제 필요
- 요구사항 충돌
- GitHub 저장소 권한 부족
- GitHub Pages 설정 변경 필요
- 외부 서비스 추가 필요
- Retry 한계 도달

## Tool Policy

- Codex는 작업 제어, 파일 수정, 테스트 실행 담당
- 가능하면 Claude Code CLI를 독립 Verifier로 사용
- 실제 사용한 Claude 모델명 기록
- 토큰 값은 어떠한 실행 기록에도 남기지 않음

## Repository Notes

- 현재 저장소에는 정적 웹사이트 본문 파일이 아직 없다.
- 현재 확인된 루트 파일은 `README.md`, `.gitignore`, `github_token.txt`, `AORR.md`, `claude-code-cli/`이다.
- `claude` CLI는 현재 환경에서 감지되지 않았다.
- `python`은 사용 가능하고, `python3`는 WindowsApps 경유 항목으로 확인되었다.

## Execution Records

### Loop ID
- `loop-1-basic-static-shell`

### Loop ID
- `loop-2-profile-structure-expand`

### 시작 시각
- 2026-07-14

### 시작 시각
- 2026-07-14 14:24:48

### 목표
- GitHub Pages에서 실행 가능한 정적 웹사이트의 가장 안전한 기본 구조 만들기

### 목표
- 기존 골격 위에 프로페셔널 섹션 구조를 안전하게 확장하기

### 시작 상태
- `READY`

### 시작 상태
- `PASSED`

### 가설
- 루트 `index.html`, `styles.css`, `script.js`를 최소 구조로 연결하면 GitHub Pages 호환 정적 사이트의 안전한 시작점이 된다.

### 가설
- 기존 기본 구조를 유지한 채 `Experience`, `Research`, `Contact` 섹션과 내비게이션만 추가하면 콘텐츠 확장에 안전한 중간 상태를 만들 수 있다.

### Act
- `index.html`, `styles.css`, `script.js` 생성

### Act
- `index.html`에 `Experience`, `Research`, `Contact` 섹션 및 내비게이션 항목 추가

### 변경 파일
- `index.html`
- `styles.css`
- `script.js`
- `MEMORY.md`

### 변경 파일
- `index.html`
- `MEMORY.md`

### Verifier
- PowerShell 기반 파일 존재 및 정적 문자열 검사
- `python -m http.server 8000 --bind 127.0.0.1`
- `Invoke-WebRequest http://127.0.0.1:8000/`

### Verifier
- PowerShell 기반 파일 존재 및 정적 문자열 검사
- `python -m http.server 8000 --bind 127.0.0.1`
- `Invoke-WebRequest http://127.0.0.1:8000/`

### 테스트 결과
- `index.html` 존재 확인 완료
- CSS 연결 확인 완료
- JavaScript 연결 확인 완료
- `Games` 영역 존재 확인 완료
- 로컬 HTTP 응답 `200` 확인 완료
- 브라우저 자동화 도구는 현재 사용하지 못해 시각적 viewport 검증은 구조 기반으로만 확인함

### 테스트 결과
- `Experience`, `Research`, `Contact` 섹션 추가 확인 완료
- 내비게이션 앵커 추가 확인 완료
- 로컬 HTTP 응답 `200` 확인 완료
- 브라우저 자동화 도구는 현재 사용하지 못해 시각적 viewport 검증은 구조 기반으로만 확인함

### exit code
- 파일 검사: `OK`
- HTTP 응답: `200`

### exit code
- 파일 검사: `OK`
- HTTP 응답: `200`

### 오류 fingerprint
- 없음

### 오류 fingerprint
- 없음

### Retry 횟수
- 0

### Retry 횟수
- 0

### 종료 상태
- `PASSED`

### 종료 상태
- `PASSED`

### 다음 작업
- 프로페셔널 콘텐츠 채우기 또는 Games 탭/지렁이 게임 확장

### 다음 작업
- `Games` 영역 구체화 또는 지렁이 게임 핵심 로직

### 사람 확인 필요 항목
- 프로필 이름, 소개, 경력, 프로젝트의 실제 내용
- Claude Code CLI 및 Sonnet 모델 사용 가능 여부

## Deployment Log

- 배포 대상: `hyejishin07.github.io`
- 결과: `DEPLOYED`
- 확인: `https://hyejishin07.github.io` HTTP 200

### 사람 확인 필요 항목
- 프로필 이름, 소개, 경력, 프로젝트의 실제 내용
- Claude Code CLI 및 Sonnet 모델 사용 가능 여부

## Execution Log Template

### Loop ID
- 

### 시작 시각
- 

### 목표
- 

### 시작 상태
- 

### 가설
- 

### Act
- 

### 변경 파일
- 

### Verifier
- 

### 테스트 결과
- 

### exit code
- 

### 오류 fingerprint
- 

### Retry 횟수
- 

### 종료 상태
- 

### 다음 작업
- 

### 사람 확인 필요 항목
- 
