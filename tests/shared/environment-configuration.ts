export class Config {
    windowsUserName : string = '';
    windowsPassword:string = '';

    baseUrl: string = 'http://'+this.windowsUserName+':'+this.windowsPassword+'@backoffice-prelive.andalusiagroup.net:8090';
    mediaclURL: string='http://'+this.windowsUserName+':'+this.windowsPassword+'@awsprelive.andalusiagroup.net/SercurityService/api/security/login';
    loginUser: string = 'Sokar';
    loginPassword: string = '122333';
}
