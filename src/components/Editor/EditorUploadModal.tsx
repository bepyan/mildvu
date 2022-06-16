import Button from '@components/Button';
import Modal from '@components/Modal';
import { useUploadEditorState } from '@stores/editor';
import { useEffect, useState } from 'react';

export function EditorUploadModal() {
  const [effect, setEffect] = useState(false);
  const [timer, setTimer] = useState(-1);
  const { show, loading, imageList } = useUploadEditorState();

  useEffect(() => {
    if (show && !loading && timer === -1) {
      setTimer(3);
    }

    if (timer > 0) {
      const timerId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [show, loading, timer]);

  return (
    <Modal
      show={show}
      title={loading ? '매거진 업로드' : '매거진 생성 완료'}
      content={
        loading
          ? '창을 닫지 말고 잠시만 기다려주세요.'
          : '내 매거진에서 생성한 매거진을 확인할 수 있습니다!'
      }
    >
      <div className="py-4">
        {imageList.map(({ name, progress }) => (
          <div key={name} className="relative py-2">
            <span className="whitespace-nowrap text-gray-700">{name}</span>
            <div className="h-1 w-full bg-gray-200">
              <div
                className="absolute block h-1 rounded-md bg-purple-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        className={`${effect && 'animate-wiggle'}`}
        onClick={() => setEffect(true)}
        onAnimationEnd={() => setEffect(false)}
      >
        {loading ? '로딩중' : `${timer}초 후 페이지를 이동합니다.`}
      </Button>
    </Modal>
  );
}
