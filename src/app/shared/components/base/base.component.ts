import { Component, Injectable, OnDestroy } from "@angular/core";
import { filter, Observable, Subject, Subscription, takeUntil } from "rxjs";
import { valueNotNullOrUndefined } from "@shared/utils/object.util";

@Injectable()
export class BaseComponent implements OnDestroy {
  public $unsubscribe = new Subject<void>();

  protected subscribeTo<T>(
    observable$: Subject<T> | Observable<T>,
    subscribeCallback: (result: T) => void,
    errorCallback?: (error: any) => void)
    : Subscription {
    return observable$.pipe(takeUntil(this.$unsubscribe)).subscribe({
      next: subscribeCallback,
      error: errorCallback
    });
  }

  protected subscribeToDefined<T>(
    observable$: Subject<T> | Observable<T>,
    subscribeCallback: (result: T) => void,
    errorCallback?: (error: any) => void)
    : Subscription {
    return observable$.pipe(takeUntil(this.$unsubscribe), filter(valueNotNullOrUndefined)).subscribe({
      next: subscribeCallback,
      error: errorCallback
    });
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
