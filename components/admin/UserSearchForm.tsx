'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

import { useRouter } from 'next/navigation';

import type React from 'react';
import { useState } from 'react';

export function UserSearchForm({
  defaultValue = '',
}: {
  defaultValue?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/admin/users?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/admin/users'); // 공백일 경우 전체 목록으로 리셋
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <div className='relative flex-1'>
        <Input
          type='text'
          placeholder='이름, 닉네임 또는 이메일로 검색'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='pr-10'
        />
        <Button
          type='submit'
          variant='ghost'
          size='sm'
          className='absolute right-0 top-0 h-full'
        >
          <Search className='h-4 w-4' />
        </Button>
      </div>
    </form>
  );
}
