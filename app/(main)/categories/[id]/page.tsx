import { CategoryLayout } from '@/components/category/CategoryLayout';
import { getCategoryById } from '@/data/category';
import { getPostsByCategory, searchPostsInCategory } from '@/data/post';

import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  const categoryId = Number.parseInt(awaitedParams.id);
  const searchQuery = awaitedSearchParams.q?.trim() || '';

  if (isNaN(categoryId)) {
    notFound();
  }

  const category = await getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const posts = searchQuery
    ? await searchPostsInCategory(categoryId, searchQuery)
    : await getPostsByCategory(categoryId);

  return (
    <CategoryLayout
      currentCategory={category}
      posts={posts}
      searchQuery={searchQuery}
    />
  );
}
