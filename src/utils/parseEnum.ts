export function parseEnum<T extends Record<string, string>>(
  enumObj: T,
  value: unknown
): T[keyof T] | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim().toUpperCase();
  return (Object.values(enumObj) as string[]).includes(v) ? (v as any) : undefined;
}