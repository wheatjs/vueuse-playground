export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { onClickOutside } from '@vueuse/core'\n\nconst modal = ref(false)\nconst modalRef = ref(null)\n\nonClickOutside(\n  modalRef,\n  (event) => {\n    console.log(event)\n    modal.value = false\n  },\n)\n\nconst dropdown = ref(false)\nconst dropdownRef = ref(null)\n\nonClickOutside(\n  dropdownRef,\n  (event) => {\n    console.log(event)\n    dropdown.value = false\n  },\n)",
    "template": "<button @click=\"modal = true\">\n    Open Modal\n  </button>\n  <div class=\"ml-2 relative inline-block\">\n    <button @click=\"dropdown = true\">\n      Open Dropdown\n    </button>\n    <div\n      v-if=\"dropdown\"\n      ref=\"dropdownRef\"\n      class=\"dropdown-inner\"\n    >\n      Click outside of the dropdown to close it.\n    </div>\n  </div>\n  <div v-if=\"modal\" ref=\"modalRef\" class=\"modal\">\n    <div class=\"inner\">\n      <button class=\"button small\" title=\"Close\" @click=\"modal = false\">\n        𝖷\n      </button>\n      <p class=\"heading\">\n        Demo Modal\n      </p>\n      <p>Click outside of the modal to close it.</p>\n    </div>\n  </div>",
    "style": ".modal {\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 420px;\n  max-width: 100%;\n  z-index: 10;\n}\n.inner {\n  background-color: var(--vt-c-bg);\n  padding: 0.4em 2em;\n  border-radius: 5px;\n  border: 1px solid var(--vt-c-divider-light);\n  box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.1);\n}\n.dropdown-inner {\n  background-color: var(--vt-c-bg);\n  padding: 0.5em;\n  position: absolute;\n  left: 0;\n  border-radius: 5px;\n  border: 1px solid var(--vt-c-divider-light);\n  box-shadow: 2px 2px 5px rgba(10, 10, 10, 0.1);\n}\n.heading {\n  font-weight: bold;\n  font-size: 1.4rem;\n  margin-bottom: 2rem;\n}\n.button {\n  position: absolute;\n  top: -0.9rem;\n  right: -0.5rem;\n  font-weight: bold;\n}"
  }
]
