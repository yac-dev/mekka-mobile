type ComposerProps = {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<unknown>>>;
  children: React.ReactNode;
};

export const Composer: React.FC<ComposerProps> = ({ components, children }) => {
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};
