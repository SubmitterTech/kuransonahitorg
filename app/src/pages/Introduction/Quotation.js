import React from 'react'

const Quotation = ({text}) => {
  return (
    <div className='bg-gray-600 text-white border border-black p-5 text-xl italic'  style={{ whiteSpace: 'pre-line' }}>{text}</div>
  )
}

export default Quotation