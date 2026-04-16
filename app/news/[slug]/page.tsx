'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockNews } from '@/data/mock';
import { getLocalizedField, formatDate } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Calendar, User, Share2 } from 'lucide-react';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const { lang, isRTL } = useLanguage();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const article = mockNews.find((n) => n.slug === slug);
  const related = mockNews.filter((n) => n.slug !== slug && n.status === 'published').slice(0, 3);

  if (!article) {
    return (
      <PublicLayout>
        <div className="container-custom py-32 text-center text-gray-400">
          <p className="text-xl">{lang === 'ar' ? 'المقال غير موجود' : 'Article not found'}</p>
          <Link href="/news" className="mt-4 inline-block text-green-700 hover:underline">
            {lang === 'ar' ? 'العودة إلى الأخبار' : 'Back to News'}
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 text-sm transition-colors"
          >
            <BackArrow size={16} />
            {lang === 'ar' ? 'الأخبار' : 'News'}
          </Link>
        </div>
      </div>

      <article className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {article.category_ar && (
              <span className="inline-block text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100 mb-5">
                {lang === 'ar' ? article.category_ar : article.category_en}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              {getLocalizedField(article, 'title', lang)}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
              {article.published_at && (
                <span className="flex items-center gap-2">
                  <Calendar size={15} />
                  {formatDate(article.published_at, lang)}
                </span>
              )}
              {article.author_ar && (
                <span className="flex items-center gap-2">
                  <User size={15} />
                  {lang === 'ar' ? article.author_ar : article.author_en}
                </span>
              )}
              <button className="flex items-center gap-2 ms-auto text-green-700 hover:text-green-800 font-medium">
                <Share2 size={15} />
                {lang === 'ar' ? 'مشاركة' : 'Share'}
              </button>
            </div>

            {article.image_url && (
              <img
                src={article.image_url}
                alt={getLocalizedField(article, 'title', lang)}
                className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8 shadow-sm"
              />
            )}

            <div className="prose prose-green max-w-none text-gray-600 leading-relaxed space-y-4">
              <p className="text-lg font-medium text-gray-700">
                {getLocalizedField(article, 'description', lang)}
              </p>
              <p>
                {getLocalizedField(article, 'content', lang) ||
                  (lang === 'ar'
                    ? 'تفاصيل المقال ستُعرض هنا عند الاتصال بقاعدة البيانات. يمكن إضافة محتوى تفصيلي وغني من خلال نظام إدارة المحتوى في لوحة الإدارة.'
                    : 'Article details will be displayed here when connected to the database. Detailed and rich content can be added through the content management system in the admin panel.')}
              </p>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {lang === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/news/${rel.slug}`}
                    className="group flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    {rel.image_url && (
                      <img
                        src={rel.image_url}
                        alt={getLocalizedField(rel, 'title', lang)}
                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-green-700 line-clamp-2 transition-colors">
                        {getLocalizedField(rel, 'title', lang)}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PublicLayout>
  );
}
