import { Button, Layout } from '@components';
import { useMemo, useState } from 'react';

const imgs = [
  'https://www.nemopan.com/files/attach/images/6294/386/211/014/a04168af65afb12afa1936a98d372e1d.jpeg',
  'https://www.nemopan.com/files/attach/images/6294/386/211/014/f2b6641879ea73de2fac8c957b624740.jpeg',
  'https://www.nemopan.com/files/attach/images/6294/386/211/014/542dea3664436d543c3f273cea26dbda.jpeg',
];

export default () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const transformStyle = useMemo(
    () => ({
      transform: `translateX(${-100 * (currentIndex + 1)}%)`,
      transition: `transform 300ms ease-in-out 0s`,
    }),
    [currentIndex],
  );

  const mouseMoveHandler = (e: MouseEvent) => {
    console.log(e.pageX);
  };
  const mouseDownHandler = () => {
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', mouseMoveHandler),
    );
  };

  const touchMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log(e.changedTouches[0].pageX);
  };

  return (
    <Layout title="preview" className="pt-16 ">
      <div className=" text-center">
        <h1 className="text-5xl font-bold text-purple-500">Mildvu</h1>
      </div>

      <div className="relative mt-16 h-[700px] w-full overflow-hidden">
        <div
          className="absolute flex h-full w-full"
          style={transformStyle}
          onMouseDown={mouseDownHandler}
          onTouchMove={touchMoveHandler}
        >
          {imgs.map((v, i) => {
            return (
              <div key={i} className="h-full w-full" data-index={i - 1}>
                <div className="pointer-events-none w-[576px] select-none">
                  <img src={v} alt="" className=" h-auto w-full " />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button className="mt-2" onClick={() => setCurrentIndex((v) => v - 1)}>
        prev
      </Button>
      <Button className="mt-2" onClick={() => setCurrentIndex((v) => v + 1)}>
        next
      </Button>
    </Layout>
  );
};
