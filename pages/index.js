import Link from 'next/link';
import './globals.css';

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakerestapi.azurewebsites.net/api/v1/Books');
    if (!res.ok) {
      throw new Error('Failed to fetch books');
    }
    const books = await res.json();
    return { props: { books } };
  } catch (error) {
    return { props: { books: [], error: error.message } };
  }
}

export default function Home({ books, error }) {
  if (error) {
    return <p>Error fetching books: {error}</p>;
  }

  return (
    <div>
      <h1>Books List</h1>
      <div className="grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <Link href={`/books/${book.id}`} passHref>
              <h2 style={{ cursor: 'pointer', color: 'blue' }}>{book.title}</h2>
            </Link>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}