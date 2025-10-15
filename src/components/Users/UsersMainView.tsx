import React from "react";
import UserPanel from "./UserPanel";

export default function UsersMainView() {
  return (
    <main style={{ paddingRight: "2%", color: "#0c0c0cff" }}>
      <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>Users</h2>
      <UserPanel />
    </main>
  );
}
