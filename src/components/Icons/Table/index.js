import React from 'react'

export default React.memo(function Table(props) {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='34'
      height='32'
      viewBox='0 0 34 32'
      {...props}
    >
      <path d='M0 2v28h32v-28h-32zM12 20v-6h8v6h-8zM20 22v6h-8v-6h8zM20 6v6h-8v-6h8zM10 6v6h-8v-6h8zM2 14h8v6h-8v-6zM22 14h8v6h-8v-6zM22 12v-6h8v6h-8zM2 22h8v6h-8v-6zM22 28v-6h8v6h-8z'></path>
    </svg>
  )
})
