import { useState } from 'react';
import { Check, ArrowRight, X, ZoomIn } from 'lucide-react';
import { CATEGORIES_LIST, GALLERY_ITEMS, PACKAGES, GalleryItem } from '../data/eventData.ts';
import { SafeImage } from '../components/SafeImage.tsx';

interface ServicesGalleryPageProps {
  onNavigate: (page: 'home' | 'services' | 'book' | 'about') => void;
  onSelectPackageForBooking: (pkgTier: string) => void;
  initialTab?: string;
}

export function ServicesGalleryPage({
  onNavigate,
  onSelectPackageForBooking,
  initialTab = 'ALL',
}: ServicesGalleryPageProps) {
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const tabs = ['ALL', 'WEDDING', 'BIRTHDAY', 'ENGAGEMENT', 'BABY SHOWER', 'CORPORATE'];

  // Filter gallery items based on active tab
  const filteredGallery = selectedTab === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedTab);

  const handleBookPackage = (packageName: string) => {
    onSelectPackageForBooking(packageName);
    onNavigate('book');
  };

  return (
    <div className="min-h-screen bg-[#FDF6F6] text-[#2B2627]">
      
      {/* PAGE HEADER */}
      <section className="pt-12 pb-14 border-b border-[#A45266]/15 bg-gradient-to-b from-white via-[#FDF6F6] to-[#FDF6F6]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
            Atelier Portfolio & Pricing
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2B2627] tracking-tight">
            Our Services & Design Gallery
          </h1>
          <p className="text-base text-[#5E5356] max-w-2xl mx-auto">
            From imperial botanical arches to whimsical bespoke birthday monograms, discover our portfolio of handcrafted celebrations across Sri Lanka.
          </p>
        </div>
      </section>

      {/* SPECIALIZED DECORATION SERVICES */}
      {/* 5 event categories. Each features 3 distinct high-res decoration photo cards with ONLY the event name label below each photo */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#A45266] mb-1">
            Specialized Categories
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#2B2627]">
            Specialized Decoration Services
          </h2>
          <p className="text-sm text-[#5E5356] mt-1">
            Signature styling concepts tailored to each milestone.
          </p>
        </div>

        <div className="space-y-14">
          {CATEGORIES_LIST.map((category) => (
            <div key={category.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#A45266]/15 shadow-xs">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#A45266]/10 gap-3">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B2627]">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#5E5356] mt-0.5">
                    {category.desc}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedTab(category.name.toUpperCase());
                    const galleryElem = document.getElementById('floral-gallery-section');
                    galleryElem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer text-xs font-semibold text-[#A45266] hover:text-[#8e3f53] transition-colors self-start sm:self-auto uppercase tracking-wider"
                >
                  View {category.title} Gallery →
                </button>
              </div>

              {/* 3 distinct high-resolution decoration photo cards with ONLY the event name label below each photo */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {category.samplePhotos.map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    className="group bg-[#FDF6F6] rounded-2xl overflow-hidden border border-[#A45266]/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <SafeImage
                        src={photo.image}
                        alt={`${category.title} Decoration sample ${pIdx + 1}`}
                        aspectRatio="aspect-none"
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        fallbackTitle={photo.name}
                      />
                    </div>
                    {/* ONLY the event name label below each photo */}
                    <div className="py-3 px-4 bg-white text-center border-t border-[#A45266]/10">
                      <span className="text-sm font-serif font-bold text-[#2B2627]">
                        {photo.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* FLORAL DESIGN GALLERY SECTION */}
      <section id="floral-gallery-section" className="py-20 bg-[#F9EFEF] border-y border-[#A45266]/15">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
              Interactive Portfolio
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2627]">
              Floral Design Gallery
            </h2>
            <p className="text-base text-[#5E5356]">
              Browse through our strictly curated background stage decorations. Click any setup to view full resolution details.
            </p>
          </div>

          {/* Interactive Category Tabs: ALL, WEDDING, BIRTHDAY, ENGAGEMENT, BABY SHOWER, CORPORATE */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`cursor-pointer px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${
                  selectedTab === tab
                    ? 'bg-[#A45266] text-white shadow-md ring-2 ring-[#A45266]/30'
                    : 'bg-white text-[#2B2627]/80 hover:bg-[#FDF6F6] hover:text-[#A45266] border border-[#A45266]/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 20-photo grid of pure floral decoration setups */}
          {/* USER REQUIREMENT: "Floral Design Gallery vaara ovvoru pictures ku keezha uh vaara text eallam venam..modify panni thaa" */}
          {/* NO TEXT BELOW THE PICTURES - Clean, pristine luxury photo cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-[#A45266]/20 shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative bg-white h-64 sm:h-72"
              >
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  aspectRatio="aspect-none"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  fallbackTitle={item.title}
                />

                {/* Event Tag in top left of photo */}
                <div className="absolute top-3 left-3 bg-[#2B2627]/85 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
                  {item.category}
                </div>

                {/* Hover overlay with zoom button */}
                <div className="absolute inset-0 bg-[#A45266]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-white text-[#A45266] flex items-center justify-center shadow-lg mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-serif font-bold text-white drop-shadow-md">
                    Click to View Setup
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SIGNATURE DECORATION PACKAGES */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
            Transparent Investment
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2627]">
            Signature Decoration Packages
          </h2>
          <p className="text-base text-[#5E5356]">
            Tailored all-inclusive packages designed for celebration excellence in Sri Lankan Rupees (LKR).
          </p>
        </div>

        {/* 3-tier pricing card layout in Sri Lankan Rupees (LKR) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-white border-2 border-[#A45266] shadow-xl ring-4 ring-[#A45266]/10 lg:-translate-y-2'
                  : 'bg-white/80 border border-[#A45266]/20 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Highlight badge for Premium package */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#A45266] text-white text-[11px] font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div>
                <div className="text-center pb-6 border-b border-[#A45266]/15">
                  <h3 className="font-serif text-2xl font-bold text-[#2B2627]">
                    {pkg.name}
                  </h3>
                  <div className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-[#A45266]">
                    {pkg.priceLkr}
                  </div>
                  <p className="text-xs text-[#5E5356] mt-2">
                    {pkg.idealFor}
                  </p>
                </div>

                {/* Clean feature checklists with tick icons */}
                <div className="py-6 space-y-3.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#A45266]">
                    What's Included:
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-[#2B2627]">
                        <div className="w-5 h-5 rounded-full bg-[#A45266]/10 text-[#A45266] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* BOOK THIS DECORATION → button */}
              <div className="pt-6 border-t border-[#A45266]/15">
                <button
                  onClick={() => handleBookPackage(pkg.name)}
                  className={`cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-[#A45266] hover:bg-[#8e3f53] text-white shadow-md hover:shadow-lg'
                      : 'bg-white hover:bg-[#A45266] text-[#A45266] hover:text-white border-2 border-[#A45266]'
                  }`}
                >
                  <span>BOOK THIS DECORATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Deposit reminder note */}
        <div className="mt-12 p-4 bg-white/70 rounded-2xl border border-[#A45266]/15 text-center max-w-xl mx-auto text-xs text-[#5E5356]">
          <span className="font-semibold text-[#A45266]">PayHere Certified Deposit:</span> All packages require an advance reservation deposit of LKR 5,000 to lock your event date on our master calendar.
        </div>
      </section>

      {/* LIGHTBOX MODAL FOR GALLERY DETAIL */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative h-72 sm:h-96 overflow-hidden">
              <SafeImage
                src={activeModalItem.image}
                alt={activeModalItem.title}
                aspectRatio="aspect-none"
                className="w-full h-full object-cover"
                fallbackTitle={activeModalItem.title}
              />
              <button
                onClick={() => setActiveModalItem(null)}
                className="cursor-pointer absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-white/95 text-[#A45266] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                {activeModalItem.category} Background Decor
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2B2627]">
                  {activeModalItem.title}
                </h3>
                <p className="text-sm text-[#5E5356] mt-2 leading-relaxed">
                  {activeModalItem.description}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-[#A45266] uppercase tracking-wider mb-2">
                  Curated Floral Palette
                </div>
                <div className="flex items-center gap-2">
                  {activeModalItem.palette.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-[#5E5356]">
                      <span className="w-4 h-4 rounded-full border border-black/10 inline-block" style={{ backgroundColor: c }} />
                      <span className="font-mono text-[11px]">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#A45266]/15 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="cursor-pointer px-5 py-2.5 text-xs font-semibold text-[#2B2627] hover:bg-[#FDF6F6] rounded-full"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveModalItem(null);
                    onNavigate('book');
                  }}
                  className="cursor-pointer px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#A45266] hover:bg-[#8e3f53] text-white rounded-full shadow-md"
                >
                  Book This Decor →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
