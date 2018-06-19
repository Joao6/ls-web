angular.module('lifeStories').value('config', {
  baseUrl: 'https://ls-api.herokuapp.com',
  //baseUrl: 'https://localhost:8443',
  //baseUrl: 'https://192.168.0.164:8443',

  urlSocketElderly : 'wss://ls-api.herokuapp.com/ws-idoso',
  //urlSocketElderly : 'wss://localhost:8443/ws-idoso',
  //urlSocketElderly : 'wss://192.168.0.164:8443/ws-idoso',
  
  urlSocketStudent : 'wss://ls-api.herokuapp.com/ws-estudante',
  //urlSocketStudent : 'wss://localhost:8443/ws-estudante',
  //urlSocketStudent : 'wss://192.168.0.164:8443/ws-estudante',

  urlSocketRTCStudent : 'wss://ls-api.herokuapp.com/ws-rtc-estudante',
  //urlSocketRTCStudent : 'wss://localhost:8443/ws-rtc-estudante',
  //urlSocketRTCStudent : 'wss://192.168.0.164:8443/ws-rtc-estudante'
});

