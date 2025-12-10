import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HOTSPOT_CONFIG, HotspotProduct } from '../data/deskHotspots';
import svgPath from '../assets/houstan_setup_transparent.svg';

interface TooltipPosition {
  x: number;
  y: number;
}

interface DeskSetupProps {
  /** Callback when a hotspot is selected/clicked */
  onSelect?: (productId: string) => void;
  /** ClassName for custom styling */
  className?: string;
}

/**
 * Interactive desk setup component with clickable hotspots
 * Uses inline SVG with direct element ID targeting for hover animations and tooltips
 */
export const DeskSetup: React.FC<DeskSetupProps> = ({ onSelect, className = '' }) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [hoveredProduct, setHoveredProduct] = useState<HotspotProduct | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
  const [activeElementId, setActiveElementId] = useState<string | null>(null);

  // Load SVG content
  useEffect(() => {
    fetch(svgPath)
      .then((response) => response.text())
      .then((svg) => setSvgContent(svg))
      .catch((error) => console.error('Error loading SVG:', error));
  }, []);

  // Setup event listeners for hotspot elements
  useEffect(() => {
    if (!svgContainerRef.current || !svgContent) return;

    const svgElement = svgContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    // Keep Complete-outline visible permanently
    const completeOutline = svgElement.querySelector('#Complete-outline') as SVGElement;
    if (completeOutline) {
      completeOutline.style.stroke = 'white';
      completeOutline.style.strokeWidth = '6px';
      completeOutline.style.fill = 'none';
      completeOutline.style.pointerEvents = 'none'; // Don't interact with it
    }

    const hotspotIds = Object.keys(HOTSPOT_CONFIG);
    const elements: SVGElement[] = [];

    // Find all hotspot elements and store references
    hotspotIds.forEach((id) => {
      // Skip Complete-outline - it should not be interactive
      if (id === 'Complete-outline') return;
      
      const element = svgElement.querySelector(`#${CSS.escape(id)}`) as SVGElement;
      if (element) {
        elements.push(element);
        
        // Store original stroke properties
        const originalStroke = element.getAttribute('stroke') || 'rgb(0,123,255)';
        const originalStrokeWidth = element.getAttribute('stroke-width') || '8px';
        element.dataset.originalStroke = originalStroke;
        element.dataset.originalStrokeWidth = originalStrokeWidth;

        // Make interactive
        element.style.cursor = 'pointer';
        element.style.transition = 'stroke 0.3s ease, stroke-width 0.3s ease';
        
        // For Coffee-Cup and Nothing-headphones, parent doesn't capture events - children do
        // But for Macbook-Outline, we need the parent to capture since it's a group with path + use element
        if (id === 'Coffee-Cup' || id === 'Nothing-headphones') {
          element.style.pointerEvents = 'none';
        } else {
          element.style.pointerEvents = 'all';
        }
        
        // Set initial stroke to be invisible for both the element and any child paths
        element.setAttribute('stroke', 'none');
        element.setAttribute('stroke-width', originalStrokeWidth);
        element.style.stroke = 'none';
        
        // Don't hide fill for Coffee-Cup and Nothing-headphones (they ARE the illustration)
        if (id !== 'Coffee-Cup' && id !== 'Nothing-headphones') {
          element.setAttribute('fill', 'none');
          element.style.fill = 'none';
          element.style.fillOpacity = '0';
        }
        
        // Also hide strokes on child path elements (for groups)
        const childPaths = element.querySelectorAll('path');
        childPaths.forEach((path) => {
          path.setAttribute('stroke', 'none');
          path.style.stroke = 'none';
          path.style.transition = 'stroke 0.3s ease, stroke-width 0.3s ease';
          
          // For Coffee-Cup and Nothing-headphones, child paths are interactive (they ARE the hotspot)
          // For other groups (like Macbook-Outline), child paths should NOT block parent events
          if (id === 'Coffee-Cup' || id === 'Nothing-headphones') {
            path.style.pointerEvents = 'auto';
            path.style.cursor = 'pointer';
          } else {
            // Don't block pointer events - let them bubble to parent
            path.style.pointerEvents = 'all';
          }
          
          // Don't hide fill for Coffee-Cup and Nothing-headphones paths
          if (id !== 'Coffee-Cup' && id !== 'Nothing-headphones') {
            path.setAttribute('fill', 'none');
            path.setAttribute('fill-opacity', '0');
            path.style.fill = 'none';
            path.style.fillOpacity = '0';
          }
        });
        
        // Hide use/image elements (like MacBook screen) by making them invisible
        const childUseElements = element.querySelectorAll('use, image');
        childUseElements.forEach((useEl) => {
          (useEl as SVGElement).style.opacity = '0';
          (useEl as SVGElement).style.pointerEvents = 'none';
        });
      }
    });

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.currentTarget as SVGElement;
      const elementId = target.id;
      const product = HOTSPOT_CONFIG[elementId];
      
      if (product) {
        setHoveredProduct(product);
        setActiveElementId(elementId);
        
        // Use smaller stroke width for tiny elements
        const strokeWidth = elementId === 'smiski-outline' ? '2.5px' : '10px';
        
        // Apply hover stroke animation to element and child paths
        target.setAttribute('stroke', '#027BFF');
        target.setAttribute('stroke-width', strokeWidth);
        target.style.stroke = '#027BFF';
        target.style.strokeWidth = strokeWidth;
        
        const childPaths = target.querySelectorAll('path');
        childPaths.forEach((path) => {
          path.setAttribute('stroke', '#027BFF');
          path.setAttribute('stroke-width', strokeWidth);
          path.style.stroke = '#027BFF';
          path.style.strokeWidth = strokeWidth;
        });
        
        // Animate stroke dash if it's a path
        if (target instanceof SVGPathElement) {
          const pathLength = target.getTotalLength();
          target.style.strokeDasharray = `${pathLength}`;
          target.style.strokeDashoffset = `${pathLength}`;
          target.style.transition = 'stroke-dashoffset 0.6s ease-in-out, stroke 0.3s ease, stroke-width 0.3s ease';
          
          // Trigger animation
          requestAnimationFrame(() => {
            target.style.strokeDashoffset = '0';
          });
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Use clientX/Y for viewport-relative positioning (for fixed tooltip)
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.currentTarget as SVGElement;
      
      // Reset stroke to hidden
      target.setAttribute('stroke', 'none');
      target.setAttribute('stroke-width', target.dataset.originalStrokeWidth || '8px');
      target.style.stroke = 'none';
      
      // Reset child paths
      const childPaths = target.querySelectorAll('path');
      childPaths.forEach((path) => {
        path.setAttribute('stroke', 'none');
        path.style.stroke = 'none';
      });
      
      // Reset dash animation if it's a path
      if (target instanceof SVGPathElement) {
        target.style.strokeDasharray = 'none';
        target.style.strokeDashoffset = '0';
      }
      
      setHoveredProduct(null);
      setActiveElementId(null);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.currentTarget as SVGElement;
      const elementId = target.id;
      
      if (onSelect && elementId) {
        onSelect(elementId);
      }
    };

    // Attach event listeners
    elements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('click', handleClick);
      
      // For Coffee-Cup and Nothing-headphones, also attach to child paths
      const elementId = element.id;
      if (elementId === 'Coffee-Cup' || elementId === 'Nothing-headphones') {
        const childPaths = element.querySelectorAll('path');
        childPaths.forEach((path) => {
          path.addEventListener('mouseenter', (e) => {
            handleMouseEnter({ currentTarget: element } as any);
          });
          path.addEventListener('mousemove', handleMouseMove);
          path.addEventListener('mouseleave', (e) => {
            handleMouseLeave({ currentTarget: element } as any);
          });
          path.addEventListener('click', (e) => {
            handleClick({ currentTarget: element } as any);
          });
        });
      }
    });

    // Cleanup
    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('click', handleClick);
      });
    };
  }, [svgContent, onSelect]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (activeElementId && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (onSelect) {
        onSelect(activeElementId);
      }
    }
  }, [activeElementId, onSelect]);

  return (
    <div 
      ref={svgContainerRef}
      className={`relative w-full ${className}`}
      role="application"
      aria-label="Interactive desk setup"
      onKeyDown={handleKeyDown}
      style={{ overflow: 'visible' }}
    >
      {/* Inline SVG */}
      {svgContent && (
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          className="w-full h-auto"
        />
      )}

      {/* Tooltip - using fixed positioning to escape container bounds */}
      {hoveredProduct && (
        <div
          className="fixed bg-gray-900/95 text-white px-4 py-2 rounded-lg text-sm max-w-xs pointer-events-none transition-opacity duration-150 z-50"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
          role="tooltip"
        >
          {hoveredProduct.name} — {hoveredProduct.description}
        </div>
      )}
    </div>
  );
};

export default DeskSetup;
