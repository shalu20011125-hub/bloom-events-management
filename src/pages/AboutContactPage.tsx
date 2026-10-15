import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  Flower2,
  ShieldCheck,
  Palette,
  BadgeDollarSign,
  ArrowRight,
} from 'lucide-react';
import { TEAM_MEMBERS } from '../data/eventData.ts';
import { SafeImage } from '../components/SafeImage.tsx';

interface AboutContactPageProps {
  onNavigate: (page: 'home' | 'services' | 'book' | 'about') => void;
}

export function AboutContactPage({ onNavigate }: AboutContactPageProps) {
  // Direct Message form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      setSending(true);
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit direct message');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error('Error submitting message:', err);
      setErrorMsg(err.message || 'Unable to deliver message. Please contact 077031423 directly.');
    } finally {
      setSending(false);
    }
  };

  const whyChooseUs = [
    {
      num: '01',
      title: 'Pristine Fresh Blooms',
      desc: '100% farm-fresh seasonal blossoms sourced within 48 hours of every celebration, conditioned under temperature-controlled European methods.',
      icon: <Flower2 className="w-5 h-5 text-[#A45266]" />,
    },
    {
      num: '02',
      title: 'Custom Mockups',
      desc: 'High-fidelity visual moodboards and 3D architectural stage mockups before a single stem is cut, ensuring complete harmony with your dream.',
      icon: <Palette className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      num: '03',
      title: 'Structural Safety',
      desc: 'Engineered truss setups, fire-retardant fabric drapery, weighted bases, and hurricane glass protection for all live candle ceremonies.',
      icon: <ShieldCheck className="w-5 h-5 text-[#A45266]" />,
    },
    {
      num: '04',
      title: 'Zero Hidden Fees',
      desc: 'Transparent packages quoted in Sri Lankan Rupees (LKR) with breakdown, delivery, floral styling, and teardown included upfront.',
      icon: <BadgeDollarSign className="w-5 h-5 text-[#D4AF37]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDF6F6] text-[#2B2627]">
      
      {/* OUR STORY & CRAFT SECTION */}
      <section className="py-16 lg:py-24 border-b border-[#A45266]/15 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#A45266]">
                OUR STORY & CRAFT
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-bold text-[#2B2627] whitespace-nowrap leading-tight tracking-tight">
                We Bring Your Beautiful Moments to Life
              </h1>
              
              <div className="space-y-4 text-base text-[#5E5356] leading-relaxed">
                <p>
                  Founded along the coastal charm of Mannar, Bloom Events emerged from a deep reverence for classical botanical architecture and the sheer joy of human connection. What began as an intimate boutique floral studio has flourished into Sri Lanka’s revered event styling atelier.
                </p>
                <p>
                  Every arch we erect, every peony runner we drape, and every candle we set is an ode to refined European floristry blended seamlessly with warm island hospitality. We don’t simply decorate venues; we choreograph emotional atmospheres that leave guests spellbound and couples radiant.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('book')}
                  className="cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#A45266] hover:bg-[#8e3f53] active:bg-[#6e2c3c] rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>PLAN YOUR EVENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Changed image to breathtaking grand celebration decoration hall as requested by user */}
            <div className="lg:col-span-4">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
                <SafeImage
                  src="/src/assets/images/story_decor_hall_1792047707931.jpg"
                  alt="Bloom Events grand ballroom ceiling chandelier decoration setup"
                  aspectRatio="aspect-[4/3]"
                  className="w-full h-[420px]"
                  fallbackTitle="Grand Ballroom Celebration Hall"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-serif font-bold text-[#2B2627] shadow-xs">
                  Imperial Grand Ballroom Gala Decor
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OUR MISSION SECTION */}
      <section className="py-20 bg-[#F9EFEF] border-b border-[#A45266]/15">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A45266]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Artistic Philosophy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2627] leading-snug">
            Infusing Celebrations with Grace & Botanical Wonder
          </h2>
          <p className="text-base sm:text-lg text-[#5E5356] leading-relaxed">
            Our mission is rooted in European botanical styling—honoring natural petal contours, asymmetry, organic movement, and nuanced seasonal color palettes. We reject rigid artificial mass decor in favor of living, breathing floral narratives that speak directly to the heart.
          </p>
        </div>
      </section>

      {/* MEET OUR CREATIVE TEAM SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
            The Artists Behind The Blooms
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2627]">
            Meet Our Creative Team
          </h2>
          <p className="text-base text-[#5E5356]">
            Passionate botanical artists and event coordinators dedicated to making your celebration unforgettable.
          </p>
        </div>

        {/* 3-member profile card grid with flower studio backgrounds */}
        {/* Card 1: Shalini (Lead Floral Designer) | Card 2: Sahana (Principal Event Planner holding flower) | Card 3: Harish (Production Lead in work apron) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#A45266]/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="h-80 overflow-hidden relative">
                <SafeImage
                  src={member.image}
                  alt={`${member.name} - ${member.title}`}
                  aspectRatio="aspect-none"
                  className="w-full h-full object-cover"
                  fallbackTitle={member.name}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-[#A45266] uppercase">
                  {member.specialty}
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B2627]">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#A45266] mt-1 mb-3">
                    {member.title}
                  </div>
                  <p className="text-sm text-[#5E5356] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#A45266]/10 flex items-center justify-between text-xs text-[#5E5356]">
                  <span>Bloom Events Mannar</span>
                  <span className="text-[#A45266] font-semibold">Verified Artist</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE BLOOM EVENTS SECTION */}
      <section className="py-20 bg-white border-y border-[#A45266]/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
              Uncompromising Standards
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2627]">
              Why Choose Bloom Events
            </h2>
            <p className="text-base text-[#5E5356]">
              Four unwavering pillars that govern every floral installation and client relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FDF6F6] rounded-2xl p-7 border border-[#A45266]/15 hover:border-[#A45266] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#A45266] bg-white px-2.5 py-1 rounded-md border border-[#A45266]/20">
                      {item.num}
                    </span>
                    <div className="p-2 rounded-lg bg-white shadow-xs">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2B2627] mb-2 group-hover:text-[#A45266] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5E5356] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT OUR STUDIO & DIRECT MESSAGE FORM */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
            Get In Touch
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2627]">
            Contact Our Studio & Direct Message
          </h2>
          <p className="text-base text-[#5E5356]">
            Drop into our Mannar floral workshop or send our stylists a direct message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Studio contact cards */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#2B2627] to-[#1F1B1C] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
                Atelier Location
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Mannar Design Studio
              </h3>
              <p className="text-xs text-[#D3C7C9] mt-1">
                Appointments recommended for one-on-one bridal and event consultations.
              </p>
            </div>

            <div className="space-y-6 text-sm text-[#E8DFE0]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#D4AF37]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">Studio Address</div>
                  <div className="font-medium mt-0.5">27 Blossom Avenue, Floral Park, Mannar</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#D4AF37]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">Phone & WhatsApp</div>
                  <a href="tel:077031423" className="font-medium mt-0.5 block hover:text-white transition-colors">
                    077031423
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#D4AF37]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">Email Inquiries</div>
                  <a href="mailto:bloomevents27@gmail.com" className="font-medium mt-0.5 block hover:text-white transition-colors">
                    bloomevents27@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#D4AF37]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">Business Hours</div>
                  <div className="font-medium mt-0.5">Mon – Sat: 9:00 AM – 7:00 PM</div>
                  <div className="text-xs text-[#D4AF37] mt-0.5">Sunday: By Appointment</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15">
              <button
                onClick={() => onNavigate('book')}
                className="cursor-pointer w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-center text-[#2B2627] bg-[#F3E5AB] hover:bg-white rounded-full transition-colors"
              >
                Schedule In-Studio Consultation →
              </button>
            </div>
          </div>

          {/* Right Column: Direct Message form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#A45266]/20 shadow-lg">
            <div className="border-b border-[#A45266]/15 pb-5 mb-8">
              <h3 className="font-serif text-2xl font-bold text-[#2B2627]">
                Send a Direct Message
              </h3>
              <p className="text-xs text-[#5E5356] mt-1">
                Have a question regarding custom flower varieties or date availability? Reach our team directly.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been stored in our Cloud SQL database. Our Mannar team will respond within 4 business hours.</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                    Your Name <span className="text-[#A45266]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyantha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                    Email Address <span className="text-[#A45266]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                  Subject <span className="text-[#A45266]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inquiring for December Wedding Arch at Mannar"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                  Message <span className="text-[#A45266]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you have in mind..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="cursor-pointer w-full py-4 px-6 text-xs font-semibold tracking-wider uppercase text-white bg-[#A45266] hover:bg-[#8e3f53] active:bg-[#6e2c3c] rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>SEND DIRECT MESSAGE</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
