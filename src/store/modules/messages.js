import { apiCall, api_routes } from "@/utils/api";

const state = { chatroom: {}, chatrooms: [] };

const getters = {
    chatroom: state => state.chatroom,
    chatrooms: state => state.chatrooms,
};
const io = require('socket.io-client')
const socket = io('http://local.tdd.com:8000', { transports : ['websocket']});
const actions = {
    submitMessage: ({ commit, dispatch }, {chatroomId, message} ) => {
        apiCall({ url: 'http://local.tdd.com/api/messages/create-message/' + chatroomId, method: 'POST', data: { message } }, )
    },
    getChatrooms :({commit, dispatch}) => {
        apiCall({ url: 'http://local.tdd.com/api/messages/chatrooms', method: 'GET' }).then((res) => {
            res.forEach((el) => {
                commit('addChatroom', el)
                socket.on('chatroom-message-' + el.id, function(data) {
                    commit('addMessageToChatroom', {data, chatroom_id: el.id})
                });
            })
            commit('setChatrooms', res);
        })
    },
    addMessageToChatroom: ({ commit, dispatch}, data ) => {
        commit('addMessageToChatroom', data)
    },
    startChat: ({ commit, dispatch }, user_id) => {

        apiCall({url: 'http://local.tdd.com/api/messages/create-chatroom', method: 'POST', data: { user_id }})
            .then(function(response) {
                commit('addChatroom', response)
                socket.on('chatroom-message-' + response.id, function(data) {
                    console.log(data);
                });
            });
    }
};

const mutations = {
    fetchMessages: (state, resp) => {
        state.chatroom = {};
    },
    messagesSuccess: (state, resp) => {
        state.chatroom = resp;
    },
    addMessageToChatroom: (state, data) => {
        const chatrooms = [...state.chatrooms];
        const index = chatrooms.map(el => el.id).indexOf(data.chatroom_id);
        const oldMessages = chatrooms[index].messages || [];
        chatrooms[index].messages = [...oldMessages, data.data.data.message];
        state.chatrooms = chatrooms;
    },
    addChatroom: (state, resp) => {
        const chatrooms = state.chatrooms;
        chatrooms.push(resp);
        state.chatrooms = chatrooms;
    },
    setChatrooms: (state, resp) => {
        state.chatrooms = resp;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
