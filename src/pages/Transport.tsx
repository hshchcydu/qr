import { motion } from 'framer-motion';
import { Plane, Train, Bus, Car, Bike, CreditCard } from 'lucide-react';
import { PageTransition } from '../components/common/PageTransition';

const transportSections = [
  {
    icon: Plane,
    title: '인천공항에서 서울',
    description: '인천국제공항에서 서울 시내까지 다양한 교통수단이 있습니다.',
    options: [
      {
        name: 'AREX (공항철도)',
        time: '43분 (직통), 60분 (일반)',
        price: '직통 10,300원 / 일반 4,750원',
        tip: '가장 빠르고 편리한 방법',
      },
      {
        name: '리무진 버스',
        time: '60-90분',
        price: '10,000-16,000원',
        tip: '호텔까지 직접 이동 가능',
      },
      {
        name: '택시',
        time: '50-70분',
        price: '60,000-80,000원',
        tip: '짐이 많거나 야간 이동 시 편리',
      },
    ],
  },
  {
    icon: Train,
    title: '지하철',
    description: '서울의 지하철은 깨끗하고 안전하며 가장 효율적인 교통수단입니다.',
    options: [
      {
        name: '기본 요금',
        time: '05:30-24:00 운행',
        price: '기본 1,250원 (10km)',
        tip: 'T-money 카드 구매 필수',
      },
      {
        name: '노선',
        time: '23개 노선',
        price: '환승 무료 (30분 내)',
        tip: '지하철 앱 설치 권장',
      },
    ],
  },
  {
    icon: Bus,
    title: '버스',
    description: '서울의 버스는 색상별로 구분되어 있어 쉽게 이용할 수 있습니다.',
    options: [
      {
        name: '파란색 (간선버스)',
        time: '서울 전역',
        price: '1,300원',
        tip: '주요 간선도로 운행',
      },
      {
        name: '초록색 (지선버스)',
        time: '지역 순환',
        price: '1,200원',
        tip: '지하철역과 주거지 연결',
      },
      {
        name: '빨간색 (광역버스)',
        time: '서울-경기',
        price: '2,400원',
        tip: '장거리 빠른 이동',
      },
      {
        name: '노란색 (순환버스)',
        time: '관광지 순환',
        price: '1,200원',
        tip: '명동, 강남 등 주요 지역',
      },
    ],
  },
  {
    icon: Car,
    title: '택시',
    description: '편리하지만 교통 체증 시 비용이 높을 수 있습니다.',
    options: [
      {
        name: '일반 택시',
        time: '24시간',
        price: '기본 4,800원',
        tip: '흰색/은색 차량',
      },
      {
        name: '모범 택시',
        time: '24시간',
        price: '기본 7,000원',
        tip: '검은색, 친절하고 안전',
      },
      {
        name: '카카오T',
        time: '앱 호출',
        price: '일반택시 + α',
        tip: '앱으로 쉽게 호출',
      },
    ],
  },
  {
    icon: Bike,
    title: '따릉이 (공유 자전거)',
    description: '서울 곳곳에 설치된 공유 자전거로 가까운 거리 이동에 편리합니다.',
    options: [
      {
        name: '1회권',
        time: '1시간',
        price: '1,000원',
        tip: '앱이나 키오스크에서 대여',
      },
      {
        name: '1일권',
        time: '2시간 x 5회',
        price: '2,000원',
        tip: '관광객에게 추천',
      },
    ],
  },
];

const usefulApps = [
  { name: '카카오맵', description: '네비게이션 및 대중교통 검색' },
  { name: '카카오T', description: '택시 호출' },
  { name: '서울 지하철', description: '지하철 노선도 및 시간표' },
  { name: '따릉이', description: '공유 자전거 대여' },
];

export const Transport = () => {
  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">서울 교통 가이드</h1>
            <p className="text-lg md:text-xl opacity-90">
              빠르고 편리한 서울 대중교통 완벽 안내
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transport Sections */}
      <section className="py-12">
        <div className="container-custom space-y-12">
          {transportSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-korean-teal to-blue-600 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.options.map((option) => (
                    <div
                      key={option.name}
                      className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors"
                    >
                      <h3 className="font-bold text-lg mb-3 text-korean-teal">
                        {option.name}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">소요시간</span>
                          <span className="font-medium">{option.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">요금</span>
                          <span className="font-medium">{option.price}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <span className="text-gray-500">💡 {option.tip}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* T-money Card Info */}
      <section className="py-16 bg-gradient-to-r from-korean-teal to-blue-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <CreditCard className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">T-money 카드</h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              서울 대중교통 이용의 필수품! 편의점에서 구매 가능하며,
              지하철·버스·택시에서 모두 사용 가능합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                카드 구매: 4,000원
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                최소 충전: 1,000원
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                환승 할인 적용
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Useful Apps */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">유용한 앱</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {usefulApps.map((app) => (
                <div key={app.name} className="card p-6 text-center">
                  <div className="w-12 h-12 bg-korean-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📱</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{app.name}</h3>
                  <p className="text-gray-600 text-sm">{app.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
