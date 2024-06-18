<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { i18n } from '$lib/i18n'
  import { languageTag } from '$lib/paraglide/runtime'

  const locale = languageTag()

  const budgets = [
    { value: "0$ - 10 000$", label: "0$ - 10 000$" },
    { value: "10 000$ - 30 000$", label: "10 000$ - 30 000$" },
    { value: "30 000$ - 60 000$", label: "30 000$ - 60 000$" },
    { value: "60 000$ - 90 000$", label: "60 000$ - 90 000$" },
    { value: "90 000$ et plus", label: locale === 'fr' ? "90 000$ et plus" : "90 000$ +" }
  ]

  const types = [
    {value: "Lancer", label: locale === 'fr' ? "Lancer" : "Throw"},
    {value: "Glisser", label: locale === 'fr' ? "Glisser" : "Slide"},
    {value: "Socialiser", label: locale === 'fr' ? "Socialiser" : "Socialize"},
    {value: "Jeux cognitif", label: locale === 'fr' ? "Jeux cognitif" : "Pretend play"},
    {value: "Sauter", label: locale === 'fr' ? "Sauter" : "Jump"},
    {value: "Courir", label: locale === 'fr' ? "Courir" : "Run"},
    {value: "Se suspendre", label: locale === 'fr' ? "Se suspendre" : "Hang"},
    {value: "Coordination", label: locale === 'fr' ? "Coordination" : "Coordination"},
    {value: "Balancer", label: locale === 'fr' ? "Balancer" : "Swing"},
    {value: "Rebondir", label: locale === 'fr' ? "Rebondir" : "Bounce"},
    {value: "Équilibre", label: locale === 'fr' ? "Équilibre" : "Balance"},
    {value: "Grimper", label: locale === 'fr' ? "Grimper" : "Climb"},
    {value: "Tourner", label: locale === 'fr' ? "Tourner" : "Rotating"},
  ]

  const ages = [
    { value: "0-2", label: locale === 'fr' ? "0-2 ans" : "0-2 years old" },
    { value: "2-5", label: locale === 'fr' ? "2-5 ans" : "2-5 years old" },
    { value: "5-12", label: locale === 'fr' ? "5-12 ans" : "5-12 years old" },
    { value: "12-200", label: locale === 'fr' ? "12 ans et plus" : "12 years old +" },
  ]

  const surfacesX = [
    { value: "0-2", label: locale === 'fr' ? "0-2 mètres" : locale === 'en-US' ? "0-2 feet" : "0-2 meters" },
    { value: "2-5", label: locale === 'fr' ? "2-5 mètres" : locale === 'en-US' ? "2-5 feet" : "2-5 meters" },
    { value: "5-8", label: locale === 'fr' ? "5-8 mètres" : locale === 'en-US' ? "5-8 feet" : "5-8 meters" },
    { value: "8-200", label: locale === 'fr' ? "8 mètres et plus" : locale === 'en-US' ? "8 feet +" : "8 meters +" },
  ]

  const surfacesY = [
    { value: "0-2", label: locale === 'fr' ? "0-2 mètres" : locale === 'en-US' ? "0-2 feet" : "0-2 meters" },
    { value: "2-5", label: locale === 'fr' ? "2-5 mètres" : locale === 'en-US' ? "2-5 feet" : "2-5 meters" },
    { value: "5-8", label: locale === 'fr' ? "5-8 mètres" : locale === 'en-US' ? "5-8 feet" : "5-8 meters" },
    { value: "8-200", label: locale === 'fr' ? "8 mètres et plus" : locale === 'en-US' ? "8 feet +" : "8 meters +" },
  ]

  const heights = [
    { value: "0-2", label: locale === 'fr' ? "0-2 mètres" : locale === 'en-US' ? "0-2 feet" : "0-2 meters" },
    { value: "2-5", label: locale === 'fr' ? "2-5 mètres" : locale === 'en-US' ? "2-5 feet" : "2-5 meters" },
    { value: "5-8", label: locale === 'fr' ? "5-8 mètres" : locale === 'en-US' ? "5-8 feet" : "5-8 meters" },
    { value: "8-200", label: locale === 'fr' ? "8 mètres et plus" : locale === 'en-US' ? "8 feet +" : "8 meters +" },
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
  goto(i18n.resolveRoute(`/products?${query.toString()}`))
}}>
  <fieldset class="button button--green">
    {locale === 'fr' ? 'Budget' : 'Budget'}
    {#each budgets as { label, value }}
    <label for="budget-{value}">
      {label}
      <input checked={$page.url.searchParams.get('budget') === value} type="radio" id="budget-{value}" name="budget" {value} />
    </label>
    {/each}
  </fieldset>

  <fieldset class="button button--green">
    {locale === 'fr' ? 'Type d\'activité' : 'Activity type'}
    {#each types as { label, value }}
    <label for="type-{value}">
      {label}
      <input checked={$page.url.searchParams.get('type') === value} type="radio" id="type-{value}" name="type" {value} />
    </label>
    {/each}
  </fieldset>

  <fieldset class="button button--green">
    {locale === 'fr' ? 'Âge' : 'Age'}
    {#each ages as { label, value }}
    <label for="age-{value}">
      {label}
      <input checked={$page.url.searchParams.get('age') === value} type="radio" id="age-{value}" name="age" {value} />
    </label>
    {/each}
  </fieldset>

  <fieldset class="button button--green">
    {locale === 'fr' ? 'Surfaces' : 'Surfaces'}
    <label>{locale === 'fr' ? 'Largeur' : 'Width'}</label>
    {#each surfacesX as { label, value }}
    <label for="x-{value}">
      {label}
      <input checked={$page.url.searchParams.get('x') === value} type="radio" id="x-{value}" name="x" {value} />
    </label>
    {/each}
    <label>{locale === 'fr' ? 'Longueur' : 'Length'}</label>
    {#each surfacesY as { label, value }}
    <label for="y-{value}">
      {label}
      <input checked={$page.url.searchParams.get('y') === value} type="radio" id="y-{value}" name="y" {value} />
    </label>
    {/each}
  </fieldset>

  <fieldset class="button button--green">
    {locale === 'fr' ? 'Chute' : 'Fall height'}
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
    goto(i18n.resolveRoute(`/products?${query.toString()}`))
  }}>{label} <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L1.00004 12" stroke="currentColor" stroke-width="1.35416"/><path d="M12 12L1.00004 1.00004" stroke="currentColor" stroke-width="1.35416"/></svg></button>
  {/each}
</main>
{:else if $page.data.collections}
<main class="flex flex--tight_gapped">
  <a href="/products" class="button" class:button--green={!$page.data.collection}>Series</a>
  {#each $page.data.collections.filter(c => !['popular'].includes(c.fields.id)) as collection}
  <a href="/collections/{collection.fields.id}" class="button" class:button--green={collection.fields.id === $page.data.collection?.fields.id}>{collection.fields.title.replace(' Series', '')}</a>
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

