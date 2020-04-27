
import {Controller} from "../../internal/Tools/RouterWrapper";
import {ResponseRepository} from "../../internal/Tools/ResponseRepository";

export const AdminController = new Controller("/admin", (router) => {

    router.onGET("/view-submissions", async(req, res) => {
        res.render("view_all",{ inquiries: await ResponseRepository.getAll() });
    });

    router.onGET("/view/:id", async(req, res) => {
        let id = req.params['id'];
        res.render("view_single",{ inquiry: await ResponseRepository.getById(id) });
    });

    return router;
});