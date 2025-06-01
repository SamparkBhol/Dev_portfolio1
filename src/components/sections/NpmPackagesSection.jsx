
    import React from 'react';
    import { motion } from 'framer-motion';
    import { npmPackages } from '@/lib/constants';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Package, ExternalLink } from 'lucide-react';

    const NpmPackagesSection = () => {
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
        <section id="npm" className="section-padding bg-gray-900/50">
          <div className="container mx-auto">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              NPM Contributions
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {npmPackages.map((pkg, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-red-500/30 transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        {pkg.icon || <Package className="w-8 h-8 text-red-400" />}
                        <CardTitle className="ml-3 text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{pkg.name}</CardTitle>
                      </div>
                      <CardDescription className="text-gray-400 text-sm">
                        {pkg.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow" />
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild className="border-red-500 text-red-400 hover:bg-red-500/20 hover:text-red-300">
                        <a href={pkg.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> View on NPM
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      );
    };
    export default NpmPackagesSection;
  