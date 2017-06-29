<p align="center"><img src="https://raw.githubusercontent.com/luiguild/v-bar/master/readme-image.png"></p>

# VBar

The virtual responsive crossbrowser scrollbar component for VueJS 2x

<a href="https://luiguild.github.io/v-bar/">DEMO</a>

## Usage
#### Install
###### Using NPM
``` bash
npm i v-bar
```
###### Using yarn
``` bash
yarn add v-bar
```

#### In your `.vue` component create a class to your wrapper
###### Using SASS
``` vue
<style lang="sass">
    .wrapper
        height: 300px
        width: 300px
</style>
```
###### Simple CSS
``` vue
<style>
    .wrapper {
        height: 300px;
        width: 300px;
    }
</style>
```

#### Include the component in your template
###### Using Pug
``` pug
<template lang="pug">
    v-bar(wrapper="wrapper",
        vBar="",
        vBarInternal="",
        hBar="",
        hBarInternal="")
        //- your content
</template>
```

###### Using Simple HTML
``` vue
<template>
    <v-bar wrapper="wrapper"
        vBar=""
        vBarInternal=""
        hBar=""
        hBarInternal="">
        <!-- your content -->
    </v-bar>
</template>
```

#### Import component
``` vue
<script>
    import VBar from 'v-bar'

    # Declare
    export default {
        components: { VBar }
    }
</script>
```

#### Options
VBar is fully customizable. You can use your CSS classes to make it even more beautiful :)
``` javascript
*required* wrapper=""
*optional* vBar=""
*optional* vBarInternal=""
*optional* hBar=""
*optional* hBarInternal=""
```

## To contribute and make it better
Clone the repo, change what you want and send PR

###### Contributions are always welcome!

## Build Setup
``` bash
# install dependencies
# using NPM
npm install

# using yarn
yarn

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Contributors
#### Luigui Delyer
https://github.com/luiguild

#### Carlo Fragni
https://github.com/carlofragni

#### SoullessWaffle
https://github.com/SoullessWaffle

#### Robbe Clerckx
https://github.com/robbeman

#### antshil
https://github.com/antshil
