import { useCarousel, useWidth } from '@hooks';
import { cls } from '@libs/client';
import { ContentWithLinker } from '@types';
import { useRef } from 'react';

export interface CarouselInterface {
  className?: string;
  contentList: ContentWithLinker[];
}

export default function Carousel({ className, contentList }: CarouselInterface) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideWidth = useWidth(sliderRef);

  const {
    transformStyle,
    transitionStyle,
    moveNext,
    movePrev,
    mouseDownHandler,
    touchStartHandler,
  } = useCarousel({ slideWidth, slideLength: contentList.length });

  const openPage = (url: string) => window.open(url, '_blank');

  return (
    <div className={cls('relative h-full overflow-hidden', className)}>
      <div
        ref={sliderRef}
        className="absolute flex h-full w-full"
        style={{ ...transformStyle, ...transitionStyle }}
        onMouseDown={mouseDownHandler}
        onTouchStart={touchStartHandler}
      >
        {contentList.map((content, i) => {
          return (
            <div key={i} className="w-full">
              <div
                className="relative h-full max-h-[700px] select-none"
                style={{ width: slideWidth }}
              >
                {!content.imageURL ? (
                  <div className="h-full w-full bg-stone-400" />
                ) : (
                  <img
                    draggable={false}
                    src={content.imageURL}
                    alt="card-img"
                    className="h-full w-full object-cover"
                  />
                )}

                {content.linkers.map((bt, j) => (
                  <div
                    key={j}
                    onClick={() => openPage(bt.linkURL)}
                    className="absolute"
                    style={{
                      top: bt.startY + '%',
                      bottom: 100 - bt.endY + '%',
                      left: bt.startX + '%',
                      right: 100 - bt.endY + '%',
                    }}
                  >
                    <img
                      draggable={false}
                      src={bt.linkURL}
                      alt="bt-img"
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
  );
}
