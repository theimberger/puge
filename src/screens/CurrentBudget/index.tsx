import './CurrentBudget.css'

import { useEffect, useState } from 'react'

import BudgetType from '../../types/BudgetType'
import BudgetLines from './BudgetLines'
import DateLine from './DateLine'
import InputModal from './InputModal'
import { getDateString } from './utils'
import { addBudgetLine, idbGet } from '../../utils/indexed-db'

const CurrentBudget = ({
  budgetName,
  goHome,
}: {
  goHome: () => void;
  budgetName?: string;
}) => {
  const [showInputModal, setModalState] = useState(false);
  const [budget, setBudget] = useState<BudgetType | null>(null);

  useEffect(() => {
    const loadBudget = async () => {
      if (!budgetName) return;
      const budgetRecord:BudgetType | undefined = await idbGet(budgetName);
      if (!budgetRecord) return;
      setBudget(budgetRecord);
      document.body.style.backgroundColor = budgetRecord?.theme === 'dark' ?
        '#333333' :
        '#FFFFFF';

      setTimeout(() => {
        const root = document.querySelector('#root');
        if (root) root.scroll(0, root.scrollHeight)
      }, 10);
    }
    loadBudget();
  }, [budgetName]);

  if (!budget) return null;

  let mainClass = 'current-budget-main';
  if (budget.theme === 'dark') mainClass += ' current-budget-main--dark';
  if (budget.theme === 'light') mainClass += ' current-budget-main--light';

  const openInputModal = () => {
    setModalState(true);
  }

  const updateBudget = async (newNumber: number, type: string, note: string) => {
    setModalState(false);
    let change = newNumber;
    if (Number.isNaN(newNumber)) return;
    if (budget.decimalType !== 'none') change = newNumber * 100;
    change = Math.round(change);
    change = type === 'add' ? change : -change;
    const newBudget = await addBudgetLine(budget.name, {
      date: getDateString(),
      change: type === 'add' ? newNumber : -newNumber,
      note,
    });

    if (newBudget) setBudget(newBudget);
  }

  const currentBudget = budget.current || 0
  let totalText: number | string = currentBudget;
  if (budget.decimalType !== 'none') totalText = (currentBudget / 100).toFixed(2);
  if (currentBudget < 0) totalText = totalText.toString().replace('-', '');

  return (
    <main className={mainClass}>
      { showInputModal &&
        <InputModal
          decimalType={ budget.decimalType }
          handleUpdate={ updateBudget }
          theme={ budget.theme }
        />
      }
      <BudgetLines
        budgetLines={budget.lines}
        unit={budget.unit}
        unitPlacement={budget.unitPlacement}
        theme={budget.theme}
        decimalType={budget.decimalType}
      />
      <div className="current-budget__current-total" onClick={openInputModal}>
        { currentBudget < 0 && '-' }
        { budget.unitPlacement === 'prefix' && <div>{budget.unit}</div> }
        <div>{ totalText }</div>
        { budget.unitPlacement === 'suffix' && <div>{budget.unit}</div> }
      </div>
      <div onClick={openInputModal}>
        <DateLine date={getDateString()} />
      </div>
      <div className='current-budget__title' onClick={goHome}>
      〈 { budget.name }
      </div>
    </main>
  )
}

export default CurrentBudget;
