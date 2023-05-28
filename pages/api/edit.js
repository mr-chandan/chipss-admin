import { mongooseConnection } from "@/lib/mongos";
import { Products } from "@/models/products";

export default async function products(req, res) {
    const { method } = req;
    await mongooseConnection();

    if (method === 'GET') {
        console.log(req.query?.id)
        if (req.query?.id) {
            console.log(req.query.id)
            res.json(await Products.findOne({ _id: req.query.id }));
        }
    }

    if (method == 'POST') {
        const { Productname, description, imageurl, Price,_id,flavor} = req.body
        res.json(await Products.updateOne({ _id }, { Productname, description, imageurl, Price,flavor}))
    }

}