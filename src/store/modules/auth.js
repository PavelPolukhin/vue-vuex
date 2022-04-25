import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};
export const mutationTypes = {
  authStart: '[auth] authStart',
  authSuccess: '[auth] authSuccess',
  authFailure: '[auth] authFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
};
export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
};
const getters = {
  currentUser: (state) => {
    return state.currentUser;
  },
  isLoggedIn: (state) => {
    return Boolean(state.isLoggedIn);
  },
  isAnonymous: (state) => {
    return state.isLoggedIn === false;
  },
};
const mutations = {
  [mutationTypes.authStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.authSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.authFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};
const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.authStart);
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.authSuccess, response.data.user);
          setItem('jwtToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.authFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.authStart);
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.authSuccess, response.data.user);
          setItem('jwtToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.authFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          );
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
