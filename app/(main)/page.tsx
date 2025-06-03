import { auth } from '@/auth';
import { CategoriesSection } from '@/components/main/CategoriesSection';
import { CategoryPostsSection } from '@/components/main/CategoryPostsSection';
import { LatestPostsSection } from '@/components/main/LatestPostsSection';
import { PopularPostsSection } from '@/components/main/PopularPostsSection';
import { WelcomeSection } from '@/components/main/WelcomeSection';
import { getCategoriesWithPostCount } from '@/data/category';
import { getLatestPosts, getLatestPostsByCategory } from '@/data/post';

import Link from 'next/link';

export default async function MainPage() {
  const session = await auth();
  const [latestPosts, categories, postsByCategory] = await Promise.all([
    getLatestPosts(6),
    getCategoriesWithPostCount(),
    getLatestPostsByCategory(3), // 각 카테고리별로 최신 3개 게시글
  ]);

  // 카테고리 ID 매핑을 위한 객체 생성
  const categoryMap = categories.reduce(
    (acc, category) => {
      acc[category.name] = category.id;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return (
    <div className='space-y-8'>
      {/* 환영 섹션 */}
      <WelcomeSection session={session} />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-15'>
        {/* 최신 게시글 */}
        <div className='lg:col-span-2 h-full'>
          <LatestPostsSection posts={latestPosts} />
        </div>

        {/* 사이드바 */}
        <div className='h-full'>
          <div className='flex flex-col h-full space-y-6'>
            {/* 인기 게시글 */}
            <PopularPostsSection posts={latestPosts} />

            {/* 카테고리 */}
            <CategoriesSection categories={categories} />
          </div>
        </div>
      </div>

      {/* 카테고리별 최신 게시글 섹션 */}
      <div className='space-y-8'>
        <h2 className='text-2xl font-bold text-gray-900'>
          카테고리별 최신 게시글
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {Object.entries(postsByCategory).map(([categoryName, posts]) => (
            <CategoryPostsSection
              key={categoryName}
              categoryName={categoryName}
              posts={posts}
              categoryId={categoryMap[categoryName]}
            />
          ))}
        </div>
      </div>

      {/* 전체 게시글 보기 링크 */}
      <div className='text-center py-4'>
        <Link
          href='/categories'
          className='inline-block text-point px-6 py-3 rounded-lg hover:text-point-hover transition-colors font-medium'
        >
          모든 게시글 보기 →
        </Link>
      </div>
    </div>
  );
}
