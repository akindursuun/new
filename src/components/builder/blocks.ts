import type { Editor } from 'grapesjs'

const wrap = (content: string) => `
<section class="section">
  <div class="container">${content}</div>
</section>`

export function registerBlocks(editor: Editor) {
  const bm = editor.BlockManager

  bm.add('hero-premium', {
    label: 'Premium Hero',
    category: 'Hero',
    content: `
<section class="hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <span class="eyebrow">YENİ NESİL DİJİTAL DENEYİM</span>
      <h1>Markanızı sıradanlığın dışına taşıyın.</h1>
      <p>Güçlü tasarım, net mesaj ve yüksek performansla ziyaretçilerinizi müşteriye dönüştüren web deneyimleri oluşturun.</p>
      <div class="actions">
        <a class="btn btn-primary" href="#iletisim">Projenizi Başlatın</a>
        <a class="btn btn-ghost" href="#hizmetler">Hizmetleri İnceleyin</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="orb orb-one"></div>
      <div class="orb orb-two"></div>
      <div class="glass-card">
        <span>WEB EXPERIENCE</span>
        <strong>01</strong>
      </div>
    </div>
  </div>
</section>`
  })

  bm.add('navbar', {
    label: 'Navigasyon',
    category: 'Genel',
    content: `
<header class="navbar">
  <a class="brand" href="#">MARKA</a>
  <nav class="navlinks">
    <a href="#hakkimizda">Hakkımızda</a>
    <a href="#hizmetler">Hizmetler</a>
    <a href="#projeler">Projeler</a>
    <a href="#iletisim">İletişim</a>
  </nav>
  <a class="btn btn-small" href="#iletisim">Teklif Al</a>
</header>`
  })

  bm.add('section-heading', {
    label: 'Bölüm Başlığı',
    category: 'Metin',
    content: wrap(`
      <div class="section-head">
        <span class="eyebrow">BÖLÜM ETİKETİ</span>
        <h2>Güçlü bir başlık burada yer alır.</h2>
        <p>Bu alan bölümünüzü kısa ve net biçimde anlatmak için kullanılabilir.</p>
      </div>`)
  })

  bm.add('two-column', {
    label: '2 Kolon',
    category: 'Yerleşim',
    content: wrap(`
      <div class="grid-2">
        <div class="content-card">
          <span class="eyebrow">HAKKIMIZDA</span>
          <h2>Fikri güçlü bir deneyime dönüştürüyoruz.</h2>
          <p>Metninizi buradan düzenleyin. İsterseniz bu alanı ürün, hizmet veya kurumsal anlatım için kullanabilirsiniz.</p>
        </div>
        <div class="media-card">
          <div class="media-placeholder">GÖRSEL / VİDEO</div>
        </div>
      </div>`)
  })

  bm.add('services', {
    label: 'Hizmet Kartları',
    category: 'Kurumsal',
    content: wrap(`
      <div class="section-head">
        <span class="eyebrow">HİZMETLER</span>
        <h2>İhtiyacınıza göre şekillenen çözümler.</h2>
      </div>
      <div class="cards-3">
        <article class="feature-card"><span>01</span><h3>Web Tasarım</h3><p>Markaya özel, hızlı ve modern web deneyimleri.</p></article>
        <article class="feature-card"><span>02</span><h3>Kurumsal Sistemler</h3><p>İçerik yönetimi ve operasyonel ihtiyaçlara uygun çözümler.</p></article>
        <article class="feature-card"><span>03</span><h3>Dijital Büyüme</h3><p>SEO, performans ve dönüşüm odaklı geliştirmeler.</p></article>
      </div>`)
  })

  bm.add('stats', {
    label: 'İstatistikler',
    category: 'Kurumsal',
    content: wrap(`
      <div class="stats-grid">
        <div class="stat"><strong>10+</strong><span>Yıllık Deneyim</span></div>
        <div class="stat"><strong>100+</strong><span>Tamamlanan Proje</span></div>
        <div class="stat"><strong>24/7</strong><span>Kesintisiz Erişim</span></div>
        <div class="stat"><strong>%100</strong><span>Özel Tasarım</span></div>
      </div>`)
  })

  bm.add('bento', {
    label: 'Bento Grid',
    category: 'Kurumsal',
    content: wrap(`
      <div class="bento">
        <div class="bento-item bento-large"><span>01</span><h3>Strateji</h3><p>İhtiyacı anlayıp doğru dijital mimariyi kuruyoruz.</p></div>
        <div class="bento-item"><span>02</span><h3>Tasarım</h3><p>Markaya özgü görsel dil.</p></div>
        <div class="bento-item"><span>03</span><h3>Teknoloji</h3><p>Modern ve performanslı altyapı.</p></div>
      </div>`)
  })

  bm.add('logos', {
    label: 'Logo Bandı',
    category: 'Kurumsal',
    content: wrap(`
      <div class="logo-row">
        <span>PARTNER 01</span><span>PARTNER 02</span><span>PARTNER 03</span><span>PARTNER 04</span><span>PARTNER 05</span>
      </div>`)
  })

  bm.add('testimonial', {
    label: 'Müşteri Yorumu',
    category: 'İçerik',
    content: wrap(`
      <blockquote class="quote">
        <p>“Buraya müşteri görüşünüz veya markanızla ilgili güçlü bir alıntı ekleyebilirsiniz.”</p>
        <footer>Ad Soyad — Firma / Ünvan</footer>
      </blockquote>`)
  })

  bm.add('faq', {
    label: 'SSS',
    category: 'İçerik',
    content: wrap(`
      <div class="section-head"><span class="eyebrow">SSS</span><h2>Merak edilenler.</h2></div>
      <div class="faq">
        <details open><summary>Bu alanı nasıl düzenlerim?</summary><p>Editörde metne çift tıklayarak içeriği değiştirebilirsiniz.</p></details>
        <details><summary>Yeni bölüm ekleyebilir miyim?</summary><p>Sol taraftaki bloklardan istediğinizi sürükleyip sayfaya bırakabilirsiniz.</p></details>
        <details><summary>Mobil görünümü kontrol edebilir miyim?</summary><p>Üst bardaki cihaz seçenekleriyle masaüstü, tablet ve mobil görünümü inceleyebilirsiniz.</p></details>
      </div>`)
  })

  bm.add('cta', {
    label: 'CTA',
    category: 'Dönüşüm',
    content: wrap(`
      <div class="cta">
        <div><span class="eyebrow">BİRLİKTE ÇALIŞALIM</span><h2>Yeni projenizi konuşalım.</h2></div>
        <a class="btn btn-light" href="#iletisim">İletişime Geçin</a>
      </div>`)
  })

  bm.add('contact', {
    label: 'İletişim',
    category: 'Dönüşüm',
    content: wrap(`
      <div class="grid-2" id="iletisim">
        <div class="content-card"><span class="eyebrow">İLETİŞİM</span><h2>Bize ulaşın.</h2><p>Telefon, e-posta ve adres bilgilerinizi burada paylaşabilirsiniz.</p></div>
        <form class="contact-form">
          <input placeholder="Ad Soyad" />
          <input type="email" placeholder="E-posta" />
          <input placeholder="Telefon" />
          <textarea placeholder="Mesajınız"></textarea>
          <button class="btn btn-primary" type="button">Gönder</button>
        </form>
      </div>`)
  })

  bm.add('footer', {
    label: 'Footer',
    category: 'Genel',
    content: `
<footer class="footer">
  <div><strong>MARKA</strong><p>Modern dijital deneyimler.</p></div>
  <div class="footer-links"><a href="#">Gizlilik</a><a href="#">KVKK</a><a href="#">İletişim</a></div>
  <small>© 2026 Tüm hakları saklıdır.</small>
</footer>`
  })

  bm.add('image', {
    label: 'Görsel',
    category: 'Medya',
    content: { type: 'image', style: { width: '100%', display: 'block', borderRadius: '20px' } },
    activate: true
  })

  bm.add('video', {
    label: 'Video',
    category: 'Medya',
    content: `<video controls style="width:100%;border-radius:20px;"><source src="" type="video/mp4"></video>`
  })

  bm.add('button', {
    label: 'Buton',
    category: 'Temel',
    content: '<a class="btn btn-primary" href="#">Buton Metni</a>'
  })

  bm.add('divider', {
    label: 'Ayırıcı',
    category: 'Temel',
    content: '<hr style="border:0;border-top:1px solid rgba(15,23,42,.12);margin:40px 0;" />'
  })
}

export const defaultContent = `
<header class="navbar">
  <a class="brand" href="#">AKIN STUDIO</a>
  <nav class="navlinks">
    <a href="#hizmetler">Hizmetler</a>
    <a href="#yaklasim">Yaklaşım</a>
    <a href="#iletisim">İletişim</a>
  </nav>
  <a class="btn btn-small" href="#iletisim">Teklif Al</a>
</header>
<section class="hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <span class="eyebrow">YENİ NESİL DİJİTAL DENEYİM</span>
      <h1>Markanızı sıradanlığın dışına taşıyın.</h1>
      <p>Güçlü tasarım, net mesaj ve yüksek performansla ziyaretçilerinizi müşteriye dönüştüren web deneyimleri oluşturun.</p>
      <div class="actions">
        <a class="btn btn-primary" href="#iletisim">Projenizi Başlatın</a>
        <a class="btn btn-ghost" href="#hizmetler">Hizmetleri İnceleyin</a>
      </div>
    </div>
    <div class="hero-visual"><div class="orb orb-one"></div><div class="orb orb-two"></div><div class="glass-card"><span>WEB EXPERIENCE</span><strong>01</strong></div></div>
  </div>
</section>
<section class="section" id="hizmetler"><div class="container">
  <div class="section-head"><span class="eyebrow">HİZMETLER</span><h2>İhtiyacınıza göre şekillenen çözümler.</h2></div>
  <div class="cards-3">
    <article class="feature-card"><span>01</span><h3>Web Tasarım</h3><p>Markaya özel, hızlı ve modern web deneyimleri.</p></article>
    <article class="feature-card"><span>02</span><h3>Kurumsal Sistemler</h3><p>İçerik yönetimi ve operasyonel ihtiyaçlara uygun çözümler.</p></article>
    <article class="feature-card"><span>03</span><h3>Dijital Büyüme</h3><p>SEO, performans ve dönüşüm odaklı geliştirmeler.</p></article>
  </div>
</div></section>
<section class="section" id="yaklasim"><div class="container">
  <div class="bento">
    <div class="bento-item bento-large"><span>01</span><h3>Strateji</h3><p>İhtiyacı anlayıp doğru dijital mimariyi kuruyoruz.</p></div>
    <div class="bento-item"><span>02</span><h3>Tasarım</h3><p>Markaya özgü görsel dil.</p></div>
    <div class="bento-item"><span>03</span><h3>Teknoloji</h3><p>Modern ve performanslı altyapı.</p></div>
  </div>
</div></section>
<section class="section"><div class="container"><div class="cta"><div><span class="eyebrow">BİRLİKTE ÇALIŞALIM</span><h2>Yeni projenizi konuşalım.</h2></div><a class="btn btn-light" href="#iletisim">İletişime Geçin</a></div></div></section>
<footer class="footer" id="iletisim"><div><strong>AKIN STUDIO</strong><p>Modern dijital deneyimler.</p></div><div class="footer-links"><a href="#">Gizlilik</a><a href="#">KVKK</a><a href="#">İletişim</a></div><small>© 2026 Tüm hakları saklıdır.</small></footer>
`
