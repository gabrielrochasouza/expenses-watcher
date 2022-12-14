import axios from 'axios'

const api = axios.create({
    baseURL:"https://dadosabertos.camara.leg.br/api/v2/"
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
//despesas/?pagina=1&ano=2022&itens=100&ordenarPor=valorDocumento&ordem=Desc