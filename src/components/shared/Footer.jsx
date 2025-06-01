
    import React from 'react';
    import { personalInfo, socialLinks } from '@/lib/constants';
    import { Button } from '@/components/ui/button';
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

    const Footer = () => {
      return (
        <footer className="bg-gray-900/50 border-t border-gray-700/50 py-8 text-center">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-6 mb-4">
              <TooltipProvider>
                {socialLinks.map((social) => (
                  <Tooltip key={social.name}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                          {social.icon}
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Built with React, TailwindCSS, Three.js with 💜 Sampark.
            </p>
          </div>
        </footer>
      );
    };

    export default Footer;
  