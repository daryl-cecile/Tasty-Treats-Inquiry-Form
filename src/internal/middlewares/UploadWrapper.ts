import {BaseMiddleware} from "./BaseMiddleware";

const multer = require("multer");

export class UploadWrapper extends BaseMiddleware{

    protected handlerFunction(req, res, next) {
        let accept = multer({
            preservePath: true,
            limits: {
                fileSize: 10_000_000
            },
            storage : multer.diskStorage({
                destination: `${__dirname}/../../../responses`,
                filename: function (req, file, cb) {
                    cb(null, `${Date.now()}-${file.originalname}`);
                }
            })
        }).any();
        accept(req, res, function(){
            // not necessary yet as files aren't being uploaded
            next();
        });
    }

}
