//
//  ParagraphDetector.swift
//  ScreenCaptureNote
//
//  단락 판정 로직 - 10% 변화 감지
//

import Foundation

class ParagraphDetector {
    private var paragraphs: [String] = []
    private var previousText: String = ""
    private let changeThreshold: Double = 0.1 // 10%

    func reset() {
        paragraphs = []
        previousText = ""
    }

    func processText(_ newText: String) -> String {
        let trimmedNew = newText.trimmingCharacters(in: .whitespacesAndNewlines)

        // 빈 텍스트는 무시
        guard !trimmedNew.isEmpty else {
            return getCurrentText()
        }

        // 첫 번째 텍스트
        if previousText.isEmpty {
            paragraphs.append(trimmedNew)
            previousText = trimmedNew
            return getCurrentText()
        }

        // 이전 텍스트와 동일하면 아무것도 하지 않음
        if trimmedNew == previousText {
            return getCurrentText()
        }

        // 텍스트 유사도 계산
        let similarity = calculateSimilarity(previousText, trimmedNew)

        if similarity < (1.0 - changeThreshold) {
            // 10% 이상 변경됨 - 새로운 단락 시작
            paragraphs.append(trimmedNew)
            previousText = trimmedNew
        } else {
            // 이어지는 내용 - 현재 단락 업데이트
            if !paragraphs.isEmpty {
                paragraphs[paragraphs.count - 1] = trimmedNew
                previousText = trimmedNew
            }
        }

        return getCurrentText()
    }

    private func getCurrentText() -> String {
        return paragraphs.joined(separator: "\n\n")
    }

    // MARK: - Similarity Calculation

    private func calculateSimilarity(_ text1: String, _ text2: String) -> Double {
        // 두 텍스트의 유사도를 계산
        // Levenshtein 거리 기반 유사도

        let len1 = text1.count
        let len2 = text2.count

        // 둘 중 하나가 빈 문자열이면
        if len1 == 0 { return len2 == 0 ? 1.0 : 0.0 }
        if len2 == 0 { return 0.0 }

        // 짧은 길이를 비교 대상으로
        let minLength = min(len1, len2)
        let maxLength = max(len1, len2)

        // 공통 접두사 길이 계산
        let commonPrefixLength = calculateCommonPrefixLength(text1, text2)

        // 길이 차이가 크면 유사도 낮음
        let lengthRatio = Double(minLength) / Double(maxLength)

        // 공통 접두사 비율
        let prefixRatio = Double(commonPrefixLength) / Double(minLength)

        // 종합 유사도 (접두사 비율과 길이 비율의 가중평균)
        let similarity = (prefixRatio * 0.7) + (lengthRatio * 0.3)

        return similarity
    }

    private func calculateCommonPrefixLength(_ text1: String, _ text2: String) -> Int {
        let chars1 = Array(text1)
        let chars2 = Array(text2)
        let minLength = min(chars1.count, chars2.count)

        var commonLength = 0
        for i in 0..<minLength {
            if chars1[i] == chars2[i] {
                commonLength += 1
            } else {
                break
            }
        }

        return commonLength
    }

    // 대안: 더 정확한 Levenshtein 거리 계산 (필요시 사용)
    private func levenshteinDistance(_ s1: String, _ s2: String) -> Int {
        let s1 = Array(s1)
        let s2 = Array(s2)
        let m = s1.count
        let n = s2.count

        var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)

        for i in 0...m {
            dp[i][0] = i
        }

        for j in 0...n {
            dp[0][j] = j
        }

        for i in 1...m {
            for j in 1...n {
                if s1[i-1] == s2[j-1] {
                    dp[i][j] = dp[i-1][j-1]
                } else {
                    dp[i][j] = min(
                        dp[i-1][j] + 1,      // 삭제
                        dp[i][j-1] + 1,      // 삽입
                        dp[i-1][j-1] + 1     // 치환
                    )
                }
            }
        }

        return dp[m][n]
    }
}
