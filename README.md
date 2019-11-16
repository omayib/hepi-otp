# Hepi-otp
Hi, i am hepi-otp module. There are many (One Time Password) OTP providers in the world like Nexmo, Twilio, Zenziva, Raja-sms (adsmedia) etc. Which is the best? Noone, especialy for Indonesia. All of them are good, its depends on context and situations.

## Use multiple engine/provider instead of one.
Hepi-otp make you happy to integrate the multiples providers easilly into your apps.
1. initiate the providers
2. activate it
3. send the secret code 
4. get the response


### How to start?
```
npm install hepi-otp --save
```
### Don't skip this step!
```
var HepiOtp = require('hepi-otp').hepiOtp
var EngineAdsmedia = require('hepi-otp').EngineAdsmedia
var EngineZenziva = require('hepi-otp').EngineZenziva
var EngineNexmo = require('hepi-otp').EngineNexmo
```

### Initiate the providers

```
var adsMedia = new EngineAdsmedia(DOMAIN, API_KEY)
var zenziva = new EngineZenziva(USER_KEY,SECRET_KEY,KEY)
var nexmo = new EngineNexmo(USER_KEY,TOKEN)

var hepiOtp = new HepiOtp()
```
### Which provider you want to activated?
```
hepiOtp.setEngine(zenziva)
```
### it's magic, send the OTP code!
```
var responseOtp = hepiOtp.sendOtp(RECEIPT_NUMBER,OTP_CODE)
responseOtp.then(succeesValue=>{
    console.log('otp-success',succeesValue)
},fail=>{
    console.log('otp-fail',fail)
})
.catch(error=>{
    console.log('otp-error',error)
})
```
special for nexmo engine, you need to verify the code and request id
#### (NEXMO) verifying the OTP code
```
var responseVerifyOtp = hepiOtp.verifyOtp(OTP_CODE,REQUEST_ID)
responseVerifyOtp.then(succeesValue=>{
    console.log('verify-success',succeesValue)
},fail=>{
    console.log('verify-fail',fail)
})
    .catch(error=>{
console.log('verify-error',error)
})
```

### Want to change the provider?
```
hepiOtp.setEngine(adsmedia)
```
then try to send the otp code again.
### How to check your providers balance?
```
var responseBalance = hepiOtp.checkBalance()
responseBalance.then(succeesValue=>{
    console.log('balance-success',succeesValue)
},fail=>{
    console.log('balance-fail',fail)
})
.catch(error=>{
    console.log('balance-error',error)
})
```
### Contributors
Arif Akbarul Huda

### License
[Apache 2.0](https://github.com/madskristensen/MarkdownEditor/blob/master/LICENSE)