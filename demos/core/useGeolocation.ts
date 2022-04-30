export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useGeolocation } from '@vueuse/core'\n\nconst { coords, locatedAt, error } = useGeolocation()\n",
    "templateContent": "\n  <pre lang=\"json\">{{\n    JSON.stringify(\n      {\n        coords: {\n          accuracy: coords.accuracy,\n          latitude: coords.latitude,\n          longitude: coords.longitude,\n          altitude: coords.altitude,\n          altitudeAccuracy: coords.altitudeAccuracy,\n          heading: coords.heading,\n          speed: coords.speed,\n        },\n        locatedAt,\n        error: error ? error.message : error,\n      },\n      null,\n      2\n    )\n  }}</pre>\n",
    "path": "packages/core/useGeolocation/demo.vue"
  }
]
