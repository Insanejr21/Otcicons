import React from 'react';

interface MacroInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const MacroInput: React.FC<MacroInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="macroInput" className="block mb-2">
        INSIRA SUA MACRO ABAIXO:
      </label>
      <textarea
        id="macroInput"
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex: say('exura gran mas res')"
        className="w-full tibia-sunken p-2 text-gray-200 resize-y min-h-[120px] focus:outline-none placeholder:text-gray-500"
      />
    </div>
  );
};
