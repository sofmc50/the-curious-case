/*
 * THE CURIOUS CASE — plain JavaScript
 * Each page calls a small setup function. Click listeners change the DOM.
 * One object remembers the user's choices. localStorage keeps it on refresh.
 */

const storageKey = "curious-case-autumn-v1";
const pageName = document.body.dataset.page;
let toastTimer;
let storageWorks = true;

const treats = {
  latte: {
    name: "Latte", price: 6.50, image: "latte",
    alt: "A cup of coffee on a saucer",
    title: "A little cup of comfort.",
    description: "The first sip is warm, the window is a little foggy, and for a moment there is absolutely nowhere else you need to be.",
    caption: "a latte, and a moment to yourself."
  },
  tea: {
    name: "Tea", price: 3.00, image: "tea",
    alt: "A glass of herbal tea beside a window",
    title: "Let the afternoon steep.",
    description: "A warm glass, a quiet corner, a slow breath. Outside the window, another leaf drifts down. Some things are better when you wait.",
    caption: "a small pause, steeped slowly."
  },
  croissant: {
    name: "Croissant", price: 4.50, image: "croissant",
    alt: "A croissant served as part of a French breakfast",
    title: "A very good kind of flaky.",
    description: "Golden layers, buttery crumbs, and a little happiness on a plate. You take your time. The rest of the day can wait a minute.",
    caption: "the little things taste the best."
  }
};

const photos = {
  path: { name: "The golden path", caption: "the long way is the lovely way.", alt: "A sunlit autumn pathway lined with colourful trees", number: "01" },
  squirrel: { name: "A tiny neighbour", caption: "someone else taking a little break.", alt: "A squirrel perched on a park bench among autumn leaves", number: "02" },
  fountain: { name: "The fountain", caption: "a little stillness in the middle of it all.", alt: "A fountain in a park surrounded by autumn foliage", number: "03" },
  garden: { name: "A secret garden", caption: "a hidden corner, found by wandering.", alt: "A colourful botanical garden in a Toronto park", number: "04" },
  flowers: { name: "One last bloom", caption: "autumn has a few colours left to share.", alt: "Bright chrysanthemums blooming in a garden", number: "05" }
};

const books = {
  garden: { title: "The Secret Garden", author: "Frances Hodgson Burnett", price: 14, cover: "garden", symbol: "❧", description: "A hidden door, an overgrown garden, and an unlikely friendship. A gentle story about paying attention to the things that still have room to grow." },
  alice: { title: "Alice’s Adventures in Wonderland", author: "Lewis Carroll", price: 12, cover: "alice", symbol: "♠", description: "A white rabbit in a hurry leads Alice into a world where very little makes sense. For afternoons when your curiosity gets the better of you." },
  anne: { title: "Anne of Green Gables", author: "L. M. Montgomery", price: 15, cover: "anne", symbol: "✳", description: "An imaginative girl finds a home on Prince Edward Island. A warm story of friendship, belonging, and seeing something extraordinary in everyday life." },
  scarlet: { title: "A Study in Scarlet", author: "Arthur Conan Doyle", price: 13, cover: "scarlet", symbol: "⌕", description: "Dr. Watson meets Sherlock Holmes, and an unusual case begins. Follow the small details that everyone else overlooks." },
  willows: { title: "The Wind in the Willows", author: "Kenneth Grahame", price: 14, cover: "willows", symbol: "≈", description: "Mole, Rat, Badger, and Toad find adventure along the riverbank. A comforting tale of wandering, friendship, and the pull of home." }
};

// Start with an empty afternoon, then safely restore any saved choices.
let day = { treat: "", photos: [], book: "", shopEntered: false, lastPhoto: "" };
try {
  const savedDay = JSON.parse(localStorage.getItem(storageKey));
  if (savedDay && typeof savedDay === "object") {
    if (Object.prototype.hasOwnProperty.call(treats, savedDay.treat)) day.treat = savedDay.treat;
    if (Object.prototype.hasOwnProperty.call(books, savedDay.book)) day.book = savedDay.book;
    if (Array.isArray(savedDay.photos)) {
      savedDay.photos.forEach(function (photo) {
        if (Object.prototype.hasOwnProperty.call(photos, photo) && !day.photos.includes(photo)) day.photos.push(photo);
      });
    }
    day.shopEntered = savedDay.shopEntered === true;
    if (day.photos.includes(savedDay.lastPhoto)) day.lastPhoto = savedDay.lastPhoto;
  }
} catch (error) {
  // Browsers with storage disabled can still play through the current page.
  storageWorks = false;
}

function saveDay() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(day));
  } catch (error) {
    storageWorks = false;
    showToast("This browser cannot save progress. Keep this tab open to continue.");
  }
  updateMemoryCount();
}

function memoryCount() {
  let count = 0;
  if (day.treat) count += 1;
  if (day.photos.length >= 3) count += 1;
  if (day.book) count += 1;
  return count;
}

function updateMemoryCount() {
  document.getElementById("memory-count").textContent = memoryCount() + " / 3";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = setTimeout(function () { toast.classList.remove("visible"); }, 4200);
}

function imagePath(name) { return "assets/images/" + name + ".jpg"; }
function money(price) { return "$" + price.toFixed(2); }

// Give visitors a readable source list without adding another scene.
function setupCredits() {
  const creditLinks = [
    ["Welcome sidewalk", "sunny-sidewalk-with-vibrant-fall-foliage-29625096"],
    ["Autumn leaves", "vibrant-autumn-leaves-in-toronto-park-29246922"],
    ["Home", "cozy-living-room-with-sofa-5825527"],
    ["Coffee shop", "cafe-kitchen-with-coffee-machine-and-glassware-6152270"],
    ["Pastry display", "food-inside-display-chiller-1855214"],
    ["Coffee", "cup-of-coffee-on-saucer-459489"],
    ["Tea", "refreshing-glass-of-herbal-tea-on-windowsill-28836251"],
    ["Croissant", "classic-french-breakfast-with-croissant-32802349"],
    ["Park", "scenic-autumn-park-with-vibrant-foliage-34702272"],
    ["Golden path", "scenic-autumn-pathway-in-a-sunlit-park-34193023"],
    ["Squirrel", "selective-focus-photography-of-squirrel-sitting-on-armchair-21784"],
    ["Fountain", "fountain-in-park-in-autumn-19073962"],
    ["Botanical garden", "vibrant-botanical-garden-in-toronto-park-29192210"],
    ["Chrysanthemums", "vibrant-chrysanthemum-garden-in-new-york-35222832"],
    ["Bookshop", "sale-on-street-in-front-of-bookstore-17160725"]
  ];
  const list = document.createElement("ul");
  creditLinks.forEach(function (credit) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "https://www.pexels.com/photo/" + credit[1] + "/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = credit[0] + " — Pexels";
    item.appendChild(link);
    list.appendChild(item);
  });
  document.getElementById("image-credits").appendChild(list);
  const dialog = document.getElementById("credits-dialog");
  document.getElementById("credits-open").addEventListener("click", function (event) {
    event.preventDefault();
    dialog.showModal();
  });
  document.getElementById("credits-close").addEventListener("click", function () { dialog.close(); });
}

function setupHome() {
  if (day.treat) document.getElementById("coffee-note").textContent = "Collected: " + treats[day.treat].name + " and a little comfort. ✓";
  if (day.photos.length) document.getElementById("park-note").textContent = day.photos.length + " of 5 photos collected.";
  if (day.book) document.getElementById("book-note").textContent = "On your shelf: " + books[day.book].title + ". ✓";
}

function showTreat() {
  if (!day.treat) return;
  const treat = treats[day.treat];
  const image = document.getElementById("treat-image");
  image.src = imagePath(treat.image);
  image.alt = treat.alt;
  document.getElementById("treat-caption").textContent = treat.caption;
  document.getElementById("treat-title").textContent = treat.title;
  document.getElementById("treat-description").textContent = treat.description;
  document.getElementById("cafe-discovery").hidden = false;
  document.querySelectorAll("[data-treat]").forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.treat === day.treat);
  });
}

function setupCoffee() {
  showTreat();
  document.querySelectorAll("[data-treat]").forEach(function (button) {
    button.addEventListener("click", function () {
      const sameTreat = day.treat === button.dataset.treat;
      day.treat = button.dataset.treat;
      saveDay();
      showTreat();
      if (sameTreat) showToast("Your " + treats[day.treat].name.toLowerCase() + " is already saved. Enjoy the moment.");
      else showToast(treats[day.treat].name + " chosen. A little comfort, collected. ✧");
    });
  });
}

function showParkPhoto(id) {
  const photo = photos[id];
  const image = document.getElementById("park-photo");
  image.src = imagePath(id);
  image.alt = photo.alt;
  document.getElementById("park-caption").textContent = photo.caption;
  document.getElementById("viewfinder-caption").textContent = "A moment collected · " + photo.name;
  document.getElementById("polaroid-number").textContent = "AUTUMN / NO. " + photo.number;
}

function makeAlbum(containerId, interactive) {
  const container = document.getElementById(containerId);
  container.replaceChildren();
  day.photos.forEach(function (id) {
    const card = document.createElement(interactive ? "button" : "figure");
    card.className = "album-card";
    const image = document.createElement("img");
    image.src = imagePath(id);
    image.alt = photos[id].alt;
    image.width = 400;
    image.height = 300;
    image.loading = "lazy";
    const caption = document.createElement(interactive ? "span" : "figcaption");
    caption.textContent = photos[id].name;
    card.appendChild(image);
    card.appendChild(caption);
    if (interactive) {
      card.setAttribute("aria-label", "View collected photo: " + photos[id].name);
      card.addEventListener("click", function () {
        showParkPhoto(id);
        document.getElementById("polaroid").scrollIntoView({ block: "center" });
      });
    }
    container.appendChild(card);
  });
}

function updatePark() {
  document.getElementById("photo-count").textContent = day.photos.length;
  document.querySelectorAll("[data-photo]").forEach(function (button) {
    const collected = day.photos.includes(button.dataset.photo);
    button.classList.toggle("captured", collected);
    button.querySelector(".capture-state").textContent = collected ? "✓" : "＋";
    button.setAttribute("aria-label", photos[button.dataset.photo].name + (collected ? ", already photographed" : ", take a photo"));
  });
  document.getElementById("park-discovery").hidden = day.photos.length < 3;
  document.getElementById("photo-album").hidden = day.photos.length === 0;
  makeAlbum("album-grid", true);
}

function setupPark() {
  updatePark();
  if (day.lastPhoto) showParkPhoto(day.lastPhoto);
  document.querySelectorAll("[data-photo]").forEach(function (button) {
    button.addEventListener("click", function () {
      const id = button.dataset.photo;
      const feedback = document.getElementById("camera-feedback");
      if (day.photos.includes(id)) {
        feedback.textContent = "I already have a picture of " + photos[id].name.toLowerCase() + ". Maybe I should try something else.";
        showParkPhoto(id);
        showToast("Already in your collection. Try another little discovery.");
        return;
      }
      day.photos.push(id);
      day.lastPhoto = id;
      saveDay();
      showParkPhoto(id);
      updatePark();
      const polaroid = document.getElementById("polaroid");
      polaroid.classList.remove("flash");
      // Reading offsetWidth lets the short camera animation restart on each shot.
      void polaroid.offsetWidth;
      polaroid.classList.add("flash");
      feedback.textContent = "Click. " + photos[id].name + " is now part of your afternoon.";
      if (day.photos.length === 3) {
        feedback.textContent = "Three moments collected. A little note has appeared below your camera.";
        showToast("A closer look, collected. You uncovered the park’s note. ✧");
      } else if (day.photos.length === 5) {
        showToast("All five little moments, collected. What a lovely walk.");
      } else {
        showToast("A moment worth keeping. " + day.photos.length + " / 5 photos collected.");
      }
    });
  });
}

let selectedBook = "";

function chooseBook(id) {
  selectedBook = id;
  const book = books[id];
  document.getElementById("book-title").textContent = book.title;
  document.getElementById("book-author").textContent = "by " + book.author;
  document.getElementById("book-description").textContent = book.description;
  document.getElementById("book-price").textContent = money(book.price);
  const buyButton = document.getElementById("buy-book");
  buyButton.disabled = day.book === id;
  buyButton.textContent = day.book === id ? "Already on your shelf ✓" : "Take this book home · " + money(book.price);
  document.querySelectorAll("[data-book]").forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.book === id);
  });
}

function showReceipt() {
  if (!day.book) return;
  document.getElementById("receipt-placeholder").hidden = true;
  document.getElementById("receipt-details").hidden = false;
  document.getElementById("receipt-book").textContent = books[day.book].title;
  document.getElementById("receipt-total").textContent = money(books[day.book].price);
}

function openShop() {
  day.shopEntered = true;
  saveDay();
  document.getElementById("shop-front").hidden = true;
  document.getElementById("shop-interior").hidden = false;
}

function setupBookshop() {
  const shelf = document.getElementById("bookshelf");
  Object.keys(books).forEach(function (id) {
    const book = books[id];
    const button = document.createElement("button");
    button.className = "book-option";
    button.dataset.book = id;
    button.setAttribute("aria-label", "Read about " + book.title + " by " + book.author + ", " + money(book.price));
    button.setAttribute("aria-pressed", "false");
    // Only fixed project text enters this markup; saved/user text uses textContent.
    button.innerHTML = '<span class="book-cover cover-' + book.cover + '"><span class="cover-series">THE WANDERER’S LIBRARY</span><span class="cover-symbol" aria-hidden="true">' + book.symbol + '</span><span class="cover-title">' + book.title + '</span><span class="cover-author">' + book.author + '</span></span><span class="book-label"><span>Read a little more ↗</span><span>' + money(book.price) + '</span></span>';
    button.addEventListener("click", function () { chooseBook(id); });
    shelf.appendChild(button);
  });
  const dialog = document.getElementById("shop-dialog");
  document.getElementById("enter-shop").addEventListener("click", function () { dialog.showModal(); });
  document.getElementById("confirm-shop").addEventListener("click", function () {
    dialog.close();
    openShop();
    shelf.querySelector("button").focus();
  });
  document.getElementById("cancel-shop").addEventListener("click", function () { dialog.close(); });
  document.getElementById("buy-book").addEventListener("click", function () {
    if (!selectedBook || day.book === selectedBook) return;
    const changingBook = Boolean(day.book);
    day.book = selectedBook;
    saveDay();
    showReceipt();
    chooseBook(selectedBook);
    showToast(changingBook ? "A change of heart. Your book and receipt have been updated." : "A new chapter, collected. Your receipt is ready. ✧");
  });
  if (day.shopEntered || day.book) openShop();
  if (day.book) {
    chooseBook(day.book);
    showReceipt();
  }
}

function postcardStory() {
  return "A " + treats[day.treat].name.toLowerCase() + " to slow you down. " + day.photos.length + " photographs to remind you to look closer. And “" + books[day.book].title + "” to take you somewhere new.";
}

function setupSummary() {
  const count = memoryCount();
  document.getElementById("summary-count").textContent = count + " of 3 memories collected";
  document.getElementById("summary-percentage").textContent = Math.round(count / 3 * 100) + "%";
  document.getElementById("day-progress").value = count;
  if (day.treat) {
    const treat = treats[day.treat];
    document.getElementById("cafe-memory").classList.add("collected");
    document.getElementById("cafe-badge").textContent = "Memory collected ✓";
    document.getElementById("summary-treat").textContent = "A " + treat.name.toLowerCase() + ", just for you.";
    document.getElementById("summary-cafe-text").textContent = "A small comfort and an unexpected reminder to enjoy the unplanned parts of a day.";
    document.getElementById("summary-treat-image").src = imagePath(treat.image);
    document.getElementById("summary-treat-image").alt = treat.alt;
  }
  if (day.photos.length) {
    document.getElementById("summary-photos").textContent = day.photos.length + " little moments.";
    document.getElementById("summary-park-text").textContent = day.photos.length >= 3 ? "You slowed down and uncovered the park’s little secret. Your photographs came home with you." : "You’ve started noticing. Collect " + (3 - day.photos.length) + " more different photo" + (day.photos.length === 1 ? "s" : "") + " to uncover the park’s note.";
    document.getElementById("summary-album").hidden = false;
    makeAlbum("summary-album-grid", false);
  }
  if (day.photos.length >= 3) {
    document.getElementById("park-memory").classList.add("collected");
    document.getElementById("park-badge").textContent = "Memory collected ✓";
  }
  if (day.book) {
    document.getElementById("book-memory").classList.add("collected");
    document.getElementById("book-badge").textContent = "Memory collected ✓";
    document.getElementById("summary-book").textContent = books[day.book].title;
    document.getElementById("summary-book-text").textContent = "You brought home a new chapter by " + books[day.book].author + ". A story to carry the afternoon a little further.";
  }
  if (count === 3) {
    document.getElementById("summary-intro").textContent = "A little comfort, a closer look, and a new chapter. You followed your curiosity and made an ordinary afternoon your own.";
    document.getElementById("locked-note").hidden = true;
    document.getElementById("postcard").hidden = false;
    document.getElementById("postcard-story").textContent = postcardStory();
  } else if (count > 0) {
    document.getElementById("summary-intro").textContent = "Here are the little things you’ve found so far. There’s still time to wander and uncover the rest of your afternoon.";
  }
  document.getElementById("download-memory").addEventListener("click", function () {
    if (memoryCount() !== 3) return;
    const text = "THE CURIOUS CASE\nAn autumn afternoon\n\n" + postcardStory() + "\n\nMy photos:\n" + day.photos.map(function (id) { return "- " + photos[id].name; }).join("\n") + "\n\nThe little things were the story all along.\nUntil the next little adventure.\n";
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-curious-afternoon.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });
  const resetDialog = document.getElementById("reset-dialog");
  document.getElementById("reset-day").addEventListener("click", function () { resetDialog.showModal(); });
  document.getElementById("cancel-reset").addEventListener("click", function () { resetDialog.close(); });
  document.getElementById("confirm-reset").addEventListener("click", function () {
    // Remove only this project's saved afternoon, leaving other browser data alone.
    try { localStorage.removeItem(storageKey); } catch (error) { storageWorks = false; }
    window.location.href = "index.html";
  });
}

updateMemoryCount();
setupCredits();
if (pageName === "welcome" && memoryCount() > 0) document.getElementById("start-link").firstChild.textContent = "Continue my afternoon ";
if (pageName === "home") setupHome();
if (pageName === "coffee") setupCoffee();
if (pageName === "park") setupPark();
if (pageName === "bookshop") setupBookshop();
if (pageName === "back-home") setupSummary();
if (!storageWorks) showToast("Progress saving is unavailable. Allow site storage to keep memories between pages.");

// Returning with the browser Back button should also show the latest choices.
window.addEventListener("pageshow", function (event) {
  if (event.persisted) window.location.reload();
});
