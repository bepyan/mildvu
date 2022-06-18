import { TrashIcon } from '@heroicons/react/solid';
import { useMutation } from '@hooks';
import { cls, getFullDate } from '@libs/client';
import { MagazineWithAuthor } from '@types';
import { useRouter } from 'next/router';
import React from 'react';
import { useSWRConfig } from 'swr';

export interface MagazineMyItemInterface {
  item: MagazineWithAuthor;
  onDelete?: () => void;
}

export default function MagazineMyItem({ item, onDelete }: MagazineMyItemInterface) {
  const router = useRouter();
  const { mutate: revalidate } = useSWRConfig();

  const { loading, mutate } = useMutation({
    url: `/api/magazines/${item.id}`,
    method: 'DELETE',
    onSuccess: () => {
      revalidate('/api/users/me/magazines');
    },
  });

  const navToMagazine = () => router.push(`/@${item.user.publishKey}/${item.id}`);
  const onDeleteMagazine = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate();
  };

  return (
    <div
      className={cls(
        'flex cursor-pointer items-center rounded-md p-4 text-stone-700 hover:bg-stone-100',
        loading && 'pointer-events-none opacity-50',
      )}
      onClick={navToMagazine}
    >
      <span className="text-lg">매거진</span>
      <div className="ml-4">{getFullDate(item.createdAt)}</div>

      <div
        className="ml-auto text-purple-500 hover:text-purple-300"
        onClick={onDeleteMagazine}
      >
        <TrashIcon width={24} />
      </div>
    </div>
  );
}
