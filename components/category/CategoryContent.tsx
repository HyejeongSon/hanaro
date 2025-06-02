'use client';

import type { Post } from '@/types/post';
import { Search, XIcon } from 'lucide-react';

import { useRouter, useSearchParams } from 'next/navigation';

import type React from 'react';
import { useState } from 'react';

import { PostList } from './PostList';

type CategoryContentProps = {
  category: { id: number; name: string };
  posts: Post[];
  searchQuery?: string;
};

export function CategoryContent({
  category,
  posts,
  searchQuery = '',
}: CategoryContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (localSearchQuery.trim()) {
      params.set('q', localSearchQuery);
    } else {
      params.delete('q');
    }

    // 전체보기인 경우 (id가 0)와 특정 카테고리인 경우를 구분
    if (category.id === 0) {
      router.push(`/categories?${params.toString()}`);
    } else {
      router.push(`/categories/${category.id}?${params.toString()}`);
    }
  };

  const handleSearchReset = () => {
    setLocalSearchQuery('');
    if (category.id === 0) {
      router.push('/categories');
    } else {
      router.push(`/categories/${category.id}`);
    }
  };

  return (
    <div className='space-y-6'>
      {/* 카테고리 헤더 + 검색 바 */}
      <div className='flex justify-between items-center border-b pb-4 flex-wrap gap-4'>
        {/* 왼쪽: 카테고리 타이틀 */}
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-1'>
            {category.name}
          </h1>
          <p className='text-gray-600 text-base'>
            {searchQuery ? (
              <>
                &quot;{searchQuery}&quot;에 대한 검색 결과 {posts.length}개
              </>
            ) : (
              <>총 {posts.length}개의 게시글</>
            )}
          </p>
        </div>

        <div className='bg-white'>
          <form onSubmit={handleSearch} className='relative w-80'>
            <input
              type='text'
              placeholder={
                category.id === 0
                  ? '전체 게시글에서 검색하세요'
                  : '이 카테고리에서 검색하세요'
              }
              className='w-full pl-4 pr-20 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
            />

            {/* 초기화 아이콘 버튼 */}
            {searchQuery && (
              <button
                type='button'
                onClick={handleSearchReset}
                className='absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600'
                aria-label='검색 초기화'
              >
                <XIcon className='w-5 h-5' />
              </button>
            )}

            {/* 검색 버튼 */}
            <button
              type='submit'
              className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700'
              aria-label='검색'
            >
              <Search className='h-5 w-5' />
            </button>
          </form>
        </div>
      </div>

      {/* 게시글 목록 */}
      <PostList posts={posts} />
    </div>
  );
}
