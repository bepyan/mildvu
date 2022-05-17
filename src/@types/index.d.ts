import { GetServerSidePropsResult, NextPage } from 'next';

declare module '@types' {
  type DateValue = string | number | Date;

  type SSRPropsResult<T> =
    | GetServerSidePropsResult<T>
    | Promise<GetServerSidePropsResult<T>>;

  type SSRProps<T> = Awaited<
    Extract<Awaited<ReturnType<T>>, { props: SSRPropsResult }>['props']
  >;

  type SSRPage<T> = NextPage<SSRProps<T>>;
}
