import Koa from 'koa'
import Router from 'koa-router'
import compose from 'koa-compose'
import mongoose from 'mongoose'
import resources from './resources'

const app = new Koa()
const api = new Router()
const db = mongoose
  .createConnection('mongodb://localhost:27017/webshop')
  .on('error', (err) => { console.error(err); process.exit(1) })
const conf = {app, api, db}

// logger
app.use(async (ctx, next) => {
  const start = new Date
  await next()
  const ms = new Date - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// error handler
app.use(async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    ctx.status = err.status || 500
    ctx.body = {message: err.message, errors: err.errors}
    ctx.app.emit('error', err, ctx)
  }
})

app.use(resources(conf))

app.use(api.allowedMethods())

app.listen(4000, () =>
  console.info(`RESTful service running on http://localhost:4000/`))

process.on('SIGINT', () => {
  console.log(' closing...')
  db.close(() => { console.log('done'); process.exit(0) })
})
