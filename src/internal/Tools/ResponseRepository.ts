
const fs = require("fs");
const path = require("path");

export interface IResponse {
    id?:string,
    timestamp?:string,
    userInfo:{
        fullName:string,
        emailAddress:string
    },
    isSubscribed:boolean,
    message:string
}

export namespace ResponseRepository{
    let responsesFolder = path.resolve(__dirname, "../../../responses");

    function initId(input:IResponse){
        input.timestamp = Date.now().toString();
        input.id = [...Array(10)].map(_=>(~~(Math.random()*36)).toString(36)).join('');
    }

    export function writeNew(input:IResponse){
        initId(input);
        let responseLocation = path.resolve(responsesFolder, `${input.id}.txt`);
        return new Promise(resolve => {
            fs.writeFile( responseLocation,[
                `From: ${input.userInfo.fullName}`,
                `Email: ${input.userInfo.emailAddress}`,
                `Subscribed: ${input.isSubscribed ? "true": "false"}`,
                `Timestamp: ${input.timestamp}`,
                "<>",
                input.message
            ].join('\n'), { encoding: "utf8" }, resolve)
        });
    }

    export async function getById(id:string):Promise<Partial<IResponse>>{
        return new Promise(resolve => {
            let result:Partial<IResponse> = {
                userInfo:{
                    fullName:"",
                    emailAddress:""
                }
            };
            fs.readFile( path.resolve(responsesFolder, `${id}.txt`) , { encoding: "utf8" }, (err, content) => {
                let separatorIndex = content.indexOf("<>");
                let message = content.substr( separatorIndex + 2 ); //message is everything after separator
                let lines = content.substr(0, separatorIndex).split("\n");

                lines.forEach(line => {
                    if (line.startsWith("From: ")) result.userInfo.fullName = line.split("From: ")[1];
                    if (line.startsWith("Email: ")) result.userInfo.emailAddress = line.split("Email: ")[1];
                    if (line.startsWith("Timestamp: ")) result.timestamp = line.split("Timestamp: ")[1];
                    if (line.startsWith("Subscribed: ")) result.isSubscribed = line.split("Subscribed: ")[1] === "true";
                });

                result.message = message.trim();
                result.id = id;

                resolve(result);
            });
        })
    }

    export async function getAll():Promise<Partial<IResponse>[]>{
        let files = fs.readdirSync(responsesFolder,{encoding:"utf8", withFileTypes: true});
        let responses = await Promise.all<Partial<IResponse>>(files.filter(f => {
                return f.isFile();
            }).map(f => {
                return getById(f.name.split('.')[0])
            })
        );
        return responses.sort(function(x, y){
            return Number(y.timestamp) - Number(x.timestamp);
        });
    }

}