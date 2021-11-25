export default {
  setEvents(state, events) {
    state.loadedEvents = events
  },
  addEvent(state, event) {
    state.loadedEvents.push(event)
  },
  editEvent(state, editedEvent) {
    const eventIndex = state.loadedEvents.findIndex(
      (event) => event.id === editedEvent.id
    )
    state.loadedEvents[eventIndex] = editedEvent
  },
}
