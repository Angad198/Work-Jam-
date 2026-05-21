import sqlite3

conn = sqlite3.connect("app.db")
c = conn.cursor()

# Employees
c.execute("""
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    role TEXT
)
""")

# Shifts
c.execute("""
CREATE TABLE IF NOT EXISTS shifts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee TEXT,
    date TEXT,
    start TEXT,
    end TEXT,
    status TEXT
)
""")

# Attendance
c.execute("""
CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    type TEXT,
    time TEXT,
    date TEXT
)
""")

# Shift Requests
c.execute("""
CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee TEXT,
    reason TEXT,
    status TEXT
)
""")

conn.commit()
conn.close()

print("Database created ✔")