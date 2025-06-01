'use client';

import { deletePost } from '@/actions/admin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

export function DeletePostButton({
  postId,
  categoryId,
}: {
  postId: number;
  categoryId: number;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deletePost(postId);

      if (result.success) {
        toast.success('게시글이 삭제되었습니다.');
        router.push(`/categories/${categoryId}`);
      } else {
        toast.error(result.message || '게시글 삭제에 실패했습니다.');
        setIsOpen(false);
      }
    } catch (error) {
      console.log('error', error);
      toast.error('게시글 삭제 중 오류가 발생했습니다.');
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant='outline'
        size='sm'
        className='text-red-500 hover:bg-red-50'
        onClick={() => setIsOpen(true)}
      >
        삭제
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다.
              <br /> 게시글을 삭제하면 관련된 모든 데이터가 영구적으로
              삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isLoading}
              className='bg-red-600 hover:bg-red-700'
            >
              {isLoading ? '삭제 중...' : '삭제'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
