import { NextResponse } from 'next/server';
import blogs from '../../data/blogs.json';

export function GET() {
  return NextResponse.json(blogs);
}
