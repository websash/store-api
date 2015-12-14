import compose from 'koa-compose'
import products from './products'
import categories from './categories'

const resources = (conf) => compose([
  products(conf).routes(),
  categories(conf).routes()
])

export default resources
