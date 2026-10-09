# StrideLab Cloudflare Pages deployment

This source project is designed for Cloudflare Pages **Git integration**, not drag-and-drop upload. The build downloads and packages MediaPipe JS, WASM and the pose model into the hosted site.

1. Create a GitHub repository (e.g. `stridelab`) and upload all files in this folder to the repository root.
2. In Cloudflare dashboard open **Workers & Pages**, create a Pages project, and choose **Import an existing Git repository** (wording may vary).
3. Select the GitHub repository and configure:
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: repository root
   - Node.js: version 20 or later (Cloudflare build environment)
4. Deploy and visit the `*.pages.dev` URL Cloudflare provides.
5. Upload a test MP4 and run analysis. Use browser developer tools Network tab to verify `/stride-engine/vision_bundle.js`, WASM and model return HTTP 200.

## Important limitations

- Deployment requires Cloudflare to be able to download the npm dependency and Google model at build time. If either download is blocked, the build fails rather than deploying a broken engine.
- This is the existing StrideLab analysis prototype. Its 2D measurements and gait-cycle estimates are **not clinically validated**.
- The existing AI report feature uses a direct browser API key. **Do not enter production secrets into a public site.** It needs an authenticated Cloudflare Worker or Pages Function to be production-safe. This package does not claim to include a working AI backend.
- Hosting does not provide user accounts or server-side storage. Video processing stays in the browser; local assessments depend on browser storage.
- Do not put identifiable athlete footage in a public GitHub repository.
