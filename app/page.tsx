"use client";

import { useSession, signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Welcome
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Please sign in to continue
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/sign-in"
              className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Sign in
            </a>
            <a
              href="/sign-up"
              className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md space-y-8 px-4 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Welcome, {session.user.name}!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {session.user.email}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Session Info
          </h2>
          <dl className="space-y-3 text-left text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500 dark:text-zinc-400">User ID</dt>
              <dd className="font-mono text-black dark:text-white">
                {session.user.id.slice(0, 8)}...
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500 dark:text-zinc-400">
                Email Verified
              </dt>
              <dd className="text-black dark:text-white">
                {session.user.emailVerified ? "Yes" : "No"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500 dark:text-zinc-400">
                Session Expires
              </dt>
              <dd className="text-black dark:text-white">
                {new Date(session.session.expiresAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
