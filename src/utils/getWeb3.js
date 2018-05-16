// Portis
import Web3 from 'web3'
import { environment } from 'environments/environment';
import { PortisProvider } from 'portis';


const portisProvider = new PortisProvider({ network: 'ropsten', appName: 'Attendr', appLogoUrl: 'https://attendr.io/assets/images/logo.png' });

if (!environment.production) {
    portisProvider.portisClient = environment.portisLocation;
    portisProvider.iframe = portisProvider.createIframe();
}

export const web3 = new Web3(portisProvider);
