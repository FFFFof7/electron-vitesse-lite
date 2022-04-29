<script setup lang="ts">
const borderEl = $ref<{
  top: HTMLDivElement
  right: HTMLDivElement
  bottom: HTMLDivElement
  left: HTMLDivElement
}>({
  top: null,
  right: null,
  bottom: null,
  left: null,
})
const containerEl = $ref<HTMLDivElement>(null)
let isMousedown = false
const startPos = { x: 0, y: 0, direction: '', width: 0 }
onMounted(() => {
  for (const key in borderEl) {
    const el = borderEl[key]
    useEventListener(el, 'mousedown', ({ clientX, clientY }) => {
      isMousedown = true
      startPos.x = clientX
      startPos.y = clientY
      startPos.direction = key
      startPos.width = containerEl.getBoundingClientRect().width
    })
  }
  useEventListener(window, 'mouseup', () => {
    isMousedown = false
  }, { passive: true })
  useEventListener(window, 'mouseleave', () => {
    isMousedown = false
  }, { passive: true })
})

const containerSize = $ref({
  width: 30,
  height: 0,
})
const { x, y } = $(useMouse())
watch(
  () => {
    return { x, y }
  },
  () => {
    if (!isMousedown)
      return
    const { x: startX, y: startY, direction, width } = startPos
    if (['left', 'right'].includes(direction)) {
      let dx = x - startX
      if (direction === 'left')
        dx = ~dx + 1
      containerSize.width = width + dx
    }
  },
)

</script>

<template>
  <div class="container" :style="{ width: containerSize.width + 'px' }" ref="containerEl">
    <div class="borders">
      <i class="border-top" :ref="(el) => borderEl['top'] = el"></i>
      <i class="border-right" :ref="(el) => borderEl['right'] = el"></i>
      <i class="border-bottom" :ref="(el) => borderEl['bottom'] = el"></i>
      <i class="border-left" :ref="(el) => borderEl['left'] = el"></i>
    </div>
  </div>
</template>
<style lang="less">
@borderWidth: 3px;
@borderColor: red;

.container {
  resize: horizontal;
  width: 300px;
  height: 300px;
  position: relative;
  user-select: none;
  // margin-right:30px;
  // margin-left: 20px;
  margin: 0 auto 30px 30px;
  max-width: unset;

  .borders {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    i {
      position: absolute;
      background-color: @borderColor;
    }

    .border-left,
    .border-right {
      cursor: col-resize;
      width: @borderWidth;
      height: 100%;
    }

    .border-top,
    .border-bottom {
      cursor: row-resize;
      height: @borderWidth;
      width: 100%;
    }

    .border-top {
      top: 0;
    }

    .border-right {
      right: 0;
    }

    .border-bottom {
      bottom: 0;
    }

    .border-left {
      left: 0;
    }

  }

}
</style>
