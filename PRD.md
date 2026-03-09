# Consultates.com — Copy & Routes

**Purpose:** Gary's approved copy and route definitions for consultates.com.
**Design decisions live elsewhere:** See `website-design-v3.html` in the brand-guidelines repo.

---

## Routes

| Route | Page | `<title>` | `<meta name="description">` |
|-------|------|-----------|------------------------------|
| `/` | Homepage | Consultates — AI Consulting for Business Leaders | Clarity on AI for leaders, teams, and companies. One-to-one coaching, hands-on training, and fractional executive support from someone who builds with AI every day. |
| `/services/ai-advisory-for-leaders` | AI Advisory | AI Coaching for Leaders — Consultates | One-to-one AI coaching sessions for business leaders. You bring your situation, you leave with a plan you can act on. |
| `/services/ai-training-for-teams` | AI Training | AI Training for Teams — Consultates | Hands-on AI workshops built around your team's actual work. Design thinking approach — people learn by doing. |
| `/services/fractional-exec-support` | Fractional Exec | Fractional Executive Support — Consultates | Senior AI go-to-market leadership without a full-time hire. Strategy, product direction, and execution. |
| `/about` | About | About Gary Tate — Consultates | Engineer. Commercial leader. AI practitioner. 35 years across military electronics, enterprise sales, and production AI — now helping leaders make sense of it. |
| `/blog` | Blog index | Blog — Consultates | Articles on AI adoption, AI safety, and practical guidance for business leaders. |
| `/blog/[slug]` | Blog post | [post.title] — Consultates Blog | [post.excerpt] |
| `/contact` | Contact | Contact — Consultates | Get in touch with Gary Tate. Book a free call, send a message, or connect on LinkedIn. |
| `/privacy-policy` | Privacy Policy | Privacy Policy — Consultates | How Consultates Limited collects, uses, and protects your personal data. |
| `/404` | Not Found | Page Not Found — Consultates | — |

## Navigation

```
[Consultates Logo]  Home  Services▼  About  Blog  Contact  [Book a Free Call]
                          ├─ AI Advisory for Leaders (UserFocus icon)
                          ├─ AI Training for Teams (UsersThree icon)
                          └─ Fractional Exec Support (Briefcase icon)
```

Mobile: hamburger → full-screen overlay, services sub-items inline.

---

## Integrations

| Integration | Detail |
|-------------|--------|
| TidyCal URL | `https://tidycal.com/garyctate/15-minute-meeting` |
| Contact form backend | Google Apps Script → email to `gary@consultates.com` + Google Sheet log |
| reCAPTCHA | v3, site key in contact.astro |
| Google Analytics | `G-K8K16L2VET` (deferred) |
| Email | `gary@consultates.com` |
| LinkedIn | `https://www.linkedin.com/company/consultates-limited/` |
| Site URL | `https://consultates.com` |

## Blog Content Collection

```ts
schema: z.object({
  title: z.string(),
  date: z.date(),
  author: z.string().default('Gary Tate'),
  excerpt: z.string().max(200).optional(),
  draft: z.boolean().default(false),
})
```

---

## Page Copy

### Homepage

**Hero**
- Headline: `Clarity on AI — what to do, where to start, and who to trust`
- Paragraph: `You're a leader who knows AI matters but can't separate the signal from the noise. You don't need more articles or another webinar. You need someone who builds with AI every day to sit down with you and make it practical.`
- CTA: `Book a Free Call`

**Trust Bar**
- `Guest lecturer, Lead with AI PRO · 35 years across engineering, sales & AI · Trained executive cohorts through FlexOS · 16 countries`

**Negative Stakes**
- Stat 1: `84%` — `of the world hasn't used AI at all. Most leaders are still at zero.`
- Stat 2: `12–18 months` — `Until white collar computer tasks are fully automated, according to the CEO of Microsoft AI. The window to get ahead of this is closing.`
- Source: `Source: DataReportal Digital 2026 · Mustafa Suleiman, Everyday AI Podcast, Feb 2026`

**Your Offering**
- Heading: `Three ways we help`
- Paragraph: `Whether you're a leader who needs clarity, a team that needs skills, or a company that needs senior AI leadership — we work with you directly. No templates. No generic workshops. Everything is built around your situation.`
- Card 1: `AI Coaching for Leaders` — `One-to-one sessions for leaders who need clarity on AI. You bring your situation — you leave with a plan you can act on.` — CTA: `Learn more`
- Card 2: `AI Training for Teams` — `Hands-on workshops built around your team's actual work. People learn by doing with the tools they'll use tomorrow.` — CTA: `Learn more`
- Card 3: `Fractional Exec Support` — `Senior AI go-to-market leadership without a full-time hire. Strategy, product direction, and execution for companies scaling AI.` — CTA: `Learn more`

**Use Cases**

Block 1:
- Context: `A managing partner at an AI startup needed to connect sales strategy with product direction. Gary reshaped their GTM approach, brought his global network to bear, and raised the standard across the company.`
- Quote: `"He helped shape our product direction and pushed us to operate at a higher standard. His wide global network not only allowed us to sell more, and faster, but also helped us to validate our strategy and ideas for the business. What I value most is that he's a genuine partner — focused on results, but always bringing people along in the process."`
- Attribution: `— Managing Partner, GenerativeLeads AI`

Block 2:
- Context: `A director partnered with Gary across three companies over 10 years — every engagement involving complex deals, cross-functional teams, and customers who needed trust.`
- Quote: `"His ability to bring people together, keep the focus on outcomes, and build trust across teams and customers makes him stand out as a leader and a partner. He's simply a great guy to have on your side."`
- Attribution: `— Director Asia Pacific, Ace Pacific Group`

**How It Works**
- Step 1: `We talk` — `Tell me where you are and what you're trying to figure out. No preparation needed.`
- Step 2: `You get a plan` — `Specific to your business, your team, and your goals. Not a template.`
- Step 3: `We do the work together` — `Coaching, training, or hands-on leadership. One accountable team, start to finish.`
- CTA: `Book a Free Call`

**Social Proof — LinkedIn References**

*Category: AI*

Reference 1:
- Name: `Anastasia Fischer`
- Title: `Strategic Growth Leader | Nonprofit & Climate Innovation | Partnerships · Digital & Business Strategy · Marketing & Communications`
- Relationship: Client
- Quote: `"Gary is a great communicator and a very nice guy who really knows AI agents and agentic systems. I learned a lot from him, and really enjoyed the clarity of his approach. I highly recommend working with him!"`

Reference 2:
- Name: `Julie Lee (李以琼), IHRP SP, MHCL`
- Title: `Group HR Director | Former Fractional CHRO | HR Advisor`
- Relationship: Client
- Quote: `"I invited Gary to give a talk about how to utilise AI to enhance our sales team productivity during a town hall meeting. It was eye-opening and educational and the session had helped people see the possibility of AI adoption beyond just an alternative to google and drafting/writing. I highly recommend Gary to anyone who is looking to expand the use of AI in their organisations."`

Reference 3:
- Name: `Alexandros Lioumbis`
- Title: `Future of Work/IP/AI/Innovations | Founder | Patent Manager | European Patent Attorney`
- Relationship: Client
- Quote: `"There are people who use AI, there are people who understand AI, there are people who use Agents and understand Agentic AI. And then, there´s Gary. Gary´s AI expertise in business automation allows him to transform, integrate and redefine processes with the use of Agents and Agentic AI systems, while having the ability to explain, teach and communicate the concepts effortlessly to the broader business world. Gary is "the" go-to guy for Agentic AI. Hands down."`

Reference 4 (AI + Sales):
- Name: `Dave Mommen`
- Title: `Managing Partner @ GenerativeLeads AI`
- Relationship: Colleague
- Quote: `"I worked with Gary at GenerativeLeads.ai and I have experienced first-hand how he blends sales leadership with deep expertise in AI. Having built and led sales organizations across APAC myself, I can say Gary brings a rare ability to connect strategy with execution. He helped shape our product direction and pushed us to operate at a higher standard. His wide global network not only allowed us to sell more, and faster, but also helped us to validate our strategy and ideas for the business. What I value most is that he's a genuine partner—focused on results, but always bringing people along in the process."`

*Category: Sales*

Reference 5:
- Name: `Danny Tan`
- Title: `Director Asia Pacific @ Ace Pacific Group`
- Relationship: Partner
- Quote: `"I have partnered with Gary across three companies over the past 10 years, and every organization he leaves feels his absence because he always makes a huge impact. Working with Gary has been nothing but fantastic. As partners, we go all out to work, win, and deliver the best solutions for clients. Gary is meticulous and patient when needed, and precise when it comes to orchestrating deals. His ability to bring people together, keep the focus on outcomes, and build trust across teams and customers makes him stand out as a leader and a partner. He's simply a great guy to have on your side."`

Reference 6:
- Name: `Frank Wiener`
- Title: `CMO and Director of Product Marketing (retired)`
- Relationship: Manager (hired Gary at Cyan)
- Quote: `"I've had the pleasure of working with Gary at two different companies. I originally hired him into Cyan when we were launching our international expansion. He joined as an SE and subsequently went on to head up pre-sales for Cyan's APAC region, then he successfully transitioned from pre-sales to sales and sales leadership as the RSM for SE Asia. With Wedge Networks, as VP of Sales for APAC, Gary has demonstrated remarkable skill and resilience at introducing a small but innovative start-up into major accounts, competing against well-established Tier 1 incumbents. His strong work ethic, personal networking, and technical prowess have enabled him to enter new markets with minimal support to land key accounts."`

Reference 7:
- Name: `Evan Davidson`
- Title: `Former Cylance (managed Gary directly)`
- Relationship: Manager
- Quote: `"Gary led our MSSP and enterprise sales efforts at Cylance across SE Asia and Greater China, reporting to me. This region is challenging in its diversity and reach which Gary inherited but quickly brought structure, a strong work ethic to help start moving the business forward. He understands complex enterprise selling & partner management which is important in this region as you scale a product like Cylance. He operated in a confident and professional way hitting his objectives for the region requiring little management over sight. If you need someone who can own a region and drive results, Gary is a very strong consideration for any sales leader looking for a results driven individual."`

**Why Consultates?**
- Column 1: `20 years building technology` — `Military electronics and cryptography in the Royal Air Force. Telecoms and internet infrastructure. 8 years at Juniper Networks in Silicon Valley. 5 years leading systems engineering at Cyan. He built the systems AI runs on.`
- Column 2: `15 years selling it` — `Systems engineer to VP Sales to CRO. Cybersecurity, AI, SaaS, enterprise networking. Built sales organisations from zero across 16 countries. Sat across from C-suite buyers in enterprise procurement cycles for over a decade.`
- Column 3: `Now builds with AI agents daily` — `Ships production applications with Claude Code, Codex, and Gemini CLI. Designs agentic workflows. Trains executive cohorts through FlexOS. Guest lecturer and monthly briefing host for Lead with AI PRO. The training works because he built the thing he's teaching.`

**Stakes CTA**
- Headline: `84% of people haven't started. The 0.04% who build with AI agents aren't waiting for you to catch up.`
- CTA: `Book a Free Call`

**Transitional CTAs**
- Card 1: `You're Not the Only One Stuck` — `If AI feels like something for tech people, you're not alone. Start here.` — CTA: `Read` → `/blog/youre-not-the-only-one-stuck`
- Card 2: `How Safe Is AI Really?` — `What you need to know before you start using AI in your business.` — CTA: `Read` → `/blog/how-safe-is-ai-really`

**Footer**
- Column 1: `Consultates Limited`
- Column 2 links: Home, Services, About, Blog, Contact, Privacy Policy
- Column 3: `gary@consultates.com` + LinkedIn
- Bottom: `Global and Remote — Connecting where you are`
- Quote: `"Artificial intelligence is not a substitute for human intelligence; it is a tool to amplify human creativity and ingenuity."`
- Copyright: `© 2026 Consultates Limited`

---

### AI Advisory for Leaders (`/services/ai-advisory-for-leaders`)

- Hero headline: `AI Coaching for Leaders`
- Hero subline: `One-to-one sessions. You bring your real situation — you leave with a plan you can act on.`
- What You Get (para 1): `Gary has sat across from C-suite executives for 15 years. He knows how to talk to leaders because he's been one and he's sold to them. The coaching isn't theoretical — it comes from someone who builds with AI every day and has done engineering, sales, and leadership across 35 years.`
- What You Get (para 2): `Each session starts with where you are right now. What you're trying to figure out. What's keeping you up at night about AI. There's no fixed curriculum — the agenda is your situation. You leave with specific next steps, not general advice.`
- Who It's For: `Business leaders, founders, fractional executives, solopreneurs, consultants — anyone who needs clarity on AI without the jargon. You don't need to be technical. You just need to be ready to start.`
- CTA: `Book a Free Call`

---

### AI Training for Teams (`/services/ai-training-for-teams`)

- Hero headline: `AI Training for Teams`
- Hero subline: `Hands-on workshops built around your team's actual work. Design thinking approach — people learn by doing.`
- What You Get (para 1): `The curriculum comes from building production systems, not reading about them. Gary's trained 30–50 person cohorts through FlexOS. He tracks behavioural change and daily tool usage, not completion certificates.`
- What You Get (para 2): `Every workshop is built around your team's real work — the tools they'll use tomorrow, the problems they're dealing with today. People learn by doing, not by watching slides. By the end, your team has practiced with AI on their actual tasks, not hypothetical examples.`
- Who It's For: `Teams told to "use AI" but given no guidance. Sales teams, marketing teams, operations teams — anyone doing knowledge work. Works for groups of 5 to 50.`
- CTA: `Book a Free Call`

---

### Fractional Executive Support (`/services/fractional-exec-support`)

- Hero headline: `Fractional Executive Support`
- Hero subline: `Senior AI go-to-market leadership without a full-time hire.`
- What You Get (para 1): `Gary has been a CRO, VP Sales (×3), MD, and co-founder. He's built entire sales organisations from zero across APAC, Europe, and the US. He brings strategy, product direction, and execution for companies scaling AI initiatives or entering new markets.`
- What You Get (para 2): `This isn't advisory from a distance. It's hands-on leadership — building your GTM motion, shaping product direction, coaching your team, and opening doors through a global network built over 16 countries and 15 years.`
- Who It's For: `Startups and scale-ups that need experienced GTM leadership for AI products but aren't ready for (or don't need) a full-time exec hire. Companies entering new markets, launching AI products, or building their first sales organisation.`
- CTA: `Book a Free Call`

---

### About (`/about`)

- Hero headline: `Engineer. Commercial leader. AI practitioner.`
- Hero subline: `35 years across military electronics, enterprise sales leadership, and production AI.`
- The through-line (para 1): `Gary started coding at 10. He joined the Royal Air Force and spent a decade in military electronics, telecoms, cryptography, and secure communications — physical systems where mistakes aren't theoretical.`
- The through-line (para 2): `Then another decade building telecoms and internet infrastructure. His own company first, then 8 years as a Senior Systems Engineer at Juniper Networks in Silicon Valley. Later, 5 years as Director of Systems Engineering at Cyan.`
- The through-line (para 3): `He moved from engineering into sales — not because he stopped being technical, but because he could sit in front of a CRO and explain the technology in terms that closed deals. Systems engineer → Director → MD Sales → VP Sales (three times) → CRO. Always deep-tech companies — cybersecurity, AI, enterprise SaaS, networking infrastructure. 16 countries. He built entire sales organisations from zero.`
- The through-line (para 4): `Today, Gary ships production applications with AI agents. He designs agentic workflows with real API integrations. He builds alone what would have taken a small team two years ago.`
- The through-line (para 5): `Most AI consultants fall into one camp: technical people who can't explain it to a boardroom, business people who've never built anything, or trainers teaching from slides they didn't write. Gary does all three. That's why the consulting, the training, and the leadership all carry weight.`
- A family business: `Consultates is Gary and Trinh Tate. They don't scale through volume. They scale through trust. You get one accountable team from start to finish — not a rotating cast of consultants.`
- Lead with AI PRO: `Gary is a guest lecturer and hosts monthly agentic briefings through Lead with AI PRO — a platform with 3× weekly analyst briefings, tutorials, and an active WhatsApp community. His sessions feature live demos of OpenClaw (his own agentic framework) and synthesise what the leading voices in AI — Karpathy, Amodei, Suleiman, Roose — are saying, translated for non-technical leaders.`
- CTA: `Book a Free Call`

---

### Contact (`/contact`)

- Heading: `Let's talk`
- Paragraph: `Whether you have a specific challenge or just want to explore how AI fits into your business — I'd like to hear from you. Book a call, send a message, or connect on LinkedIn.`
- Form fields: Name, Email, Company, Message
- Submit: `Send Message`
- Submitting: `Sending...`
- Success: `Thanks for your message. I'll get back to you within 24 hours.`
- Error: `Something went wrong. Please try again or email gary@consultates.com directly.`

---

### Privacy Policy (`/privacy-policy`)

- Title: `Privacy Policy`
- Last updated: `April 1st, 2024`
- Company: `Consultates Limited`
- Address: `Unit 1603, 16th Floor, The L. Plaza, 367–375 Queen's Road Central, Sheung Wan, Hong Kong`
- Email: `gary@consultates.com`
- Compliance: Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong, GDPR, CCPA
- Data collected: name, email address, company name, phone number, form submissions, IP address, browser type, pages visited, device information, approximate location, form responses, timestamps, referral sources
- Uses: Provide and improve services, respond to inquiries and booking requests, marketing communications (with opt-out), analytics and site improvement, legal compliance
- `We do not sell your personal data.`
- Cookies: Essential (required for site functionality), Analytics (Google Analytics, anonymised)
- Third-party services: Google Analytics, TidyCal
- Retention: `We retain personal data only as long as necessary. You may request deletion at any time.`
- Rights: Access, correct, delete, withdraw consent, file complaint with PCPD
- Children: `Our services are not directed at individuals under 18.`
- Security: `We protect your data through HTTPS encryption, access controls, and data minimisation practices.`

---

### 404

- Heading: `Page not found`
- Paragraph: `The page you're looking for doesn't exist or has been moved.`
- CTA: `Back to Home` → `/`
