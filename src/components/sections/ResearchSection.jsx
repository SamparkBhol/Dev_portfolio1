import React from 'react';
    import { motion } from 'framer-motion';
    import { research } from '@/lib/constants';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { BookOpen, ExternalLink, Lock } from 'lucide-react';

    const ResearchSection = () => {
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
        <section id="research" className="section-padding bg-gray-900/30">
          <div className="container mx-auto">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Scholarly Pursuits
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {research.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-yellow-500/30 transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        {item.icon || <BookOpen className="w-8 h-8 text-yellow-400" />}
                        <CardTitle className="ml-3 text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">{item.title}</CardTitle>
                      </div>
                      <CardDescription className="text-gray-400 text-sm italic">{item.publication}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      {item.link && item.link !== '#' && (
                        <Button variant="outline" size="sm" asChild className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300">
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Read More
                          </a>
                        </Button>
                      )}
                       {item.link === '#' && item.description.toLowerCase().includes('confidential') && (
                         <div className="flex items-center text-sm text-gray-500">
                           <Lock className="mr-2 h-4 w-4" />
                           <span>Details Confidential</span>
                         </div>
                       )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      );
    };

    export default ResearchSection;