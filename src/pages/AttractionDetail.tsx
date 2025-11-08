import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  DollarSign,
  Train,
  Lightbulb,
  ArrowLeft,
} from 'lucide-react';
import { attractions } from '../data/attractions';
import { PageTransition } from '../components/common/PageTransition';

export const AttractionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const attraction = attractions.find((a) => a.id === id);

  if (!attraction) {
    return (
      <PageTransition>
        <div className="container-custom py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            명소를 찾을 수 없습니다
          </h1>
          <Link to="/attractions" className="btn-primary">
            명소 목록으로 돌아가기
          </Link>
        </div>
      </PageTransition>
    );
  }

  const nearbyAttractions = attractions.filter((a) =>
    attraction.nearbyAttractions.includes(a.id)
  );

  return (
    <PageTransition>
      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 text-white p-8">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {attraction.name}
              </h1>
              <p className="text-xl opacity-90">{attraction.nameEn}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="bg-gray-50 py-4">
        <div className="container-custom">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-korean-teal hover:text-korean-crimson transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로 돌아가기</span>
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">상세 정보</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {attraction.fullDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Image Gallery */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">갤러리</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {attraction.images.map((image, index) => (
                    <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${attraction.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Lightbulb className="w-6 h-6 text-korean-gold" />
                  <span>방문 팁</span>
                </h3>
                <ul className="space-y-2">
                  {attraction.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-korean-teal mt-1">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">정보</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-korean-teal mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-500 mb-1">
                        위치
                      </div>
                      <div className="text-gray-900">{attraction.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-korean-teal mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-500 mb-1">
                        운영시간
                      </div>
                      <div className="text-gray-900">{attraction.hours}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <DollarSign className="w-5 h-5 text-korean-teal mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-500 mb-1">
                        입장료
                      </div>
                      <div className="text-gray-900">{attraction.fee}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Train className="w-5 h-5 text-korean-teal mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-500 mb-1">
                        가는 방법
                      </div>
                      <div className="text-gray-900">{attraction.transport}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Attractions */}
          {nearbyAttractions.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">주변 추천 명소</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {nearbyAttractions.map((nearby) => (
                  <Link
                    key={nearby.id}
                    to={`/attractions/${nearby.id}`}
                    className="card group"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={nearby.image}
                        alt={nearby.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{nearby.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {nearby.nameEn}
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {nearby.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};
