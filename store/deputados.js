import apiService from '../services/index'

export const state = (state) => ({
  politicians: [],
  politicianInfo: {},
  expenses: [],
  historyRequests: [],
})

const eliminateRepetition = (value)=>{
  if(value.length){
    const orderedById = value.sort((a,b)=> a.id - b.id)
    const result = [orderedById[0]]
    for(let i=1; i<orderedById.length ;i++) {
      if(!result.some(r=>r.id==orderedById[i].id && r.ano==orderedById[i].ano)){
        result.push(orderedById[i])
      }
    }
    return result
  }
}


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
  SET_HISTORY_REQUESTS(state, value) {
    state.historyRequests = eliminateRepetition(state.historyRequests)
    state.historyRequests = eliminateRepetition(value)
    localStorage.setItem('@memory', JSON.stringify(eliminateRepetition(value)))
  },
  UPDATE_HISTORY(state, value) {
    state.historyRequests = eliminateRepetition(state.historyRequests)
    let req = state.historyRequests.find(
      (r) => r.id === value.id && r.ano === value.ano
    )
    let index = state.historyRequests.findIndex(
      (r) => r.id === value.id && r.ano === value.ano
    )
    state.historyRequests = [
      ...state.historyRequests.map((h, i) => (i == index ? value : h)),
    ]
    localStorage.setItem(
      '@memory',
      JSON.stringify([
        ...state.historyRequests.map((h, i) => (i == index ? value : h)),
      ])
    )
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
  setHistoryRequests({ commit }) {
    const memoryString = localStorage.getItem('@memory')
    if (memoryString) {
      const memory = JSON.parse(memoryString)
      commit('SET_HISTORY_REQUESTS', memory)
    }
  },
  setHistoryPayload({ commit, state }, payload) {
    if (
      !state.historyRequests.some(
        (h) => h.id == payload.id && h.ano == payload.ano
      )
    ) {
      commit('SET_HISTORY_REQUESTS', payload)
    } else {
      commit('UPDATE_HISTORY', payload)
    }
  },
  updateHistoryPayload({ commit }, payload) {
    commit('UPDATE_HISTORY', payload)
  },
}
