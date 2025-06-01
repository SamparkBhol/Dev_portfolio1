import React, { useState, useEffect, useRef } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { Typewriter } from 'react-simple-typewriter';
    import { personalInfo, socialLinks, projects as projectData, skills as skillData } from '@/lib/constants';
    import { Terminal, Send, Mail, Linkedin, Github as GithubIcon, Phone, Power, Minimize, Maximize2, X as CloseIcon, Gamepad2 } from 'lucide-react';

    const themes = {
      default: {
        bg: 'bg-black/70',
        text: 'text-gray-200',
        prompt: 'text-green-400',
        user: 'text-green-400',
        border: 'border-purple-500/50',
        headerBg: 'bg-gray-800/50',
        headerText: 'text-gray-300',
        headerIcon: 'text-purple-400',
      },
      retro: {
        bg: 'bg-blue-800',
        text: 'text-white',
        prompt: 'text-yellow-300',
        user: 'text-yellow-300',
        border: 'border-gray-500',
        headerBg: 'bg-gray-700',
        headerText: 'text-white',
        headerIcon: 'text-yellow-300',
      },
      hacker: {
        bg: 'bg-black',
        text: 'text-green-500',
        prompt: 'text-green-400',
        user: 'text-green-400',
        border: 'border-green-700/50',
        headerBg: 'bg-black/80',
        headerText: 'text-green-500',
        headerIcon: 'text-green-600',
      }
    };

    const ContactSection = () => {
      const { toast } = useToast();
      const [input, setInput] = useState('');
      const [output, setOutput] = useState([]);
      const [history, setHistory] = useState([]);
      const [historyIndex, setHistoryIndex] = useState(-1);
      const terminalEndRef = useRef(null);
      const inputRef = useRef(null);
      const [currentTheme, setCurrentTheme] = useState('default');
      const [isTerminalActive, setIsTerminalActive] = useState(true);
      const [gameScreen, setGameScreen] = useState(null); // null, 'loading', 'game'


      const welcomeMessage = `SampOS [Version 1.0.0]
(c) Sampark Bhol Corporation. All rights reserved.

Type 'help' for a list of commands.
------------------------------------------`;

      useEffect(() => {
        setOutput([{ type: 'system', text: welcomeMessage, isTypewriter: true }]);
        const savedHistory = localStorage.getItem('terminalHistory_v2');
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        const savedTheme = localStorage.getItem('terminalTheme_v2') || 'default';
        setCurrentTheme(themes[savedTheme] ? savedTheme : 'default');
        inputRef.current?.focus();
      }, []);

      useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [output, gameScreen]);

      useEffect(() => {
        localStorage.setItem('terminalHistory_v2', JSON.stringify(history));
      }, [history]);

      useEffect(() => {
        localStorage.setItem('terminalTheme_v2', currentTheme);
      }, [currentTheme]);


      const handleInputChange = (e) => {
        setInput(e.target.value);
      };
      
      const launchGame = (gameId) => {
        setGameScreen('loading');
        setOutput(prev => [...prev, {type: 'system', text: `Loading ${gameId}...`}]);
        setTimeout(() => {
          if(gameId === 'adventure') {
            // Basic text adventure placeholder
            setGameScreen('game_adventure');
            setOutput(prev => [...prev, 
                {type: 'system', text: `Welcome to Text Adventure!\nYou are in a dark forest. Paths lead north and east. Type 'north' or 'east'. Type 'exit' to leave.`}
            ]);
          } else {
            setOutput(prev => [...prev, {type: 'system', text: `Game "${gameId}" not found or failed to load.`}]);
            setGameScreen(null);
          }
        }, 2000);
      };


      const processCommand = (command) => {
        const newOutput = [...output, { type: 'user', text: `C:\\Users\\Sampark> ${command}` }];
        let responseText = '';
        let isHtml = false;
        const [cmd, ...args] = command.toLowerCase().trim().split(' ');

        if (gameScreen === 'game_adventure') {
            if (cmd === 'north') responseText = "You head north. You see a river. Type 'cross river' or 'go back'.";
            else if (cmd === 'east') responseText = "You head east. You find a cave. Type 'enter cave' or 'go back'.";
            else if (cmd === 'cross' && args[0] === 'river') responseText = "The river is too strong. You are swept away. Game Over. Type 'playgame adventure' to restart or 'exit' game.";
            else if (cmd === 'enter' && args[0] === 'cave') responseText = "It's dark and spooky. You hear a growl. Game Over. Type 'playgame adventure' to restart or 'exit' game.";
            else if (cmd === 'go' && args[0] === 'back') responseText = "You return to the forest clearing. Paths lead north and east.";
            else if (cmd === 'exit') {
                responseText = "Exiting Text Adventure...";
                setGameScreen(null);
            } else responseText = "Unknown action. Try 'north', 'east', or 'exit'.";
            setOutput([...newOutput, { type: 'system', text: responseText }]);
            return;
        }


        switch (cmd) {
          case 'help':
            responseText = `Available commands:
  help          - Show this help message
  whoami        - Display basic information
  contact       - Show contact details
  socials       - List social media links (opens new tabs)
  email         - Open mail client
  linkedin      - Open LinkedIn profile
  github        - Open GitHub profile
  phone         - Display phone number
  projects      - List projects
  skills        - List skills
  theme [name]  - Change terminal theme (default, retro, hacker)
  playgame [id] - Launch a game (try 'playgame adventure')
  cls           - Clear the terminal
  exit          - Close the terminal (visual only)`;
            break;
          case 'whoami':
            responseText = `${personalInfo.name}\n${personalInfo.title}`;
            break;
          case 'contact':
            responseText = `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLinkedIn: ${personalInfo.linkedin}`;
            break;
          case 'socials':
            isHtml = true;
            responseText = socialLinks.map(link => {
              window.open(link.url, '_blank');
              return `<div><strong class="${themes[currentTheme].prompt}">${link.name}:</strong> <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-pink-400 hover:underline">${link.url.replace('https://','').replace('mailto:','').replace('tel:','')}</a> (opened)</div>`;
            }).join('');
            break;
          case 'email':
            responseText = `Opening mail client for ${personalInfo.email}...`;
            window.open(`mailto:${personalInfo.email}`, '_blank');
            break;
          case 'linkedin':
            responseText = `Opening LinkedIn: ${personalInfo.linkedin}...`;
            window.open(`https://${personalInfo.linkedin}`, '_blank');
            break;
          case 'github':
            responseText = `Opening GitHub: ${personalInfo.github}...`;
            window.open(personalInfo.github, '_blank');
            break;
          case 'phone':
            responseText = `Phone: ${personalInfo.phone}`;
            break;
          case 'cls':
            setOutput([{ type: 'system', text: "Terminal cleared. Type 'help' for commands.", isTypewriter: true }]);
            return;
          case 'theme':
            if (args[0] && themes[args[0]]) {
              setCurrentTheme(args[0]);
              responseText = `Theme changed to ${args[0]}.`;
            } else {
              responseText = `Usage: theme [default|retro|hacker]`;
            }
            break;
          case 'projects':
            responseText = "Projects:\n" + projectData.map(p => `  - ${p.title}: ${p.tech.join(', ')}`).join('\n');
            break;
          case 'skills':
            responseText = `Skills:
  Languages: ${skillData.programmingLanguages.join(', ')}
  Frameworks: ${skillData.frameworksTechnologies.join(', ')}
  Databases: ${skillData.databasesStorage.join(', ')}
  Tools: ${skillData.developmentTools.join(', ')}`;
            break;
          case 'playgame':
            if (args[0]) {
                launchGame(args[0]);
                return; 
            } else {
                responseText = "Usage: playgame [game_id]. Try 'playgame adventure'.";
            }
            break;
          case 'exit':
            setIsTerminalActive(false);
            toast({ title: "Terminal Closed", description: "Portfolio interaction is still available." });
            return;
          default:
            responseText = `Command not found: ${command}. Type 'help' for available commands.`;
        }
        
        setOutput([...newOutput, { type: 'system', text: responseText, isHtml, isTypewriter: cmd === 'help' || cmd === 'whoami' }]);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || !isTerminalActive) return;
        processCommand(input);
        if (input.trim() && (history.length === 0 || history[history.length - 1] !== input.trim())) {
          setHistory(prev => [...prev, input.trim()]);
        }
        setHistoryIndex(-1); 
        setInput('');
      };

      const handleKeyDown = (e) => {
        if (!isTerminalActive) return;
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (history.length > 0) {
            const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (history.length > 0 && historyIndex !== -1) {
            const newIndex = Math.min(history.length - 1, historyIndex + 1);
            if (newIndex === historyIndex && historyIndex === history.length -1) { 
                 setInput('');
                 setHistoryIndex(-1);
            } else {
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            }
          } else {
             setInput('');
             setHistoryIndex(-1);
          }
        }
      };
      
      if (!isTerminalActive && !gameScreen) { // Only render "re-open" button if fully closed and not in a game
        return (
          <section id="contact" className="section-padding bg-gray-900/30">
            <div className="container mx-auto text-center">
               <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                Connect & Collab
              </motion.h2>
              <Button onClick={() => setIsTerminalActive(true)} size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Power className="mr-2 h-5 w-5"/> Re-open Terminal
              </Button>
            </div>
          </section>
        );
      }
      
      const currentThemeStyles = themes[currentTheme];

      return (
        <section id="contact" className="section-padding bg-gray-900/30">
          <div className="container mx-auto">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Connect & Collab
            </motion.h2>
            <motion.div 
              className={`max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden border ${currentThemeStyles.border}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`${currentThemeStyles.headerBg} p-2 flex items-center justify-between border-b ${currentThemeStyles.border}`}>
                <div className="flex items-center">
                  <Terminal className={`h-5 w-5 ${currentThemeStyles.headerIcon} mr-2`} />
                  <span className={`text-xs ${currentThemeStyles.headerText} font-mono`}>SampOS - Interactive Terminal</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className={`h-6 w-6 ${currentThemeStyles.headerText} hover:bg-white/10`}><Minimize className="h-3 w-3"/></Button>
                    <Button variant="ghost" size="icon" className={`h-6 w-6 ${currentThemeStyles.headerText} hover:bg-white/10`}><Maximize2 className="h-3 w-3"/></Button>
                    <Button variant="ghost" size="icon" onClick={() => { setIsTerminalActive(false); setGameScreen(null); }} className={`h-6 w-6 text-red-400 hover:bg-red-500/50`}><Power className="h-4 w-4"/></Button>
                </div>
              </div>
              <div 
                className={`h-96 p-4 overflow-y-auto font-mono text-sm space-y-2 ${currentThemeStyles.bg} ${currentThemeStyles.text}`}
                onClick={() => inputRef.current?.focus()}
              >
                {output.map((line, index) => (
                  <div key={index} className={line.type === 'user' ? currentThemeStyles.user : currentThemeStyles.text + ' whitespace-pre-wrap'}>
                    {line.isTypewriter && line.type === 'system' ? (
                      <Typewriter
                        words={[line.text]}
                        loop={1}
                        cursor
                        cursorStyle='▋'
                        typeSpeed={10}
                        deleteSpeed={0}
                        delaySpeed={50}
                      />
                    ) : line.isHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: line.text }} />
                    ) : (
                      line.text
                    )}
                  </div>
                ))}
                 {gameScreen === 'loading' && <div className={`${currentThemeStyles.text} animate-pulse`}>Loading game assets... please wait...</div>}
                 {gameScreen && gameScreen.startsWith('game_') && (
                    <div className={`${currentThemeStyles.text} border-t ${currentThemeStyles.border} mt-4 pt-4`}>
                        <h3 className={`${currentThemeStyles.prompt} font-bold mb-2`}>Game Active: {gameScreen.replace('game_','').toUpperCase()}</h3>
                    </div>
                 )}
                <div ref={terminalEndRef} />
              </div>
              <form onSubmit={handleSubmit} className={`p-3 border-t ${currentThemeStyles.border} ${currentThemeStyles.headerBg} flex items-center`}>
                <span className={`${currentThemeStyles.prompt} font-mono mr-2 hidden sm:inline-block`}>C:\Users\Sampark&gt;</span>
                <Input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={gameScreen ? "Enter game command..." : "Type your command here..."}
                  className={`flex-grow bg-transparent border-none focus:ring-0 ${currentThemeStyles.text} placeholder-gray-500 terminal-input`}
                  autoComplete="off"
                  disabled={!isTerminalActive}
                />
                <Button type="submit" variant="ghost" size="icon" className={`ml-2 ${currentThemeStyles.headerIcon} hover:${currentThemeStyles.headerIcon}/80`} disabled={!isTerminalActive}>
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </motion.div>
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-gray-400 mb-4">Alternatively, reach out through traditional channels:</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" asChild className="border-pink-500 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300">
                  <a href={`mailto:${personalInfo.email}`}><Mail className="mr-2 h-4 w-4" /> Email</a>
                </Button>
                <Button variant="outline" asChild className="border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300">
                  <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      );
    };

    export default ContactSection;