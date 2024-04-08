<script>
  import Logo from './Logo.svelte'
  import Logotype from './Logotype.svelte'
</script>

<header>
  <a href="/" class="logo">
    <Logo />
    <Logotype />
  </a>
  <nav>
    <a href="https://facebook.com" target="_blank" rel="external">Facebook</a>
    <a href="https://instagram.com" target="_blank" rel="external">Instagram</a>
    <a href="https://linkedin.com" target="_blank" rel="external">Linkedin</a>
  </nav>
  <nav>
    <a href="mailto:info@elephantplay.com" target="_blank" rel="external">info@elephantplay.com</a>
    <a href="tel:1 (877) 854-3319" target="_blank" rel="external">1 (877) 854-3319</a>
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;

    padding: ($base * 0.5) $base;
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
    background-color: $green;

    display: flex;
    align-items: flex-start;
    gap: $base;

    @media (max-width: $mobile) {
      top: auto;
      bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
      padding: $base;
    }

    .logo {
      display: flex;
      align-items: flex-end;
      gap: $base;

      @media (max-width: $mobile) {
        order: 99;
        margin-left: auto;

        :global(svg):last-child {
          position: fixed;
          top: $gap;
          left: 0;
          width: 100%;
        }
      }
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: $base * 0.25;

      a {
        font-size: $base * 0.75;
      }

      &:first-of-type {
        margin-left: auto;

        @media (max-width: $mobile) {
          margin-left: 0;
        }
      }
    }
  }
</style>