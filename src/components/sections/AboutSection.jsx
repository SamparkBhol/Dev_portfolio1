
    import React from 'react';
    import { motion } from 'framer-motion';
    import { personalInfo, education, certifications } from '@/lib/constants';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { School, UserCircle, Award, Briefcase } from 'lucide-react';

    const AboutSection = () => {
      const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };

      return (
        <section id="about" className="section-padding bg-gray-900/30">
          <div className="container mx-auto">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-start"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl text-purple-400">
                      <UserCircle className="mr-3 h-8 w-8" /> Who I Am
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {personalInfo.summary}
                    </p>
                    <div className="mt-6">
                      <img  
                        className="rounded-lg shadow-xl mx-auto w-full max-w-md object-cover h-64 md:h-80" 
                        alt="A professional portrait of Sampark Bhol or a symbolic image representing software development and AI research"
                       src="https://images.unsplash.com/photo-1683105255267-a644e6687dd4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div className="space-y-8" variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl text-pink-400">
                      <School className="mr-3 h-8 w-8" /> Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold text-gray-100">{education.institution}</h3>
                    <p className="text-md text-gray-400">{education.degree}</p>
                    <p className="text-sm text-gray-500">{education.duration}</p>
                    <p className="text-sm text-gray-500">{education.location}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl text-teal-400">
                      <Award className="mr-3 h-8 w-8" /> Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {certifications.map((cert, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center space-x-3"
                        variants={itemVariants}
                      >
                        {cert.icon}
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                        >
                          {cert.name}
                        </a>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      );
    };

    export default AboutSection;
  