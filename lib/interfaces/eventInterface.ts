export interface eventInterface{
    id : number
    eventName : string
    referenceName? : string
    startDate: Date
    endDate: Date
    userId: string
    status: string
    password: string
}

export interface EventInterfaceDetail extends eventInterface {
   inventory: Object
   decoration: Array<Object>
   timeline: Array<Object> 
}