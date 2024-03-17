import './InputModal.css'

const InputModal = () => {
  const buttonList = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "OK"
  ]
  buttonList[9] = '00'

  return (
    <div className='budget-input-modal'>
      <div className='budget-input-modal__display' />
      <div className='budget-input-modal__inputs'>
        { buttonList.map(button => (
          <div key={button} className='budget-input-modal__inputs__button'>{ button }</div>
        )) }
      </div>

    </div>
  )
}

export default InputModal;
