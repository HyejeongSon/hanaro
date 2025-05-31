type Props = {
  message: string;
};

export function FormMessage({ message }: Props) {
  return <p className='mt-1 ml-1 text-sm text-red-600'>{message}</p>;
}
