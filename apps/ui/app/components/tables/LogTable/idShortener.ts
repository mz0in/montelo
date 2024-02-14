import { BadgeColors } from "../../ui/badge";

export const idShortener = (id: string): { short: string; color: BadgeColors } => {
  const short = id.substring(id.length - 4);
  // Simple hash function to convert id to an integer
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  const colorIndex = Math.abs(hash) % 3;
  const colors: BadgeColors[] = ["purple", "blue", "orange"];
  const color = colors[colorIndex];

  return {
    short,
    color,
  };
};
