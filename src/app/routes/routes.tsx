import { Route, Routes } from 'react-router-dom';
import { Logout } from '../screens/logout';
import { UserDataLogged } from '../types/user/user';
import { Login } from '../screens/login';
import { SystemNavigation } from '../screens/system/system.navigation';
import { PlatformRegistration } from '../screens/platoform.registration';
import { SystemMobileNavigation } from '../screens/system.mobile/system.mobile.navigation';

interface Props {
  dataUser: UserDataLogged;
  screenMobile: boolean;
}

export const AppRoutes = (props: Props) => {
  const dataUser = props.dataUser;

  const screenMobile = props.screenMobile;

  if (!dataUser.name) {
    return (
      <Routes>
        <Route path="*" element={Login()} />
        <Route path="/resgistration" element={PlatformRegistration()} />
      </Routes>
    );
  } else {
    if (dataUser.userType === 'COOK') {
      return (
        <Routes>
          <Route path="*" element={SystemMobileNavigation()} />;
          <Route path="/logout/" element={Logout()} />;
        </Routes>
      );
    }

    if (!screenMobile) {
      return (
        <Routes>
          <Route path="*" element={SystemNavigation()} />;
          <Route path="/logout/" element={Logout()} />;
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="*" element={SystemMobileNavigation()} />;
          <Route path="/logout/" element={Logout()} />;
        </Routes>
      );
    }
  }
};
