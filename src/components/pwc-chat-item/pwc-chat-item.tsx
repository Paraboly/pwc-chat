import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: "pwc-chat-item",
    styleUrl: "pwc-chat-item.scss",
    shadow: false
})
export class PwcChatITem {
    @Prop() id: string;
    @Prop() username: string;
    @Prop() message: string;
    @Prop() time: string;

    render() {
        return (
            <div class="box">
                <h2>{this.username}</h2>
                <p>{this.message}</p>
                <span class="time">{this.time} (id: {this.id})</span>
            </div>
        );
    }
}
