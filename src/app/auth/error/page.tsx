'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
      <div className="bg-red-50 border border-red-200 rounded p-4">
        {error === 'OAuthAccountNotLinked' ? (
          <p>
            This email is already associated with an account using a different sign-in method.
            Please sign in using your original authentication method.
          </p>
        ) : (
          <p>An error occurred during authentication. Please try again.</p>
        )}
      </div>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
} 