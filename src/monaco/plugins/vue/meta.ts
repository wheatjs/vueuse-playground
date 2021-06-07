export const EventModifiers = {
  stop: 'call event.stopPropagation().',
  prevent: 'call event.preventDefault().',
  capture: 'add event listener in capture mode.',
  self: 'only trigger handler if event was dispatched from this element.',
  // {keyAlias}: 'only trigger handler on certain keys.',
  once: 'trigger handler at most once.',
  left: 'only trigger handler for left button mouse events.',
  right: 'only trigger handler for right button mouse events.',
  middle: 'only trigger handler for middle button mouse events.',
  passive: 'attaches a DOM event with { passive: true }.',
}

export const CustomTags = [
  'slot',
]
