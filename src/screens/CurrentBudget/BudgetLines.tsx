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
  budgetLines?: { date: string; change: number; note?: string }[];
  unit: string;
  unitPlacement: string;
  theme: string;
  decimalType: string;
}) => {
  if (!budgetLines) return null;

  let listClass = 'current-budget__budget-lines'
  if (theme === 'dark') listClass += ' current-budget__budget-lines--dark';
  if (theme === 'light') listClass += ' current-budget__budget-lines--light';

  const generateChangeWithUnit = (change: number) => {
    let changeText: number | string = change;
    if (decimalType !== 'none') changeText = (change / 100).toFixed(2);
    if (change < 0) changeText = changeText.toString().replace('-', '');
    const prefix = `${change < 0 ? '-' : ''}${unitPlacement === 'prefix' ? unit : ''}`;
    const suffix = unitPlacement === 'suffix' ? unit : '';
    return `${prefix}${changeText}${suffix}`;
  }

  let runningTotal = 0;

  return (
    <ul className={listClass}>
      {budgetLines.map((line, index) => {
        const showDate = (
          line.date !== getDateString() &&
          line.date !== budgetLines[index + 1]?.date
        );

        runningTotal += line.change;
        let frozenTotal = '';
        if (showDate) {
          frozenTotal = String(generateChangeWithUnit(runningTotal));
          runningTotal = 0;
        }

        return (
          <li key={`${index}-budget-line`}>
            <div className='current-budget__budget-line__change'>
              <span>{generateChangeWithUnit(line.change)}</span>
              { line.note && <span className='current-budget__budget-line__note'>⇠ {line.note}</span> }
            </div>
            {showDate && <DateLine date={line.date} value={frozenTotal}/>}
          </li>
        )
      })}
    </ul>
  )
}

export default CurrentBudget;
