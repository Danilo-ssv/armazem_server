const jwt = require('jsonwebtoken')
const UsersModel = require('../models/users_model.js')

const authController = {
	login: async (req, res)=>{
		const { account, password } = req.body

		const selectedAccount = await UsersModel.findOne({ account })
		if(selectedAccount.password == password)
			return res.json({
				isAuthenticated: true,
				token: jwt.sign({
					id: Math.random(),
					account,
				}, process.env.SECRET)
			})

		return res.json({isAuthenticated: false})

	},
	updateAccount: (req, res)=>{

		if(req.body.newPassword == req.body.confirmNewPassword) {
			UsersModel.findOneAndUpdate({
				account: req.body.currentAccount,
				password: req.body.currentPassword,
			}, {
				account: req.body.newAccount,
				password: req.body.newPassword,
			}, {
				returnOriginal: false
			}).then(() => {
				return res.sendStatus(200)
			}).catch(err => {
				return res.sendStatus(400)
			})
		}else {
			return res.sendStatus(400)
		}
	},
	authorization: (req, res, next)=>{

		const token = req.headers.authorization

		const data = jwt.verify(token, process.env.SECRET, (err, user)=>{
			if(err) return res.send('INVALID_TOKEN')

			next()
		})
	},
}

module.exports = authController