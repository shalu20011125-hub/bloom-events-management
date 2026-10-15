import { ArrowRight, Star, Sparkles, HeartHandshake, Gem, Baby, Building2, CheckCircle2, ShieldCheck, Flower2 } from 'lucide-react';
import { CATEGORIES_LIST, TESTIMONIALS } from '../data/eventData.ts';
import { SafeImage } from '../components/SafeImage.tsx';

interface HomePageProps {
  onNavigate: (page: 'home' | 'services' | 'book' | 'about') => void;
  onSelectCategory?: (category: string) => void;
  onSelectPackageForBooking?: (pkgTier: string) => void;
}

export function HomePage({ onNavigate, onSelectCategory, onSelectPackageForBooking }: HomePageProps) {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#A45266]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#A45266]" />;
      case 'Gem':
        return <Gem className="w-6 h-6 text-[#A45266]" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-[#A45266]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#A45266]" />;
      default:
        return <Flower2 className="w-6 h-6 text-[#A45266]" />;
    }
  };

  const popularDesigns = [
    {
      categoryTag: 'WEDDING DECOR',
      title: 'Grand Imperial Wedding Stage',
      image: '/src/assets/images/popular_wedding_decor_1792044971399.jpg',
      packageTier: 'Luxury Package',
      features: [
        'Twin towering floral urns with ivory avalanche roses',
        'Cascading blush peony runners & golden candelabras',
        'Crystal chandelier ceiling draping with soft champagne chiffon',
        'Velvet royal sweetheart thrones with floral floor ring',
      ],
    },
    {
      categoryTag: 'BIRTHDAY DECOR',
      title: 'Chic Monogram Birthday Arch',
      image: '/src/assets/images/popular_birthday_decor_1792044972496.jpg',
      packageTier: 'Premium Package',
      features: [
        'Organic pastel balloon & fresh floral half-arch installation',
        'Custom warm white neon name sign & monogram backdrop',
        'Champagne & cocktail dessert table botanical styling',
        'Coordinated guest welcome easel with live greenery garlands',
      ],
    },
    {
      categoryTag: 'ENGAGEMENT DECOR',
      title: 'Twilight Garden Ring Ceremony',
      image: '/src/assets/images/popular_engagement_decor_1792044972387.jpg',
      packageTier: 'Premium Package',
      features: [
        'Full 360-degree circular floral moon gate frame',
        'Warm twinkling fairy light canopy & antique brass candle lanterns',
        'Persian carpet runway lined with garden rose petals',
        'Intimate sweetheart bench with trailing silver dollar eucalyptus',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDF6F6] text-[#2B2627]">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#A45266]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Headline, Subtitle, Two Primary Buttons */}
            <div className="lg:col-span-6 space-y-6 lg:pr-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A45266]">
                <Flower2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Premier Floral Atelier · Mannar</span>
              </div>

              {/* Exact headline requirement: 56px, dark charcoal with pink highlight on single line */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] xl:text-[56px] font-bold text-[#2B2627] whitespace-nowrap leading-tight tracking-tight">
                Make Every Moment <span className="text-[#A45266] italic font-normal">Bloom</span>
              </h1>

              {/* Descriptive subtitle 16px */}
              <p className="text-base text-[#5E5356] leading-relaxed max-w-xl">
                We craft opulent floral stages, grand ceremonial arches, and dreamy milestone ambiances that transform life's most precious occasions into timeless botanical works of art.
              </p>

              {/* Two Primary Buttons: Plum button + Outlined button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('services')}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#A45266] hover:bg-[#8e3f53] active:bg-[#6e2c3c] rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('book')}
                  className="cursor-pointer inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-[#A45266] bg-transparent hover:bg-[#A45266]/10 border-2 border-[#A45266] rounded-full transition-colors duration-200"
                >
                  Book Your Event
                </button>
              </div>

              {/* Trust signals */}
              <div className="pt-4 flex items-center gap-6 text-xs text-[#5E5356]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Licensed Floral Engineers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A45266]" />
                  <span>Transparent LKR Pricing</span>
                </div>
              </div>
            </div>

            {/* Right Side: Rounded card displaying high-res hero photo of grand ceremonial floral arch stage */}
            {/* Fully visible with no overlay boxes as explicitly mandated */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/src/assets/images/hero_floral_arch_1792044971391.jpg"
                  alt="Grand ceremonial floral arch stage by Bloom Events"
                  className="w-full h-[460px] lg:h-[520px] object-cover"
                />
              </div>
            </div>

          </div>

          {/* Below Hero: Key Statistics Row */}
          <div className="mt-16 pt-8 border-t border-[#A45266]/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="bg-white/80 p-5 rounded-2xl border border-[#A45266]/10 shadow-xs">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#A45266]">
                100%
              </div>
              <div className="text-sm font-medium text-[#2B2627] mt-1">
                Fresh Cut Florals
              </div>
              <div className="text-xs text-[#5E5356] mt-0.5">
                Imported & local farm-fresh daily
              </div>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-[#A45266]/10 shadow-xs">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                4.9★
              </div>
              <div className="text-sm font-medium text-[#2B2627] mt-1">
                Client Rating
              </div>
              <div className="text-xs text-[#5E5356] mt-0.5">
                Over 300+ verified customer reviews
              </div>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-[#A45266]/10 shadow-xs">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2627]">
                500+
              </div>
              <div className="text-sm font-medium text-[#2B2627] mt-1">
                Celebrations Styled
              </div>
              <div className="text-xs text-[#5E5356] mt-0.5">
                Weddings, galas & luxury events
              </div>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-[#A45266]/10 shadow-xs">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#A45266]">
                24h
              </div>
              <div className="text-sm font-medium text-[#2B2627] mt-1">
                Freshness Guarantee
              </div>
              <div className="text-xs text-[#5E5356] mt-0.5">
                Temp-controlled sourcing & staging
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CELEBRATION CATEGORIES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
            Tailored Experiences
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2627]">
            Celebration Categories
          </h2>
          <p className="text-base text-[#5E5356]">
            Every occasion deserves an ambiance that reflects the grandeur and joy of your milestone.
          </p>
        </div>

        {/* 5-column horizontal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES_LIST.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-6 border border-[#A45266]/15 hover:border-[#A45266] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FDF6F6] group-hover:bg-[#A45266]/15 flex items-center justify-center transition-colors mb-5">
                  {getCategoryIcon(cat.icon)}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B2627] group-hover:text-[#A45266] transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-[#5E5356] leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    if (onSelectCategory) {
                      onSelectCategory(cat.name.toUpperCase());
                    }
                    onNavigate('services');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A45266] hover:text-[#8e3f53] transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR DECORATION DESIGNS SECTION */}
      <section className="py-20 bg-[#F7EEEE] border-y border-[#A45266]/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
              Signature Installations
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2627]">
              Popular Decoration Designs
            </h2>
            <p className="text-base text-[#5E5356]">
              Explore our most requested bespoke floral arrangements, crafted to bring theatrical beauty to your celebration.
            </p>
          </div>

          {/* 3-column grid displaying high-quality photograph cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDesigns.map((design, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-[#A45266]/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Photo container */}
                <div className="relative h-64 overflow-hidden">
                  <SafeImage
                    src={design.image}
                    alt={design.title}
                    aspectRatio="aspect-none"
                    className="w-full h-full"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#A45266] shadow-xs">
                    {design.categoryTag}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2B2627] mb-3">
                      {design.title}
                    </h3>
                    <ul className="space-y-2 text-sm text-[#5E5356]">
                      {design.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solid plum button "BOOK THIS DECOR →" */}
                  <div>
                    <button
                      onClick={() => {
                        if (onSelectPackageForBooking) {
                          onSelectPackageForBooking(design.packageTier);
                        }
                        onNavigate('book');
                      }}
                      className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold tracking-wider uppercase text-white bg-[#A45266] hover:bg-[#8e3f53] active:bg-[#6e2c3c] rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <span>BOOK THIS DECOR</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-[#A45266] hover:text-[#8e3f53] transition-colors"
            >
              <span>View All Signature Gallery Setups</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
            Real Celebrations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2627]">
            What Our Clients Say
          </h2>
          <p className="text-base text-[#5E5356]">
            Stories from hosts whose milestone days bloomed with elegance and joy.
          </p>
        </div>

        {/* 3-column card layout with 5-star ratings and customer review quotes */}
        {/* Exact names: Suja, Dakshi, Thakshana */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-[#A45266]/15 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#D4AF37]" />
                  ))}
                </div>

                {/* Review quote */}
                <p className="text-sm text-[#2B2627] italic leading-relaxed mb-6">
                  “{t.quote}”
                </p>
              </div>

              {/* Exact customer name and event detail */}
              <div className="pt-4 border-t border-[#A45266]/15">
                <div className="font-serif text-lg font-bold text-[#A45266]">
                  {t.name}
                </div>
                <div className="text-xs text-[#5E5356] font-medium mt-0.5">
                  {t.occasion} · {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
