interface OutputData {
  time: number;
  blocks: any[];
  version: string;
}

export interface EditorJSBlock {
  id?: string;
  type: string;
  data: any;
}

export const convertEditorJSToHTML = (editorData: OutputData): string => {
  if (!editorData.blocks || editorData.blocks.length === 0) {
    return "";
  }

  const htmlBlocks = editorData.blocks.map((block: EditorJSBlock) => {
    switch (block.type) {
      case "header":
        const level = block.data.level || 2;
        return `<h${level}>${block.data.text}</h${level}>`;

      case "paragraph":
        return `<p>${block.data.text}</p>`;

      case "list":
        const listItems = block.data.items.map((item: string) => `<li>${item}</li>`).join("");
        const listTag = block.data.style === "ordered" ? "ol" : "ul";
        return `<${listTag}>${listItems}</${listTag}>`;

      case "image":
        const caption = block.data.caption ? `<figcaption>${block.data.caption}</figcaption>` : "";
        return `<figure><img src="${block.data.file.url}" alt="${block.data.caption || ""}" />${caption}</figure>`;

      case "quote":
        const author = block.data.caption ? `<cite>${block.data.caption}</cite>` : "";
        return `<blockquote>${block.data.text}${author}</blockquote>`;

      case "delimiter":
        return "<hr />";

      case "table":
        const rows = block.data.content
          .map((row: string[], index: number) => {
            const cells = row
              .map((cell) => {
                const tag = index === 0 && block.data.withHeadings ? "th" : "td";
                return `<${tag}>${cell}</${tag}>`;
              })
              .join("");
            return `<tr>${cells}</tr>`;
          })
          .join("");
        return `<table><tbody>${rows}</tbody></table>`;

      case "code":
        return `<pre><code>${block.data.code}</code></pre>`;

      case "linkTool":
        return `<a href="${block.data.link}" target="_blank" rel="noopener noreferrer">${block.data.meta.title || block.data.link}</a>`;

      default:
        // Handle unknown block types or return raw text
        if (block.data.text) {
          return `<p>${block.data.text}</p>`;
        }
        return "";
    }
  });

  return htmlBlocks.join("");
};

export const convertHTMLToEditorJS = (html: string): OutputData => {
  // This is a simplified conversion. For production, you might want to use a proper HTML parser
  // or handle the conversion on the backend

  if (!html || html.trim() === "") {
    return {
      time: Date.now(),
      blocks: [],
      version: "2.28.2",
    };
  }

  // Simple conversion for basic HTML - you can expand this based on your needs
  const blocks: EditorJSBlock[] = [];

  // Split by common block elements and create paragraph blocks
  const paragraphs = html.split(/<\/?(p|div|br)\s*\/?>/gi).filter((text) => text.trim() !== "");

  paragraphs.forEach((text, index) => {
    const cleanText = text.replace(/<[^>]*>/g, "").trim();
    if (cleanText) {
      blocks.push({
        id: `block_${index}`,
        type: "paragraph",
        data: {
          text: cleanText,
        },
      });
    }
  });

  return {
    time: Date.now(),
    blocks,
    version: "2.28.2",
  };
};
