import { Observable, Subject } from 'rxjs'
import { EventArgs, } from './eventArgs'

export default class Events {
  private _map = new Map<string, Observable<any>>()

  public register<TArgs extends EventArgs>(name: string, ob$: Observable<TArgs>): Observable<TArgs> {
    this._map.set(name, ob$)
    return ob$
  }

  public unregister(name: string): void {
    this._map.delete(name)
  }

  public registerDefault<TArgs extends EventArgs>(name: string): Subject<TArgs> {
    let subject = new Subject<TArgs>()
    this.register(name, subject)
    return subject

  }

  public emitDefault<TArgs>(name: string, args: TArgs): void {
    (<Subject<TArgs>>this._map.get(name)).next(args)
  }

  public get<T>(name: string): Observable<T> {
    return <Observable<T>>this._map.get(name)
  }
}
