from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# ================= DATABASE =================
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///hr.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ================= MODELS =================
class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    role = db.Column(db.String(100))


class Shift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee = db.Column(db.String(100))
    date = db.Column(db.String(100))
    start = db.Column(db.String(100))
    end = db.Column(db.String(100))


class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(100))
    type = db.Column(db.String(50))
    time = db.Column(db.String(50))
    date = db.Column(db.String(50))


# ================= CREATE DB =================
with app.app_context():
    db.create_all()


# ================= LOGIN =================
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    if data["username"] == "admin" and data["password"] == "1234":
        return jsonify({"role": "admin", "username": "admin"})

    if data["username"] == "emp" and data["password"] == "1234":
        return jsonify({"role": "employee", "username": "emp"})

    return jsonify({"error": "Invalid"}), 401


# ================= EMPLOYEES =================
@app.route("/employees", methods=["GET"])
def get_employees():
    employees = Employee.query.all()
    return jsonify([{"id": e.id, "name": e.name, "role": e.role} for e in employees])


@app.route("/employees", methods=["POST"])
def add_employee():
    data = request.json
    emp = Employee(name=data["name"], role=data["role"])
    db.session.add(emp)
    db.session.commit()
    return jsonify({"message": "Employee added"})


# ================= SHIFTS =================
@app.route("/shifts", methods=["GET"])
def get_shifts():
    shifts = Shift.query.all()
    return jsonify([{
        "id": s.id,
        "employee": s.employee,
        "date": s.date,
        "start": s.start,
        "end": s.end
    } for s in shifts])


@app.route("/shifts", methods=["POST"])
def add_shift():
    data = request.json
    shift = Shift(
        employee=data["employee"],
        date=data["date"],
        start=data["start"],
        end=data["end"]
    )
    db.session.add(shift)
    db.session.commit()
    return jsonify({"message": "Shift added"})


# ================= ATTENDANCE =================
@app.route("/attendance", methods=["GET"])
def get_attendance():
    data = Attendance.query.all()
    return jsonify([{
        "id": a.id,
        "user": a.user,
        "type": a.type,
        "time": a.time,
        "date": a.date
    } for a in data])


@app.route("/attendance", methods=["POST"])
def add_attendance():
    data = request.json
    record = Attendance(
        user=data["user"],
        type=data["type"],
        time=data["time"],
        date=data["date"]
    )
    db.session.add(record)
    db.session.commit()
    return jsonify({"message": "Saved"})


# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)