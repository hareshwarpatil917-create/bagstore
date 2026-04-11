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
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${p.id}, -1)">−</button>
            <span id="qty-${p.id}">1</span>
            <button class="qty-btn" onclick="changeQty(${p.id}, 1)">+</button>
          </div>
          <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    document.getElementById('products').innerHTML = '<p>Failed to load products.</p>';
  }
}

function changeQty(id, change) {
  const span = document.getElementById(`qty-${id}`