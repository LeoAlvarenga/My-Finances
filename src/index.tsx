import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Salary',
          type: 'deposit',
          category: 'work',
          value: 6000,
          createdAt: new Date('2022-03-25 09:00:00'),
        },
        {
          id: 2,
          title: 'Groceries',
          type: 'withdraw',
          category: 'shopping',
          value: 500,
          createdAt: new Date('2022-03-25 12:00:00'),
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
