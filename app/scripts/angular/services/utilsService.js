angular.module('lifeStories').factory('utils', function($http, config){

 const _sendEmail = (name, message, to_email) => {
    emailjs.init("user_JlXYIwCPGdmsJlEzkNTLR");
    return emailjs.send("gmail_lifestories", "life_stories", { name: name, message: message, to_email: to_email})     
  } 

  const _createCodeRecovery = (recovery) => {
    return $http.post(config.baseUrl + '/recuperacao', recovery)
  }

  const _getUserByEmail = (email, type) => {
    return $http.get(config.baseUrl + '/usuario', {params: { 'email': email, 'tipoUsuario': type} })    
  }  

  const _verifyRecoveryCode = (code) => {
      return $http.get(config.baseUrl + '/recuperacao/' + code) 
  }

  const _updateRecoveryCode = (recoveryCode) => {
      return $http.put(config.baseUrl + '/recuperacao/', recoveryCode) 
  }

  return {   
    sendEmail: _sendEmail,
    createCodeRecovery: _createCodeRecovery,
    getUserByEmail: _getUserByEmail,
    verifyRecoveryCode: _verifyRecoveryCode,
    updateRecoveryCode: _updateRecoveryCode
  }

    /* this.sendEmail = (name, message, to_email) => {
      // parameters: service_id, template_id, template_parameters
      emailjs.init("user_JlXYIwCPGdmsJlEzkNTLR");
      emailjs.send("gmail_lifestories", "life_stories", { name: name, message: message, to_email: to_email})
        .then(function (response) {
          //console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        }, function (err) {
          //console.log("FAILED. error=", err);
        });
    } */
})