import he from 'he';

export function base64Encode(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export function base64Decode(value: string): string {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function urlEncode(value: string): string {
  return encodeURIComponent(value);
}

export function urlDecode(value: string): string {
  return decodeURIComponent(value);
}

export function htmlEntityEncode(value: string): string {
  return he.encode(value);
}

export function htmlEntityDecode(value: string): string {
  return he.decode(value);
}

export async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function decodeJwt(token: string): string {
  const [header, payload] = token.split('.');
  if (!header || !payload) {
    throw new Error('Invalid JWT format');
  }

  const decodedHeader = decodeBase64Url(header);
  const decodedPayload = decodeBase64Url(payload);

  return JSON.stringify(
    {
      header: JSON.parse(decodedHeader),
      payload: JSON.parse(decodedPayload)
    },
    null,
    2
  );
}

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  return base64Decode(padded);
}
