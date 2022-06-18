import { useMemo, useState } from 'react';

interface useCarouselProps {
  slideWidth: number;
  slideLength: number;
}

const clientXmapper = {
  mouse: (e: any) => e.clientX,
  touch: (e: any) => e.changedTouches[0].clientX,
};

const SLIDE_MOVE_MIN_X = 150;

export const useCarousel = ({ slideWidth, slideLength }: useCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  const moveNext = () => setCurrentIndex((i) => (i >= slideLength - 1 ? i : i + 1));
  const movePrev = () => setCurrentIndex((i) => (i <= 0 ? i : i - 1));

  const moveHandler = (type: keyof typeof clientXmapper, startX: number) => {
    return (e: any) => {
      const endX = clientXmapper[type](e) - startX;
      const isNextSlide = endX < 0;
      const nextX = Math.min(Math.abs(endX), slideWidth);

      setTransX(isNextSlide ? -nextX : nextX);
    };
  };

  const endHandler = (
    type: keyof typeof clientXmapper,
    startX: number,
    moveHander: (e: any) => void,
  ) => {
    return (e: any) => {
      const endX = clientXmapper[type](e) - startX;
      const isNextSlide = endX < 0;

      if (Math.abs(endX) > SLIDE_MOVE_MIN_X) {
        isNextSlide ? moveNext() : movePrev();
      }

      setTransX(0);
      document.removeEventListener(`${type}move`, moveHander);
    };
  };

  return {
    transformStyle: useMemo(
      () => ({
        transform: `translateX(${-slideWidth * currentIndex + transX}px)`,
      }),
      [slideWidth, currentIndex, transX],
    ),
    transitionStyle: useMemo(
      () => ({
        transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
      }),
      [transX],
    ),
    moveNext,
    movePrev,
    mouseDownHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const startX = clientXmapper.mouse(e);
      const mouseMoveHandler = moveHandler('mouse', startX);

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener(
        'mouseup',
        endHandler('mouse', startX, mouseMoveHandler),
        {
          once: true,
        },
      );
    },
    touchStartHandler: (e: React.TouchEvent<HTMLDivElement>) => {
      const startX = clientXmapper.touch(e);
      const touchMoveHandler = moveHandler('touch', startX);

      document.addEventListener('touchmove', touchMoveHandler);
      document.addEventListener(
        'touchend',
        endHandler('touch', startX, touchMoveHandler),
        {
          once: true,
        },
      );
    },
    openPage: (url: string) => {
      if (!url) return alert('유효하지 않는 링크입니다.');

      const isFullUrl = url.startsWith('https://');
      window.open(isFullUrl ? url : `https://${url}`, '_blank');
    },
  };
};
