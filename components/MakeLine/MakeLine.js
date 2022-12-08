import { useRouter } from 'next/router'
import React from 'react'

function MakeLine() {
    const router = useRouter()
    const query = router.query
    console.log(query.makeline);
  return (
    <div>MakeLine</div>
  )
}

export default MakeLine