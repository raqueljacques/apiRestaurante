const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let pedidos = [];
let proximoId = 1;

app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

app.post('/pedidos', (req, res) => {
  const novoPedido = {
    id: proximoId,
    ...req.body
  };
  pedidos.push(novoPedido);
  proximoId++;
  res.status(201).json(novoPedido);
});

app.put('/pedidos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pedidoExistente = pedidos.find(pedido => pedido.id === id);

  if (!pedidoExistente) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  const novoPedido = {
    id: id,
    ...req.body
  };

  const index = pedidos.indexOf(pedidoExistente);
  pedidos[index] = novoPedido;

  res.json(novoPedido);
});

app.delete('/pedidos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pedidoExistente = pedidos.find(pedido => pedido.id === id);

  if (!pedidoExistente) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  const index = pedidos.indexOf(pedidoExistente);
  pedidos.splice(index, 1);

  res.json({ message: 'Pedido excluído com sucesso' });
});

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});
