import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CategoryWithCount } from '@/types/category';
import { List } from 'lucide-react';

import Link from 'next/link';

type CategoriesSectionProps = {
  categories: CategoryWithCount[];
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const totalPosts = categories.reduce(
    (sum, cat) => sum + cat._count.boards,
    0
  );

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <List className='h-5 w-5' />
          <span>카테고리</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='space-y-2'>
          <Link href='/categories' className='block'>
            <div className='flex justify-between items-center p-2 rounded hover:bg-gray-100 transition-colors'>
              <span className='text-gray-700'>전체보기</span>
              <span className='text-sm text-gray-500'>({totalPosts})</span>
            </div>
          </Link>
          {categories.map((category) => (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className='block'
            >
              <div className='flex justify-between items-center p-2 rounded hover:bg-gray-100 transition-colors'>
                <span className='text-gray-700'>{category.name}</span>
                <span className='text-sm text-gray-500'>
                  ({category._count.boards})
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
