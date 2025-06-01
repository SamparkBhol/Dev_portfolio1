import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Menu, X, Code, Volume2, VolumeX } from 'lucide-react';
    import { navLinks, personalInfo } from '@/lib/constants';

    const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);
      const [isMuted, setIsMuted] = useState(true);

      const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
      };

      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
      
      const toggleMute = () => {
        setIsMuted(!isMuted);
        // Add logic here to mute/unmute global sound if implemented
      };

      return (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled || isOpen ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex items-center"
                onClick={() => scrollToSection('hero')}
                style={{ cursor: 'pointer' }}
              >
                <Code className="h-8 w-8 text-purple-400 mr-2" />
                <span className="font-orbitron text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  {personalInfo.name.split(' ')[0]}
                </span>
              </motion.div>
              <div className="hidden md:flex items-center space-x-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.id}
                    variant="ghost"
                    className="text-gray-300 hover:bg-purple-700/30 hover:text-white transition-colors duration-300 px-3 py-2 text-sm"
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </Button>
                ))}
                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-gray-300 hover:text-white">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
              </div>
              <div className="md:hidden flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-gray-300 hover:text-white mr-2">
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </Button>
                <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900/90 backdrop-blur-md"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <Button
                    key={link.id}
                    variant="ghost"
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-purple-700/50 hover:text-white"
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.nav>
      );
    };

    export default Navbar;