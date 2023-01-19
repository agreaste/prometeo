import React, {useReducer} from "react";
import heroBannerStyles from "react-styles/app.module.css";
import menuStyles from "react-styles/components/menu.module.css";
import accordionStyles from "react-styles/components/accordion.module.css";
import menuBarStyles from "react-styles/components/menubar.module.css";
import carouselStyles from "../../styles/react/components/carousel.module.css";
import {Menu, Menubar, Accordion, AccordionPanel, ListBox, RadioGroup, Carousel, Slide} from "nyx-react";

import totoro from "../../media/studio-ghibli-film-netflix-3.jpeg";
import castleSky from "../../media/castle-sky.jpeg";

const initialState = {
    radioValue: null,
    listValue: null,
    play: false,
};

const reducer = (state, {type, value}) => {
    switch (type) {
        case "changeRadio":
            return {
                ...state,
                radioValue: value
            };
        case "changeList":
            return {
                ...state,
                listValue: value
            };
        case "play":
            return {
                ...state,
                play: true,
            };
        case "stop":
            return {
                ...state,
                play: false,
            };
    }
};

function App() {
    const {
        heroBanner__container,
        heroBanner__content,
        heroBanner__section,
        heroBanner__title,
        heroBanner__wrapper,
        navbar__wrapper
    } = heroBannerStyles;

    const {
        carousel_wrapper,
        carousel_button,
        carousel_buttonControl,
        carousel_buttonNext,
        carousel_buttonPrevious,
        carousel_slide,
        carousel_slideWrapper
    } = carouselStyles;
    const {menu__wrapper, menu__container, menu__item} = menuStyles;
    const {accordion__wrapper, accordion__heading, accordion__panel} = accordionStyles;
    const {menubar__wrapper, menubar__container, menubar__item} = menuBarStyles;

    const menuStyle = {
        wrapper: [menu__wrapper, menubar__item].join(" "),
        trigger: menubar__item, //
        container: menu__container,
        item: menu__item
    };

    const menubarStyle = {
        wrapper: menubar__wrapper,
        container: menubar__container,
        item: menubar__item,
    };

    const [{play}, dispatch] = useReducer(reducer, initialState);

    const playCallback = () => {
        if (play) dispatch({type: "stop"});
        else dispatch({type: "play"});
    };

    const slides = [
        {
            img: totoro,
            alt: "Tutti i personaggi principali de 'Il mio vicino Totoro' in una delle scene del film",
            title: "Il mio vicino Totoro",
            text: "Hayao Myazaki, 1988"
        },
        {
            img: castleSky,
            alt: "Una guardia robot della città di Laputa ricoperta di muschio, alcuni gatti selvatici le corrono sopra",
            title: "Il castello nel cielo",
            text: "Hayao Myazaki, 1986"
        }
    ];

    return (
        <>
            <nav className={navbar__wrapper}>
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
                <section className="mx-auto w-full p-8">
                    <h2>List-box example</h2>
                    <ListBox label={"test"} onChange={(arg) => dispatch({ type: "changeList", value: arg})} className={menu__wrapper}
                             listWrapClassName={menu__container} placeholder={"Seleziona un'opzione"}>
                        <ListBox.Button className={menu__item}/>
                        <ListBox.Option className={menu__item} value={1} aria-label={"Seleziona un'opzione"}>Seleziona
                            un&apos;opzione</ListBox.Option>
                        <ListBox.Option className={menu__item} value={1} aria-label={"Pluto"}>pluto</ListBox.Option>
                        <ListBox.Option className={menu__item} value={2} aria-label={"Pippo"}>pippo</ListBox.Option>
                        <ListBox.Option className={menu__item} value={2}
                                        aria-label={"Paperino"}>paperino</ListBox.Option>
                    </ListBox>
                </section>
                <section className="mx-auto w-full p-8">
                    <h2>Accordion example</h2>
                    <Accordion
                        styles={({wrapper: accordion__wrapper, heading: accordion__heading, panel: accordion__panel})}>
                        <AccordionPanel title={"Primo panel"}>
                            <p>Boh questo è il contenuto di un panel</p>
                            <button>Questo bottone può ricevere focus in effetti.</button>
                        </AccordionPanel>
                        <AccordionPanel title={"Secondo panel"}>
                            <p>Boh questo è il contenuto di un panel</p>
                        </AccordionPanel>
                    </Accordion>
                </section>
                <section>
                    <h2>Radio group example</h2>
                    <RadioGroup label={"Personaggio Disney preferito:"} onChange={(arg) => dispatch({ type: "changeRadio", value: arg})}>
                        <RadioGroup.Radio name={"pippo"} value={"pippo"}><p>Pippo</p></RadioGroup.Radio>
                        <RadioGroup.Radio name={"pluto"} value={"pluto"}><p>Pluto</p></RadioGroup.Radio>
                        <RadioGroup.Radio name={"paperino"} value={"paperino"}><p>Paperino</p></RadioGroup.Radio>
                    </RadioGroup>
                </section>
                <section>
                    <h2>Carousel section</h2>
                    <Carousel className={carousel_wrapper} playCallback={playCallback} initialAutoplay={play}
                              slideWrapperClass={carousel_slideWrapper}>
                        <Carousel.PlayButton aria-label={play ? "Interrompi presentazione" : "Avvia presentazione"}
                                             className={[carousel_button, carousel_buttonControl].join(" ")}>{play ? "stop" : "play"}</Carousel.PlayButton>
                        <Carousel.BackButton
                            className={[carousel_button, carousel_buttonPrevious].join(" ")}>indietro</Carousel.BackButton>
                        <Carousel.NextButton
                            className={[carousel_button, carousel_buttonNext].join(" ")}>avanti</Carousel.NextButton>
                        {
                            slides.flatMap(({img, alt, title, text}, i) => (<Slide key={i} className={carousel_slide}>
                                <img className="carousel_slide__image" src={img} alt={alt}/>
                                <div className="carousel_slide__content">
                                    <h3 className="carousel_slide__title">{title}</h3>
                                    <p>{text}</p>
                                </div>
                            </Slide>))
                        }
                    </Carousel>
                </section>
            </main>
        </>
    );
}

export default App;