import Styles from '@/styles/Addproducts.module.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/lib/firebase"
import { useState } from 'react'
import axios from 'axios';

const Addproducts = () => {
  const [imagesarr, setimagesarr] = useState()
  const [name, setname] = useState()
  const [description, setdescription] = useState()
  const [imageurl, setimageurl] = useState()
  const [Price, setPrice] = useState()
  const [flavor, setSelectedOption] = useState('');

  function changes(e) {
    const file = e.target.files[0]

    const storage = getStorage(app);
    const storageRef = ref(storage, `img/${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setimagesarr(downloadURL);
        setimageurl(downloadURL)
      });
    });
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  async function senddata() {
    var data = { Productname: name, description, imageurl, Price, flavor }
    var resp = await axios.post("/api/products", data);
    console.log(resp.data)
    setname("")
    setdescription("")
    setimageurl("")
    setPrice("")
    setimagesarr("")
  }

  return (
    <div>
      <div className={Styles.addname}>
        Add new products
      </div>
      <div className={Styles.addinp}>
        <label> Product name</label>
        <input type='text' value={name} onChange={(ev) => setname(ev.target.value)}></input>
        <label> Description</label>
        <input type='text' value={description} onChange={(ev) => setdescription(ev.target.value)}></input>
        <label>Photos</label>
        <div className={Styles.upbox}>
          {imagesarr && <img src={imageurl} className={Styles.imgu} />}


          <label className={Styles.addb}>
            <input type='file' className={Styles.hide} onChange={changes} />
            <img src="file.png" className={Styles.file}></img>
            <div>Upload</div>
          </label>
        </div>
        <div className={Styles.photo}>{!imagesarr && "No photos to show"}</div>
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
      <button className={Styles.btnadd} onClick={senddata}>Add button</button>
    </div >
  )
}

export default Addproducts