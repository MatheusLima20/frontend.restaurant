import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Logout } from '../screens/logout';
import { UserDataLogged } from '../types/user/user';
import { Login } from '../screens/login';
import { SystemNavigation } from '../screens/system/system.navigation';

interface Props {
  dataUser: UserDataLogged;
}

export const AppRoutes = (props: Props) => {
  return (
    <Routes>
      <Route
        path="*"
        element={Login()}
      />
      <Route
        path="/system/*"
        element={SystemNavigation()}
      />
      <Route path="/logout/" element={Logout()} />
    </Routes>
  );

};
