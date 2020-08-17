
require('dotenv').config({path:'examples/.env.example'})

const Dapi = require('../lib/index').default
const start = async () => {
  const client = new Dapi({
    appKey: process.env.DAPI_APP_KEY || 'DAPI_APP_KEY',
    appSecret: process.env.DAPI_APP_SECRET || 'DAPI_APP_SECRET',
  })
  try {
    const et = await client.ExchangeToken({
      accessCode:
        'ACCESS_CODE',
      connectionID: 'CONNECTION_ID',
    })
    console.log(et)
  } catch (error) {
    console.log(error)
  }
}
start()
