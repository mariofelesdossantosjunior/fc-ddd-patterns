# FC‑DDD‑PATTERNS

**Referência de implementação de Domain‑Driven Design (DDD) com padrões de arquitetura limpa (Clean Architecture) em TypeScript.**

---

## ✏️ Visão Geral

Este projeto demonstra uma aplicação prática dos conceitos de **Domain‑Driven Design (DDD)**, com uma arquitetura organizada e separação clara entre lógica de negócio e infraestrutura. Ele utiliza padrões como Entities, Value Objects, Aggregates, Repositories, Domain Events e Services. Além disso, aplica princípios SOLID e Clean/Hexagonal Architecture ([GitHub][1]).

---

## 🚀 Estrutura do Projeto

```
src/
│
├── domain/                # Entidades de domínio, VO, eventos, interfaces
│   ├── customer/
│   ├── product/
│   ├── order/
│   └── shared/
│
├── application/           # Lógica de orquestração (serviços, use cases)
│
├── infrastructure/        # Implementações técnicas (ORM, repositórios, infra)
│   ├── repositories/
│   ├── models/
│   ├── event-dispatcher/
│   └── ...
│
├── tests/                 # Testes unitários com Jest e SWC
└── config files (.tsconfig, jest.config, etc.)
```

---

## 🧩 Principais Conceitos Implementados

| Elemento          | Descrição                                                          |
| ----------------- | ------------------------------------------------------------------ |
| **Aggregates**    | Customer, Product, Order (com OrderItem)                           |
| **Value Objects** | Address (com validação), padrão Money                              |
| **Repositori**    | Interfaces no domínio e implementação com Sequelize                |
| **Domain Events** | Eventos como `CustomerCreatedEvent`, `ProductCreatedEvent`         |
| **Services**      | `OrderService`, `ProductService`, relacionando domínio e infra     |
| **Factories**     | Criadores como `CustomerFactory`, `OrderFactory`, `ProductFactory` |

---

## 🏗️ Arquitetura por Camadas

* **Domain Layer** (`src/domain`)
  Contém toda lógica de negócio isolada, sem dependências externas.

* **Application Layer**
  Serviços de aplicação coordenam operações entre domínios e infraestrutura.

* **Infrastructure Layer** (`src/infrastructure`)
  Contém implementações concretas (ORM, banco de dados SQLite, event dispatcher).

A composição segue o estilo Ports & Adapters (Clean/Hexagonal Architecture), com infraestrutura implementando interfaces do domínio e serviços atuando como adaptadores ([GitHub][1]).

---

## 📦 Estrutura de Eventos de Domínio

O projeto utiliza **Domain Events** para promover *low coupling* entre partes do sistema.

### ➕ Registro e Disparo de Eventos

* Eventos são instâncias de classes que estendem uma interface base `EventInterface`.
* Usamos `EventDispatcher` como **bus** para registro e notificação de handlers.

**Exemplo de evento:**

```ts
export class CustomerCreatedEvent implements EventInterface {
  constructor(public readonly data: { id: string; name: string }) {}
}
```

**Registro de handlers:**

```ts
dispatcher.register("CustomerCreatedEvent", new SendEmailWhenCustomerIsCreatedHandler());
```

**Disparo:**

```ts
dispatcher.notify(new CustomerCreatedEvent({ id: "1", name: "Mario" }));
```

---

## 🧠 Estrutura de Event Handlers

Handlers implementam a interface `EventHandlerInterface`, garantindo um contrato `handle(event)`.

**Exemplo de handler:**

```ts
export class SendEmailWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log(`Email enviado para ${event.data.name}`);
  }
}
```

**Onde são usados?**

* Disparados em eventos como criação de clientes, inclusão de produtos, alterações em pedidos.
* Facilitam **auditoria**, **notificações**, **logs**, **integrações externas**, etc.

---

## 🏗️ Domínios Implementados

* **Customer** com Address (Value Object), eventos e factory
* **Product** com validações de preço
* **Order** com agregação de itens, cálculo de total, validações e serviços

---

## 📘 Inspirações

* [Domain-Driven Design – Eric Evans](https://www.domainlanguage.com)
* [Clean Architecture – Uncle Bob](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
* Curso *Full Cycle* — [https://fullcycle.com.br](https://fullcycle.com.br)

---


## ⚙️ Tecnologias Utilizadas

* Linguagem principal: **TypeScript**
* ORM: **Sequelize** com **SQLite**
* Testes: **Jest**, compilação com **SWC**
* Padrões: Factory, Domain Events, Repository Pattern

---

## 🧪 Como Usar

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/fc-ddd-patterns.git
   cd fc-ddd-patterns
   ```

2. Instale dependências:

   ```bash
   npm install
   ```

3. Execute os testes:

   ```bash
   npm test
   ```

---

## 📝 Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](./LICENSE) para mais informações.

```
