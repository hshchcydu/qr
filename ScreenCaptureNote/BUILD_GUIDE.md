# 빌드 가이드

## Xcode에서 프로젝트 생성 및 빌드하기

이 프로젝트는 소스 코드로 제공되며, Xcode에서 직접 프로젝트를 생성하여 빌드해야 합니다.

### 단계별 가이드

#### 1. Xcode 프로젝트 생성

1. **Xcode 실행**
2. **File → New → Project...** 선택
3. **macOS** 탭 선택 → **App** 템플릿 선택 → **Next**
4. 프로젝트 설정:
   - **Product Name**: `ScreenCaptureNote`
   - **Team**: (선택 사항)
   - **Organization Identifier**: `com.yourname` (본인의 식별자)
   - **Interface**: `SwiftUI`
   - **Language**: `Swift`
   - **Use Core Data**: 체크 해제
   - **Include Tests**: 체크 해제
5. **Next** → 프로젝트를 저장할 위치 선택 (이 프로젝트 외부)
6. **Create** 클릭

#### 2. 소스 파일 추가

1. Xcode 프로젝트 네비게이터에서 생성된 기본 파일들(`ContentView.swift`, `ScreenCaptureNoteApp.swift`) 삭제
2. 이 프로젝트의 `Sources/` 폴더를 열기
3. 모든 `.swift` 파일을 선택하여 Xcode 프로젝트로 드래그 앤 드롭
4. 나타나는 대화상자에서:
   - ☑️ **Copy items if needed** 체크
   - ☑️ **Create groups** 선택
   - ☑️ **Add to targets: ScreenCaptureNote** 체크
5. **Finish** 클릭

파일 목록:
```
✓ ScreenCaptureNoteApp.swift
✓ ContentView.swift
✓ ScreenCaptureManager.swift
✓ FloatingOverlayWindow.swift
✓ RegionSelectorWindow.swift
✓ TextExtractor.swift
✓ ParagraphDetector.swift
✓ MarkdownEditorView.swift
```

#### 3. Info.plist 설정

1. Xcode에서 프로젝트 네비게이터의 최상단 프로젝트 아이콘 클릭
2. **TARGETS** → **ScreenCaptureNote** 선택
3. **Info** 탭 선택
4. **Custom macOS Application Target Properties** 섹션에서 다음 키 추가:

   | Key | Type | Value |
   |-----|------|-------|
   | `NSScreenCaptureDescription` | String | `이 앱은 화면의 특정 영역을 캡처하여 텍스트를 추출합니다.` |
   | `NSScreenCaptureUsageDescription` | String | `화면 영역을 캡처하여 텍스트를 추출하기 위해 화면 녹화 권한이 필요합니다.` |

   추가 방법:
   - **+** 버튼 클릭 또는 빈 공간에서 우클릭 → **Add Row**
   - Key에 위 값 입력 (자동완성 지원)
   - Type이 String인지 확인
   - Value에 설명 입력

#### 4. 빌드 설정

1. **Signing & Capabilities** 탭 선택
2. **Automatically manage signing** 체크
3. **Team** 선택 (Apple Developer 계정 필요)
4. **Minimum Deployments**:
   - **macOS**: `11.0` 이상

#### 5. 빌드 및 실행

1. 상단 툴바에서 타겟을 **My Mac** 으로 설정
2. **Product → Build** (⌘B) 또는 **Product → Run** (⌘R)
3. 빌드 성공 후 앱이 실행됨

#### 6. 권한 설정

첫 실행 시:
1. 화면 녹화 권한 요청 대화상자 표시
2. **"시스템 환경설정 열기"** 클릭
3. **보안 및 개인 정보 보호** → **개인 정보 보호** → **화면 녹화**
4. 자물쇠 아이콘 클릭하여 잠금 해제 (관리자 비밀번호 입력)
5. **ScreenCaptureNote** 옆 체크박스 활성화
6. **앱 재시작** (Xcode에서 다시 Run)

## 문제 해결

### 빌드 오류: "Cannot find type 'X' in scope"

→ 모든 `.swift` 파일이 제대로 추가되었는지 확인하세요.

### 빌드 오류: "Ambiguous use of 'X'"

→ import 문이 올바른지 확인하세요. 각 파일에 필요한 import가 있어야 합니다:
- `import SwiftUI`
- `import AppKit`
- `import Vision`

### 실행 시 화면 캡처가 작동하지 않음

→ 화면 녹화 권한이 허용되었는지 확인하세요:
1. **시스템 환경설정** → **보안 및 개인 정보 보호** → **개인 정보 보호** → **화면 녹화**
2. ScreenCaptureNote가 목록에 있고 체크되어 있는지 확인
3. 앱 재시작

### Signing 오류

→ Apple Developer 계정이 필요합니다:
1. Xcode → **Preferences** → **Accounts**
2. **+** 버튼으로 Apple ID 추가
3. 프로젝트 설정에서 Team 선택

개인 개발용이라면 무료 Apple ID로도 가능합니다.

## Swift Package Manager로 빌드 (대안)

터미널에서 빌드하려면:

```bash
cd ScreenCaptureNote
swift build
```

하지만 macOS 앱은 Xcode에서 빌드하는 것을 권장합니다.

## 배포 (선택 사항)

앱을 다른 Mac에 배포하려면:

1. **Product → Archive** 실행
2. **Organizer** 창에서 **Distribute App** 선택
3. **Copy App** 선택하여 .app 파일 추출
4. .app 파일을 다른 Mac에 복사하여 사용

**주의**: 코드 서명 및 공증(notarization)이 필요할 수 있습니다.

## 개발 팁

### 디버깅

- 화면 캡처 디버깅: `print()` 문을 `ScreenCaptureManager.swift`의 `performCapture()` 함수에 추가
- 텍스트 추출 디버깅: `TextExtractor.swift`의 `extractText()` 완료 핸들러에 로그 추가

### 성능 최적화

- 캡처 간격을 1초 이상으로 설정
- 캡처 영역을 필요한 만큼만 작게 설정
- 텍스트 인식 레벨 조정: `request.recognitionLevel = .fast` (정확도 낮지만 빠름)

## 추가 기능 개발

### 마크다운 라이브러리 추가

더 나은 마크다운 지원을 위해 외부 라이브러리 사용:

1. `Package.swift`에 의존성 추가:
```swift
dependencies: [
    .package(url: "https://github.com/gonzalezreal/swift-markdown-ui", from: "2.0.0")
]
```

2. `MarkdownEditorView.swift`에서 사용:
```swift
import MarkdownUI

Markdown(text)
```

### 단축키 지원

`ContentView.swift`에 단축키 추가:
```swift
.keyboardShortcut("s", modifiers: [.command]) // 저장
.keyboardShortcut("r", modifiers: [.command]) // 영역 선택
```

## 라이선스 및 기여

이 프로젝트는 MIT 라이선스로 제공됩니다. 자유롭게 수정하고 배포할 수 있습니다.
