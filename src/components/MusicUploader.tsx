import React, { useState } from 'react';
import { Upload, Music, X, CheckCircle, AlertCircle } from 'lucide-react';
import { handleMusicUpload } from '../utils/musicLibrary';
import { Track } from './MusicPlayer';

interface MusicUploaderProps {
  onTrackAdded: (track: Track) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MusicUploader: React.FC<MusicUploaderProps> = ({ onTrackAdded, isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadStatus('uploading');
    
    try {
      const file = files[0];
      const track = await handleMusicUpload(file);
      onTrackAdded(track);
      setUploadStatus('success');
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
        setUploadStatus('idle');
      }, 2000);
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-neutral-800 flex items-center">
            <Music className="w-6 h-6 mr-2 text-primary-600" />
            Upload Music
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadStatus === 'idle' && (
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-neutral-800 mb-2">
              Drop your music file here
            </h4>
            <p className="text-neutral-600 mb-4">
              Or click to browse your files
            </p>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              id="music-upload"
            />
            <label
              htmlFor="music-upload"
              className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors cursor-pointer font-medium"
            >
              Choose File
            </label>
            <p className="text-xs text-neutral-500 mt-4">
              Supported formats: MP3, WAV, OGG, M4A
            </p>
          </div>
        )}

        {uploadStatus === 'uploading' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h4 className="text-lg font-medium text-neutral-800 mb-2">
              Processing your music...
            </h4>
            <p className="text-neutral-600">
              Please wait while we prepare your track
            </p>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-neutral-800 mb-2">
              Upload Successful!
            </h4>
            <p className="text-neutral-600">
              Your music has been added to the library
            </p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-neutral-800 mb-2">
              Upload Failed
            </h4>
            <p className="text-neutral-600 mb-4">{errorMessage}</p>
            <button
              onClick={() => setUploadStatus('idle')}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicUploader;