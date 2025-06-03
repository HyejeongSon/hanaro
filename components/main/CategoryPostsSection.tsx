import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types/post';
import { Calendar, ThumbsDown, ThumbsUp, User } from 'lucide-react';

import Link from 'next/link';

type CategoryPostsSectionProps = {
  categoryName: string;
  posts: Post[];
  categoryId?: number;
};

const getReactionCounts = (reactions: { type: 'LIKE' | 'DISLIKE' }[]) => {
  const likes = reactions.filter((r) => r.type === 'LIKE').length;
  const dislikes = reactions.filter((r) => r.type === 'DISLIKE').length;
  return { likes, dislikes };
};

export function CategoryPostsSection({
  categoryName,
  posts,
  categoryId,
}: CategoryPostsSectionProps) {
  return (
    <Card className='h-full flex flex-col border-none'>
      <CardHeader className='flex flex-row items-center justify-between flex-shrink-0'>
        <CardTitle className='text-lg font-semibold'>{categoryName}</CardTitle>
        {categoryId && (
          <Link
            href={`/categories/${categoryId}`}
            className='text-point hover:text-point-hover text-sm px-3 py-1 rounded-lg transition-colors'
          >
            더보기
          </Link>
        )}
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='space-y-4 h-full'>
          {posts.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              <p>게시글이 없습니다.</p>
            </div>
          ) : (
            posts.map((post) => (
              <Link href={`/post/${post.id}`} key={post.id} className='block'>
                <div className='border rounded-lg p-4 hover:shadow-md transition-shadow'>
                  <h3 className='font-semibold text-gray-900 mb-2 hover:text-point transition-colors line-clamp-1'>
                    {post.title}
                  </h3>
                  <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                    {post.content}
                  </p>
                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <div className='flex items-center space-x-3'>
                      <span className='flex items-center space-x-1'>
                        <User className='h-3 w-3' />
                        <span>{post.user.name}</span>
                      </span>
                      <span className='flex items-center space-x-1'>
                        <Calendar className='h-3 w-3' />
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='flex items-center space-x-1'>
                        <ThumbsUp className='h-3 w-3 text-point' />
                        <span>{getReactionCounts(post.reactions).likes}</span>
                      </span>
                      <span className='flex items-center space-x-1'>
                        <ThumbsDown className='h-3 w-3 text-red-500' />
                        <span>
                          {getReactionCounts(post.reactions).dislikes}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
