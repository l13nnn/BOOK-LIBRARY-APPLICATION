import Link from 'next/link';

export async function getStaticPaths() {
  const paths = Array.from({ length: 10 }, (_, i) => ({ params: { id: (i + 1).toString() } }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://fakerestapi.azurewebsites.net/api/v1/Books/${params.id}`);
    console.log("Response status:", res.status);
    if (!res.ok) {
      return { notFound: true };
    }
    const book = await res.json();
    console.log("Book data:", book); 
    return { props: { book }, revalidate: 60 };
  } catch (error) {
    console.error("Error fetching book:", error);
    return { notFound: true };
  }
}

export default function BookDetail({ book }) {
  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Published: {book.publish_date}</p>
      <p>Pages: {book.page_count}</p>
      <p>{book.description}</p>
      <Link href="/" passHref>
        <p style={{ cursor: 'pointer', color: 'blue' }}>← Back to Home</p>
      </Link>
    </div>
  );
}