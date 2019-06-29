import * as express from 'express'
import * as bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

app.post('/test', (req: express.Request, res: express.Response) => {

})

app.listen(8888, () => {
  console.log('server started on port 8888')
})