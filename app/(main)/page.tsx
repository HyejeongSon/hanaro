import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoriesWithPostCount } from '@/data/category';
import { getLatestPosts } from '@/data/post';
import {
  Calendar,
  Clock,
  List,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  User,
} from 'lucide-react';

import Link from 'next/link';

const getReactionCounts = (reactions: { type: 'LIKE' | 'DISLIKE' }[]) => {
  const likes = reactions.filter((r) => r.type === 'LIKE').length;
  const dislikes = reactions.filter((r) => r.type === 'DISLIKE').length;
  return { likes, dislikes };
};

export default async function MainPage() {
  const session = await auth();
  const [latestPosts, categories] = await Promise.all([
    getLatestPosts(6),
    getCategoriesWithPostCount(),
  ]);

  // 인기 게시글 (좋아요가 많은 순)
  const popularPosts = [...latestPosts]
    .sort((a, b) => {
      const aLikes = getReactionCounts(a.reactions).likes;
      const bLikes = getReactionCounts(b.reactions).likes;
      return bLikes - aLikes;
    })
    .slice(0, 3);

  return (
    <div className='space-y-8'>
      {/* 환영 섹션 */}
      <div className='text-center py-12 bg-gradient-to-r from-[#F8FAFC] to-[#b8c4f02d] rounded-lg'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Hanaro Tech Blog에 오신 것을 환영합니다
        </h1>
        <p className='text-xl text-gray-600 mb-6'>
          최신 기술 트렌드와 개발 인사이트를 함께 나누는 공간이에요 💡
        </p>
        {session?.user ? (
          <p className='text-lg text-point'>
            안녕하세요,{' '}
            <span className='font-semibold'>{session.user.name}</span>님!
          </p>
        ) : (
          <div className='space-x-4'>
            <Link
              href='/login'
              className='inline-block bg-[#4438cae7] text-white px-5 py-2.5 rounded-lg hover:bg-[#3730a3] transition-colors'
            >
              로그인하기
            </Link>
            <Link
              href='/signup'
              className='inline-block bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors'
            >
              회원가입하기
            </Link>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
        {/* 최신 게시글 */}
        <div className='lg:col-span-2 h-full'>
          <Card className='h-full flex flex-col'>
            <CardHeader className='flex flex-row items-center justify-between flex-shrink-0'>
              <CardTitle className='flex items-center space-x-2'>
                <Clock className='h-5 w-5' />
                <span>최신 게시글</span>
              </CardTitle>
              <Link
                href='/categories'
                className='text-[#4438cab9] hover:text-[#4438ca] px-4 py-1.5 rounded-lg transition-colors'
              >
                모든 게시글 보기
              </Link>
            </CardHeader>
            <CardContent className='flex-1'>
              <div className='space-y-4 h-full'>
                {latestPosts.slice(0, 4).map((post) => (
                  <Link
                    href={`/post/${post.id}`}
                    key={post.id}
                    className='block'
                  >
                    <div className='border rounded-lg p-4 hover:shadow-md transition-shadow'>
                      <h3 className='font-semibold text-gray-900 mb-2 hover:text-point transition-colors'>
                        {post.title}
                      </h3>
                      <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                        {post.content}
                      </p>
                      <div className='flex items-center justify-between text-xs text-gray-500'>
                        <div className='flex items-center space-x-3'>
                          <span className='flex items-center space-x-1'>
                            <User className='h-3 w-3' />
                            <span>{post.user.name}</span>
                          </span>
                          <span className='flex items-center space-x-1'>
                            <Calendar className='h-3 w-3' />
                            <span>
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </span>
                          <span className='bg-point text-point px-2 py-1 rounded-full text-xs'>
                            {post.category.name}
                          </span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='flex items-center space-x-1'>
                            <ThumbsUp className='h-3 w-3 text-point' />
                            <span>
                              {getReactionCounts(post.reactions).likes}
                            </span>
                          </span>
                          <span className='flex items-center space-x-1'>
                            <ThumbsDown className='h-3 w-3 text-red-500' />
                            <span>
                              {getReactionCounts(post.reactions).dislikes}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className='h-full'>
          <div className='flex flex-col h-full space-y-6'>
            {/* 인기 게시글 */}
            <Card className='flex-1'>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <TrendingUp className='h-5 w-5' />
                  <span>인기 게시글</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='flex-1'>
                <div className='space-y-3'>
                  {popularPosts.map((post, index) => (
                    <Link
                      href={`/post/${post.id}`}
                      key={post.id}
                      className='block'
                    >
                      <div className='flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                        <div className='flex-shrink-0 w-6 h-6 bg-[#4438cae7] text-white rounded-full flex items-center justify-center text-sm font-bold'>
                          {index + 1}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h4 className='font-medium text-gray-900 text-sm line-clamp-2 hover:text-point transition-colors'>
                            {post.title}
                          </h4>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs text-gray-500'>
                              {post.category.name}
                            </span>
                            <span className='flex items-center space-x-1 text-xs text-point'>
                              <ThumbsUp className='h-3 w-3' />
                              <span>
                                {getReactionCounts(post.reactions).likes}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 카테고리 */}
            <Card className='flex-1'>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <List className='h-5 w-5' />
                  <span>카테고리</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='flex-1'>
                <div className='space-y-2'>
                  <Link href='/categories' className='block'>
                    <div className='flex justify-between items-center p-2 rounded hover:bg-gray-100 transition-colors'>
                      <span className='text-gray-700'>전체보기</span>
                      <span className='text-sm text-gray-500'>
                        (
                        {categories.reduce(
                          (sum, cat) => sum + cat._count.boards,
                          0
                        )}
                        )
                      </span>
                    </div>
                  </Link>
                  {categories.map((category) => (
                    <Link
                      href={`/categories/${category.id}`}
                      key={category.id}
                      className='block'
                    >
                      <div className='flex justify-between items-center p-2 rounded hover:bg-gray-100 transition-colors'>
                        <span className='text-gray-700'>{category.name}</span>
                        <span className='text-sm text-gray-500'>
                          ({category._count.boards})
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
