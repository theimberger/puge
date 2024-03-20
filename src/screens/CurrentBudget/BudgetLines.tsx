import './BudgetLines.css'

import DateLine from './DateLine';
import { getDateString } from './utils';


const CurrentBudget = ({
  budgetLines,
  unit,
  unitPlacement,
  theme,
  decimalType,
} : {
  budgetLines?: { date: string; change: number; }[];
  unit: string;
  unitPlacement: string;
  theme: string;
  decimalType: string;
}) => {
  if (!budgetLines) return null;

  console.log(budgetLines)
  let listClass = 'current-budget__budget-lines'
  if (theme === 'dark') listClass += ' current-budget__budget-lines--dark';
  if (theme === 'light') listClass += ' current-budget__budget-lines--light';

  const ChangeLine = ({ change }: { change: number }) => {
    let changeText: number | string = change;
    if (decimalType !== 'none') changeText = (change / 100).toFixed(2);
    if (change < 0) changeText = changeText.toString().replace('-', '');

    return (
      <div className='current-budget__budget-line__change'>
        {change < 0 && '-'}{unitPlacement === 'prefix' && unit}{changeText}{unitPlacement === 'suffix' && unit}
      </div>
    )
  }

  return (
    <ul className={listClass}>
      {budgetLines.map((line, index) => {
        const showDate = (
          line.date !== getDateString() &&
          line.date !== budgetLines[index + 1]?.date
        );

        return (
          <li key={`${index}-budget-line`}>
            <ChangeLine change={line.change} />
            {showDate && <DateLine date={line.date} />}
          </li>
        )
      })}
    </ul>
  )
}

export default CurrentBudget;
