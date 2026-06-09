// KOOL AI Bridge: conecta motor IA con backend y dashboard en tiempo real
(function () {
  const API = 'http://127.0.0.1:8787';

  async function post(path, payload) {
    try {
      await fetch(API + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.error('[KOOL BRIDGE]', e);
    }
  }

  window.KoolAIBridge = {
    send(event, payload) {
      if (window.koolAI && typeof window.koolAI.log === 'function') {
        window.koolAI.log(`[BRIDGE] ${event}`);
      }
      if (event === 'ORDER_CREATED') {
        post('/order', payload);
        if (window.koolAI) window.koolAI.addOrder(payload);
      }
      if (event === 'ORDER_UPDATED') {
        post('/order/update', payload);
        if (window.koolAI) window.koolAI.updateOrder(payload.order_id, payload.patch || {});
      }
      if (event === 'INVENTORY_SET') {
        post('/inventory', payload);
        if (window.koolAI) window.koolAI.setInventory(payload.product, payload.size, payload.qty);
      }
      if (event === 'LOG') {
        post('/log', payload);
        if (window.koolAI) window.koolAI.log(payload.text || 'LOG');
      }
    }
  };
})();
