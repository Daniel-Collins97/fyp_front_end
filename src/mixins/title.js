const getTitle = (vm) => {
  const { title } = vm.$options;
  let vmTitle;
  if (title) {
    vmTitle = typeof title === 'function'
      ? title.call(vm)
      : title;
  }

  return vmTitle;
};

export default {
  mounted() {
    const title = getTitle(this);
    if (title) {
      this.$nextTick(() => {
        document.title = `${title} — Rugby Sensor Tech`;
      });
    }
  },
};
