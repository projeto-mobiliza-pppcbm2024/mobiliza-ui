import React from "react";
import AdminUsers from "../Users/Users";

const AdminDashboard: React.FC = () => {
  return (
    <section className="container bg-c00 mt-[120px]">
      <AdminUsers />
    </section>
  );
};

export default AdminDashboard;
