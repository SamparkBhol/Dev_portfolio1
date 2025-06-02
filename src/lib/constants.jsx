import React from 'react';
    import { Github, Linkedin, Mail, Phone, Package, Brain, Code, BookOpen, Award, Users, Building, Newspaper, HeartHandshake as Handshake, Edit3, Lightbulb } from 'lucide-react';

    export const navLinks = [
      { id: 'hero', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Projects' },
      { id: 'npm', label: 'NPM Packages' },
      { id: 'research', label: 'Research' },
      { id: 'blogs', label: 'Blogs' },
      { id: 'volunteer', label: 'Volunteer' },
      { id: 'skills', label: 'Skills' },
      { id: 'contact', label: 'Contact' },
    ];

    export const personalInfo = {
      name: 'Sampark Bhol',
      title: 'Software Developer | AI Researcher | SRE Enthusiast',
      heroTitle: 'Hi, I\'m ',
      heroNameHighlight: 'Sampark Bhol',
      heroSubtitleParts: [
        'AI Enthusiast',
        'Research enthusiast',
        'Computer science and software developer student',
        'crafting immersive worlds',
        'intelligent systems',
        'Exploring undefined.'
      ],
      email: 'samparkaccess1234@mail.com',
      phone: '+91-9938048383',
      linkedin: 'linkedin.com/in/sampark-bhol-118560251',
      github: 'https://github.com/SamparkBhol',
      medium: 'https://medium.com/@samparkbhol2005',
      summary: 'A dedicated 4th-year Computer Science student with expertise in software development, system reliability engineering, and AI research. Passionate about building scalable systems while exploring innovative AI solutions for real-world problems. Combines engineering fundamentals with research-driven approaches to deliver quality software solutions and advance technology through published research and practical implementations.',
    };

    export const education = {
      institution: 'Vellore Institute of Technology, Vellore',
      degree: 'B.Tech in Computer Science & Engineering (Specialization in Blockchain Technology)',
      location: 'Vellore, Tamil Nadu, India',
      duration: 'Sept 2022 – Present',
    };

    export const experiences = [
      {
        role: 'ML Intern',
        company: 'National Informatics Centre, MeitY, Govt. of India',
        location: 'Odisha, India',
        duration: 'May 2024 – July 2024',
        responsibilities: [
          'Conducted research in anomaly detection algorithms, analyzing relationships and parameters through graph-based analysis methodologies.',
          'Developed prediction and regression models using large-scale datasets, implementing chatbot for the SATHI website applications.',
          'Collaborated with senior researchers to optimize model performance and ensure system reliability in production environments.',
        ],
        icon: <Brain className="w-8 h-8 text-pink-400" />
      },
      {
        role: 'AI Intern',
        company: 'CSM Technologies',
        location: 'Bhubaneswar, India (Onsite)',
        duration: 'May 2025 – July 2025',
        responsibilities: [
          'Worked with NLP, Langchain, and LLM development, including model integration.',
          'Gained introduction to Langflow and Generative AI concepts.',
          'Reinforced concepts in Machine Learning, Deep Learning, and frontend development.',
        ],
        icon: <Users className="w-8 h-8 text-green-400" />
      },
    ];

    export const projects = [
      {
        title: 'HyDe NLP',
        description: ' HyDE leverages a Large Language Model (LLM) to generate a hypothetical document from the user's query. The generated document reflects an ideal answer or context relevant to the query — even though it doesn't actually exist in the corpus. The system then encodes this hypothetical document into an embedding, and uses it to retrieve real documents from a target corpus using vector similarity search while eliminating the need for labeled training data (zero-shot).',
        tech(tentative): ['Python', 'Sentence Transformers or FAISS', 'FastAPI or Flask ', 'Hugging Face Transformers', 'LangChain', 'React'],
        link: 'https://github.com/SamparkBhol/CodeCraze',
        icon: <Code className="w-8 h-8 text-blue-400" />
      },
      {
        title: 'Assignofast',
        description: 'Developed full-stack productivity app with IEEE-CS VIT for assignment management, schedules, and workflows with intelligent reminders. Built Chrome extension extending core functionality with cross-platform synchronization and data consistency. Used Flutter for mobile development and Firebase for backend, ensuring scalable architecture and reliable data management.',
        tech: ['Flutter', 'Firebase', 'Dart', 'Chrome Extension'],
        link: 'https://assignofast.ieeecsvit.com/',
        icon: <Code className="w-8 h-8 text-yellow-400" />
      },
      {
        title: 'Descollab',
        description: 'Architected distributed collaborative design platform optimizing team workflows with real-time synchronization and feedback. Implemented React architecture with Tailwind CSS for responsive frontend, integrated with Firebase for scalable data management. Developed live commenting, version control, and conflict resolution features enhancing collaboration efficiency and reliability.',
        tech: ['React', 'Tailwind CSS', 'Firebase', 'JavaScript'],
        link: 'https://github.com/SamparkBhol/descollab',
        icon: <Code className="w-8 h-8 text-teal-400" />
      },
      {
        title: 'ZeldaGame2D',
        description: 'A 2D adventure game inspired by classic Zelda titles, featuring tile-based maps, character movement, combat mechanics, and basic enemy AI. Developed using a game engine (e.g., Godot or Unity with C#) focusing on core gameplay loops and pixel art aesthetics.',
        tech: ['Game Engine (e.g., Godot/Unity)', 'C# or GDScript', 'Pixel Art'],
        link: 'https://github.com/SamparkBhol/Zeldaprojectgame',
        icon: <Code className="w-8 h-8 text-red-400" />
      },
      {
        title: 'Quantum Code Snippets',
        description: 'A collection of illustrative code examples and small projects demonstrating fundamental quantum computing concepts using Qiskit and PennyLane. Includes implementations of quantum algorithms like Grover\'s search, Shor\'s algorithm (simplified), and quantum teleportation.',
        tech: ['Python', 'Qiskit', 'PennyLane', 'Quantum Computing'],
        link: 'https://github.com/SamparkBhol/Qiskit-Quantum-Code-Snippets',
        icon: <Code className="w-8 h-8 text-purple-400" />
      },
      {
        title: 'AetherEngine',
        description: 'A lightweight 2D game engine or framework built from scratch or by extending existing libraries, focusing on performance and ease of use for simple game development. Potentially includes features like entity-component system, basic physics, and rendering pipeline.',
        tech: ['C++', 'OpenGL/SDL', 'Game Development Principles'],
        link: 'https://github.com/SamparkBhol/AetherEngine',
        icon: <Code className="w-8 h-8 text-orange-400" />
      },
      {
        title: 'GameDev AI Assistant (Extension)',
        description: 'A browser extension designed to assist game developers by providing quick access to documentation, code snippets, and AI-powered suggestions for common game development tasks and challenges. Integrates with popular game engines and APIs.',
        tech: ['JavaScript', 'Browser Extension API', 'AI/NLP APIs'],
        link: 'https://github.com/SamparkBhol/gamedev-ai-assistant',
        icon: <Code className="w-8 h-8 text-cyan-400" />
      }
    ];
    
    export const npmPackages = [
      {
        name: 'gamedev-simple-utils',
        description: 'A lightweight NPM package offering a collection of utility functions commonly used in game development, such as vector math, collision detection helpers, and random generation tools. Designed for ease of integration into JavaScript/TypeScript game projects.',
        link: 'https://www.npmjs.com/package/gamedev-simple-utils', 
        icon: <Package className="w-8 h-8 text-red-500" />
      },
      {
        name: 'roguemaze',
        description: 'An NPM package for generating procedural mazes suitable for roguelike games. Offers various algorithms (e.g., Recursive Backtracker, Prim\'s Algorithm) and customization options for maze dimensions and complexity.',
        link: 'https://www.npmjs.com/package/cli-legend', 
        icon: <Package className="w-8 h-8 text-blue-500" />
      }
    ];

    export const research = [
      {
        title: 'An Energy Efficient Hybrid Communication Protocol for Large Area Wireless Sensor Networks',
        publication: 'Published in Elsevier Procedia Computer Science (ICECMSN).',
        description: 'Research on optimizing wireless communication algorithms and enhancing system efficiency for large-scale sensor network deployments.',
        link: 'https://tinyurl.com/yc33cawk',
        icon: <BookOpen className="w-8 h-8 text-yellow-300" />
      },
      {
        title: 'Novel Thesis & Ongoing Research Paper',
        publication: 'Currently working on an original novel thesis and another research paper.',
        description: 'No description as of now. Confidential.',
        link: '#',
        icon: <Brain className="w-8 h-8 text-indigo-300" />
      }
    ];

    export const skills = {
      programmingLanguages: ['Python', 'JavaScript', 'HTML', 'CSS', 'C', 'C++', 'R', 'Golang', 'React', 'Solidity'],
      frameworksTechnologies: ['LangChain', 'Flask', 'Flutter', 'Godot', 'Orange', 'Unreal Engine', 'Buildbox', 'Three.js', 'React Three Fiber', 'Next.js'],
      databasesStorage: ['PostgreSQL', 'MySQL', 'Firebase', 'MongoDB'],
      developmentTools: ['Git', 'GitLab', 'Ollama', 'Hugging Face', 'Kivy', 'Qiskit', 'PennyLane', 'Docker', 'Kubernetes', 'AWS'],
    };

    export const certifications = [
      {
        name: 'ISAA Certification by Saviynt',
        link: 'https://shorturl.at/cQj3S',
        icon: <Award className="w-6 h-6 text-green-400" />
      },
      {
        name: 'Deep Learning with TensorFlow by IBM',
        link: 'https://tinyurl.com/49ec28jp',
        icon: <Award className="w-6 h-6 text-blue-400" />
      }
    ];

    export const socialLinks = [
      { name: 'GitHub', url: personalInfo.github, icon: <Github className="w-6 h-6" /> },
      { name: 'LinkedIn', url: `https://${personalInfo.linkedin}`, icon: <Linkedin className="w-6 h-6" /> },
      { name: 'Email', url: `mailto:${personalInfo.email}`, icon: <Mail className="w-6 h-6" /> },
      { name: 'Phone', url: `tel:${personalInfo.phone}`, icon: <Phone className="w-6 h-6" /> },
      { name: 'Medium', url: personalInfo.medium, icon: <Newspaper className="w-6 h-6" /> },
    ];

    export const blogs = [
      {
        title: 'NeuroSymbolic AI : A view',
        link: 'https://medium.com/@samparkbhol2005/neurosymbolic-ai-a-view-328617188529',
        description: 'Exploring the integration of neural networks and symbolic reasoning in AI.',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8F0R2QJM9R4Y2Y7Z2J9A_w.jpeg', //sample image URL - !reminder change it later
        icon: <Brain className="w-8 h-8 text-purple-400" />
      },
      {
        title: 'Quantum-Enhanced NLP: The Future of Cloud AI',
        link: 'https://medium.com/@samparkbhol2005/quantum-enhanced-nlp-the-future-of-cloud-ai-aff15f85f274',
        description: 'Delving into how quantum computing can revolutionize Natural Language Processing.',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*QpZfD_L9zD7zWqUaO_ZpFA.png',
        icon: <Lightbulb className="w-8 h-8 text-blue-400" />
      },
      {
        title: 'CERN in October: A Month of Milestones and Marvels',
        link: 'https://medium.com/@samparkbhol2005/cern-in-october-a-month-of-milestones-and-marvels-c289c5c140f3',
        description: 'A look at significant achievements and discoveries at CERN.',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*sH2j_uZpY4XzW9N0uXp_gA.jpeg', 
        icon: <Users className="w-8 h-8 text-orange-400" />
      },
      {
        title: 'Quantum-driven gaming: AI meets the future',
        link: 'https://medium.com/@samparkbhol2005/quantum-driven-gaming-ai-meets-the-future-of-limitless-possibilities-in-the-cusp-of-new-tech-era-7e4226b894b8',
        description: 'The intersection of quantum computing, AI, and the future of gaming.',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*N3F_c_5fP6E0tXf3B_s8Xg.jpeg', 
        icon: <Edit3 className="w-8 h-8 text-green-400" />
      }
    ];

    export const volunteerExperience = [
      {
        organization: 'IEEE Computer Society - VIT Vellore',
        role: 'Event Organizer & Project Contributor',
        duration: '2+ Years',
        description: 'Organized various technical events, workshops, and hackathons. Actively participated in and contributed to multiple chapter projects, fostering a collaborative learning environment.',
        icon: <Building className="w-8 h-8 text-sky-400" />,
        imageUrl: 'https://images.unsplash.com/photo-1579567761406-46847DC88888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80' // Remainder 1
      },
      {
        organization: 'Association of Energy Engineers - VIT Vellore Student Chapter (AEE-VIT)',
        role: 'Active Member & Event Participant',
        duration: 'Completed',
        description: 'Engaged in events and activities to understand various energy sources, renewable energy technologies, and energy management principles. Contributed to discussions on sustainable energy solutions.',
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        imageUrl: 'https://images.unsplash.com/photo-1497435334942-80e30ee5e0e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' // Reminder 2
      }
    ];
