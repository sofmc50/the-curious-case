THE CURIOUS CASE
An autumn afternoon — CCT360 interactive discovery website

Website: https://sofmc50.github.io/the-curious-case/
Repository: https://github.com/sofmc50/the-curious-case

OPEN THE PROJECT
Unzip the folder and open index.html in a modern browser. For the most reliable
saved progress across pages, use the published website or open the folder with
VS Code's Live Server extension. No installation or build is needed.

PROJECT FILES
index.html       Welcome and entry button
home.html        Neighbourhood hub with three destinations and parallax sections
coffee.html      Original menu artwork, three choices, changing image and story
park.html        Five photographs, collection tracking, duplicate-click feedback
bookshop.html    Entry dialog, five book choices, descriptions, pretend receipt
back-home.html   Personalised summary, progress, final keepsake and reset
css/styles.css   Shared colours, layout, responsive rules and small animations
js/script.js     Click events, functions, conditions and saved browser progress
assets/images/   All 15 selected Pexels photographs and the supplied menu image
assets/favicon.svg  Small decorative browser icon
.nojekyll        Makes GitHub Pages serve the static files directly
CREDITS.txt      Original image and Figma references

HOW TO EXPERIENCE IT
1. Enter from the welcome page. Choose any of the three destinations.
2. Choose a latte, tea or croissant at the cafe. This collects the first memory.
3. Photograph any three different park subjects to collect the park memory and
   uncover its note. There are five photos in total. Clicking the same subject
   again shows a reminder and does not add a second copy.
4. Enter the bookshop, select a cover, read the description, then use the
   "Take this book home" button. A pretend receipt records that choice.
5. Open "My day". It reflects your choices and photographs. All three memories
   unlock the final postcard. You may save a text note, revisit places, change
   your choices, or use "Start a new day" for a fresh beginning.

REQUIREMENTS COVERED
- Six interconnected pages, with links between the three activity destinations.
- Multiple routes: cafe, park and bookshop can be visited in any order.
- More than five interactive elements: menu choices, photo subjects, gallery
  buttons, book covers, book purchase, entry dialog, credits dialog and reset.
- State-based interactions: remembered cafe choice; unique photo collection;
  park note unlocked at three photos; remembered book and receipt; final
  postcard unlocked when all three activity memories have been collected.
- Media: all supplied images are included locally, including the menu artwork.
- Responsive layout: flexible layouts and media queries for tablets and phones.

JAVASCRIPT IN PLAIN LANGUAGE
The main ideas are the ones introduced in class: variables store information,
functions group actions, click listeners respond to visitors, and if/else
conditions decide what to reveal. The page changes through DOM properties
such as textContent, src, hidden and classList.

The day object groups the current choices. A photos array stores the subjects
already collected. localStorage saves that object as JSON so it can be read on
the next page or after a refresh. The memoryCount function checks the three
conditions and controls the progress indicator and final postcard.

Other small browser features used are native HTML dialogs for confirmation,
CSS keyframes for the camera flash, and Blob/download for the optional text
keepsake. There are no frameworks, packages, server code, databases, APIs or
advanced programming languages in the submitted website.

ACCESSIBILITY AND LAYOUT
Semantic headings, descriptive image alternatives, keyboard-operable buttons,
visible focus styles, a skip link, native dialog focus handling, live status
messages and reduced-motion support are included. Parallax backgrounds are
disabled on smaller screens and when reduced motion is preferred.

LIMITATIONS
- Progress belongs to one browser on one device; clearing its site data or
  using another browser starts a new afternoon.
- The park interaction collects prepared photographs; it does not use a
  visitor's real camera.
- Book prices and purchases are fictional interactions. No money is charged.
- If browser storage is unavailable, a notice appears. Enable site storage
  to keep progress across the separate pages.
- The local folder can display without internet. Image-credit links lead to
  external source pages and need a connection.

DESIGN REFERENCE
The six-page structure and activity interactions follow the partner's supplied
Figma wireframes and information architecture. The finished colour palette
uses greens, warm oranges, cream and gold, following the requested fall theme.
The original menu image is used unchanged. The type uses system fonts so all
pages work without downloading fonts.

GITHUB PAGES
The publishing source is the main branch, /(root). Keep index.html at the root
beside the other HTML files, css, js and assets folders. Relative links allow
the project to work under its repository path on GitHub Pages.

No presentation deck is included, as requested.
