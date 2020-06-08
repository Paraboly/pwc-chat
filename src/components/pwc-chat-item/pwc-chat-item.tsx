import { Component, Prop, h, EventEmitter, Event } from "@stencil/core";

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
    @Prop() editable: any;
    @Prop() deletable: any;

    @Prop() isEditing: boolean;

    @Event() onMessageEditClicked: EventEmitter<{id: string}>;
    @Event() onMessageDeleteClicked: EventEmitter<{id: string}>;
   
    editOnClick(e: MouseEvent): void {
        this.onMessageEditClicked.emit({id: this.id});
    }

    deleteOnClick(e: MouseEvent): void {
        this.onMessageDeleteClicked.emit({id: this.id});
    }

    renderBody() {
        if(this.isEditing) {
            return <input type="text" value={this.message}></input>
        } else {
            return <p>{this.message}</p>;
        }
    }

    render() {
        return (
            <div class="box">
                <div class="toolbox">
                    <button onClick={this.editOnClick.bind(this)}>Edit</button>
                    <button onClick={this.deleteOnClick.bind(this)}>Delete</button>
                </div>
                <h2>{this.username}</h2>
                {this.renderBody()}
                <span class="time">{this.time} (id: {this.id})</span>
            </div>
        );
    }
}
