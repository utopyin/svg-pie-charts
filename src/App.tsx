/**
 * Generates an SVG path string for a pie chart segment with end circles and center bar
 *
 * @param centerX - X coordinate of the circle's center
 * @param centerY - Y coordinate of the circle's center
 * @param radius - The radius of the circle
 * @param percentage - The percentage of the circle to fill (0-100)
 * @param centerBarWidth - Width of the center bar (default 10)
 * @param endCircleRadius - Radius of the end circles (default 5)
 * @returns Object with SVG paths and circle coordinates
 */
function generatePieChartSegment(
  centerX: number,
  centerY: number,
  radius: number,
  percentage: number,
) {
  // Ensure percentage is between 0 and 100
  const safePercentage = Math.max(0, Math.min(100, percentage));

  // Convert percentage to radians
  const angle = (safePercentage / 100) * (2 * Math.PI);

  // Calculate inner and outer radius

  // Starting points
  const startOuterX = centerX + radius;
  const startOuterY = centerY;
  const startInnerX = centerX + radius;
  const startInnerY = centerY;

  // Calculate end points
  const endOuterX = centerX + radius * Math.cos(angle);
  const endOuterY = centerY + radius * Math.sin(angle);
  const endInnerX = centerX + radius * Math.cos(angle);
  const endInnerY = centerY + radius * Math.sin(angle);

  // Determine if the arc should be large (> 180 degrees)
  const largeArcFlag = safePercentage > 50 ? 1 : 0;

  // Segment path (outer arc and inner arc)
  const segmentPath = [
    `M ${startOuterX} ${startOuterY}`, // Start at outer circle start
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}`, // Outer arc
    `L ${endInnerX} ${endInnerY}`, // Line to inner arc end
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${startInnerX} ${startInnerY}`, // Inner arc (reversed)
    `Z`, // Close the path
  ].join(' ');

  return {
    segmentPath,
    startCircle: { x: startOuterX, y: startOuterY },
    endCircle: { x: endOuterX, y: endOuterY },
  };
}

function SvgElement({ x, y }: { x: number; y: number }) {
  return (
    <svg
      x={x - 9}
      y={y - 9}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.75 8.75V8.50001L9.00001 4.5625L14.25 8.49999V8.75V14.25V16.25H10.25V12.25C10.25 11.974 10.026 11.75 9.75 11.75H8.25C7.974 11.75 7.75 11.974 7.75 12.25V16.25H3.75V14.25V8.75Z"
        fill="#76F6AD"
        fill-opacity="0.3"
      />
      <path
        d="M3.75 16.25V8.75"
        stroke="#12AA54"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.25 8.75V16.25"
        stroke="#12AA54"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2 7L9 1.75L16 7"
        stroke="#12AA54"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.75 16.25V12.25C7.75 11.974 7.974 11.75 8.25 11.75H9.75C10.026 11.75 10.25 11.974 10.25 12.25V16.25"
        stroke="#12AA54"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.6 7H8.4C8.17909 7 8 7.17909 8 7.4V8.6C8 8.82091 8.17909 9 8.4 9H9.6C9.82091 9 10 8.82091 10 8.6V7.4C10 7.17909 9.82091 7 9.6 7Z"
        fill="#12AA54"
      />
      <path
        d="M4.75 4.938V2.25"
        stroke="#12AA54"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.25 16.25H1.75"
        stroke="#12AA54"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function CreateEndCirclesSVG({
  percentage,
  color,
  radius,
  width = 5,
}: {
  color: string;
  radius: number;
  percentage: number;
  width?: number;
}) {
  const segment = generatePieChartSegment(
    radius * 2,
    radius * 2,
    radius,
    percentage,
  );

  return (
    <svg
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      width={radius * 4}
      height={radius * 4}
      viewBox={`0 0 ${radius * 4} ${radius * 4}`}
    >
      <path
        d={segment.segmentPath}
        fill="transparent"
        strokeWidth={width * 2}
        stroke={color}
      />
      <circle
        cx={segment.startCircle.x}
        cy={segment.startCircle.y}
        r={width}
        fill={color}
      />
      <circle
        cx={segment.endCircle.x}
        cy={segment.endCircle.y}
        r={width}
        fill={color}
      />
      <SvgElement x={segment.endCircle.x} y={segment.endCircle.y} />
    </svg>
  );
}

const App = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="relative size-80">
        <CreateEndCirclesSVG
          color={'#7CE9AB'}
          percentage={99.999}
          radius={200}
          width={30}
        />
        <CreateEndCirclesSVG
          color={'#A178ED'}
          percentage={80}
          radius={200}
          width={30}
        />
        <CreateEndCirclesSVG
          color={'#FB876A'}
          percentage={20}
          radius={200}
          width={30}
        />
        <CreateEndCirclesSVG
          color={'#D1F471'}
          percentage={10}
          radius={200}
          width={30.5}
        />
      </div>
    </div>
  );
};

export default App;
