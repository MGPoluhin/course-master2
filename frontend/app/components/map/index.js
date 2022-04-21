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

    }

    init() {


        const HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='map__hintlayout'>" +
            "<div class='map__hintlayout-title'>{{properties.hintTitle}}</div>" +
            "<div class='map__hintlayout-content'>{{properties.hintSubtitle}}</div>" +
            "</div>")
        ymaps.layout.storage.add('my#hintLayout', HintLayout);

        this.map = new ymaps.Map(this.instance,this.cfg,{suppressMapOpenBlock: true})
        this.cluster = new ymaps.Clusterer({clusterDisableClickZoom: true})
        this.cluster.add(this.getPoints())
        this.cluster.events
            .add('mouseenter', function (e){
                e.get('target').options.set({iconImageSize: [42, 50], iconImageOffset: [-21, -50]});
            })
            .add('mouseleave', function (e){
                e.get('target').options.set({iconImageSize: [32, 37], iconImageOffset: [-16, -37]});
            });
        console.log(this.cluster)
        this.map.geoObjects.add(this.cluster)


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
