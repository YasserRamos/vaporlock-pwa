
const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status = 0, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!API_URL) {
    throw new ApiError(
      "VITE_API_URL no está configurada. Revisa el archivo .env."
    );
  }

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const url = `${API_URL}${normalizedEndpoint}`;

  const headers = new Headers(options.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }

    throw new ApiError(
      `No se pudo conectar con la API: ${url}. Comprueba que el backend esté iniciado, la URL y el certificado HTTPS.`
    );
  }

  if (!response.ok) {
    let details: unknown;

    try {
      details = await response.json();
    } catch {
      details = await response.text().catch(() => null);
    }

    throw new ApiError(
      `Error HTTP ${response.status}: ${response.statusText || "Error del servidor"}`,
      response.status,
      details
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new ApiError(
      `La API devolvió un formato inesperado: ${contentType || "sin Content-Type"}`,
      response.status
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(
      "La API respondió, pero el contenido JSON no es válido.",
      response.status
    );
  }
}
