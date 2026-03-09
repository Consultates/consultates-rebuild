export interface BlogCategory {
  slug: string;
  label: string;
  icon: string; // Phosphor duotone class name
}

export const blogCategories: BlogCategory[] = [
  { slug: 'getting-started', label: 'Getting Started', icon: 'ph-rocket-launch' },
  { slug: 'ai-safety', label: 'AI Safety', icon: 'ph-shield-check' },
  { slug: 'strategy', label: 'Strategy', icon: 'ph-compass' },
  { slug: 'tools-tactics', label: 'Tools & Tactics', icon: 'ph-wrench' },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find(c => c.slug === slug);
}
