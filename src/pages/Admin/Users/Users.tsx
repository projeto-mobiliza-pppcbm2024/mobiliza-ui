import React, { useEffect, useState } from "react";
import AdminUser from "../../../components/Admin/User/User";
import { fetchUsers } from "../../../services/userService";
import { UserData } from "../../../types/userTypes";

const AdminUsers: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setData(users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    getUsers();
  }, []);

  return (
    <section className="container bg-c00 mt-[120px] rounded-xl shadow-custom">
      <div className="px-[40px] py-[60px] text-c07">
        <h2 className="section-title">Usuários</h2>
        <ul className="mt-[3.75rem]">
          {data?.map((user) => (
            <AdminUser
              id={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              isAdmin={user.isAdmin}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AdminUsers;
