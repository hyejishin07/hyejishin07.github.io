# CHANGE REQUEST

- Change Request ID: `CRQ-20260714-01`
- Status: `CHANGE_PLANNED`
- Baseline commit: `3e23686`
- Baseline deployment URL: `https://hyejishin07.github.io`

## Original User Request

> Step 7에서 배포된 GitHub Pages 웹사이트를 사용자가 검수한 뒤 수정 요청을 전달했어. 아래 사용자 요청을 특정 예시나 기능에 한정하지 말고 분석해.
> 버그 수정, UI/UX 개선, 반응형 문제, 성능 개선, 콘텐츠 변경, 문서 기반 콘텐츠 작성,
> 페이지 구조 변경, 게임 기능 추가, 접근성 개선, 배포 문제 등 어떤 형태의 요청도 처리할 수 있어야 해.
>
> 사용자 수정 요청:
> """
> 1. 지금 게임에서 모눈이 게임판을 전부 채우지 않고 중간에 끊기고 있어.
> 모눈이 게임판을 전부 채우도록 수정해줘
>
> 2. "About" 영역 내용을 내가 직접 작성하고 추후 수정할 수 있도록 해주고. 이미지도 업로드 할 수 있도록 수정해줘
>
> 3. "Projects", "Experience", "Research"영역도 동일하게 내가 직접 내용을 수정할 수 있도록 해주고 첨부파일도 넣을 수 있도록 해줘.
>
> 4. "Contact" 영역은 별다른 첨부파일이나 이미지 넣는 거 없이 내가 내용만 수정할 수 있도록 해줘
> """

## Reference Materials

- Attached request text file: `C:\Users\hyeji\.codex\attachments\ceb604ee-d03c-4206-9084-d3aa30ed41ce\pasted-text.txt`
- Current repository files: `index.html`, `styles.css`, `script.js`, `AORR.md`, `MEMORY.md`
- Current git baseline: `3e23686`
- Current deployment baseline: `https://hyejishin07.github.io`
- Current remote: `origin https://github.com/hyejishin07/hyejishin07.github.io.git`

## Change Item Summary

| ID | Summary | Classification | Risk | HITL |
|---|---|---|---|---|
| CR-001 | Fix the snake game grid so it fills the entire board | BUG, GAME_EFFECT | LOW | No |
| CR-002 | Make About user-editable and allow image uploads | CONTENT, NEW_FEATURE, DOCUMENT_BASED_CONTENT | HIGH | Yes |
| CR-003 | Make Projects user-editable and allow attachments | CONTENT, NEW_FEATURE, DOCUMENT_BASED_CONTENT | HIGH | Yes |
| CR-004 | Make Experience user-editable and allow attachments | CONTENT, NEW_FEATURE, DOCUMENT_BASED_CONTENT | HIGH | Yes |
| CR-005 | Make Research user-editable and allow attachments | CONTENT, NEW_FEATURE, DOCUMENT_BASED_CONTENT | HIGH | Yes |
| CR-006 | Make Contact content-editable only, with no attachments or images | CONTENT, NEW_FEATURE | MEDIUM | Yes |

## Atomic Change Items

### CR-001

- Request: fix the grid so it fills the whole board.
- Current behavior: the game grid is visibly interrupted before covering the full playable area.
- Expected behavior: the board grid spans the entire game board with no gaps.
- Reproduction: open the deployed site, open `Games`, and start the snake game.
- Target files: `script.js`, possibly `styles.css`.
- Risk: low.
- Completion: the grid covers the full board on desktop and mobile without new regressions.
- HITL: none unless board size or visual density needs confirmation.

### CR-002

- Request: About should be user-editable and support image uploads.
- Current behavior: About content is fixed in the static site.
- Expected behavior: About can be edited through the chosen static workflow, and images can be added.
- Reproduction: open the site and inspect the About section.
- Target files: `index.html`, `styles.css`, `script.js`, plus possibly a new data or asset file `[사람 확인 필요]`.
- Risk: high.
- Completion: About text and images can be updated and rendered correctly under the approved model.
- HITL: content source, persistence model, file types, size limits, and upload behavior.

### CR-003

- Request: Projects should be user-editable and support attachments.
- Current behavior: Projects content is fixed in the static site.
- Expected behavior: Projects can be edited through the chosen static workflow, and attachments can be added.
- Reproduction: open the site and inspect the Projects section.
- Target files: `index.html`, `styles.css`, `script.js`, plus possibly a new data or asset file `[사람 확인 필요]`.
- Risk: high.
- Completion: Projects text and attachments can be updated and rendered correctly under the approved model.
- HITL: attachment source, file rules, storage location, and persistence expectations.

### CR-004

- Request: Experience should be user-editable and support attachments.
- Current behavior: Experience content is fixed in the static site.
- Expected behavior: Experience can be edited through the chosen static workflow, and attachments can be added.
- Reproduction: open the site and inspect the Experience section.
- Target files: `index.html`, `styles.css`, `script.js`, plus possibly a new data or asset file `[사람 확인 필요]`.
- Risk: high.
- Completion: Experience text and attachments can be updated and rendered correctly under the approved model.
- HITL: attachment source, file rules, storage location, and persistence expectations.

### CR-005

- Request: Research should be user-editable and support attachments.
- Current behavior: Research content is fixed in the static site.
- Expected behavior: Research can be edited through the chosen static workflow, and attachments can be added.
- Reproduction: open the site and inspect the Research section.
- Target files: `index.html`, `styles.css`, `script.js`, plus possibly a new data or asset file `[사람 확인 필요]`.
- Risk: high.
- Completion: Research text and attachments can be updated and rendered correctly under the approved model.
- HITL: attachment source, file rules, storage location, and persistence expectations.

### CR-006

- Request: Contact should be content-editable only, with no attachments or images.
- Current behavior: Contact content is fixed in the static site.
- Expected behavior: Contact can be edited as text only, with no image or attachment controls.
- Reproduction: open the site and inspect the Contact section.
- Target files: `index.html`, `styles.css`, `script.js`.
- Risk: medium.
- Completion: Contact text can be updated and no attachment/image UI is present.
- HITL: exact editable Contact fields and authoring UX.

## Execution Order

1. CR-001
2. CR-002
3. CR-003
4. CR-004
5. CR-005
6. CR-006

## Validation Plan

| ID | Pre-change verification | Post-change verification | Regression focus |
|---|---|---|---|
| CR-001 | Reproduce the broken grid in the deployed game board | Confirm the grid fills the entire board | Existing game controls, score, restart |
| CR-002 | Confirm About is fixed content only | Confirm About can be edited and images can be added | Navigation, layout, page load, relative paths |
| CR-003 | Confirm Projects is fixed content only | Confirm Projects can be edited and attachments can be added | About, Experience, Research, layout |
| CR-004 | Confirm Experience is fixed content only | Confirm Experience can be edited and attachments can be added | About, Projects, Research, layout |
| CR-005 | Confirm Research is fixed content only | Confirm Research can be edited and attachments can be added | About, Projects, Experience, layout |
| CR-006 | Confirm Contact is fixed content only | Confirm Contact can be edited with no attachments/images | All other content sections, navigation |

## Loop Plan

- L-001: CR-001, state `READY`
- L-002: CR-002, state `HITL_REQUIRED`
- L-003: CR-003, state `HITL_REQUIRED`
- L-004: CR-004, state `HITL_REQUIRED`
- L-005: CR-005, state `HITL_REQUIRED`
- L-006: CR-006, state `HITL_REQUIRED`

## Overall State

- Current request state: `CHANGE_PLANNED`
- Known blocker: content storage and upload semantics are not yet specified
- No website code has been changed in this step
