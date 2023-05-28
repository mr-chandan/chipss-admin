import { mongooseConnection } from '@/lib/mongos'
import { Products } from '@/models/products';


export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnection();


    if (method === "POST") {
        const { Productname, description, imageurl, Price,flavor } = req.body;
       console.log(flavor)
        const productdoc = await Products.create({
            Productname,
            description,
            imageurl,
            Price,
            flavor
        });
        res.json(productdoc);
    }

    if (method === "PUT") {
        res.json(await Products.find());
    }

    if (method === "DELETE") {
        const { _id } = req.query;
        await Products.deleteOne({ _id });
        res.json("ok");
    }


}
