import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBC1wj_pjwAzBZPlqK3FTJ8wjmHSiQguW4',
    authDomain: 'mildvu-14a29.firebaseapp.com',
    projectId: 'mildvu-14a29',
    storageBucket: 'mildvu-14a29.appspot.com',
    messagingSenderId: '125265077005',
    appId: '1:125265077005:web:e2eeca42d4ddf5cb324644',
    measurementId: 'G-3S941426QM',
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);
};

export const uploadImage = ({
  file,
  fileName,
  onProgress,
  onFinish,
}: {
  file: File;
  fileName?: string;
  onProgress?: (progress: number) => void;
  onFinish?: (downloadURL: string) => void;
}) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${fileName ?? file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: 'image/jpeg',
  });

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 || 0;
      onProgress?.(progress);
    },
    (error) => {
      console.log(error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      onFinish?.(downloadURL);
    },
  );
};
