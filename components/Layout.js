import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <Link href="/">
            <a className="text-2xl font-bold">Derby Gigs</a>
          </Link>
          <nav className="space-x-4">
            <Link href="/"><a className="hover:underline">Home</a></Link>
            <Link href="/submit"><a className="hover:underline">Submit</a></Link>
            <Link href="/admin"><a className="hover:underline">Admin</a></Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-100 text-center py-6">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Derby Gigs. Built with ❤️</p>
      </footer>
    </div>
  );
}