'use client';
import { useEffect, useMemo, useState } from 'react';
import { read } from 'fs';
import { AiFillStar } from 'react-icons/ai';

2;

const onReadListChange = (callback) => {
  const getReadList = () => {
    const storedReadList = localStorage.getItem('readList');
    if (storedReadList) {
      const readList = JSON.parse(storedReadList);
      callback(readList);
    }
  };

  window.addEventListener('storage', getReadList);
  getReadList();
  return () => window.removeEventListener('storage', getReadList);
};

export default function IndexClientPage({ books, genres }) {
  const [genre, setGenre] = useState('');
  const [readList, setReadList] = useState([]);

  const matches = useMemo(() => {
    if (!genre) return books;
    return books.filter((book) => {
      if (genre && book.genre !== genre) return false;
      return true;
    });
  }, [genre]);

  const handleBookClick = (book: any) => {
    const data = readList.includes(book)
      ? readList.filter((readBook) => readBook !== book)
      : [...readList, book];

    setReadList(data);

    localStorage.setItem('readList', JSON.stringify(data));
  };

  useEffect(() => {
    // const storedReadList = localStorage.getItem('readList');
    // if (storedReadList) {
    //   setReadList(JSON.parse(storedReadList));
    // }
    const unsuscribe = onReadListChange(setReadList);
    return () => unsuscribe();
  }, []);

  return (
    <article className="grid gap-4">
      <nav>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-neutral-600 p-3 focus:outline-none rounded-lg font-semibold"
        >
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </nav>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
        {matches.map((book) => (
          <li key={book.ISBN}>
            <div className="overflow-hidden">
              <img
                src={book.cover}
                alt={book.title}
                className="aspect-[9/14] object-cover cursor-pointer hover:scale-105 hover:saturate-200 transition-all duration-300"
                onClick={() => handleBookClick(book.ISBN)}
              />
            </div>
            <p className="font-light text-lg text-center flex items-center">
              {readList.includes(book.ISBN) && (
                <AiFillStar className="text-yellow-400 w-10 h-10" />
              )}
              {book.title}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
