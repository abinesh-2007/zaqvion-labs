# Image assets

Project images are centrally mapped in `lib/projects.ts`. Replace one of the existing JPG files in `public/images/hardware/` or `public/images/software/` to update that project everywhere it is used.

Service visuals are centrally mapped in `lib/site-images.ts` and are intentionally separate from project photography.

## Category images

The homepage uses these distinct, non-project category assets:

- `public/images/categories/hardware-engineering.jpg` — a real agricultural/electronics engineering scene.
- `public/images/categories/software-systems.jpg` — a real software dashboard or application-workspace scene.

Their matching `available` fields are enabled in `lib/site-images.ts`. If you replace either image, retain its filename or update the single corresponding configuration entry. This prevents accidental reuse of a project photo as generic category art.
