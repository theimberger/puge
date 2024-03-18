import './CurrentBudget.css'

import { useState } from 'react'

import BudgetType from '../../types/BudgetType'
import BudgetLines from './BudgetLines'
import DateLine from './DateLine'
import InputModal from './InputModal'
import { getCurrentDateString } from './utils'

const CurrentBudget = ({
  budget,
  goHome,
}: {
  goHome: () => void,
  budget?: BudgetType
}) => {
  const [showInputModal, setModalState] = useState(false);
  if (!budget) return null;
  let mainClass = 'current-budget-main';
  if (budget.theme === 'dark') mainClass += ' current-budget-main--dark';
  if (budget.theme === 'light') mainClass += ' current-budget-main--light';

  const handleDecimal = (num: number) => {
    if (budget.decimalType === 'none') return num;
    return num / 100;
  }

  const openInputModal = () => {
    setModalState(true);
  }

  const updateBudget = (newNumber: number, type: string) => {
    setModalState(false);
    console.log(newNumber, type);
  }

  return (
    <main className={mainClass}>
      { showInputModal &&
        <InputModal
          decimalType={ budget.decimalType }
          handleUpdate={ updateBudget }
          theme={ budget.theme }
        />
      }
      <BudgetLines budgetLines={budget.lines} />
      <div className="current-budget__current-total" onClick={openInputModal}>
        { budget.unitPlacement === 'prefix' && <div>{budget.unit}</div> }
        <div>{ handleDecimal(budget.current || 0) }</div>
        { budget.unitPlacement === 'suffix' && <div>{budget.unit}</div> }
      </div>
      <div onClick={openInputModal}>
        <DateLine date={getCurrentDateString()} />
      </div>
      <div className='current-budget__title' onClick={goHome}>
      〈 { budget.name }
      </div>
    </main>
  )
}

export default CurrentBudget;
