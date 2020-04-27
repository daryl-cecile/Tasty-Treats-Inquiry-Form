var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal.prototype.open = function (options) {
        var _this = this;
        this.innerHTML = [
            "<div class=\"modal\">",
            "<p>" + options.message + "</p>",
            "<div class=\"modal-buttons\"></div>",
            "</div>"
        ].join('\n');
        options.buttons.forEach(function (btn) {
            var button = document.createElement('button');
            if (btn.type !== "default")
                button.classList.add("btn-" + btn.type);
            button.innerHTML = btn.text;
            button.addEventListener('click', function () {
                btn.callback ? .() : ;
                _this.close();
            });
            _this.querySelector('.modal-buttons').appendChild(button);
        });
        this.setAttribute('open', '');
        return this;
    };
    Modal.prototype.close = function () {
        this.removeAttribute('open');
        setTimeout(function () {
        }, 300);
        return this;
    };
    return Modal;
}(HTMLElement));
customElements.define("x-modal", Modal);
//# sourceMappingURL=Modal.js.map