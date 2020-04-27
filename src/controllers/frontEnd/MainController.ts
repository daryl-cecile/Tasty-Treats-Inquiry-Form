import {Controller} from "../../internal/Tools/RouterWrapper";

export const MainController = new Controller((router) => {

    router.onGET("/", (req, res) => {
        res.render("homepage");
    });

    router.onGET("/thank-you", (req, res)=>{
        res.render("thank_you");
    });

    return router;
});