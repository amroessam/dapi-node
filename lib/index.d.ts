interface IAppSecret {
    appSecret: string;
}
interface IDapiSettings extends IAppSecret {
    appKey: string;
    accessToken?: string;
    userSecret?: string;
    sync?: boolean;
}
declare type DapiSettings = IDapiSettings;
interface IExchangeTokenDataRequest extends IAppSecret {
    connectionID: string;
    accessCode: string;
}
interface IUserInputs {
    otp?: string;
    captcha?: string;
    secretQuestion1?: string;
    pin?: string;
    confirmation?: boolean;
}
declare type UserInputs = IUserInputs;
declare type ExchangeTokenDataRequest = IExchangeTokenDataRequest;
export default class Dapi {
    private _settings;
    private _adapter;
    constructor(settings: DapiSettings);
    private _post;
    ExchangeToken(exchangeToken: ExchangeTokenDataRequest): Promise<string>;
    getIdentity(): Promise<object>;
    getAccounts(): Promise<object>;
    getBalance(accountID: string): Promise<object>;
    getTransacation(fromDate: Date, toDate: Date, accountID: string): Promise<object>;
    getMetadata(): Promise<object>;
    getBeneficiaries(): Promise<object>;
    createTransfer(senderID: string, receiverID: string, amount: number): Promise<object>;
    resume(jobID: string, userInputs: UserInputs): Promise<object>;
}
export {};
