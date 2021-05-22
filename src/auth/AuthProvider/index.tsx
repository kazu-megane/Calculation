import { FC, useEffect, useState, createContext } from 'react';
import firebase from 'firebase/app';
import { auth } from '../../firebase';

type Auth = {
  signUp: (email: string, password: string, history: any) => Promise<void>;
  login: (email: string, password: string, history: any) => Promise<void>;
  currentUser: firebase.User | null;
};

export const AuthContext = createContext<Auth>({
  signUp: async () => {},
  login: async () => {},
  currentUser: null,
});

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  //サインアップ後認証情報を更新
  const signUp = async (email: string, password: string, history: any) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user) => setCurrentUser(user));
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  //ログインさせる
  const login = async (email: string, password: string, history: any) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user) => setCurrentUser(user));
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  //初回アクセス時に認証済みかチェック
  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return <AuthContext.Provider value={{ signUp, login, currentUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
