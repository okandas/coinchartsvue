import cookie from 'js-cookie'
import decode from 'jwt-decode'
import { AuthenticatedUser, Token, TokenServiceInstance } from '@/store/models'

class TokenServices implements TokenServiceInstance {
  token (): string | undefined {
    return cookie.get('t_jtr')
  }

  remove (): void {
    cookie.remove('t_jtr')
  }

  decode (data: Token): AuthenticatedUser | null {
    cookie.set('t_jtr', data.token)
    const decoded: AuthenticatedUser = decode(data.token)
    return decoded
  }

  loggedIn (): boolean {
    if (cookie.get('t_jtr')) {
      return true
    } else {
      return false
    }
  }

  decoded (): AuthenticatedUser | null {
    const jwt: string = this.token() ?? ''
    if (jwt.length > 0) {
      const decoded: AuthenticatedUser = decode(jwt)
      return decoded
    }
    return null
  }
}

export default new TokenServices()
