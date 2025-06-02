'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: Date;
  _count: {
    boards: number;
    boardReaction: number;
  };
};

export function UserTable({ users }: { users: User[] }) {
  return (
    <div className='border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>권한</TableHead>
            <TableHead>가입일</TableHead>
            <TableHead>작성 게시글</TableHead>
            <TableHead>반응 수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className='text-center py-4'>
                회원이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name || '-'}</TableCell>
                <TableCell>{user.email || '-'}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'ADMIN'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{user._count.boards}</TableCell>
                <TableCell>{user._count.boardReaction}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
