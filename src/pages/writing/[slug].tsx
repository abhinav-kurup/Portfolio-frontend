import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { blogPosts } from "@/data/blog";
import type { BlogPost } from "@/lib/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = blogPosts.find((p) => p.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default function BlogPostPage({ post }: { post: BlogPost }) {
  const router = useRouter();

  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <button 
        onClick={() => router.back()}
        className="group mb-12 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span> 
        Go Back
      </button>
      
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
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="text-xl leading-relaxed text-muted-foreground/90">
          <p className="mb-8 font-medium text-foreground/80">
            {post.excerpt}
          </p>
          
          <div className="mt-16 space-y-8 border-t border-border/40 pt-16">
            <p>
              Designing a high-performance backend architecture requires more than just picking a language; 
              it involves understanding the entire data lifecycle. In this post, we explore how {post.title} 
              leverages modern patterns to solve complex engineering challenges.
            </p>
            
            <p>
              Whether it&apos;s managing vector embeddings in a RAG pipeline or optimizing distributed task 
              queues, the goal remains the same: building systems that are both resilient and performant.
            </p>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 italic">
              Note: This is a technical summary of the project. For a deep dive into the implementation 
              details and source code, please check the corresponding GitHub repository linked in the Projects section.
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
