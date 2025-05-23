import './InputModal.css'

import { useRef, useState } from 'react'

const InputModal = ({
  decimalType,
  handleUpdate,
  theme,
} : {
  decimalType?: string;
  handleUpdate: (number: number, type: string, note: string) => void;
  theme: string;
}) => {
  const [inputNumbers, setInputNumbers] = useState<string[]>([])
  const [noteText, setNoteText] = useState('')
  const [showAddButton, setShowAddButton] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];
  if (decimalType === 'none') buttonList[9] = '';
  if (decimalType === 'double 0') buttonList[9] = '00';

  const handleClick = (newDigit: string) => {
    if (newDigit === '⌫') {
      setInputNumbers(inputNumbers.slice(0, -1))
    } else {
      if (newDigit === '00') {
        setInputNumbers([...inputNumbers, '0', '0'])
      } else if (newDigit === '.') {
        if (inputNumbers.includes('.')) return
        setInputNumbers([...inputNumbers, '.'])
      } else {
        setInputNumbers([...inputNumbers, newDigit])
      }
    }
  }

  const updateBudget = (type: string) => () => {
    let newNumber = parseFloat(inputNumbers.join(''))
    handleUpdate(newNumber, type, noteText)
    setInputNumbers([])
    setNoteText('')
    setShowAddButton(true)
  }

  let modalClass = 'budget-input-modal'
  if (theme === 'dark') modalClass += ' budget-input-modal--dark'
  if (theme === 'light') modalClass += ' budget-input-modal--light'

  const handleAddNote = () => {
    setShowAddButton(false)
    inputRef?.current?.focus()
  }

  return (
    <div className={modalClass}>
      <div className='budget-input-modal__note'>
        <input
          id='budget-note-input'
          className='budget-input-modal__note__input'
          type='text'
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          ref={inputRef}
        />
        { showAddButton && <button onClick={handleAddNote}>Add note</button> }
      </div>
      <div className='budget-input-modal__display'>
        { inputNumbers.map((digit: string, i: number) => {
          let addDecimal = decimalType === 'double 0' && i === inputNumbers.length - 2
          addDecimal = addDecimal || (decimalType === 'double 0' && inputNumbers.length === 1)
          return (
            <div key={`${digit}-digit-${i}`} className='budget-input-modal__display__digit'>
              <div className='budget-input-modal__display__digit__item'>
                {addDecimal && '.'}{ digit }
              </div>
            </div>
          )
        }) }
      </div>
      <div className='budget-input-modal__inputs'>
        { buttonList.map(button => (
          <div
            key={button}
            className={
              `budget-input-modal__inputs__button ${button === '00' && 'budget-input-modal__inputs__button--double'}`
            }
            onClick={() => handleClick(button)}
          >
            { button }
          </div>
        )) }
      </div>
      <div className='budget-input-modal__submit'>
        <button onClick={updateBudget('add')}>Add</button>
        <button onClick={updateBudget('remove')}>OK</button>
      </div>

    </div>
  )
}

export default InputModal;
