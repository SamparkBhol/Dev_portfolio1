import React from 'react';
    import { motion } from 'framer-motion';
    import ThreeExperience from '@/components/three/Experience';
    import { personalInfo } from '@/lib/constants';
    import { Button } from '@/components/ui/button';
    import { ArrowDown } from 'lucide-react';
    import { Typewriter } from 'react-simple-typewriter';

    const HeroSection = () => {
      const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      };

      return (
        <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ThreeExperience isHero={true} />
          </div>
          
          <motion.div 
            className="relative z-10 text-center p-4 max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-extrabold mb-6">
              <span className="text-gray-300">{personalInfo.heroTitle}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                {personalInfo.heroNameHighlight}
              </span>
            </div>

            <div className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 font-mono h-24 md:h-16">
              <Typewriter
                words={personalInfo.heroSubtitleParts}
                loop={0} 
                cursor
                cursorStyle='▋'
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={scrollToAbout} 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-base md:text-lg"
              >
                Explore My Universe <ArrowDown className="ml-2 h-5 w-5 inline-block animate-bounce" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          >
            <ArrowDown className="h-8 w-8 text-gray-400" />
          </motion.div>
        </section>
      );
    };

    export default HeroSection;