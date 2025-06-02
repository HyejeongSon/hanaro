'use client';

import { getCategoriesWithPostCount } from '@/data/category';
import type { CategoryWithCount } from '@/types/category';

import Link from 'next/link';

import { useEffect, useState } from 'react';

type CategorySidebarProps = {
  currentCategoryId: number;
};

export function CategorySidebar({ currentCategoryId }: CategorySidebarProps) {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategoriesWithPostCount();
        setCategories(categoriesData);

        // 전체 게시글 수 계산
        const total = categoriesData.reduce(
          (sum, cat) => sum + cat._count.boards,
          0
        );
        setTotalPosts(total);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className='bg-gray-50 p-6 rounded-lg min-h-[85vh] sticky top-8 bottom-8'>
      <h2 className='text-lg font-semibold mb-4 text-gray-800'>
        카테고리 목록
      </h2>

      <div className='space-y-2'>
        {/* 전체보기 */}
        <Link href='/categories' className='block'>
          <div
            className={`flex justify-between items-center p-2 rounded hover:bg-gray-200 transition-colors ${
              currentCategoryId === 0
                ? 'bg-point text-point font-medium'
                : 'text-gray-700'
            }`}
          >
            <span>전체보기</span>
            <span className='text-sm text-gray-500'>({totalPosts})</span>
          </div>
        </Link>

        {/* 개별 카테고리들 */}
        {categories.map((category) => (
          <Link
            href={`/categories/${category.id}`}
            key={category.id}
            className='block'
          >
            <div
              className={`flex justify-between items-center p-2 rounded hover:bg-gray-200 transition-colors ${
                currentCategoryId === category.id
                  ? 'bg-point text-point font-medium'
                  : 'text-gray-700'
              }`}
            >
              <span>{category.name}</span>
              <span className='text-sm text-gray-500'>
                ({category._count.boards})
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
