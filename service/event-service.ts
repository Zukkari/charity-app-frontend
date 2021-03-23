export interface DomainEvent {
    productId: number,
    newQuantity: number
}

export interface Subscription {
    onEvent(event: DomainEvent): void
}

export interface Registration {
    unsubscribe(): void
}


const url = "http://localhost:8080/events/stream";

class SseService {
    private initialized: boolean = false
    private sse?: EventSource;

    private _subscriptionState: Subscription[] = []

    public init() {
        this.sse = new EventSource(url)
        this.sse.onmessage = event => {
            const parsed = JSON.parse(event.data)
            const parsedEvent = JSON.parse(parsed[1].data)

            const domainEvent: DomainEvent = {
                newQuantity: parsedEvent.newQuantity,
                productId: parsedEvent.productId
            }

            this._subscriptionState.forEach(sub => sub.onEvent(domainEvent))
        }

        this.initialized = true
    }

    public subscribe(sub: Subscription): Registration {
        this._subscriptionState.push(sub)

        let subState = this._subscriptionState;

        return {
            unsubscribe: (): void => {
                const index = subState.indexOf(sub)
                this.subscriptionState = subState.slice(index)
            }
        }
    }

    set subscriptionState(value: Subscription[]) {
        this._subscriptionState = value;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }
}

const EventService = {
    sse: new SseService(),

    subscribe: function (sub: Subscription): Registration {
        if (!this.sse.isInitialized()) {
            this.sse.init()
        }

        return this.sse.subscribe(sub)
    }
}

export default EventService
