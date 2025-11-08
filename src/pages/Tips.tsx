import { motion } from 'framer-motion';
import {
  MessageCircle,
  DollarSign,
  Wifi,
  AlertCircle,
  Hotel,
  Cloud,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { PageTransition } from '../components/common/PageTransition';

const tips = [
  {
    icon: MessageCircle,
    title: '언어',
    content: [
      '영어: 주요 관광지에서는 영어가 통하지만, 기본 한국어를 알면 유용합니다',
      '안녕하세요 (Annyeonghaseyo) - Hello',
      '감사합니다 (Gamsahamnida) - Thank you',
      '얼마예요? (Eolmayeyo?) - How much?',
      '화장실 어디예요? (Hwajangsil eodiyeyo?) - Where is the bathroom?',
      '파파고, 구글 번역 앱 추천',
    ],
  },
  {
    icon: DollarSign,
    title: '통화 & 환전',
    content: [
      '통화: 대한민국 원화 (KRW, ₩)',
      '환전: 명동, 이태원 환전소가 은행보다 환율이 좋습니다',
      '카드: 대부분의 곳에서 신용카드 사용 가능 (Visa, Mastercard)',
      '현금: 전통시장이나 작은 식당에서는 현금 필요',
      'ATM: 세븐일레븐, GS25 등 편의점에 외국인 카드 사용 가능 ATM 있음',
    ],
  },
  {
    icon: Hotel,
    title: '숙소',
    content: [
      '명동/종로: 관광 중심지, 교통 편리',
      '강남: 현대적, 쇼핑과 엔터테인먼트',
      '홍대/이태원: 나이트라이프, 젊은 분위기',
      '게스트하우스: 저렴하고 외국인 친화적',
      '호텔: 다양한 가격대, 서비스 우수',
      '에어비앤비: 한옥 스테이 등 특별한 경험',
    ],
  },
  {
    icon: AlertCircle,
    title: '안전',
    content: [
      '서울은 매우 안전한 도시입니다',
      '긴급전화: 112 (경찰), 119 (화재/응급)',
      '관광 경찰: 1330 (영어, 일어, 중국어)',
      '야간에도 대중교통 이용 안전',
      '귀중품은 항상 주의해서 보관',
      '분실물은 경찰서나 지하철 유실물센터에 문의',
    ],
  },
  {
    icon: Heart,
    title: '에티켓',
    content: [
      '지하철/버스: 노약자석은 양보하세요',
      '식당: 팁 문화 없음',
      '실내: 신발을 벗어야 하는 곳이 많습니다',
      '대중교통: 조용히 이용, 전화 통화 자제',
      '에스컬레이터: 오른쪽에 서기 (왼쪽은 급한 사람을 위해)',
      '쓰레기: 길거리 휴지통이 적으니 가방에 챙겨두세요',
    ],
  },
  {
    icon: Wifi,
    title: 'WiFi & 통신',
    content: [
      '공항에서 포켓 WiFi 대여 (하루 5,000-10,000원)',
      '편의점에서 선불 유심 구매 가능',
      '대부분의 카페, 식당에 무료 WiFi',
      '지하철역에도 무료 WiFi (Olleh WiFi)',
      '데이터 무제한 요금제 추천',
    ],
  },
  {
    icon: Cloud,
    title: '날씨',
    content: [
      '봄(3-5월): 10-20°C, 벚꽃 시즌',
      '여름(6-8월): 23-33°C, 덥고 습함, 장마',
      '가을(9-11월): 10-20°C, 단풍, 여행 최적기',
      '겨울(12-2월): -5-5°C, 춥고 건조',
      '미세먼지: 봄철에 황사 주의',
      '날씨앱으로 실시간 확인 권장',
    ],
  },
  {
    icon: HelpCircle,
    title: '기타 팁',
    content: [
      '콘센트: 220V, 한국형 플러그 (어댑터 필요)',
      '흡연: 실내 금연, 지정된 흡연구역 이용',
      '음주: 길거리 음주 가능 (공원, 한강 등)',
      '영업시간: 대부분 가게 10:00-22:00',
      '편의점: 24시간 운영 (세븐일레븐, CU, GS25)',
      '배달앱: 배달의민족, 쿠팡이츠 (한국어)',
    ],
  },
];

const faqs = [
  {
    q: '비자가 필요한가요?',
    a: '대부분의 국가는 90일 무비자 체류 가능합니다. 본인의 국적을 확인하세요.',
  },
  {
    q: '영어가 잘 통하나요?',
    a: '주요 관광지와 호텔에서는 영어가 통하지만, 일반 식당이나 상점에서는 어려울 수 있습니다.',
  },
  {
    q: '팁을 줘야 하나요?',
    a: '한국에는 팁 문화가 없습니다. 서비스 요금이 이미 포함되어 있습니다.',
  },
  {
    q: '물을 마셔도 되나요?',
    a: '수돗물을 마셔도 안전하지만, 대부분의 사람들은 생수를 구매합니다.',
  },
];

export const Tips = () => {
  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">여행 팁</h1>
            <p className="text-lg md:text-xl opacity-90">
              서울 여행을 더 편리하고 즐겁게 만들어줄 실용 정보
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-korean-teal to-blue-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">{tip.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {tip.content.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 text-gray-700">
                        <span className="text-korean-teal mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">자주 묻는 질문</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6"
                >
                  <h3 className="text-lg font-bold text-korean-teal mb-2">
                    Q. {faq.q}
                  </h3>
                  <p className="text-gray-700">A. {faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AlertCircle className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">긴급 연락처</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">112</div>
                <div className="text-lg">경찰</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">119</div>
                <div className="text-lg">화재 / 응급</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">1330</div>
                <div className="text-lg">관광 통역 안내</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
