# DevMon - Developer Metrics & Analytics Platform

A modern, AI-powered SaaS platform for tracking developer productivity metrics and team analytics. Built with Next.js, TypeScript, and integrated with Azure DevOps and Jira.

![DevMon Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=DevMon+Dashboard)

## 🚀 Features

### Core Metrics Tracking
- **Lead Time for Changes** - Measure time from commit to deployment
- **Deployment Frequency** - Track how often code is deployed
- **PR Cycle Time** - Monitor pull request review and merge times
- **Issue Throughput** - Track story point completion rates
- **Code Review Time** - Measure review efficiency
- **Mean Time to Recovery** - Track incident resolution times
- **Change Failure Rate** - Monitor deployment success rates
- **Team Velocity** - Track sprint completion rates

### AI-Powered Insights
- **Predictive Analytics** - AI-generated predictions for sprint risks
- **Team Health Indicators** - Automated team performance analysis
- **Smart Recommendations** - Actionable insights for process improvement
- **Risk Alerts** - Early warning system for potential issues

### Integrations
- **Azure DevOps** - Full integration with Azure DevOps REST API
- **Jira** - Comprehensive Jira API integration
- **GitHub** - Git-based metrics tracking (planned)
- **GitLab** - GitLab integration (planned)

### Modern Tech Stack
- **Next.js 14** - App Router with server components
- **TypeScript** - Full type safety
- **TailwindCSS** - Modern, responsive design
- **Prisma** - Type-safe database ORM
- **Clerk** - Authentication and user management
- **OpenAI** - AI-powered analytics
- **PostgreSQL** - Robust database backend

## 🏗️ Architecture

```
DevMon/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard pages
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   └── dashboard/        # Dashboard-specific components
│   ├── lib/                  # Utility functions
│   ├── services/             # Business logic services
│   ├── hooks/                # Custom React hooks
│   ├── stores/               # State management
│   └── types/                # TypeScript type definitions
├── prisma/                   # Database schema
├── tests/                    # Test files
│   └── e2e/                 # End-to-end tests
├── .storybook/              # Storybook configuration
└── .github/                 # GitHub Actions workflows
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Animation library
- **Recharts** - Chart components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Clerk** - Authentication service
- **OpenAI** - AI/ML capabilities

### Testing
- **Jest** - Unit testing framework
- **Playwright** - End-to-end testing
- **Storybook** - Component documentation
- **Testing Library** - React testing utilities

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **PostgreSQL** - Database hosting
- **Vercel/Netlify** - Deployment platform

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/devmon.git
   cd devmon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/devmon"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   
   # Azure DevOps
   AZURE_DEVOPS_PAT=your_azure_devops_pat
   AZURE_DEVOPS_ORG_URL=https://dev.azure.com/your-org
   
   # Jira
   JIRA_BASE_URL=https://your-domain.atlassian.net
   JIRA_EMAIL=your-email@domain.com
   JIRA_API_TOKEN=your_jira_api_token
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Unit Tests
```bash
npm run test
npm run test:watch
npm run test:coverage
```

### End-to-End Tests
```bash
npm run test:e2e
npm run test:e2e:ui
```

### Component Documentation
```bash
npm run storybook
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
1. Set up a PostgreSQL database
2. Configure Clerk authentication
3. Set up OpenAI API access
4. Configure Azure DevOps and Jira integrations

### Deployment Platforms
- **Vercel** (Recommended)
- **Netlify**
- **AWS**
- **Google Cloud Platform**

## 📊 Metrics & Analytics

### Developer Metrics
DevMon tracks the following key metrics:

1. **Lead Time for Changes**
   - Time from code commit to production deployment
   - Helps identify bottlenecks in the deployment pipeline

2. **Deployment Frequency**
   - How often code is deployed to production
   - Indicator of CI/CD efficiency

3. **PR Cycle Time**
   - Time from PR creation to merge
   - Measures code review efficiency

4. **Issue Throughput**
   - Story points completed per sprint
   - Team velocity and capacity planning

5. **Code Review Time**
   - Average time for code reviews
   - Review process efficiency

6. **Mean Time to Recovery**
   - Time to resolve production incidents
   - System reliability indicator

7. **Change Failure Rate**
   - Percentage of deployments causing incidents
   - Code quality and testing effectiveness

8. **Team Velocity**
   - Story points completed per sprint
   - Sprint planning and estimation accuracy

### AI-Powered Predictions
- **Sprint Spillover Risk** - Predicts likelihood of missing sprint goals
- **Team Burnout Risk** - Identifies potential team burnout indicators
- **Delivery Delay Risk** - Predicts project timeline risks
- **Quality Degradation Risk** - Identifies potential quality issues
- **Capacity Overload Risk** - Predicts team capacity issues

## 🔌 Integrations

### Azure DevOps
- **Work Items** - Track user stories, bugs, and tasks
- **Pull Requests** - Monitor code review metrics
- **Builds & Releases** - Track deployment frequency
- **Repositories** - Monitor code changes and commits

### Jira
- **Issues** - Track story points and completion rates
- **Sprints** - Monitor sprint velocity and burndown
- **Projects** - Multi-project support
- **Workflows** - Custom workflow tracking

## 🔐 Security

- **Clerk Authentication** - Secure user authentication
- **Role-based Access Control** - Granular permissions
- **API Security** - JWT token validation
- **Data Encryption** - Encrypted data storage
- **SOC 2 Compliance** - Enterprise security standards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow the existing code style
- Add Storybook stories for new components

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.devmon.com](https://docs.devmon.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/devmon/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/devmon/discussions)
- **Email**: support@devmon.com

## 🙏 Acknowledgments

- [LinearB](https://linearb.io) for UI/UX inspiration
- [Vercel](https://vercel.com) for Next.js and deployment
- [Clerk](https://clerk.com) for authentication
- [OpenAI](https://openai.com) for AI capabilities
- [Prisma](https://prisma.io) for database ORM

---

Built with ❤️ by the DevMon team