<template>
  <slot v-if="showing"></slot>
  <div
    v-show="!showing"
    ref="placeholderRef"
    :class="placeholderClass"
    :style="placeholderStyle"
  >
    <slot v-if="!showing" name="placeholder"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { type StyleValue, watch } from "vue";
import type { IObserver } from "./observer";
import { defaultObserver } from "./observer";

const props = withDefaults(
  defineProps<{
    delay?: number;
    disabled?: boolean;
    placeholderClass?: any;
    placeholderStyle?: StyleValue;
    beforeSetShowing?: any;
    observer?: IObserver;
  }>(),
  {
    delay: 0,
    disabled: false,
    placeholderClass: undefined,
    placeholderStyle: null,
    beforeSetShowing: undefined,
    observer: undefined,
  }
);

const showing = ref(props.disabled);
const placeholderRef = ref<HTMLDivElement>();

const _observer = props.observer || defaultObserver;

function setShowing(value: boolean, info?: { entry: IntersectionObserverEntry }) {
  let _value = value;

  const beforeSetShowingResult = props.beforeSetShowing?.(value, info);

  if (typeof beforeSetShowingResult === "boolean") {
    _value = beforeSetShowingResult;
  }

  showing.value = _value;
}

function observe() {
  if (!placeholderRef.value) {
    console.warn("[vue-lazy-loading] observe failed, placeholderRef is null");
    return;
  }

  _observer.observe({
    placeholder: placeholderRef.value,
    delay: props.delay,
    setShowing,
  });
}

function unobserve() {
  if (!placeholderRef.value) {
    console.warn("[vue-lazy-loading] unobserve failed, placeholderRef is null");
    return;
  }

  _observer.unobserve({
    placeholder: placeholderRef.value,
  });
}

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      unobserve();
      setShowing(true);
    } else {
      observe();
    }
  }
);

onMounted(() => {
  if (props.disabled) {
    return;
  }

  observe();
});

onBeforeUnmount(() => {
  unobserve();
});
</script>
