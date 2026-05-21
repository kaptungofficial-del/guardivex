# Planning Guide

guardivex is an enterprise-grade downloadable security software platform that customers install on their own infrastructure to monitor physical security devices, manage incidents, and operate a comprehensive Security Operations Center (SOC). Similar to Genetec Security Center, Splunk Enterprise, CrowdStrike Falcon, and VMware vCenter, it combines powerful local processing with optional cloud connectivity for licensing, updates, and remote access.

**Experience Qualities**:
1. **Enterprise-Grade** - Interface conveys the reliability and sophistication expected from downloadable enterprise software with professional information architecture and robust functionality
2. **Self-Hosted Authority** - Design emphasizes customer control over their own security infrastructure with clear indicators of local system health and data sovereignty
3. **Mission-Critical** - Layout prioritizes uptime monitoring, system health, and operational readiness with clear status indicators for the platform itself and monitored devices

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a comprehensive enterprise security platform with dual interfaces: a public-facing marketing website explaining the product, and a sophisticated downloadable application featuring SOC command center, multi-site monitoring, device management, incident response, system health monitoring, license management, and administrative controls.

## Essential Features

### Public Marketing Website
- **Functionality**: Multi-page marketing site explaining guardivex as downloadable enterprise software
- **Purpose**: Educate prospects about the platform's capabilities, deployment model, and licensing options
- **Trigger**: User visits root URL without authentication
- **Progression**: View Home page â†’ Navigate to Product/Enterprise/Download pages â†’ Understand licensing model â†’ Access Documentation/Support â†’ Proceed to Login or Download
- **Success criteria**: Clear positioning as downloadable enterprise software, comprehensive product information across pages, obvious path to download/trial, professional enterprise aesthetic

### Marketing Website Pages
1. **Home**: Hero with value proposition, key benefits, deployment model overview, customer logos, CTA to download or login
2. **Product**: Detailed feature list, SOC capabilities, device integrations, system requirements, screenshots
3. **Enterprise**: Enterprise-specific features, scalability, compliance, support tiers, case studies
4. **Download**: Download links for different platforms (Windows/Linux servers), system requirements, installation guides
5. **Licensing**: Licensing models (per-org, per-site, per-device), pricing tiers, license activation process, cloud services included
6. **Documentation**: Link to technical docs, API references, integration guides, admin manuals
7. **Support**: Support channels, knowledge base, community forums, professional services
8. **Login**: Gateway to installed platform (simulates logging into customer's installed instance)

### SOC Command Center (Primary Dashboard)
- **Functionality**: Comprehensive operations center monitoring platform health, security devices, sites, and threats
- **Purpose**: Provide unified view of entire security ecosystem plus the guardivex software platform itself
- **Trigger**: Successful login to installed platform
- **Progression**: View platform health status â†’ Monitor security posture â†’ Review device health â†’ Check license status â†’ Respond to alerts â†’ Review recent activity
- **Success criteria**: Platform system health visible, security metrics displayed, real-time device status, license status indicator, activity feeds for login/API/web traffic, update status shown

### Platform Monitoring
- **Functionality**: Monitor the guardivex software platform itself (server health, database, services, performance)
- **Purpose**: Ensure the security monitoring platform is operating correctly
- **Trigger**: Visible on SOC dashboard and dedicated System Health page
- **Progression**: View CPU/memory/disk metrics â†’ Check service status â†’ Monitor database health â†’ Review update availability â†’ Check license validity
- **Success criteria**: Clear system resource metrics, service status indicators, database connection status, software version and update alerts, uptime tracking

### Sites Management
- **Functionality**: Manage multiple physical locations being monitored
- **Purpose**: Organize security infrastructure by geographic location
- **Trigger**: Navigate to Sites from main menu
- **Progression**: View site list â†’ Filter by status â†’ Select site â†’ View site details â†’ Manage site-specific devices and alerts
- **Success criteria**: Site health scores, device counts per site, alert summaries, geographic metadata, status indicators

### Devices Management
- **Functionality**: Comprehensive inventory of all monitored security hardware
- **Purpose**: Track cameras, NVRs, access control panels, alarm systems, network devices, and sensors
- **Trigger**: Navigate to Devices from main menu
- **Progression**: View device inventory â†’ Filter by type/status/site â†’ Check device health â†’ View device details â†’ Manage device configuration
- **Success criteria**: Device type categorization, online/offline status, firmware versions, last contact timestamps, health metrics, configuration access

### Alerts System
- **Functionality**: Real-time security event notifications from monitored devices
- **Purpose**: Surface security events requiring operator attention
- **Trigger**: Navigate to Alerts from main menu or alert counter badge
- **Progression**: View prioritized alerts â†’ Filter by severity/site/device â†’ Select alert â†’ Investigate â†’ Acknowledge or escalate to incident
- **Success criteria**: Severity-based prioritization, timestamp tracking, device/site context, acknowledge workflow, escalation to incidents

### Incident Management
- **Functionality**: Case tracking and investigation workflow for security events
- **Purpose**: Coordinate response to confirmed security threats
- **Trigger**: Navigate to Incidents from main menu
- **Progression**: View open incidents â†’ Filter by priority/status â†’ Select incident â†’ Review timeline â†’ Update status â†’ Assign to team member â†’ Add investigation notes â†’ Close with resolution
- **Success criteria**: Priority levels, status workflow, assignment capability, timeline view, note taking, resolution tracking

### Integrations
- **Functionality**: Configure connections to third-party security devices and platforms
- **Purpose**: Extend platform capabilities by connecting to various security hardware/software
- **Trigger**: Navigate to Integrations from main menu
- **Progression**: View available integrations â†’ Select integration type â†’ Configure connection â†’ Test connection â†’ Enable integration
- **Success criteria**: List of supported integrations, connection status, configuration forms, test capabilities

### License Status
- **Functionality**: View current license details, activation status, and renewal information
- **Purpose**: Ensure platform remains properly licensed and operational
- **Trigger**: Navigate to License Status from main menu or license warning alert
- **Progression**: View license type â†’ Check device/site limits â†’ Review expiration date â†’ See cloud services status â†’ Contact for renewal if needed
- **Success criteria**: License tier displayed, usage vs limits shown, expiration tracking, cloud service connectivity status, renewal call-to-action

### System Health
- **Functionality**: Detailed monitoring of guardivex platform infrastructure
- **Purpose**: Ensure the monitoring platform itself is healthy and performant
- **Trigger**: Navigate to System Health from main menu
- **Progression**: View server resources â†’ Check service status â†’ Monitor database performance â†’ Review log files â†’ Check for updates â†’ View API health
- **Success criteria**: CPU/memory/disk/network metrics, service uptime indicators, database query performance, log viewer, update checker, API endpoint status

### Users & Roles
- **Functionality**: Manage platform users and permission levels with comprehensive authentication including biometric options
- **Purpose**: Control access to platform features based on organizational roles with modern security practices and passwordless authentication
- **Trigger**: Navigate to Users/Roles from main menu (admin only)
- **Progression**: View user list â†’ Add new user via registration â†’ Configure 2FA â†’ Optionally register biometric authentication (fingerprint/Face ID) â†’ Assign role â†’ Set permissions â†’ Manage sessions
- **Success criteria**: User directory, role-based access control, permission management, two-factor authentication (email/authenticator), biometric authentication support (WebAuthn), SSO integration (SAML/OAuth with Microsoft, Google, GitHub), password reset flow, email verification, biometric credential management per device, session management

### Authentication System
- **Functionality**: Enterprise-grade authentication with multiple security options including biometric authentication and session timeout management
- **Purpose**: Secure platform access with modern authentication methods, enterprise integration, passwordless biometric login, and automatic session management for security compliance
- **Trigger**: Access /login, /register, or /reset-password routes; automatic session monitoring after login
- **Progression**: 
  - Standard Login: Enter credentials â†’ Verify 2FA code â†’ Access dashboard â†’ Session monitored for timeout
  - Biometric Login: Enter email â†’ Authenticate with fingerprint/Face ID â†’ Access dashboard â†’ Session monitored for timeout
  - Biometric Registration: Enter email â†’ Choose biometric type (fingerprint/Face ID) â†’ Register biometric credential â†’ Skip or complete
  - SSO Login: Select provider (Microsoft/Google/GitHub/SAML) â†’ Authenticate via provider â†’ Access dashboard â†’ Session monitored for timeout
  - Registration: Fill form â†’ Verify password strength â†’ Agree to terms â†’ Email verification â†’ Login
  - Password Reset: Request reset â†’ Verify email code â†’ Set new password â†’ Login
  - Session Timeout: User inactive for 25 minutes â†’ Warning dialog appears with 5-minute countdown â†’ User extends session or auto-logout occurs
- **Success criteria**: Secure credential-based login, optional 2FA with 6-digit codes (email or authenticator app), passwordless biometric authentication using WebAuthn (fingerprint/Face ID), enterprise SSO via SAML and OAuth providers, user registration with validation, password reset with email verification, session persistence, biometric credential management, device-specific biometric storage, theme switcher on auth pages, automatic session timeout warning at 25 minutes, auto-logout at 30 minutes of inactivity, session extension on user activity or manual extension

### Settings & Configuration
- **Functionality**: Configure platform preferences, notifications, system parameters, and theme preferences
- **Purpose**: Customize platform behavior, operational preferences, and visual appearance
- **Trigger**: Navigate to Settings from main menu or use theme switcher in command bar
- **Progression**: Select settings category â†’ Modify configuration â†’ Choose theme preference (Light/Dark/System) â†’ Save changes â†’ Apply system-wide
- **Success criteria**: Organized settings sections, validation on inputs, clear descriptions, immediate or staged application of changes, theme preference persisted across sessions with system preference detection

## Edge Case Handling

- **License Expired**: Show prominent banner on all pages, limit functionality to read-only mode, provide clear renewal instructions
- **Server Resource Critical**: Display warning banner when CPU/memory/disk exceeds thresholds, suggest optimization actions
- **Database Connection Lost**: Show global error state, attempt automatic reconnection, provide troubleshooting steps
- **No Devices Configured**: Show helpful onboarding wizard to add first integration and devices
- **Update Available**: Show non-intrusive notification with update details, release notes, and installation instructions
- **Cloud Services Disconnected**: Indicate local-only mode, explain reduced functionality (no remote access, manual updates required)
- **Unknown Device Detected**: Automatically create alert, provide workflow to identify and authorize or block device
- **Offline > 24hrs**: Escalate device status visually, create automatic incident, suggest investigation actions
- **Login Activity Spike**: Flag unusual authentication patterns, provide security audit log, option to force logout all sessions
- **API Rate Limit**: Show warning when approaching limits, provide usage analytics, suggest load distribution
- **Biometric Not Supported**: Gracefully fallback to password authentication, explain device requirements for biometric support
- **Biometric Registration Failed**: Provide clear error messages, suggest troubleshooting steps, allow retry or skip
- **Biometric Authentication Failed**: Allow fallback to password/2FA, track failed attempts, suggest re-registration if persistent failures
- **Session Timeout Warning Ignored**: Auto-logout after countdown completes, redirect to login with session expiration message
- **Session Extended Multiple Times**: Allow unlimited extensions as long as user is actively engaging with the warning dialog
- **Logout During Active Session**: Clear session immediately, show confirmation toast, redirect to homepage

## Design Direction

The design should evoke enterprise software sophistication with a dark, professional aesthetic reminiscent of Genetec Security Center, Splunk, CrowdStrike Falcon, and VMware vCenter. The public website should feel polished and corporate, while the platform interface should balance high-information density with clarity, using tactical UI elements and precise data visualization for 24/7 SOC operations.

## Color Selection

Dark enterprise theme with high-contrast tactical elements, clear status indicators, and a complementary light theme for daytime use.

**Dark Theme (Default):**
- **Primary Color**: Deep cyan (oklch(0.75 0.18 195)) - Represents security monitoring technology, used for primary CTAs and interactive elements
- **Secondary Colors**: 
  - Dark slate backgrounds (oklch(0.10 0.015 250) base, oklch(0.15 0.015 250) elevated surfaces)
  - Medium slate (oklch(0.50 0.010 250)) - Secondary text and borders
- **Accent Color**: Electric cyan (oklch(0.70 0.22 195)) - Focus states, active navigation, critical interactive elements
- **Status Colors**:
  - Critical: Red (oklch(0.58 0.24 25)) - Critical alerts, offline devices, system errors
  - Warning: Amber (oklch(0.72 0.18 70)) - Warnings, degraded states, approaching limits
  - Success: Green (oklch(0.68 0.20 145)) - Operational status, successful actions
  - Info: Blue (oklch(0.72 0.15 210)) - Informational notices, neutral states

**Light Theme:**
- **Primary Color**: Muted cyan (oklch(0.55 0.18 195)) - Professional daytime appearance for primary actions
- **Secondary Colors**: 
  - Light backgrounds (oklch(0.98 0.005 250) base, oklch(1 0 0) elevated surfaces)
  - Mid-tone slate (oklch(0.45 0.010 250)) - Secondary text
- **Accent Color**: Vibrant cyan (oklch(0.55 0.22 195)) - Clear focus states and active elements
- **Status Colors**: Consistent with dark theme for familiarity

**Theme Switcher:**
- Icon-based dropdown in command bar and website navigation
- Three options: Light, Dark, System (follows OS preference)
- Theme preference persisted in browser storage
- Automatic system preference detection on initial load
- Smooth transitions between themes

**Foreground/Background Pairings**:
  - Dark Background (oklch(0.10 0.015 250)): Light text (oklch(0.95 0.005 250)) - Ratio 12.8:1 âœ“
  - Dark Card Surface (oklch(0.15 0.015 250)): Primary text (oklch(0.95 0.005 250)) - Ratio 10.2:1 âœ“
  - Light Background (oklch(0.98 0.005 250)): Dark text (oklch(0.15 0.015 250)) - Ratio 11.5:1 âœ“
  - Light Card Surface (oklch(1 0 0)): Primary text (oklch(0.15 0.015 250)) - Ratio 13.2:1 âœ“
  - Primary Cyan Dark (oklch(0.75 0.18 195)): Dark text (oklch(0.10 0.015 250)) - Ratio 7.8:1 âœ“
  - Primary Cyan Light (oklch(0.55 0.18 195)): Light text (oklch(0.98 0.005 250)) - Ratio 6.2:1 âœ“
  - Success Green (oklch(0.68 0.20 145)): White text (oklch(0.98 0 0)) - Ratio 5.1:1 âœ“

## Font Selection

Typography should convey enterprise-grade reliability and technical precision, optimized for information-dense interfaces and extended viewing sessions.

- **Typographic Hierarchy**:
  - H1 (Marketing Headlines): Space Grotesk Bold / 48px / -0.02em tracking / 1.1 line-height
  - H2 (Page Titles): Space Grotesk Semibold / 32px / -0.01em tracking / 1.2 line-height
  - H3 (Section Headers): Space Grotesk Medium / 24px / 0 tracking / 1.3 line-height
  - H4 (Card Titles): Space Grotesk Medium / 18px / 0 tracking / 1.4 line-height
  - Body (Primary): Inter Regular / 15px / 0 tracking / 1.6 line-height
  - Body Small: Inter Regular / 13px / 0 tracking / 1.5 line-height
  - Labels: Inter Medium / 12px / 0.02em tracking / 1.3 line-height / uppercase
  - Data/Tables: JetBrains Mono Regular / 14px / 0 tracking / 1.5 line-height
  - Metrics (Large): Space Grotesk Bold / 40px / -0.02em tracking / 1.0 line-height

## Animations

Animations should feel precise and responsive, reinforcing the enterprise-grade nature of the platform with subtle, purposeful motion.

- Page transitions: 250ms ease-out for navigation between major views
- Card hover states: 120ms scale(1.02) with subtle shadow increase
- Alert appearances: 300ms slide-in from top with fade
- Table row interactions: 150ms background color transition on hover
- Status indicator changes: 200ms color transition with subtle pulse for critical states
- Modal overlays: 200ms fade-in with backdrop blur effect
- Loading states: Shimmer skeleton screens (1.2s cycle) rather than spinners
- Chart data updates: 400ms ease-in-out for smooth data transitions
- Button interactions: 100ms press feedback with scale(0.98)
- Toast notifications: 250ms slide-in from corner, 5s display, 200ms fade-out

## Component Selection

- **Components**:
  - Button: Shadcn Button with primary (cyan), secondary (slate), destructive (red) variants, sized appropriately for enterprise UI
  - Card: Shadcn Card for content sections, metric displays, device panels with dark slate backgrounds
  - Table: Shadcn Table for device lists, logs, user management with sortable columns and row actions
  - Badge: Shadcn Badge for status pills (online/offline/critical) with appropriate color coding
  - Dialog: Shadcn Dialog for configuration modals, device details, incident management
  - Select: Shadcn Select for filters, site selection, dropdown navigation
  - Input: Shadcn Input with dark theme for search, forms, configuration fields
  - Alert: Shadcn Alert for system notifications, warnings, license expiration notices
  - Tabs: Shadcn Tabs for multi-view sections (Settings categories, System Health panels)
  - Progress: Shadcn Progress for security scores, resource utilization, license usage
  - Tooltip: Shadcn Tooltip for icon explanations and contextual help
  - Avatar: Shadcn Avatar for user profiles in header
  - Separator: Shadcn Separator for visual hierarchy
  - Switch: Shadcn Switch for feature toggles in settings
  - Textarea: Shadcn Textarea for incident notes, configuration inputs

- **Customizations**:
  - Top command bar with global search, site selector, notification bell, user menu
  - Sidebar navigation with collapsible sections and icon badges for alert counts
  - Status pill component combining badge with pulsing dot indicator
  - Metric cards with gradient borders and hover glow effects
  - Live activity timeline with auto-scrolling event feed
  - System health gauges with arc progress indicators
  - License status widget with expiration countdown

- **States**:
  - Buttons: Glow effect on hover, deeper shadow on active, cyan focus ring
  - Tables: Row highlight on hover, checkbox selection, expandable detail rows
  - Navigation: Left border accent on active page, background on hover
  - Alerts: Intensity increase on hover, slide animation on dismiss
  - Inputs: Cyan border on focus, error state with red border and helper text
  - Cards: Subtle elevation on hover, border glow for interactive cards

- **Icon Selection** (using @phosphor-icons/react):
  - Shield, ShieldCheck, ShieldWarning: Security status and scores
  - Buildings, MapPin: Sites and locations
  - Monitor, Camera, Lock, Siren: Device types
  - Bell, Warning, WarningCircle: Alerts and notifications
  - Database, Server, HardDrive: System infrastructure
  - ChartLine, Activity: Analytics and monitoring
  - Key, Certificate: Licensing
  - Fingerprint, FingerprintSimple, FaceMask: Biometric authentication
  - Users, UserGear: User management
  - Gear, Sliders: Settings and configuration
  - CloudArrowDown, CloudSlash: Cloud connectivity status
  - ArrowsClockwise, CheckCircle, XCircle: Status indicators

- **Spacing**:
  - Page container: px-8 py-6 for main content areas
  - Card padding: p-6 for standard cards, p-4 for compact metric cards
  - Section gaps: gap-6 between major sections, gap-4 for related content
  - Grid layouts: gap-6 for primary content grids, gap-4 for metric grids
  - Table cells: px-4 py-3 for comfortable data viewing
  - Command bar: h-16 with px-6 for global navigation elements
  - Sidebar: w-64 expanded, w-16 collapsed, px-4 py-2 for nav items

- **Mobile**:
  - Marketing website fully responsive with hamburger menu navigation
  - Platform interface optimized for desktop/tablet (minimum 1024px recommended)
  - Mobile view provides essential monitoring with stacked layout
  - Tables convert to card-based lists on smaller screens
  - Sidebar converts to bottom navigation bar on mobile
  - Command bar condensed with hamburger menu for secondary features
  - Touch targets minimum 44px for mobile interactions

