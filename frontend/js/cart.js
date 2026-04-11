const API = 'https://bagstore-production-3209.up.railway.app/api';
async function loadCart() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    document.getElementById('cart-body').innerHTML =
      '<tr><td colspan="4"><a href="login.html">Please login to view cart</a></td></tr>';
    return;
  }
  const res = await fetch(`${API}/cart/user/${user.id}`);
  const items = await res.json();
  let total = 0;
  document.getElementById('cart-body').innerHTML = items.length === 0
    ? '<tr><td colspan="4">Cart is empty</td></tr>'
    : items.map(item => {
        total += item.price * item.quantity;
        return `<tr>
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td>${item.quantity}</td>
          <td><button class="btn" onclick="removeItem(${item.id})">Remove</button></td>
        </tr>`;
      }).join('');
  document.getElementById('cart-total').textContent = `Total: ₹${total.toFixed(2)}`;
}

async function removeItem(id) {
  await fetch(`${API}/cart/remove/${id}`, { method: 'DELETE' });
  loadCart();
}

loadCart();