import React from 'react'

const Title = ({text}) => {
    return (
        <div className='flex justify-center items-center'>
            <h3 className=' text-3xl font-bold text-center' style={{ whiteSpace: 'pre-line' }}>{text}</h3>
        </div>
    )
}

export default Title