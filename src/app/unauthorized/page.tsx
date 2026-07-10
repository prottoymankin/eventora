import { GoShieldX } from "react-icons/go";

const UnauthorizedPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg border border-slate-100">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <GoShieldX className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Access Denied
        </h1>

        <p className="mt-3 text-slate-500">
          Sorry, you don't have permission to access this page.
        </p>

        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
};

export default UnauthorizedPage;