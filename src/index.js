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
  sendOtp:function(number,code){
    return this.engine.sendOtp(number,code)
  }
}


exports.printMsg = function() {
    return 'abcd'
  }
exports.hepiOtp = hepiOtp