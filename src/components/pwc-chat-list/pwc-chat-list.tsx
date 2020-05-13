import { Component, Prop, h } from "@stencil/core";
import { format } from "../../utils/utils";

@Component({
  tag: "pwc-chat-list",
  styleUrl: "pwc-chat-list.scss",
  shadow: true
})
export class ChatList {
  render() {
    return (
      <div>
        <div class="header-container">
          <strong>Username</strong>
          <span class="time-style">3 hours ago</span>
        </div>
        <div>
          <div class="chat-bubble-container">
            <span>message - content</span>
          </div>
        </div>
      </div>
    );
  }
}
