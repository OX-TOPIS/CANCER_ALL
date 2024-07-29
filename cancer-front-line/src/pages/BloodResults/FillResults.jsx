import React from 'react'
import { Link } from 'react-router-dom'

const FillResults = () => {
  return (
    <div className="">
      
      {/* ปุ่มส่งผลเลือด */}
      <Link to={"/BloodResults/DisplayBloodResults"}>
        <button className='bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg w-11/12 m-2 p-3 rounded-full  mt-20 text-white'>ส่งผลเลือด</button>
      </Link>


      {/* ปุ่มส่งผลการรักษาอื่นๆ */}
      {/* <Link to={"/DisplayOtherResults"}>
        <button className='bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg w-11/12 m-2 p-3 rounded-full  mt-20 text-white'>ปุ่มส่งผลการรักษาอื่นๆ</button>
      </Link> */}
    </div>
    
  )
}

export default FillResults