import getRandom from '@/utils/getRandom'
import { useState } from 'react'
import Jigsaw from '../Jigsaw'

const url = [
    'https://vd004-tiger-portal.dev.mppwr.com/static/media/15.9ecf49ba.jpg',
    'https://vd004-tiger-portal.dev.mppwr.com/static/media/6.e2224487.jpg',
    'https://vd004-tiger-portal.dev.mppwr.com/static/media/11.ae1570d8.jpg',
    'https://vd004-tiger-portal.dev.mppwr.com/static/media/14.66d0d132.jpg',
    'https://vd004-tiger-portal.dev.mppwr.com/static/media/9.8fd0b466.jpg'
  ]
export default function JigsawModal (props: {display: boolean, onSuccess:() => void, onClose: () => void}) {
    const {display} = props
    const [imageUrlIdx, setImageUrlIdx] = useState(getRandom(0, 4))
    return <div>
        {
            display && <div>
                <div className='shadow-white pt-[16px] pb-[32px] bg-[#1e2329] absolute top-[50%] left-[50%] z-[20] translate-x-[-50%] translate-y-[-50%]'>
                    <div className=''>
                        <div className='flex justify-between'>
                            <h2 className='pl-[5px] text-[#FFFFFF]'>安全驗證</h2>
                            <span className='pr-[15px]' onClick={props.onClose}>X</span>
                        </div>
                        <Jigsaw 
                            imageUrl={url[imageUrlIdx]}
                            onSuccess={props.onSuccess}
                            onError={() => {console.log('error')}}
                            onReload={() => {
                                if (imageUrlIdx >= 0 && imageUrlIdx < 4) {
                                setImageUrlIdx(imageUrlIdx + 1)
                                } else {
                                setImageUrlIdx(imageUrlIdx - 1)
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        }
    </div>
}