export class MaxNumberOfCheckInsReachedError extends Error {
  constructor() {
    super('Max number of check-ins reached.');
  }
}
