import React from "react";
import styles from "@react-styles/app.module.css";
import menuStyles from "@react-styles/components/menu.module.css";
import menubarStyles from "@react-styles/components/menubar.module.css";
import {Menubar, Menu} from "nyx-react";

function App() {
    const {
        navbar__wrapper,
        heroBanner__wrapper,
        heroBanner__container,
        heroBanner__content,
        heroBanner__section,
        heroBanner__title} = styles;
    const {menu__wrapper: wrapper, menu__trigger: trigger, menu__container: container, menu__item: item, 'menu__item--active': activeItem} = menuStyles;
    const {menubar__wrapper, menubar__container, menubar__item} = menubarStyles;

    const menuStyle = {
        wrapper,
        trigger,
        container,
        item,
        activeItem
    };

    const menubarStyle = {
        wrapper: menubar__wrapper,
        container: menubar__container,
        item: menubar__item,
    }

    return (
        <>
            <nav className={navbar__wrapper}>
                <Menubar styles={menubarStyle}>
                    <Menu cta={"test"} styles={menuStyle}>
                        <a href="/">Home</a>
                        <a href="#pluto">pluto</a>
                    </Menu>
                    <a href="/">home</a>
                </Menubar>
            </nav>
            <header className={heroBanner__wrapper}>
                <div className={heroBanner__container}>
                    <div className={heroBanner__content}>
                        <section
                            id="head-content"
                            className={heroBanner__section}>
                            <h1 className={heroBanner__title}>Aria in React</h1>
                            <p className="mb-2">Con <em>Accessible Rich Internet Applications</em> si intendono un
                                insieme di ruoli e
                                attributi che definiscono meccanismi per rendere contenuti web e applicazioni web più
                                accessibili a
                                utenti con disabilità.</p>
                            <p className="mb-4">Vediamo qualche esempio di pattern ARIA implementati in React.js</p>
                            <div>
                            </div>
                        </section>
                    </div>
                </div>
            </header>
            <main>
                <p id={"pluto"}></p>
                <p id={"pippo"}></p>
            </main>
        </>)
}

export default App;