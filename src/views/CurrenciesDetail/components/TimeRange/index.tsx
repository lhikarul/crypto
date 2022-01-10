const TimeRange = ({range, onSelect}: {range: string[], onSelect: (time: string) => void}) => {

  return <div className="py-[10px] cursor-pointer" style={{borderBottom: '1px solid rgba(255,255,255, .2)'}}>
    {
      range.map((time) => (<span key={time} onClick={() => onSelect(time)}className="px-[5px] cursor-pointer]">{time}</span>))
    }
  </div>
}

export default TimeRange