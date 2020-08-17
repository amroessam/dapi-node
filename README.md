# dapi-node

## Simple typescript supported [dapi](https://dapi.co) library for nodejs

### Please go through the [docs](https://docs.dapi.co) for better understanding

## Base examples included in `examples` folder, make sure to update `.env.example` with your keys to test

### exchange token

```js
require('dotenv').config({ path: 'examples/.env.example' })

const Dapi = require('dapi-node')
const start = async () => {
  const client = new Dapi({
    appKey: process.env.DAPI_APP_KEY || 'DAPI_APP_KEY',
    appSecret: process.env.DAPI_APP_SECRET || 'DAPI_APP_SECRET',
  })
  try {
    const et = await client.ExchangeToken({
      accessCode: 'ACCESS_CODE',
      connectionID: 'CONNECTION_ID',
    })
    console.log(et)
  } catch (error) {
    console.log(error)
  }
}
start()
```

### data endpoints

```js
require('dotenv').config({ path: 'examples/.env.example' })

const Dapi = require('dapi-node')

const start = async () => {
  const client = new Dapi({
    appKey: process.env.DAPI_APP_KEY || 'DAPI_APP_KEY',
    appSecret: process.env.DAPI_APP_SECRET || 'DAPI_APP_SECRET',
    accessToken: 'ACCESS_TOKEN',
    userSecret: 'USER_SECRET',
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
```

### payment endpoints

```js
require('dotenv').config({ path: 'examples/.env.example' })

const Dapi = require('dapi-node')

const start = async () => {
  const client = new Dapi({
    appKey: process.env.DAPI_APP_KEY || 'DAPI_APP_KEY',
    appSecret: process.env.DAPI_APP_SECRET || 'DAPI_APP_SECRET',
    accessToken: 'ACCESS_TOKEN',
    userSecret: 'USER_SECRET',
    sync: true,
  })

  try {
    const acc = (await client.getAccounts()).accounts[0].id
    console.log(acc)
    const bal1 = await client.getBalance(acc)
    console.log(bal1)
    const benefs = await client.getBeneficiaries()
    console.log(benefs)
    const benef = benefs.beneficiaries[0].id
    const tr = await client.createTransfer(acc, benef, 1)
    console.log(tr)
    const resume = await client.resume(tr.jobID, { otp: '123456' })
    console.log(resume)
    const bal2 = await client.getBalance(acc)
    console.log(bal2)
  } catch (error) {
    console.log(error)
  }
}
start()
```
