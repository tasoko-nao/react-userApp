/* eslint-disable react-hooks/exhaustive-deps */
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { getUsers, loading, users } = useAllUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedUser, onSelectUser } = useSelectUser();

  const { loginUser } = useLoginUser();

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users]
  );

  useEffect(() => getUsers(), []);
  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClickOpen={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        isOpen={isOpen}
        isAdmin={loginUser?.isAdmin}
        onClose={onClose}
        user={selectedUser}
      />
    </>
  );
});
