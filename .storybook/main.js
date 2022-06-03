module.exports = {
  stories: ["../src/**/*.stories.@(ts|js)"],
  addons: ["@storybook/preset-create-react-app", "@storybook/addon-actions", "@storybook/addon-links"],
  core: {
    builder: "webpack5"
  }
};