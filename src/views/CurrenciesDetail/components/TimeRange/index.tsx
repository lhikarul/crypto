import { useState } from "react"

const TimeRange = ({range, onSelect}: {range: string[], onSelect: (time: string) => void}) => {
  const [selectedTime, setSelectedTime] = useState('15m')
  const handleClick = (time: string) => {
    setSelectedTime(time)
    onSelect(time)
  }
  return <div className="py-[5px] cursor-pointer" style={{borderBottom: '1px solid rgba(255,255,255, .2)'}}>
    {
      range.map((time) => (
        <span 
          key={time} 
          onClick={() => handleClick(time)} 
          className="px-[5px] cursor-pointer]"
          style={{'color': time === selectedTime ? '#f0b90b': ''}}
        >{time}</span>))
    }
  </div>
}

export default TimeRange