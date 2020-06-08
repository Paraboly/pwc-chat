import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";
import { IMessageItem } from "../pwc-chat/IMessageItem"

@Component({
    tag: "pwc-chat-item",
    styleUrl: "../styles.scss",
    shadow: false
})
export class ChatItem implements IMessageItem {
    private editInputField: HTMLTextAreaElement;

    @Prop() id: string;
    @Prop() username: string;
    @Prop() message: string;
    @Prop() time: string;
    @Prop() editTime?: string;
    @Prop() editable: boolean;
    @Prop() deletable: boolean;

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

    editInputFieldRefCallback(elm?: HTMLTextAreaElement) {
        this.editInputField = elm;
    }

    renderBody() {
        if (this.isEditing) {
            return [
                <div class="edit-input">
                    <div class="edit-input-container">
                        <textarea class="edit-input-field" ref={this.editInputFieldRefCallback.bind(this)}>{this.message}</textarea>
                        <div class="edit-input-field-shadow"></div>
                    </div>
                </div>,
                <div class="editing-toolbox">
                    <button class="small-btn" onClick={this.saveOnClick.bind(this)}>Save</button>
                    <button class="small-btn" onClick={this.cancelOnClick.bind(this)}>Cancel</button>
                </div>
            ];
        } else {
            return <p>{this.message}</p>;
        }
    }

    render() {
        return (
            <div class="box">
                {!this.isEditing && <div class="toolbox">
                    {this.editable && <button class="small-btn" onClick={this.editOnClick.bind(this)}>Edit</button>}
                    {this.deletable && <button class="small-btn" onClick={this.deleteOnClick.bind(this)}>Delete</button>}
                </div>}
                <h2>{this.username}</h2>
                {this.renderBody()}
                <span class="time">{this.editTime && "Created "}{this.time}</span>
                {this.editTime && <span class="time">Edited {this.editTime}</span>}
            </div>
        );
    }
}
