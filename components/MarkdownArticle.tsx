import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownArticleProps {
  content: string;
}

export function MarkdownArticle({ content }: MarkdownArticleProps) {
  return (
    <div
      className={`prose prose-invert max-w-none
        prose-headings:font-mono prose-headings:text-white prose-headings:tracking-tight prose-headings:scroll-mt-24
        prose-p:font-sans prose-p:text-neutral-300 prose-p:leading-relaxed
        prose-li:font-sans prose-li:text-neutral-300
        prose-strong:text-red-300
        prose-a:text-red-400 prose-a:font-medium hover:prose-a:text-red-300
        prose-blockquote:border-l-red-500/70 prose-blockquote:bg-neutral-900/60
        prose-blockquote:py-0.5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
        prose-code:before:content-none prose-code:after:content-none
        prose-code:text-cyan-300 prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5
        prose-code:rounded prose-code:border prose-code:border-neutral-800 prose-code:font-normal prose-code:text-xs
        prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-xl
        prose-hr:border-neutral-800`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}