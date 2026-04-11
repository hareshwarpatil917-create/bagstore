const API = 'https://bagstore-production-3209.up.railway.app/api';

async function loadProducts() {
  try {
    const res = await fetch(`${API}/products`);
    const products = await res.json();
    document.getElementById('products').innerHTML = products.map(p => `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <div class="card-body">
          <h3>${p.name}</h3>
          <div class="price">₹${p.price}</div>
          <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    document.getElementById('products').innerHTML = '<p>Failed to load products.</p>';
  }
}

async function addToCart(product_id) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    alert('Please login first!');
    window.location.href = 'login.html';
    return;
  }
  const res = await fetch(`${API}/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id, user_id: user.id })
  });
  const data = await res.json();
  alert(data.message);
}

loadProducts();