const { io } = require('socket.io-client');

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('✅ Conectou! ID:', socket.id);
});

socket.on('connect_error', (err) => {
  console.log('❌ Erro:', err.message);
});

socket.on('log_history', (data) => {
  console.log('📋 Histórico recebido:', JSON.stringify(data, null, 2));
});

socket.on('new_log', (log) => {
  console.log('🆕 Novo log:', JSON.stringify(log, null, 2));
});

// Erro de validação do gateway
socket.on('exception', (err) => {
  console.log('⚠️ Erro de validação:', JSON.stringify(err, null, 2));
});

setTimeout(() => {
  console.log('📤 Enviando create_log...');
  socket.emit('create_log', {
    service: 'auth-service',
    module: 'AuthModule',
    action: 'user.login',
    level: 'info',
    message: 'usuário fez login com sucesso',
    traceId: 'trace-123',
    userId: 'user-456',
    metadata: { ip: '127.0.0.1' },
  });
}, 1000);

setTimeout(() => {
  process.exit();
}, 4000);