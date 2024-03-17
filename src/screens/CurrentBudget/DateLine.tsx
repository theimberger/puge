import './DateLine.css'

const DateLine = ({ date } : { date: string; }) => {
  return (
    <div className='curent-budget__date'>
      <div className='current-budget__date__line' />
      { date }
      <div className='current-budget__date__line' />
    </div>
  )
}

export default DateLine;
