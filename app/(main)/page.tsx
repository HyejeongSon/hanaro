'use client';

import { useSession } from 'next-auth/react';

export default function MainPage() {
  const { data: session } = useSession();

  return (
    <div>
      hello, next.js!
      <br />
      로그인한 유저 아이디: {session?.user?.id}
      <br />
      로그인한 유저 이름: {session?.user?.name}
      <br />
      로그인한 유저 이메일: {session?.user?.email}
      <br />
      로그인한 유저 role: {session?.user?.role}
      <br />
      로그인한 유저 이미지: {session?.user?.image}
    </div>
  );
}
