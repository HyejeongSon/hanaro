import { auth } from '@/auth';
import { CategoriesSection } from '@/components/main/CategoriesSection';
import { LatestPostsSection } from '@/components/main/LatestPostsSection';
import { PopularPostsSection } from '@/components/main/PopularPostsSection';
import { WelcomeSection } from '@/components/main/WelcomeSection';
import { getCategoriesWithPostCount } from '@/data/category';
import { getLatestPosts } from '@/data/post';

export default async function MainPage() {
  const session = await auth();
  const [latestPosts, categories] = await Promise.all([
    getLatestPosts(6),
    getCategoriesWithPostCount(),
  ]);

  return (
    <div className='space-y-8'>
      {/* 환영 섹션 */}
      <WelcomeSection session={session} />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
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
    </div>
  );
}
