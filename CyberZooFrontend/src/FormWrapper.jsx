import PropTypes from 'prop-types';

export function FormWrapper({ title, children }) {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>{title}</h2>
      <div style={{ 
          display: "grid", 
          gap: "1rem .5rem", 
          justifyContent: "flex-start",
          gridTemplateColumns: "auto minmax(auto, 400px)",
      }}>
        {children}
      </div>
    </>
  );
}

FormWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};