interface IMessageOptions {
    message: string;
    timeout?: number;
    buttons: {
        text: string;
        type?: "primary" | "negative" | "default";
        callback?: () => {};
    }[];
}
declare class Modal extends HTMLElement {
    open(options: IMessageOptions): this;
    close(): this;
}
