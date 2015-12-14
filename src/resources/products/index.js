import schema from './schema'
import parse from 'co-body'

const init = ({api, db}) => {

  const Product = db.model('Product', schema)

  api.register('/products', ['GET'], async (ctx, next) => {
    const {category, deep} = ctx.query
    if (category && +deep)
      ctx.body = await Product.find({'categories.path': category})
    else if (category)
      ctx.body = await Product.find({'categories._id': category})
    else
      ctx.body = await Product.find()
  })

  api.register('/products/:id', ['GET'], async (ctx, next) => {
    ctx.body = await Product.findById(ctx.params.id)
  })

  api.register('/products', ['POST'], async (ctx, next) => {
    const body = await parse.json(ctx)
    try {
      const created = await Product.create(body)
      ctx.status = 201
      ctx.body = {
        message: 'Resource Created',
        id: created._id
      }
    } catch(err) {
      ctx.throw(400, err)
    }
  })

  api.register('/products/:id', ['PUT'], async (ctx, next) => {
    const body = await parse.json(ctx)
    try {
      await Product.update({_id: ctx.params.id}, {$set: body})
      ctx.status = 201
      ctx.body = {
        message: 'Resource Updated'
      }
    } catch(err) {
      ctx.throw(400, err)
    }
  })

  return api
}

export default init
