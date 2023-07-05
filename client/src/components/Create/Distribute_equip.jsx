import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from '../styles/Select_equip.module.css'
import Header from '../Header'
import Footer from '../Footer'

function Distribute_equip() {
    const location = useLocation()
    const [Equips, SetEquips] = useState(location.state)
    return (
        <>
            <Header />
            <main className={styles.Home}>
                <div>Distribute_equip</div>
                {console.log(Equips)}
            </main>
            <Footer />
        </>
    )
}

export default Distribute_equip