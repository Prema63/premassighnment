import React, { useState } from 'react';

const PalindromeChecker = () => {
  const [inputString, setInputString] = useState('');
  const [result, setResult] = useState('');

  const checkPalindrome = (str) => {
    const sanitizedString = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); // Remove non-alphanumeric characters and convert to lowercase
    const reversedString = sanitizedString.split('').reverse().join(''); // Reverse the string
    return sanitizedString === reversedString; // Check if original string is the same as reversed string
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputString.trim() === '') {
      setResult('Please enter a valid string.');
      return;
    }

    const isPalindrome = checkPalindrome(inputString);
    if (isPalindrome) {
      setResult(`The string ‘${inputString}’ is a palindrome.`);
    } else {
      setResult(`The string ‘${inputString}’ is not a palindrome.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Palindrome Checker</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Enter a String</label>
            <input
              type="text"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter a string"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Check
          </button>
        </form>
        {result && (
          <div className="mt-4 text-lg text-gray-800">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default PalindromeChecker;
