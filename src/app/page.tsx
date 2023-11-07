import data from '../books.json';
import IndexClientPage from './client';

export default async function IndexPage() {
  const books = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        import('../books.json').then((data) =>
          data.library.map((data) => data.book),
        ),
      );
    }, 3000);
  });

  const genres = Array.from(new Set(books.map((book) => book.genre)));
  return <IndexClientPage books={books} genres={genres} />;
}
