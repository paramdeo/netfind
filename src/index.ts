import { Hono } from 'hono'

import { services } from './providers'

const app = new Hono({ strict: false })

app.get('/:provider/:query', (c) => {
  let provider = c.req.param('provider')
  let query = c.req.param('query')

  // Some providers decode '%20' differently than '+' within their app for search terms
  switch (provider) {
    case 'unsplash':
      query = query.replaceAll(' ','-')
      break
    case 'dictionary':
      query = query.replaceAll(' ','-')
      break
    case 'dict':
      query = query.replaceAll(' ','-')
      break
    case 'wikipedia':
      query = query.replaceAll(' ','_')
      break
    case 'wiki':
      query = query.replaceAll(' ','_')
      break
    default:
      query = query.replaceAll(' ','+')
  }

  if (services.has(provider)) {
    return c.redirect(`${services.get(provider)}${query}`, 302)
  }
  // Redirect if incorrect provider
  return c.redirect('https://about.netfind.in', 302)
})

// 301 redirect for SEO when hitting the naked domain
app.get('/', (c) => c.redirect('https://about.netfind.in', 301))

export default app
