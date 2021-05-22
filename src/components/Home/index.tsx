import { FC, useState, useEffect, useContext } from 'react';
import { startOfMonth, endOfMonth } from 'date-fns';
import firebase from 'firebase/app';
import { db } from '../../firebase';
import { AuthContext } from '../../auth/AuthProvider';
import AddItem from '../AddItem';

const INCOME_COLLECTION_NAME = 'incomeItems';
const EXPENSE_COLLECTION_NAME = 'expenseItems';

type Item = {
  uid: string;
  text: string;
  amount: number;
  docId: string;
  date: Date;
};

const Home: FC = () => {
  const [inputText, setInputText] = useState('');
  const [inputAmount, setInputAmount] = useState(0);
  const [incomeItems, setIncomeItems] = useState<Array<Item>>([]);
  const [expenseItems, setExpenseItems] = useState<Array<Item>>([]);
  const [type, setType] = useState('inc');
  const [date, setDate] = useState(new Date());

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getIncomeData();
    getExpenseData();
  }, []);

  // useEffect(() => {
  //   getIncomeData();
  //   getExpenseData();
  // }, [date]);

  useEffect(() => {
    console.log(incomeItems);
  }, [incomeItems]);

  const getIncomeData = () => {
    if (currentUser) {
      const incomeData = db.collection(INCOME_COLLECTION_NAME);
      incomeData
        .where('uid', '==', currentUser.uid)
        .orderBy('date')
        .startAt(startOfMonth(date))
        .endAt(endOfMonth(date))
        .onSnapshot((query) => {
          const newIncomeItems: Array<Item> = [];
          query.forEach((doc) => newIncomeItems.push({ ...doc.data(), docId: doc.id } as Item));
          setIncomeItems(newIncomeItems);
        });
    }
  };

  const addIncome = (text: string, amount: number) => {
    if (currentUser) {
      const docId = Math.random().toString(32).substring(2);
      const date = firebase.firestore.Timestamp.now();
      db.collection(INCOME_COLLECTION_NAME)
        .doc(docId)
        .set({
          uid: currentUser.uid,
          text,
          amount,
          date,
        })
        .then(() => {
          setIncomeItems(
            (prev) => [...prev, { text: inputText, amount: inputAmount, docId: docId, date: date }] as Array<Item>
          );
        });
    }
  };

  const getExpenseData = () => {
    if (currentUser) {
      const expenseData = db.collection(EXPENSE_COLLECTION_NAME);
      expenseData
        .where('uid', '==', currentUser.uid)
        .orderBy('date')
        .startAt(startOfMonth(date))
        .endAt(endOfMonth(date))
        .onSnapshot((query) => {
          const expenseItems: Array<Item> = [];
          query.forEach((doc) => expenseItems.push({ ...doc.data(), docId: doc.id } as Item));
          setExpenseItems(expenseItems);
        });
    }
  };

  const addExpense = (text: string, amount: number) => {
    if (currentUser) {
      const docId = Math.random().toString(32).substring(2);
      const date = firebase.firestore.Timestamp.now();
      db.collection(EXPENSE_COLLECTION_NAME)
        .doc(docId)
        .set({
          uid: currentUser.uid,
          text,
          amount,
          date,
        })
        .then(() => {
          setExpenseItems(
            (prev) => [...prev, { text: inputText, amount: inputAmount, docId: docId, date: date }] as Array<Item>
          );
        });
    }
  };

  const selectedMonth = date.getMonth() + 1;
  const today = new Date();
  const thisMonth = today.getMonth() + 1;

  return (
    <>
      <AddItem
        thisMonth={thisMonth}
        selectedMonth={selectedMonth}
        inputText={inputText}
        setInputText={setInputText}
        inputAmount={inputAmount}
        setInputAmount={setInputAmount}
        type={type}
        setType={setType}
        addIncome={addIncome}
        addExpense={addExpense}
      />
      <p>収入</p>
      <ul>
        {incomeItems.map((incomeItem, index) => (
          <li key={index}>
            {incomeItem.text}/{incomeItem.amount}
          </li>
        ))}
      </ul>
      <p>支出</p>
      <ul>
        {expenseItems.map((expenseItem, index) => (
          <li key={index}>
            {expenseItem.text}/{expenseItem.amount}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
