import type { Post } from '@/types/post';

import { CategoryContent } from './CategoryContent';
import { CategorySidebar } from './CategorySidebar';

type CategoryLayoutProps = {
  currentCategory: { id: number; name: string };
  posts: Post[];
  searchQuery?: string;
};

export function CategoryLayout({
  currentCategory,
  posts,
  searchQuery,
}: CategoryLayoutProps) {
  return (
    <div className='flex gap-8 min-h-screen'>
      {/* 왼쪽 사이드바 */}
      <div className='w-64 flex-shrink-0'>
        <CategorySidebar currentCategoryId={currentCategory.id} />
      </div>

      {/* 오른쪽 메인 컨텐츠 */}
      <div className='flex-1 min-w-0'>
        <CategoryContent
          category={currentCategory}
          posts={posts}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
