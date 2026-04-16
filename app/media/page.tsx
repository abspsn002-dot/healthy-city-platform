'use client';

import { useState } from 'react';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockMediaFiles, mockDocuments } from '@/data/mock';
import { getLocalizedField } from '@/lib/utils';
import { Image as ImageIcon, FileText, Download, X } from 'lucide-react';

type MediaTab = 'gallery' | 'publications';

export default function MediaPage() {
  const { lang, t } = useLanguage();
  const [tab, setTab] = useState<MediaTab>('gallery');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images = mockMediaFiles.filter((m) => m.file_type === 'image' && m.status === 'published');
  const docs = mockDocuments.filter((d) => d.status === 'published');

  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-slate-50 to-green-50 py-16">
        <div className="container-custom">
          <SectionHeader
            title={t.media.title}
            subtitle={lang === 'ar' ? 'استعرض الصور والمطبوعات الخاصة بالبرنامج' : 'Browse photos and publications related to the program'}
            align="start"
          />
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex gap-2 mb-10 border-b border-gray-200">
            {[
              { key: 'gallery', icon: ImageIcon, label_ar: t.media.gallery, label_en: t.media.gallery },
              { key: 'publications', icon: FileText, label_ar: t.media.publications, label_en: t.media.publications },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key as MediaTab)}
                  className={`flex items-center gap-2 pb-3 px-4 text-sm font-medium border-b-2 transition-all -mb-px ${
                    tab === item.key
                      ? 'border-green-700 text-green-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  {lang === 'ar' ? item.label_ar : item.label_en}
                </button>
              );
            })}
          </div>

          {tab === 'gallery' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setLightbox(img.file_url)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-zoom-in"
                >
                  <img
                    src={img.thumbnail_url || img.file_url}
                    alt={getLocalizedField(img, 'alt', lang) || getLocalizedField(img, 'title', lang)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                    <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                      {getLocalizedField(img, 'title', lang)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {tab === 'publications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {docs.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm card-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                      <FileText size={20} className="text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                        {getLocalizedField(doc, 'title', lang)}
                      </h3>
                      {doc.category_ar && (
                        <span className="text-xs text-gray-400 mb-2 block">
                          {lang === 'ar' ? doc.category_ar : doc.category_en}
                        </span>
                      )}
                      {doc.description_ar && (
                        <p className="text-gray-500 text-xs line-clamp-2 mb-3">
                          {getLocalizedField(doc, 'description', lang)}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 uppercase font-medium">
                          {doc.file_type} {doc.file_size && `• ${formatSize(doc.file_size)}`}
                        </span>
                        <a
                          href={doc.file_url}
                          className="inline-flex items-center gap-1.5 text-green-700 hover:text-green-800 text-xs font-semibold"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download size={13} />
                          {t.media.download}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img
            src={lightbox}
            alt="Preview"
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PublicLayout>
  );
}
