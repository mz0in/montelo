import { BadgeColors } from "../../ui/badge";

export const idShortener = (id: string): { short: string; color: BadgeColors } => {
  const short = id.substring(id.length - 4);

  // Improved hash function
  let hash = 0;
  for (let i = 0; i < id.length / 2; i++) {
    hash = hash * 31 + id.charCodeAt(i);
    hash &= hash; // Keep it to 32-bit integer
  }

  // Ensuring we deal with positive hash values
  hash = Math.abs(hash);

  const colors: BadgeColors[] = ["purple", "blue", "orange", "green", "red", "yellow"];
  const colorIndex = hash % colors.length;
  const color = colors[colorIndex];

  return {
    short,
    color,
  };
};
