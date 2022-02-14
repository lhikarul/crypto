import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'

import './csshake.css'
import style from '../Jigsaw/Jigsaw.module.scss'

import getRandom from '../../utils/getRandom'

enum JigsawStatus {
  LOADING = 0,
  READY = 1,
  MATCH = 2,
  ERROR = 3,
  HIDE = 4
}

interface JigsawImageClippedProp {
  clippedX: number
  clippedY: number
  curX: number
  startX: number
  isMoving: boolean
  limitedX: number
}

const jigsawShapeList = [
  [0, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [0, 1, 0, 0],
  [0, 1, 0, 1],
  [0, 1, 1, 0],
  [0, 1, 1, 1],
  [1, 0, 0, 0],
  [1, 0, 0, 1],
  [1, 0, 1, 0],
  [1, 0, 1, 1],
  [1, 1, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 1, 0],
  [1, 1, 1, 1]
]

const JIGSAW_SHAPE_SIZE = 52
const JIGSAW_WIDTH = 280
const JIGSAW_HEIGHT = 155

function genJigsawShape (ctx: CanvasRenderingContext2D, size: number = 100, jigsawIndex: number = 0 ) {
  const shape = jigsawShapeList[jigsawIndex]
  const r = 0.1 * size

  ctx.save()
    ctx.beginPath()

      // left
      ctx.moveTo(r,r)
      ctx.lineTo(r, 0.5 * size - r)
      ctx.arc(r, 0.5 * size, r, 1.5 * Math.PI, 0.5 * Math.PI, Boolean(shape[0]))
      ctx.lineTo(r, size - r)

      // bottom
      ctx.lineTo(0.5 * size - r, size - r)
      ctx.arc(0.5 * size, size - r, r, Math.PI, 0, Boolean(style[1]))
      ctx.lineTo(size - r, size - r)

      // right
      ctx.lineTo(size - r, 0.5 * size + r)
      ctx.arc(size - r, 0.5 * size, r, 0.5 * Math.PI, 1.5 * Math.PI, Boolean(style[2]))
      ctx.lineTo(size - r, r)

      // top
      ctx.lineTo(0.5 * size + r, r)
      ctx.arc(0.5 * size, r, r, 0, Math.PI, Boolean(style[3]))
      ctx.lineTo(r, r)


      ctx.lineWidth = 2
      ctx.fillStyle = 'rgba(0, 0, 0, .8)'
      ctx.strokeStyle = 'rgba(255, 255, 255, .8)'

      ctx.stroke()
      ctx.clip()
    ctx.closePath()
}

function getPosition (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) {
  let x: number;
  let y: number;
  if (e.nativeEvent instanceof TouchEvent) {
    x = e.nativeEvent.touches[0].clientX
    y = e.nativeEvent.touches[0].clientY
  } else {
    x = e.nativeEvent.clientX
    y = e.nativeEvent.clientY
  }
  return {
    x,
    y
  }
}

interface JigsawProps {
  imageUrl: string,
  onReload: () => void,
  onError: () => void,
  onSuccess: () => void
}

export default function Jigsaw (props: JigsawProps) {
  const {imageUrl} = props
  const [jigsawData, setJigsawData] = useState<JigsawImageClippedProp>({
    clippedX: getRandom(JIGSAW_WIDTH / 2, JIGSAW_WIDTH - JIGSAW_SHAPE_SIZE),
    clippedY: getRandom(JIGSAW_SHAPE_SIZE, JIGSAW_HEIGHT - JIGSAW_SHAPE_SIZE),
    curX: 0,
    isMoving: false,
    limitedX: 0,
    startX: 0,
  })
  const [sliderStyle, setSliderStyle] = useState<string>()

  const [jigsawStatus, setJigsawStatus] = useState<JigsawStatus>(JigsawStatus.LOADING)
  const jigsawImageClippedRef = useRef<HTMLCanvasElement>()
  const jigsawEndPositionBlockRef = useRef<HTMLCanvasElement>()

  const onMoveStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (JigsawStatus.READY === jigsawStatus) {
      const {x} = getPosition(e)
      setJigsawData((val) => ({
        ...val,
        isMoving: true,
        startX: x,
        limitedX: JIGSAW_WIDTH - JIGSAW_SHAPE_SIZE
      }))
    }
  }

  const onMoving = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (jigsawData.isMoving) {
      const {x} = getPosition(e)
      const distance = x - jigsawData.startX
      if (distance > jigsawData.limitedX + 5 || distance < 0) return onMoveEnd()
      setJigsawData((val) => ({
        ...val,
        curX: distance
      }))
    }
  }

  const onMoveEnd = () => {    
    if (jigsawStatus !== JigsawStatus.READY) return
    setJigsawData((val) => ({
      ...val,
      isMoving: false
    }))
    if (jigsawData.curX >= jigsawData.clippedX - 0.5 && jigsawData.curX <= jigsawData.clippedX + 0.5) {
      setJigsawStatus(JigsawStatus.MATCH)
      setSliderStyle(style.verify_slider_success)
      setTimeout(() => {
        props.onSuccess()
      }, 300);
    } else {
      setJigsawStatus(JigsawStatus.ERROR)
      setSliderStyle(style.verify_slider_error)
      
      setTimeout(() => {
        onMatchError()
      }, 500);
    }
  }

  const onMatchError = () => {

    const jigsawImageClippedCtx = jigsawImageClippedRef.current?.getContext('2d')
    const jigsawEndPositionBlockCtx = jigsawEndPositionBlockRef.current?.getContext('2d')
    if (jigsawImageClippedCtx) {
      jigsawImageClippedCtx.restore()
      jigsawImageClippedCtx.clearRect(0,0, JIGSAW_SHAPE_SIZE, JIGSAW_SHAPE_SIZE)
    }
    if (jigsawEndPositionBlockCtx) {
      jigsawEndPositionBlockCtx.restore()
      jigsawEndPositionBlockCtx.clearRect(0,0, JIGSAW_SHAPE_SIZE, JIGSAW_SHAPE_SIZE)
    }

    setJigsawData((val) => ({
      ...val,
      clippedX: getRandom(JIGSAW_WIDTH / 2, JIGSAW_WIDTH - JIGSAW_SHAPE_SIZE),
      clippedY: getRandom(JIGSAW_SHAPE_SIZE, JIGSAW_HEIGHT - JIGSAW_SHAPE_SIZE),
      curX: 0
    }))

    setSliderStyle('')
    props.onReload()
    props.onError()
  }

  useEffect(() => {
    const image = new Image()

    const imageLoaded = () => {
      const jigsawImageClippedCtx = jigsawImageClippedRef.current?.getContext('2d')
      const jigsawEndPositionBlockCtx = jigsawEndPositionBlockRef.current?.getContext('2d')
      const jigsawShapeIdx = getRandom(0, jigsawShapeList.length - 1)
      if (jigsawEndPositionBlockCtx) {
        genJigsawShape(jigsawEndPositionBlockCtx, JIGSAW_SHAPE_SIZE, jigsawShapeIdx)
        jigsawEndPositionBlockCtx.fillStyle = 'rgba(255, 255, 255, .7)'
        jigsawEndPositionBlockCtx.fill()
      }

      if (jigsawImageClippedCtx) {

        genJigsawShape(jigsawImageClippedCtx, JIGSAW_SHAPE_SIZE, jigsawShapeIdx)
        jigsawImageClippedCtx.drawImage(
          image, 
          jigsawData?.clippedX, 
          jigsawData?.clippedY, 
          JIGSAW_SHAPE_SIZE,
          JIGSAW_SHAPE_SIZE,
          0,0,
          JIGSAW_SHAPE_SIZE,
          JIGSAW_SHAPE_SIZE
        )
      }

      setJigsawStatus(JigsawStatus.READY)
    }

    image.src = imageUrl

    image.addEventListener('load', imageLoaded, false)

    return () => {
      image.removeEventListener('load', imageLoaded, false)
    }
  }, [imageUrl])

  return (
    <>
      <div
        style={{ 
          width: 280, 
          height: 155, 
          backgroundSize: 'cover', 
          backgroundImage: `url(${imageUrl})` 
        }}
        className={cx({'shake-hard shake-constant': jigsawStatus === JigsawStatus.ERROR})}
      >
        <canvas
          ref={(el: HTMLCanvasElement) => jigsawEndPositionBlockRef.current = el} 
          width={52}
          height={52}
          style={{left: jigsawData?.clippedX, top: jigsawData?.clippedY, position: 'absolute'}}
        />

        <div
          onTouchStart={onMoveStart}
          onTouchMove={onMoving}
          onTouchEnd={onMoveEnd}
          onMouseDown={onMoveStart}
          onMouseMove={onMoving}
          onMouseUp={onMoveEnd}
        >
          <canvas 
            ref={(el: HTMLCanvasElement) => jigsawImageClippedRef.current = el}
            width={52}
            height={52}
            style={{left: jigsawData?.curX, top: jigsawData?.clippedY, position: 'absolute'}}
          />
        </div>
      </div>
      <div className={style.verify_slider}
        onTouchStart={onMoveStart}
        onTouchMove={onMoving}
        onTouchEnd={onMoveEnd}
        onMouseDown={onMoveStart}
        onMouseMove={onMoving}
        onMouseUp={onMoveEnd}
      >
        <div
          className={"ml-[55px] bg-[#2b3139]"}
        >
          滑動以完成拼圖
        </div>
        <div 
          className={cx(style.verify_slider_arrow, sliderStyle)}
          style={{width: 46.5 + jigsawData?.curX + 'px'}}
        >
          <span className={'pr-[12px]'}>{"-->"}</span>
        </div>
      </div>
    </>
  )
}

