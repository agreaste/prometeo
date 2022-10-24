import './../styles/global.css';
import '../media/studio-ghibli-film-netflix-3.jpeg'
import '../media/GhibliLogo.png'
import '../media/al.jpeg'
import '../media/castle-sky.jpeg'
import '../media/howl-castle.jpg'
import '../media/only-yesterday.webp'
import '../media/nausicaa.png'

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faApple, faWindows, faUbuntu, faReact, faVuejs, faSquareJs } from '@fortawesome/free-brands-svg-icons';
import { faCircleNotch, faEye, faExclamationTriangle, faPlus, faEquals, faMoon, faLink, faPause, faPlay, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

library.add(faApple);
library.add(faWindows);
library.add(faUbuntu);
library.add(faCircleNotch);
library.add(faEye);
library.add(faReact);
library.add(faVuejs);
library.add(faSquareJs);
library.add(faExclamationTriangle);
library.add(faPlus);
library.add(faEquals);
library.add(faMoon);
library.add(faLink);

// carousel
library.add(faPause);
library.add(faPlay);
library.add(faChevronLeft);
library.add(faChevronRight);

dom.watch();