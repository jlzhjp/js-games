import EventBus from './eventBus'

export default interface SimpleGameSubject {
  connect(eventBus: EventBus): void;
}