import React, { useState } from 'react'
import { Word } from '../states'
import { useRecoilState } from 'recoil'
import { RegExpMatchArrayWithIndices } from '../types'

function Reader() {
  const [text] = useState(
    `Among going manor who did. Do ye is celebrated it sympathize considered. May ecstatic did surprise elegance the ignorant age. Own her miss cold last. It so numerous if he outlived disposal. How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved resolution. Hence hopes noisy may china fully and. Am it regard stairs branch thirty length afford.

    Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly. So gate at no only none open. Betrayed at properly it of graceful on. Dinner abroad am depart ye turned hearts as me wished. Therefore allowance too perfectly gentleman supposing man his now. Families goodness all eat out bed steepest servants. Explained the incommode sir improving northward immediate eat. Man denoting received you sex possible you. Shew park own loud son door less yet.
    
    Shewing met parties gravity husband sex pleased. On to no kind do next feel held walk. Last own loud and knew give gay four. Sentiments motionless or principles preference excellence am. Literature surrounded insensible at indulgence or to admiration remarkably. Matter future lovers desire marked boy use. Chamber reached do he nothing be.
    
    Adieus except say barton put feebly favour him. Entreaties unpleasant sufficient few pianoforte discovered uncommonly ask. Morning cousins amongst in mr weather do neither. Warmth object matter course active law spring six. Pursuit showing tedious unknown winding see had man add. And park eyes too more him. Simple excuse active had son wholly coming number add. Though all excuse ladies rather regard assure yet. If feelings so prospect no as raptures quitting.
    
    Attention he extremity unwilling on otherwise. Conviction up partiality as delightful is discovered. Yet jennings resolved disposed exertion you off. Left did fond drew fat head poor. So if he into shot half many long. China fully him every fat was world grave.
    
    Put all speaking her delicate recurred possible. Set indulgence inquietude discretion insensible bed why announcing. Middleton fat two satisfied additions. So continued he or commanded household smallness delivered. Door poor on do walk in half. Roof his head the what.
    
    Your it to gave life whom as. Favourable dissimilar resolution led for and had. At play much to time four many. Moonlight of situation so if necessary therefore attending abilities. Calling looking enquire up me to in removal. Park fat she nor does play deal our. Procured sex material his offering humanity laughing moderate can. Unreserved had she nay dissimilar admiration interested. Departure performed exquisite rapturous so ye me resources.
    
    Departure so attention pronounce satisfied daughters am. But shy tedious pressed studied opinion entered windows off. Advantage dependent suspicion convinced provision him yet. Timed balls match at by rooms we. Fat not boy neat left had with past here call. Court nay merit few nor party learn. Why our year her eyes know even how. Mr immediate remaining conveying allowance do or.
    
    Certainty determine at of arranging perceived situation or. Or wholly pretty county in oppose. Favour met itself wanted settle put garret twenty. In astonished apartments resolution so an it. Unsatiable on by contrasted to reasonable companions an. On otherwise no admitting to suspicion furniture it.
    
    Sociable on as carriage my position weddings raillery consider. Peculiar trifling absolute and wandered vicinity property yet. The and collecting motionless difficulty son. His hearing staying ten colonel met. Sex drew six easy four dear cold deny. Moderate children at of outweigh it. Unsatiable it considered invitation he travelling insensible. Consulted admitting oh mr up as described acuteness propriety moonlight.
    `
  )

  const [wordSelected, setWordSelected] = useState('')
  const [, setWord] = useRecoilState(Word)

  function wordSelectHandler(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement
    if (target.classList.contains('word')) {
      setWordSelected(target.id)
      setWord(target.innerHTML)
    }
  }

  let wordCount = 0

  const sections = text.split('\n')
  const sectionList = sections.map((text, idx) => {
    // if the string only contains space
    if (text.trim().length === 0) {
      return <></>
    }
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
      <div
        className="w-2/3 border-red-600 border border-solid my-3"
        key={'s-' + idx}
      >
        {wordList}
      </div>
    )
  })

  return (
    <div onClick={wordSelectHandler} className="flex flex-col items-center">
      {sectionList}
    </div>
  )
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
      // fill in the gaps
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
      // fill in the last elements
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
