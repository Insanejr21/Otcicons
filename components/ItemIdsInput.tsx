import React from 'react';

interface ItemIdsInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ItemIdsInput: React.FC<ItemIdsInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="itemIdsInput" className="block mb-2">
        IDs DOS ITENS (separados por vírgula):
      </label>
      <input
        type="text"
        id="itemIdsInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex: 3050, 3051, 3052"
        className="w-full tibia-sunken p-2 text-gray-200 focus:outline-none placeholder:text-gray-500"
      />
    </div>
  );
};
