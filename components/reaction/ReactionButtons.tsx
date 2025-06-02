'use client';

import {
  getReactionByUserAndPost,
  getReactionCountsByPostId,
  toggleReaction,
} from '@/actions/reaction';
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export function ReactionButtons({ postId }: { postId: number }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [counts, setCounts] = useState({ likes: 0, dislikes: 0 });
  const [userReaction, setUserReaction] = useState<'LIKE' | 'DISLIKE' | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReactions = async () => {
      try {
        const countsData = await getReactionCountsByPostId(postId);
        setCounts(countsData);

        if (session?.user?.id) {
          const userReactionData = await getReactionByUserAndPost(
            session.user.id,
            postId
          );
          setUserReaction(userReactionData?.type || null);
        }
      } catch (error) {
        console.error('Error loading reactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReactions();
  }, [postId, session?.user?.id]);

  const handleReaction = async (type: 'LIKE' | 'DISLIKE') => {
    if (!session?.user?.id) {
      router.push('/login'); // 로그인 안한 경우 로그인 페이지로 이동
      return;
    }

    try {
      setIsLoading(true);
      const result = await toggleReaction(postId, type);

      if (result.success) {
        setCounts(result.counts);
        setUserReaction(result.userReaction);
      }
    } catch (error) {
      console.error('Error toggling reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center space-x-6'>
      <Button
        variant='ghost'
        size='sm'
        disabled={isLoading}
        onClick={() => handleReaction('LIKE')}
        className={`flex items-center space-x-2 ${userReaction === 'LIKE' ? 'text-point' : ''}`}
      >
        <ThumbsUp
          className={`h-5 w-5 ${userReaction === 'LIKE' ? 'fill-current text-point' : ''}`}
        />
        <span>{counts.likes}</span>
      </Button>

      <Button
        variant='ghost'
        size='sm'
        disabled={isLoading}
        onClick={() => handleReaction('DISLIKE')}
        className={`flex items-center space-x-2 ${userReaction === 'DISLIKE' ? 'text-red-600' : ''}`}
      >
        <ThumbsDown
          className={`h-5 w-5 ${userReaction === 'DISLIKE' ? 'fill-red-600' : ''}`}
        />
        <span>{counts.dislikes}</span>
      </Button>
    </div>
  );
}
