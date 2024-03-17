interface ButtonProps {
  onClick: () => void;
  className?: string;
  buttonText: string;
}

const Button = ({
  onClick,
  className,
  buttonText,
}: ButtonProps) => {
  let buttonClass = "puge-button"
  if (className) {
    buttonClass += ` ${className}`
  }

  return (
    <div className={buttonClass}>
      <button onClick={onClick}>{buttonText}</button>
    </div>

  )
}

export default Button
