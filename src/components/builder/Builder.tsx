'use client'

import { useEffect, useRef, useState } from 'react'
import grapesjs, { type Editor } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import { defaultContent, registerBlocks } from './blocks'

const STORAGE_PROJECT = 'akin-builder-project'
const STORAGE_HTML = 'akin-builder-html'
const STORAGE_CSS = 'akin-builder-css'
const STORAGE_THEME = 'akin-builder-theme'

const canvasCss = `
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg,#f5f5f2);color:var(--ink,#111827);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6}
a{color:inherit;text-decoration:none}
h1,h2,h3,p{margin-top:0}
.container{width:min(1180px,calc(100% - 48px));margin:0 auto}
.section{padding:100px 0}
.navbar{position:relative;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:30px;padding:24px max(24px,calc((100vw - 1180px)/2));background:rgba(245,245,242,.84);border-bottom:1px solid rgba(17,24,39,.08);backdrop-filter:blur(18px)}
.brand{font-weight:900;letter-spacing:-.04em;font-size:20px}
.navlinks{display:flex;gap:30px;font-size:14px;color:#525866}
.navlinks a:hover{color:var(--accent,#6847ff)}
.hero{min-height:760px;display:flex;align-items:center;padding:80px max(24px,calc((100vw - 1180px)/2)) 110px;overflow:hidden}
.hero-grid{width:100%;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:70px}
.hero-copy h1{font-size:clamp(58px,7vw,108px);line-height:.92;letter-spacing:-.065em;max-width:900px;margin:22px 0 28px}
.hero-copy p{font-size:19px;line-height:1.7;color:#606775;max-width:640px}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:800;letter-spacing:.2em;color:var(--accent,#6847ff)}
.eyebrow:before{content:"";width:28px;height:1px;background:currentColor}
.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}
.btn{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(17,24,39,.12);border-radius:999px;padding:15px 24px;font-size:14px;font-weight:750;transition:.2s ease;cursor:pointer}
.btn:hover{transform:translateY(-2px)}
.btn-primary,.btn-small{background:var(--ink,#111827);color:white;border-color:var(--ink,#111827)}
.btn-ghost{background:transparent}
.btn-small{padding:11px 18px}
.btn-light{background:white;color:#111827;border-color:white}
.hero-visual{min-height:540px;position:relative;border-radius:36px;overflow:hidden;background:linear-gradient(145deg,var(--accent,#6847ff),#111827);box-shadow:0 50px 120px rgba(22,25,36,.24)}
.orb{position:absolute;border-radius:50%;filter:blur(2px)}
.orb-one{width:330px;height:330px;right:-60px;top:-45px;background:rgba(255,255,255,.28)}
.orb-two{width:240px;height:240px;left:-60px;bottom:-50px;background:rgba(255,204,107,.72)}
.glass-card{position:absolute;left:28px;right:28px;bottom:28px;display:flex;justify-content:space-between;align-items:flex-end;padding:28px;border:1px solid rgba(255,255,255,.25);border-radius:24px;background:rgba(255,255,255,.12);backdrop-filter:blur(18px);color:white}
.glass-card span{font-size:11px;letter-spacing:.18em}
.glass-card strong{font-size:70px;line-height:.8;letter-spacing:-.07em}
.section-head{max-width:760px;margin-bottom:50px}
.section-head h2,.content-card h2{font-size:clamp(40px,5vw,70px);line-height:1;letter-spacing:-.055em;margin:18px 0 20px}
.section-head p,.content-card p{color:#69707e;font-size:17px}
.cards-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.feature-card,.content-card,.media-card,.bento-item{border:1px solid rgba(17,24,39,.09);border-radius:26px;background:#fff;padding:34px}
.feature-card{min-height:280px;display:flex;flex-direction:column}
.feature-card>span,.bento-item>span{font-size:12px;letter-spacing:.15em;color:var(--accent,#6847ff)}
.feature-card h3,.bento-item h3{font-size:28px;letter-spacing:-.035em;margin-top:auto;margin-bottom:10px}
.feature-card p,.bento-item p{color:#737987;margin:0}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:stretch}
.media-card{padding:16px;min-height:440px}
.media-placeholder{height:100%;min-height:405px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#ece9ff,#d9d5ff);color:#6b58c7;font-size:12px;letter-spacing:.2em;font-weight:800}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(17,24,39,.12);border-bottom:1px solid rgba(17,24,39,.12)}
.stat{padding:34px 20px;border-right:1px solid rgba(17,24,39,.12)}
.stat:last-child{border-right:0}
.stat strong{display:block;font-size:54px;letter-spacing:-.055em}
.stat span{font-size:13px;color:#737987}
.bento{display:grid;grid-template-columns:1.3fr .7fr;grid-template-rows:1fr 1fr;gap:16px}
.bento-item{min-height:220px}
.bento-large{grid-row:1/3;min-height:460px;background:#111827;color:white}
.bento-large p{color:#aeb4c0}
.logo-row{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;align-items:center;border-top:1px solid rgba(17,24,39,.1);border-bottom:1px solid rgba(17,24,39,.1);padding:30px 0}
.logo-row span{text-align:center;font-size:12px;font-weight:800;letter-spacing:.1em;color:#8a909c}
.quote{margin:0;padding:60px;border-radius:30px;background:#111827;color:white}
.quote p{font-size:clamp(32px,4vw,58px);line-height:1.08;letter-spacing:-.045em}
.quote footer{color:#aeb4c0}
.faq{border-top:1px solid rgba(17,24,39,.12)}
.faq details{border-bottom:1px solid rgba(17,24,39,.12);padding:24px 0}
.faq summary{font-size:20px;font-weight:750;cursor:pointer}
.faq p{color:#6f7683;padding-top:16px}
.cta{display:flex;justify-content:space-between;align-items:center;gap:30px;padding:54px;border-radius:34px;background:var(--accent,#6847ff);color:white}
.cta h2{font-size:clamp(40px,5vw,66px);line-height:1;letter-spacing:-.05em;margin:14px 0 0}
.cta .eyebrow{color:white}
.contact-form{display:flex;flex-direction:column;gap:12px;padding:32px;border-radius:26px;background:white;border:1px solid rgba(17,24,39,.09)}
.contact-form input,.contact-form textarea{width:100%;border:1px solid rgba(17,24,39,.12);border-radius:14px;padding:16px;font:inherit;background:#fbfbfa}
.contact-form textarea{min-height:140px;resize:vertical}
.footer{display:grid;grid-template-columns:1fr auto;gap:30px;padding:60px max(24px,calc((100vw - 1180px)/2));background:#0d111a;color:white}
.footer p,.footer small{color:#939aa7}
.footer-links{display:flex;gap:20px}
.footer small{grid-column:1/-1;padding-top:30px;border-top:1px solid rgba(255,255,255,.1)}
@media(max-width:900px){
 .navlinks{display:none}.hero{min-height:auto;padding-top:60px}.hero-grid,.grid-2{grid-template-columns:1fr}.hero-copy h1{font-size:60px}.hero-visual{min-height:420px}
 .cards-3{grid-template-columns:1fr}.stats-grid{grid-template-columns:1fr 1fr}.stat:nth-child(2){border-right:0}
 .bento{grid-template-columns:1fr;grid-template-rows:auto}.bento-large{grid-row:auto}.logo-row{grid-template-columns:1fr 1fr}.cta{align-items:flex-start;flex-direction:column}
}
@media(max-width:560px){
 .container{width:min(100% - 28px,1180px)}.section{padding:70px 0}.navbar{padding:18px 14px}.navbar .btn{display:none}
 .hero{padding:54px 14px 80px}.hero-copy h1{font-size:46px}.hero-copy p{font-size:16px}.hero-visual{min-height:340px}.glass-card strong{font-size:48px}
 .section-head h2,.content-card h2{font-size:38px}.stats-grid{grid-template-columns:1fr}.stat{border-right:0;border-bottom:1px solid rgba(17,24,39,.12)}
 .stat:last-child{border-bottom:0}.cta{padding:32px}.quote{padding:32px}.footer{grid-template-columns:1fr}.footer-links{flex-wrap:wrap}
}
`

type Theme = { accent: string; background: string; ink: string }

const defaultTheme: Theme = { accent: '#6847ff', background: '#f5f5f2', ink: '#111827' }

function applyTheme(editor: Editor, theme: Theme) {
  const body = editor.Canvas.getBody()
  if (!body) return
  body.style.setProperty('--accent', theme.accent)
  body.style.setProperty('--bg', theme.background)
  body.style.setProperty('--ink', theme.ink)
  body.style.background = theme.background
  body.style.color = theme.ink
}

export default function Builder() {
  const editorRef = useRef<Editor | null>(null)
  const [ready, setReady] = useState(false)
  const [tab, setTab] = useState<'blocks'|'styles'|'layers'|'traits'|'theme'>('blocks')
  const [status, setStatus] = useState('Hazır')
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    let mounted = true
    let editor: Editor | null = null

    const init = async () => {
      const storedTheme = localStorage.getItem(STORAGE_THEME)
      const initialTheme = storedTheme ? { ...defaultTheme, ...JSON.parse(storedTheme) } : defaultTheme
      setTheme(initialTheme)

      editor = grapesjs.init({
        container: '#gjs',
        height: '100%',
        width: 'auto',
        fromElement: false,
        storageManager: false,
        panels: { defaults: [] },
        blockManager: { appendTo: '#blocks' },
        layerManager: { appendTo: '#layers' },
        traitManager: { appendTo: '#traits' },
        selectorManager: { appendTo: '#styles' },
        styleManager: {
          appendTo: '#styles',
          sectors: [
            { name: 'Boyut', open: true, buildProps: ['width','height','min-height','max-width','margin','padding'] },
            { name: 'Tipografi', open: true, buildProps: ['font-family','font-size','font-weight','letter-spacing','color','line-height','text-align','text-transform'] },
            { name: 'Arka Plan', open: false, buildProps: ['background-color','background','opacity'] },
            { name: 'Kenar', open: false, buildProps: ['border','border-radius','box-shadow'] },
            { name: 'Yerleşim', open: false, buildProps: ['display','position','top','right','bottom','left','gap','align-items','justify-content','flex-direction'] }
          ]
        },
        deviceManager: {
          devices: [
            { id: 'desktop', name: 'Desktop', width: '' },
            { id: 'tablet', name: 'Tablet', width: '768px', widthMedia: '992px' },
            { id: 'mobile', name: 'Mobil', width: '390px', widthMedia: '575px' }
          ]
        },
        canvas: {
          styles: [],
          scripts: []
        },
        style: canvasCss
      })

      registerBlocks(editor)

      const saved = localStorage.getItem(STORAGE_PROJECT)
      if (saved) {
        try {
          editor.loadProjectData(JSON.parse(saved))
        } catch {
          editor.setComponents(defaultContent)
        }
      } else {
        editor.setComponents(defaultContent)
      }

      editor.on('load', () => applyTheme(editor!, initialTheme))
      editor.on('component:selected', () => setTab('styles'))
      editor.on('update', () => setStatus('Kaydedilmemiş değişiklik'))
      applyTheme(editor, initialTheme)

      if (mounted) {
        editorRef.current = editor
        setReady(true)
      }
    }

    init()
    return () => {
      mounted = false
      editor?.destroy()
      editorRef.current = null
    }
  }, [])

  const save = () => {
    const editor = editorRef.current
    if (!editor) return
    localStorage.setItem(STORAGE_PROJECT, JSON.stringify(editor.getProjectData()))
    localStorage.setItem(STORAGE_HTML, editor.getHtml())
    localStorage.setItem(STORAGE_CSS, themeCss(theme) + '\n' + editor.getCss())
    localStorage.setItem(STORAGE_THEME, JSON.stringify(theme))
    setStatus('Kaydedildi')
  }

  const preview = () => {
    save()
    window.open('/preview', '_blank', 'noopener,noreferrer')
  }

  const exportHtml = () => {
    const editor = editorRef.current
    if (!editor) return
    const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Web Sitesi</title>
<style>${themeCss(theme)}\n${editor.getCss()}</style>
</head>
<body>
${editor.getHtml()}
</body>
</html>`
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'website.html'
    a.click()
    URL.revokeObjectURL(url)
    setStatus('HTML dışa aktarıldı')
  }

  const updateTheme = (key: keyof Theme, value: string) => {
    const next = { ...theme, [key]: value }
    setTheme(next)
    localStorage.setItem(STORAGE_THEME, JSON.stringify(next))
    if (editorRef.current) applyTheme(editorRef.current, next)
    setStatus('Tema güncellendi')
  }

  const reset = () => {
    if (!window.confirm('Sayfadaki tüm değişiklikler sıfırlansın mı?')) return
    const editor = editorRef.current
    if (!editor) return
    localStorage.removeItem(STORAGE_PROJECT)
    localStorage.removeItem(STORAGE_HTML)
    localStorage.removeItem(STORAGE_CSS)
    editor.setComponents(defaultContent)
    editor.setStyle(canvasCss)
    applyTheme(editor, theme)
    setStatus('Sayfa sıfırlandı')
  }

  const undo = () => editorRef.current?.UndoManager.undo()
  const redo = () => editorRef.current?.UndoManager.redo()
  const setDevice = (name: 'Desktop'|'Tablet'|'Mobil') => editorRef.current?.setDevice(name)

  return (
    <main className="builder-shell">
      <header className="builder-topbar">
        <div className="builder-brand">
          <span className="builder-mark">A</span>
          <div><strong>Web Builder</strong><small>{status}</small></div>
        </div>

        <div className="device-switcher">
          <button onClick={() => setDevice('Desktop')}>Masaüstü</button>
          <button onClick={() => setDevice('Tablet')}>Tablet</button>
          <button onClick={() => setDevice('Mobil')}>Mobil</button>
        </div>

        <div className="top-actions">
          <button onClick={undo}>Geri</button>
          <button onClick={redo}>İleri</button>
          <button onClick={preview}>Önizle</button>
          <button onClick={exportHtml}>HTML</button>
          <button className="primary-action" onClick={save}>Kaydet</button>
        </div>
      </header>

      <div className="builder-workspace">
        <aside className="builder-sidebar">
          <div className="sidebar-tabs">
            <button className={tab === 'blocks' ? 'active' : ''} onClick={() => setTab('blocks')}>Bloklar</button>
            <button className={tab === 'styles' ? 'active' : ''} onClick={() => setTab('styles')}>Stil</button>
            <button className={tab === 'layers' ? 'active' : ''} onClick={() => setTab('layers')}>Katman</button>
            <button className={tab === 'traits' ? 'active' : ''} onClick={() => setTab('traits')}>Ayar</button>
            <button className={tab === 'theme' ? 'active' : ''} onClick={() => setTab('theme')}>Tema</button>
          </div>

          <div className="sidebar-head">
            <strong>{tab === 'blocks' ? 'İçerik Blokları' : tab === 'styles' ? 'Tasarım Ayarları' : tab === 'layers' ? 'Katmanlar' : tab === 'traits' ? 'Bileşen Ayarları' : 'Global Tema'}</strong>
            <small>{tab === 'blocks' ? 'Bloğu sürükleyip sayfaya bırakın.' : tab === 'styles' ? 'Sayfadan bir öğe seçin.' : tab === 'theme' ? 'Sitenin ana görünümünü değiştirin.' : 'Seçili alanı yönetin.'}</small>
          </div>

          <div className={tab === 'blocks' ? 'panel-host active' : 'panel-host'} id="blocks" />
          <div className={tab === 'styles' ? 'panel-host active' : 'panel-host'} id="styles" />
          <div className={tab === 'layers' ? 'panel-host active' : 'panel-host'} id="layers" />
          <div className={tab === 'traits' ? 'panel-host active' : 'panel-host'} id="traits" />

          <div className={tab === 'theme' ? 'theme-panel active' : 'theme-panel'}>
            <label><span>Vurgu Rengi</span><input type="color" value={theme.accent} onChange={e => updateTheme('accent', e.target.value)} /><code>{theme.accent}</code></label>
            <label><span>Arka Plan</span><input type="color" value={theme.background} onChange={e => updateTheme('background', e.target.value)} /><code>{theme.background}</code></label>
            <label><span>Metin Rengi</span><input type="color" value={theme.ink} onChange={e => updateTheme('ink', e.target.value)} /><code>{theme.ink}</code></label>
            <div className="theme-presets">
              <button onClick={() => { updateTheme('accent','#6847ff'); updateTheme('background','#f5f5f2'); updateTheme('ink','#111827') }}>Violet</button>
              <button onClick={() => { updateTheme('accent','#b5904a'); updateTheme('background','#f7f3eb'); updateTheme('ink','#151515') }}>Luxury</button>
              <button onClick={() => { updateTheme('accent','#0f766e'); updateTheme('background','#f1f7f5'); updateTheme('ink','#10201d') }}>Emerald</button>
              <button onClick={() => { updateTheme('accent','#2563eb'); updateTheme('background','#f5f7fb'); updateTheme('ink','#0f172a') }}>Corporate</button>
            </div>
            <button className="danger-action" onClick={reset}>Sayfayı Sıfırla</button>
          </div>
        </aside>

        <section className="canvas-shell">
          {!ready && <div className="builder-loading">Editör hazırlanıyor...</div>}
          <div id="gjs" />
        </section>
      </div>
    </main>
  )
}

function themeCss(theme: Theme) {
  return `:root{--accent:${theme.accent};--bg:${theme.background};--ink:${theme.ink}}body{background:var(--bg);color:var(--ink)}`
}
