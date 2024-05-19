![App Screenshot](https://imgur.com/yPgUFfz.png)

# 🐕 Breedit

Connect with fellow pet lovers through swipes, similar to Tinder, and Chat with them. Donate or adopt pets effortlessly. Meet enthusiasts and share your passion for pets!

## Features

- 🐶 Meet fellow pet / animal lovers
- 🐶 Chat with them
- 🐶 Adopt & Donate pets / animal
- 🐶 Join the community of animal lovers

## Run Locally

Clone the project

```bash
  git clone https://github.com/Harish-Khandre/breedit-2.git
```

Go to the project directory

```bash
  cd breedit
```

Install dependencies

```bash
  npm install
```

Add the following environment variables to your .env file

```
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
DATABASE_URL=
```

Setup Prisma

```bash
  npx prisma generate
  npx prisma migrate dev
```

Start the app

```bash
  npm run dev
```
