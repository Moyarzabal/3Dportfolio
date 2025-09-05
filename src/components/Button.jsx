/**
 * A reusable CTA button component.
 * Uses native anchor link behavior to scroll smoothly to the target section.
 */

const Button = ({ text, className, id }) => {
  return (
    <a
      href={id ? `#${id}` : "#"}
      className={`${className ?? ""} cta-wrapper`} // Add base + extra class names
    >
      <div className="cta-button">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;
