import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import s from '../../components/Summary/Summary.module.scss';
import {
  langOpts,
  makeUkrMonthNames,
} from '../../utils/function/translateBackEndResp';

export default function Summary() {
  const expensesData = useSelector(
    state => state.transactions.monthStats.expenses
  );
  const incomesData = useSelector(
    state => state.transactions.monthStats.incomes
  );
  const [data, setData] = useState([]);
  const location = useLocation();

  const currentMonth = new Intl.DateTimeFormat('ru-Ru', {
    month: 'long',
  }).format(new Date());

  let index = 0;

  const firstPart = Object.entries(data).map((item, idx) => {
    if (item[0].toLowerCase() === currentMonth) {
      index = idx;
    }
    return item;
  });

  const secondPart = firstPart.splice(index + 1);
  const months = firstPart.reverse().concat(secondPart.reverse());

  useEffect(() => {
    switch (location.pathname) {
      case '/expenses':
        setData(expensesData);
        break;
      case '/incomes':
        setData(incomesData);
        break;
      default:
        break;
    }
  }, [expensesData, incomesData, location.pathname]);

  return (
    <div className={s.summary}>
      <h2 className={s.title}>зведення</h2>
      <ul className={s.list}>
        {months.map((month, idx) => (
          <li key={idx} className={s.item}>
            <p>{langOpts[month[0]].ua}</p>

            <p>
              {month[1]
                .toLocaleString('ua-UA', { minimumFractionDigits: 2 })
                .replace(',', '.')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
