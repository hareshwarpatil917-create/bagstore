const API = 'https://bagstore-production-3209.up.railway.app/api';

async function addToCart(product_id) {

  // 🔐 Check login
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!user || !token) {
    alert('Please login first!');
    window.location.href = 'login.html';
    return;
  }

  const quantity = parseInt(
    document.getElementById('qty-' + product_id).textContent
  );

  try {
    const res = await fetch(API + '/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token   // 🔥 send token
      },
      body: JSON.stringify({ product_id, quantity })
    });

    const data = await res.json();
    alert(data.message || 'Added to cart!');

  } catch (err) {
    alert('Something went wrong.');
  }
}