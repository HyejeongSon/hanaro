import { CategoryLayout } from '@/components/category/CategoryLayout';
import { getLatestPosts, searchPosts } from '@/data/post';

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function CategoriesPage({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;
  const searchQuery = awaitedSearchParams.q?.trim() || '';

  // 검색어가 있으면 검색 함수 사용, 없으면 전체 게시글 가져오기
  const posts = searchQuery
    ? await searchPosts(searchQuery)
    : await getLatestPosts(50);

  const allCategoriesData = {
    id: 0,
    name: '전체 게시글',
  };

  return (
    <CategoryLayout
      currentCategory={allCategoriesData}
      posts={posts}
      searchQuery={searchQuery}
    />
  );
}
