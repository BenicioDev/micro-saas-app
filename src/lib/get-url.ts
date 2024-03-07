export function getUrl(path?: String) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ""; // variavel ambiente
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path || ""; // Normaliza 
  return `${baseUrl}${normalizedPath}`;
}
