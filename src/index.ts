import axios, { AxiosInstance, AxiosPromise } from 'axios'
import moment from 'moment'

interface IAppSecret {
  appSecret: string
}

interface IDapiSettings extends IAppSecret {
  appKey: string
  accessToken?: string
  userSecret?: string
  sync?: boolean
}
type DapiSettings = IDapiSettings

interface IExchangeTokenDataRequest extends IAppSecret {
  connectionID: string
  accessCode: string
}

interface IGetBalanceRequest extends IAppSecret {
  accountID: string
}

interface IGetTransactionsRequest extends IAppSecret {
  fromDate: string
  toDate: string
  accountID: string
}

interface ICreateTransferRequest extends IAppSecret {
  senderID: string
  receiverID: string
  amount: number
}
enum UserInputIDs {
  OTP = 'otp',
  CAPTCHA = 'captcha',
  SECRET_QUESTION = 'secretQuestion',
  PIN = 'pin',
  CONFIRMATION = 'confirmation'
}

interface IUserInputs {
  otp?: string
  captcha?: string
  secretQuestion1?: string
  pin?: string
  confirmation?: boolean
}

type UserInputs = IUserInputs

interface IJobResumeRequest extends IAppSecret {
  jobID: string
  userInputs?: UserInputs
}

interface IBaseRequest extends IAppSecret {
  userSecret?: string
  sync?: boolean
}
type BaseRequest = IBaseRequest
enum DapiRoutesEnum {
  EXCHANGE_TOKEN = 'auth/ExchangeToken',
  GET_IDENTITY = 'data/identity/get',
  GET_ACCOUNTS = 'data/accounts/get',
  GET_BALANCE = 'data/balance/get',
  GET_TRANSACTIONS = 'data/transactions/get',
  GET_METADATA = 'metadata/accounts/get',
  GET_BENEFICIARIES = 'payment/beneficiaries/get',
  CREATE_TRANSFER = 'payment/transfer/create',
  RESUME = 'job/resume'
}

type DapiRoutes = DapiRoutesEnum
type ExchangeTokenDataRequest = IExchangeTokenDataRequest
type GetBalanceRequest = IGetBalanceRequest
type GetTransactionsRequest = IGetTransactionsRequest
type CreateTransferRequest = ICreateTransferRequest
type JobResumeRequest = IJobResumeRequest
export default class Dapi {
  private _settings: DapiSettings
  private _adapter: AxiosInstance

  constructor (settings: DapiSettings) {
    this._settings = settings
    this._adapter = axios
    this._adapter.defaults.baseURL = `https://api.dapi.co/v1`
    this._adapter.defaults.headers['Content-Type'] = 'application/json'
    if (this._settings.accessToken)
      this._adapter.defaults.headers[
        'Authorization'
      ] = `Bearer ${this._settings.accessToken}`
  }

  private _post (
    route: DapiRoutes,
    data:
      | BaseRequest
      | ExchangeTokenDataRequest
      | GetBalanceRequest
      | GetTransactionsRequest
      | CreateTransferRequest
      | JobResumeRequest
  ): AxiosPromise {
    return this._adapter.post(route, data)
  }

  public async ExchangeToken (
    exchangeToken: ExchangeTokenDataRequest
  ): Promise<string> {
    try {
      const res = await this._post(DapiRoutesEnum.EXCHANGE_TOKEN, {
        ...exchangeToken,
        appSecret: this._settings.appSecret
      })
      if (res.data.accessToken) {
        this._adapter.defaults.headers[
          'Authorization'
        ] = `Bearer ${res.data.accessToken}`
        return res.data.accessToken as string
      }
      throw new Error('Invalid or expired exchange token')
    } catch (error) {
      throw new Error(error.response.data.msg)
    }
  }

  public async getIdentity (): Promise<object> {
    try {
      const res = await this._post(DapiRoutesEnum.GET_IDENTITY, {
        userSecret: this._settings.userSecret,
        appSecret: this._settings.appSecret,
        sync: this._settings.sync
      })
      return res.data
    } catch (error) {
      throw new Error(error.response.data.err)
    }
  }

  public async getAccounts (): Promise<object> {
    try {
      const res = await this._post(DapiRoutesEnum.GET_ACCOUNTS, {
        userSecret: this._settings.userSecret,
        appSecret: this._settings.appSecret,
        sync: this._settings.sync
      })
      return res.data
    } catch (error) {
      throw new Error(error.response.data.err)
    }
  }

  public async getBalance (accountID: string): Promise<object> {
    try {
      const res = await this._post(DapiRoutesEnum.GET_BALANCE, {
        userSecret: this._settings.userSecret,
        appSecret: this._settings.appSecret,
        sync: this._settings.sync,
        accountID: accountID
      })
      return res.data
    } catch (error) {
      throw new Error(error.response.data.err)
    }
  }

  public async getTransacation (
    fromDate: Date,
    toDate: Date,
    accountID: string
  ): Promise<object> {
    let fromDateParsed, toDateParsed
    try {
      fromDateParsed = moment(fromDate)
        .format('YYYY-MM-DD')
        .toString()

      toDateParsed = moment(toDate, 'YYYY-MM-DD')
        .format('YYYY-MM-DD')
        .toString()
    } catch (error) {
      throw new Error('Error converting date')
    }
    try {
      const res = await this._post(DapiRoutesEnum.GET_TRANSACTIONS, {
        userSecret: this._settings.userSecret,
        appSecret: this._settings.appSecret,
        sync: this._settings.sync,
        accountID,
        fromDate: fromDateParsed,
        toDate: toDateParsed
      })
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.err)
    }
  }

  public async getMetadata (): Promise<object> {
    try {
      const res = await this._post(DapiRoutesEnum.GET_METADATA, {
        userSecret: this._settings.userSecret,
        appSecret: this._settings.appSecret,
        sync: this._settings.sync
      })
      return res.data
    } catch (error) {
      throw new Error(error.response.data.err)
    }
  }

  public async getBeneficiaries (): Promise<object> {
    try {
      const res = await this._post(DapiRoutesEnum.GET_BENEFICIARIES, {
        userSecret: this._settings.userSecret,
        appSecret: this._settings.appSecret,
        sync: this._settings.sync
      })
      return res.data
    } catch (error) {
      throw new Error(error.response.data.err)
    }
  }

  public async createTransfer (
    senderID: string,
    receiverID: string,
    amount: number
  ): Promise<object> {
    try {
      const res = await this._post(DapiRoutesEnum.CREATE_TRANSFER, {
        userSecret: this._settings.userSecret,
        appSecret: this._settings.appSecret,
        sync: this._settings.sync,
        senderID,
        receiverID,
        amount
      })

      return res.data
    } catch (error) {
      throw new Error(error.response.data.err)
    }
  }

  public async resume (jobID: string, userInputs: UserInputs): Promise<object> {
    try {
      const res = await this._post(DapiRoutesEnum.RESUME, {
        userSecret: this._settings.userSecret,
        appSecret: this._settings.appSecret,
        sync: this._settings.sync,
        jobID,
        userInputs
      })
      return res.data
    } catch (error) {
      throw new Error(error.response.data.err)
    }
  }
}
