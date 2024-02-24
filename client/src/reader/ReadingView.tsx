import React, { useState } from 'react'
import Reader from './reader'
import Dictionary from './dictionary'

function ReadingView() {
  return (
    <div className="flex">
      <Reader />
      <div className="basis-72 shrink-0"></div>
      <Dictionary />
    </div>
  )
}

export default ReadingView
