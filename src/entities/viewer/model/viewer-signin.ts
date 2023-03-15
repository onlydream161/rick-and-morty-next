export {}

// Использовать, если сервис авторизации CasDoor
// const getOrSaveCasdoorState = () => {
//   let state = sessionStorage.getItem(CASDOOR_SESSION_STORAGE_NAME)
//   if (state !== null) {
//     return state
//   }
//   state = Math.random().toString(36).slice(2)
//   sessionStorage.setItem(CASDOOR_SESSION_STORAGE_NAME, state)
//   return state
// }
//
// export const getSigninUrl = (redirectPath: string) => {
//   return `${CASDOOR_SERVER_URL}/login/oauth/authorize?client_id=${CASDOOR_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
//     window.location.origin + redirectPath
//   )}&scope=read&state=${getOrSaveCasdoorState()}`
// }
// export const signin = (code: string, state: string, queryClient: QueryClient) => {
//   const expectedState = getOrSaveCasdoorState()
//   sessionStorage.removeItem(CASDOOR_SESSION_STORAGE_NAME)
//   if (state !== expectedState) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve({
//           status: 'error',
//           msg: `invalid state parameter, expected: ${expectedState}, got: ${state}`,
//         })
//       }, 10)
//     })
//   }

//   return httpClient<AuthTokens>({
//     method: 'POST',
//     url: AUTH_REQUEST_TARGET,
//     params: {
//       code,
//       state,
//     },
//     withCredentials: true,
//   }).then(({ data }) => {
//     setAuthTokensInCookies(data)

//     const searchParams = new URLSearchParams(window.location.search)
//     searchParams.delete('code')
//     searchParams.delete('state')
//     history.replaceState(history.state, '', `?${searchParams.toString()}`)
//     queryClient.invalidateQueries(VIEWER_PRIMARY_KEY, { refetchInactive: true })
//   })
// }
