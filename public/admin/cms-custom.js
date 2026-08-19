
(function () {
  function ready(fn) {
    if (window.CMS) return fn();
    setTimeout(function(){ ready(fn); }, 100);
  }

  ready(function () {
    const CMS = window.CMS;
    const h = window.h;
    CMS.registerPreviewStyle('/admin/preview.css');

    function section(title, value, icon) {
      return h('div', { className: 'pv-field' }, [
        h('div', { className: 'pv-label' }, title),
        h('div', { className: 'pv-inline' }, [iconNode(icon), h('div', { className: 'pv-value' }, value || '—')])
      ]);
    }

    function image(src, alt) {
      if (!src) return null;
      return h('img', { src: src, alt: alt || '', className: 'pv-image' });
    }

    function socialArray(data) {
      return Array.isArray(data.socialLinks)
        ? data.socialLinks.filter(function(item){ return item && item.enabled !== false && item.url && item.url !== '#'; })
        : [];
    }

    function iconNode(name) {
      return h('span', { className: 'pv-icon' }, iconGlyph(name));
    }

    function iconGlyph(name) {
      const map = {
        instagram:'◎', facebook:'f', google:'G', telegram:'✈', youtube:'▶', linkedin:'in', whatsapp:'◉',
        email:'✉', location:'⌖', phone:'☎', globe:'◌'
      };
      return map[name] || '•';
    }

    CMS.registerPreviewTemplate('site', function(props) {
      const data = props.entry.get('data').toJS();
      const socials = socialArray(data);
      const contactItems = [
        ['شماره تماس', data.phoneDisplay, 'phone'],
        ['واتساپ', data.whatsapp, 'whatsapp'],
        ['ایمیل', data.email, 'email'],
        ['آدرس', data.address, 'location'],
        ['لینک نقشه', data.googleMapsUrl, 'globe'],
      ];
      return h('div', { className: 'pv-wrap pv-rtl' }, [
        h('div', { className: 'pv-card' }, [
          h('div', { className: 'pv-header' }, [
            h('div', null, [
              h('div', { className: 'pv-kicker' }, 'پیش‌نمایش تنظیمات سایت'),
              h('h1', { className: 'pv-title' }, data.businessName || 'Ontario HVAC Services'),
              h('p', { className: 'pv-summary' }, data.homeSeoDescription || '')
            ]),
            image(data.logoImage, data.businessName)
          ]),
          h('div', { className: 'pv-section-title' }, 'اطلاعات تماس'),
          h('div', { className: 'pv-grid two' }, contactItems.map(function(item){ return section(item[0], item[1], item[2]); })),
          h('div', { className: 'pv-section-title' }, 'شبکه‌های اجتماعی'),
          h('div', { className: 'pv-grid two' }, socials.length ? socials.map(function(item){ return section(item.label || item.icon, item.url, item.icon); }) : [section('وضعیت', 'هنوز لینکی وارد نشده است', 'globe')]),
          h('div', { className: 'pv-section-title' }, 'تصاویر برند'),
          h('div', { className: 'pv-image-grid' }, [image(data.logoImage, data.businessName), image(data.heroImage, data.heroAlt), image(data.footerImage, 'footer')]),
        ])
      ]);
    });

    CMS.registerPreviewTemplate('services', function(props) {
      const data = props.entry.get('data').toJS();
      return h('div', { className: 'pv-wrap pv-rtl' }, [
        h('div', { className: 'pv-card' }, [
          h('div', { className: 'pv-kicker' }, 'پیش‌نمایش صفحه خدمت'),
          h('div', { className: 'pv-header service' }, [
            image(data.image, data.title),
            h('div', null, [
              h('h1', { className: 'pv-title' }, data.title || ''),
              h('div', { className: 'pv-subtitle' }, data.englishTitle || ''),
              h('p', { className: 'pv-summary' }, data.summary || '')
            ])
          ]),
          h('div', { className: 'pv-grid two' }, [
            section('Slug', data.slug, 'globe'),
            section('ترتیب', String(data.order || ''), 'globe'),
            section('انتشار', data.published === false ? 'خیر' : 'بله', 'globe'),
            section('SEO Keywords', data.seoKeywords || '—', 'globe'),
          ]),
          h('div', { className: 'pv-section-title' }, 'متن صفحه'),
          h('div', { className: 'pv-body' }, props.widgetFor('body')),
        ])
      ]);
    });

    CMS.registerPreviewTemplate('blog', function(props) {
      const data = props.entry.get('data').toJS();
      const sections = Array.isArray(data.contentSections) ? data.contentSections : [];
      return h('div', { className: 'pv-wrap pv-rtl' }, [
        h('div', { className: 'pv-card' }, [
          h('div', { className: 'pv-kicker' }, 'پیش‌نمایش مقاله'),
          h('h1', { className: 'pv-title' }, data.title || ''),
          h('div', { className: 'pv-meta' }, [
            h('span', null, 'Slug: ' + (data.slug || '')),
            h('span', null, 'تاریخ: ' + (data.date || '')),
            h('span', null, 'انتشار: ' + (data.published === false ? 'خیر' : 'بله')),
          ]),
          image(data.image, data.title),
          h('p', { className: 'pv-summary' }, data.summary || ''),
          h('div', { className: 'pv-grid two' }, [
            section('SEO Title', data.seoTitle || '—', 'globe'),
            section('SEO Keywords', data.seoKeywords || '—', 'globe'),
          ]),
          h('div', { className: 'pv-section-title' }, 'متن مقاله'),
          h('div', { className: 'pv-article-sections' }, sections.length ? sections.map(function(item, index){
            return h('section', { className: 'pv-article-block' }, [
              h('div', { className: 'pv-article-index' }, String(index + 1).padStart(2, '0')),
              h('h2', null, item.heading || 'بدون عنوان'),
              h('p', null, item.text || '')
            ]);
          }) : [h('div', { className: 'pv-empty' }, 'هنوز بخشی برای مقاله اضافه نشده است.')]),
        ])
      ]);
    });
  });
})();
