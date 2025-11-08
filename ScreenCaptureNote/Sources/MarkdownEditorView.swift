//
//  MarkdownEditorView.swift
//  ScreenCaptureNote
//
//  마크다운 에디터 (선택적 라이브 프리뷰 지원)
//

import SwiftUI

struct MarkdownEditorView: View {
    @Binding var text: String
    @State private var showPreview: Bool = false

    var body: some View {
        VStack(spacing: 0) {
            // 에디터/프리뷰 토글 버튼
            HStack {
                Picker("모드", selection: $showPreview) {
                    Text("편집").tag(false)
                    Text("미리보기").tag(true)
                }
                .pickerStyle(.segmented)
                .frame(width: 200)

                Spacer()
            }
            .padding(.horizontal)
            .padding(.top, 8)
            .padding(.bottom, 4)

            Divider()

            // 에디터 또는 프리뷰
            if showPreview {
                MarkdownPreviewView(markdown: text)
            } else {
                TextEditor(text: $text)
                    .font(.system(size: 14, design: .monospaced))
                    .padding(8)
            }
        }
    }
}

// MARK: - Markdown Preview

struct MarkdownPreviewView: View {
    let markdown: String

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                if #available(macOS 12.0, *) {
                    // macOS 12+ 에서는 AttributedString 사용
                    Text(parseMarkdown(markdown))
                        .textSelection(.enabled)
                        .padding()
                } else {
                    // 이전 버전에서는 기본 텍스트
                    Text(markdown)
                        .padding()
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .background(Color(NSColor.textBackgroundColor))
    }

    @available(macOS 12.0, *)
    private func parseMarkdown(_ text: String) -> AttributedString {
        do {
            return try AttributedString(
                markdown: text,
                options: AttributedString.MarkdownParsingOptions(interpretedSyntax: .inlineOnlyPreservingWhitespace)
            )
        } catch {
            return AttributedString(text)
        }
    }
}

// MARK: - Preview

struct MarkdownEditorView_Previews: PreviewProvider {
    static var previews: some View {
        MarkdownEditorView(text: .constant("""
        # 제목

        이것은 **굵은 글씨**이고, 이것은 *기울임*입니다.

        - 항목 1
        - 항목 2
        - 항목 3

        ```
        코드 블록
        ```
        """))
    }
}
