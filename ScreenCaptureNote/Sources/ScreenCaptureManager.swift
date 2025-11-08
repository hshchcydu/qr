//
//  ScreenCaptureManager.swift
//  ScreenCaptureNote
//
//  화면 캡처 및 텍스트 추출 관리
//

import Foundation
import SwiftUI
import AppKit

class ScreenCaptureManager: ObservableObject {
    @Published var selectedRegion: CGRect?
    @Published var isCapturing: Bool = false

    private var captureTimer: Timer?
    private var floatingWindow: FloatingOverlayWindow?
    private let textExtractor = TextExtractor()
    private let paragraphDetector = ParagraphDetector()

    var onTextUpdated: ((String) -> Void)?

    // MARK: - Region Selection

    func startRegionSelection(completion: @escaping (CGRect?) -> Void) {
        // 기존 윈도우가 있으면 제거
        floatingWindow?.close()
        floatingWindow = nil

        // 영역 선택 윈도우 생성
        let selectorWindow = RegionSelectorWindow { [weak self] region in
            guard let self = self, let region = region else {
                completion(nil)
                return
            }

            self.selectedRegion = region
            self.showFloatingOverlay(for: region)
            completion(region)
        }

        selectorWindow.makeKeyAndOrderFront(nil)
    }

    func updateOverlayOpacity(_ opacity: Double) {
        floatingWindow?.updateOpacity(opacity)
    }

    // MARK: - Floating Overlay

    private func showFloatingOverlay(for region: CGRect) {
        floatingWindow?.close()

        floatingWindow = FloatingOverlayWindow(frame: region)
        floatingWindow?.makeKeyAndOrderFront(nil)
    }

    // MARK: - Screen Capture

    func startCapture(interval: TimeInterval) {
        guard let region = selectedRegion else { return }

        isCapturing = true
        paragraphDetector.reset()

        captureTimer = Timer.scheduledTimer(withTimeInterval: interval, repeats: true) { [weak self] _ in
            self?.performCapture(region: region)
        }

        // 즉시 첫 캡처 실행
        performCapture(region: region)
    }

    func stopCapture() {
        isCapturing = false
        captureTimer?.invalidate()
        captureTimer = nil
    }

    private func performCapture(region: CGRect) {
        guard let image = captureScreen(region: region) else {
            print("화면 캡처 실패")
            return
        }

        // 텍스트 추출
        textExtractor.extractText(from: image) { [weak self] extractedText in
            guard let self = self else { return }

            // 단락 판정 및 텍스트 업데이트
            let updatedText = self.paragraphDetector.processText(extractedText)
            self.onTextUpdated?(updatedText)
        }
    }

    private func captureScreen(region: CGRect) -> NSImage? {
        // CGWindowListCreateImage를 사용하여 화면 캡처
        guard let cgImage = CGWindowListCreateImage(
            region,
            .optionOnScreenOnly,
            kCGNullWindowID,
            [.bestResolution, .nominalResolution]
        ) else {
            return nil
        }

        let image = NSImage(cgImage: cgImage, size: region.size)
        return image
    }

    // MARK: - Text Management

    func clearCapturedText() {
        paragraphDetector.reset()
    }
}
