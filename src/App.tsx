import { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ServicesGalleryPage } from './pages/ServicesGalleryPage.tsx';
import { BookEventPage } from './pages/BookEventPage.tsx';
import { AboutContactPage } from './pages/AboutContactPage.tsx';
import { CoordinatorHubModal } from './components/CoordinatorHubModal.tsx';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'services' | 'book' | 'about'>('home');
  const [preSelectedPackage, setPreSelectedPackage] = useState<string>('Premium Package');
  const [initialGalleryCategory, setInitialGalleryCategory] = useState<string>('ALL');
  const [coordinatorHubOpen, setCoordinatorHubOpen] = useState(false);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleNavigate = (page: 'home' | 'services' | 'book' | 'about') => {
    setActivePage(page);
  };

  const handleSelectPackageForBooking = (pkgTier: string) => {
    setPreSelectedPackage(pkgTier);
    setActivePage('book');
  };

  const handleSelectCategoryFromHome = (category: string) => {
    setInitialGalleryCategory(category);
    setActivePage('services');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F6] text-[#2B2627] font-sans antialiased selection:bg-[#A45266] selection:text-white">
      
      {/* Consistent Header (Brand logo, navigation links, and BOOK YOUR EVENT button) */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenCoordinatorHub={() => setCoordinatorHubOpen(true)}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategoryFromHome}
            onSelectPackageForBooking={handleSelectPackageForBooking}
          />
        )}

        {activePage === 'services' && (
          <ServicesGalleryPage
            onNavigate={handleNavigate}
            onSelectPackageForBooking={handleSelectPackageForBooking}
            initialTab={initialGalleryCategory}
          />
        )}

        {activePage === 'book' && (
          <BookEventPage
            preSelectedPackage={preSelectedPackage}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'about' && (
          <AboutContactPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Standardized Footer appearing on every page */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCoordinatorHub={() => setCoordinatorHubOpen(true)}
      />

      {/* Automated Event Reminder System & Coordinator Operations Modal */}
      <CoordinatorHubModal
        isOpen={coordinatorHubOpen}
        onClose={() => setCoordinatorHubOpen(false)}
      />

    </div>
  );
}
