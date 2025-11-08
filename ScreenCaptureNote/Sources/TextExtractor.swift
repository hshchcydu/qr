//
//  TextExtractor.swift
//  ScreenCaptureNote
//
//  Vision Framework를 사용한 텍스트 추출
//

import Foundation
import Vision
import AppKit

class TextExtractor {

    func extractText(from image: NSImage, completion: @escaping (String) -> Void) {
        guard let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
            completion("")
            return
        }

        let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])

        let request = VNRecognizeTextRequest { request, error in
            if let error = error {
                print("텍스트 인식 오류: \(error)")
                completion("")
                return
            }

            guard let observations = request.results as? [VNRecognizedTextObservation] else {
                completion("")
                return
            }

            // 인식된 텍스트를 위에서 아래로 정렬
            let sortedObservations = observations.sorted { obs1, obs2 in
                // Y 좌표가 큰 것이 위쪽 (Vision 좌표계는 좌하단이 원점)
                obs1.boundingBox.origin.y > obs2.boundingBox.origin.y
            }

            var extractedLines: [String] = []

            for observation in sortedObservations {
                guard let topCandidate = observation.topCandidates(1).first else {
                    continue
                }

                let text = topCandidate.string
                if !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                    extractedLines.append(text)
                }
            }

            let fullText = extractedLines.joined(separator: " ")
            completion(fullText)
        }

        // 텍스트 인식 옵션 설정
        request.recognitionLevel = .accurate
        request.usesLanguageCorrection = true
        request.recognitionLanguages = ["ko-KR", "en-US"] // 한국어 및 영어 지원

        DispatchQueue.global(qos: .userInitiated).async {
            do {
                try requestHandler.perform([request])
            } catch {
                print("텍스트 인식 수행 오류: \(error)")
                completion("")
            }
        }
    }
}
