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

    @Prop() editButtonName: string;
    @Prop() deleteButtonName: string;
    @Prop() saveButtonName: string;
    @Prop() cancelButtonName: string;
    @Prop() createdLabelNameProducer: (createdDate: string) => string;
    @Prop() editedLabelNameProducer: (editedDate: string) => string;

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
                    <button class="small-btn" onClick={this.saveOnClick.bind(this)}>{this.saveButtonName}</button>
                    <button class="small-btn" onClick={this.cancelOnClick.bind(this)}>{this.cancelButtonName}</button>
                </div>
            ];
        } else {
            return <p>{this.message}</p>;
        }
    }

    renderTime() {
        if (this.editTime) {
            return [
                <span class="time">{this.createdLabelNameProducer(this.time)}</span>,
                <span class="time">{this.editedLabelNameProducer(this.time)}</span>
            ]
        }
        else {
            return <span class="time">{this.time}</span>;
        }
    }

    render() {
        return (
            <div class="box">
                {!this.isEditing && <div class="toolbox">
                    {this.editable && <button class="small-btn" onClick={this.editOnClick.bind(this)}>{this.editButtonName}</button>}
                    {this.deletable && <button class="small-btn" onClick={this.deleteOnClick.bind(this)}>{this.deleteButtonName}</button>}
                </div>}
                <h2>{this.username}</h2>
                {this.renderBody()}
                {this.renderTime()}
            </div>
        );
    }
}
