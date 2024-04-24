import React, { useEffect } from "react";
import { Collapse } from "antd";
import { notify } from "../../utils/toast";
import { useAppSelector } from "../../store/store";
import { User } from "../../interfaces/index";
import { UserItem } from "./UserItem";
import { Loader, EmptyState } from "../../shared";

export const Users = () => {
  const users = useAppSelector((state) => state.user.users);
  const status = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);

  useEffect(() => {
    if (status === "failed" && error) {
      notify("error", error);
    }
  }, [status, error]);

  if (status === "pending") return <Loader />;

  if (!users.length) return <EmptyState />;

  return (
    <>
      <Collapse>
        {users.map((user: User) => (
          <Collapse.Panel header={user.name} key={user.id}>
            <UserItem user={user} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  );
};
