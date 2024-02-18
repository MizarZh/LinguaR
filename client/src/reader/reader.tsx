import React, { useState } from 'react'

type RegExpMatchArrayWithIndices = RegExpMatchArray & {
  indices: Array<[number, number]>
}

function Reader() {
  const [text] = useState(
    `Welcome to the website. If you're here, you're likely looking to find random words. Random Word Generator is the perfect tool to help you do this. While this tool isn't a word creator, it is a word generator that will generate random words for a variety of activities or uses. Even better, it allows you to adjust the parameters of the random words to best fit your needs.
The first option the tool allows you to adjust is the number of random words to be generated. You can choose as many or as few as you'd like. You also have the option  of choosing words that only begin with a certain letter, only end with a certain letter or only begin and end with certain letters. If you leave these blank, the randomized words that appear will be from the complete list.
Another option you have is choosing the number of syllables of the words or the word length of the randomized words. There are also ways to further refine these by choosing the "less than" or "greater than" options for both syllables and word length. Again, if you leave the space blank, the complete list of randomized words will be used.`
  )

  const [wordSelected, setWordSelected] = useState('')

  function wordSelectHandler(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement
    if (target.classList.contains('word')) {
      setWordSelected(target.id)
    }
  }

  let wordCount = 0

  const sections = text.split('\n')
  const sectionList = sections.map((text, idx) => {
    const wordList = wordSeparator(text).map((val, index) => {
      if (val.type === 'fill') {
        // replace space with \u00A0
        const fill = val.value.replaceAll(' ', '\u00A0')
        return <span key={index}>{fill}</span>
      } else if (val.type === 'word') {
        wordCount += 1
        return (
          <span
            key={'w-' + wordCount}
            id={'w-' + wordCount}
            className={`word ${
              wordSelected == 'w-' + wordCount ? 'selected' : ''
            }`}
          >
            {val.value}
          </span>
        )
      }
    })
    return (
      <div className="section" key={'s-' + idx}>
        {wordList}
      </div>
    )
  })

  return <div onClick={wordSelectHandler}>{sectionList}</div>
}

// tokenize words
function wordSeparator(text: string) {
  const tokens = []
  let idx = 0,
    flag = true
  const re = /\w+/dg

  while (flag) {
    const result = re.exec(text) as RegExpMatchArrayWithIndices
    if (result !== null) {
      const indices = result.indices[0]
      tokens.push({
        type: 'fill',
        value: text.slice(idx, indices[0]),
        level: 0,
      })
      // second element of indices
      tokens.push({
        type: 'word',
        value: result[0],
        level: 5,
      })
      idx = indices[1]
    } else {
      tokens.push({
        type: 'fill',
        value: text.slice(idx),
        level: 0,
      })
      flag = false
    }
  }
  return tokens
}

export default Reader
