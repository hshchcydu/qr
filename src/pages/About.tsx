import { motion } from 'framer-motion';
import { Mountain, Target, Heart, Users } from 'lucide-react';
import { PageTransition } from '../components/common/PageTransition';

export const About = () => {
  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-r from-korean-teal to-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Mountain className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Discover Seoul</h1>
            <p className="text-lg md:text-xl opacity-90">
              서울의 아름다움을 전 세계에 소개합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">우리의 미션</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Discover Seoul은 서울을 방문하는 모든 여행자들에게 최고의 여행 경험을 제공하고자 합니다.
              전통과 현대가 공존하는 서울의 독특한 매력을 소개하고, 실용적인 여행 정보를 통해
              여행자들이 더 편리하고 즐거운 서울 여행을 할 수 있도록 돕습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">우리의 가치</h2>
            <p className="text-gray-600">Discover Seoul이 추구하는 핵심 가치</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: '정확한 정보',
                description:
                  '최신의 정확한 정보를 제공하여 여행자들이 신뢰할 수 있는 가이드를 만듭니다.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Heart,
                title: '진정성',
                description:
                  '서울에 대한 진심 어린 사랑으로 진정성 있는 여행 경험을 전달합니다.',
                gradient: 'from-pink-500 to-red-500',
              },
              {
                icon: Users,
                title: '여행자 중심',
                description:
                  '여행자의 입장에서 생각하며, 실제로 도움이 되는 정보를 제공합니다.',
                gradient: 'from-purple-500 to-indigo-500',
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-8 text-center"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">우리가 제공하는 것</h2>
            <div className="space-y-6">
              {[
                {
                  title: '종합적인 명소 안내',
                  description:
                    '경복궁부터 강남까지, 서울의 모든 주요 명소를 상세히 소개합니다.',
                },
                {
                  title: '문화 가이드',
                  description:
                    'K-Pop, 한식, 전통 문화 등 서울의 다양한 문화를 깊이 있게 다룹니다.',
                },
                {
                  title: '계절별 여행 정보',
                  description:
                    '사계절의 아름다움과 각 계절에 맞는 최적의 여행 정보를 제공합니다.',
                },
                {
                  title: '교통 가이드',
                  description:
                    '지하철, 버스, 택시 등 서울의 모든 교통수단을 쉽게 이용할 수 있도록 안내합니다.',
                },
                {
                  title: '실용적인 여행 팁',
                  description:
                    '언어, 통화, 에티켓 등 실제 여행에 필요한 모든 정보를 담았습니다.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 bg-gray-50 p-6 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-korean-teal text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-korean-teal to-blue-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              서울 여행을 시작하세요
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Discover Seoul과 함께 잊지 못할 서울 여행을 만들어보세요
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-white text-korean-teal font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              홈으로 돌아가기
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
