---
title: "AI Agents Can Send Emails, Access Your Data, and Make Decisions. Are You Sure That's Safe?"
date: 2026-03-17
author: "Gary Tate"
excerpt: "When AI was just a chatbot, safety meant being careful what you typed. Now that agents can act on your behalf, the question of trust is completely different."
image: "/images/blog/how-safe-are-ai-agents.png"
draft: false
category: "ai-safety"
tags: ["security", "agents", "trust"]
---

About a year ago I wrote about [AI safety from the perspective of a cautious user](/blog/how-safe-is-ai-really). Don't paste sensitive data. Cross-check the facts. Stick to reputable platforms. All still true, but the world has moved on, and so have the risks.

Because here's the thing. When AI was just a chatbot, the worst that could happen was you got a bad answer. Maybe it hallucinated a fact and you used it in a presentation. Embarrassing, but survivable.

Now? Agents can browse the web, send emails, update your CRM, execute code, access databases, and chain all of that together autonomously. The question isn't just "what did I type into the box?" anymore. It's "what did I give this thing permission to do, and what happens when it gets something wrong?"

That's a fundamentally different conversation.

## Everything I Said Last Year Still Applies. Plus More.

Hallucinations, data leakage, bias. None of that went away. Agents just made the consequences bigger.

**A chatbot that hallucinates gives you bad text.** You read it, catch the mistake, fix it. Annoying. An agent that hallucinates? It might send that bad text to your client. Or update your database with wrong data. Or kick off a whole workflow based on a misunderstanding. The blast radius is completely different.

**Tool access means real-world consequences.** When you give an agent access to your email, your calendar, your business systems, you're extending trust. If it misinterprets an instruction, or if someone manipulates its inputs, it's acting with your credentials. That's not a hypothetical. That's the design.

**Prompt injection is a real and growing threat.** This one's technical but important. Bad actors can embed hidden instructions in documents, emails, and web pages. Your agent reads a compromised page, picks up a hidden instruction, and suddenly it's doing something you never asked for. This is one of the most active security research areas right now, and there's no silver bullet yet.

**Data flows across boundaries.** When an agent connects your email to your CRM to your documents to your project management tool, data moves between systems that used to be separate. The question isn't just "is this platform secure?" It's "is the entire chain secure?" One weak link compromises everything downstream.

## How I Think About Agent Safety

I use agents every day. I'm not anti-agent. I'm pro doing it properly. Here's how I approach it:

**Least privilege, always.** Give the agent access to only what it needs for the specific task. If it's drafting emails, it doesn't need access to your financial data. If it's updating your CRM, it doesn't need to send emails. Every permission is attack surface. Keep it tight.

**Human-in-the-loop for anything external.** For anything that touches clients, money, or sensitive data, build in a review step. The best agent workflows I've seen have a "check before send" gate for anything going outside the organisation. Speed matters, but not more than trust.

**Test before you trust.** Run your agent workflow ten times with test data before you let it touch real operations. Watch where it makes mistakes. The failure modes of agents are subtle. They don't crash. They just do the wrong thing confidently. You need to see that before it's live.

**Know what your agent can see.** When an agent reads a document or browses a web page, it processes everything on that page, including things you might not notice. Be deliberate about what you point it at, especially external content you don't control.

**Understand your platform's data handling.** Where do your prompts go? Are they stored? Are they used for training? Can employees at the platform see them? The answers vary wildly between providers and between pricing tiers. If you don't know, find out.

## The Regulation Gap

I'll be straight with you. Regulation is trailing the technology by at least a year. The EU AI Act is in effect but was designed before agentic AI hit mainstream. The NIST framework has been updated, but it's guidelines, not enforcement. The tools you can build today are more powerful than what any framework was designed to govern.

That means the responsibility falls on us, the people deploying these systems, to be thoughtful about it. Not reckless, not paranoid. Thoughtful.

## Why This Matters More Than Ever

A year ago, AI safety was a nice-to-know. Something for the security team to worry about. Now it's a business risk that every leader needs to understand, because agents are touching real operations, real clients, real data.

The fix isn't fear. It's discipline. Map your workflows. Limit your permissions. Build in checkpoints. Test before you deploy. And stay curious about what can go wrong, because even the people building these tools are still figuring that out.

AI agents are genuinely powerful. That's exactly why getting safety right isn't optional. It's the whole point.
