export const MacroType = {
  ITEM: 'item',
  OUTFIT: 'outfit',
} as const;

export type MacroType = typeof MacroType[keyof typeof MacroType];
