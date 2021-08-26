<template>
  <div>
    <div class="flex-wrapper">
      <div class="chatroom" v-for="chatroom in messages.chatrooms" :key="chatroom.id">
        <input @keypress.enter="(e) => submitMessage(e, chatroom.id)">
        <ul v-if="chatroom.messages">
          <li v-for="message in chatroom.messages" :key="message">
            {{message}}
          </li>
        </ul>
      </div>
    </div>

    <div class="chat-wrapper">
      <Chat />
    </div>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/actions/auth.js";
import Chat from '../../components/chat';
const io = require('socket.io-client')
const socket = io('http://local.tdd.com:8000', { transports : ['websocket']});
import {mapState} from 'vuex';
export default {
  components: { Chat },
  name: "Home",
  data: function() {
    return {
      message: '',
    }
  },
  created() {
    this.$store.dispatch('getChatrooms');
    socket.on('main-channel', function(data) {
      console.log(data);
    })
  },
  computed: {
    ...mapState(['messages'])
  },
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    },
    submitMessage: function(e, chatroomId) {
      this.$store.dispatch('submitMessage', { chatroomId, message: e.target.value});
    }
  }
};
</script>

<style scoped lang="scss">
.flex-wrapper {
  display: flex;
}
.chatroom {
  width: 200px;
  height: 400px;
  background: #b0afaf;
}
.chatroom input {
  width: 100%;
  padding: 3px;
  border: 0;
  outline: 0;
}
</style>
