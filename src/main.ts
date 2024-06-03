import './style.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

const map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            MIERUNEMAP: {
                type: 'raster',
                tiles: ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}@2x.png'],
                attribution:
                    "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL.",
            },
        },
        layers: [
            {
                id: 'MIERUNEMAP',
                type: 'raster',
                source: 'MIERUNEMAP',
                minzoom: 0,
                maxzoom: 18,
            },
        ],
    },
    center: [139.767, 35.681],
    zoom: 0,
});

map.addControl(
    new maplibregl.NavigationControl({
        visualizePitch: true,
    })
);

map.on('load', () => {
    map.addSource('audience', {
        'type': 'geojson',
        'data': 'https://day-journal.com/sample/random.geojson'
    });
    map.addLayer(
        {
            'id': 'audience-heat',
            'type': 'heatmap',
            'source': 'audience',
            'maxzoom': 18,
            'paint': {
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'rand_point_id'],
                    0,
                    0,
                    26000,
                    1
                ],
                'heatmap-intensity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    1,
                    14,
                    3
                ],
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0,
                    'rgba(255, 255, 204, 0)',
                    0.2,
                    'rgb(255, 255, 204)',
                    0.4,
                    'rgb(255, 237, 160)',
                    0.6,
                    'rgb(254, 217, 118)',
                    0.8,
                    'rgb(253, 141, 60)',
                    1,
                    'rgb(240, 59, 32)'
                ],
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    3,
                    7,
                    18
                ],
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    1,
                    9,
                    0.5,
                    16,
                    0
                ]
            }
        },
    );
});