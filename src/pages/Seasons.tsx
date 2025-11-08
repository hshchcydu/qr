import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Sun, Leaf, Snowflake } from 'lucide-react';
import { PageTransition } from '../components/common/PageTransition';

const seasons = [
  {
    id: 'spring',
    name: '봄',
    nameEn: 'Spring',
    icon: Flower2,
    temperature: '10°C - 20°C',
    months: '3월 - 5월',
    activities: ['벚꽃 구경', '한강 피크닉', '궁궐 산책', '자전거 타기'],
    festivals: ['여의도 벚꽃축제', '석촌호수 벚꽃축제', '서울 국제 도서전'],
    tips: [
      '4월 초가 벚꽃 만개 시기입니다',
      '일교차가 크니 겉옷을 준비하세요',
      '황사가 있을 수 있으니 마스크를 챙기세요',
    ],
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
    gradient: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
  },
  {
    id: 'summer',
    name: '여름',
    nameEn: 'Summer',
    icon: Sun,
    temperature: '23°C - 33°C',
    months: '6월 - 8월',
    activities: ['한강 수영장', '야외 페스티벌', '야시장 탐방', '워터파크'],
    festivals: ['서울 재즈 페스티벌', '한강 여름축제', '보령 머드축제'],
    tips: [
      '장마 기간(6월 말-7월)을 피하거나 우산을 준비하세요',
      '한낮의 더위를 피해 아침이나 저녁에 활동하세요',
      '실내 활동과 야외 활동을 적절히 배분하세요',
    ],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    gradient: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 'autumn',
    name: '가을',
    nameEn: 'Autumn',
    icon: Leaf,
    temperature: '10°C - 20°C',
    months: '9월 - 11월',
    activities: ['단풍 구경', '등산', '한강 산책', '야외 공연 관람'],
    festivals: ['서울 불꽃축제', '서울 디자인 페스티벌', '정동야행'],
    tips: [
      '10월 중순-11월 초가 단풍 절정기입니다',
      '일교차가 크니 가벼운 외투를 준비하세요',
      '주말 명소는 매우 붐비니 평일 방문을 추천합니다',
    ],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    gradient: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    id: 'winter',
    name: '겨울',
    nameEn: 'Winter',
    icon: Snowflake,
    temperature: '-5°C - 5°C',
    months: '12월 - 2월',
    activities: ['스케이트', '스키', '온천', '크리스마스 마켓'],
    festivals: ['서울 빛초롱축제', '평창 송어축제', '화천 얼음축제'],
    tips: [
      '패딩과 방한용품을 꼭 준비하세요',
      '실내 난방이 잘 되어있어 겹쳐 입기를 추천합니다',
      '눈이 오면 대중교통 이용을 권장합니다',
    ],
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800',
    gradient: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
];

export const Seasons = () => {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              계절별 서울 여행
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              사계절의 아름다움을 모두 즐길 수 있는 도시
            </p>
          </motion.div>
        </div>
      </section>

      {/* Season Tabs */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seasons.map((season) => {
              const Icon = season.icon;
              return (
                <button
                  key={season.id}
                  onClick={() => setSelectedSeason(season)}
                  className={`p-6 rounded-xl transition-all ${
                    selectedSeason.id === season.id
                      ? `${season.bgColor} shadow-lg scale-105`
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`w-10 h-10 mx-auto mb-3 ${
                      selectedSeason.id === season.id
                        ? 'text-korean-teal'
                        : 'text-gray-400'
                    }`}
                  />
                  <div className="font-bold text-lg">{season.name}</div>
                  <div className="text-sm text-gray-500">{season.nameEn}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Season Content */}
      <AnimatePresence mode="wait">
        <motion.section
          key={selectedSeason.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="py-12"
        >
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <div
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${selectedSeason.bgColor} mb-6`}
                >
                  <span className="font-semibold text-korean-teal">
                    {selectedSeason.months}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{selectedSeason.temperature}</span>
                </div>

                <h2 className="text-4xl font-bold mb-6">
                  {selectedSeason.name} 서울
                </h2>

                {/* Activities */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">추천 활동</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeason.activities.map((activity) => (
                      <span
                        key={activity}
                        className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${selectedSeason.gradient} text-white`}
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Festivals */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">축제 & 이벤트</h3>
                  <ul className="space-y-2">
                    {selectedSeason.festivals.map((festival) => (
                      <li key={festival} className="flex items-center space-x-2">
                        <span className="text-korean-teal">•</span>
                        <span className="text-gray-700">{festival}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">여행 팁</h3>
                  <ul className="space-y-2">
                    {selectedSeason.tips.map((tip) => (
                      <li key={tip} className="flex items-start space-x-2">
                        <span className="text-korean-teal mt-1">✓</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedSeason.image}
                  alt={selectedSeason.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </PageTransition>
  );
};
