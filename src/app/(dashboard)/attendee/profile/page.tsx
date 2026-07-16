import { getSession } from "@/libs/session";
import Image from "next/image";

const ProfilePage = async () => {
  const user = await getSession();

  return (
    <section className="min-h-screen bg-slate-950 p-6 flex items-center justify-center">
      <div className="mx-auto max-w-3xl w-full">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex flex-col items-center gap-6">
            {/* Avatar */}
            <div className="relative h-32 w-32 border-4 border-indigo-500 object-cover rounded-full overflow-hidden">
              <Image
                src={user?.image || "/avatar.png"}
                alt={user?.name || "User"}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                {user?.name}
              </h2>

              <p className="mt-1 text-slate-400">
                {user?.email}
              </p>

              <span className="mt-4 inline-flex rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-medium capitalize text-indigo-400">
                {user?.role}
              </span>
            </div>

            <div className="h-px w-full bg-slate-800" />

            <div className="grid w-full gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <p className="mt-2 text-lg font-medium text-white">
                  {user?.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Email Address
                </p>

                <p className="mt-2 text-lg font-medium text-white">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Account Role
                </p>

                <p className="mt-2 text-lg font-medium capitalize text-white">
                  {user?.role}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  User ID
                </p>

                <p className="mt-2 break-all text-lg font-medium text-white">
                  {user?.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;