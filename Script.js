
// ================= GLOBAL USER =================
let username = localStorage.getItem("username");
let role = localStorage.getItem("role");


// ================= LOGIN =================
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let msg = document.getElementById("msg");

  if (user === "" || pass === "") {
    msg.innerText = "Please fill all fields";
    return;
  }

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("role", "admin");
    localStorage.setItem("username", "admin");

    window.location.href = "admin.html";
  } 
  else if (user === "emp" && pass === "1234") {
    localStorage.setItem("role", "employee");
    localStorage.setItem("username", "emp");

    window.location.href = "employee.html";
  } 
  else {
    msg.style.color = "red";
    msg.innerText = "Invalid credentials";
  }
}


// ================= EMPLOYEES =================
function addEmployee() {
  let name = document.getElementById("empName").value;
  let role = document.getElementById("empRole").value;
  let msg = document.getElementById("msg");

  if (name === "" || role === "") {
    msg.innerText = "Please fill all fields";
    return;
  }

  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  let employee = {
    id: Date.now(),
    name: name,
    role: role
  };

  employees.push(employee);

  localStorage.setItem("employees", JSON.stringify(employees));

  msg.style.color = "green";
  msg.innerText = "Employee added ✔";

  document.getElementById("empName").value = "";
  document.getElementById("empRole").value = "";

  displayEmployees();
}

function displayEmployees() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let list = document.getElementById("empList");

  if (!list) return;

  list.innerHTML = "";

  employees.forEach(emp => {
    list.innerHTML += `
      <li>${emp.name} - ${emp.role}</li>
    `;
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
  let time = new Date().toLocaleTimeString();

  let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

  attendance.push({
    user: username,
    type: type,
    time: time,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("attendance", JSON.stringify(attendance));

  let msg = document.getElementById("clockMsg");
  if (msg) {
    msg.innerText = `${type} at ${time}`;
  }

  showAttendance();
}

function showAttendance() {
  let attendance = JSON.parse(localStorage.getItem("attendance")) || [];
  let list = document.getElementById("attendanceList");

  if (!list) return;

  list.innerHTML = "";

  attendance.forEach(item => {
    if (item.user === username) {
      list.innerHTML += `
        <li>${item.date} - ${item.type} - ${item.time}</li>
      `;
    }
  });
}


// ================= EMPLOYEE DASHBOARD =================
function loadEmployeeName() {
  let display = document.getElementById("empName");

  if (display) {
    display.innerText = "Welcome " + username;
  }
}


// ================= MY SHIFTS =================
function loadMyShifts() {
  let shifts = JSON.parse(localStorage.getItem("shifts")) || [];
  let list = document.getElementById("myShifts");

  if (!list) return;

  list.innerHTML = "";

  shifts.forEach(shift => {
    if (shift.employee === username) {
      list.innerHTML += `
        <li>
          📅 ${shift.date} | ⏰ ${shift.start} - ${shift.end}
        </li>
      `;
    }
  });
}


// ================= PAGE LOAD =================
window.onload = function () {
  loadEmployeeName();
  showAttendance();
  loadMyShifts();
  loadEmployeeDropdown(); // ⭐ IMPORTANT FIX
};


///   ================= SHIFTS (ADMIN) =================
function addShift() {
  let emp = document.getElementById("shiftEmp").value;
  let date = document.getElementById("shiftDate").value;
  let start = document.getElementById("shiftStart").value;
  let end = document.getElementById("shiftEnd").value;

  let msg = document.getElementById("shiftMsg");

  if (emp === "" || date === "" || start === "" || end === "") {
    msg.innerText = "Please fill all fields";
    msg.style.color = "red";
    return;
  }

  let shifts = JSON.parse(localStorage.getItem("shifts")) || [];

  shifts.push({
    employee: emp,
    date: date,
    start: start,
    end: end
  });

  localStorage.setItem("shifts", JSON.stringify(shifts));

  msg.style.color = "green";
  msg.innerText = "Shift assigned ✔";

  // clear fields
  document.getElementById("shiftDate").value = "";
  document.getElementById("shiftStart").value = "";
  document.getElementById("shiftEnd").value = "";
}

/// Load employees into dropdown//
function loadEmployeeDropdown() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let dropdown = document.getElementById("shiftEmp");

  if (!dropdown) return;

  dropdown.innerHTML = "";

  employees.forEach(emp => {
    dropdown.innerHTML += `
      <option value="${emp.name}">
        ${emp.name}
      </option>
    `;
  });
}