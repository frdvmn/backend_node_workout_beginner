// @desc		Auth user
// @route		POST /api/auth/login
// @access	Public
export const authUser = (req, res) => {
	res.send(`Authenticated successfully ${req.body.username}`)
}
