A REST API for working with a collection of contacts supporting follwoing endpoints:
@ GET /api/contacts
@ GET /api/contacts/:id
@ POST /api/contacts
@ DELETE /api/contacts/:id
@ PUT /api/contacts/:id
@ PATCH /api/contacts/:contactId/favorite
@ POST /api/auth/signup
@ POST /api/auth/login
@ GET /api/auth/logout
@ GET /api/users/current
@ PATCH /api/users/avatars
@ GET /api/users/verify/:verificationToken

Used tools:
node.js
nodemon
express
express-validator
gravatar
jimp
joi
jsonwebtoken
mongodb
mongoose
morgan
multer
nodemailer
uuid
uuidv4
