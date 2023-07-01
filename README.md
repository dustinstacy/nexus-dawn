<h1 align="center">
Nexus Dawn
</h1>

<p align="center">
  <a href="https://github.com/dustinstacy/triple-triad-reactjs/issues">
    <img src="https://img.shields.io/badge/Awesome-Yes-blue" alt="Issues">
  </a>
   <a href="#license">
    <img src="https://img.shields.io/badge/License-MIT-brightgreen" alt="License">
  </a>
</p>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#rules">Rules</a> •
  <a href="#planned-updates">Planned Updates</a> •
  <a href="#local-setup">Local Setup</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

---

<div align="center">
<img src='https://res.cloudinary.com/dsv7k92lb/image/upload/v1687034760/Nexus%20Dawn/logos/logo_c9eaj0.png' alt='logo'/>
<br/>
Website: <a href='https://nexus-dawn.com'>https://nexus-dawn.com</a>
<h2></h2>
</div>

## Description

This web app is a playable card game that allows users to collect and upgrade
cards, construct a deck, and compete in various game modes. Inspired by the
Final Fantasy VIII [minigame](https://finalfantasy.fandom.com/wiki/Triple_Triad)
called Triple Triad, I've recreated it with a modern twist. I am constantly
working on improving the user experience, adding new features, and increasing
replayability. Get ready for exciting updates coming soon!

In its current iteration, the user journey begins with creating an account,
followed by an interactive onboarding process that covers the fundamental
aspects of the application. Users can then engage in battles against AI
opponents, progressively unlocking more challenging adversaries as they level
up. The opponents become increasingly more difficult, providing greater rewards
and a heightened sense of achievement. By collecting these rewards and advancing
in levels, users expand their arsenal of cards, enhancing their strategic
capabilities and tactical options. This progression system empowers users to
continuously improve their skills and explore new possibilities within the
application.

## Screenshots

<h4>Home screen</h4>

![home screen](https://res.cloudinary.com/dsv7k92lb/image/upload/v1687034685/Nexus%20Dawn/Screenshots/homeScreen_nliptx.jpg)

<h4>Battle Screen</h4>

![battle screen](https://res.cloudinary.com/dsv7k92lb/image/upload/v1687034685/Nexus%20Dawn/Screenshots/battleScreen_s2qig9.jpg)

## Rules

Find all the game rule listed
[here](https://nexus-dawn-16daa70a99d8.herokuapp.com/rules)

## Planned Updates

-   Level up rewards
-   Card challenges
-   Card fusion
-   Deck presets
-   UI/UX enhancements
-   Expanded Ruleset
-   New game modes
-   Peer to Peer matches

## Local Setup

To clone and run this application, you'll need [Git](https://git-scm.com) and
[Node.js](https://nodejs.org/en/download/) (which comes with
[npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/dustinstacy/triple-triad-reactjs.git

# Go into the repository
cd triple-triad-reactjs

# Install dependencies
npm install

# Run the app
npm start
```

From here you'll need to create a
[free database](https://www.mongodb.com/cloud/atlas/register) from Mongo DB to
store all your data.

Once you've created your database, create a `.env` file inside your server
folder. There you will declare a:

`PORT=` variable. Set this equal to the port you wish to run your local server
on.

`MONGO_URI=` variable. Set this equal to your connection string from your Mongo
datbase.

`JWT_SECRET=` variable. Set this to a long password or generated value of your
choosing.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Credits

Huge thanks to the following content provider:

Character Artwork - AEkashics <https://www.patreon.com/aekashics/posts>

All other non-dependency assets: Dustin Stacy <https://thedustinstacy.com>

## License

The MIT License (MIT)

Copyright (c) 2023 Dustin Stacy
