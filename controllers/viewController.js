exports.testView = (req, res) => {
	res.status(200).render("test", {
		title: "Test page",
	});
};
