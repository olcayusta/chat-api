import app from './app'
import WebSocket from 'ws'
import {parse} from 'url'
import {Message} from './models/message.model'
import {messageService} from './services/message.service'

const server = app.listen('9001', args => {
    console.log(`Uygulama 9001 portu üzerinden çalışıyor...`)
})

const wss1 = new WebSocket.Server({ noServer: true })

wss1.on('connection', (ws) => {
    console.log('Wss 1 sunucusuna baglanildi.')
    ws.on('message', (data: string) => {
        const extractData: Message = JSON.parse(data)
        console.log(extractData)
        messageService.saveMessage(extractData.content)
    })
});

server.on('upgrade', (request, socket, head) => {
    const pathname = parse(request.url).pathname

    if (pathname === '/') {
        wss1.handleUpgrade(request, socket, head, (ws) => {
            wss1.emit('connection', ws, request)
        })
    } else {
        socket.destroy()
    }
});

export default server
