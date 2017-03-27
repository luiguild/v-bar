<p align="center"><img src="https://raw.githubusercontent.com/luiguild/v-bar/master/readme-image.png"></p>

# VBar

A virtual scrollbar component for VueJS 2x

## Usage
#### Install
``` bash
# Using NPM
npm i v-bar

# Using yarn
yarn add v-bar
```

#### In your `.vue` component
``` vue
<style>
    # Create one class to your wrapper
    # Using SASS
    .wrapper
        height: 300px
        width: 300px

    # Using pure CSS
    .wrapper {
        height: 300px;
        width: 300px;
    }
</style>

<template>
    # Include the component in your template
    # Using PUG lang
    v-bar(wrapperClass="",
        verticalBarClass="",
        verticalBarInternalClass="",
        horizontalBarClass="",
        horizontalBarInternalClass="")
        # Your content
        ...

    # Using HTML
    <v-bar wrapperClass=""
        verticalBarClass=""
        verticalBarInternalClass=""
        horizontalBarClass=""
        horizontalBarInternalClass="">
        # Your content
        ...
    </v-bar>
</template>

<script>
    # Import component
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
{ String } *required* wrapperClass=""
{ String } *optional* verticalBarClass=""
{ String } *optional* verticalBarInternalClass=""
{ String } *optional* horizontalBarClass=""
{ String } *optional* horizontalBarInternalClass=""
```

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

## To contribute and make it better
Clone/fork the repo
<br>Change what you want
<br>Send PR

###### Contributions are always welcome!

## Special thanks!
Carlo Fragni https://github.com/carlofragni
