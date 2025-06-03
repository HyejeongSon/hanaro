export type Category = {
  id: number;
  name: string;
};

export type CategoryWithCount = {
  id: number;
  name: string;
  _count: {
    boards: number;
  };
};
