/**
 * Template literal type utilities.
 *
 * These types extract `${variable}` placeholders from route strings at the
 * TYPE level, so TypeScript can enforce that you pass the correct pathParams.
 *
 * Example:
 *   "/events/${eventId}" → requires { eventId: string }
 *   "/events"            → requires nothing
 */

/**
 * Recursively extracts variable names from a template string type.
 *
 * @example
 * ExtractVariables<"/users/${userId}/posts/${postId}">
 * // → "userId" | "postId"
 *
 * ExtractVariables<"/users">
 * // → never
 */
export type ExtractVariables<T extends string> =
  T extends `${string}\${${infer Var}}${infer Rest}`
    ? Var | ExtractVariables<Rest>
    : never;

/**
 * Builds a record type requiring string values for each extracted variable.
 *
 * @example
 * TemplateVariables<"/users/${userId}">
 * // → { userId: string }
 */
export type TemplateVariables<T extends string> = {
  [K in ExtractVariables<T>]: string;
};

/**
 * Boolean check: does this string type contain any `${...}` variables?
 */
export type HasVariables<T extends string> =
  ExtractVariables<T> extends never ? false : true;

// ─── Utility: general string-keyed record ─────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StringRecord = Record<string, any>;
