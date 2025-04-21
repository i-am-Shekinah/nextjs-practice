import { NextResponse } from 'next/server';

import books, { Book } from '@/app/api/db';

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newBook: Book = {
    id: books.length + 1,
    title: body.title,
    author: body.author,
    publishedYear: body.publishedYear,
  };

  books.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}