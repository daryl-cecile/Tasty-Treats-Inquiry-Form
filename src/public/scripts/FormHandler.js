var FormHandler = /** @class */ (function () {
    function FormHandler(form) {
        var _this = this;
        this.form = form;
        this._submitResult = null;
        form.addEventListener('submit', function (ev) {
            var isValid = _this.performValidate();
            if (isValid)
                _this.performSubmit();
            return false;
        });
        form.setAttribute('onsubmit', 'return false;');
    }
    FormHandler.override = function (form, onSubmit) {
        var f = new FormHandler(form);
        f._submitResult = onSubmit;
        return f;
    };
    FormHandler.prototype.performValidate = function () {
        return this.form.checkValidity();
    };
    FormHandler.prototype.performSubmit = function () {
        var _this = this;
        var req = new XMLHttpRequest();
        req.open(this.form.method, this.form.action, true);
        req.onreadystatechange = function (_) {
            if (req.readyState === 4) {
                if (req.status === 200 || req.status === 201) {
                    _this._submitResult ? .(req) : ;
                }
                else {
                    _this._submitResult ? .(req, new Error("Received " + req.status + ", " + req.statusText)) : ;
                }
            }
        };
        var data = new FormData(this.form);
        req.send(data);
    };
    return FormHandler;
}());
//# sourceMappingURL=FormHandler.js.map