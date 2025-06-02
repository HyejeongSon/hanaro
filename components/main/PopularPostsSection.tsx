import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types/post';
import { ThumbsUp, TrendingUp } from 'lucide-react';

import Link from 'next/link';

type PopularPostsSectionProps = {
  posts: Post[];
};

const getReactionCounts = (reactions: { type: 'LIKE' | 'DISLIKE' }[]) => {
  const likes = reactions.filter((r) => r.type === 'LIKE').length;
  const dislikes = reactions.filter((r) => r.type === 'DISLIKE').length;
  return { likes, dislikes };
};

export function PopularPostsSection({ posts }: PopularPostsSectionProps) {
  // 인기 게시글 (좋아요가 많은 순)
  const popularPosts = [...posts]
    .sort((a, b) => {
      const aLikes = getReactionCounts(a.reactions).likes;
      const bLikes = getReactionCounts(b.reactions).likes;
      return bLikes - aLikes;
    })
    .slice(0, 3);

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <TrendingUp className='h-5 w-5' />
          <span>인기 게시글</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='space-y-3'>
          {popularPosts.map((post, index) => (
            <Link href={`/post/${post.id}`} key={post.id} className='block'>
              <div className='flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                <div className='flex-shrink-0 w-6 h-6 bg-[#4438cae7] text-white rounded-full flex items-center justify-center text-sm font-bold'>
                  {index + 1}
                </div>
                <div className='flex-1 min-w-0'>
                  <h4 className='font-medium text-gray-900 text-sm line-clamp-2 hover:text-point transition-colors'>
                    {post.title}
                  </h4>
                  <div className='flex items-center space-x-2 mt-1'>
                    <span className='text-xs text-gray-500'>
                      {post.category.name}
                    </span>
                    <span className='flex items-center space-x-1 text-xs text-point'>
                      <ThumbsUp className='h-3 w-3' />
                      <span>{getReactionCounts(post.reactions).likes}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
