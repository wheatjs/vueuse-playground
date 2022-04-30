export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useGamepad } from '@vueuse/core'\nimport Gamepad from './components/Gamepad.vue'\n\nconst { isSupported, gamepads } = useGamepad()\n",
    "templateContent": "\n  <div>\n    <div v-if=\"!isSupported\" flex=\"~ row\" place=\"items-center content-center\" items=\"center\" space=\"x-4\">\n      <carbon-error text=\"5xl\" opacity=\"50\" />\n      <div flex=\"~ col\">\n        <span text=\"2xl\">Gamepad is not supported on this device.</span>\n        <span opacity=\"70\">It seems your device does not support the Gamepad API. Check <a href=\"https://caniuse.com/gamepad\">here</a> for a list supported devices.</span>\n      </div>\n    </div>\n    <div v-else-if=\"gamepads.length === 0\" flex=\"~ row\" place=\"items-center content-center\" items=\"center\" space=\"x-4\">\n      <carbon-game-console text=\"5xl\" opacity=\"50\" />\n      <div flex=\"~ col\">\n        <span text=\"2xl\">No Gamepad Detected</span>\n        <span opacity=\"50\">Ensure your gamepad is connected and press a button to wake it up.</span>\n      </div>\n    </div>\n    <div v-else space=\"y-4\">\n      <Gamepad v-for=\"gamepad in gamepads\" :key=\"gamepad.id\" :gamepad=\"gamepad\" />\n    </div>\n  </div>\n",
    "path": "packages/core/useGamepad/demo.vue"
  },
  {
    "name": "Gamepad.vue",
    "scriptContent": "\nimport { computed } from 'vue-demi'\nimport Item from './Item.vue'\nimport Controller from './Controller.vue'\n\nconst props = defineProps<{ gamepad: Gamepad }>()\n\nconst supportsVibration = computed(() => props.gamepad.hapticActuators.length > 0)\nconst vibrate = () => {\n  if (supportsVibration.value) {\n    const actuator: any = props.gamepad.hapticActuators[0]\n    actuator.playEffect('dual-rumble', {\n      startDelay: 0,\n      duration: 1000,\n      weakMagnitude: 1,\n      strongMagnitude: 1,\n    })\n  }\n}\n",
    "templateContent": "\n  <div\n    bg=\"dark:dark-500 light-100\"\n    shadow=\"~ md\"\n    border=\"rounded\"\n    max-w=\"screen-lg\"\n    mx=\"auto\"\n    overflow=\"hidden\"\n    grid=\"~\"\n    class=\"grid-cols-[2fr,1fr]\"\n  >\n    <div p=\"4\">\n      <div font=\"medium\" text=\"xl\">\n        {{ gamepad.id }}\n      </div>\n\n      <div flex=\"~ row wrap\" gap=\"x-4\" mt=\"4\">\n        <Item label=\"Index\">\n          {{ gamepad.index }}\n        </Item>\n        <Item label=\"Connected\">\n          {{ gamepad.connected }}\n        </Item>\n        <Item label=\"Mapping\">\n          {{ gamepad.mapping || 'N/A' }}\n        </Item>\n        <Item label=\"Timestamp\">\n          {{ gamepad.timestamp.toFixed(0) }}\n        </Item>\n      </div>\n\n      <div font=\"medium\" mt=\"4\">\n        Buttons\n      </div>\n      <div flex=\"~ row wrap\" gap=\"y-4 x-4\" py=\"2\">\n        <Item\n          v-for=\"(button, index) in gamepad.buttons\"\n          :key=\"index\"\n          p=\"x-2 y-1\"\n          border=\"rounded\"\n          bg=\"dark:dark-700 light-500\"\n          :label=\"`B${index}`\"\n        >\n          {{ button.value.toFixed(2) }}\n        </Item>\n      </div>\n\n      <div font=\"medium\" mt=\"4\">\n        Axes\n      </div>\n      <div flex=\"~ row wrap\" gap=\"y-4 x-4\" py=\"2\">\n        <Item\n          v-for=\"(axis, index) in gamepad.axes\"\n          :key=\"index\"\n          p=\"x-2 y-1\"\n          border=\"rounded\"\n          bg=\"dark:dark-700 light-500\"\n          :label=\"`Axis ${index}`\"\n        >\n          {{ axis.toFixed(2) }}\n        </Item>\n      </div>\n\n      <button :disabled=\"!supportsVibration\" @click=\"vibrate\">\n        Vibrate\n      </button>\n    </div>\n    <div flex=\"~ row shrink-none\" place=\"items-center content-center\" p=\"8\" bg=\"dark:dark-900 light-400\">\n      <template v-if=\"gamepad.mapping === 'standard'\">\n        <Controller :gamepad=\"gamepad\" text=\"dark-100 opacity-70 dark:(light-900 opacity-70)\" />\n      </template>\n      <template v-else>\n        <span font-medium text=\"dark:(light-900 opacity-70)\">\n          Unknown Controller Type\n        </span>\n      </template>\n    </div>\n  </div>\n",
    "path": "packages/core/useGamepad/components/Gamepad.vue"
  },
  {
    "name": "Controller.vue",
    "scriptContent": "\nimport { computed, toRefs } from 'vue-demi'\nimport { mapGamepadToXbox360Controller } from '../index'\nconst props = defineProps<{ gamepad: Gamepad }>()\nconst { gamepad } = toRefs(props)\nconst controller = mapGamepadToXbox360Controller(gamepad)\nconst threshold = 0.075\n\nconst isLeftStickActive = computed(() => {\n  if (controller.value)\n    return Math.abs(controller.value?.stick.left.horizontal) > threshold || Math.abs(controller.value?.stick.left.vertical) > threshold\n\n  return false\n})\n\nconst isRightStickActive = computed(() => {\n  if (controller.value)\n    return Math.abs(controller.value?.stick.right.horizontal) > threshold || Math.abs(controller.value?.stick.right.vertical) > threshold\n\n  return false\n})\n",
    "templateContent": "\n  <svg class=\"fill-transparent\" width=\"100%\" height=\"100%\" viewBox=\"0 0 404 309\">\n    <g transform=\"matrix(1,0,0,1,-50.8086,-83.6438)\">\n      <g id=\"path0\" transform=\"matrix(1,0,0,1,52.8068,121.322)\">\n        <path d=\"M124.603,200L275.208,200L283.765,204.454C288.472,206.904 292.575,209.243 292.883,209.652C293.191,210.062 295.844,212.115 298.778,214.215C303.722,217.753 325.923,239.273 336.093,250.386C348.994,264.484 358.283,270.225 364.791,268.122C384.435,261.775 396.206,246.336 399.096,223.126C400.356,213 399.613,185.537 397.868,177.774C397.306,175.271 396.027,169.536 395.027,165.027C391.933,151.086 387.247,135.583 377.519,107.104C374.747,98.989 366.626,75.41 364.382,69.399C357.9,52.035 353.003,32.638 347.705,27.135C342.534,21.764 54.661,21.764 49.49,27.135C44.192,32.638 41.911,52.035 35.429,69.399C33.185,75.41 25.064,98.989 22.292,107.104C12.564,135.583 7.878,151.086 4.784,165.027C3.784,169.536 2.505,175.271 1.943,177.774C0.198,185.537 -0.545,213 0.715,223.126C3.605,246.336 15.376,261.775 35.02,268.122C41.528,270.225 50.817,264.484 63.718,250.386C73.888,239.273 96.089,217.753 101.033,214.215C103.967,212.115 106.62,210.062 106.928,209.652C107.236,209.243 111.339,206.904 116.046,204.454L124.603,200Z\" style=\"fill:none;stroke:currentColor;stroke-width:4.17px;\" />\n      </g>\n      <g transform=\"matrix(0.707107,-0.707107,0.707107,0.707107,-39.0605,310.248)\">\n        <g id=\"x\" transform=\"matrix(1.23827,0,0,1.35378,-87.498,-88.0679)\">\n          <path :class=\"{ 'active-control': controller?.buttons.x.pressed }\" d=\"M354.907,196.001C345.094,196.001 337.14,203.277 337.14,212.252L354.907,212.252L354.907,196.001Z\" style=\"stroke:currentColor;stroke-width:2.57px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n        </g>\n        <g id=\"a\" transform=\"matrix(7.58222e-17,-1.23827,1.35378,8.28952e-17,64.6304,644.745)\">\n          <path :class=\"{ 'active-control': controller?.buttons.a.pressed }\" d=\"M354.907,196.001C345.094,196.001 337.14,203.277 337.14,212.252L354.907,212.252L354.907,196.001Z\" style=\"stroke:currentColor;stroke-width:2.57px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n        </g>\n        <g id=\"b\" transform=\"matrix(-1.23827,-1.51644e-16,1.6579e-16,-1.35378,797.443,492.617)\">\n          <path :class=\"{ 'active-control': controller?.buttons.b.pressed }\" d=\"M354.907,196.001C345.094,196.001 337.14,203.277 337.14,212.252L354.907,212.252L354.907,196.001Z\" style=\"stroke:currentColor;stroke-width:2.57px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n        </g>\n        <g id=\"y\" transform=\"matrix(-2.27467e-16,1.23827,-1.35378,-2.48686e-16,645.315,-240.196)\">\n          <path :class=\"{ 'active-control': controller?.buttons.y.pressed }\" d=\"M354.907,196.001C345.094,196.001 337.14,203.277 337.14,212.252L354.907,212.252L354.907,196.001Z\" style=\"stroke:currentColor;stroke-width:2.57px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n        </g>\n      </g>\n      <g transform=\"matrix(1.12514,0,0,1.16981,-24.6477,-37.4718)\">\n        <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" style=\"fill:none;\" />\n        <clipPath id=\"_clip1\">\n          <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" />\n        </clipPath>\n        <g clip-path=\"url(#_clip1)\">\n          <g id=\"left-joystick\" transform=\"matrix(1.50628,0,0,1.50219,-76.2512,-107.713)\">\n            <ellipse\n              :cx=\"154.401 + ((controller?.stick.left.horizontal || 0) * 4)\"\n              :cy=\"208.133 + ((controller?.stick.left.vertical || 0) * 4)\"\n              rx=\"15.341\"\n              ry=\"14.796\"\n              class=\"fill-transparent\"\n              :class=\"{ 'active-control': isLeftStickActive }\"\n              style=\"stroke:currentColor;stroke-width:1.81px;stroke-linecap:round;stroke-miterlimit:1.5;\"\n            />\n          </g>\n        </g>\n        <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" style=\"fill:none;stroke:currentColor;stroke-width:2.9px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n      </g>\n      <g>\n        <g id=\"select\" transform=\"matrix(0.36945,-4.30683e-33,-4.30683e-33,0.384118,167.379,123.87)\">\n          <ellipse\n            :class=\"{ 'active-control': controller?.back.pressed }\"\n            cx=\"156.319\"\n            cy=\"204.944\"\n            rx=\"29.774\"\n            ry=\"28.637\"\n            style=\"stroke:currentColor;stroke-width:8.29px;stroke-linecap:round;stroke-miterlimit:1.5;\"\n          />\n        </g>\n        <g id=\"start\" transform=\"matrix(0.36945,-4.30683e-33,-4.30683e-33,0.384118,224.659,123.87)\">\n          <ellipse\n            :class=\"{ 'active-control': controller?.start.pressed }\"\n            cx=\"156.319\"\n            cy=\"204.944\"\n            rx=\"29.774\"\n            ry=\"28.637\"\n            style=\"stroke:currentColor;stroke-width:8.29px;stroke-linecap:round;stroke-miterlimit:1.5;\"\n          />\n        </g>\n      </g>\n      <g transform=\"matrix(1.12514,0,0,1.16981,129.019,24.1131)\">\n        <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" style=\"fill:none;\" />\n        <clipPath id=\"_clip2\">\n          <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" />\n        </clipPath>\n        <g clip-path=\"url(#_clip2)\">\n          <g id=\"right-joystick\" transform=\"matrix(1.50628,0,0,1.50219,-76.2512,-107.713)\">\n            <ellipse\n              :cx=\"154.401 + ((controller?.stick.right.horizontal || 0) * 4)\"\n              :cy=\"208.133 + ((controller?.stick.right.vertical || 0) * 4)\"\n              rx=\"15.341\"\n              ry=\"14.796\"\n              :class=\"{ 'active-control': isRightStickActive }\"\n              style=\"stroke:currentColor;stroke-width:1.81px;stroke-linecap:round;stroke-miterlimit:1.5;\"\n            />\n          </g>\n        </g>\n        <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" style=\"fill:none;stroke:currentColor;stroke-width:2.9px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n      </g>\n      <g transform=\"matrix(1.12514,0,0,1.16981,26.3142,27.0123)\">\n        <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" style=\"fill:none;\" />\n        <clipPath id=\"_clip3\">\n          <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" />\n        </clipPath>\n        <g clip-path=\"url(#_clip3)\">\n          <g id=\"dpad-left\" transform=\"matrix(0.778202,-0.748486,0.850796,0.818307,-304.224,296.899)\">\n            <path :class=\"{ 'active-control': controller?.dpad.left.pressed }\" d=\"M354.907,196.001C345.094,196.001 337.14,203.277 337.14,212.252L354.907,212.252L354.907,196.001Z\" style=\"stroke:currentColor;stroke-width:2.57px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n          </g>\n          <g id=\"dpad-down\" transform=\"matrix(-0.778202,-0.748486,0.850796,-0.818307,251.925,647.9)\">\n            <path :class=\"{ 'active-control': controller?.dpad.down.pressed }\" d=\"M354.907,196.001C345.094,196.001 337.14,203.277 337.14,212.252L354.907,212.252L354.907,196.001Z\" style=\"stroke:currentColor;stroke-width:2.57px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n          </g>\n          <g id=\"dpad-right\" transform=\"matrix(-0.778202,0.748486,-0.850796,-0.818307,616.861,112.988)\">\n            <path :class=\"{ 'active-control': controller?.dpad.right.pressed }\" d=\"M354.907,196.001C345.094,196.001 337.14,203.277 337.14,212.252L354.907,212.252L354.907,196.001Z\" style=\"stroke:currentColor;stroke-width:2.57px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n          </g>\n          <g id=\"dpad-up\" transform=\"matrix(0.778202,0.748486,-0.850796,0.818307,60.7122,-238.013)\">\n            <path :class=\"{ 'active-control': controller?.dpad.up.pressed }\" d=\"M354.907,196.001C345.094,196.001 337.14,203.277 337.14,212.252L354.907,212.252L354.907,196.001Z\" style=\"stroke:currentColor;stroke-width:2.57px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n          </g>\n        </g>\n        <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" style=\"fill:none;stroke:currentColor;stroke-width:2.9px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n      </g>\n      <g transform=\"matrix(1.12514,0,0,1.16981,179.092,-37.4718)\">\n        <ellipse cx=\"156.319\" cy=\"204.944\" rx=\"29.774\" ry=\"28.637\" style=\"fill:none;stroke:currentColor;stroke-width:2.9px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n      </g>\n      <g>\n        <g>\n          <g id=\"rb\" transform=\"matrix(0.61812,0.0171064,-0.0276642,0.999617,259.736,-3.21975)\">\n            <path :class=\"{ 'active-control': controller?.bumper.right.pressed }\" d=\"M198.988,132.494C198.988,128.797 194.134,125.795 188.155,125.795L141.898,125.795C135.92,125.795 131.066,128.797 131.066,132.494C131.066,136.191 135.92,139.192 141.898,139.192L188.155,139.192C194.134,139.192 198.988,136.191 198.988,132.494Z\" style=\"stroke:currentColor;stroke-width:4.01px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n          </g>\n          <g id=\"rt\" transform=\"matrix(0.716144,0.0198192,-0.0244414,0.883165,143.069,9.76017)\">\n            <path :class=\"{ 'active-control': controller?.triggers.right.pressed }\" d=\"M321.473,92.294C321.473,84.798 313.967,78.712 304.723,78.712C295.478,78.712 287.973,84.798 287.973,92.294L287.973,114.931L321.473,114.931L321.473,92.294Z\" style=\"stroke:currentColor;stroke-width:4.14px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n          </g>\n        </g>\n        <g transform=\"matrix(-1,0,0,1,497.232,0)\">\n          <g id=\"lb\" transform=\"matrix(0.61812,0.0171064,-0.0276642,0.999617,259.736,-3.21975)\">\n            <path :class=\"{ 'active-control': controller?.bumper.left.pressed }\" d=\"M198.988,132.494C198.988,128.797 194.134,125.795 188.155,125.795L141.898,125.795C135.92,125.795 131.066,128.797 131.066,132.494C131.066,136.191 135.92,139.192 141.898,139.192L188.155,139.192C194.134,139.192 198.988,136.191 198.988,132.494Z\" style=\"stroke:currentColor;stroke-width:4.01px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n          </g>\n          <g id=\"lt\" transform=\"matrix(0.716144,0.0198192,-0.0244414,0.883165,143.069,9.76017)\">\n            <path :class=\"{ 'active-control': controller?.triggers.left.pressed }\" d=\"M321.473,92.294C321.473,84.798 313.967,78.712 304.723,78.712C295.478,78.712 287.973,84.798 287.973,92.294L287.973,114.931L321.473,114.931L321.473,92.294Z\" style=\"stroke:currentColor;stroke-width:4.14px;stroke-linecap:round;stroke-miterlimit:1.5;\" />\n          </g>\n        </g>\n      </g>\n    </g>\n  </svg>\n",
    "styleContent": "\n  .active-control {\n    fill: var(--vt-c-brand-active);\n    stroke: var(--vt-c-brand-active) !important;\n  }\n",
    "path": "packages/core/useGamepad/components/Controller.vue"
  },
  {
    "name": "Item.vue",
    "scriptContent": "\ndefineProps<{ label: string }>()\n",
    "templateContent": "\n  <div flex=\"~ col\">\n    <span font=\"medium mono\">\n      <slot />\n    </span>\n    <span font=\"medium\" text=\"sm dark-50 opacity-80 dark:(light-900 opacity-50)\">{{ label }}</span>\n  </div>\n",
    "path": "packages/core/useGamepad/components/Item.vue"
  }
]
