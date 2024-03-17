import './CreateBudget.css'

import { useState } from 'react'

import BudgetType from '../../types/BudgetType'

interface CreateBudgetProps {
  handleCreate: (budgetOptions: BudgetType) => void
}

const CreateBudget = ({
  handleCreate
}: CreateBudgetProps) => {
  const [budgetOptions, setOptions] = useState({
    name: 'Budget',
    limit: 100,
    unit: '$',
    unitPlacement: 'prefix',
    period: 'monthly',
    decimalType: 'standard',
    theme: 'light',
    rolling: true,
  })

  const [budgetError, setBudgetError] = useState('')

  let createClass = "create-budget"
  if (budgetOptions.theme === 'dark') createClass += ' create-budget--dark';
  if (budgetOptions.theme === 'light') createClass += ' create-budget--light';

  const OptionsButton = ({ option, optionFor }: { option: string, optionFor: string }) => {
    let optionsButtonClass = '';
    if (
      budgetOptions.period === option ||
      budgetOptions.theme === option ||
      budgetOptions.unitPlacement === option ||
      budgetOptions.decimalType === option ||
      (budgetOptions.rolling && option === 'yes') ||
      (!budgetOptions.rolling && option === 'no')
    ) {
      optionsButtonClass = 'create-budget__input-options--active'
    }
    const handleButtonClick = () => {
      const adjustForBoolean = option === 'yes' || option === 'no';
      setOptions({
        ...budgetOptions,
        [optionFor]: adjustForBoolean ? option === 'yes' : option,
      })
    }
    return (
      <button
        className={ optionsButtonClass }
        onClick={ handleButtonClick }
      >
        { option }
      </button>
    )
  }

  const handleSubmit = () => {
    let errorMessage = ''
    if (!budgetOptions.name) {
      errorMessage = 'Name is required';
    }

    if (!budgetOptions.unit) {
      errorMessage = 'Unit is required';
    }

    if (budgetOptions.limit < 0 || typeof budgetOptions.limit !== 'number') {
      errorMessage = 'Limit must be a positive number';
    }

    if (errorMessage) {
      setBudgetError(errorMessage)
      return
    }

    handleCreate(budgetOptions)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setOptions({
      ...budgetOptions,
      [field]: field === 'limit' ? Number(e.target.value) : e.target.value
    })
  }

  return (
    <main className={createClass}>
        <div className='create-budget__input-group'>
          <label htmlFor="name">Name</label>
          <input
            id='name'
            name='name'
            type='text'
            value={ budgetOptions.name }
            onChange={ (e) => handleTextChange(e, 'name') }
          />
        </div>
        <div className='create-budget__input-group'>
          <label htmlFor="limit">Limit</label>
          <input
            id='limit'
            name='limit'
            type='number'
            value={ budgetOptions.limit }
            onChange={ (e) => handleTextChange(e, 'limit') }
          />
        </div>
        <div className='create-budget__input-group'>
          <label htmlFor="unit">Unit</label>
          <input
            id='unit'
            name='unit'
            type='text'
            value={ budgetOptions.unit }
            onChange={ (e) => handleTextChange(e, 'unit') }
          />
        </div>
        <div className='create-budget__input-group'>
          <label htmlFor="unitPlacement">Unit placement</label>
          <div className='create-budget__input-options'>
            <OptionsButton option='prefix' optionFor='unitPlacement' />
            <OptionsButton option='suffix' optionFor='unitPlacement' />
          </div>
        </div>
        <div className='create-budget__input-group'>
          <label htmlFor="period">Period</label>
          <div className='create-budget__input-options'>
            <OptionsButton option='daily' optionFor='period' />
            <OptionsButton option='weekly' optionFor='period' />
            <OptionsButton option='monthly' optionFor='period' />
          </div>
        </div>
        <div className='create-budget__input-group'>
          <label htmlFor="rolling">Rolls over</label>
          <div className='create-budget__input-options'>
            <OptionsButton option='yes' optionFor='rolling' />
            <OptionsButton option='no' optionFor='rolling' />
          </div>
        </div>
        <div className='create-budget__input-group create-budget__input-group--decimal'>
          <label htmlFor="decimalType">Decimal Type</label>
          <div className='create-budget__input-options'>
            <OptionsButton option='standard' optionFor='decimalType' />
            <OptionsButton option='none' optionFor='decimalType' />
            <OptionsButton option='double 0' optionFor='decimalType' />
          </div>
        </div>
        <div className='create-budget__input-group'>
          <label htmlFor="theme">Theme</label>
          <div className='create-budget__input-options'>
            <OptionsButton option='light' optionFor='theme' />
            <OptionsButton option='dark' optionFor='theme' />
          </div>
        </div>
        <button
          className='create-budget__finish-button'
          onClick={handleSubmit}
        >
          Create Budget
        </button>
        <p className='create-budget__error'>&nbsp; { budgetError } &nbsp;</p>
    </main>
  )
}

export default CreateBudget
