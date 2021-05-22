import { Dispatch, FC, FormEvent, MouseEvent, SetStateAction } from 'react';

type Props = {
  thisMonth: number;
  selectedMonth: number;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  inputAmount: number;
  setInputAmount: Dispatch<SetStateAction<number>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  addIncome: (text: string, amount: number) => void;
  addExpense: (text: string, amount: number) => void;
};

const ThisMonthForm: FC<
  Pick<Props, 'inputText' | 'inputAmount' | 'setInputText' | 'setInputAmount' | 'setType'> & {
    submitItem: (event: MouseEvent) => void;
  }
> = ({ inputText, inputAmount, setInputText, setInputAmount, setType, submitItem }) => {
  return (
    <form>
      <select
        onChange={(event) => {
          if (event) {
            setType(event.target.value);
          }
        }}
      >
        <option value="inc">+</option>
        <option value="exp">-</option>
      </select>
      <div>
        <label>内容</label>
        <input
          type="text"
          value={inputText}
          onChange={(event) => {
            if (event) {
              setInputText(event.target.value);
            }
          }}
        />
      </div>
      <div>
        <label>金額</label>
        <input
          type="number"
          value={inputAmount}
          onChange={(event) => {
            if (event) {
              setInputAmount(parseInt(event.target.value));
            }
          }}
        />
        <div>円</div>
      </div>
      <div>
        <button type="button" onClick={submitItem}>
          追加
        </button>
      </div>
    </form>
  );
};

const otherMonthForm = () => {
  return <form></form>;
};

const AddItem: FC<Props> = ({
  thisMonth,
  selectedMonth,
  inputText,
  setInputText,
  inputAmount,
  setInputAmount,
  type,
  setType,
  addIncome,
  addExpense,
}) => {
  const reset = () => {
    setInputText('');
    setInputAmount(0);
  };

  const submitItem = () => {
    if (inputText === '' || inputAmount === 0 || !(inputAmount > 0 && inputAmount <= 10000000)) {
      alert('正しい内容を入力してください');
    } else if (type === 'inc') {
      addIncome(inputText, inputAmount);
      reset();
    } else if (type === 'exp') {
      addExpense(inputText, inputAmount);
      reset();
    }
  };

  return thisMonth === selectedMonth ? (
    <ThisMonthForm
      inputText={inputText}
      inputAmount={inputAmount}
      setInputText={setInputText}
      setInputAmount={setInputAmount}
      setType={setType}
      submitItem={submitItem}
    />
  ) : null;
};

export default AddItem;
