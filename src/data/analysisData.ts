export interface AnalysisConfig {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  layout: 'imageLeft' | 'textLeft';
  metrics?: MetricConfig[];
  progressBars?: ProgressConfig[];
  sources?: SourceConfig[];
  imageType: 'article' | 'dashboard' | 'visualization' | 'comparison';
  walkthrough?: WalkthroughConfig;
}

export interface MetricConfig {
  label: string;
  value: string;
  description?: string;
  icon?: string;
  highlightArea?: HighlightArea;
}

export interface ProgressConfig {
  label: string;
  value: number;
  color: string;
  highlightArea?: HighlightArea;
}

export interface SourceConfig {
  name: string;
  grade: string;
  credibility: number;
  type: 'primary' | 'secondary' | 'opinion';
  description: string;
  highlightArea?: HighlightArea;
}

export interface HighlightArea {
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  heightPercent: number;
}

export interface WalkthroughConfig {
  enabled: boolean;
  screenshotUrl: string;
  title: string;
  description: string;
}

export const analysisData: AnalysisConfig[] = [
  {
    id: 'basic',
    title: 'BASIC ANALYSIS',
    subtitle: 'Our AI analyzes fundamental aspects of news articles including sentiment polarity, political bias detection, and editorial intent classification using advanced natural language processing.',
    color: 'blue',
    layout: 'imageLeft',
    imageType: 'article',
    walkthrough: {
      enabled: true,
      screenshotUrl: '/file1.png',
      title: 'Basic Analysis Dashboard',
      description: 'Explore how our AI breaks down the fundamental elements of any news article'
    },
    metrics: [
      {
        label: 'Headline Sentiment',
        value: 'Positive (+7.2)',
        description: 'Emotional tone of the headline using advanced sentiment analysis',
        highlightArea: {
          xPercent: 5,
          yPercent: 15,
          widthPercent: 40,
          heightPercent: 8
        }
      },
      {
        label: 'Article Sentiment',
        value: 'Neutral (+2.1)',
        description: 'Overall emotional tone of the entire article content',
        highlightArea: {
          xPercent: 5,
          yPercent: 35,
          widthPercent: 40,
          heightPercent: 12
        }
      },
      {
        label: 'Intent',
        value: 'Informative',
        description: 'Primary purpose and intent behind the article',
        highlightArea: {
          xPercent: 55,
          yPercent: 15,
          widthPercent: 35,
          heightPercent: 8
        }
      },
      {
        label: 'Bias Score',
        value: '3.2/10 (Slight Left)',
        description: 'Political bias measurement on a 10-point scale',
        highlightArea: {
          xPercent: 55,
          yPercent: 35,
          widthPercent: 35,
          heightPercent: 12
        }
      }
    ]
  },
  {
    id: 'emotions',
    title: 'TOP EMOTIONS',
    subtitle: 'Advanced emotion detection identifies and quantifies 15+ emotional states including fear, anger, disgust, and joy to understand the psychological impact of news content.',
    color: 'purple',
    layout: 'textLeft',
    imageType: 'visualization',
    walkthrough: {
      enabled: true,
      screenshotUrl: '/file1.png',
      title: 'Emotion Detection Interface',
      description: 'See how we identify and measure emotional impact in news content'
    },
    progressBars: [
      { 
        label: 'Neutral', 
        value: 68, 
        color: 'gray-400',
        highlightArea: {
          xPercent: 10,
          yPercent: 25,
          widthPercent: 80,
          heightPercent: 15
        }
      },
      { 
        label: 'Fear', 
        value: 18, 
        color: 'orange-400',
        highlightArea: {
          xPercent: 10,
          yPercent: 45,
          widthPercent: 80,
          heightPercent: 15
        }
      },
      { 
        label: 'Disgust', 
        value: 14, 
        color: 'red-400',
        highlightArea: {
          xPercent: 10,
          yPercent: 65,
          widthPercent: 80,
          heightPercent: 15
        }
      }
    ]
  },
  {
    id: 'readability',
    title: 'READABILITY',
    subtitle: 'Comprehensive readability analysis using Flesch-Kincaid metrics, vocabulary complexity assessment, and sentence structure evaluation to determine accessibility for different audiences.',
    color: 'green',
    layout: 'imageLeft',
    imageType: 'article',
    walkthrough: {
      enabled: true,
      screenshotUrl: '/file1.png',
      title: 'Readability Assessment',
      description: 'Understand how accessible your content is to different audiences'
    },
    metrics: [
      {
        label: 'Difficulty Level',
        value: 'High School',
        description: 'Target education level required to understand the content',
        highlightArea: {
          xPercent: 15,
          yPercent: 20,
          widthPercent: 30,
          heightPercent: 10
        }
      },
      {
        label: 'Grade Level',
        value: 'Grade 12',
        description: 'Flesch-Kincaid grade level measurement',
        highlightArea: {
          xPercent: 55,
          yPercent: 20,
          widthPercent: 30,
          heightPercent: 10
        }
      },
      {
        label: 'Flesch Score',
        value: '58.2 (Standard)',
        description: 'Reading ease score from 0-100 (higher = easier)',
        highlightArea: {
          xPercent: 15,
          yPercent: 40,
          widthPercent: 70,
          heightPercent: 15
        }
      }
    ]
  },
  {
    id: 'entities',
    title: 'KEY ENTITIES',
    subtitle: 'Named Entity Recognition (NER) identifies and categorizes people, organizations, locations, and temporal references with confidence scoring and relationship mapping.',
    color: 'cyan',
    layout: 'textLeft',
    imageType: 'article',
    walkthrough: {
      enabled: true,
      screenshotUrl: '/file1.png',
      title: 'Entity Recognition Dashboard',
      description: 'Discover how we identify and categorize key entities in news articles'
    },
    metrics: [
      {
        label: 'Total Entities',
        value: '12 detected',
        description: 'People, places, organizations identified with high confidence',
        highlightArea: {
          xPercent: 5,
          yPercent: 10,
          widthPercent: 90,
          heightPercent: 20
        }
      },
      {
        label: 'Confidence',
        value: '94.2%',
        description: 'Average recognition accuracy across all entities',
        highlightArea: {
          xPercent: 70,
          yPercent: 75,
          widthPercent: 25,
          heightPercent: 8
        }
      }
    ]
  },
  {
    id: 'factual',
    title: 'FACTUAL ANALYSIS',
    subtitle: 'Deep fact-checking analysis distinguishing between literal statements, speculation, and opinion while evaluating source credibility and claim verification.',
    color: 'red',
    layout: 'imageLeft',
    imageType: 'dashboard',
    walkthrough: {
      enabled: true,
      screenshotUrl: '/file1.png',
      title: 'Fact-Checking Interface',
      description: 'See how we verify facts and assess source credibility'
    },
    progressBars: [
      { 
        label: 'Literal Statements', 
        value: 75, 
        color: 'green-400',
        highlightArea: {
          xPercent: 10,
          yPercent: 30,
          widthPercent: 80,
          heightPercent: 12
        }
      },
      { 
        label: 'Speculation', 
        value: 15, 
        color: 'yellow-400',
        highlightArea: {
          xPercent: 10,
          yPercent: 48,
          widthPercent: 80,
          heightPercent: 12
        }
      },
      { 
        label: 'Opinion', 
        value: 10, 
        color: 'red-400',
        highlightArea: {
          xPercent: 10,
          yPercent: 66,
          widthPercent: 80,
          heightPercent: 12
        }
      }
    ],
    metrics: [
      {
        label: 'Overall Score',
        value: '8.7/10',
        description: 'Factual accuracy rating based on multiple factors',
        highlightArea: {
          xPercent: 65,
          yPercent: 10,
          widthPercent: 30,
          heightPercent: 15
        }
      },
      {
        label: 'Factual Grade',
        value: 'A- (87%)',
        description: 'Letter grade assessment of factual reliability',
        highlightArea: {
          xPercent: 65,
          yPercent: 85,
          widthPercent: 30,
          heightPercent: 10
        }
      }
    ]
  },
  {
    id: 'propaganda',
    title: 'PROPAGANDA TECHNIQUES',
    subtitle: 'Advanced detection of manipulation techniques including repetition, loaded language, fear appeals, and other persuasion tactics used in media content.',
    color: 'red',
    layout: 'textLeft',
    imageType: 'article',
    walkthrough: {
      enabled: true,
      screenshotUrl: '/file1.png',
      title: 'Propaganda Detection System',
      description: 'Learn how we identify manipulation techniques in news content'
    },
    metrics: [
      {
        label: 'Repetition',
        value: 'Found (3x)',
        description: 'Repeated key words and phrases that emphasize certain points',
        highlightArea: {
          xPercent: 5,
          yPercent: 25,
          widthPercent: 90,
          heightPercent: 15
        }
      },
      {
        label: 'Loaded Language',
        value: 'Detected',
        description: 'Emotionally charged words designed to influence opinion',
        highlightArea: {
          xPercent: 5,
          yPercent: 45,
          widthPercent: 90,
          heightPercent: 15
        }
      },
      {
        label: 'Appeal to Fear',
        value: 'Moderate',
        description: 'Language designed to create anxiety or concern',
        highlightArea: {
          xPercent: 5,
          yPercent: 65,
          widthPercent: 90,
          heightPercent: 15
        }
      }
    ]
  },
  {
    id: 'framing',
    title: 'FRAMING & ANALYSIS',
    subtitle: 'Cross-source comparison analyzing how different outlets frame the same story, measuring polarization and identifying editorial perspective differences.',
    color: 'orange',
    layout: 'imageLeft',
    imageType: 'comparison',
    walkthrough: {
      enabled: true,
      screenshotUrl: '/file1.png',
      title: 'Framing Comparison Tool',
      description: 'Compare how different news sources frame the same story'
    },
    metrics: [
      {
        label: 'Primary Frame',
        value: 'Economic Policy',
        description: 'Main narrative framework used across sources',
        highlightArea: {
          xPercent: 5,
          yPercent: 15,
          widthPercent: 40,
          heightPercent: 25
        }
      },
      {
        label: 'Balance Score',
        value: '4.2/10 (Polarized)',
        description: 'Measure of agreement between different sources',
        highlightArea: {
          xPercent: 55,
          yPercent: 15,
          widthPercent: 40,
          heightPercent: 25
        }
      }
    ]
  },
  {
    id: 'summary',
    title: 'SUMMARY & KEY POINTS',
    subtitle: 'AI-powered summarization extracting essential information and key points while maintaining context and reducing content length by up to 95%.',
    color: 'indigo',
    layout: 'textLeft',
    imageType: 'dashboard',
    walkthrough: {
      enabled: true,
      screenshotUrl: '/file1.png',
      title: 'AI Summary Generator',
      description: 'Watch how we compress articles while preserving key information'
    },
    metrics: [
      {
        label: 'Compression',
        value: '95% reduction',
        description: 'Content reduced from 847 words to 43 words while preserving meaning',
        highlightArea: {
          xPercent: 10,
          yPercent: 20,
          widthPercent: 80,
          heightPercent: 30
        }
      },
      {
        label: 'Key Points',
        value: '3 extracted',
        description: 'Most important information distilled into actionable points',
        highlightArea: {
          xPercent: 10,
          yPercent: 60,
          widthPercent: 80,
          heightPercent: 25
        }
      }
    ]
  },
  {
    id: 'sources',
    title: 'SOURCE ANALYSIS',
    subtitle: 'Comprehensive source credibility evaluation including primary/secondary source classification, attribution analysis, and reliability scoring.',
    color: 'green',
    layout: 'imageLeft',
    imageType: 'dashboard',
    walkthrough: {
      enabled: true,
      screenshotUrl: '/file1.png',
      title: 'Source Credibility Dashboard',
      description: 'Evaluate the reliability and credibility of news sources'
    },
    sources: [
      {
        name: 'Reuters',
        grade: 'A',
        credibility: 9.2,
        type: 'primary',
        description: 'Primary source, fact-checked',
        highlightArea: {
          xPercent: 10,
          yPercent: 20,
          widthPercent: 80,
          heightPercent: 15
        }
      },
      {
        name: 'CNN',
        grade: 'B',
        credibility: 7.8,
        type: 'secondary',
        description: 'Secondary source, some bias',
        highlightArea: {
          xPercent: 10,
          yPercent: 40,
          widthPercent: 80,
          heightPercent: 15
        }
      },
      {
        name: 'Political Blog',
        grade: 'C',
        credibility: 4.2,
        type: 'opinion',
        description: 'Opinion piece, high bias',
        highlightArea: {
          xPercent: 10,
          yPercent: 60,
          widthPercent: 80,
          heightPercent: 15
        }
      }
    ],
    metrics: [
      {
        label: 'Total Sources',
        value: '12 verified',
        description: 'Number of sources checked for credibility',
        highlightArea: {
          xPercent: 70,
          yPercent: 10,
          widthPercent: 25,
          heightPercent: 8
        }
      },
      {
        label: 'Avg Credibility',
        value: '8.1/10',
        description: 'Average credibility score across all sources',
        highlightArea: {
          xPercent: 70,
          yPercent: 85,
          widthPercent: 25,
          heightPercent: 8
        }
      }
    ]
  }
];