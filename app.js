const assets = {"imgChapie3PackOceanVariant01PhotoSource":"assets/imgChapie3PackOceanVariant01PhotoSource.png","imgChapie3PackCoastlineVariant04PhotoSource":"assets/imgChapie3PackCoastlineVariant04PhotoSource.png","imgChapie3PackCoastlineVariant03PhotoSource":"assets/imgChapie3PackCoastlineVariant03PhotoSource.png","imgChapie3PackCoastlineVariant02PhotoSource":"assets/imgChapie3PackCoastlineVariant02PhotoSource.png","imgChapie3PackCoastlineVariant01PhotoSource":"assets/imgChapie3PackCoastlineVariant01PhotoSource.png","imgChapie3PackChromaVariant04PhotoSource":"assets/imgChapie3PackChromaVariant04PhotoSource.png","imgChapie3PackChromaVariant03PhotoSource":"assets/imgChapie3PackChromaVariant03PhotoSource.png","imgChapie3PackChromaVariant02PhotoSource":"assets/imgChapie3PackChromaVariant02PhotoSource.png","imgChapie3PackChromaVariant01PhotoSource":"assets/imgChapie3PackChromaVariant01PhotoSource.png","imgChapie3PackGratefullFallVariant01PhotoSource":"assets/imgChapie3PackGratefullFallVariant01PhotoSource.png","imgChapie3PackEnchantedVariant08PhotoSource":"assets/imgChapie3PackEnchantedVariant08PhotoSource.png","imgChapie3PackEnchantedVariant07PhotoSource":"assets/imgChapie3PackEnchantedVariant07PhotoSource.png","imgChapie3PackEnchantedVariant06PhotoSource":"assets/imgChapie3PackEnchantedVariant06PhotoSource.png","imgChapie3PackEnchantedVariant05PhotoSource":"assets/imgChapie3PackEnchantedVariant05PhotoSource.png","imgChapie3PackEnchantedVariant04PhotoSource":"assets/imgChapie3PackEnchantedVariant04PhotoSource.png","imgChapie3PackEnchantedVariant03PhotoSource":"assets/imgChapie3PackEnchantedVariant03PhotoSource.png","imgChapie3PackEnchantedVariant02PhotoSource":"assets/imgChapie3PackEnchantedVariant02PhotoSource.png","imgChapie3PackEnchantedVariant01PhotoSource":"assets/imgChapie3PackEnchantedVariant01PhotoSource.png","imgChapieGalleryPhotoSource09AdditionalPhoto3":"assets/imgChapieGalleryPhotoSource09AdditionalPhoto3.png","imgChapieGalleryPhotoSource08AdditionalPhoto2":"assets/imgChapieGalleryPhotoSource08AdditionalPhoto2.png","imgChapieGalleryPhotoSource07AdditionalPhoto1":"assets/imgChapieGalleryPhotoSource07AdditionalPhoto1.png","imgChapieGalleryPhotoSource06DimensionsFit":"assets/imgChapieGalleryPhotoSource06DimensionsFit.png","imgChapieGalleryPhotoSource05EverydayLifestyle":"assets/imgChapieGalleryPhotoSource05EverydayLifestyle.png","imgChapieGalleryPhotoSource04ClipCarry":"assets/imgChapieGalleryPhotoSource04ClipCarry.png","imgChapieGalleryPhotoSource03OpenHolder":"assets/imgChapieGalleryPhotoSource03OpenHolder.png","imgChapieGalleryPhotoSource02ProductCloseUp":"assets/imgChapieGalleryPhotoSource02ProductCloseUp.png","imgChapieGalleryPhotoSource01BundleHero":"assets/imgChapieGalleryPhotoSource01BundleHero.png","imgChapieRaw260X100Px41":"assets/imgChapieRaw260X100Px41.png","imgEditProductPhotoChapieCharmChains":"assets/imgEditProductPhotoChapieCharmChains.png","imgEditProductPhotoQuickReleaseCarabiner":"assets/imgEditProductPhotoQuickReleaseCarabiner.png","imgFooter":"assets/imgFooter.png","imgGroup":"assets/imgGroup.svg","imgGroup1":"assets/imgGroup1.svg","imgGroup2":"assets/imgGroup2.svg","imgBiPersonCircle":"assets/imgBiPersonCircle.svg"};
Object.assign(assets, {"imgSingleOgPhotoSource18Ocean01":"assets/imgSingleOgPhotoSource18Ocean01.svg","imgSingleOgPhotoSource17Coastline04":"assets/imgSingleOgPhotoSource17Coastline04.svg","imgSingleOgPhotoSource11Chroma02":"assets/imgSingleOgPhotoSource11Chroma02.png","imgKeyringSymbol":"assets/imgKeyringSymbol.svg","imgSingleOgPhotoSource10Chroma01":"assets/imgSingleOgPhotoSource10Chroma01.png","imgSingleOgPhotoSource09GratefulFall01":"assets/imgSingleOgPhotoSource09GratefulFall01.png","imgSingleOgPhotoSource08Enchanted08":"assets/imgSingleOgPhotoSource08Enchanted08.png","imgSingleOgPhotoSource07Enchanted07":"assets/imgSingleOgPhotoSource07Enchanted07.png","imgSingleOgPhotoSource06Enchanted06":"assets/imgSingleOgPhotoSource06Enchanted06.png","imgSingleOgPhotoSource05Enchanted05":"assets/imgSingleOgPhotoSource05Enchanted05.png","imgSingleOgPhotoSource04MerryEvergreen":"assets/imgSingleOgPhotoSource04MerryEvergreen.png","imgSingleOgPhotoSource03SnowflakeMagic":"assets/imgSingleOgPhotoSource03SnowflakeMagic.png","imgSingleOgPhotoSource02FrostyCheer":"assets/imgSingleOgPhotoSource02FrostyCheer.png","imgSingleOgPhotoSource01CandyLane":"assets/imgSingleOgPhotoSource01CandyLane.png"});
const params = new URLSearchParams(location.search);
const requestedFlow = params.get('flow');
const flow = ['gallery','desktop-bundle','mobile-bundle'].includes(requestedFlow) ? requestedFlow : 'product';
const isBundle = flow.endsWith('-bundle');
const isGallery = flow === 'gallery';
document.body.classList.toggle('gallery-mode', isGallery);
document.body.classList.toggle('bundle-mode', isBundle);
document.body.classList.toggle('mobile-preview', flow === 'mobile-bundle' || (isGallery && params.get('view') === 'mobile'));
document.querySelector('.flow-nav a[href="?flow=' + flow + '"]').setAttribute('aria-current','page');
const byId = id => document.getElementById(id);
const assetsMatching = term => Object.keys(assets).filter(key => key.includes(term)).sort();
const button = (label, action, pressed) => {
  const element = document.createElement('button');
  element.textContent = label;
  element.onclick = action;
  if (pressed !== undefined) element.setAttribute('aria-pressed', pressed);
  return element;
};
const photoButton = (key, label, action, pressed) => {
  const element = button('', action, pressed);
  element.setAttribute('aria-label', label);
  const image = new Image();
  image.src = assets[key];
  image.alt = '';
  element.append(image);
  return element;
};
const photos = assetsMatching('GalleryPhotoSource');
let photoIndex = 0;
function showPhoto(index) {
  photoIndex = (index + photos.length) % photos.length;
  byId('photo').src = assets[photos[photoIndex]];
  if (document.querySelector('.gallery-controls')) syncSave();
  byId('thumbs').replaceChildren(...photos.map((key,i) => photoButton(key, 'Show photo ' + (i+1), () => showPhoto(i), i === photoIndex)));
}
byId('logo').src = assets.imgChapieRaw260X100Px41;
byId('prev').onclick = () => showPhoto(photoIndex-1);
byId('next').onclick = () => showPhoto(photoIndex+1);
let swipeStart;
byId('photo').ondragstart = event => event.preventDefault();
byId('photo').onpointerdown = event => { swipeStart = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); };
byId('photo').onpointerup = event => {
  const distance = event.clientX - swipeStart;
  if (Math.abs(distance) > 35) showPhoto(photoIndex + (distance < 0 ? 1 : -1));
};
showPhoto(0);
if (isGallery) {
  const intro = byId('flowIntro');
  intro.hidden = false;
  intro.innerHTML = '<h1>Interactive product gallery</h1><a href="?flow=gallery&view=desktop">Desktop gallery</a><a href="?flow=gallery&view=mobile">Mobile gallery</a>';
}
const galleryTools = document.createElement('div');
galleryTools.className = 'gallery-controls';
const save = button('Save photo', () => {
  const saved = localStorage.getItem('chapie-saved-photo') === String(photoIndex);
  if (saved) localStorage.removeItem('chapie-saved-photo');
  else localStorage.setItem('chapie-saved-photo', String(photoIndex));
  syncSave();
});
function syncSave() {
  const saved = localStorage.getItem('chapie-saved-photo') === String(photoIndex);
  save.textContent = saved ? 'Photo saved' : 'Save photo';
  save.setAttribute('aria-pressed', saved);
}
galleryTools.append(button('Zoom photo', () => {
  byId('zoomPhoto').src = byId('photo').src;
  byId('zoom').showModal();
}), save);
byId('thumbs').after(galleryTools);
syncSave();

const collections = {All:'3Pack', Enchanted:'EnchantedVariant', 'Gratefull Fall':'GratefullFallVariant', Chroma:'ChromaVariant', Coastline:'CoastlineVariant', Ocean:'OceanVariant'};
const name = key => key.startsWith('imgSingleOgPhotoSource') ? key.slice(24).replace(/([a-z])([A-Z0-9])/g,'$1 $2') : key.replace('imgChapie3Pack','').replace('PhotoSource','').replace('GratefullFall','Gratefull Fall').replace('Variant',' ');
if (isBundle) {
  const intro = byId('flowIntro');
  intro.hidden = false;
  intro.innerHTML = '<h1>Build Your Own Chapie OG Bundle</h1><p>Choose your pack size, then mix and match your favorite designs.</p>';
  byId('buildTitle').textContent = 'Step 1 · Choose your package';
  const designs = document.createElement('h3');
  designs.textContent = 'Step 2 · Choose your designs';
  byId('variants').before(designs);
  byId('bundleSummary').prepend(document.createElement('h2'));
  byId('bundleSummary').prepend(byId('selection'));
}
let size = 3;
let collection = 'All';
let picks = [];
const bag = [];
function renderBundle() {
  byId('sizes').replaceChildren(...[1,3,5,10].map(count => button(count === 1 ? 'Single' : count + '-Pack', () => {
    size = count;
    picks = picks.slice(0, size);
    renderBundle();
  }, count === size)));
  byId('filters').replaceChildren(...Object.keys(collections).map(label => button(label, () => {
    collection = label;
    renderBundle();
  }, label === collection)));
  byId('selection').textContent = picks.length + ' of ' + size + ' selected';
  const variants = assetsMatching(isBundle ? 'SingleOgPhotoSource' : collections[collection]);
  byId('variants').replaceChildren(...variants.map(key => {
    const control = photoButton(key, 'Add ' + name(key), () => {
    if (picks.length < size) picks.push(key);
    renderBundle();
      }, isBundle ? undefined : picks.includes(key));
    if (isBundle) {
      const label = document.createElement('span');
      label.textContent = '+ ADD';
      control.append(label);
    }
    return control;
  }));
  if (isBundle) byId('bundleSummary').querySelector('h2').textContent = 'Your ' + (size === 1 ? 'Single' : size + '-Pack');
  byId('picks').replaceChildren(...picks.map((key,index) => button(name(key) + ' ×', () => {
    picks.splice(index, 1);
    renderBundle();
  })));
  if (isBundle) {
    const slots = Array.from({length:size}, (_, index) => {
      const slot = document.createElement('div');
      slot.className = 'slot';
      const key = picks[index];
      if (!key) slot.textContent = '#' + (index + 1);
      else slot.append(photoButton(key, 'Remove ' + name(key) + ' from slot ' + (index+1), () => {
        picks.splice(index,1);
        renderBundle();
      }));
      return slot;
    });
    byId('picks').replaceChildren(...slots);
  }
  byId('add').disabled = picks.length !== size;
}
function renderBag() {
  byId('count').textContent = bag.length;
  byId('bagItems').replaceChildren(...bag.map((item,index) => {
    const row = document.createElement('div');
    row.className = 'bagrow';
    row.append(item, button('Remove', () => { bag.splice(index,1); renderBag(); }));
    return row;
  }));
  if (!bag.length) byId('bagItems').textContent = 'Your bag is empty.';
}
function openBag() { renderBag(); byId('bag').showModal(); }
byId('cart').onclick = openBag;
byId('add').onclick = () => {
  bag.push('Chapie OG ' + (size === 1 ? 'Single' : size + '-Pack') + ' · ' + picks.map(name).join(', '));
  openBag();
};
renderBundle();
for (const [label,key] of [['Chapie Charm Chains','imgEditProductPhotoChapieCharmChains'],['Quick Release Carabiner','imgEditProductPhotoQuickReleaseCarabiner']]) {
  const row = document.createElement('div');
  row.className = 'extra';
  const image = new Image();
  image.src = assets[key];
  image.alt = '';
  row.append(image, label, button('+ Add', () => { bag.push(label); openBag(); }));
  byId('extras').append(row);
}
for (const [reviewer,quote] of [
  ['Justin','My wife loves it as a birthday gift.'],
  ['Kertie P.','It’s like a little Yeti for my chapstick!'],
  ['Nikki M.','It fits wonderfully.']
]) {
  const card = document.createElement('article');
  const title = document.createElement('strong');
  title.textContent = reviewer + ' · ★★★★★';
  const body = document.createElement('p');
  body.textContent = quote;
  card.append(title,body);
  byId('reviewcards').append(card);
}
for (const [id,direction] of [['reviewPrev',-1],['reviewNext',1]]) {
  byId(id).onclick = () => {
    const cards = byId('reviewcards');
    cards.scrollBy({left:direction * (cards.firstElementChild.offsetWidth+12),behavior:'smooth'});
  };
}
