declare class FormHandler {
    private form;
    private _submitResult;
    constructor(form: HTMLFormElement);
    static override(form: HTMLFormElement, onSubmit: (request: XMLHttpRequest, err?: any) => void): FormHandler;
    performValidate(): boolean;
    performSubmit(): void;
}
