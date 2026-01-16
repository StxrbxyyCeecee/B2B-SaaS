const API = "https://localhost:5001/api";

async function login() {
  await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      passwordHash: password.value
    })
  });

  location.href = "admin.html";
}

async function pay() {
  const res = await fetch(`${API}/payments/checkout`, { method: "POST" });
  location.href = await res.text();
}
function getToken() {
  return localStorage.getItem("token");
}

async function loadOrders() {
  const res = await fetch(`${API}/admin/orders`, {
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });

  if (!res.ok) {
    alert("Unauthorized");
    return;
  }

  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
}
async function pay() {
  const res = await fetch(`${API}/paystack/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      amount: 500
    })
  });

  const data = await res.json();
  window.location.href = data.url;
}
async function loadAnalytics() {
  const res = await fetch(`${API}/analytics`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const data = await res.json();
  orders.textContent = data.totalOrders;
  revenue.textContent = "R" + data.totalRevenue;
}
async function createUser() {
  await fetch(`${API}/admin/create?email=${email.value}&password=${password.value}&role=${role.value}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  loadUsers();
}

async function loadUsers() {
  const res = await fetch(`${API}/admin/list`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  const users = await res.json();
  list.innerHTML = users.map(u =>
    `<li>${u.email} — ${u.role}</li>`
  ).join("");
}
async function loadAuditLogs() {
  const res = await fetch(`${API}/audit`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
async function saveBrand() {
  await fetch(`${API}/branding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      companyName: name.value,
      companyAddress: address.value,
      primaryColor: color.value,
      logoUrl: logo.value
    })
  });
}

  const logs = await res.json();

  document.getElementById("logs").innerHTML = logs.map(l => `
    <tr>
      <td>${l.userEmail}</td>
      <td>${l.action}</td>
      <td>${l.ipAddress || "-"}</td>
      <td>${new Date(l.createdAt).toLocaleString()}</td>
    </tr>
  `).join("");
  function scrollToDemo() {
  document.getElementById("demo").scrollIntoView({ behavior: "smooth" });
}

}

loadAuditLogs();
loadOrders();