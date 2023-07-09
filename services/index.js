import axios from 'axios'

const api = axios.create({
    baseURL:"https://expenses-watcher-api.onrender.com/"
})

export default {
    getDeputados() {
        return api.get("deputados")
    },
    searchDeputado(id) {
        return api.get("deputados/" + id)
    },
    getExpenses({id, pagina, ano}) {
        return api.get(`deputados/${id}/despesas/?pagina=${pagina}&ano=${ano}&itens=100&ordenarPor=mes&ordem=Desc`)
    }
}

