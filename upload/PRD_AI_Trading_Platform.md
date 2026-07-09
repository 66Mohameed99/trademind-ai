# PRD - AI Trading Education Platform

> Version: 1.0

## 1. Vision

Build an AI-powered trading education platform combining learning,
market analysis, trading journal, AI mentor, chart analysis, signals
(educational only), community, subscriptions, and administration.

## 2. Goals

-   Deliver structured trading education.
-   Provide AI-assisted chart analysis.
-   Offer educational market opportunities.
-   Track trader performance.
-   Build an active learning community.

## 3. User Roles

-   Guest
-   Student
-   Trader
-   Premium Member
-   Instructor
-   Analyst
-   Support
-   Admin
-   Super Admin

## 4. Core Modules

### Marketing Website

-   Landing page
-   Features
-   Pricing
-   FAQ
-   Blog
-   Contact

### Authentication

-   Email
-   Google
-   Apple
-   2FA
-   Password reset

### Dashboard

-   Progress
-   Watchlist
-   Signals
-   Calendar
-   Notifications

### AI Mentor

-   Chat
-   Explain concepts
-   Review screenshots
-   Personalized roadmap

### AI Chart Analyzer

-   Upload chart
-   Detect trend
-   Support/Resistance
-   BOS/CHOCH
-   Order Blocks
-   Liquidity
-   FVG
-   Risk suggestions

### Academy

-   Courses
-   Lessons
-   Quizzes
-   Certificates
-   Learning paths

### Journal

-   Record trades
-   Metrics
-   Win rate
-   Psychology notes
-   AI feedback

### Community

-   Posts
-   Comments
-   Groups
-   Live sessions

### Subscription

-   Free
-   Pro
-   Elite
-   Coupons
-   Billing

### Admin

-   Users
-   Courses
-   Signals
-   CMS
-   Reports
-   Roles

## 5. Functional Requirements

-   Responsive design
-   Arabic/English
-   Dark/Light mode
-   Search
-   Notifications
-   File uploads
-   Analytics

## 6. Non Functional Requirements

-   99.9% uptime
-   JWT auth
-   Encryption
-   Audit logs
-   Backups
-   CDN
-   Scalable architecture

## 7. Suggested Stack

Frontend: Next.js Backend: NestJS Database: PostgreSQL Cache: Redis
Storage: S3 Realtime: WebSocket AI: OpenAI compatible APIs Payments:
Stripe

## 8. Database (High Level)

Users Profiles Courses Lessons Enrollments Signals Trades Journal
Subscriptions Invoices Notifications Posts Comments Achievements Roles
Permissions

## 9. API Examples

GET /courses GET /signals POST /journal POST /ai/analyze-chart POST
/auth/login

## 10. KPIs

-   Active users
-   Completion rate
-   Retention
-   Conversion
-   Satisfaction

## 11. Roadmap

Phase 1: Website + Auth Phase 2: Academy Phase 3: AI Mentor Phase 4:
Chart Analyzer Phase 5: Journal Phase 6: Community Phase 7: Mobile Apps

## 12. Business Rules

Educational content only. Users remain responsible for trading
decisions.
