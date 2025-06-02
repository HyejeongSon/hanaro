import { PostForm } from '@/components/admin/PostForm';
import { getAllCategories } from '@/data/category';

export default async function CreatePostPage() {
  const categories = await getAllCategories();

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8'>게시글 작성</h1>
      <PostForm categories={categories} />
    </div>
  );
}
