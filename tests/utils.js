const getRequestBody = () => {
  return {
    name: 'Name',
    description:
      'È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum',
    images: [
      { path: 'https://pixabay.com/photos/race-car-sports-car-engine-7239994/' },
      { path: 'https://pixabay.com/photos/golf-automotive-car-fast-german-2472672/' },
      { path: 'https://pixabay.com/photos/volkswagen-vw-gti-golf6-grill-1260318/' },
    ],
    price: 12000,
  };
};

module.exports = {
  getRequestBody,
};
