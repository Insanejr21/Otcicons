import React from 'react';

interface ResultDisplayProps {
  result: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <pre
      id="resultado"
      className={`tibia-sunken p-2 w-full text-gray-100 whitespace-pre-wrap break-all min-h-[180px] overflow-auto max-h-72`}
    >
      {result}
    </pre>
  );
};
