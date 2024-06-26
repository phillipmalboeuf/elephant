<script lang="ts">
  import 'locomotive-scroll/locomotive-scroll.css'
  // import LocomotiveScroll from 'locomotive-scroll'
  import { onDestroy, onMount } from 'svelte'

  let element: HTMLDivElement
  let locomotiveScroll
  onMount(async () => {
    const LocomotiveScroll = (await import('locomotive-scroll')).default
    locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 1,
        duration: 1
      }
    })
  })

  onDestroy(() => {
    locomotiveScroll?.destroy()
  })

  export let speed: number
</script>

<div bind:this={element} data-scroll data-scroll-speed={speed}>
  <slot />
</div>

<style lang="scss">
  div {
    will-change: transform;
  }
</style>