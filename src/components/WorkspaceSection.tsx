import { useEffect, useRef, useState } from "react";
import houstonSetup from "@/assets/houston-setup.png";

const WorkspaceSection = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    const tooltip = tooltipRef.current;
    if (!svg || !tooltip) return;

    const hotspots = svg.querySelectorAll(".hotspot");

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as SVGElement;
      const label = target.dataset.label || "";
      if (!label) return;
      setTooltipContent(label);
      setTooltipVisible(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTooltipPosition({ x: x + 12, y: y + 12 });
    };

    const handleMouseLeave = () => {
      setTooltipVisible(false);
    };

    const handleFocus = (e: Event) => {
      const target = e.currentTarget as SVGElement;
      const label = target.dataset.label || "";
      if (!label) return;
      setTooltipContent(label);
      setTooltipVisible(true);
      
      // Position tooltip near the focused element
      const rect = target.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      setTooltipPosition({ 
        x: rect.left - svgRect.left + rect.width / 2, 
        y: rect.top - svgRect.top - 10 
      });
    };

    const handleBlur = () => {
      setTooltipVisible(false);
    };

    hotspots.forEach((hotspot) => {
      hotspot.addEventListener("mouseenter", handleMouseEnter);
      hotspot.addEventListener("mousemove", handleMouseMove as EventListener);
      hotspot.addEventListener("mouseleave", handleMouseLeave);
      hotspot.addEventListener("focus", handleFocus);
      hotspot.addEventListener("blur", handleBlur);
    });

    return () => {
      hotspots.forEach((hotspot) => {
        hotspot.removeEventListener("mouseenter", handleMouseEnter);
        hotspot.removeEventListener("mousemove", handleMouseMove as EventListener);
        hotspot.removeEventListener("mouseleave", handleMouseLeave);
        hotspot.removeEventListener("focus", handleFocus);
        hotspot.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  return (
    <section id="workspace" className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Houston — Andrew's Setup
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This is the setup I use to build data products, experiment with machine learning, 
            and ship projects. Hover over each part to see the tools I use and how they fit into my workflow.
          </p>
        </div>

        {/* SVG Container with Tooltip */}
        <div className="relative">
          {/* Interactive Desk Setup SVG - Inlined from Houston-Andrews-Setup.svg */}
          <svg
            ref={svgRef}
            viewBox="0 0 1536 1024"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            role="img"
            aria-label="Interactive desk setup illustration"
          >
            {/* PNG background image */}
            <image
              href={houstonSetup}
              x={0}
              y={0}
              width={1536}
              height={1024}
              preserveAspectRatio="xMidYMid slice"
            />
            
            {/* LEFT MONITOR (Monitor-1) */}
            <g
              className="hotspot"
              id="hotspot-monitor-left"
              data-label="Dell P2422HE 24' Monitor - My secondary display I use to increase productivity and multitask efficiently."
              tabIndex={0}
              role="button"
              aria-label="Left monitor hotspot"
            >
              {/* Hit area: simple closed polygon covering the screen region */}
              <path
                className="hotspot-area"
                d="M237 141 L670 160 L670 466 L239 507 Z"
              />
              {/* Visual outline: original path, stroke only */}
              <path
                className="hotspot-outline"
                d="M438,620L407,625L350,591L352,578L412,564L408,495L239,507L237,141L670,160L670,466L461,491L459,561L472,561L531,586L530,604L512,607"
              />
            </g>

            {/* KVM SWITCH */}
            <g
              className="hotspot"
              id="hotspot-kvm"
              data-label="KVM Switch — Seamlessly switch peripherals between my MacBook Air and custom PC for different tasks."
              tabIndex={0}
              role="button"
              aria-label="KVM switch hotspot"
            >
              {/* Hit area – fill the interior of the shape */}
              <path
                className="hotspot-area"
                d="M550,587L515,563L518,529L643,523L683,544L682,578L550,587Z"
              />
              {/* Visual outline – same geometry, but stroke only */}
              <path
                className="hotspot-outline"
                d="M550,587L515,563L518,529L643,523L683,544L682,578L550,587Z"
              />
            </g>

            {/* CENTER MONITOR (Monitor-2) */}
            <g
              className="hotspot"
              id="hotspot-monitor-center"
              data-label="Dell S2421HGF 24'Gaming Monitor - My main display for coding, research, and gaming."
              tabIndex={0}
              role="button"
              aria-label="Center monitor hotspot"
            >
              {/* Hit area: simple closed polygon over the screen region */}
              <path
                className="hotspot-area"
                d="M670 158 L1088 158 L1088 468 L670 468 Z"
              />
              {/* Visual outline: original path, stroke only */}
              <path
                className="hotspot-outline"
                d="M1091,373L1090,458L879,464L877,519L893,526L949,548L950,565L819,578L770,553L769,536L815,532L816,521L828,517L827,468L670,468L670,158L1088,163L1090,292"
              />
            </g>

            {/* RIGHT MONITOR (Monitor-3 - Vertical) */}
            <g
              className="hotspot"
              id="hotspot-monitor-right"
              data-label="Dell P2422HE 24' Monitor - My Tertiary display which I use for reading feeds, Slack/Discord messages and articles."
              tabIndex={0}
              role="button"
              aria-label="Right vertical monitor hotspot"
            >
              {/* Hit area: simple closed polygon over the screen region */}
              <path
                className="hotspot-area"
                d="M1156 170 L1384 170 L1384 547 L1156 547 Z"
              />
              {/* Visual outlines: reuse the original paths, no fill */}
              <path
                className="hotspot-outline"
                d="M1091,373L1090,514L1235,533L1238,544L1188,549L1176,555L1175,570L1186,582L1204,588L1220,592L1237,594L1259,595L1305,594L1319,589L1327,583L1331,578L1330,564L1319,556L1309,551L1296,548L1282,545"
              />
              <path
                className="hotspot-outline"
                d="M1282,545L1282,540L1379,547L1384,170L1156,170"
              />
              <path
                className="hotspot-outline"
                d="M1129,171L1090,170L1090,291"
              />
            </g>

            {/* CUSTOM PC */}
            <g
              className="hotspot"
              id="hotspot-pc"
              data-label="Custom Gaming PC — A custom PC I built myself. It features a 3070ti GPU, Intel i9-10900K CPU, and 32GB RAM for larger data science, and machine learning tasks and some occasional gaming. Im planning to install linux on it soon! Please reach out if you have any recommended distros!"
              tabIndex={0}
              role="button"
              aria-label="Custom PC tower hotspot"
            >
              {/* Hit area – fill the interior of the shape */}
              <path
                className="hotspot-area"
                d="M615,808L311,846L311,1019L627,1021L628,807L615,808Z"
              />
              {/* Visual outline – same geometry, but stroke only */}
              <path
                className="hotspot-outline"
                d="M615,808L311,846L311,1019L627,1021L628,807L615,808Z"
              />
            </g>

            {/* COFFEE MUG */}
            <g
              className="hotspot"
              id="hotspot-coffee"
              data-label="Coffee (w/ Milk) — Essential fuel for late-night coding sessions. "
              tabIndex={0}
              role="button"
              aria-label="Coffee mug hotspot"
            >
              {/* Hit area – fill the interior of the shape */}
              <path
                className="hotspot-area"
                d="M442,670C442.208,673.741 444,678 444,678L448,681L458,686L466,687L486,687L495,686L502,683L507,679L507,667L518,665L527,659L533,651L536,643L536,633L532,623L525,615L519,613L514,613L511,606L505,602L497,600L481,598L458,598L450,600L444,603L440,607L439,612C439,612 441.389,658.985 442,670Z"
              />
              {/* Visual outline – same geometry, but stroke only */}
              <path
                className="hotspot-outline"
                d="M442,670C442.208,673.741 444,678 444,678L448,681L458,686L466,687L486,687L495,686L502,683L507,679L507,667L518,665L527,659L533,651L536,643L536,633L532,623L525,615L519,613L514,613L511,606L505,602L497,600L481,598L458,598L450,600L444,603L440,607L439,612C439,612 441.389,658.985 442,670Z"
              />
            </g>

            {/* KEYBOARD */}
            <g
              className="hotspot"
              id="hotspot-keyboard"
              data-label="Black Lofree Flow84 Low-profile mechanical keyboard with Phantom Switches — I absolutely love and recommend this keyboard for its mechanical feel, subtle tactile key sounds, and compact design making it easy to travel with."
              tabIndex={0}
              role="button"
              aria-label="Keyboard hotspot"
            >
              {/* Hit area – fill the interior of the shape */}
              <path
                className="hotspot-area"
                d="M669,721L596,654L597,623L608,619L612,612L934,578L1030,644L1030,670L669,721Z"
              />
              {/* Visual outline – same geometry, but stroke only */}
              <path
                className="hotspot-outline"
                d="M669,721L596,654L597,623L608,619L612,612L934,578L1030,644L1030,670L669,721Z"
              />
            </g>

            {/* MOUSE */}
            <g
              className="hotspot"
              id="hotspot-mouse"
              data-label="Lofree Wavy Chips Wireless Mouse — I really enjoy this mouse from its design to the thumb wheel and button for multi gesture use"
              tabIndex={0}
              role="button"
              aria-label="Mouse hotspot"
            >
              {/* Hit area – fill the interior of the shape */}
              <path
                className="hotspot-area"
                d="M1157,667L1137,667L1128,666L1119,663L1107,658L1092,649L1082,641L1071,634L1064,624L1068,597L1069,590L1105,575L1115,573L1123,577L1134,582L1140,584L1146,587L1152,591L1160,597L1166,604L1171,610L1177,618L1180,627L1181,634L1181,645L1177,653L1172,658L1165,664L1157,667Z"
              />
              {/* Visual outline – same geometry, but stroke only */}
              <path
                className="hotspot-outline"
                d="M1157,667L1137,667L1128,666L1119,663L1107,658L1092,649L1082,641L1071,634L1064,624L1068,597L1069,590L1105,575L1115,573L1123,577L1134,582L1140,584L1146,587L1152,591L1160,597L1166,604L1171,610L1177,618L1180,627L1181,634L1181,645L1177,653L1172,658L1165,664L1157,667Z"
              />
            </g>

            {/* MICROPHONE */}
            <g
              className="hotspot"
              id="hotspot-mic"
              data-label="Fifine AM8 Microphone on boom arm - I use this for improvement in audio quality in meetings, and videos."
              tabIndex={0}
              role="button"
              aria-label="Microphone hotspot"
            >
              {/* Hit area – fill the interior of the shape */}
              <path
                className="hotspot-area"
                d="M1047,384L1033,381L1026,375L1021,369L1016,360L1013,353L1013,342L1015,328L1018,318L1028,313L1070,297L1095,290L1119,282L1120,256L1129,252L1128,235L1132,229L1131,172L1124,164L1119,154L1122,144L1128,137L1135,133L1143,131L1153,132L1160,135L1390,98L1411,91L1438,90L1450,96L1456,101L1459,110L1459,118L1458,128L1455,134L1449,139L1445,144L1385,410L1381,279L1407,143L1393,131L1165,165L1161,170L1156,172L1155,231L1158,236L1159,253L1167,260L1167,276L1177,280L1184,286L1188,292L1191,300L1193,311L1193,320L1192,328L1186,336L1178,341L1168,346L1047,384Z"
              />
              {/* Visual outline – same geometry, but stroke only */}
              <path
                className="hotspot-outline"
                d="M1047,384L1033,381L1026,375L1021,369L1016,360L1013,353L1013,342L1015,328L1018,318L1028,313L1070,297L1095,290L1119,282L1120,256L1129,252L1128,235L1132,229L1131,172L1124,164L1119,154L1122,144L1128,137L1135,133L1143,131L1153,132L1160,135L1390,98L1411,91L1438,90L1450,96L1456,101L1459,110L1459,118L1458,128L1455,134L1449,139L1445,144L1385,410L1381,279L1407,143L1393,131L1165,165L1161,170L1156,172L1155,231L1158,236L1159,253L1167,260L1167,276L1177,280L1184,286L1188,292L1191,300L1193,311L1193,320L1192,328L1186,336L1178,341L1168,346L1047,384Z"
              />
            </g>

            {/* MACBOOK */}
            <g
              className="hotspot"
              id="hotspot-macbook"
              data-label="M4 MacBook Air - I have it on a vertical stand and use it for work, general tasks, and browsing."
              tabIndex={0}
              role="button"
              aria-label="MacBook Pro hotspot"
            >
              {/* Hit area: simple closed polygon covering the MacBook region */}
              <path
                className="hotspot-area"
                d="M80 400 L262 400 L262 663 L80 663 Z"
              />
              {/* Visual outline: REAL MacBook path from Houston-Andrews-Setup.svg */}
              <path
                className="hotspot-outline"
                d="M230,593L260,604L262,627L146,663L80,639L82,622L103,614L104,417L107,412L112,409L120,406L216,400L223,401L226,404L228,407L230,412L230,593Z"
              />
            </g>

            {/* WEBCAM */}
            <g
              className="hotspot"
              id="hotspot-camera"
              data-label="Logitech StreamCam — Mounted on left monitor for meetings."
              tabIndex={0}
              role="button"
              aria-label="Webcam hotspot"
            >
              {/* Hit area – fill the interior of the shape */}
              <path
                className="hotspot-area"
                d="M635,163L616,162L617,147L630,140L620,135L598,159L574,158L600,122L597,114L597,98L603,92L610,90L613,80L620,73L667,73C667,73 671.167,76.167 673,78C674.7,79.7 675.833,82 677,84C678.167,86 678.947,87.765 679,90C679.167,97 679,126 679,126L676,132L671,135L667,137L662,138L655,139L655,142L665,144L667,147L669,152L669,163L635,163Z"
              />
              {/* Visual outline – same geometry, but stroke only */}
              <path
                className="hotspot-outline"
                d="M635,163L616,162L617,147L630,140L620,135L598,159L574,158L600,122L597,114L597,98L603,92L610,90L613,80L620,73L667,73C667,73 671.167,76.167 673,78C674.7,79.7 675.833,82 677,84C678.167,86 678.947,87.765 679,90C679.167,97 679,126 679,126L676,132L671,135L667,137L662,138L655,139L655,142L665,144L667,147L669,152L669,163L635,163Z"
              />
            </g>


          </svg>

          {/* Tooltip Overlay */}
          <div
            ref={tooltipRef}
            className={`absolute bg-gray-900/95 text-white px-4 py-2 rounded-lg text-sm max-w-xs pointer-events-none transition-opacity duration-150 z-10 ${
              tooltipVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
            }}
            role="tooltip"
          >
            {tooltipContent}
          </div>
        </div>

        {/* Custom CSS for SVG Hotspots */}
        <style>{`
          /* The group is still the logical hotspot */
          .hotspot {
            cursor: pointer;
            transition: all 0.15s ease;
            outline: none;
          }
          
          /* Hit-area path: invisible fill that handles pointer events */
          .hotspot .hotspot-area {
            fill: rgba(255, 255, 255, 0);  /* fully transparent, but still counts as fill */
            stroke: none;
            pointer-events: fill;          /* hover over the interior of the path */
          }
          
          /* Outline path: only visible on hover/focus, no pointer events */
          .hotspot .hotspot-outline {
            fill: none;
            stroke: hsl(var(--primary));   /* uses theme primary color */
            stroke-width: 8px;             /* cleaner, sharper outline */
            opacity: 0;
            pointer-events: none;          /* events go to hotspot-area instead */
            transition: opacity 0.15s ease, filter 0.15s ease;
          }
          
          .hotspot:hover .hotspot-outline,
          .hotspot:focus-visible .hotspot-outline {
            opacity: 1;
            filter: drop-shadow(0 0 4px hsl(var(--primary) / 0.45));
          }
          
          /* Remove default focus outline for mouse clicks */
          .hotspot:focus:not(:focus-visible) {
            outline: none;
          }
          
          /* Only show custom focus ring for keyboard navigation */
          .hotspot:focus-visible {
            outline: 2px solid rgba(255, 255, 255, 0.4);
            outline-offset: 2px;
          }
        `}</style>
      </div>
    </section>
  );
};

export default WorkspaceSection;
