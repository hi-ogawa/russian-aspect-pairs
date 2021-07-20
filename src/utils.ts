export type Result<T, E> =
  | { readonly ok: true; data: T }
  | { readonly ok: false; data: E };

export function Ok<T, E>(data: T): Result<T, E> {
  return { ok: true, data };
}

export function Err<T, E>(data: E): Result<T, E> {
  return { ok: false, data };
}

export type Option<T> = T | undefined;
