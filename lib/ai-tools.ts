// Career Tools Data
export interface CareerTool {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const careerTools: CareerTool[] = [
  { id: 'dynamicRoadmaps', name: 'Dynamic Roadmaps', icon: 'map', color: 'red-400', description: 'Generate step-by-step strategic plans to achieve your career goals' },
  { id: 'documentSuite', name: 'Document Suite', icon: 'file-text', color: 'orange-400', description: 'Create professional documents, proposals, and communications' },
  { id: 'interviewCoach', name: 'Interview Coach', icon: 'mic', color: 'amber-400', description: 'Practice interviews with AI feedback and real-time coaching' },
  { id: 'salaryCoach', name: 'Salary Coach', icon: 'trending-up', color: 'yellow-400', description: 'Analyze market value and negotiate better compensation' },
  { id: 'careerSimulator', name: 'Career Simulator', icon: 'compass', color: 'lime-400', description: 'Simulate career pivots and identify skill gaps' },
  { id: 'projectGenerator', name: 'Project Generator', icon: 'code', color: 'green-400', description: 'Get portfolio project ideas based on your skills' },
  { id: 'trendsAnalyzer', name: 'Trends Analyzer', icon: 'briefcase', color: 'emerald-400', description: 'Stay ahead with industry trend analysis' },
  { id: 'reviewAssistant', name: 'Review Assistant', icon: 'award', color: 'teal-400', description: 'Craft powerful performance reviews' },
  { id: 'bioGenerator', name: 'Bio Generator', icon: 'user-square', color: 'cyan-400', description: 'Create compelling professional bios and LinkedIn summaries' },
  { id: 'skillScenarios', name: 'Skill Scenarios', icon: 'users', color: 'sky-400', description: 'Practice workplace conversations with AI role-play' },
  { id: 'jobMatcher', name: 'Job Matcher', icon: 'target', color: 'blue-400', description: 'Analyze resume-job fit and get improvement suggestions' },
  { id: 'planner90Day', name: '90-Day Planner', icon: 'calendar-check', color: 'indigo-400', description: 'Strategic onboarding plans for new roles' },
  { id: 'emailAssistant', name: 'Email Assistant', icon: 'mail-plus', color: 'violet-400', description: 'Draft professional emails for any situation' },
  { id: 'meetingPrep', name: 'Meeting Prep', icon: 'clipboard-list', color: 'purple-400', description: 'Prepare for meetings with AI-generated agendas' },
  { id: 'postWriter', name: 'Post Writer', icon: 'pen-square', color: 'fuchsia-400', description: 'Create thought leadership content' },
  { id: 'goalRefiner', name: 'Goal Refiner', icon: 'flag', color: 'pink-400', description: 'Transform vague ambitions into SMART goals' },
  { id: 'ideaValidator', name: 'Idea Validator', icon: 'lightbulb', color: 'rose-400', description: 'Get SWOT analysis for your business ideas' },
  { id: 'learningTutor', name: 'Learning Tutor', icon: 'graduation-cap', color: 'red-500', description: 'AI tutor for any skill or concept' },
  { id: 'contractReviewer', name: 'Contract Reviewer', icon: 'shield-check', color: 'orange-500', description: 'Analyze contracts and job offers' },
  { id: 'networkingStrategist', name: 'Networking Strategist', icon: 'network', color: 'amber-500', description: 'Strategic relationship building plans' },
  { id: 'burnoutCoach', name: 'Burnout Coach', icon: 'heart-pulse', color: 'yellow-500', description: 'Manage workplace stress with AI guidance' },
  { id: 'budgetProposer', name: 'Budget Proposer', icon: 'piggy-bank', color: 'lime-500', description: 'Justify training investments to your company' },
  { id: 'pitchRefiner', name: 'Pitch Refiner', icon: 'megaphone', color: 'green-500', description: 'Perfect your elevator pitch' },
  { id: 'retroHelper', name: 'Retro Helper', icon: 'recycle', color: 'emerald-500', description: 'Structure team retrospectives' },
  { id: 'healthCheck', name: 'Career Health Check', icon: 'activity', color: 'teal-500', description: 'Analyze your career vitality' },
  { id: 'sideHustle', name: 'Side-Hustle Ideas', icon: 'dollar-sign', color: 'cyan-500', description: 'Personalized income stream suggestions' },
  { id: 'speakingCoach', name: 'Speaking Coach', icon: 'presentation', color: 'sky-500', description: 'Improve presentation and speaking skills' },
  { id: 'conflictMediator', name: 'Conflict Mediator', icon: 'shield-half', color: 'blue-500', description: 'Navigate difficult workplace conversations' },
  { id: 'mockupFeedback', name: 'Design Feedback', icon: 'drafting-compass', color: 'indigo-500', description: 'Get expert feedback on designs and mockups' },
  { id: 'jargonBuster', name: 'Jargon Buster', icon: 'book-key', color: 'violet-500', description: 'Decode industry terminology' },
  { id: 'decisionCopilot', name: 'Decision Co-Pilot', icon: 'waypoints', color: 'purple-500', description: 'Navigate tough career choices' },
  { id: 'stakeholderMapper', name: 'Stakeholder Mapper', icon: 'sitemap', color: 'fuchsia-500', description: 'Map project stakeholders and influence' }
];

export const learningFeatures = [
  { id: 'pathGeneration', name: 'AI Path Generation', icon: 'route', color: 'blue-400', description: 'Curated learning paths from web resources' },
  { id: 'aiTutor', name: 'AI Tutor Chatbot', icon: 'message-circle', color: 'green-400', description: '24/7 contextual learning assistance' },
  { id: 'projectLearning', name: 'Project-Based Learning', icon: 'wrench', color: 'purple-400', description: 'Hands-on portfolio building' },
  { id: 'progressTracking', name: 'Progress Tracking', icon: 'trending-up', color: 'orange-400', description: 'Visual learning journey analytics' },
  { id: 'dynamicAdaptation', name: 'Dynamic Adaptation', icon: 'refresh-cw', color: 'cyan-400', description: 'Paths that evolve with you' },
  { id: 'enterpriseAnalytics', name: 'Enterprise Analytics', icon: 'bar-chart-3', color: 'red-400', description: 'Team learning insights' }
];

export interface ToolInput {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'select';
  placeholder: string;
  options?: string[];
}

export function generateInputsForTool(toolId: string): ToolInput[] {
  const inputMap: Record<string, ToolInput[]> = {
    'dynamicRoadmaps': [{ id: 'goal', type: 'text', placeholder: 'Your career goal (e.g., "Become a Data Scientist")' }],
    'interviewCoach': [
      { id: 'role', type: 'text', placeholder: 'Role you are interviewing for' },
      { id: 'question', type: 'text', placeholder: 'Interview question to practice' }
    ],
    'salaryCoach': [
      { id: 'role', type: 'text', placeholder: 'Your job title' },
      { id: 'experience', type: 'number', placeholder: 'Years of experience' },
      { id: 'location', type: 'text', placeholder: 'Your location' }
    ],
    'learningTutor': [{ id: 'topic', type: 'text', placeholder: 'What do you want to learn?' }],
    'pathGeneration': [
      { id: 'skill', type: 'text', placeholder: 'Skill to master' },
      { id: 'timeline', type: 'select', placeholder: 'Timeline', options: ['3 months', '6 months', '1 year', '2 years'] }
    ]
  };
  
  return inputMap[toolId] || [{ id: 'input', type: 'text', placeholder: 'Enter your query...' }];
}

