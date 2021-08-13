const { response, request } = require('express')
const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const requests = []

app.get('/orderClient', (request, response) => {

    return response.json(requests)
})

app.post('/orderClient', (request, response) => {
    const { order, clientName, price, status } = request.body

    const client = { id: uuid.v4(), order, clientName, price, status }

    requests.push(client)

    return response.status(201).json(client)
})

app.put('/orderClient/:id', (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body

    const updateRequest = { id, order, clientName, price, status }

    const index = requests.findIndex(requests => requests.id === id)

    if (index < 0) {
        return response.status(404).json({ menssage: "Request not found" })
    }

    requests[index] = updateRequest

    console.log(updateRequest)

    return response.json(updateRequest)
})

app.delete('/orderClient/:id', (request, response) => {
    const { id } = request.params

    const index = requests.findIndex(requests => requests.id === id)

    if (index < 0) {
        return response.status(404).json({ menssage: "Request not found" })
    }

    requests.splice(index, 1)

    return response.status(204).json()
})

app.patch('/orderClient/:id', (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body

    const orderUpdateStatus = { id, order, clientName, price, status }

    const index = requests.findIndex(requests => requests.id === id)
    
    if(index < 0){
        return response.status(404).json({ menssage: "Request not found" })
    }

    requests[index] = orderUpdateStatus

    console.log(response)

    return response.json(orderUpdateStatus)
})

app.listen(port, () => {
    console.log(`🍔 Server started on port ${port}`)
})