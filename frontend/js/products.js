const API = 'https://bagstore-production-3209.up.railway.app/api';

async function loadProducts() {
  try {
    const res = await fetch(API + '/products');
    const products = await res.json();
    let html = '';
    products.forEach(function(p) {
      html += '<div class="card">';
      html += '<img src="' + p.image + '" alt="' + p.name + '">';
      html += '<div class="card-body">';
      html += '<h3>' + p.name + '</h3>';
      html += '<div class="price">₹' + p.price + '</div>';
      html += '<div class="qty-control">';
      html += '<button class="qty-btn" onclick="changeQty(' + p.id + ', -1)">−</button>';
      html += '<span id="qty-' + p.id + '">1</span>';
      html += '<button class="qty-btn" onclick="changeQty(' + p.id + ', 1)">+</button>';
      html += '</div>';
      html += '<button class="btn" onclick="addToCart(' + p.id + ')">Add to Cart</button>';
      html += '</div></div>';
    });
    document.getElementById('products').innerHTML = html;
  } catch (err) {
    document.getElementById('products').innerHTML = '<p>Failed to load products.</p>';
  }
}

function changeQty(id, change) {
  var span = document.getElementById('qty-' + id);
  var current = parseInt(span.textContent);
  current += change;
  if (current < 1) current = 1;
  if (current > 10) current = 10;
  span.textContent = current;
}

async function addToCart(product_id) {
  // ✅ Check if user is logged in first
  var user = localStorage.getItem('user');
  if (!user) {
    alert('Please login first to add items to cart!');
    window.location.href = 'login.html';
    return;
  }

  var userObj = JSON.parse(user);
  var quantity = parseInt(document.getElementById('qty-' + product_id).textContent);

  try {
    var res = await fetch(API + '/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product_id, user_id: userObj.id, quantity: quantity })
    });
    var data = await res.json();
    alert(data.message || 'Added to cart!');
  } catch (err) {
    alert('Something went wrong. Please try again.');
  }
}

loadProducts();