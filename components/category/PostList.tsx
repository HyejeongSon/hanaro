import type { Post } from '@/types/post';
import { Calendar, ThumbsDown, ThumbsUp, User } from 'lucide-react';

import Link from 'next/link';

type PostListProps = {
  posts: Post[];
};

const getReactionCounts = (reactions: { type: 'LIKE' | 'DISLIKE' }[]) => {
  const likes = reactions.filter((r) => r.type === 'LIKE').length;
  const dislikes = reactions.filter((r) => r.type === 'DISLIKE').length;
  return { likes, dislikes };
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500 text-lg'>게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className='block'>
          <div className='bg-white border rounded-lg p-6 hover:shadow-md transition-shadow'>
            {/* 게시글 제목 */}
            <h2 className='text-xl font-semibold text-gray-900 mb-3 hover:text-point transition-colors'>
              {post.title}
            </h2>

            {/* 게시글 내용 미리보기 */}
            <p className='text-gray-600 mb-4 line-clamp-2 leading-relaxed'>
              {post.content}
            </p>

            {/* 메타 정보 */}
            <div className='flex items-center justify-between text-sm text-gray-500'>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-1'>
                  <User className='h-4 w-4' />
                  <span>{post.user.name}</span>
                </div>

                <div className='flex items-center space-x-1'>
                  <Calendar className='h-4 w-4' />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* 반응 개수 */}
              <div className='flex items-center space-x-3'>
                <div className='flex items-center space-x-1'>
                  <ThumbsUp className='h-4 w-4 text-point' />
                  <span>{getReactionCounts(post.reactions).likes}</span>
                </div>
                <div className='flex items-center space-x-1'>
                  <ThumbsDown className='h-4 w-4 text-red-500' />
                  <span>{getReactionCounts(post.reactions).dislikes}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
