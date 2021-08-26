import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import users from "./modules/users";
import messages from "./modules/messages";
import settings from "./modules/settings";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth,
    user,
    users,
    messages,
    settings
  },
  strict: debug
});
