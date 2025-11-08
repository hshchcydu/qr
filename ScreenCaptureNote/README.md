# Screen Capture Note App

macOS용 화면 캡처 및 텍스트 추출 노트 앱입니다. 화면의 특정 영역을 지속적으로 감시하여 텍스트를 자동으로 추출하고 노트로 정리합니다.

## 주요 기능

### 📸 화면 캡처
- 마우스 드래그로 캡처 영역 선택
- 반투명 플로팅 윈도우로 선택 영역 표시
- 드래그로 위치 이동 및 크기 조절 가능
- 투명도 조절 (10~90%)

### 🔍 텍스트 추출
- Vision Framework의 LiveText 기능 사용
- 한국어 및 영어 텍스트 인식
- 지정한 간격(0.5~5초)으로 자동 캡처

### 📝 스마트 단락 판정
- 추출된 텍스트를 지능적으로 단락 구분
- 10% 이상 변경 시 새로운 단락으로 판정
- 이어지는 내용은 자동으로 업데이트
- 동일한 내용은 무시

### ✏️ 마크다운 에디터
- 편집 모드와 미리보기 모드 지원
- 실시간 마크다운 렌더링 (macOS 12+)
- 텍스트 직접 편집 가능

### 💾 저장 및 관리
- 캡처된 텍스트를 파일로 저장
- 내용 삭제 및 새로운 캡처 준비

## 시스템 요구사항

- macOS 11.0 (Big Sur) 이상
- Xcode 13.0 이상 (빌드 시)
- 화면 녹화 권한 필요

## 프로젝트 구조

```
ScreenCaptureNote/
├── Sources/
│   ├── ScreenCaptureNoteApp.swift      # 앱 진입점
│   ├── ContentView.swift                # 메인 UI
│   ├── ScreenCaptureManager.swift       # 캡처 관리
│   ├── FloatingOverlayWindow.swift      # 플로팅 윈도우
│   ├── RegionSelectorWindow.swift       # 영역 선택 윈도우
│   ├── TextExtractor.swift              # Vision 텍스트 추출
│   ├── ParagraphDetector.swift          # 단락 판정 로직
│   └── MarkdownEditorView.swift         # 마크다운 에디터
└── Resources/
    └── Info.plist                       # 권한 설정
```

## Xcode에서 프로젝트 열기

### 방법 1: 새 Xcode 프로젝트 생성

1. Xcode를 열고 "Create a new Xcode project" 선택
2. macOS → App 선택
3. 다음 설정 사용:
   - Product Name: `ScreenCaptureNote`
   - Interface: `SwiftUI`
   - Language: `Swift`
   - Bundle Identifier: `com.yourname.ScreenCaptureNote`
4. 프로젝트를 생성할 위치 선택
5. 생성된 프로젝트의 Swift 파일들을 모두 삭제
6. 이 프로젝트의 `Sources/` 폴더에 있는 모든 `.swift` 파일을 Xcode 프로젝트에 드래그 앤 드롭
7. `Resources/Info.plist` 내용을 Xcode 프로젝트의 Info.plist에 병합

### 방법 2: Package.swift 사용 (Swift Package)

1. 터미널에서 프로젝트 디렉토리로 이동
2. Xcode에서 `Package.swift` 파일 열기 (아래 생성 필요)
3. Xcode가 자동으로 의존성 해결

## 빌드 및 실행

1. Xcode에서 프로젝트 열기
2. 타겟을 "My Mac"으로 설정
3. Product → Run (⌘R) 또는 재생 버튼 클릭
4. 첫 실행 시 화면 녹화 권한 요청 팝업 표시
5. 시스템 환경설정 → 보안 및 개인 정보 보호 → 화면 녹화에서 앱 권한 허용

## 사용 방법

### 1. 캡처 영역 선택
1. **"캡처 영역 선택"** 버튼 클릭
2. 마우스로 드래그하여 원하는 영역 선택
3. 선택한 영역이 반투명 파란색 박스로 표시됨
4. ESC 키로 취소 가능

### 2. 캡처 시작
1. 캡처 간격 조절 (0.5~5초)
2. 투명도 조절 (10~90%)
3. **"캡처 시작"** 버튼 클릭
4. 지정한 간격으로 자동으로 텍스트 추출 시작

### 3. 텍스트 편집
1. 하단의 에디터 영역에서 추출된 텍스트 확인
2. "편집" 모드에서 텍스트 수정 가능
3. "미리보기" 모드로 마크다운 렌더링 확인

### 4. 저장
1. **"저장"** 버튼 클릭
2. 저장 위치 및 파일명 지정
3. 텍스트 파일로 저장

## 권한 설정

앱이 처음 실행될 때 화면 녹화 권한을 요청합니다:

1. 시스템 대화상자에서 "시스템 환경설정 열기" 클릭
2. 보안 및 개인 정보 보호 → 개인 정보 보호 → 화면 녹화
3. ScreenCaptureNote 앱 옆의 체크박스 활성화
4. 앱 재시작

## 기술 스택

- **Swift**: 앱 개발 언어
- **SwiftUI**: UI 프레임워크
- **AppKit**: macOS 네이티브 윈도우 관리
- **Vision Framework**: 텍스트 인식 (LiveText)
- **CoreGraphics**: 화면 캡처

## 주의사항

- 화면 녹화 권한이 없으면 캡처가 작동하지 않습니다
- 일부 보안 앱이나 DRM 콘텐츠는 캡처되지 않을 수 있습니다
- 캡처 간격을 너무 짧게 설정하면 CPU 사용률이 높아질 수 있습니다

## 라이선스

MIT License

## 개발자

화면 캡처 노트 앱 - macOS Screen Capture & Text Extraction

## 버전

1.0.0 - 초기 릴리스
