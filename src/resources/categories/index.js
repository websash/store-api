import schema from './schema'

const init = ({api, db}) => {

  const Category = db.model('Category', schema)

  api.register('/categories', ['GET'], async (ctx, next) => {
    if (+ctx.query.root)
      ctx.body = await Category.find({parent: null})
    else
      ctx.body = await Category.find()
  })

  api.register('/categories/:id', ['GET'], async (ctx, next) => {
    ctx.body = await Category.find({path: ctx.params.id})
  })

  api.register('/categories/of/:id', ['GET'], async (ctx, next) => {
    ctx.body = await Category.find({parent: ctx.params.id})
  })

  return api
}

export default init
