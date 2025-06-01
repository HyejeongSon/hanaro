import { ReactionType } from "@/app/generated/prisma";

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string | Date;
  category: {
    id: number;
    name: string;
  };
  user: {
    id: string;
    name: string | null;
    image?: string | null;
  };
  reactions: {
    type: ReactionType;
  }[];
};

