require('dotenv').config({path:'examples/.env.example'})

const Dapi = require('../dist/index')

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
