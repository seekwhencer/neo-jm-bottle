# neo-jm-bottle
Webpack ES6 build pipeline for a three.js stuffed web app.

 
![alt text](../master/public/screenshots/bottler01.png?raw=true "Bottler Screenshot #01")


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

- Create the distribution files in: `/dist`
- Copy it to `/docs` for branch `gh-pages` and modify paths in css

```
npm run build
```

The Difference between the `/dist` and the `/docs` folder are the different url paths in the css files.
The `/docs` folder is only for github pages.

## Configure

As options for the instance:

```javascript    
const options = {
     debug: true,
     target: document.querySelector('body'),
     rotate: 'orbit'
 };

// override the bottler main class  
// with an instance of itself

new BOTTLER(options).then(bottler => {
     window.BOTTLER = bottler;
     console.log('>>> ZACK FEDDICH. BOTTLER READY');
 });
```
## URL parameters

Use all options as url encoded get parameter.
