'use client';

import { createPost, updatePost } from '@/actions/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

const PostSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  content: z
    .string()
    .min(10, { message: '내용은 최소 10자 이상이어야 합니다.' }),
  categoryId: z.string().min(1, { message: '카테고리를 선택해주세요.' }),
});

type PostFormValues = z.infer<typeof PostSchema>;

type Post = {
  id: number;
  title: string;
  content: string;
  categoryId: number;
};

type PostFormProps = {
  categories: { id: number; name: string }[];
  post?: Post;
};

export function PostForm({ categories, post }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      categoryId: post?.categoryId?.toString() || '',
    },
  });

  const onSubmit = async (data: PostFormValues) => {
    setIsLoading(true);
    try {
      if (post) {
        // 수정
        const result = await updatePost(post.id, {
          ...data,
          categoryId: Number.parseInt(data.categoryId),
        });

        if (result.success) {
          toast.success('게시글이 수정되었습니다.');
          router.push(`/`);
          //   router.push(`/posts/${post.id}`);
        } else {
          toast.error(result.message || '게시글 수정에 실패했습니다.');
        }
      } else {
        // 생성
        const result = await createPost({
          ...data,
          categoryId: Number.parseInt(data.categoryId),
        });

        if (result.success) {
          toast.success('게시글이 작성되었습니다.');
          router.push(`/`);
          //   router.push(`/posts/${result.postId}`);
        } else {
          toast.error(result.message || '게시글 작성에 실패했습니다.');
        }
      }
    } catch (error) {
      console.log('error', error);
      toast.error('게시글 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setValue('categoryId', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='title'>제목</Label>
        <Input id='title' {...register('title')} />
        {errors.title && (
          <p className='text-sm text-red-500'>{errors.title.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='categoryId'>카테고리</Label>
        <Select
          defaultValue={post?.categoryId?.toString() || ''}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder='카테고리 선택' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p className='text-sm text-red-500'>{errors.categoryId.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='content'>내용</Label>
        <Textarea
          id='content'
          {...register('content')}
          rows={15}
          className='min-h-[300px]'
        />
        {errors.content && (
          <p className='text-sm text-red-500'>{errors.content.message}</p>
        )}
      </div>

      <Button type='submit' disabled={isLoading}>
        {isLoading ? '저장 중...' : post ? '수정하기' : '작성하기'}
      </Button>
    </form>
  );
}
