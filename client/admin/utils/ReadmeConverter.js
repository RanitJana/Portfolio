import { marked } from "marked";
import DOMPurify from "dompurify";

export default function getMarkdownText(data) {
  if (!data) return { __html: "" }; // Safety check

  const rawMarkup = marked(data); // Parse markdown to HTML
  const sanitizedMarkup = DOMPurify.sanitize(rawMarkup); // Sanitize the HTML

  return { __html: sanitizedMarkup }; // Return sanitized HTML
}
