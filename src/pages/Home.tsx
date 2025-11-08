import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Palmtree,
  Utensils,
  Calendar,
  Bus,
  Info,
  ArrowRight,
} from 'lucide-react';
import { attractions } from '../data/attractions';
import { PageTransition } from '../components/common/PageTransition';

const categories = [
  {
    icon: MapPin,
    title: '명소',
    description: '서울의 대표 관광지',
    path: '/attractions',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Utensils,
    title: '문화',
    description: 'K-Culture와 전통',
    path: '/culture',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Calendar,
    title: '계절',
    description: '사계절 여행 가이드',
    path: '/seasons',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Bus,
    title: '교통',
    description: '편리한 이동 방법',
    path: '/transport',
    gradient: 'from-orange-500 to-red-500',
  },
];

const stats = [
  { label: '인구', value: '9.7M+' },
  { label: '면적', value: '605km²' },
  { label: '연간 방문객', value: '13M+' },
  { label: '지하철 노선', value: '23개' },
];

export const Home = () => {
  const featuredAttractions = attractions.slice(0, 4);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative bg-hero min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-korean-teal/10 to-transparent"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Discover Seoul</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              전통과 현대가 조화를 이루는 역동적인 도시, 서울의 모든 것을 발견하세요.
            </p>
            <Link
              to="/attractions"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>여행 계획 시작하기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-korean-teal mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">카테고리</h2>
            <p className="text-gray-600 mt-4 text-lg">
              서울의 다양한 매력을 탐험하세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={category.path}
                    className="card p-6 h-full hover:scale-105 transition-transform"
                  >
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="section-title">추천 명소</h2>
              <p className="text-gray-600 mt-4 text-lg">
                서울의 대표 관광지를 만나보세요
              </p>
            </div>
            <Link
              to="/attractions"
              className="hidden md:flex items-center space-x-2 text-korean-teal hover:text-korean-crimson font-semibold transition-colors"
            >
              <span>더 보기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAttractions.map((attraction, index) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/attractions/${attraction.id}`} className="card group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{attraction.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {attraction.nameEn}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {attraction.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/attractions" className="btn-primary inline-flex items-center space-x-2">
              <span>모든 명소 보기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Season Highlight */}
      <section className="py-16 bg-gradient-to-r from-korean-teal to-blue-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Palmtree className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              계절별 서울 여행
            </h2>
            <p className="text-lg mb-8 opacity-90">
              봄의 벚꽃, 여름의 한강, 가을의 단풍, 겨울의 설경까지
            </p>
            <Link to="/seasons" className="btn-secondary">
              계절 가이드 보기
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <Info className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              여행 전 꼭 확인하세요
            </h2>
            <p className="text-lg mb-8 opacity-90">
              교통, 숙소, 언어, 에티켓 등 실용적인 여행 정보
            </p>
            <Link to="/tips" className="btn-secondary">
              여행 팁 보기
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
