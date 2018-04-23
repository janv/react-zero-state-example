declare module 'ladda-cache' {
    type Config = {
        [scope: string]: Scope<any>
    }

    type Endpoints = {[fnName:string]:EndpointFunction}

    type Scope<E extends Endpoints> = {
        api: E
    }

    type GetApiFromScope<S> = S extends Scope<any> ? S['api'] : any

    type MappedApi<C extends Config> = {[ScopeName in keyof C]: GetApiFromScope<C[ScopeName]>}

    export function build<C extends Config>(config:C, plugins?:any):MappedApi<C>

    export interface EndpointFunction {
        operation?:'READ'|'CREATE'|'UPDATE'|'COMMAND'|'DELETE'
        byIds?: boolean
        byId?: boolean
        updateOnCreate?: any
    }
}

declare module 'ladda-observable'
declare module 'ladda-logger'