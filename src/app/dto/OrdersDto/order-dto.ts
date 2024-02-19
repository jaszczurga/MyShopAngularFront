export class OrderDto {
    id: number;
    orderTrackingNumber: string;
    totalQuantity: number;
    totalPrice: number;
    status: string | null;
    dateCreated: string;
    lastUpdated: string;

    constructor(id: number, orderTrackingNumber: string, totalQuantity: number, totalPrice: number, status: string | null, dateCreated: string, lastUpdated: string) {
        this.id = id;
        this.orderTrackingNumber = orderTrackingNumber;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
        this.status = status;
        this.dateCreated = dateCreated;
        this.lastUpdated = lastUpdated;
    }
}
