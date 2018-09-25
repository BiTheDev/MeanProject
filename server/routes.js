const api = require("./controller");

function router(app){
    app.post("/api/User/new",api.Register);
    app.put("/api/User/newdate/:user1_id",api.CreateDate);
    app.get("/api/User/:id",api.GetUser);
    app.get("/api/login/",api.Login)
    app.put("/api/User2/:user2_id",api.UpdateUserDate);
    app.delete("/api/Date/Destroy/:id",api.RemoveDate);

}

module.exports = router;