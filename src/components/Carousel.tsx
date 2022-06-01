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
  } = useCarousel({ slideWidth, slideLength: contentList.length });

  const openPage = (url: string) => {
    if (!url) return alert('유효하지 않는 링크입니다.');

    const isFullUrl = url.startsWith('http://');
    window.open(isFullUrl ? url : `http://${url}`, '_blank');
  };

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
                    className="absolute cursor-pointer"
                    style={{
                      top: bt.startY + '%',
                      bottom: 100 - bt.endY + '%',
                      left: bt.startX + '%',
                      right: 100 - bt.endX + '%',
                    }}
                  >
                    {isDebug && (
                      <div className="relative h-full w-full bg-orange-500 text-xs opacity-50">
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
