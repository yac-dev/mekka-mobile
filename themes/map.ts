export const mapStyle = [
  // {
  //   featureType: 'administrative.province',
  //   stylers: [
  //     {
  //       visibility: 'on',
  //     },
  //   ],
  // },
  // {
  //   featureType: 'administrative.locality',
  //   stylers: [
  //     {
  //       visibility: 'on',
  //     },
  //   ],
  // },
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [
      {
        // color: '#172F51',
        color: '#4D4D4D',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 30,
      },
      {
        saturation: '9',
      },
      {
        // color: '#29446b',
        color: '#202225',
        // color: '641860',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        lightness: -20,
        // color: '#0B1673',
        color: '#006CFF',
      },
    ],
  },
];
