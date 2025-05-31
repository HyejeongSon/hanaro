'use client';

import { useFormStatus } from 'react-dom';

import { Button, ButtonProps } from '../ui/button';

export function Submit({ children, ...others }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={pending}
      className='w-full bg-gray-300 hover:bg-gray-400 text-white'
      {...others}
    >
      {children}
    </Button>
  );
}
