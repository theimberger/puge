import { useEffect, useState } from 'react'

import { idbAll, addBudgetRecord } from './utils/indexed-db'
import { CreateBudget, CurrentBudget, Home } from './screens'

import './App.css'
import BudgetType from './types/BudgetType'

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('')
  const [budgets, setBudgets] = useState<BudgetType[]>([])
  const [activeBudget, setActiveBudget] = useState('')
  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    const budgets = await idbAll();
    if (budgets.length) {
      const activeBudget = document.cookie.split(';').find(c => c.includes('activeBudget'))
      const activeBudgetName = activeBudget?.split('=')[1]
      setBudgets(budgets);
      if (activeBudgetName) {
        setActiveBudget(activeBudgetName)
        setCurrentScreen('budget');
      } else {
        setCurrentScreen('home');
      }
    } else {
      setCurrentScreen('home');
    }
  };

  const handleNewBudget = async (budgetOptions: BudgetType) => {
    await addBudgetRecord(budgetOptions)
    document.cookie = `activeBudget=${budgetOptions.name}`
    loadBudgets();
  }

  const handleBudgetSelect = (name: string) => {
    document.cookie = `activeBudget=${name}`
    setCurrentScreen('budget')
  }

  return (
    <>
      { currentScreen === 'home' &&
        <Home
          goToCreate={() => setCurrentScreen('create')}
          budgetsList={budgets.map(budget => budget.name)}
          setActiveBudget={handleBudgetSelect}
        />
      }
      { currentScreen === 'create' &&
        <CreateBudget handleCreate={handleNewBudget} />
      }
      { currentScreen === 'budget' &&
        <CurrentBudget budget={budgets.find(budget => budget.name === activeBudget)} />
      }
    </>
  )
}

export default App
