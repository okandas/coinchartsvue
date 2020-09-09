import axios from 'axios';
class CtradeApiService {
    constructor() {
        this.service = axios.create({
            baseURL: 'https://cors-anywhere.herokuapp.com/https://ctrade.co.zw'
        });
        this.service.interceptors.request.use((config) => {
            return config;
        });
    }
    marketWatch() {
        return this.service.get('/mobileapi/MarketWatchZSENEW');
    }
    marketCap() {
        return this.service.get('/mobileapi/getMarketCap');
    }
    marketList() {
        return this.service.get('mobileapi/GetCompaniesListForGraphAll');
    }
}
export default new CtradeApiService();
//# sourceMappingURL=ctradeApiService.js.map