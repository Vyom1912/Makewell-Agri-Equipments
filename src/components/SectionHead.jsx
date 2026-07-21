/**
 * Reusable section header with eyebrow label, heading and optional body text.
 *
 * Props:
 *   eyebrow  {string}           – small mono label above the heading
 *   title    {string|ReactNode} – main heading (h2 by default)
 *   body     {string|ReactNode} – optional paragraph below heading
 *   as       {'h2'|'h3'}        – heading tag, defaults to 'h2'
 *   className {string}          – extra classes on the wrapper
 */
export default function SectionHead({ eyebrow, title, body, as: Tag = 'h2', className = '' }) {
  return (
    <div className={`sec-head ${className}`.trim()}>
      {eyebrow && (
        <div className="eyebrow">
          <span className="idx">{eyebrow}</span>
          <span className="rule" />
        </div>
      )}
      <Tag>{title}</Tag>
      {body && <p>{body}</p>}
    </div>
  );
}
