
const API = 'https://bagstore-production-3209.up.railway.app/api';

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  credentials: 'include'
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    
    body: JSON.stringify({ email, password })
    
  });
  const data = await res.json();
  const msg = document.getElementById('msg');
  if (res.ok) {
    localStorage.setItem('user', JSON.stringify(data.user));
    msg.textContent = `Welcome, ${data.user.name}! Redirecting...`;
    setTimeout(() => window.location.href = 'products.html', 1000);
  } else {
    msg.textContent = data.error;
    msg.className = 'msg err';
  }
}

async function register() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  const msg = document.getElementById('reg-msg');
  msg.textContent = res.ok ? 'Registered! Now login.' : data.error;
  msg.className = res.ok ? 'msg' : 'msg err';
}

function showRegister() {
  document.getElementById('reg-section').style.display = 'block';
}