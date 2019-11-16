const https = require('https')
const guid = require('./guidGenerator')

/**
 * 
 * @param {string} domain its your specific domain that provided by adsmedia
 * @param {string} apiKey your apikey from adsmedia
 */
function engineAdsmedia(domain,apiKey){
   
    this.checkBalance = function (){
      const data = JSON.stringify({
        'apikey':apiKey
      })
      const options = {
        hostname:domain,
        path:'/sms/api_sms_otp_balance_json.php',
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Content-Lenght':data.length
        }
      }
      var msg={status:'failed'}
      return new Promise((resolve,reject)=>{
          const req = https.request(options,(response)=>{
            response.on('data', (d) => {
                var data= JSON.parse(d)
                if(data.balance_respon[0].globalstatustext==="Check Balance Limit"){
                  msg.message = "check balance limit"
                  reject(msg)
                }else{
                  var balance = data.balance_respon[0].balance
                  msg.status = "success"
                  msg.remaining = Math.ceil(Number(balance)/500)
                  resolve(msg)
                }
            })
          })
          req.on('error', (error) => {
            msg.message = error
            reject(msg)
          })
          req.write(data)
          req.end()
      })
    }
    
    /**
     * 
     * @param {string} number the phone number of your target (person who receive otp)
     * @param {string} code the otp secret code for customer
     */
    this.sendOtp = function (number,code){
      const data = JSON.stringify({
        'apikey':apiKey,
        'datapacket':[{
          "number":number,
          "message":"Hepicar, melindungi kendaraan Anda. Tuliskan ini ke dalam aplikasi "+code,
          "sendername":"hepicar"
        }]
      })
      const options = {
        hostname:domain,
        path:'/sms/api_sms_otp_send_json.php',
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Content-Lenght':data.length
        }
      }
      var msg={status:'failed'}
      return new Promise((resolve,reject)=>{
          if(code==undefined){
            msg.message = "masukkan code otp"
            reject(msg)
          }
          const req = https.request(options,(response)=>{
              response.on('data', (d) => {
                  var data= JSON.parse(d)
                  if(data.sending_respon[0].globalstatustext=="Success"){
                    msg.status = "success"
                    msg.requestId = guid.guid()
                    resolve(msg)                
                  }else{
                    msg.status = "failed"
                    msg.message = "ada kendala pada layanan otp"
                    reject(msg)
                  }
              })
          })
          req.on('error', (error) => {
            msg.message = error
            reject(msg)
          })
          req.write(data)
          req.end()
      })
    }
  }

exports.engineAdsmedia = engineAdsmedia
module.exports.engeA = engineAdsmedia