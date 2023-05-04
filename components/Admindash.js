import Styles from "@/styles/Admindash.module.css"
import { useState } from "react"

const Admindash = () => {
    const [open, setopen] = useState(false)
    return (
        <div className={Styles.grid}>
            <div className={`${Styles.grid1} ${open && Styles.mobile}`}>
                <div className={Styles.name}>
                    <img src="chips.png" className={Styles.chips} />
                    <div>My chips</div>
                    <img src="wrong.png" className={Styles.wrong} onClick={() => setopen(!open)} />
                </div>
                <div className={Styles.btns}>
                    <div>
                        <img src="dashboard.png" className={Styles.navimg} />
                    </div>
                    <div>Dashboard</div>
                </div>
                <div className={Styles.btns}>
                    <div>
                        <img src="box.png" className={Styles.navimg} />
                    </div>
                    <div> view products</div>
                </div>
                <div className={Styles.btns}>
                    <div>
                        <img src="add-product.png" className={Styles.navimg} />
                    </div>
                    <div>   Add products</div>
                </div>
                <div className={Styles.btns}>
                    <div>
                        <img src="remove-from-cart.png" className={Styles.navimg} />
                    </div>
                    <div>   Add products</div>
                </div>
                <div className={Styles.btns}>
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
                </div>
            </div>
        </div>
    )
}

export default Admindash