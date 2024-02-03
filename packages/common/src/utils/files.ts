import { basename, relative } from "path";

export const getRelativePath = (from: string, to: string): string => {
  // Get the relative path
  let relativePath = relative(from, to);

  // Replace backslashes with forward slashes for cross-platform compatibility
  relativePath = relativePath.replace(/\\/g, "/");

  // Ensure the path starts with './' if it's not already an absolute or relative path
  if (!relativePath.startsWith(".") && !relativePath.startsWith("/")) {
    relativePath = "./" + relativePath;
  }

  return relativePath;
};

export const getFirstPartOfFilename = (filename: string): string => {
  // Check if the filename starts with './' or '../'
  const hasDotSlash = filename.startsWith("./");
  const hasDotDotSlash = filename.startsWith("../");

  // Extract the base filename
  const baseFilename = basename(filename);

  // Split the base filename by dots and get the first part
  const firstPart = baseFilename.split(".")[0];

  // Prepend './' or '../' if necessary
  if (hasDotSlash) {
    return `./${firstPart}`;
  } else if (hasDotDotSlash) {
    return `../${firstPart}`;
  }

  return firstPart;
};
