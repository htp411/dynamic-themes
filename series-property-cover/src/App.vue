<template>
  <div id="app" :class="theme">
    <main class="container">
      <article class="content">
        <h2>Theme Change Test</h2>
        <h2>一次插入多条</h2>
        <section>次主题色</section>
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
export default {
  name: 'App',
  created() {
    const storageTheme = this.getStorage('theme');
    if (storageTheme) {
      this.theme = `theme-${storageTheme}`;
    }
  },
  data() {
    return {
      theme: 'theme-red',
    };
  },
  methods: {
    getStorage(key) {
      const value = localStorage.getItem(key) || null;
      return value;
    },
    setStorage(key, value) {
      localStorage.setItem(key, value);
    },
    handleChangeTheme({ target }) {
      if (target.nodeName !== 'LI') return;
      const theme = target.className.split(' ')[1];
      this.theme = `theme-${theme}`;
      this.setStorage('theme', theme);
    },
  },
};
</script>

<style lang="scss">
@import '~./assets/scss/app.scss';
</style>
