import { useRef, useState } from 'react';

export default function usePhotoInput({ initial }: { initial: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initial);

  return {
    ref,
    preview,
    openFilePicker() {
      ref.current?.click();
    },
    onRemove() {
      setPreview(null);
    },
    onFileChanged() {
      const photo = ref.current?.files?.[0];
      if (!photo) {
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(photo);
    },
  };
}
