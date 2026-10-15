export interface GalleryItem {
  id: string;
  title: string;
  category: 'WEDDING' | 'BIRTHDAY' | 'ENGAGEMENT' | 'BABY SHOWER' | 'CORPORATE';
  image: string;
  palette: string[];
  description: string;
  featured?: boolean;
}

export interface PackageTier {
  id: string;
  name: string;
  priceLkr: string;
  badge?: string;
  popular?: boolean;
  idealFor: string;
  features: string[];
}

export const PACKAGES: PackageTier[] = [
  {
    id: 'basic',
    name: 'Basic Package',
    priceLkr: 'LKR 10,000 – 25,000',
    idealFor: 'Intimate family gatherings & private milestone celebrations',
    features: [
      'Bespoke Sweetheart / Head Table Floral Runner',
      'Artisanal Floral Arch or Ring Frame (3m diameter)',
      '100% Fresh Local Blooms (Roses, Chrysanthemums, Ferns)',
      'Soft Warm Ambient Fairy Lights & Hurricane Vases',
      'Delivery, On-Site Setup & 2-Hour Breakdown in Mannar',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    priceLkr: 'LKR 25,000 – 50,000',
    popular: true,
    badge: 'MOST POPULAR',
    idealFor: 'Grand weddings, gala banquets & elegant receptions',
    features: [
      'Grand 3-Tier Multi-Arch Ceremonial Stage Installation',
      'Imported Blush Peonies, Ivory Orchids & Garden Hydrangeas',
      '8 Matching Botanical Table Centerpieces with Candelabras',
      'Custom Neon Name Sign / Illuminated Monogram Backdrop',
      'Full Stage Fabric Draping & Accent Ambient Uplighting',
      'Dedicated Event Day Stylist On-Site for Final Inspection',
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury Package',
    priceLkr: 'LKR 50,000 – 1,00,000',
    idealFor: 'Ultra-luxury weddings, high-society galas & corporate banquets',
    features: [
      'Immersive Botanical Room Transformation (360° Ceiling Hanging Florals)',
      'Magnificent 6m Hand-Crafted Floral Arch with Golden Urns',
      'VIP Table Floral Landscapes with Crystal Glassware & Gold Cutlery Styling',
      'Custom 3D Venue CAD Visualization & Pre-Event Floral Mockup',
      'Complete Stage Lighting Truss, Dry Ice Low-Fog Atmosphere',
      'Lead Creative Director (Shalini) & Full 6-Person Production Crew',
      'Same-Day Tear-down & Post-Event Floral Bouquet Gifting Service',
    ],
  },
];

// EXACTLY 8 DISTINCT TRADITIONAL & FANCY BACKGROUND STAGE DECORATIONS PER CATEGORY (40 TOTAL)
export const GALLERY_ITEMS: GalleryItem[] = [
  // ==========================================
  // 1. WEDDING (8 Traditional & Fancy Setups)
  // ==========================================
  {
    id: 'w-1',
    title: 'Traditional Royal South Asian Mandap Stage',
    category: 'WEDDING',
    image: '/src/assets/images/traditional_wedding_mandap_1792057406911.jpg',
    palette: ['#E5A93C', '#A45266', '#FFFFFF', '#627357'],
    description: 'Carved golden pillars wrapped with fresh white jasmine, marigold and red rose garlands, traditional brass hanging bells, and kuthuvilakku lamps.',
    featured: true,
  },
  {
    id: 'w-2',
    title: 'Grand Imperial Wedding Stage Backdrop',
    category: 'WEDDING',
    image: '/src/assets/images/wedding_stage_backdrop_1792055000992.jpg',
    palette: ['#F7D8DF', '#E8C868', '#FFFFFF', '#627357'],
    description: 'Magnificent floral arch with cascading blush roses, ivory hydrangeas, pleated champagne drapery, and soft gold candelabras.',
    featured: true,
  },
  {
    id: 'w-3',
    title: 'Ceremonial Rose Arch Stage',
    category: 'WEDDING',
    image: '/src/assets/images/hero_floral_arch_1792044971391.jpg',
    palette: ['#F7D8DF', '#E8C868', '#FFFFFF', '#627357'],
    description: 'Monumental ceremonial ballroom arch with over 1,200 fresh garden roses and cascading orchids on polished marble floor.',
    featured: true,
  },
  {
    id: 'w-4',
    title: 'Chandelier Pavilion Ceremony Stage',
    category: 'WEDDING',
    image: '/src/assets/images/popular_wedding_decor_1792044971399.jpg',
    palette: ['#FCEFEF', '#D4AF37', '#A45266'],
    description: 'Gold-framed double arches with draped chiffon, pedestal urns, and crystal chandeliers for vows.',
    featured: true,
  },
  {
    id: 'w-5',
    title: 'Grand Ballroom Hanging Floral Ceiling & Stage',
    category: 'WEDDING',
    image: '/src/assets/images/story_decor_hall_1792047707931.jpg',
    palette: ['#F7D0D8', '#D4AF37', '#342628'],
    description: 'Suspended wisteria and peony chandeliers floating over grand ceremonial hall.',
  },
  {
    id: 'w-6',
    title: 'Floral Botanical Open Mandap Canopy',
    category: 'WEDDING',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    palette: ['#F8E7E7', '#E5A93C', '#FFFFFF'],
    description: 'Four-pillar open botanical mandap adorned with jasmine garlands and blush avalanche roses.',
  },
  {
    id: 'w-7',
    title: 'Cathedral Altar Flower Meadow Backdrop',
    category: 'WEDDING',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    palette: ['#F9ECEC', '#C48B9F', '#3D4A3E'],
    description: 'Continuous ground flower meadow and stage floral pillars lining bridal ceremony.',
  },
  {
    id: 'w-8',
    title: 'Gold Geometric Hexagon Stage Screen',
    category: 'WEDDING',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
    palette: ['#D4AF37', '#FCEFEF', '#A45266'],
    description: 'Interlocking golden hexagons brimming with blush garden roses and delicate moss cushions.',
  },

  // ==========================================
  // 2. BIRTHDAY (8 Traditional & Fancy Setups)
  // ==========================================
  {
    id: 'b-1',
    title: 'Fancy Neon Wings & Mirrored Plinths Stage',
    category: 'BIRTHDAY',
    image: '/src/assets/images/fancy_birthday_balloon_ring_1792057409619.jpg',
    palette: ['#B76E79', '#D4AF37', '#FAD4D8'],
    description: 'Huge circular ring arch with chrome rose gold and blush metallic balloons, dense garden roses, illuminated neon angel wings, and mirrored plinths.',
    featured: true,
  },
  {
    id: 'b-2',
    title: 'Rose Gold Shimmer Sequin & 30 Fabulous Neon Backdrop',
    category: 'BIRTHDAY',
    image: '/src/assets/images/birthday_stage_backdrop_1792055000874.jpg',
    palette: ['#B76E79', '#FAD4D8', '#FFFFFF'],
    description: 'Rose gold shimmer sequin wall with glowing neon script, tiered cylindrical plinths, and organic pastel balloon and fresh rose arch.',
    featured: true,
  },
  {
    id: 'b-3',
    title: 'Chic Monogram Birthday Arch Setup',
    category: 'BIRTHDAY',
    image: '/src/assets/images/popular_birthday_decor_1792044972496.jpg',
    palette: ['#F2BAC9', '#FAD4D8', '#B76E79'],
    description: 'Organic pastel balloon and fresh bloom half-arch with illuminated custom birthday monogram.',
    featured: true,
  },
  {
    id: 'b-4',
    title: 'Traditional Marigold & Jasmine Birthday Stage',
    category: 'BIRTHDAY',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    palette: ['#E5A93C', '#A45266', '#FDF6F6'],
    description: 'Traditional celebration backdrop dressed in vibrant marigolds, brass urlis, and festive flower garlands.',
  },
  {
    id: 'b-5',
    title: 'Pastel Ripple Plinth Stage Backdrop',
    category: 'BIRTHDAY',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    palette: ['#FDE8EC', '#F3E5AB', '#A45266'],
    description: 'Custom fluted white plinths with floral cascades and milestone celebration backdrop.',
  },
  {
    id: 'b-6',
    title: 'Rose Gold Shimmer Photobooth Backdrop',
    category: 'BIRTHDAY',
    image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1200&q=80',
    palette: ['#B76E79', '#FAD4D8', '#FFFFFF'],
    description: 'Sequined shimmer wall flanked by organic blush balloons and fresh pink hydrangeas.',
  },
  {
    id: 'b-7',
    title: 'Velvet Arched Panel & Floral Crown Backdrop',
    category: 'BIRTHDAY',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    palette: ['#6E2C3C', '#D4AF37', '#FCEFEF'],
    description: 'Deep plum velvet arched panel crowned with overflowing blush and peach blossoms.',
  },
  {
    id: 'b-8',
    title: 'Fairy Light Curtain Sweet 16 Stage',
    category: 'BIRTHDAY',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    palette: ['#FBE3E8', '#A45266', '#FFFFFF'],
    description: 'Dreamy pink fairy-light curtain with low floral floor clusters and custom illuminated numbers.',
  },

  // ==========================================
  // 3. ENGAGEMENT (8 Traditional & Fancy Setups)
  // ==========================================
  {
    id: 'e-1',
    title: 'Traditional Temple Arch & Jasmine Garland Stage',
    category: 'ENGAGEMENT',
    image: '/src/assets/images/traditional_engagement_stage_1792057409745.jpg',
    palette: ['#D4AF37', '#A45266', '#FFFFFF'],
    description: 'Carved golden temple arch entwined with fresh jasmine garlands and garden roses, flanked by glowing brass deepam lamps and silk drape.',
    featured: true,
  },
  {
    id: 'e-2',
    title: 'Fairy Light Moon Gate Ring Stage Backdrop',
    category: 'ENGAGEMENT',
    image: '/src/assets/images/engagement_stage_backdrop_1792055001272.jpg',
    palette: ['#F6D0D8', '#E6C687', '#344E41'],
    description: 'Monumental circular floral moon gate arch illuminated with glowing fairy lights canopy, wooden stage, and antique brass lanterns.',
    featured: true,
  },
  {
    id: 'e-3',
    title: 'Sunset Garden Terrace Moon Gate Arch',
    category: 'ENGAGEMENT',
    image: '/src/assets/images/decor_engagement_terrace_1792047710888.jpg',
    palette: ['#F6D0D8', '#E6C687', '#344E41'],
    description: 'Full 360° circular garden rose moon gate with glowing candle lanterns and velvet settee at sunset terrace.',
    featured: true,
  },
  {
    id: 'e-4',
    title: 'Twilight Circular Ring Ceremony Stage',
    category: 'ENGAGEMENT',
    image: '/src/assets/images/popular_engagement_decor_1792044972387.jpg',
    palette: ['#F6D0D8', '#E6C687', '#344E41'],
    description: 'Circular floral ring arch with blush garden roses and twinkling fairy lights in lush garden terrace.',
  },
  {
    id: 'e-5',
    title: 'Traditional Brass Kuthuvilakku & Floral Altar',
    category: 'ENGAGEMENT',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    palette: ['#FFF0F2', '#A45266', '#C5A059'],
    description: 'Traditional tiered brass lamps and rose petal pathway leading to intimate ceremony arbor.',
  },
  {
    id: 'e-6',
    title: 'Suspended Wisteria Pergola Stage Backdrop',
    category: 'ENGAGEMENT',
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=80',
    palette: ['#FCE9ED', '#4F6D7A', '#D4AF37'],
    description: 'Suspended wisteria and gardenia vines cascading above a private engagement banquet stage.',
  },
  {
    id: 'e-7',
    title: 'Gold Nested Ring Backdrop Altar',
    category: 'ENGAGEMENT',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    palette: ['#F9E2E7', '#A45266', '#F5D77F'],
    description: 'Dual nested gold metal rings wrapped with blush peonies and imported Dutch roses.',
  },
  {
    id: 'e-8',
    title: 'Beachfront Sunset Engagement Arbor Backdrop',
    category: 'ENGAGEMENT',
    image: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1200&q=80',
    palette: ['#FDE8EC', '#D4AF37', '#70877F'],
    description: 'Barefoot beachfront timber frame styled with floating chiffon drapery and coral garden roses.',
  },

  // ==========================================
  // 4. BABY SHOWER (8 Traditional & Fancy Setups)
  // ==========================================
  {
    id: 'bs-1',
    title: 'Traditional Golden Jhula Swing & Lotus Stage',
    category: 'BABY SHOWER',
    image: '/src/assets/images/traditional_baby_cradle_1792057408667.jpg',
    palette: ['#D4AF37', '#A45266', '#F3E5AB'],
    description: 'Ornate golden swinging cradle (jhula) adorned with fresh pink lotus, jasmine, and marigold garlands, traditional brass urlis with floating petals, and royal silk drape.',
    featured: true,
  },
  {
    id: 'bs-2',
    title: 'Illuminated BABY Blocks & Floral Bassinet Stage',
    category: 'BABY SHOWER',
    image: '/src/assets/images/decor_baby_shower_luxury_1792047709688.jpg',
    palette: ['#FDE8EC', '#F3E5AB', '#A45266', '#FFFFFF'],
    description: 'Grand luxury baby shower setup with giant illuminated BABY marquee blocks, full floral arch, and antique brass bassinet overflowing with blooms.',
    featured: true,
  },
  {
    id: 'bs-3',
    title: 'Pastel Garden Cloud & Bassinet Cradle Backdrop',
    category: 'BABY SHOWER',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    palette: ['#FDE8EC', '#D4E2D4', '#FFF4E0'],
    description: 'Dreamy floral cloud canopy with soft blush baby breath, white larkspur, and honey-toned teddy accents.',
  },
  {
    id: 'bs-4',
    title: 'Traditional Tuberose & Jasmine Welcome Backdrop',
    category: 'BABY SHOWER',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
    palette: ['#F7F3E9', '#5B8266', '#E8C547'],
    description: 'Clean organic greenery wall accented with fragrant Casablanca lilies, baby blocks, and wicker rocking chair.',
  },
  {
    id: 'bs-5',
    title: 'Botanical Ring of Blessings Arch Backdrop',
    category: 'BABY SHOWER',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    palette: ['#FDF6F6', '#E0A899', '#70877F'],
    description: 'Circular wooden arch woven with dried pampas grass, blush dahlias, and vintage lace drapery.',
  },
  {
    id: 'bs-6',
    title: 'Pastel Balloon & Peony Plinth Stage',
    category: 'BABY SHOWER',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    palette: ['#FDF0F0', '#E28E9E', '#A45266'],
    description: 'Trio of cylindrical baby shower dessert tables with floral runners and pastel balloon garlands.',
  },
  {
    id: 'bs-7',
    title: 'Teddy Bear Floral Hot Air Balloon Backdrop',
    category: 'BABY SHOWER',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    palette: ['#FFF0F2', '#D4AF37', '#B76E79'],
    description: 'Whimsical hot air balloon floral basket centerpiece holding giant plush teddy bear.',
  },
  {
    id: 'bs-8',
    title: 'Mom-to-Be Royal Floral Throne Backdrop',
    category: 'BABY SHOWER',
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    palette: ['#F9E7E7', '#A45266', '#D4AF37'],
    description: 'Peacock rattan throne chair decorated with fresh pink peonies and greenery wing garland.',
  },

  // ==========================================
  // 5. CORPORATE (8 Traditional & Fancy Setups)
  // ==========================================
  {
    id: 'c-1',
    title: 'Executive Living Plant Wall & Orchid Towers Stage',
    category: 'CORPORATE',
    image: '/src/assets/images/corporate_stage_backdrop_1792055001492.jpg',
    palette: ['#2B2627', '#D4AF37', '#FFFFFF'],
    description: 'Modern vertical living plant wall with architectural white orchid towers, gold metallic structural frames, and dramatic ambient stage lighting.',
    featured: true,
  },
  {
    id: 'c-2',
    title: 'Executive Summit Botanical Entrance Tunnel',
    category: 'CORPORATE',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    palette: ['#2C3539', '#C9A96E', '#F4EAE1'],
    description: 'Polished botanical tunnel greeting dignitaries and VIP guests with subtle fragrance & symmetry.',
  },
  {
    id: 'c-3',
    title: 'Annual Awards Stage Backdrop & Foliage Panels',
    category: 'CORPORATE',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    palette: ['#1C1C1C', '#A45266', '#D4AF37'],
    description: 'Dramatic vertical greenery panels with illuminated company insignia and flanking floral plinths.',
  },
  {
    id: 'c-4',
    title: 'Grand Gala Centerpiece Landscapes Stage',
    category: 'CORPORATE',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    palette: ['#2B2627', '#D4AF37', '#FDF6F6'],
    description: 'Architectural floral towers with white calla lilies, gold metallic accents, and LED candle stands.',
  },
  {
    id: 'c-5',
    title: 'VIP Keynote Lectern & Floral Crest Stage',
    category: 'CORPORATE',
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    palette: ['#2B2627', '#D4AF37', '#FFFFFF'],
    description: 'Executive speaking lectern fronted with lush white hydrangea and orchid arrangement.',
  },
  {
    id: 'c-6',
    title: 'Executive Networking Lounge Backdrop',
    category: 'CORPORATE',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    palette: ['#2B2627', '#5B8266', '#D4AF37'],
    description: 'Modern sofa lounges accented with minimalist architectural greenery bowls and marble tables.',
  },
  {
    id: 'c-7',
    title: 'Preserved Moss Logo Brand Wall Backdrop',
    category: 'CORPORATE',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
    palette: ['#3D4A3E', '#F7F3E9', '#D4AF37'],
    description: 'Dense 8ft preserved moss and fern wall with polished 3D company logo lettering.',
  },
  {
    id: 'c-8',
    title: 'Product Launch Keynote Reveal Stage',
    category: 'CORPORATE',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    palette: ['#1F1B1C', '#A45266', '#F5D77F'],
    description: 'Backlit stage with dry ice staging and surrounding floral urns for keynote presentations.',
  },
];

export const CATEGORIES_LIST = [
  {
    id: 'wedding',
    name: 'Wedding',
    title: 'Wedding',
    desc: 'Dreamy floral canopies, bespoke mandaps, and ethereal aisle runners crafted for your union.',
    icon: 'HeartHandshake',
    samplePhotos: [
      { name: 'Traditional Mandap Decoration', image: '/src/assets/images/traditional_wedding_mandap_1792057406911.jpg' },
      { name: 'Wedding Stage Backdrop Decoration', image: '/src/assets/images/wedding_stage_backdrop_1792055000992.jpg' },
      { name: 'Ceremonial Floral Arch Decoration', image: '/src/assets/images/hero_floral_arch_1792044971391.jpg' },
    ],
  },
  {
    id: 'birthday',
    name: 'Birthday',
    title: 'Birthday',
    desc: 'Vibrant botanical installations, milestone balloon arches, and custom celebration backdrops.',
    icon: 'Sparkles',
    samplePhotos: [
      { name: 'Neon Wings Stage Decoration', image: '/src/assets/images/fancy_birthday_balloon_ring_1792057409619.jpg' },
      { name: 'Shimmer Sequin Stage Decoration', image: '/src/assets/images/birthday_stage_backdrop_1792055000874.jpg' },
      { name: 'Monogram Arch Birthday Decoration', image: '/src/assets/images/popular_birthday_decor_1792044972496.jpg' },
    ],
  },
  {
    id: 'engagement',
    name: 'Engagement',
    title: 'Engagement',
    desc: 'Intimate romantic floral rings, candlelit garden backdrops, and timeless ring ceremony stages.',
    icon: 'Gem',
    samplePhotos: [
      { name: 'Traditional Temple Stage Decoration', image: '/src/assets/images/traditional_engagement_stage_1792057409745.jpg' },
      { name: 'Fairy Light Moon Gate Decoration', image: '/src/assets/images/engagement_stage_backdrop_1792055001272.jpg' },
      { name: 'Garden Terrace Ring Decoration', image: '/src/assets/images/decor_engagement_terrace_1792047710888.jpg' },
    ],
  },
  {
    id: 'baby_shower',
    name: 'Baby Shower',
    title: 'Baby Shower',
    desc: 'Whimsical pastel floral clouds, delicate greenery rings, and heartwarming garden centerpieces.',
    icon: 'Baby',
    samplePhotos: [
      { name: 'Traditional Jhula Cradle Decoration', image: '/src/assets/images/traditional_baby_cradle_1792057408667.jpg' },
      { name: 'Illuminated BABY Blocks Decoration', image: '/src/assets/images/decor_baby_shower_luxury_1792047709688.jpg' },
      { name: 'Pastel Garden Cloud Decoration', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    title: 'Corporate Events',
    desc: 'Sophisticated gala table scapes, branded botanical entrance arches, and stage backdrops.',
    icon: 'Building2',
    samplePhotos: [
      { name: 'Living Plant Wall Stage Decoration', image: '/src/assets/images/corporate_stage_backdrop_1792055001492.jpg' },
      { name: 'Executive Summit Entrance Decoration', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80' },
      { name: 'Annual Awards Stage Decoration', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80' },
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Suja',
    occasion: 'Grand Wedding Reception',
    rating: 5,
    quote: 'Bloom Events turned our reception hall into an ethereal floral wonderland. The ceremonial arch was the talk of every guest, and the freshness of the roses throughout the night was extraordinary. Unmatched perfection!',
    location: 'Mannar Town Hall Banquet',
  },
  {
    name: 'Dakshi',
    occasion: 'Milestone 25th Birthday Gala',
    rating: 5,
    quote: 'From the first moodboard consultation to the final candle lighting, Sahana and Harish handled everything with flawless precision. The neon monogram and pastel balloon-floral arch exceeded my highest expectations.',
    location: 'Lagoon Breeze Pavilion',
  },
  {
    name: 'Thakshana',
    occasion: 'Outdoor Garden Engagement',
    rating: 5,
    quote: 'The circular floral moon gate under the twilight fairy lights felt like a royal fairytale. The transparent pricing and zero hidden fees gave us complete peace of mind. Truly the finest event stylists in Sri Lanka!',
    location: 'Palmyra Palms Beachfront',
  },
];

export const TEAM_MEMBERS = [
  {
    id: 'shalini',
    name: 'Shalini',
    title: 'Lead Floral Designer & Creative Director',
    bio: 'Trained in classical European botanical artistry, Shalini curates bespoke floral palettes and architectural floral scapes with over a decade of luxury event mastery.',
    image: '/src/assets/images/team_creative_director_1792044972562.jpg',
    specialty: 'Grand Ceremonial Arches & Peony Scapes',
  },
  {
    id: 'sahana',
    name: 'Sahana',
    title: 'Principal Event Planner',
    bio: 'Specializing in high-profile weddings and seamless event timelines, Sahana coordinates venues, client vision mockups, and client communication with calm precision.',
    image: '/src/assets/images/team_sahana_planner_1792047709422.jpg',
    specialty: 'Timeline Logistics & VIP Client Care',
  },
  {
    id: 'harish',
    name: 'Harish',
    title: 'Production & Staging Lead',
    bio: 'Overseeing structural safety, certified truss rigging, candle illumination, and precision overnight installations to ensure every botanical setup stands flawlessly.',
    image: '/src/assets/images/team_harish_production_1792047709441.jpg',
    specialty: 'Structural Rigging, Lighting & Safety',
  },
];
