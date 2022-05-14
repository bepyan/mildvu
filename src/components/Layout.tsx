import { cls } from '@libs/client';

export interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
}

export const Layout = ({ className, children }: LayoutProps) => {
  return <div className={cls(className)}>{children}</div>;
};
