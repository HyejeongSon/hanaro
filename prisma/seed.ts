import { PrismaClient, Role } from '@/app/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/*
async function main() {
  // 카테고리 생성
  const categories = [
    "JavaScript",
    "TypeScript",
    "React",
    "etc",
  ]

  for (const categoryName of categories) {
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    })
  }

  // 관리자 계정 생성
  const hashedPassword = await bcrypt.hash("admin123!", 10)

  await prisma.user.upsert({
    where: { email: "admin@hanaro.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@hanaro.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })

  console.log("Seed data created successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
*/

async function main() {
  // 카테고리 생성
  const categories = ['JavaScript', 'TypeScript', 'React', 'etc'];

  const createdCategories = [];
  for (const categoryName of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
    createdCategories.push(category);
  }

  // 관리자 계정 생성
  const hashedPassword = await bcrypt.hash('admin123!', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@hanaro.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@hanaro.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  // 각 카테고리별로 게시글 3개씩 생성
  const postTemplates = {
    JavaScript: [
      {
        title: 'JavaScript ES6+ 주요 기능 정리',
        content: `ES6(ES2015)부터 도입된 JavaScript의 주요 기능들을 정리해보겠습니다.

1. let과 const
- let: 블록 스코프를 가지는 변수 선언
- const: 블록 스코프를 가지는 상수 선언

2. 화살표 함수 (Arrow Functions)
const add = (a, b) => a + b;

3. 템플릿 리터럴 (Template Literals)
const message = \`Hello, \${name}!\`;

4. 구조 분해 할당 (Destructuring)
const { name, age } = person;
const [first, second] = array;

5. 스프레드 연산자 (Spread Operator)
const newArray = [...oldArray, newItem];

이러한 기능들을 활용하면 더 깔끔하고 읽기 쉬운 코드를 작성할 수 있습니다.`,
      },
      {
        title: '비동기 처리: Promise와 async/await',
        content: `JavaScript에서 비동기 처리를 다루는 방법에 대해 알아보겠습니다.

Promise는 비동기 작업의 완료 또는 실패를 나타내는 객체입니다.

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("데이터 로드 완료");
    }, 1000);
  });
};

async/await는 Promise를 더 쉽게 다룰 수 있게 해주는 문법입니다.

async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async/await를 사용하면 비동기 코드를 동기 코드처럼 작성할 수 있어 가독성이 크게 향상됩니다.`,
      },
      {
        title: 'JavaScript 클로저(Closure) 완벽 이해',
        content: `클로저는 JavaScript의 핵심 개념 중 하나입니다. 함수와 그 함수가 선언된 렉시컬 환경의 조합을 의미합니다.

클로저의 기본 개념

function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8

클로저의 활용

1. 데이터 은닉
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

2. 모듈 패턴
const myModule = (function() {
  let privateVar = 0;
  
  return {
    publicMethod: function() {
      privateVar++;
      return privateVar;
    }
  };
})();

클로저를 이해하면 JavaScript의 스코프와 메모리 관리에 대해 더 깊이 이해할 수 있습니다.`,
      },
    ],
    TypeScript: [
      {
        title: 'TypeScript 기초: 타입 시스템 이해하기',
        content: `TypeScript는 JavaScript에 정적 타입을 추가한 언어입니다. 타입 시스템의 기초를 알아보겠습니다.

기본 타입들

// 기본 타입
let name: string = "홍길동";
let age: number = 25;
let isStudent: boolean = true;

// 배열
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["김", "이", "박"];

// 객체
interface Person {
  name: string;
  age: number;
  email?: string; // 선택적 프로퍼티
}

const person: Person = {
  name: "홍길동",
  age: 25
};

함수 타입

function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const add = (a: number, b: number): number => a + b;

제네릭

function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");

TypeScript를 사용하면 개발 시점에 오류를 잡을 수 있어 더 안전한 코드를 작성할 수 있습니다.`,
      },
      {
        title: 'TypeScript 고급 타입: Union, Intersection, Conditional Types',
        content: `TypeScript의 고급 타입 기능들을 살펴보겠습니다.

Union Types - 여러 타입 중 하나가 될 수 있는 값을 표현합니다.

type StringOrNumber = string | number;

function formatValue(value: StringOrNumber): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toString();
}

Intersection Types - 여러 타입을 모두 만족하는 타입을 만듭니다.

interface Name {
  name: string;
}

interface Age {
  age: number;
}

type Person = Name & Age;

const person: Person = {
  name: "홍길동",
  age: 25
};

Conditional Types - 조건에 따라 타입을 결정합니다.

type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type NumberResponse = ApiResponse<number>; // { data: number }

Mapped Types - 기존 타입을 변형하여 새로운 타입을 만듭니다.

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

이러한 고급 타입들을 활용하면 더 정확하고 유연한 타입 시스템을 구축할 수 있습니다.`,
      },
      {
        title: 'TypeScript와 React: 타입 안전한 컴포넌트 만들기',
        content: `TypeScript와 React를 함께 사용하여 타입 안전한 컴포넌트를 만드는 방법을 알아보겠습니다.

Props 타입 정의

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
};

State 타입 정의

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

Custom Hooks 타입 정의

function useApi<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

TypeScript를 React와 함께 사용하면 컴파일 시점에 오류를 잡을 수 있어 더 안정적인 애플리케이션을 만들 수 있습니다.`,
      },
    ],
    React: [
      {
        title: 'React Hooks 완벽 가이드: useState와 useEffect',
        content: `React Hooks는 함수형 컴포넌트에서 상태와 생명주기를 다룰 수 있게 해주는 기능입니다.

useState Hook

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

useEffect Hook

import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 컴포넌트 마운트 시 실행
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));

    // 클린업 함수 (컴포넌트 언마운트 시 실행)
    return () => {
      // 정리 작업
    };
  }, [userId]); // 의존성 배열

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}

커스텀 Hook 만들기

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// 사용
function App() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

Hooks를 잘 활용하면 재사용 가능하고 깔끔한 컴포넌트를 만들 수 있습니다.`,
      },
      {
        title: 'React Context API와 상태 관리',
        content: `React Context API를 사용하여 전역 상태를 관리하는 방법을 알아보겠습니다.

Context 생성

import React, { createContext, useContext, useReducer } from 'react';

// Context 생성
const AppContext = createContext();

// 초기 상태
const initialState = {
  user: null,
  theme: 'light',
  notifications: []
};

// Reducer 함수
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    default:
      return state;
  }
}

Provider 컴포넌트

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const value = {
    ...state,
    setUser,
    setTheme,
    addNotification
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

Context 사용

// 커스텀 Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// 컴포넌트에서 사용
function Header() {
  const { user, theme, setTheme } = useApp();

  return (
    <header className={\`header \${theme}\`}>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </header>
  );
}

// App 컴포넌트
function App() {
  return (
    <AppProvider>
      <Header />
      <Main />
    </AppProvider>
  );
}

Context API를 사용하면 prop drilling 없이 깊은 컴포넌트 트리에서도 상태를 공유할 수 있습니다.`,
      },
      {
        title: 'React 성능 최적화: memo, useMemo, useCallback',
        content: `React 애플리케이션의 성능을 최적화하는 방법들을 알아보겠습니다.

React.memo - 컴포넌트의 불필요한 리렌더링을 방지합니다.

import React, { memo } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <button onClick={onUpdate}>Update</button>
    </div>
  );
});

// 커스텀 비교 함수
const MyComponent = memo(({ user, posts }) => {
  return <div>{/* 컴포넌트 내용 */}</div>;
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id &&
         prevProps.posts.length === nextProps.posts.length;
});

useMemo - 비용이 큰 계산의 결과를 메모이제이션합니다.

import React, { useMemo, useState } from 'react';

function ProductList({ products, searchTerm }) {
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return products.reduce((sum, product) => sum + product.price, 0);
  }, [products]);

  return (
    <div>
      <p>Total: \${expensiveValue}</p>
      {filteredProducts.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

useCallback - 함수를 메모이제이션하여 불필요한 리렌더링을 방지합니다.

import React, { useCallback, useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} />
      <FilterButtons filter={filter} onFilterChange={setFilter} />
    </div>
  );
}

성능 최적화 팁

1. 개발자 도구 활용: React DevTools Profiler 사용
2. 적절한 key 사용: 리스트 렌더링 시 안정적인 key 제공
3. 상태 구조 최적화: 필요한 부분만 업데이트되도록 상태 분리
4. 지연 로딩: React.lazy와 Suspense 활용

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

성능 최적화는 측정 후에 적용하는 것이 중요합니다. 불필요한 최적화는 오히려 코드를 복잡하게 만들 수 있습니다.`,
      },
    ],
    etc: [
      {
        title: '웹 개발 트렌드 2024: 주목해야 할 기술들',
        content: `2024년 웹 개발 분야에서 주목받고 있는 기술들을 정리해보겠습니다.

프론트엔드 트렌드

1. Server Components
React Server Components가 점점 더 많은 관심을 받고 있습니다.
- 서버에서 렌더링되는 컴포넌트
- 번들 크기 감소
- 초기 로딩 성능 향상

2. Edge Computing
- Vercel Edge Functions
- Cloudflare Workers
- 사용자에게 더 가까운 곳에서 코드 실행

3. Web Assembly (WASM)
- 브라우저에서 네이티브 수준의 성능
- 다양한 언어로 웹 애플리케이션 개발 가능

백엔드 트렌드

1. Serverless Architecture
- AWS Lambda
- Vercel Functions
- 서버 관리 부담 감소

2. GraphQL 성숙화
- 타입 안전성
- 효율적인 데이터 페칭
- 실시간 구독

3. Microservices
- 서비스 분리
- 독립적인 배포
- 확장성 향상

개발 도구

1. AI 코딩 어시스턴트
- GitHub Copilot
- ChatGPT
- 개발 생산성 향상

2. 모노레포 도구
- Nx
- Turborepo
- 여러 프로젝트 통합 관리

3. 타입 안전성
- TypeScript 확산
- 런타임 타입 검증
- 더 안전한 코드

이러한 트렌드들을 파악하고 적절히 도입하면 더 효율적이고 현대적인 웹 애플리케이션을 개발할 수 있습니다.`,
      },
      {
        title: '개발자를 위한 Git 고급 사용법',
        content: `Git의 고급 기능들을 활용하여 더 효율적으로 버전 관리를 하는 방법을 알아보겠습니다.

Git Rebase 활용

Interactive Rebase - 커밋 히스토리를 깔끔하게 정리할 수 있습니다.

# 최근 3개 커밋을 수정
git rebase -i HEAD~3

# 옵션들:
# pick: 커밋 유지
# reword: 커밋 메시지 수정
# edit: 커밋 내용 수정
# squash: 이전 커밋과 합치기
# drop: 커밋 삭제

Feature Branch Rebase

# feature 브랜치를 main 브랜치 위로 재배치
git checkout feature-branch
git rebase main

# 충돌 해결 후
git add .
git rebase --continue

Git Stash 고급 활용

# 특정 파일만 stash
git stash push -m "작업 중인 기능" -- file1.js file2.js

# stash 목록 확인
git stash list

# 특정 stash 적용
git stash apply stash@{1}

# stash 내용 확인
git stash show -p stash@{0}

Git Hooks 활용

Pre-commit Hook - 커밋 전에 코드 검사를 자동화합니다.

#!/bin/sh
# .git/hooks/pre-commit

# ESLint 실행
npm run lint
if [ $? -ne 0 ]; then
  echo "ESLint 검사 실패. 커밋이 중단됩니다."
  exit 1
fi

# 테스트 실행
npm test
if [ $? -ne 0 ]; then
  echo "테스트 실패. 커밋이 중단됩니다."
  exit 1
fi

Git Worktree - 여러 브랜치를 동시에 작업할 수 있습니다.

# 새로운 worktree 생성
git worktree add ../project-feature feature-branch

# worktree 목록 확인
git worktree list

# worktree 제거
git worktree remove ../project-feature

Git Bisect - 버그가 발생한 커밋을 찾는 도구입니다.

# bisect 시작
git bisect start

# 현재 커밋이 나쁜 상태
git bisect bad

# 이전 커밋이 좋은 상태
git bisect good HEAD~10

# Git이 자동으로 중간 커밋으로 이동
# 테스트 후 good 또는 bad 표시
git bisect good  # 또는 git bisect bad

# 완료 후 정리
git bisect reset

유용한 Git 설정

# 글로벌 설정
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# 로그 포맷 설정
git config --global alias.lg "log --oneline --graph --decorate --all"

# 자동 줄바꿈 설정
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # Mac/Linux

이러한 Git 고급 기능들을 활용하면 더 효율적이고 체계적인 버전 관리가 가능합니다.`,
      },
    ],
  };

  // 각 카테고리별로 게시글 생성
  for (const category of createdCategories) {
    const posts =
      postTemplates[category.name as keyof typeof postTemplates] || [];

    for (let i = 0; i < posts.length; i++) {
      await prisma.board.create({
        data: {
          title: posts[i].title,
          content: posts[i].content,
          userId: adminUser.id,
          categoryId: category.id,
        },
      });
    }
  }

  console.log('Seed data created successfully!');
  console.log(`Created ${createdCategories.length} categories`);
  console.log(`Created ${createdCategories.length * 3} posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
