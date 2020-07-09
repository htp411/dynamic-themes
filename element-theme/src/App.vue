<template>
  <div id="app" :class="[theme]">
    <main class="container" :style="{ 'background-color': primaryColor }">
      <article class="content" :style="{'color': colors.lightBackground }">
        <h2>Theme Change Test</h2>
        <h2>Element 插入style标签</h2>
        <section :style="{ 'background-color': colors.secondary }">次主题色</section>
      </article>
      <ul class="theme-list" @click="handleChangeTheme">
        <li class="theme-item blue"></li>
        <li class="theme-item red"></li>
        <li class="theme-item yellow"></li>
      </ul>
    </main>
  </div>
</template>

<script>
import getFile from './utils/api';
import generateColors from './utils/color';

export default {
  name: 'App',
  created() {
    const storageTheme = this.getStorage('theme');
    if (storageTheme) {
      this.theme = storageTheme;
    }
    // 初始化样式后渲染上次记住的主题，但由于有异步请求，页面会有很明显的抖动
    this.getIndexStyle().then(() => {
      this.changeTheme(this.theme);
    });
    // this.getSeparatedStyles();
  },

  mounted() {
    this.$nextTick(() => {
      this.originalStylesheetCount = document.styleSheets.length;
    });
  },

  data() {
    return {
      theme: 'red',
      originalStyle: '',
      originalStylesheetCount: -1,
      styleFiles: [],
      primaryColor: '#ec7259',
      colors: {
        primary: '#ec7259',
      },
    };
  },
  /* eslint-disable */
  methods: {
    getIndexStyle() {
      return getFile(
        '//unpkg.com/element-ui@1.4/lib/theme-default/index.css',
      ).then(({ data }) => {
        this.originalStyle = this.getStyleTemplate(data);
        // console.log('this.originalStyle', this.originalStyle);
      });
    },
    getStorage(key) {
      const value = localStorage.getItem(key);
      return value ? value : null;
    },
    setStorage(key, value) {
      localStorage.setItem(key, value);
    },
    changeTheme(theme) {
      const colorMap = {
        red: '#ec7259',
        blue: '#20a0ff',
        yellow: '#fbd007',
      };
      this.theme = theme;

      this.colors.primary = colorMap[theme];
      this.primaryColor = this.colors.primary;
      this.colors = Object.assign(
        {},
        this.colors,
        generateColors(this.colors.primary),
      );
      this.canDownload = true;
      this.writeNewStyle();

      this.setStorage('theme', theme);
    },
    handleChangeTheme({ target }) {
      if (target.nodeName !== 'LI') return;
      const theme = target.className.split(' ')[1];
      this.changeTheme(theme);
    },

    getStyleTemplate(data) {
      const colorMap = {
        '#20a0ff': 'primary',
        '#0190fe': 'secondary',
        '#fbfdff': 'darkWhite',
        '#1f2d3d': 'baseBlack',
        '#324157': 'lightBlack',
        '#48576a': 'extraLightBlack',
        '#8391a5': 'baseSilver',
        '#97a8be': 'lightSilver',
        '#bfcbd9': 'extraLightSilver',
        '#d1dbe5': 'baseGray',
        '#e4e8f1': 'lightGray',
        '#eef1f6': 'extraLightGray',
        '#1d90e6': 'buttonActive',
        '#4db3ff': 'buttonHover',
        '#dfe6ec': 'tableBorder',
        '#d2ecff': 'datepickerInRange',
        '#afddff': 'datepickerInRangeHover',
        '#1c8de0': 'selectOptionSelected',
        '#edf7ff': 'lightBackground',
      };
      Object.keys(colorMap).forEach((key) => {
        const value = colorMap[key];
        // eslint-disable-next-line no-param-reassign
        data = data.replace(new RegExp(key, 'ig'), value);
      });
      return data;
    },

    // getSeparatedStyles() {
    //   return getFile('//unpkg.com/element-ui@1.4/lib/theme-default/')
    //     .then(({ data }) => {
    //       return data
    //         .match(/href="[\w-]+\.css"/g)
    //         .map((str) => str.split('"')[1]);
    //     })
    //     .then((styleFiles) => {
    //       return Promise.all(
    //         styleFiles.map((file) => {
    //           return getFile(
    //             `//unpkg.com/element-ui@1.4/lib/theme-default/${file}`,
    //           );
    //         }),
    //       );
    //     })
    //     .then((files) => {
    //       this.styleFiles = files.map((file) => {
    //         return {
    //           name: file.url,
    //           data: this.getStyleTemplate(file.data),
    //         };
    //       });
    //     });
    // },

    writeNewStyle() {
      let cssText = this.originalStyle;
      Object.keys(this.colors).forEach((key) => {
        cssText = cssText.replace(
          new RegExp('(:|\\s+)' + key, 'g'),
          '$1' + this.colors[key],
        );
      });
      if (this.originalStylesheetCount === document.styleSheets.length) {
        const style = document.createElement('style');
        style.innerText = cssText;
        document.head.appendChild(style);
      } else {
        document.head.lastChild.innerText = cssText;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~./assets/scss/app.scss';
</style>
