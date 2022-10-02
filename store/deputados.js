import apiService from '../services/index'

export const state = (state) => ({
  politicians: [],
  politicianInfo: {},
  expenses: [],
})

export const mutations = {
  SET_POLITICIANS(state, value) {
    state.politicians = value
  },
  SET_POLITICIAN(state, value) {
    state.politicianInfo = value
  },
  SET_EXPENSES(state, value) {
    state.expenses = value
  },
  SET_EXPENSES_ACC(state, value) {
    state.expenses = [...state.expenses, ...value]
  },
}

export const actions = {
  setPoliticians({ commit, state }) {
    if (state.politicians.length) {
      return
    }
    return apiService.getDeputados().then((res) => {
      commit('SET_POLITICIANS', res.data.dados)
    })
  },
  setPolitician({ commit, state }, id) {
    return apiService.searchDeputado(id).then((res) => {
      commit('SET_POLITICIAN', res.data.dados)
    })
  },
  setExpenses({ commit }, { id, pagina, ano }) {
    return apiService.getExpenses({ id, pagina, ano }).then((res) => {
      commit('SET_EXPENSES', res.data.dados)
      return res
    })
  },
  setExpensesAcc({ commit }, { id, pagina, ano }) {
    return apiService.getExpenses({ id, pagina, ano }).then((res) => {
      commit('SET_EXPENSES_ACC', res.data.dados)
      return res
    })
  },
}
