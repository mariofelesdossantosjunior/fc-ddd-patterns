import CustomerChangeAddressEvent from "../../customer/event/customer-change-address.event";
import CustomerChangeAddressHandler from "../../customer/event/handler/send-change-address.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangeAddressHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeDefined();

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangeAddressHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeDefined();
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangeAddressHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangeAddressHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);

    const customerChangeAddressEvent = new CustomerChangeAddressEvent({
      id: "123",
      nome: "Mario",
      endereco: "Rua A",
    });

    eventDispatcher.notify(customerChangeAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
