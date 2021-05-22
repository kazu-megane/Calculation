import { FC, useContext } from 'react';
import { withRouter } from 'react-router';
import { Link, RouterProps } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

type Props = Pick<RouterProps, 'history'>;

const SignUp: FC<Props> = ({ history }) => {
  const { signUp } = useContext(AuthContext);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signUp(email.value, password.value, history);
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
      <Link to="/login">SignInへ戻る</Link>
    </div>
  );
};

export default withRouter(SignUp);
