require('dotenv').config({path:'examples/.env.example'})

const Dapi = require('../lib/index').default

const start = async () => {
  const client = new Dapi({
    appKey: process.env.DAPI_APP_KEY || 'DAPI_APP_KEY',
    appSecret: process.env.DAPI_APP_SECRET || 'DAPI_APP_SECRET',
    accessToken:
      'ACCESS_TOKEN',
    userSecret:
      'USER_SECRET',
    sync: true,
  })

  try {
    // get user identity
    const id = await client.getIdentity()
    console.log(id)
    // get user accounts
    const accs = await client.getAccounts()
    console.log(accs)
    // get user balance
    const balance = await client.getBalance(accs.accounts[0].id)
    console.log(balance)
    // get user transactions
    const trans = await client.getTransacation(
      new Date('1/1/1970'),
      new Date(),
      accs.accounts[0].id,
    )
    console.log(trans)
    // get user metadata
    const metadata = await client.getMetadata()
    console.log(metadata)
  } catch (error) {
    console.log(error)
  }
}
start()
