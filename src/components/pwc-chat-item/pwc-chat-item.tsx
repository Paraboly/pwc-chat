import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";

@Component({
    tag: "pwc-chat-item",
    styleUrl: "../styles.scss",
    shadow: false
})
export class PwcChatITem {
    private editInputField: HTMLInputElement;

    @Prop() id: string;
    @Prop() username: string;
    @Prop() message: string;
    @Prop() time: string;
    @Prop() editable: any;
    @Prop() deletable: any;

    @State() isEditing: boolean;

    @Event() messageDeleted: EventEmitter<{ id: string }>;
    @Event() messageEdited: EventEmitter<{ id: string, newMessage: string }>;

    editOnClick(e: MouseEvent): void {
        this.isEditing = true;
    }

    deleteOnClick(e: MouseEvent): void {
        this.messageDeleted.emit({ id: this.id });
    }

    saveOnClick(e: MouseEvent): void {
        const newMessage = this.editInputField.value;
        this.isEditing = false;
        this.message = newMessage;
        this.messageEdited.emit({ id: this.id, newMessage });
    }

    cancelOnClick(e: MouseEvent): void {
        this.isEditing = false;
    }

    editInputFieldRefCallback(elm?: HTMLInputElement) {
        this.editInputField = elm;
    }

    renderBody() {
        if (this.isEditing) {
            return <div>
                <input type="text" value={this.message} ref={this.editInputFieldRefCallback.bind(this)}></input>
                <button onClick={this.saveOnClick.bind(this)}>Save</button>
                <button onClick={this.cancelOnClick.bind(this)}>Cancel</button>
            </div>
        } else {
            return <p>{this.message}</p>;
        }
    }

    render() {
        return (
            <div class="box">
                {!this.isEditing && <div class="toolbox">
                    <button onClick={this.editOnClick.bind(this)}>Edit</button>
                    <button onClick={this.deleteOnClick.bind(this)}>Delete</button>
                </div>}
                <h2>{this.username}</h2>
                {this.renderBody()}
                <span class="time">{this.time} (id: {this.id})</span>
            </div>
        );
    }
}
