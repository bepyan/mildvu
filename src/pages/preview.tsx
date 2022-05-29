import Button from '@components/Button';
import Layout from '@components/Layout';
import { useCarousel, useWidth } from '@hooks';
import { useRef } from 'react';

const imgs = [
  'https://www.nemopan.com/files/attach/images/6294/386/211/014/a04168af65afb12afa1936a98d372e1d.jpeg',
  'https://www.nemopan.com/files/attach/images/6294/386/211/014/542dea3664436d543c3f273cea26dbda.jpeg',
  'https://www.nemopan.com/files/attach/images/6294/386/211/014/f2b6641879ea73de2fac8c957b624740.jpeg',
];

export default () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideWidth = useWidth(sliderRef);

  const {
    transformStyle,
    transitionStyle,
    moveNext,
    movePrev,
    mouseDownHandler,
    touchStartHandler,
  } = useCarousel({ slideWidth, slideLength: imgs.length });

  return (
    <Layout title="preview" className="pt-16 ">
      <div className=" text-center">
        <h1 className="text-5xl font-bold text-purple-500">Mildvu</h1>
      </div>

      <div className="relative mt-16 h-[700px] w-full overflow-hidden">
        <div
          ref={sliderRef}
          className="absolute flex h-full w-full"
          style={{ ...transformStyle, ...transitionStyle }}
          onMouseDown={mouseDownHandler}
          onTouchStart={touchStartHandler}
        >
          {imgs.map((v, i) => {
            return (
              <div key={i} className="w-full">
                <div
                  className="pointer-events-none select-none"
                  style={{ width: slideWidth }}
                >
                  <img
                    src={v}
                    alt="card-imgs"
                    className="max-h-max max-w-max object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button className="mt-2" onClick={movePrev}>
        prev
      </Button>
      <Button className="mt-2" onClick={moveNext}>
        next
      </Button>
    </Layout>
  );
};
