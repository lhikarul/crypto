const CrossLine = ({x,y, innerWidth, innerHeight}: {x:number, y:number, innerWidth: number, innerHeight: number}) => {  
  if (x + y === 0) return <></>
  return (
    <>
      <line
        x1={0}
        y1={y}
        x2={innerWidth}
        y2={y}
        stroke={'rgba(255,255,255, 1)'}
        strokeWidth={1}
        strokeDasharray={3}
      />
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={innerHeight}
        stroke={'rgba(255,255,255, 1)'}
        strokeWidth={1}
        strokeDasharray={3}
      />
    </>
  );
}

export default CrossLine