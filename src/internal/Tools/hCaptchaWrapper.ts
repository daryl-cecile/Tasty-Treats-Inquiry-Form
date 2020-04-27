
const hcaptchaVerify = require('hcaptcha').verify;
const secret = '0x965eeF43f65591384a536a2F0f2e0E56Edd04606';


/**
 * Wraps the hCaptcha verify method to normalize the promise result
 * @param token
 */
export async function verify(token){
    return new Promise<{isSuccessful:boolean, data:any}>((resolve) => {
        hcaptchaVerify(secret, token)
            .then((data) => {
                if (data.success){
                    resolve({
                        isSuccessful: true,
                        data: data
                    });
                }
                else{
                    resolve({
                        isSuccessful: false,
                        data: data
                    });
                }
            })
            .catch(err => {
                resolve({
                    isSuccessful: false,
                    data: err
                });
            });
    });
}