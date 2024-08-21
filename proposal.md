# [War]

Created by [Zhenni], [Adrian].

## 🚀 Mission statement

Our application, [War] is for [people of all ages]. It allows users to [play an easy-to-learn quick simple game that requires no special skills and is suitable for all ages.]

## API & React Router

This application will use the [DeckOfCards] API. Below are the documentation and specific endpoints we intend to use and the front-end pages that will use them.

- Link to API documentation: [https://deckofcardsapi.com]
- API endpoint #1: https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
  - The default shuffled one deck of cards (does not include joker)
  - { "success": true, "deck_id": "3p40paa87x90", "shuffled": true, "remaining": 52 }
- API endpoint #2: https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}
  - To draw a card from the deck at random
  - {"success":true,"deck_id":"3oqpyindbglu","cards":[{"code":"8H","image":"https://deckofcardsapi.com/static/img/8H.png","images":{"svg":"https://deckofcardsapi.com/static/img/8H.svg","png":"https://deckofcardsapi.com/static/img/8H.png"},"value":"8","suit":"HEARTS"},{"code":"QC","image":"https://deckofcardsapi.com/static/img/QC.png","images":{"svg":"https://deckofcardsapi.com/static/img/QC.svg","png":"https://deckofcardsapi.com/static/img/QC.png"},"value":"QUEEN","suit":"CLUBS"}],"remaining":50}
- API endpoint #3: https://deckofcardsapi.com/api/deck/${deckId}/shuffle/
  - This allows us to reshuffle the deck when we want a new game to be played
  - {"success": true,
    "deck_id": "3p40paa87x90",
    "shuffled": true,
    "remaining": 52}

[If your API requires an API key, say so here.]

**Example:**
- https://api.artic.edu/api/v1/artworks
  - This will fetch an array of artwork objects
  - For each artwork, I want the `id`, `title`, and `image_id`
- https://api.artic.edu/api/v1/artworks/{id}
  - This will fetch a single artwork object
  - I will use the `id`, `title`, `short_description`, `medium_display`, `place_of_origin`, and `image_id`
- https://api.artic.edu/api/v1/artworks/search?q={query}
  - This will fetch a list of artworks that relate to the search query
  - For each artwork, I will use the `id` and `title`

## 👩‍💻 MVP User Stories & Frontend Routes

The application will feature the following frontend routes and core features:

* On the `/home` page, users can get ready for gaming and understand the rules 
* On the `/game` page, users can the simple card game based completely on luck
* On the `/final` page, users can see which one is the luck one that won

**Example:**
- On the `/artworks` page, users can view a grid of all artwork
- On the `/artworks` page, users can click on a piece of art in the grid, taking them to the details page for that piece of art.
- On the `/artworks/:artworkId` page, users can view additional details for a single piece of art
- On the `/` page, users can search for artwork titles related to a search term.

## 🤔 Stretch User Stories

If time permits, the following stretch features will be implemented in order of priority:

* Users will be able to see animated images
* Users will be able to test their memory because addition rules to make it not luck base
* Users will be able to able to leave a simple rating

**Example:**
* Users will be able to save and view favorited artworks using local storage
* Users will be able to change the color scheme of the website from light mode to dark mode

## 📆 Timeline for reaching MVP in 1 week

To ensure that we can complete all core features of the application in 1 week, we will aim to complete tasks according to the following timeline:

**Day 1**
- [ ] Project repo set up by 8/20
- [ ] Proposal set up by 8/20
- [ ] Scrum Board set up by 8/20

**Day 2**
- [ ] Ticket description and due date
- [ ] Ticket description and due date
- [ ] Ticket description and due date

**Day 3** (MVP due by the end of the day)
- [ ] Ticket description and due date
- [ ] Ticket description and due date
- [ ] Ticket description and due date

**Day 4**
- [ ] Ticket description and due date
- [ ] Ticket description and due date
- [ ] Ticket description and due date

**Day 5**
- [ ] Ticket description and due date
- [ ] Ticket description and due date
- [ ] Ticket description and due date

## Wireframes of each page in your application

<div align="center">
    <p><strong>Wireframe home page</strong></p>
    <img width="669" alt="Wireframe-home" src="https://github.com/user-attachments/assets/0c5d9fc0-4fd2-41b4-8ec6-c05c95901175">
</div>

<div align="center">
    <p><strong>Wireframe game page</strong></p>
    <img width="671" alt="Wireframe-game" src="https://github.com/user-attachments/assets/51a97efb-e2f8-4cfb-b563-31623c869897">
</div>

<div align="center">
    <p><strong>Wireframe result page</strong></p>
    <img width="669" alt="Wireframe-result" src="https://github.com/user-attachments/assets/adf78ac4-3218-416b-8c29-133fb8e770ca">
</div>
