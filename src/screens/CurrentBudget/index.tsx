import './CurrentBudget.css'

import BudgetType from '../../types/BudgetType'
import BudgetLines from './BudgetLines'

const CurrentBudget = ({ budget }: { budget?: BudgetType }) => {
  if (!budget) return null;
  let mainClass = 'current-budget-main';
  if (budget.theme === 'dark') mainClass += ' current-budget-main--dark';
  if (budget.theme === 'light') mainClass += ' current-budget-main--light';

  const handleDecimal = (num: number) => {
    if (budget.decimalType === 'none') return num;
    return num / 100;
  }

  return (
    <main className={mainClass}>
      <h1>{budget.name}</h1>
      <BudgetLines budgetLines={budget.lines} />
      <div className="current-budget__current-total">
        { budget.unitPlacement === 'prefix' && <div>{budget.unit}</div> }
        <div>{ handleDecimal(budget.current || 0) }</div>
        { budget.unitPlacement === 'suffix' && <div>{budget.unit}</div> }
      </div>
      <div>
        Tap to add a new line
      </div>
    </main>
  )
}

export default CurrentBudget;
