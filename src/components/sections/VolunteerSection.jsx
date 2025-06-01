import React from 'react';
    import { motion } from 'framer-motion';
    import { volunteerExperience } from '@/lib/constants';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { HeartHandshake as Handshake } from 'lucide-react';

    const VolunteerSection = () => {
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { type: 'spring', stiffness: 100, damping: 12 }
        },
      };

      return (
        <section id="volunteer" className="section-padding bg-gray-900/30">
          <div className="container mx-auto">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Giving Back
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {volunteerExperience.map((exp, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-green-500/30 transition-shadow duration-300 overflow-hidden">
                     {exp.imageUrl && (
                      <div className="h-48 w-full overflow-hidden">
                        <img 
                          src={exp.imageUrl}
                          alt={`Visual for ${exp.organization}`}
                          className="w-full h-full object-cover"
                         src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        {exp.icon || <Handshake className="w-8 h-8 text-green-400" />}
                        <CardTitle className="ml-3 text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">{exp.organization}</CardTitle>
                      </div>
                      <CardDescription className="text-gray-400 text-sm italic">{exp.role} - {exp.duration}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-300 text-sm">{exp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      );
    };

    export default VolunteerSection;