import { motion } from 'framer-motion';
import { Music, Utensils, Coffee, Users, ShoppingBag, Sparkles } from 'lucide-react';
import { PageTransition } from '../components/common/PageTransition';

const cultureSections = [
  {
    icon: Music,
    title: 'K-Pop & 엔터테인먼트',
    description:
      '한류의 중심지 서울에서 K-Pop 문화를 체험하세요. SM, JYP, HYBE 등 대형 엔터테인먼트사의 본사와 강남 K-Star Road를 방문할 수 있습니다.',
    places: ['강남 K-Star Road', 'SM타운 코엑스아티움', '방탄소년단 사옥', '한류스타거리'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    gradient: 'from-pink-500 to-purple-600',
  },
  {
    icon: Utensils,
    title: '한식',
    description:
      '김치, 비빔밥, 불고기, 삼겹살 등 다양한 한국 음식을 맛보세요. 미슐랭 레스토랑부터 전통 시장의 길거리 음식까지 모든 것이 있습니다.',
    places: ['광장시장', '이태원 세계음식거리', '한남동 맛집', '종로 전통음식'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: Coffee,
    title: '카페 문화',
    description:
      '서울의 독특한 카페 문화를 경험하세요. 망원동, 성수동, 연남동의 트렌디한 카페부터 전통 찻집까지 다양한 선택이 있습니다.',
    places: ['성수동 카페거리', '연남동', '망원동', '익선동 한옥카페'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    icon: Users,
    title: '전통 문화',
    description:
      '한복 체험, 전통 공연, 궁궐 투어 등을 통해 한국의 전통 문화를 깊이 있게 이해할 수 있습니다.',
    places: ['북촌한옥마을', '남산골한옥마을', '국립국악원', '정동극장'],
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
    gradient: 'from-teal-500 to-green-600',
  },
  {
    icon: ShoppingBag,
    title: '쇼핑',
    description:
      '명동, 동대문, 가로수길 등 서울의 대표 쇼핑 거리에서 최신 패션과 K-뷰티 제품을 만나보세요.',
    places: ['명동', '동대문', '가로수길', '코엑스몰'],
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Sparkles,
    title: '나이트라이프',
    description:
      '홍대, 강남, 이태원의 활기찬 밤 문화를 즐겨보세요. 클럽, 바, 라이브 공연장이 가득합니다.',
    places: ['홍대 클럽거리', '강남역', '이태원', '압구정'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    gradient: 'from-purple-500 to-indigo-600',
  },
];

export const Culture = () => {
  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">서울의 문화</h1>
            <p className="text-lg md:text-xl opacity-90">
              K-Culture, 전통, 음식, 그리고 현대 문화의 조화
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture Sections */}
      <section className="py-12">
        <div className="container-custom space-y-16">
          {cultureSections.map((section, index) => {
            const Icon = section.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {section.description}
                  </p>
                  <div>
                    <h3 className="font-semibold text-korean-teal mb-3">추천 장소</h3>
                    <div className="flex flex-wrap gap-2">
                      {section.places.map((place) => (
                        <span
                          key={place}
                          className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                        >
                          {place}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-korean-teal to-blue-600">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              서울의 문화를 직접 경험하세요
            </h2>
            <p className="text-lg opacity-90 mb-8">
              전통과 현대가 공존하는 독특한 문화 체험이 당신을 기다립니다
            </p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
