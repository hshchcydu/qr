import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/types';
import { formatRelativeTime, getSentimentColor } from '@/utils';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <article className="card hover:shadow-lg transition-shadow">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <div className="flex items-center gap-2 mb-2">
        <span className={`badge ${getSentimentColor(article.sentiment)}`}>
          {article.category}
        </span>
        {article.sentiment && (
          <span className={`badge ${getSentimentColor(article.sentiment)}`}>
            {article.sentiment}
          </span>
        )}
      </div>

      <Link to={`/news/${article.id}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
          {article.title}
        </h3>
      </Link>

      <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="font-medium">{article.source}</span>
          <span>•</span>
          <span>{article.author}</span>
        </div>
        <time>{formatRelativeTime(article.publishedAt)}</time>
      </div>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge bg-gray-100 text-gray-700">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

export default NewsCard;
