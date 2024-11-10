export function isChildOfAnyElement(element: HTMLElement, elements: HTMLElement[]): boolean {
  return elements.some(parent => parent.contains(element));
}
