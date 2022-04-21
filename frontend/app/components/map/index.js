import './style.pcss';
import Collection from "../../js/Collection";
import {getJS} from "../../js/utils/getJS";
import {getConfig} from "../../js/utils/getConfig";
export class Map {
    constructor(instance) {
        this.instance = instance
        this.cluster = null
        this.map = null
        this.cfg = getConfig(this.instance, MapsCollection.instance)
        this.bindEvents()
        console.log(this.cfg)
    }

    init() {

        const HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='map__hintlayout'>" +
            "<b>{{properties.hintTitle}}</b><br/>" +
            "{{properties.hintSubtitle}}" +
            "</div>")
        this.map = new ymaps.Map(this.instance,this.cfg,{suppressMapOpenBlock: true})
        this.cluster = new ymaps.Clusterer({clusterDisableClickZoom: true})
        this.cluster.add(this.getPoints())
        this.map.geoObjects.add(this.cluster)
        console.log(this.cluster)

    }
    getPoints () {

        return this.cfg.points.map(({coords,properties,options}) => new ymaps.Placemark(coords, properties, options))

    }
    bindEvents(){
        window.ymaps.ready(() => this.init())
    }

}

export default class MapsCollection extends Collection{
    static instance = '[data-js-map]'
    constructor() {
        super();
        this.load()

    }
    static urlAPI = "https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU"
    init() {
        document.querySelectorAll(MapsCollection.instance).forEach( el => {
            this.collection = new Map(el)
        })
    }
    load() {
        if (typeof window.ymaps === 'function') {
            this.init()
        } else {
            getJS({src: MapsCollection.urlAPI}).then(res => this.init(), err => console.debug(err))
        }
    }
}
