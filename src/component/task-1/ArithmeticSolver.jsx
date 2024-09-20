import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const ArithmeticSolver = () => {
  const [inputFile, setInputFile] = useState(null);
  const [outputFile, setOutputFile] = useState(null);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    setInputFile(e.target.files[0]);
  };

  const handleSolve = () => {
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const content = event.target.result;
        const lines = content.split('\n');
        const solutions = lines.map((line) => solveExpression(line));
        setResults(solutions);
        generateOutputFile(solutions);
      };
      reader.readAsText(inputFile);
    }
  };

  const solveExpression = (expression) => {
    try {
      const sanitizedExpression = expression.replace('=', '').trim(); // Remove '=' and clean the expression
      const result = math.evaluate(sanitizedExpression); // Solve the expression
      return `${expression.trim()} ${result}`;
    } catch (error) {
      return `${expression.trim()} Error: Invalid Expression`;
    }
  };

  const generateOutputFile = (solutions) => {
    const outputContent = solutions.join('\n');
    const blob = new Blob([outputContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    setOutputFile(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Arithmetic Expression Solver
        </h1>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".txt"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSolve}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Solve
        </button>
        <br />
        {outputFile && (
          <a
            href={outputFile}
            download="output.txt"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download Output File
          </a>
        )}
        <h2 className="text-xl font-semibold text-gray-700 mt-6">Results:</h2>
        <ul className="list-disc list-inside">
          {results.map((result, index) => (
            <li key={index} className="text-gray-600">
              {result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArithmeticSolver;
