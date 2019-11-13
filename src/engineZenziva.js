const https = require('https')
const queryString = require('querystring')
const guid = require('./guidGenerator')

/**
 * 
 * @param {string} userkey sss
 * @param {string} passkey bbb
 */
function engineZenziva(userkey,passkey){
    var url = "gsm.zenziva.net"
    this.checkBalance = function (){
      const options = {
        hostname:url,
        path:`/api/balance?userkey=${userkey}&passkey=${passkey}`,
        method:'GET'
      }

      var msg={status:'failed'}
      return new Promise((resolve,reject)=>{
          const req = https.request(options,(response)=>{
              response.on('data', (d) => {
                var data= JSON.parse(d)
                msg.status = "success"
                msg.remaining = data.credit
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

    this.sendOtp = function (number,code){
      const data = queryString.stringify({
        'userkey':userkey,
        'passkey':passkey,
        "nohp":number,
        "kode_otp":code
      })
      const options = {
        hostname:url,
        method:'POST',
        path:'/api/sendOTP/',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
          'Content-Length':data.length
        }
      }
      var msg={status:'failed'}
      return new Promise((resolve,reject)=>{
          const req = https.request(options,(response)=>{
              response.on('data', (d) => {
                var data= JSON.parse(d)
                if(data.text=="Insufficient credit"){
                    msg.status = "failed"
                    msg.message = "ada kendala pada layanan otp"
                    reject(msg)
                }else{
                  msg.status = "success"
                  msg.requestId = guid.guid()
                  resolve(msg)
                }
              })
          })
          req.on('error', (error) => {
            msg.message = error
            reject(msg)
          })

          req.on('end', (error) => {
            msg.message = error
            reject(msg)
          })
          req.write(data)
          req.end()
      })
    }
  }

exports.engineZenziva = engineZenziva