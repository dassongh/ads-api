const db = require('./db');

const adsHelpers = require('../helpers');
const { getRequestBody } = require('./utils');
const { ads } = require('../controllers');

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('test adsHelpers', () => {
  it('adds ad to database, returns ad object with id, name, description, 3 images and price', async () => {
    const ad = await adsHelpers.addAd(getRequestBody());

    expect(ad._id).toEqual(ad._id);
    expect(ad.name).toEqual('Name');
    expect(ad.description).toEqual(
      'È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum'
    );
    expect(ad.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'https://pixabay.com/photos/race-car-sports-car-engine-7239994/' }),
        expect.objectContaining({ path: 'https://pixabay.com/photos/golf-automotive-car-fast-german-2472672/' }),
        expect.objectContaining({ path: 'https://pixabay.com/photos/volkswagen-vw-gti-golf6-grill-1260318/' }),
      ])
    );
    expect(ad.price).toEqual(12000);
  });

  it('returns list of 2 ads, each contains id, name, 1 image and price', async () => {
    for (let i = 0; i < 5; i++) {
      await adsHelpers.addAd(getRequestBody());
    }

    const list = await adsHelpers.listAds(null, 1, 2, '');
    const first = list[0];
    const second = list[1];

    expect(first._id).toEqual(first._id);
    expect(first.name).toEqual('Name');
    expect(first.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'https://pixabay.com/photos/race-car-sports-car-engine-7239994/' }),
      ])
    );
    expect(first.price).toEqual(12000);

    expect(second._id).toEqual(second._id);
    expect(second.name).toEqual('Name');
    expect(second.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'https://pixabay.com/photos/race-car-sports-car-engine-7239994/' }),
      ])
    );
    expect(second.price).toEqual(12000);
  });

  it('returns ad by id, ad contains id, name, price, 1 image; Empty string for fields passed', async () => {
    const addAd = await adsHelpers.addAd(getRequestBody());
    const ad = await adsHelpers.getAdById(addAd._id, '');

    expect(ad._id).toEqual(ad._id);
    expect(ad.name).toEqual('Name');
    expect(ad.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'https://pixabay.com/photos/race-car-sports-car-engine-7239994/' }),
      ])
    );
    expect(ad.price).toEqual(12000);
  });

  it('returns ad by id, ad contains id, name, price, 3 images and description; Description and images for fields passed', async () => {
    const addAd = await adsHelpers.addAd(getRequestBody());
    const ad = await adsHelpers.getAdById(addAd._id, 'images+description');

    expect(ad._id).toEqual(ad._id);
    expect(ad.name).toEqual('Name');
    expect(ad.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'https://pixabay.com/photos/race-car-sports-car-engine-7239994/' }),
        expect.objectContaining({ path: 'https://pixabay.com/photos/golf-automotive-car-fast-german-2472672/' }),
        expect.objectContaining({ path: 'https://pixabay.com/photos/volkswagen-vw-gti-golf6-grill-1260318/' }),
      ])
    );
    expect(ad.description).toEqual(
      'È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum'
    );
    expect(ad.price).toEqual(12000);
  });

  it('removes ad from database, return full ad object', async () => {
    const addAd = await adsHelpers.addAd(getRequestBody());
    const removedAd = await adsHelpers.removeAd(addAd._id);

    expect(removedAd._id).toEqual(removedAd._id);
    expect(removedAd.name).toEqual('Name');
    expect(removedAd.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'https://pixabay.com/photos/race-car-sports-car-engine-7239994/' }),
        expect.objectContaining({ path: 'https://pixabay.com/photos/golf-automotive-car-fast-german-2472672/' }),
        expect.objectContaining({ path: 'https://pixabay.com/photos/volkswagen-vw-gti-golf6-grill-1260318/' }),
      ])
    );
    expect(removedAd.description).toEqual(
      'È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum'
    );
    expect(removedAd.price).toEqual(12000);
  });

  it('updates ad with new data, returns updated ad', async () => {
    const addAd = await adsHelpers.addAd(getRequestBody());
    const updatedBody = {
      name: 'Updated name',
      description: 'Updated description',
      images: [{ path: 'Updated path' }],
      price: 1,
    };
    const updatedAd = await adsHelpers.updateAd(addAd._id, updatedBody);

    expect(updatedAd._id).toEqual(updatedAd._id);
    expect(updatedAd.name).toEqual('Updated name');
    expect(updatedAd.images).toEqual(expect.arrayContaining([expect.objectContaining({ path: 'Updated path' })]));
    expect(updatedAd.price).toEqual(1);
    expect(updatedAd.description).toEqual('Updated description');
  });
});
