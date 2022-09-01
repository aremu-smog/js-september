# Learn how to build Chrome Extension

### Resources

i. [Chrome Developers Documentation](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

## Notes

- Every extension starts with a `manifest.json`
- Registering a background script, tells the manifest which file to reference and how that file should behave
- When you using a storage, you need to access the storage by adding it to list of permissions
- The UI for extensions can have many form but for this, we will be using a `popup`
- Do not try to do anything `background` related to the DOM in `background.js` as it now uses service worker especially in `manifest_version:3`. If you mistakenly do so and the extension keeps throwing error: i) move all DOM related code to another JS file and use the `<script>` tag to access the code ii) delete the extension and reinstall it.
