import { AITool } from '../types/AITool';

export const mockAITools: AITool[] = [
  {
    id: "001",
    name: "ChatGPT",
    description: "ChatGPT is an AI-powered chatbot developed by OpenAI, based on the GPT (Generative Pre-trained Transformer) language model. It can engage in conversational dialogue and provide responses that can appear surprisingly human. From answering questions and providing information to creative writing and language translation, ChatGPT offers a wide range of capabilities.",
    category: "Chatbot",
    tags: ["Conversational AI", "NLP", "GPT-4", "Text Generation"],
    website: "https://chat.openai.com",
    pricing: {
      free: true,
      paid: true,
      price_range: "$20/month"
    },
    features: [
      "Text Generation", 
      "Conversational AI", 
      "API Access", 
      "Code Assistance", 
      "Content Creation",
      "Language Translation"
    ],
    api_available: true,
    rating: 4.8,
    reviews_count: 1250,
    logo: "/chatgpt-logo.svg",
    created_at: "2023-01-15",
    updated_at: "2024-02-28"
  },
  {
    id: "002",
    name: "MidJourney",
    description: "MidJourney is an AI-powered image generation tool that creates stunning visuals from text descriptions. Using advanced machine learning algorithms, it can produce highly detailed and creative images across various styles and concepts. MidJourney has become popular among artists, designers, and creative professionals for its ability to generate high-quality, unique artwork.",
    category: "Image Generation",
    tags: ["Art", "Generative AI", "Stable Diffusion", "Creative"],
    website: "https://midjourney.com",
    pricing: {
      free: false,
      paid: true,
      price_range: "$10-$60/month"
    },
    features: [
      "AI Art Creation", 
      "Text-to-Image Generation", 
      "High-Resolution Output", 
      "Style Customization",
      "Discord Integration",
      "Commercial Usage Rights"
    ],
    api_available: false,
    rating: 4.7,
    reviews_count: 980,
    logo: "https://seeklogo.com/images/M/midjourney-logo-D741C0F57A-seeklogo.com.png",
    created_at: "2022-10-05",
    updated_at: "2024-02-28"
  },
  {
    id: "003",
    name: "DALL-E",
    description: "DALL-E is an AI system developed by OpenAI that can create realistic images and art from natural language descriptions. Named as a portmanteau of the artist Salvador Dalí and the robot WALL-E, it uses a version of GPT-3 modified to generate images. DALL-E can create imaginative and diverse images that reflect the text prompt with remarkable accuracy.",
    category: "Image Generation",
    tags: ["Art", "Generative AI", "OpenAI", "Creative"],
    website: "https://openai.com/dall-e-3",
    pricing: {
      free: true,
      paid: true,
      price_range: "Credits system"
    },
    features: [
      "Text-to-Image Generation", 
      "Image Editing", 
      "Variations Creation", 
      "Outpainting",
      "Inpainting",
      "API Access"
    ],
    api_available: true,
    rating: 4.6,
    reviews_count: 850,
    logo: "https://seeklogo.com/images/D/dall-e-logo-1DD5C0922E-seeklogo.com.png",
    created_at: "2021-01-05",
    updated_at: "2024-01-15"
  },
  {
    id: "004",
    name: "Zapier",
    description: "Zapier is an automation tool that connects your apps and services to automate repetitive tasks without coding or relying on developers to build integrations. It moves info between your web apps automatically, so you can focus on your most important work. Zapier supports thousands of apps and allows you to automate workflows with simple triggers and actions.",
    category: "Automation",
    tags: ["Workflow Automation", "Integration", "No-Code", "Productivity"],
    website: "https://zapier.com",
    pricing: {
      free: true,
      paid: true,
      price_range: "$19.99-$799/month"
    },
    features: [
      "App Integration", 
      "Workflow Automation", 
      "Custom Zaps", 
      "Multi-step Zaps",
      "Filters and Formatters",
      "Error Handling"
    ],
    api_available: true,
    rating: 4.5,
    reviews_count: 1500,
    logo: "/zapier-logo.svg",
    created_at: "2011-06-01",
    updated_at: "2024-03-10"
  },
  {
    id: "005",
    name: "Jasper",
    description: "Jasper (formerly Jarvis) is an AI content platform that helps teams create original, on-brand content faster. Powered by generative AI, Jasper can write blog posts, social media content, marketing copy, and more. It's designed to help marketers and content creators overcome writer's block and produce high-quality content at scale.",
    category: "Content Creation",
    tags: ["Writing", "Marketing", "AI Writer", "Content"],
    website: "https://jasper.ai",
    pricing: {
      free: false,
      paid: true,
      price_range: "$39-$125/month"
    },
    features: [
      "AI Writing Assistant", 
      "Content Templates", 
      "Brand Voice Control", 
      "SEO Integration",
      "Plagiarism Checker",
      "Team Collaboration"
    ],
    api_available: true,
    rating: 4.4,
    reviews_count: 1100,
    logo: "https://vectorlogoseek.com/wp-content/uploads/2023/02/jasper-ai-vector-logo.png",
    created_at: "2021-02-01",
    updated_at: "2024-02-15"
  },
  {
    id: "006",
    name: "Notion AI",
    description: "Notion AI is an AI writing assistant integrated into the Notion workspace platform. It helps users draft, edit, summarize, and brainstorm content directly within their Notion documents. From writing first drafts to improving existing content, Notion AI enhances productivity while maintaining the organizational benefits of the Notion platform.",
    category: "Productivity",
    tags: ["Writing", "Note-taking", "Workspace", "Organization"],
    website: "https://notion.so/product/ai",
    pricing: {
      free: false,
      paid: true,
      price_range: "$10/month (add-on)"
    },
    features: [
      "AI Writing Assistant", 
      "Content Summarization", 
      "Translation", 
      "Brainstorming",
      "Editing and Proofreading",
      "Integration with Notion Workspace"
    ],
    api_available: false,
    rating: 4.3,
    reviews_count: 750,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    created_at: "2023-02-22",
    updated_at: "2024-01-30"
  },
  {
    id: "007",
    name: "Stable Diffusion",
    description: "Stable Diffusion is an open-source AI art generation model that creates detailed images based on text descriptions. Unlike some competitors, it can be run locally on consumer hardware. It has gained popularity for its accessibility, customizability, and the ability to fine-tune the model for specific styles or applications.",
    category: "Image Generation",
    tags: ["Open Source", "Generative AI", "Art", "Local Deployment"],
    website: "https://stability.ai",
    pricing: {
      free: true,
      paid: true,
      price_range: "Free (self-hosted) to $20/month (cloud)"
    },
    features: [
      "Text-to-Image Generation", 
      "Image-to-Image Transformation", 
      "Inpainting", 
      "Outpainting",
      "Local Deployment Option",
      "Model Fine-tuning"
    ],
    api_available: true,
    rating: 4.5,
    reviews_count: 920,
    logo: "https://seeklogo.com/images/S/stable-diffusion-logo-8EF6B0AC4B-seeklogo.com.png",
    created_at: "2022-08-22",
    updated_at: "2024-03-05"
  },
  {
    id: "008",
    name: "Anthropic Claude",
    description: "Claude is an AI assistant created by Anthropic, designed to be helpful, harmless, and honest. It excels at thoughtful dialogue and complex reasoning tasks. Claude can handle everything from creative writing to detailed analysis, while maintaining a focus on safety and avoiding harmful outputs. It's known for its nuanced understanding of context and instructions.",
    category: "Chatbot",
    tags: ["Conversational AI", "NLP", "Safety-focused", "Enterprise"],
    website: "https://anthropic.com/claude",
    pricing: {
      free: true,
      paid: true,
      price_range: "Free tier + $20/month (Pro)"
    },
    features: [
      "Conversational AI", 
      "Long Context Window", 
      "Document Analysis", 
      "Content Generation",
      "Code Understanding",
      "API Access"
    ],
    api_available: true,
    rating: 4.6,
    reviews_count: 680,
    logo: "https://seeklogo.com/images/A/anthropic-claude-logo-B9AE3B77B2-seeklogo.com.png",
    created_at: "2022-12-15",
    updated_at: "2024-02-20"
  },
  {
    id: "009",
    name: "Synthesia",
    description: "Synthesia is an AI video generation platform that creates professional videos with virtual presenters. It allows users to turn text scripts into video presentations featuring AI avatars that speak in multiple languages. This technology makes video production faster, more affordable, and accessible without requiring cameras, studios, or actors.",
    category: "Video Generation",
    tags: ["AI Video", "Virtual Avatars", "Text-to-Video", "Marketing"],
    website: "https://synthesia.io",
    pricing: {
      free: false,
      paid: true,
      price_range: "$30-$500/month"
    },
    features: [
      "AI Video Creation", 
      "Virtual Presenters", 
      "Multi-language Support", 
      "Custom Avatars",
      "Screen Recording Integration",
      "Template Library"
    ],
    api_available: true,
    rating: 4.4,
    reviews_count: 520,
    logo: "https://assets-global.website-files.com/61dc0796f359b6145bc06581/6398a25f2e2d0a61fe3c0f80_OG%20image%20-%20Synthesia%20(1).png",
    created_at: "2019-05-10",
    updated_at: "2024-01-25"
  },
  {
    id: "010",
    name: "Otter.ai",
    description: "Otter.ai is an AI-powered transcription and note-taking service that automatically converts speech to text. It's designed for meetings, interviews, lectures, and conversations. Otter uses advanced AI to identify speakers, capture key points, and make audio content searchable and shareable. It's particularly useful for remote teams and professionals who need accurate meeting records.",
    category: "Transcription",
    tags: ["Speech-to-Text", "Meeting Assistant", "Note-taking", "Productivity"],
    website: "https://otter.ai",
    pricing: {
      free: true,
      paid: true,
      price_range: "$16.99-$30/month"
    },
    features: [
      "Real-time Transcription", 
      "Speaker Identification", 
      "Meeting Summaries", 
      "Keyword Highlighting",
      "Audio Recording",
      "Integration with Zoom, Teams, etc."
    ],
    api_available: true,
    rating: 4.3,
    reviews_count: 780,
    logo: "https://play-lh.googleusercontent.com/RKnKhPYGaFmghRQpRDkBQXqQVRKrFU5tKMjM_eEJC-Y9oHgxKn5kEBmYZMzzmHLPKA",
    created_at: "2016-02-15",
    updated_at: "2024-02-10"
  },
  {
    id: "011",
    name: "Grammarly",
    description: "Grammarly is an AI-powered writing assistant that helps users improve their writing by checking for grammar, spelling, punctuation, clarity, engagement, and delivery mistakes. It works across various platforms and applications, providing real-time suggestions to enhance writing quality. With both free and premium versions, it's used by students, professionals, and businesses worldwide.",
    category: "Writing Assistant",
    tags: ["Grammar Checker", "Proofreading", "Editing", "Productivity"],
    website: "https://grammarly.com",
    pricing: {
      free: true,
      paid: true,
      price_range: "$12-$30/month"
    },
    features: [
      "Grammar Checking", 
      "Spelling Correction", 
      "Style Suggestions", 
      "Tone Detection",
      "Plagiarism Checker",
      "Browser Extension"
    ],
    api_available: true,
    rating: 4.7,
    reviews_count: 2100,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Grammarly_logo.svg/1200px-Grammarly_logo.svg.png",
    created_at: "2009-08-01",
    updated_at: "2024-03-01"
  },
  {
    id: "012",
    name: "Runway",
    description: "Runway is a creative toolkit powered by machine learning that enables artists, filmmakers, and designers to create content using AI. It offers various creative tools including text-to-video generation, image editing, motion tracking, and more. Runway makes advanced AI capabilities accessible to creative professionals without requiring technical expertise.",
    category: "Creative Tools",
    tags: ["Video Generation", "Image Editing", "Motion Graphics", "Creative AI"],
    website: "https://runwayml.com",
    pricing: {
      free: true,
      paid: true,
      price_range: "$15-$95/month"
    },
    features: [
      "Text-to-Video Generation", 
      "Image Generation", 
      "Video Editing", 
      "Green Screen",
      "Motion Tracking",
      "Collaborative Workspaces"
    ],
    api_available: true,
    rating: 4.5,
    reviews_count: 650,
    logo: "https://assets-global.website-files.com/6228fdbc6c971401d02a9c42/6228fdbc6c97144e4f2a9c8a_runway-logo-black.svg",
    created_at: "2018-07-20",
    updated_at: "2024-02-05"
  }
];