import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function MakeLine() {
    const router = useRouter()
    const query = router.query
    const dispatch = useDispatch()
    const order = useSelector(state => state.sale.order)
    console.log(order);
    
  return (
    <div>MakeLine</div>
  )
}

export default MakeLine