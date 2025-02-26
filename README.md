<h1 align="center">
Nexus Dawn
</h1>

<p align="center">
  <img alt="GitHub Release" src="https://img.shields.io/github/v/release/dustinstacy/nexus-dawn">
  <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/dustinstacy/nexus-dawn">
  <a href="./#license"><img src="https://img.shields.io/badge/License-MIT-brightgreen"/></a>
</p>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#local-setup">Local Setup</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

---

<div align="center">
<a href="https://nexus-dawn.vercel.app">
<img height='400px' src='https://res.cloudinary.com/dsv7k92lb/image/upload/v1687034760/Nexus%20Dawn/logos/logo_c9eaj0.png' alt='logo'/>
<br/>
nexus-dawn.vercel.app
</a>
</div>



## Description

This web app is a playable card game that allows users to collect and upgrade
cards, construct a deck, and compete in various game modes. Inspired by the
Final Fantasy VIII [minigame](https://finalfantasy.fandom.com/wiki/Triple_Triad)
called Triple Triad. 

## Screenshots

<h4>Home screen</h4>

![home screen](https://res.cloudinary.com/dsv7k92lb/image/upload/v1687034685/Nexus%20Dawn/Screenshots/homeScreen_nliptx.jpg)

<h4>Battle Screen</h4>

![battle screen](https://github.com/dustinstacy/triple-triad-reactjs/assets/70343773/3d7cd26b-8595-49a5-939e-008b1559a87f)

## Local Setup

Step 1: Clone and run the frontend

```bash
# Clone this repository
git clone https://github.com/dustinstacy/nexus-dawn.git

# Go into the repository
cd nexus-dawn

# Install dependencies
npm install

# Run the app
npm run dev
```

Step 2: Clone and run the [backend](https://github.com/dustinstacy/nexus-dawn-backend.git) in a seperate terminal

```bash
# Go back to root directory
cd ..

# Clone nexus-dawn-backend
git clone https://github.com/dustinstacy/nexus-dawn-backend.git

# Go into the server repository
cd nexus-dawn-backend

# Install dependencies
npm install

# Run the server
npm run dev
```

Step 3: Setup your enivornment variables (Mostly optional)

Create a .env file in the root directory of each repository. Starting with the backend:

```bash
# nexus-dawn-backend/.env

# OPTIONAL: By default the server will run on http://localhost:5000
# The port number you want the server to run on
PORT=<number>

# OPTIONAL: By default the frontend will run on http://localhost:3000
# The port number the frontend is running on
CLIENT_PORT=<number>

# NECESSARY: Secret for JWT generation and verification
# The stronger the better for security purposes
JWT_SECRET=<string>
```

Then on the frontend:

```bash
# nexus-dawn/.env

# OPTIONAL: By default this is set to http://localhost:5000 to match the server
# If you updated the server port, update this to the same value
NEXT_PUBLIC_API_BASE_URL=<number>


# OPTIONAL: To test the promo code functionality
NEXT_PUBLIC_PROMO_CODE=<string>
```


## Contributing

Interested in contirbuting? Check out the current [issues](https://github.com/dustinstacy/nexus-dawn/issues) or submit your own idea.

1. Fork it!: `git clone https://github.com/dustinstacy/nexus-dawn.git`
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Credits

Huge thanks to the following content provider:

Character Artwork - AEkashics <https://www.patreon.com/aekashics/posts>

## License

The MIT License (MIT)

