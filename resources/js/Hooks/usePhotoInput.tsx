import { Nullable } from '@/types';
import React, { useRef, useState } from 'react';

export default function usePhotoInput({
  initial = null,
}: { initial?: Nullable<string> } = {}) {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initial);
  const [value, setValue] = useState<File | null>(null);

  function openFilePicker() {
    ref.current?.click();
  }

  function onRemove() {
    setPreview(null);
    setValue(null);
  }

  function onFileChanged() {
    const photo = ref.current?.files?.[0];
    if (!photo) {
      return;
    }
    setValue(photo);
    const reader = new FileReader();
    reader.onload = e => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(photo);
  }

  return {
    ref,
    preview,
    openFilePicker,
    onRemove,
    onFileChanged,
    value,
    input: (
      <input
        type="file"
        className={'hidden'}
        ref={ref}
        onChange={onFileChanged}
      />
    ),
  };
}
