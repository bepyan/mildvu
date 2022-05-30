import Button from '@components/Button';
import Layout from '@components/Layout';
import { useCarousel, useWidth } from '@hooks';
import { useRef } from 'react';

const imgs = [
  {
    imageURL:
      'https://www.nemopan.com/files/attach/images/6294/386/211/014/a04168af65afb12afa1936a98d372e1d.jpeg',
    buttons: [
      {
        startX: 10,
        startY: 80,
        endX: 90,
        endY: 90,
        linkURL:
          'https://kr.seaicons.com/wp-content/uploads/2017/02/Perspective-Button-Stop-icon.png',
      },
    ],
  },
  {
    imageURL:
      'https://www.nemopan.com/files/attach/images/6294/386/211/014/542dea3664436d543c3f273cea26dbda.jpeg',
    buttons: [],
  },
  {
    imageURL:
      'https://www.nemopan.com/files/attach/images/6294/386/211/014/f2b6641879ea73de2fac8c957b624740.jpeg',
    buttons: [],
  },
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
    <Layout title="preview">
      <div className="relative flex-1 overflow-hidden">
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
                <div className="relative select-none" style={{ width: slideWidth }}>
                  <img
                    src={v.imageURL}
                    draggable={false}
                    alt="card-imgs"
                    className="h-full w-full object-cover"
                  />

                  {v.buttons.map((bt, j) => (
                    <div
                      key={j}
                      className="absolute"
                      style={{
                        top: bt.startY + '%',
                        bottom: 100 - bt.endY + '%',
                        left: bt.startX + '%',
                        right: 100 - bt.endY + '%',
                      }}
                    >
                      <img
                        src={bt.linkURL}
                        draggable={false}
                        alt="bt-imgs"
                        className="h-full w-full cursor-pointer object-fill"
                      />
                    </div>
                  ))}
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
