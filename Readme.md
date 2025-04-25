# Employee Salary Management API

A full-stack API built with Node.js, Express, TypeScript, Prisma, and PostgreSQL for managing employee salaries, attendance, and payroll distribution.

---

## 🛠 Tech Stack
- Node.js with TypeScript
- Express.js
- PostgreSQL (or MySQL)
- Prisma ORM
- JWT Authentication (via HTTP-only Cookies)
- Redis (Optional)

---

## 📁 Folder Structure

```
├── src
│   ├── controller
│   ├── middleware
│   ├── routes
│   ├── types
│   └── app.ts
├── prisma
│   ├── schema.prisma
│   └── seed.ts
├── .env
├── package.json
├── tsconfig.json
```

---

## 🚀 Setup Instructions

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/your-repo/employee-salary-api
cd employee-salary-api
npm install
```

### 2. Configure Environment Variables
Create a `.env` file:
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/salary_app"
JWT_SECRET="your_jwt_secret"
```

### 3. Setup Database
```bash
npx prisma migrate dev --name init
npx prisma generate
npx ts-node prisma/seed.ts
```

### 4. Start the Server
```bash
npx ts-node src/app.ts
```

Server will run at: http://localhost:3000

---

## 🧪 API Testing with Postman

### 1. Authentication

🔐 Login
```
POST /auth/login
Body (JSON):
{
  "email": "hr@example.com",
  "password": "password123"
}
```

🔓 Logout
```
POST /auth/logout
```

### 2. Employee Management

👤 Add New Employee
```
POST /employees
Headers: Cookie (HR/Admin auth required)
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "EMPLOYEE",
  "basicSalary": 40000
}
```

🔍 Get Employee by ID
```
GET /employees/:id
Only accessible by Admin/HR or self (requires auth cookie)
```

### 3. Attendance

📆 Mark Attendance
```
POST /attendance/mark
Body:
{
  "hoursWorked": 8
}
Requires employee JWT auth
```

### 4. Salary Calculation

🧮 Calculate Salary
```
POST /salary/calculate
Body:
{
  "employeeId": 1,
  "month": "2025-04",
  "basicSalary": 40000,
  "hra": 10000,
  "allowances": 5000,
  "otherDeductions": 1000
}
```

📄 Get Salary by Month
```
GET /salary/1?month=2025-04
```

### 5. Payroll Distribution

💸 Distribute Payroll
```
POST /payroll/distribute
Body:
{
  "month": "2025-04"
}
```

📂 Get Payroll History
```
GET /payroll/history?month=2025-04
```

---

## ✅ Sample Testing Flow (Postman)

1. Login with HR/Admin
2. Create Employee
3. Login with Employee
4. Mark Attendance (multiple times for a month)
5. Login with HR/Admin
6. Call /salary/calculate
7. View salary via /salary/:id?month=YYYY-MM
8. Distribute payroll and view history

---

## 🧰 Notes
- Ensure cookies are retained between Postman requests.
- Use Prisma Studio for quick DB inspection: `npx prisma studio`

---

## 📧 Contact
For any queries: hr@codesfortomorrow.com

---

Happy Building! 💼

