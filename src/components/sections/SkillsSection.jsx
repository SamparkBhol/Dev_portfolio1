
    import React from 'react';
    import { motion } from 'framer-motion';
    import { skills } from '@/lib/constants';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Code, Database, Wrench as Tool, Cpu } from 'lucide-react';

    const SkillCategory = ({ title, items, icon, color }) => {
      const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
          opacity: 1,
          x: 0,
          transition: { delay: i * 0.05, type: 'spring', stiffness: 120 },
        }),
      };

      return (
        <Card className={`hover:shadow-${color}-500/30 transition-shadow duration-300`}>
          <CardHeader>
            <CardTitle className={`flex items-center text-xl md:text-2xl text-${color}-400`}>
              {icon} <span className="ml-3">{title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.ul 
              className="flex flex-wrap gap-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {items.map((skill, i) => (
                <motion.li
                  key={skill}
                  custom={i}
                  variants={itemVariants}
                  className={`px-3 py-1.5 bg-gray-700 text-sm text-gray-200 rounded-full shadow-md border border-transparent hover:border-${color}-500 hover:text-${color}-300 transition-all duration-200 cursor-default`}
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      );
    };

    const SkillsSection = () => {
      return (
        <section id="skills" className="section-padding bg-gray-900/50">
          <div className="container mx-auto">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              My Arsenal
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <SkillCategory 
                title="Programming Languages" 
                items={skills.programmingLanguages} 
                icon={<Code className="h-7 w-7" />}
                color="purple"
              />
              <SkillCategory 
                title="Frameworks & Technologies" 
                items={skills.frameworksTechnologies} 
                icon={<Cpu className="h-7 w-7" />}
                color="pink"
              />
              <SkillCategory 
                title="Databases & Storage" 
                items={skills.databasesStorage} 
                icon={<Database className="h-7 w-7" />}
                color="teal"
              />
              <SkillCategory 
                title="Development Tools" 
                items={skills.developmentTools} 
                icon={<Tool className="h-7 w-7" />}
                color="yellow"
              />
            </div>
          </div>
        </section>
      );
    };

    export default SkillsSection;
  