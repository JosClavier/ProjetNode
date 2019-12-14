import { app } from './app';
import * as http from 'http';

import { MongoHelper } from './mongo.helper';
import { FunctionDB } from './functionDB';
let express = require("express")
const PORT = 1337;
const server = http.createServer(app);
server.listen(PORT);

import { MetricsHandler } from './metrics'
app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})

app.set('view engine','ejs')

app.use(express.static('public'))

app.get('/', (req :any,res: any) => {
	res.render('pages/home',{test: 'fc'})
})

app.get('/login',  (req : any ,res :any) => {
	res.render('pages/login',{test: 'fc'}) 
})

app.get('/signIn', (req : any,res : any) => {
	res.render('pages/signIn',{test: 'fc'})
})

app.get('/logged', (req: any,res :any) => {
	res.render('pages/logged',{test: 'fc'})
})

server.on('listening', async () => {
	console.info(`Listening on port ${PORT}`);
	try {
		
		await MongoHelper.connect('mongodb://localhost:27017');
		console.info('Connected to Mongo.');
		//await FunctionDB.post('josquin','clavier','josquin.clavier@edu.ece.fr',1234);
		//console.log("user add")
		//await FunctionDB.put('gatien.bancarel@edu.ece.fr','josquin','clavier','josquin.clavier@edu.ece.fr',1234)
		//console.log("user update")
		//await FunctionDB.delete('josquin.clavier@edu.ece.fr')
		//console.log("user delete")
		let a = await FunctionDB.get('josquin.clavier@edu.ece.fr');
		console.log(a)

	} catch (err) {
		console.log("okkkkkkk")
		console.error(err);
	}
});