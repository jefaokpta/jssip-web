/*
  ua.js — SIP phone settings and UA factory
  
  Edite as configurações abaixo para o seu servidor/conta SIP.
  Somente ligações de saída neste MVP.
*/

(function (window) {
  'use strict';

  // ======= CONFIGURAÇÕES DO TELEFONE (edite conforme seu ambiente) =======
  // Exemplo de servidor WebSocket SIP (WSS) e credenciais da conta SIP
  const SIP_CONFIG = {
    // URL do WebSocket SIP (WSS). Ex.: 'wss://sip.seudominio.com:7443'
    wsServers: `wss://${credentials.domain}:${credentials.port}/ws`,

    // URI do usuário SIP. Ex.: 'sip:usuario@seudominio.com'
    uri: `sip:${credentials.username}@${credentials.domain}`,

    // Senha do usuário SIP
    password: credentials.password,

    // Nome de exibição (opcional)
    display_name: 'Web Phone',

    // Registrar automaticamente (true na maioria dos casos)
    register: false
  };

  // ======= FÁBRICA DO UA (User Agent) =======
  function createUA() {
    if (typeof JsSIP === 'undefined') {
      throw new Error('JsSIP não carregado. Verifique a tag <script> de lib/jssip.min.js.');
    }

    // Validação simples para alertar usuário caso esqueça de configurar
    if (!/^wss:\/\//.test(SIP_CONFIG.wsServers)) {
      console.warn('[ua.js] wsServers não configurado corretamente. Edite ua.js.');
    }
    if (!/^sip:.+@.+/.test(SIP_CONFIG.uri)) {
      console.warn('[ua.js] uri SIP não configurada corretamente. Edite ua.js.');
    }

    const socket = new JsSIP.WebSocketInterface(SIP_CONFIG.wsServers);

    const configuration = {
      sockets: [socket],
      uri: SIP_CONFIG.uri,
      password: SIP_CONFIG.password,
      display_name: SIP_CONFIG.display_name,
      register: SIP_CONFIG.register !== false
    };

    const ua = new JsSIP.UA(configuration);
    return ua;
  }

  // Exporta no escopo global
  window.SIP_CONFIG = SIP_CONFIG;
  window.createUA = createUA;
})(window);
