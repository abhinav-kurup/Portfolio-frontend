import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts(); // Replace with your data fetching logic
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetchPostBySlug(params?.slug as string); // Replace with your data fetching logic

  return {
    props: {
      post,
    },
  };
};

export default function BlogPost() {ost({ post }) {
  const router = useRouter();  const router = useRouter();
  const { slug } = router.query;query;

  const [isClient, setIsClient] = useState(false);onst [fetchedPost, setFetchedPost] = useState(post);

  useEffect(() => {t(() => {
    setIsClient(true);lug) {
  }, []);a when the component mounts
lug}`)
  if (!isClient) {
    return null; // Prevent rendering on the serverhen((data) => setFetchedPost(data));
  }}
 }, [slug]);
  return (







}  );    </div>      <button onClick={() => router.back()}>Go Back</button>      <h1>Blog Post: {slug}</h1>    <div>  if (!fetchedPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{fetchedPost.title}</h1>
      <p>{fetchedPost.content}</p>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
}
