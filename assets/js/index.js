import {Data, DataContainer,} from '../data';

(function() {
  const mainDom = document.querySelector("#main");
  if(!mainDom) return;
  const gridContainer = createGridContainer();

  createGridItem(gridContainer);

  mainDom.insertBefore(gridContainer, mainDom.querySelector("#text"))

  function createGridContainer () {
    const gridContainer = document.createElement("div");
    gridContainer.className = "grid-container " + (DataContainer.class || "");
    if(DataContainer.width) gridContainer.style.width = DataContainer.width;
    if(DataContainer.height) gridContainer.style.height = DataContainer.height;
    if(DataContainer.height) gridContainer.style.height = DataContainer.height;
    if(DataContainer.rows) gridContainer.style["grid-template-rows"] = `repeat(${DataContainer.rows}, minmax(0, 1fr))`;
    if(DataContainer.cols) gridContainer.style["grid-template-columns"] = `repeat(${DataContainer.cols}, 1fr)`;
    return gridContainer
  }

  function createGridItem (gridContainer) {
    Data.forEach((item, index) => {
      const gridItem = document.createElement("div");
      gridItem.id = "item-" + (index + 1);
      gridItem.className = "grid-item " + (item.class || "");
      if(item.row) gridItem.style["grid-row"] = `span ${item.row}`;
      if(item.col) gridItem.style["grid-column"] = `span ${item.col}`;
      if(item.images.length > 1) {
        createImageSlider(gridItem, item.images);
      }else if(item.images.length === 1){
        createImage(gridItem, item.images[0]);
      }else {
        gridItem.innerText = index + 1;
      }
      gridContainer.appendChild(gridItem);
    });
  }
  function createImageSlider(gridItem, images) {
    let currentIndex = 0;
    debugger
    const sliderDom = document.createElement("div");
    sliderDom.id = "slider";
    sliderDom.className = "slider";
    console.log(sliderDom)
    images.forEach(image => {
      createImage(sliderDom, image);
    });

    function changeSlide(sliderDom) {
      sliderDom.children[currentIndex].style.opacity = '0';
      currentIndex = (currentIndex + 1) % images.length;
      console.log(currentIndex)
      sliderDom.children[currentIndex].style.opacity = '1';
    }
    setInterval(() => changeSlide(sliderDom), 5000);
    gridItem.appendChild(sliderDom)
  }
  function createImage(gridItem, image) {
    const imageDom = document.createElement("img");
    if(image.width) imageDom.style.width = image.width;
    if(image.height) imageDom.style.height = image.height;
    if(image.class) imageDom.className = image.class;
    imageDom.src = image.src;
    imageDom.alt = image.alt;

    gridItem.appendChild(imageDom)
  }



})();
