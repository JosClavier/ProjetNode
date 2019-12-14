export class Metric {
    public email: string
    public first_name: string
    public last_name: string
    public password: number

    constructor(ts: string, fn : string , ln: string,v: number) {
        this.email = ts
        this.first_name=fn
        this.last_name=ln
        this.password = v
    }


}

export class MetricsHandler {
    static get(callback: (error: Error | null, result?: Metric[]) => void) {
        const result = [
            new Metric('2013-11-04 14:00 UTC','jojo','popo',10),
            new Metric('2013-11-04 14:30 UTC','gat','banc', 15)
        ]
        callback(null, result)
    }
}