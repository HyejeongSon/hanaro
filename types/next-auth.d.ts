import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'USER' | 'ADMIN';
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: 'USER' | 'ADMIN';
    name?: string | null;
    email?: string | null;
    image?: string | null;
    password?: string | null; // optional, for credentials only
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'USER' | 'ADMIN';
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
