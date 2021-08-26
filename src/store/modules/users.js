import { apiCall, api_routes } from "@/utils/api";

const state = { users: [] };

const getters = {
    users: state => state.users,
};

const actions = {
    fetchUsers: ({ commit, dispatch }) => {
        commit('fetchUsers');
        apiCall({ url: 'http://local.tdd.com/api/users' })
            .then(resp => {
                commit('usersSuccess', resp);
            })
            .catch(err => {
                console.log(err);
            });
    }
};

const mutations = {
    fetchUsers: (state, resp) => {
        state.users = [];
    },
    usersSuccess: (state, resp) => {
        state.users = resp;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
