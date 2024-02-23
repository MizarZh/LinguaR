import React, { useState } from 'react'
import Reader from './reader'
import Dictionary from './dictionary'

function ReadingView() {
  return (
    <div className="flex">
      <Reader />
      <Dictionary />
    </div>
  )
}

export default ReadingView
