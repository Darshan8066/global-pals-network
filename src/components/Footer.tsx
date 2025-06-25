
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, HelpCircle, Shield, FileText } from 'lucide-react';

const Footer = () => {
  const handleContactClick = () => {
    alert('Contact Us: support@passportpals.com | Phone: +1-800-PASSPORT');
  };

  const handleSupportClick = () => {
    alert('24/7 Support available through live chat, email, and phone. Visit our support center for instant help.');
  };

  const handleHelpClick = () => {
    alert('Help Center: Find answers to common questions, tutorials, and user guides.');
  };

  const handlePrivacyClick = () => {
    alert('Privacy Policy: We take your privacy seriously. All data is encrypted and never shared without consent.');
  };

  const handleTermsClick = () => {
    alert('Terms of Service: Please review our terms and conditions for using Passport Pals platform.');
  };

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-950 to-emerald-950 border-t border-blue-500/30 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <button 
                onClick={handleContactClick}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full md:w-auto justify-center md:justify-start"
              >
                <Phone className="h-4 w-4" />
                <span>Contact Us</span>
              </button>
              <button 
                onClick={handleSupportClick}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full md:w-auto justify-center md:justify-start"
              >
                <Mail className="h-4 w-4" />
                <span>24/7 Support</span>
              </button>
              <button 
                onClick={handleHelpClick}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full md:w-auto justify-center md:justify-start"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help Center</span>
              </button>
            </div>
          </div>

          {/* Legal Section */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">Legal & Security</h3>
            <div className="space-y-3">
              <button 
                onClick={handlePrivacyClick}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full justify-center"
              >
                <Shield className="h-4 w-4" />
                <span>Privacy Policy</span>
              </button>
              <button 
                onClick={handleTermsClick}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full justify-center"
              >
                <FileText className="h-4 w-4" />
                <span>Terms of Service</span>
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-white mb-4">About Passport Pals</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting international communities worldwide. 
              Safe, verified, and meaningful connections for students, 
              professionals, and entrepreneurs living abroad.
            </p>
            <p className="text-gray-400 text-xs mt-4">
              © 2024 Passport Pals. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-500/30 mt-8 pt-6 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <span className="text-gray-400 text-sm">🌍 Available in 195+ Countries</span>
            <span className="text-gray-400 text-sm">🔒 100% Verified Members</span>
            <span className="text-gray-400 text-sm">⚡ Real-time Connections</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
