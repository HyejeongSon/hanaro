import { UserSearchForm } from '@/components/admin/UserSearchForm';
import { UserTable } from '@/components/admin/UserTable';
import { getAllUsersWithoutSelf, searchUsersWithoutSelf } from '@/data/user';

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim() || '';
  const users = query
    ? await searchUsersWithoutSelf(query)
    : await getAllUsersWithoutSelf();

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>회원 관리</h1>

      <UserSearchForm defaultValue={query} />

      <div className='mt-8'>
        {query && (
          <p className='mb-4 text-gray-500'>
            &quot;{query}&quot;에 대한 검색 결과 {users.length}개
          </p>
        )}
        <UserTable users={users} />
      </div>
    </div>
  );
}
