<style lang="sass">
    @import sass/bar

    $vue-logo-height: 110vh
    $vue-logo-width: 70vh

    body,
    html
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        min-height: 100%
        max-height: 100%
        height: 100%
        min-width: 100%
        max-width: 100%
        overflow: hidden
        width: 100%
        margin: 0
        padding: 0
        color: $color2
        background-color: $color1
        +flex(column, n, center, center)

    body
        &::before
            content: ''
            position: absolute
            margin-left: auto
            margin-right: auto
            top: 0
            z-index: 0
            border-top: $vue-logo-height solid $color3
            border-right: $vue-logo-width solid $transparent
            border-bottom: 0 solid $transparent
            border-left: $vue-logo-width solid $transparent

    .is-marginless
        margin: 0

    .component
        height: 100%
        width: 100%
        +flex(column, n, center, center)

        &::before
            content: ''
            position: absolute
            margin-left: auto
            margin-right: auto
            top: 0
            z-index: 0
            border-top: $vue-logo-height / 1.6 solid $color2
            border-right: $vue-logo-width / 1.6 solid $transparent
            border-bottom: 0 solid $transparent
            border-left: $vue-logo-width / 1.6 solid $transparent

        &::after
            content: ''
            position: absolute
            margin-left: auto
            margin-right: auto
            top: 0
            z-index: 0
            border-top: $vue-logo-height / 5.6 solid $color5
            border-right: $vue-logo-width / 5.6 solid $transparent
            border-bottom: 0 solid $transparent
            border-left: $vue-logo-width / 5.6 solid $transparent

        > .icons-group
            z-index: 1

            > .icons
                margin: $pixel-proportion
                font-size: $pixel-proportion * 5
                color: $color1
                opacity: 0.5
                +transition(.2s)

                &:hover
                    opacity: 1

        > .wrapper
            border-radius: $pixel-proportion / 2
            background-color: $color5
            min-height: 430px
            max-height: 430px
            height: 430px
            min-width: 320px
            max-width: 320px
            width: 320px
            z-index: 1
            box-shadow: 0 0 $pixel-proportion $color1

            .verticalBarClass
                background-color: $color4

            .verticalBarInternalClass
                background-color: $color2

            .horizontalBarClass
                background-color: $color4

            .horizontalBarInternalClass
                background-color: $color2

            .container
                position: relative
                width: 320px
                height: 800px
                text-align: center

                > .internal
                    padding: $pixel-proportion * 4
                    +border-box

                    > .title
                        font-size: $pixel-proportion * 10
                        margin: $pixel-proportion * -2

                    > h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    p
                        margin: 0

                    > .logo
                        margin-top: $pixel-proportion * 2

                    > .steps
                        h2
                            margin-top: $pixel-proportion * 2
                            color: $color2

                        h3
                            margin-top: $pixel-proportion * 2
                            color: $color2

                        h4
                            color: $color3
                            margin-top: $pixel-proportion
                            margin-bottom: $pixel-proportion * -1

                        pre
                            width: 100%
                            text-align: left
                            padding: $pixel-proportion
                            border-radius: $pixel-proportion / 2
                            border-style: solid
                            border-width: 1px
                            border-color: $color4
                            background-color: darken($color5, 3%)
                            color: $color2
                            +border-box
</style>

<template lang="pug">
    .component
        v-bar(wrapper="wrapper",
        vBar="verticalBarClass",
        vBarInternal="verticalBarInternalClass",
        hBar="horizontalBarClass",
        hBarInternal="horizontalBarInternalClass")
            .container
                .internal
                    h3.is-marginless Welcome to
                    h1.title.is-marginless VBar
                    h4.is-marginless The virtual responsive crossbrowser scrollbar <br> component for VueJS 2x

                    .steps
                        h2 Usage
                        h3 Install
                        h4 Using NPM
                        code
                            pre npm i v-bar
                        h4 Using yarn
                        code
                            pre yarn add v-bar
                        h3 In your <code>.vue</code> component create a class to your wrapper
                        h4 Using SASS
                        code
                            pre
                                | &lt;style lang="sass"&gt;
                                |     .wrapper
                                |         height: 300px
                                |         width: 300px
                                | &lt;/style&gt;

                        h4 Using Simple CSS
                        code
                            pre
                                | &lt;style&gt;
                                |     .wrapper {
                                |         height: 300px;
                                |         width: 300px;
                                |     }
                                | &lt;/style&gt;

                        h3 Include the component in your template
                        h4 Using Pug
                        code
                            pre
                                | &lt;template lang="pug"&gt;
                                |     v-bar(wrapper="wrapper",
                                |         vBar="",
                                |         vBarInternal="",
                                |         hBar="",
                                |         hBarInternal="")
                                |         ...
                                | &lt;/template&gt;

                        h4 Using Simple HTML
                        code
                            pre
                                | &lt;template&gt;
                                |    &lt;v-bar wrapper="wrapper"
                                |        vBar=""
                                |        vBarInternal=""
                                |        hBar=""
                                |        hBarInternal=""&gt;
                                |        ...
                                |    &lt;/v-bar&gt;
                                | &lt;/template&gt;

                        h4 Import the component
                        code
                            pre
                                | &lt;script&gt;
                                |   import VBar from 'v-bar'

                                |   export default {
                                |       components: { VBar }
                                |   }
                                | &lt;/script&gt;

                        h3 Options
                        h4 VBar is fully customizable. You can use your CSS classes to make it even more beautiful :)
                        code
                            pre
                                | <b>required</b> wrapper=""
                                | <b>optional</b> vBar=""
                                | <b>optional</b> vBarInternal=""
                                | <b>optional</b> hBar=""
                                | <b>optional</b> hBarInternal=""

                        h3 To contribute <br> and make it better
                        h4 Clone the repo,
                        h4 change what you want and
                        h4 send PR

                        h2 Contributions are always welcome!

                        h3 Build Setup
                        h4 Install dependencies
                        h4 Using NPM
                        code
                            pre npm i
                        h4 Using yarn
                        code
                            pre yarn

                        h4 Serve with hot reload at localhost:8080
                        code
                            pre npm run dev

                        h4 build for production with minification
                        code
                            pre npm run build
                        h4 build for production and view the bundle analyzer report
                        code
                            pre npm run build --report

                        h4 Contributors
                        h3 Luigui Delyer
                        h5 https://github.com/luiguild

                        h3 Carlo Fragni
                        h5 https://github.com/carlofragni

                        h3 SoullessWaffle
                        h5 https://github.com/SoullessWaffle
        .icons-group
            a.icons(href="https://github.com/luiguild/v-bar", target="_blank")
                i.fa.fa-github-alt

            a.icons(href="https://twitter.com/luiguild", target="_blank")
                i.fa.fa-twitter
</template>

<script>
import VBar from './components/v-bar.vue'
export default {
    data: () => ({}),
    components: { VBar }
}
</script>
