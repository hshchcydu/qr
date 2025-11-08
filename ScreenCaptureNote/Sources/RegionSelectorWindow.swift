//
//  RegionSelectorWindow.swift
//  ScreenCaptureNote
//
//  영역 선택 윈도우
//

import AppKit

class RegionSelectorWindow: NSWindow {
    private var selectionView: RegionSelectionView?
    private var completion: ((CGRect?) -> Void)?

    init(completion: @escaping (CGRect?) -> Void) {
        self.completion = completion

        // 전체 화면 크기 가져오기
        let screenFrame = NSScreen.main?.frame ?? .zero

        super.init(
            contentRect: screenFrame,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )

        setupWindow()
        setupSelectionView()
    }

    private func setupWindow() {
        level = .floating
        isOpaque = false
        backgroundColor = .clear
        hasShadow = false
        ignoresMouseEvents = false
        collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
    }

    private func setupSelectionView() {
        let view = RegionSelectionView(frame: contentView?.bounds ?? .zero)
        view.onSelectionComplete = { [weak self] region in
            self?.handleSelectionComplete(region: region)
        }
        contentView = view
        selectionView = view
    }

    private func handleSelectionComplete(region: CGRect?) {
        completion?(region)
        close()
    }

    override var canBecomeKey: Bool {
        return true
    }
}

// MARK: - Region Selection View

class RegionSelectionView: NSView {
    var onSelectionComplete: ((CGRect?) -> Void)?

    private var startPoint: NSPoint?
    private var currentPoint: NSPoint?
    private var isDragging = false

    override init(frame frameRect: NSRect) {
        super.init(frame: frameRect)
        setupTrackingArea()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupTrackingArea() {
        let trackingArea = NSTrackingArea(
            rect: bounds,
            options: [.activeAlways, .mouseMoved, .inVisibleRect],
            owner: self,
            userInfo: nil
        )
        addTrackingArea(trackingArea)
    }

    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)

        // 반투명 오버레이
        NSColor.black.withAlphaComponent(0.3).setFill()
        dirtyRect.fill()

        // 선택 영역 표시
        if let start = startPoint, let current = currentPoint {
            let selectionRect = rectFromPoints(start, current)

            // 선택 영역은 투명하게
            NSColor.clear.setFill()
            selectionRect.fill(using: .copy)

            // 선택 영역 테두리
            NSColor.white.setStroke()
            let border = NSBezierPath(rect: selectionRect)
            border.lineWidth = 2
            border.stroke()

            // 크기 정보 표시
            let sizeText = String(format: "%.0f × %.0f", selectionRect.width, selectionRect.height)
            let attributes: [NSAttributedString.Key: Any] = [
                .font: NSFont.systemFont(ofSize: 14, weight: .medium),
                .foregroundColor: NSColor.white,
                .backgroundColor: NSColor.black.withAlphaComponent(0.7)
            ]

            let textSize = sizeText.size(withAttributes: attributes)
            let textRect = NSRect(
                x: selectionRect.midX - textSize.width / 2,
                y: selectionRect.midY - textSize.height / 2,
                width: textSize.width + 8,
                height: textSize.height + 4
            )

            NSColor.black.withAlphaComponent(0.7).setFill()
            NSBezierPath(roundedRect: textRect, xRadius: 4, yRadius: 4).fill()

            sizeText.draw(at: NSPoint(x: textRect.minX + 4, y: textRect.minY + 2), withAttributes: attributes)
        }
    }

    // MARK: - Mouse Events

    override func mouseDown(with event: NSEvent) {
        startPoint = event.locationInWindow
        currentPoint = startPoint
        isDragging = true
        needsDisplay = true
    }

    override func mouseDragged(with event: NSEvent) {
        guard isDragging else { return }
        currentPoint = event.locationInWindow
        needsDisplay = true
    }

    override func mouseUp(with event: NSEvent) {
        guard isDragging,
              let start = startPoint,
              let end = currentPoint else {
            onSelectionComplete?(nil)
            return
        }

        isDragging = false
        let selectedRect = rectFromPoints(start, end)

        // 최소 크기 체크
        if selectedRect.width > 20 && selectedRect.height > 20 {
            // 화면 좌표계로 변환
            if let screen = NSScreen.main {
                let screenHeight = screen.frame.height
                var adjustedRect = selectedRect
                adjustedRect.origin.y = screenHeight - selectedRect.origin.y - selectedRect.height
                onSelectionComplete?(adjustedRect)
            } else {
                onSelectionComplete?(selectedRect)
            }
        } else {
            onSelectionComplete?(nil)
        }
    }

    override func keyDown(with event: NSEvent) {
        // ESC 키로 취소
        if event.keyCode == 53 {
            onSelectionComplete?(nil)
        }
    }

    private func rectFromPoints(_ p1: NSPoint, _ p2: NSPoint) -> NSRect {
        let x = min(p1.x, p2.x)
        let y = min(p1.y, p2.y)
        let width = abs(p1.x - p2.x)
        let height = abs(p1.y - p2.y)
        return NSRect(x: x, y: y, width: width, height: height)
    }

    override func updateTrackingAreas() {
        super.updateTrackingAreas()
        for trackingArea in trackingAreas {
            removeTrackingArea(trackingArea)
        }
        setupTrackingArea()
    }
}
