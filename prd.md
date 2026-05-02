PORTFOLIO WEBSITE
FRONTEND PRD (SHORT)

Next.js · TypeScript · Tailwind CSS · Framer Motion

1. Goal

Build a simple, modern personal portfolio website that feels polished, responsive, and easy to scan.

The site should:

communicate who you are quickly
showcase projects and experience clearly
feel modern and technical
work smoothly on desktop and mobile
include a simple AI chat widget

This is a clean personal portfolio, not a SaaS app.

2. Stack

Use exactly:

Next.js 15
TypeScript
Tailwind CSS
Framer Motion
shadcn/ui

Do not add unnecessary libraries.

3. Global Rules
keep code simple and easy to maintain
do not overengineer
do not hardcode repeated content in JSX
keep content in simple typed data files
keep components small and readable
avoid unnecessary abstractions
build one section at a time
4. Design Rules

Style:

dark
clean
modern
technical
minimal
polished

Use:

strong typography
clean spacing
subtle borders
simple cards
soft hover states
clear hierarchy

Avoid:

too many gradients
glassmorphism everywhere
large glow effects
visual clutter
flashy animations
5. Motion Rules

Use Framer Motion lightly.

Only use:

fade in
slight upward reveal
subtle hover
smooth transitions

Do not:

overanimate
animate everything
use complex scroll effects

Only animate:

opacity
transform
6. Mobile Rules

Mobile responsive by default.

Rules:

no horizontal scroll
readable text on small screens
clean stacked layouts
proper spacing
buttons easy to tap
cards stack cleanly
no cramped sections
chatbot works well on mobile

Mobile should feel intentionally designed, not squeezed desktop.

7. Sections
Hero

Purpose: communicate who you are in under 5 seconds.

Include:

name
role/title
short value proposition
primary CTA
secondary CTA
trust strip

Rules:

simple
strong headline
CTA above fold
no heavy effects
no 3D

Mobile:

stacked layout
left aligned
CTAs full width
About

Purpose: quick positioning.

Include:

short intro
3–4 value cards
quick stats

Rules:

short
direct
no biography
no long paragraphs

Mobile:

single column
wrapped stats
Experience

Purpose: show credibility.

Include:

simple timeline
role cards
impact
stack tags
“Ask AI” button

Rules:

focus on ownership and impact
keep timeline simple
avoid visual clutter

Mobile:

full-width cards
simplified timeline
Projects

Purpose: highest-signal section.

Include:

project cards
filter tabs
short description
stack
impact
deep dive
“Ask AI” button

Project card order:

title
impact
short description
stack
actions

Rules:

impact before stack
simple clean cards
no noisy layouts

Mobile:

single column
full-width buttons
horizontal filter scroll
Skills

Purpose: fast recruiter scan.

Include:

category tabs
skill badges
production indicator

Rules:

simple
no progress bars
no fake proficiency

Mobile:

2-column grid
tap-friendly badges
Writing

Purpose: show how you think.

Include:

post cards
tags
reading time
simple article page

Rules:

readable
minimal
content-first

Mobile:

single column
readable width
Contact

Purpose: conversion.

Include:

email
LinkedIn
GitHub
resume
contact form

Rules:

easy to contact
CTA clear
simple form

Mobile:

stacked layout
full-width inputs/buttons
AI Chatbot

Purpose: simple interactive assistant.

Include:

floating button
chat panel
suggested prompts
streaming responses

Rules:

simple chat UI
easy to open/close
do not overbuild

Mobile:

bottom sheet
full width
easy close
8. Chatbot Scope (Keep Simple)

For v1, chatbot should only do:

open panel
show prompts
send message
stream response
render markdown

Do not add:

memory
agents
tools
complex orchestration

Keep it simple.

9. Build Order
layout shell
hero
about
skills
experience
projects
contact
writing
chatbot
mobile polish
10. LLM Rules
build one section at a time
do not generate the full app at once
build structure first
add styling second
add responsiveness third
add motion last
keep code simple
do not invent content
do not overengineer
keep output directly usable