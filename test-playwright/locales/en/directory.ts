/**
 * UI strings for the QR intercom property directory screen.
 * Values captured live via playwright-cli on 2026-07-19.
 */
export const directory = {
  heading: 'Directory',
  goBack: 'Go back',
  searchLabel: 'Search name / Nombre',
  collapse: 'Collapse',
  text: 'Text',
  call: 'Call',
  endOfDirectory: 'End of directory',
  noResults: 'No results',
  residentUnavailable:
    "The resident isn't available on this intercom. If you know the resident, text them instead.",
  mediaPermissionRequired:
    'To use the directory, allow microphone and camera access in the app settings.',
} as const;
