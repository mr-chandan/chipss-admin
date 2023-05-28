import axios from "axios"
import { useEffect, useState } from "react"
import Styles from "@/styles/Viewproducts.module.css"
import { useRouter } from 'next/router';

const Viewproducts = ({ steps, setStep }) => {
  const router = useRouter();
  const [getdata, setdata] = useState()
  useEffect(() => {
    data()
  }, [getdata])


  function ch() {
    axios.put("/api/products").then((res) => {
      setdata(res.data)
    });
  }

  async function data() {
    var resp = await axios.put("/api/products");
    setdata(resp.data)
  }
  async function deleteprod(category) {
    if (confirm("Are you sure you want to delete this?")) {
      console.log(category)
      var getres = await axios.delete("/api/products?_id=" + category);
      console.log(getres)
      ch()
    }
  }

  function red(id) {
    router.push(`/edit/${id}`)
  }

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  return (
    <div className={Styles.maindiv}>
      <div onClick={() => handleStepChange(2)} className={Styles.goto}>Add Products</div>
      <div className={Styles.pgname}> Products</div>
      <div className={Styles.boxcon}>
        {getdata && getdata.map(element => (
          <div className={Styles.box} key={element._id}>
            <div className={Styles.box1}>
              <img src={element.imageurl} alt={element.Productname} />
            </div>
            <div className={Styles.box2}>
              <div>{element.Productname}</div>
              <div>Price: {element.Price}</div>
            </div>
            <div className={Styles.box3} onClick={() => deleteprod(element._id)}>

              <div className={Styles.btw}>
                <img src="delete.png" className={Styles.imp}></img>
                Delete
              </div>

            </div>
            <div className={Styles.box3} onClick={() => red(element._id)}>
              <div className={Styles.btw}>
                <img src="edit.png" className={Styles.imp}></img>
                Edit
              </div>
            </div>
          </div>

        ))}

      </div>
    </div>
  )
}

export default Viewproducts