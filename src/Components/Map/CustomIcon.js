// customIcons.js
import L from 'leaflet';
import favFacilityImg from '../../Assets/fav-facility-1.png'
import homeImg from '../../Assets/home-icon.png'


// for Font awesome icons
const createFontAwesomeMarker = (iconClass, color) => {
    return L.divIcon({

        html: `<i class="${iconClass}" style="color: ${color}; font-size: 28px;"></i>`,
        className: 'font-awesome-marker',
        iconSize: [28, 28],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
    });
};

// for image
const createImageMarker = (imageUrl) => {
    return L.divIcon({
        html: `<img src="${imageUrl}" alt="marker" style="width: 35px; height: 35px;" />`,
        className: 'custom-image-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28],
    });
};



const schoolIcon = createFontAwesomeMarker('fa-solid fa-location-dot', 'blue',);
const teenagerProjectIcon = createFontAwesomeMarker('fa-solid fa-location-dot', 'red');
const kindergardenIcon = createFontAwesomeMarker('fa-solid fa-location-dot', 'green');
const childProjectIcon = createFontAwesomeMarker('fa-solid fa-location-dot', 'purple');
// const favFacilityIcon = createFontAwesomeMarker('fa-solid fa-location-pin-lock', '#e99f27');
const favFacilityIcon = createImageMarker(favFacilityImg);
const homeIcon = createImageMarker(homeImg);

export { schoolIcon, teenagerProjectIcon, kindergardenIcon, childProjectIcon, favFacilityIcon, homeIcon };
