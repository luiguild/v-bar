<template>
  <div class="component">
    <v-bar
      wrapper="wrapper"
      vBar="verticalBarClass"
      vBarInternal="verticalBarInternalClass"
      hBar="horizontalBarClass"
      hBarInternal="horizontalBarInternalClass"
    >
      <div class="container">
        <div class="internal">
          <h3 class="is-marginless">Welcome to</h3>
          <h1 class="title is-marginless">VBar</h1>
          <h4 class="is-marginless">
            The virtual responsive crossbrowser scrollbar <br />
            component for VueJS 2x
          </h4>
          <div class="steps">
            <h2>Usage</h2>
            <h3>Install</h3>
            <h4>Using NPM</h4>
            <code><pre>npm i v-bar</pre></code>
            <h4>Using yarn</h4>
            <code><pre>yarn add v-bar</pre></code>
            <h3>
              In your <code>.vue</code> component create a class to your wrapper
            </h3>
            <h4>Using SCSS</h4>
            <code>
              <pre>
                &lt;style lang="scss"&gt;
                .wrapper {
                  height: 300px;
                  width: 300px;
                }
                &lt;/style&gt;
              </pre>
            </code>
            <h4>Using Simple CSS</h4>
            <code>
              <pre>
              &lt;style&gt;
                  .wrapper {
                      height: 300px;
                      width: 300px;
                  }
              &lt;/style&gt;
            </pre
              >
            </code>
            <h3>Include the component in your template</h3>

            <code>
              <pre>
              &lt;template&gt;
                &lt;v-bar wrapper="wrapper"
                    vBar=""
                    vBarInternal=""
                    hBar=""
                    hBarInternal=""&gt;
                    ...
                &lt;/v-bar&gt;
              &lt;/template&gt;
            </pre
              >
            </code>
            <h4>Import the component</h4>
            <code>
              <pre>
              &lt;script&gt;
                import VBar from 'v-bar'
                export default {
                    components: { VBar }
                }
              &lt;/script&gt;
            </pre
              >
            </code>
            <h3>Options</h3>
            <h4>
              VBar is fully customizable. You can use your CSS classes to make
              it even more beautiful :)
            </h4>
            <code>
              <pre>
              <b>required</b> wrapper=""
              <b>optional</b> vBar=""
              <b>optional</b> vBarInternal=""
              <b>optional</b> hBar=""
              <b>optional</b> hBarInternal=""
            </pre
              >
            </code>
            <h3>
              To contribute <br />
              and make it better
            </h3>
            <h4>Clone the repo, change what you want and, send PR</h4>

            <h2>Contributions are always welcome!</h2>

            <h3>Build Setup</h3>
            <h4>Install dependencies</h4>

            <h5>Using NPM</h5>
            <code><pre>npm i</pre></code>

            <h5>Using yarn</h5>
            <code><pre>yarn</pre></code>

            <h4>Serve with hot reload at localhost:8080</h4>
            <code><pre>npm run dev</pre></code>

            <h4>build for production with minification</h4>
            <code><pre>npm run build</pre></code>

            <h4>build for production and view the bundle analyzer report</h4>
            <code><pre>npm run build --report</pre></code>

            <h4>Contributors</h4>

            <h3>Luigui Delyer</h3>
            <h5>https://github.com/luiguild</h5>

            <h3>Carlo Fragni</h3>
            <h5>https://github.com/carlofragni</h5>

            <h3>SoullessWaffle</h3>
            <h5>https://github.com/SoullessWaffle</h5>

            <h3>Robbe Clerckx</h3>
            <h5>https://github.com/robbeman</h5>

            <h3>antshil</h3>
            <h5>https://github.com/antshil</h5>
          </div>
        </div>
      </div>
    </v-bar>
    <div class="icons-group">
      <a class="icons" href="https://github.com/luiguild/v-bar" target="_blank"
        ><i class="fa fa-github-alt"></i></a
      ><a class="icons" href="https://twitter.com/luiguild" target="_blank"
        ><i class="fa fa-twitter"></i
      ></a>
    </div>
  </div>
</template>

<script>
import VBar from './components/v-bar.vue';
export default {
  data: () => ({}),
  components: { VBar }
};
</script>

<style lang="scss" scoped>
@import 'sass/bar.scss';

$vue-logo-height: 110vh;
$vue-logo-width: 70vh;

body,
html {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  max-height: 100%;
  height: 100%;
  min-width: 100%;
  max-width: 100%;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
  color: $color2;
  background-color: $color1;
  @include flex(column, n, center, center);
}

body {
  &::before {
    content: '';
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    z-index: 0;
    border-top: $vue-logo-height solid $color3;
    border-right: $vue-logo-width solid $transparent;
    border-bottom: 0 solid $transparent;
    border-left: $vue-logo-width solid $transparent;
  }
}

.is-marginless {
  margin: 0;
}

.component {
  height: 100%;
  width: 100%;
  @include flex(column, n, center, center);

  &::before {
    content: '';
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    z-index: 0;
    border-top: $vue-logo-height / 1.6 solid $color2;
    border-right: $vue-logo-width / 1.6 solid $transparent;
    border-bottom: 0 solid $transparent;
    border-left: $vue-logo-width / 1.6 solid $transparent;
  }

  &::after {
    content: '';
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    z-index: 0;
    border-top: $vue-logo-height / 5.6 solid $color5;
    border-right: $vue-logo-width / 5.6 solid $transparent;
    border-bottom: 0 solid $transparent;
    border-left: $vue-logo-width / 5.6 solid $transparent;
  }

  > .icons-group {
    z-index: 1;

    > .icons {
      margin: $pixel-proportion;
      font-size: $pixel-proportion * 5;
      color: $color1;
      opacity: 0.5;
      @include transition(0.2s);

      &:hover {
        opacity: 1;
      }
    }
  }

  > .wrapper {
    border-radius: $pixel-proportion / 2;
    background-color: $color5;
    min-height: 430px;
    max-height: 430px;
    height: 430px;
    min-width: 320px;
    max-width: 320px;
    width: 320px;
    z-index: 1;
    box-shadow: 0 0 $pixel-proportion $color1;

    .verticalBarClass {
      background-color: $color4;
    }

    .verticalBarInternalClass {
      background-color: $color2;
    }

    .horizontalBarClass {
      background-color: $color4;
    }

    .horizontalBarInternalClass {
      background-color: $color2;
    }

    .container {
      position: relative;
      width: 320px;
      height: 800px;
      text-align: center;

      > .internal {
        padding: $pixel-proportion * 4;
        @include border-box;

        > .title {
          font-size: $pixel-proportion * 10;
          margin: $pixel-proportion * -2;
        }

        > h1,
        h2,
        h3,
        h4,
        h5,
        p {
          margin: 0;
        }

        > .logo {
          margin-top: $pixel-proportion * 2;
        }

        > .steps {
          h2 {
            margin-top: $pixel-proportion * 2;
            color: $color2;
          }

          h3 {
            margin-top: $pixel-proportion * 2;
            color: $color2;
          }

          h4 {
            color: $color3;
            margin-top: $pixel-proportion;
            margin-bottom: $pixel-proportion * -1;
          }

          pre {
            width: 100%;
            text-align: left;
            padding: $pixel-proportion;
            border-radius: $pixel-proportion / 2;
            border-style: solid;
            border-width: 1px;
            border-color: $color4;
            background-color: darken($color5, 3%);
            color: $color2;
            @include border-box;
          }
        }
      }
    }
  }
}
</style>
