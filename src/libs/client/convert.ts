interface PreviewToFileProps {
  preview: string;
  /**
   * 파일 확장자 불필요
   */
  fileName?: string;
  onSuccess?: (file: File) => void;
  onError?: (e: any) => void;
}

export const previewToFile = async (props: PreviewToFileProps) => {
  try {
    const blobFile = await fetch(props.preview).then((file) => file.blob());

    const type = blobFile.type.split('/')[1];
    const fileName = `${props.fileName ?? 'tmp'}.${type ?? 'png'}`;
    const file = new File([blobFile], fileName, { type: blobFile.type });

    props.onSuccess?.(file);
    return file;
  } catch (e) {
    console.error(e);
    props.onError?.(e);
  }
};
