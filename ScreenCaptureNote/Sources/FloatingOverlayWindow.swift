//
//  FloatingOverlayWindow.swift
//  ScreenCaptureNote
//
//  반투명 플로팅 윈도우
//

import AppKit
import SwiftUI

class FloatingOverlayWindow: NSPanel {
    private var overlayView: OverlayView?
    private var initialLocation: NSPoint = .zero
    private var initialFrame: NSRect = .zero

    init(frame: CGRect) {
        super.init(
            contentRect: frame,
            styleMask: [.borderless, .nonactivatingPanel, .resizable],
            backing: .buffered,
            defer: false
        )

        setupWindow()
        setupOverlayView()
    }

    private func setupWindow() {
        level = .floating
        isOpaque = false
        backgroundColor = .clear
        hasShadow = false
        ignoresMouseEvents = false
        isMovableByWindowBackground = false
        collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
    }

    private func setupOverlayView() {
        let view = OverlayView(frame: contentView?.bounds ?? .zero)
        view.autoresizingMask = [.width, .height]
        contentView = view
        overlayView = view
    }

    func updateOpacity(_ opacity: Double) {
        overlayView?.updateOpacity(opacity)
    }

    override var canBecomeKey: Bool {
        return true
    }

    override var canBecomeMain: Bool {
        return false
    }
}

// MARK: - Overlay View

class OverlayView: NSView {
    private var opacity: CGFloat = 0.2
    private var isDragging = false
    private var isResizing = false
    private var dragStart: NSPoint = .zero
    private var resizeStart: NSPoint = .zero
    private var originalFrame: NSRect = .zero

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
            options: [.activeAlways, .mouseEnteredAndExited, .mouseMoved, .inVisibleRect],
            owner: self,
            userInfo: nil
        )
        addTrackingArea(trackingArea)
    }

    func updateOpacity(_ newOpacity: Double) {
        opacity = CGFloat(newOpacity)
        needsDisplay = true
    }

    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)

        // 반투명 배경
        NSColor.systemBlue.withAlphaComponent(opacity).setFill()
        dirtyRect.fill()

        // 테두리
        NSColor.systemBlue.withAlphaComponent(0.8).setStroke()
        let border = NSBezierPath(rect: bounds)
        border.lineWidth = 2
        border.stroke()

        // 크기 조절 핸들 (오른쪽 하단)
        let handleSize: CGFloat = 20
        let handleRect = NSRect(
            x: bounds.maxX - handleSize,
            y: bounds.minY,
            width: handleSize,
            height: handleSize
        )
        NSColor.white.withAlphaComponent(0.5).setFill()
        NSBezierPath(ovalIn: handleRect).fill()
    }

    // MARK: - Mouse Events

    override func mouseDown(with event: NSEvent) {
        guard let window = window else { return }

        let locationInWindow = event.locationInWindow
        let handleSize: CGFloat = 20
        let handleRect = NSRect(
            x: bounds.maxX - handleSize,
            y: bounds.minY,
            width: handleSize,
            height: handleSize
        )

        if handleRect.contains(locationInWindow) {
            // 크기 조절 시작
            isResizing = true
            resizeStart = event.locationInWindow
            originalFrame = window.frame
        } else {
            // 드래그 시작
            isDragging = true
            dragStart = event.locationInWindow
            originalFrame = window.frame
        }
    }

    override func mouseDragged(with event: NSEvent) {
        guard let window = window else { return }

        if isResizing {
            handleResize(event: event, window: window)
        } else if isDragging {
            handleDrag(event: event, window: window)
        }
    }

    override func mouseUp(with event: NSEvent) {
        isDragging = false
        isResizing = false
    }

    private func handleDrag(event: NSEvent, window: NSWindow) {
        let currentLocation = event.locationInWindow
        let deltaX = currentLocation.x - dragStart.x
        let deltaY = currentLocation.y - dragStart.y

        var newFrame = originalFrame
        newFrame.origin.x += deltaX
        newFrame.origin.y += deltaY

        window.setFrame(newFrame, display: true)
    }

    private func handleResize(event: NSEvent, window: NSWindow) {
        let currentLocation = event.locationInWindow
        let deltaX = currentLocation.x - resizeStart.x
        let deltaY = currentLocation.y - resizeStart.y

        var newFrame = originalFrame
        newFrame.size.width += deltaX
        newFrame.size.height -= deltaY
        newFrame.origin.y += deltaY

        // 최소 크기 제한
        newFrame.size.width = max(newFrame.size.width, 100)
        newFrame.size.height = max(newFrame.size.height, 100)

        window.setFrame(newFrame, display: true)
    }

    override func updateTrackingAreas() {
        super.updateTrackingAreas()
        for trackingArea in trackingAreas {
            removeTrackingArea(trackingArea)
        }
        setupTrackingArea()
    }
}
