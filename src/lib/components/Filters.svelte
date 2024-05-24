<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  const budgets = [
    { value: "0$ - 10 000$", label: "0$ - 10 000$" },
    { value: "10 000$ - 30 000$", label: "10 000$ - 30 000$" },
    { value: "30 000$ - 60 000$", label: "30 000$ - 60 000$" },
    { value: "60 000$ - 90 000$", label: "60 000$ - 90 000$" },
    { value: "90 000$ et plus", label: "90 000$ et +" }
  ]

  const types = [
    { value: "Balancer", label: "Balancer" },
    { value: "Coordination", label: "Coordination" },
    { value: "Courir", label: "Courir" },
    { value: "Équilibre", label: "Équilibre" },
    { value: "Rebondir", label: "Rebondir" },
    { value: "Sauter", label: "Sauter" },
    { value: "Socialisation", label: "Socialisation" },
    { value: "Tourner", label: "Tourner" },
  ]

  const ages = [
    { value: "0-2", label: "0-2 ans" },
    { value: "2-5", label: "2-5 ans" },
    { value: "5-8", label: "5-8 ans" },
    { value: "8-200", label: "8 ans et +" }
  ]

  const surfacesX = [
    { value: "0-2", label: "0-2 mètres" },
    { value: "2-5", label: "2-5 mètres" },
    { value: "5-8", label: "5-8 mètres" },
    { value: "8-200", label: "8 mètres et +" }
  ]

  const surfacesY = [
    { value: "0-2", label: "0-2 mètres" },
    { value: "2-5", label: "2-5 mètres" },
    { value: "5-8", label: "5-8 mètres" },
    { value: "8-200", label: "8 mètres et +" }
  ]

  const heights = [
    { value: "0-2", label: "0-2 mètres" },
    { value: "2-5", label: "2-5 mètres" },
    { value: "5-8", label: "5-8 mètres" },
    { value: "8-200", label: "8 mètres et +" }
  ]
</script>

<form class="flex flex--tight_gapped" on:input={e => {
  const query = new URLSearchParams({
    ...e.currentTarget['budget']?.value ? { budget: e.currentTarget['budget'].value } : {},
    ...e.currentTarget['type']?.value ? { type: e.currentTarget['type'].value } : {},
    ...e.currentTarget['age']?.value ? { age: e.currentTarget['age'].value } : {},
    ...e.currentTarget['x']?.value ? { x: e.currentTarget['x'].value } : {},
    ...e.currentTarget['y']?.value ? { y: e.currentTarget['y'].value } : {},
    ...e.currentTarget['height']?.value ? { height: e.currentTarget['height'].value } : {},
  })
  goto(`?${query.toString()}`)
}}>
  <fieldset class="button button--green">
    Budget
    {#each budgets as { label, value }}
    <label for="budget-{value}">
      {label}
      <input checked={$page.url.searchParams.get('budget') === value} type="radio" id="budget-{value}" name="budget" {value} />
    </label>
    {/each}
  </fieldset>

  <fieldset class="button button--green">
    Type d'activité
    {#each types as { label, value }}
    <label for="type-{value}">
      {label}
      <input checked={$page.url.searchParams.get('type') === value} type="radio" id="type-{value}" name="type" {value} />
    </label>
    {/each}
  </fieldset>

  <fieldset class="button button--green">
    Âge
    {#each ages as { label, value }}
    <label for="age-{value}">
      {label}
      <input checked={$page.url.searchParams.get('age') === value} type="radio" id="age-{value}" name="age" {value} />
    </label>
    {/each}
  </fieldset>

  <fieldset class="button button--green">
    Superficie
    <label>Length</label>
    {#each surfacesX as { label, value }}
    <label for="x-{value}">
      {label}
      <input checked={$page.url.searchParams.get('x') === value} type="radio" id="x-{value}" name="x" {value} />
    </label>
    {/each}
    <label>Breadth</label>
    {#each surfacesY as { label, value }}
    <label for="y-{value}">
      {label}
      <input checked={$page.url.searchParams.get('y') === value} type="radio" id="y-{value}" name="y" {value} />
    </label>
    {/each}
  </fieldset>

  <fieldset class="button button--green">
    Chute
    {#each heights as { label, value }}
    <label for="height-{value}">
      {label}
      <input checked={$page.url.searchParams.get('height') === value} type="radio" id="height-{value}" name="height" {value} />
    </label>
    {/each}
  </fieldset>
</form>

{#if $page.url.searchParams?.size}
<main class="flex flex--tight_gapped">
  {#each Array.from($page.url.searchParams.entries()).map(([key, value]) => ({
    key,
    label: {
      'budget': budgets.find(f => f.value === value)?.label,
      'type': types.find(f => f.value === value)?.label,
      'age': ages.find(f => f.value === value)?.label,
      'x': surfacesX.find(f => f.value === value)?.label,
      'y': surfacesY.find(f => f.value === value)?.label,
      'height': heights.find(f => f.value === value)?.label,
    }[key]
  })) as { key, label }}
  <button on:click={e => {
    const query = new URLSearchParams($page.url.searchParams)
    query.delete(key)
    goto(`?${query.toString()}`)
  }}>{label} <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L1.00004 12" stroke="currentColor" stroke-width="1.35416"/><path d="M12 12L1.00004 1.00004" stroke="currentColor" stroke-width="1.35416"/></svg></button>
  {/each}
</main>
{/if}

<style lang="scss">
  form {
    position: relative;
    z-index: 2;
    
    height: $base * 2;
    overflow: visible;
  }
  
  fieldset.button {
    width: auto;
    cursor: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:hover,
    &:focus,
    &:has(input:focus) {
      color: $green_dark;
      background-color: $white;

      label {
        display: flex;
      }
    }

    label {
      display: none;
      justify-content: space-between;
      gap: $base;
      align-items: center;
      min-width: $base * 10;
      padding-bottom: $base * 0.25;
      border-bottom: 1px solid $grey;

      position: static;
      height: auto;
      pointer-events: all;

      &:first-of-type {
        margin-top: $base * 0.5;
      }

      &:last-child {
        margin-bottom: $base * 0.5;
      }

      &:has(input) {
        cursor: pointer;
      }

      &:has(input):hover,
      &:has(input:focus) {
        border-bottom-color: currentColor;
      }
    }
  }

  main {
    margin-top: $base;
  }
</style>

