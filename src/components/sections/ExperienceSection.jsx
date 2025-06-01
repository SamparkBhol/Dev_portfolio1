import React from 'react';
    import { motion } from 'framer-motion';
    import { experiences } from '@/lib/constants';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Briefcase } from 'lucide-react';

    const ExperienceSection = () => {
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.3, delayChildren: 0.2 },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { type: 'spring', stiffness: 100, damping: 10 } 
        },
      };

      return (
        <section id="experience" className="section-padding bg-gray-900/50">
          <div className="container mx-auto">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              My Journey
            </motion.h2>
            <motion.div 
              className="relative py-4" 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-pink-500 to-red-500 rounded-full opacity-30 md:opacity-50"></div>
              
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index} 
                  className="mb-12 flex"
                  variants={itemVariants}
                >
                  <div className={`flex w-full items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="hidden md:flex md:w-5/12"></div> {/* Spacer for desktop layout */}
                    <div className="w-full md:w-7/12 relative pl-8 md:pl-0"> {/* Adjusted padding for mobile icon positioning */}
                      <div className="absolute -left-3 top-0 md:left-auto md:right-full md:mr-[2.65rem] md:-translate-y-0 z-10">
                        <div className="bg-gray-800 p-3 rounded-full border-2 border-purple-500 shadow-lg transform md:translate-y-1/2">
                          {exp.icon || <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />}
                        </div>
                      </div>
                      <Card className="hover:shadow-purple-500/30 transition-shadow duration-300 ml-2 md:ml-0">
                        <CardHeader>
                          <CardTitle className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{exp.role}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {exp.company} | {exp.location}
                            <br />
                            <span className="text-sm text-gray-500">{exp.duration}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm md:text-base">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i}>{resp}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      );
    };

    export default ExperienceSection;