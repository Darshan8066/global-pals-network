
import React, { useEffect, useState } from 'react';
import { Phone, Mail, HelpCircle } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Show footer when user has scrolled more than 80% of the page
      if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    alert('Contact form will open here. You can reach us at support@passportpals.com');
  };

  const handleSupportClick = () => {
    alert('Support center opening... Visit our help section for assistance.');
  };

  const handleHelpClick = () => {
    alert('Help documentation opening... Find answers to common questions.');
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 via-blue-950/95 to-emerald-950/95 backdrop-blur-lg border-t border-blue-500/30 py-3 z-50 transition-transform duration-500 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8">
          <button 
            onClick={handleContactClick}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <Phone className="h-4 w-4" />
            <span className="font-medium text-sm">Contact Us</span>
          </button>
          <button 
            onClick={handleSupportClick}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <Mail className="h-4 w-4" />
            <span className="font-medium text-sm">Support</span>
          </button>
          <button 
            onClick={handleHelpClick}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="font-medium text-sm">Help Center</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
