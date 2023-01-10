import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import jwt from 'jwt-decode'

export type AuthContextValue = {
  idToken: () => string | undefined
  accessToken: () => string | undefined
  setAuthState: Dispatch<SetStateAction<TokenSuccessResponse>>
}
export type TokenWithExpiry = TokenSuccessResponse & { expiresAt: number }
export type AuthProviderProps = { children: ReactNode }

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useLocalStorage<
    TokenWithExpiry | undefined
  >('authState', undefined)

  const setAuthStateWithExpiry = (authState) =>
    setAuthState(
      authState
        ? {
            ...authState,
            expiresAt: Date.now() + authState.expires_in * 1000,
          }
        : undefined
    )

  const idToken = () => {
    if (!authState) return undefined
    if (authState.expiresAt < Date.now()) {
      setAuthState(undefined)
      return
    }
    return authState.id_token
  }

  const accessToken = () => {
    if (!authState) return undefined
    if (authState.expiresAt < Date.now()) {
      setAuthState(undefined)
      return
    }
    return authState.access_token
  }

  return (
    <AuthContext.Provider
      value={{
        idToken,
        accessToken,
        setAuthState: setAuthStateWithExpiry,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useIsAuthenticated() {
  const { accessToken } = useContext(AuthContext)

  return accessToken() !== undefined
}

function useAccessToken() {
  const { accessToken } = useContext(AuthContext)

  return accessToken()
}

type UserResponse = {
  name: string | undefined
}

type UserMetadata = {
  name: string
  phoneNumber: string
}

function useUser(audience: string): UserMetadata {
  const { idToken } = useContext(AuthContext)
  if (!idToken()) return undefined
  const user = jwt(idToken()) as UserResponse
  return {
    name: user.name,
    phoneNumber: user[`${audience}/user`].phoneNumber.substring(2),
  }
}

export interface UseAuthOptions {
  audience: string
  clientId: string
  domain: string
  responseType: string
}

export type Connection = 'email' | 'sms'

type Auth0ErrorResponse = {
  error: string
  error_description: string
}

type StartPasswordlessSMSSuccessResponse = {
  _id: string
  phone_number: string
  phone_verified: boolean
  request_language: string
}

type StartPasswordlessEmailSuccessResponse = {
  _id: string
  email: string
  email_verified: boolean
}

type StartPasswordlessResponse =
  | StartPasswordlessSMSSuccessResponse
  | StartPasswordlessEmailSuccessResponse
  | Auth0ErrorResponse

async function startPasswordlessAuth(
  options: UseAuthOptions,
  connection: Connection,
  destination: string
) {
  const res = await fetch(`https://${options.domain}/passwordless/start`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      client_id: options.clientId,
      connection,
      send: 'code',
      ...(connection === 'sms'
        ? { phone_number: destination }
        : { email: destination }),
    }),
  })

  const resJSON: StartPasswordlessResponse = await res.json()

  if (!res.ok) throw new Error((resJSON as Auth0ErrorResponse).error)

  return resJSON
}

export type TokenSuccessResponse = {
  access_token: string
  id_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

type TokenResponse = TokenSuccessResponse | Auth0ErrorResponse

async function exchangeCodeForToken(
  context: AuthContextValue,
  options: UseAuthOptions,
  realm: Connection,
  username: string,
  otp: string
) {
  const res = await fetch(`https://${options.domain}/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
      client_id: options.clientId,
      username,
      otp,
      realm,
      audience: options.audience,
      scope: 'openid profile email',
    }),
  })

  const resJSON: TokenResponse = await res.json()

  if (!res.ok) throw new Error((resJSON as Auth0ErrorResponse).error)

  context.setAuthState(resJSON as TokenSuccessResponse)

  return resJSON
}

export const useAuth = (options?: UseAuthOptions) => {
  const context = useContext(AuthContext)

  if (context === undefined)
    throw new Error('useAuth must be used within a AuthProvider')

  return {
    useUser,
    accessToken: useAccessToken(),
    isAuthenticated: useIsAuthenticated(),
    startPasswordlessAuth: (connection: Connection, destination: string) =>
      startPasswordlessAuth(options, connection, destination),
    exchangeCodeForToken: (
      realm: Connection,
      username: string,
      password: string
    ) => exchangeCodeForToken(context, options, realm, username, password),
    logout: () => {
      context.setAuthState(undefined)
    },
  }
}
