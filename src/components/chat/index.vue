<template>
  <div class="chat-bar">
    <button v-on:click="doStuff">
      Show users
    </button>
    <ul class="chat-users" v-show="chatVisible">
      <li v-for="user in users.users" :key="user.id" @click="createChat(user.id)">
        {{user.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "Chat",
  data: function() {
    return {
      chatVisible: false,
    }
  },
  created: function() {
    this.$store.dispatch('fetchUsers');
  },
  methods: {
    doStuff: function() {
      this.chatVisible = !this.chatVisible;
    },
    createChat: function(userId) {
      this.$store.dispatch('startChat', userId);
    }
  },
  computed: {
    ...mapState(['users']),
  }
}
</script>

<style scoped lang="scss">
  .chat-bar {
    background: #4698dc;
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    button {
      background: transparent;
      border: 0px;
      color: #fff;
      cursor: pointer;
    }
  }
  .chat-users {
    bottom: 17px;
    position: absolute;
    width: 200px;
    height: 300px;
    background: #4698dc;
    padding: 10px;
    li {
      list-style: none;
    }
  }
</style>