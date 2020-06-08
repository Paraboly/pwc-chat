import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: "pwc-chat-item",
    styleUrl: "pwc-chat-item.scss",
    shadow: false
})
export class PwcChatITem {
    @Prop() username: any;
    @Prop() message: any;
    @Prop() time: any;

    render() {
        return (
            <div class="box">
                <h2>{this.username}</h2>
                <p>{this.message}</p>
                <span class="time">{this.time}</span>
            </div>
        );
    }
}
