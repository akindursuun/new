'use client'

import { useEffect, useState } from 'react'

export default function PreviewClient() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')

  useEffect(() => {
    setHtml(localStorage.getItem('akin-builder-html') || '<main style="font-family:Arial;padding:60px"><h1>Henüz yayınlanmış içerik yok.</h1><p>Admin paneline dönüp Kaydet butonuna basın.</p></main>')
    setCss(localStorage.getItem('akin-builder-css') || '')
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}
