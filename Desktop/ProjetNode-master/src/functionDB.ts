import * as express from 'express';


import { MongoHelper } from './mongo.helper';

const todoRoutes = express.Router();

const getCollection = () => {
	return MongoHelper.client.db('ProjetNodejs').collection('users');
}

export class FunctionDB {

	public static post(firstname: string, lastname: string, email:string, password: number) {
	    const collection = getCollection();
        return new Promise((resolve, reject) => {
            collection.insert({firstname: firstname, lastname: lastname, email: email}, (err) => {
                if (err) {
					reject(err);
				} else {
					resolve("ok");
				}
            });
		});
    }
    
    public static get(email: string){
        const collection = getCollection();
        return new Promise((resolve, reject) => {
            collection.find({email:email}).toArray((err, items) => {
                if (err) {
                    reject(err)
                } else {
                    items = items.map((item) => { return {id: item._id, firstname: item.firstname, lastname: item.lastname, email: item.email, password: item.password}});
                    console.log(items)
                    return items;
                }
            })
		});
    }

    public static put(condition: string, firstname: string, lastname: string, email: string, password: number){
        const collection = getCollection();
        return new Promise((resolve, reject) => {
            collection.findOneAndUpdate({"email": condition}, {$set: {firstname: firstname, lastname: lastname, email: email, password: password}}, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve("ok");
                }
            });
		});
    }

    public static delete(email: string){
        const collection = getCollection();
        return new Promise((resolve, reject) => {
            collection.remove({"email": email}, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve("ok");
                }
            });
		});
    }

}