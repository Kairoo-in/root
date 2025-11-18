// AstraPath AI - Main Application Script
// Combines features from Astra, Astra2, and Athena Path

// Initialize AOS and Lucide
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

lucide.createIcons();

// Global state
let currentPlan = 'professional';
let modalBackdrop, modalContainer, modalContent;

// Career Tools from Astra/Astra2 (32+ tools)
const careerTools = [
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

// Learning System Features from Athena Path
const learningFeatures = [
    { id: 'pathGeneration', name: 'AI Path Generation', icon: 'route', color: 'blue-400', description: 'Curated learning paths from web resources' },
    { id: 'aiTutor', name: 'AI Tutor Chatbot', icon: 'message-circle', color: 'green-400', description: '24/7 contextual learning assistance' },
    { id: 'projectLearning', name: 'Project-Based Learning', icon: 'wrench', color: 'purple-400', description: 'Hands-on portfolio building' },
    { id: 'progressTracking', name: 'Progress Tracking', icon: 'trending-up', color: 'orange-400', description: 'Visual learning journey analytics' },
    { id: 'dynamicAdaptation', name: 'Dynamic Adaptation', icon: 'refresh-cw', color: 'cyan-400', description: 'Paths that evolve with you' },
    { id: 'enterpriseAnalytics', name: 'Enterprise Analytics', icon: 'bar-chart-3', color: 'red-400', description: 'Team learning insights' }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeModals();
    initializeNavigation();
    initializeFeaturesGrid();
    initializeCharts();
    initializeInteractivity();
});

function initializeModals() {
    modalBackdrop = document.getElementById('modal-backdrop');
    modalContainer = document.getElementById('modal-container');
    modalContent = document.getElementById('modal-content');
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
}

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeFeaturesGrid() {
    const featuresGrid = document.getElementById('features-grid');
    const allFeatures = [...careerTools, ...learningFeatures];
    
    // Show first 32 features in grid
    allFeatures.slice(0, 32).forEach((tool, index) => {
        const card = document.createElement('div');
        card.className = 'glass-card feature-card p-4 rounded-xl text-center';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', `${100 + (index * 15)}`);
        card.innerHTML = `
            <i data-lucide="${tool.icon}" class="w-8 h-8 mx-auto text-${tool.color}"></i>
            <h3 class="font-bold text-sm mt-2">${tool.name}</h3>
        `;
        
        card.addEventListener('click', () => openFeatureModal(tool));
        featuresGrid.appendChild(card);
    });
    
    lucide.createIcons();
}

function initializeCharts() {
    const teamChartCanvas = document.getElementById('teamSkillChart');
    if (teamChartCanvas) {
        new Chart(teamChartCanvas.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['AI/ML', 'Leadership', 'Technical Skills', 'Communication', 'Strategy', 'Innovation'],
                datasets: [{
                    label: 'Team Average',
                    data: [85, 75, 90, 80, 70, 85],
                    fill: true,
                    backgroundColor: 'rgba(0, 245, 212, 0.2)',
                    borderColor: 'rgb(0, 245, 212)',
                    pointBackgroundColor: 'rgb(0, 245, 212)',
                }, {
                    label: 'Industry Benchmark',
                    data: [70, 80, 85, 75, 75, 70],
                    fill: true,
                    backgroundColor: 'rgba(124, 121, 198, 0.2)',
                    borderColor: 'rgb(124, 121, 198)',
                    pointBackgroundColor: 'rgb(124, 121, 198)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255,255,255,0.2)' },
                        grid: { color: 'rgba(255,255,255,0.2)' },
                        pointLabels: { color: '#fff', font: { size: 12 } },
                        ticks: { color: 'transparent' }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#fff' }
                    }
                }
            }
        });
    }
}

function initializeInteractivity() {
    // Demo button
    const demoBtn = document.getElementById('demo-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            openModal(`
                <h2 class="text-2xl font-bold mb-4">Interactive Demo</h2>
                <p class="text-gray-300 mb-6">Experience the power of AstraPath AI with our interactive demo.</p>
                <div class="space-y-4">
                    <div class="p-4 bg-gray-800 rounded-lg">
                        <h3 class="font-bold text-cyan-400">Try a Career Tool</h3>
                        <p class="text-sm text-gray-400">Select any tool from our feature grid to see it in action</p>
                    </div>
                    <div class="p-4 bg-gray-800 rounded-lg">
                        <h3 class="font-bold text-purple-400">Generate a Learning Path</h3>
                        <p class="text-sm text-gray-400">Enter a skill you want to learn and see our AI create a personalized curriculum</p>
                    </div>
                    <div class="p-4 bg-gray-800 rounded-lg">
                        <h3 class="font-bold text-pink-400">Explore Team Analytics</h3>
                        <p class="text-sm text-gray-400">See how organizations track and develop their team's capabilities</p>
                    </div>
                </div>
                <button onclick="closeModal()" class="w-full mt-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 rounded-full">
                    Start Exploring
                </button>
            `);
        });
    }
}

function openFeatureModal(tool) {
    const inputs = generateInputsForTool(tool.id);
    const inputsHTML = inputs.map(input => {
        if (input.type === 'textarea') {
            return `<textarea id="tool-input-${input.id}" class="w-full bg-white/10 p-3 rounded-lg border border-white/20 h-24" placeholder="${input.placeholder}"></textarea>`;
        } else if (input.type === 'select') {
            return `<select id="tool-input-${input.id}" class="w-full bg-white/10 p-3 rounded-lg border border-white/20">${input.options.map(o => `<option>${o}</option>`).join('')}</select>`;
        }
        return `<input id="tool-input-${input.id}" type="${input.type}" placeholder="${input.placeholder}" class="w-full bg-white/10 p-3 rounded-lg border border-white/20">`;
    }).join('');

    const modalHTML = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold flex items-center gap-3">
                <i data-lucide="${tool.icon}" class="text-${tool.color}"></i>
                ${tool.name}
            </h2>
            <button onclick="closeModal()" class="text-2xl">&times;</button>
        </div>
        <p class="text-gray-300 mb-6">${tool.description}</p>
        <div class="space-y-4">${inputsHTML}</div>
        <button onclick="generateToolResponse('${tool.id}')" class="w-full mt-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 rounded-full">
            ✨ Generate AI Response
        </button>
        <div id="tool-output" class="mt-8 p-6 bg-gray-800/50 rounded-lg border border-white/10 min-h-[150px] hidden"></div>
    `;
    
    openModal(modalHTML);
}

function generateInputsForTool(toolId) {
    const inputMap = {
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
            { id: 'timeline', type: 'select', options: ['3 months', '6 months', '1 year', '2 years'] }
        ]
    };
    
    return inputMap[toolId] || [{ id: 'input', type: 'text', placeholder: 'Enter your query...' }];
}

async function generateToolResponse(toolId) {
    const outputDiv = document.getElementById('tool-output');
    outputDiv.classList.remove('hidden');
    outputDiv.innerHTML = '<p class="text-gray-400 text-center animate-pulse">AI is generating your personalized response...</p>';
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const responses = {
        'dynamicRoadmaps': `
            <h3 class="font-bold text-cyan-400 mb-3">Your Personalized Career Roadmap</h3>
            <div class="space-y-4">
                <div class="border-l-4 border-cyan-400 pl-4">
                    <h4 class="font-bold">Phase 1: Foundation (Months 1-3)</h4>
                    <ul class="text-sm text-gray-300 mt-2 space-y-1">
                        <li>• Complete Python fundamentals course</li>
                        <li>• Learn statistics and probability</li>
                        <li>• Practice with pandas and NumPy</li>
                    </ul>
                </div>
                <div class="border-l-4 border-purple-400 pl-4">
                    <h4 class="font-bold">Phase 2: Specialization (Months 4-8)</h4>
                    <ul class="text-sm text-gray-300 mt-2 space-y-1">
                        <li>• Master machine learning algorithms</li>
                        <li>• Complete 3 portfolio projects</li>
                        <li>• Learn SQL and database management</li>
                    </ul>
                </div>
                <div class="border-l-4 border-pink-400 pl-4">
                    <h4 class="font-bold">Phase 3: Application (Months 9-12)</h4>
                    <ul class="text-sm text-gray-300 mt-2 space-y-1">
                        <li>• Build end-to-end ML pipeline</li>
                        <li>• Network with data science professionals</li>
                        <li>• Apply for junior data scientist roles</li>
                    </ul>
                </div>
            </div>
        `,
        'pathGeneration': `
            <h3 class="font-bold text-green-400 mb-3">AI-Curated Learning Path</h3>
            <div class="space-y-3">
                <div class="p-3 bg-gray-700 rounded">
                    <h4 class="font-bold text-sm">Week 1-2: Fundamentals</h4>
                    <p class="text-xs text-gray-300">Core concepts and basic syntax</p>
                </div>
                <div class="p-3 bg-gray-700 rounded">
                    <h4 class="font-bold text-sm">Week 3-6: Hands-on Projects</h4>
                    <p class="text-xs text-gray-300">Build 3 progressively complex applications</p>
                </div>
                <div class="p-3 bg-gray-700 rounded">
                    <h4 class="font-bold text-sm">Week 7-8: Advanced Topics</h4>
                    <p class="text-xs text-gray-300">Industry best practices and optimization</p>
                </div>
            </div>
        `
    };
    
    outputDiv.innerHTML = responses[toolId] || `
        <h3 class="font-bold text-cyan-400 mb-3">AI Analysis Complete</h3>
        <p class="text-gray-300">Based on your input, here's your personalized AI-generated guidance and recommendations. This would contain detailed, actionable insights tailored to your specific needs and goals.</p>
    `;
}

function openModal(content) {
    modalContent.innerHTML = content;
    modalBackdrop.classList.add('active');
    modalContainer.classList.add('active');
    lucide.createIcons();
}

function closeModal() {
    modalBackdrop.classList.remove('active');
    modalContainer.classList.remove('active');
}

// Expose functions globally
window.openModal = openModal;
window.closeModal = closeModal;
window.generateToolResponse = generateToolResponse;
