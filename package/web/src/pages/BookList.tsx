import React, { useState, useMemo } from 'react';
import Input from '../components/Inputs'; 

interface Book {
  title: string;
  description: string;
  author: string;
  price: number;
  stock: number;
}

const BookList: React.FC = () => {
  // Datos simulados
  const [books] = useState<Book[]>([
    {
      title: 'Cronicas de una muerte Anunciada',
      description: 'Escrito por Nicoleta y Gabriel García Márquez',
      author: 'Gabriel García Márquez',
      price: 19.99,
      stock: 10
    },
    {
      title: 'Vinland Saga',
      description: 'Si ves mi nombre quiere decir que soy la autora',
      author: 'Nicolle Rosa',
      price: 29.99,
      stock: 5
    }
  ]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredBooks = useMemo(() => books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm, books]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-700 mb-6 text-center">Book List</h1>
        <div className="mb-6">
          <Input
            name="search"
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            label={''}
          />
        </div>
        <div className="space-y-4">
          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-500">No books found</p>
          ) : (
            filteredBooks.map((book, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-cyan-700">{book.title}</h2>
                <p className="text-gray-600 mt-1"><strong>Autor:</strong> {book.author}</p>
                <p className="text-gray-600 mt-1"><strong>Descripción:</strong> {book.description}</p>
                <p className="text-gray-600 mt-1"><strong>Precio:</strong> ${book.price.toFixed(2)}</p>
                <p className="text-gray-600 mt-1"><strong>Stock:</strong> {book.stock}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookList;
