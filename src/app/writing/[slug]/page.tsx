import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link
        href="/#writing"
        className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Writing
      </Link>
      
      <article className="prose prose-invert max-w-none">
        <header className="mb-12 space-y-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-heading leading-[1.1]">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border/40 pb-8">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="text-border/60">•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="space-y-12">
          <p className="text-2xl leading-relaxed text-foreground/90 font-medium italic border-l-4 border-primary/40 pl-8 py-4 bg-primary/5 rounded-r-2xl">
            {post.excerpt}
          </p>
          
          <div 
            className="prose prose-invert max-w-none 
              prose-p:text-xl prose-p:leading-relaxed prose-p:text-muted-foreground/90 
              prose-li:text-xl prose-li:leading-relaxed prose-li:text-muted-foreground/90 
              prose-strong:text-foreground prose-strong:font-bold
              prose-headings:font-heading prose-headings:text-foreground
              prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </article>
    </div>
  );
}
