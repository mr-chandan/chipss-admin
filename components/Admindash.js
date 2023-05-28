import Styles from "@/styles/Admindash.module.css"
import { useState } from "react"
import Dashboard from "./Dashboard"
import Addproducts from "./Addproducts"
import Orders from "./Orders"
import Viewproducts from "./Dashboard"
const Admindash = () => {
    const [open, setopen] = useState(false)
    const steps = {
        1: Dashboard,
        2: Addproducts,
        3: Orders
    };

    const [step, setStep] = useState(1);
    const Step = steps[step];

    return (
        <div className={Styles.grid}>
            <div className={`${Styles.grid1} ${open && Styles.mobile}`}>
                <div className={Styles.name}>
                    <img src="chips.png" className={Styles.chips} />
                    <div>My chips</div>
                    <img src="wrong.png" className={Styles.wrong} onClick={() => setopen(!open)} />
                </div>
                <div className={Styles.btns} onClick={() => { setStep(1); setopen(!open) }}>
                    <div>
                        <img src="dashboard.png" className={Styles.navimg} />
                    </div>
                    <div>Dashboard</div>
                </div>
                <div className={Styles.btns} onClick={() => { setStep(2); setopen(!open) }}>
                    <div>
                        <img src="add-product.png" className={Styles.navimg} />
                    </div>
                    <div>   Add products</div>
                </div>
                <div className={Styles.btns} onClick={() => { setStep(3); setopen(!open) }}>
                    <div>
                        <img src="cargo.png" className={Styles.navimg} />
                    </div>
                    <div>  Orders</div>
                </div>
            </div>
            <div className={`${Styles.grid2} ${open && Styles.mobile2}`}>
                <div className={Styles.hamdiv}>
                    <img src="ham.png" className={Styles.ham} onClick={() => setopen(!open)}></img>
                    <div className={Styles.grid2name}>
                        MY chip Dashboard<div className={Styles.name2}> Welcome, Chandan !</div>
                    </div>
                </div>
                <div className={Styles.card}>
                    <Step steps={steps} setStep={setStep} />
                </div>
            </div>
        </div>
    )
}

export default Admindash