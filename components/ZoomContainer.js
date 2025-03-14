import React, { useEffect, useState } from "react"
import { useSvg } from "./Stage"
const d3 = require('d3');

export function ZoomContainer({ children }) {
  const svgElement = useSvg()
  const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 })

  useEffect(() => {
    if (!svgElement) return
    const selection = d3.select(svgElement)
    const zoom = d3.zoom().on("zoom", function() {
      setTransform(d3.event.transform)
    })
    selection.call(zoom)
    return () => selection.on(".zoom", null)
  }, [svgElement])

  return <g transform={`translate(${x}, ${y}) scale(${k})`}>{children}</g>
}