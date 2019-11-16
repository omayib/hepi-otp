var EngineNexmo = require('../src/engineNexmo').engineNexmo
var EngineAdsmedia = require('../src/engineAdsMedia').engineAdsmedia
var EngineZenziva = require('../src/engineZenziva').engineZenziva

var hepiOtp = function(){
  this.engine = ""
}

hepiOtp.prototype = {
  setEngine:function(engine){
    this.engine = engine
  },
  checkBalance:function(){
    return this.engine.checkBalance()
  },
  /**
   * 
   * @param {string} number the phone number who receipt your secret code.
   * @param {string} code the secret code that you send to user. For nexmo engine, the secret code will be generated automatically by engine.
   * @returns {Promise} response 
   */
  sendOtp:function(number,code){
    /**
     * d
     */
    return this.engine.sendOtp(number,code)
  },
  verifyOtp:function(otpcode,requestid){
    if(this.engine instanceof EngineNexmo ){
      return this.engine.verify(otpcode,requestid)
    }else{
      return Promise.reject("it is not nexmo engine!")
    }
  }
}

exports.hepiOtp = hepiOtp
exports.EngineAdsmedia = EngineAdsmedia
exports.EngineZenziva = EngineZenziva
exports.EngineNexmo = EngineNexmo