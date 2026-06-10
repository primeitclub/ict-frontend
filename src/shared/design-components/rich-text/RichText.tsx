import DOMPurify from "dompurify";
import { cn } from "../../utils/cn";

interface RichTextProps {
  /** Trusted-ish HTML string from the backend (already sanitized server-side). */
  html: string | null | undefined;
  className?: string;
}

/**
 * Renders backend HTML safely. The single place in the app allowed to use
 * `dangerouslySetInnerHTML` — DOMPurify strips anything executable first, so a
 * change/compromise on the server can't turn into stored XSS in the browser
 * (defense-in-depth; the server is still expected to sanitize too).
 */
const RichText = ({ html, className }: RichTextProps) => {
  if (!html) return null;
  const clean = DOMPurify.sanitize(html);
  return (
    <div
      className={cn(className)}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};

export default RichText;
