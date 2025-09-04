import React, { useState, useRef } from 'react';
import ImageUploader from './components/ImageUploader';
import DrawingCanvas, { type CanvasHandle } from './components/DrawingCanvas';
import { generateImageFromPose } from './services/geminiService';
import { SparklesIcon, LoadingSpinnerIcon } from './components/icons';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<CanvasHandle>(null);

  const handleGenerateClick = async () => {
    if (!uploadedImage || !canvasRef.current) {
      setError("Please upload an image and draw a pose first.");
      return;
    }

    const poseImage = canvasRef.current.getImageData();
    if (!poseImage) {
      setError("Could not get drawing from the canvas.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateImageFromPose(uploadedImage, poseImage);
      setGeneratedImage(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            AI Pose Animator
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Bring your photos to life. Upload an image, draw a pose, and watch the magic happen.
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-200">1. Upload Your Image</h2>
              <ImageUploader onImageUpload={setUploadedImage} />
            </div>
            <div className="flex flex-col gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-200">2. Draw a Pose</h2>
              <DrawingCanvas ref={canvasRef} />
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleGenerateClick}
              disabled={!uploadedImage || isLoading}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isLoading ? (
                <>
                  <LoadingSpinnerIcon className="mr-3" />
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="mr-3" />
                  Generate New Pose
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="text-center p-4 mb-8 bg-red-900/50 text-red-300 border border-red-700 rounded-lg">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          <div className="w-full p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg">
             <h2 className="text-2xl font-bold text-gray-200 text-center mb-4">3. Result</h2>
             <div className="flex justify-center items-center h-96 bg-gray-900/50 rounded-lg">
                {isLoading && (
                   <div className="text-center text-gray-400">
                     <LoadingSpinnerIcon className="w-12 h-12 mx-auto mb-4"/>
                     <p className="text-lg">AI is working its magic... this may take a moment.</p>
                   </div>
                )}
                {generatedImage && !isLoading && (
                    <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain rounded-lg"/>
                )}
                {!generatedImage && !isLoading && (
                    <p className="text-gray-500">Your generated image will appear here.</p>
                )}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
