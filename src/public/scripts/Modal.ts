
interface IMessageOptions {
    message:string;
    timeout?:number;
    buttons:{
        text:string;
        type?:"primary"|"negative"|"default";
        callback?:()=>{};
    }[]
}

class Modal extends HTMLElement{

    public open(options:IMessageOptions){
        this.innerHTML = [
            `<div class="modal">`,
                `<p>${options.message}</p>`,
                `<div class="modal-buttons"></div>`,
            `</div>`
        ].join('\n');

        options.buttons.forEach(btn => {
            let button = document.createElement('button');
            if (btn.type !== "default") button.classList.add(`btn-${btn.type}`);
            button.innerHTML = btn.text;
            button.addEventListener('click',()=>{
                btn.callback?.();
                this.close();
            });
            this.querySelector('.modal-buttons').appendChild(button);
        });

        this.setAttribute('open','');
        return this;
    }

    public close(){
        this.removeAttribute('open');
        setTimeout(()=>{

        }, 300);
        return this;
    }

}

customElements.define("x-modal", Modal);