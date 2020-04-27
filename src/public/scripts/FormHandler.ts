
class FormHandler{
    private _submitResult:(request:XMLHttpRequest, err?:any)=>void = null;

    constructor(private form:HTMLFormElement) {
        form.addEventListener('submit', ev => {
            let isValid = this.performValidate();
            if (isValid) this.performSubmit();
            return false;
        });

        form.setAttribute('onsubmit','return false;');
    }

    public static override(form:HTMLFormElement, onSubmit:(request:XMLHttpRequest, err?:any)=>void){
        let f = new FormHandler(form);
        f._submitResult = onSubmit;
        return f;
    }

    performValidate():boolean{
        return this.form.checkValidity()
    }

    performSubmit(){
        let req = new XMLHttpRequest();
        req.open(this.form.method, this.form.action, true);
        req.onreadystatechange = _ => {
            if (req.readyState === 4) {
                if (req.status === 200 || req.status === 201){
                    this._submitResult?.(req);
                }
                else{
                    this._submitResult?.(req, new Error(`Received ${req.status}, ${req.statusText}`));
                }
            }
        }
        let data = new FormData(this.form);
        req.send(data);
    }
}