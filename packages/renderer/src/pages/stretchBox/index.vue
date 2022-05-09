<script setup lang="ts">
const borderEl = $ref<{
  top?: HTMLDivElement
  right?: HTMLDivElement
  bottom?: HTMLDivElement
  left?: HTMLDivElement
}>({
  top: undefined,
  right: undefined,
  bottom: undefined,
  left: undefined,
})
const containerEl = $ref<HTMLDivElement>(undefined)
let isMousedown = false
const startPos = { x: 0, y: 0, direction: '', width: 0, height: 0 }
onMounted(() => {
  for (const key in borderEl) {
    const el = borderEl[key as 'top' | 'right' | 'bottom' | 'left']
    useEventListener(el, 'mousedown', ({ clientX, clientY }: MouseEvent) => {
      const rect = containerEl.getBoundingClientRect()
      isMousedown = true
      startPos.x = clientX
      startPos.y = clientY
      startPos.direction = key
      startPos.width = rect.width
      startPos.height = rect.height
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
  width: 100,
  height: 100,
})
const { x, y } = $(useMouse())
watch(
  () => {
    return { x, y }
  },
  () => {
    if (!isMousedown)
      return
    const { x: startX, y: startY, direction, width, height } = startPos
    if (['left', 'right'].includes(direction)) {
      let dx = x - startX
      if (direction === 'left')
        dx = ~dx + 1
      containerSize.width = width + dx
    }
    else {
      let dy = y - startY
      if (direction === 'top')
        dy = ~dy + 1
      containerSize.height = height + dy
    }
  },
)

</script>

<template>
  <div
    ref="containerEl" class="container"
    :style="{ width: containerSize.width + 'px', height: containerSize.height + 'px' }"
  >
    <div class="borders">
      <i :ref="(el) => borderEl['top'] = el" class="border-top" />
      <i :ref="(el) => borderEl['right'] = el" class="border-right" />
      <i :ref="(el) => borderEl['bottom'] = el" class="border-bottom" />
      <i :ref="(el) => borderEl['left'] = el" class="border-left" />
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
