import { Component, Event, Prop, h, EventEmitter } from "@stencil/core";

@Component({
  tag: "pwc-chat",
  styleUrl: "pwc-chat.scss",
  shadow: false
})
export class Chat {
  textInputRef: HTMLInputElement;

  @Prop() submitButtonName: string = "Send";
  @Prop() submitButtonPlaceholder: string =
    "You can write your message in here...";
  @Prop() fullMessage: string = null;
  @Prop() messageList: any = [];
  /**
   * onChange method for text input
   */
  @Event({
    eventName: "onChangeMessage",
    bubbles: true,
    composed: true,
    cancelable: true
  })
  onChangeTextEmitter: EventEmitter;

  /**
   *
   * @param text
   */
  onChangeHandler(text: string) {
    this.fullMessage = text;
    this.onChangeTextEmitter.emit({ text });
  }

  /**
   * onSubmit method for text input
   */
  @Event({
    eventName: "onSubmitMessage",
    bubbles: true,
    composed: true,
    cancelable: true
  })
  onSubmitEmitter: EventEmitter;

  /**
   * @param text
   */
  onSubmitHandler() {
    this.onSubmitEmitter.emit({ fullMessage: this.fullMessage });
  }

  renderMessageList = () => {
    return this.messageList.map(item => {
      const {
        username = "Mia Garcia",
        message = "Etiam ultrices ullamcorper mauris, a ultrices urna varius vitae. Nullam non aliquet magna."
      } = item;
      return (
        <div class="box">
          <h2>{username}</h2>
          <p>{message}</p>
          <span class="time">3 hours ago</span>
        </div>
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
        <div class="list-container">{this.renderMessageList()}</div>
        {this.renderSubmitButton()}
      </div>
    );
  }
}
