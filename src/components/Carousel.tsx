import { useCarousel, useWidth } from '@hooks';
import { cls } from '@libs/client';
import { ContentWithLinker } from '@types';
import { useRef } from 'react';

export interface CarouselInterface {
  className?: string;
  contentList: ContentWithLinker[];
  isDebug?: boolean;
}

export default function Carousel({ className, contentList, isDebug }: CarouselInterface) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideWidth = useWidth(sliderRef);

  const {
    transformStyle,
    transitionStyle,
    moveNext,
    movePrev,
    mouseDownHandler,
    touchStartHandler,
    openPage,
  } = useCarousel({ slideWidth, slideLength: contentList.length });

  return (
    <div className={cls('relative h-full overflow-hidden bg-neutral-900', className)}>
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
                className={cls('relative h-full select-none')}
                style={{ width: slideWidth }}
              >
                {!content.imageURL ? (
                  <div className="h-full w-full bg-stone-400" />
                ) : (
                  <img
                    draggable={false}
                    src={content.imageURL}
                    alt="card-img"
                    className="h-full w-full object-contain"
                  />
                )}

                {content.linkers.map((bt, j) => (
                  <div
                    key={j}
                    onClick={() => openPage(bt.linkURL)}
                    className="absolute cursor-pointer"
                    style={{
                      top: bt.startY + '%',
                      bottom: 100 - bt.endY + '%',
                      left: bt.startX + '%',
                      right: 100 - bt.endX + '%',
                    }}
                  >
                    {isDebug && (
                      <div className="relative h-full w-full bg-purple-500 bg-opacity-50 text-xs text-gray-700">
                        <span className="absolute -left-4 -top-4">
                          ({bt.startX}, {bt.startY})
                        </span>
                        <span className="absolute -right-4 -bottom-4">
                          ({bt.endX}, {bt.endY})
                        </span>
                      </div>
                    )}
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
