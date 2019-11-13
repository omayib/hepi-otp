const https = require('https')

/**
 * 
 * @param {url=send} urlSend ini itu
 * @param {*} urlCheckBalance 
 * @param {*} apiKey 
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
                var balance = data.balance_respon[0].balance/2
                msg.status = "success"
                msg.remaining = "data.credit"
                resolve(balance)
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
          const req = https.request(options,(response)=>{
              response.on('data', (d) => {
                  var data= JSON.parse(d)
                  if(data.globalstatustext=="Success"){
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