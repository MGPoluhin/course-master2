

// Load icons
const requireAll = (r) => r.keys().forEach(r)
requireAll(require.context('./icons', true, /\.svg$/))
import svg4everybody from 'svg4everybody'
import SvgUse from './js/svgUse'
import "./styles/icons.pcss"

import "./styles"

// Load components
import "./components/button"
import "./components/header"
import "./components/timer"
import "./components/input"
import "./components/footer"
import "./components/news-card"
import "./components/event-card"
import "./components/checkbox"
import "./components/logo"
import "./components/_example"
import "./components/dropdown"


import MobileMenu from '../app/js/MobileMenu';
import BurgerButton from '../app/js/burgerButton';
import Modals from '../app/js/modals';
import TimerCollection from "./components/timer";
import SlidersCollection from "./js/sliders";
import Forms from "./js/forms/index"
import MapsCollection from "./components/map";
window.App = {
  debug: !!window.location.port,

}

window.svg4everybody = svg4everybody

document.addEventListener('DOMContentLoaded', () => {
  new SvgUse()

  App.Modals = new Modals()
  App.Sliders = new SlidersCollection()
  App.BurgerButton = new BurgerButton()
  App.MobileMenu = new MobileMenu()
  App.Forms = new Forms()

  App.MapsCollection = new MapsCollection()
  App.TimerCollection = new TimerCollection()

})