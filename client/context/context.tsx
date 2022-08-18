import { Loader } from '@mantine/core';
import { createContext, ReactNode, useContext } from 'react';
import { useQuery } from 'react-query';
import { getUser } from '../api';
import { QueryKeys, User } from '../types';

const UserContext = createContext({});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useQuery(QueryKeys.user, getUser);

  return (
    <UserContext.Provider value={{ user: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
