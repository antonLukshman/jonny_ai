export function truncateText(text, maxLength = 50) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// Helper function to create a chat title from the first message
export function createChatTitle(message, maxLength = 30) {
  if (!message) return "New Chat";

  // Try to extract a meaningful title from the first few words
  const words = message.split(" ");
  const title = words.slice(0, 5).join(" ");

  return truncateText(title, maxLength);
}

// Helper function to extract and format code blocks from messages
export function formatCodeBlocks(content) {
  if (!content) return "";

  // Replace code blocks with formatted HTML
  let formattedContent = content.replace(
    /```([a-zA-Z]*)\n([\s\S]*?)```/g,
    '<pre class="bg-background-lighter p-3 rounded-lg overflow-x-auto"><code>$2</code></pre>'
  );

  // Replace inline code with formatted HTML
  formattedContent = formattedContent.replace(
    /`([^`]+)`/g,
    '<code class="bg-background-lighter px-1 rounded">$1</code>'
  );

  return formattedContent;
}

// Helper to safely parse and stringify markdown/code blocks
export function parseMarkdown(content) {
  if (!content) return "";

  // This is a simplified version - in a real app you'd use a markdown library
  // Replace newlines with <br>
  let html = content.replace(/\n/g, "<br>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Code blocks
  html = formatCodeBlocks(html);

  return html;
}
