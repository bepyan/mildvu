import { getFullDate } from '@libs/client';
import { MagazineWithAuthor } from '@types';
import { useRouter } from 'next/router';

export interface MagazineInterface {
  item: MagazineWithAuthor;
}

export default function MagazineItem({ item }: MagazineInterface) {
  const router = useRouter();

  const navToMagazine = () => router.push(`/@${item.user.publishKey}/${item.id}`);

  return (
    <div
      className="flex cursor-pointer items-center rounded-md p-4 text-stone-700 hover:bg-stone-100"
      onClick={navToMagazine}
    >
      <span className="text-lg">매거진</span>
      <div className="ml-4">{getFullDate(item.createdAt)}</div>
    </div>
  );
}
