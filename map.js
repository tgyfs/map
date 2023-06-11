svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1568 16.8823L16.9698 18.0562C16.0949 18.9149 14.9598 20.0188 13.5639 21.3684C12.6917 22.2118 11.3079 22.2117 10.4358 21.3682L6.94466 17.9723C6.5059 17.5415 6.13863 17.1782 5.84279 16.8823C2.44238 13.4819 2.44238 7.96878 5.84279 4.56837C9.2432 1.16796 14.7564 1.16796 18.1568 4.56837C21.5572 7.96878 21.5572 13.4819 18.1568 16.8823ZM14.5 11.0001C14.5 9.61924 13.3806 8.49986 11.9998 8.49986C10.619 8.49986 9.49958 9.61924 9.49958 11.0001C9.49958 12.3809 10.619 13.5003 11.9998 13.5003C13.3806 13.5003 14.5 12.3809 14.5 11.0001Z" fill="COLOR"/>
</svg>
`;
function mapView(root){
    this.root = root;

    zoom = parseInt( this.root.data("zoom") ) ;
    zoom= this.root.data("zoom")?this.root.data("zoom"):6;
    this.map = L.map(this.root.find(".ncf-mapcontainer").get(0),
        {maxBoundsViscosity:0.8}
    ).setView({lon: 0, lat: 0}, zoom).setMaxBounds([[-90,-180],   [90,180]] );
    
    
    this.markerList = [];
    this.selected = null;
      // add the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(this.map);
      // show the scale bar on the lower left corner
      L.control.scale({imperial: true, metric: true}).addTo(this.map);
    first = true;

    this.root.find(".ncf-map-item").each(function(i,o){
        const ident = $(o).find(".identifyer");
        const LeafIcon = L.icon({

                iconUrl: 'data:image/svg+xml;base64,' + btoa(svg.replace("COLOR",ident.data("color")||'#ff0000')),
                iconSize:     [30, 30],
                iconAnchor:   [15, 29],
                tooltipAnchor:  [12, -17],

        });

        const op = $(o);
        const marker = L.marker([ident.data("lat"),ident.data("lon")*1],{icon:LeafIcon});
        marker.setOpacity(0.8);
        marker.bindTooltip(ident.data("popup"))
        marker.addTo(this.map)
        this.markerList[ident.attr('id')]=marker;

        const enter = function(){
            this.hoverStart(op,ident);
        }.bind(this);
        const leave = function(){
            this.hoverEnd(op,ident);
        }.bind(this);
        const click = function(){
            this.clickItem(op,ident);
        }.bind(this);
        marker.on("mouseover",enter);
        marker.on("mouseout",leave);
        marker.on("click",click);
        op.mouseenter(enter);
        op.mouseleave(leave);
        op.on("click",click);
                if(first){
                 first = false;
                 this.map.setView(marker.getLatLng());
                }
    }.bind(this));
    var group = new L.featureGroup(Object.values(this.markerList));
    this.map.fitBounds(group.getBounds(),{padding: [1,1]});
    this.map.setMinZoom(1);
}



mapView.prototype={
    constructor: mapView,
    hoverStart: function(o,ident){
        this.markerList[ident.attr('id')].openTooltip();
        $(o).addClass("hover");
        if(ident.attr('id') == this.selected) return;
        this.markerList[ident.attr('id')].setOpacity(1);

    },
    hoverEnd: function(o,ident){
        this.markerList[ident.attr('id')].closeTooltip();
        $(o).removeClass("hover");
        if(ident.attr('id') == this.selected) return;
        this.markerList[ident.attr('id')].setOpacity(0.8);

    },
    clickItem: function(o,ident){
        if(this.selected != null){
            this.markerList[this.selected].setOpacity(0.8);
            this.root.find(".ncf-map-item").removeClass("selected");
        }
        this.selected = ident.attr('id');
        this.markerList[this.selected].setOpacity(1);
        o.addClass("selected");
        this.map.setView(this.markerList[this.selected].getLatLng());
    },
    update: function(){
        templist = []
        for( data in this.markerList){
            templist[data] = this.markerList[data];
        }
        this.root.find(".ncf-map-item").each(function(i,o){
            const ident = $(o).find(".identifyer");
            const op = $(o);
            op.mouseenter(function(){
                this.hoverStart(op,ident);
            }.bind(this));

            op.mouseleave(function(){
                this.hoverEnd(op,ident);
            }.bind(this));

            op.click(function(){
                this.clickItem(op,ident);
            }.bind(this));

            templist[ident.attr('id')].addTo(this.map);
            delete templist[ident.attr('id')];
        }.bind(this));
        for (item in templist){
            templist[item].remove();
        }
    }
}


$(document).ready(()=>{
    $(".ncf-map").not('.ncf-filterlist').each((i,o)=>{
        new mapView($(o));
    });

    $(".ncf-map.ncf-filterlist").each((i,o)=>{
        fl = new FilterList($(o));
        map =new mapView($(o));
        fl.onUpdate = function(){map.update()};
    });
});
