import { Component, Event, Prop, h, EventEmitter, Listen } from "@stencil/core";
import { IMessageItem } from "./IMessageItem";

@Component({
  tag: "pwc-chat",
  styleUrl: "../styles.scss",
  shadow: false
})
export class Chat {
  textInputRef: HTMLInputElement;

  @Prop() fullMessage: string = null;
  @Prop() messageList: IMessageItem[] = [];
  @Prop() inputValue: any = "";
  @Prop() listContainerId: string = "list-container-id";

  @Prop() submitButtonName: string = "Send";
  @Prop() submitButtonPlaceholder: string = "You can write your message in here...";
  @Prop() editButtonName: string = "Edit";
  @Prop() deleteButtonName: string = "Delete";
  @Prop() saveButtonName: string = "Save";
  @Prop() cancelButtonName: string = "Cancel";
  @Prop() createdLabelNameProducer: (createdDate: string) => string = (date) => `Created ${date}`;
  @Prop() editedLabelNameProducer: (editedDate: string) => string = (date) => `Edited ${date}`;

  /**
   * onChange method for text input
   */
  @Event({
    eventName: "changeMessage",
    bubbles: true,
    composed: true,
    cancelable: true
  })
  onChangeTextEmitter: EventEmitter;

  onChangeHandler(text: string) {
    this.fullMessage = text;
    this.onChangeTextEmitter.emit({ text });
  }

  /**
   * onSubmit method for text input
   */
  @Event({
    eventName: "submitMessage",
    bubbles: true,
    composed: true,
    cancelable: true
  })
  onSubmitEmitter: EventEmitter;

  onSubmitHandler() {
    this.onSubmitEmitter.emit({ fullMessage: this.fullMessage });
    this.inputValue = "";
    this.fullMessage = "";
    this.textInputRef.value = null;
  }

  renderMessageList = () => {
    return this.messageList.map(item => {
      return (
        <pwc-chat-item
          {...item}
          editButtonName={this.editButtonName}
          deleteButtonName={this.deleteButtonName}
          saveButtonName={this.saveButtonName}
          cancelButtonName={this.cancelButtonName}
          createdLabelNameProducer={this.createdLabelNameProducer}
          editedLabelNameProducer={this.editedLabelNameProducer}
        ></pwc-chat-item>
      );
    });
  };

  renderSubmitButton = () => {
    return (
      <div class="input">
        <div class="input-container">
          <input
            type="text"
            class="input-field"
            value={this.inputValue}
            placeholder={this.submitButtonPlaceholder}
            ref={el => (this.textInputRef = el as HTMLInputElement)}
            onInput={() => this.onChangeHandler(this.textInputRef.value)}
          />
          <div class="input-field-shadow"></div>
        </div>
        <div class="submit-container">
          <button class="submit-btn" onClick={() => this.onSubmitHandler()}>
            {this.submitButtonName}
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div class="container">
        <div id={this.listContainerId} class="list-container">
          {this.renderMessageList()}
        </div>
        {this.renderSubmitButton()}
      </div>
    );
  }
}
