import Swiper,{Navigation} from "swiper";
import "swiper/css/bundle"
import Collection from "./Collection"
Swiper.use([Navigation])
export class Slider{
    constructor(instance,options) {
        this.instance = instance
        this.params = options
        this.swiper = null
        this.init()

    }

    init(){
       this.swiper =  new Swiper(this.instance,this.params)
    }
}

export default class SlidersCollection extends Collection {
    defoultCfg ={
        speed: 400
    }
    sliders = [
        {
            selector: '.slider-hero',
            option:{
                slidesPerView: 1,
                navigation: {
                    nextEl: '.custom-button-next',
                    prevEl: '.custom-button-prev',
                }
            }
        }
    ]

    constructor() {
        super();
        this.init()
    }
    init(){
        this.sliders.forEach(slider => {
            const sliderDOMEl = document.querySelectorAll(slider.selector)
            sliderDOMEl.forEach(el => {
                this.collection = new Slider(el, {...this.defoultCfg,...slider.option})
            })

        })
    }
}