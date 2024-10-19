import React from 'react';

const DiaryModal = ({ diary, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out bg-black bg-opacity-70">
      <div className="w-11/12 max-w-lg transition-transform duration-300 transform scale-100 bg-white rounded-lg shadow-2xl hover:scale-105">
        <header className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800">{diary.title}</h2>
          <button className="text-3xl text-red-600 transition-colors hover:text-red-800" onClick={onClose}>
            &times;
          </button>
        </header>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Title:</h3>
            <p className="text-gray-600">{diary.title}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Content:</h3>
            <p className="text-gray-600">{diary.content}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Date:</h3>
            <p className="text-gray-500">{new Date(diary.date).toLocaleDateString()}</p>
          </div>

          {diary.imageUrl && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700">Image:</h3>
              <img src={diary.imageUrl} alt="Diary entry" className="object-cover w-full h-48 transition-transform duration-200 rounded-lg shadow-md hover:scale-105" />
            </div>
          )}

          {diary.audioUrl && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700">Audio:</h3>
              <audio controls className="w-full rounded-lg shadow-md">
                <source src={diary.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default DiaryModal;