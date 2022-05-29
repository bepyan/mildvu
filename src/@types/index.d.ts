import { GetServerSidePropsResult, NextPage } from 'next';

declare module '@types' {
  type DateValue = string | number | Date;

  // ----------------------------------------------------------------
  // Server-Side-Rendering Page
  // ----------------------------------------------------------------

  type SSRPropsResult<T> =
    | GetServerSidePropsResult<T>
    | Promise<GetServerSidePropsResult<T>>;

  /**
   * getServerSideProps의 리턴 타입에서 props 타입을 유추합니다.
   *
   * ↓↓ 사용법 ↓↓
   * ```ts
   * export const getServerSideProps = ({}: GetServerSidePropsContext) => {
   *   return { props: {} };
   * };
   *
   * export const getServerSideProps = withUserSessionSSR(({ user }) => {
   *   return { props: { user }};
   * });
   *
   * export default ({}: SSRProps<typeof getServerSideProps>) => {
   *  //...
   * };
   * ```
   */
  type SSRProps<T> = Awaited<
    Extract<Awaited<ReturnType<T>>, { props: SSRPropsResult }>['props']
  >;

  type SSRPage<T> = NextPage<SSRProps<T>>;

  // ----------------------------------------------------------------
  // Static-Site-Generation Page
  // ----------------------------------------------------------------

  type SSGPropsResult<T> = GetStaticPropsResult<T> | Promise<GetStaticPropsResult<T>>;

  /**
   * getStaticProps의 리턴 타입에서 props 타입을 유추합니다.
   *
   * ↓↓ 사용법 ↓↓
   * ```ts
   * export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
   *   return { props: {} }
   * };
   *
   * export default ({}: SSRProps<typeof getStaticProps>) => {
   *   //...
   * };
   * ```
   */
  type SSGProps<P> = Extract<Awaited<ReturnType<P>>, { props: SSGPropsResult }>['props'];

  type SSGPage<T> = NextPage<SSGProps<T>>;
}
