import { useEffect, useState } from 'react'

import { idbAll, idbSet } from './utils/indexed-db'
import { CreateBudget, Home } from './screens'

import './App.css'
import BudgetType from './types/BudgetType'

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home')
  useEffect(() => {
    const asyncEffect = async () => {
      const budgets = await idbAll();
      if (budgets.length) {
        
      }
    };
    asyncEffect();
  }, []);

  const handleNewBudget = async (budgetOptions: BudgetType) => {
    await idbSet(budgetOptions)
    setCurrentScreen('budget')
  }

  return (
    <>
      <header></header>
      { currentScreen === 'home' &&
        <Home
          goToCreate={() => setCurrentScreen('create')}
        />
      }
      { currentScreen === 'create' &&
        <CreateBudget handleCreate={handleNewBudget} />
      }
      <footer></footer>
    </>
  )
}

export default App
