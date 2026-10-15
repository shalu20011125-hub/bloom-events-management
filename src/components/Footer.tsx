import { Flower2, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'services' | 'book' | 'about') => void;
  onOpenCoordinatorHub: () => void;
}

export function Footer({ onNavigate, onOpenCoordinatorHub }: FooterProps) {
  return (
    <footer className="bg-[#A45266] text-white border-t border-[#8e3f53] pt-16 pb-12 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/20">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-[#F3E5AB]">
                <Flower2 className="w-5 h-5 text-current" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Bloom Events
              </span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed font-normal">
              Mannar’s premier botanical architecture and event styling atelier. Crafting grand floral arches, bespoke stages, and romantic celebrations that live forever in memory.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('book')}
                className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] hover:text-white transition-colors"
              >
                <span>Reserve Your Date</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="cursor-pointer text-white/90 hover:text-[#F3E5AB] transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="cursor-pointer text-white/90 hover:text-[#F3E5AB] transition-colors text-left"
                >
                  Services & Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('book')}
                  className="cursor-pointer text-white/90 hover:text-[#F3E5AB] transition-colors text-left"
                >
                  Book an Event
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="cursor-pointer text-white/90 hover:text-[#F3E5AB] transition-colors text-left"
                >
                  About & Contact
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenCoordinatorHub}
                  className="cursor-pointer text-xs text-[#F3E5AB] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Coordinator Reminder Hub</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/20 text-white font-medium">Automated</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialties */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              Specialties
            </h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3E5AB]" />
                <span>Grand Ceremonial Floral Arches</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3E5AB]" />
                <span>Luxury Wedding Stage Mandaps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3E5AB]" />
                <span>Milestone Birthday Monograms</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3E5AB]" />
                <span>Whimsical Baby Shower Florals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3E5AB]" />
                <span>Executive Corporate Gala Scapes</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Dedicated Studio Inquiries (Exact specifications) */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              Studio Inquiries
            </h4>
            <div className="space-y-3 text-sm text-white/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F3E5AB] shrink-0 mt-1" />
                <span>27 Blossom Avenue, Floral Park, Mannar</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F3E5AB] shrink-0" />
                <a href="tel:077031423" className="hover:text-[#F3E5AB] transition-colors">
                  077031423
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F3E5AB] shrink-0" />
                <a href="mailto:bloomevents27@gmail.com" className="hover:text-[#F3E5AB] transition-colors">
                  bloomevents27@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#F3E5AB] shrink-0 mt-1" />
                <div className="leading-snug">
                  <div>Mon – Sat: 9:00 AM – 7:00 PM</div>
                  <div className="text-xs text-[#F3E5AB] mt-0.5 font-medium">Sunday: By Appointment</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/80 gap-4">
          <p>© {new Date().getFullYear()} Bloom Events. All rights reserved. Mannar, Sri Lanka.</p>
          <div className="flex items-center gap-4 sm:gap-6 font-medium">
            <span>PayHere Certified LKR Gateway</span>
            <span>·</span>
            <span>100% Fresh Botanical Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
