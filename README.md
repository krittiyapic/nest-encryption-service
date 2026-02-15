# 🔐 NestJS Encryption Service

---

## 📌 Features

- NestJS Framework
- REST API
- Encryption / Decryption
- Swagger API Document (`/api-docs`)
- Unit Test (HTTP Server)

---

## 🧱 Technology Stack

- Node.js (>= 18)
- NestJS
- TypeScript
- Crypto (Node.js built-in)
- Jest / Supertest
- Swagger

---

## ⚙️ Project Setup

```bash
$ npm install
```

## Compile and run the project

```bash
$ npm run start:dev
```

## Run tests (HTTP Server)

```bash
$ npm run test:e2e
```

## Swagger

http://localhost:3000/api-docs

## 🔑 Key Configuration

ใช้ RSA Key ที่ generate จาก (ถ้า Key เดิมไม่สามารถใช้งานได้)

👉 https://cryptotools.net/rsagen

สร้างไฟล์ หรือ Replace key `env.dev`  ที่ root ของโปรเจกต์

```env
PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
YOUR_PUBLIC_KEY_HERE
-----END PUBLIC KEY-----"

PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
YOUR_PRIVATE_KEY_HERE
-----END RSA PRIVATE KEY-----"
