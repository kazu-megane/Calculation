import { FC, useContext, ComponentType } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import Login from '../Login';

type Props = RouteProps & {
  component: ComponentType<any>;
};

const PrivateRoute: FC<Props> = ({ component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  const newComponent = currentUser ? component : Login;

  return <Route {...rest} component={newComponent} />;
};

export default PrivateRoute;
