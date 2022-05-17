import { GetServerSidePropsResult, NextPage } from 'next';

declare module '@types' {
  type DateValue = string | number | Date;

  // Server-Side-Rendering
  // ----------------------------------------------------------------

  type SSRPropsResult<T> =
    | GetServerSidePropsResult<T>
    | Promise<GetServerSidePropsResult<T>>;

  type SSRProps<T> = Awaited<
    Extract<Awaited<ReturnType<T>>, { props: SSRPropsResult }>['props']
  >;

  type SSRPage<T> = NextPage<SSRProps<T>>;

  // Static-Site-Generation
  // ----------------------------------------------------------------

  type SSGPropsResult<T> = GetStaticPropsResult<T> | Promise<GetStaticPropsResult<T>>;

  type SSGProps<P> = Extract<Awaited<ReturnType<P>>, { props: SSGPropsResult }>['props'];

  type SSGPage<T> = NextPage<SSGProps<T>>;
}
