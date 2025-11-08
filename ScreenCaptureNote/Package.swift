// swift-tools-version: 5.7
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "ScreenCaptureNote",
    platforms: [
        .macOS(.v11)
    ],
    products: [
        .executable(
            name: "ScreenCaptureNote",
            targets: ["ScreenCaptureNote"]
        )
    ],
    dependencies: [
        // 필요한 경우 여기에 외부 의존성 추가
        // 예: .package(url: "https://github.com/gonzalezreal/swift-markdown-ui", from: "2.0.0")
    ],
    targets: [
        .executableTarget(
            name: "ScreenCaptureNote",
            dependencies: [],
            path: "Sources",
            resources: [
                .process("Resources")
            ]
        )
    ]
)
