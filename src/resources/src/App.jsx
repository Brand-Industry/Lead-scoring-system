import { FormProvider } from './context';
import { Body } from './components';

const App = function () {
  return (
    <FormProvider className="container">
      <Body />
    </FormProvider>
  );
};

export default App;
