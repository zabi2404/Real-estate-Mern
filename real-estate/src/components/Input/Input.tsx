
import { IoIosSearch } from "react-icons/io";

export default function Input() {
  return (
    <>
    <div className='flex items-center justify-between  bg-[#F1F5F9] p-3 rounded-[8px] 
    md:min-w-[400px]
    xsm:min-w-full
    
    '   >
        <input className='outline-none' type="text" placeholder='Search...' />
<IoIosSearch  />

    </div>
    </>
  )
}
