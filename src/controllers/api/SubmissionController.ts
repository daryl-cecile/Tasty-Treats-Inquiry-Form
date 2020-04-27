import {Controller} from "../../internal/Tools/RouterWrapper";
import {verify} from "../../internal/Tools/hCaptchaWrapper";
import {isVoid, oResponse} from "../../internal/Tools/convenienceMethods";
import {ResponseRepository} from "../../internal/Tools/ResponseRepository";

export const SubmissionController = new Controller("/api/submission", router => {

    router.onPOST("/send", async (req, res) => {

        let {full_name, message, email_address} = req.body;
        let subscribeChecked = req.body['subscribe'];
        let captchaResponse = req.body['h-captcha-response'];

        if (isVoid(full_name) || isVoid(message) || isVoid(email_address)){
            res.json(oResponse(
                false,
                "Information missing",
                {
                    body: req.body
                }
            ));
            return;
        }

        let captchaResult = await verify(captchaResponse);

        console.log(captchaResult.data);

        if (!captchaResult.isSuccessful){
            res.json(oResponse(
                false,
                "Captcha invalid",
                {
                    captchaData: captchaResult.data,
                    goto: "#reload"
                }
            ));
            return;
        }

        ResponseRepository.writeNew({
            userInfo:{
                fullName: full_name,
                emailAddress: email_address
            },
            isSubscribed: !!subscribeChecked,
            message: message
        });

        // result doesnt need to wait for write completion
        res.json(oResponse(
            true,
            "Message received",
            {
                goto: "/thank-you"
            }
        ))

    });

    return router;
});