
    import React from 'react';
    import { motion } from 'framer-motion';
    import { projects } from '@/lib/constants';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Github, ExternalLink } from 'lucide-react';

    const ProjectsSection = () => {
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
        <section id="projects" className="section-padding bg-gray-900/30">
          <div className="container mx-auto">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Creations & Code
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {projects.map((project, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-pink-500/30 transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        {project.icon}
                        <CardTitle className="ml-3 text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">{project.title}</CardTitle>
                      </div>
                      <CardDescription className="text-gray-400 h-24 overflow-y-auto text-sm">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-200 mb-1">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild className="mr-2 border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                      </Button>
                      {project.liveLink && (
                         <Button variant="outline" size="sm" asChild className="border-teal-500 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300">
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </a>
                        </Button>
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

    export default ProjectsSection;
  