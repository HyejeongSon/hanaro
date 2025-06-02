import { PostForm } from '@/components/admin/PostForm';
import { getAllCategories } from '@/data/category';
import { getPostById } from '@/data/post';

import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const awaitedParams = await params;
  const postId = Number.parseInt(awaitedParams.id);

  if (isNaN(postId)) {
    notFound();
  }

  const [post, categories] = await Promise.all([
    getPostById(postId),
    getAllCategories(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8'>게시글 수정</h1>
      <PostForm categories={categories} post={post} />
    </div>
  );
}
