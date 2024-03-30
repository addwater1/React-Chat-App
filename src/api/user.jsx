import request from "../util/request"

function loginRequest(loginData) {
  return request.post('/login', loginData)
}

function signupRequest(signupData) {
  return request.post('/register', signupData)
}

function captchaRequest(captchaId) {
  const uri = captchaId ? `/captcha/${captchaId}` : `/captcha`
  return request.get(uri, {
    responseType: "blob"
  })
}

export {loginRequest, signupRequest, captchaRequest}