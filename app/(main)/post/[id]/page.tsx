import { auth } from '@/auth';
import { DeletePostButton } from '@/components/admin/DeletePostButton';
import { ReactionButtons } from '@/components/reaction/ReactionButtons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPostById } from '@/data/post';

import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

const formatDateTime = (date: Date | string) =>
  new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

export default async function PostPage({ params }: Props) {
  const awaitedParams = await params;
  const postId = Number.parseInt(awaitedParams.id);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-6'>
        <Link href={`/categories/${post.categoryId}`}>
          <span className='text-blue-600'>← {post.category.name}</span>
        </Link>
      </div>

      <Card className='gap-8'>
        <CardHeader>
          {/* 제목 + 버튼 */}
          <div className='flex justify-between items-start'>
            <CardTitle className='text-2xl mb-2'>{post.title}</CardTitle>

            {isAdmin && (
              <div className='flex space-x-2'>
                <Link href={`/admin/post/edit/${post.id}`}>
                  <Button variant='outline' size='sm'>
                    수정
                  </Button>
                </Link>
                <DeletePostButton
                  postId={post.id}
                  categoryId={post.categoryId}
                />
              </div>
            )}
          </div>

          {/* 작성자/카테고리 정보 + 수정일 */}
          <div className='flex justify-between items-start text-sm text-gray-500'>
            <div>
              <span>작성자: {post.user.name}</span>
              <span className='mx-2'>•</span>
              <span>{post.createdAt.toLocaleDateString()}</span>
              <span className='mx-2'>•</span>
              <span>{post.category.name}</span>
            </div>

            {new Date(post.updatedAt).getTime() !==
              new Date(post.createdAt).getTime() && (
              <span>{formatDateTime(post.updatedAt)} (수정)</span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className='prose max-w-none min-h-[5rem]'>
            <div className='whitespace-pre-wrap'>
              <p>{post.content}</p>
            </div>
          </div>

          <div className='mt-8 border-t pt-4'>
            <ReactionButtons postId={post.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
