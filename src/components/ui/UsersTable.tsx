"use client";

import { updateUserRole } from "@/libs/actions/users";
import { User } from "@/types/users";
import { formatDate } from "@/utils/formateDate";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

const UsersTable = ({ users } : { users : User[] }) => {
  const router = useRouter();

  const changeUserRole = async ( id : string , role : string ) => {
    const response = await updateUserRole(id, { role });
    
    if (response.message) {
      toast.success(response.message);
      router.refresh();
    } else {
      toast.danger("An error occurred, try again later.");
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      <table className="min-w-full">
        <thead className="border-b border-slate-800 bg-slate-950">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              User Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Joined On
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Role
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
              Change Role
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user?._id}
              className="border-b border-slate-800 transition-colors hover:bg-slate-800/40"
            >
              {/* User Name */}
              <td className="px-6 py-4 font-medium text-white">{user?.name}</td>

              {/* Email */}
              <td className="px-6 py-4 text-slate-300">{user?.email}</td>

              {/* Joined */}
              <td className="px-6 py-4 text-slate-400">
                {formatDate(user?.createdAt)}
              </td>

              {/* Role */}
              <td className="px-6 py-4 text-slate-400">
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
              </td>

              {/* Change Role */}
              <td className="px-6 py-4 text-center">
                <select
                  value={user?.role}
                  className="cursor-pointer rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-indigo-500"
                  onChange={(e) => changeUserRole(user?._id, e.target.value)}
                >
                  <option value="attendee">Attendee</option>
                  <option value="organizer">Organizer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
