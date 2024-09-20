import React, { useState } from 'react';

const SentenceProcessor = () => {
  const [sentence, setSentence] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [reversedSentence, setReversedSentence] = useState('');
  const [modifiedSentence, setModifiedSentence] = useState('');

  const processSentence = () => {
    const words = sentence.trim().split(/\s+/); // Split sentence into words
    const numWords = words.length; // Count number of words

    const reversedWords = words.slice().reverse().join(' '); // Reverse the order of words
    const hyphenatedSentence = sentence.trim().replace(/\s+/g, '-'); // Replace spaces with hyphens

    // Update state with results
    setWordCount(numWords);
    setReversedSentence(reversedWords);
    setModifiedSentence(hyphenatedSentence);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processSentence();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sentence Processor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Enter a Sentence</label>
            <input
              type="text"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter a sentence"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Process
          </button>
        </form>
        {wordCount > 0 && (
          <div className="mt-4 text-lg text-gray-800">
            <p><strong>Number of words:</strong> {wordCount}</p>
            <p><strong>Reversed sentence:</strong> {reversedSentence}</p>
            <p><strong>Modified sentence:</strong> {modifiedSentence}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentenceProcessor;
