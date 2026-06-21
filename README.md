# 🚆 TrainView — Train Schedule App

Full-stack застосунок для перегляду та управління розкладом поїздів з live-статусом, авторизацією та розмежуванням ролей.

---

## 📁 Структура проєкту

```
train-schedule-app/
├── back-end/     # NestJS API
└── front-end/    # Next.js 16 
```

---

## 🛠 Технологічний стек

### Back-end
| Технологія | Версія | Призначення |
|---|---|---|
| NestJS | 11 | HTTP-фреймворк |
| Prisma | 7 | ORM / міграції |
| PostgreSQL | — | База даних (Supabase) |
| JWT + Passport | — | Авторизація |
| bcrypt | 6 | Хешування паролів |
| class-validator | — | Валідація DTO |

### Front-end
| Технологія | Версія | Призначення |
|---|---|---|
| Next.js | 16 | React-фреймворк |
| React | 19 | UI |
| Tailwind CSS | 4 | Стилі |
| shadcn/ui | — | UI-компоненти |
| react-hook-form | 7 | Форми |
| axios | — | HTTP-запити |
| next-themes | — | Темна/світла тема |
| jwt-decode | — | Декодування токена |

---

## 🗄 Схема бази даних

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
}

model Train {
  id            Int      @id @default(autoincrement())
  trainNumber   String
  fromStation   String
  toStation     String
  departureTime DateTime
  arrivalTime   DateTime
  createdAt     DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}
```

---

## 🚀 Запуск проєкту

### Вимоги
- Node.js 18+
- npm або yarn
- PostgreSQL або Supabase-акаунт

---

### Back-end

```bash
cd back-end
npm install
```

Створи файл `.env`:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
JWT_SECRET="your_jwt_secret"
ADMIN_SECRET="your_admin_secret"
```

```bash
# Застосувати міграції
npx prisma db push

# Запустити в режимі розробки
npm run start:dev
```

API буде доступне на `http://localhost:3000`

---

### Front-end

```bash
cd front-end
npm install
npm run dev
```

Застосунок буде доступний на `http://localhost:3001`

---

## 📡 API Ендпоінти

### Авторизація

| Метод | URL | Опис | Доступ |
|---|---|---|---|
| `POST` | `/auth/register` | Реєстрація нового юзера | Публічний |
| `POST` | `/auth/login` | Вхід, повертає JWT | Публічний |
| `POST` | `/auth/register-admin` | Реєстрація адміна з секретним ключем | Публічний + секрет |

---

### Поїзди

| Метод | URL | Опис | Доступ |
|---|---|---|---|
| `GET` | `/trains` | Список усіх поїздів | Публічний |
| `POST` | `/trains` | Додати поїзд | USER / ADMIN |
| `PATCH` | `/trains/:id` | Редагувати поїзд | USER / ADMIN |
| `DELETE` | `/trains/:id` | Видалити поїзд | Тільки ADMIN |

---

## 🔐 Ролі та дозволи

| Дія | Гість | USER | ADMIN |
|---|:---:|:---:|:---:|
| Переглядати розклад | ✅ | ✅ | ✅ |
| Додавати поїзд | ❌ | ✅ | ✅ |
| Редагувати поїзд | ❌ | ✅ | ✅ |
| Видаляти поїзд | ❌ | ❌ | ✅ |

---

## 🌐 Сторінки фронтенду

| URL | Опис |
|---|---|
| `/` | Головна — розклад поїздів |
| `/login` | Вхід |
| `/register` | Реєстрація |
| `/admin-register` | Реєстрація адміна (секретна сторінка) |

---
