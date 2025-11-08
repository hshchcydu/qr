//
//  ScreenCaptureNoteApp.swift
//  ScreenCaptureNote
//
//  화면 캡처 노트 앱 - 메인 앱 진입점
//

import SwiftUI

@main
struct ScreenCaptureNoteApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
                .frame(minWidth: 800, minHeight: 600)
        }
        .windowStyle(.hiddenTitleBar)
        .commands {
            CommandGroup(replacing: .newItem) { }
        }
    }
}

class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        // 화면 녹화 권한 요청
        requestScreenRecordingPermission()
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    private func requestScreenRecordingPermission() {
        // 화면 녹화 권한 확인
        let hasPermission = CGPreflightScreenCaptureAccess()
        if !hasPermission {
            CGRequestScreenCaptureAccess()
        }
    }
}
