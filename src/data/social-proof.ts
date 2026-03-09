export interface Reference {
  name: string;
  title: string;
  category: 'ai' | 'sales' | 'ai+sales';
  categoryLabel: string;
  quote: string;
  photo?: string;
}

/**
 * All LinkedIn references, categorised.
 * Source of truth: PRD.md "Social Proof — LinkedIn References"
 */
export const allReferences: Reference[] = [
  // === AI Category ===
  {
    name: 'Anastasia Fischer',
    title: 'Strategic Growth Leader | Nonprofit & Climate Innovation',
    category: 'ai',
    categoryLabel: 'AI',
    photo: '/images/Anastasia Fischer.webp',
    quote: 'Gary is a great communicator and a very nice guy who really knows AI agents and agentic systems. I learned a lot from him, and really enjoyed the clarity of his approach. I highly recommend working with him!',
  },
  {
    name: 'Julie Lee',
    title: 'Group HR Director | Former Fractional CHRO',
    category: 'ai',
    categoryLabel: 'AI Training',
    photo: '/images/Julie Lee.webp',
    quote: "I invited Gary to give a talk about how to utilise AI to enhance our sales team productivity during a town hall meeting. It was eye-opening and educational and the session had helped people see the possibility of AI adoption beyond just an alternative to google and drafting/writing. I highly recommend Gary to anyone who is looking to expand the use of AI in their organisations.",
  },
  {
    name: 'Alexandros Lioumbis',
    title: 'Future of Work/IP/AI/Innovations | Founder & Patent Attorney',
    category: 'ai',
    categoryLabel: 'Agentic AI Advisor',
    photo: '/images/Alexandros.webp',
    quote: "There are people who use AI, there are people who understand AI, there are people who use Agents and understand Agentic AI. And then, there\u00B4s Gary. Gary\u00B4s AI expertise in business automation allows him to transform, integrate and redefine processes with the use of Agents and Agentic AI systems, while having the ability to explain, teach and communicate the concepts effortlessly to the broader business world. Gary is \"the\" go-to guy for Agentic AI. Hands down.",
  },
  // === AI + Sales (bridges both) ===
  {
    name: 'Dave Mommen',
    title: 'Managing Partner @ GenerativeLeads AI',
    category: 'ai+sales',
    categoryLabel: 'Fractional CEO at an AI First Company',
    photo: '/images/Dave Mommen.webp',
    quote: "I worked with Gary at GenerativeLeads.ai and I have experienced first-hand how he blends sales leadership with deep expertise in AI. Having built and led sales organizations across APAC myself, I can say Gary brings a rare ability to connect strategy with execution. He helped shape our product direction and pushed us to operate at a higher standard. His wide global network not only allowed us to sell more, and faster, but also helped us to validate our strategy and ideas for the business. What I value most is that he\u2019s a genuine partner\u2014focused on results, but always bringing people along in the process.",
  },
  // === Sales Category ===
  {
    name: 'Danny Tan',
    title: 'Director Asia Pacific @ Ace Pacific Group',
    category: 'sales',
    categoryLabel: 'Sales Partnership',
    photo: '/images/Danny Tan.webp',
    quote: "I have partnered with Gary across three companies over the past 10 years, and every organization he leaves feels his absence because he always makes a huge impact. Working with Gary has been nothing but fantastic. As partners, we go all out to work, win, and deliver the best solutions for clients. Gary is meticulous and patient when needed, and precise when it comes to orchestrating deals. His ability to bring people together, keep the focus on outcomes, and build trust across teams and customers makes him stand out as a leader and a partner. He\u2019s simply a great guy to have on your side.",
  },
  {
    name: 'Frank Wiener',
    title: 'CMO and Director of Product Marketing (retired)',
    category: 'sales',
    categoryLabel: 'Sales Leadership',
    photo: '/images/Frank Weiner.webp',
    quote: "I\u2019ve had the pleasure of working with Gary at two different companies. I originally hired him into Cyan when we were launching our international expansion. He joined as an SE and subsequently went on to head up pre-sales for Cyan\u2019s APAC region, then he successfully transitioned from pre-sales to sales and sales leadership as the RSM for SE Asia. With Wedge Networks, as VP of Sales for APAC, Gary has demonstrated remarkable skill and resilience at introducing a small but innovative start-up into major accounts, competing against well-established Tier 1 incumbents. His strong work ethic, personal networking, and technical prowess have enabled him to enter new markets with minimal support to land key accounts.",
  },
  {
    name: 'Evan Davidson',
    title: 'VP of Sales APAC @ Cylance',
    category: 'sales',
    categoryLabel: 'Head of Sales, SE Asia',
    photo: '/images/Evan Davidson.webp',
    quote: "Gary led our MSSP and enterprise sales efforts at Cylance across SE Asia and Greater China, reporting to me. This region is challenging in its diversity and reach which Gary inherited but quickly brought structure, a strong work ethic to help start moving the business forward. He understands complex enterprise selling & partner management which is important in this region as you scale a product like Cylance. He operated in a confident and professional way hitting his objectives for the region requiring little management over sight. If you need someone who can own a region and drive results, Gary is a very strong consideration for any sales leader looking for a results driven individual.",
  },
];

/**
 * Homepage carousel — curated narrative arc:
 * Sales Leadership → AI+Sales → Pure AI
 */
export const homepageQuotes: Reference[] = [
  allReferences.find(r => r.name === 'Evan Davidson')!,
  allReferences.find(r => r.name === 'Dave Mommen')!,
  allReferences.find(r => r.name === 'Alexandros Lioumbis')!,
];

/** Filter references by category for service pages */
export function getByCategory(cat: Reference['category']): Reference[] {
  return allReferences.filter(r => r.category === cat || r.category === 'ai+sales');
}
