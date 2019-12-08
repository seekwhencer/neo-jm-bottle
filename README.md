# neo-jw-bottle
Webpack ES6 build pipeline for three.js stuffed web app.

## Usage

#### 1. install

Node 12 needed.

```
git clone https://github.com/seekwhencer/neo-jm-bottle.git
cd neo-jm-bottle
npm install
```

#### 2. start local dev server

Open the url: **[http://localhost:8000](http://localhost:8000)**

```
npm run dev
```

#### 3. make build

Create some distribution files in: `/dist` and copy it to `/docs`  

```
npm run build
```

The Difference between the `/dist` and the `/docs` folder are the different url paths in the css files.
The `/docs` folder is only for github pages.

