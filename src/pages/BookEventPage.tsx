import { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  FileCheck,
  Lock,
} from 'lucide-react';
import { PACKAGES } from '../data/eventData.ts';

interface BookEventPageProps {
  preSelectedPackage?: string;
  onNavigate: (page: 'home' | 'services' | 'book' | 'about') => void;
}

export function BookEventPage({ preSelectedPackage = 'Premium Package', onNavigate }: BookEventPageProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [packageTier, setPackageTier] = useState(preSelectedPackage || 'Premium Package');
  const [visionNotes, setVisionNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'PayHere Gateway (LKR)' | 'Credit / Debit Card'>('PayHere Gateway (LKR)');
  
  // Submission & Confirmation State
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [simulatedEmails, setSimulatedEmails] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Selected package details
  const currentPackage = PACKAGES.find((p) => p.name === packageTier) || PACKAGES[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !phone || !eventDate || !venueCity) {
      setErrorMsg('Please complete all required fields before proceeding with deposit payment.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          eventType,
          eventDate,
          venueCity,
          packageTier,
          packagePriceRange: currentPackage.priceLkr,
          visionNotes,
          paymentMethod,
          depositAmountLkr: 5000,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit booking inquiry');
      }

      setConfirmedBooking(data.booking);
      setSimulatedEmails(data.emailsDispatched);
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setErrorMsg(err.message || 'Payment or reservation could not be completed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const bookingProcessSteps = [
    {
      step: '01',
      title: 'Consultation & Moodboard',
      desc: 'Style & palette selection tailored to your aesthetic preferences and event scale.',
    },
    {
      step: '02',
      title: 'Site Walkthrough & Proposal',
      desc: 'Venue measurements & lighting assessment in Mannar or requested Sri Lankan location.',
    },
    {
      step: '03',
      title: 'Design Finalization & Deposit',
      desc: 'Confirming floral themes & locking your calendar booking slot with LKR 5,000 deposit.',
    },
    {
      step: '04',
      title: 'Fresh Sourcing & Pre-Assembly',
      desc: 'Sourcing fresh premium blooms 48h prior to preserve dew freshness and scent.',
    },
    {
      step: '05',
      title: 'Flawless On-Site Execution',
      desc: 'Professional arrangement, certified structural rigging & candle installation.',
    },
    {
      step: '06',
      title: 'Post-Event Teardown',
      desc: 'Timely dismantling and respectful floral repurposing after the celebration concludes.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDF6F6] text-[#2B2627]">
      
      {/* PAGE HEADER */}
      <section className="pt-12 pb-10 border-b border-[#A45266]/15 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A45266]">
            Secure Calendar Reservation
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2627] tracking-tight">
            Book Your Event
          </h1>
          <p className="text-sm sm:text-base text-[#5E5356] max-w-2xl mx-auto">
            Reserve your date with Bloom Events. Lock in your consultation and secure our certified styling crew with an advance confirmation deposit.
          </p>
        </div>
      </section>

      {/* TWO-COLUMN LAYOUT */}
      <section className="py-12 lg:py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Event Details & Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#A45266]/20 shadow-lg">
            <div className="border-b border-[#A45266]/15 pb-5 mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2627]">
                Event Details & Consultation
              </h2>
              <p className="text-xs text-[#5E5356] mt-1">
                Fill in your celebration specifications. Advance deposit of LKR 5,000 locks your slot on our master calendar.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                  Full Name <span className="text-[#A45266]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shalini Fernando"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                    Phone Number <span className="text-[#A45266]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 077031423"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                  />
                </div>
              </div>

              {/* Event Type & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                    Event Type <span className="text-[#A45266]">*</span>
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Corporate Events">Corporate Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                    Preferred Event Date <span className="text-[#A45266]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                  />
                </div>
              </div>

              {/* Event Venue / City */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                  Event Venue / City <span className="text-[#A45266]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Ballroom, Mannar Town / Lagoon Hotel"
                  value={venueCity}
                  onChange={(e) => setVenueCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                />
              </div>

              {/* Decoration Package Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                  Decoration Package Selection <span className="text-[#A45266]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PACKAGES.map((pkg) => (
                    <button
                      type="button"
                      key={pkg.id}
                      onClick={() => setPackageTier(pkg.name)}
                      className={`p-3.5 text-left rounded-xl border transition-all ${
                        packageTier === pkg.name
                          ? 'border-[#A45266] bg-[#A45266]/10 ring-2 ring-[#A45266]/20'
                          : 'border-[#A45266]/20 hover:border-[#A45266]/50 bg-white'
                      }`}
                    >
                      <div className="font-serif font-bold text-sm text-[#2B2627]">
                        {pkg.name}
                      </div>
                      <div className="text-xs font-semibold text-[#A45266] mt-0.5">
                        {pkg.priceLkr}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Requirements & Floral Vision */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2627] mb-2">
                  Additional Requirements & Floral Vision
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your preferred blooms (e.g. blush peonies, baby breath clouds), color theme, stage dimensions, or specific backdrop dreams..."
                  value={visionNotes}
                  onChange={(e) => setVisionNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#A45266]/20 bg-[#FDF6F6]/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A45266] text-sm text-[#2B2627] transition-all"
                />
              </div>

              {/* INTEGRATED PAYMENT GATEWAY SECTION */}
              <div className="pt-6 border-t border-[#A45266]/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2B2627]">
                      Advance Deposit Payment
                    </h3>
                    <p className="text-xs text-[#5E5356]">
                      Fixed reservation deposit of LKR 5,000 required to hold your date.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#5E5356]">Deposit Due:</span>
                    <div className="font-serif text-xl font-bold text-[#A45266]">
                      LKR 5,000
                    </div>
                  </div>
                </div>

                {/* Gateway Selector: PayHere / Card Payment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PayHere Gateway (LKR)')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      paymentMethod === 'PayHere Gateway (LKR)'
                        ? 'border-[#A45266] bg-[#A45266]/10 ring-2 ring-[#A45266]/20'
                        : 'border-[#A45266]/20 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-xs">
                        P
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-[#2B2627]">PayHere Gateway</div>
                        <div className="text-[10px] text-[#5E5356]">LKR Local Banking & Wallets</div>
                      </div>
                    </div>
                    {paymentMethod === 'PayHere Gateway (LKR)' && (
                      <CheckCircle2 className="w-4 h-4 text-[#A45266]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Credit / Debit Card')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      paymentMethod === 'Credit / Debit Card'
                        ? 'border-[#A45266] bg-[#A45266]/10 ring-2 ring-[#A45266]/20'
                        : 'border-[#A45266]/20 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#A45266]" />
                      <div className="text-left">
                        <div className="text-xs font-bold text-[#2B2627]">Credit / Debit Card</div>
                        <div className="text-[10px] text-[#5E5356]">Visa, MasterCard, Amex</div>
                      </div>
                    </div>
                    {paymentMethod === 'Credit / Debit Card' && (
                      <CheckCircle2 className="w-4 h-4 text-[#A45266]" />
                    )}
                  </button>
                </div>

                <div className="p-3.5 bg-[#FDF6F6] rounded-xl border border-[#A45266]/15 flex items-center justify-between text-xs text-[#5E5356]">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#D4AF37]" />
                    <span>256-bit SSL Encrypted Transaction</span>
                  </div>
                  <span className="font-medium text-[#2B2627]">Total Package: {currentPackage.priceLkr}</span>
                </div>
              </div>

              {/* Full-width plum CTA button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer w-full py-4 px-6 text-sm font-semibold tracking-wider uppercase text-white bg-[#A45266] hover:bg-[#8e3f53] active:bg-[#6e2c3c] rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Processing Reservation & Deposit...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT ENQUIRY & PAY DEPOSIT</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: Our Booking Process (Card height designed to match left column) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#231E20] via-[#2B2627] to-[#1F1B1C] text-white rounded-3xl p-6 sm:p-10 border border-[#A45266]/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="border-b border-white/10 pb-5 mb-8">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
                  The Bloom Standard
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  Our Booking Process
                </h3>
                <p className="text-xs text-[#D3C7C9] mt-1">
                  A seamless 6-step journey from your initial vision to the final teardown.
                </p>
              </div>

              {/* 6-step vertical numbered workflow */}
              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {bookingProcessSteps.map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-[#A45266] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#231E20]">
                      {item.step}
                    </div>
                    <div className="pt-0.5">
                      <h4 className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#D3C7C9] mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio direct contact badge */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#D3C7C9]">
              <div>
                <span className="text-[#D4AF37] block font-semibold">Immediate Assistance:</span>
                <span>Direct Studio Hotline: 077031423</span>
              </div>
              <div className="text-right">
                <span>Mannar, Sri Lanka</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CONFIRMATION MODAL & AUTOMATED EMAIL PREVIEW */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 animate-in zoom-in-95 duration-200 space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A45266]">
                Booking Confirmed & Deposit Paid
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2627]">
                Your Date is Locked!
              </h3>
              <p className="text-sm text-[#5E5356]">
                Booking Code: <strong className="font-mono text-[#A45266] text-base">{confirmedBooking.bookingCode}</strong>
              </p>
            </div>

            {/* Event Summary Details */}
            <div className="bg-[#FDF6F6] p-5 rounded-2xl border border-[#A45266]/15 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 text-[#2B2627]">
                <div><span className="text-[#5E5356]">Client:</span> <strong>{confirmedBooking.fullName}</strong></div>
                <div><span className="text-[#5E5356]">Event:</span> <strong>{confirmedBooking.eventType}</strong></div>
                <div><span className="text-[#5E5356]">Date:</span> <strong>{confirmedBooking.eventDate}</strong></div>
                <div><span className="text-[#5E5356]">Venue:</span> <strong>{confirmedBooking.venueCity}</strong></div>
                <div><span className="text-[#5E5356]">Package:</span> <strong>{confirmedBooking.packageTier}</strong></div>
                <div><span className="text-[#5E5356]">Deposit:</span> <strong className="text-emerald-700">LKR {confirmedBooking.depositAmountLkr.toLocaleString()} (PAID)</strong></div>
              </div>
            </div>

            {/* Automated Email Notifications Preview mandated by prompt */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#A45266] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Automated Email Notifications Dispatched</span>
              </div>

              {simulatedEmails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-1">
                    <div className="font-bold text-emerald-800 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Customer Receipt Sent</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 truncate">To: {confirmedBooking.email}</div>
                    <p className="text-[11px] text-[#5E5356] leading-tight">
                      Includes official booking code, advance receipt, and stylist contact.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60 space-y-1">
                    <div className="font-bold text-blue-800 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Admin Alert Dispatched</span>
                    </div>
                    <div className="text-[11px] text-blue-700 truncate">To: bloomevents27@gmail.com</div>
                    <p className="text-[11px] text-[#5E5356] leading-tight">
                      Sahana (Planner) & Harish (Production) alerted for coordinator calendar sync.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-[#2B2627] hover:bg-[#FDF6F6] rounded-full border border-neutral-300"
              >
                Close Receipt
              </button>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  onNavigate('services');
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#A45266] hover:bg-[#8e3f53] text-white rounded-full shadow-md"
              >
                Browse More Designs →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
