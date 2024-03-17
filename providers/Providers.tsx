type ProvidersType = [React.ElementType, Record<string, unknown>];
type ChildrenType = {
  children: Array<React.ElementType>;
};

export const buildProvidersTree = (componentsWithProps: Array<ProvidersType>) => {
  const initialComponent = ({ children }: ChildrenType) => <>{children}</>;
  return componentsWithProps.reduce(
    (AccumulatedComponents: React.ElementType, [Provider, props = {}]: ProvidersType) => {
      return ({ children }: ChildrenType) => {
        return (
          <AccumulatedComponents>
            <Provider {...props}>{children}</Provider>
          </AccumulatedComponents>
        );
      };
    },
    initialComponent
  );
};

// const ProvidersTree = buildProvidersTree([
//   [Provider, { store }],
//   [ThemeProvider, { theme: AppTheme }],
//   [ApolloProvider, { client }],
//   [PersistGate, { loading: null,persistor }]
// ]);
