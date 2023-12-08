# E-commerce store API

> This project is an API for e-commerce clothing store built with Express.js and TypeScript.

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Endpoints](#endpoints)
- [Setup](#setup)
- [Project Status](#project-status)
- [Copyright](#copyright)

## General Information

This API was built for e-commerce clothing store so the users can authenticate and authorize themselves, fetch products available at the store, place orders and pay for them.

## Technologies Used

- Node.js - version 20.9.0
- Express.js - version 4.18.2
- TypeScript - version 5.2.2
- MongoDB
- Mongoose - version 8.0.0
- Express Validator - version 7.0.1
- Stripe - version 14.5.0

## Features

- User authentication with JWT
- User authorization based on roles
- Fetching available products
- Placing orders
- Stripe integration for handling payments
- Admin user can add new products to the store


## Endpoints

- POST | /auth/register | Register new user
- POST | /auth/login | Log in user
- GET | /auth/check-role | Authorize user
- POST | /products/add | Add new product
- GET | /products/get/:category | Get products from specific category
- PATCH | /orders/add | Add new order
- GET | /orders/get | Get all user's orders
- POST | /checkout/create-checkout-session | Create Stripe checkout session

## Setup

To get started with the project, follow the steps below:

- Clone the repository onto your device
- Open the repository in some code editor, for example VSCode and install the dependencies with:
```bash
npm install
```
- Add .env file with the following variables: 'PORT', 'DB_URI', 'AUTH_TOKEN_SECRET', 'STRIPE_SECRET_KEY', 'CLIENT_DOMAIN' and fill them with your data
- Run the app on your localhost in the development mode with:
```bash
npm run dev
```

## Project Status

Project is: _finished_.

## Copyright

Created by [@bystrol](https://github.com/Bystrol) - all rights reserved.
