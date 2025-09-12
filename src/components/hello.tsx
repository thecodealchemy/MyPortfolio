'use client'

import { useEffect } from 'react'

function Hello() {
  useEffect(() => {
    console.log(`
Hi This is Hugo!!!

Love the design? More details at https://github.com/1chooo/1chooo.com
`)
  }, [])

  return null
}

export default Hello
