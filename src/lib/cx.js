// Joins classNames, skipping falsy values — a tiny stand-in for `clsx`,
// sized for how much of it this app actually needs.
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
