import { NextResponse } from 'next/server';

import books, { Book } from '@/app/api/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id: number = parseInt(params.id, 10);
  const book = books.find((book) => book.id === id);
  if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id: number = parseInt(params.id, 10);
  const body = await request.json();
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  const updatedBook: Book = {
    id: id,
    title: body.title,
    author: body.author,
    publishedYear: body.publishedYear,
  }
  return NextResponse.json(updatedBook, { status: 200 });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id: number = parseInt(params.id, 10);
  const body = await request.json();
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) return NextResponse.json({ error: 'Book not found' }, { status: 404 });

  // conditional updates
  if (body.title) books[bookIndex].title = body.title;
  if (body.author) books[bookIndex].author = body.author;
  if (body.publishedYear) books[bookIndex].publishedYear = body.publishedYear;

  return NextResponse.json(books[bookIndex], { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id: number = parseInt(params.id, 10);
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  books.splice(bookIndex, 1);
  return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });
}