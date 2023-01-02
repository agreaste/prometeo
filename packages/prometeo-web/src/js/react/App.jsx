import React from "react";
import {
    heroBannerContainer,
    heroBannerContent,
    heroBannerSection,
    heroBannerTitle,
    heroBannerWrapper,
    navbarWrapper
} from "react-styles/app.module.css";
import {menuWrapper, menuContainer, menuItem} from "react-styles/components/menu.module.css";
import {accordionWrapper, accordionHeading, accordionPanel} from "react-styles/components/accordion.module.css";
import {menubarWrapper, menubarContainer, menubarItem} from "react-styles/components/menubar.module.css";
import {Menubar, Menu, ListBox, Accordion, AccordionPanel} from "nyx-react";

function App() {
    const menuStyle = {
        wrapper: [menuWrapper, menubarItem].join(" "),
        trigger: menubarItem,
        container: menuContainer,
        item: menuItem
    };

    const menubarStyle = {
        wrapper: menubarWrapper,
        container: menubarContainer,
        item: menubarItem,
    };

    return (
        <>
            <nav className={navbarWrapper}>
                <Menubar styles={menubarStyle}>
                    <a href="/">WAW</a>
                    <a href="/flow.html">Contenuti di flusso</a>
                    <a href="/sectioning.html">Contenuti di sezionamento</a>
                    <a href="/phrasing.html">Contenuti di fraseggio</a>
                    <a href="/embedded.html">Contenuti integrati</a>
                    <Menu cta={"Interazione"} styles={menuStyle}>
                        <a href="/interactive.html">Elementi interattivi</a>
                        <a href="/keyboard_navigation.html">Navigazione da tastiera</a>
                        <a href="/aria.html">Pattern Aria in vanilla JS</a>
                        <a href="/react.html">Pattern Aria in React.js</a>
                    </Menu>
                </Menubar>
            </nav>
            <header className={heroBannerWrapper}>
                <div className={heroBannerContainer}>
                    <div className={heroBannerContent}>
                        <section
                            id="head-content"
                            className={heroBannerSection}>
                            <h1 className={heroBannerTitle}>Aria in React</h1>
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
                <div className="mx-auto w-full p-8">
                    <ListBox styles={({...menuStyle, label: ""})} name={"test"} options={[{label: "pippo", value: 1}, {label: "pluto", value: 2},]}/>
                </div>
                <div className="mx-auto w-full p-8">
                    <Accordion styles={({ wrapper: accordionWrapper, heading: accordionHeading, panel: accordionPanel})}>
                        <AccordionPanel title={"Primo panel"}>
                            <p>Boh questo è il contenuto di un panel</p>
                            <button>Questo bottone può ricevere focus in effetti.</button>
                        </AccordionPanel>
                        <AccordionPanel title={"Secondo panel"}>
                            <p>Boh questo è il contenuto di un panel</p>
                        </AccordionPanel>
                    </Accordion>
                </div>
            </main>
        </>);
}

export default App;