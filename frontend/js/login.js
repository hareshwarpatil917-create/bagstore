const API = 'https://bagstore-production-3209.up.railway.app/api';

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ STORE TOKEN + USER
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);   // 🔥 important

      document.getElementById('msg').textContent =
        `Welcome ${data.user.name}! Redirecting...`;

      setTimeout(() => window.location.href = 'products.html', 1000);
    } else {
      document.getElementById('msg').textContent = data.error;
    }

  } catch (err) {
    document.getElementById('msg').textContent = 'Server error. Try again.';
  }
}