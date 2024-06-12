<script lang="ts">
  import { type EmblaOptionsType, type EmblaCarouselType } from 'embla-carousel'
  import emblaCarouselSvelte, { type EmblaCarouselSvelteType } from 'embla-carousel-svelte'
  import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay'
  import Autoheight from 'embla-carousel-auto-height'
  import { onDestroy, onMount } from 'svelte'

  export let disabled = false
  export let buttons = true
  export let autoheight = true
  export let autoplay = true
  export let dots: number = undefined
  export let slidesPerView = 1

  let options: EmblaOptionsType = { loop: true }
  let plugins = [
    ...autoplay ? [Autoplay({ delay: 2666, stopOnFocusIn: true, stopOnMouseEnter: false, stopOnInteraction: true })] : [],
    ...autoheight ? [Autoheight()] : []
  ]

  export let slider: EmblaCarouselType = undefined
  let active = 0

  onDestroy(() => {
    slider?.destroy()
  })
</script>

{#if !disabled}
<figure class="slider" style:--view={`${100 / slidesPerView}%`} on:emblaInit={(event) => {
  slider = event.detail
  slider.on("select", () => active = slider.selectedScrollSnap())
}} use:emblaCarouselSvelte={{ options, plugins }}>
  <slot />
</figure>

{#if buttons}
<nav>
  <button class="previous" on:click={() => slider.scrollPrev()}><svg width="20" height="20" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L2 11.5L12 22" stroke="currentColor" stroke-width="2"/></svg></button>
  <button class="next" on:click={() => slider.scrollNext()}><svg width="20" height="20" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 22L11 11.5L0.999999 1" stroke="currentColor" stroke-width="2"/></svg></button>
</nav>
{/if}

{#if dots}
<nav class="dots">
  {#each Array(dots) as d, i}
  <button class="dot" class:active={active === i} on:click={() => {
    slider.scrollTo(i)
    // @ts-ignore
    slider.plugins().autoplay.reset()
  }}>{i}</button>
  {/each}
</nav>
{/if}
{:else}
<slot />
{/if}

<style lang="scss">
.slider {
  overflow: hidden;
  // cursor: ew-resize;
  position: relative;
  user-select: none;

  :global(.slider__container) {
    list-style: none;
    display: flex;
    align-items: flex-start;
    transition: height 333ms;
    padding: 0;
  }
    
    :global(.slide) {
      flex: 0 0 var(--view);
      min-width: 0;
    }
} 

nav {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: $base;
  right: $base;
  transform: translateY(-50%);
  pointer-events: none;

  display: flex;
  justify-content: space-between;

  // @media (max-width: $mobile) {
  //   &:not(.dots) {
  //     position: static;
  //     gap: $mobile_base;
  //   }
  // }

  button {
    pointer-events: auto;
    // width: 0;
    display: inline-flex;
    justify-content: center;
    border-radius: 50%;
    padding: $base * 0.5;
  }

  &.dots {
    top: auto;
    left: auto;
    bottom: calc(100% + ($base * 0.5));
    right: $base * 0.5;
    transform: none;

    gap: $base * 0.333;

    button.dot {
      font-size: 0;
      padding: $base * 0.25;
      background-color: $white;

      &.active {
        background-color: $green;
      }
    }
  }
}
</style>