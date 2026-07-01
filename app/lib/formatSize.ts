// Utility to format a size in bytes to a human-readable string (KB, MB, GB)
// Uses binary units (powers of 1024). Defaults to 1 decimal place for KB and above.

export function formatSize(bytes: number, fractionDigits: number = 1): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"] as const; // limit to GB per requirement
  let i = 0;
  let value = bytes;

  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }

  const digits = i === 0 ? 0 : Math.max(0, Math.min(6, Math.floor(fractionDigits)));
  return `${value.toFixed(digits)} ${units[i]}`;
}

export default formatSize;

export const generateUUID: ()=> Crypto = () => crypto.randomUUID();