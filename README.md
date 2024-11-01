

# HEALTHCHECK TEST : TRIGGER FLOWS REST API 

# Installation

install dependencies:

```bash
npm install
```

# Environment

ensure the .env file is at the root of the project, and feel free to change any of the following :

```bash
NODE_ENV=development
PORT=4000
EMAIL_DELAY=7200000

SIGNUP_SUBJECT=Welcome
SIGNUP_CONTENT="Thanks for signing up!"

PURCHASE_SUBJECT_PAYMENT="Payment Received"
PURCHASE_CONTENT_PAYMENT="Thanks for purchasing!"

PURCHASE_SUBJECT_DISPATCH="Socks Dispatched"
PURCHASE_CONTENT_DISPATCH="Your socks are on the way!"
```


# Tests

with jest and supertest:

```bash
npm run test
```


# Development


```bash
npm run dev
```

# Use

flow1 : signup

```bash
curl -X POST http://localhost:4000/api/trigger -H "Content-Type: application/json" -d '{"event": "user_signup", "data": {"user_email": "user@example.com"}}'
```

flow2 : purchase

```bash
curl -X POST http://localhost:4000/api/trigger -H "Content-Type: application/json" -d '{"event": "user_purchase_socks", "data": {"user_email": "user@example.com"}}'
```

Server Output

```bash
=============================================================
Express REST server Socks Flow
=============================================================
Environment:     development
Server:          http://localhost:4000/
App version:     0.0.1
=============================================================
 >>>>> Executing flow name : User Signup Flow
 >>>>> Executing flow with : user@example.com
 >>>>> Waiting for 120 minutes to send the welcome email
POST /api/trigger 200 27.145 ms - 212
 >>>>> Executing flow name : Purchase Socks Flow
 >>>>> Executing flow with : user@example.com
 >>>>> Email sent: {"recipient":"user@example.com","subject":"Payment Received","content":"Thanks for purchasing!"}
 >>>>> Email sent: {"recipient":"user@example.com","subject":"Socks Dispatched","content":"Your socks are on the way!"}
POST /api/trigger 200 2005.241 ms - 356
```

curl output

```bash
alvaroretanafernandez ~/dev/HEALTHCHECK  $ curl -X POST http://localhost:4000/api/trigger -H "Content-Type: application/json" -d '{"event": "user_signup", "data": {"user_email": "user@example.com"}}'

{"flow":"user_signup","action":"send_email","actionRecipient":"user@example.com","actionSubject":"Welcome","actionContent":"Thanks for signing up!","actionDelay":"7200000","message":"Flow executed successfully."}%                 

alvaroretanafernandez ~/dev/HEALTHCHECK  $ curl -X POST http://localhost:4000/api/trigger -H "Content-Type: application/json" -d '{"event": "user_purchase_socks", "data": {"user_email": "user@example.com"}}'

{"flow":"user_purchase_socks","action":"send_email","actionRecipient":"user@example.com","actionSubject":"Payment Received","actionContent":"Thanks for purchasing!","actionTwo":"send_email","actionTwoRecipient":"user@example.com","actionTwoSubject":"Socks Dispatched","actionTwoContent":"Your socks are on the way!","message":"Flow executed successfully."}%                                                                                                       
```

