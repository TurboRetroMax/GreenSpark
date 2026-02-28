
const api = (path, opts = {}) => fetch(path, {headers: {'content-type':'application/json'}, ...opts});

document.getElementById('payStripe').addEventListener('click', async () => {
  try {
    const res = await api('/create-checkout-session', {method:'POST', body: JSON.stringify({amount: 1999})});
    const {sessionId, publishableKey} = await res.json();
    if (!sessionId) throw new Error('No sessionId from server');
    const stripe = Stripe(publishableKey); 
    await stripe.redirectToCheckout({sessionId});
  } catch (err) {
    alert('Stripe error: ' + err.message);
  }
});

if (window.paypal) {
  paypal.Buttons({
    createOrder: function() {
      return fetch('/create-paypal-order', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({amount: 19.99})})
        .then(res => res.json())
        .then(data => data.orderID);
    },
    onApprove: function(data) {
 
      return fetch('/capture-paypal-order', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({orderID: data.orderID})})
        .then(res => res.json())
        .then(result => {
          alert('PayPal payment complete: ' + JSON.stringify(result));
        });
    }
  }).render('#paypal-button-container');
}


document.getElementById('flutterwaveBtn').addEventListener('click', async () => {
  try {
    const res = await api('/create-flutterwave-payment', {method:'POST', body: JSON.stringify({amount: 1999, currency: 'KES'})});
    const data = await res.json();
    if (data.payment_link) {
      window.location.href = data.payment_link;
    } else {
      alert('Flutterwave: could not get payment_link');
    }
  } catch (err) {
    alert('Flutterwave error: ' + err.message);
  }
});

document.getElementById('mpesaBtn').addEventListener('click', async () => {
  try {
    const phone = document.getElementById('mpesaPhone').value;
    if (!phone) return alert('Enter phone number');
    const res = await api('/mpesa/stk-push', {method:'POST', body: JSON.stringify({phone, amount: 100})});
    const data = await res.json();
    alert('M-Pesa response: ' + JSON.stringify(data));
  } catch (err) {
    alert('M-Pesa error: ' + err.message);
  }
});

