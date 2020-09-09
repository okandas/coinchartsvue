import cookie from 'js-cookie';
import decode from 'jwt-decode';
class TokenServices {
    token() {
        return cookie.get('t_jtr');
    }
    remove() {
        cookie.remove('t_jtr');
    }
    decode(data) {
        cookie.set('t_jtr', data.token);
        const decoded = decode(data.token);
        return decoded;
    }
    loggedIn() {
        if (cookie.get('t_jtr')) {
            return true;
        }
        else {
            return false;
        }
    }
    decoded() {
        const jwt = this.token() ?? '';
        if (jwt.length > 0) {
            const decoded = decode(jwt);
            return decoded;
        }
        return null;
    }
}
export default new TokenServices();
//# sourceMappingURL=token.js.map