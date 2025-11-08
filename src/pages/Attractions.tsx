import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { attractions, getCategoryLabel } from '../data/attractions';
import { PageTransition } from '../components/common/PageTransition';

const categories = ['all', 'palace', 'modern', 'nature', 'shopping', 'culture'];

export const Attractions = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAttractions =
    selectedCategory === 'all'
      ? attractions
      : attractions.filter((a) => a.category === selectedCategory);

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-r from-korean-teal to-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">서울의 명소</h1>
            <p className="text-lg md:text-xl opacity-90">
              역사적인 궁궐부터 현대적인 랜드마크까지
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200 py-6 sticky top-16 md:top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-korean-teal text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction, index) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/attractions/${attraction.id}`}
                  className="card group h-full flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-xl mb-1">
                          {attraction.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {attraction.nameEn}
                        </p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-korean-teal/10 text-korean-teal font-medium">
                        {getCategoryLabel(attraction.category)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                      {attraction.description}
                    </p>
                    <div className="mt-4 text-korean-teal font-semibold text-sm group-hover:underline">
                      자세히 보기 →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredAttractions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              해당 카테고리에 명소가 없습니다.
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};
