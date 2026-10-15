import { useState, useEffect } from 'react';
import { Flower2, Bell, User, LogOut, Menu, X } from 'lucide-react';
import { auth, googleAuthProvider } from '../lib/firebase.ts';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  activePage: 'home' | 'services' | 'book' | 'about';
  onNavigate: (page: 'home' | 'services' | 'book' | 'about') => void;
  onOpenCoordinatorHub: () => void;
}

export function Header({ activePage, onNavigate, onOpenCoordinatorHub }: HeaderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      setAuthLoading(true);
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      console.error('Google Sign-in failed:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDF6F6]/95 backdrop-blur-md border-b border-[#A45266]/15 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element in luxury serif face) */}
        <button
          onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
          className="text-left flex items-center gap-2.5 group whitespace-nowrap shrink-0 focus:outline-hidden"
        >
          <div className="w-9 h-9 rounded-full bg-[#A45266]/10 flex items-center justify-center text-[#A45266] group-hover:bg-[#A45266] group-hover:text-white transition-colors duration-200">
            <Flower2 className="w-5 h-5 text-current" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#2B2627] group-hover:text-[#A45266] transition-colors">
              Bloom Events
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Single-line, quiet hover states) */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#2B2627]">
          <button
            onClick={() => onNavigate('home')}
            className={`cursor-pointer whitespace-nowrap transition-colors py-1 relative ${
              activePage === 'home'
                ? 'text-[#A45266] font-semibold'
                : 'text-[#2B2627]/80 hover:text-[#A45266]'
            }`}
          >
            Home
            {activePage === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A45266] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('services')}
            className={`cursor-pointer whitespace-nowrap transition-colors py-1 relative ${
              activePage === 'services'
                ? 'text-[#A45266] font-semibold'
                : 'text-[#2B2627]/80 hover:text-[#A45266]'
            }`}
          >
            Services & Gallery
            {activePage === 'services' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A45266] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('book')}
            className={`cursor-pointer whitespace-nowrap transition-colors py-1 relative ${
              activePage === 'book'
                ? 'text-[#A45266] font-semibold'
                : 'text-[#2B2627]/80 hover:text-[#A45266]'
            }`}
          >
            Book an Event
            {activePage === 'book' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A45266] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`cursor-pointer whitespace-nowrap transition-colors py-1 relative ${
              activePage === 'about'
                ? 'text-[#A45266] font-semibold'
                : 'text-[#2B2627]/80 hover:text-[#A45266]'
            }`}
          >
            About & Contact
            {activePage === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A45266] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Authentication / Alert Tools */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {/* Coordinator schedule alerts quick tool */}
          <button
            onClick={onOpenCoordinatorHub}
            title="Coordinator Alert Hub (3-Day & 1-Day Event Reminders)"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#2B2627]/80 hover:text-[#A45266] rounded-lg border border-[#A45266]/20 bg-white/60 hover:bg-white transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="whitespace-nowrap">Coordinator Hub</span>
          </button>

          {/* User Sign-in state */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-[#A45266]/20">
              <div className="w-8 h-8 rounded-full bg-[#A45266]/15 flex items-center justify-center text-[#A45266] text-xs font-semibold overflow-hidden border border-[#A45266]/30">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                ) : (
                  user.displayName?.charAt(0) || <User className="w-4 h-4" />
                )}
              </div>
              <span className="text-xs font-medium text-[#2B2627] max-w-[100px] truncate">
                {user.displayName || user.email?.split('@')[0]}
              </span>
              <button
                onClick={handleSignOut}
                title="Sign out"
                className="p-1 text-[#2B2627]/60 hover:text-[#A45266] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={authLoading}
              className="text-xs font-medium text-[#2B2627]/80 hover:text-[#A45266] px-2.5 py-1.5 rounded-md hover:bg-white/80 transition-colors whitespace-nowrap"
            >
              {authLoading ? 'Signing in...' : 'Sign in'}
            </button>
          )}

          {/* Primary CTA button mandated by prompt */}
          <button
            onClick={() => onNavigate('book')}
            className="cursor-pointer px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#A45266] hover:bg-[#8e3f53] active:bg-[#6e2c3c] rounded-full shadow-xs hover:shadow-md transition-all duration-200 whitespace-nowrap shrink-0 border border-[#A45266]"
          >
            BOOK YOUR EVENT
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenCoordinatorHub}
            className="p-2 text-[#2B2627]/70 hover:text-[#A45266]"
            title="Coordinator Reminders"
          >
            <Bell className="w-5 h-5 text-[#D4AF37]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2B2627] hover:text-[#A45266] focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDF6F6] border-b border-[#A45266]/20 px-6 py-6 shadow-xl space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#2B2627]">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className={`text-left py-2 px-3 rounded-lg ${activePage === 'home' ? 'bg-[#A45266]/10 text-[#A45266] font-semibold' : 'hover:bg-white'}`}
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('services'); setMobileMenuOpen(false); }}
              className={`text-left py-2 px-3 rounded-lg ${activePage === 'services' ? 'bg-[#A45266]/10 text-[#A45266] font-semibold' : 'hover:bg-white'}`}
            >
              Services & Gallery
            </button>
            <button
              onClick={() => { onNavigate('book'); setMobileMenuOpen(false); }}
              className={`text-left py-2 px-3 rounded-lg ${activePage === 'book' ? 'bg-[#A45266]/10 text-[#A45266] font-semibold' : 'hover:bg-white'}`}
            >
              Book an Event
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className={`text-left py-2 px-3 rounded-lg ${activePage === 'about' ? 'bg-[#A45266]/10 text-[#A45266] font-semibold' : 'hover:bg-white'}`}
            >
              About & Contact
            </button>
          </nav>

          <div className="pt-4 border-t border-[#A45266]/15 flex flex-col gap-3">
            {user ? (
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-[#2B2627]/80 truncate">Signed in as {user.displayName || user.email}</span>
                <button onClick={handleSignOut} className="text-xs text-[#A45266] font-medium underline">Sign Out</button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="w-full py-2.5 text-xs font-semibold text-[#2B2627] bg-white border border-[#A45266]/20 rounded-full text-center"
              >
                Sign In with Google
              </button>
            )}

            <button
              onClick={() => { onNavigate('book'); setMobileMenuOpen(false); }}
              className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-white bg-[#A45266] hover:bg-[#8e3f53] rounded-full shadow-sm"
            >
              BOOK YOUR EVENT
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
