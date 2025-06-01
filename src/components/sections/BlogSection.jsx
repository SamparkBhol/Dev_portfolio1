import React from 'react';
    import { motion } from 'framer-motion';
    import { blogs, personalInfo } from '@/lib/constants';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ExternalLink, Newspaper } from 'lucide-react';

    const BlogSection = () => {
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
        <section id="blogs" className="section-padding bg-gray-900/50">
          <div className="container mx-auto">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              My Thoughts & Insights
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-8" 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {blogs.map((blog, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-cyan-500/30 transition-shadow duration-300 overflow-hidden">
                    <CardHeader className="pb-0">
                        <div className="flex items-start mb-3">
                          <div className="p-2 bg-gray-700 rounded-md mr-3 shrink-0">
                            {blog.icon || <Newspaper className="w-7 h-7 text-cyan-400" />}
                          </div>
                          <div>
                            <CardTitle className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500 leading-tight">
                              {blog.title}
                            </CardTitle>
                          </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-2/3">
                          <CardDescription className="text-gray-400 text-sm line-clamp-3">
                            {blog.description}
                          </CardDescription>
                        </div>
                        {blog.imageUrl && (
                        <div className="sm:w-1/3 h-32 sm:h-auto rounded-lg overflow-hidden">
                          <img 
                            src={blog.imageUrl}
                            alt={`Snapshot of blog post titled "${blog.title}"`}
                            className="w-full h-full object-cover "
                            src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
                        </div>
                        )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300">
                        <a href={blog.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Read on Medium
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.5}}
              transition={{ duration:0.5, delay:0.3 }}
            >
              <Button size="lg" asChild className="bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white font-semibold">
                <a href={personalInfo.medium} target="_blank" rel="noopener noreferrer">
                  Visit My Medium Profile <Newspaper className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      );
    };

    export default BlogSection;