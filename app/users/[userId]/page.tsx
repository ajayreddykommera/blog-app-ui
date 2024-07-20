import React from "react";

function UserPage({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  return <div>UserPage {params.userId}</div>;
}

export default UserPage;
