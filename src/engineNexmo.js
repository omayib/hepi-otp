const Nexmo = require('nexmo')
const https = require('https')
const domain = 'rest.nexmo.com'
const pathCheckBalance = '/account/get-balance'

function engineNexmo(apiKey,apiSecret){
    this.nexmoApiKey = apiKey
    this.nexmoApiSecret = apiSecret
    this.query = "?api_key="+apiKey+"&api_secret="+apiSecret

    const nexmo = new Nexmo({
        apiKey: this.nexmoApiKey,
        apiSecret: this.nexmoApiSecret
      })
    var msg = {status:'failed'}
    this.checkBalance = function(){
        return new Promise((resolve,reject)=>{
            const options = {
                hostname:domain,
                path:pathCheckBalance+this.query,
                method:'GET'
              }
            const req = https.request(options,(response)=>{
                response.on('data', (d) => {
                    var data= JSON.parse(d)
                    var remaining = Math.ceil(Number(data.value)/0.05)
                    msg.status="success"
                    msg.remainig = remaining
                    resolve(msg)
                })
            })
            req.on('error', (error) => {
              msg.message = error
              reject(msg)
            })
            req.end()
        })
    }

    this.sendOtp = function(number){
        return new Promise((resolve,reject)=>{
            nexmo.verify.request({
                number: number,
                brand: "hepicar"
              }, (err, result) => {
                if (err) {
                  msg.message = error
                  reject(msg)
                } else {
                  const verifyRequestId = result.request_id;
                  msg.status = "success"
                  msg.requestId = verifyRequestId           
                  resolve(msg)
                }
              });
        })
    }
    this.verify = function(otpCode,requestId){
        return new Promise((resolve,reject)=>{
            nexmo.verify.check({
                request_id: requestId,
                code: otpCode
              }, (err, result) => {
                if (err) {
                  msg.message = error
                  reject(msg)
                } else {
                  if(result.error_text){
                    msg.message = result.error_text
                    reject(msg)
                  }else{
                    msg.status='success'
                    resolve(msg)
                  }
                }
              });
              
        })
    }
}
exports.engineNexmo = engineNexmo