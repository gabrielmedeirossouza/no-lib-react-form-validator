import React from 'react'

export function useClickedOutside(callback: () => void) {
  const elementRef = React.useRef<HTMLDivElement>(null)

  function onClick(event: MouseEvent) {
    if (!elementRef.current) return

    const intersectedElementOnClick = elementRef.current.contains(event.target as Node)
    if (intersectedElementOnClick) return

    callback();
  }

  React.useEffect(() => {
    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick)
  }, [])

  return elementRef
}