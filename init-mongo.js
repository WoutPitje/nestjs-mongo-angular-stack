db.createUser({
	user: "user",
	pwd: "password",
	roles: [
		{
			role: "readWrite",
			db: "appname"
		}
	]
});
db.createCollection("init");
