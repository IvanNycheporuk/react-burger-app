import React from 'react';

import Layout from './containers/Layouts/Layouts';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <Layout> 
      <BurgerBuilder />
      <Checkout />
    </Layout>
  );
}

export default App;
