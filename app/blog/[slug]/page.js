import styles from "../../../styles/blogpost.module.css";

async function fetchBlogData(slug) {
  const response = await fetch(
    `http://localhost:3000/api/getblog?slug=${slug}`,
    {
      // Important to ensure the fetch request is server-side
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const parsed = await response.json();
  return parsed.data; // Assuming your data structure has the blog content in the `data` property
}

export default async function Blog({ params }) {
  function createMarkup(c) {
    return { __html: c };
  }

  const { slug } = params;

  let blog;
  try {
    blog = await fetchBlogData(slug);
  } catch (error) {
    return <div className={styles.main}>Error: {error.message}</div>;
  }

  if (!blog) {
    return (
      <div className={styles.main}>
        <div>Loading...</div>
      </div>
    ); // Fallback in case blog data is not available
  }

  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.h1}>{blog.title}</h1>
        <div dangerouslySetInnerHTML={createMarkup(blog.description)} />
      </div>
    </main>
  );
}
