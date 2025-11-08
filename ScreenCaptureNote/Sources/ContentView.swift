//
//  ContentView.swift
//  ScreenCaptureNote
//
//  메인 UI 화면
//

import SwiftUI

struct ContentView: View {
    @StateObject private var captureManager = ScreenCaptureManager()
    @State private var captureInterval: Double = 1.0
    @State private var overlayOpacity: Double = 0.2
    @State private var isCapturing: Bool = false
    @State private var showingRegionSelector: Bool = false
    @State private var capturedText: String = ""

    var body: some View {
        VStack(spacing: 0) {
            // 상단 컨트롤 패널
            controlPanel
                .padding()
                .background(Color(NSColor.controlBackgroundColor))

            Divider()

            // 텍스트 에디터 영역
            textEditorArea
        }
        .onAppear {
            captureManager.onTextUpdated = { text in
                capturedText = text
            }
        }
        .onChange(of: overlayOpacity) { newValue in
            // 투명도가 변경되면 실시간으로 플로팅 윈도우 업데이트
            captureManager.updateOverlayOpacity(newValue)
        }
    }

    // MARK: - Control Panel

    private var controlPanel: some View {
        VStack(spacing: 16) {
            // 첫 번째 줄: 캡처 간격 및 투명도
            HStack(spacing: 20) {
                // 캡처 간격 설정
                VStack(alignment: .leading, spacing: 4) {
                    Text("캡처 간격")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    HStack {
                        Slider(value: $captureInterval, in: 0.5...5.0, step: 0.5)
                            .frame(width: 200)
                        Text("\(String(format: "%.1f", captureInterval))초")
                            .frame(width: 50, alignment: .leading)
                            .monospacedDigit()
                    }
                }

                Spacer()

                // 투명도 설정
                VStack(alignment: .leading, spacing: 4) {
                    Text("선택 영역 투명도")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    HStack {
                        Slider(value: $overlayOpacity, in: 0.1...0.9, step: 0.1)
                            .frame(width: 200)
                        Text("\(Int(overlayOpacity * 100))%")
                            .frame(width: 50, alignment: .leading)
                            .monospacedDigit()
                    }
                }
            }

            Divider()

            // 두 번째 줄: 주요 버튼들
            HStack(spacing: 12) {
                // 영역 선택 버튼
                Button(action: selectRegion) {
                    HStack {
                        Image(systemName: "viewfinder")
                        Text("캡처 영역 선택")
                    }
                    .frame(minWidth: 150)
                }
                .buttonStyle(.borderedProminent)
                .disabled(isCapturing)

                // 시작/정지 버튼
                Button(action: toggleCapture) {
                    HStack {
                        Image(systemName: isCapturing ? "stop.fill" : "play.fill")
                        Text(isCapturing ? "캡처 정지" : "캡처 시작")
                    }
                    .frame(minWidth: 120)
                }
                .buttonStyle(.borderedProminent)
                .tint(isCapturing ? .red : .green)
                .disabled(captureManager.selectedRegion == nil)

                Spacer()

                // 저장 버튼
                Button(action: saveText) {
                    HStack {
                        Image(systemName: "square.and.arrow.down")
                        Text("저장")
                    }
                }
                .disabled(capturedText.isEmpty)

                // 삭제 버튼
                Button(action: clearText) {
                    HStack {
                        Image(systemName: "trash")
                        Text("내용 삭제")
                    }
                }
                .disabled(capturedText.isEmpty)
            }

            // 선택된 영역 정보
            if let region = captureManager.selectedRegion {
                HStack {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(.green)
                    Text("선택 영역: \(Int(region.width)) × \(Int(region.height)) pixels")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Spacer()
                }
            }
        }
    }

    // MARK: - Text Editor Area

    private var textEditorArea: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("캡처된 텍스트")
                .font(.headline)
                .padding([.horizontal, .top])

            // 마크다운 에디터 사용
            MarkdownEditorView(text: $capturedText)
                .cornerRadius(8)
                .padding(.horizontal)
                .padding(.bottom)
        }
    }

    // MARK: - Actions

    private func selectRegion() {
        captureManager.startRegionSelection { region in
            if region != nil {
                captureManager.updateOverlayOpacity(overlayOpacity)
            }
        }
    }

    private func toggleCapture() {
        if isCapturing {
            captureManager.stopCapture()
            isCapturing = false
        } else {
            captureManager.startCapture(interval: captureInterval)
            isCapturing = true
        }
    }

    private func saveText() {
        let panel = NSSavePanel()
        panel.allowedContentTypes = [.plainText, .text]
        panel.nameFieldStringValue = "capture_\(Date().timeIntervalSince1970).txt"
        panel.canCreateDirectories = true

        panel.begin { response in
            if response == .OK, let url = panel.url {
                do {
                    try capturedText.write(to: url, atomically: true, encoding: .utf8)
                } catch {
                    print("저장 실패: \(error)")
                }
            }
        }
    }

    private func clearText() {
        capturedText = ""
        captureManager.clearCapturedText()
    }
}
