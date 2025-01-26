import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FormattedMedicalTextProps {
  text: string;
}

export default function FormattedMedicalText({ text }: FormattedMedicalTextProps) {
  const cleanText = useMemo(() => {
    // Clean up the text and ensure proper markdown formatting
    return text
      .replace(/\[Object\]/g, '')
      .replace(/^\* /gm, '- ') // Convert * bullets to - for markdown
      .replace(/\*\*(.*?)\*\*/g, '**$1**') // Ensure bold syntax is correct
      .trim();
  }, [text]);

  return (
    <div className="prose prose-gray max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customize heading styles
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mb-3">{children}</h2>
          ),
          // Customize paragraph styles
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
          // Customize list styles
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          // Customize bold text
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900">{children}</strong>
          ),
        }}
      >
        {cleanText}
      </ReactMarkdown>
    </div>
  );
} 