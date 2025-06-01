import React from 'react';
    import HeroSection from '@/components/sections/HeroSection';
    import AboutSection from '@/components/sections/AboutSection';
    import ExperienceSection from '@/components/sections/ExperienceSection';
    import ProjectsSection from '@/components/sections/ProjectsSection';
    import NpmPackagesSection from '@/components/sections/NpmPackagesSection';
    import ResearchSection from '@/components/sections/ResearchSection';
    import BlogSection from '@/components/sections/BlogSection';
    import VolunteerSection from '@/components/sections/VolunteerSection';
    import SkillsSection from '@/components/sections/SkillsSection';
    import ContactSection from '@/components/sections/ContactSection';
    import { motion } from 'framer-motion';

    const PortfolioPage = () => {
      const sections = [
        { id: 'hero', Component: HeroSection },
        { id: 'about', Component: AboutSection },
        { id: 'experience', Component: ExperienceSection },
        { id: 'projects', Component: ProjectsSection },
        { id: 'npm', Component: NpmPackagesSection },
        { id: 'research', Component: ResearchSection },
        { id: 'blogs', Component: BlogSection },
        { id: 'volunteer', Component: VolunteerSection },
        { id: 'skills', Component: SkillsSection },
        { id: 'contact', Component: ContactSection },
      ];

      return (
        <div className="overflow-x-hidden">
          {sections.map(({ id, Component }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: id === 'hero' ? 0.05 : 0.15 }} 
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Component />
            </motion.div>
          ))}
        </div>
      );
    };

    export default PortfolioPage;