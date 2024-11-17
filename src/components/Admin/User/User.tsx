import { TrashIcon } from "@heroicons/react/16/solid";
import React from "react";
import { UserData } from "../../../types/userTypes";

const AdminUser: React.FC<UserData> = ({ id, name, email, phone, isAdmin }) => {
  return (
    <li className="flex px-[0.75rem] py-[1.25rem] gap-[8px] justify-between">
      <p>{id}</p>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{isAdmin}</p>
      <button>
        <TrashIcon className="h-6 w-6 inline-block" />
      </button>
    </li>
  );
};

export default AdminUser;
