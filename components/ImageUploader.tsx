import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileChange(file);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <div className="w-full h-full">
      <input
        type="file"
        id="imageUpload"
        className="hidden"
        accept="image/*"
        onChange={onFileSelect}
      />
      <label
        htmlFor="imageUpload"
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="flex flex-col justify-center items-center w-full h-80 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700/50 hover:border-gray-500 transition-colors"
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
        ) : (
          <div className="text-center text-gray-400">
            <UploadIcon className="mx-auto mb-4"/>
            <p className="font-semibold">Click to upload or drag and drop</p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
