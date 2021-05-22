import { FC, FormEvent, useContext } from 'react';
import { withRouter } from 'react-router';
import { Link, RouterProps } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

type Props = Pick<RouterProps, 'history'>;

const Login: FC<Props> = ({ history }) => {
  const { login } = useContext(AuthContext);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // const { email, password } = event.target.elements;
    // login(email.value, password.value, history);
    console.log(login, history);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-mail Address</label>
          <input name="email" type="email" placeholder="email@gmail.com" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" placeholder="Password" />
        </div>
        <button type="submit">SIGN UP</button>
      </form>
      <Link to="/signup">Sign Upはこちら</Link>
    </div>
  );
};

export default withRouter(Login);
