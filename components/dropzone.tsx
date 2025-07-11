'use client';

import React, { useMemo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { CSSProperties } from 'react';
import type { FormFields } from './create-post';

const baseStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle: CSSProperties = { borderColor: '#2196f3' };
const acceptStyle: CSSProperties = { borderColor: '#00e676' };
const rejectStyle: CSSProperties = { borderColor: '#ff1744' };

type DropzoneComponentProps = {
  setValue: (field: keyof FormFields, value: string) => void;
};

export default function DropzoneComponent({ setValue }: DropzoneComponentProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload/', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok && data.imageUrl) {
        setValue('img_link', data.imageUrl);
      } else {
        alert(`Upload error in image: ${data.error || 'unknow error'}`);
      }
    } catch (error) {
      console.error('Requisition error.', error);
      alert('Server upload error.');
    } finally {
      setUploading(false);
    }
  }, [setValue]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [isFocused, isDragAccept, isDragReject]);

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          {uploading
            ? 'Sending image...'
            : 'Drag n drop an image here, or click to select file.'}
        </p>
      </div>
    </div>
  );
}