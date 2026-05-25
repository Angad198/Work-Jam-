// ================= CONFIG =================
const API = "http://127.0.0.1:5000";

let username = localStorage.getItem("username");
let role = localStorage.getItem("role");


// ================= AUTH =================
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let msg = document.getElementById("msg");

  if (!user || !pass) {
    msg.innerText = "Please fill all fields";
    return;
  }

  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: pass })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.role) {
        msg.style.color = "red";
        msg.innerText = "Invalid credentials";
        return;
      }

      localStorage.setItem("username", data.username || user);
      localStorage.setItem("role", data.role);

      window.location.href =
        data.role === "admin" ? "admin.html" : "employee.html";
    })
    .catch(() => {
      msg.innerText = "Server not running";
    });
}


// ================= EMPLOYEES =================
function addEmployee() {
  let name = document.getElementById("empName").value;
  let role = document.getElementById("empRole").value;
  let msg = document.getElementById("msg");

  if (!name || !role) {
    msg.innerText = "Please fill all fields";
    return;
  }

  fetch(`${API}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role })
  }).then(() => {
    msg.style.color = "green";
    msg.innerText = "Employee added ✔";
    displayEmployees();
    loadEmployeeDropdown();
  });
}

function displayEmployees() {
  fetch(`${API}/employees`)
    .then(r => r.json())
    .then(data => {
      let list = document.getElementById("empList");
      if (!list) return;

      list.innerHTML = data
        .map(e => `<li>${e.name} - ${e.role}</li>`)
        .join("");
    });
}


// ================= SHIFTS =================
function addShift() {
  let emp = document.getElementById("shiftEmp").value;
  let date = document.getElementById("shiftDate").value;
  let start = document.getElementById("shiftStart").value;
  let end = document.getElementById("shiftEnd").value;
  let msg = document.getElementById("shiftMsg");

  if (!emp || !date || !start || !end) {
    msg.innerText = "Please fill all fields";
    msg.style.color = "red";
    return;
  }

  fetch(`${API}/shifts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee: emp, date, start, end })
  }).then(() => {
    msg.style.color = "green";
    msg.innerText = "Shift assigned ✔";
    showAllShifts();
    loadMyShifts();
  });
}

function showAllShifts() {
  fetch(`${API}/shifts`)
    .then(r => r.json())
    .then(data => {
      let list = document.getElementById("allShifts");
      if (!list) return;

      list.innerHTML = data
        .map(s =>
          `<li>${s.employee} | ${s.date} | ${s.start}-${s.end}</li>`
        )
        .join("");
    });
}

function loadMyShifts() {
  fetch(`${API}/shifts`)
    .then(r => r.json())
    .then(data => {
      let list = document.getElementById("myShifts");
      if (!list) return;

      list.innerHTML = data
        .filter(s => s.employee === username)
        .map(s => `<li>${s.date} | ${s.start} - ${s.end}</li>`)
        .join("");
    });
}


// ================= ATTENDANCE =================
function clockIn() {
  saveAttendance("Clock In");
}

function clockOut() {
  saveAttendance("Clock Out");
}

function saveAttendance(type) {
  fetch(`${API}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: username,
      type,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    })
  }).then(showAttendance);
}

function showAttendance() {
  fetch(`${API}/attendance`)
    .then(r => r.json())
    .then(data => {
      let list = document.getElementById("attendanceList");
      if (!list) return;

      list.innerHTML = data
        .filter(i => i.user === username)
        .map(i => `<li>${i.date} | ${i.type} | ${i.time}</li>`)
        .join("");
    });
}


// ================= DROPDOWN =================
function loadEmployeeDropdown() {
  fetch(`${API}/employees`)
    .then(r => r.json())
    .then(data => {
      let dropdown = document.getElementById("shiftEmp");
      if (!dropdown) return;

      dropdown.innerHTML = data
        .map(e => `<option value="${e.name}">${e.name}</option>`)
        .join("");
    });
}


// ================= SHIFT REQUESTS =================
function requestShiftSwap() {
  let reason = document.getElementById("swapReason").value;
  if (!reason) return alert("Enter reason");

  let requests = JSON.parse(localStorage.getItem("shiftRequests")) || [];

  requests.push({
    id: Date.now(),
    employee: username,
    reason,
    status: "Pending"
  });

  localStorage.setItem("shiftRequests", JSON.stringify(requests));
  loadMyRequests();
}

function loadMyRequests() {
  let requests = JSON.parse(localStorage.getItem("shiftRequests")) || [];
  let list = document.getElementById("myRequests");
  if (!list) return;

  list.innerHTML = requests
    .filter(r => r.employee === username)
    .map(r => `<li>${r.reason} | ${r.status}</li>`)
    .join("");
}

function loadAllRequests() {
  let requests = JSON.parse(localStorage.getItem("shiftRequests")) || [];
  let list = document.getElementById("allRequests");
  if (!list) return;

  list.innerHTML = requests
    .map(r => `
      <li>
        ${r.employee} | ${r.reason} | ${r.status}
        <button onclick="approveRequest(${r.id})">Approve</button>
        <button onclick="rejectRequest(${r.id})">Reject</button>
      </li>
    `).join("");
}

function approveRequest(id) {
  updateRequest(id, "Approved");
}

function rejectRequest(id) {
  updateRequest(id, "Rejected");
}

function updateRequest(id, status) {
  let requests = JSON.parse(localStorage.getItem("shiftRequests")) || [];

  requests = requests.map(r =>
    r.id === id ? { ...r, status } : r
  );

  localStorage.setItem("shiftRequests", JSON.stringify(requests));
  loadAllRequests();
}


// ================= PAGE INIT =================
window.onload = function () {
  displayEmployees();
  showAllShifts();
  loadMyShifts();
  showAttendance();
  loadEmployeeDropdown();
  loadMyRequests();
  loadAllRequests();
};