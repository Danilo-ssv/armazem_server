const { Schema, model } = require('mongoose')

const usersSchema = new Schema({
	account: String,
	password: String,
})

const UsersModel = model('users_collections', usersSchema)

module.exports = UsersModel