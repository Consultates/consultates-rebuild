import { useState, useEffect } from 'react';
import BlogCarouselIsland, { type BlogCardData } from './BlogCarouselIsland';
import type { BlogCategory } from '../../data/blog-categories';

interface BlogCardDataWithCategory extends BlogCardData {
  category: string;
}

interface Props {
  allPosts: BlogCardDataWithCategory[];
  categories: BlogCategory[];
}

export default function BlogIndexIsland({ allPosts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts =
    selectedCategory === 'all'
      ? allPosts
      : allPosts.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('blog-category-change', { detail: selectedCategory }));
  }, [selectedCategory]);

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <button
          className={`blog-filter-pill ${selectedCategory === 'all' ? 'blog-filter-pill--active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            className={`blog-filter-pill ${selectedCategory === cat.slug ? 'blog-filter-pill--active' : ''}`}
            onClick={() => setSelectedCategory(cat.slug)}
          >
            <i className={`ph-duotone ${cat.icon}`} style={{ fontSize: '0.875rem' }} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Film-strip carousel — key resets on category change */}
      {filteredPosts.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--muted-foreground)', padding: '3rem 0' }}>
          No articles in this category yet.
        </p>
      ) : (
        <BlogCarouselIsland key={selectedCategory} posts={filteredPosts} />
      )}
    </div>
  );
}
