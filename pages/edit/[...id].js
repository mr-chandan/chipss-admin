import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { app } from "@/lib/firebase"
import Styles from "@/styles/Addproducts.module.css"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Edit = () => {
    const [resdata, setresdata] = useState("")
    const router = useRouter();
    const { id } = router.query;

    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [imageurl, setimageurl] = useState("")
    const [Price, setPrice] = useState("")
    const [flavor, setflavor] = useState("")

    useEffect(() => {
        gets()
    }, [])

    async function gets() {
        axios.get('/api/edit?id=' + id)
            .then((response) => {
                setresdata(response.data);
                setname(response.data?.Productname);
                setPrice(response.data?.Price);
                setimageurl(response.data?.imageurl);
                setdescription(response.data?.description);
                setflavor(response.data?.flavor);
            })
    }

    function changes(e) {
        const file = e.target.files[0]
        const storage = getStorage(app);
        const storageRef = ref(storage, `img/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setimageurl(downloadURL)
            });
        });
    }
    const handleOptionChange = (event) => {
        setflavor(event.target.value);
    };
    async function senddata() {
        var data = { Productname: name, description, imageurl, Price, _id: resdata._id, flavor }
        axios.post('/api/edit', data)
            .then((resp) => {
                if (resp.status === 200) {
                    console.log('Edit request successful');
                    router.push('/');
                } else {
                    console.log('Edit request failed.');
                }
            })
            .catch((error) => {
                console.error('Edit request error:', error);
            });
    }




    return (
        <div className={Styles.maingrid}>
            <div className={Styles.addname}>
                Edit product {resdata?.Productname}
            </div>
            <div className={Styles.addinp}>
                <label> Product name</label>
                <input type='text' value={name} onChange={(ev) => setname(ev.target.value)}></input>
                <label> Description</label>
                <input type='text' value={description} onChange={(ev) => setdescription(ev.target.value)}></input>
                <label>Photos</label>
                <div className={Styles.upbox}>
                    {imageurl && <img src={imageurl} className={Styles.imgu} />}


                    <label className={Styles.addb}>
                        <input type='file' className={Styles.hide} onChange={changes} />
                        <img src="file.png" className={Styles.file}></img>
                        <div>Upload</div>
                    </label>
                </div>
                <div className={Styles.photo}>{!imageurl && "No photos to show"}</div>
                <label> Price</label>
                <input type='text' value={Price} onChange={(ev) => setPrice(ev.target.value)}></input>
                <div className={Styles.fix}>
                    <select className={Styles.sel} value={flavor} onChange={handleOptionChange}>
                        <option value="">Select an option</option>
                        <option value="Salt">Salt</option>
                        <option value="Peeper">Peeper</option>
                        <option value="S&P">S&P</option>
                    </select>
                    <p>Selected Option: {flavor}</p>
                </div>
            </div>
            <button className={Styles.btnadd} onClick={senddata}>Save changes</button>
        </div >

    )
}

export default Edit