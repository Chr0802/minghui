<template>
  <div class="footer">
    <div class="links">
      <a href="#" target="_blank">明辉伟业 首页</a>
      <a href="#" target="_blank">
        <a-icon type="github"/>
      </a>
      <a href="https://ant.design/">Ant Design</a>
      <a href="#">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright"/>
      2018 <span>华北电力大学（保定）出品 All Rights Reserved. </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LayoutFooter',
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
  }
</style>