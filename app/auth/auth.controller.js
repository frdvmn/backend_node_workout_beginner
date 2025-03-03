const asyncHandler = require('express-async-handler')

// @desc		Auth user
// @route		POST /api/auth/login
// @access	Public
export const authUser = asyncHandler(async (req, res) => {
	console.log(req.body.username)
	res.send('sccess')
})
