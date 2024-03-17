import './CreateBudget.css'

import { useState } from 'react'

enum TextFieldEnum {
  name = 'name',
  limit = 'limit',
  unit = 'unit',
}

const CreateBudget = () => {
  const [budgetOptions, setOptions] = useState({
    name: '',
    limit: 100,
    unit: '$',
    unitPlacement: 'prefix',
    period: 'monthly',
    theme: 'light'
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
      budgetOptions.unitPlacement === option
    ) {
      optionsButtonClass = 'create-budget__input-options--active'
    }
    const handleButtonClick = () => {
      setOptions({
        ...budgetOptions,
        [optionFor]: option
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

  const OptionsInput = ({ field }: { field: TextFieldEnum }) => {
    let fieldType = 'text';
    if (field === 'limit') fieldType = 'number';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setOptions({
        ...budgetOptions,
        [field]: e.target.value
      })
    }

    return (
      <input
        id={ field }
        name={ field }
        type={ fieldType }
        value={ budgetOptions[field] }
        onChange={ handleChange }
      />
    )
  }

  const handleSubmit = () => {
    let errorMessage = ''
    Object.keys(budgetOptions).forEach((key) => {
      if (!budgetOptions[key]) {
        errorMessage = 'All fields are required.';
      }
    })

    if (budgetOptions.limit < 0 || typeof budgetOptions.limit !== 'number') {
      errorMessage = 'Limit must be a positive number';
    }

    if (errorMessage) {
      setBudgetError(errorMessage)
      return
    }
  }

  return (
    <main className={createClass}>
        <div className='create-budget__input-group'>
          <label htmlFor="name">Name</label>
          <OptionsInput field={ TextFieldEnum.name } />
        </div>
        <div className='create-budget__input-group'>
          <label htmlFor="limit">Limit</label>
          <OptionsInput field={ TextFieldEnum.limit } />
        </div>
        <div className='create-budget__input-group'>
          <label htmlFor="unit">Unit</label>
          <OptionsInput field={ TextFieldEnum.unit } />
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
