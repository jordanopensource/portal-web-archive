/* eslint-disable prefer-const */
// JOSA Analytics
let _paq = (window._paq = window._paq || [])
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView'])
_paq.push(['enableLinkTracking'])
;(function () {
  let u = '//analytics.jordanopensource.org/'
  _paq.push(['setTrackerUrl', u + 'matomo.php'])
  _paq.push(['setSiteId', '2'])
  let d = document
  let g = d.createElement('script')
  let s = d.getElementsByTagName('script')[0]
  g.async = true
  g.src = u + 'matomo.js'
  s.parentNode.insertBefore(g, s)
})()
