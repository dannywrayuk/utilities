const ExampleChild = ({ number }) => {
  const x = Date.now();
  return <example param={x}>child {number}</example>;
};

export const example = () => {
  const x = Date.now();
  return (
    <example param={x}>
      <ExampleChild number={1} />
      <ExampleChild number={2} />
    </example>
  );
};
