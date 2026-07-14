import UsersTable from "@/components/ui/UsersTable";
import { getUsers } from "@/libs/api/users";
import { User } from "@/types/users";

const AllUsersPage = async () => {
  const { users } : { users : User[] } = await getUsers();

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Users
          </h1>

          <p className="mt-1 text-slate-400">
            Manage all registered users.
          </p>
        </div>
      </div>

      {/* Table */}
      <UsersTable users={users} />
    </div>
  );
};

export default AllUsersPage;